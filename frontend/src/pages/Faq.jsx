import { useEffect, useState } from "react";
import { faqApi } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.fp-wrap { max-width: 780px; margin: 0 auto; padding: 60px 32px 100px; }
.fp-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 500; text-align: center; margin-bottom: 10px; }
.fp-sub { text-align: center; color: var(--text-light); margin-bottom: 48px; }
.fp-item { border-bottom: 1px solid var(--border-light); }
.fp-q { width: 100%; text-align: left; background: none; border: none; padding: 22px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 1rem; font-weight: 600; color: var(--secondary); font-family: var(--font-body); }
.fp-a { padding: 0 0 22px; color: var(--text-light); font-size: 0.9rem; line-height: 1.65; max-width: 680px; }
.fp-plus { font-size: 1.4rem; color: var(--primary); transition: transform 0.25s; flex-shrink: 0; margin-left: 16px; }
.fp-item.open .fp-plus { transform: rotate(45deg); }
.fp-skel { height: 58px; border-radius: 10px; margin: 6px 0; background: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%); background-size: 200% 100%; animation: fp-skel-pulse 1.4s infinite; }
@keyframes fp-skel-pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-faq-page-css")) {
    const s = document.createElement("style");
    s.id = "nahid-faq-page-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function Faq() {
  injectCSS();
  const { t } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    faqApi.listActive().then(setFaqs).catch(() => setFaqs([])).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title={t("faqPage.title")} description={t("faqPage.subtitle")} path="/faq" />
      <div className="fp-wrap">
        <h1 className="fp-title">{t("faqPage.title")}</h1>
        <p className="fp-sub">{t("faqPage.subtitle")}</p>

        {loading ? (
          <>
            {[0, 1, 2, 3].map((i) => <div className="fp-skel" key={i} />)}
          </>
        ) : faqs.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>{t("faqPage.empty")}</p>
        ) : (
          faqs.map((f) => (
            <div className={`fp-item${open === f.id ? " open" : ""}`} key={f.id}>
              <button className="fp-q" onClick={() => setOpen(open === f.id ? null : f.id)}>
                {f.question}
                <span className="fp-plus">+</span>
              </button>
              {open === f.id && <div className="fp-a">{f.answer}</div>}
            </div>
          ))
        )}
      </div>
      <NahidFooter />
    </>
  );
}
