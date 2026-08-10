const REQUIRED = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];

function loadEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key] || !process.env[key].trim());

  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `[env] Missing required environment variable(s): ${missing.join(', ')}.\n` +
      '[env] Set them in backend/.env before starting the server. ' +
      'JWT_SECRET in particular must be a long random string — ' +
      'there is no fallback secret anymore for security reasons.'
    );
    process.exit(1);
  }

  // Not in REQUIRED (a missing key here shouldn't stop the whole server
  // from booting — every other route still works), but a silent
  // misconfiguration here is exactly what turns into a confusing 500 on
  // every image upload with no clue why, so it gets a loud one-time
  // warning in the Render logs instead of only surfacing when an admin
  // actually tries to upload something.
  const missingCloudinary = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']
    .filter((key) => !process.env[key] || !process.env[key].trim());
  if (missingCloudinary.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `[env] Cloudinary is not fully configured — missing: ${missingCloudinary.join(', ')}. ` +
      'Image/video upload (POST /api/upload/*) will fail until these are set.'
    );
  }

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    db: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    },
    jwtSecret: process.env.JWT_SECRET,
    allowedOrigins: (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean),
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    ultramsg: {
      instanceId: process.env.ULTRAMSG_INSTANCE_ID || '',
      token: process.env.ULTRAMSG_TOKEN || '',
      adminNumbers: (process.env.ULTRAMSG_ADMIN_NUMBERS || '')
        .split(',')
        .map((n) => n.trim())
        .filter(Boolean),
    },
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: Number(process.env.SMTP_PORT) || 587,
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASSWORD || '',
      adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL || '',
    },
    recaptcha: {
      secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
      minScore: Number(process.env.RECAPTCHA_MIN_SCORE) || 0.5,
    },
  };
}

module.exports = loadEnv();
