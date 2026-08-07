const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

let scriptPromise = null;

function loadScript() {
  if (!SITE_KEY) return Promise.resolve(false);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    if (window.grecaptcha) return resolve(true);
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/** Returns a reCAPTCHA v3 token for `action`, or null if not configured /
 * failed to load — callers must treat null as "skip, backend no-ops too". */
export async function getRecaptchaToken(action) {
  if (!SITE_KEY) return null;
  const loaded = await loadScript();
  if (!loaded || !window.grecaptcha) return null;
  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(SITE_KEY, { action }).then(resolve).catch(() => resolve(null));
    });
  });
}
