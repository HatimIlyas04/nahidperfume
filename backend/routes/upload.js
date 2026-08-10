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

// eslint-disable-next-line no-console
console.log(`[UPLOAD] Cloudinary config at startup: ${CLOUDINARY_CONFIGURED ? 'present' : 'MISSING'} (cloud_name=${env.cloudinary.cloudName ? 'set' : 'missing'}, api_key=${env.cloudinary.apiKey ? 'set' : 'missing'}, api_secret=${env.cloudinary.apiSecret ? 'set' : 'missing'})`);

function requireCloudinary(req, res, next) {
    if (!CLOUDINARY_CONFIGURED) {
        // Full detail (which exact keys are missing) only in the Render
        // logs — the client just needs to know upload isn't available
        // right now, not the server's environment-variable layout. Never
        // logs the secret values themselves, only whether each is set.
        // eslint-disable-next-line no-console
        console.error(`[UPLOAD] Cloudinary error: not configured — cloud_name=${env.cloudinary.cloudName ? 'set' : 'MISSING'}, api_key=${env.cloudinary.apiKey ? 'set' : 'MISSING'}, api_secret=${env.cloudinary.apiSecret ? 'set' : 'MISSING'}`);
        return res.status(503).json({
            success: false,
            message: 'Cloudinary is not configured on the production server.',
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
router.post('/image', requireCloudinary, (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log('[UPLOAD] request received (POST /api/upload/image)');
    next();
}, imageUpload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'Aucun fichier reçu.' });
    // eslint-disable-next-line no-console
    console.log(`[UPLOAD] file received: field="file" mimetype=${req.file.mimetype} size=${req.file.size}B`);
    try {
        // eslint-disable-next-line no-console
        console.log('[UPLOAD] Cloudinary upload started');
        const result = await streamToCloudinary(req.file.buffer, {
            folder: 'nahid-perfume/products',
            resource_type: 'image',
            transformation: [
                { width: 900, height: 900, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
        });
        // eslint-disable-next-line no-console
        console.log(`[UPLOAD] Cloudinary upload completed: public_id=${result.public_id}`);
        res.json({ success: true, url: result.secure_url, public_id: result.public_id });
    } catch (err) {
        // Cloudinary SDK errors are categorical (e.g. "Invalid API key",
        // "Invalid Signature") and never include the secret itself, so it's
        // safe (and per the current diagnostic need, useful) to relay the
        // real message back instead of a generic string.
        // eslint-disable-next-line no-console
        console.error(`[UPLOAD] Cloudinary error: ${err.message}`);
        res.status(502).json({ success: false, message: err.message || "Échec du téléchargement de l'image." });
    }
});

// ── POST /api/upload/video ──────────────────────────────
router.post('/video', requireCloudinary, (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log('[UPLOAD] request received (POST /api/upload/video)');
    next();
}, videoUpload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'Aucun fichier reçu.' });
    // eslint-disable-next-line no-console
    console.log(`[UPLOAD] file received: field="file" mimetype=${req.file.mimetype} size=${req.file.size}B`);
    try {
        // eslint-disable-next-line no-console
        console.log('[UPLOAD] Cloudinary upload started');
        const result = await streamToCloudinary(req.file.buffer, {
            folder: 'nahid-perfume/videos',
            resource_type: 'video',
            // Cloudinary auto-generates optimized formats
            eager: [{ format: 'mp4', quality: 'auto' }],
            eager_async: true,
        });
        // eslint-disable-next-line no-console
        console.log(`[UPLOAD] Cloudinary upload completed: public_id=${result.public_id}`);
        res.json({ success: true, url: result.secure_url, public_id: result.public_id });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`[UPLOAD] Cloudinary error: ${err.message}`);
        res.status(502).json({ success: false, message: err.message || 'Échec du téléchargement de la vidéo.' });
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
