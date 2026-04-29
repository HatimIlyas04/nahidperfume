import { useState, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Inject styles once ──────────────────────────────── */
const CARD_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --pc-ink:         #0E0E0C;
    --pc-cream:       #FAF8F5;
    --pc-sand:        #EDE9E1;
    --pc-white:       #FFFFFF;
    --pc-coral:       #EF776A;
    --pc-coral-dk:    #D35F52;
    --pc-gold:        #C9A96E;
    --pc-gold-lt:     #F0E2C4;
    --pc-muted:       #7A7770;
    --pc-border:      rgba(14,14,12,0.08);
    --pc-sans:        'Poppins', sans-serif;
    --pc-serif:       'Cormorant Garamond', Georgia, serif;
    --pc-ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --pc-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Keyframes ── */
  @keyframes pcAddPop   { 0%{transform:scale(1);}  40%{transform:scale(1.3);}  100%{transform:scale(1);} }
  @keyframes pcCheckIn  { from{stroke-dashoffset:24;} to{stroke-dashoffset:0;} }
  @keyframes pcRipple   { from{transform:scale(0);opacity:0.5;} to{transform:scale(4);opacity:0;} }
  @keyframes pcBadgeIn  { from{opacity:0;transform:translateY(-8px) scale(0.8);} to{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes pcSlideUp  { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
  @keyframes pcGlow     { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);}  50%{box-shadow:0 0 0 6px rgba(239,119,106,0.15);} }
  @keyframes pcShimmer  { from{background-position:200% 0;} to{background-position:-200% 0;} }
  @keyframes pcSpin     { to{transform:rotate(360deg);} }
  @keyframes pcFloat    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
  @keyframes pcWishHeart{ 0%{transform:scale(1);}  30%{transform:scale(1.4);}  60%{transform:scale(0.9);}  100%{transform:scale(1);} }

  /* ── Card Base ── */
  .pc-wrap {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    background: var(--pc-white);
    border: 1px solid var(--pc-border);
    transition:
      transform   0.45s var(--pc-spring),
      box-shadow  0.45s var(--pc-ease),
      border-color 0.3s;
    cursor: pointer;
    font-family: var(--pc-sans);
    will-change: transform;
  }
  .pc-wrap:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 28px 64px rgba(14,14,12,0.14), 0 4px 16px rgba(14,14,12,0.06);
    border-color: transparent;
  }
  .pc-wrap:active { transform: translateY(-6px) scale(0.995); }

  /* ── Image Block ── */
  .pc-img-block {
    position: relative;
    overflow: hidden;
    aspect-ratio: 3/4;
    background: var(--pc-cream);
    display: block;
    text-decoration: none;
  }

  .pc-img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.7s var(--pc-ease), filter 0.5s;
    display: block;
    filter: brightness(0.97);
  }
  .pc-wrap:hover .pc-img {
    transform: scale(1.08);
    filter: brightness(1.03);
  }

  /* Overlay gradient */
  .pc-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(14,14,12,0.55) 0%,
      rgba(14,14,12,0.15) 40%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s var(--pc-ease);
    pointer-events: none;
  }
  .pc-wrap:hover .pc-img-overlay { opacity: 1; }

  /* ── Top badges ── */
  .pc-badges {
    position: absolute;
    top: 12px; left: 12px;
    display: flex; flex-direction: column; gap: 6px;
    z-index: 3;
  }
  .pc-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: 999px;
    font-family: var(--pc-sans);
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    animation: pcBadgeIn 0.4s var(--pc-spring) both;
  }
  .pc-badge-low  { background: rgba(255,255,255,0.92); color: var(--pc-coral); border: 1px solid rgba(239,119,106,0.25); }
  .pc-badge-out  { background: var(--pc-ink); color: white; }
  .pc-badge-new  { background: linear-gradient(135deg, var(--pc-gold), #B8922A); color: white; box-shadow: 0 3px 10px rgba(201,169,110,0.4); }
  .pc-badge-dot  { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
  .pc-badge-low .pc-badge-dot  { background: var(--pc-coral); animation: pcGlow 1.5s ease infinite; }
  .pc-badge-new .pc-badge-dot  { background: rgba(255,255,255,0.8); }

  /* Wishlist btn */
  .pc-wish {
    position: absolute;
    top: 12px; right: 12px;
    z-index: 4;
    width: 36px; height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    color: var(--pc-muted);
    font-size: 1rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    transform: translateY(-4px) scale(0.85);
    transition: opacity 0.3s, transform 0.3s var(--pc-spring), color 0.2s, background 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  .pc-wrap:hover .pc-wish { opacity: 1; transform: translateY(0) scale(1); }
  .pc-wish:hover { background: white; color: var(--pc-coral); transform: scale(1.1) !important; }
  .pc-wish.active { color: var(--pc-coral); background: #FFF0EE; }
  .pc-wish.active svg { animation: pcWishHeart 0.4s var(--pc-spring) both; }

  /* ── Quick-add overlay ── */
  .pc-quick-add {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 16px 14px 14px;
    background: linear-gradient(to top, rgba(14,14,12,0.6) 0%, transparent 100%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.38s var(--pc-spring), opacity 0.3s;
    z-index: 4;
  }
  .pc-wrap:hover .pc-quick-add {
    transform: translateY(0);
    opacity: 1;
  }

  .pc-quick-btn {
    width: 100%;
    padding: 11px 16px;
    border-radius: 999px;
    border: none;
    background: white;
    color: var(--pc-ink);
    font-family: var(--pc-sans);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s var(--pc-spring), box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  .pc-quick-btn:hover {
    background: var(--pc-coral);
    color: white;
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(239,119,106,0.4);
  }
  .pc-quick-btn.added {
    background: #1B5E20 !important;
    color: white !important;
  }
  .pc-quick-btn.added .pc-btn-check {
    animation: pcCheckIn 0.3s var(--pc-ease) both;
  }
  .pc-btn-check {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
  }

  /* Ripple on click */
  .pc-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    width: 10px; height: 10px;
    margin-top: -5px; margin-left: -5px;
    animation: pcRipple 0.5s var(--pc-ease) forwards;
    pointer-events: none;
  }

  /* ── Content Block ── */
  .pc-content { padding: 16px 16px 18px; }

  .pc-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .pc-category {
    font-family: var(--pc-sans);
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--pc-coral);
  }
  .pc-stars {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.6rem;
    color: var(--pc-gold);
    font-weight: 700;
  }
  .pc-stars span { color: var(--pc-muted); font-size: 0.58rem; font-weight: 500; }

  .pc-name {
    font-family: var(--pc-sans);
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--pc-ink);
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin-bottom: 6px;
    text-decoration: none;
    display: block;
    transition: color 0.2s;
  }
  .pc-name:hover { color: var(--pc-coral); }

  .pc-desc {
    font-family: var(--pc-sans);
    font-size: 0.72rem;
    font-weight: 400;
    color: var(--pc-muted);
    line-height: 1.6;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Scent tags */
  .pc-scent-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .pc-scent-tag {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    background: var(--pc-cream);
    border: 1px solid var(--pc-border);
    border-radius: 999px;
    padding: 3px 9px;
    font-family: var(--pc-sans);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--pc-muted);
    transition: border-color 0.2s, color 0.2s;
  }
  .pc-wrap:hover .pc-scent-tag { border-color: rgba(239,119,106,0.2); color: var(--pc-ink); }

  /* Footer: price + add btn */
  .pc-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .pc-price-block { display: flex; flex-direction: column; gap: 1px; }
  .pc-price {
    font-family: var(--pc-serif);
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--pc-ink);
    letter-spacing: -0.01em;
    line-height: 1;
  }
  .pc-price-currency {
    font-family: var(--pc-sans);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--pc-muted);
    margin-left: 3px;
  }
  .pc-price-sub {
    font-family: var(--pc-sans);
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--pc-muted);
    letter-spacing: 0.04em;
    opacity: 0.7;
  }

  /* Add button */
  .pc-add-btn {
    position: relative;
    width: 40px; height: 40px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--pc-coral), var(--pc-coral-dk));
    color: white;
    font-size: 1.3rem;
    font-weight: 300;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: transform 0.2s var(--pc-spring), box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(239,119,106,0.35);
    flex-shrink: 0;
    overflow: hidden;
    font-family: var(--pc-sans);
  }
  .pc-add-btn:hover {
    transform: scale(1.15) rotate(90deg);
    box-shadow: 0 8px 24px rgba(239,119,106,0.5);
  }
  .pc-add-btn:active { transform: scale(0.95) rotate(90deg); }
  .pc-add-btn.added {
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    box-shadow: 0 4px 14px rgba(46,125,50,0.35);
    animation: pcAddPop 0.4s var(--pc-spring) both;
  }
  .pc-add-btn.added:hover { transform: scale(1.1); }
  .pc-add-btn svg { pointer-events: none; }

  .pc-out-label {
    font-family: var(--pc-sans);
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--pc-muted);
    letter-spacing: 0.06em;
    font-style: italic;
  }

  /* ── Volume selector (size pills) ── */
  .pc-volumes {
    display: flex;
    gap: 5px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }
  .pc-vol-pill {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1.5px solid var(--pc-border);
    background: var(--pc-cream);
    font-family: var(--pc-sans);
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--pc-muted);
    cursor: pointer;
    transition: all 0.15s var(--pc-spring);
    letter-spacing: 0.04em;
  }
  .pc-vol-pill:hover { border-color: var(--pc-coral); color: var(--pc-coral); }
  .pc-vol-pill.selected {
    background: var(--pc-coral);
    border-color: var(--pc-coral);
    color: white;
    transform: scale(1.05);
  }

  /* ── Divider line (animated) ── */
  .pc-divider {
    height: 1px;
    background: var(--pc-border);
    margin: 12px 0;
    position: relative;
    overflow: hidden;
  }
  .pc-divider::after {
    content: '';
    position: absolute; top:0; left:0;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--pc-coral), var(--pc-gold));
    transition: width 0.5s var(--pc-ease);
  }
  .pc-wrap:hover .pc-divider::after { width: 100%; }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .pc-wrap { border-radius: 16px; }
    .pc-content { padding: 12px 12px 14px; }
    .pc-name { font-size: 0.82rem; }
    .pc-price { font-size: 1.1rem; }
    .pc-add-btn { width: 34px; height: 34px; }
    .pc-desc { display: none; }
    .pc-scent-tags { display: none; }
    .pc-volumes { display: none; }
  }
`;

function injectCardStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-product-card-css")) {
    const tag = document.createElement("style");
    tag.id = "nahid-product-card-css";
    tag.textContent = CARD_CSS;
    document.head.appendChild(tag);
  }
}

/* ─── Volume pill helper ──────────────────────────────── */
const VOLUMES = ["30ml","50ml","100ml"];

/* ─── Scent tags parser ───────────────────────────────── */
function parseTags(product) {
  const src = product.scent_family || product.notes || product.description || "";
  const keywords = ["Floral","Boisé","Oriental","Frais","Musqué","Oud","Épicé","Citrus","Cuir","Ambre"];
  return keywords.filter(k => src.toLowerCase().includes(k.toLowerCase())).slice(0, 3);
}

/* ─── ProductCard Component ───────────────────────────── */
const ProductCard = ({ product, addToCart }) => {
  injectCardStyles();

  const [added,    setAdded]    = useState(false);
  const [wished,   setWished]   = useState(false);
  const [selVol,   setSelVol]   = useState(null);
  const btnRef = useRef(null);

  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price;
  const isLowStock  = product.stock > 0 && product.stock < 5;
  const isOutOfStock= product.stock === 0;
  const isNew       = product.is_new || product.created_at?.includes("2025") || false;
  const tags        = parseTags(product);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    /* Ripple */
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "pc-ripple";
      ripple.style.left  = `${e.clientX - rect.left}px`;
      ripple.style.top   = `${e.clientY - rect.top}px`;
      btnRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }

    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const toggleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(w => !w);
  };

  return (
    <div className="pc-wrap">

      {/* ── IMAGE BLOCK ── */}
      <Link to={`/product/${product.id}`} className="pc-img-block">
        <img
          className="pc-img"
          src={product.image_url}
          alt={product.name}
          loading="lazy"
        />
        <div className="pc-img-overlay" />

        {/* Badges */}
        <div className="pc-badges">
          {isNew && !isLowStock && !isOutOfStock && (
            <span className="pc-badge pc-badge-new">
              <span className="pc-badge-dot" />
              Nouveau
            </span>
          )}
          {isLowStock && (
            <span className="pc-badge pc-badge-low">
              <span className="pc-badge-dot" />
              Dernières pièces
            </span>
          )}
          {isOutOfStock && (
            <span className="pc-badge pc-badge-out">Épuisé</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={`pc-wish${wished ? " active" : ""}`}
          onClick={toggleWish}
          aria-label="Ajouter aux favoris"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick add overlay */}
        {!isOutOfStock && (
          <div className="pc-quick-add">
            <button
              className={`pc-quick-btn${added ? " added" : ""}`}
              onClick={handleAdd}
              ref={btnRef}
            >
              {added ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline className="pc-btn-check" points="20 6 9 17 4 12"/>
                  </svg>
                  Ajouté !
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Ajouter au panier
                </>
              )}
            </button>
          </div>
        )}
      </Link>

      {/* ── CONTENT BLOCK ── */}
      <div className="pc-content">

        {/* Meta row */}
        <div className="pc-meta">
          {product.category && (
            <span className="pc-category">{product.category}</span>
          )}
          <div className="pc-stars">
            ★★★★★ <span>(4.9)</span>
          </div>
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`} className="pc-name">
          {product.name}
        </Link>

        {/* Description */}
        {product.description && (
          <p className="pc-desc">
            {product.description.substring(0, 80)}{product.description.length > 80 ? "…" : ""}
          </p>
        )}

        {/* Scent tags */}
        {tags.length > 0 && (
          <div className="pc-scent-tags">
            {tags.map(t => (
              <span key={t} className="pc-scent-tag">{t}</span>
            ))}
          </div>
        )}

        {/* Animated divider */}
        <div className="pc-divider" />

        {/* Footer */}
        <div className="pc-footer">
          <div className="pc-price-block">
            <span className="pc-price">
              {Math.round(price).toLocaleString("fr-MA")}
              <span className="pc-price-currency">MAD</span>
            </span>
            <span className="pc-price-sub">Livraison offerte dès 500 MAD</span>
          </div>

          {!isOutOfStock ? (
            <button
              className={`pc-add-btn${added ? " added" : ""}`}
              onClick={handleAdd}
              aria-label="Ajouter au panier"
            >
              {added ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </button>
          ) : (
            <span className="pc-out-label">Épuisé</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;