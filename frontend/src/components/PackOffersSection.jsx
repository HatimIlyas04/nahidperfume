import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Inject CSS once ──────────────────────────────── */
const PACK_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --pk-ink:      #0E0E0C;
    --pk-cream:    #FAF8F5;
    --pk-sand:     #EDE9E1;
    --pk-white:    #FFFFFF;
    --pk-coral:    #EF776A;
    --pk-coral-dk: #C9503F;
    --pk-gold:     #C9A96E;
    --pk-gold-lt:  #F5E9D0;
    --pk-muted:    #7A7770;
    --pk-border:   rgba(14,14,12,0.09);
    --pk-sans:     'Poppins', sans-serif;
    --pk-serif:    'Cormorant Garamond', Georgia, serif;
    --pk-ease:     cubic-bezier(0.25,0.46,0.45,0.94);
    --pk-spring:   cubic-bezier(0.34,1.56,0.64,1);
  }

  /* ── Animations ── */
  @keyframes pkFadeUp   { from{opacity:0;transform:translateY(32px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes pkScaleIn  { from{opacity:0;transform:scale(0.88);}       to{opacity:1;transform:scale(1);} }
  @keyframes pkShimmer  { from{background-position:200% 0;} to{background-position:-200% 0;} }
  @keyframes pkGlow     { 0%,100%{box-shadow:0 0 30px rgba(239,119,106,0.2);}  50%{box-shadow:0 0 60px rgba(239,119,106,0.35);} }
  @keyframes pkGoldGlow { 0%,100%{box-shadow:0 0 30px rgba(201,169,110,0.2);}  50%{box-shadow:0 0 60px rgba(201,169,110,0.35);} }
  @keyframes pkFloat    { 0%,100%{transform:translateY(0);}   50%{transform:translateY(-6px);} }
  @keyframes pkPulse    { 0%,100%{opacity:1;transform:scale(1);}  50%{opacity:0.7;transform:scale(0.95);} }
  @keyframes pkStar     { 0%,100%{transform:rotate(0deg) scale(1);}  50%{transform:rotate(15deg) scale(1.15);} }
  @keyframes pkMarquee  { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes pkOrb      { 0%,100%{transform:translate(0,0);}  50%{transform:translate(20px,-20px);} }
  @keyframes pkReveal   { from{clip-path:inset(0 100% 0 0);} to{clip-path:inset(0 0% 0 0);} }

  .pk-aos { opacity:0;transform:translateY(28px);transition:opacity 0.8s var(--pk-ease),transform 0.8s var(--pk-ease); }
  .pk-aos.pk-vis { opacity:1;transform:translateY(0); }
  .pk-d1{transition-delay:.06s}.pk-d2{transition-delay:.13s}.pk-d3{transition-delay:.20s}.pk-d4{transition-delay:.27s}

  /* ─────────────────────────────────────────
     SECTION WRAPPER
  ───────────────────────────────────────── */
  .pk-section {
    padding: clamp(80px,10vw,140px) 0 clamp(100px,12vw,160px);
    background: var(--pk-ink);
    position: relative;
    overflow: hidden;
    font-family: var(--pk-sans);
  }
  .pk-section * { box-sizing:border-box; }

  /* Background decorative orbs */
  .pk-bg-orb {
    position:absolute;border-radius:50%;pointer-events:none;
  }
  .pk-bg-orb-1 {
    width:700px;height:700px;top:-250px;left:-250px;
    background:radial-gradient(circle,rgba(239,119,106,0.09),transparent 70%);
    animation:pkOrb 20s ease-in-out infinite;
  }
  .pk-bg-orb-2 {
    width:500px;height:500px;bottom:-150px;right:-150px;
    background:radial-gradient(circle,rgba(201,169,110,0.08),transparent 70%);
    animation:pkOrb 16s ease-in-out infinite reverse;
  }
  .pk-bg-orb-3 {
    width:300px;height:300px;top:40%;left:50%;
    background:radial-gradient(circle,rgba(239,119,106,0.04),transparent 70%);
    animation:pkOrb 24s ease-in-out infinite 3s;
  }

  /* Subtle grid lines */
  .pk-grid-bg {
    position:absolute;inset:0;pointer-events:none;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size:80px 80px;
    opacity:0.5;
  }

  /* ── Header ── */
  .pk-header {
    text-align:center;
    margin-bottom:clamp(48px,7vw,88px);
    position:relative;z-index:1;
  }
  .pk-eyebrow {
    display:inline-flex;align-items:center;gap:12px;
    font-size:0.6rem;font-weight:700;letter-spacing:0.35em;text-transform:uppercase;
    color:var(--pk-gold);margin-bottom:20px;
  }
  .pk-eyebrow::before,.pk-eyebrow::after {
    content:'';width:32px;height:1px;background:linear-gradient(to right,transparent,var(--pk-gold));
  }
  .pk-eyebrow::after { background:linear-gradient(to left,transparent,var(--pk-gold)); }

  .pk-title {
    font-family:var(--pk-sans);
    font-size:clamp(2.4rem,7vw,5.2rem);
    font-weight:900;color:white;
    letter-spacing:-0.04em;line-height:0.95;
    margin-bottom:20px;
  }
  .pk-title em {
    font-style:italic;font-weight:300;font-family:var(--pk-serif);
    color:var(--pk-coral);font-size:1.08em;display:block;
  }
  .pk-subtitle {
    font-size:clamp(0.82rem,1.2vw,0.95rem);
    color:rgba(255,255,255,0.4);max-width:440px;margin:0 auto;line-height:1.8;
  }

  /* Savings ribbon */
  .pk-savings-ribbon {
    display:inline-flex;align-items:center;gap:8px;
    margin-top:28px;
    padding:10px 24px;border-radius:999px;
    background:rgba(74,222,128,0.1);
    border:1px solid rgba(74,222,128,0.2);
    font-size:0.7rem;font-weight:800;
    color:rgba(74,222,128,0.9);letter-spacing:0.1em;text-transform:uppercase;
  }
  .pk-savings-dot { width:6px;height:6px;border-radius:50%;background:#4ADE80;animation:pkPulse 1.8s ease infinite; }

  /* ── Cards Grid ── */
  .pk-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:16px;
    position:relative;z-index:1;
    align-items:stretch;
  }

  /* ── Single Card ── */
  .pk-card {
    border-radius:28px;
    padding:clamp(28px,3vw,40px) clamp(22px,2.5vw,32px) clamp(32px,4vw,44px);
    position:relative;overflow:hidden;
    cursor:pointer;
    border:1.5px solid rgba(255,255,255,0.07);
    background:rgba(255,255,255,0.03);
    display:flex;flex-direction:column;
    transition:transform 0.45s var(--pk-spring), box-shadow 0.45s, border-color 0.3s, background 0.3s;
  }
  .pk-card:hover {
    transform:translateY(-10px) scale(1.015);
    border-color:rgba(255,255,255,0.14);
    background:rgba(255,255,255,0.06);
    box-shadow:0 32px 80px rgba(0,0,0,0.4);
  }

  /* Highlighted card (Pack 3 / Best Value) */
  .pk-card.pk-featured {
    background:rgba(239,119,106,0.08);
    border-color:var(--pk-coral);
    box-shadow:0 0 40px rgba(239,119,106,0.15), 0 8px 40px rgba(0,0,0,0.3);
    animation:pkGlow 4s ease-in-out infinite;
    transform:scale(1.03);
  }
  .pk-card.pk-featured:hover {
    transform:translateY(-12px) scale(1.045);
    box-shadow:0 40px 100px rgba(239,119,106,0.25), 0 0 60px rgba(239,119,106,0.2);
  }

  /* Golden card */
  .pk-card.pk-golden {
    background:rgba(201,169,110,0.07);
    border-color:rgba(201,169,110,0.4);
    box-shadow:0 0 30px rgba(201,169,110,0.1), 0 8px 32px rgba(0,0,0,0.25);
    animation:pkGoldGlow 4s ease-in-out infinite;
  }
  .pk-card.pk-golden:hover {
    border-color:var(--pk-gold);
    box-shadow:0 40px 100px rgba(201,169,110,0.2), 0 0 60px rgba(201,169,110,0.15);
  }

  /* Inner shimmer on featured */
  .pk-card.pk-featured::before {
    content:'';position:absolute;inset:0;border-radius:26px;pointer-events:none;
    background:linear-gradient(135deg,rgba(239,119,106,0.08) 0%,transparent 60%);
  }
  .pk-card.pk-golden::before {
    content:'';position:absolute;inset:0;border-radius:26px;pointer-events:none;
    background:linear-gradient(135deg,rgba(201,169,110,0.08) 0%,transparent 60%);
  }

  /* Top badge */
  .pk-top-badge {
    position:absolute;top:-1px;left:50%;transform:translateX(-50%);
    padding:6px 18px;border-radius:0 0 14px 14px;
    font-family:var(--pk-sans);font-size:0.58rem;font-weight:800;
    letter-spacing:0.14em;text-transform:uppercase;
    display:inline-flex;align-items:center;gap:6px;
    white-space:nowrap;
    z-index:2;
  }
  .pk-top-badge.coral { background:var(--pk-coral);color:white;box-shadow:0 4px 16px rgba(239,119,106,0.4); }
  .pk-top-badge.gold  { background:linear-gradient(135deg,var(--pk-gold),#B8922A);color:white;box-shadow:0 4px 16px rgba(201,169,110,0.4); }
  .pk-top-badge.green { background:#1B5E20;color:white; }

  /* Card tag (top-left) */
  .pk-card-tag {
    font-size:0.58rem;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;
    color:rgba(255,255,255,0.3);margin-bottom:20px;
    display:flex;align-items:center;gap:8px;
    position:relative;z-index:1;
  }
  .pk-card.pk-featured .pk-card-tag { color:rgba(239,119,106,0.7); }
  .pk-card.pk-golden .pk-card-tag   { color:rgba(201,169,110,0.7); }

  /* Quantity display */
  .pk-qty-display {
    display:flex;align-items:baseline;gap:6px;
    margin-bottom:6px;
    position:relative;z-index:1;
  }
  .pk-qty-num {
    font-family:var(--pk-sans);
    font-size:clamp(3.5rem,7vw,5.5rem);
    font-weight:900;color:white;
    letter-spacing:-0.05em;line-height:1;
  }
  .pk-qty-label {
    font-size:clamp(0.75rem,1.2vw,0.9rem);font-weight:600;
    color:rgba(255,255,255,0.35);
    padding-bottom:8px;
  }

  .pk-volume-tag {
    display:inline-flex;align-items:center;gap:5px;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:999px;padding:5px 12px;
    font-size:0.62rem;font-weight:700;letter-spacing:0.1em;
    color:rgba(255,255,255,0.45);margin-bottom:24px;
    position:relative;z-index:1;
    width:fit-content;
  }

  /* Price */
  .pk-price-block { margin-bottom:24px;position:relative;z-index:1; }
  .pk-price-original {
    font-size:0.78rem;color:rgba(255,255,255,0.25);text-decoration:line-through;
    margin-bottom:3px;
  }
  .pk-price {
    font-family:var(--pk-serif);
    font-size:clamp(2.2rem,4vw,3rem);font-weight:600;
    color:white;letter-spacing:-0.02em;line-height:1;
  }
  .pk-price sub {
    font-family:var(--pk-sans);font-size:0.5em;font-weight:700;
    color:rgba(255,255,255,0.45);letter-spacing:0;vertical-align:baseline;
    margin-left:4px;
  }
  .pk-price-per {
    font-size:0.65rem;font-weight:600;color:rgba(255,255,255,0.3);
    margin-top:5px;letter-spacing:0.04em;
  }

  /* Perks list */
  .pk-perks {
    display:flex;flex-direction:column;gap:9px;
    margin-bottom:28px;flex:1;
    position:relative;z-index:1;
  }
  .pk-perk {
    display:flex;align-items:center;gap:9px;
    font-size:0.73rem;font-weight:500;color:rgba(255,255,255,0.5);
    line-height:1.3;
  }
  .pk-perk-icon {
    width:18px;height:18px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;font-size:0.6rem;
  }
  .pk-perk-icon.green { background:rgba(74,222,128,0.15);color:#4ADE80; }
  .pk-perk-icon.coral { background:rgba(239,119,106,0.15);color:var(--pk-coral); }
  .pk-perk-icon.gold  { background:rgba(201,169,110,0.15);color:var(--pk-gold); }
  .pk-perk.featured { color:rgba(255,255,255,0.75); }

  /* Savings badge */
  .pk-savings-badge {
    display:inline-flex;align-items:center;gap:5px;
    padding:5px 12px;border-radius:999px;
    font-size:0.6rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;
    margin-bottom:18px;width:fit-content;
    position:relative;z-index:1;
  }
  .pk-savings-badge.green {
    background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.2);
    color:rgba(74,222,128,0.9);
  }
  .pk-savings-badge.coral {
    background:rgba(239,119,106,0.12);border:1px solid rgba(239,119,106,0.25);
    color:rgba(239,119,106,0.9);
  }
  .pk-savings-badge.gold {
    background:rgba(201,169,110,0.12);border:1px solid rgba(201,169,110,0.25);
    color:rgba(201,169,110,0.9);
  }

  /* CTA Button */
  .pk-btn {
    width:100%;padding:15px 20px;
    border-radius:999px;border:none;cursor:pointer;
    font-family:var(--pk-sans);font-size:0.72rem;font-weight:800;
    letter-spacing:0.1em;text-transform:uppercase;
    display:flex;align-items:center;justify-content:center;gap:8px;
    transition:transform 0.25s var(--pk-spring), box-shadow 0.25s, background 0.2s;
    position:relative;z-index:1;
    text-decoration:none;
  }
  .pk-btn.default {
    background:rgba(255,255,255,0.07);
    border:1.5px solid rgba(255,255,255,0.12);
    color:rgba(255,255,255,0.7);
  }
  .pk-btn.default:hover {
    background:rgba(255,255,255,0.13);
    color:white;
    transform:translateY(-2px);
  }
  .pk-btn.coral {
    background:linear-gradient(135deg,var(--pk-coral),var(--pk-coral-dk));
    color:white;
    box-shadow:0 8px 28px rgba(239,119,106,0.4);
  }
  .pk-btn.coral:hover {
    transform:translateY(-3px) scale(1.02);
    box-shadow:0 16px 44px rgba(239,119,106,0.55);
  }
  .pk-btn.gold {
    background:linear-gradient(135deg,var(--pk-gold),#B8922A);
    color:white;
    box-shadow:0 8px 28px rgba(201,169,110,0.35);
  }
  .pk-btn.gold:hover {
    transform:translateY(-3px) scale(1.02);
    box-shadow:0 16px 44px rgba(201,169,110,0.45);
  }

  /* ── Comparison Strip ── */
  .pk-compare {
    margin-top:clamp(48px,6vw,80px);
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:24px;
    padding:clamp(28px,4vw,48px);
    position:relative;z-index:1;
  }
  .pk-compare-title {
    font-family:var(--pk-sans);font-size:0.68rem;font-weight:800;
    letter-spacing:0.2em;text-transform:uppercase;
    color:rgba(255,255,255,0.25);text-align:center;margin-bottom:28px;
  }
  .pk-compare-row {
    display:grid;grid-template-columns:1.5fr repeat(4,1fr);gap:0;
    border-radius:16px;overflow:hidden;
  }
  .pk-compare-head {
    display:contents;
  }
  .pk-compare-cell {
    padding:14px 16px;
    font-size:0.7rem;font-weight:600;color:rgba(255,255,255,0.4);
    border-bottom:1px solid rgba(255,255,255,0.05);
    border-right:1px solid rgba(255,255,255,0.04);
    text-align:center;
  }
  .pk-compare-cell:first-child { text-align:left; }
  .pk-compare-cell:last-child { border-right:none; }
  .pk-compare-cell.header {
    font-size:0.62rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;
    color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.02);
  }
  .pk-compare-cell.featured-col { color:var(--pk-coral);font-weight:700; }
  .pk-compare-cell.gold-col { color:var(--pk-gold);font-weight:700; }
  .pk-compare-cell.yes { color:#4ADE80; }
  .pk-compare-cell.no  { color:rgba(255,255,255,0.15); }
  .pk-compare-row-data:last-child .pk-compare-cell { border-bottom:none; }

  /* ── Trust Footer ── */
  .pk-trust {
    display:flex;gap:0;flex-wrap:wrap;
    justify-content:center;
    margin-top:clamp(40px,5vw,64px);
    padding-top:clamp(32px,4vw,52px);
    border-top:1px solid rgba(255,255,255,0.06);
    position:relative;z-index:1;
  }
  .pk-trust-item {
    display:flex;align-items:center;gap:10px;
    padding:0 clamp(20px,3vw,40px);
    border-right:1px solid rgba(255,255,255,0.06);
    font-size:0.72rem;font-weight:600;color:rgba(255,255,255,0.3);
    letter-spacing:0.02em;
  }
  .pk-trust-item:last-child { border-right:none; }
  .pk-trust-item:hover { color:rgba(255,255,255,0.6); }
  .pk-trust-icon { font-size:1rem; }

  /* ── Responsive ── */
  @media (max-width:1200px) { .pk-grid { grid-template-columns:repeat(2,1fr);gap:14px; } .pk-card.pk-featured { transform:none; } }
  @media (max-width:768px) {
    .pk-grid { grid-template-columns:1fr;gap:14px; }
    .pk-compare { display:none; }
    .pk-trust { flex-direction:column;align-items:center;gap:14px; }
    .pk-trust-item { border-right:none; }
    .pk-qty-num { font-size:3.5rem; }
    .pk-price { font-size:2.2rem; }
  }
  @media (max-width:480px) {
    .pk-grid { grid-template-columns:1fr; }
    .pk-card { padding:28px 22px 32px; }
    .pk-trust { gap:12px; }
  }
`;

function injectPackStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-pack-css")) {
    const tag = document.createElement("style");
    tag.id = "nahid-pack-css";
    tag.textContent = PACK_CSS;
    document.head.appendChild(tag);
  }
}

/* ─── Pack data ──────────────────────────────────── */
const PACKS = [
  {
    id: "p1",
    name: "Pack 1",
    qty: 4,
    volume: "35ML × 4",
    price: 160,
    origPrice: null,
    savings: null,
    perUnit: "40 dh / flacon",
    badge: null,
    topBadge: null,
    variant: "default",
    btnVariant: "default",
    perks: [
      { icon: "✓", cls: "green", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "green", text: "Idéal pour débuter" },
      { icon: "✓", cls: "green", text: "Paiement à la livraison" },
    ],
  },
  {
    id: "p2",
    name: "Pack 2",
    qty: 8,
    volume: "35ML × 8",
    price: 290,
    origPrice: 320,
    savings: "Économie 30 dh",
    perUnit: "36 dh / flacon",
    badge: { text: "Best Seller", cls: "coral" },
    topBadge: { text: "🔥 Le plus populaire", cls: "coral" },
    variant: "default",
    btnVariant: "coral",
    perks: [
      { icon: "✓", cls: "green", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "coral", text: "🔥 Best Seller" },
      { icon: "✓", cls: "green", text: "Économie 30 dh" },
      { icon: "✓", cls: "green", text: "Paiement à la livraison" },
    ],
  },
  {
    id: "p3",
    name: "Pack 3",
    qty: 12,
    volume: "35ML × 12",
    price: 410,
    origPrice: 480,
    savings: "Économie 70 dh",
    perUnit: "34 dh / flacon",
    badge: { text: "Meilleur rapport", cls: "green" },
    topBadge: { text: "⚡ Meilleur rapport", cls: "green" },
    variant: "featured",
    btnVariant: "coral",
    isFeatured: true,
    perks: [
      { icon: "✓", cls: "green", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "coral", text: "⚡ Stock limité" },
      { icon: "✓", cls: "green", text: "Économie 70 dh" },
      { icon: "✓", cls: "green", text: "Prix par flacon le plus bas" },
      { icon: "✓", cls: "green", text: "Paiement à la livraison" },
    ],
  },
  {
    id: "golden",
    name: "Golden Offer",
    qty: 6,
    volume: "35ML × 6",
    price: 210,
    origPrice: 240,
    savings: "Économie 30 dh",
    perUnit: "35 dh / flacon",
    badge: { text: "✦ Édition limitée", cls: "gold" },
    topBadge: { text: "✦ Offre dorée", cls: "gold" },
    variant: "golden",
    btnVariant: "gold",
    perks: [
      { icon: "✓", cls: "green", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "gold", text: "✦ Édition limitée" },
      { icon: "✓", cls: "green", text: "Économie 30 dh" },
      { icon: "✓", cls: "green", text: "Paiement à la livraison" },
    ],
  },
];

const COMPARE_ROWS = [
  { label: "Nombre de flacons", p1: "4 ×", p2: "8 ×", p3: "12 ×", golden: "6 ×" },
  { label: "Volume", p1: "35ML", p2: "35ML", p3: "35ML", golden: "35ML" },
  { label: "Prix total", p1: "160 dh", p2: "290 dh", p3: "410 dh", golden: "210 dh", pFeat: "p3", pGold: "golden" },
  { label: "Prix / flacon", p1: "40 dh", p2: "36 dh", p3: "34 dh", golden: "35 dh", featClass: true },
  { label: "Livraison gratuite", p1: "yes", p2: "yes", p3: "yes", golden: "yes", isBool: true },
  { label: "Économies", p1: "no", p2: "30 dh", p3: "70 dh", golden: "30 dh" },
];

/* ─── PackOffersSection Component ───────────────── */
const PackOffersSection = ({ onSelectPack }) => {
  injectPackStyles();
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  /* AOS observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("pk-vis"); }),
      { threshold: 0.08 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll(".pk-aos").forEach(el => obs.observe(el));
    }
    return () => obs.disconnect();
  });

  const fmt = n => Math.round(n).toLocaleString("fr-MA");

  return (
    <section className="pk-section" ref={sectionRef}>
      {/* Background */}
      <div className="pk-bg-orb pk-bg-orb-1" />
      <div className="pk-bg-orb pk-bg-orb-2" />
      <div className="pk-bg-orb pk-bg-orb-3" />
      <div className="pk-grid-bg" />

      <div className="container">

        {/* ── Header ── */}
        <div className="pk-header">
          <div className="pk-eyebrow pk-aos">Nos offres exclusives</div>
          <h2 className="pk-title pk-aos">
            Choisissez votre
            <em>coffret idéal</em>
          </h2>
          <p className="pk-subtitle pk-aos">
            Plus vous commandez, plus vous économisez. Livraison gratuite incluse sur toutes les offres, partout au Maroc 🇲🇦
          </p>
          <div className="pk-savings-ribbon pk-aos">
            <span className="pk-savings-dot" />
            Jusqu'à 70 dh d'économies sur le Pack 3
          </div>
        </div>

        {/* ── Pack Cards ── */}
        <div className="pk-grid">
          {PACKS.map((pack, i) => (
            <div
              key={pack.id}
              className={`pk-card${pack.variant !== "default" ? ` pk-${pack.variant}` : ""} pk-aos pk-d${i + 1}`}
              onMouseEnter={() => setHoveredId(pack.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Top badge */}
              {pack.topBadge && (
                <div className={`pk-top-badge ${pack.topBadge.cls}`}>
                  {pack.topBadge.text}
                </div>
              )}

              {/* Card tag */}
              <div className="pk-card-tag">
                <span style={{
                  width:"16px",height:"1px",display:"block",
                  background: pack.variant === "golden" ? "rgba(201,169,110,0.4)" : pack.variant === "featured" ? "rgba(239,119,106,0.4)" : "rgba(255,255,255,0.12)"
                }} />
                {pack.name}
              </div>

              {/* Quantity */}
              <div className="pk-qty-display">
                <div className="pk-qty-num">{pack.qty}</div>
                <div className="pk-qty-label">flacons</div>
              </div>

              <div className="pk-volume-tag">
                {pack.volume}
              </div>

              {/* Savings badge */}
              {pack.savings && (
                <div className={`pk-savings-badge ${pack.variant === "golden" ? "gold" : pack.isFeatured ? "coral" : "green"}`}>
                  🎉 {pack.savings}
                </div>
              )}

              {/* Price */}
              <div className="pk-price-block">
                {pack.origPrice && (
                  <div className="pk-price-original">{fmt(pack.origPrice)} dh</div>
                )}
                <div className="pk-price">
                  {fmt(pack.price)}<sub>dh</sub>
                </div>
                <div className="pk-price-per">≈ {pack.perUnit}</div>
              </div>

              {/* Perks */}
              <div className="pk-perks">
                {pack.perks.map((perk, pi) => (
                  <div key={pi} className={`pk-perk${pack.isFeatured ? " featured" : ""}`}>
                    <span className={`pk-perk-icon ${perk.cls}`}>
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {perk.text}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#collection"
                className={`pk-btn ${pack.btnVariant}`}
                onClick={() => onSelectPack?.(pack.id)}
              >
                Choisir cette offre
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* ── Comparison Table (desktop) ── */}
        <div className="pk-compare pk-aos">
          <div className="pk-compare-title">Comparatif des offres</div>
          <div className="pk-compare-row pk-compare-head">
            <div className="pk-compare-cell header">Offre</div>
            <div className="pk-compare-cell header">Pack 1</div>
            <div className="pk-compare-cell header">Pack 2</div>
            <div className="pk-compare-cell header featured-col">Pack 3 ⚡</div>
            <div className="pk-compare-cell header gold-col">Golden ✦</div>
          </div>
          {COMPARE_ROWS.map((row, ri) => (
            <div key={ri} className="pk-compare-row pk-compare-row-data">
              <div className="pk-compare-cell" style={{textAlign:"left",color:"rgba(255,255,255,0.4)"}}>{row.label}</div>
              {[
                { val: row.p1, isPFeat: false, isGold: false },
                { val: row.p2, isPFeat: false, isGold: false },
                { val: row.p3, isPFeat: true,  isGold: false },
                { val: row.golden, isPFeat: false, isGold: true  },
              ].map(({ val, isPFeat, isGold }, ci) => (
                <div
                  key={ci}
                  className={`pk-compare-cell${isPFeat ? " featured-col" : isGold ? " gold-col" : ""} ${row.isBool ? (val === "yes" ? "yes" : "no") : ""}`}
                >
                  {row.isBool ? (val === "yes" ? "✓" : "—") : val === "no" ? "—" : val}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Trust Footer ── */}
        <div className="pk-trust pk-aos">
          {[
            { icon: "🚚", text: "Livraison gratuite sur toutes les offres" },
            { icon: "💳", text: "Paiement à la livraison" },
            { icon: "↩️", text: "Retours gratuits 30 jours" },
            { icon: "🇲🇦", text: "Livraison partout au Maroc" },
            { icon: "⭐", text: "4.9/5 · 2 400 clients satisfaits" },
          ].map(({ icon, text }) => (
            <div key={text} className="pk-trust-item">
              <span className="pk-trust-icon">{icon}</span>
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PackOffersSection;