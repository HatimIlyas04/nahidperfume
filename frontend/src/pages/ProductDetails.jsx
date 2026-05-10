import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiChevronLeft, FiShoppingBag, FiStar, FiChevronDown, FiPhone, FiHeart, FiShare2, FiCheck } from "react-icons/fi";
import NahidFooter from "../components/NahidFooter";

/* ══════════════════════════════════════════════════════════
   STATIC CONFIG
══════════════════════════════════════════════════════════ */
const SIZES_OPTS = [
  { label: "30 ml",          price_mult: 1.00, tag: null,   desc: "Format standard" },
  { label: "Coffret 3×30ml", price_mult: 2.55, tag: "−15%", desc: "Meilleure valeur" },
];

const GENDER_CFG = {
  Femme:  { bg: "#FDF0F3", accent: "#C9748A", light: "#FCE4EB", emoji: "🌸" },
  Homme:  { bg: "#F2EDE4", accent: "#7A6443", light: "#EDE5D4", emoji: "🪵" },
  Unisex: { bg: "#EBF2EE", accent: "#4A7A62", light: "#D6EBE0", emoji: "✦" },
};

const FAMILY_MAP = {
  flowery: { label: "Fleuri",   icon: "🌸", bg: "#FDF0F3", color: "#9D3B5B" },
  fresh:   { label: "Frais",    icon: "🍃", bg: "#EDFBF2", color: "#1A6B40" },
  gourmand:{ label: "Gourmand", icon: "🍫", bg: "#FEF8EE", color: "#92400E" },
  herbal:  { label: "Herbal",   icon: "🌿", bg: "#EDFBF2", color: "#1A5C35" },
  earthy:  { label: "Terreux",  icon: "🌍", bg: "#FEF8EE", color: "#78350F" },
  warm:    { label: "Chaud",    icon: "🔥", bg: "#FFF0F0", color: "#991B1B" },
};

const WHATSAPP_NUM = "212636572200";

const DELIVERY = [
  { icon: "🚚", title: "Livraison gratuite dès 160 DH",  sub: "4 parfums ou 2 Originals" },
  { icon: "⏱️", title: "24 à 72 heures",                  sub: "Délai de livraison Maroc" },
  { icon: "💵", title: "Paiement à la livraison",         sub: "Payez en cash à la réception" },
  { icon: "🔄", title: "Retours acceptés",                sub: "Dans les 7 jours" },
];

const FAQ = [
  { q: "Comment passer commande ?",          a: "Via WhatsApp ou panier · Nous confirmons sous 24h." },
  { q: "Livraison partout au Maroc ?",        a: "Oui, 300+ villes · 24–72h selon votre région." },
  { q: "La livraison est-elle gratuite ?",    a: "Oui dès 160 DH (4 parfums ou 2 Originals)." },
  { q: "Moyen de paiement ?",                a: "Paiement à la livraison (COD) uniquement." },
  { q: "Les parfums tiennent combien ?",      a: "6–8h en moyenne selon la formulation choisie." },
  { q: "Puis-je combiner des parfums ?",      a: "Oui, vous choisissez librement dans votre pack." },
];

function pct(val) {
  if (!val) return 0;
  if (val.includes("12") || val.includes("+")) return 100;
  if (val.includes("8")) return 80;
  if (val.includes("6")) return 62;
  if (val.includes("4")) return 44;
  return 28;
}

/* ══════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

/* ── tokens ── */
.lp {
  --c:     #EF776A;
  --cd:    #C8503F;
  --cl:    #FFF4F2;
  --cll:   #FFF8F7;
  --gold:  #C9A96E;
  --goldd: #A8883E;
  --goldl: #F5E9D0;
  --ink:   #0D0D0B;
  --ink2:  #3A3835;
  --cream: #FAF8F5;
  --sand:  #EDE9E1;
  --mu:    #7A7770;
  --mu2:   #B0ACA5;
  --w:     #FFFFFF;
  --bd:    rgba(13,13,11,.07);
  --bd2:   rgba(13,13,11,.13);
  --S:     'Cormorant Garamond', Georgia, serif;
  --F:     'DM Sans', sans-serif;
  --sp:    cubic-bezier(.34,1.56,.64,1);
  --ex:    cubic-bezier(.16,1,.3,1);
  --ea:    cubic-bezier(.25,.46,.45,.94);
}

/* ── reset ── */
.lp *, .lp *::before, .lp *::after { box-sizing:border-box; margin:0; padding:0; }
.lp { font-family:var(--F); background:var(--cream); -webkit-font-smoothing:antialiased; color:var(--ink); overflow-x:hidden; min-height:100vh; padding-top:clamp(80px,10vh,100px); }
.lp-wrap { max-width:1320px; margin:0 auto; padding:0 clamp(16px,4vw,52px); }

/* ── animations ── */
@keyframes lpFadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }
@keyframes lpFadeL   { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:none} }
@keyframes lpSpin    { to{transform:rotate(360deg)} }
@keyframes lpShine   { from{left:-80%} to{left:140%} }
@keyframes lpPulse   { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.8;transform:scale(1.06)} }
@keyframes lpPop     { from{opacity:0;transform:scale(0) rotate(-8deg)} to{opacity:1;transform:none} }
@keyframes lpWa      { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} 55%{box-shadow:0 0 0 10px rgba(37,211,102,.15)} }
@keyframes lpBar     { from{width:0} to{width:var(--w,100%)} }
@keyframes lpAccIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
@keyframes lpDot     { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
@keyframes lpImgIn   { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:none} }
@keyframes lpRelIn   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
@keyframes lpThumbIn { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:none} }

/* ── back button ── */
.lp-back {
  display:inline-flex; align-items:center; gap:7px;
  background:var(--w); border:1px solid var(--bd);
  color:var(--mu); font-family:var(--F); font-size:.7rem; font-weight:600;
  letter-spacing:.07em; text-transform:uppercase;
  padding:9px 18px 9px 12px; border-radius:999px; cursor:pointer;
  margin:0 clamp(16px,4vw,52px) 28px;
  transition:color .2s, border-color .2s, transform .22s var(--sp);
  box-shadow:0 2px 12px rgba(13,13,11,.05);
}
.lp-back:hover { color:var(--ink); border-color:var(--bd2); transform:translateY(-1px); }

/* ambient glow */
.lp-ambient {
  position:fixed; inset:0; pointer-events:none; z-index:0;
  background:radial-gradient(ellipse 56% 52% at 80% 18%, var(--lp-amb,#FDF0F3) 0%, transparent 70%);
  opacity:.3; transition:background 1s var(--ea);
}

/* ══════════════════════════════════════
   HERO GRID — 2 cols
══════════════════════════════════════ */
.lp-hero {
  display:grid;
  grid-template-columns:54% 1fr;
  gap:clamp(28px,5vw,72px);
  align-items:start;
  position:relative; z-index:1;
  margin-bottom:clamp(64px,9vw,96px);
}

/* ══════════════════════════════════════
   IMAGE GALLERY — 1 large + 2×2 grid
══════════════════════════════════════ */
.lp-gallery { position:sticky; top:clamp(80px,10vh,96px); }

/* Main image */
.lp-main-img-wrap {
  position:relative; border-radius:24px; overflow:hidden;
  aspect-ratio:3/4;
  background:linear-gradient(145deg,#F6F2EC,#EDE8E0);
  box-shadow:0 6px 16px rgba(0,0,0,.05), 0 28px 72px rgba(0,0,0,.11), inset 0 1px 0 rgba(255,255,255,.75);
  margin-bottom:12px;
}

/* pulsing ring */
.lp-ring {
  position:absolute; border-radius:50%; pointer-events:none;
  border:1px solid rgba(239,119,106,.13);
  animation:lpPulse 5.5s ease-in-out infinite;
}
.lp-ring-a { width:72%; height:72%; top:-12%; right:-16%; }
.lp-ring-b { width:52%; height:52%; bottom:-10%; left:-8%; animation-delay:2.5s; }

/* badges */
.lp-badge {
  position:absolute; z-index:3; border-radius:999px;
  font-family:var(--F); font-size:.6rem; font-weight:800;
  letter-spacing:.1em; text-transform:uppercase;
  padding:6px 14px; animation:lpPop .42s var(--sp) both;
}
.lp-badge-stock { top:16px; left:16px; background:var(--w); color:var(--c); box-shadow:0 3px 16px rgba(239,119,106,.22); }
.lp-badge-orig  { top:16px; right:16px; background:linear-gradient(135deg,var(--c),var(--cd)); color:var(--w); box-shadow:0 4px 16px rgba(239,119,106,.38); }
.lp-badge-new   { bottom:16px; left:16px; background:rgba(255,255,255,.92); backdrop-filter:blur(10px); color:var(--c); border:1px solid rgba(239,119,106,.2); animation-delay:.1s; }
.lp-badge-bs    { bottom:16px; right:16px; background:linear-gradient(135deg,var(--gold),var(--goldd)); color:var(--w); box-shadow:0 3px 14px rgba(200,168,106,.38); animation-delay:.15s; }

/* main image */
.lp-main-img {
  width:100%; height:100%; object-fit:cover; display:block;
  opacity:0; transform:scale(1.04);
  transition:transform .7s var(--ea);
}
.lp-main-img.loaded { animation:lpImgIn .35s ease both; }
.lp-main-img-wrap:hover .lp-main-img.loaded { transform:scale(1.04); }
.lp-img-halo {
  position:absolute; inset:0; pointer-events:none;
  mix-blend-mode:multiply; opacity:.45;
}

/* ── THUMBNAILS — 2×2 grid ── */
.lp-thumbs {
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:1fr 1fr;
  gap:10px;
}
.lp-thumb {
  position:relative; border-radius:16px; overflow:hidden; cursor:pointer;
  border:2px solid transparent;
  background:linear-gradient(145deg,#F6F2EC,#EDE8E0);
  aspect-ratio:3/4;
  transition:border-color .22s, transform .28s var(--sp), box-shadow .28s;
  animation:lpThumbIn .45s var(--ex) both;
}
.lp-thumb img { width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; transition:transform .5s var(--ea); }
.lp-thumb:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,.12); }
.lp-thumb:hover img { transform:scale(1.07); }
.lp-thumb-on {
  border-color:var(--c);
  box-shadow:0 0 0 3px rgba(239,119,106,.18), 0 10px 28px rgba(239,119,106,.2);
}
.lp-thumb-on::after {
  content:''; position:absolute; inset:0; border-radius:14px;
  background:linear-gradient(to bottom,transparent 60%,rgba(239,119,106,.22) 100%);
}

/* ── Rating + spec strips ── */
.lp-info-strip {
  display:flex; align-items:center; gap:8px; margin-top:14px;
  padding:12px 16px; background:var(--w); border-radius:14px;
  border:1px solid var(--bd); box-shadow:0 2px 12px rgba(0,0,0,.04);
  flex-wrap:wrap;
}
.lp-stars { display:flex; gap:2px; flex-shrink:0; }
.lp-strip-txt { font-size:.7rem; font-weight:500; color:var(--mu); }
.lp-strip-sep { color:var(--bd2); font-size:.7rem; }

.lp-spec-strip {
  display:grid; grid-template-columns:repeat(4,1fr);
  gap:0; margin-top:10px;
  background:var(--w); border:1px solid var(--bd); border-radius:14px; overflow:hidden;
}
.lp-spec-item {
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:13px 6px; gap:3px; border-right:1px solid var(--bd);
  transition:background .18s; cursor:default;
}
.lp-spec-item:last-child { border-right:none; }
.lp-spec-item:hover { background:var(--cll); }
.lp-spec-ico { font-size:1rem; line-height:1; }
.lp-spec-val { font-size:.66rem; font-weight:800; color:var(--ink); text-align:center; line-height:1.2; }
.lp-spec-lbl { font-size:.5rem; font-weight:700; color:var(--mu2); letter-spacing:.1em; text-transform:uppercase; }

/* ══════════════════════════════════════
   DETAILS COLUMN
══════════════════════════════════════ */
.lp-info { opacity:0; animation:lpFadeL .9s var(--ex) .16s both; }

/* chips */
.lp-chips { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px; }
.lp-chip {
  display:inline-flex; align-items:center; gap:5px;
  padding:5px 13px; border-radius:999px;
  font-family:var(--F); font-size:.57rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
}
.lp-chip-c  { background:var(--cl); color:var(--cd); }
.lp-chip-b  { background:#EFF6FF; color:#1D4ED8; }
.lp-chip-g  { background:var(--goldl); color:var(--goldd); }
.lp-chip-o  { background:linear-gradient(135deg,var(--c),var(--cd)); color:var(--w); box-shadow:0 3px 10px rgba(239,119,106,.28); }
.lp-chip-p  { background:#F3EFFF; border:1px solid #C9B8FF; color:#6E3ADA; }
.lp-chip-t  { background:#F0F4FF; border:1px solid #C7D7FF; color:#3B5BDB; }

/* name */
.lp-name {
  font-family:var(--S);
  font-size:clamp(2rem,5vw,3.4rem);
  font-weight:400; color:var(--ink); line-height:.96;
  letter-spacing:-.02em; margin-bottom:6px;
}
.lp-name-type {
  font-family:var(--F); font-size:.64rem; font-weight:700;
  letter-spacing:.22em; text-transform:uppercase; color:var(--mu);
  margin-bottom:16px; display:block;
}

/* price row */
.lp-price-row { display:flex; align-items:baseline; gap:12px; margin-bottom:6px; }
.lp-price {
  font-family:var(--S); font-size:clamp(2rem,4vw,2.8rem);
  font-weight:400; color:var(--c); letter-spacing:-.02em; line-height:1;
}
.lp-price-unit { font-family:var(--F); font-size:.72rem; font-weight:600; color:var(--mu); }
.lp-price-sub { font-size:.68rem; color:var(--mu); margin-bottom:20px; }

/* tagline */
.lp-tagline {
  font-family:var(--S); font-size:1.08rem; font-weight:300; font-style:italic;
  color:var(--ink2); line-height:1.78;
  padding:14px 18px; background:var(--cll);
  border-left:2.5px solid var(--c); border-radius:0 14px 14px 0;
  margin-bottom:22px;
}

/* divider */
.lp-divider { height:1px; background:linear-gradient(90deg,var(--bd),transparent); margin:20px 0; }

/* section label */
.lp-sec {
  font-size:.56rem; font-weight:800; letter-spacing:.22em; text-transform:uppercase;
  color:var(--mu); margin-bottom:12px;
  display:flex; align-items:center; gap:9px;
}
.lp-sec::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,var(--bd),transparent); }

/* ══ INSPIRED-BY ══ */
.lp-insp {
  border-radius:18px; overflow:hidden;
  border:1px solid rgba(200,168,106,.28);
  background:linear-gradient(135deg,#FAF5E9,#FFF9F0);
  margin-bottom:20px;
}
.lp-insp-hd {
  padding:12px 18px; border-bottom:1px solid rgba(200,168,106,.18);
  display:flex; align-items:center; gap:8px;
  background:rgba(200,168,106,.06);
}
.lp-insp-tag { font-size:.52rem; font-weight:800; letter-spacing:.2em; text-transform:uppercase; color:var(--goldd); display:flex; align-items:center; gap:7px; }
.lp-insp-tag::before { content:''; width:14px; height:1px; background:var(--goldd); }
.lp-insp-body { padding:16px 20px; display:flex; gap:13px; align-items:flex-start; }
.lp-insp-ico  { font-size:2rem; line-height:1; flex-shrink:0; }
.lp-insp-txt  { font-family:var(--S); font-size:1.22rem; font-weight:400; color:var(--ink); line-height:1.5; }
.lp-insp-txt em { font-style:italic; color:var(--goldd); }
.lp-insp-sub  { font-size:.66rem; color:var(--mu); margin-top:6px; line-height:1.65; }
.lp-insp-pill { display:inline-flex; align-items:center; gap:5px; margin-top:8px; padding:5px 12px; border-radius:999px; background:rgba(200,168,106,.14); border:1px solid rgba(200,168,106,.28); font-size:.58rem; font-weight:700; color:var(--goldd); }

/* ══ PYRAMID ══ */
.lp-pyr {
  background:white; border:1px solid var(--bd); border-radius:20px; overflow:hidden;
  box-shadow:0 4px 20px rgba(13,13,11,.04); margin-bottom:20px;
}
.lp-pyr-hd {
  padding:16px 20px 12px; border-bottom:1px solid var(--bd);
  display:flex; align-items:center; gap:11px;
}
.lp-pyr-badge { width:34px; height:34px; border-radius:11px; flex-shrink:0; background:linear-gradient(135deg,var(--cl),var(--goldl)); display:flex; align-items:center; justify-content:center; font-size:.95rem; }
.lp-pyr-title { font-size:.8rem; font-weight:800; color:var(--ink); }
.lp-pyr-sub   { font-size:.62rem; font-weight:500; color:var(--mu); margin-top:1px; }
.lp-pyr-body  { padding:12px; display:flex; flex-direction:column; gap:3px; }
.lp-pyr-row   { display:flex; align-items:stretch; border-radius:13px; overflow:hidden; transition:transform .24s var(--sp),box-shadow .24s; }
.lp-pyr-row:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(13,13,11,.07); }
.lp-pyr-bar   { width:5px; flex-shrink:0; }
.lp-pyr-t .lp-pyr-bar { background:linear-gradient(180deg,#6BAA6B,#A8D5A8); }
.lp-pyr-c .lp-pyr-bar { background:linear-gradient(180deg,var(--c),#F4A0A0); }
.lp-pyr-f .lp-pyr-bar { background:linear-gradient(180deg,var(--gold),#E9D6A9); }
.lp-pyr-inner {
  flex:1; display:flex; align-items:center; gap:12px;
  padding:14px 16px; background:var(--cream);
  border:1px solid var(--bd); border-left:none;
  border-radius:0 11px 11px 0;
}
.lp-pyr-row:first-child .lp-pyr-inner { border-radius:0 11px 0 0; }
.lp-pyr-row:last-child  .lp-pyr-inner { border-radius:0 0 11px 0; }
.lp-pyr-icon { width:36px; height:36px; border-radius:11px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1.1rem; }
.lp-pyr-t .lp-pyr-icon { background:rgba(107,170,107,.1); }
.lp-pyr-c .lp-pyr-icon { background:var(--cl); }
.lp-pyr-f .lp-pyr-icon { background:var(--goldl); }
.lp-pyr-lbl { font-size:.51rem; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:var(--mu); margin-bottom:3px; }
.lp-pyr-val { font-size:.78rem; font-weight:600; color:var(--ink); line-height:1.42; }
.lp-pyr-hint{ font-size:.59rem; color:var(--mu); margin-top:2px; font-style:italic; }

/* ══ CHARS ══ */
.lp-chars { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px; }
.lp-char {
  background:var(--w); border:1px solid var(--bd); border-radius:16px; padding:17px 16px 15px;
  position:relative; overflow:hidden;
  transition:transform .24s var(--sp), box-shadow .24s;
}
.lp-char::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:3px 3px 0 0; }
.lp-char.cl::before  { background:linear-gradient(90deg,var(--c),var(--cd)); }
.lp-char.go::before  { background:linear-gradient(90deg,var(--gold),var(--goldd)); }
.lp-char.te::before  { background:linear-gradient(90deg,#0EA5E9,#0284C7); }
.lp-char.pu::before  { background:linear-gradient(90deg,#A855F7,#7C3AED); }
.lp-char:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(13,13,11,.08); }
.lp-char-ico { font-size:1.35rem; margin-bottom:9px; display:block; }
.lp-char-lbl { font-size:.53rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:var(--mu); margin-bottom:5px; }
.lp-char-val { font-size:.88rem; font-weight:800; color:var(--ink); line-height:1.2; }
.lp-char-sub { font-size:.6rem; color:var(--mu); margin-top:3px; }

/* dots */
.lp-dots { display:flex; gap:5px; margin-top:8px; }
.lp-dot  { width:8px; height:8px; border-radius:50%; background:var(--sand); }
.lp-dot.on { background:var(--c); animation:lpDot .4s var(--sp) both; }

/* bar */
.lp-bar-track { height:5px; border-radius:999px; background:var(--sand); overflow:hidden; margin-top:8px; }
.lp-bar-fill  { height:100%; border-radius:999px; background:linear-gradient(90deg,var(--c),var(--cd)); animation:lpBar 1.2s var(--ex) .3s both; }
.lp-bar-fill.gol { background:linear-gradient(90deg,var(--gold),var(--goldd)); }
.lp-lon-scale { display:flex; justify-content:space-between; margin-top:4px; }
.lp-lon-tick  { font-size:.48rem; font-weight:600; color:var(--mu2); }

/* ══ SIZES ══ */
.lp-sizes { display:flex; flex-direction:column; gap:9px; margin-bottom:20px; }
.lp-size {
  display:flex; align-items:center; gap:11px; padding:15px 18px;
  border-radius:16px; border:1.5px solid var(--bd); background:var(--w);
  cursor:pointer; font-family:var(--F);
  transition:all .26s var(--ea);
  box-shadow:0 2px 8px rgba(13,13,11,.03);
}
.lp-size.on {
  border-color:var(--c); background:var(--cl);
  box-shadow:0 0 0 3px rgba(239,119,106,.1), 0 6px 22px rgba(239,119,106,.12);
}
.lp-size:hover:not(.on) { border-color:rgba(13,13,11,.18); transform:translateY(-2px); box-shadow:0 8px 24px rgba(13,13,11,.06); }
.lp-size-badge { font-size:.56rem; font-weight:800; letter-spacing:.07em; text-transform:uppercase; padding:3px 9px; border-radius:999px; background:var(--sand); color:var(--mu); transition:all .2s; flex-shrink:0; }
.lp-size.on .lp-size-badge { background:var(--c); color:var(--w); }
.lp-size-label { flex:1; font-weight:700; font-size:.84rem; color:var(--ink); }
.lp-size-desc  { font-size:.62rem; color:var(--mu); margin-top:1px; }
.lp-size-price { font-family:var(--S); font-size:1.38rem; font-weight:400; color:var(--ink); text-align:right; }
.lp-size.on .lp-size-price { color:var(--c); }
.lp-size-save  { font-size:.6rem; color:#2E7D32; font-weight:700; }

/* ══ BUY ROW ══ */
.lp-buy { display:flex; gap:10px; align-items:center; margin-bottom:14px; }
.lp-qty { display:flex; align-items:center; border:1.5px solid var(--bd); border-radius:999px; background:var(--w); overflow:hidden; flex-shrink:0; }
.lp-qty-btn { width:44px; height:52px; background:none; border:none; font-size:1.2rem; color:var(--ink); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s; }
.lp-qty-btn:hover { background:var(--cl); }
.lp-qty-n { min-width:40px; text-align:center; font-weight:800; font-size:.9rem; line-height:52px; border-left:1px solid var(--bd); border-right:1px solid var(--bd); color:var(--ink); }

.lp-add {
  flex:1; height:52px; border:none; border-radius:999px;
  background:linear-gradient(135deg,var(--c),var(--cd)); color:var(--w);
  font-family:var(--F); font-size:.76rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase;
  position:relative; overflow:hidden; cursor:pointer;
  transition:transform .2s var(--sp), box-shadow .2s;
  box-shadow:0 6px 28px rgba(239,119,106,.38);
}
.lp-add-in { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:8px; height:100%; }
.lp-add-shine { position:absolute; top:0; left:-80%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.24),transparent); transform:skewX(-20deg); pointer-events:none; }
.lp-add:hover:not(:disabled) { transform:translateY(-3px) scale(1.008); box-shadow:0 14px 40px rgba(239,119,106,.48); }
.lp-add:hover .lp-add-shine { animation:lpShine .65s ease forwards; }
.lp-add:active:not(:disabled) { transform:scale(.98); }
.lp-add-done { background:linear-gradient(135deg,#1B5E20,#2E7D32)!important; box-shadow:0 6px 28px rgba(46,125,50,.38)!important; }
.lp-add-oos  { background:rgba(13,13,11,.1)!important; box-shadow:none!important; cursor:not-allowed!important; }

/* action row: wish + share */
.lp-actions { display:flex; gap:8px; margin-bottom:14px; }
.lp-action-btn {
  display:flex; align-items:center; gap:7px; padding:0 16px; height:42px;
  border:1.5px solid var(--bd); border-radius:999px; background:var(--w);
  font-family:var(--F); font-size:.7rem; font-weight:600; color:var(--mu);
  cursor:pointer; transition:all .2s var(--sp); flex:1; justify-content:center;
}
.lp-action-btn:hover { border-color:var(--c); color:var(--c); transform:translateY(-1px); }
.lp-action-btn.wished { background:var(--cl); border-color:var(--c); color:var(--c); }

/* WhatsApp */
.lp-wa {
  display:flex; align-items:center; justify-content:center; gap:9px;
  width:100%; height:50px; border:none; border-radius:999px;
  background:linear-gradient(135deg,#25D366,#1DA851); color:var(--w);
  font-family:var(--F); font-size:.76rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase;
  cursor:pointer; text-decoration:none;
  transition:transform .2s var(--sp), box-shadow .2s;
  box-shadow:0 6px 26px rgba(37,211,102,.3);
  animation:lpWa 3.5s ease infinite; margin-bottom:16px;
}
.lp-wa:hover { transform:translateY(-3px) scale(1.008); box-shadow:0 14px 38px rgba(37,211,102,.46); }

/* Delivery grid */
.lp-dlv { display:grid; grid-template-columns:1fr 1fr; gap:9px; margin-bottom:20px; }
.lp-dlv-card {
  display:flex; align-items:flex-start; gap:10px; padding:13px;
  background:var(--w); border:1px solid var(--bd); border-radius:14px;
  transition:transform .24s var(--sp), box-shadow .24s;
}
.lp-dlv-card:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(13,13,11,.07); }
.lp-dlv-ico { width:34px; height:34px; border-radius:11px; flex-shrink:0; background:var(--cl); display:flex; align-items:center; justify-content:center; font-size:.95rem; }
.lp-dlv-title { font-size:.7rem; font-weight:800; color:var(--ink); margin-bottom:1px; }
.lp-dlv-sub   { font-size:.6rem; font-weight:500; color:var(--mu); line-height:1.4; }

/* Accordion */
.lp-acc-list { display:flex; flex-direction:column; gap:7px; }
.lp-acc-item { border:1px solid var(--bd); border-radius:14px; overflow:hidden; background:var(--w); transition:border-color .2s, box-shadow .2s; }
.lp-acc-item.on { border-color:var(--c); box-shadow:0 4px 18px rgba(239,119,106,.1); }
.lp-acc-q {
  width:100%; display:flex; align-items:center; justify-content:space-between;
  padding:14px 18px; background:none; border:none; cursor:pointer;
  font-family:var(--F); font-size:.78rem; font-weight:700; color:var(--ink);
  transition:background .18s; text-align:left;
}
.lp-acc-item.on .lp-acc-q { color:var(--c); }
.lp-acc-q:hover { background:var(--cream); }
.lp-acc-ql  { display:flex; align-items:center; gap:9px; flex:1; }
.lp-acc-em  { font-size:.95rem; flex-shrink:0; }
.lp-acc-arr { flex-shrink:0; color:var(--mu); transition:transform .3s var(--ex), color .2s; }
.lp-acc-item.on .lp-acc-arr { transform:rotate(180deg); color:var(--c); }
.lp-acc-body { padding:0 18px 16px; font-size:.77rem; color:var(--mu); line-height:1.82; animation:lpAccIn .28s var(--ea) both; }

/* ══════════════════════════════════════
   FAQ SECTION — Compact & Elegant
══════════════════════════════════════ */
.lp-faq {
  position:relative; z-index:1;
  border-top:1px solid var(--bd);
  padding:clamp(40px,6vw,64px) 0;
  background:var(--w);
}
.lp-faq-hd {
  display:flex; align-items:flex-end; justify-content:space-between;
  margin-bottom:clamp(24px,4vw,36px); flex-wrap:wrap; gap:14px;
}
.lp-faq-left {}
.lp-faq-ey {
  display:inline-flex; align-items:center; gap:8px;
  font-size:.56rem; font-weight:800; letter-spacing:.28em; text-transform:uppercase;
  color:var(--c); margin-bottom:8px;
}
.lp-faq-ey::before { content:''; width:18px; height:1px; background:var(--c); }
.lp-faq-title {
  font-family:var(--S); font-size:clamp(1.5rem,3vw,2.1rem);
  font-weight:400; color:var(--ink); letter-spacing:-.02em; line-height:1.05;
}
.lp-faq-title em { font-style:italic; font-weight:300; color:var(--c); }

/* Compact 2-column accordion grid */
.lp-faq-grid {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
}
.lp-faq-item {
  border:1px solid var(--bd); border-radius:14px; overflow:hidden; background:var(--cream);
  transition:border-color .2s, box-shadow .2s;
}
.lp-faq-item.on { border-color:var(--c); background:var(--w); box-shadow:0 4px 16px rgba(239,119,106,.09); }
.lp-faq-q {
  width:100%; display:flex; align-items:center; justify-content:space-between;
  gap:10px; padding:13px 16px;
  background:none; border:none; cursor:pointer;
  font-family:var(--F); font-size:.76rem; font-weight:700; color:var(--ink);
  text-align:left; transition:color .18s;
}
.lp-faq-item.on .lp-faq-q { color:var(--c); }
.lp-faq-num {
  width:22px; height:22px; border-radius:50%; flex-shrink:0;
  background:var(--sand); border:1px solid var(--bd);
  display:flex; align-items:center; justify-content:center;
  font-size:.55rem; font-weight:800; color:var(--mu);
  transition:all .2s;
}
.lp-faq-item.on .lp-faq-num { background:var(--c); color:var(--w); border-color:var(--c); }
.lp-faq-qtext { flex:1; font-size:.74rem; }
.lp-faq-chev  { flex-shrink:0; color:var(--mu); transition:transform .3s var(--sp), color .2s; }
.lp-faq-item.on .lp-faq-chev { transform:rotate(180deg); color:var(--c); }
.lp-faq-a {
  padding:0 16px 13px; border-top:1px solid var(--bd); padding-top:10px;
  font-size:.74rem; color:var(--mu); line-height:1.72;
  animation:lpAccIn .28s var(--ea) both;
}

/* Contact row under FAQ */
.lp-faq-contact { display:flex; gap:10px; margin-top:20px; flex-wrap:wrap; }
.lp-cnt-pill {
  display:inline-flex; align-items:center; gap:7px; padding:11px 22px; border-radius:999px;
  font-family:var(--F); font-size:.7rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  text-decoration:none; cursor:pointer; border:none;
  transition:transform .2s var(--sp), box-shadow .2s;
}
.lp-cnt-wa { background:linear-gradient(135deg,#25D366,#1DA851); color:var(--w); box-shadow:0 4px 16px rgba(37,211,102,.3); }
.lp-cnt-wa:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(37,211,102,.44); }
.lp-cnt-ig { background:linear-gradient(135deg,#E1306C,#833AB4); color:var(--w); box-shadow:0 4px 16px rgba(225,48,108,.28); }
.lp-cnt-ig:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(225,48,108,.42); }

/* ══════════════════════════════════════
   RELATED PRODUCTS
══════════════════════════════════════ */
.lp-related { border-top:1px solid var(--bd); padding:clamp(56px,8vw,88px) 0; position:relative; z-index:1; background:var(--cream); }
.lp-rel-hd { text-align:center; margin-bottom:clamp(32px,5vw,48px); }
.lp-rel-ey {
  display:inline-flex; align-items:center; gap:9px;
  font-size:.56rem; font-weight:800; letter-spacing:.28em; text-transform:uppercase; color:var(--c); margin-bottom:10px;
}
.lp-rel-ey::before, .lp-rel-ey::after { content:''; width:18px; height:1px; background:var(--c); }
.lp-rel-title { font-family:var(--S); font-size:clamp(1.5rem,3.5vw,2.4rem); font-weight:400; color:var(--ink); letter-spacing:-.02em; }
.lp-rel-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(10px,2vw,20px); }
.lp-rel-card {
  background:var(--w); border:1px solid var(--bd); border-radius:20px; overflow:hidden;
  cursor:pointer; text-decoration:none; display:flex; flex-direction:column;
  transition:transform .3s var(--sp), box-shadow .3s;
  animation:lpRelIn .5s var(--ex) both;
}
.lp-rel-card:hover { transform:translateY(-7px); box-shadow:0 20px 56px rgba(13,13,11,.1); }
.lp-rel-img-wrap { aspect-ratio:3/4; overflow:hidden; background:linear-gradient(145deg,#F6F2EC,#EDE8E0); position:relative; }
.lp-rel-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s var(--ea); }
.lp-rel-card:hover .lp-rel-img { transform:scale(1.07); }
.lp-rel-bdg { position:absolute; top:10px; left:10px; background:var(--w); color:var(--c); font-family:var(--F); font-size:.54rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; padding:4px 10px; border-radius:999px; box-shadow:0 2px 10px rgba(239,119,106,.2); }
.lp-rel-info { padding:14px 15px 17px; flex:1; display:flex; flex-direction:column; }
.lp-rel-cat  { font-size:.53rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--mu2); margin-bottom:4px; }
.lp-rel-name { font-family:var(--S); font-size:1.06rem; font-weight:400; color:var(--ink); line-height:1.22; letter-spacing:-.01em; flex:1; }
.lp-rel-price { font-family:var(--S); font-size:1.2rem; font-weight:400; color:var(--c); margin-top:8px; }
.lp-rel-btn { margin-top:9px; padding:9px; border-radius:12px; border:none; background:var(--cl); color:var(--c); font-family:var(--F); font-size:.66rem; font-weight:700; cursor:pointer; letter-spacing:.04em; text-transform:uppercase; transition:background .18s, color .18s; }
.lp-rel-card:hover .lp-rel-btn { background:var(--c); color:var(--w); }

/* ══ STICKY BAR ══ */
.lp-sticky {
  position:fixed; bottom:0; left:0; right:0; z-index:900;
  background:rgba(250,248,245,.96); backdrop-filter:blur(22px);
  border-top:1px solid var(--bd); box-shadow:0 -8px 40px rgba(13,13,11,.1);
  transform:translateY(100%); opacity:0;
  transition:transform .4s var(--ex), opacity .4s;
}
.lp-sticky.vis { transform:translateY(0)!important; opacity:1!important; }
.lp-sticky-in { max-width:1320px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding:12px clamp(16px,4vw,52px); gap:14px; flex-wrap:wrap; }
.lp-sticky-name  { font-family:var(--F); font-size:.88rem; font-weight:800; color:var(--ink); letter-spacing:-.01em; }
.lp-sticky-price { font-family:var(--S); font-size:1.1rem; font-weight:400; color:var(--c); margin-top:1px; }
.lp-sticky-btns  { display:flex; gap:9px; align-items:center; flex-shrink:0; }
.lp-sticky-add {
  background:linear-gradient(135deg,var(--c),var(--cd)); color:var(--w); border:none; border-radius:999px;
  padding:11px 22px; font-family:var(--F); font-size:.7rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase;
  cursor:pointer; transition:transform .2s var(--sp), box-shadow .2s;
  box-shadow:0 4px 16px rgba(239,119,106,.35); white-space:nowrap;
}
.lp-sticky-add:hover { transform:translateY(-2px); box-shadow:0 8px 26px rgba(239,119,106,.5); }
.lp-sticky-add.done { background:linear-gradient(135deg,#1B5E20,#2E7D32)!important; }
.lp-sticky-wa {
  background:linear-gradient(135deg,#25D366,#1DA851); color:var(--w); border:none; border-radius:999px;
  padding:11px 18px; font-family:var(--F); font-size:.7rem; font-weight:800;
  cursor:pointer; transition:transform .2s var(--sp);
  box-shadow:0 4px 16px rgba(37,211,102,.3);
  display:flex; align-items:center; gap:6px; white-space:nowrap; text-decoration:none;
}
.lp-sticky-wa:hover { transform:translateY(-2px); }

/* Loader */
.lp-loader { min-height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; background:var(--cream); }
.lp-loader-ring { width:44px; height:44px; border:3px solid rgba(13,13,11,.06); border-top-color:var(--c); border-radius:50%; animation:lpSpin .75s linear infinite; }
.lp-loader-txt  { font-size:.7rem; font-weight:600; color:var(--mu); letter-spacing:.14em; text-transform:uppercase; }

/* ══ RESPONSIVE ══ */
@media(max-width:1100px){
  .lp-hero { grid-template-columns:1fr 1fr; gap:clamp(20px,4vw,44px); }
}
@media(max-width:900px){
  .lp-hero { grid-template-columns:1fr; gap:28px; }
  .lp-gallery { position:static; }
  .lp-info { animation:lpFadeUp .85s var(--ex) .1s both; }
  .lp-main-img-wrap { aspect-ratio:3/4; max-height:480px; }
  .lp-thumbs { grid-template-columns:repeat(4,1fr); grid-template-rows:auto; gap:8px; }
  .lp-faq-grid { grid-template-columns:1fr; }
  .lp-rel-grid  { grid-template-columns:repeat(2,1fr); }
}
@media(max-width:640px){
  .lp-dlv { grid-template-columns:1fr; }
  .lp-chars { grid-template-columns:1fr 1fr; }
  .lp-buy { flex-direction:column; }
  .lp-qty { width:100%; justify-content:center; }
  .lp-add, .lp-wa { width:100%; }
  .lp-sticky-in { flex-direction:column; align-items:stretch; gap:8px; }
  .lp-sticky-btns { flex-direction:column; }
  .lp-sticky-add, .lp-sticky-wa { width:100%; justify-content:center; }
  .lp-faq-contact { flex-direction:column; }
  .lp-cnt-pill { justify-content:center; }
  .lp-spec-strip { grid-template-columns:repeat(2,1fr); }
  .lp-spec-item:nth-child(2) { border-right:none; }
  .lp-spec-item:nth-child(1), .lp-spec-item:nth-child(2) { border-bottom:1px solid var(--bd); }
  .lp-thumbs { grid-template-columns:repeat(4,1fr); grid-template-rows:1fr; }
}
@media(max-width:480px){
  .lp-name { font-size:1.9rem; }
  .lp-chars { grid-template-columns:1fr; }
  .lp-faq-grid { grid-template-columns:1fr; }
  .lp-rel-grid  { grid-template-columns:repeat(2,1fr); gap:9px; }
  .lp-thumbs { grid-template-columns:repeat(2,1fr); grid-template-rows:1fr 1fr; }
}
`;

/* ── Sub-components ── */
const Acc = ({ emoji, label, children, open: defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`lp-acc-item${open ? " on" : ""}`}>
      <button className="lp-acc-q" onClick={() => setOpen(o => !o)}>
        <span className="lp-acc-ql"><span className="lp-acc-em">{emoji}</span>{label}</span>
        <FiChevronDown size={14} className="lp-acc-arr" />
      </button>
      {open && <div className="lp-acc-body">{children}</div>}
    </div>
  );
};

const Dots = ({ val, max = 5 }) => (
  <div className="lp-dots">
    {Array.from({ length: max }, (_, i) => (
      <div key={i} className={`lp-dot${i < val ? " on" : ""}`}
        style={i < val ? { animationDelay: `${i * 0.1}s` } : {}} />
    ))}
  </div>
);

const Bar = ({ pct: p, gold }) => (
  <div className="lp-bar-track">
    <div className={`lp-bar-fill${gold ? " gol" : ""}`} style={{ "--w": `${p}%`, width: `${p}%` }} />
  </div>
);

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
const ProductDetails = ({ addToCart, onCartOpen }) => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [product,    setProduct]    = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [selSize,    setSelSize]    = useState(0);
  const [qty,        setQty]        = useState(1);
  const [added,      setAdded]      = useState(false);
  const [wished,     setWished]     = useState(false);
  const [imgLoaded,  setImgLoaded]  = useState(false);
  const [imgAnim,    setImgAnim]    = useState(false);
  const [activeImg,  setActiveImg]  = useState(null);
  const [openFaq,    setOpenFaq]    = useState(null);
  const [related,    setRelated]    = useState([]);
  const heroRef = useRef(null);

  /* Inject CSS once */
  useEffect(() => {
    if (!document.getElementById("lp-css")) {
      const s = document.createElement("style");
      s.id = "lp-css"; s.textContent = CSS;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(null); setImgLoaded(false); setLoading(true);
    axios.get(`/api/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  useEffect(() => {
    if (!product) return;
    axios.get("/api/products")
      .then(r => {
        const arr = r.data.filter(p => p.id !== product.id);
        const byCategory = arr.filter(p => p.category === product.category).slice(0, 4);
        setRelated(byCategory.length >= 2 ? byCategory : arr.slice(0, 4));
      })
      .catch(() => {});
  }, [product]);


  /* Gallery */
  const galleryUrls = useMemo(() => {
    if (!product?.gallery_images) return [];
    try {
      const p = JSON.parse(product.gallery_images);
      return Array.isArray(p) ? p.filter(Boolean) : [];
    } catch { return []; }
  }, [product?.gallery_images]);

  const allImages = useMemo(() => {
    if (!product) return [];
    return [product.image_url, ...galleryUrls].filter(Boolean).slice(0, 5);
  }, [product, galleryUrls]);

  const displayImg = activeImg || product?.image_url;

  const switchImg = (url) => {
    if (url === displayImg) return;
    setImgAnim(true);
    setTimeout(() => {
      setActiveImg(url); setImgLoaded(false); setImgAnim(false);
    }, 180);
  };

  const fmt = n => Math.round(n).toLocaleString("fr-MA");

  /* Derived */
  const base   = product ? parseFloat(product.price) || 0 : 0;
  const price  = Math.round(base * SIZES_OPTS[selSize].price_mult);

  const top    = product?.top_notes    || null;
  const mid    = product?.middle_notes || null;
  const fond   = product?.base_notes   || null;
  const hasPyr = !!(top || mid || fond);

  const gender    = product?.gender || "Unisex";
  const gCfg      = GENDER_CFG[gender] || GENDER_CFG.Unisex;
  const fam       = product?.scent_family ? FAMILY_MAP[product.scent_family] : null;
  const isOrig    = product?.product_type === "Original";
  const isInsp    = product?.product_type === "Inspired By";
  const inspBy    = product?.inspired_by || null;
  const intensity = product?.scent_intensity ? parseInt(product.scent_intensity) : null;
  const longevity = product?.longevity || null;
  const conc      = product?.concentration || null;
  const isNew     = !!product?.is_new;
  const isBest    = !!product?.is_bestseller;

  const waMsg = product
    ? encodeURIComponent(`Bonjour ! Intéressé(e) par : ${product.name} (${SIZES_OPTS[selSize].label}) — ${fmt(price * qty)} MAD. Confirmez ma commande ?`)
    : "";
  const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${waMsg}`;

  const handleAdd = () => {
    if (!product) return;
    addToCart({ ...product, price, size: SIZES_OPTS[selSize].label }, qty);
    setAdded(true);
    onCartOpen?.();
    setTimeout(() => setAdded(false), 2500);
  };

  const specs = [
    conc           && { ico: "⚗️", val: conc.split(" ").slice(-2).join(" "), lbl: "Type" },
    product?.size  && { ico: "📦", val: product.size, lbl: "Format" },
    intensity      && { ico: "💨", val: `${intensity}/5`, lbl: "Intensité" },
    longevity      && { ico: "⏱",  val: longevity, lbl: "Durée" },
  ].filter(Boolean);

  if (loading) return (
    <div className="lp">
      <div className="lp-loader">
        <div className="lp-loader-ring"/>
        <p className="lp-loader-txt">Chargement…</p>
      </div>
    </div>
  );
  if (!product) return null;

  return (
    <>
    <div className="lp" style={{ "--lp-amb": gCfg.bg }}>
      <div className="lp-ambient"/>

      {/* ── Back ── */}
      <button className="lp-back" onClick={() => navigate(-1)}>
        <FiChevronLeft size={13}/> Retour
      </button>

      {/* ══════════════════════════════════════
          HERO — Gallery + Info
      ══════════════════════════════════════ */}
      <div className="lp-wrap" ref={heroRef}>
        <div className="lp-hero">

          {/* ─── GALLERY ─── */}
          <div className="lp-gallery">

            {/* LARGE main image */}
            <div className="lp-main-img-wrap" style={{ opacity: imgAnim ? 0 : 1, transition: "opacity .18s" }}>
              <div className="lp-ring lp-ring-a"/>
              <div className="lp-ring lp-ring-b"/>

              {/* Badges */}
              {product.stock > 0 && product.stock < 5 && (
                <div className="lp-badge lp-badge-stock">⚡ Dernières {product.stock}</div>
              )}
              {product.stock === 0 && (
                <div className="lp-badge lp-badge-stock" style={{color:"#888"}}>Épuisé</div>
              )}
              {isOrig && <div className="lp-badge lp-badge-orig">✦ Original</div>}
              {isNew  && <div className="lp-badge lp-badge-new">🆕 Nouveau</div>}
              {isBest && !isNew && <div className="lp-badge lp-badge-bs">🔥 Best-Seller</div>}

              <img
                key={displayImg}
                src={displayImg}
                alt={product.name}
                className={`lp-main-img${imgLoaded ? " loaded" : ""}`}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
              />
              <div className="lp-img-halo"
                style={{ background: `radial-gradient(ellipse at 50% 80%, ${gCfg.bg}e0 0%, transparent 70%)` }}/>
            </div>

            {/* 2×2 THUMBNAIL GRID */}
            {allImages.length > 1 && (
              <div className="lp-thumbs">
                {allImages.slice(0, 4).map((url, i) => (
                  <button
                    key={i}
                    className={`lp-thumb${displayImg === url ? " lp-thumb-on" : ""}`}
                    onClick={() => switchImg(url)}
                    aria-label={`Image ${i + 1}`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <img src={url} alt={`${product.name} ${i + 1}`} loading="lazy"/>
                  </button>
                ))}
              </div>
            )}

            {/* Rating strip */}
            <div className="lp-info-strip">
              <div className="lp-stars">
                {[1,2,3,4,5].map(n => <FiStar key={n} size={12} fill="#EF776A" color="#EF776A" strokeWidth={0}/>)}
              </div>
              <span className="lp-strip-txt">4.9 · 48 avis</span>
              <span className="lp-strip-sep">·</span>
              <span className="lp-strip-txt">✓ Authentique</span>
              {inspBy && <><span className="lp-strip-sep">·</span><span className="lp-strip-txt" style={{fontStyle:"italic"}}>≈ {inspBy}</span></>}
            </div>

            {/* Spec strip */}
            {specs.length > 0 && (
              <div className="lp-spec-strip">
                {specs.map(s => (
                  <div key={s.lbl} className="lp-spec-item">
                    <span className="lp-spec-ico">{s.ico}</span>
                    <span className="lp-spec-val">{s.val}</span>
                    <span className="lp-spec-lbl">{s.lbl}</span>
                  </div>
                ))}
              </div>
            )}
          </div>{/* /gallery */}

          {/* ─── INFO ─── */}
          <div className="lp-info">

            {/* Chips */}
            <div className="lp-chips">
              {product.category   && <span className="lp-chip lp-chip-c">{product.category}</span>}
              {<span className="lp-chip lp-chip-b">{gCfg.emoji} {gender}</span>}
              {fam                && <span className="lp-chip lp-chip-g">{fam.icon} {fam.label}</span>}
              {isOrig             && <span className="lp-chip lp-chip-o">⭐ Original</span>}
              {isInsp             && <span className="lp-chip lp-chip-p">🔄 Inspiré</span>}
              {conc               && <span className="lp-chip lp-chip-t">⚗️ {conc.split(" ").slice(-2).join(" ")}</span>}
              {isNew              && <span className="lp-chip lp-chip-c">🆕 Nouveau</span>}
              {isBest             && <span className="lp-chip lp-chip-c">🔥 Best-Seller</span>}
            </div>

            {/* Name */}
            <h1 className="lp-name">{product.name}</h1>
            {product.product_type && (
              <span className="lp-name-type">{isOrig ? "Nahid Original" : isInsp ? `Inspiré par ${inspBy || ""}` : product.product_type}</span>
            )}

            {/* Price */}
            <div className="lp-price-row">
              <span className="lp-price">{fmt(price)}</span>
              <span className="lp-price-unit">MAD</span>
            </div>
            <p className="lp-price-sub">{SIZES_OPTS[selSize].label} · {SIZES_OPTS[selSize].desc}</p>

            {/* Tagline */}
            {product.description && (
              <p className="lp-tagline">{product.description}</p>
            )}

            <div className="lp-divider"/>

            {/* Inspired-by card */}
            {isInsp && inspBy && (
              <div className="lp-insp">
                <div className="lp-insp-hd"><span className="lp-insp-tag">Dupe de luxe</span></div>
                <div className="lp-insp-body">
                  <div className="lp-insp-ico">🔄</div>
                  <div>
                    <div className="lp-insp-txt">Si vous aimez <em>{inspBy}</em>,<br/>vous adorerez ce parfum</div>
                    <p className="lp-insp-sub">Même expérience olfactive · Qualité premium · Prix accessible</p>
                    <div className="lp-insp-pill">✦ Inspiré par {inspBy}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Pyramid */}
            {hasPyr && (
              <>
                <p className="lp-sec">Pyramide olfactive</p>
                <div className="lp-pyr" style={{ marginBottom: 20 }}>
                  <div className="lp-pyr-hd">
                    <div className="lp-pyr-badge">🏺</div>
                    <div>
                      <div className="lp-pyr-title">Notes de parfum</div>
                      <div className="lp-pyr-sub">Du premier souffle à la signature durable</div>
                    </div>
                  </div>
                  <div className="lp-pyr-body">
                    {top && (
                      <div className="lp-pyr-row lp-pyr-t">
                        <div className="lp-pyr-bar"/>
                        <div className="lp-pyr-inner">
                          <div className="lp-pyr-icon">🌿</div>
                          <div>
                            <div className="lp-pyr-lbl">Tête</div>
                            <div className="lp-pyr-val">{top}</div>
                            <div className="lp-pyr-hint">Première impression · 15–30 min</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {mid && (
                      <div className="lp-pyr-row lp-pyr-c">
                        <div className="lp-pyr-bar"/>
                        <div className="lp-pyr-inner">
                          <div className="lp-pyr-icon">🌸</div>
                          <div>
                            <div className="lp-pyr-lbl">Cœur</div>
                            <div className="lp-pyr-val">{mid}</div>
                            <div className="lp-pyr-hint">L'âme du parfum · 2–4h</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {fond && (
                      <div className="lp-pyr-row lp-pyr-f">
                        <div className="lp-pyr-bar"/>
                        <div className="lp-pyr-inner">
                          <div className="lp-pyr-icon">🪵</div>
                          <div>
                            <div className="lp-pyr-lbl">Fond</div>
                            <div className="lp-pyr-val">{fond}</div>
                            <div className="lp-pyr-hint">Signature durable · 6h+</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Characteristics */}
            {(intensity || longevity || conc || product.size) && (
              <>
                <p className="lp-sec">Caractéristiques</p>
                <div className="lp-chars" style={{ marginBottom: 20 }}>
                  {intensity && (
                    <div className="lp-char cl">
                      <span className="lp-char-ico">💨</span>
                      <div className="lp-char-lbl">Intensité</div>
                      <div className="lp-char-val">{intensity}/5</div>
                      <Dots val={intensity}/>
                      <Bar pct={(intensity/5)*100}/>
                    </div>
                  )}
                  {longevity && (
                    <div className="lp-char go">
                      <span className="lp-char-ico">⏱</span>
                      <div className="lp-char-lbl">Longévité</div>
                      <div className="lp-char-val">{longevity}</div>
                      <div className="lp-char-sub">Tenue sur peau</div>
                      <Bar pct={pct(longevity)} gold/>
                      <div className="lp-lon-scale">
                        <span className="lp-lon-tick">2h</span>
                        <span className="lp-lon-tick">6h</span>
                        <span className="lp-lon-tick">12h</span>
                      </div>
                    </div>
                  )}
                  {conc && (
                    <div className="lp-char te">
                      <span className="lp-char-ico">⚗️</span>
                      <div className="lp-char-lbl">Concentration</div>
                      <div className="lp-char-val" style={{fontSize:".74rem",lineHeight:1.3}}>{conc}</div>
                    </div>
                  )}
                  {product.size && (
                    <div className="lp-char pu">
                      <span className="lp-char-ico">📦</span>
                      <div className="lp-char-lbl">Format</div>
                      <div className="lp-char-val">{product.size}</div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Sizes */}
            <p className="lp-sec">Contenance</p>
            <div className="lp-sizes">
              {SIZES_OPTS.map((sz, i) => (
                <button key={sz.label} className={`lp-size${selSize === i ? " on" : ""}`} onClick={() => setSelSize(i)}>
                  {sz.tag && <span className="lp-size-badge">{sz.tag}</span>}
                  <div>
                    <div className="lp-size-label">{sz.label}</div>
                    {sz.desc && <div className="lp-size-desc">{sz.desc}</div>}
                    {i === 1 && <div className="lp-size-save">Économisez {fmt(Math.round(base * 3 * 0.15))} MAD</div>}
                  </div>
                  <div className="lp-size-price">{fmt(Math.round(base * sz.price_mult))} <span style={{fontSize:".68rem",fontFamily:"var(--F)"}}>MAD</span></div>
                </button>
              ))}
            </div>

            {/* Buy row */}
            <div className="lp-buy">
              <div className="lp-qty">
                <button className="lp-qty-btn" onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
                <span className="lp-qty-n">{qty}</span>
                <button className="lp-qty-btn" onClick={() => setQty(q => q+1)}>+</button>
              </div>
              <button
                className={`lp-add${added ? " lp-add-done" : ""}${product.stock === 0 ? " lp-add-oos" : ""}`}
                onClick={handleAdd}
                disabled={product.stock === 0}
              >
                <span className="lp-add-in">
                  {product.stock === 0 ? "Épuisé"
                   : added             ? <><FiCheck size={14}/>Ajouté !</>
                   : <><FiShoppingBag size={14}/>Ajouter — {fmt(price * qty)} MAD</>}
                </span>
                <span className="lp-add-shine"/>
              </button>
            </div>

            {/* Wish + Share */}
            <div className="lp-actions">
              <button className={`lp-action-btn${wished ? " wished" : ""}`} onClick={() => setWished(w => !w)}>
                <FiHeart size={14}/>{wished ? "Favori ajouté" : "Ajouter aux favoris"}
              </button>
              <button className="lp-action-btn" onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}>
                <FiShare2 size={14}/>Partager
              </button>
            </div>

            {/* WhatsApp */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="lp-wa">
              💬 Commander via WhatsApp <FiPhone size={13}/>
            </a>

            {/* Delivery */}
            <p className="lp-sec">Livraison & Paiement</p>
            <div className="lp-dlv">
              {DELIVERY.map(({ icon, title, sub }) => (
                <div key={title} className="lp-dlv-card">
                  <div className="lp-dlv-ico">{icon}</div>
                  <div>
                    <div className="lp-dlv-title">{title}</div>
                    <div className="lp-dlv-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <p className="lp-sec">Détails du produit</p>
            <div className="lp-acc-list">
              {product.description && (
                <Acc emoji="📖" label="Description complète" open={!hasPyr}>
                  <p style={{fontFamily:"var(--F)",fontSize:".8rem",lineHeight:"1.82",color:"var(--mu)"}}>{product.description}</p>
                </Acc>
              )}
              {product.ingredients && (
                <Acc emoji="🧪" label="Ingrédients (INCI)">
                  <p style={{fontFamily:"var(--F)",fontSize:".74rem",lineHeight:"1.82",color:"var(--mu)",wordBreak:"break-word"}}>{product.ingredients}</p>
                </Acc>
              )}
              <Acc emoji="🚚" label="Livraison & Retours">
                <p style={{fontFamily:"var(--F)",fontSize:".78rem",lineHeight:"1.8",color:"var(--mu)"}}>
                  Livraison gratuite dès 160 DH · 24–72h · Paiement à la livraison · 300+ villes au Maroc.
                </p>
              </Acc>
              <Acc emoji="💡" label="Conseils d'application">
                <p style={{fontFamily:"var(--F)",fontSize:".78rem",lineHeight:"1.8",color:"var(--mu)"}}>
                  Appliquez sur les points de chaleur (poignets, nuque, derrière les oreilles). Ne pas frotter. Conservez à l'abri de la lumière.
                </p>
              </Acc>
            </div>

          </div>{/* /info */}
        </div>{/* /hero */}
      </div>{/* /wrap */}

      {/* ══ FAQ — COMPACT ══ */}
      <div className="lp-faq">
        <div className="lp-wrap">
          <div className="lp-faq-hd">
            <div className="lp-faq-left">
              <p className="lp-faq-ey">FAQ</p>
              <h2 className="lp-faq-title">Vos questions, <em>nos réponses</em></h2>
            </div>
          </div>

          <div className="lp-faq-grid">
            {FAQ.map((item, i) => (
              <div key={i} className={`lp-faq-item${openFaq === i ? " on" : ""}`}>
                <button className="lp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="lp-faq-num">{i+1}</span>
                  <span className="lp-faq-qtext">{item.q}</span>
                  <FiChevronDown size={13} className="lp-faq-chev"/>
                </button>
                {openFaq === i && <div className="lp-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══ RELATED ══ */}
      {related.length > 0 && (
        <div className="lp-related">
          <div className="lp-wrap">
            <div className="lp-rel-hd">
              <p className="lp-rel-ey">Découvrez aussi</p>
              <h2 className="lp-rel-title">Parfums similaires</h2>
            </div>
            <div className="lp-rel-grid">
              {related.map((p, i) => (
                <div key={p.id} className="lp-rel-card" onClick={() => navigate(`/product/${p.id}`)}
                  style={{ animationDelay: `${i * 0.09}s` }}>
                  <div className="lp-rel-img-wrap">
                    {p.image_url
                      ? <img src={p.image_url} alt={p.name} className="lp-rel-img" loading="lazy"/>
                      : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem",opacity:.25}}>🌸</div>}
                    {p.is_new ? <span className="lp-rel-bdg">Nouveau</span>
                      : p.is_bestseller ? <span className="lp-rel-bdg">Best-Seller</span>
                      : null}
                  </div>
                  <div className="lp-rel-info">
                    {p.category && <span className="lp-rel-cat">{p.category}</span>}
                    <span className="lp-rel-name">{p.name}</span>
                    <span className="lp-rel-price">{fmt(p.price)} MAD</span>
                    <button className="lp-rel-btn">Voir le produit →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
    <NahidFooter/>
    </>
  );
};

export default ProductDetails;