const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

dotenv.config();

const uploadRouter = require('./routes/upload');

const app = express();
app.use(compression());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean)
    .concat(['http://localhost:3000', 'http://localhost:5173']);

app.use(cors({
    origin: (origin, cb) => {
        if (!origin || allowedOrigins.some(o => origin === o || origin.endsWith('.vercel.app'))) {
            cb(null, true);
        } else {
            cb(null, true); // permissive — tighten once Vercel URL is stable
        }
    },
    credentials: true,
}));

app.use(express.json());

// ============================================
// CONNECTION POOL (auto-reconnect, concurrent queries)
// ============================================
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

async function ensureSchema() {
    try {
        const [[{ cnt }]] = await pool.query(`
            SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'gallery_images'
        `);
        if (cnt === 0) {
            await pool.query('ALTER TABLE products ADD COLUMN gallery_images TEXT NULL AFTER image_url');
            console.log('✅ Colonne gallery_images ajoutée à products');
        }
    } catch (err) {
        console.error('❌ Erreur ensureSchema:', err.message);
    }
}

async function ensureReviewsTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id          INT AUTO_INCREMENT PRIMARY KEY,
                first_name  VARCHAR(100) NOT NULL,
                last_name   VARCHAR(100) NOT NULL,
                avatar      VARCHAR(50)  NOT NULL DEFAULT 'bloom',
                message     TEXT         NOT NULL,
                rating      TINYINT      NOT NULL DEFAULT 5,
                is_approved TINYINT      NOT NULL DEFAULT 0,
                created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Table reviews vérifiée/créée');
    } catch (err) {
        console.error('❌ Erreur ensureReviewsTable:', err.message);
    }
}

async function ensureAdmin() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        const [rows] = await pool.query('SELECT id FROM admins WHERE username = ?', ['nahid']);
        if (rows.length === 0) {
            const hash = await bcrypt.hash('nahid2026@', 10);
            await pool.query('INSERT INTO admins (username, password) VALUES (?, ?)', ['nahid', hash]);
            console.log('✅ Admin "nahid" créé avec succès');
        } else {
            console.log('✅ Admin "nahid" existe déjà (id=' + rows[0].id + ')');
        }
    } catch (err) {
        console.error('❌ Erreur ensureAdmin:', err.message);
    }
}

async function initDB(retries = 5, delay = 5000) {
    for (let i = 1; i <= retries; i++) {
        try {
            const conn = await pool.getConnection();
            conn.release();
            console.log('✅ Connecté à MySQL (pool)');
            await ensureAdmin();
            await ensureSchema();
            await ensureReviewsTable();
            return;
        } catch (err) {
            console.error(`❌ Erreur DB (tentative ${i}/${retries}):`, err.message);
            if (i < retries) await new Promise(r => setTimeout(r, delay));
        }
    }
    console.error('❌ Impossible de se connecter après plusieurs tentatives. Arrêt.');
    process.exit(1);
}
initDB();

// ============================================
// MIDDLEWARE AUTH ADMIN
// ============================================
const authAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Accès non autorisé - Token manquant' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nahid_secret_key_2024');
        req.adminId = decoded.id;
        req.adminUsername = decoded.username;
        next();
    } catch {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

// ── Upload Cloudinary (protected) ─────────────────────────
app.use('/api/upload', authAdmin, uploadRouter);

// ============================================
// PING — keep-alive (empêche Render de s'endormir)
// ============================================
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// Health-check: tests DB and shows table columns (safe read-only)
app.get('/api/health', async (req, res) => {
    try {
        const [[{ now }]] = await pool.query('SELECT NOW() as now');
        const [cols] = await pool.query(
            "SELECT COLUMN_NAME, DATA_TYPE FROM information_schema.COLUMNS WHERE TABLE_NAME='products' ORDER BY ORDINAL_POSITION"
        );
        res.json({
            status: 'ok',
            db_time: now,
            products_columns: cols.map(c => `${c.COLUMN_NAME}(${c.DATA_TYPE})`),
        });
    } catch (err) {
        res.status(500).json({ status: 'db_error', error: err.message });
    }
});

// ============================================
// ROUTES PRODUITS (PUBLIQUES)
// ============================================

// GET - Tous les produits
app.get('/api/products', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM products ORDER BY id DESC');
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.json(results);
    } catch (err) {
        console.error("GET /api/products ERROR:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET - Produit par ID
app.get('/api/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    try {
        const [results] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (results.length === 0) return res.status(404).json({ success: false, error: 'Produit non trouvé' });
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// ROUTES ADMIN — PRODUITS (PROTÉGÉES)
// ============================================

// POST - Ajouter un produit
app.post('/api/products', authAdmin, async (req, res) => {
    console.log("POST PRODUCT HIT");
    console.log("req.body:", JSON.stringify(req.body));

    const {
        name, description, scent_family, price, image_url, gallery_images,
        category, gender, product_type, inspired_by, stock, is_new, is_bestseller,
        concentration, scent_intensity, longevity, ingredients,
        top_notes, middle_notes, base_notes,
    } = req.body;

    console.log(`price raw: ${JSON.stringify(price)} | typeof: ${typeof price}`);

    if (!name || price === undefined || price === null || price === '') {
        return res.status(400).json({ error: 'Nom et prix sont requis' });
    }

    // Reject non-numeric strings (e.g. "warm" arriving in the price field)
    if (typeof price === 'string' && !/^-?\d+(\.\d+)?$/.test(price.trim())) {
        console.error(`Prix rejeté — valeur non numérique reçue: "${price}"`);
        return res.status(400).json({ error: `Prix invalide — valeur reçue: "${price}"` });
    }

    const parsedPrice = parseFloat(price);
    console.log(`parsedPrice: ${parsedPrice} | isNaN: ${isNaN(parsedPrice)}`);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ error: `Prix invalide — "${price}" n'est pas un nombre positif` });
    }

    const parsedStock = parseInt(stock);
    const safeStock = isNaN(parsedStock) || parsedStock < 0 ? 10 : parsedStock;

    const resolvedType = product_type || 'Original';
    const autoSize = resolvedType === 'Inspired By' ? '30ml' : '50ml';

    const query = `
        INSERT INTO products (
 name,
 description,
 price,
 image_url,
 gallery_images,
 category,
 gender,
 product_type,
 inspired_by,
 stock,
 is_new,
 is_bestseller,
 concentration,
 scent_intensity,
 longevity,
 ingredients,
 top_notes,
 middle_notes,
 base_notes,
 size,
 scent_family
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Values must follow the exact column order above
    const values = [
        name,                                                           // name
        description || '',                                              // description
        parsedPrice,                                                    // price (DECIMAL — must be number)
        image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', // image_url
        gallery_images || null,                                         // gallery_images (JSON string)
        category || 'Autre',                                            // category
        gender || 'Unisex',                                             // gender
        resolvedType,                                                   // product_type
        resolvedType === 'Inspired By' ? (inspired_by || '') : null,   // inspired_by
        safeStock,                                                      // stock
        is_new ? 1 : 0,                                                // is_new
        is_bestseller ? 1 : 0,                                         // is_bestseller
        concentration || null,                                          // concentration
        scent_intensity ? parseInt(scent_intensity) : null,            // scent_intensity
        longevity || null,                                              // longevity
        ingredients || null,                                            // ingredients
        top_notes || null,                                              // top_notes
        middle_notes || null,                                           // middle_notes
        base_notes || null,                                             // base_notes
        autoSize,                                                       // size
        scent_family || null,                                           // scent_family
    ];

    console.log("SQL values:", JSON.stringify(values));

    try {
        const [result] = await pool.query(query, values);
        res.status(201).json({ success: true, message: 'Produit ajouté avec succès', data: { id: result.insertId } });
    } catch (err) {
        console.error("POST PRODUCT SQL ERROR:", err.message, "| code:", err.code, "| sqlMessage:", err.sqlMessage);
        console.error(err.stack);
        res.status(500).json({
            success: false,
            error: err.message,
            sql_code: err.code || null,
            sql_message: err.sqlMessage || null,
        });
    }
});

// PUT - Modifier un produit
app.put('/api/products/:id', authAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    console.log("PUT PRODUCT HIT", id);
    console.log("BODY:", JSON.stringify(req.body));

    const {
        name, description, scent_family, price, image_url, gallery_images,
        category, gender, product_type, inspired_by, stock, is_new, is_bestseller,
        concentration, scent_intensity, longevity, ingredients,
        top_notes, middle_notes, base_notes,
    } = req.body;

    console.log(`PRICE TYPE: ${typeof price} | VALUE: ${JSON.stringify(price)}`);

    if (!name || price === undefined || price === null || price === '') {
        return res.status(400).json({ error: 'Nom et prix sont requis' });
    }

    if (typeof price === 'string' && !/^-?\d+(\.\d+)?$/.test(price.trim())) {
        console.error(`Prix rejeté (PUT) — valeur non numérique: "${price}"`);
        return res.status(400).json({ error: `Prix invalide — valeur reçue: "${price}"` });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ error: 'Prix invalide — doit être un nombre positif' });
    }

    const parsedStock = parseInt(stock);
    const safeStock = isNaN(parsedStock) || parsedStock < 0 ? 10 : parsedStock;

    const resolvedType = product_type || 'Original';
    const autoSize = resolvedType === 'Inspired By' ? '30ml' : '50ml';

    const query = `
        UPDATE products
        SET name=?, description=?, scent_family=?, price=?,
            image_url=?, gallery_images=?, category=?, gender=?, product_type=?, inspired_by=?,
            stock=?, is_new=?, is_bestseller=?,
            concentration=?, scent_intensity=?, longevity=?, ingredients=?,
            top_notes=?, middle_notes=?, base_notes=?, size=?
        WHERE id=?
    `;
    const values = [
        name,                                                           // name
        description || '',                                              // description
        scent_family || null,                                           // scent_family
        parsedPrice,                                                    // price (DECIMAL — must be number)
        image_url || '',                                                // image_url
        gallery_images || null,                                         // gallery_images (JSON string)
        category || 'Autre',                                            // category
        gender || 'Unisex',                                             // gender
        resolvedType,                                                   // product_type
        resolvedType === 'Inspired By' ? (inspired_by || '') : null,   // inspired_by
        safeStock,                                                      // stock
        is_new ? 1 : 0,                                                // is_new
        is_bestseller ? 1 : 0,                                         // is_bestseller
        concentration || null,                                          // concentration
        scent_intensity ? parseInt(scent_intensity) : null,            // scent_intensity
        longevity || null,                                              // longevity
        ingredients || null,                                            // ingredients
        top_notes || null,                                              // top_notes
        middle_notes || null,                                           // middle_notes
        base_notes || null,                                             // base_notes
        autoSize,                                                       // size
        id,                                                             // WHERE id
    ];
    try {
        const [result] = await pool.query(query, values);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, error: 'Produit non trouvé' });
        res.json({ success: true, message: 'Produit modifié avec succès' });
    } catch (err) {
        console.error("PUT PRODUCT SQL ERROR:", err.message, "| code:", err.code, "| sqlMessage:", err.sqlMessage);
        console.error(err.stack);
        res.status(500).json({
            success: false,
            error: err.message,
            sql_code: err.code || null,
            sql_message: err.sqlMessage || null,
        });
    }
});

// DELETE - Supprimer un produit
app.delete('/api/products/:id', authAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, error: 'Produit non trouvé' });
        res.json({ success: true, message: 'Produit supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ============================================
// ROUTES ADMIN AUTH
// ============================================

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

app.post('/api/admin/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;
    console.log(`[LOGIN] Tentative pour username: "${username}"`);
    if (!username || !password) return res.status(400).json({ error: 'Username et password requis' });
    try {
        const [results] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
        console.log(`[LOGIN] Admin trouvé: ${results.length > 0 ? 'OUI (id=' + results[0].id + ')' : 'NON'}`);
        if (results.length === 0) return res.status(401).json({ error: 'Identifiants invalides' });
        const admin = results[0];
        const valid = await bcrypt.compare(password, admin.password);
        console.log(`[LOGIN] Mot de passe valide: ${valid ? 'OUI' : 'NON'}`);
        if (!valid) return res.status(401).json({ error: 'Identifiants invalides' });
        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET || 'nahid_secret_key_2024',
            { expiresIn: '24h' }
        );
        console.log(`[LOGIN] Token généré pour "${admin.username}"`);
        res.json({ token, username: admin.username, message: '✅ Connecté' });
    } catch (err) {
        console.error('[LOGIN] Erreur:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET - Statistiques admin (requêtes parallèles)
app.get('/api/admin/stats', authAdmin, async (req, res) => {
    try {
        const [products, orders, revenue] = await Promise.all([
            pool.query('SELECT COUNT(*) as total FROM products'),
            pool.query('SELECT COUNT(*) as total FROM orders'),
            pool.query('SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders'),
        ]);
        res.json({
            totalProducts: products[0][0].total,
            totalOrders: orders[0][0].total,
            revenue: parseFloat(revenue[0][0].revenue),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// ROUTES COMMANDES
// ============================================

// GET - Toutes les commandes avec items (une seule requête JOIN)
app.get('/api/orders', authAdmin, async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT o.*,
                   oi.id        AS item_id,
                   oi.product_id,
                   oi.product_name,
                   oi.quantity,
                   oi.price     AS item_price
            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.id
            ORDER BY o.created_at DESC
        `);

        const ordersMap = new Map();
        for (const row of rows) {
            if (!ordersMap.has(row.id)) {
                const { item_id, product_id, product_name, quantity, item_price, ...order } = row;
                ordersMap.set(row.id, { ...order, items: [] });
            }
            if (row.item_id) {
                ordersMap.get(row.id).items.push({
                    id: row.item_id,
                    product_id: row.product_id,
                    product_name: row.product_name,
                    quantity: row.quantity,
                    price: row.item_price,
                });
            }
        }
        res.json([...ordersMap.values()]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Commande spécifique
app.get('/api/orders/:id', authAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    try {
        const [[orders], [items]] = await Promise.all([
            pool.query('SELECT * FROM orders WHERE id = ?', [id]),
            pool.query('SELECT * FROM order_items WHERE order_id = ?', [id]),
        ]);
        if (orders.length === 0) return res.status(404).json({ error: 'Commande non trouvée' });
        res.json({ ...orders[0], items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Mettre à jour le statut d'une commande
app.put('/api/orders/:id/status', authAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const validStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!status || !validStatus.includes(status)) {
        return res.status(400).json({ error: `Statut invalide. Valeurs acceptées: ${validStatus.join(', ')}` });
    }
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    try {
        const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Commande non trouvée' });
        const [[updated]] = await Promise.all([pool.query('SELECT * FROM orders WHERE id = ?', [id])]);
        res.json({ success: true, message: '✅ Statut mis à jour', order: updated[0], newStatus: status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Créer une commande
app.post('/api/orders', async (req, res) => {
    const { customer_name, customer_email, customer_phone, customer_address, items, total_amount } = req.body;
    if (!customer_name || !customer_email || !items || items.length === 0) {
        return res.status(400).json({ error: 'Données manquantes' });
    }
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [orderResult] = await conn.query(
            `INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, status, created_at)
             VALUES (?, ?, ?, ?, ?, 'pending', NOW())`,
            [customer_name, customer_email, customer_phone || '', customer_address || '', total_amount]
        );
        const orderId = orderResult.insertId;
        const orderItems = items.map(item => [orderId, item.id, item.name, item.quantity, parseFloat(item.price)]);
        await conn.query('INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES ?', [orderItems]);

        await Promise.all(items.map(item =>
            conn.query('UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?', [item.quantity, item.id, item.quantity])
        ));

        await conn.commit();
        res.status(201).json({ success: true, message: 'Commande créée avec succès', data: { orderId } });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

// ============================================
// ROUTES AVIS (REVIEWS)
// ============================================

const VALID_AVATARS = ['bloom', 'amber', 'oud', 'mystique', 'rose', 'soleil', 'marine', 'nature'];

// POST /api/reviews — submit a new review (pending approval)
app.post('/api/reviews', async (req, res) => {
    console.log('[POST /api/reviews] body:', JSON.stringify(req.body));
    const { first_name, last_name, avatar, message, rating } = req.body;

    if (!first_name?.trim() || !last_name?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'Prénom, nom et message sont requis' });
    }
    if (message.trim().length < 10) {
        return res.status(400).json({ error: 'Le message doit contenir au moins 10 caractères' });
    }
    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({ error: 'La note doit être entre 1 et 5' });
    }
    const safeAvatar = VALID_AVATARS.includes(avatar) ? avatar : 'bloom';
    try {
        const [result] = await pool.query(
            'INSERT INTO reviews (first_name, last_name, avatar, message, rating, is_approved) VALUES (?, ?, ?, ?, ?, 0)',
            [first_name.trim().substring(0, 100), last_name.trim().substring(0, 100), safeAvatar, message.trim().substring(0, 2000), parsedRating]
        );
        console.log('[POST /api/reviews] insertId:', result.insertId);
        res.status(201).json({ success: true, message: 'Avis soumis avec succès, en attente de validation' });
    } catch (err) {
        console.error('[POST /api/reviews] SQL ERROR:', err.message, '| code:', err.code);
        res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement de l\'avis' });
    }
});

// GET /api/reviews — public: approved reviews only
app.get('/api/reviews', async (req, res) => {
    console.log('[GET /api/reviews] fetching approved reviews');
    try {
        const [rows] = await pool.query('SELECT * FROM reviews WHERE is_approved = 1 ORDER BY created_at DESC');
        console.log('[GET /api/reviews] count:', rows.length);
        res.json(rows);
    } catch (err) {
        console.error('[GET /api/reviews] SQL ERROR:', err.message, '| code:', err.code);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/admin/reviews — admin: all reviews
app.get('/api/admin/reviews', authAdmin, async (req, res) => {
    console.log('[GET /api/admin/reviews] admin:', req.adminUsername);
    try {
        const [rows] = await pool.query('SELECT * FROM reviews ORDER BY is_approved ASC, created_at DESC');
        console.log('[GET /api/admin/reviews] count:', rows.length);
        res.json(rows);
    } catch (err) {
        console.error('[GET /api/admin/reviews] SQL ERROR:', err.message, '| code:', err.code);
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/admin/reviews/:id/approve
app.put('/api/admin/reviews/:id/approve', authAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    console.log('[PUT /api/admin/reviews/:id/approve] id:', id);
    try {
        const [result] = await pool.query('UPDATE reviews SET is_approved = 1 WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Avis non trouvé' });
        res.json({ success: true, message: 'Avis approuvé' });
    } catch (err) {
        console.error('[PUT approve] SQL ERROR:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/admin/reviews/:id/reject
app.put('/api/admin/reviews/:id/reject', authAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    console.log('[PUT /api/admin/reviews/:id/reject] id:', id);
    try {
        const [result] = await pool.query('UPDATE reviews SET is_approved = 0 WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Avis non trouvé' });
        res.json({ success: true, message: 'Avis rejeté' });
    } catch (err) {
        console.error('[PUT reject] SQL ERROR:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/admin/reviews/:id
app.delete('/api/admin/reviews/:id', authAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    console.log('[DELETE /api/admin/reviews/:id] id:', id);
    try {
        const [result] = await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Avis non trouvé' });
        res.json({ success: true, message: 'Avis supprimé' });
    } catch (err) {
        console.error('[DELETE review] SQL ERROR:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// DÉMARRAGE
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Serveur backend sur http://localhost:${PORT}`);
});
