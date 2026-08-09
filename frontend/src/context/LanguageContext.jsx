import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Arabic is the storefront default; a returning visitor's explicit
    // choice (saved on first switch) always wins over that default.
    return localStorage.getItem("nahid_lang") || "ar";
  });

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

  /* Dot-notation path traversal with French fallback */
  const t = (path) => {
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
