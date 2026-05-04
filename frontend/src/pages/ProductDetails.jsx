import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiChevronLeft, FiShoppingBag, FiStar, FiChevronDown, FiPhone } from "react-icons/fi";

/* ─── Static ──────────────────────────────────────────── */
const SIZES = [
  { label: "30 ml",          price_mult: 1.00, tag: null },
  { label: "Coffret 3×30ml", price_mult: 2.55, tag: "−15%" },
];

const GENDER_CFG = {
  Femme:  { color: "#FADADD", accent: "#C9748A", emoji: "🌸" },
  Homme:  { color: "#D4C9B0", accent: "#7A6443", emoji: "🪵" },
  Unisex: { color: "#C8D5CC", accent: "#4A7A62", emoji: "✦" },
};

const WHATSAPP_NUM = "212636572200";

const DELIVERY_PERKS = [
  { icon: "🚚", title: "Livraison gratuite dès 300 DH",    sub: "Offerte sur toute commande ≥ 300 dh" },
  { icon: "⏱️", title: "Délai 24 à 72 heures",              sub: "Selon votre ville au Maroc" },
  { icon: "💵", title: "Paiement à la livraison (COD)",     sub: "Payez en cash à la réception" },
  { icon: "🇲🇦", title: "Plus de 300 villes",               sub: "Livraison partout au Maroc" },
];

const FAQ_ITEMS = [
  { q: "Comment passer une commande ?",              a: "Cliquez sur le bouton WhatsApp ou ajoutez vos produits au panier, puis suivez les étapes pour confirmer votre commande." },
  { q: "Livrez-vous partout au Maroc ?",              a: "Oui, nous livrons dans plus de 300 villes à travers le Maroc." },
  { q: "Quels sont les délais de livraison ?",        a: "La livraison prend généralement entre 24h et 72h selon votre ville." },
  { q: "La livraison est-elle gratuite ?",            a: "Oui, la livraison est gratuite à partir de 300 DH d'achat." },
  { q: "Quels sont les moyens de paiement ?",         a: "Nous acceptons uniquement le paiement à la livraison (COD)." },
  { q: "Les parfums tiennent-ils longtemps ?",        a: "Oui, nos parfums offrent une tenue moyenne de 6 à 8 heures." },
  { q: "Quelle est la contenance des flacons ?",      a: "Tous nos parfums sont en format 30ml spray." },
  { q: "Puis-je choisir différents parfums dans un pack ?", a: "Oui, vous pouvez sélectionner librement vos parfums selon vos préférences." },
  { q: "Puis-je modifier ou annuler ma commande ?",   a: "Oui, contactez-nous rapidement sur WhatsApp pour toute modification." },
  { q: "Comment vous contacter ?",                   a: "Via WhatsApp : +212 636 572 200 ou Instagram : @nahid.perfumes" },
];

function parseScentNotes(raw) {
  if (!raw) return null;
  const teteM  = raw.match(/t[êe]te\s*[:：](.*?)(?:\||$)/i);
  const coeurM = raw.match(/c[oœ]eur\s*[:：](.*?)(?:\||$)/i);
  const fondM  = raw.match(/fond\s*[:：](.*?)(?:\||$)/i);
  const clean  = m => m ? m[1].replace(/[🌹🌿🌙💧🍊🏜️🪵🍦🍫🤍🔥⭐]/g, "").trim() : null;
  const tete = clean(teteM), coeur = clean(coeurM), fond = clean(fondM);
  if (!tete && !coeur && !fond) return null;
  return { tete, coeur, fond };
}

const FAMILY_LABELS = {
  flowery: "🌸 Fleuri", fresh: "🍃 Frais", gourmand: "🍫 Gourmand",
  herbal: "🌿 Herbal", earthy: "🌍 Terreux", warm: "🔥 Chaud",
};

/* ─── CSS ───────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --pd-coral:    #EF776A;
    --pd-coral-d:  #C9503F;
    --pd-coral-l:  #FFF3F1;
    --pd-gold:     #C9A96E;
    --pd-gold-l:   #F5E9D0;
    --pd-ink:      #0E0E0C;
    --pd-cream:    #FAF8F5;
    --pd-sand:     #EDE9E1;
    --pd-muted:    #7A7770;
    --pd-white:    #FFFFFF;
    --pd-border:   rgba(14,14,12,0.09);
    --pd-green:    #1B5E20;
    --pd-green-l:  #E8F5E9;
    --pd-sans:     'Poppins', sans-serif;
    --pd-serif:    'Cormorant Garamond', Georgia, serif;
    --pd-ease:     cubic-bezier(0.25,0.46,0.45,0.94);
    --pd-spring:   cubic-bezier(0.34,1.56,0.64,1);
    --pd-expo:     cubic-bezier(0.16,1,0.3,1);
  }

  /* ── Animations ── */
  @keyframes pdFadeUp   { from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);} }
  @keyframes pdScaleIn  { from{opacity:0;transform:scale(0.92);}       to{opacity:1;transform:scale(1);} }
  @keyframes pdSpin     { to{transform:rotate(360deg);} }
  @keyframes pdShine    { from{left:-80%;} to{left:140%;} }
  @keyframes pdRingPulse{ 0%,100%{opacity:0.4;transform:scale(1);} 50%{opacity:0.9;transform:scale(1.05);} }
  @keyframes pdBadgePop { from{transform:scale(0) rotate(-8deg);} to{transform:scale(1) rotate(0);} }
  @keyframes pdWaPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0);} 55%{box-shadow:0 0 0 10px rgba(37,211,102,0.18);} }
  @keyframes pdFloat    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
  @keyframes pdAccordion{ from{opacity:0;transform:translateY(-8px);} to{opacity:1;transform:translateY(0);} }

  /* ── Page ── */
  .pd-page *, .pd-page *::before, .pd-page *::after { box-sizing:border-box; margin:0; padding:0; }
  .pd-page {
    position: relative;
    background: var(--pd-cream);
    min-height: 100vh;
    padding: clamp(80px,10vh,110px) 0 clamp(80px,10vw,140px);
    overflow-x: hidden;
    font-family: var(--pd-sans);
    -webkit-font-smoothing: antialiased;
  }
  .pd-page .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(16px,4vw,56px);
  }

  /* Ambient glow */
  .pd-ambient {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse 60% 55% at 80% 20%, var(--pd-ambient, #FADADD) 0%, transparent 70%);
    opacity: 0.35;
    transition: background 0.9s;
  }

  /* Back button */
  .pd-back {
    position: relative; z-index: 2;
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--pd-white); border: 1px solid var(--pd-border);
    color: var(--pd-muted); font-family: var(--pd-sans);
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 9px 18px 9px 14px; border-radius: 999px;
    cursor: pointer; margin: 0 clamp(16px,4vw,56px) 28px;
    transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s var(--pd-spring);
    box-shadow: 0 2px 10px rgba(14,14,12,0.05);
  }
  .pd-back:hover { color: var(--pd-ink); border-color: var(--pd-ink); transform: translateY(-2px); background: var(--pd-cream); }

  /* Grid */
  .pd-grid {
    position: relative; z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(36px,6vw,88px);
    align-items: start;
    margin-bottom: clamp(60px,8vw,100px);
  }

  /* Reveal animations */
  .pd-img-col, .pd-details-col {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.9s var(--pd-expo), transform 0.9s var(--pd-expo);
  }
  .pd-revealed .pd-img-col  { opacity:1; transform:none; transition-delay:0.05s; }
  .pd-revealed .pd-details-col { opacity:1; transform:none; transition-delay:0.2s; }

  /* ── IMAGE COL ── */
  .pd-img-col { position: sticky; top: 96px; }

  .pd-img-frame {
    position: relative; border-radius: 28px; overflow: hidden;
    background: linear-gradient(145deg, #F4F0EA, #EDE8E0);
    aspect-ratio: 3/4;
    box-shadow:
      0 4px 12px rgba(0,0,0,0.04),
      0 24px 64px rgba(0,0,0,0.1),
      inset 0 1px 0 rgba(255,255,255,0.7);
  }
  .pd-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(239,119,106,0.15);
    pointer-events: none;
    animation: pdRingPulse 5s ease-in-out infinite;
  }
  .pd-ring-1 { width:70%;height:70%;top:-10%;right:-15%;animation-delay:0s; }
  .pd-ring-2 { width:50%;height:50%;bottom:-10%;left:-10%;animation-delay:2.5s; }

  .pd-stock-badge {
    position: absolute; top:16px; left:16px; z-index:2;
    background: white; color: var(--pd-coral);
    font-family: var(--pd-sans); font-size:0.62rem; font-weight:800;
    letter-spacing:0.1em; text-transform:uppercase; padding:6px 14px;
    border-radius:999px; box-shadow:0 2px 14px rgba(239,119,106,0.25);
    animation: pdBadgePop 0.4s var(--pd-spring) both, pdWaPulse 2.5s ease infinite 0.5s;
  }
  .pd-orig-badge {
    position: absolute; top:16px; right:16px; z-index:2;
    background: linear-gradient(135deg, var(--pd-coral), var(--pd-coral-d));
    color: white; font-family:var(--pd-sans); font-size:0.62rem;
    font-weight:800; letter-spacing:0.08em; text-transform:uppercase;
    padding:6px 14px; border-radius:999px;
    box-shadow:0 3px 14px rgba(239,119,106,0.4);
    animation: pdBadgePop 0.4s var(--pd-spring) 0.1s both;
  }
  .pd-img-wrap { width:100%;height:100%;opacity:0;transition:opacity 0.8s ease; }
  .pd-img-loaded { opacity:1; }
  .pd-img { width:100%;height:100%;object-fit:cover;transition:transform 0.7s var(--pd-ease); }
  .pd-img-frame:hover .pd-img { transform:scale(1.04); }
  .pd-img-halo { position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:0.5; }

  /* Rating strip */
  .pd-rating-strip {
    display: flex; align-items: center; gap: 10px;
    margin-top: 16px; padding: 13px 18px;
    background: white; border-radius: 16px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.05);
    flex-wrap: wrap; border: 1px solid var(--pd-border);
  }
  .pd-stars { display:flex;gap:3px;flex-shrink:0; }
  .pd-rating-lbl { font-family:var(--pd-sans);font-size:0.72rem;font-weight:500;color:var(--pd-muted); }
  .pd-rating-sep { color:var(--pd-border); }

  /* ── DETAILS COL ── */
  .pd-details-col { position: sticky; top: 96px; }

  .pd-chips-row { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px; }
  .pd-chip {
    display:inline-flex;align-items:center;padding:5px 13px;border-radius:999px;
    font-family:var(--pd-sans);font-size:0.58rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;
  }
  .pd-chip-coral { background:var(--pd-coral-l);color:var(--pd-coral-d); }
  .pd-chip-blue  { background:#EFF6FF;color:#1D4ED8; }
  .pd-chip-gold  { background:var(--pd-gold-l);color:#A8883E; }
  .pd-chip-orig  { background:linear-gradient(135deg,var(--pd-coral),var(--pd-coral-d));color:white;box-shadow:0 3px 10px rgba(239,119,106,0.3); }

  .pd-name {
    font-family: var(--pd-sans);
    font-size: clamp(1.8rem,4.5vw,3rem);
    font-weight: 900;
    color: var(--pd-ink);
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 14px;
  }
  .pd-tagline {
    font-size: 0.88rem; color: var(--pd-muted); line-height: 1.78;
    margin-bottom: 24px; padding-left: 16px;
    border-left: 2px solid var(--pd-border);
    font-style: italic; font-family: var(--pd-serif); font-size: 1.05rem;
  }

  /* Section labels */
  .pd-section { margin-bottom: 28px; }
  .pd-section-lbl {
    font-family: var(--pd-sans);
    font-size: 0.58rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--pd-muted); margin-bottom: 13px;
    display: flex; align-items: center; gap: 10px;
  }
  .pd-section-lbl::after { content:'';flex:1;height:1px;background:linear-gradient(to right,var(--pd-border),transparent); }

  /* Pyramid */
  .pd-pyramid { display:grid;grid-template-columns:repeat(3,1fr);gap:10px; }
  .pd-pyr-card {
    background: white; border: 1px solid var(--pd-border); border-radius: 18px;
    padding: 18px 12px; text-align: center;
    transition: transform 0.25s var(--pd-spring), box-shadow 0.25s;
    position: relative; overflow: hidden;
  }
  .pd-pyr-card::before { content:'';position:absolute;top:0;left:0;right:0;height:3px; }
  .pd-pyr-tete::before  { background:linear-gradient(90deg,#6A9B6A,#A8D5A8); }
  .pd-pyr-coeur::before { background:linear-gradient(90deg,var(--pd-coral),#F4A0A0); }
  .pd-pyr-fond::before  { background:linear-gradient(90deg,var(--pd-gold),#E9D6A9); }
  .pd-pyr-card:hover { transform:translateY(-5px);box-shadow:0 12px 32px rgba(0,0,0,0.08); }
  .pd-pyr-icon  { font-size:1.5rem;display:block;margin-bottom:8px; }
  .pd-pyr-type  { font-family:var(--pd-sans);font-size:0.55rem;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:var(--pd-muted);margin-bottom:5px; }
  .pd-pyr-value { font-family:var(--pd-sans);font-size:0.72rem;font-weight:500;color:var(--pd-ink-2,#333);line-height:1.55; }

  /* Sizes */
  .pd-sizes { display:flex;flex-direction:column;gap:10px; }
  .pd-size-card {
    display:flex;align-items:center;gap:12px;
    padding:16px 20px; border-radius:18px;
    border:1.5px solid var(--pd-border); background:white;
    cursor:pointer; position:relative; overflow:hidden;
    transition:all 0.28s var(--pd-ease); font-family:var(--pd-sans);
    box-shadow: 0 2px 8px rgba(14,14,12,0.03);
  }
  .pd-size-active {
    border-color: var(--pd-coral);
    background: var(--pd-coral-l);
    box-shadow: 0 0 0 3px rgba(239,119,106,0.12), 0 6px 24px rgba(239,119,106,0.14);
  }
  .pd-size-card:hover:not(.pd-size-active) { border-color:rgba(14,14,12,0.2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(14,14,12,0.06); }
  .pd-size-tag {
    font-family:var(--pd-sans);font-size:0.58rem;font-weight:800;letter-spacing:0.07em;text-transform:uppercase;
    padding:3px 10px;border-radius:999px;background:var(--pd-sand);color:var(--pd-muted);
    transition:all 0.25s;flex-shrink:0;
  }
  .pd-size-tag-active { background:var(--pd-coral);color:white; }
  .pd-size-vol   { font-family:var(--pd-sans);font-weight:700;font-size:0.85rem;color:var(--pd-ink);flex:1; }
  .pd-size-price {
    font-family: var(--pd-serif);
    font-size: 1.4rem; font-weight: 600; color: var(--pd-ink);
  }
  .pd-size-active .pd-size-price { color:var(--pd-coral); }
  .pd-size-save  { font-family:var(--pd-sans);font-size:0.65rem;color:#2E7D32;font-weight:700; }

  /* Buy row */
  .pd-buy-row { display:flex;gap:12px;align-items:center;margin-bottom:16px; }
  .pd-qty {
    display:flex;align-items:center;
    border:1.5px solid var(--pd-border);border-radius:999px;
    background:white;overflow:hidden;flex-shrink:0;
  }
  .pd-qty-btn {
    width:44px;height:52px;background:none;border:none;
    font-size:1.2rem;color:var(--pd-ink);cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:background 0.15s;font-family:var(--pd-sans);
  }
  .pd-qty-btn:hover { background:var(--pd-coral-l); }
  .pd-qty-num {
    min-width:44px;text-align:center;font-family:var(--pd-sans);
    font-weight:800;font-size:0.92rem;line-height:52px;
    border-left:1px solid var(--pd-border);border-right:1px solid var(--pd-border);
    color:var(--pd-ink);
  }

  /* Add to cart button */
  .pd-add-btn {
    flex:1;height:52px;border:none;border-radius:999px;
    background:linear-gradient(135deg,var(--pd-coral),var(--pd-coral-d));
    color:white;
    font-family:var(--pd-sans);font-size:0.78rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;
    position:relative;overflow:hidden;cursor:pointer;
    transition:transform 0.2s var(--pd-spring),box-shadow 0.2s;
    box-shadow:0 6px 28px rgba(239,119,106,0.4);
  }
  .pd-add-inner { position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:9px;height:100%; }
  .pd-add-shine {
    position:absolute;top:0;left:-80%;width:50%;height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);
    transform:skewX(-20deg);pointer-events:none;
  }
  .pd-add-btn:hover:not(:disabled) { transform:translateY(-3px) scale(1.01);box-shadow:0 14px 40px rgba(239,119,106,0.5); }
  .pd-add-btn:hover .pd-add-shine { animation:pdShine 0.65s ease forwards; }
  .pd-add-btn:active:not(:disabled) { transform:scale(0.98); }
  .pd-add-added { background:linear-gradient(135deg,#1B5E20,#2E7D32)!important;box-shadow:0 6px 28px rgba(46,125,50,0.4)!important; }
  .pd-add-oos { background:rgba(14,14,12,0.1)!important;box-shadow:none!important;cursor:not-allowed!important; }

  /* ── WHATSAPP BUTTON ── */
  .pd-wa-btn {
    width:100%;height:52px;border:none;border-radius:999px;
    background:linear-gradient(135deg,#25D366,#1DA851);
    color:white;
    font-family:var(--pd-sans);font-size:0.78rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;
    display:flex;align-items:center;justify-content:center;gap:10px;
    cursor:pointer;text-decoration:none;
    transition:transform 0.2s var(--pd-spring),box-shadow 0.2s;
    box-shadow:0 6px 28px rgba(37,211,102,0.35);
    animation:pdWaPulse 3s ease infinite;
    margin-bottom:16px;
  }
  .pd-wa-btn:hover { transform:translateY(-3px) scale(1.01);box-shadow:0 14px 40px rgba(37,211,102,0.5); }
  .pd-wa-btn:active { transform:scale(0.98); }
  .pd-wa-icon { font-size:1.2rem;line-height:1; }

  /* ── DELIVERY PERKS GRID ── */
  .pd-delivery {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 24px;
  }
  .pd-delivery-card {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 14px 14px;
    background: white;
    border: 1px solid var(--pd-border);
    border-radius: 16px;
    transition: transform 0.25s var(--pd-spring), box-shadow 0.25s, border-color 0.2s;
    box-shadow: 0 2px 8px rgba(14,14,12,0.03);
  }
  .pd-delivery-card:hover { transform:translateY(-3px);box-shadow:0 10px 28px rgba(14,14,12,0.08);border-color:rgba(239,119,106,0.2); }
  .pd-delivery-icon {
    width:36px;height:36px;border-radius:12px;flex-shrink:0;
    background:var(--pd-coral-l);
    display:flex;align-items:center;justify-content:center;
    font-size:1rem;
  }
  .pd-delivery-title { font-family:var(--pd-sans);font-size:0.72rem;font-weight:800;color:var(--pd-ink);letter-spacing:-0.01em;margin-bottom:2px; }
  .pd-delivery-sub   { font-family:var(--pd-sans);font-size:0.62rem;font-weight:500;color:var(--pd-muted);line-height:1.4; }

  /* ── INSPIRED BY ── */
  .pd-inspired-block {
    display:flex;align-items:flex-start;gap:12px;
    padding:14px 18px;border-radius:16px;
    background:var(--pd-cream);border:1px solid var(--pd-border);
    margin-bottom:22px;
  }
  .pd-inspired-icon { font-size:1.3rem;flex-shrink:0;margin-top:2px; }
  .pd-inspired-title { font-family:var(--pd-sans);font-size:0.58rem;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:var(--pd-muted);margin-bottom:3px; }
  .pd-inspired-val   { font-family:var(--pd-sans);font-size:0.84rem;font-weight:700;color:var(--pd-ink);font-style:italic; }

  /* ── FAQ SECTION ── */
  .pd-faq-section {
    position: relative; z-index: 1;
    border-top: 1px solid var(--pd-border);
    padding-top: clamp(48px,6vw,80px);
  }
  .pd-faq-header { margin-bottom: clamp(32px,4vw,52px); text-align:center; }
  .pd-faq-eyebrow {
    display:inline-flex;align-items:center;gap:10px;
    font-family:var(--pd-sans);font-size:0.6rem;font-weight:800;letter-spacing:0.28em;text-transform:uppercase;
    color:var(--pd-coral);margin-bottom:14px;
  }
  .pd-faq-eyebrow::before,.pd-faq-eyebrow::after { content:'';width:22px;height:1px;background:var(--pd-coral);display:block; }
  .pd-faq-title {
    font-family:var(--pd-sans);
    font-size:clamp(1.6rem,3.5vw,2.6rem);
    font-weight:900;color:var(--pd-ink);
    letter-spacing:-0.03em;line-height:1.05;
  }
  .pd-faq-title em { font-style:italic;font-weight:300;font-family:var(--pd-serif);color:var(--pd-coral);font-size:1.08em; }

  .pd-faq-grid {
    display:grid;grid-template-columns:1fr 1fr;gap:12px;
    max-width:1000px;margin:0 auto;
  }

  .pd-faq-item {
    border-radius:18px;overflow:hidden;
    border:1.5px solid var(--pd-border);
    background:white;
    transition:border-color 0.25s,box-shadow 0.25s;
    box-shadow:0 2px 8px rgba(14,14,12,0.03);
  }
  .pd-faq-item.open { border-color:var(--pd-coral);box-shadow:0 4px 20px rgba(239,119,106,0.1); }

  .pd-faq-q {
    width:100%;display:flex;align-items:center;justify-content:space-between;
    gap:12px;padding:16px 20px;
    background:none;border:none;cursor:pointer;
    font-family:var(--pd-sans);font-size:0.8rem;font-weight:700;
    color:var(--pd-ink);text-align:left;
    transition:color 0.2s,background 0.2s;
    letter-spacing:-0.01em;
  }
  .pd-faq-item.open .pd-faq-q { color:var(--pd-coral); }
  .pd-faq-q-num {
    width:24px;height:24px;border-radius:50%;flex-shrink:0;
    background:var(--pd-cream);border:1px solid var(--pd-border);
    display:flex;align-items:center;justify-content:center;
    font-size:0.58rem;font-weight:800;color:var(--pd-muted);
    transition:background 0.2s,color 0.2s,border-color 0.2s;
  }
  .pd-faq-item.open .pd-faq-q-num { background:var(--pd-coral);color:white;border-color:var(--pd-coral); }
  .pd-faq-q-text { flex:1; }
  .pd-faq-chevron {
    flex-shrink:0;color:var(--pd-muted);
    transition:transform 0.35s var(--pd-spring),color 0.2s;
  }
  .pd-faq-item.open .pd-faq-chevron { transform:rotate(180deg);color:var(--pd-coral); }

  .pd-faq-a {
    padding:0 20px 18px;
    font-family:var(--pd-sans);font-size:0.78rem;font-weight:400;
    color:var(--pd-muted);line-height:1.75;
    animation:pdAccordion 0.3s var(--pd-ease) both;
    border-top:1px solid var(--pd-border);
    padding-top:14px;
  }

  /* Contact bar at FAQ bottom */
  .pd-contact-bar {
    display:flex;align-items:center;justify-content:center;
    gap:16px;margin-top:32px;flex-wrap:wrap;
  }
  .pd-contact-pill {
    display:inline-flex;align-items:center;gap:8px;
    padding:12px 24px;border-radius:999px;
    font-family:var(--pd-sans);font-size:0.72rem;font-weight:700;
    letter-spacing:0.06em;text-transform:uppercase;
    text-decoration:none;cursor:pointer;border:none;
    transition:transform 0.2s var(--pd-spring),box-shadow 0.2s;
  }
  .pd-contact-wa {
    background:linear-gradient(135deg,#25D366,#1DA851);
    color:white;
    box-shadow:0 4px 18px rgba(37,211,102,0.35);
  }
  .pd-contact-wa:hover { transform:translateY(-3px);box-shadow:0 8px 28px rgba(37,211,102,0.5); }
  .pd-contact-ig {
    background:linear-gradient(135deg,#E1306C,#833AB4);
    color:white;
    box-shadow:0 4px 18px rgba(225,48,108,0.3);
  }
  .pd-contact-ig:hover { transform:translateY(-3px);box-shadow:0 8px 28px rgba(225,48,108,0.45); }

  /* ── STICKY BAR ── */
  .pd-sticky {
    position:fixed;bottom:0;left:0;right:0;z-index:900;
    background:rgba(250,248,245,0.94);backdrop-filter:blur(20px);
    border-top:1px solid var(--pd-border);
    box-shadow:0 -8px 40px rgba(14,14,12,0.1);
    transform:translateY(100%);opacity:0;
    transition:transform 0.4s var(--pd-expo),opacity 0.4s;
  }
  .pd-sticky-visible { transform:translateY(0)!important;opacity:1!important; }
  .pd-sticky-content {
    max-width:1280px;margin:0 auto;
    display:flex;align-items:center;justify-content:space-between;
    padding:12px clamp(16px,4vw,56px);gap:14px;flex-wrap:wrap;
  }
  .pd-sticky-info {}
  .pd-sticky-name  { font-family:var(--pd-sans);font-size:0.9rem;font-weight:800;color:var(--pd-ink);letter-spacing:-0.01em; }
  .pd-sticky-price { font-family:var(--pd-sans);font-size:0.72rem;font-weight:600;color:var(--pd-coral);margin-top:1px; }
  .pd-sticky-btns  { display:flex;gap:10px;align-items:center;flex-shrink:0; }
  .pd-sticky-btn {
    background:linear-gradient(135deg,var(--pd-coral),var(--pd-coral-d));
    color:white;border:none;border-radius:999px;
    padding:11px 24px;
    font-family:var(--pd-sans);font-size:0.72rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;
    cursor:pointer;transition:transform 0.2s var(--pd-spring),box-shadow 0.2s;
    box-shadow:0 4px 16px rgba(239,119,106,0.4);white-space:nowrap;
  }
  .pd-sticky-btn:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(239,119,106,0.5); }
  .pd-sticky-added { background:linear-gradient(135deg,#1B5E20,#2E7D32)!important; }
  .pd-sticky-wa {
    background:linear-gradient(135deg,#25D366,#1DA851);
    color:white;border:none;border-radius:999px;
    padding:11px 20px;
    font-family:var(--pd-sans);font-size:0.72rem;font-weight:800;
    cursor:pointer;transition:transform 0.2s var(--pd-spring),box-shadow 0.2s;
    box-shadow:0 4px 16px rgba(37,211,102,0.35);
    display:flex;align-items:center;gap:6px;white-space:nowrap;
    text-decoration:none;
  }
  .pd-sticky-wa:hover { transform:translateY(-2px); }

  /* Loader */
  .pd-loader { min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:var(--pd-cream); }
  .pd-loader-ring { width:44px;height:44px;border:3px solid rgba(14,14,12,0.06);border-top-color:var(--pd-coral);border-radius:50%;animation:pdSpin 0.75s linear infinite; }
  .pd-loader-txt { font-family:var(--pd-sans);font-size:0.72rem;font-weight:600;color:var(--pd-muted);letter-spacing:0.12em;text-transform:uppercase; }

  /* ── Responsive ── */
  @media (max-width:1024px) {
    .pd-faq-grid { grid-template-columns:1fr; }
  }
  @media (max-width:900px) {
    .pd-grid { grid-template-columns:1fr;gap:28px; }
    .pd-img-col,.pd-details-col { position:static; }
    .pd-img-frame { aspect-ratio:4/3;border-radius:22px; }
    .pd-pyramid { gap:8px; }
    .pd-faq-grid { grid-template-columns:1fr; }
  }
  @media (max-width:640px) {
    .pd-delivery { grid-template-columns:1fr; }
    .pd-pyramid { grid-template-columns:1fr; }
    .pd-buy-row { flex-direction:column; }
    .pd-qty { width:100%;justify-content:center; }
    .pd-add-btn,.pd-wa-btn { width:100%; }
    .pd-sticky-content { flex-direction:column;align-items:stretch;gap:10px; }
    .pd-sticky-btns { flex-direction:column; }
    .pd-sticky-btn,.pd-sticky-wa { width:100%;justify-content:center; }
    .pd-faq-grid { grid-template-columns:1fr; }
    .pd-contact-bar { flex-direction:column;align-items:stretch; }
    .pd-contact-pill { justify-content:center; }
  }
  @media (max-width:400px) {
    .pd-name { font-size:1.7rem; }
    .pd-rating-strip { flex-direction:column;align-items:flex-start;gap:6px; }
  }
`;

/* ─── Component ────────────────────────────────────────── */
const ProductDetails = ({ addToCart, onCartOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product,      setProduct]      = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity,     setQuantity]     = useState(1);
  const [added,        setAdded]        = useState(false);
  const [showSticky,   setShowSticky]   = useState(false);
  const [reveal,       setReveal]       = useState(false);
  const [imgLoaded,    setImgLoaded]    = useState(false);
  const [openFaq,      setOpenFaq]      = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(r => { setProduct(r.data); })
      .catch(() => navigate("/"))
      .finally(() => { setLoading(false); setTimeout(() => setReveal(true), 60); });
  }, [id, navigate]);

  useEffect(() => {
    const fn = () => {
      if (heroRef.current) setShowSticky(window.scrollY > heroRef.current.offsetHeight + 60);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const fmt = n => Math.round(n).toLocaleString("fr-MA");

  const basePrice    = product ? (typeof product.price === "string" ? parseFloat(product.price) : product.price) : 0;
  const currentPrice = Math.round(basePrice * SIZES[selectedSize].price_mult);
  const notes        = product ? parseScentNotes(product.scent_notes) : null;
  const gender       = product?.gender || "Unisex";
  const genderCfg    = GENDER_CFG[gender] || GENDER_CFG["Unisex"];
  const familyLabel  = product?.scent_family ? (FAMILY_LABELS[product.scent_family] || product.scent_family) : null;
  const isOriginal   = product?.product_type === "Original";
  const inspiredBy   = product?.inspired_by;

  const waMessage = product
    ? encodeURIComponent(`Bonjour ! Je suis intéressé(e) par : ${product.name} (${SIZES[selectedSize].label}) — ${fmt(currentPrice * quantity)} MAD. Pouvez-vous confirmer ma commande ?`)
    : "";
  const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${waMessage}`;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, price: currentPrice, size: SIZES[selectedSize].label }, quantity);
    setAdded(true);
    onCartOpen?.();
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) return (
    <>
      <style>{CSS}</style>
      <div className="pd-loader">
        <div className="pd-loader-ring" />
        <p className="pd-loader-txt">Chargement…</p>
      </div>
    </>
  );

  if (!product) return null;

  return (
    <>
      <style>{CSS}</style>
      <div className={`pd-page${reveal ? " pd-revealed" : ""}`} style={{ "--pd-ambient": genderCfg.color }}>

        <div className="pd-ambient" />

        <button className="pd-back" onClick={() => navigate(-1)}>
          <FiChevronLeft size={14} /> Retour
        </button>

        {/* ── HERO GRID ── */}
        <div className="pd-grid container" ref={heroRef}>

          {/* Image */}
          <div className="pd-img-col">
            <div className="pd-img-frame" style={{ "--scent-color": genderCfg.color }}>
              <div className="pd-ring pd-ring-1" />
              <div className="pd-ring pd-ring-2" />
              {product.stock < 5 && product.stock > 0 && (
                <div className="pd-stock-badge">Dernières {product.stock} pièces</div>
              )}
              {isOriginal && <div className="pd-orig-badge">✦ Nahid Original</div>}
              <div className={`pd-img-wrap${imgLoaded ? " pd-img-loaded" : ""}`}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  loading="lazy"
                  onLoad={() => setImgLoaded(true)}
                  className="pd-img"
                />
              </div>
              <div className="pd-img-halo" style={{ background: `radial-gradient(ellipse at 50% 80%, ${genderCfg.color}cc 0%, transparent 70%)` }} />
            </div>
            <div className="pd-rating-strip">
              <div className="pd-stars">
                {[1,2,3,4,5].map(n => <FiStar key={n} size={13} fill="#EF776A" color="#EF776A" strokeWidth={0} />)}
              </div>
              <span className="pd-rating-lbl">4.9 · 48 avis</span>
              <span className="pd-rating-sep">|</span>
              <span className="pd-rating-lbl">Certifié authentique</span>
              {inspiredBy && (
                <>
                  <span className="pd-rating-sep">|</span>
                  <span className="pd-rating-lbl" style={{ fontStyle: "italic" }}>≈ {inspiredBy}</span>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="pd-details-col">
            <div className="pd-chips-row">
              {product.category && <span className="pd-chip pd-chip-coral">{product.category}</span>}
              {gender !== "Unisex" && <span className="pd-chip pd-chip-blue">{genderCfg.emoji} {gender}</span>}
              {familyLabel && <span className="pd-chip pd-chip-gold">{familyLabel}</span>}
              {isOriginal && <span className="pd-chip pd-chip-orig">⭐ Original</span>}
            </div>

            <h1 className="pd-name">{product.name}</h1>

            {product.description && (
              <p className="pd-tagline">{product.description}</p>
            )}

            {/* Scent pyramid */}
            {notes && (
              <div className="pd-section">
                <p className="pd-section-lbl">Pyramide olfactive</p>
                <div className="pd-pyramid">
                  {[
                    { type: "Tête",  icon: "🌿", value: notes.tete,  cls: "pd-pyr-tete" },
                    { type: "Cœur",  icon: "🌸", value: notes.coeur, cls: "pd-pyr-coeur" },
                    { type: "Fond",  icon: "🪵", value: notes.fond,  cls: "pd-pyr-fond" },
                  ].filter(n => n.value).map(n => (
                    <div key={n.type} className={`pd-pyr-card ${n.cls}`}>
                      <div className="pd-pyr-icon">{n.icon}</div>
                      <div className="pd-pyr-type">{n.type}</div>
                      <div className="pd-pyr-value">{n.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="pd-section">
              <p className="pd-section-lbl">Contenance</p>
              <div className="pd-sizes">
                {SIZES.map((sz, i) => (
                  <button
                    key={sz.label}
                    className={`pd-size-card${selectedSize === i ? " pd-size-active" : ""}`}
                    onClick={() => setSelectedSize(i)}
                  >
                    {sz.tag && (
                      <span className={`pd-size-tag${selectedSize === i ? " pd-size-tag-active" : ""}`}>{sz.tag}</span>
                    )}
                    <span className="pd-size-vol">{sz.label}</span>
                    <span className="pd-size-price">{fmt(Math.round(basePrice * sz.price_mult))} MAD</span>
                    {i === 1 && <span className="pd-size-save">Économisez {fmt(Math.round(basePrice * 3 * 0.15))} MAD</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy row */}
            <div className="pd-buy-row">
              <div className="pd-qty">
                <button className="pd-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span className="pd-qty-num">{quantity}</span>
                <button className="pd-qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button
                className={`pd-add-btn${added ? " pd-add-added" : ""}${product.stock === 0 ? " pd-add-oos" : ""}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <span className="pd-add-inner">
                  {product.stock === 0 ? "Épuisé"
                    : added ? <>✓ Ajouté au panier !</>
                    : <><FiShoppingBag size={15} />Ajouter — {fmt(currentPrice * quantity)} MAD</>}
                </span>
                <span className="pd-add-shine" />
              </button>
            </div>

            {/* WhatsApp button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-wa-btn"
            >
              <span className="pd-wa-icon">💬</span>
              Commander via WhatsApp
              <FiPhone size={14} />
            </a>

            {/* Delivery perks */}
            <div className="pd-section">
              <p className="pd-section-lbl">Livraison & Paiement</p>
              <div className="pd-delivery">
                {DELIVERY_PERKS.map(({ icon, title, sub }) => (
                  <div key={title} className="pd-delivery-card">
                    <div className="pd-delivery-icon">{icon}</div>
                    <div>
                      <div className="pd-delivery-title">{title}</div>
                      <div className="pd-delivery-sub">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspired by */}
            {inspiredBy && (
              <div className="pd-inspired-block">
                <div className="pd-inspired-icon">🔄</div>
                <div>
                  <div className="pd-inspired-title">Inspiré par</div>
                  <div className="pd-inspired-val">{inspiredBy}</div>
                </div>
              </div>
            )}

            {/* Full description */}
            {product.description && product.description.length > 80 && (
              <div className="pd-section">
                <p className="pd-section-lbl">Description</p>
                <p style={{ fontFamily:"var(--pd-sans)",fontSize:"0.84rem",lineHeight:"1.8",color:"var(--pd-muted)" }}>
                  {product.description}
                </p>
              </div>
            )}

            {/* Raw scent notes fallback */}
            {!notes && product.scent_notes && (
              <div className="pd-section">
                <p className="pd-section-lbl">Notes olfactives</p>
                <p style={{ fontFamily:"var(--pd-sans)",fontSize:"0.84rem",lineHeight:"1.8",color:"var(--pd-muted)" }}>
                  {product.scent_notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── FAQ SECTION ── */}
        <div className="pd-faq-section container">
          <div className="pd-faq-header">
            <div className="pd-faq-eyebrow">Questions fréquentes</div>
            <h2 className="pd-faq-title">
              Tout ce que vous <em>devez savoir</em>
            </h2>
          </div>

          <div className="pd-faq-grid">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`pd-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="pd-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="pd-faq-q-num">{i + 1}</span>
                  <span className="pd-faq-q-text">{item.q}</span>
                  <FiChevronDown size={15} className="pd-faq-chevron" />
                </button>
                {openFaq === i && (
                  <div className="pd-faq-a">{item.a}</div>
                )}
              </div>
            ))}
          </div>

          {/* Contact bar */}
          <div className="pd-contact-bar">
            <a
              href={`https://wa.me/${WHATSAPP_NUM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-contact-pill pd-contact-wa"
            >
              💬 WhatsApp : +212 636 572 200
            </a>
            <a
              href="https://instagram.com/nahid.perfumes"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-contact-pill pd-contact-ig"
            >
              📸 Instagram : @nahid.perfumes
            </a>
          </div>
        </div>

        {/* ── STICKY BAR ── */}
        <div className={`pd-sticky${showSticky ? " pd-sticky-visible" : ""}`}>
          <div className="pd-sticky-content">
            <div className="pd-sticky-info">
              <p className="pd-sticky-name">{product.name}</p>
              <p className="pd-sticky-price">{fmt(currentPrice)} MAD · {SIZES[selectedSize].label}</p>
            </div>
            <div className="pd-sticky-btns">
              <button
                className={`pd-sticky-btn${added ? " pd-sticky-added" : ""}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {added ? "✓ Ajouté !" : "Ajouter au panier"}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-sticky-wa"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;