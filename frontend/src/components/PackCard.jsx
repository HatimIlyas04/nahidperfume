import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";

const CSS = `
.pc-card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: 0 1px 2px rgba(20,16,14,0.04), 0 14px 32px -16px rgba(20,16,14,0.16);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pc-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 1px 2px rgba(20,16,14,0.05), 0 28px 44px -18px rgba(20,16,14,0.22);
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

.pc-body { padding: 22px 22px 22px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
.pc-title {
  font-family: var(--font-display); font-size: 1.34rem; font-weight: 500;
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

.pc-bottom { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-light); }
.pc-price-row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.pc-price { font-family: var(--font-display); font-size: 1.55rem; font-weight: 600; color: var(--primary-dark); }
.pc-currency { font-size: 0.66rem; color: var(--text-light); font-weight: 500; }
.pc-compare { font-size: 0.8rem; color: var(--text-muted); text-decoration: line-through; }
.pc-save-pill {
  font-size: 0.65rem; font-weight: 700; color: var(--primary-dark); background: var(--primary-light);
  padding: 2px 8px; border-radius: var(--radius-full); white-space: nowrap; margin-top: 5px; display: inline-block;
}

/* Three distinct actions: "Commander" is a direct buy-now (skips the cart
   page entirely, see Checkout.jsx buyNowItem), the bag icon quick-adds to
   the persisted cart for later, and "Détails du pack" opens the PDP. Two
   rows keeps each tap target legible even on the narrow 2-up mobile grid. */
.pc-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
.pc-btn-buy {
  width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 13px 14px; border-radius: var(--radius-full);
  font-size: 0.82rem; font-weight: 600; letter-spacing: 0.01em; white-space: nowrap;
  background: var(--primary); color: white; border: none; cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(239,119,106,0.5);
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}
.pc-btn-buy:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 10px 22px -6px rgba(239,119,106,0.6); }

.pc-actions-row2 { display: flex; gap: 8px; }
.pc-btn-icon {
  width: 44px; height: 44px; flex-shrink: 0; border-radius: var(--radius-full);
  border: 1.5px solid var(--border); background: white; color: var(--secondary);
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.pc-btn-icon:hover { border-color: var(--secondary); background: var(--secondary); color: white; }
.pc-btn-details {
  flex: 1; min-width: 0; display: inline-flex; align-items: center; justify-content: center;
  padding: 0 10px; border-radius: var(--radius-full);
  font-size: 0.8rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  background: white; color: var(--secondary); border: 1.5px solid var(--border);
  cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.pc-btn-details:hover { border-color: var(--secondary); background: var(--secondary); color: white; }

@media (max-width: 640px) {
  .pc-body { padding: 16px 16px 18px; gap: 7px; }
  .pc-title { font-size: 1.1rem; }
  .pc-desc { display: none; }
  .pc-perfume-list { display: none; }
  .pc-price { font-size: 1.25rem; }
  .pc-actions { gap: 6px; margin-top: 12px; }
  .pc-btn-buy { padding: 11px 10px; font-size: 0.76rem; }
  .pc-btn-icon { width: 38px; height: 38px; }
  .pc-btn-details { font-size: 0.72rem; padding: 0 6px; }
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
function PackCard({ pack, badge, priority = false, isWished = false, onToggleWishlist, onAddToCart, onOrderNow }) {
  injectCSS();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const perfumes = pack.perfumes || [];
  const fmt = (n) => Math.round(Number(n)).toLocaleString("fr-MA");
  const BADGE_KEYS = { best_seller: "packCard.bestSeller", new: "packCard.new", limited: "packCard.limited" };
  const badgeLabel = (pack.badge && BADGE_KEYS[pack.badge] && t(BADGE_KEYS[pack.badge]))
    || badge
    || (pack.is_featured ? t("packCard.bestSeller") : null);

  const hasDiscount = pack.compare_at_price && Number(pack.compare_at_price) > Number(pack.price);
  const saveAmount = hasDiscount ? Math.round(Number(pack.compare_at_price) - Number(pack.price)) : 0;

  const handleBuyNow = () => {
    // On the homepage, onOrderNow selects the pack into the inline direct
    // order form instead of navigating away (see Home.jsx) -- everywhere
    // else (PacksListing, PackDetails, Wishlist), this prop isn't passed,
    // so "Commander" keeps navigating to /checkout exactly as before.
    if (onOrderNow) {
      onOrderNow(pack);
      return;
    }
    navigate("/checkout", {
      state: {
        buyNowItem: {
          cartItemId: `ready_${pack.id}_buynow_${Date.now()}`,
          item_type: "ready_pack",
          pack_id: pack.id,
          title: pack.title,
          image: pack.cover_image,
          price: Number(pack.price),
          quantity: 1,
          perfumes: perfumes.map((p) => ({ perfume_id: p.perfume_id || p.id, name: p.name, image_url: p.image_url })),
        },
      },
    });
  };

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
          <div className="pc-actions">
            <button className="pc-btn-buy" onClick={handleBuyNow}>
              <FiCreditCard size={14} /> {t("packCard.order")}
            </button>
            <div className="pc-actions-row2">
              <button
                className="pc-btn-icon"
                onClick={() => onAddToCart?.(pack)}
                aria-label={t("packCard.addToCart")}
                title={t("packCard.addToCart")}
              >
                <FiShoppingBag size={16} />
              </button>
              <Link to={`/packs/${pack.id}`} className="pc-btn-details">
                {t("packCard.viewDetails")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PackCard);
