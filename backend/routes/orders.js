const express = require('express');
const router = express.Router();

// =============================================
// CONFIGURATION
// =============================================
const VALID_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

// Middleware pour vérifier le token admin
const authAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé - Token manquant' });
    }
    
    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nahid_secret_key_2024');
        req.adminId = decoded.id;
        req.adminUsername = decoded.username;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

// =============================================
// ROUTES ORDERS
// =============================================

// GET - Récupérer toutes les commandes (Admin uniquement)
router.get('/', authAdmin, async (req, res) => {
    const db = req.app.get('db');
    
    const query = 'SELECT * FROM orders ORDER BY created_at DESC';
    
    db.query(query, (err, orders) => {
        if (err) {
            console.error('Erreur GET orders:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        if (orders.length === 0) {
            return res.json([]);
        }
        
        const ordersWithItems = [];
        let processed = 0;
        
        orders.forEach((order, index) => {
            const itemsQuery = 'SELECT * FROM order_items WHERE order_id = ?';
            
            db.query(itemsQuery, [order.id], (err, items) => {
                if (err) {
                    console.error('Erreur GET order_items:', err);
                }
                
                ordersWithItems[index] = {
                    ...order,
                    items: items || []
                };
                processed++;
                
                if (processed === orders.length) {
                    res.json(ordersWithItems);
                }
            });
        });
    });
});

// GET - Récupérer une commande spécifique
router.get('/:id', authAdmin, (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    const orderQuery = 'SELECT * FROM orders WHERE id = ?';
    
    db.query(orderQuery, [id], (err, orderResults) => {
        if (err) {
            console.error('Erreur GET order:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        if (orderResults.length === 0) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        
        const itemsQuery = 'SELECT * FROM order_items WHERE order_id = ?';
        
        db.query(itemsQuery, [id], (err, itemsResults) => {
            if (err) {
                console.error('Erreur GET order_items:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            
            res.json({
                ...orderResults[0],
                items: itemsResults
            });
        });
    });
});

// =============================================
// ⭐ ROUTE FIXED: PUT - Mettre à jour le statut
// =============================================
router.put('/:id/status', authAdmin, (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { status } = req.body;
    
    // Validation du statut
    if (!status || !VALID_STATUSES.includes(status)) {
        return res.status(400).json({ 
            error: `Statut invalide. Valeurs acceptées: ${VALID_STATUSES.join(', ')}` 
        });
    }
    
    // ROUTE SPÉCIFIQUE - doit être avant tout wildcard
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('Erreur PUT order status:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
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

// POST - Créer une nouvelle commande
router.post('/', (req, res) => {
    const db = req.app.get('db');
    const { customer_name, customer_email, customer_phone, customer_address, items, total_amount } = req.body;
    
    // Validation
    if (!customer_name || !customer_email || !items || items.length === 0) {
        return res.status(400).json({ error: 'Données manquantes' });
    }
    
    // Démarrer une transaction
    db.beginTransaction((err) => {
        if (err) {
            console.error('Erreur début transaction:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        // Insérer la commande
        const orderQuery = `
            INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, status, created_at) 
            VALUES (?, ?, ?, ?, ?, 'pending', NOW())
        `;
        
        const orderValues = [customer_name, customer_email, customer_phone || '', customer_address || '', total_amount];
        
        db.query(orderQuery, orderValues, (err, result) => {
            if (err) {
                console.error('Erreur insertion order:', err);
                return db.rollback(() => {
                    res.status(500).json({ error: 'Erreur lors de la création de la commande' });
                });
            }
            
            const orderId = result.insertId;
            
            // Préparer les items de la commande
            const orderItems = items.map(item => [
                orderId,
                item.id,
                item.name,
                item.quantity,
                parseFloat(item.price)
            ]);
            
            // Insérer les items
            const itemsQuery = `
                INSERT INTO order_items (order_id, product_id, product_name, quantity, price) 
                VALUES ?
            `;
            
            db.query(itemsQuery, [orderItems], (err) => {
                if (err) {
                    console.error('Erreur insertion order_items:', err);
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Erreur lors de l\'ajout des articles' });
                    });
                }
                
                // Mettre à jour le stock
                const updateStockPromises = items.map(item => {
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
                
                Promise.all(updateStockPromises)
                    .then(() => {
                        // Valider la transaction
                        db.commit((err) => {
                            if (err) {
                                console.error('Erreur commit transaction:', err);
                                return db.rollback(() => {
                                    res.status(500).json({ error: 'Erreur lors de la validation' });
                                });
                            }
                            
                            res.status(201).json({
                                success: true,
                                orderId,
                                message: '✅ Commande créée avec succès'
                            });
                        });
                    })
                    .catch((err) => {
                        console.error('Erreur mise à jour stock:', err);
                        db.rollback(() => {
                            res.status(500).json({ error: 'Erreur lors de la mise à jour du stock' });
                        });
                    });
            });
        });
    });
});

module.exports = router;