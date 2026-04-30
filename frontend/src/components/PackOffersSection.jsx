import { useState, useEffect, useRef } from "react";

/* ─── Inject CSS once ──────────────────────────────── */
const PACK_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --pk-ink:        #1C1A16;
    --pk-ink-2:      #3D3A33;
    --pk-cream:      #FBF8F3;
    --pk-cream-2:    #F5EFE4;
    --pk-cream-3:    #EDE5D8;
    --pk-white:      #FFFFFF;
    --pk-rose:       #D4857A;
    --pk-rose-d:     #B86B60;
    --pk-rose-l:     #F4E8E6;
    --pk-gold:       #C8A96A;
    --pk-gold-d:     #A8883E;
    --pk-gold-l:     #E9D6A9;
    --pk-gold-xl:    #FAF3E3;
    --pk-sage:       #7A9B7A;
    --pk-sage-l:     #E8F0E8;
    --pk-muted:      #8C8478;
    --pk-border:     rgba(28,26,22,0.09);
    --pk-border-2:   rgba(28,26,22,0.05);
    --pk-sans:       'DM Sans', sans-serif;
    --pk-serif:      'Cormorant Garamond', Georgia, serif;
    --pk-ease:       cubic-bezier(0.25,0.46,0.45,0.94);
    --pk-spring:     cubic-bezier(0.34,1.56,0.64,1);
    --pk-expo:       cubic-bezier(0.16,1,0.3,1);
  }

  /* ── Animations ── */
  @keyframes pkFadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:none} }
  @keyframes pkScaleIn  { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:none} }
  @keyframes pkFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pkPulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.65;transform:scale(0.9)} }
  @keyframes pkOrb      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(24px,-18px) scale(1.04)} }
  @keyframes pkShimmer  { from{background-position:200% 0} to{background-position:-200% 0} }
  @keyframes pkGoldGlow { 0%,100%{box-shadow:0 0 0 0 rgba(200,169,106,0)} 50%{box-shadow:0 0 32px 0 rgba(200,169,106,0.25)} }
  @keyframes pkRoseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(212,133,122,0)} 50%{box-shadow:0 0 32px 0 rgba(212,133,122,0.25)} }
  @keyframes pkLineGrow { from{width:0} to{width:100%} }
  @keyframes pkCardSheen { from{transform:translateX(-100%) skewX(-18deg)} to{transform:translateX(200%) skewX(-18deg)} }

  .pk-aos {
    opacity:0; transform:translateY(32px);
    transition:opacity 0.85s var(--pk-expo), transform 0.85s var(--pk-expo);
  }
  .pk-aos.pk-vis { opacity:1; transform:none; }
  .pk-d1{transition-delay:.08s} .pk-d2{transition-delay:.16s}
  .pk-d3{transition-delay:.26s} .pk-d4{transition-delay:.36s}

  /* ─────────────────────────────────────
     SECTION
  ───────────────────────────────────── */
  .pk-section {
    padding: clamp(80px,10vw,140px) 0 clamp(100px,12vw,160px);
    background: var(--pk-cream-2);
    position: relative;
    overflow: hidden;
    font-family: var(--pk-sans);
  }
  .pk-section * { box-sizing:border-box; }

  /* Decorative orbs — warm, cream-based */
  .pk-bg-orb {
    position:absolute; border-radius:50%; pointer-events:none;
  }
  .pk-bg-orb-1 {
    width:800px; height:800px; top:-300px; left:-300px;
    background:radial-gradient(circle, rgba(200,169,106,0.12), transparent 68%);
    animation:pkOrb 22s ease-in-out infinite;
  }
  .pk-bg-orb-2 {
    width:600px; height:600px; bottom:-200px; right:-200px;
    background:radial-gradient(circle, rgba(212,133,122,0.1), transparent 68%);
    animation:pkOrb 18s ease-in-out infinite reverse;
  }
  .pk-bg-orb-3 {
    width:350px; height:350px; top:40%; left:48%;
    background:radial-gradient(circle, rgba(200,169,106,0.07), transparent 68%);
    animation:pkOrb 28s ease-in-out infinite 4s;
  }

  /* Top wave divider */
  .pk-section::before {
    content:'';
    position:absolute; top:0; left:0; right:0;
    height:90px;
    background:var(--pk-cream);
    clip-path:ellipse(55% 100% at 50% 0%);
    pointer-events:none;
    z-index:0;
  }

  /* Subtle linen texture */
  .pk-texture {
    position:absolute; inset:0; pointer-events:none; opacity:0.4;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 28px,
        rgba(200,169,106,0.05) 28px,
        rgba(200,169,106,0.05) 29px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 28px,
        rgba(200,169,106,0.03) 28px,
        rgba(200,169,106,0.03) 29px
      );
  }

  /* ── Header ── */
  .pk-header {
    text-align:center;
    margin-bottom:clamp(52px,7vw,92px);
    position:relative; z-index:1;
  }
  .pk-eyebrow {
    display:inline-flex; align-items:center; gap:12px;
    font-size:0.6rem; font-weight:700; letter-spacing:0.32em; text-transform:uppercase;
    color:var(--pk-rose); margin-bottom:20px;
  }
  .pk-eyebrow::before,.pk-eyebrow::after {
    content:''; width:28px; height:1px;
    background:var(--pk-rose); opacity:0.6;
  }
  .pk-title {
    font-family:var(--pk-serif);
    font-size:clamp(2.6rem,6vw,4.8rem);
    font-weight:600; color:var(--pk-ink);
    letter-spacing:-0.02em; line-height:1.02;
    margin-bottom:20px;
  }
  .pk-title em {
    font-style:italic; font-weight:300;
    color:var(--pk-rose); display:block;
  }
  .pk-subtitle {
    font-size:clamp(0.82rem,1.2vw,0.96rem);
    color:var(--pk-muted); max-width:460px; margin:0 auto; line-height:1.82;
  }
  .pk-savings-ribbon {
    display:inline-flex; align-items:center; gap:8px;
    margin-top:28px; padding:10px 26px; border-radius:999px;
    background:rgba(122,155,122,0.1);
    border:1px solid rgba(122,155,122,0.25);
    font-size:0.7rem; font-weight:700;
    color:#4A7A4A; letter-spacing:0.08em; text-transform:uppercase;
  }
  .pk-savings-dot {
    width:6px; height:6px; border-radius:50%;
    background:#5A9A5A;
    animation:pkPulse 2s ease infinite;
  }

  /* ── Cards Grid ── */
  .pk-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:18px;
    position:relative; z-index:1;
    align-items:stretch;
  }

  /* ── Card Base ── */
  .pk-card {
    border-radius:28px;
    padding:clamp(28px,3vw,42px) clamp(22px,2.5vw,32px) clamp(32px,4vw,44px);
    position:relative; overflow:hidden;
    cursor:pointer;
    display:flex; flex-direction:column;
    transition:transform 0.5s var(--pk-spring), box-shadow 0.5s;
    background:var(--pk-white);
    border:1.5px solid var(--pk-border);
    box-shadow:0 4px 24px rgba(28,26,22,0.06);
  }
  .pk-card:hover {
    transform:translateY(-12px) scale(1.015);
    box-shadow:0 40px 80px rgba(28,26,22,0.14);
  }

  /* Sheen on hover */
  .pk-card-sheen {
    position:absolute; inset:0; z-index:10; pointer-events:none;
    background:linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.6) 50%, transparent 65%);
    transform:translateX(-100%) skewX(-15deg);
  }
  .pk-card:hover .pk-card-sheen { animation:pkCardSheen 0.7s var(--pk-ease) forwards; }

  /* featured — rose accent */
  .pk-card.pk-featured {
    background:linear-gradient(145deg, #FFF8F7 0%, var(--pk-white) 100%);
    border-color:var(--pk-rose);
    box-shadow:
      0 4px 28px rgba(212,133,122,0.18),
      0 0 0 1px rgba(212,133,122,0.15);
    animation:pkRoseGlow 4s ease-in-out infinite;
    transform:scale(1.03);
  }
  .pk-card.pk-featured:hover {
    transform:translateY(-14px) scale(1.045);
    box-shadow:
      0 48px 96px rgba(212,133,122,0.22),
      0 0 0 1.5px var(--pk-rose);
  }

  /* golden */
  .pk-card.pk-golden {
    background:linear-gradient(145deg, var(--pk-gold-xl) 0%, var(--pk-white) 100%);
    border-color:var(--pk-gold-l);
    box-shadow:
      0 4px 28px rgba(200,169,106,0.15),
      0 0 0 1px rgba(200,169,106,0.15);
    animation:pkGoldGlow 4s ease-in-out infinite;
  }
  .pk-card.pk-golden:hover {
    border-color:var(--pk-gold);
    box-shadow:
      0 48px 96px rgba(200,169,106,0.2),
      0 0 0 1.5px var(--pk-gold);
  }

  /* Inner gradient overlay */
  .pk-card.pk-featured::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(160deg, rgba(212,133,122,0.04) 0%, transparent 50%);
    border-radius:26px;
  }
  .pk-card.pk-golden::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(160deg, rgba(200,169,106,0.07) 0%, transparent 50%);
    border-radius:26px;
  }

  /* Top badge */
  .pk-top-badge {
    position:absolute; top:-1px; left:50%; transform:translateX(-50%);
    padding:7px 20px; border-radius:0 0 16px 16px;
    font-family:var(--pk-sans); font-size:0.58rem; font-weight:800;
    letter-spacing:0.14em; text-transform:uppercase;
    display:inline-flex; align-items:center; gap:6px;
    white-space:nowrap; z-index:5;
  }
  .pk-top-badge.rose {
    background:linear-gradient(135deg, var(--pk-rose), var(--pk-rose-d));
    color:white;
    box-shadow:0 4px 16px rgba(212,133,122,0.4);
  }
  .pk-top-badge.gold {
    background:linear-gradient(135deg, var(--pk-gold), var(--pk-gold-d));
    color:white;
    box-shadow:0 4px 16px rgba(200,169,106,0.4);
  }
  .pk-top-badge.sage {
    background:linear-gradient(135deg, #5A9A5A, #3D7A3D);
    color:white;
  }

  /* Card label */
  .pk-card-tag {
    font-size:0.58rem; font-weight:800; letter-spacing:0.22em; text-transform:uppercase;
    color:var(--pk-muted); margin-bottom:22px;
    display:flex; align-items:center; gap:8px;
    position:relative; z-index:1;
  }
  .pk-card.pk-featured .pk-card-tag { color:var(--pk-rose-d); }
  .pk-card.pk-golden .pk-card-tag   { color:var(--pk-gold-d); }
  .pk-card-tag-line {
    height:1px; width:18px;
    background:var(--pk-border);
    display:inline-block;
  }
  .pk-card.pk-featured .pk-card-tag-line { background:rgba(212,133,122,0.35); }
  .pk-card.pk-golden .pk-card-tag-line   { background:rgba(200,169,106,0.4); }

  /* Quantity */
  .pk-qty-display {
    display:flex; align-items:baseline; gap:7px;
    margin-bottom:6px; position:relative; z-index:1;
  }
  .pk-qty-num {
    font-family:var(--pk-serif);
    font-size:clamp(3.8rem,7vw,5.8rem);
    font-weight:700; color:var(--pk-ink);
    letter-spacing:-0.04em; line-height:1;
  }
  .pk-card.pk-featured .pk-qty-num { color:var(--pk-rose-d); }
  .pk-card.pk-golden .pk-qty-num   { color:var(--pk-gold-d); }
  .pk-qty-label {
    font-size:0.85rem; font-weight:500; color:var(--pk-muted);
    padding-bottom:8px;
  }

  .pk-volume-tag {
    display:inline-flex; align-items:center; gap:5px;
    background:var(--pk-cream-2); border:1px solid var(--pk-border);
    border-radius:999px; padding:5px 14px;
    font-size:0.62rem; font-weight:700; letter-spacing:0.1em;
    color:var(--pk-muted); margin-bottom:24px;
    position:relative; z-index:1; width:fit-content;
  }
  .pk-card.pk-featured .pk-volume-tag { background:var(--pk-rose-l); border-color:rgba(212,133,122,0.2); }
  .pk-card.pk-golden .pk-volume-tag   { background:var(--pk-gold-xl); border-color:rgba(200,169,106,0.25); }

  /* Price */
  .pk-price-block { margin-bottom:24px; position:relative; z-index:1; }
  .pk-price-original {
    font-size:0.78rem; color:var(--pk-muted); text-decoration:line-through;
    margin-bottom:4px; opacity:0.6;
  }
  .pk-price {
    font-family:var(--pk-serif);
    font-size:clamp(2.4rem,4vw,3.2rem); font-weight:600;
    color:var(--pk-ink); letter-spacing:-0.02em; line-height:1;
  }
  .pk-card.pk-featured .pk-price { color:var(--pk-rose-d); }
  .pk-card.pk-golden .pk-price   { color:var(--pk-gold-d); }
  .pk-price sub {
    font-family:var(--pk-sans); font-size:0.42em; font-weight:700;
    color:var(--pk-muted); letter-spacing:0; vertical-align:baseline; margin-left:5px;
  }
  .pk-price-per {
    font-size:0.66rem; font-weight:500; color:var(--pk-muted);
    margin-top:6px; letter-spacing:0.03em;
  }

  /* Savings badge */
  .pk-savings-badge {
    display:inline-flex; align-items:center; gap:5px;
    padding:5px 14px; border-radius:999px;
    font-size:0.6rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase;
    margin-bottom:18px; width:fit-content; position:relative; z-index:1;
  }
  .pk-savings-badge.sage  { background:var(--pk-sage-l); color:#3D7A3D; border:1px solid rgba(90,154,90,0.2); }
  .pk-savings-badge.rose  { background:var(--pk-rose-l); color:var(--pk-rose-d); border:1px solid rgba(212,133,122,0.25); }
  .pk-savings-badge.gold  { background:var(--pk-gold-xl); color:var(--pk-gold-d); border:1px solid rgba(200,169,106,0.3); }

  /* Perks */
  .pk-perks {
    display:flex; flex-direction:column; gap:9px;
    margin-bottom:28px; flex:1; position:relative; z-index:1;
  }
  .pk-perk {
    display:flex; align-items:center; gap:9px;
    font-size:0.74rem; font-weight:500; color:var(--pk-muted);
    line-height:1.3;
  }
  .pk-perk-icon {
    width:18px; height:18px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; font-size:0.6rem;
  }
  .pk-perk-icon.sage { background:var(--pk-sage-l); color:#3D7A3D; }
  .pk-perk-icon.rose { background:var(--pk-rose-l); color:var(--pk-rose-d); }
  .pk-perk-icon.gold { background:var(--pk-gold-xl); color:var(--pk-gold-d); }
  .pk-perk.featured  { color:var(--pk-ink-2); font-weight:500; }

  /* Divider */
  .pk-card-divider {
    height:1px; background:var(--pk-border); margin-bottom:22px;
    position:relative; z-index:1;
  }
  .pk-card.pk-featured .pk-card-divider { background:rgba(212,133,122,0.2); }
  .pk-card.pk-golden .pk-card-divider   { background:rgba(200,169,106,0.2); }

  /* CTA Button */
  .pk-btn {
    width:100%; padding:15px 20px;
    border-radius:999px; border:none; cursor:pointer;
    font-family:var(--pk-sans); font-size:0.72rem; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:transform 0.3s var(--pk-spring), box-shadow 0.3s, background 0.2s;
    position:relative; z-index:1; text-decoration:none;
  }
  .pk-btn.default {
    background:var(--pk-cream-2); border:1.5px solid var(--pk-border);
    color:var(--pk-ink-2);
  }
  .pk-btn.default:hover {
    background:var(--pk-cream-3); transform:translateY(-3px);
  }
  .pk-btn.rose {
    background:linear-gradient(135deg, var(--pk-rose), var(--pk-rose-d));
    color:white; box-shadow:0 6px 24px rgba(212,133,122,0.45);
  }
  .pk-btn.rose:hover {
    transform:translateY(-4px) scale(1.02);
    box-shadow:0 14px 40px rgba(212,133,122,0.55);
  }
  .pk-btn.gold {
    background:linear-gradient(135deg, var(--pk-gold), var(--pk-gold-d));
    color:white; box-shadow:0 6px 24px rgba(200,169,106,0.4);
  }
  .pk-btn.gold:hover {
    transform:translateY(-4px) scale(1.02);
    box-shadow:0 14px 40px rgba(200,169,106,0.5);
  }

  /* ── Compare table ── */
  .pk-compare {
    margin-top:clamp(52px,7vw,88px);
    background:var(--pk-white);
    border:1px solid var(--pk-border);
    border-radius:28px;
    padding:clamp(28px,4vw,52px);
    position:relative; z-index:1;
    box-shadow:0 4px 24px rgba(28,26,22,0.06);
    overflow:hidden;
  }
  .pk-compare::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(to right, var(--pk-rose), var(--pk-gold));
  }
  .pk-compare-title {
    font-size:0.68rem; font-weight:800;
    letter-spacing:0.22em; text-transform:uppercase;
    color:var(--pk-muted); text-align:center; margin-bottom:32px;
  }
  .pk-compare-grid {
    display:grid; grid-template-columns:1.6fr repeat(4,1fr);
    border-radius:18px; overflow:hidden;
    border:1px solid var(--pk-border);
  }
  .pk-cmp-cell {
    padding:14px 16px; font-size:0.7rem; font-weight:500;
    color:var(--pk-muted); text-align:center;
    border-bottom:1px solid var(--pk-border);
    border-right:1px solid var(--pk-border);
  }
  .pk-cmp-cell:last-child { border-right:none; }
  .pk-cmp-cell:first-child { text-align:left; }
  .pk-cmp-cell.head {
    font-size:0.6rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase;
    background:var(--pk-cream-2); color:var(--pk-ink-2);
  }
  .pk-cmp-cell.feat { color:var(--pk-rose-d); font-weight:700; background:rgba(212,133,122,0.04); }
  .pk-cmp-cell.gld  { color:var(--pk-gold-d); font-weight:700; background:rgba(200,169,106,0.04); }
  .pk-cmp-cell.yes  { color:#3D7A3D; font-weight:700; }
  .pk-cmp-cell.no   { color:var(--pk-border); }
  .pk-cmp-last .pk-cmp-cell { border-bottom:none; }

  /* ── Trust footer ── */
  .pk-trust {
    display:flex; flex-wrap:wrap; justify-content:center;
    margin-top:clamp(44px,6vw,72px);
    padding-top:clamp(36px,5vw,56px);
    border-top:1px solid var(--pk-border);
    position:relative; z-index:1;
    gap:0;
  }
  .pk-trust-item {
    display:flex; align-items:center; gap:10px;
    padding:0 clamp(18px,2.5vw,36px);
    border-right:1px solid var(--pk-border);
    font-size:0.72rem; font-weight:600; color:var(--pk-muted);
    letter-spacing:0.02em;
    transition:color 0.2s;
  }
  .pk-trust-item:last-child { border-right:none; }
  .pk-trust-item:hover { color:var(--pk-ink); }
  .pk-trust-icon { font-size:1rem; }

  /* ── Responsive ── */
  @media (max-width:1200px) {
    .pk-grid { grid-template-columns:repeat(2,1fr); gap:16px; }
    .pk-card.pk-featured { transform:none; }
    .pk-card.pk-featured:hover { transform:translateY(-12px) scale(1.02); }
  }
  @media (max-width:768px) {
    .pk-grid { grid-template-columns:1fr; gap:14px; }
    .pk-compare { display:none; }
    .pk-trust { flex-direction:column; align-items:center; gap:16px; }
    .pk-trust-item { border-right:none; border-bottom:1px solid var(--pk-border); padding:0 0 16px; }
    .pk-trust-item:last-child { border-bottom:none; padding-bottom:0; }
    .pk-qty-num { font-size:3.8rem; }
    .pk-price { font-size:2.4rem; }
  }
  @media (max-width:480px) {
    .pk-card { padding:28px 22px 32px; border-radius:22px; }
    .pk-trust { gap:12px; }
  }
`;

function injectPackStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-pack-css-v2")) {
    const tag = document.createElement("style");
    tag.id = "nahid-pack-css-v2";
    tag.textContent = PACK_CSS;
    document.head.appendChild(tag);
  }
}

/* ─── Pack data ─────────────────────────────────── */
const PACKS = [
  {
    id: "p1", name: "Pack 1", qty: 4, volume: "35ML × 4",
    price: 160, origPrice: null, savings: null, perUnit: "40 dh / flacon",
    topBadge: null, variant: "default", btnVariant: "default",
    perks: [
      { icon: "✓", cls: "sage", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "sage", text: "Idéal pour débuter" },
      { icon: "✓", cls: "sage", text: "Paiement à la livraison" },
    ],
  },
  {
    id: "p2", name: "Pack 2", qty: 8, volume: "35ML × 8",
    price: 290, origPrice: 320, savings: "Économie 30 dh", perUnit: "36 dh / flacon",
    topBadge: { text: "🔥 Le plus populaire", cls: "rose" }, variant: "default", btnVariant: "rose",
    perks: [
      { icon: "✓", cls: "sage", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "rose", text: "🔥 Best Seller" },
      { icon: "✓", cls: "sage", text: "Économie 30 dh" },
      { icon: "✓", cls: "sage", text: "Paiement à la livraison" },
    ],
  },
  {
    id: "p3", name: "Pack 3", qty: 12, volume: "35ML × 12",
    price: 410, origPrice: 480, savings: "Économie 70 dh", perUnit: "34 dh / flacon",
    topBadge: { text: "⚡ Meilleur rapport", cls: "sage" }, variant: "featured", btnVariant: "rose",
    isFeatured: true,
    perks: [
      { icon: "✓", cls: "sage", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "rose", text: "⚡ Stock limité" },
      { icon: "✓", cls: "sage", text: "Économie 70 dh" },
      { icon: "✓", cls: "sage", text: "Prix / flacon le plus bas" },
      { icon: "✓", cls: "sage", text: "Paiement à la livraison" },
    ],
  },
  {
    id: "golden", name: "Golden Offer", qty: 6, volume: "35ML × 6",
    price: 210, origPrice: 240, savings: "Économie 30 dh", perUnit: "35 dh / flacon",
    topBadge: { text: "✦ Offre dorée", cls: "gold" }, variant: "golden", btnVariant: "gold",
    perks: [
      { icon: "✓", cls: "sage", text: "Livraison gratuite 🚚" },
      { icon: "✓", cls: "gold", text: "✦ Édition limitée" },
      { icon: "✓", cls: "sage", text: "Économie 30 dh" },
      { icon: "✓", cls: "sage", text: "Paiement à la livraison" },
    ],
  },
];

const COMPARE_ROWS = [
  { label: "Flacons", p1: "4 ×", p2: "8 ×", p3: "12 ×", golden: "6 ×" },
  { label: "Volume", p1: "35ML", p2: "35ML", p3: "35ML", golden: "35ML" },
  { label: "Prix total", p1: "160 dh", p2: "290 dh", p3: "410 dh", golden: "210 dh" },
  { label: "Prix / flacon", p1: "40 dh", p2: "36 dh", p3: "34 dh", golden: "35 dh" },
  { label: "Livraison", p1: "yes", p2: "yes", p3: "yes", golden: "yes", isBool: true },
  { label: "Économies", p1: "no", p2: "30 dh", p3: "70 dh", golden: "30 dh" },
];

/* ─── Component ─────────────────────────────────── */
const PackOffersSection = ({ onSelectPack }) => {
  injectPackStyles();
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("pk-vis"); }),
      { threshold: 0.07 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll(".pk-aos").forEach(el => obs.observe(el));
    }
    return () => obs.disconnect();
  });

  const fmt = n => Math.round(n).toLocaleString("fr-MA");

  return (
    <section className="pk-section" ref={sectionRef}>
      <div className="pk-bg-orb pk-bg-orb-1" />
      <div className="pk-bg-orb pk-bg-orb-2" />
      <div className="pk-bg-orb pk-bg-orb-3" />
      <div className="pk-texture" />

      <div className="container">

        {/* Header */}
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

        {/* Cards */}
        <div className="pk-grid">
          {PACKS.map((pack, i) => (
            <div
              key={pack.id}
              className={`pk-card${pack.variant !== "default" ? ` pk-${pack.variant}` : ""} pk-aos pk-d${i + 1}`}
              onMouseEnter={() => setHoveredId(pack.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="pk-card-sheen" />

              {pack.topBadge && (
                <div className={`pk-top-badge ${pack.topBadge.cls}`}>
                  {pack.topBadge.text}
                </div>
              )}

              <div className="pk-card-tag">
                <span className="pk-card-tag-line" />
                {pack.name}
              </div>

              <div className="pk-qty-display">
                <div className="pk-qty-num">{pack.qty}</div>
                <div className="pk-qty-label">flacons</div>
              </div>

              <div className="pk-volume-tag">{pack.volume}</div>

              {pack.savings && (
                <div className={`pk-savings-badge ${pack.variant === "golden" ? "gold" : pack.isFeatured ? "rose" : "sage"}`}>
                  🎉 {pack.savings}
                </div>
              )}

              <div className="pk-price-block">
                {pack.origPrice && (
                  <div className="pk-price-original">{fmt(pack.origPrice)} dh</div>
                )}
                <div className="pk-price">
                  {fmt(pack.price)}<sub>dh</sub>
                </div>
                <div className="pk-price-per">≈ {pack.perUnit}</div>
              </div>

              <div className="pk-card-divider" />

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

              <button
                className={`pk-btn ${pack.btnVariant}`}
                onClick={() => onSelectPack?.(pack)}
              >
                Choisir cette offre
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Compare table — desktop only */}
        <div className="pk-compare pk-aos">
          <div className="pk-compare-title">Comparatif des offres</div>
          <div className="pk-compare-grid">
            {/* Header row */}
            {["Offre","Pack 1","Pack 2","Pack 3 ⚡","Golden ✦"].map((h,i) => (
              <div key={h} className={`pk-cmp-cell head${i===3?" feat":i===4?" gld":""}`}>{h}</div>
            ))}
            {/* Data rows */}
            {COMPARE_ROWS.map((row, ri) => (
              <div key={ri} style={{display:"contents"}} className={ri===COMPARE_ROWS.length-1?"pk-cmp-last":""}>
                <div className="pk-cmp-cell" style={{textAlign:"left",color:"var(--pk-ink-2)",borderBottom:ri===COMPARE_ROWS.length-1?"none":"1px solid var(--pk-border)"}}>{row.label}</div>
                {[
                  {val:row.p1,extra:""},
                  {val:row.p2,extra:""},
                  {val:row.p3,extra:" feat"},
                  {val:row.golden,extra:" gld"},
                ].map(({val,extra},ci) => (
                  <div
                    key={ci}
                    className={`pk-cmp-cell${extra}${row.isBool?(val==="yes"?" yes":" no"):""}`}
                    style={{borderBottom:ri===COMPARE_ROWS.length-1?"none":"1px solid var(--pk-border)"}}
                  >
                    {row.isBool ? (val==="yes"?"✓":"—") : val==="no"?"—":val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className="pk-trust pk-aos">
          {[
            {icon:"🚚",text:"Livraison gratuite incluse"},
            {icon:"💳",text:"Paiement à la livraison"},
            {icon:"🇲🇦",text:"Partout au Maroc"},
            {icon:"⭐",text:"4.9/5 · 2 400 clients"},
          ].map(({icon,text}) => (
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