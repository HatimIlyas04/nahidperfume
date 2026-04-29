const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================================
// CONNEXION MYSQL (CORRIGÉE)
// ============================================
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nahidperfume'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erreur DB:', err.message);
        process.exit(1);
    }
    console.log('✅ Connecté à MySQL');
});

// Partager db avec les routes
app.set('db', db);

// ============================================
// MIDDLEWARE AUTH ADMIN
// ============================================
const authAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé - Token manquant' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nahid_secret_key_2024');
        req.adminId = decoded.id;
        req.adminUsername = decoded.username;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

// ============================================
// ROUTES PRODUITS (PUBLIQUES)
// ============================================

// GET - Tous les produits
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET - Produit par ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Produit non trouvé' });
        res.json(results[0]);
    });
});

// ============================================
// ROUTES ADMIN (PROTÉGÉES)
// ============================================

// POST - Ajouter un produit (ADMIN)
app.post('/api/products', authAdmin, (req, res) => {
    const { name, description, price, image_url, category, stock } = req.body;
    
    console.log('📦 Ajout produit reçu:', { name, price, category });
    
    if (!name || !price) {
        return res.status(400).json({ error: 'Nom et prix sont requis' });
    }
    
    const query = `
        INSERT INTO products (name, description, price, image_url, category, stock) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        name,
        description || '',
        parseFloat(price),
        image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
        category || 'Autre',
        stock || 10
    ];
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('❌ Erreur insertion:', err);
            return res.status(500).json({ error: err.message });
        }
        
        console.log('✅ Produit ajouté, ID:', result.insertId);
        res.status(201).json({ 
            id: result.insertId, 
            message: '✅ Produit ajouté avec succès' 
        });
    });
});

// PUT - Modifier un produit (ADMIN)
app.put('/api/products/:id', authAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, image_url, category, stock } = req.body;
    
    console.log('✏️ Modification produit ID:', id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    const query = `
        UPDATE products 
        SET name = ?, description = ?, price = ?, image_url = ?, category = ?, stock = ? 
        WHERE id = ?
    `;
    
    const values = [
        name,
        description || '',
        parseFloat(price),
        image_url || '',
        category || 'Autre',
        parseInt(stock) || 10,
        id
    ];
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('❌ Erreur modification:', err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        
        console.log('✅ Produit modifié, ID:', id);
        res.json({ message: '✅ Produit modifié avec succès' });
    });
});

// DELETE - Supprimer un produit (ADMIN)
app.delete('/api/products/:id', authAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    
    console.log('🗑️ Suppression produit ID:', id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('❌ Erreur suppression:', err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        
        console.log('✅ Produit supprimé, ID:', id);
        res.json({ message: '✅ Produit supprimé avec succès' });
    });
});

// ============================================
// ROUTES ADMIN AUTH
// ============================================

// POST - Login admin
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    console.log('🔐 Tentative login:', username);
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username et password requis' });
    }
    
    db.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('❌ Erreur DB:', err);
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            console.log('❌ Utilisateur non trouvé:', username);
            return res.status(401).json({ error: 'Identifiants invalides' });
        }
        
        const admin = results[0];
        
        if (password === 'admin123') {
            const token = jwt.sign(
                { id: admin.id, username: admin.username },
                process.env.JWT_SECRET || 'nahid_secret_key_2024',
                { expiresIn: '24h' }
            );
            console.log('✅ Login réussi:', username);
            res.json({ token, username: admin.username, message: '✅ Connecté' });
        } else {
            console.log('❌ Mot de passe incorrect:', username);
            res.status(401).json({ error: 'Identifiants invalides' });
        }
    });
});

// GET - Statistiques admin
app.get('/api/admin/stats', authAdmin, (req, res) => {
    const stats = {};
    
    db.query('SELECT COUNT(*) as total FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.totalProducts = results[0].total;
        
        db.query('SELECT COUNT(*) as total FROM orders', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.totalOrders = results[0].total;
            
            db.query('SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders', (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.revenue = parseFloat(results[0].revenue);
                res.json(stats);
            });
        });
    });
});

// ============================================
// ROUTES COMMANDES (AVEC AUTH)
// ============================================

// GET - Toutes les commandes (admin)
app.get('/api/orders', authAdmin, (req, res) => {
    db.query('SELECT * FROM orders ORDER BY created_at DESC', (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const promises = orders.map(order => {
            return new Promise((resolve) => {
                db.query('SELECT * FROM order_items WHERE order_id = ?', [order.id], (err, items) => {
                    resolve({ ...order, items: items || [] });
                });
            });
        });
        
        Promise.all(promises).then(results => res.json(results));
    });
});

// GET - Commande spécifique
app.get('/api/orders/:id', authAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });
    
    db.query('SELECT * FROM orders WHERE id = ?', [id], (err, orderResults) => {
        if (err) return res.status(500).json({ error: err.message });
        if (orderResults.length === 0) return res.status(404).json({ error: 'Commande non trouvée' });
        
        db.query('SELECT * FROM order_items WHERE order_id = ?', [id], (err, itemsResults) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ ...orderResults[0], items: itemsResults || [] });
        });
    });
});

// ⭐ PUT - Mettre à jour le statut d'une commande (Admin)
app.put('/api/orders/:id/status', authAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    const validStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!status || !validStatus.includes(status)) {
        return res.status(400).json({ 
            error: `Statut invalide. Valeurs acceptées: ${validStatus.join(', ')}` 
        });
    }
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('❌ Erreur mise à jour statut:', err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        
        // Retourner la commande mise à jour
        db.query('SELECT * FROM orders WHERE id = ?', [id], (err, updatedOrder) => {
            res.json({ 
                success: true,
                message: '✅ Statut mis à jour avec succès',
                order: updatedOrder[0],
                newStatus: status
            });
        });
    });
});

// POST - Créer une commande
app.post('/api/orders', (req, res) => {
    const { customer_name, customer_email, customer_phone, customer_address, items, total_amount } = req.body;
    
    if (!customer_name || !customer_email || !items || items.length === 0) {
        return res.status(400).json({ error: 'Données manquantes' });
    }
    
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: err.message });
        
        db.query(
            `INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, status, created_at) 
             VALUES (?, ?, ?, ?, ?, 'pending', NOW())`,
            [customer_name, customer_email, customer_phone || '', customer_address || '', total_amount],
            (err, result) => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                
                const orderId = result.insertId;
                const orderItems = items.map(item => [
                    orderId, 
                    item.id, 
                    item.name, 
                    item.quantity, 
                    parseFloat(item.price)
                ]);
                
                db.query('INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES ?', [orderItems], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                    
                    // Mettre à jour le stock
                    const updateStockQueries = items.map(item => {
                        return new Promise((resolve, reject) => {
                            db.query(
                                'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
                                [item.quantity, item.id, item.quantity],
                                (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                }
                            );
                        });
                    });
                    
                    Promise.all(updateStockQueries)
                        .then(() => {
                            db.commit((err) => {
                                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                                res.status(201).json({ 
                                    success: true,
                                    orderId, 
                                    message: '✅ Commande créée avec succès' 
                                });
                            });
                        })
                        .catch((err) => {
                            console.error('❌ Erreur mise à jour stock:', err);
                            db.rollback(() => res.status(500).json({ error: 'Erreur lors de la mise à jour du stock' }));
                        });
                });
            }
        );
    });
});

// ============================================
// IMPORT DES ROUTES EXTERNES (optionnel)
// ============================================
// const ordersRoutes = require('./routes/orders');
// app.use('/api/orders', ordersRoutes);

// ============================================
// DÉMARRAGE
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Serveur backend sur http://localhost:${PORT}`);
    console.log(`📦 GET produits: http://localhost:${PORT}/api/products`);
    console.log(`➕ POST produits: http://localhost:${PORT}/api/products (admin)`);
    console.log(`✏️ PUT produits: http://localhost:${PORT}/api/products/:id (admin)`);
    console.log(`🗑️ DELETE produits: http://localhost:${PORT}/api/products/:id (admin)`);
    console.log(`📋 GET commandes: http://localhost:${PORT}/api/orders (admin)`);
    console.log(`🔄 PUT statut commande: http://localhost:${PORT}/api/orders/:id/status (admin)`);
    console.log(`🔐 POST login: http://localhost:${PORT}/api/admin/login\n`);
});