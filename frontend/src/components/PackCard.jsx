import { Link } from "react-router-dom";
import { FiEye, FiSliders, FiShoppingBag } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const CSS = `
.pack-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pack-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}
.pack-card-media {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--gray-100);
}
.pack-card-media img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.pack-card:hover .pack-card-media img { transform: scale(1.05); }
.pack-card-badge {
  position: absolute; top: 10px; left: 10px;
  background: var(--secondary); color: white;
  padding: 4px 10px; border-radius: var(--radius-full);
  font-size: 0.58rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
}
.pack-card-quick {
  position: absolute; top: 10px; right: 10px;
  display: flex; flex-direction: column; gap: 6px;
  opacity: 0; transform: translateX(8px);
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.pack-card:hover .pack-card-quick { opacity: 1; transform: translateX(0); }
.pack-card-quick-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.94); backdrop-filter: blur(6px);
  border: none; display: flex; align-items: center; justify-content: center;
  color: var(--secondary); cursor: pointer; box-shadow: var(--shadow-sm);
  transition: background 0.15s, color 0.15s, transform 0.15s;
}
.pack-card-quick-btn:hover { background: var(--primary); color: white; transform: scale(1.08); }
.pack-card-body { padding: 14px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
.pack-card-title {
  font-family: var(--font-display); font-size: clamp(0.95rem, 2.4vw, 1.12rem); font-weight: 500;
  color: var(--secondary); line-height: 1.25;
}
.pack-card-desc {
  font-size: 0.76rem; color: var(--text-light); line-height: 1.45;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.pack-card-thumbs { display: flex; gap: 5px; margin-top: 1px; }
.pack-card-thumb {
  width: 30px; height: 30px; border-radius: 8px; overflow: hidden;
  border: 1.5px solid var(--border-light); background: var(--gray-100); flex-shrink: 0;
}
.pack-card-thumb img { width: 100%; height: 100%; object-fit: cover; }
.pack-card-price-row {
  display: flex; align-items: baseline; gap: 6px; margin-top: auto; padding-top: 4px;
}
.pack-card-price { font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; color: var(--secondary); }
.pack-card-compare { font-size: 0.74rem; color: var(--text-muted); text-decoration: line-through; }
.pack-card-currency { font-size: 0.66rem; color: var(--text-light); }
.pack-card-actions { display: flex; gap: 6px; margin-top: 6px; }
.pack-card-btn {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  padding: 8px 8px; border-radius: var(--radius-full);
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.01em;
  cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s; border: none; white-space: nowrap;
}
.pack-card-btn-primary { background: var(--primary); color: white; }
.pack-card-btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); }
.pack-card-btn-outline { background: transparent; color: var(--secondary); border: 1.5px solid var(--border); }
.pack-card-btn-outline:hover { border-color: var(--secondary); background: var(--secondary); color: white; }

@media (max-width: 480px) {
  .pack-card-body { padding: 10px; gap: 4px; }
  .pack-card-desc, .pack-card-thumbs { display: none; }
  .pack-card-title { font-size: 0.86rem; }
  .pack-card-price { font-size: 1rem; }
  .pack-card-btn { padding: 7px 6px; font-size: 0.6rem; }
  .pack-card-btn span { display: none; }
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

export default function PackCard({ pack, onAddToCart, onCustomize, badge }) {
  injectCSS();
  const { t } = useLanguage();
  const perfumes = pack.perfumes || [];
  const fmt = (n) => Math.round(Number(n)).toLocaleString("fr-MA");
  const BADGE_KEYS = { best_seller: "packCard.bestSeller", new: "packCard.new", limited: "packCard.limited" };
  const badgeLabel = (pack.badge && BADGE_KEYS[pack.badge] && t(BADGE_KEYS[pack.badge]))
    || badge
    || (pack.is_featured ? t("packCard.bestSeller") : null);

  return (
    <div className="pack-card">
      <Link to={`/packs/${pack.id}`} className="pack-card-media">
        <img src={pack.cover_image || "/nahid1.png"} alt={pack.title} loading="lazy" />
        {badgeLabel && <span className="pack-card-badge">{badgeLabel}</span>}
        <div className="pack-card-quick" onClick={(e) => e.preventDefault()}>
          <button
            className="pack-card-quick-btn"
            aria-label={t("packCard.customize")}
            onClick={() => onCustomize?.(pack)}
            title={t("packCard.customize")}
          >
            <FiSliders size={15} />
          </button>
        </div>
      </Link>

      <div className="pack-card-body">
        <Link to={`/packs/${pack.id}`}>
          <h3 className="pack-card-title">{pack.title}</h3>
        </Link>
        {pack.description && <p className="pack-card-desc">{pack.description}</p>}

        {perfumes.length > 0 && (
          <div className="pack-card-thumbs">
            {perfumes.slice(0, 4).map((p) => (
              <div className="pack-card-thumb" key={p.perfume_id || p.id}>
                <img src={p.image_url} alt={p.name} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="pack-card-price-row">
          <span className="pack-card-price">{fmt(pack.price)}</span>
          <span className="pack-card-currency">MAD</span>
          {pack.compare_at_price && Number(pack.compare_at_price) > Number(pack.price) && (
            <span className="pack-card-compare">{fmt(pack.compare_at_price)} MAD</span>
          )}
        </div>

        <div className="pack-card-actions">
          <Link to={`/packs/${pack.id}`} className="pack-card-btn pack-card-btn-outline">
            <FiEye size={13} /> <span>{t("packCard.details")}</span>
          </Link>
          <button className="pack-card-btn pack-card-btn-primary" onClick={() => onAddToCart?.(pack)}>
            <FiShoppingBag size={13} /> <span>{t("packCard.addToCart")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
