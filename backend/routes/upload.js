const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const env = require('../config/env');

cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key:    env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
});

const CLOUDINARY_CONFIGURED = !!(env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret);

function requireCloudinary(req, res, next) {
    if (!CLOUDINARY_CONFIGURED) {
        // Full detail (which exact keys are missing) only in the Render
        // logs — the client just needs to know upload isn't available
        // right now, not the server's environment-variable layout.
        // eslint-disable-next-line no-console
        console.error('[upload] Cloudinary is not configured — CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET missing on this environment.');
        return res.status(503).json({
            success: false,
            message: "Le service de téléchargement d'images est temporairement indisponible. Veuillez réessayer plus tard.",
        });
    }
    next();
}

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
router.post('/image', requireCloudinary, imageUpload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'Aucun fichier reçu.' });
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
        // eslint-disable-next-line no-console
        console.error('[upload] Cloudinary image upload failed:', err.message);
        res.status(502).json({ success: false, message: "Échec du téléchargement de l'image. Veuillez réessayer." });
    }
});

// ── POST /api/upload/video ──────────────────────────────
router.post('/video', requireCloudinary, videoUpload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'Aucun fichier reçu.' });
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
        // eslint-disable-next-line no-console
        console.error('[upload] Cloudinary video upload failed:', err.message);
        res.status(502).json({ success: false, message: 'Échec du téléchargement de la vidéo. Veuillez réessayer.' });
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
        // eslint-disable-next-line no-console
        console.error('[upload] Cloudinary delete failed:', err.message);
        res.status(502).json({ success: false, message: 'Échec de la suppression du fichier.' });
    }
});

// Multer error handler
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        const message = err.code === 'LIMIT_FILE_SIZE'
            ? 'Fichier trop volumineux.'
            : err.message;
        return res.status(400).json({ success: false, message });
    }
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
});

module.exports = router;
