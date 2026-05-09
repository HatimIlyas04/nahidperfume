import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiChevronLeft, FiShoppingBag, FiStar, FiChevronDown, FiPhone } from "react-icons/fi";
/* ─── Static ──────────────────────────────────────────────── */
const SIZES_OPTS = [
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
  { icon: "🚚", title: "Livraison gratuite dès 160 DH",  sub: "Offerte dès 4 parfums ou 2 Originals" },
  { icon: "⏱️", title: "Délai 24 à 72 heures",            sub: "Selon votre ville au Maroc" },
  { icon: "💵", title: "Paiement à la livraison (COD)",   sub: "Payez en cash à la réception" },
  { icon: "🇲🇦", title: "Plus de 300 villes",             sub: "Livraison partout au Maroc" },
];

const FAQ_ITEMS = [
  { q: "Comment passer une commande ?",               a: "Cliquez sur le bouton WhatsApp ou ajoutez vos produits au panier, puis suivez les étapes pour confirmer votre commande." },
  { q: "Livrez-vous partout au Maroc ?",               a: "Oui, nous livrons dans plus de 300 villes à travers le Maroc." },
  { q: "Quels sont les délais de livraison ?",         a: "La livraison prend généralement entre 24h et 72h selon votre ville." },
  { q: "La livraison est-elle gratuite ?",             a: "Oui, la livraison est gratuite dès 160 DH (4 parfums inspirés) ou à partir de 2 parfums Originals." },
  { q: "Quels sont les moyens de paiement ?",          a: "Nous acceptons uniquement le paiement à la livraison (COD)." },
  { q: "Les parfums tiennent-ils longtemps ?",         a: "Oui, nos parfums offrent une tenue moyenne de 6 à 8 heures." },
  { q: "Quelle est la contenance des flacons ?",       a: "Tous nos parfums sont en format 30ml spray." },
  { q: "Puis-je choisir différents parfums dans un pack ?", a: "Oui, vous pouvez sélectionner librement vos parfums selon vos préférences." },
  { q: "Puis-je modifier ou annuler ma commande ?",    a: "Oui, contactez-nous rapidement sur WhatsApp pour toute modification." },
  { q: "Comment vous contacter ?",                    a: "Via WhatsApp : +212 636 572 200 ou Instagram : @nahid.perfumes" },
];

const FAMILY_LABELS = {
  flowery: "🌸 Fleuri", fresh: "🍃 Frais", gourmand: "🍫 Gourmand",
  herbal: "🌿 Herbal", earthy: "🌍 Terreux", warm: "🔥 Chaud",
};


function longevityPct(val) {
  if (!val) return 0;
  if (val.includes("12")) return 100;
  if (val.includes("8"))  return 80;
  if (val.includes("6"))  return 60;
  if (val.includes("4"))  return 42;
  return 25;
}

/* ════════════════════════════════════════════════════════════
   CSS — Luxury Perfume Product Page
   ════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');

/* ── Root tokens ── */
.pd-page {
  --coral:      #EF776A;
  --coral-d:    #C9503F;
  --coral-l:    #FFF3F1;
  --coral-ll:   #FFF8F7;
  --gold:       #C9A96E;
  --gold-d:     #A8883E;
  --gold-l:     #F5E9D0;
  --gold-ll:    #FAF5E9;
  --ink:        #0E0E0C;
  --ink2:       #3A3835;
  --cream:      #FAF8F5;
  --sand:       #EDE9E1;
  --muted:      #7A7770;
  --muted2:     #B0ACA5;
  --white:      #FFFFFF;
  --bd:         rgba(14,14,12,.08);
  --bd2:        rgba(14,14,12,.14);
  --sans:       'Poppins', sans-serif;
  --serif:      'Cormorant Garamond', Georgia, serif;
  --ease:       cubic-bezier(.25,.46,.45,.94);
  --spring:     cubic-bezier(.34,1.56,.64,1);
  --expo:       cubic-bezier(.16,1,.3,1);
}

/* ── Animations ── */
@keyframes pdFadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
@keyframes pdScaleIn   { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
@keyframes pdSpin      { to{transform:rotate(360deg)} }
@keyframes pdShine     { from{left:-80%} to{left:140%} }
@keyframes pdPulse     { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.9;transform:scale(1.06)} }
@keyframes pdBadgePop  { from{transform:scale(0) rotate(-8deg)} to{transform:scale(1) rotate(0)} }
@keyframes pdWaPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} 55%{box-shadow:0 0 0 10px rgba(37,211,102,.18)} }
@keyframes pdBarFill   { from{width:0} to{width:var(--target-w,100%)} }
@keyframes pdAccordion { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
@keyframes pdDotPop    { from{transform:scale(0)} to{transform:scale(1)} }
@keyframes pdGlow      { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0)} 50%{box-shadow:0 0 0 12px rgba(239,119,106,.12)} }

/* ── Page ── */
.pd-page *, .pd-page *::before, .pd-page *::after { box-sizing:border-box; margin:0; padding:0; }
.pd-page {
  position:relative; background:var(--cream); min-height:100vh;
  padding:clamp(80px,10vh,110px) 0 clamp(80px,10vw,140px);
  overflow-x:hidden; font-family:var(--sans); -webkit-font-smoothing:antialiased;
}
.pd-page .container { max-width:1280px; margin:0 auto; padding:0 clamp(16px,4vw,56px); }

/* Ambient glow */
.pd-ambient {
  position:fixed; inset:0; pointer-events:none; z-index:0;
  background:radial-gradient(ellipse 60% 55% at 80% 20%, var(--pd-ambient,#FADADD) 0%, transparent 70%);
  opacity:.32; transition:background .9s;
}

/* Back button */
.pd-back {
  position:relative; z-index:2;
  display:inline-flex; align-items:center; gap:6px;
  background:var(--white); border:1px solid var(--bd);
  color:var(--muted); font-family:var(--sans);
  font-size:.72rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase;
  padding:9px 18px 9px 14px; border-radius:999px; cursor:pointer;
  margin:0 clamp(16px,4vw,56px) 28px;
  transition:color .2s,border-color .2s,background .2s,transform .2s var(--spring);
  box-shadow:0 2px 10px rgba(14,14,12,.05);
}
.pd-back:hover { color:var(--ink); border-color:var(--ink); transform:translateY(-2px); background:var(--cream); }

/* ══ HERO GRID ══ */
.pd-grid {
  position:relative; z-index:1;
  display:grid; grid-template-columns:1fr 1fr;
  gap:clamp(36px,6vw,88px); align-items:start;
  margin-bottom:clamp(60px,8vw,100px);
}
.pd-img-col, .pd-details-col { opacity:0; transform:translateY(28px); transition:opacity .9s var(--expo),transform .9s var(--expo); }
.pd-revealed .pd-img-col  { opacity:1; transform:none; transition-delay:.05s; }
.pd-revealed .pd-details-col { opacity:1; transform:none; transition-delay:.18s; }
.pd-img-col    { position:sticky; top:96px; }
.pd-details-col{ position:sticky; top:96px; }

/* ── Image frame ── */
.pd-img-frame {
  position:relative; border-radius:28px; overflow:hidden;
  background:linear-gradient(145deg,#F4F0EA,#EDE8E0); aspect-ratio:3/4;
  box-shadow:0 4px 12px rgba(0,0,0,.04),0 24px 64px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.7);
}
.pd-ring {
  position:absolute; border-radius:50%;
  border:1px solid rgba(239,119,106,.15); pointer-events:none;
  animation:pdPulse 5s ease-in-out infinite;
}
.pd-ring-1 { width:70%;height:70%;top:-10%;right:-15%; }
.pd-ring-2 { width:50%;height:50%;bottom:-10%;left:-10%;animation-delay:2.5s; }
.pd-stock-badge {
  position:absolute; top:16px; left:16px; z-index:2;
  background:white; color:var(--coral);
  font-family:var(--sans); font-size:.62rem; font-weight:800;
  letter-spacing:.1em; text-transform:uppercase; padding:6px 14px;
  border-radius:999px; box-shadow:0 2px 14px rgba(239,119,106,.25);
  animation:pdBadgePop .4s var(--spring) both;
}
.pd-orig-badge {
  position:absolute; top:16px; right:16px; z-index:2;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white; font-family:var(--sans); font-size:.62rem;
  font-weight:800; letter-spacing:.08em; text-transform:uppercase;
  padding:6px 14px; border-radius:999px;
  box-shadow:0 3px 14px rgba(239,119,106,.4);
  animation:pdBadgePop .4s var(--spring) .1s both;
}
.pd-img-wrap { width:100%;height:100%;opacity:0;transition:opacity .8s ease; }
.pd-img-loaded { opacity:1; }
.pd-img { width:100%;height:100%;object-fit:cover;transition:transform .7s var(--ease); }
.pd-img-frame:hover .pd-img { transform:scale(1.04); }
.pd-img-halo { position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:.5; }

/* Rating strip */
.pd-rating-strip {
  display:flex; align-items:center; gap:10px; margin-top:14px;
  padding:13px 18px; background:white; border-radius:16px;
  box-shadow:0 2px 14px rgba(0,0,0,.05); flex-wrap:wrap; border:1px solid var(--bd);
}
.pd-stars { display:flex;gap:3px;flex-shrink:0; }
.pd-rating-lbl { font-family:var(--sans);font-size:.72rem;font-weight:500;color:var(--muted); }
.pd-rating-sep { color:var(--bd2); }

/* ── Quick-spec strip under image ── */
.pd-spec-strip {
  display:flex; gap:0; margin-top:10px;
  background:white; border:1px solid var(--bd); border-radius:16px; overflow:hidden;
  box-shadow:0 2px 10px rgba(14,14,12,.04);
}
.pd-spec-item {
  flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:13px 6px; gap:4px; border-right:1px solid var(--bd);
  transition:background .2s;
}
.pd-spec-item:last-child { border-right:none; }
.pd-spec-item:hover { background:var(--coral-ll); }
.pd-spec-icon { font-size:1.1rem; line-height:1; }
.pd-spec-val  { font-family:var(--sans);font-size:.68rem;font-weight:800;color:var(--ink);text-align:center;line-height:1.2; }
.pd-spec-lbl  { font-family:var(--sans);font-size:.52rem;font-weight:600;color:var(--muted2);letter-spacing:.08em;text-transform:uppercase; }

/* ── DETAILS COL ── */
.pd-chips-row { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px; }
.pd-chip {
  display:inline-flex;align-items:center;padding:5px 13px;border-radius:999px;
  font-family:var(--sans);font-size:.58rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
}
.pd-chip-coral { background:var(--coral-l);color:var(--coral-d); }
.pd-chip-blue  { background:#EFF6FF;color:#1D4ED8; }
.pd-chip-gold  { background:var(--gold-l);color:var(--gold-d); }
.pd-chip-orig  { background:linear-gradient(135deg,var(--coral),var(--coral-d));color:white;box-shadow:0 3px 10px rgba(239,119,106,.3); }
.pd-chip-conc  { background:#F0F4FF;border:1px solid #C7D7FF;color:#3B5BDB; }
.pd-chip-size  { background:#F3EFFF;border:1px solid #C9B8FF;color:#6E3ADA; }

.pd-name {
  font-family:var(--sans); font-size:clamp(1.8rem,4.5vw,3rem);
  font-weight:900; color:var(--ink); line-height:1.05;
  letter-spacing:-.03em; margin-bottom:14px;
}
.pd-tagline {
  font-size:1.05rem; color:var(--muted); line-height:1.8;
  margin-bottom:26px; padding:14px 18px;
  border-left:3px solid var(--coral);
  font-style:italic; font-family:var(--serif);
  background:var(--coral-ll); border-radius:0 14px 14px 0;
}

/* Section label */
.pd-section { margin-bottom:28px; }
.pd-section-lbl {
  font-family:var(--sans); font-size:.58rem; font-weight:800;
  letter-spacing:.2em; text-transform:uppercase; color:var(--muted);
  margin-bottom:14px; display:flex; align-items:center; gap:10px;
}
.pd-section-lbl::after { content:'';flex:1;height:1px;background:linear-gradient(to right,var(--bd),transparent); }

/* ══ PERFUME PYRAMID ══ */
.pd-pyramid-wrap {
  background:linear-gradient(160deg,var(--cream),white);
  border:1px solid var(--bd); border-radius:22px; overflow:hidden;
  box-shadow:0 4px 20px rgba(14,14,12,.04);
}
.pd-pyramid-header {
  padding:18px 22px 14px; border-bottom:1px solid var(--bd);
  display:flex; align-items:center; gap:12px;
}
.pd-pyramid-badge {
  width:34px; height:34px; border-radius:12px; flex-shrink:0;
  background:linear-gradient(135deg,var(--coral-l),var(--gold-l));
  display:flex; align-items:center; justify-content:center; font-size:1rem;
}
.pd-pyramid-title { font-family:var(--sans);font-size:.82rem;font-weight:800;color:var(--ink);letter-spacing:-.01em; }
.pd-pyramid-sub   { font-family:var(--sans);font-size:.64rem;font-weight:500;color:var(--muted);margin-top:2px; }
.pd-pyramid-body  { padding:16px; display:flex; flex-direction:column; gap:2px; }
.pd-pyr-row {
  display:flex; align-items:stretch; gap:0; border-radius:14px; overflow:hidden;
  transition:transform .25s var(--spring),box-shadow .25s;
}
.pd-pyr-row:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(14,14,12,.07); }
.pd-pyr-accent {
  width:5px; flex-shrink:0;
}
.pd-pyr-tete .pd-pyr-accent  { background:linear-gradient(180deg,#6BAA6B,#A8D5A8); }
.pd-pyr-coeur .pd-pyr-accent { background:linear-gradient(180deg,var(--coral),#F4A0A0); }
.pd-pyr-fond .pd-pyr-accent  { background:linear-gradient(180deg,var(--gold),#E9D6A9); }
.pd-pyr-inner {
  flex:1; display:flex; align-items:center; gap:14px;
  padding:15px 18px; background:white; border:1px solid var(--bd);
  border-left:none; border-radius:0 12px 12px 0;
}
.pd-pyr-row:first-child .pd-pyr-inner { border-radius:0 12px 0 0; }
.pd-pyr-row:last-child  .pd-pyr-inner { border-radius:0 0 12px 0; }
.pd-pyr-icon-wrap {
  width:38px; height:38px; border-radius:12px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:1.2rem;
}
.pd-pyr-tete  .pd-pyr-icon-wrap { background:rgba(107,170,107,.12); }
.pd-pyr-coeur .pd-pyr-icon-wrap { background:var(--coral-l); }
.pd-pyr-fond  .pd-pyr-icon-wrap { background:var(--gold-l); }
.pd-pyr-content { flex:1; min-width:0; }
.pd-pyr-label {
  font-family:var(--sans); font-size:.54rem; font-weight:800;
  letter-spacing:.16em; text-transform:uppercase; color:var(--muted); margin-bottom:4px;
}
.pd-pyr-value {
  font-family:var(--sans); font-size:.8rem; font-weight:600; color:var(--ink); line-height:1.4;
}
.pd-pyr-desc { font-family:var(--sans);font-size:.62rem;color:var(--muted);margin-top:2px;font-style:italic; }

/* ══ CHARACTERISTICS GRID ══ */
.pd-chars { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.pd-char-card {
  background:white; border:1px solid var(--bd); border-radius:18px; padding:18px 18px 16px;
  transition:transform .25s var(--spring),box-shadow .25s,border-color .25s;
  position:relative; overflow:hidden;
}
.pd-char-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:3px 3px 0 0;
}
.pd-char-card.coral::before { background:linear-gradient(90deg,var(--coral),var(--coral-d)); }
.pd-char-card.gold::before  { background:linear-gradient(90deg,var(--gold),var(--gold-d)); }
.pd-char-card.teal::before  { background:linear-gradient(90deg,#0EA5E9,#0284C7); }
.pd-char-card.purple::before{ background:linear-gradient(90deg,#A855F7,#7C3AED); }
.pd-char-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(14,14,12,.08); border-color:rgba(239,119,106,.2); }
.pd-char-icon  { font-size:1.4rem; margin-bottom:10px; display:block; }
.pd-char-label { font-family:var(--sans);font-size:.56rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:6px; }
.pd-char-val   { font-family:var(--sans);font-size:.9rem;font-weight:800;color:var(--ink);line-height:1.2; }
.pd-char-sub   { font-family:var(--sans);font-size:.62rem;color:var(--muted);margin-top:4px; }

/* Intensity dots */
.pd-dots { display:flex; gap:5px; margin-top:8px; }
.pd-dot  { width:9px; height:9px; border-radius:50%; background:var(--sand); }
.pd-dot.filled { background:var(--coral); animation:pdDotPop .4s var(--spring) both; }

/* Animated progress bar */
.pd-bar-track { height:6px; border-radius:999px; background:var(--sand); overflow:hidden; margin-top:9px; }
.pd-bar-fill {
  height:100%; border-radius:999px;
  background:linear-gradient(90deg,var(--coral),var(--coral-d));
  animation:pdBarFill 1.2s var(--expo) both;
}
.pd-bar-fill.gold-bar { background:linear-gradient(90deg,var(--gold),var(--gold-d)); }

/* Longevity clock scale */
.pd-longevity-scale { display:flex; justify-content:space-between; margin-top:6px; }
.pd-longevity-tick  { font-family:var(--sans);font-size:.5rem;font-weight:600;color:var(--muted2); }

/* ══ COMPARISON CARD ══ */
.pd-compare {
  border-radius:22px; overflow:hidden;
  border:1px solid rgba(200,168,106,.3);
  background:linear-gradient(135deg,var(--gold-ll),#FFF9F0);
  margin-bottom:24px;
}
.pd-compare-header {
  padding:14px 20px 10px;
  display:flex; align-items:center; gap:10px;
  border-bottom:1px solid rgba(200,168,106,.2);
  background:rgba(200,168,106,.07);
}
.pd-compare-tag {
  font-family:var(--sans); font-size:.55rem; font-weight:800;
  letter-spacing:.18em; text-transform:uppercase; color:var(--gold-d);
  display:flex; align-items:center; gap:7px;
}
.pd-compare-tag::before { content:'';width:18px;height:1px;background:var(--gold-d); }
.pd-compare-body { padding:20px 22px; display:flex; align-items:flex-start; gap:16px; }
.pd-compare-icon { font-size:2.2rem; line-height:1; flex-shrink:0; }
.pd-compare-text {
  font-family:var(--serif); font-size:1.32rem; font-weight:400;
  color:var(--ink); line-height:1.45;
}
.pd-compare-text em { font-style:italic; color:var(--gold-d); }
.pd-compare-sub {
  font-family:var(--sans); font-size:.68rem; color:var(--muted);
  margin-top:8px; line-height:1.6;
}
.pd-compare-pill {
  display:inline-flex; align-items:center; gap:6px; margin-top:10px;
  padding:6px 14px; border-radius:999px;
  background:rgba(200,168,106,.15); border:1px solid rgba(200,168,106,.3);
  font-family:var(--sans); font-size:.6rem; font-weight:700; color:var(--gold-d);
}

/* Sizes */
.pd-sizes { display:flex; flex-direction:column; gap:10px; }
.pd-size-card {
  display:flex; align-items:center; gap:12px; padding:16px 20px;
  border-radius:18px; border:1.5px solid var(--bd); background:white;
  cursor:pointer; position:relative; overflow:hidden;
  transition:all .28s var(--ease); font-family:var(--sans);
  box-shadow:0 2px 8px rgba(14,14,12,.03);
}
.pd-size-active {
  border-color:var(--coral); background:var(--coral-l);
  box-shadow:0 0 0 3px rgba(239,119,106,.12),0 6px 24px rgba(239,119,106,.14);
}
.pd-size-card:hover:not(.pd-size-active) { border-color:rgba(14,14,12,.2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(14,14,12,.06); }
.pd-size-tag { font-family:var(--sans);font-size:.58rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;padding:3px 10px;border-radius:999px;background:var(--sand);color:var(--muted);transition:all .25s;flex-shrink:0; }
.pd-size-tag-active { background:var(--coral);color:white; }
.pd-size-vol   { font-family:var(--sans);font-weight:700;font-size:.85rem;color:var(--ink);flex:1; }
.pd-size-price { font-family:var(--serif);font-size:1.4rem;font-weight:600;color:var(--ink); }
.pd-size-active .pd-size-price { color:var(--coral); }
.pd-size-save  { font-family:var(--sans);font-size:.65rem;color:#2E7D32;font-weight:700; }

/* Buy row */
.pd-buy-row { display:flex; gap:12px; align-items:center; margin-bottom:16px; }
.pd-qty {
  display:flex; align-items:center; border:1.5px solid var(--bd);
  border-radius:999px; background:white; overflow:hidden; flex-shrink:0;
}
.pd-qty-btn {
  width:44px; height:52px; background:none; border:none; font-size:1.2rem;
  color:var(--ink); cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:background .15s;
}
.pd-qty-btn:hover { background:var(--coral-l); }
.pd-qty-num {
  min-width:44px; text-align:center; font-family:var(--sans);
  font-weight:800; font-size:.92rem; line-height:52px;
  border-left:1px solid var(--bd); border-right:1px solid var(--bd); color:var(--ink);
}
.pd-add-btn {
  flex:1; height:52px; border:none; border-radius:999px;
  background:linear-gradient(135deg,var(--coral),var(--coral-d)); color:white;
  font-family:var(--sans); font-size:.78rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase;
  position:relative; overflow:hidden; cursor:pointer;
  transition:transform .2s var(--spring),box-shadow .2s;
  box-shadow:0 6px 28px rgba(239,119,106,.4);
}
.pd-add-inner { position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:9px;height:100%; }
.pd-add-shine {
  position:absolute;top:0;left:-80%;width:50%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
  transform:skewX(-20deg);pointer-events:none;
}
.pd-add-btn:hover:not(:disabled) { transform:translateY(-3px) scale(1.01);box-shadow:0 14px 40px rgba(239,119,106,.5); }
.pd-add-btn:hover .pd-add-shine { animation:pdShine .65s ease forwards; }
.pd-add-btn:active:not(:disabled) { transform:scale(.98); }
.pd-add-added { background:linear-gradient(135deg,#1B5E20,#2E7D32)!important;box-shadow:0 6px 28px rgba(46,125,50,.4)!important; }
.pd-add-oos { background:rgba(14,14,12,.1)!important;box-shadow:none!important;cursor:not-allowed!important; }

/* WhatsApp */
.pd-wa-btn {
  width:100%; height:52px; border:none; border-radius:999px;
  background:linear-gradient(135deg,#25D366,#1DA851); color:white;
  font-family:var(--sans); font-size:.78rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase;
  display:flex; align-items:center; justify-content:center; gap:10px;
  cursor:pointer; text-decoration:none;
  transition:transform .2s var(--spring),box-shadow .2s;
  box-shadow:0 6px 28px rgba(37,211,102,.35); animation:pdWaPulse 3s ease infinite; margin-bottom:16px;
}
.pd-wa-btn:hover { transform:translateY(-3px) scale(1.01);box-shadow:0 14px 40px rgba(37,211,102,.5); }
.pd-wa-icon { font-size:1.2rem;line-height:1; }

/* Delivery */
.pd-delivery { display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px; }
.pd-delivery-card {
  display:flex;align-items:flex-start;gap:10px;padding:14px;
  background:white;border:1px solid var(--bd);border-radius:16px;
  transition:transform .25s var(--spring),box-shadow .25s,border-color .2s;
  box-shadow:0 2px 8px rgba(14,14,12,.03);
}
.pd-delivery-card:hover { transform:translateY(-3px);box-shadow:0 10px 28px rgba(14,14,12,.08);border-color:rgba(239,119,106,.2); }
.pd-delivery-icon {
  width:36px;height:36px;border-radius:12px;flex-shrink:0;
  background:var(--coral-l);display:flex;align-items:center;justify-content:center;font-size:1rem;
}
.pd-delivery-title { font-family:var(--sans);font-size:.72rem;font-weight:800;color:var(--ink);letter-spacing:-.01em;margin-bottom:2px; }
.pd-delivery-sub   { font-family:var(--sans);font-size:.62rem;font-weight:500;color:var(--muted);line-height:1.4; }

/* ══ ACCORDION ══ */
.pd-acc-list { display:flex;flex-direction:column;gap:8px; }
.pd-acc-item {
  border:1px solid var(--bd); border-radius:16px; overflow:hidden; background:white;
  transition:border-color .25s,box-shadow .25s;
}
.pd-acc-item.open { border-color:var(--coral);box-shadow:0 4px 20px rgba(239,119,106,.1); }
.pd-acc-q {
  width:100%; display:flex; align-items:center; justify-content:space-between;
  padding:15px 20px; background:none; border:none; cursor:pointer;
  font-family:var(--sans); font-size:.8rem; font-weight:700; color:var(--ink);
  transition:background .2s; text-align:left;
}
.pd-acc-item.open .pd-acc-q { color:var(--coral); }
.pd-acc-q:hover { background:var(--cream); }
.pd-acc-q-left { display:flex;align-items:center;gap:10px;flex:1; }
.pd-acc-emoji  { font-size:1rem;flex-shrink:0; }
.pd-acc-arr    { flex-shrink:0;color:var(--muted);transition:transform .3s var(--expo),color .2s; }
.pd-acc-item.open .pd-acc-arr { transform:rotate(180deg);color:var(--coral); }
.pd-acc-body {
  padding:0 20px 18px;
  font-family:var(--sans);font-size:.78rem;color:var(--muted);line-height:1.82;
  animation:pdAccordion .28s var(--ease) both;
}

/* ══ FAQ ══ */
.pd-faq-section {
  position:relative;z-index:1; border-top:1px solid var(--bd);
  padding-top:clamp(48px,6vw,80px);
}
.pd-faq-header { margin-bottom:clamp(32px,4vw,52px);text-align:center; }
.pd-faq-eyebrow {
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--sans);font-size:.6rem;font-weight:800;letter-spacing:.28em;text-transform:uppercase;
  color:var(--coral);margin-bottom:14px;
}
.pd-faq-eyebrow::before,.pd-faq-eyebrow::after { content:'';width:22px;height:1px;background:var(--coral);display:block; }
.pd-faq-title { font-family:var(--sans);font-size:clamp(1.6rem,3.5vw,2.6rem);font-weight:900;color:var(--ink);letter-spacing:-.03em;line-height:1.05; }
.pd-faq-title em { font-style:italic;font-weight:300;font-family:var(--serif);color:var(--coral);font-size:1.08em; }
.pd-faq-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:1000px;margin:0 auto; }
.pd-faq-item { border-radius:18px;overflow:hidden;border:1.5px solid var(--bd);background:white;transition:border-color .25s,box-shadow .25s;box-shadow:0 2px 8px rgba(14,14,12,.03); }
.pd-faq-item.open { border-color:var(--coral);box-shadow:0 4px 20px rgba(239,119,106,.1); }
.pd-faq-q {
  width:100%;display:flex;align-items:center;justify-content:space-between;
  gap:12px;padding:16px 20px;background:none;border:none;cursor:pointer;
  font-family:var(--sans);font-size:.8rem;font-weight:700;color:var(--ink);text-align:left;
  transition:color .2s;letter-spacing:-.01em;
}
.pd-faq-item.open .pd-faq-q { color:var(--coral); }
.pd-faq-q-num {
  width:24px;height:24px;border-radius:50%;flex-shrink:0;
  background:var(--cream);border:1px solid var(--bd);
  display:flex;align-items:center;justify-content:center;
  font-size:.58rem;font-weight:800;color:var(--muted);
  transition:background .2s,color .2s,border-color .2s;
}
.pd-faq-item.open .pd-faq-q-num { background:var(--coral);color:white;border-color:var(--coral); }
.pd-faq-q-text { flex:1; }
.pd-faq-chevron { flex-shrink:0;color:var(--muted);transition:transform .35s var(--spring),color .2s; }
.pd-faq-item.open .pd-faq-chevron { transform:rotate(180deg);color:var(--coral); }
.pd-faq-a { padding:0 20px 18px;font-family:var(--sans);font-size:.78rem;font-weight:400;color:var(--muted);line-height:1.75;animation:pdAccordion .3s var(--ease) both;border-top:1px solid var(--bd);padding-top:14px; }

/* Contact bar */
.pd-contact-bar { display:flex;align-items:center;justify-content:center;gap:16px;margin-top:32px;flex-wrap:wrap; }
.pd-contact-pill {
  display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:999px;
  font-family:var(--sans);font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  text-decoration:none;cursor:pointer;border:none;transition:transform .2s var(--spring),box-shadow .2s;
}
.pd-contact-wa { background:linear-gradient(135deg,#25D366,#1DA851);color:white;box-shadow:0 4px 18px rgba(37,211,102,.35); }
.pd-contact-wa:hover { transform:translateY(-3px);box-shadow:0 8px 28px rgba(37,211,102,.5); }
.pd-contact-ig { background:linear-gradient(135deg,#E1306C,#833AB4);color:white;box-shadow:0 4px 18px rgba(225,48,108,.3); }
.pd-contact-ig:hover { transform:translateY(-3px);box-shadow:0 8px 28px rgba(225,48,108,.45); }

/* ══ STICKY BAR ══ */
.pd-sticky {
  position:fixed;bottom:0;left:0;right:0;z-index:900;
  background:rgba(250,248,245,.94);backdrop-filter:blur(20px);
  border-top:1px solid var(--bd);box-shadow:0 -8px 40px rgba(14,14,12,.1);
  transform:translateY(100%);opacity:0;transition:transform .4s var(--expo),opacity .4s;
}
.pd-sticky-visible { transform:translateY(0)!important;opacity:1!important; }
.pd-sticky-content { max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:12px clamp(16px,4vw,56px);gap:14px;flex-wrap:wrap; }
.pd-sticky-name  { font-family:var(--sans);font-size:.9rem;font-weight:800;color:var(--ink);letter-spacing:-.01em; }
.pd-sticky-price { font-family:var(--sans);font-size:.72rem;font-weight:600;color:var(--coral);margin-top:1px; }
.pd-sticky-btns  { display:flex;gap:10px;align-items:center;flex-shrink:0; }
.pd-sticky-btn {
  background:linear-gradient(135deg,var(--coral),var(--coral-d));color:white;border:none;border-radius:999px;
  padding:11px 24px;font-family:var(--sans);font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
  cursor:pointer;transition:transform .2s var(--spring),box-shadow .2s;
  box-shadow:0 4px 16px rgba(239,119,106,.4);white-space:nowrap;
}
.pd-sticky-btn:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(239,119,106,.5); }
.pd-sticky-added { background:linear-gradient(135deg,#1B5E20,#2E7D32)!important; }
.pd-sticky-wa {
  background:linear-gradient(135deg,#25D366,#1DA851);color:white;border:none;border-radius:999px;
  padding:11px 20px;font-family:var(--sans);font-size:.72rem;font-weight:800;
  cursor:pointer;transition:transform .2s var(--spring),box-shadow .2s;
  box-shadow:0 4px 16px rgba(37,211,102,.35);
  display:flex;align-items:center;gap:6px;white-space:nowrap;text-decoration:none;
}
.pd-sticky-wa:hover { transform:translateY(-2px); }

/* Loader */
.pd-loader { min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:var(--cream); }
.pd-loader-ring { width:44px;height:44px;border:3px solid rgba(14,14,12,.06);border-top-color:var(--coral);border-radius:50%;animation:pdSpin .75s linear infinite; }
.pd-loader-txt  { font-family:var(--sans);font-size:.72rem;font-weight:600;color:var(--muted);letter-spacing:.12em;text-transform:uppercase; }

/* ── Responsive ── */
@media (max-width:1024px) { .pd-faq-grid{grid-template-columns:1fr;} }
@media (max-width:900px) {
  .pd-grid{grid-template-columns:1fr;gap:28px;}
  .pd-img-col,.pd-details-col{position:static;}
  .pd-img-frame{aspect-ratio:4/3;border-radius:22px;}
  .pd-faq-grid{grid-template-columns:1fr;}
}
@media (max-width:640px) {
  .pd-delivery{grid-template-columns:1fr;}
  .pd-chars{grid-template-columns:1fr 1fr;}
  .pd-buy-row{flex-direction:column;}
  .pd-qty{width:100%;justify-content:center;}
  .pd-add-btn,.pd-wa-btn{width:100%;}
  .pd-sticky-content{flex-direction:column;align-items:stretch;gap:10px;}
  .pd-sticky-btns{flex-direction:column;}
  .pd-sticky-btn,.pd-sticky-wa{width:100%;justify-content:center;}
  .pd-contact-bar{flex-direction:column;align-items:stretch;}
  .pd-contact-pill{justify-content:center;}
  .pd-spec-strip{flex-wrap:wrap;}
  .pd-spec-item{flex:1 1 calc(50% - 1px);}
}
@media (max-width:400px) {
  .pd-name{font-size:1.7rem;}
  .pd-rating-strip{flex-direction:column;align-items:flex-start;gap:6px;}
  .pd-chars{grid-template-columns:1fr;}
}
`;

/* ════════════════════════════════════════════════════════════
   Sub-components
   ════════════════════════════════════════════════════════════ */

/* AccordionItem */
const AccordionItem = ({ emoji, label, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`pd-acc-item${open ? " open" : ""}`}>
      <button className="pd-acc-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="pd-acc-q-left">
          <span className="pd-acc-emoji">{emoji}</span>
          {label}
        </span>
        <FiChevronDown size={15} className="pd-acc-arr" />
      </button>
      {open && <div className="pd-acc-body">{children}</div>}
    </div>
  );
};

/* Intensity dots */
const IntensityDots = ({ value, max = 5 }) => (
  <div className="pd-dots">
    {Array.from({ length: max }, (_, i) => (
      <div key={i} className={`pd-dot${i < value ? " filled" : ""}`}
        style={i < value ? { animationDelay: `${i * 0.1}s` } : {}} />
    ))}
  </div>
);

/* Bar with animation */
const AnimBar = ({ pct, gold }) => (
  <div className="pd-bar-track">
    <div className={`pd-bar-fill${gold ? " gold-bar" : ""}`}
      style={{ "--target-w": `${pct}%`, width: `${pct}%` }} />
  </div>
);

/* ════════════════════════════════════════════════════════════
   ProductDetails Component
   ════════════════════════════════════════════════════════════ */
const ProductDetails = ({ addToCart, onCartOpen }) => {
  const { id }   = useParams();
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
    window.scrollTo(0, 0);
    axios.get(`/api/products/${id}`)
      .then(r => setProduct(r.data))
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

  /* ── Derived values ── */
  const basePrice    = product ? parseFloat(product.price) || 0 : 0;
  const currentPrice = Math.round(basePrice * SIZES_OPTS[selectedSize].price_mult);
  const topNotes     = product?.top_notes    || null;
  const middleNotes  = product?.middle_notes || null;
  const baseNotes    = product?.base_notes   || null;
  const hasPyramid   = !!(topNotes || middleNotes || baseNotes);

  const gender       = product?.gender || "Unisex";
  const genderCfg    = GENDER_CFG[gender] || GENDER_CFG.Unisex;
  const familyLabel  = product?.scent_family ? (FAMILY_LABELS[product.scent_family] || product.scent_family) : null;
  const isOriginal   = product?.product_type === "Original";
  const isInspired   = product?.product_type === "Inspired By";
  const inspiredBy   = product?.inspired_by || null;

  const intensity  = product?.scent_intensity ? parseInt(product.scent_intensity) : null;
  const longevity  = product?.longevity || null;
  const longevPct  = longevityPct(longevity);

  const waMessage = product
    ? encodeURIComponent(`Bonjour ! Je suis intéressé(e) par : ${product.name} (${SIZES_OPTS[selectedSize].label}) — ${fmt(currentPrice * quantity)} MAD. Pouvez-vous confirmer ma commande ?`)
    : "";
  const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${waMessage}`;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, price: currentPrice, size: SIZES_OPTS[selectedSize].label }, quantity);
    setAdded(true);
    onCartOpen?.();
    setTimeout(() => setAdded(false), 2500);
  };

  /* ── Loader ── */
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

  /* ── Spec strip items (only show those with data) ── */
  const specs = [
    product.concentration && { icon: "⚗️", val: product.concentration.replace("Extrait de ", "Extrait\n"), lbl: "Concentration" },
    product.size          && { icon: "📦", val: product.size, lbl: "Format" },
    intensity             && { icon: "💨", val: `${intensity}/5`, lbl: "Intensité" },
    longevity             && { icon: "⏱", val: longevity, lbl: "Longévité" },
  ].filter(Boolean);

  /* ── Render ── */
  return (
    <>
      <style>{CSS}</style>
      <div
        className={`pd-page${reveal ? " pd-revealed" : ""}`}
        style={{ "--pd-ambient": genderCfg.color }}
      >
        <div className="pd-ambient" />

        {/* Back */}
        <button className="pd-back" onClick={() => navigate(-1)}>
          <FiChevronLeft size={14} /> Retour
        </button>

        {/* ══════════════════════════════════════
            HERO GRID — Image + Info columns
            ══════════════════════════════════════ */}
        <div className="pd-grid container" ref={heroRef}>

          {/* ── LEFT: Image + Spec strip ── */}
          <div className="pd-img-col">

            {/* Image frame */}
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
              <div
                className="pd-img-halo"
                style={{ background: `radial-gradient(ellipse at 50% 80%, ${genderCfg.color}cc 0%, transparent 70%)` }}
              />
            </div>

            {/* Rating strip */}
            <div className="pd-rating-strip">
              <div className="pd-stars">
                {[1,2,3,4,5].map(n => (
                  <FiStar key={n} size={13} fill="#EF776A" color="#EF776A" strokeWidth={0} />
                ))}
              </div>
              <span className="pd-rating-lbl">4.9 · 48 avis</span>
              <span className="pd-rating-sep">|</span>
              <span className="pd-rating-lbl">Certifié authentique</span>
              {inspiredBy && (
                <>
                  <span className="pd-rating-sep">|</span>
                  <span className="pd-rating-lbl" style={{ fontStyle:"italic" }}>≈ {inspiredBy}</span>
                </>
              )}
            </div>

            {/* Quick-spec strip */}
            {specs.length > 0 && (
              <div className="pd-spec-strip">
                {specs.map(s => (
                  <div key={s.lbl} className="pd-spec-item">
                    <span className="pd-spec-icon">{s.icon}</span>
                    <span className="pd-spec-val">{s.val}</span>
                    <span className="pd-spec-lbl">{s.lbl}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="pd-details-col">

            {/* Chips */}
            <div className="pd-chips-row">
              {product.category   && <span className="pd-chip pd-chip-coral">{product.category}</span>}
              {gender !== "Unisex"&& <span className="pd-chip pd-chip-blue">{genderCfg.emoji} {gender}</span>}
              {familyLabel        && <span className="pd-chip pd-chip-gold">{familyLabel}</span>}
              {isOriginal         && <span className="pd-chip pd-chip-orig">⭐ Original</span>}
              {product.concentration && <span className="pd-chip pd-chip-conc">⚗️ {product.concentration}</span>}
              {product.size          && <span className="pd-chip pd-chip-size">📦 {product.size}</span>}
            </div>

            {/* Name */}
            <h1 className="pd-name">{product.name}</h1>

            {/* Tagline / description */}
            {product.description && (
              <p className="pd-tagline">{product.description}</p>
            )}

            {/* ─── COMPARISON CARD (Inspired By) ─── */}
            {isInspired && inspiredBy && (
              <div className="pd-compare" style={{ marginBottom: 26 }}>
                <div className="pd-compare-header">
                  <span className="pd-compare-tag">Dupe de luxe</span>
                </div>
                <div className="pd-compare-body">
                  <div className="pd-compare-icon">🔄</div>
                  <div>
                    <div className="pd-compare-text">
                      Si vous aimez <em>{inspiredBy}</em>,<br />
                      vous adorerez ce parfum
                    </div>
                    <p className="pd-compare-sub">
                      Une expérience olfactive similaire à une fraction du prix,
                      fabriquée au Maroc avec des matières premières de qualité.
                    </p>
                    <div className="pd-compare-pill">
                      ✦ Inspiré par {inspiredBy}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── PERFUME PYRAMID ─── */}
            {hasPyramid && (
              <div className="pd-section">
                <p className="pd-section-lbl">Pyramide olfactive</p>
                <div className="pd-pyramid-wrap">
                  <div className="pd-pyramid-header">
                    <div className="pd-pyramid-badge">🏺</div>
                    <div>
                      <div className="pd-pyramid-title">Notes de parfum</div>
                      <div className="pd-pyramid-sub">Du premier souffle à la signature durable</div>
                    </div>
                  </div>
                  <div className="pd-pyramid-body">
                    {topNotes && (
                      <div className="pd-pyr-row pd-pyr-tete">
                        <div className="pd-pyr-accent" />
                        <div className="pd-pyr-inner">
                          <div className="pd-pyr-icon-wrap">🌿</div>
                          <div className="pd-pyr-content">
                            <div className="pd-pyr-label">Notes de tête</div>
                            <div className="pd-pyr-value">{topNotes}</div>
                            <div className="pd-pyr-desc">Première impression · Durent 15–30 min</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {middleNotes && (
                      <div className="pd-pyr-row pd-pyr-coeur">
                        <div className="pd-pyr-accent" />
                        <div className="pd-pyr-inner">
                          <div className="pd-pyr-icon-wrap">🌸</div>
                          <div className="pd-pyr-content">
                            <div className="pd-pyr-label">Notes de cœur</div>
                            <div className="pd-pyr-value">{middleNotes}</div>
                            <div className="pd-pyr-desc">L'âme du parfum · Durent 2–4 heures</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {baseNotes && (
                      <div className="pd-pyr-row pd-pyr-fond">
                        <div className="pd-pyr-accent" />
                        <div className="pd-pyr-inner">
                          <div className="pd-pyr-icon-wrap">🪵</div>
                          <div className="pd-pyr-content">
                            <div className="pd-pyr-label">Notes de fond</div>
                            <div className="pd-pyr-value">{baseNotes}</div>
                            <div className="pd-pyr-desc">Signature durable · 6h et plus</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ─── CHARACTERISTICS: Intensity + Longevity ─── */}
            {(intensity || longevity || product.concentration) && (
              <div className="pd-section">
                <p className="pd-section-lbl">Caractéristiques</p>
                <div className="pd-chars">

                  {intensity && (
                    <div className="pd-char-card coral">
                      <span className="pd-char-icon">💨</span>
                      <div className="pd-char-label">Intensité olfactive</div>
                      <div className="pd-char-val">{intensity} / 5</div>
                      <IntensityDots value={intensity} />
                      <AnimBar pct={(intensity / 5) * 100} />
                    </div>
                  )}

                  {longevity && (
                    <div className="pd-char-card gold">
                      <span className="pd-char-icon">⏱</span>
                      <div className="pd-char-label">Longévité</div>
                      <div className="pd-char-val">{longevity}</div>
                      <div className="pd-char-sub">Tenue sur la peau</div>
                      <AnimBar pct={longevPct} gold />
                      <div className="pd-longevity-scale">
                        <span className="pd-longevity-tick">2h</span>
                        <span className="pd-longevity-tick">6h</span>
                        <span className="pd-longevity-tick">12h</span>
                      </div>
                    </div>
                  )}

                  {product.concentration && (
                    <div className="pd-char-card teal">
                      <span className="pd-char-icon">⚗️</span>
                      <div className="pd-char-label">Concentration</div>
                      <div className="pd-char-val" style={{ fontSize:".78rem", lineHeight:1.3 }}>{product.concentration}</div>
                      <div className="pd-char-sub">Type de formulation</div>
                    </div>
                  )}

                  {product.size && (
                    <div className="pd-char-card purple">
                      <span className="pd-char-icon">📦</span>
                      <div className="pd-char-label">Format</div>
                      <div className="pd-char-val">{product.size}</div>
                      <div className="pd-char-sub">Contenance du flacon</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── SIZE SELECTOR ─── */}
            <div className="pd-section">
              <p className="pd-section-lbl">Contenance</p>
              <div className="pd-sizes">
                {SIZES_OPTS.map((sz, i) => (
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
                    {i === 1 && (
                      <span className="pd-size-save">Économisez {fmt(Math.round(basePrice * 3 * 0.15))} MAD</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── BUY ROW ─── */}
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
                  {product.stock === 0  ? "Épuisé"
                   : added             ? <>✓ Ajouté au panier !</>
                   : <><FiShoppingBag size={15} />Ajouter — {fmt(currentPrice * quantity)} MAD</>}
                </span>
                <span className="pd-add-shine" />
              </button>
            </div>

            {/* WhatsApp */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="pd-wa-btn">
              <span className="pd-wa-icon">💬</span>
              Commander via WhatsApp
              <FiPhone size={14} />
            </a>

            {/* ─── DELIVERY PERKS ─── */}
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

            {/* ─── ACCORDIONS: Description / Ingredients / Raw notes ─── */}
            {(product.description || product.ingredients) && (
              <div className="pd-section">
                <p className="pd-section-lbl">Détails du produit</p>
                <div className="pd-acc-list">
                  {product.description && (
                    <AccordionItem emoji="📖" label="Description complète" defaultOpen={!hasPyramid}>
                      <p style={{ fontFamily:"var(--sans)", fontSize:".82rem", lineHeight:"1.85", color:"var(--muted)" }}>
                        {product.description}
                      </p>
                    </AccordionItem>
                  )}
                  {product.ingredients && (
                    <AccordionItem emoji="🧪" label="Ingrédients (INCI)">
                      <p style={{ fontFamily:"var(--sans)", fontSize:".76rem", lineHeight:"1.85", color:"var(--muted)", wordBreak:"break-word" }}>
                        {product.ingredients}
                      </p>
                    </AccordionItem>
                  )}
                  <AccordionItem emoji="🚚" label="Livraison & Retours">
                    <p style={{ fontFamily:"var(--sans)", fontSize:".8rem", lineHeight:"1.82", color:"var(--muted)" }}>
                      Livraison gratuite dès 160 DH · Délai 24–72h selon votre ville · Paiement à la livraison (COD) · Plus de 300 villes au Maroc.
                    </p>
                  </AccordionItem>
                </div>
              </div>
            )}

          </div>{/* end details-col */}
        </div>{/* end pd-grid */}

        {/* ══════════════════════════════════════
            FAQ SECTION
            ══════════════════════════════════════ */}
        <div className="pd-faq-section container">
          <div className="pd-faq-header">
            <div className="pd-faq-eyebrow">Questions fréquentes</div>
            <h2 className="pd-faq-title">
              Tout ce que vous <em>devez savoir</em>
            </h2>
          </div>

          <div className="pd-faq-grid">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`pd-faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="pd-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="pd-faq-q-num">{i + 1}</span>
                  <span className="pd-faq-q-text">{item.q}</span>
                  <FiChevronDown size={15} className="pd-faq-chevron" />
                </button>
                {openFaq === i && <div className="pd-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>

          <div className="pd-contact-bar">
            <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" className="pd-contact-pill pd-contact-wa">
              💬 WhatsApp : +212 636 572 200
            </a>
            <a href="https://instagram.com/nahid.perfumes" target="_blank" rel="noopener noreferrer" className="pd-contact-pill pd-contact-ig">
              📸 Instagram : @nahid.perfumes
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════
            STICKY BAR
            ══════════════════════════════════════ */}
        <div className={`pd-sticky${showSticky ? " pd-sticky-visible" : ""}`}>
          <div className="pd-sticky-content">
            <div className="pd-sticky-info">
              <p className="pd-sticky-name">{product.name}</p>
              <p className="pd-sticky-price">{fmt(currentPrice)} MAD · {SIZES_OPTS[selectedSize].label}</p>
            </div>
            <div className="pd-sticky-btns">
              <button
                className={`pd-sticky-btn${added ? " pd-sticky-added" : ""}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {added ? "✓ Ajouté !" : "Ajouter au panier"}
              </button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="pd-sticky-wa">
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