import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("nahid_lang") || "fr";
  });

  useEffect(() => {
    localStorage.setItem("nahid_lang", lang);
    const isRTL = lang === "ar";
    document.documentElement.setAttribute("dir",  isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);

    if (isRTL) {
      if (!document.getElementById("nahid-cairo-font")) {
        const link = document.createElement("link");
        link.id   = "nahid-cairo-font";
        link.rel  = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap";
        document.head.appendChild(link);
      }
      if (!document.getElementById("nahid-arabic-style")) {
        const style = document.createElement("style");
        style.id = "nahid-arabic-style";
        style.textContent = `
          [lang="ar"] body,
          [lang="ar"] .nb-root,
          [lang="ar"] .nb-ann,
          [lang="ar"] .co-page {
            font-family: 'Cairo', 'DM Sans', sans-serif;
          }
          [lang="ar"] .co-title,
          [lang="ar"] .co-success-title,
          [lang="ar"] .co-empty-title,
          [lang="ar"] .co-sum-head-title,
          [lang="ar"] .co-tot-grand-val {
            font-family: 'Cairo', Georgia, serif;
            letter-spacing: 0;
          }
        `;
        document.head.appendChild(style);
      }
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
