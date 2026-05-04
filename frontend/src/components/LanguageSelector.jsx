import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

/* ── Styles ─────────────────────────────────────────────── */
const CSS = `
  .ls-wrap { position:relative; display:inline-flex; align-items:center; }

  .ls-btn {
    display:inline-flex; align-items:center; gap:5px;
    padding:5px 10px 5px 7px; border-radius:999px;
    border:1.5px solid rgba(0,0,0,0.1);
    background:#ffffff; cursor:pointer;
    font-family:var(--sans,'DM Sans',sans-serif);
    font-size:0.7rem; font-weight:800; color:#1a1a1a;
    letter-spacing:0.06em; text-transform:uppercase;
    transition:border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    white-space:nowrap;
  }
  .ls-btn:hover {
    border-color:var(--c,#EF776A);
    box-shadow:0 2px 12px rgba(239,119,106,0.2);
    transform:translateY(-1px);
  }
  .ls-btn.ls-open { border-color:var(--c,#EF776A); }
  .ls-flag { font-size:0.95rem; line-height:1; }
  .ls-arrow {
    font-size:0.55rem; opacity:0.45;
    transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ls-btn.ls-open .ls-arrow { transform:rotate(180deg); opacity:0.75; }

  /* Dropdown */
  .ls-drop {
    position:absolute; top:calc(100% + 9px); right:0;
    min-width:170px; background:#ffffff;
    border:1px solid rgba(0,0,0,0.09);
    border-radius:18px;
    box-shadow:0 12px 44px rgba(0,0,0,0.13);
    overflow:hidden; z-index:9999;
    animation:lsDrop 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  [dir="rtl"] .ls-drop { right:auto; left:0; }

  @keyframes lsDrop {
    from { opacity:0; transform:translateY(-10px) scale(0.95); }
    to   { opacity:1; transform:none; }
  }

  .ls-drop-head {
    padding:10px 14px 7px;
    font-size:0.55rem; font-weight:800;
    letter-spacing:0.2em; text-transform:uppercase;
    color:#8c8478;
    border-bottom:1px solid rgba(0,0,0,0.06);
  }

  .ls-option {
    display:flex; align-items:center; gap:10px;
    padding:11px 14px;
    border:none; background:none; width:100%;
    cursor:pointer; transition:background 0.14s;
    font-family:var(--sans,'DM Sans',sans-serif);
    text-align:left;
  }
  [dir="rtl"] .ls-option { text-align:right; }
  .ls-option:hover { background:#fff4f3; }
  .ls-option.ls-active { background:linear-gradient(135deg,#fff4f3,#fde8e6); }

  .ls-opt-flag { font-size:1.25rem; flex-shrink:0; }
  .ls-opt-info { flex:1; min-width:0; }
  .ls-opt-name {
    font-size:0.8rem; font-weight:700; color:#1a1a1a;
    line-height:1.2; display:block;
  }
  .ls-opt-sub {
    font-size:0.62rem; color:#8c8478;
    display:block; margin-top:1px;
  }
  .ls-opt-check {
    font-size:0.72rem; font-weight:900;
    color:var(--c,#EF776A); flex-shrink:0;
  }
  .ls-rtl-badge {
    display:inline-block; padding:1px 5px;
    border-radius:4px; margin-top:2px;
    background:rgba(239,119,106,0.12);
    font-size:0.52rem; font-weight:800;
    color:var(--c,#EF776A); letter-spacing:0.08em;
  }
`;

const LANGUAGES = [
  { code: "fr", flag: "🇫🇷", name: "Français",  sub: "French",  rtl: false },
  { code: "en", flag: "🇬🇧", name: "English",   sub: "English", rtl: false },
  { code: "ar", flag: "🇸🇦", name: "العربية",   sub: "Arabic",  rtl: true  },
];

export default function LanguageSelector() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref  = useRef(null);

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  /* Inject CSS once */
  useEffect(() => {
    if (!document.getElementById("nahid-ls-css")) {
      const s = document.createElement("style");
      s.id = "nahid-ls-css";
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }, []);

  /* Close on outside click */
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const select = (code) => { setLang(code); setOpen(false); };

  return (
    <div className="ls-wrap" ref={ref}>
      <button
        className={`ls-btn${open ? " ls-open" : ""}`}
        onClick={() => setOpen(v => !v)}
        aria-label={t("nav.language")}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="ls-flag">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <span className="ls-arrow">▾</span>
      </button>

      {open && (
        <div className="ls-drop" role="listbox" aria-label={t("nav.language")}>
          <div className="ls-drop-head">{t("nav.language")}</div>
          {LANGUAGES.map(lng => (
            <button
              key={lng.code}
              className={`ls-option${lang === lng.code ? " ls-active" : ""}`}
              onClick={() => select(lng.code)}
              role="option"
              aria-selected={lang === lng.code}
            >
              <span className="ls-opt-flag">{lng.flag}</span>
              <div className="ls-opt-info">
                <span className="ls-opt-name">{lng.name}</span>
                {lng.rtl && <span className="ls-rtl-badge">RTL</span>}
              </div>
              {lang === lng.code && <span className="ls-opt-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
