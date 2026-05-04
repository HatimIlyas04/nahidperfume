import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

/* ── CSS ─────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --c:   #EF776A;
  --cd:  #D35F52;
  --cl:  #FFF4F2;
  --cll: #FFE8E5;
  --w:   #FFFFFF;
  --bg:  #FAF8F5;
  --ink: #1C1917;
  --g:   #78716C;
  --g2:  #A8A29E;
  --gold:#C9A96E;
  --bd:  rgba(28,26,22,0.09);
  --ff:  'DM Sans', sans-serif;
  --ffs: 'Cormorant Garamond', Georgia, serif;
  --sp:  cubic-bezier(.34,1.56,.64,1);
  --ex:  cubic-bezier(.16,1,.3,1);
  --ea:  cubic-bezier(.25,.46,.45,.94);
}

/* ── Page ── */
.wl-page { min-height: 100vh; background: var(--bg); font-family: var(--ff); }

/* ── Hero ── */
.wl-hero {
  position: relative; overflow: hidden;
  padding: clamp(64px,10vw,100px) clamp(20px,6vw,80px) clamp(48px,7vw,80px);
  background: linear-gradient(135deg, #1C1917 0%, #2D2420 40%, #3D2E28 70%, #1C1917 100%);
}
.wl-hero-grain {
  position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: .04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}
.wl-hero-orb {
  position: absolute; border-radius: 50%; pointer-events: none; z-index: 1;
}
.wl-hero-orb-1 {
  width: clamp(300px,40vw,600px); height: clamp(300px,40vw,600px);
  top: -30%; right: -10%;
  background: radial-gradient(circle, rgba(239,119,106,.18) 0%, transparent 65%);
  animation: wlOrb 16s ease-in-out infinite;
}
.wl-hero-orb-2 {
  width: clamp(200px,25vw,380px); height: clamp(200px,25vw,380px);
  bottom: -20%; left: 5%;
  background: radial-gradient(circle, rgba(201,169,110,.14) 0%, transparent 65%);
  animation: wlOrb 12s ease-in-out infinite reverse;
}
@keyframes wlOrb { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-15px) scale(1.05)} }

.wl-hero-inner {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 32px; flex-wrap: wrap;
}
.wl-hero-left {}
.wl-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--ff); font-size: .6rem; font-weight: 800;
  letter-spacing: .22em; text-transform: uppercase; color: var(--c);
  margin-bottom: 16px;
}
.wl-hero-eyebrow::before {
  content: ''; width: 28px; height: 1px; background: var(--c); flex-shrink: 0;
}
.wl-hero-title {
  font-family: var(--ffs); font-size: clamp(2.4rem,5vw,4rem);
  font-weight: 400; color: white; line-height: 1.1; letter-spacing: -.02em;
  margin: 0 0 20px;
}
.wl-hero-title em { font-style: italic; color: var(--c); }
.wl-hero-title svg { vertical-align: middle; margin-right: 12px; }

.wl-hero-badges { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.wl-hero-badge {
  display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px;
  border-radius: 999px; background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.13);
  font-size: .62rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.75);
}
.wl-badge-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--c); flex-shrink: 0;
  animation: wlPulse 2s ease infinite;
}
@keyframes wlPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }

.wl-hero-right {
  display: flex; flex-direction: column; gap: 12px; align-items: flex-end;
}
.wl-hero-total {
  font-family: var(--ffs); font-size: clamp(1.6rem,3vw,2.2rem);
  font-weight: 500; color: white; letter-spacing: -.01em; text-align: right;
}
.wl-hero-total-lbl {
  font-family: var(--ff); font-size: .6rem; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.45);
  text-align: right; margin-bottom: 4px;
}

/* ── Toolbar ── */
.wl-toolbar {
  background: var(--w); border-bottom: 1px solid var(--bd);
  position: sticky; top: 70px; z-index: 40;
  backdrop-filter: blur(20px);
}
.wl-toolbar-inner {
  max-width: 1200px; margin: 0 auto;
  padding: 0 clamp(16px,4vw,48px);
  height: 64px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
.wl-tool-left  { display: flex; align-items: center; gap: 8px; flex: 1; flex-wrap: wrap; }
.wl-tool-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.wl-sort {
  height: 36px; padding: 0 14px; border-radius: 999px;
  border: 1.5px solid var(--bd); background: var(--bg);
  font-family: var(--ff); font-size: .74rem; font-weight: 500; color: var(--ink);
  outline: none; cursor: pointer; transition: border-color .18s;
}
.wl-sort:focus { border-color: var(--c); }

.wl-count-badge {
  display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px;
  border-radius: 999px; background: var(--cl); border: 1px solid rgba(239,119,106,.2);
  font-size: .64rem; font-weight: 700; color: var(--c);
}

.wl-view-btns { display: flex; gap: 3px; }
.wl-view-btn {
  width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid var(--bd);
  background: none; cursor: pointer; font-size: 12px; color: var(--g);
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
}
.wl-view-btn.active,
.wl-view-btn:hover { border-color: var(--c); color: var(--c); background: var(--cl); }

.wl-btn-add-all {
  height: 36px; padding: 0 18px; border-radius: 999px; border: none;
  background: var(--c); color: white;
  font-family: var(--ff); font-size: .7rem; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase;
  cursor: pointer; display: flex; align-items: center; gap: 7px;
  transition: all .2s var(--ea);
  box-shadow: 0 3px 12px rgba(239,119,106,.3);
  white-space: nowrap;
}
.wl-btn-add-all:hover { background: var(--cd); transform: translateY(-1px); box-shadow: 0 5px 18px rgba(239,119,106,.42); }

.wl-btn-clear {
  height: 36px; padding: 0 16px; border-radius: 999px;
  border: 1.5px solid var(--bd); background: none;
  font-family: var(--ff); font-size: .7rem; font-weight: 600; color: var(--g);
  cursor: pointer; transition: all .15s; white-space: nowrap;
}
.wl-btn-clear:hover { border-color: #F87171; color: #B91C1C; }

/* ── Products section ── */
.wl-products { max-width: 1200px; margin: 0 auto; padding: clamp(32px,5vw,56px) clamp(16px,4vw,48px); }

.wl-section-intro {
  display: flex; align-items: center; gap: 16px; margin-bottom: 32px;
}
.wl-section-title {
  font-family: var(--ffs); font-size: clamp(1.5rem,3vw,2rem);
  font-weight: 400; color: var(--ink); margin: 0;
}
.wl-section-title em { font-style: italic; color: var(--c); }
.wl-section-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--bd), transparent); }

/* ── Grid ── */
.wl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(16px,2.5vw,28px);
}
.wl-grid.wl-grid-2 { grid-template-columns: repeat(2, 1fr); }
.wl-grid.wl-grid-4 { grid-template-columns: repeat(4, 1fr); }

/* ── Card wrap with remove button ── */
.wl-card-wrap {
  position: relative;
  animation: wlCardIn .4s var(--ex) both;
}
@keyframes wlCardIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }

.wl-remove-btn {
  position: absolute; top: 10px; left: 10px; z-index: 10;
  display: flex; align-items: center; gap: 5px;
  padding: 6px 12px; border-radius: 999px; border: none;
  background: rgba(255,255,255,.92); backdrop-filter: blur(10px);
  font-family: var(--ff); font-size: .58rem; font-weight: 800;
  letter-spacing: .08em; text-transform: uppercase; color: #B91C1C;
  cursor: pointer;
  opacity: 0; transform: translateY(-4px) scale(.9);
  transition: opacity .22s, transform .22s var(--sp), background .15s;
  box-shadow: 0 2px 10px rgba(0,0,0,.12);
  pointer-events: none;
}
.wl-card-wrap:hover .wl-remove-btn {
  opacity: 1; transform: none; pointer-events: auto;
}
.wl-remove-btn:hover { background: white; }

/* ── Add to cart banner (shown at bottom of card on hover) ── */
.wl-added-toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: var(--ink); color: white; border-radius: 999px;
  padding: 12px 24px; font-size: .74rem; font-weight: 600;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.2);
  z-index: 9999;
  animation: toastIn .35s var(--sp) both;
  pointer-events: none;
}
@keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

/* ── Empty state ── */
.wl-empty {
  min-height: 60vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  padding: 64px 20px;
}
.wl-empty-heart {
  width: 96px; height: 96px; border-radius: 50%;
  background: var(--cl); border: 2px solid rgba(239,119,106,.2);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 28px; position: relative;
  animation: wlHeartFloat 3s ease-in-out infinite;
}
@keyframes wlHeartFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.wl-empty-heart::after {
  content: '';  position: absolute; inset: -8px; border-radius: 50%;
  border: 1px solid rgba(239,119,106,.12); animation: wlHeartPulse 3s ease-in-out infinite;
}
@keyframes wlHeartPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:.5} }

.wl-empty-title {
  font-family: var(--ffs); font-size: clamp(1.8rem,4vw,2.6rem);
  font-weight: 400; color: var(--ink); margin: 0 0 12px; letter-spacing: -.01em;
}
.wl-empty-title em { font-style: italic; color: var(--c); }
.wl-empty-text {
  font-size: .88rem; color: var(--g); max-width: 380px; line-height: 1.7; margin: 0 0 36px;
}
.wl-empty-links { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.wl-empty-btn-fill {
  display: inline-flex; align-items: center; gap: 7px; padding: 14px 28px;
  border-radius: 999px; border: none; background: var(--c); color: white;
  font-family: var(--ff); font-size: .74rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase;
  cursor: pointer; text-decoration: none;
  box-shadow: 0 4px 16px rgba(239,119,106,.35);
  transition: all .2s var(--ea);
}
.wl-empty-btn-fill:hover { background: var(--cd); transform: translateY(-2px); box-shadow: 0 6px 22px rgba(239,119,106,.48); }
.wl-empty-btn-ghost {
  display: inline-flex; align-items: center; gap: 7px; padding: 13px 26px;
  border-radius: 999px; border: 1.5px solid var(--bd); background: none;
  font-family: var(--ff); font-size: .74rem; font-weight: 600; color: var(--g);
  cursor: pointer; text-decoration: none; transition: all .18s;
}
.wl-empty-btn-ghost:hover { border-color: var(--c); color: var(--c); }

/* ── Confirm clear modal ── */
.wl-modal-bg {
  position: fixed; inset: 0; background: rgba(28,26,22,.5);
  backdrop-filter: blur(8px); z-index: 9000;
  display: flex; align-items: center; justify-content: center; padding: 20px;
  animation: wlFadeIn .2s ease;
}
@keyframes wlFadeIn { from{opacity:0} to{opacity:1} }
.wl-modal {
  background: var(--w); border-radius: 24px; padding: 36px 32px;
  max-width: 380px; width: 100%;
  box-shadow: 0 32px 80px rgba(0,0,0,.18);
  animation: wlSlideUp .3s var(--sp);
}
@keyframes wlSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
.wl-modal-icon { font-size: 2.4rem; text-align: center; margin-bottom: 16px; }
.wl-modal-title {
  font-family: var(--ffs); font-size: 1.5rem; font-weight: 500; color: var(--ink);
  text-align: center; margin: 0 0 8px;
}
.wl-modal-text { font-size: .82rem; color: var(--g); text-align: center; margin: 0 0 28px; line-height: 1.65; }
.wl-modal-btns { display: flex; gap: 8px; }
.wl-modal-cancel {
  flex: 1; padding: 12px; border-radius: 999px; border: 1.5px solid var(--bd);
  background: none; font-family: var(--ff); font-size: .74rem; font-weight: 600; color: var(--g);
  cursor: pointer; transition: all .15s;
}
.wl-modal-cancel:hover { border-color: var(--c); color: var(--c); }
.wl-modal-confirm {
  flex: 1; padding: 12px; border-radius: 999px; border: none;
  background: #DC2626; color: white;
  font-family: var(--ff); font-size: .74rem; font-weight: 700;
  cursor: pointer; transition: all .18s;
}
.wl-modal-confirm:hover { background: #B91C1C; transform: translateY(-1px); }

/* ── Responsive ── */
@media(max-width:1024px){ .wl-grid { grid-template-columns: repeat(3,1fr); } }
@media(max-width:768px){
  .wl-grid, .wl-grid.wl-grid-4 { grid-template-columns: repeat(2,1fr) !important; }
  .wl-toolbar-inner { height:auto; padding:10px clamp(14px,4vw,32px); flex-wrap:wrap; gap:8px; }
  .wl-hero-right { align-items: flex-start; }
  .wl-remove-btn { opacity:1; transform:none; pointer-events:auto; }
}
@media(max-width:480px){
  .wl-grid, .wl-grid.wl-grid-2, .wl-grid.wl-grid-4 { grid-template-columns: 1fr !important; }
}
`;

function injectCSS() {
  if (!document.getElementById("nahid-wl-css")) {
    const s = document.createElement("style");
    s.id = "nahid-wl-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/* ── Heart SVG ── */
const HeartSVG = ({ size = 18, filled = false, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

/* ── Component ─────────────────────────────────────────── */
export default function Wishlist({ addToCart }) {
  injectCSS();
  const { wishlist, toggle, clear } = useWishlist();
  const navigate = useNavigate();

  const [sort,      setSort]      = useState("default");
  const [viewCols,  setViewCols]  = useState("3");
  const [showModal, setShowModal] = useState(false);
  const [toast,     setToast]     = useState("");

  /* Sort */
  let displayed = [...wishlist];
  if (sort === "price-asc")   displayed.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  if (sort === "price-desc")  displayed.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  if (sort === "name-asc")    displayed.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "date-desc")   displayed.sort((a, b) => (b.wishedAt || 0) - (a.wishedAt || 0));

  const totalValue = displayed.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  const fmt = n => Math.round(n).toLocaleString("fr-MA");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const handleAddAll = () => {
    displayed.forEach(p => addToCart(p, 1));
    showToast(`${displayed.length} parfum${displayed.length > 1 ? "s" : ""} ajouté${displayed.length > 1 ? "s" : ""} au panier`);
  };

  const handleRemove = (product) => {
    toggle(product);
    showToast(`"${product.name}" retiré des favoris`);
  };

  const handleAddOne = (product) => {
    addToCart(product, 1);
    showToast(`"${product.name}" ajouté au panier`);
  };

  const handleConfirmClear = () => {
    clear(); setShowModal(false);
    showToast("Favoris vidés");
  };

  const gridClass = [
    "wl-grid",
    viewCols === "2" ? "wl-grid-2" : viewCols === "4" ? "wl-grid-4" : ""
  ].join(" ").trim();

  return (
    <div className="wl-page">

      {/* ── HERO ── */}
      <section className="wl-hero">
        <div className="wl-hero-grain" />
        <div className="wl-hero-orb wl-hero-orb-1" />
        <div className="wl-hero-orb wl-hero-orb-2" />

        <div className="wl-hero-inner">
          <div className="wl-hero-left">
            <div className="wl-hero-eyebrow">Collection personnelle</div>
            <h1 className="wl-hero-title">
              <HeartSVG size={36} filled color="#EF776A" />
              Mes <em>Favoris</em>
            </h1>
            <div className="wl-hero-badges">
              <span className="wl-hero-badge">
                <span className="wl-badge-dot" />
                {wishlist.length} parfum{wishlist.length !== 1 ? "s" : ""} sauvegardé{wishlist.length !== 1 ? "s" : ""}
              </span>
              {wishlist.length > 0 && (
                <span className="wl-hero-badge">
                  <span className="wl-badge-dot" style={{ background: "#C9A96E" }} />
                  Liste wishlist
                </span>
              )}
            </div>
          </div>

          {wishlist.length > 0 && (
            <div className="wl-hero-right">
              <div className="wl-hero-total-lbl">Valeur estimée</div>
              <div className="wl-hero-total">{fmt(totalValue)} <span style={{ fontSize: "1rem", opacity: .6 }}>MAD</span></div>
            </div>
          )}
        </div>
      </section>

      {/* ── TOOLBAR ── */}
      {wishlist.length > 0 && (
        <div className="wl-toolbar">
          <div className="wl-toolbar-inner">
            <div className="wl-tool-left">
              <span className="wl-count-badge">
                <HeartSVG size={11} filled color="#EF776A" />
                <strong>{displayed.length}</strong> produit{displayed.length !== 1 ? "s" : ""}
              </span>
              <select className="wl-sort" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="default">Ordre d'ajout</option>
                <option value="date-desc">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name-asc">Nom A–Z</option>
              </select>
              <div className="wl-view-btns">
                {[["2", "▬"], ["3", "⊞"], ["4", "⊟"]].map(([v, icon]) => (
                  <button key={v} className={`wl-view-btn${viewCols === v ? " active" : ""}`}
                    onClick={() => setViewCols(v)} title={`${v} colonnes`}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="wl-tool-right">
              <button className="wl-btn-clear" onClick={() => setShowModal(true)}>
                Vider la liste
              </button>
              <button className="wl-btn-add-all" onClick={handleAddAll}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Tout ajouter au panier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRODUCTS ── */}
      <div className="wl-products">

        {wishlist.length === 0 ? (
          /* ── Empty state ── */
          <div className="wl-empty">
            <div className="wl-empty-heart">
              <HeartSVG size={40} filled color="#EF776A" />
            </div>
            <h2 className="wl-empty-title">Votre liste est <em>vide</em></h2>
            <p className="wl-empty-text">
              Cliquez sur le cœur ♡ de n'importe quel parfum pour l'ajouter à vos favoris et retrouver votre sélection ici.
            </p>
            <div className="wl-empty-links">
              <Link to="/" className="wl-empty-btn-fill">
                <HeartSVG size={13} />
                Découvrir nos parfums
              </Link>
              <Link to="/collection/femme" className="wl-empty-btn-ghost">Collection Femme</Link>
              <Link to="/collection/homme" className="wl-empty-btn-ghost">Collection Homme</Link>
              <Link to="/originals" className="wl-empty-btn-ghost">Originals</Link>
            </div>
          </div>

        ) : (
          <>
            <div className="wl-section-intro">
              <h2 className="wl-section-title">Mes parfums <em>favoris</em></h2>
              <div className="wl-section-line" />
            </div>

            <div className={gridClass}>
              {displayed.map((product, i) => (
                <div
                  key={product.id}
                  className="wl-card-wrap"
                  style={{ animationDelay: `${(i % 12) * 0.055}s` }}
                >
                  {/* ── Remove button ── */}
                  <button
                    className="wl-remove-btn"
                    onClick={() => handleRemove(product)}
                    title="Retirer des favoris"
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Retirer
                  </button>

                  {/* ── Product card ── */}
                  <ProductCard
                    product={product}
                    addToCart={(p, qty) => { addToCart(p, qty); showToast(`"${p.name}" ajouté au panier`); }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: "center", marginTop: "56px" }}>
              <p style={{ fontFamily: "var(--ffs)", fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "var(--g)", marginBottom: "20px" }}>
                Envie de découvrir d'autres fragrances ?
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/catalogue" className="wl-empty-btn-fill">
                  Explorer le catalogue
                </Link>
                <Link to="/collection/femme" className="wl-empty-btn-ghost">Femme</Link>
                <Link to="/collection/homme" className="wl-empty-btn-ghost">Homme</Link>
                <Link to="/collection/unisex" className="wl-empty-btn-ghost">Unisex</Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Confirm clear modal ── */}
      {showModal && (
        <div className="wl-modal-bg" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="wl-modal">
            <div className="wl-modal-icon">🗑️</div>
            <div className="wl-modal-title">Vider les favoris ?</div>
            <p className="wl-modal-text">
              Tous vos {wishlist.length} parfum{wishlist.length > 1 ? "s" : ""} sauvegardé{wishlist.length > 1 ? "s" : ""} seront supprimés de votre liste. Cette action est irréversible.
            </p>
            <div className="wl-modal-btns">
              <button className="wl-modal-cancel" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="wl-modal-confirm" onClick={handleConfirmClear}>Vider la liste</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="wl-added-toast">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          {toast}
        </div>
      )}
    </div>
  );
}
