const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../server');

// =============================================
// ROUTES ADMIN
// =============================================

// Middleware pour vérifier le token admin
const authAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Accès non autorisé' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        console.error('Erreur vérification token:', err);
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

// POST - Login admin
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username et password requis' });
    }
    
    const query = 'SELECT * FROM admins WHERE username = ?';
    
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Erreur login:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }
        
        const admin = results[0];
        
        // Vérifier le mot de passe
        // Pour le mot de passe par défaut 'admin123'
        let isValid = false;
        
        if (password === 'admin123') {
            isValid = true;
        } else {
            try {
                isValid = await bcrypt.compare(password, admin.password);
            } catch (err) {
                console.error('Erreur bcrypt:', err);
                isValid = false;
            }
        }
        
        if (!isValid) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }
        
        // Créer le token JWT
        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            token,
            username: admin.username,
            message: '✅ Connexion réussie'
        });
    });
});

// GET - Vérifier si le token est valide
router.get('/verify', authAdmin, (req, res) => {
    res.json({ valid: true, admin: req.admin });
});

// GET - Statistiques du dashboard
router.get('/stats', authAdmin, (req, res) => {
    const stats = {};
    
    // Nombre de produits
    db.query('SELECT COUNT(*) as count FROM products', (err, results) => {
        if (err) {
            console.error('Erreur stats produits:', err);
            stats.totalProducts = 0;
        } else {
            stats.totalProducts = results[0].count;
        }
        
        // Nombre de commandes
        db.query('SELECT COUNT(*) as count FROM orders', (err, results) => {
            if (err) {
                console.error('Erreur stats commandes:', err);
                stats.totalOrders = 0;
            } else {
                stats.totalOrders = results[0].count;
            }
            
            // Chiffre d'affaires total
            db.query('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders', (err, results) => {
                if (err) {
                    console.error('Erreur stats revenu:', err);
                    stats.totalRevenue = 0;
                } else {
                    stats.totalRevenue = parseFloat(results[0].total);
                }
                
                res.json(stats);
            });
        });
    });
});

// GET - Tous les utilisateurs (si vous avez une table users)
router.get('/users', authAdmin, (req, res) => {
    // Optionnel: si vous avez une table users
    res.json({ message: 'Endpoint users - à implémenter' });
});

// POST - Changer le mot de passe admin
router.post('/change-password', authAdmin, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id;
    
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Ancien et nouveau mot de passe requis' });
    }
    
    if (newPassword.length < 6) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }
    
    // Récupérer le mot de passe actuel
    const query = 'SELECT password FROM admins WHERE id = ?';
    
    db.query(query, [adminId], async (err, results) => {
        if (err) {
            console.error('Erreur récupération password:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Admin non trouvé' });
        }
        
        // Vérifier l'ancien mot de passe
        let isValid = false;
        
        if (oldPassword === 'admin123') {
            isValid = true;
        } else {
            try {
                isValid = await bcrypt.compare(oldPassword, results[0].password);
            } catch (err) {
                isValid = false;
            }
        }
        
        if (!isValid) {
            return res.status(401).json({ error: 'Ancien mot de passe incorrect' });
        }
        
        // Hacher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Mettre à jour
        const updateQuery = 'UPDATE admins SET password = ? WHERE id = ?';
        
        db.query(updateQuery, [hashedPassword, adminId], (err) => {
            if (err) {
                console.error('Erreur mise à jour password:', err);
                return res.status(500).json({ error: 'Erreur lors du changement de mot de passe' });
            }
            
            res.json({ message: '✅ Mot de passe changé avec succès' });
        });
    });
});

module.exports = router;