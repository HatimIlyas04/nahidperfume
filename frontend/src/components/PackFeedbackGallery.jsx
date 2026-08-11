import { useEffect, useRef, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";

const VISIBLE_LIMIT = 6;

const CSS = `
.pfg-wrap { padding: 8px 0; }
.pfg-head { text-align: center; margin-bottom: 28px; }
.pfg-eyebrow { display: inline-block; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; }
.pfg-title { font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 500; color: var(--secondary); margin-bottom: 10px; }
.pfg-trust { font-size: 0.88rem; color: var(--text-light); max-width: 480px; margin: 0 auto; }

.pfg-single { max-width: 420px; margin: 0 auto; }
.pfg-single img { width: 100%; height: auto; display: block; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); cursor: pointer; }

.pfg-grid { column-count: 3; column-gap: 16px; }
@media (max-width: 900px) { .pfg-grid { column-count: 2; } }
@media (max-width: 560px) { .pfg-grid { column-count: 1; } }
.pfg-item { break-inside: avoid; margin-bottom: 16px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease; }
.pfg-item:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.pfg-item img { width: 100%; height: auto; display: block; object-fit: contain; }

.pfg-more-row { text-align: center; margin-top: 22px; }
.pfg-more-btn { background: none; border: 1.5px solid var(--border); color: var(--secondary); padding: 11px 28px; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: var(--transition); }
.pfg-more-btn:hover { border-color: var(--primary); color: var(--primary); }

.pfg-lightbox { position: fixed; inset: 0; background: rgba(10,10,10,0.94); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.25s ease; }
.pfg-lightbox-img { max-width: 92vw; max-height: 86vh; object-fit: contain; border-radius: 6px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); animation: fadeUp 0.3s cubic-bezier(0.16,1,0.3,1); user-select: none; }
.pfg-lightbox-close { position: absolute; top: 20px; inset-inline-end: 20px; width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,0.12); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
.pfg-lightbox-close:hover { background: rgba(255,255,255,0.25); }
.pfg-lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 46px; height: 46px; border-radius: 50%; background: rgba(255,255,255,0.12); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
.pfg-lightbox-nav:hover { background: rgba(255,255,255,0.25); }
.pfg-lightbox-prev { inset-inline-start: 20px; }
.pfg-lightbox-next { inset-inline-end: 20px; }
[dir="rtl"] .pfg-lightbox-prev { transform: translateY(-50%) scaleX(-1); }
[dir="rtl"] .pfg-lightbox-next { transform: translateY(-50%) scaleX(-1); }
.pfg-lightbox-counter { position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.7); font-size: 0.8rem; }
@media (max-width: 600px) {
  .pfg-lightbox-nav { width: 38px; height: 38px; }
  .pfg-lightbox-prev { inset-inline-start: 6px; }
  .pfg-lightbox-next { inset-inline-end: 6px; }
}
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-pack-feedback-gallery-css")) {
    const s = document.createElement("style");
    s.id = "nahid-pack-feedback-gallery-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

function Lightbox({ images, index, onClose, onNavigate }) {
  const touchStartX = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNavigate]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) onNavigate(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  const img = images[index];

  return (
    <div className="pfg-lightbox" onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="pfg-lightbox-close" onClick={onClose} aria-label="Fermer"><FiX size={20} /></button>
      {images.length > 1 && (
        <>
          <button className="pfg-lightbox-nav pfg-lightbox-prev" onClick={(e) => { e.stopPropagation(); onNavigate(-1); }} aria-label="Précédent"><FiChevronLeft size={20} /></button>
          <button className="pfg-lightbox-nav pfg-lightbox-next" onClick={(e) => { e.stopPropagation(); onNavigate(1); }} aria-label="Suivant"><FiChevronRight size={20} /></button>
        </>
      )}
      <img
        className="pfg-lightbox-img"
        src={cldResize(img.image_url, 1400)}
        alt=""
        onClick={(e) => e.stopPropagation()}
      />
      {images.length > 1 && <div className="pfg-lightbox-counter">{index + 1} / {images.length}</div>}
    </div>
  );
}

/** Renders nothing if there are no images -- never an empty section. */
export default function PackFeedbackGallery({ images }) {
  injectCSS();
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!Array.isArray(images) || images.length === 0) return null;

  const visible = showAll ? images : images.slice(0, VISIBLE_LIMIT);
  const hasMore = !showAll && images.length > VISIBLE_LIMIT;

  const navigate = (delta) => {
    setLightboxIndex((i) => (i + delta + images.length) % images.length);
  };

  return (
    <section className="pfg-wrap">
      <div className="container">
        <div className="pfg-head">
          <span className="pfg-eyebrow">{t("packFeedback.eyebrow")}</span>
          <h2 className="pfg-title">{t("packFeedback.title")}</h2>
          <p className="pfg-trust">{t("packFeedback.trustMessage")}</p>
        </div>

        {images.length === 1 ? (
          <div className="pfg-single">
            <img
              src={cldResize(images[0].image_url, 700)}
              alt=""
              loading="lazy"
              onClick={() => setLightboxIndex(0)}
            />
          </div>
        ) : (
          <div className="pfg-grid">
            {visible.map((img, i) => (
              <div className="pfg-item" key={img.id} onClick={() => setLightboxIndex(i)}>
                <img src={cldResize(img.image_url, 500)} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="pfg-more-row">
            <button className="pfg-more-btn" onClick={() => setShowAll(true)}>{t("packFeedback.seeAll")}</button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigate}
        />
      )}
    </section>
  );
}
