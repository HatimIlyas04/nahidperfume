import { memo } from "react";
import { Link } from "react-router-dom";
import { FiSliders, FiShoppingBag } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";

const CSS = `
.pack-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pack-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--border);
}

/* Image sits in a bounded, padded area — never fills/dominates the card.
   object-fit: contain preserves the bottle's real proportions instead of
   cropping it, and the neutral background keeps the product looking like
   a considered product shot rather than a stretched thumbnail. */
.pack-card-media {
  position: relative;
  height: 220px;
  background: linear-gradient(180deg, var(--background) 0%, var(--gray-100) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}
.pack-card-media img {
  width: 100%; height: 100%; object-fit: contain;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.pack-card:hover .pack-card-media img { transform: scale(1.04); }

.pack-card-badge {
  position: absolute; top: 12px; inset-inline-start: 12px;
  background: var(--secondary); color: white;
  padding: 4px 11px; border-radius: var(--radius-full);
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
}
.pack-card-save {
  position: absolute; top: 12px; inset-inline-end: 12px;
  background: var(--primary-light); color: var(--primary-dark);
  padding: 4px 10px; border-radius: var(--radius-full);
  font-size: 0.6rem; font-weight: 700;
}
.pack-card-quick {
  position: absolute; bottom: 12px; inset-inline-end: 12px;
  opacity: 0; transform: translateY(6px);
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.pack-card:hover .pack-card-quick, .pack-card:focus-within .pack-card-quick { opacity: 1; transform: translateY(0); }
.pack-card-quick-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.95); backdrop-filter: blur(6px);
  border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: center;
  color: var(--secondary); cursor: pointer; box-shadow: var(--shadow-sm);
  transition: background 0.15s, color 0.15s, transform 0.15s;
}
.pack-card-quick-btn:hover { background: var(--primary); border-color: var(--primary); color: white; transform: scale(1.08); }

.pack-card-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.pack-card-title {
  font-family: var(--font-display); font-size: 1.15rem; font-weight: 500;
  color: var(--secondary); line-height: 1.25;
  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
}
.pack-card-desc {
  font-size: 0.78rem; color: var(--text-light); line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  min-height: 2.2em;
}

/* Compact "what's inside" row — small overlapping circles read as a
   considered set, not a cluttered list of thumbnails. */
.pack-card-thumbs { display: flex; align-items: center; gap: 0; margin-top: 2px; }
.pack-card-thumb {
  width: 30px; height: 30px; border-radius: 50%; overflow: hidden;
  border: 2px solid var(--white); background: var(--gray-100); flex-shrink: 0;
  box-shadow: 0 0 0 1px var(--border-light);
  margin-inline-start: -8px;
}
.pack-card-thumb:first-child { margin-inline-start: 0; }
.pack-card-thumb img { width: 100%; height: 100%; object-fit: cover; }
.pack-card-thumbs-label { font-size: 0.68rem; color: var(--text-muted); margin-inline-start: 8px; }

.pack-card-price-row {
  display: flex; align-items: baseline; gap: 7px; margin-top: auto; padding-top: 10px;
}
.pack-card-price { font-family: var(--font-display); font-size: 1.3rem; font-weight: 600; color: var(--secondary); }
.pack-card-currency { font-size: 0.68rem; color: var(--text-light); }
.pack-card-compare { font-size: 0.76rem; color: var(--text-muted); text-decoration: line-through; }

.pack-card-actions { display: flex; gap: 8px; margin-top: 10px; }
.pack-card-btn-view {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 11px 14px; border-radius: var(--radius-full);
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.01em;
  cursor: pointer; transition: background 0.15s, transform 0.15s; border: none; white-space: nowrap;
  background: var(--secondary); color: white;
}
.pack-card-btn-view:hover { background: var(--primary-dark); transform: translateY(-1px); }
.pack-card-btn-add {
  width: 42px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full); border: 1.5px solid var(--border); background: white;
  color: var(--secondary); cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.pack-card-btn-add:hover { border-color: var(--primary); background: var(--primary-light); color: var(--primary-dark); }

@media (max-width: 480px) {
  .pack-card-media { height: 168px; padding: 14px; }
  .pack-card-body { padding: 13px; gap: 6px; }
  .pack-card-title { font-size: 1rem; }
  .pack-card-desc { display: none; }
  .pack-card-price { font-size: 1.12rem; }
}
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-pack-card-css")) {
    const s = document.createElement("style");
    s.id = "nahid-pack-card-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

// Grids render 4-8+ of these at once; memoized so a parent re-render
// (e.g. cart count changing elsewhere) doesn't re-render every card unless
// its own props actually changed — see Home.jsx/PacksListing.jsx for the
// matching useCallback on the handlers passed in, which is required for
// memo() here to actually do anything (a new inline function every render
// would defeat it silently).
function PackCard({ pack, onAddToCart, onCustomize, badge, priority = false }) {
  injectCSS();
  const { t } = useLanguage();
  const perfumes = pack.perfumes || [];
  const fmt = (n) => Math.round(Number(n)).toLocaleString("fr-MA");
  const BADGE_KEYS = { best_seller: "packCard.bestSeller", new: "packCard.new", limited: "packCard.limited" };
  const badgeLabel = (pack.badge && BADGE_KEYS[pack.badge] && t(BADGE_KEYS[pack.badge]))
    || badge
    || (pack.is_featured ? t("packCard.bestSeller") : null);

  const hasDiscount = pack.compare_at_price && Number(pack.compare_at_price) > Number(pack.price);
  const savePercent = hasDiscount
    ? Math.round((1 - Number(pack.price) / Number(pack.compare_at_price)) * 100)
    : 0;

  return (
    <div className="pack-card">
      <Link to={`/packs/${pack.id}`} className="pack-card-media">
        <img
          src={cldResize(pack.cover_image, 400) || "/nahid1.png"}
          alt={pack.title}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          width="400"
          height="400"
        />
        {badgeLabel && <span className="pack-card-badge">{badgeLabel}</span>}
        {!badgeLabel && hasDiscount && savePercent > 0 && (
          <span className="pack-card-save">-{savePercent}%</span>
        )}
        <div className="pack-card-quick" onClick={(e) => e.preventDefault()}>
          <button
            className="pack-card-quick-btn"
            aria-label={t("packCard.customize")}
            onClick={() => onCustomize?.(pack)}
            title={t("packCard.customize")}
          >
            <FiSliders size={14} />
          </button>
        </div>
      </Link>

      <div className="pack-card-body">
        <Link to={`/packs/${pack.id}`}>
          <h3 className="pack-card-title">{pack.title}</h3>
        </Link>
        <p className="pack-card-desc">{pack.description || " "}</p>

        {perfumes.length > 0 && (
          <div className="pack-card-thumbs">
            {perfumes.slice(0, 4).map((p) => (
              <div className="pack-card-thumb" key={p.perfume_id || p.id}>
                <img src={cldResize(p.image_url, 60)} alt={p.name} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="pack-card-price-row">
          <span className="pack-card-price">{fmt(pack.price)}</span>
          <span className="pack-card-currency">MAD</span>
          {hasDiscount && <span className="pack-card-compare">{fmt(pack.compare_at_price)} MAD</span>}
        </div>

        <div className="pack-card-actions">
          <Link to={`/packs/${pack.id}`} className="pack-card-btn-view">
            {t("packCard.details")}
          </Link>
          <button className="pack-card-btn-add" onClick={() => onAddToCart?.(pack)} aria-label={t("packCard.addToCart")} title={t("packCard.addToCart")}>
            <FiShoppingBag size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(PackCard);
