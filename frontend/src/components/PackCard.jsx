import { memo } from "react";
import { Link } from "react-router-dom";
import { FiSliders, FiShoppingBag } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";

const CSS = `
.pack-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: 0 1px 2px rgba(20,16,14,0.04), 0 12px 28px -14px rgba(20,16,14,0.14);
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pack-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 1px 2px rgba(20,16,14,0.05), 0 28px 44px -18px rgba(20,16,14,0.22);
}

/* Image sits in a boutique-style "studio" panel — soft radial light and a
   grounding shadow under the bottle, so it reads like considered product
   photography rather than a flat cropped thumbnail. object-fit: contain
   keeps the bottle's real proportions; it never fills/dominates the card. */
.pack-card-media {
  position: relative;
  height: 236px;
  background:
    radial-gradient(ellipse 60% 42% at 50% 78%, rgba(20,16,14,0.10) 0%, rgba(20,16,14,0) 72%),
    radial-gradient(ellipse 120% 90% at 50% 8%, #FFFFFF 0%, var(--background) 55%, #F0EDE9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 26px;
}
.pack-card-media img {
  width: 100%; height: 100%; object-fit: contain;
  filter: drop-shadow(0 14px 18px rgba(20,16,14,0.14));
  transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
}
.pack-card:hover .pack-card-media img { transform: scale(1.045) translateY(-2px); }

.pack-card-badge {
  position: absolute; top: 14px; inset-inline-start: 14px;
  background: var(--secondary); color: white;
  padding: 5px 12px; border-radius: var(--radius-full);
  font-size: 0.58rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(20,16,14,0.18);
}
.pack-card-save {
  position: absolute; top: 14px; inset-inline-end: 14px;
  background: var(--primary); color: white;
  padding: 5px 11px; border-radius: var(--radius-full);
  font-size: 0.6rem; font-weight: 700;
  box-shadow: 0 4px 10px rgba(239,119,106,0.35);
}
.pack-card-quick {
  position: absolute; bottom: 14px; inset-inline-end: 14px;
  opacity: 0; transform: translateY(6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.pack-card:hover .pack-card-quick, .pack-card:focus-within .pack-card-quick { opacity: 1; transform: translateY(0); }
.pack-card-quick-btn {
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(255,255,255,0.96); backdrop-filter: blur(6px);
  border: 1px solid rgba(20,16,14,0.06); display: flex; align-items: center; justify-content: center;
  color: var(--secondary); cursor: pointer; box-shadow: 0 4px 12px rgba(20,16,14,0.14);
  transition: background 0.15s, color 0.15s, transform 0.15s;
}
.pack-card-quick-btn:hover { background: var(--primary); border-color: var(--primary); color: white; transform: scale(1.08); }

.pack-card-body { padding: 20px 18px 18px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
.pack-card-title {
  font-family: var(--font-display); font-size: 1.22rem; font-weight: 500;
  color: var(--secondary); line-height: 1.25; letter-spacing: -0.01em;
  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
}
.pack-card-desc {
  font-size: 0.79rem; color: var(--text-light); line-height: 1.55;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  min-height: 2.3em;
}

/* "What's inside" — a clean, non-overlapping row of soft-square thumbnails
   reads as a considered set of 4 rather than a cluttered stack. */
.pack-card-thumbs { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
.pack-card-thumb {
  width: 32px; height: 32px; border-radius: 9px; overflow: hidden;
  background: var(--background); border: 1px solid var(--border-light); flex-shrink: 0;
}
.pack-card-thumb img { width: 100%; height: 100%; object-fit: cover; }
.pack-card-thumbs-count { font-size: 0.68rem; color: var(--text-muted); margin-inline-start: 2px; white-space: nowrap; }

.pack-card-divider { height: 1px; background: var(--border-light); margin: 2px 0; }

.pack-card-price-row {
  display: flex; align-items: baseline; gap: 8px; margin-top: auto; padding-top: 2px;
}
.pack-card-price { font-family: var(--font-display); font-size: 1.4rem; font-weight: 600; color: var(--primary-dark); }
.pack-card-currency { font-size: 0.66rem; color: var(--text-light); font-weight: 500; }
.pack-card-compare { font-size: 0.78rem; color: var(--text-muted); text-decoration: line-through; }

.pack-card-actions { display: flex; gap: 8px; margin-top: 12px; }
.pack-card-btn-view {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 12px 14px; border-radius: var(--radius-full);
  font-size: 0.79rem; font-weight: 600; letter-spacing: 0.01em;
  cursor: pointer; transition: background 0.2s, box-shadow 0.2s, transform 0.15s; border: none; white-space: nowrap;
  background: var(--primary); color: white;
  box-shadow: 0 8px 18px -6px rgba(239,119,106,0.5);
}
.pack-card-btn-view:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 10px 22px -6px rgba(239,119,106,0.6); }
.pack-card-btn-add {
  width: 44px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full); border: 1.5px solid var(--border); background: white;
  color: var(--secondary); cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.pack-card-btn-add:hover { border-color: var(--secondary); background: var(--secondary); color: white; }

@media (max-width: 480px) {
  .pack-card-media { height: 192px; padding: 18px; }
  .pack-card-body { padding: 15px 14px 14px; gap: 7px; }
  .pack-card-title { font-size: 1.05rem; }
  .pack-card-desc { display: none; }
  .pack-card-price { font-size: 1.2rem; }
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
            <span className="pack-card-thumbs-count">{perfumes.length} {t("packCard.perfumesCount")}</span>
          </div>
        )}

        <div className="pack-card-divider" />

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
