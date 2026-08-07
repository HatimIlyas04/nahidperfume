import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";

const CSS = `
.pf-modal-overlay {
  position: fixed; inset: 0; background: rgba(26,26,26,0.6);
  backdrop-filter: blur(4px); z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px; animation: fadeIn 0.25s ease;
}
.pf-modal {
  background: var(--white); border-radius: var(--radius-xl);
  max-width: 780px; width: 100%; max-height: 90vh; overflow-y: auto;
  display: grid; grid-template-columns: 1fr 1fr;
  box-shadow: var(--shadow-xl); position: relative;
  animation: fadeUp 0.35s cubic-bezier(0.16,1,0.3,1);
}
.pf-modal-close {
  position: absolute; top: 16px; right: 16px; z-index: 2;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.9); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--secondary); transition: background 0.2s, transform 0.2s;
}
.pf-modal-close:hover { background: var(--primary); color: white; transform: rotate(90deg); }
.pf-modal-media { background: var(--gray-100); min-height: 320px; }
.pf-modal-media img { width: 100%; height: 100%; object-fit: cover; }
.pf-modal-body { padding: 32px; display: flex; flex-direction: column; gap: 16px; }
.pf-modal-title { font-family: var(--font-display); font-size: 1.9rem; font-weight: 500; color: var(--secondary); }
.pf-modal-badges { display: flex; gap: 8px; flex-wrap: wrap; }
.pf-modal-desc { font-size: 0.9rem; color: var(--text-light); line-height: 1.65; }
.pf-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 16px; margin-top: 4px; }
.pf-modal-field-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 2px; }
.pf-modal-field-value { font-size: 0.85rem; color: var(--text); font-weight: 500; }
.pf-modal-notes { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; }
.pf-modal-note-row { display: flex; gap: 10px; align-items: baseline; }
.pf-modal-note-label { font-size: 0.68rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; min-width: 74px; }
.pf-modal-note-value { font-size: 0.83rem; color: var(--text); }
@media (max-width: 680px) {
  .pf-modal { grid-template-columns: 1fr; }
  .pf-modal-media { min-height: 220px; }
}
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-perfume-modal-css")) {
    const s = document.createElement("style");
    s.id = "nahid-perfume-modal-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function PerfumeModal({ perfume, onClose }) {
  injectCSS();
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  if (!perfume) return null;

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pf-modal-close" onClick={onClose} aria-label={t("perfumeModal.close")}>
          <FiX size={18} />
        </button>
        <div className="pf-modal-media">
          <img src={cldResize(perfume.image_url, 500) || "/nahid1.png"} alt={perfume.name} />
        </div>
        <div className="pf-modal-body">
          <h2 className="pf-modal-title">{perfume.name}</h2>
          <div className="pf-modal-badges">
            {perfume.gender && <span className="badge badge-primary">{perfume.gender}</span>}
            {perfume.category && <span className="badge badge-dark">{perfume.category}</span>}
          </div>
          {perfume.description && <p className="pf-modal-desc">{perfume.description}</p>}

          <div className="pf-modal-grid">
            {perfume.concentration && (
              <div>
                <div className="pf-modal-field-label">{t("perfumeModal.concentration")}</div>
                <div className="pf-modal-field-value">{perfume.concentration}</div>
              </div>
            )}
            {perfume.longevity && (
              <div>
                <div className="pf-modal-field-label">{t("perfumeModal.longevity")}</div>
                <div className="pf-modal-field-value">{perfume.longevity}</div>
              </div>
            )}
            {perfume.scent_family && (
              <div>
                <div className="pf-modal-field-label">{t("perfumeModal.scentFamily")}</div>
                <div className="pf-modal-field-value">{perfume.scent_family}</div>
              </div>
            )}
            {perfume.inspired_by && (
              <div>
                <div className="pf-modal-field-label">{t("perfumeModal.inspiration")}</div>
                <div className="pf-modal-field-value">{perfume.inspired_by}</div>
              </div>
            )}
          </div>

          {(perfume.top_notes || perfume.middle_notes || perfume.base_notes) && (
            <div className="pf-modal-notes">
              {perfume.top_notes && (
                <div className="pf-modal-note-row">
                  <span className="pf-modal-note-label">{t("perfumeModal.topNotes")}</span>
                  <span className="pf-modal-note-value">{perfume.top_notes}</span>
                </div>
              )}
              {perfume.middle_notes && (
                <div className="pf-modal-note-row">
                  <span className="pf-modal-note-label">{t("perfumeModal.middleNotes")}</span>
                  <span className="pf-modal-note-value">{perfume.middle_notes}</span>
                </div>
              )}
              {perfume.base_notes && (
                <div className="pf-modal-note-row">
                  <span className="pf-modal-note-label">{t("perfumeModal.baseNotes")}</span>
                  <span className="pf-modal-note-value">{perfume.base_notes}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
