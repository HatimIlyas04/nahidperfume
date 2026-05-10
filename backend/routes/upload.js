const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage — no disk writes, stream directly to Cloudinary
const storage = multer.memoryStorage();

const imageUpload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
    fileFilter: (_, file, cb) => {
        if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
        else cb(new Error('Format image invalide. Accepté : JPG, PNG, WEBP, GIF'));
    },
});

const videoUpload = multer({
    storage,
    limits: { fileSize: 300 * 1024 * 1024 }, // 300 MB
    fileFilter: (_, file, cb) => {
        if (/^video\/(mp4|webm|quicktime)$/.test(file.mimetype)) cb(null, true);
        else cb(new Error('Format vidéo invalide. Accepté : MP4, WEBM, MOV'));
    },
});

// Stream buffer → Cloudinary (no temp file on disk)
function streamToCloudinary(buffer, options) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
        stream.end(buffer);
    });
}

// ── POST /api/upload/image ──────────────────────────────
router.post('/image', imageUpload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });
    try {
        const result = await streamToCloudinary(req.file.buffer, {
            folder: 'nahid-perfume/products',
            resource_type: 'image',
            transformation: [
                { width: 900, height: 900, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
        });
        res.json({ success: true, url: result.secure_url, public_id: result.public_id });
    } catch (err) {
        console.error('Cloudinary image upload error:', err.message);
        res.status(500).json({ error: 'Erreur upload image', details: err.message });
    }
});

// ── POST /api/upload/video ──────────────────────────────
router.post('/video', videoUpload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });
    try {
        const result = await streamToCloudinary(req.file.buffer, {
            folder: 'nahid-perfume/videos',
            resource_type: 'video',
            // Cloudinary auto-generates optimized formats
            eager: [{ format: 'mp4', quality: 'auto' }],
            eager_async: true,
        });
        res.json({ success: true, url: result.secure_url, public_id: result.public_id });
    } catch (err) {
        console.error('Cloudinary video upload error:', err.message);
        res.status(500).json({ error: 'Erreur upload vidéo', details: err.message });
    }
});

// ── DELETE /api/upload/:public_id ───────────────────────
router.delete('/:public_id(*)', async (req, res) => {
    const { public_id } = req.params;
    const { resource_type = 'image' } = req.query;
    try {
        await cloudinary.uploader.destroy(public_id, { resource_type });
        res.json({ success: true, message: 'Fichier supprimé de Cloudinary' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur suppression', details: err.message });
    }
});

// Multer error handler
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        const msg = err.code === 'LIMIT_FILE_SIZE'
            ? 'Fichier trop volumineux'
            : err.message;
        return res.status(400).json({ error: msg });
    }
    if (err) return res.status(400).json({ error: err.message });
    next();
});

module.exports = router;
