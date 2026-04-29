import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiChevronLeft, FiShoppingBag, FiStar } from "react-icons/fi";

/* ─── Static data (unchanged) ─────────────────────────────────── */
const SIZES = [
  { label: "30 ml", price: 590, tag: null },
  { label: "50 ml", price: 890, tag: "Populaire" },
  { label: "Coffret 3×30ml", price: 1470, tag: "−15%" },
];

const SCENTS = [
  {
    key: "femme",
    label: "Femme",
    desc: "Floral et délicat, avec des notes de rose de Taif, jasmin de Grasse et musc blanc. Une fragrance aérienne et féminine.",
    color: "#FADADD",
    accent: "#C9748A",
    emoji: "🌸",
  },
  {
    key: "homme",
    label: "Homme",
    desc: "Boisé et intense, avec des accords de cèdre du Liban, vétiver de Java et fève tonka. Une signature masculine affirmée.",
    color: "#D4C9B0",
    accent: "#7A6443",
    emoji: "🪵",
  },
  {
    key: "unisex",
    label: "Unisex",
    desc: "Équilibré et envoûtant, avec de l'oud de Camboge, de l'ambre gris et une touche de bergamote. Pour tous les esprits libres.",
    color: "#C8D5CC",
    accent: "#4A7A62",
    emoji: "✦",
  },
];

const PERKS = [
  { icon: "🚚", text: "Livraison offerte dès 500 MAD" },
  { icon: "🔒", text: "Paiement 100% sécurisé" },
  { icon: "🔄", text: "Retours sous 14 jours" },
  { icon: "🇲🇦", text: "Livraison partout au Maroc" },
];

const NOTES = [
  { icon: "🌿", type: "Tête", value: "Bergamote · Citron · Cardamome" },
  { icon: "🌸", type: "Cœur", value: "Rose · Jasmin · Géranium" },
  { icon: "🪵", type: "Fond", value: "Oud · Musc · Ambre · Cèdre" },
];

/* ─── Component ────────────────────────────────────────────────── */
const ProductDetails = ({ addToCart, onCartOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedScent, setSelectedScent] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((r) => setProduct(r.data))
      .catch(() => navigate("/"))
      .finally(() => {
        setLoading(false);
        setTimeout(() => setReveal(true), 60);
      });
  }, [id, navigate]);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current)
        setShowSticky(window.scrollY > heroRef.current.offsetHeight + 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fmt = (n) => Math.round(n).toLocaleString("fr-MA");
  const currentPrice = SIZES[selectedSize].price;
  const basePrice =
    typeof product?.price === "string"
      ? parseFloat(product.price)
      : product?.price || 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        ...product,
        price: currentPrice,
        size: SIZES[selectedSize].label,
        scentType: SCENTS[selectedScent].key,
      },
      quantity
    );
    setAdded(true);
    onCartOpen?.();
    setTimeout(() => setAdded(false), 2500);
  };

  const scent = SCENTS[selectedScent];

  /* ── Loading ─────────────────────────────────────────────────── */
  if (loading)
    return (
      <>
        <style>{globalCSS}</style>
        <div className="pd-loader">
          <div className="pd-loader__ring" />
          <p className="pd-loader__text">Chargement…</p>
        </div>
      </>
    );

  if (!product) return null;

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <>
      <style>{globalCSS}</style>

      <div className={`pd-page ${reveal ? "pd-page--revealed" : ""}`}>
        {/* ── Ambient background ── */}
        <div
          className="pd-ambient"
          style={{ "--ambient-color": scent.color }}
        />

        {/* ── Back button ── */}
        <button className="pd-back" onClick={() => navigate(-1)}>
          <FiChevronLeft size={16} />
          <span>Retour</span>
        </button>

        {/* ── Hero grid ── */}
        <div className="pd-grid container" ref={heroRef}>
          {/* Left: image */}
          <div className="pd-img-col">
            <div className="pd-img-frame">
              {/* Decorative rings */}
              <div className="pd-img-ring pd-img-ring--1" />
              <div className="pd-img-ring pd-img-ring--2" />

              {/* Badge */}
              {product.stock < 5 && product.stock > 0 && (
                <div className="pd-stock-badge">
                  Dernières {product.stock} pièces
                </div>
              )}

              {/* Image */}
              <div className={`pd-img-wrap ${imgLoaded ? "pd-img-wrap--loaded" : ""}`}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  loading="lazy"
                  onLoad={() => setImgLoaded(true)}
                  className="pd-img"
                />
              </div>

              {/* Scent halo */}
              <div
                className="pd-img-halo"
                style={{ background: `radial-gradient(ellipse at 50% 80%, ${scent.color}cc 0%, transparent 70%)` }}
              />
            </div>

            {/* Rating strip below image */}
            <div className="pd-rating-strip">
              <div className="pd-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <FiStar key={n} size={13} fill="#EF776A" color="#EF776A" strokeWidth={0} />
                ))}
              </div>
              <span className="pd-rating-label">4.9 · 48 avis</span>
              <span className="pd-rating-sep">|</span>
              <span className="pd-rating-label">Certifié authentique</span>
            </div>
          </div>

          {/* Right: details */}
          <div className="pd-details-col">
            {product.category && (
              <span className="pd-category">{product.category}</span>
            )}

            <h1 className="pd-name">{product.name}</h1>

            <p className="pd-tagline">
              Une essence rare, née au croisement de l'Orient et du raffinement.
            </p>

            {/* ── Scent selector ── */}
            <div className="pd-section">
              <p className="pd-section__label">Type de fragrance</p>
              <div className="pd-scents">
                {SCENTS.map((s, i) => (
                  <button
                    key={s.key}
                    className={`pd-scent-btn ${selectedScent === i ? "pd-scent-btn--active" : ""}`}
                    style={{
                      "--scent-color": s.color,
                      "--scent-accent": s.accent,
                    }}
                    onClick={() => setSelectedScent(i)}
                  >
                    <span className="pd-scent-btn__emoji">{s.emoji}</span>
                    <span className="pd-scent-btn__label">{s.label}</span>
                  </button>
                ))}
              </div>
              <div
                className="pd-scent-desc"
                style={{ "--scent-accent": scent.accent }}
              >
                <span className="pd-scent-desc__emoji">{scent.emoji}</span>
                <p>{scent.desc}</p>
              </div>
            </div>

            {/* ── Size upsell ── */}
            <div className="pd-section">
              <p className="pd-section__label">Contenance</p>
              <div className="pd-sizes">
                {SIZES.map((sz, i) => (
                  <button
                    key={sz.label}
                    className={`pd-size-card ${selectedSize === i ? "pd-size-card--active" : ""}`}
                    onClick={() => setSelectedSize(i)}
                  >
                    {sz.tag && (
                      <span className={`pd-size-card__tag ${selectedSize === i ? "pd-size-card__tag--active" : ""}`}>
                        {sz.tag}
                      </span>
                    )}
                    <span className="pd-size-card__vol">{sz.label}</span>
                    <span className="pd-size-card__price">{fmt(sz.price)} MAD</span>
                    {i === 2 && (
                      <span className="pd-size-card__save">
                        Économisez {fmt(Math.round(basePrice * 3 * 0.15))} MAD
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Buy row ── */}
            <div className="pd-buy-row">
              <div className="pd-qty">
                <button
                  className="pd-qty__btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="pd-qty__num">{quantity}</span>
                <button
                  className="pd-qty__btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                className={`pd-add-btn ${added ? "pd-add-btn--added" : ""} ${product.stock === 0 ? "pd-add-btn--oos" : ""}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <span className="pd-add-btn__inner">
                  {product.stock === 0 ? (
                    "Épuisé"
                  ) : added ? (
                    <>✓ Ajouté au panier !</>
                  ) : (
                    <>
                      <FiShoppingBag size={16} />
                      Ajouter — {fmt(currentPrice * quantity)} MAD
                    </>
                  )}
                </span>
                <span className="pd-add-btn__shine" />
              </button>
            </div>

            {/* ── Perks ── */}
            <div className="pd-perks">
              {PERKS.map((p) => (
                <div key={p.text} className="pd-perk">
                  <span className="pd-perk__icon">{p.icon}</span>
                  <span className="pd-perk__text">{p.text}</span>
                </div>
              ))}
            </div>

            {/* ── Description ── */}
            {product.description && (
              <div className="pd-desc pd-bordered-section">
                <h3 className="pd-section-title">Description</h3>
                <p className="pd-desc__text">{product.description}</p>
              </div>
            )}

            {/* ── Olfactive pyramid ── */}
            <div className="pd-notes pd-bordered-section">
              <h3 className="pd-section-title">Pyramide olfactive</h3>
              <div className="pd-notes__grid">
                {NOTES.map((n) => (
                  <div key={n.type} className="pd-note-card">
                    <span className="pd-note-card__icon">{n.icon}</span>
                    <p className="pd-note-card__type">{n.type}</p>
                    <p className="pd-note-card__value">{n.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky bar ── */}
        <div className={`pd-sticky ${showSticky ? "pd-sticky--visible" : ""}`}>
          <div className="pd-sticky__content">
            <div className="pd-sticky__info">
              <p className="pd-sticky__name">{product.name}</p>
              <p className="pd-sticky__price">{fmt(currentPrice)} MAD</p>
            </div>
            <button
              className={`pd-sticky__btn ${added ? "pd-sticky__btn--added" : ""}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {added ? "✓ Ajouté !" : "Ajouter au panier"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Global CSS
══════════════════════════════════════════════════════════════════ */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Tokens ──────────────────────────────────────────── */
  :root {
    --coral:   #EF776A;
    --coral-d: #D4574A;
    --coral-l: #FFF0EE;
    --ink:     #141414;
    --ink-2:   #3A3A3A;
    --gray:    #6B6B6B;
    --line:    #EBEBEB;
    --bg:      #FAF8F5;
    --white:   #FFFFFF;
    --gold:    #C9A96E;
    --radius:  20px;
    --ff-serif: 'Cormorant Garamond', Georgia, serif;
    --ff-sans:  'Jost', sans-serif;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── Reset ───────────────────────────────────────────── */
  .pd-page *, .pd-page *::before, .pd-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .pd-page button { font-family: var(--ff-sans); cursor: pointer; }
  .pd-page p, .pd-page span { font-family: var(--ff-sans); }

  /* ── Page ────────────────────────────────────────────── */
  .pd-page {
    position: relative;
    background: var(--bg);
    min-height: 100vh;
    padding: 100px 0 120px;
    overflow-x: hidden;
    font-family: var(--ff-sans);
  }

  /* ── Ambient glow ────────────────────────────────────── */
  .pd-ambient {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(ellipse 60% 50% at 80% 20%, var(--ambient-color, #FADADD) 0%, transparent 70%);
    opacity: 0.45;
    transition: background 0.8s ease;
  }

  /* ── Container ───────────────────────────────────────── */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* ── Reveal animation ────────────────────────────────── */
  .pd-page .pd-img-col,
  .pd-page .pd-details-col {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.9s var(--ease-out-expo), transform 0.9s var(--ease-out-expo);
  }
  .pd-page.pd-page--revealed .pd-img-col {
    opacity: 1; transform: none; transition-delay: 0.05s;
  }
  .pd-page.pd-page--revealed .pd-details-col {
    opacity: 1; transform: none; transition-delay: 0.18s;
  }

  /* ── Back button ─────────────────────────────────────── */
  .pd-back {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: var(--gray);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 0 40px 28px;
    transition: color 0.2s;
  }
  .pd-back:hover { color: var(--ink); }

  /* ── Grid ────────────────────────────────────────────── */
  .pd-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  /* ════════════════════════════════════════════════════════
     IMAGE COLUMN
  ════════════════════════════════════════════════════════ */
  .pd-img-col { position: sticky; top: 100px; }

  .pd-img-frame {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    background: linear-gradient(145deg, #F4F0EA 0%, #EDE8E0 100%);
    aspect-ratio: 3 / 4;
    box-shadow:
      0 4px 12px rgba(0,0,0,0.04),
      0 24px 60px rgba(0,0,0,0.10),
      inset 0 1px 0 rgba(255,255,255,0.7);
  }

  /* Decorative rings */
  .pd-img-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(239,119,106,0.15);
    pointer-events: none;
    animation: pd-ring-pulse 5s ease-in-out infinite;
  }
  .pd-img-ring--1 { width: 70%; height: 70%; top: -10%; right: -15%; animation-delay: 0s; }
  .pd-img-ring--2 { width: 50%; height: 50%; bottom: -10%; left: -10%; animation-delay: 2s; }
  @keyframes pd-ring-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.8; transform: scale(1.04); }
  }

  .pd-img-wrap {
    width: 100%; height: 100%;
    opacity: 0;
    transition: opacity 0.8s ease;
  }
  .pd-img-wrap--loaded { opacity: 1; }

  .pd-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.7s var(--ease-out-expo);
  }
  .pd-img-frame:hover .pd-img { transform: scale(1.035); }

  .pd-img-halo {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background 0.8s ease;
    mix-blend-mode: multiply;
    opacity: 0.5;
  }

  .pd-stock-badge {
    position: absolute;
    top: 18px; left: 18px;
    z-index: 2;
    background: white;
    color: var(--coral);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    box-shadow: 0 2px 12px rgba(239,119,106,0.2);
    animation: pd-badge-pulse 2s ease-in-out infinite;
  }
  @keyframes pd-badge-pulse {
    0%, 100% { box-shadow: 0 2px 12px rgba(239,119,106,0.2); }
    50%       { box-shadow: 0 2px 20px rgba(239,119,106,0.45); }
  }

  /* Rating strip */
  .pd-rating-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    padding: 14px 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.05);
  }
  .pd-stars { display: flex; gap: 3px; }
  .pd-rating-label { font-size: 0.78rem; color: var(--gray); }
  .pd-rating-sep { color: var(--line); }

  /* ════════════════════════════════════════════════════════
     DETAILS COLUMN
  ════════════════════════════════════════════════════════ */
  .pd-details-col { position: sticky; top: 100px; }

  .pd-category {
    display: inline-block;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--coral);
    margin-bottom: 12px;
    position: relative;
  }
  .pd-category::before {
    content: '';
    display: inline-block;
    width: 20px; height: 1px;
    background: var(--coral);
    vertical-align: middle;
    margin-right: 8px;
  }

  .pd-name {
    font-family: var(--ff-serif);
    font-size: clamp(2.4rem, 4.5vw, 3.4rem);
    font-weight: 400;
    color: var(--ink);
    line-height: 1.08;
    letter-spacing: -0.01em;
    margin-bottom: 14px;
  }

  .pd-tagline {
    font-size: 0.88rem;
    color: var(--gray);
    line-height: 1.7;
    font-style: italic;
    font-family: var(--ff-serif);
    margin-bottom: 32px;
    padding-left: 16px;
    border-left: 2px solid var(--line);
  }

  /* ── Sections ────────────────────────────────────────── */
  .pd-section { margin-bottom: 30px; }
  .pd-section__label {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ADADAD;
    margin-bottom: 14px;
  }

  /* ── Scent buttons ───────────────────────────────────── */
  .pd-scents { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }

  .pd-scent-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 22px;
    border-radius: 16px;
    border: 1.5px solid var(--line);
    background: white;
    color: var(--ink-2);
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.25s var(--ease-out-expo);
    position: relative;
    overflow: hidden;
  }
  .pd-scent-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--scent-color, #FADADD);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .pd-scent-btn--active::before { opacity: 1; }
  .pd-scent-btn--active {
    border-color: var(--scent-accent, #C9748A);
    color: var(--scent-accent, #C9748A);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--scent-color, #FADADD) 60%, transparent);
  }
  .pd-scent-btn__emoji { font-size: 1.1rem; position: relative; }
  .pd-scent-btn__label { position: relative; letter-spacing: 0.03em; }

  .pd-scent-desc {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 18px;
    background: white;
    border-radius: 16px;
    border-left: 3px solid var(--scent-accent, #C9748A);
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: border-color 0.4s;
  }
  .pd-scent-desc__emoji { font-size: 1.2rem; flex-shrink: 0; margin-top: 1px; }
  .pd-scent-desc p { font-size: 0.84rem; color: #555; line-height: 1.7; }

  /* ── Size cards ──────────────────────────────────────── */
  .pd-sizes { display: flex; flex-direction: column; gap: 10px; }

  .pd-size-card {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 16px 20px;
    border-radius: 16px;
    border: 1.5px solid var(--line);
    background: white;
    text-align: left;
    position: relative;
    overflow: hidden;
    transition: all 0.25s var(--ease-out-expo);
  }
  .pd-size-card--active {
    border-color: var(--coral);
    background: var(--coral-l);
    box-shadow: 0 0 0 3px rgba(239,119,106,0.12), 0 4px 20px rgba(239,119,106,0.12);
  }
  .pd-size-card:hover:not(.pd-size-card--active) {
    border-color: #CCC;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }

  .pd-size-card__vol {
    font-weight: 600;
    font-size: 0.88rem;
    color: var(--ink);
    flex: 1;
  }
  .pd-size-card__price {
    font-family: var(--ff-serif);
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--ink);
    margin-right: 14px;
  }
  .pd-size-card--active .pd-size-card__price { color: var(--coral); }

  .pd-size-card__tag {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 999px;
    background: #EBEBEB;
    color: #666;
    margin-right: 10px;
    transition: all 0.25s;
  }
  .pd-size-card__tag--active {
    background: var(--coral);
    color: white;
  }

  .pd-size-card__save {
    font-size: 0.7rem;
    color: #2E7D32;
    font-weight: 600;
    margin-left: auto;
  }

  /* ── Buy row ─────────────────────────────────────────── */
  .pd-buy-row {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 24px;
  }

  .pd-qty {
    display: flex;
    align-items: center;
    border: 1.5px solid var(--line);
    border-radius: 999px;
    background: white;
    overflow: hidden;
  }
  .pd-qty__btn {
    width: 44px; height: 52px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--ink);
    transition: background 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .pd-qty__btn:hover { background: var(--coral-l); }
  .pd-qty__num {
    min-width: 44px;
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    line-height: 52px;
    border-left: 1px solid var(--line);
    border-right: 1px solid var(--line);
    color: var(--ink);
  }

  /* Add to cart button */
  .pd-add-btn {
    flex: 1;
    height: 52px;
    border: none;
    border-radius: 999px;
    background: var(--coral);
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
    transition: background 0.3s, transform 0.15s, box-shadow 0.3s;
    box-shadow: 0 6px 28px rgba(239,119,106,0.35);
  }
  .pd-add-btn__inner {
    position: relative;
    z-index: 1;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 100%;
  }
  .pd-add-btn__shine {
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transform: skewX(-20deg);
    transition: none;
  }
  .pd-add-btn:hover:not(:disabled) {
    background: var(--coral-d);
    transform: translateY(-1px);
    box-shadow: 0 10px 36px rgba(239,119,106,0.45);
  }
  .pd-add-btn:hover .pd-add-btn__shine {
    animation: pd-shine 0.6s ease forwards;
  }
  @keyframes pd-shine {
    to { left: 150%; }
  }
  .pd-add-btn:active:not(:disabled) { transform: translateY(0); }
  .pd-add-btn--added { background: #2E7D32 !important; box-shadow: 0 6px 28px rgba(46,125,50,0.35) !important; }
  .pd-add-btn--oos { background: #DDD !important; box-shadow: none !important; cursor: not-allowed !important; }

  /* ── Perks ───────────────────────────────────────────── */
  .pd-perks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 28px;
    padding: 20px;
    background: white;
    border-radius: 18px;
    border: 1px solid var(--line);
  }
  .pd-perk {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.76rem;
    color: var(--ink-2);
    line-height: 1.4;
  }
  .pd-perk__icon { font-size: 1rem; flex-shrink: 0; }
  .pd-perk__text {}

  /* ── Bordered section ────────────────────────────────── */
  .pd-bordered-section {
    padding-top: 24px;
    margin-top: 4px;
    border-top: 1px solid var(--line);
    margin-bottom: 24px;
  }

  .pd-section-title {
    font-family: var(--ff-serif);
    font-size: 1.15rem;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.01em;
    margin-bottom: 14px;
  }

  .pd-desc__text {
    font-size: 0.87rem;
    line-height: 1.78;
    color: #555;
  }

  /* ── Olfactive notes ─────────────────────────────────── */
  .pd-notes__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .pd-note-card {
    background: white;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 18px 12px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .pd-note-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.07);
  }
  .pd-note-card__icon { font-size: 1.6rem; display: block; margin-bottom: 8px; }
  .pd-note-card__type {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ADADAD;
    margin-bottom: 6px;
  }
  .pd-note-card__value {
    font-size: 0.76rem;
    color: #444;
    line-height: 1.55;
  }

  /* ════════════════════════════════════════════════════════
     STICKY BAR
  ════════════════════════════════════════════════════════ */
  .pd-sticky {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 900;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-top: 1px solid var(--line);
    box-shadow: 0 -8px 32px rgba(0,0,0,0.08);
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.4s var(--ease-out-expo), opacity 0.4s ease;
    display: none;
  }
  .pd-sticky--visible { transform: translateY(0); opacity: 1; }

  .pd-sticky__content {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 40px;
    gap: 16px;
  }
  .pd-sticky__name {
    font-family: var(--ff-serif);
    font-size: 1.05rem;
    color: var(--ink);
    font-weight: 400;
  }
  .pd-sticky__price {
    font-size: 0.82rem;
    color: var(--coral);
    font-weight: 700;
    margin-top: 2px;
  }
  .pd-sticky__btn {
    background: var(--coral);
    color: white;
    border: none;
    border-radius: 999px;
    padding: 13px 28px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
    box-shadow: 0 4px 18px rgba(239,119,106,0.35);
  }
  .pd-sticky__btn:hover { background: var(--coral-d); transform: translateY(-1px); }
  .pd-sticky__btn--added { background: #2E7D32 !important; }

  /* ── Loader ──────────────────────────────────────────── */
  .pd-loader {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--bg);
  }
  .pd-loader__ring {
    width: 44px; height: 44px;
    border: 3px solid #F0F0F0;
    border-top-color: var(--coral, #EF776A);
    border-radius: 50%;
    animation: pd-spin 0.75s linear infinite;
  }
  .pd-loader__text {
    font-family: var(--ff-sans);
    font-size: 0.8rem;
    color: #999;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  @keyframes pd-spin { to { transform: rotate(360deg); } }

  /* ════════════════════════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════════════════════════ */

  /* Tablet */
  @media (max-width: 1024px) {
    .pd-grid { gap: 48px; }
    .pd-name { font-size: clamp(2rem, 5vw, 2.8rem); }
    .pd-sticky { display: block; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .container { padding: 0 20px; }
    .pd-back { padding: 0 20px 20px; }
    .pd-page { padding-top: 80px; padding-bottom: 100px; }

    .pd-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    /* Image col is no longer sticky on mobile */
    .pd-img-col { position: static; }
    .pd-details-col { position: static; }

    .pd-img-frame { aspect-ratio: 4 / 3; border-radius: 20px; }

    .pd-name { font-size: clamp(2rem, 8vw, 2.6rem); }
    .pd-tagline { margin-bottom: 24px; }

    .pd-notes__grid { grid-template-columns: repeat(3,1fr); gap: 8px; }
    .pd-note-card { padding: 14px 8px; }
    .pd-note-card__value { font-size: 0.7rem; }

    .pd-perks { grid-template-columns: 1fr; }

    .pd-sticky { display: block; }
    .pd-sticky__content { padding: 12px 20px; }

    .pd-add-btn { font-size: 0.84rem; }

    .pd-sizes { flex-direction: column; }

    .pd-scents { flex-wrap: wrap; }
    .pd-scent-btn { padding: 10px 18px; }

    /* Ambient less intense on mobile */
    .pd-ambient { opacity: 0.3; }
  }

  @media (max-width: 400px) {
    .pd-notes__grid { grid-template-columns: 1fr; }
    .pd-buy-row { flex-direction: column; }
    .pd-qty { width: 100%; justify-content: center; }
    .pd-add-btn { width: 100%; }
  }
`;

export default ProductDetails;