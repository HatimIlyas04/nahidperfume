import { memo } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";

const CSS = `
.pc-card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: 0 1px 2px rgba(20,16,14,0.04), 0 10px 24px -14px rgba(20,16,14,0.14);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1px 2px rgba(20,16,14,0.05), 0 24px 38px -18px rgba(20,16,14,0.22);
}

/* The catalog photography is already a complete, full-bleed studio shot
   (bottle + styled props filling the whole frame) -- not an isolated
   cutout with empty margins. So the image area is edge-to-edge cover,
   no inner padding, no synthetic background: adding either just shrinks
   an already-finished photo and boxes it in. This is what makes the
   pack read as large/premium instead of "a small photo lost in a card". */
.pc-media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--background);
}
.pc-media img {
  width: 100%; height: 100%; object-fit: cover; object-position: center;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
  display: block;
}
.pc-card:hover .pc-media img { transform: scale(1.05); }

.pc-badge {
  position: absolute; top: 12px; inset-inline-start: 12px;
  background: var(--secondary); color: white;
  padding: 5px 12px; border-radius: var(--radius-full);
  font-size: 0.58rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(20,16,14,0.18);
}
.pc-save {
  position: absolute; top: 12px; inset-inline-start: 12px;
  background: var(--primary); color: white;
  padding: 5px 11px; border-radius: var(--radius-full);
  font-size: 0.62rem; font-weight: 700;
  box-shadow: 0 4px 10px rgba(239,119,106,0.35);
}
.pc-wish {
  position: absolute; top: 10px; inset-inline-end: 10px;
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(255,255,255,0.92); backdrop-filter: blur(6px);
  border: none; display: flex; align-items: center; justify-content: center;
  color: var(--secondary); cursor: pointer; box-shadow: 0 4px 12px rgba(20,16,14,0.14);
  transition: color 0.15s, transform 0.15s;
}
.pc-wish:hover { transform: scale(1.08); }
.pc-wish.active { color: var(--primary); }

.pc-body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.pc-title {
  font-family: var(--font-display); font-size: 1.15rem; font-weight: 500;
  color: var(--secondary); line-height: 1.25; letter-spacing: -0.01em;
  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
}
.pc-desc {
  font-size: 0.78rem; color: var(--text-light); line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  min-height: 2.25em;
}

.pc-included {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--primary-dark);
}
.pc-included-star { font-size: 0.7rem; }

.pc-perfume-list {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 10px;
  list-style: none; margin: 0; padding: 0;
}
.pc-perfume-list li {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.77rem; color: var(--text); line-height: 1.4;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.pc-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--primary); flex-shrink: 0; }

.pc-bottom { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border-light); }
.pc-price-row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.pc-price { font-family: var(--font-display); font-size: 1.35rem; font-weight: 600; color: var(--primary-dark); }
.pc-currency { font-size: 0.64rem; color: var(--text-light); font-weight: 500; }
.pc-compare { font-size: 0.78rem; color: var(--text-muted); text-decoration: line-through; }
.pc-save-pill {
  font-size: 0.64rem; font-weight: 700; color: var(--primary-dark); background: var(--primary-light);
  padding: 2px 8px; border-radius: var(--radius-full); white-space: nowrap; margin-top: 4px; display: inline-block;
}

.pc-cta {
  margin-top: 12px; width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 12px 16px; border-radius: var(--radius-full);
  font-size: 0.82rem; font-weight: 600; letter-spacing: 0.01em;
  background: var(--primary); color: white; border: none; cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(239,119,106,0.5);
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}
.pc-cta:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 10px 22px -6px rgba(239,119,106,0.6); }
.pc-cta svg { transition: transform 0.2s; }
[dir="rtl"] .pc-cta svg { transform: scaleX(-1); }
.pc-cta:hover svg { transform: translateX(3px); }
[dir="rtl"] .pc-cta:hover svg { transform: scaleX(-1) translateX(3px); }

@media (max-width: 480px) {
  .pc-body { padding: 14px 14px 16px; gap: 6px; }
  .pc-title { font-size: 1.05rem; }
  .pc-desc { display: none; }
  .pc-perfume-list { display: none; }
  .pc-price { font-size: 1.2rem; }
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
// its own props actually changed -- see Home.jsx/PacksListing.jsx for the
// matching useCallback on the handlers passed in, which is required for
// memo() here to actually do anything (a new inline function every render
// would defeat it silently).
function PackCard({ pack, badge, priority = false, isWished = false, onToggleWishlist }) {
  injectCSS();
  const { t } = useLanguage();
  const perfumes = pack.perfumes || [];
  const fmt = (n) => Math.round(Number(n)).toLocaleString("fr-MA");
  const BADGE_KEYS = { best_seller: "packCard.bestSeller", new: "packCard.new", limited: "packCard.limited" };
  const badgeLabel = (pack.badge && BADGE_KEYS[pack.badge] && t(BADGE_KEYS[pack.badge]))
    || badge
    || (pack.is_featured ? t("packCard.bestSeller") : null);

  const hasDiscount = pack.compare_at_price && Number(pack.compare_at_price) > Number(pack.price);
  const saveAmount = hasDiscount ? Math.round(Number(pack.compare_at_price) - Number(pack.price)) : 0;

  return (
    <div className="pc-card">
      <Link to={`/packs/${pack.id}`} className="pc-media">
        <img
          src={cldResize(pack.cover_image, 500) || "/nahid1.png"}
          alt={pack.title}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          width="500"
          height="625"
        />
        {badgeLabel && <span className="pc-badge">{badgeLabel}</span>}
        {!badgeLabel && hasDiscount && <span className="pc-save">-{Math.round((1 - Number(pack.price) / Number(pack.compare_at_price)) * 100)}%</span>}
      </Link>
      {onToggleWishlist && (
        <button
          className={`pc-wish${isWished ? " active" : ""}`}
          onClick={(e) => { e.preventDefault(); onToggleWishlist(pack); }}
          aria-label={t("packDetails.wishlist")}
        >
          <FiHeart size={15} fill={isWished ? "currentColor" : "none"} />
        </button>
      )}

      <div className="pc-body">
        <Link to={`/packs/${pack.id}`}>
          <h3 className="pc-title">{pack.title}</h3>
        </Link>
        <p className="pc-desc">{pack.description || " "}</p>

        {perfumes.length > 0 && (
          <>
            <div className="pc-included">
              <span className="pc-included-star">&#10022;</span>
              {perfumes.length} {t("packCard.perfumesCount")}
            </div>
            <ul className="pc-perfume-list">
              {perfumes.slice(0, 4).map((p) => (
                <li key={p.perfume_id || p.id}><span className="pc-dot" />{p.name}</li>
              ))}
            </ul>
          </>
        )}

        <div className="pc-bottom">
          <div className="pc-price-row">
            <span className="pc-price">{fmt(pack.price)}</span>
            <span className="pc-currency">MAD</span>
            {hasDiscount && <span className="pc-compare">{fmt(pack.compare_at_price)} MAD</span>}
          </div>
          {hasDiscount && saveAmount > 0 && (
            <span className="pc-save-pill">{t("packDetails.youSave")} {saveAmount} MAD</span>
          )}
          <Link to={`/packs/${pack.id}`} className="pc-cta">
            {t("packCard.choosePack")} <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(PackCard);
