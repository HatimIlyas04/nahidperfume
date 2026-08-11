import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";
import { siteContentApi } from "../services/api";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Arabic is the storefront default; a returning visitor's explicit
    // choice (saved on first switch) always wins over that default.
    return localStorage.getItem("nahid_lang") || "ar";
  });

  // Admin-editable overrides for the app's own translation keys (see the
  // Website Content admin page) -- { [content_key]: { fr, ar } }. Fetched
  // once, independent of `lang`, and layered in front of the hardcoded
  // `translations` lookup inside t() below. Starts empty so the page
  // renders immediately with the existing hardcoded copy; if/when this
  // resolves, any admin-edited strings simply swap in on the next render
  // -- nothing blocks on this, and nothing breaks if it fails.
  const [contentOverrides, setContentOverrides] = useState({});
  useEffect(() => {
    siteContentApi.list().then(setContentOverrides).catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem("nahid_lang", lang);
    const isRTL = lang === "ar";
    document.documentElement.setAttribute("dir",  isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);

    // Tajawal/Cairo are preloaded statically in index.html (Arabic is the
    // default language now, so the browser's preload scanner must find
    // them immediately, not after this JS-only effect runs). Only the
    // font-family/typography rules for [dir="rtl"] are injected here.
    if (!document.getElementById("nahid-arabic-style")) {
      const style = document.createElement("style");
      style.id = "nahid-arabic-style";
      // Applied broadly (not a per-class list) so every current and future
      // page automatically gets the Arabic-appropriate typeface — a
      // per-component class list silently misses new pages otherwise.
      style.textContent = `
        [dir="rtl"] body, [dir="rtl"] input, [dir="rtl"] textarea, [dir="rtl"] select, [dir="rtl"] button {
          font-family: 'Tajawal', 'Cairo', Arial, sans-serif;
        }
        [dir="rtl"] body { line-height: 1.75; }
        [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5 {
          font-family: 'Tajawal', 'Cairo', Arial, sans-serif;
          letter-spacing: 0;
          line-height: 1.4;
        }
        [dir="rtl"] .adm-shell { direction: ltr; }
        [dir="rtl"] .adm-shell [lang="ar"], [dir="rtl"] .adm-shell { unicode-bidi: normal; }
      `;
      document.head.appendChild(style);
    }
  }, [lang]);

  /* Admin override first (only for fr/ar -- content_override has no "en"
     column, so this is a no-op for English by construction), then the
     existing dot-notation path traversal with French fallback. */
  const t = (path) => {
    const override = contentOverrides[path]?.[lang];
    if (override) return override;

    const keys = path.split(".");
    let val = translations[lang];
    for (const k of keys) {
      if (val == null) break;
      val = val[k];
    }
    if (val == null) {
      val = translations.fr;
      for (const k of keys) {
        if (val == null) return path;
        val = val[k];
      }
    }
    return val ?? path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
