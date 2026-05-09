const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const compression = require('compression');

dotenv.config();

const app = express();
app.use(compression());
app.use(cors());
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

pool.getConnection()
    .then(conn => { conn.release(); console.log('✅ Connecté à MySQL (pool)'); })
    .catch(err => { console.error('❌ Erreur DB:', err.message); process.exit(1); });

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
        name, description, scent_family, price, image_url,
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
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Values must follow the exact column order above
    const values = [
        name,                                                           // name
        description || '',                                              // description
        parsedPrice,                                                    // price (DECIMAL — must be number)
        image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', // image_url
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
        name, description, scent_family, price, image_url,
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
            image_url=?, category=?, gender=?, product_type=?, inspired_by=?,
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

app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username et password requis' });
    try {
        const [results] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
        if (results.length === 0) return res.status(401).json({ error: 'Identifiants invalides' });
        const admin = results[0];
        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) return res.status(401).json({ error: 'Identifiants invalides' });
        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET || 'nahid_secret_key_2024',
            { expiresIn: '24h' }
        );
        res.json({ token, username: admin.username, message: '✅ Connecté' });
    } catch (err) {
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
// DÉMARRAGE
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Serveur backend sur http://localhost:${PORT}`);
});
