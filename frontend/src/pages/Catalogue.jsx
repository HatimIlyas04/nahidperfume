import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* ═══════════════════════════════════════════════════════════
   CATALOGUE PAGE — Nahid Perfume
   Layout: Sidebar filters (desktop) · Drawer (mobile)
   Filter chips: visual pills with icons, not plain dropdowns
   Cards: 2 variants (standard · original)
   Animations: staggered reveal, parallax orbs, filter transitions
═══════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@200;300;400;500;600;700&display=swap');

/* ── Design tokens ── */
:root {
  --c:     #EF776A;
  --cd:    #C8503F;
  --cl:    #FFF4F2;
  --cll:   #FFE8E5;
  --w:     #FFFFFF;
  --bg:    #FBF8F2;
  --bg2:   #F2EDE3;
  --bg3:   #EAE3D6;
  --ink:   #1C1A16;
  --ink2:  #3D3A33;
  --g:     #8C8478;
  --g2:    #B5AFA8;
  --bd:    rgba(28,26,22,.09);
  --bd2:   rgba(28,26,22,.05);
  --gold:  #C8A96A;
  --goldd: #A8883E;
  --goldl: #E9D6A9;
  --goldxl:#FAF3E3;
  --ff:    'DM Sans', sans-serif;
  --ffs:   'Cormorant Garamond', Georgia, serif;
  --sp:    cubic-bezier(.34,1.56,.64,1);
  --ex:    cubic-bezier(.16,1,.3,1);
  --ea:    cubic-bezier(.25,.46,.45,.94);
  --sb:    280px;
}

/* ── Reset ── */
.cat-page *, .cat-page *::before, .cat-page *::after { box-sizing:border-box; margin:0; padding:0; }
.cat-page { min-height:100vh; background:var(--bg); font-family:var(--ff); color:var(--ink); overflow-x:hidden; }
.cat-page button { font-family:var(--ff); cursor:pointer; }

/* Grain texture */
.cat-page::before {
  content:''; position:fixed; inset:0; pointer-events:none; z-index:0; opacity:.12;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  background-size:200px;
}

/* ══════════════════════════════════
   ANIMATIONS
══════════════════════════════════ */
@keyframes catReveal   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }
@keyframes catFade     { from{opacity:0} to{opacity:1} }
@keyframes catSlideIn  { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
@keyframes catSlideR   { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:none} }
@keyframes catPop      { 0%{transform:scale(1)} 42%{transform:scale(1.26)} 100%{transform:scale(1)} }
@keyframes catCheck    { from{stroke-dashoffset:24} to{stroke-dashoffset:0} }
@keyframes catRipple   { from{transform:scale(0);opacity:.5} to{transform:scale(4);opacity:0} }
@keyframes catGlow     { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0)} 50%{box-shadow:0 0 0 5px rgba(239,119,106,.18)} }
@keyframes catHeart    { 0%{transform:scale(1)} 30%{transform:scale(1.38)} 60%{transform:scale(.92)} 100%{transform:scale(1)} }
@keyframes catSheen    { from{transform:translateX(-100%) skewX(-18deg)} to{transform:translateX(220%) skewX(-18deg)} }
@keyframes catOrb      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(14px,-10px) scale(1.04)} }
@keyframes catSpin     { to{transform:rotate(360deg)} }
@keyframes catCount    { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:none} }
@keyframes catDrawer   { from{transform:translateX(-100%)} to{transform:none} }

/* ══════════════════════════════════
   PAGE HERO — minimal banner
══════════════════════════════════ */
.cat-hero {
  position:relative; overflow:hidden;
  padding:clamp(48px,7vw,88px) 0 clamp(36px,5vw,60px);
  background:var(--bg);
}
.cat-hero-orb-a {
  position:absolute; width:600px; height:600px; top:-250px; right:-150px;
  border-radius:50%; pointer-events:none;
  background:radial-gradient(circle,rgba(239,119,106,.1),transparent 68%);
  animation:catOrb 20s ease-in-out infinite;
}
.cat-hero-orb-b {
  position:absolute; width:380px; height:380px; bottom:-150px; left:-100px;
  border-radius:50%; pointer-events:none;
  background:radial-gradient(circle,rgba(200,169,106,.09),transparent 70%);
  animation:catOrb 16s ease-in-out infinite reverse;
}
.cat-hero-inner {
  max-width:1520px; margin:0 auto; padding:0 clamp(20px,4vw,64px);
  position:relative; z-index:1;
  display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap;
}
.cat-hero-left { flex:1; min-width:0; }
.cat-eyebrow {
  display:inline-flex; align-items:center; gap:10px;
  font-size:.58rem; font-weight:700; letter-spacing:.34em; text-transform:uppercase;
  color:var(--c); margin-bottom:14px;
  animation:catReveal .6s var(--ex) both;
}
.cat-eyebrow::before { content:''; width:26px; height:1px; background:var(--c); opacity:.7; }
.cat-hero-title {
  font-family:var(--ffs); font-size:clamp(2.6rem,6.5vw,5.8rem);
  font-weight:300; color:var(--ink); letter-spacing:-.03em; line-height:.9;
  animation:catReveal .7s var(--ex) .07s both;
}
.cat-hero-title em { font-style:italic; font-weight:600; color:var(--c); display:block; }
.cat-hero-right {
  display:flex; gap:clamp(24px,4vw,48px); align-items:flex-end;
  animation:catReveal .7s var(--ex) .14s both;
  flex-shrink:0;
}
.cat-hero-stat { text-align:right; }
.cat-hero-stat-n { font-family:var(--ffs); font-size:clamp(1.8rem,3vw,2.8rem); font-weight:300; color:var(--ink); letter-spacing:-.02em; line-height:1; }
.cat-hero-stat-l { font-size:.54rem; letter-spacing:.18em; text-transform:uppercase; color:var(--g2); margin-top:3px; }

/* ══════════════════════════════════
   MAIN LAYOUT
══════════════════════════════════ */
.cat-layout {
  max-width:1520px; margin:0 auto; padding:0 clamp(20px,4vw,64px);
  display:grid; grid-template-columns:var(--sb) 1fr;
  gap:clamp(24px,3vw,40px); align-items:start;
  padding-bottom:80px; padding-top:32px;
  position:relative; z-index:1;
}

/* ══════════════════════════════════
   SIDEBAR FILTERS
══════════════════════════════════ */
.cat-sidebar {
  position:sticky; top:20px;
  display:flex; flex-direction:column; gap:0;
  background:var(--w); border:1px solid var(--bd);
  border-radius:24px; overflow:hidden;
  box-shadow:0 2px 20px rgba(28,26,22,.05);
  animation:catSlideIn .65s var(--ex) .1s both;
}

/* Sidebar header */
.cat-sb-head {
  padding:20px 22px 18px;
  border-bottom:1px solid var(--bd2);
  display:flex; align-items:center; justify-content:space-between;
}
.cat-sb-title {
  font-family:var(--ffs); font-size:1.15rem; font-weight:500; color:var(--ink);
  display:flex; align-items:center; gap:9px;
}
.cat-sb-title-icon { font-size:.88rem; }
.cat-sb-clear {
  font-size:.62rem; font-weight:700; color:var(--g); border:none; background:none;
  cursor:pointer; letter-spacing:.06em; text-transform:uppercase;
  padding:4px 10px; border-radius:999px; border:1px solid var(--bd);
  transition:color .15s, border-color .15s;
}
.cat-sb-clear:hover { color:var(--c); border-color:var(--c); }

/* Section */
.cat-sb-section { padding:18px 22px; border-bottom:1px solid var(--bd2); }
.cat-sb-section:last-child { border-bottom:none; }
.cat-sb-label {
  font-size:.58rem; font-weight:800; letter-spacing:.22em; text-transform:uppercase;
  color:var(--g2); margin-bottom:12px;
  display:flex; align-items:center; gap:7px;
}
.cat-sb-label::after { content:''; flex:1; height:1px; background:var(--bd2); }

/* Gender visual cards */
.cat-gender-grid {
  display:grid; grid-template-columns:1fr 1fr; gap:8px;
}
.cat-gender-card {
  position:relative; border-radius:16px; overflow:hidden;
  aspect-ratio:1; cursor:pointer; border:2px solid var(--bd);
  transition:border-color .22s, transform .22s var(--sp), box-shadow .22s;
  background:var(--bg2);
}
.cat-gender-card:hover { border-color:var(--c); transform:translateY(-2px); box-shadow:0 8px 24px rgba(28,26,22,.1); }
.cat-gender-card.active { border-color:var(--c); box-shadow:0 4px 18px rgba(239,119,106,.28); }
.cat-gender-card-all {
  grid-column:1/-1; aspect-ratio:auto; padding:11px 16px;
  display:flex; align-items:center; gap:10px; aspect-ratio:unset;
}
.cat-gender-img {
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  filter:brightness(.82) saturate(.9);
  transition:filter .3s, transform .5s var(--ea);
}
.cat-gender-card:hover .cat-gender-img { filter:brightness(.9) saturate(1); transform:scale(1.06); }
.cat-gender-card.active .cat-gender-img { filter:brightness(.75) saturate(.95); }
.cat-gender-ovl {
  position:absolute; inset:0;
  background:linear-gradient(to top,rgba(28,26,22,.65) 0%,transparent 65%);
}
.cat-gender-check {
  position:absolute; top:8px; right:8px; z-index:3;
  width:22px; height:22px; border-radius:50%;
  background:var(--c); display:flex; align-items:center; justify-content:center;
  opacity:0; transform:scale(.6); transition:opacity .2s, transform .25s var(--sp);
}
.cat-gender-card.active .cat-gender-check { opacity:1; transform:scale(1); }
.cat-gender-name {
  position:absolute; bottom:9px; left:0; right:0; z-index:2;
  text-align:center; font-size:.72rem; font-weight:700;
  color:white; letter-spacing:.08em;
}
.cat-gender-emoji { font-size:.88rem; flex-shrink:0; }
.cat-gender-all-name { font-size:.76rem; font-weight:700; color:var(--ink2); }

/* Type chips */
.cat-type-chips { display:flex; flex-direction:column; gap:7px; }
.cat-type-chip {
  display:flex; align-items:center; gap:10px;
  padding:10px 14px; border-radius:14px;
  border:1.5px solid var(--bd); background:var(--bg2); cursor:pointer;
  transition:all .2s var(--ex);
}
.cat-type-chip:hover { border-color:var(--c); background:var(--cl); }
.cat-type-chip.active { border-color:var(--c); background:var(--cl); }
.cat-type-chip-icon { font-size:1.05rem; flex-shrink:0; }
.cat-type-chip-info { flex:1; min-width:0; }
.cat-type-chip-name { font-size:.78rem; font-weight:700; color:var(--ink2); }
.cat-type-chip-desc { font-size:.62rem; color:var(--g); margin-top:1px; }
.cat-type-chip-radio {
  width:18px; height:18px; border-radius:50%;
  border:2px solid var(--bd); flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  transition:border-color .18s, background .18s;
}
.cat-type-chip.active .cat-type-chip-radio { border-color:var(--c); background:var(--c); }
.cat-type-chip-radio-dot { width:6px; height:6px; border-radius:50%; background:white; opacity:0; transition:opacity .15s; }
.cat-type-chip.active .cat-type-chip-radio-dot { opacity:1; }

/* Scent family pills */
.cat-family-pills { display:flex; flex-wrap:wrap; gap:7px; }
.cat-family-pill {
  display:inline-flex; align-items:center; gap:5px;
  padding:7px 13px; border-radius:999px;
  border:1.5px solid var(--bd); background:var(--w);
  font-size:.68rem; font-weight:600; color:var(--g); cursor:pointer; white-space:nowrap;
  transition:all .18s var(--ex);
}
.cat-family-pill:hover { border-color:var(--c); color:var(--c); background:var(--cl); }
.cat-family-pill.active { background:var(--c); border-color:var(--c); color:white; box-shadow:0 3px 12px rgba(239,119,106,.35); }

/* Price range */
.cat-price-track {
  position:relative; height:4px; background:var(--bd);
  border-radius:999px; margin:12px 0 8px;
}
.cat-price-fill {
  position:absolute; height:100%; background:linear-gradient(90deg,var(--c),var(--gold));
  border-radius:999px; pointer-events:none;
}
.cat-price-labels { display:flex; justify-content:space-between; }
.cat-price-val { font-size:.64rem; font-weight:700; color:var(--g); }
.cat-price-val span { color:var(--c); }

/* Sidebar result count */
.cat-sb-results {
  padding:16px 22px;
  background:var(--bg2); border-top:1px solid var(--bd2);
  font-size:.72rem; color:var(--g); text-align:center;
}
.cat-sb-results strong { color:var(--c); font-size:.88rem; }

/* ══════════════════════════════════
   MAIN CONTENT AREA
══════════════════════════════════ */
.cat-main { min-width:0; animation:catFade .5s var(--ex) .18s both; }

/* Top bar */
.cat-topbar {
  display:flex; align-items:center; gap:12px; margin-bottom:clamp(20px,3vw,32px); flex-wrap:wrap;
}
.cat-search-wrap {
  flex:1; min-width:200px; display:flex; align-items:center; gap:10px;
  padding:0 18px; height:46px;
  background:var(--w); border:1.5px solid var(--bd); border-radius:999px;
  transition:border-color .2s, box-shadow .2s;
}
.cat-search-wrap:focus-within { border-color:var(--c); box-shadow:0 0 0 3px rgba(239,119,106,.1); }
.cat-search-ico { color:var(--g); flex-shrink:0; }
.cat-search-input { flex:1; border:none; background:none; outline:none; font-family:var(--ff); font-size:.88rem; color:var(--ink); min-width:0; }
.cat-search-input::placeholder { color:var(--g2); }
.cat-search-x {
  width:22px; height:22px; border-radius:50%; border:none; cursor:pointer;
  background:var(--bg2); color:var(--g); display:flex; align-items:center; justify-content:center;
  font-size:10px; flex-shrink:0; transition:all .15s;
  opacity:0; pointer-events:none;
}
.cat-search-x.vis { opacity:1; pointer-events:all; }
.cat-search-x:hover { background:var(--cll); color:var(--c); }

/* Sort */
.cat-sort-wrap { position:relative; flex-shrink:0; }
.cat-sort-btn {
  display:inline-flex; align-items:center; gap:8px; padding:0 18px; height:46px;
  border-radius:999px; border:1.5px solid var(--bd); background:var(--w);
  font-family:var(--ff); font-size:.72rem; font-weight:600; color:var(--g);
  cursor:pointer; white-space:nowrap; transition:all .18s;
}
.cat-sort-btn:hover { border-color:var(--c); color:var(--c); }
.cat-sort-btn.open { border-color:var(--c); color:var(--c); background:var(--cl); }
.cat-sort-chev { font-size:9px; transition:transform .2s; }
.cat-sort-btn.open .cat-sort-chev { transform:rotate(180deg); }
.cat-sort-menu {
  position:absolute; top:calc(100% + 8px); right:0; min-width:210px;
  background:var(--w); border:1px solid var(--bd); border-radius:18px; padding:8px; z-index:99;
  box-shadow:0 20px 56px rgba(28,26,22,.13);
  animation:catReveal .2s var(--ex) both;
}
.cat-sort-opt {
  display:flex; align-items:center; gap:9px; padding:10px 14px; border-radius:11px;
  font-size:.76rem; font-weight:500; color:var(--ink2); cursor:pointer; transition:background .14s;
}
.cat-sort-opt:hover { background:var(--bg); }
.cat-sort-opt.sel { color:var(--c); font-weight:700; }
.cat-sort-pip { width:6px; height:6px; border-radius:50%; background:var(--c); opacity:0; flex-shrink:0; }
.cat-sort-opt.sel .cat-sort-pip { opacity:1; }

/* Mobile filter toggle */
.cat-filter-toggle {
  display:none; align-items:center; gap:8px; padding:0 18px; height:46px;
  border-radius:999px; border:1.5px solid var(--bd); background:var(--w);
  font-family:var(--ff); font-size:.72rem; font-weight:600; color:var(--g);
  cursor:pointer; white-space:nowrap; transition:all .18s; flex-shrink:0;
}
.cat-filter-toggle:hover { border-color:var(--c); color:var(--c); }
.cat-filter-toggle .badge { background:var(--c); color:white; border-radius:999px; padding:2px 7px; font-size:.58rem; }

/* Active filter chips */
.cat-active-row {
  display:flex; align-items:center; gap:7px; flex-wrap:wrap; margin-bottom:20px;
  animation:catFade .3s var(--ex) both;
}
.cat-active-lbl { font-size:.6rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--g2); white-space:nowrap; }
.cat-achip {
  display:inline-flex; align-items:center; gap:5px; padding:4px 11px; border-radius:999px;
  background:var(--cl); border:1px solid rgba(239,119,106,.22);
  font-size:.63rem; font-weight:700; color:var(--c); cursor:pointer; transition:background .14s;
}
.cat-achip:hover { background:var(--cll); }
.cat-clear-btn {
  font-size:.63rem; font-weight:700; color:var(--g); border:1px solid var(--bd); border-radius:999px;
  padding:4px 12px; background:none; cursor:pointer; transition:color .15s, border-color .15s; font-family:var(--ff);
}
.cat-clear-btn:hover { color:var(--c); border-color:var(--c); }

/* ══════════════════════════════════
   PRODUCT GRID
══════════════════════════════════ */
.cat-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(min(250px,100%),1fr));
  gap:clamp(12px,2vw,22px);
}

/* ── Card base ── */
.cat-card {
  position:relative; border-radius:22px; overflow:hidden;
  background:var(--w); border:1px solid var(--bd);
  font-family:var(--ff); cursor:pointer; will-change:transform;
  transition:transform .44s var(--sp), box-shadow .44s var(--ea), border-color .3s;
  display:flex; flex-direction:column;
  opacity:0; transform:translateY(28px);
}
.cat-card.vis { animation:catReveal .62s var(--ex) both; }
.cat-card:hover {
  transform:translateY(-11px) scale(1.013);
  box-shadow:0 30px 68px rgba(28,26,22,.14), 0 4px 16px rgba(28,26,22,.05);
  border-color:transparent;
}
.cat-card:active { transform:translateY(-5px) scale(.997); }

/* Original variant */
.cat-card.cat-orig {
  background:var(--goldxl); border-color:rgba(200,169,106,.28);
}
.cat-card.cat-orig::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px; z-index:5;
  background:linear-gradient(90deg,transparent,var(--gold),var(--c),var(--gold),transparent);
  animation:catSheen 4s linear infinite;
}
.cat-card.cat-orig:hover {
  box-shadow:0 36px 80px rgba(28,22,10,.18), 0 4px 20px rgba(200,169,106,.16), 0 0 0 1px rgba(200,169,106,.32);
  border-color:rgba(200,169,106,.5);
}
.cat-orig-orb {
  position:absolute; width:130px; height:130px; top:-36px; right:-36px; border-radius:50%;
  background:radial-gradient(circle,rgba(200,169,106,.22),transparent 72%);
  pointer-events:none; z-index:1; animation:catOrb 10s ease-in-out infinite;
}

/* Image */
.cat-card-img-wrap {
  position:relative; overflow:hidden; aspect-ratio:3/4;
  background:var(--bg2); display:block; text-decoration:none; flex-shrink:0;
}
.cat-card-img {
  width:100%; height:100%; object-fit:cover; object-position:center top; display:block;
  filter:brightness(.97); transition:transform .8s var(--ea), filter .6s;
}
.cat-card:hover .cat-card-img { transform:scale(1.09); filter:brightness(1.04); }
.cat-orig .cat-card-img { filter:brightness(.93) saturate(.94); }
.cat-orig:hover .cat-card-img { filter:brightness(1.02) saturate(1.05); }
.cat-card-ovl {
  position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(to top,rgba(28,26,22,.56) 0%,rgba(28,26,22,.06) 44%,transparent 70%);
  opacity:0; transition:opacity .4s;
}
.cat-card:hover .cat-card-ovl { opacity:1; }

/* Badges */
.cat-bgs { position:absolute; top:12px; left:12px; display:flex; flex-direction:column; gap:5px; z-index:3; }
.cat-bdg {
  display:inline-flex; align-items:center; gap:4px; padding:4px 11px; border-radius:999px;
  font-family:var(--ff); font-size:.54rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; line-height:1;
}
.cb-orig { background:linear-gradient(135deg,var(--c),var(--cd)); color:white; box-shadow:0 3px 10px rgba(239,119,106,.42); }
.cb-best { background:linear-gradient(135deg,var(--gold),#A0822A); color:white; box-shadow:0 3px 10px rgba(200,169,106,.45); }
.cb-new  { background:var(--w); color:var(--c); border:1px solid rgba(239,119,106,.26); }
.cb-low  { background:rgba(255,255,255,.92); color:var(--c); border:1px solid rgba(239,119,106,.2); backdrop-filter:blur(8px); }
.cb-out  { background:rgba(28,26,22,.8); color:white; backdrop-filter:blur(8px); }
.cb-dot  { width:4px; height:4px; border-radius:50%; flex-shrink:0; }
.cb-orig .cb-dot,.cb-best .cb-dot { background:rgba(255,255,255,.8); }
.cb-new  .cb-dot { background:var(--c); animation:catGlow 1.8s ease infinite; }
.cb-low  .cb-dot { background:var(--c); animation:catGlow 1.5s ease infinite; }

/* Wishlist */
.cat-wish {
  position:absolute; top:12px; right:12px; z-index:4;
  width:34px; height:34px; border-radius:50%; border:none;
  background:rgba(255,255,255,.9); backdrop-filter:blur(10px); color:var(--g); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transform:translateY(-4px) scale(.84);
  transition:opacity .24s, transform .24s var(--sp), color .18s, background .18s;
  box-shadow:0 2px 12px rgba(0,0,0,.1);
}
.cat-card:hover .cat-wish { opacity:1; transform:none; }
.cat-wish:hover { background:white; color:var(--c); transform:scale(1.12) !important; }
.cat-wish.wsh { color:var(--c); background:var(--cl); }
.cat-wish.wsh svg { animation:catHeart .4s var(--sp) both; }

/* Quick-add */
.cat-qa {
  position:absolute; bottom:0; left:0; right:0; z-index:4; padding:12px 12px 11px;
  background:linear-gradient(to top,rgba(28,26,22,.62) 0%,transparent 100%);
  transform:translateY(100%); opacity:0; transition:transform .34s var(--sp),opacity .24s;
}
.cat-card:hover .cat-qa { transform:none; opacity:1; }
.cat-qa-btn {
  width:100%; padding:10px 14px; border-radius:999px; border:none;
  background:white; color:var(--ink); font-family:var(--ff);
  font-size:.67rem; font-weight:700; letter-spacing:.07em; text-transform:uppercase;
  cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px;
  transition:background .18s, transform .14s var(--sp), box-shadow .18s;
  position:relative; overflow:hidden;
}
.cat-qa-btn:hover { background:var(--c); color:white; transform:scale(1.02); box-shadow:0 6px 20px rgba(239,119,106,.42); }
.cat-qa-btn.qadd { background:#1B5E20 !important; color:white !important; }
.c-chk { stroke-dasharray:24; stroke-dashoffset:24; }
.cat-qa-btn.qadd .c-chk { animation:catCheck .3s var(--ea) both; }
.c-rip { position:absolute; border-radius:50%; background:rgba(255,255,255,.34); width:10px; height:10px; margin:-5px 0 0 -5px; animation:catRipple .5s var(--ea) forwards; pointer-events:none; }
.cat-orig .cat-qa-btn { background:var(--c); color:white; box-shadow:0 4px 16px rgba(239,119,106,.44); }
.cat-orig .cat-qa-btn:hover { background:var(--cd); }

/* ══════════════════════════════════════════════
   CARD BODY — bold, readable, luxe
══════════════════════════════════════════════ */
.cat-card-body {
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: var(--w);
}
.cat-orig .cat-card-body { background: var(--goldxl); }

/* ── Top row: famille pill + type tag ── */
.cat-card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

/* Famille olfactive — big visible pill */
.cat-famille-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  border-radius: 999px;
  background: var(--bg2);
  border: 1.5px solid var(--bg3);
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--ink2);
  transition: background .2s, border-color .2s, color .2s;
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cat-card:hover .cat-famille-pill {
  background: var(--cl);
  border-color: rgba(239,119,106,.28);
  color: var(--c);
}
.cat-famille-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--c); flex-shrink: 0;
  opacity: .7;
}
.cat-orig .cat-famille-pill {
  background: rgba(200,169,106,.15);
  border-color: rgba(200,169,106,.35);
  color: var(--goldd);
}
.cat-orig .cat-famille-pill .cat-famille-dot { background: var(--gold); }
.cat-orig:hover .cat-famille-pill {
  background: rgba(200,169,106,.26);
  border-color: var(--goldl);
  color: var(--goldd);
}

/* Original / Best inline tag */
.cat-orig-inline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 5px 11px;
  border-radius: 999px;
  background: var(--goldxl);
  border: 1.5px solid var(--goldl);
  font-size: .6rem;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--goldd);
  white-space: nowrap;
}

/* ── Product name — big & bold ── */
.cat-card-name {
  font-family: var(--ffs);
  font-size: clamp(1.18rem, 1.9vw, 1.42rem);
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -.015em;
  line-height: 1.22;
  margin-bottom: 0;
  text-decoration: none;
  display: block;
  transition: color .22s;
  flex: 1;
  padding: 10px 0 14px;
}
.cat-card:hover .cat-card-name { color: var(--c); }
.cat-orig .cat-card-name { color: var(--ink); }
.cat-orig:hover .cat-card-name { color: var(--goldd); }

/* ── Animated divider ── */
.cat-div {
  height: 1px;
  background: var(--bd);
  margin-bottom: 14px;
  position: relative;
  overflow: hidden;
}
.cat-div::after {
  content: '';
  position: absolute; top: 0; left: 0;
  height: 100%; width: 0%;
  background: linear-gradient(90deg, var(--c), var(--gold));
  transition: width .54s var(--ea);
}
.cat-card:hover .cat-div::after { width: 100%; }
.cat-orig .cat-div { background: rgba(200,169,106,.22); }
.cat-orig .cat-div::after { background: linear-gradient(90deg, var(--gold), var(--c)); }

/* ── Footer: price + add button ── */
.cat-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.cat-pw { display: flex; flex-direction: column; gap: 3px; }

.cat-price {
  font-family: var(--ffs);
  font-size: clamp(1.36rem, 2.2vw, 1.6rem);
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -.02em;
  line-height: 1;
}
.cat-price-cur {
  font-family: var(--ff);
  font-size: .72rem;
  font-weight: 700;
  color: var(--g);
  margin-left: 4px;
  vertical-align: middle;
}

.cat-ship {
  font-size: .65rem;
  font-weight: 600;
  color: var(--g);
  letter-spacing: .02em;
}
.cat-ship-free { color: #2E7D32; }

/* Add button */
.cat-add {
  width: 44px; height: 44px;
  border-radius: 50%; border: none; flex-shrink: 0;
  background: linear-gradient(135deg, var(--c), var(--cd));
  color: white;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: transform .22s var(--sp), box-shadow .22s;
  box-shadow: 0 5px 18px rgba(239,119,106,.45);
  position: relative; overflow: hidden;
}
.cat-add::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,.24) 50%, transparent 60%);
  transform: translateX(-100%) skewX(-15deg);
  transition: transform .5s var(--ea);
}
.cat-add:hover {
  transform: scale(1.16) rotate(90deg);
  box-shadow: 0 8px 26px rgba(239,119,106,.58);
}
.cat-add:hover::before { transform: translateX(160%) skewX(-15deg); }
.cat-add:active { transform: scale(.93) rotate(90deg); }
.cat-add.ok {
  background: linear-gradient(135deg, #2E7D32, #1B5E20);
  box-shadow: 0 5px 16px rgba(46,125,50,.38);
  animation: catPop .4s var(--sp) both;
}
.cat-orig .cat-add {
  background: linear-gradient(135deg, var(--gold), var(--goldd));
  color: var(--ink2);
  box-shadow: 0 5px 18px rgba(200,169,106,.48);
}
.cat-orig .cat-add:hover { box-shadow: 0 8px 26px rgba(200,169,106,.62); }
.cat-orig .cat-add.ok { background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; }
.cat-add svg { pointer-events: none; }

.cat-oos {
  font-size: .68rem;
  font-weight: 600;
  color: var(--g2);
  font-style: italic;
}

/* ══════════════════════════════════
   EMPTY + LOADER
══════════════════════════════════ */
.cat-empty {
  grid-column:1/-1; text-align:center; padding:clamp(60px,10vw,100px) 24px;
  animation:catReveal .5s var(--ex) both;
}
.cat-empty-icon { font-size:3rem; opacity:.22; margin-bottom:18px; display:block; }
.cat-empty-title { font-family:var(--ffs); font-size:clamp(1.5rem,3vw,2.2rem); font-weight:400; color:var(--ink); margin-bottom:8px; }
.cat-empty-sub { font-size:.85rem; color:var(--g); margin-bottom:22px; }
.cat-empty-cta {
  display:inline-flex; align-items:center; gap:8px; padding:11px 26px; border-radius:999px;
  background:var(--c); color:white; border:none; font-family:var(--ff); font-size:.74rem;
  font-weight:700; letter-spacing:.08em; text-transform:uppercase; cursor:pointer;
  transition:transform .2s var(--sp),box-shadow .2s,background .18s;
  box-shadow:0 5px 18px rgba(239,119,106,.4);
}
.cat-empty-cta:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 8px 26px rgba(239,119,106,.52); background:var(--cd); }
.cat-loader { grid-column:1/-1; min-height:50vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; }
.cat-loader-ring { width:46px; height:46px; border:2px solid rgba(200,169,106,.2); border-top-color:var(--gold); border-radius:50%; animation:catSpin .8s linear infinite; }
.cat-loader-txt { font-family:var(--ffs); font-size:1rem; color:var(--g); font-style:italic; }

/* ══════════════════════════════════
   MOBILE DRAWER
══════════════════════════════════ */
.cat-drawer-overlay { position:fixed; inset:0; background:rgba(28,26,22,.35); z-index:199; backdrop-filter:blur(4px); animation:catFade .25s; }
.cat-drawer {
  position:fixed; top:0; left:0; bottom:0; width:min(320px,92vw); z-index:200;
  background:var(--w); overflow-y:auto; box-shadow:0 0 60px rgba(28,26,22,.2);
  animation:catDrawer .32s var(--ex) both;
  display:flex; flex-direction:column;
}
.cat-drawer-head {
  padding:20px 22px; border-bottom:1px solid var(--bd2);
  display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
}
.cat-drawer-title { font-family:var(--ffs); font-size:1.3rem; font-weight:500; color:var(--ink); }
.cat-drawer-close {
  width:34px; height:34px; border-radius:50%; border:none; cursor:pointer;
  background:var(--bg2); color:var(--g); font-size:14px;
  display:flex; align-items:center; justify-content:center; transition:background .15s,color .15s;
}
.cat-drawer-close:hover { background:var(--cll); color:var(--c); }
.cat-drawer-body { flex:1; overflow-y:auto; }

/* ══════════════════════════════════
   RESPONSIVE
══════════════════════════════════ */
@media(max-width:1080px){
  .cat-layout { grid-template-columns:1fr; }
  .cat-sidebar { display:none; }
  .cat-filter-toggle { display:inline-flex; }
  .cat-hero-right { display:none; }
  .cat-hero-title { font-size:clamp(2.2rem,7vw,4.2rem); }
}
@media(max-width:640px){
  .cat-grid { grid-template-columns:repeat(2,1fr); gap:10px; }
  .cat-topbar { flex-wrap:wrap; gap:8px; }
  .cat-search-wrap { min-width:0; }
}
@media(max-width:380px){
  .cat-grid { grid-template-columns:1fr 1fr; gap:8px; }
}
`;

/* ─── helpers ─── */
function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-cat-v2")) {
    const s = document.createElement("style");
    s.id = "nahid-cat-v2"; s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function parseNote(raw) {
  if (!raw) return null;
  const m = raw.match(/t[êe]te\s*[:：](.*?)(?:\||$)/i);
  if (!m) return null;
  return m[1].replace(/[🌹🌿🌙💧🍊🏜️🪵🍦🍫🤍🔥⭐]/g,"").trim().split(",").slice(0,2).join(", ");
}
function addRipple(e, el) {
  const r = el.getBoundingClientRect();
  const s = document.createElement("span");
  s.className = "c-rip"; s.style.left = `${e.clientX-r.left}px`; s.style.top = `${e.clientY-r.top}px`;
  el.appendChild(s); setTimeout(()=>s.remove(), 550);
}

/* ── FILTER CONFIGS ── */
const GENDER_ITEMS = [
  { id:"Tous",   name:"Tous",   emoji:"✦", img:null },
  { id:"Femme",  name:"Femme",  emoji:"🌸", img:"/femmeNahid.png",  fb:"https://i.postimg.cc/dQTtHTgz/femme-Nahid.png" },
  { id:"Homme",  name:"Homme",  emoji:"🪵", img:"/hommeNahid.png",  fb:"https://i.postimg.cc/WpJbWJxx/homme-Nahid.jpg" },
  { id:"Unisex", name:"Unisex", emoji:"✦", img:"/unisexNahid.png", fb:"https://i.postimg.cc/MZjKPjgN/unisex-Nahid.png" },
];
const TYPE_ITEMS = [
  { id:"all",         icon:"✦", name:"Tous les types",  desc:"Toute notre collection" },
  { id:"Original",    icon:"⭐", name:"Nahid Originals", desc:"Créations exclusives de la maison" },
  { id:"Inspired By", icon:"🔄", name:"Inspired By",     desc:"Inspirés des grands parfums" },
];
const FAMILY_ITEMS = [
  { id:"flowery", label:"🌸 Fleuri" },
  { id:"fresh",   label:"🍃 Frais" },
  { id:"gourmand",label:"🍫 Gourmand" },
  { id:"herbal",  label:"🌿 Herbal" },
  { id:"earthy",  label:"🌍 Terreux" },
  { id:"warm",    label:"🔥 Chaud" },
];
const SORT_OPTS = [
  { id:"default",    label:"Par défaut" },
  { id:"price-asc",  label:"Prix croissant" },
  { id:"price-desc", label:"Prix décroissant" },
  { id:"name",       label:"Nom A–Z" },
  { id:"new",        label:"Nouveautés d'abord" },
  { id:"best",       label:"Best-Sellers d'abord" },
];

/* ══════════════════════════════════
   PRODUCT CARD
══════════════════════════════════ */
function Card({ product, addToCart, delay = 0 }) {
  const [added,  setAdded]  = useState(false);
  const [wished, setWished] = useState(false);
  const ref  = useRef(null);
  const qRef = useRef(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("vis"); obs.unobserve(el); } },
      { threshold:.06 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const price    = parseFloat(product.price) || 0;
  const isOut    = product.stock === 0;
  const isLow    = product.stock > 0 && product.stock < 5;
  const isNew    = !!product.is_new;
  const isBest   = !!product.is_bestseller;
  const isOrig   = product.product_type === "Original" || product.category === "Originals";
  const freeShip = price >= 300;

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (isOut) return;
    if (qRef.current) addRipple(e, qRef.current);
    addToCart(product, 1); setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div ref={ref} className={`cat-card${isOrig?" cat-orig":""}`} style={{animationDelay:`${delay}s`}}>
      <Link to={`/product/${product.id}`} className="cat-card-img-wrap">
        {isOrig && <div className="cat-orig-orb"/>}
        <img className="cat-card-img" src={product.image_url} alt={product.name} loading="lazy"/>
        <div className="cat-card-ovl"/>
        <div className="cat-bgs">
          {isBest && <span className="cat-bdg cb-best"><span className="cb-dot"/>🔥 Best-Seller</span>}
          {isOrig && !isBest && <span className="cat-bdg cb-orig"><span className="cb-dot"/>✦ Original</span>}
          {isNew && !isBest && !isOrig && <span className="cat-bdg cb-new"><span className="cb-dot"/>Nouveau</span>}
          {isLow && <span className="cat-bdg cb-low"><span className="cb-dot"/>Dernières pièces</span>}
          {isOut && <span className="cat-bdg cb-out">Épuisé</span>}
        </div>
        <button className={`cat-wish${wished?" wsh":""}`}
          onClick={e=>{e.preventDefault();e.stopPropagation();setWished(w=>!w);}} aria-label="Favoris">
          <svg width="13" height="13" viewBox="0 0 24 24" fill={wished?"currentColor":"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {!isOut && (
          <div className="cat-qa">
            <button ref={qRef} className={`cat-qa-btn${added?" qadd":""}`} onClick={handleAdd}>
              {added
                ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline className="c-chk" points="20 6 9 17 4 12"/></svg>Ajouté !</>
                : <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Ajouter au panier</>
              }
            </button>
          </div>
        )}
      </Link>

      {/* ── CARD BODY: famille · nom · prix ── */}
      <div className="cat-card-body">

        {/* Top row: famille olfactive + "Original" tag if applicable */}
        <div className="cat-card-top-row">
          {(product.scent_family || product.category) && (
            <span className="cat-famille-pill">
              <span className="cat-famille-dot"/>
              {FAMILY_ITEMS.find(f=>f.id===product.scent_family)?.label
                || (product.category || "Parfum")}
            </span>
          )}
          {isOrig && !isBest && (
            <span className="cat-orig-inline">✦ Original</span>
          )}
          {isBest && (
            <span className="cat-orig-inline" style={{background:"linear-gradient(135deg,rgba(200,169,106,.18),rgba(200,169,106,.08))",borderColor:"rgba(200,169,106,.28)",color:"var(--goldd)"}}>🔥 Best</span>
          )}
        </div>

        {/* Name */}
        <Link to={`/product/${product.id}`} className="cat-card-name">{product.name}</Link>

        <div className="cat-div"/>

        {/* Price + add button */}
        <div className="cat-foot">
          <div className="cat-pw">
            <span className="cat-price">
              {Math.round(price).toLocaleString("fr-MA")}
              <span className="cat-price-cur">MAD</span>
            </span>
            <span className={`cat-ship${freeShip?" cat-ship-free":""}`}>
              {freeShip ? "✓ Livraison gratuite" : "Livraison dès 300 MAD"}
            </span>
          </div>
          {!isOut
            ? <button className={`cat-add${added?" ok":""}`} onClick={handleAdd} aria-label="Ajouter">
                {added
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                }
              </button>
            : <span className="cat-oos">Épuisé</span>
          }
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   SIDEBAR / DRAWER FILTER PANEL
══════════════════════════════════ */
function FilterPanel({ products, gender, setGender, type, setType, family, setFamily, filtered }) {
  const availFamilies = [...new Set(products.map(p=>p.scent_family).filter(Boolean))];

  return (
    <>
      {/* Gender visual cards */}
      <div className="cat-sb-section">
        <div className="cat-sb-label">Genre</div>
        <div className="cat-gender-grid">
          {/* All */}
          <div
            className={`cat-gender-card cat-gender-card-all${gender==="Tous"?" active":""}`}
            onClick={()=>setGender("Tous")}
          >
            <span className="cat-gender-emoji">✦</span>
            <span className="cat-gender-all-name">Tous</span>
            <div className="cat-gender-check">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
          {/* Femme / Homme / Unisex */}
          {GENDER_ITEMS.filter(g=>g.id!=="Tous").map(g => (
            <div key={g.id} className={`cat-gender-card${gender===g.id?" active":""}`} onClick={()=>setGender(g.id)}>
              <img className="cat-gender-img" src={g.img} alt={g.name} onError={e=>e.currentTarget.src=g.fb}/>
              <div className="cat-gender-ovl"/>
              <div className="cat-gender-check">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span className="cat-gender-name">{g.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="cat-sb-section">
        <div className="cat-sb-label">Type de parfum</div>
        <div className="cat-type-chips">
          {TYPE_ITEMS.map(t => (
            <div key={t.id} className={`cat-type-chip${type===t.id?" active":""}`} onClick={()=>setType(t.id)}>
              <span className="cat-type-chip-icon">{t.icon}</span>
              <div className="cat-type-chip-info">
                <div className="cat-type-chip-name">{t.name}</div>
                <div className="cat-type-chip-desc">{t.desc}</div>
              </div>
              <div className="cat-type-chip-radio">
                <div className="cat-type-chip-radio-dot"/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scent family */}
      {availFamilies.length > 0 && (
        <div className="cat-sb-section">
          <div className="cat-sb-label">Famille olfactive</div>
          <div className="cat-family-pills">
            <button className={`cat-family-pill${family==="all"?" active":""}`} onClick={()=>setFamily("all")}>Toutes</button>
            {FAMILY_ITEMS.filter(f=>availFamilies.includes(f.id)).map(f => (
              <button key={f.id} className={`cat-family-pill${family===f.id?" active":""}`} onClick={()=>setFamily(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="cat-sb-results">
        <strong>{filtered.length}</strong> parfum{filtered.length>1?"s":""} trouvé{filtered.length>1?"s":""}
      </div>
    </>
  );
}

/* ══════════════════════════════════
   MAIN PAGE
══════════════════════════════════ */
const Catalogue = ({ addToCart }) => {
  injectCSS();

  const [products,   setProducts]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [gender,     setGender]     = useState("Tous");
  const [type,       setType]       = useState("all");
  const [family,     setFamily]     = useState("all");
  const [sort,       setSort]       = useState("default");
  const [sortOpen,   setSortOpen]   = useState(false);
  const [drawer,     setDrawer]     = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    axios.get("/api/products")
      .then(r => setProducts(Array.isArray(r.data) ? r.data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fn = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Filter
  const filtered = products.filter(p => {
    if (gender !== "Tous" && p.gender !== gender) return false;
    if (type   !== "all"  && p.product_type !== type) return false;
    if (family !== "all"  && p.scent_family !== family) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) ||
             (p.description||"").toLowerCase().includes(q) ||
             (p.category||"").toLowerCase().includes(q) ||
             (p.scent_notes||"").toLowerCase().includes(q);
    }
    return true;
  }).sort((a,b) => {
    if (sort==="price-asc")  return parseFloat(a.price) - parseFloat(b.price);
    if (sort==="price-desc") return parseFloat(b.price) - parseFloat(a.price);
    if (sort==="name")       return a.name.localeCompare(b.name);
    if (sort==="new")        return (b.is_new||0) - (a.is_new||0);
    if (sort==="best")       return (b.is_bestseller||0) - (a.is_bestseller||0);
    return 0;
  });

  const activeFilters = [
    ...(gender!=="Tous" ? [{id:"g",label:gender,clear:()=>setGender("Tous")}] : []),
    ...(type!=="all"    ? [{id:"t",label:TYPE_ITEMS.find(t=>t.id===type)?.name||type,clear:()=>setType("all")}] : []),
    ...(family!=="all"  ? [{id:"f",label:FAMILY_ITEMS.find(f=>f.id===family)?.label||family,clear:()=>setFamily("all")}] : []),
  ];
  const clearAll = () => { setGender("Tous"); setType("all"); setFamily("all"); setSearch(""); };
  const sortLabel = SORT_OPTS.find(s=>s.id===sort)?.label || "Trier";
  const activeCount = activeFilters.length;

  const origCount = products.filter(p=>p.product_type==="Original"||p.category==="Originals").length;
  const bestCount = products.filter(p=>p.is_bestseller).length;

  return (
    <div className="cat-page">

      {/* ── HERO ── */}
      <section className="cat-hero">
        <div className="cat-hero-orb-a"/><div className="cat-hero-orb-b"/>
        <div className="cat-hero-inner">
          <div className="cat-hero-left">
            <div className="cat-eyebrow">Nahid Perfume · Casablanca</div>
            <h1 className="cat-hero-title">Notre<br/><em>Catalogue</em></h1>
          </div>
          <div className="cat-hero-right">
            {[
              { n:products.length, l:"Fragrances" },
              { n:origCount,       l:"Originals" },
              { n:bestCount,       l:"Best-Sellers" },
              { n:"4.9★",          l:"Note clients" },
            ].map((s,i) => (
              <div className="cat-hero-stat" key={i}>
                <div className="cat-hero-stat-n">{s.n}</div>
                <div className="cat-hero-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAYOUT ── */}
      <div className="cat-layout">

        {/* SIDEBAR (desktop) */}
        <aside className="cat-sidebar">
          <div className="cat-sb-head">
            <div className="cat-sb-title"><span className="cat-sb-title-icon">◈</span> Filtrer</div>
            {activeCount>0 && <button className="cat-sb-clear" onClick={clearAll}>Tout effacer</button>}
          </div>
          <FilterPanel products={products} gender={gender} setGender={setGender}
            type={type} setType={setType} family={family} setFamily={setFamily} filtered={filtered}/>
        </aside>

        {/* MAIN */}
        <main className="cat-main">

          {/* Top bar */}
          <div className="cat-topbar">
            {/* Mobile filter toggle */}
            <button className="cat-filter-toggle" onClick={()=>setDrawer(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
              Filtres
              {activeCount>0 && <span className="badge">{activeCount}</span>}
            </button>

            {/* Search */}
            <div className="cat-search-wrap">
              <svg className="cat-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className="cat-search-input" type="text" placeholder="Rechercher un parfum…" value={search} onChange={e=>setSearch(e.target.value)}/>
              <button className={`cat-search-x${search?" vis":""}`} onClick={()=>setSearch("")}>✕</button>
            </div>

            {/* Sort */}
            <div className="cat-sort-wrap" ref={sortRef}>
              <button className={`cat-sort-btn${sortOpen?" open":""}`} onClick={()=>setSortOpen(v=>!v)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 5h10M11 9h7M11 13h4M3 5l4 4-4 4"/></svg>
                {sortLabel} <span className="cat-sort-chev">▾</span>
              </button>
              {sortOpen && (
                <div className="cat-sort-menu">
                  {SORT_OPTS.map(opt => (
                    <div key={opt.id} className={`cat-sort-opt${sort===opt.id?" sel":""}`}
                      onClick={()=>{setSort(opt.id);setSortOpen(false);}}>
                      <span className="cat-sort-pip"/> {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active chips */}
          {activeFilters.length > 0 && (
            <div className="cat-active-row">
              <span className="cat-active-lbl">Filtres actifs :</span>
              {activeFilters.map(f => (
                <span key={f.id} className="cat-achip" onClick={f.clear}>{f.label} <span>✕</span></span>
              ))}
              <button className="cat-clear-btn" onClick={clearAll}>Tout effacer</button>
            </div>
          )}

          {/* Grid */}
          <div className="cat-grid">
            {loading ? (
              <div className="cat-loader">
                <div className="cat-loader-ring"/>
                <p className="cat-loader-txt">Chargement des fragrances…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="cat-empty">
                <span className="cat-empty-icon">🌸</span>
                <div className="cat-empty-title">Aucun parfum trouvé</div>
                <p className="cat-empty-sub">Modifiez vos filtres ou votre recherche.</p>
                <button className="cat-empty-cta" onClick={clearAll}>
                  Réinitialiser
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                </button>
              </div>
            ) : filtered.map((p,i) => (
              <Card key={p.id} product={p} addToCart={addToCart} delay={Math.min(i*.05,.4)}/>
            ))}
          </div>
        </main>
      </div>

      {/* MOBILE DRAWER */}
      {drawer && (
        <>
          <div className="cat-drawer-overlay" onClick={()=>setDrawer(false)}/>
          <div className="cat-drawer">
            <div className="cat-drawer-head">
              <div className="cat-drawer-title">Filtres</div>
              <button className="cat-drawer-close" onClick={()=>setDrawer(false)}>✕</button>
            </div>
            <div className="cat-drawer-body">
              <div className="cat-sb-head" style={{borderBottom:"none",paddingBottom:0}}>
                {activeCount>0 && <button className="cat-sb-clear" style={{marginLeft:"auto"}} onClick={()=>{clearAll();setDrawer(false);}}>Tout effacer</button>}
              </div>
              <FilterPanel products={products} gender={gender} setGender={setGender}
                type={type} setType={setType} family={family} setFamily={setFamily} filtered={filtered}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Catalogue;