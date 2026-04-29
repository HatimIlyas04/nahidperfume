const express = require('express');
const router = express.Router();
const db = require('../server'); // ملاحظة: سنقوم بتعديل server.js لتصدير db

// =============================================
// ROUTES PRODUITS
// =============================================

// GET - Récupérer tous les produits
router.get('/', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY id DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur GET products:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

// GET - Récupérer un produit par ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    // Vérifier si l'ID est valide
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    const query = 'SELECT * FROM products WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erreur GET product by id:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        
        res.json(results[0]);
    });
});

// POST - Ajouter un produit (Admin uniquement)
router.post('/', (req, res) => {
    const { name, description, price, image_url, category, stock } = req.body;
    
    // Validation
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
        price,
        image_url || '',
        category || 'Non catégorisé',
        stock || 10
    ];
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur POST product:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'ajout' });
        }
        
        res.status(201).json({
            id: result.insertId,
            message: '✅ Produit ajouté avec succès'
        });
    });
});

// PUT - Modifier un produit (Admin uniquement)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, image_url, category, stock } = req.body;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    const query = `
        UPDATE products 
        SET name = ?, description = ?, price = ?, 
            image_url = ?, category = ?, stock = ? 
        WHERE id = ?
    `;
    
    const values = [name, description, price, image_url, category, stock, id];
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur PUT product:', err);
            return res.status(500).json({ error: 'Erreur lors de la modification' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        
        res.json({ message: '✅ Produit modifié avec succès' });
    });
});

// DELETE - Supprimer un produit (Admin uniquement)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    const query = 'DELETE FROM products WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur DELETE product:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        
        res.json({ message: '✅ Produit supprimé avec succès' });
    });
});

module.exports = router;