import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* ═══════════════════════════════════════════════════════
   ORIGINALS PAGE — Nahid Perfume
   Aesthetic: Luxury editorial — warm cream, deep ink,
   coral accents. Overlapping typography, parallax,
   staggered reveals, magazine-style layout.
═══════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300&display=swap');

:root {
  --or-ink:    #1A1410;
  --or-ink2:   #3D3229;
  --or-cream:  #FBF8F2;
  --or-cream2: #F2EDE3;
  --or-cream3: #E8E0D0;
  --or-w:      #FFFFFF;
  --or-c:      #EF776A;
  --or-cd:     #C8503F;
  --or-cl:     #FFF0EE;
  --or-gold:   #C8A86A;
  --or-goldl:  #EDD9A8;
  --or-muted:  #8C7E72;
  --or-bd:     rgba(26,20,16,.09);
  --or-ff:     'DM Sans', sans-serif;
  --or-ffs:    'Cormorant Garamond', Georgia, serif;
  --or-sp:     cubic-bezier(.34,1.56,.64,1);
  --or-ex:     cubic-bezier(.16,1,.3,1);
  --or-ea:     cubic-bezier(.25,.46,.45,.94);
}

/* ── Base ── */
.or-page * { box-sizing:border-box; margin:0; padding:0; }
.or-page {
  min-height:100vh;
  background:var(--or-cream);
  font-family:var(--or-ff);
  color:var(--or-ink);
  overflow-x:hidden;
  position:relative;
}

/* ── Linen texture ── */
.or-page::before {
  content:'';
  position:fixed; inset:0; pointer-events:none; z-index:0; opacity:.22;
  background-image:
    repeating-linear-gradient(0deg,transparent,transparent 32px,rgba(200,168,106,.07) 32px,rgba(200,168,106,.07) 33px),
    repeating-linear-gradient(90deg,transparent,transparent 32px,rgba(200,168,106,.05) 32px,rgba(200,168,106,.05) 33px);
}

/* ── HERO ── */
.or-hero {
  position:relative; overflow:hidden;
  min-height:100svh;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:0 0 clamp(52px,8vw,96px);
}

/* Background image fill */
.or-hero-bg {
  position:absolute; inset:0; z-index:0;
  background:
    linear-gradient(160deg, rgba(26,20,16,.88) 0%, rgba(26,20,16,.62) 55%, rgba(26,20,16,.22) 100%),
    url('https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&q=85') center/cover no-repeat;
  transform:scale(1.04);
  animation:heroZoom 22s var(--or-ea) infinite alternate;
}
@keyframes heroZoom { from{transform:scale(1.04)} to{transform:scale(1.0)} }

/* Decorative grain */
.or-hero-grain {
  position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.55;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  background-size:180px;
}

.or-hero-inner {
  position:relative; z-index:2;
  max-width:1400px; margin:0 auto;
  padding:0 clamp(22px,5vw,80px);
}

/* Eyebrow */
.or-hero-eyebrow {
  display:flex; align-items:center; gap:14px;
  margin-bottom:clamp(18px,3vw,32px);
  animation:fadeUpHero .8s var(--or-ex) .1s both;
}
.or-hero-eyebrow-line {
  flex:1; max-width:60px; height:1px;
  background:linear-gradient(90deg,transparent,rgba(200,168,106,.7));
}
.or-hero-eyebrow-txt {
  font-size:.6rem; font-weight:600; letter-spacing:.36em; text-transform:uppercase;
  color:rgba(200,168,106,.85);
}

/* Title */
.or-hero-title {
  font-family:var(--or-ffs);
  font-size:clamp(3.6rem,10vw,9rem);
  font-weight:300; color:var(--or-w);
  letter-spacing:-.03em; line-height:.92;
  margin-bottom:clamp(20px,3vw,36px);
}
.or-hero-title em {
  font-style:italic; font-weight:600;
  color:var(--or-gold); display:block;
}
.or-hero-title-line {
  overflow:hidden; display:block;
  animation:titleReveal .9s var(--or-ex) both;
}
.or-hero-title-line:nth-child(1){ animation-delay:.2s; }
.or-hero-title-line:nth-child(2){ animation-delay:.35s; }
@keyframes titleReveal { from{transform:translateY(110%);opacity:0} to{transform:none;opacity:1} }

/* Sub */
.or-hero-sub {
  max-width:480px;
  font-size:clamp(.82rem,1.4vw,.96rem); font-weight:300; color:rgba(255,255,255,.62);
  line-height:1.82; letter-spacing:.02em;
  margin-bottom:clamp(28px,4vw,48px);
  animation:fadeUpHero .8s var(--or-ex) .5s both;
}

/* CTA row */
.or-hero-cta {
  display:flex; align-items:center; gap:18px; flex-wrap:wrap;
  animation:fadeUpHero .8s var(--or-ex) .62s both;
}
.or-btn-primary {
  display:inline-flex; align-items:center; gap:10px;
  padding:15px 34px; border-radius:999px; border:none;
  background:var(--or-c); color:white; cursor:pointer;
  font-family:var(--or-ff); font-size:.76rem; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; text-decoration:none;
  transition:transform .3s var(--or-sp), box-shadow .3s, background .2s;
  box-shadow:0 6px 28px rgba(239,119,106,.45);
  position:relative; overflow:hidden;
}
.or-btn-primary::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.2) 50%,transparent 65%);
  transform:translateX(-100%) skewX(-15deg);
  transition:transform .5s var(--or-ea);
}
.or-btn-primary:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 12px 36px rgba(239,119,106,.55); background:var(--or-cd); }
.or-btn-primary:hover::after { transform:translateX(160%) skewX(-15deg); }
.or-btn-ghost-w {
  display:inline-flex; align-items:center; gap:9px;
  font-size:.72rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
  color:rgba(255,255,255,.65); text-decoration:none; cursor:pointer; background:none; border:none;
  transition:color .2s, gap .2s;
}
.or-btn-ghost-w:hover { color:rgba(255,255,255,.95); gap:13px; }

/* Scroll indicator */
.or-scroll-ind {
  position:absolute; right:clamp(22px,5vw,64px); bottom:clamp(40px,6vw,72px);
  z-index:3; display:flex; flex-direction:column; align-items:center; gap:10px;
  animation:fadeUpHero .8s var(--or-ex) .9s both;
}
.or-scroll-line {
  width:1px; height:54px;
  background:linear-gradient(to bottom,transparent,rgba(200,168,106,.7));
  animation:scrollPulse 2.2s ease infinite;
}
@keyframes scrollPulse { 0%,100%{opacity:.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.15)} }
.or-scroll-txt { font-size:.55rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.38); writing-mode:vertical-rl; }

/* Hero stats */
.or-hero-stats {
  position:absolute; right:clamp(22px,5vw,64px); top:50%;
  transform:translateY(-50%); z-index:3;
  display:flex; flex-direction:column; gap:24px;
  animation:fadeUpHero .8s var(--or-ex) .7s both;
}
.or-stat { text-align:right; }
.or-stat-num { font-family:var(--or-ffs); font-size:clamp(1.6rem,3vw,2.4rem); font-weight:300; color:white; letter-spacing:-.02em; line-height:1; }
.or-stat-lbl { font-size:.54rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.38); margin-top:3px; }

@keyframes fadeUpHero { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

/* ── SECTION: What is Original ── */
.or-what {
  position:relative; z-index:1;
  padding:clamp(72px,10vw,140px) 0;
  overflow:hidden;
}
.or-what-inner {
  max-width:1400px; margin:0 auto;
  padding:0 clamp(22px,5vw,80px);
  display:grid; grid-template-columns:1fr 1fr;
  gap:clamp(48px,7vw,100px); align-items:center;
}
.or-what-label {
  display:inline-flex; align-items:center; gap:10px;
  font-size:.58rem; font-weight:700; letter-spacing:.3em; text-transform:uppercase;
  color:var(--or-c); margin-bottom:20px;
}
.or-what-label::before { content:''; width:28px; height:1px; background:var(--or-c); }
.or-what-title {
  font-family:var(--or-ffs);
  font-size:clamp(2.2rem,4vw,3.8rem); font-weight:400;
  color:var(--or-ink); line-height:1.1; letter-spacing:-.02em; margin-bottom:22px;
}
.or-what-title em { font-style:italic; color:var(--or-c); font-weight:300; }
.or-what-body { font-size:.9rem; color:var(--or-muted); line-height:1.9; margin-bottom:28px; }
.or-what-pillars { display:flex; flex-direction:column; gap:14px; }
.or-what-pillar {
  display:flex; align-items:flex-start; gap:14px;
  padding:16px 18px; border-radius:16px; border:1px solid var(--or-bd);
  background:var(--or-w); transition:border-color .25s, box-shadow .25s, transform .25s var(--or-sp);
}
.or-what-pillar:hover { border-color:rgba(239,119,106,.3); box-shadow:0 8px 28px rgba(0,0,0,.06); transform:translateX(6px); }
.or-what-pillar-icon { font-size:1.4rem; flex-shrink:0; margin-top:2px; }
.or-what-pillar-title { font-size:.8rem; font-weight:700; color:var(--or-ink); margin-bottom:3px; }
.or-what-pillar-desc { font-size:.74rem; color:var(--or-muted); line-height:1.6; }

/* Right side: visual stack */
.or-what-visual { position:relative; }
.or-what-img-main {
  width:100%; aspect-ratio:4/5; border-radius:24px; overflow:hidden;
  position:relative; box-shadow:0 32px 80px rgba(26,20,16,.18);
}
.or-what-img-main img { width:100%; height:100%; object-fit:cover; display:block; }
.or-what-img-main::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(to top,rgba(26,20,16,.4) 0%,transparent 60%);
}
.or-what-img-float {
  position:absolute; bottom:-24px; left:-24px;
  width:52%; aspect-ratio:1; border-radius:20px; overflow:hidden;
  border:4px solid var(--or-cream); box-shadow:0 16px 48px rgba(26,20,16,.18);
  animation:floatCard 5s ease-in-out infinite;
}
.or-what-img-float img { width:100%; height:100%; object-fit:cover; }
@keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.or-what-tag {
  position:absolute; top:22px; right:-16px;
  background:linear-gradient(135deg,var(--or-c),var(--or-cd));
  color:white; padding:10px 20px; border-radius:12px;
  font-size:.62rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
  box-shadow:0 8px 24px rgba(239,119,106,.45); writing-mode:initial;
}

/* ── PRODUCTS GRID ── */
.or-products {
  position:relative; z-index:1;
  padding:clamp(72px,8vw,120px) 0 clamp(80px,10vw,140px);
  background:var(--or-cream2);
}
.or-products::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,var(--or-goldl),transparent);
}
.or-products-inner { max-width:1400px; margin:0 auto; padding:0 clamp(22px,5vw,80px); }
.or-products-head {
  display:flex; align-items:flex-end; justify-content:space-between;
  margin-bottom:clamp(40px,6vw,72px); flex-wrap:wrap; gap:20px;
}
.or-products-title {
  font-family:var(--or-ffs);
  font-size:clamp(2rem,4vw,3.4rem); font-weight:400;
  color:var(--or-ink); letter-spacing:-.02em; line-height:1.05;
}
.or-products-title em { font-style:italic; font-weight:300; color:var(--or-c); }
.or-products-count {
  font-size:.72rem; color:var(--or-muted); letter-spacing:.08em;
  background:var(--or-w); border:1px solid var(--or-bd);
  padding:8px 18px; border-radius:999px;
}

/* Filter tabs */
.or-filters { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:clamp(28px,4vw,44px); }
.or-filter {
  padding:8px 20px; border-radius:999px; border:1.5px solid var(--or-bd);
  background:var(--or-w); font-family:var(--or-ff); font-size:.7rem; font-weight:600;
  letter-spacing:.06em; color:var(--or-muted); cursor:pointer;
  transition:all .2s var(--or-ea);
}
.or-filter:hover { border-color:var(--or-c); color:var(--or-c); }
.or-filter.active { background:var(--or-c); border-color:var(--or-c); color:white; }

/* Grid */
.or-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr));
  gap:clamp(20px,3vw,32px);
}

/* ── Product card (editorial style) ── */
.or-card {
  background:var(--or-w); border-radius:22px;
  border:1px solid var(--or-bd); overflow:hidden;
  transition:transform .44s var(--or-sp), box-shadow .44s var(--or-ea), border-color .3s;
  will-change:transform;
  opacity:0; transform:translateY(32px);
  animation:cardReveal .65s var(--or-ex) both;
}
@keyframes cardReveal { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:none} }
.or-card:hover {
  transform:translateY(-12px) scale(1.013);
  box-shadow:0 36px 80px rgba(26,20,16,.14),0 4px 20px rgba(26,20,16,.06);
  border-color:transparent;
}
.or-card:active { transform:translateY(-6px) scale(.997); }

/* Image */
.or-card-img-wrap {
  position:relative; aspect-ratio:3/4; overflow:hidden;
  background:var(--or-cream); display:block; text-decoration:none;
}
.or-card-img {
  width:100%; height:100%; object-fit:cover; object-position:center top;
  display:block; filter:brightness(.97);
  transition:transform .75s var(--or-ea),filter .5s;
}
.or-card:hover .or-card-img { transform:scale(1.09); filter:brightness(1.04); }
.or-card-overlay {
  position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(to top,rgba(26,20,16,.55) 0%,rgba(26,20,16,.08) 40%,transparent 70%);
  opacity:0; transition:opacity .4s var(--or-ea);
}
.or-card:hover .or-card-overlay { opacity:1; }

/* Badge on image */
.or-card-badge {
  position:absolute; top:14px; left:14px; z-index:3;
  display:inline-flex; align-items:center; gap:6px;
  padding:5px 14px; border-radius:999px;
  background:linear-gradient(135deg,var(--or-c),var(--or-cd));
  color:white; font-size:.56rem; font-weight:800;
  letter-spacing:.1em; text-transform:uppercase;
  box-shadow:0 3px 14px rgba(239,119,106,.45);
  animation:badgePop .4s var(--or-sp) .3s both;
}
@keyframes badgePop { from{transform:scale(0) rotate(-10deg);opacity:0} to{transform:none;opacity:1} }
.or-card-badge-dot { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,.8); }

.or-card-badge-best {
  position:absolute; top:14px; right:14px; z-index:3;
  background:linear-gradient(135deg,var(--or-gold),#A8852A);
  display:inline-flex; align-items:center; gap:5px;
  padding:5px 13px; border-radius:999px; color:white;
  font-size:.54rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
  box-shadow:0 3px 12px rgba(200,168,106,.5);
}

/* Wish */
.or-card-wish {
  position:absolute; top:14px; right:14px; z-index:4;
  width:36px; height:36px; border-radius:50%; border:none;
  background:rgba(255,255,255,.9); backdrop-filter:blur(10px);
  color:var(--or-muted); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transform:scale(.8) translateY(-4px);
  transition:opacity .26s,transform .26s var(--or-sp),color .2s,background .2s;
  box-shadow:0 2px 14px rgba(0,0,0,.1);
}
.or-card:hover .or-card-wish { opacity:1; transform:scale(1) translateY(0); }
.or-card-wish:hover { background:white; color:var(--or-c); transform:scale(1.14) !important; }
.or-card-wish.wished { color:var(--or-c); background:#FFF0EE; }

/* Quick add on hover */
.or-card-quick {
  position:absolute; bottom:0; left:0; right:0;
  padding:14px 14px 13px;
  background:linear-gradient(to top,rgba(26,20,16,.6) 0%,transparent 100%);
  transform:translateY(100%); opacity:0;
  transition:transform .36s var(--or-sp),opacity .26s; z-index:4;
}
.or-card:hover .or-card-quick { transform:translateY(0); opacity:1; }
.or-card-qbtn {
  width:100%; padding:11px 16px; border-radius:999px; border:none;
  background:white; color:var(--or-ink); font-family:var(--or-ff);
  font-size:.69rem; font-weight:700; letter-spacing:.07em; text-transform:uppercase;
  cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
  transition:background .2s,transform .14s var(--or-sp),box-shadow .2s;
  position:relative; overflow:hidden;
}
.or-card-qbtn:hover { background:var(--or-c); color:white; transform:scale(1.02); box-shadow:0 6px 22px rgba(239,119,106,.42); }
.or-card-qbtn.added { background:#1B5E20 !important; color:white !important; }
.or-chk { stroke-dasharray:24; stroke-dashoffset:24; }
.or-card-qbtn.added .or-chk { animation:chkDraw .3s var(--or-ea) both; }
@keyframes chkDraw { to{stroke-dashoffset:0} }
.or-rip { position:absolute; border-radius:50%; background:rgba(255,255,255,.36); width:10px; height:10px; margin:-5px 0 0 -5px; animation:rip .5s var(--or-ea) forwards; pointer-events:none; }
@keyframes rip { from{transform:scale(0);opacity:.5} to{transform:scale(4);opacity:0} }

/* Card body */
.or-card-body {
  padding:clamp(14px,2vw,20px); display:flex; flex-direction:column; gap:0;
}
.or-card-meta { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
.or-card-cat {
  font-size:.54rem; font-weight:800; letter-spacing:.18em; text-transform:uppercase; color:var(--or-c);
}
.or-card-stars { font-size:.56rem; color:var(--or-gold); letter-spacing:1px; }
.or-card-stars span { color:var(--or-muted); font-size:.52rem; margin-left:3px; }
.or-card-name {
  font-family:var(--or-ffs); font-size:clamp(1.08rem,1.8vw,1.24rem);
  font-weight:600; color:var(--or-ink); letter-spacing:-.01em; line-height:1.2;
  margin-bottom:6px; text-decoration:none; display:block; transition:color .2s;
}
.or-card:hover .or-card-name { color:var(--or-c); }
.or-card-desc {
  font-size:.72rem; color:var(--or-muted); line-height:1.65;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
  margin-bottom:14px;
}
/* Scent note teaser */
.or-card-note {
  display:flex; align-items:center; gap:6px;
  padding:7px 11px; border-radius:10px;
  background:var(--or-cream); border:1px solid var(--or-bd);
  margin-bottom:14px; transition:border-color .25s;
}
.or-card:hover .or-card-note { border-color:rgba(239,119,106,.18); }
.or-card-note-icon { font-size:.85rem; flex-shrink:0; }
.or-card-note-txt { font-size:.64rem; color:var(--or-muted); line-height:1.4; }
.or-card-note-txt b { color:var(--or-ink); font-weight:600; }

/* Divider */
.or-card-div { height:1px; background:var(--or-bd); margin-bottom:13px; position:relative; overflow:hidden; }
.or-card-div::after { content:''; position:absolute; top:0; left:0; height:100%; width:0%; background:linear-gradient(90deg,var(--or-c),var(--or-gold)); transition:width .55s var(--or-ea); }
.or-card:hover .or-card-div::after { width:100%; }

/* Footer */
.or-card-foot { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.or-card-price {
  font-family:var(--or-ffs); font-size:clamp(1.2rem,2vw,1.38rem);
  font-weight:600; color:var(--or-ink); letter-spacing:-.01em; line-height:1;
}
.or-card-price-cur { font-family:var(--or-ff); font-size:.68rem; font-weight:700; color:var(--or-muted); margin-left:3px; }
.or-card-ship { font-size:.56rem; font-weight:600; color:#2E7D32; margin-top:2px; }
.or-card-addbtn {
  width:42px; height:42px; border-radius:50%; border:none; flex-shrink:0;
  background:linear-gradient(135deg,var(--or-c),var(--or-cd));
  color:white; display:flex; align-items:center; justify-content:center;
  cursor:pointer; transition:transform .22s var(--or-sp),box-shadow .22s;
  box-shadow:0 4px 16px rgba(239,119,106,.4); position:relative; overflow:hidden;
}
.or-card-addbtn:hover { transform:scale(1.18) rotate(90deg); box-shadow:0 8px 28px rgba(239,119,106,.54); }
.or-card-addbtn:active { transform:scale(.95) rotate(90deg); }
.or-card-addbtn.card-added { background:linear-gradient(135deg,#2E7D32,#1B5E20); box-shadow:0 4px 14px rgba(46,125,50,.35); animation:cardAddPop .4s var(--or-sp) both; }
@keyframes cardAddPop { 0%{transform:scale(1)} 40%{transform:scale(1.28)} 100%{transform:scale(1)} }

/* ── FEATURED (large card) ── */
.or-featured {
  position:relative; z-index:1;
  padding:clamp(60px,8vw,100px) 0;
  background:var(--or-ink);
  overflow:hidden;
}
.or-featured::before {
  content:''; position:absolute; inset:0;
  background:
    radial-gradient(ellipse 60% 80% at 80% 50%,rgba(200,168,106,.1) 0%,transparent 70%),
    radial-gradient(ellipse 40% 60% at 20% 50%,rgba(239,119,106,.08) 0%,transparent 70%);
}
.or-featured-inner {
  position:relative; z-index:1;
  max-width:1400px; margin:0 auto;
  padding:0 clamp(22px,5vw,80px);
  display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,6vw,80px); align-items:center;
}
.or-featured-label {
  font-size:.58rem; font-weight:700; letter-spacing:.32em; text-transform:uppercase;
  color:rgba(200,168,106,.75); margin-bottom:18px;
  display:flex; align-items:center; gap:10px;
}
.or-featured-label::after { content:''; flex:1; max-width:40px; height:1px; background:rgba(200,168,106,.4); }
.or-featured-title {
  font-family:var(--or-ffs);
  font-size:clamp(2.2rem,4.5vw,4rem); font-weight:400;
  color:white; letter-spacing:-.02em; line-height:1.05; margin-bottom:16px;
}
.or-featured-title em { font-style:italic; color:var(--or-gold); font-weight:300; }
.or-featured-desc { font-size:.88rem; color:rgba(255,255,255,.52); line-height:1.85; margin-bottom:28px; }
.or-featured-notes { display:flex; flex-direction:column; gap:10px; margin-bottom:32px; }
.or-featured-note {
  display:flex; align-items:flex-start; gap:12px;
  padding:12px 16px; border-radius:12px;
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
}
.or-featured-note-icon { font-size:1rem; flex-shrink:0; margin-top:1px; }
.or-featured-note-type { font-size:.56rem; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(200,168,106,.7); margin-bottom:2px; }
.or-featured-note-val { font-size:.78rem; color:rgba(255,255,255,.65); }
.or-featured-price {
  font-family:var(--or-ffs); font-size:2.6rem; font-weight:300;
  color:white; letter-spacing:-.02em; margin-bottom:22px;
}
.or-featured-price span { font-size:1rem; font-weight:400; color:rgba(255,255,255,.45); margin-left:6px; font-family:var(--or-ff); }
.or-featured-img-wrap {
  position:relative; border-radius:28px; overflow:hidden;
  aspect-ratio:3/4; box-shadow:0 40px 100px rgba(0,0,0,.5);
}
.or-featured-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
.or-featured-img-wrap::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(to top,rgba(26,20,16,.5) 0%,transparent 60%);
}
.or-featured-corner {
  position:absolute; bottom:24px; left:24px; z-index:2;
  background:rgba(255,255,255,.08); backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.12); border-radius:16px; padding:14px 18px;
}
.or-featured-corner-tag { font-size:.54rem; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:rgba(200,168,106,.8); margin-bottom:4px; }
.or-featured-corner-name { font-family:var(--or-ffs); font-size:1.1rem; font-weight:400; color:white; }

/* ── MANIFESTO ── */
.or-manifesto {
  position:relative; z-index:1;
  padding:clamp(80px,10vw,140px) 0;
  background:var(--or-cream);
  text-align:center;
}
.or-manifesto-inner { max-width:900px; margin:0 auto; padding:0 clamp(22px,5vw,60px); }
.or-manifesto-ornament { font-family:var(--or-ffs); font-size:5rem; color:var(--or-gold); opacity:.2; line-height:1; margin-bottom:-16px; display:block; }
.or-manifesto-quote {
  font-family:var(--or-ffs); font-size:clamp(1.6rem,3.5vw,2.8rem); font-weight:400;
  color:var(--or-ink); letter-spacing:-.01em; line-height:1.42;
  margin-bottom:22px; font-style:italic;
}
.or-manifesto-author { font-size:.72rem; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--or-c); }

/* ── LOADER ── */
.or-loader {
  min-height:100vh; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:20px;
  background:var(--or-cream);
}
.or-loader-ring {
  width:52px; height:52px;
  border:2.5px solid rgba(200,168,106,.25);
  border-top-color:var(--or-gold);
  border-radius:50%; animation:spin .8s linear infinite;
}
@keyframes spin { to{transform:rotate(360deg)} }
.or-loader-txt { font-family:var(--or-ffs); font-size:1.1rem; color:var(--or-muted); font-style:italic; }

/* ── EMPTY ── */
.or-empty {
  text-align:center; padding:80px 24px;
  font-family:var(--or-ff);
}
.or-empty-icon { font-size:3rem; opacity:.3; margin-bottom:16px; }
.or-empty-title { font-family:var(--or-ffs); font-size:1.8rem; font-weight:400; color:var(--or-ink); margin-bottom:10px; }
.or-empty-sub { font-size:.88rem; color:var(--or-muted); }

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .or-what-inner { grid-template-columns:1fr; }
  .or-what-visual { display:none; }
  .or-featured-inner { grid-template-columns:1fr; }
  .or-featured-img-wrap { aspect-ratio:16/9; }
  .or-hero-stats { display:none; }
}
@media(max-width:768px){
  .or-hero-title { font-size:clamp(3rem,12vw,5rem); }
  .or-grid { grid-template-columns:repeat(2,1fr); gap:14px; }
  .or-scroll-ind { display:none; }
  .or-products-head { flex-direction:column; align-items:flex-start; }
}
@media(max-width:480px){
  .or-grid { grid-template-columns:1fr; gap:18px; }
  .or-card-body { padding:13px; }
  .or-card-desc { -webkit-line-clamp:1; }
  .or-card-note { display:none; }
}
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-originals-css")) {
    const s = document.createElement("style");
    s.id = "nahid-originals-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/* ── Parse main note from scent_notes ── */
function parseMainNote(raw) {
  if (!raw) return null;
  const m = raw.match(/t[êe]te\s*[:：](.*?)(?:\||$)/i);
  if (!m) return null;
  return m[1].replace(/[🌹🌿🌙💧🍊🏜️🪵🍦🍫🤍🔥⭐]/g, "").trim().split(",").slice(0, 2).join(", ");
}
function parseCoeur(raw) {
  if (!raw) return null;
  const m = raw.match(/c[oœ]eur\s*[:：](.*?)(?:\||$)/i);
  if (!m) return null;
  return m[1].replace(/[🌹🌿🌙💧🍊🏜️🪵🍦🍫🤍🔥⭐]/g, "").trim();
}
function parseFond(raw) {
  if (!raw) return null;
  const m = raw.match(/fond\s*[:：](.*?)(?:\||$)/i);
  if (!m) return null;
  return m[1].replace(/[🌹🌿🌙💧🍊🏜️🪵🍦🍫🤍🔥⭐]/g, "").trim();
}

/* ── Individual Card ── */
const OriginalCard = ({ product, addToCart, delay = 0, isBest = false }) => {
  const [added,  setAdded]  = useState(false);
  const [wished, setWished] = useState(false);
  const qbtnRef = useRef(null);

  const price    = parseFloat(product.price) || 0;
  const isOut    = product.stock === 0;
  const isLow    = product.stock > 0 && product.stock < 5;
  const mainNote = parseMainNote(product.scent_notes);

  const ripple = (e, el) => {
    const r = el.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "or-rip";
    span.style.left = `${e.clientX - r.left}px`;
    span.style.top  = `${e.clientY - r.top}px`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 550);
  };

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (isOut) return;
    if (qbtnRef.current) ripple(e, qbtnRef.current);
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="or-card" style={{ animationDelay: `${delay}s` }}>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="or-card-img-wrap">
        <img className="or-card-img" src={product.image_url} alt={product.name} loading="lazy" />
        <div className="or-card-overlay" />

        <span className="or-card-badge"><span className="or-card-badge-dot" />✦ Original</span>
        {isBest && <span className="or-card-badge-best">🔥 Best</span>}
        {isLow && !isBest && <span className="or-card-badge-best" style={{ background:"linear-gradient(135deg,#EF776A,#D35F52)" }}>Dernières pièces</span>}

        <button className={`or-card-wish${wished ? " wished" : ""}`} onClick={e => { e.preventDefault(); e.stopPropagation(); setWished(w => !w); }} aria-label="Favoris">
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {!isOut && (
          <div className="or-card-quick">
            <button ref={qbtnRef} className={`or-card-qbtn${added ? " added" : ""}`} onClick={handleAdd}>
              {added
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline className="or-chk" points="20 6 9 17 4 12"/></svg>Ajouté !</>
                : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Ajouter au panier</>
              }
            </button>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="or-card-body">
        <div className="or-card-meta">
          <span className="or-card-cat">{product.category || "Original"}</span>
          <div className="or-card-stars">★★★★★<span>(4.9)</span></div>
        </div>

        <Link to={`/product/${product.id}`} className="or-card-name">{product.name}</Link>

        {product.description && (
          <p className="or-card-desc">{product.description}</p>
        )}

        {mainNote && (
          <div className="or-card-note">
            <span className="or-card-note-icon">🌿</span>
            <span className="or-card-note-txt"><b>Notes de tête :</b> {mainNote}</span>
          </div>
        )}

        <div className="or-card-div" />

        <div className="or-card-foot">
          <div>
            <div className="or-card-price">
              {Math.round(price).toLocaleString("fr-MA")}
              <span className="or-card-price-cur">MAD</span>
            </div>
            <div className="or-card-ship">✓ Livraison gratuite</div>
          </div>

          {!isOut ? (
            <button className={`or-card-addbtn${added ? " card-added" : ""}`} onClick={handleAdd} aria-label="Ajouter">
              {added
                ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              }
            </button>
          ) : (
            <span style={{ fontSize:".66rem", fontStyle:"italic", color:"var(--or-muted)" }}>Épuisé</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
const OriginalsPage = ({ addToCart }) => {
  injectCSS();

  const [products, setProducts]     = useState([]);
  const [loading,  setLoading]      = useState(true);
  const [filter,   setFilter]       = useState("Tous");

  useEffect(() => {
    axios.get("/api/products")
      .then(r => {
        const all = Array.isArray(r.data) ? r.data : [];
        const originals = all.filter(p =>
          p.product_type === "Original" ||
          p.category === "Originals"
        );
        setProducts(originals);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  /* Filter by scent family */
  const families = ["Tous", ...new Set(products.map(p => p.scent_family).filter(Boolean))];
  const FAMILY_LABELS = { flowery:"🌸 Fleuri", fresh:"🍃 Frais", gourmand:"🍫 Gourmand", herbal:"🌿 Herbal", earthy:"🌍 Terreux", warm:"🔥 Chaud" };
  const filtered = filter === "Tous" ? products : products.filter(p => p.scent_family === filter);

  /* Featured = first bestseller or first product */
  const featured = products.find(p => p.is_bestseller) || products[0];
  const gridProducts = filtered.filter(p => p.id !== featured?.id);

  if (loading) return (
    <>
      <style>{CSS}</style>
      <div className="or-loader">
        <div className="or-loader-ring" />
        <p className="or-loader-txt">Chargement des Originals…</p>
      </div>
    </>
  );

  return (
    <div className="or-page">

      {/* ════ HERO ════ */}
      <section className="or-hero">
        <div className="or-hero-bg" />
        <div className="or-hero-grain" />

        {/* Right: stats */}
        <div className="or-hero-stats">
          {[
            { num: products.length, lbl: "Créations" },
            { num: "100%", lbl: "Marocain" },
            { num: "4.9★", lbl: "Note clients" },
          ].map((s, i) => (
            <div className="or-stat" key={i}>
              <div className="or-stat-num">{s.num}</div>
              <div className="or-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="or-hero-inner">
          <div className="or-hero-eyebrow">
            <div className="or-hero-eyebrow-line" />
            <span className="or-hero-eyebrow-txt">Maison Nahid · Casablanca</span>
          </div>

          <h1 className="or-hero-title">
            <span className="or-hero-title-line">Nahid</span>
            <span className="or-hero-title-line"><em>Originals</em></span>
          </h1>

          <p className="or-hero-sub">
            Chaque fragrance Nahid Original est une création exclusive, imaginée et formulée dans notre atelier de Casablanca. Des essences rares, des accords uniques — une signature que vous ne trouverez nulle part ailleurs.
          </p>

          <div className="or-hero-cta">
            <a href="#collection" className="or-btn-primary">
              Découvrir la collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <button className="or-btn-ghost-w" onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior:"smooth" })}>
              Voir les {products.length} créations →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="or-scroll-ind">
          <div className="or-scroll-line" />
          <span className="or-scroll-txt">Défiler</span>
        </div>
      </section>

      {/* ════ WHAT IS ORIGINAL ════ */}
      <section className="or-what">
        <div className="or-what-inner">
          <div>
            <div className="or-what-label">Notre philosophie</div>
            <h2 className="or-what-title">
              L'art de créer<br />l'<em>inoubliable</em>
            </h2>
            <p className="or-what-body">
              Un parfum Original Nahid n'est pas une interprétation. C'est une vision — née du patrimoine olfactif marocain, des souks de Marrakech, des jardins de roses de Kelaat M'Gouna, et du talent de nos maîtres parfumeurs.
            </p>
            <div className="or-what-pillars">
              {[
                { icon:"🌹", title:"Ingrédients rares", desc:"Rose de Damas, Oud du Camboge, Ambre gris — nous sélectionnons les matières les plus précieuses." },
                { icon:"🧪", title:"Formulation exclusive", desc:"Chaque accord est conçu et breveté dans notre laboratoire de Casablanca." },
                { icon:"✦", title:"Signature unique", desc:"Un Original Nahid se reconnaît — une identité olfactive que vous ne trouverez nulle part ailleurs." },
              ].map(p => (
                <div className="or-what-pillar" key={p.title}>
                  <div className="or-what-pillar-icon">{p.icon}</div>
                  <div>
                    <div className="or-what-pillar-title">{p.title}</div>
                    <div className="or-what-pillar-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="or-what-visual">
            <div className="or-what-tag">✦ Exclusif</div>
            <div className="or-what-img-main">
              <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=85" alt="Atelier Nahid" />
            </div>
            <div className="or-what-img-float">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=85" alt="Parfum" />
            </div>
          </div>
        </div>
      </section>

      {/* ════ FEATURED PRODUCT ════ */}
      {featured && (
        <section className="or-featured">
          <div className="or-featured-inner">
            <div>
              <div className="or-featured-label">Création phare</div>
              <h2 className="or-featured-title">
                {featured.name.split(" ").slice(0, 2).join(" ")}<br />
                <em>{featured.name.split(" ").slice(2).join(" ") || featured.category}</em>
              </h2>
              <p className="or-featured-desc">{featured.description}</p>

              {featured.scent_notes && (
                <div className="or-featured-notes">
                  {[
                    { type:"Notes de tête", icon:"🌿", val:parseMainNote(featured.scent_notes) },
                    { type:"Notes de cœur", icon:"🌸", val:parseCoeur(featured.scent_notes) },
                    { type:"Notes de fond", icon:"🪵", val:parseFond(featured.scent_notes) },
                  ].filter(n => n.val).map(n => (
                    <div className="or-featured-note" key={n.type}>
                      <span className="or-featured-note-icon">{n.icon}</span>
                      <div>
                        <div className="or-featured-note-type">{n.type}</div>
                        <div className="or-featured-note-val">{n.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="or-featured-price">
                {Math.round(parseFloat(featured.price)).toLocaleString("fr-MA")}
                <span>MAD</span>
              </div>

              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                <Link to={`/product/${featured.id}`} className="or-btn-primary">
                  Voir le détail
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <button
                  onClick={() => addToCart(featured, 1)}
                  style={{ padding:"14px 26px", borderRadius:"999px", border:"1.5px solid rgba(255,255,255,.2)", background:"none", color:"rgba(255,255,255,.75)", cursor:"pointer", fontFamily:"var(--or-ff)", fontSize:".72rem", fontWeight:"600", letterSpacing:".08em", textTransform:"uppercase", transition:"all .2s" }}
                  onMouseOver={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.5)"; e.currentTarget.style.color="white"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.2)"; e.currentTarget.style.color="rgba(255,255,255,.75)"; }}
                >
                  + Ajouter au panier
                </button>
              </div>
            </div>

            <div className="or-featured-img-wrap">
              <img src={featured.image_url} alt={featured.name} />
              <div className="or-featured-corner">
                <div className="or-featured-corner-tag">✦ Nahid Original</div>
                <div className="or-featured-corner-name">{featured.name}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════ PRODUCT GRID ════ */}
      <section className="or-products" id="collection">
        <div className="or-products-inner">
          <div className="or-products-head">
            <div>
              <h2 className="or-products-title">
                Toutes les<br /><em>créations</em>
              </h2>
            </div>
            <div className="or-products-count">{filtered.length} parfum{filtered.length > 1 ? "s" : ""}</div>
          </div>

          {/* Filters */}
          {families.length > 2 && (
            <div className="or-filters">
              {families.map(f => (
                <button key={f} className={`or-filter${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}>
                  {f === "Tous" ? "Toutes les familles" : (FAMILY_LABELS[f] || f)}
                </button>
              ))}
            </div>
          )}

          {/* Featured card in grid too if visible */}
          {filtered.length === 0 ? (
            <div className="or-empty">
              <div className="or-empty-icon">🌸</div>
              <div className="or-empty-title">Aucune création trouvée</div>
              <div className="or-empty-sub">Essayez un autre filtre</div>
            </div>
          ) : (
            <div className="or-grid">
              {/* Show featured first if in current filter */}
              {featured && (filter === "Tous" || featured.scent_family === filter) && (
                <OriginalCard key={featured.id} product={featured} addToCart={addToCart} delay={0} isBest={!!featured.is_bestseller} />
              )}
              {gridProducts.map((p, i) => (
                <OriginalCard key={p.id} product={p} addToCart={addToCart} delay={(i + 1) * 0.07} isBest={!!p.is_bestseller} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════ MANIFESTO QUOTE ════ */}
      <section className="or-manifesto">
        <div className="or-manifesto-inner">
          <span className="or-manifesto-ornament">❝</span>
          <p className="or-manifesto-quote">
            Un parfum Original Nahid n'est pas un produit. C'est un souvenir que vous n'avez pas encore vécu.
          </p>
          <div className="or-manifesto-author">— Maison Nahid Perfume · Casablanca</div>
        </div>
      </section>

    </div>
  );
};

export default OriginalsPage;