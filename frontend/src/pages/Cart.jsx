import { Link } from "react-router-dom";

/* ─── Inject Cart CSS ──────────────────────────────── */
const CART_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --ct-ink:      #1C1A16;
    --ct-ink-2:    #3D3A33;
    --ct-cream:    #FBF8F3;
    --ct-cream-2:  #F5EFE4;
    --ct-cream-3:  #EDE5D8;
    --ct-white:    #FFFFFF;
    --ct-rose:     #D4857A;
    --ct-rose-d:   #B86B60;
    --ct-rose-l:   #F4E8E6;
    --ct-rose-xl:  #FDF5F4;
    --ct-gold:     #C8A96A;
    --ct-gold-d:   #A8883E;
    --ct-gold-l:   #E9D6A9;
    --ct-gold-xl:  #FAF3E3;
    --ct-sage:     #6A9B6A;
    --ct-sage-l:   #EAF2EA;
    --ct-muted:    #8C8478;
    --ct-border:   rgba(28,26,22,0.08);
    --ct-sans:     'DM Sans', sans-serif;
    --ct-serif:    'Cormorant Garamond', Georgia, serif;
    --ct-spring:   cubic-bezier(0.34,1.56,0.64,1);
    --ct-expo:     cubic-bezier(0.16,1,0.3,1);
    --ct-ease:     cubic-bezier(0.25,0.46,0.45,0.94);
  }

  @keyframes ctFadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
  @keyframes ctScaleIn  { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:none} }
  @keyframes ctSlideIn  { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
  @keyframes ctShimmer  { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes ctPulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.92)} }
  @keyframes ctOrb      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-16px)} }

  /* ── Page wrapper ── */
  .ct-page {
    min-height: 80vh;
    background: var(--ct-cream);
    padding: clamp(40px,6vw,72px) 0 clamp(80px,10vw,120px);
    font-family: var(--ct-sans);
    position: relative;
    overflow-x: hidden;
  }
  .ct-page * { box-sizing: border-box; }

  /* Decorative orbs */
  .ct-orb {
    position:fixed; border-radius:50%; pointer-events:none; z-index:0;
  }
  .ct-orb-1 {
    width:600px; height:600px; top:-200px; left:-200px;
    background:radial-gradient(circle, rgba(200,169,106,0.08), transparent 68%);
    animation:ctOrb 20s ease-in-out infinite;
  }
  .ct-orb-2 {
    width:450px; height:450px; bottom:-150px; right:-150px;
    background:radial-gradient(circle, rgba(212,133,122,0.07), transparent 68%);
    animation:ctOrb 16s ease-in-out infinite reverse;
  }

  /* ── Header ── */
  .ct-header {
    display:flex; justify-content:space-between; align-items:flex-end;
    margin-bottom:clamp(32px,5vw,52px);
    flex-wrap:wrap; gap:16px;
    position:relative; z-index:1;
    animation:ctFadeUp 0.7s var(--ct-expo) both;
  }
  .ct-title {
    font-family:var(--ct-serif);
    font-size:clamp(2.2rem,5vw,3.4rem);
    font-weight:600; color:var(--ct-ink);
    letter-spacing:-0.02em; line-height:1.05; margin-bottom:6px;
  }
  .ct-title em { font-style:italic; font-weight:300; color:var(--ct-rose); }
  .ct-subtitle {
    font-size:0.82rem; color:var(--ct-muted);
    display:flex; align-items:center; gap:8px;
  }
  .ct-count-badge {
    display:inline-flex; align-items:center; justify-content:center;
    width:22px; height:22px; border-radius:50%;
    background:var(--ct-rose); color:white;
    font-size:0.65rem; font-weight:800;
  }
  .ct-continue-link {
    display:inline-flex; align-items:center; gap:8px;
    font-size:0.76rem; font-weight:600; color:var(--ct-muted);
    text-decoration:none; letter-spacing:0.06em; text-transform:uppercase;
    transition:color 0.2s, gap 0.2s;
    padding:10px 22px; border-radius:999px;
    border:1px solid var(--ct-border);
    background:var(--ct-white);
  }
  .ct-continue-link:hover { color:var(--ct-rose); border-color:var(--ct-rose); gap:12px; }

  /* ── Main grid ── */
  .ct-grid {
    display:grid;
    grid-template-columns:1fr 380px;
    gap:28px; align-items:start;
    position:relative; z-index:1;
  }

  /* ── Items column ── */
  .ct-items-col {
    display:flex; flex-direction:column; gap:14px;
  }

  /* ── Cart item card ── */
  .ct-item-card {
    background:var(--ct-white);
    border:1px solid var(--ct-border);
    border-radius:24px;
    padding:clamp(16px,2.5vw,24px);
    display:grid;
    grid-template-columns:auto 1fr auto;
    gap:clamp(14px,2vw,22px);
    align-items:center;
    transition:box-shadow 0.3s, border-color 0.3s, transform 0.3s var(--ct-spring);
    animation:ctSlideIn 0.5s var(--ct-expo) both;
    position:relative; overflow:hidden;
  }
  .ct-item-card::before {
    content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
    background:linear-gradient(to bottom, var(--ct-rose), var(--ct-gold));
    border-radius:0 2px 2px 0; opacity:0;
    transition:opacity 0.3s;
  }
  .ct-item-card:hover { box-shadow:0 12px 40px rgba(28,26,22,0.1); border-color:rgba(28,26,22,0.14); transform:translateY(-2px); }
  .ct-item-card:hover::before { opacity:1; }

  /* Pack item card — golden accent */
  .ct-item-card.is-pack {
    background:linear-gradient(145deg, var(--ct-gold-xl) 0%, var(--ct-white) 100%);
    border-color:var(--ct-gold-l);
  }
  .ct-item-card.is-pack::before {
    background:linear-gradient(to bottom, var(--ct-gold), var(--ct-rose));
    opacity:1;
  }
  .ct-item-card.is-pack:hover { border-color:var(--ct-gold); box-shadow:0 12px 40px rgba(200,169,106,0.15); }

  /* Image */
  .ct-img-wrap {
    width:clamp(72px,10vw,96px);
    height:clamp(72px,10vw,96px);
    border-radius:16px; overflow:hidden; flex-shrink:0;
    background:var(--ct-cream-2);
    position:relative;
  }
  .ct-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s var(--ct-ease); }
  .ct-item-card:hover .ct-img { transform:scale(1.06); }

  /* Pack image grid (multi-parfum) */
  .ct-pack-imgs {
    width:clamp(72px,10vw,96px);
    height:clamp(72px,10vw,96px);
    border-radius:16px; overflow:hidden; flex-shrink:0;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:2px;
    background:var(--ct-cream-3);
  }
  .ct-pack-img-cell {
    overflow:hidden; background:var(--ct-cream-2);
    position:relative;
  }
  .ct-pack-img-cell img { width:100%; height:100%; object-fit:cover; display:block; }
  .ct-pack-img-cell.more {
    display:flex; align-items:center; justify-content:center;
    background:var(--ct-gold-xl);
    font-size:0.6rem; font-weight:800; color:var(--ct-gold-d);
  }

  /* Pack badge */
  .ct-pack-badge {
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 12px; border-radius:999px;
    background:var(--ct-gold-xl); border:1px solid var(--ct-gold-l);
    font-size:0.58rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase;
    color:var(--ct-gold-d); margin-bottom:5px;
  }

  /* Item info */
  .ct-item-info { min-width:0; }
  .ct-item-name {
    font-family:var(--ct-serif);
    font-size:clamp(1rem,2vw,1.15rem); font-weight:600;
    color:var(--ct-ink); text-decoration:none; display:block;
    margin-bottom:4px; letter-spacing:-0.01em;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    transition:color 0.2s;
  }
  .ct-item-name:hover { color:var(--ct-rose); }
  .ct-item-cat {
    font-size:0.62rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
    color:var(--ct-rose); margin-bottom:6px;
  }
  .ct-item-unit {
    font-size:0.78rem; color:var(--ct-muted); margin-bottom:8px;
  }

  /* Pack fragrances list */
  .ct-pack-frags {
    display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px;
  }
  .ct-frag-pill {
    display:inline-block; padding:3px 9px; border-radius:999px;
    background:var(--ct-gold-xl); border:1px solid var(--ct-gold-l);
    font-size:0.58rem; font-weight:600; color:var(--ct-gold-d);
    max-width:100px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }

  .ct-item-remove {
    background:none; border:none; font-size:0.72rem; color:var(--ct-rose-d);
    cursor:pointer; padding:0; font-family:var(--ct-sans);
    display:inline-flex; align-items:center; gap:4px;
    transition:opacity 0.2s;
    font-weight:600; letter-spacing:0.04em;
  }
  .ct-item-remove:hover { opacity:0.7; }

  /* Right controls */
  .ct-item-right {
    display:flex; flex-direction:column; align-items:flex-end; gap:12px; flex-shrink:0;
  }
  .ct-qty-controls {
    display:flex; align-items:center;
    border:1.5px solid var(--ct-border);
    border-radius:999px; overflow:hidden;
    background:var(--ct-white);
  }
  .ct-qty-btn {
    width:36px; height:36px; background:none; border:none;
    font-size:1.1rem; cursor:pointer; color:var(--ct-ink);
    display:flex; align-items:center; justify-content:center;
    transition:background 0.15s, color 0.15s;
    font-family:var(--ct-sans); font-weight:300;
  }
  .ct-qty-btn:hover { background:var(--ct-rose-xl); color:var(--ct-rose-d); }
  .ct-qty-val {
    width:34px; text-align:center;
    font-size:0.88rem; font-weight:700; color:var(--ct-ink);
    border-left:1px solid var(--ct-border); border-right:1px solid var(--ct-border);
    line-height:36px;
  }
  .ct-item-total {
    font-family:var(--ct-serif);
    font-size:clamp(1.1rem,2vw,1.3rem); font-weight:600;
    color:var(--ct-ink); letter-spacing:-0.01em;
  }
  .ct-item-total.is-pack-price { color:var(--ct-gold-d); }

  .ct-delete-btn {
    position:absolute; top:14px; right:14px;
    width:28px; height:28px; border-radius:50%;
    background:none; border:1px solid var(--ct-border);
    color:var(--ct-muted); font-size:0.72rem;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:all 0.2s; font-family:var(--ct-sans);
    opacity:0;
  }
  .ct-item-card:hover .ct-delete-btn { opacity:1; }
  .ct-delete-btn:hover { background:var(--ct-rose); border-color:var(--ct-rose); color:white; }

  /* ── Summary card ── */
  .ct-summary {
    background:var(--ct-white);
    border:1px solid var(--ct-border);
    border-radius:28px;
    padding:clamp(24px,3vw,36px);
    position:sticky; top:clamp(80px,10vh,100px);
    box-shadow:0 8px 40px rgba(28,26,22,0.08);
    overflow:hidden;
    animation:ctFadeUp 0.7s var(--ct-expo) 0.15s both;
  }
  /* Gold top accent */
  .ct-summary::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(to right, var(--ct-rose), var(--ct-gold));
  }

  .ct-summary-title {
    font-family:var(--ct-serif);
    font-size:1.5rem; font-weight:600; color:var(--ct-ink);
    margin-bottom:26px; letter-spacing:-0.01em;
  }

  .ct-sum-row {
    display:flex; justify-content:space-between; align-items:center;
    margin-bottom:14px;
  }
  .ct-sum-label { font-size:0.84rem; color:var(--ct-muted); }
  .ct-sum-value { font-size:0.9rem; font-weight:600; color:var(--ct-ink); }
  .ct-sum-value.free { color:var(--ct-sage); font-weight:700; }

  /* Shipping progress */
  .ct-ship-progress { margin:12px 0 16px; }
  .ct-progress-track {
    height:5px; background:var(--ct-cream-3);
    border-radius:999px; overflow:hidden; margin-bottom:8px;
  }
  .ct-progress-fill {
    height:100%;
    background:linear-gradient(to right, var(--ct-rose), var(--ct-gold));
    border-radius:999px; transition:width 0.5s var(--ct-expo);
  }
  .ct-ship-note { font-size:0.72rem; color:var(--ct-rose); text-align:center; font-weight:600; }

  .ct-divider { height:1px; background:var(--ct-border); margin:20px 0; }

  .ct-total-row {
    display:flex; justify-content:space-between; align-items:baseline;
    margin-bottom:26px;
  }
  .ct-total-label { font-size:0.9rem; font-weight:700; color:var(--ct-ink); }
  .ct-total-value {
    font-family:var(--ct-serif);
    font-size:2rem; font-weight:600; color:var(--ct-ink);
    letter-spacing:-0.02em;
  }

  /* Checkout button */
  .ct-checkout-btn {
    width:100%; padding:17px;
    background:linear-gradient(135deg, var(--ct-rose), var(--ct-rose-d));
    color:white; border:none; border-radius:999px;
    font-family:var(--ct-sans); font-size:0.82rem; font-weight:800;
    letter-spacing:0.1em; text-transform:uppercase;
    cursor:pointer; display:block; text-align:center; text-decoration:none;
    transition:transform 0.3s var(--ct-spring), box-shadow 0.3s;
    box-shadow:0 6px 24px rgba(212,133,122,0.4);
    position:relative; overflow:hidden;
  }
  .ct-checkout-btn::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
    transform:translateX(-100%) skewX(-15deg);
    transition:transform 0.5s var(--ct-ease);
  }
  .ct-checkout-btn:hover { transform:translateY(-4px) scale(1.01); box-shadow:0 14px 36px rgba(212,133,122,0.52); }
  .ct-checkout-btn:hover::after { transform:translateX(160%) skewX(-15deg); }

  .ct-security-note {
    text-align:center; font-size:0.66rem; color:var(--ct-muted);
    margin-top:14px; line-height:1.6;
    display:flex; align-items:center; justify-content:center; gap:6px;
  }

  /* Trust pills */
  .ct-trust-pills {
    display:flex; gap:6px; flex-wrap:wrap;
    margin-top:20px; padding-top:18px;
    border-top:1px solid var(--ct-border);
  }
  .ct-trust-pill {
    flex:1; min-width:calc(50% - 3px);
    display:flex; align-items:center; gap:6px;
    padding:8px 10px; border-radius:12px;
    background:var(--ct-cream-2); border:1px solid var(--ct-border);
    font-size:0.64rem; font-weight:600; color:var(--ct-muted);
  }

  /* Pack summary box inside summary card */
  .ct-pack-summary-box {
    background:var(--ct-gold-xl);
    border:1px solid var(--ct-gold-l);
    border-radius:16px; padding:14px 16px;
    margin-bottom:16px;
  }
  .ct-pack-summary-label {
    font-size:0.6rem; font-weight:800; letter-spacing:0.16em; text-transform:uppercase;
    color:var(--ct-gold-d); margin-bottom:8px;
    display:flex; align-items:center; gap:6px;
  }
  .ct-pack-summary-items {
    display:flex; flex-wrap:wrap; gap:4px;
  }
  .ct-pack-sum-pill {
    padding:3px 9px; border-radius:999px;
    background:var(--ct-white); border:1px solid var(--ct-gold-l);
    font-size:0.58rem; font-weight:600; color:var(--ct-ink-2);
    max-width:110px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }

  /* ── Empty state ── */
  .ct-empty {
    min-height:65vh; display:flex; align-items:center; justify-content:center;
    padding:40px; font-family:var(--ct-sans);
  }
  .ct-empty-content { text-align:center; max-width:420px; animation:ctFadeUp 0.7s var(--ct-expo) both; }
  .ct-empty-icon {
    width:96px; height:96px; border-radius:50%;
    background:var(--ct-cream-2); border:1px solid var(--ct-border);
    margin:0 auto 28px;
    display:flex; align-items:center; justify-content:center;
    font-size:2.6rem;
  }
  .ct-empty-title {
    font-family:var(--ct-serif);
    font-size:clamp(1.8rem,4vw,2.6rem); font-weight:600;
    color:var(--ct-ink); margin-bottom:14px; letter-spacing:-0.01em;
  }
  .ct-empty-title em { font-style:italic; font-weight:300; color:var(--ct-rose); }
  .ct-empty-text {
    font-size:0.9rem; color:var(--ct-muted); line-height:1.8; margin-bottom:32px;
  }
  .ct-shop-link {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg, var(--ct-rose), var(--ct-rose-d));
    color:white; padding:15px 36px; border-radius:999px;
    font-size:0.78rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
    text-decoration:none; transition:transform 0.3s var(--ct-spring), box-shadow 0.3s;
    box-shadow:0 6px 24px rgba(212,133,122,0.4);
  }
  .ct-shop-link:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 14px 36px rgba(212,133,122,0.5); }

  /* ── RESPONSIVE ── */
  @media (max-width:1024px) {
    .ct-grid { grid-template-columns:1fr 340px; }
  }
  @media (max-width:860px) {
    .ct-grid { grid-template-columns:1fr; }
    .ct-summary { position:static; }
  }
  @media (max-width:600px) {
    .ct-item-card { grid-template-columns:auto 1fr; gap:12px; padding:14px; }
    .ct-item-right { flex-direction:row; align-items:center; grid-column:1/-1; justify-content:space-between; }
    .ct-item-total { font-size:1rem; }
    .ct-delete-btn { opacity:1; position:static; }
    .ct-qty-btn { width:30px; height:30px; }
    .ct-qty-val { width:28px; line-height:30px; }
    .ct-pack-imgs, .ct-img-wrap { width:68px; height:68px; }
    .ct-summary { border-radius:20px; }
  }
  @media (max-width:400px) {
    .ct-item-card { padding:12px; border-radius:18px; }
    .ct-pack-imgs, .ct-img-wrap { width:60px; height:60px; }
  }
`;

function injectCartStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-cart-css")) {
    const tag = document.createElement("style");
    tag.id = "nahid-cart-css";
    tag.textContent = CART_CSS;
    document.head.appendChild(tag);
  }
}

/* ─── Helper: detect pack item ─────────────────── */
const isPack = (item) => !!(item.packId || item.packName || (item.fragrances && item.fragrances.length > 0));

/* ─── Cart Component ────────────────────────────── */
const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  injectCartStyles();

  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return sum + price * item.quantity;
  }, 0);

  /* Livraison : gratuite sur tous les packs · gratuite dès 300 MAD pour parfums individuels */
  const hasPackInCart = cart.some(isPack);
  const shipping      = (hasPackInCart || subtotal >= 300) ? 0 : 30;
  const total    = subtotal + shipping;
  const fmt      = (n) => Math.round(n).toLocaleString("fr-MA");

  /* Pack items for summary box */
  const packItems = cart.filter(isPack);

  /* ── Empty state ── */
  if (cart.length === 0) {
    return (
      <div className="ct-page">
        <div className="ct-orb ct-orb-1" />
        <div className="ct-orb ct-orb-2" />
        <div className="container">
          <div className="ct-empty">
            <div className="ct-empty-content">
              <div className="ct-empty-icon">🛒</div>
              <h2 className="ct-empty-title">Votre panier<br /><em>est vide</em></h2>
              <p className="ct-empty-text">
                Découvrez notre sélection de parfums d'exception et trouvez votre signature olfactive.
              </p>
              <Link to="/" className="ct-shop-link">
                Explorer nos parfums →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ct-page">
      <div className="ct-orb ct-orb-1" />
      <div className="ct-orb ct-orb-2" />

      <div className="container">

        {/* Header */}
        <div className="ct-header">
          <div>
            <h1 className="ct-title">Mon <em>Panier</em></h1>
            <div className="ct-subtitle">
              <span className="ct-count-badge">{cart.length}</span>
              article{cart.length > 1 ? "s" : ""} sélectionné{cart.length > 1 ? "s" : ""}
            </div>
          </div>
          <Link to="/" className="ct-continue-link">
            ← Continuer les achats
          </Link>
        </div>

        {/* Main grid */}
        <div className="ct-grid">

          {/* Items column */}
          <div className="ct-items-col">
            {cart.map((item, idx) => {
              const itemPrice = typeof item.price === "string" ? parseFloat(item.price) : item.price;
              const itemTotal = itemPrice * item.quantity;
              const isPackItem = isPack(item);
              const frags = item.fragrances || [];

              return (
                <div
                  key={item.id || item.packId || idx}
                  className={`ct-item-card${isPackItem ? " is-pack" : ""}`}
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  {/* Image — pack shows mosaic, single shows single */}
                  {isPackItem && frags.length > 0 ? (
                    <div className="ct-pack-imgs">
                      {frags.slice(0, 3).map((f, fi) => (
                        <div key={fi} className="ct-pack-img-cell">
                          {f.image_url
                            ? <img src={f.image_url} alt={f.name} />
                            : <div style={{ width: "100%", height: "100%", background: "var(--ct-cream-3)" }} />
                          }
                        </div>
                      ))}
                      {frags.length > 3 && (
                        <div className="ct-pack-img-cell more">+{frags.length - 3}</div>
                      )}
                      {frags.length === 1 && <div className="ct-pack-img-cell" style={{ background: "var(--ct-cream-2)" }} />}
                      {frags.length === 2 && <div className="ct-pack-img-cell" style={{ background: "var(--ct-cream-2)" }} />}
                    </div>
                  ) : (
                    <div className="ct-img-wrap">
                      <img className="ct-img" src={item.image_url} alt={item.name} />
                    </div>
                  )}

                  {/* Info */}
                  <div className="ct-item-info">
                    {isPackItem && (
                      <div className="ct-pack-badge">✦ Coffret Personnalisé</div>
                    )}
                    <Link
                      to={isPackItem ? "#" : `/product/${item.id}`}
                      className="ct-item-name"
                      style={isPackItem ? { pointerEvents: "none" } : {}}
                    >
                      {item.name || item.packName || "Coffret Nahid"}
                    </Link>

                    {item.category && !isPackItem && (
                      <div className="ct-item-cat">{item.category}</div>
                    )}

                    {isPackItem && frags.length > 0 && (
                      <div className="ct-pack-frags">
                        {frags.map((f, fi) => (
                          <span key={fi} className="ct-frag-pill" title={f.name}>
                            {f.name?.substring(0, 12)}{f.name?.length > 12 ? "…" : ""}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="ct-item-unit">
                      {isPackItem
                        ? `${frags.length > 0 ? frags.length + " fragrances · " : ""}${item.packLabel || "35ML × " + (frags.length || item.qty || "")}`
                        : `${fmt(itemPrice)} MAD / pièce`
                      }
                    </div>

                    <button className="ct-item-remove" onClick={() => removeFromCart(item.id || item.packId)}>
                      🗑 Supprimer
                    </button>
                  </div>

                  {/* Right: qty + total */}
                  <div className="ct-item-right">
                    <div className="ct-qty-controls">
                      <button className="ct-qty-btn" onClick={() => updateQuantity(item.id || item.packId, item.quantity - 1)}>−</button>
                      <span className="ct-qty-val">{item.quantity}</span>
                      <button className="ct-qty-btn" onClick={() => updateQuantity(item.id || item.packId, item.quantity + 1)}>+</button>
                    </div>
                    <div className={`ct-item-total${isPackItem ? " is-pack-price" : ""}`}>
                      {fmt(itemTotal)} MAD
                    </div>
                  </div>

                  {/* Delete X button */}
                  <button className="ct-delete-btn" onClick={() => removeFromCart(item.id || item.packId)} title="Supprimer">✕</button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div>
            <div className="ct-summary">
              <h3 className="ct-summary-title">Récapitulatif</h3>

              {/* Pack summary box if has packs */}
              {packItems.length > 0 && packItems.map((pk, pki) => (
                <div key={pki} className="ct-pack-summary-box">
                  <div className="ct-pack-summary-label">
                    ✦ {pk.packName || "Coffret Personnalisé"}
                    <span style={{ marginLeft: "auto", color: "var(--ct-gold-d)", fontFamily: "var(--ct-serif)", fontSize: "0.9rem", fontWeight: 600 }}>
                      {fmt(typeof pk.price === "string" ? parseFloat(pk.price) : pk.price)} MAD
                    </span>
                  </div>
                  {(pk.fragrances || []).length > 0 && (
                    <div className="ct-pack-summary-items">
                      {(pk.fragrances || []).map((f, fi) => (
                        <span key={fi} className="ct-pack-sum-pill">{f.name}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="ct-sum-row">
                <span className="ct-sum-label">Sous-total</span>
                <span className="ct-sum-value">{fmt(subtotal)} MAD</span>
              </div>

              <div className="ct-sum-row">
                <span className="ct-sum-label">Livraison</span>
                <span className={`ct-sum-value${shipping === 0 ? " free" : ""}`}>
                  {shipping === 0 ? "Gratuite 🎉" : `${fmt(shipping)} MAD`}
                </span>
              </div>

              {subtotal > 0 && subtotal < 300 && !hasPackInCart && (
                <div className="ct-ship-progress">
                  <div className="ct-progress-track">
                    <div className="ct-progress-fill" style={{ width: `${Math.min((subtotal / 300) * 100, 100)}%` }} />
                  </div>
                  <p className="ct-ship-note">Encore {fmt(300 - subtotal)} MAD pour la livraison gratuite</p>
                </div>
              )}

              <div className="ct-divider" />

              <div className="ct-total-row">
                <span className="ct-total-label">Total</span>
                <span className="ct-total-value">{fmt(total)} MAD</span>
              </div>

              <Link to="/checkout" className="ct-checkout-btn">
                Procéder au paiement →
              </Link>

              <div className="ct-security-note">
                🔒 Paiement 100% sécurisé · Livraison partout au Maroc
              </div>

              <div className="ct-trust-pills">
                {[
                  { icon: "🚚", text: "Livraison gratuite dès 300 MAD" },
                  { icon: "💳", text: "Paiement à la livraison" },
                  { icon: "⭐", text: "4.9/5 · 2 400 avis" },
                  { icon: "🇲🇦", text: "Partout au Maroc" },
                ].map(({ icon, text }) => (
                  <div key={text} className="ct-trust-pill">
                    <span>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;