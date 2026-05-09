const express = require('express');
const router = express.Router();
const db = require('../server');

// =============================================
// GET ALL PRODUCTS
// =============================================
router.get('/', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY id DESC';

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// =============================================
// GET PRODUCT BY ID
// =============================================
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM products WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(results[0]);
    });
});

// =============================================
// POST PRODUCT (FULL PERFUME SYSTEM)
// =============================================
router.post('/', (req, res) => {
    const {
        name,
        description,
        price,
        image_url,
        category,
        gender,
        product_type,
        inspired_by,
        stock,

        // 🔥 NEW PERFUME FIELDS
        concentration,
        scent_intensity,
        longevity,
        ingredients,
        top_notes,
        middle_notes,
        base_notes,
        size,
        scent_family
    } = req.body;

    const { is_new, is_bestseller } = req.body;

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
)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
        name,
        description,
        price,
        image_url,
        category,
        gender,
        product_type,
        inspired_by,
        stock || 10,
        is_new ? 1 : 0,
        is_bestseller ? 1 : 0,

        concentration,
        scent_intensity,
        longevity,
        ingredients,
        top_notes,
        middle_notes,
        base_notes,
        size,
        scent_family
    ];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.json({
            message: "Product created successfully",
            id: result.insertId
        });
    });
});

// =============================================
// UPDATE PRODUCT
// =============================================
router.put('/:id', (req, res) => {
    const { id } = req.params;

    const {
        name,
        description,
        price,
        image_url,
        category,
        stock,

        concentration,
        scent_intensity,
        longevity,
        ingredients,
        top_notes,
        middle_notes,
        base_notes,
        size,
        scent_family
    } = req.body;

    const query = `
        UPDATE products SET
            name=?, description=?, price=?, image_url=?,
            category=?, stock=?,
            concentration=?, scent_intensity=?, longevity=?, ingredients=?,
            top_notes=?, middle_notes=?, base_notes=?,
            size=?, scent_family=?
        WHERE id=?
    `;

    const values = [
        name,
        description,
        price,
        image_url,
        category,
        stock,

        concentration,
        scent_intensity,
        longevity,
        ingredients,
        top_notes,
        middle_notes,
        base_notes,
        size,
        scent_family,

        id
    ];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.json({ message: "Product updated successfully" });
    });
});

// =============================================
// DELETE PRODUCT
// =============================================
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.json({ message: "Product deleted successfully" });
    });
});

module.exports = router;