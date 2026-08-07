import { useEffect, useMemo, useState } from "react";
import { FiX, FiSearch, FiCheck } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";

const CSS = `
.rp-modal-overlay {
  position: fixed; inset: 0; background: rgba(26,26,26,0.6);
  backdrop-filter: blur(4px); z-index: 2100;
  display: flex; align-items: center; justify-content: center; padding: 20px;
  animation: fadeIn 0.25s ease;
}
.rp-modal {
  background: var(--white); border-radius: var(--radius-xl);
  max-width: 640px; width: 100%; max-height: 85vh;
  display: flex; flex-direction: column; box-shadow: var(--shadow-xl);
  animation: fadeUp 0.3s cubic-bezier(0.16,1,0.3,1);
}
.rp-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 22px 26px 14px; }
.rp-modal-title { font-family: var(--font-display); font-size: 1.3rem; font-weight: 500; color: var(--secondary); }
.rp-modal-close { width: 34px; height: 34px; border-radius: 50%; border: none; background: var(--gray-100); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--secondary); transition: background 0.2s; }
.rp-modal-close:hover { background: var(--primary); color: white; }
.rp-modal-search { padding: 0 26px 14px; }
.rp-modal-search-inner { display: flex; align-items: center; gap: 8px; border: 1.5px solid var(--border); border-radius: var(--radius-full); padding: 10px 16px; }
.rp-modal-search-inner input { border: none; outline: none; flex: 1; font-size: 0.86rem; font-family: var(--font-body); }
.rp-modal-list { overflow-y: auto; padding: 4px 20px 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.rp-item {
  display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: var(--radius-md);
  border: 1.5px solid var(--border-light); cursor: pointer; transition: border-color 0.2s, background 0.2s;
  text-align: left; background: none;
}
.rp-item:hover { border-color: var(--primary); background: var(--primary-light); }
.rp-item.selected { border-color: var(--primary); background: var(--primary-light); }
.rp-item-img { width: 46px; height: 46px; border-radius: 8px; object-fit: cover; background: var(--gray-100); flex-shrink: 0; }
.rp-item-name { font-size: 0.83rem; font-weight: 600; color: var(--secondary); line-height: 1.25; }
.rp-item-cat { font-size: 0.68rem; color: var(--text-muted); }
.rp-item-check { margin-left: auto; color: var(--primary); flex-shrink: 0; }
.rp-empty { padding: 40px 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem; grid-column: 1 / -1; }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-replace-modal-css")) {
    const s = document.createElement("style");
    s.id = "nahid-replace-modal-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/** perfumes: full catalog; excludeIds: perfumes already in the pack (can't pick a duplicate) */
export default function ReplacePerfumeModal({ perfumes, excludeIds = [], currentPerfumeId, onSelect, onClose }) {
  injectCSS();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return perfumes.filter((p) => {
      if (excludeIds.includes(p.id) && p.id !== currentPerfumeId) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q);
    });
  }, [perfumes, excludeIds, currentPerfumeId, query]);

  return (
    <div className="rp-modal-overlay" onClick={onClose}>
      <div className="rp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rp-modal-header">
          <h3 className="rp-modal-title">{t("replaceModal.title")}</h3>
          <button className="rp-modal-close" onClick={onClose} aria-label={t("replaceModal.close")}><FiX size={16} /></button>
        </div>
        <div className="rp-modal-search">
          <div className="rp-modal-search-inner">
            <FiSearch size={14} color="var(--text-muted)" />
            <input
              placeholder={t("replaceModal.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="rp-modal-list">
          {options.length === 0 && <div className="rp-empty">{t("replaceModal.empty")}</div>}
          {options.map((p) => (
            <button
              key={p.id}
              className={`rp-item${p.id === currentPerfumeId ? " selected" : ""}`}
              onClick={() => onSelect(p)}
            >
              <img className="rp-item-img" src={cldResize(p.image_url, 100) || "/nahid1.png"} alt={p.name} loading="lazy" />
              <div>
                <div className="rp-item-name">{p.name}</div>
                <div className="rp-item-cat">{p.category}{p.gender ? ` · ${p.gender}` : ""}</div>
              </div>
              {p.id === currentPerfumeId && <FiCheck className="rp-item-check" size={16} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
