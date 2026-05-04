import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import BundleBuilder from "../components/BundleBuilder.jsx";
import ReviewsSection from "../components/ReviewsSection";
import PackOffersSection from "../components/PackOffersSection";
import NahidFooter from "../components/NahidFooter";


/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS — Nahid Perfume — Redesign 2026
═══════════════════════════════════════════════════════════ */
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:      #FBF8F3;
  --cream-2:    #F5EFE4;
  --cream-3:    #EDE5D8;
  --white:      #FFFFFF;
  --ink:        #1C1A16;
  --ink-2:      #3D3A33;
  --muted:      #8C8478;
  --gold:       #C8A96A;
  --gold-l:     #E9D6A9;
  --gold-xl:    #FAF3E3;
  --rose:       #D4857A;
  --rose-d:     #B86B60;
  --rose-l:     #F4E8E6;
  --rose-xl:    #FDF5F4;
  --border:     rgba(28,26,22,0.08);
  --border-2:   rgba(28,26,22,0.04);
  --serif:      'Cormorant Garamond', Georgia, serif;
  --sans:       'DM Sans', sans-serif;
  --ease:       cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --expo:       cubic-bezier(0.16, 1, 0.3, 1);
}

html { scroll-behavior: smooth; }
body { font-family: var(--sans); background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
img  { display: block; max-width: 100%; }
a    { text-decoration: none; color: inherit; }
button { font-family: var(--sans); cursor: pointer; border: none; background: none; }
.container { max-width: 1340px; margin: 0 auto; padding: 0 clamp(16px,5vw,80px); }

/* ── ANIMATIONS ──────────────────────────────────── */
@keyframes fadeUp    { from{opacity:0;transform:translateY(52px)} to{opacity:1;transform:none} }
@keyframes fadeLeft  { from{opacity:0;transform:translateX(52px)} to{opacity:1;transform:none} }
@keyframes scaleUp   { from{opacity:0;transform:scale(0.86)} to{opacity:1;transform:none} }
@keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
@keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes scrollPulse { 0%,100%{opacity:0.2;transform:scaleY(0.6)} 50%{opacity:1;transform:scaleY(1)} }
@keyframes rotateSlow  { from{transform:rotate(0)} to{transform:rotate(360deg)} }
@keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.25} }
@keyframes orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-28px) scale(1.06)} 66%{transform:translate(-28px,36px) scale(0.95)} }
@keyframes cardSheen { from{transform:translateX(-100%) skewX(-20deg)} to{transform:translateX(200%) skewX(-20deg)} }
@keyframes pulseRing { 0%{transform:scale(0.9);opacity:1} 100%{transform:scale(1.5);opacity:0} }
@keyframes goldPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }

/* scroll reveal */
.sr {
  opacity:0; transform:translateY(54px);
  transition:opacity 0.9s var(--expo), transform 0.9s var(--expo);
}
.sr.visible { opacity:1; transform:none; }
.sr.sr-left  { transform:translateX(-54px); }
.sr.sr-right { transform:translateX(54px); }
.sr.sr-scale { transform:scale(0.88); }
.sr.visible.sr-left,.sr.visible.sr-right,.sr.visible.sr-scale { transform:none; }
.sr.d1{transition-delay:0.1s} .sr.d2{transition-delay:0.2s}
.sr.d3{transition-delay:0.35s} .sr.d4{transition-delay:0.5s}
.sr.d5{transition-delay:0.65s}

/* ── ANNOUNCEMENT BAR ────────────────────────────── */
.ann-bar {
  background: linear-gradient(90deg, #3D2D1A 0%, #4A3520 50%, #3D2D1A 100%);
  color: rgba(232,210,169,0.7);
  font-family: var(--sans);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 12px 0;
  overflow: hidden;
  white-space: nowrap;
}
.ann-track {
  display: inline-flex;
  gap: 64px;
  animation: marquee 32s linear infinite;
}
.ann-track b { color: var(--gold); font-weight: 600; }
.ann-sep { color: var(--gold); opacity: 0.5; }

/* ── HERO ─────────────────────────────────────────── */
.hero {
  position: relative;
  height: 100vh;
  min-height: 640px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-video {
  position: absolute; inset: 0;
  width:100%; height:100%;
  object-fit: cover;
  filter: saturate(0.9);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    150deg,
    rgba(28,20,12,0.75) 0%,
    rgba(28,20,12,0.45) 50%,
    rgba(28,20,12,0.15) 100%
  );
}
.hero-overlay-2 {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(28,20,12,0.6) 0%, transparent 55%);
}

.hero-content {
  position:relative;z-index:4;
  color:white;
  width:100%;
  padding: 0 clamp(24px,6vw,100px) clamp(60px,10vh,120px);
  display:grid;
  grid-template-columns:1.4fr 1fr;
  align-items:flex-end;
  gap:40px;
}
.hero-eyebrow {
  display:inline-flex; align-items:center; gap:12px;
  font-size:0.62rem; font-weight:600; letter-spacing:0.36em; text-transform:uppercase;
  color: var(--gold-l);
  margin-bottom:24px;
  animation:fadeUp 0.8s var(--expo) 0.1s both;
}
.hero-eyebrow::before { content:''; width:40px; height:1px; background: linear-gradient(to right, transparent, var(--gold)); }
.hero-eyebrow::after  { content:''; width:40px; height:1px; background: linear-gradient(to left, transparent, var(--gold)); }

.hero-title {
  font-family: var(--serif);
  font-size: clamp(3.2rem,8vw,7rem);
  font-weight:600;
  line-height:0.95;
  letter-spacing:-0.01em;
  animation:fadeUp 0.9s var(--expo) 0.25s both;
}
.hero-title em {
  font-style:italic;
  font-weight:300;
  color: var(--gold-l);
  display:block;
}

.hero-actions {
  display:flex; gap:14px; flex-wrap:wrap;
  margin-top:38px;
  animation:fadeUp 0.9s var(--expo) 0.4s both;
}

/* Primary btn */
.btn-primary {
  display:inline-flex; align-items:center; gap:10px;
  background: linear-gradient(135deg, var(--rose) 0%, var(--rose-d) 100%);
  color:white;
  padding:16px 38px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.72rem; font-weight:700;
  letter-spacing:0.12em; text-transform:uppercase;
  transition:transform 0.3s var(--spring), box-shadow 0.3s;
  box-shadow:0 8px 32px rgba(212,133,122,0.5);
  position:relative; overflow:hidden;
}
.btn-primary::after {
  content:''; position:absolute;
  top:0;left:-100%; width:60%; height:100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
  skewX(-20deg);
  transition: left 0.5s;
}
.btn-primary:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 16px 40px rgba(212,133,122,0.6); }
.btn-primary:hover::after { left:140%; }

/* Ghost btn */
.btn-ghost {
  display:inline-flex; align-items:center; gap:10px;
  background:rgba(255,255,255,0.08);
  color:rgba(255,255,255,0.9);
  padding:16px 30px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.72rem; font-weight:600;
  letter-spacing:0.06em;
  border:1px solid rgba(255,255,255,0.22);
  backdrop-filter:blur(12px);
  transition:background 0.2s, transform 0.2s, border-color 0.2s;
}
.btn-ghost:hover { background:rgba(255,255,255,0.16); border-color:rgba(255,255,255,0.4); transform:translateY(-3px); }

.hero-right {
  display:flex; flex-direction:column; align-items:flex-start; gap:24px;
  padding-bottom:10px;
  animation:fadeLeft 0.9s var(--expo) 0.45s both;
}
.hero-badge {
  display:inline-flex; align-items:center; gap:10px;
  background:rgba(255,255,255,0.07);
  backdrop-filter:blur(14px);
  border:1px solid rgba(255,255,255,0.15);
  border-radius:999px; padding:12px 22px;
  font-size:0.7rem; font-weight:600;
  color:rgba(255,255,255,0.9);
}
.live-dot {
  width:7px; height:7px; border-radius:50%;
  background:#4ADE80;
  box-shadow:0 0 8px rgba(74,222,128,0.7);
  animation:blink 2s ease-in-out infinite;
}
.hero-sub {
  font-size:clamp(0.84rem,1.1vw,0.97rem);
  line-height:1.85;
  color:rgba(255,255,255,0.58);
  max-width:340px;
}

/* Scroll hint */
.hero-scroll-hint {
  position:absolute; right:clamp(22px,4vw,64px); top:50%;
  transform:translateY(-50%);
  display:flex; flex-direction:column; align-items:center; gap:12px;
  z-index:4;
}
.scroll-line {
  width:1px; height:70px;
  background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.45),transparent);
  animation:scrollPulse 2.4s ease-in-out infinite;
}
.scroll-label {
  font-size:0.5rem; font-weight:700; letter-spacing:0.3em;
  text-transform:uppercase; color:rgba(255,255,255,0.35);
  writing-mode:vertical-rl;
}

/* ── TRUST STRIP ──────────────────────────────────── */
.trust-strip {
  background: var(--cream-2);
  border-bottom:1px solid var(--border);
  border-top:1px solid var(--border);
}
.trust-inner {
  display:grid; grid-template-columns:repeat(4,1fr);
}
.trust-item {
  display:flex; align-items:center; justify-content:center; gap:16px;
  padding:26px 20px;
  border-right:1px solid var(--border);
  transition:background 0.25s, transform 0.25s;
  cursor:default;
  position:relative; overflow:hidden;
}
.trust-item::before {
  content:''; position:absolute; inset:0;
  background: linear-gradient(135deg, transparent 0%, rgba(200,169,106,0.06) 100%);
  opacity:0; transition:opacity 0.3s;
}
.trust-item:hover::before { opacity:1; }
.trust-item:last-child { border-right:none; }
.trust-icon-wrap {
  width:44px; height:44px; border-radius:50%;
  background: linear-gradient(135deg, var(--gold-xl), var(--cream));
  border:1px solid var(--gold-l);
  display:flex; align-items:center; justify-content:center;
  flex-shrink:0;
  font-size:18px;
  transition:transform 0.3s var(--spring);
}
.trust-item:hover .trust-icon-wrap { transform:scale(1.12) rotate(-5deg); }
.trust-text strong { display:block; font-size:0.76rem; font-weight:700; color:var(--ink); }
.trust-text span   { font-size:0.67rem; color:var(--muted); }

/* ── SECTION LABELS ───────────────────────────────── */
.eyebrow {
  display:inline-flex; align-items:center; gap:10px;
  font-size:0.6rem; font-weight:700; letter-spacing:0.3em; text-transform:uppercase;
  color:var(--rose); margin-bottom:16px;
}
.eyebrow::before,.eyebrow::after { content:''; width:24px; height:1px; background:var(--rose); opacity:0.6; }
.eyebrow-gold { color:var(--gold); }
.eyebrow-gold::before,.eyebrow-gold::after { background:var(--gold); }

/* ── CATEGORY CARDS ───────────────────────────────── */
/* ── CATEGORY SECTION — luxury 5-card grid ─────────── */

/* Reveal animation */
@keyframes catCardIn { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:none} }
@keyframes catSheen  { from{transform:translateX(-100%) skewX(-18deg)} to{transform:translateX(220%) skewX(-18deg)} }
@keyframes catOrb    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(12px,-8px) scale(1.04)} }
@keyframes catFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes catGoldPulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,169,106,0)} 50%{box-shadow:0 0 0 7px rgba(200,169,106,.18)} }
@keyframes catCoralPulse { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0)} 50%{box-shadow:0 0 0 7px rgba(239,119,106,.18)} }

.cat-section {
  padding: clamp(80px,10vw,140px) 0;
  background: var(--cream);
  position: relative;
  overflow: hidden;
}
.cat-section::before {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:0; opacity:.16;
  background-image:
    repeating-linear-gradient(0deg,transparent,transparent 32px,rgba(200,169,106,.07) 32px,rgba(200,169,106,.07) 33px),
    repeating-linear-gradient(90deg,transparent,transparent 32px,rgba(200,169,106,.05) 32px,rgba(200,169,106,.05) 33px);
}
.cat-section-inner {
  max-width: 1480px; margin:0 auto;
  padding: 0 clamp(18px,4vw,64px);
  position: relative; z-index:1;
}

/* ── Section header ── */
.cat-section-header {
  display:flex; align-items:flex-end; justify-content:space-between;
  margin-bottom: clamp(36px,5vw,60px); flex-wrap:wrap; gap:18px;
}
.cat-section-title {
  font-family: var(--serif);
  font-size: clamp(2rem,4.5vw,3.4rem);
  font-weight: 400; color: var(--ink);
  letter-spacing: -.02em; line-height: 1.08;
}
.cat-section-title em { font-style:italic; font-weight:300; color:var(--coral); }
.cat-section-link {
  display:inline-flex; align-items:center; gap:8px;
  font-size:.72rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
  color:var(--muted); text-decoration:none; padding:10px 22px; border-radius:999px;
  border:1.5px solid var(--border); background:var(--white);
  transition:color .2s, border-color .2s, gap .2s, transform .25s var(--spring);
  white-space:nowrap; flex-shrink:0;
}
.cat-section-link:hover { color:var(--coral); border-color:var(--coral); gap:12px; transform:translateY(-2px); }

/* ── 5-card grid ── */
.cat-grid {
  display:grid;
  grid-template-columns: repeat(5,1fr);
  gap: clamp(10px,1.5vw,18px);
}

/* ── Base card ── */
.cat-card {
  position:relative; border-radius:22px; overflow:hidden;
  text-decoration:none; display:block;
  background: var(--cream-2);
  border:1px solid var(--border);
  will-change:transform;
  transition:transform .46s var(--spring), box-shadow .46s var(--ease), border-color .3s;
  cursor:pointer;
  aspect-ratio:3/4;
  opacity:0; transform:translateY(44px);
}
.cat-card.cat-visible { animation:catCardIn .72s var(--expo) both; }
.cat-card:hover {
  transform:translateY(-14px) scale(1.016);
  box-shadow:0 40px 90px rgba(14,13,11,.16),0 6px 22px rgba(14,13,11,.07);
  border-color:transparent;
}
.cat-card:active { transform:translateY(-7px) scale(.997); }

/* Image */
.cat-card-img {
  position:absolute; inset:0; width:100%; height:100%;
  object-fit:cover; object-position:center top; display:block;
  filter:brightness(.93) saturate(.96);
  transition:transform .8s var(--ease), filter .6s;
}
.cat-card:hover .cat-card-img { transform:scale(1.09); filter:brightness(1.02) saturate(1.06); }

/* Overlay */
.cat-card-overlay-bot {
  position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(to top,rgba(14,13,11,.82) 0%,rgba(14,13,11,.22) 42%,transparent 70%);
  transition:opacity .4s;
}
.cat-card:hover .cat-card-overlay-bot { opacity:1; }

/* Top area */
.cat-card-top {
  position:absolute; top:14px; left:14px; right:14px; z-index:3;
  display:flex; align-items:flex-start; justify-content:space-between;
}
.cat-card-tag {
  display:inline-flex; align-items:center; gap:5px; padding:5px 13px; border-radius:999px;
  font-size:.56rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase;
  backdrop-filter:blur(10px); background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.26);
  color:rgba(255,255,255,.9); transition:background .25s,border-color .25s;
}
.cat-card:hover .cat-card-tag { background:rgba(255,255,255,.28); border-color:rgba(255,255,255,.4); }
.cat-tag-dot { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,.8); flex-shrink:0; }
.cat-tag-gold { background:rgba(200,169,106,.22); border-color:rgba(200,169,106,.45); color:var(--gold-l); animation:catGoldPulse 3s ease infinite; }
.cat-tag-gold .cat-tag-dot { background:var(--gold-l); }
.cat-tag-coral { background:rgba(239,119,106,.22); border-color:rgba(239,119,106,.45); color:rgba(255,215,210,.95); animation:catCoralPulse 3s ease infinite; }
.cat-tag-coral .cat-tag-dot { background:var(--coral-xl); }
.cat-card-count-badge {
  font-size:.58rem; font-weight:700; color:rgba(255,255,255,.62);
  padding:4px 10px; border-radius:999px; background:rgba(0,0,0,.22);
  backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.12);
}

/* Bottom body */
.cat-card-body {
  position:absolute; bottom:0; left:0; right:0; z-index:3;
  padding:clamp(16px,2.5vw,26px); display:flex; flex-direction:column; gap:4px;
}
.cat-card-line {
  width:0; height:1.5px;
  background:linear-gradient(90deg,var(--coral),var(--gold));
  border-radius:999px; margin-bottom:8px; transition:width .52s var(--expo);
}
.cat-card:hover .cat-card-line { width:50px; }
.cat-card-name {
  font-family:var(--serif); font-size:clamp(1.5rem,3vw,2.2rem); font-weight:400;
  color:white; letter-spacing:-.01em; line-height:1.05; transition:transform .3s var(--expo);
}
.cat-card:hover .cat-card-name { transform:translateY(-2px); }
.cat-card-sub {
  font-size:.68rem; font-weight:500; color:rgba(255,255,255,.52);
  letter-spacing:.04em; transition:color .25s;
}
.cat-card:hover .cat-card-sub { color:rgba(255,255,255,.72); }
.cat-card-cta-row {
  display:flex; align-items:center; gap:9px; margin-top:10px;
  opacity:0; transform:translateY(12px); transition:opacity .32s var(--expo),transform .32s var(--expo);
}
.cat-card:hover .cat-card-cta-row { opacity:1; transform:none; }
.cat-card-cta {
  display:inline-flex; align-items:center; gap:8px; padding:10px 22px; border-radius:999px;
  background:var(--coral); color:white; font-size:.68rem; font-weight:700;
  letter-spacing:.09em; text-transform:uppercase;
  position:relative; overflow:hidden;
  transition:transform .25s var(--spring),box-shadow .25s,background .2s;
  box-shadow:0 5px 20px rgba(239,119,106,.45);
}
.cat-card-cta::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.22) 50%,transparent 65%);
  transform:translateX(-100%) skewX(-15deg); transition:transform .5s var(--ease);
}
.cat-card:hover .cat-card-cta::after { transform:translateX(180%) skewX(-15deg); }
.cat-card-cta:hover { transform:scale(1.04); box-shadow:0 8px 28px rgba(239,119,106,.56); background:var(--coral-d); }
.cat-card-ghost {
  font-size:.64rem; font-weight:600; color:rgba(255,255,255,.55); letter-spacing:.06em;
  display:flex; align-items:center; gap:5px; transition:color .2s,gap .2s;
}
.cat-card:hover .cat-card-ghost { color:rgba(255,255,255,.82); gap:8px; }

/* ── ORIGINALS special ── */
.cat-card-orig { border-color:rgba(200,169,106,.3); }
.cat-card-orig::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px; z-index:5;
  background:linear-gradient(90deg,transparent,var(--gold),var(--coral),var(--gold),transparent);
  animation:catSheen 4s linear infinite;
}
.cat-card-orig:hover { border-color:rgba(200,169,106,.55); box-shadow:0 40px 90px rgba(14,13,11,.22),0 6px 22px rgba(200,169,106,.16),0 0 0 1px rgba(200,169,106,.3); }
.cat-card-orig .cat-card-overlay-bot { background:linear-gradient(to top,rgba(14,11,4,.9) 0%,rgba(14,11,4,.28) 42%,rgba(200,169,106,.07) 72%,transparent 100%); }
.cat-card-orig .cat-card-line { background:linear-gradient(90deg,var(--gold),var(--coral)); }
.cat-card-orig .cat-card-cta { background:linear-gradient(135deg,var(--gold),#A8883E); color:var(--ink); box-shadow:0 5px 20px rgba(200,169,106,.45); }
.cat-card-orig .cat-card-cta:hover { box-shadow:0 8px 28px rgba(200,169,106,.58); }
.cat-orb {
  position:absolute; width:180px; height:180px; top:-50px; right:-50px; border-radius:50%;
  background:radial-gradient(circle,rgba(200,169,106,.24),transparent 72%);
  pointer-events:none; z-index:1; animation:catOrb 12s ease-in-out infinite;
}

/* ── BEST-SELLERS special ── */
.cat-card-best { border-color:rgba(239,119,106,.22); }
.cat-card-best::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px; z-index:5;
  background:linear-gradient(90deg,transparent,var(--coral),var(--gold),var(--coral),transparent);
  animation:catSheen 3.5s linear infinite;
}
.cat-card-best:hover { border-color:rgba(239,119,106,.5); box-shadow:0 40px 90px rgba(14,13,11,.22),0 6px 22px rgba(239,119,106,.12),0 0 0 1px rgba(239,119,106,.25); }
.cat-rank-badge {
  position:absolute; bottom:clamp(72px,12vw,92px); right:18px; z-index:4;
  width:48px; height:48px; border-radius:50%;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white; display:flex; align-items:center; justify-content:center;
  font-family:var(--serif); font-size:1.15rem; font-weight:700;
  box-shadow:0 6px 22px rgba(239,119,106,.5);
  animation:catFloat 3.5s ease-in-out infinite;
  transition:transform .3s var(--spring);
}
.cat-card-best:hover .cat-rank-badge { transform:scale(1.12) rotate(8deg); }

/* animation delays */
.cat-d1 { animation-delay:.05s; }
.cat-d2 { animation-delay:.14s; }
.cat-d3 { animation-delay:.22s; }
.cat-d4 { animation-delay:.30s; }
.cat-d5 { animation-delay:.38s; }

/* ── Responsive ── */
@media(max-width:1200px) {
  .cat-grid { grid-template-columns:repeat(3,1fr); }
  .cat-card-orig { grid-column:1/span 2; aspect-ratio:16/9; }
}
@media(max-width:860px) {
  .cat-grid { grid-template-columns:1fr 1fr; gap:clamp(8px,2vw,14px); }
  .cat-card-orig { grid-column:2; aspect-ratio:3/4; }
  .cat-card-best { grid-column:1/span 2; aspect-ratio:16/10; }
  .cat-rank-badge { display:none; }
}
@media(max-width:560px) {
  .cat-grid { grid-template-columns:1fr; gap:12px; }
  .cat-card,.cat-card-orig,.cat-card-best { grid-column:1!important; aspect-ratio:4/5; }
  .cat-section-header { flex-direction:column; align-items:flex-start; }
  .cat-card-cta-row { display:none; }
  .cat-card-name { font-size:clamp(1.4rem,7vw,2rem); }
}

/* ── Products grid responsive ── */
.products-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:24px;
}
@media(max-width:900px){
  .products-grid { grid-template-columns:repeat(3,1fr); gap:16px; }
}
@media(max-width:640px){
  .products-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
}
@media(max-width:380px){
  .products-grid { grid-template-columns:1fr; }
}

/* ── STORY ────────────────────────────────────────── */
.story-section {
  padding:clamp(80px,10vw,130px) 0;
  background:var(--white);
  position:relative; overflow:hidden;
}
.story-section::before {
  content:'✦'; position:absolute; right:5%; top:10%;
  font-size:140px; color:rgba(200,169,106,0.04);
  pointer-events:none; font-family:var(--serif);
  animation:rotateSlow 40s linear infinite;
}

.story-grid {
  display:grid;
  grid-template-columns:1fr 1.1fr;
  gap:80px; align-items:center;
}

.story-img-wrap { position:relative; z-index:1; }
.story-img {
  width:100%; border-radius:32px;
  aspect-ratio:4/5; object-fit:cover;
  box-shadow:0 48px 96px rgba(28,26,22,0.14);
  transition:transform 0.7s var(--expo);
}
.story-img-wrap:hover .story-img { transform:scale(1.025) translateY(-4px); }

.story-img-frame {
  position:absolute; top:-20px; right:-20px; bottom:20px; left:20px;
  border:1.5px solid var(--gold);
  border-radius:32px; opacity:0.3;
  pointer-events:none; z-index:0;
}

.story-float {
  position:absolute; bottom:40px; left:-32px;
  background:var(--white);
  border-radius:24px; padding:20px 26px;
  box-shadow:0 24px 64px rgba(28,26,22,0.14);
  display:flex; align-items:center; gap:16px;
  animation:floatY 5.5s ease-in-out infinite;
  z-index:3; border:1px solid var(--border);
}
.story-float-icon { font-size:30px; }
.story-float-num { font-family:var(--serif); font-size:1.8rem; font-weight:700; color:var(--ink); line-height:1; }
.story-float-label { font-size:0.65rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; }

.story-badge {
  display:inline-flex; align-items:center; gap:8px;
  background:linear-gradient(135deg, var(--gold-xl), #f0e5c4);
  border-radius:999px; padding:9px 22px;
  font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
  color:#7A5C1E; margin-bottom:28px;
  border:1px solid var(--gold-l);
}
.story-title {
  font-family:var(--serif);
  font-size:clamp(2.2rem,4.5vw,3.6rem);
  font-weight:600; color:var(--ink);
  line-height:1.04; letter-spacing:-0.01em;
  margin-bottom:28px;
}
.story-title em { font-style:italic; font-weight:300; color:var(--rose); }
.story-body { font-size:0.92rem; line-height:1.9; color:var(--muted); margin-bottom:18px; }

.story-cta-link {
  display:inline-flex; align-items:center; gap:10px;
  margin-top:8px; color:var(--ink);
  font-size:0.78rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
  transition:color 0.2s, gap 0.25s;
  position:relative;
}
.story-cta-link::after { content:'→'; transition:transform 0.25s; }
.story-cta-link:hover { color:var(--rose); gap:16px; }
.story-cta-link:hover::after { transform:translateX(6px); }

.story-stats {
  display:flex; gap:40px; flex-wrap:wrap;
  margin-top:44px; padding-top:36px;
  border-top:1px solid var(--border);
}
.stat-item strong {
  display:block;
  font-family:var(--serif); font-size:2.6rem; font-weight:700;
  color:var(--ink); line-height:1; letter-spacing:-0.03em;
}
.stat-item strong span { color:var(--rose); }
.stat-item p { font-size:0.65rem; font-weight:600; color:var(--muted); letter-spacing:0.1em; text-transform:uppercase; margin-top:6px; }

/* ── INGREDIENTS ──────────────────────────────────── */
.ing-section {
  padding:clamp(80px,10vw,130px) 0;
  background:var(--cream-2);
  position:relative; overflow:hidden;
}
.ing-section::before {
  content:''; position:absolute; top:0; left:0; right:0;
  height:90px;
  background:var(--white);
  clip-path:ellipse(55% 100% at 50% 0%);
  pointer-events:none;
}

.ing-grid {
  display:grid; grid-template-columns:1fr 1.3fr;
  gap:80px; align-items:center;
}
.ing-title {
  font-family:var(--serif);
  font-size:clamp(2rem,4.5vw,3.4rem); font-weight:600;
  color:var(--ink); line-height:1.06;
  letter-spacing:-0.01em; margin-bottom:24px;
}
.ing-title em { font-style:italic; font-weight:300; color:var(--rose); }
.ing-body { font-size:0.92rem; line-height:1.9; color:var(--muted); margin-bottom:30px; }

.ing-tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:30px; }
.ing-tag {
  display:inline-block;
  background:var(--white); border:1px solid var(--border);
  border-radius:999px; padding:8px 18px;
  font-size:0.66rem; font-weight:600; letter-spacing:0.07em; text-transform:uppercase;
  color:var(--ink-2);
  transition:all 0.22s; cursor:default;
}
.ing-tag:hover { border-color:var(--rose); color:var(--rose); transform:translateY(-2px); box-shadow:0 4px 16px rgba(212,133,122,0.2); }

.ing-link {
  display:inline-flex; align-items:center; gap:10px;
  color:var(--rose); font-weight:700; font-size:0.76rem; letter-spacing:0.1em; text-transform:uppercase;
  transition:gap 0.2s;
}
.ing-link:hover { gap:16px; }

.ing-imgs {
  display:grid; grid-template-columns:1fr 1fr;
  grid-template-rows:auto auto; gap:14px;
}
.ing-tall { grid-row:span 2; border-radius:24px; overflow:hidden; }
.ing-tall img { width:100%; height:100%; object-fit:cover; min-height:300px; transition:transform 0.8s var(--expo); }
.ing-tall:hover img { transform:scale(1.08); }
.ing-sm { border-radius:24px; overflow:hidden; aspect-ratio:1; }
.ing-sm img { width:100%; height:100%; object-fit:cover; transition:transform 0.8s var(--expo); }
.ing-sm:hover img { transform:scale(1.08); }

/* ── COLLECTION ───────────────────────────────────── */
.collection-section {
  padding:clamp(80px,10vw,130px) 0 clamp(100px,12vw,160px);
  background:var(--white); position:relative;
}
.collection-section::after {
  content:'✦'; position:absolute; left:4%; bottom:6%;
  font-size:200px; color:rgba(212,133,122,0.03);
  pointer-events:none; font-family:var(--serif);
}

.collection-header {
  display:flex; justify-content:space-between; align-items:flex-end;
  margin-bottom:52px; flex-wrap:wrap; gap:20px;
}
.collection-title {
  font-family:var(--serif);
  font-size:clamp(2.2rem,4.5vw,3.6rem); font-weight:600;
  color:var(--ink); letter-spacing:-0.01em;
}
.collection-title em { font-style:italic; font-weight:300; color:var(--rose); }

.filters {
  display:flex; gap:4px;
  background:var(--cream-2);
  border:1px solid var(--border);
  border-radius:999px; padding:4px;
}
.filter-btn {
  padding:10px 26px; border-radius:999px;
  font-family:var(--sans);
  font-size:0.7rem; font-weight:700;
  cursor:pointer; letter-spacing:0.1em; text-transform:uppercase;
  transition:all 0.3s var(--spring);
  border:none; background:none; color:var(--muted);
}
.filter-btn:hover { color:var(--rose); }
.filter-btn.active {
  background: linear-gradient(135deg, var(--rose), var(--rose-d));
  color:white;
  box-shadow:0 4px 20px rgba(212,133,122,0.4);
  transform:scale(1.04);
}

.products-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:26px;
}
.skeleton {
  height:420px; border-radius:24px;
  background:linear-gradient(90deg,#ede8e0 25%,#f5f1ea 50%,#ede8e0 75%);
  background-size:200% 100%;
  animation:shimmer 1.6s infinite;
}
.empty-state { grid-column:1/-1; text-align:center; padding:90px 20px; color:var(--muted); }
.empty-icon { font-size:52px; margin-bottom:18px; opacity:0.45; }
.empty-text { font-size:0.92rem; }

/* ── PROCESS ──────────────────────────────────────── */
.process-section {
  padding:clamp(80px,10vw,130px) 0;
  background:var(--cream); position:relative; overflow:hidden;
}
.process-section::before {
  content:''; position:absolute; top:-120px; right:-120px;
  width:500px; height:500px; border-radius:50%;
  background:radial-gradient(circle, rgba(200,169,106,0.09) 0%, transparent 70%);
  pointer-events:none;
}

.process-header { text-align:center; margin-bottom:56px; }
.process-header-title {
  font-family:var(--serif);
  font-size:clamp(2rem,4.5vw,3.4rem); font-weight:600;
  color:var(--ink); letter-spacing:-0.01em;
}
.process-header-title em { font-style:italic; font-weight:300; color:var(--gold); }

.process-grid {
  display:grid; grid-template-columns:repeat(4,1fr);
  border:1px solid var(--border);
  border-radius:32px; overflow:hidden;
  background:var(--white);
  box-shadow:0 8px 40px rgba(28,26,22,0.05);
}
.process-step {
  padding:44px 30px; border-right:1px solid var(--border);
  position:relative; overflow:hidden;
  transition:background 0.3s, transform 0.3s;
}
.process-step:last-child { border-right:none; }
.process-step:hover { background: linear-gradient(135deg, var(--cream) 0%, var(--gold-xl) 100%); }
.process-step::after {
  content:''; position:absolute; bottom:0; left:0; right:0;
  height:3px;
  background:linear-gradient(to right, var(--rose), var(--gold));
  transform:scaleX(0); transform-origin:left;
  transition:transform 0.5s var(--expo);
}
.process-step:hover::after { transform:scaleX(1); }

.process-num {
  font-family:var(--serif); font-size:5rem; font-weight:700;
  color:rgba(28,26,22,0.04); line-height:1;
  margin-bottom:16px; letter-spacing:-0.04em;
}
.process-icon {
  font-size:24px; margin-bottom:16px;
  display:inline-block;
  transition:transform 0.3s var(--spring);
}
.process-step:hover .process-icon { transform:scale(1.2) rotate(-8deg); }
.process-name { font-size:0.76rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink); margin-bottom:12px; }
.process-desc { font-size:0.82rem; line-height:1.75; color:var(--muted); }

/* ── PROMO BANNER ─────────────────────────────────── */
.promo-section {
  background:linear-gradient(135deg, #8B4D3F 0%, #6B3228 50%, #52261E 100%);
  position:relative; overflow:hidden;
}
.promo-section::before {
  content:''; position:absolute;
  top:-40%; left:-8%;
  width:700px; height:700px; border-radius:50%;
  background:rgba(255,255,255,0.04); pointer-events:none;
}
.promo-section::after {
  content:'✦'; position:absolute; right:5%; top:50%; transform:translateY(-50%);
  font-size:240px; color:rgba(255,255,255,0.03);
  font-family:var(--serif); pointer-events:none;
}
.promo-inner {
  position:relative; z-index:1;
  display:flex; align-items:center; justify-content:space-between;
  padding:clamp(52px,8vw,90px) clamp(24px,6vw,100px);
  gap:36px; flex-wrap:wrap;
}
.promo-eyebrow { font-size:0.65rem; font-weight:700; letter-spacing:0.24em; text-transform:uppercase; color:var(--gold-l); margin-bottom:12px; opacity:0.85; }
.promo-title {
  font-family:var(--serif);
  font-size:clamp(1.8rem,4vw,3.2rem); font-weight:600;
  color:white; line-height:1.1; letter-spacing:-0.01em;
}
.btn-white {
  display:inline-flex; align-items:center; gap:10px;
  background:var(--white); color:var(--rose-d);
  padding:18px 44px; border-radius:999px;
  font-family:var(--sans); font-size:0.72rem; font-weight:800;
  letter-spacing:0.12em; text-transform:uppercase;
  white-space:nowrap; flex-shrink:0;
  transition:transform 0.3s var(--spring), box-shadow 0.3s;
  box-shadow:0 10px 40px rgba(28,18,12,0.28);
}
.btn-white:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 20px 50px rgba(28,18,12,0.38); }

/* ── PRESS STRIP ──────────────────────────────────── */
.press-section {
  padding:48px 0;
  background:var(--cream-2);
  border-bottom:1px solid var(--border);
  border-top:1px solid var(--border);
}
.press-inner { display:flex; align-items:center; gap:52px; justify-content:center; flex-wrap:wrap; }
.press-label { font-size:0.62rem; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--muted); flex-shrink:0; }
.press-names { display:flex; gap:44px; align-items:center; flex-wrap:wrap; justify-content:center; }
.press-name {
  font-family:var(--serif); font-size:1.5rem; font-weight:300;
  color:rgba(28,26,22,0.15); letter-spacing:0.08em; white-space:nowrap;
  transition:color 0.3s, transform 0.3s;
}
.press-name:hover { color:var(--ink); transform:translateY(-3px); }

/* ── FOOTER BANNER ────────────────────────────────── */
.footer-banner {
  position:relative; padding:clamp(90px,13vw,160px) 0;
  background:var(--cream-2); text-align:center; overflow:hidden;
}
.footer-banner::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 65% 55% at 50% 100%, rgba(212,133,122,0.1) 0%, transparent 70%);
  pointer-events:none;
}
.footer-banner-content { position:relative; z-index:2; }
.banner-eyebrow { display:inline-block; font-size:0.62rem; font-weight:700; letter-spacing:0.28em; text-transform:uppercase; color:var(--rose); margin-bottom:20px; }
.banner-title {
  font-family:var(--serif);
  font-size:clamp(2.2rem,5.5vw,4.4rem); font-weight:600;
  color:var(--ink); line-height:1.06; letter-spacing:-0.01em;
  margin-bottom:40px;
}
.banner-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.btn-ghost-dark {
  display:inline-flex; align-items:center; gap:9px;
  background:rgba(28,26,22,0.05); color:var(--ink);
  padding:16px 30px; border-radius:999px;
  font-family:var(--sans); font-size:0.72rem; font-weight:600; letter-spacing:0.06em;
  border:1px solid var(--border);
  transition:background 0.2s, transform 0.2s;
}
.btn-ghost-dark:hover { background:rgba(28,26,22,0.1); transform:translateY(-2px); }

/* ── FOOTER ───────────────────────────────────────── */
.footer {
  background: linear-gradient(160deg, #2A2018 0%, #1C1710 50%, #130E09 100%);
  padding:clamp(56px,9vw,96px) 0 44px; color:rgba(255,255,255,0.4);
}
.footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 2fr; gap:52px; margin-bottom:60px; }
.footer-logo { font-family:var(--serif); font-size:1.9rem; font-weight:600; color:white; margin-bottom:12px; letter-spacing:-0.01em; }
.footer-logo span { color:var(--gold); }
.footer-tagline { font-size:0.82rem; line-height:1.8; color:rgba(255,255,255,0.28); margin-bottom:26px; }
.footer-social { display:flex; gap:10px; }
.social-btn {
  display:flex; align-items:center; justify-content:center;
  width:38px; height:38px; border-radius:50%;
  border:1px solid rgba(255,255,255,0.1);
  color:rgba(255,255,255,0.3);
  font-size:0.62rem; font-weight:700;
  transition:all 0.25s;
}
.social-btn:hover { border-color:var(--gold); color:var(--gold); transform:translateY(-3px) scale(1.08); background:rgba(200,169,106,0.08); }
.social-ig:hover { border-color:#E1306C; color:#E1306C; background:rgba(225,48,108,0.08); }
.social-fb:hover { border-color:#1877F2; color:#1877F2; background:rgba(24,119,242,0.08); }
.social-wa:hover { border-color:#25D366; color:#25D366; background:rgba(37,211,102,0.08); }
.social-tk:hover { border-color:#ff0050; color:#ff0050; background:rgba(255,0,80,0.06); }
.footer-bottom-left { display:flex; flex-direction:column; gap:4px; }
.footer-credit { font-size:0.68rem; color:rgba(255,255,255,0.24); }
.footer-credit-link { color:var(--gold); text-decoration:none; font-weight:600; transition:color .2s; }
.footer-credit-link:hover { color:rgba(200,169,106,0.8); }

.footer-heading { color:white; font-size:0.65rem; font-weight:800; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:22px; }
.footer-link { display:block; font-size:0.82rem; color:rgba(255,255,255,0.28); margin-bottom:12px; transition:color 0.2s, padding-left 0.2s; }
.footer-link:hover { color:rgba(255,255,255,0.85); padding-left:6px; }

.email-form { display:flex; gap:8px; margin-top:4px; }
.email-input {
  flex:1; min-width:0;
  background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:14px; padding:13px 18px;
  font-family:var(--sans); font-size:0.82rem; color:white; outline:none;
  transition:border-color 0.2s, background 0.2s;
}
.email-input::placeholder { color:rgba(255,255,255,0.2); }
.email-input:focus { border-color:var(--gold); background:rgba(255,255,255,0.08); }
.email-btn {
  background: linear-gradient(135deg, var(--rose), var(--rose-d));
  color:white; border-radius:14px;
  padding:13px 22px; font-family:var(--sans); font-size:0.74rem; font-weight:700;
  cursor:pointer; white-space:nowrap; transition:transform 0.2s, box-shadow 0.2s;
  box-shadow:0 4px 18px rgba(212,133,122,0.35);
}
.email-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(212,133,122,0.5); }

.footer-bottom {
  display:flex; justify-content:space-between; align-items:center;
  padding-top:30px; border-top:1px solid rgba(255,255,255,0.06);
  flex-wrap:wrap; gap:12px;
}
.footer-copy { font-size:0.7rem; color:rgba(255,255,255,0.16); }
.footer-bottom-links { display:flex; gap:26px; flex-wrap:wrap; }
.footer-bottom-link { font-size:0.7rem; color:rgba(255,255,255,0.18); transition:color 0.2s; }
.footer-bottom-link:hover { color:rgba(255,255,255,0.55); }

/* ══════════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════════ */
@media (max-width:1100px) {
  .hero-content { grid-template-columns:1fr; }
  .hero-right { display:none; }
  .story-grid,.ing-grid { grid-template-columns:1fr; gap:44px; }
  .story-img-frame { display:none; }
  .story-float { left:16px; }
  .process-grid { grid-template-columns:1fr 1fr; }
  .process-step:nth-child(2) { border-right:none; }
  .process-step:nth-child(1),.process-step:nth-child(2) { border-bottom:1px solid var(--border); }
  .footer-top { grid-template-columns:1fr 1fr; gap:40px; }
}

@media (max-width:860px) {
  .cat-grid { grid-template-columns:1fr; gap:16px; }
  .cat-card { aspect-ratio:3/2; }
  .cat-card-num { font-size:10rem; }
  .trust-inner { grid-template-columns:1fr 1fr; }
  .trust-item:nth-child(2n) { border-right:none; }
  .trust-item:nth-child(1),.trust-item:nth-child(2) { border-bottom:1px solid var(--border); }
}

@media (max-width:768px) {
  .cat-card { aspect-ratio:4/3; }
  .trust-inner { grid-template-columns:1fr; }
  .trust-item { border-right:none; border-bottom:1px solid var(--border); }
  .trust-item:last-child { border-bottom:none; }
  .process-grid { grid-template-columns:1fr; }
  .process-step { border-right:none !important; border-bottom:1px solid var(--border); }
  .process-step:last-child { border-bottom:none; }
  .footer-top { grid-template-columns:1fr; }
  .story-stats { flex-direction:column; gap:22px; }
  .promo-inner { text-align:center; justify-content:center; }
  .hero-scroll-hint { display:none; }
  .story-float { display:none; }
  .collection-header { flex-direction:column; align-items:flex-start; }
  .products-grid { grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
}

@media (max-width:480px) {
  .hero-title { font-size:2.8rem; }
  .cat-card { aspect-ratio:16/10; border-radius:22px; }
  .products-grid { grid-template-columns:1fr 1fr; gap:12px; }
  .hero-actions { flex-direction:column; }
  .btn-primary,.btn-ghost { width:100%; justify-content:center; }
  .filters { flex-wrap:wrap; border-radius:20px; }
  .ing-imgs { grid-template-columns:1fr; }
  .ing-tall { grid-row:auto; }
  .cat-card-name { font-size:2rem; }
}
`;

/* ── Data ── */
const CATEGORIES = ["Tous", "Femme", "Homme", "Unisex"];

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ════════════════════════════════════════════════
   HOME COMPONENT
════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════
   CATEGORY SECTION COMPONENT (5 cards)
════════════════════════════════════════════════════ */
function CatSection({ catCardRefs, catGridRef }) {
  // Scroll reveal with stagger
  useEffect(() => {
    const cards = catCardRefs.current.filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("cat-visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const CARDS = [
    {
      id:"femme", label:"Femme", sub:"32 fragrances florales & boisées",
      tag:"Féminin", tagCls:"", count:"32 parfums",
      path:"/collection/femme", cta:"Explorer",
      img:"/femmeNahid.png", fb:"https://i.postimg.cc/dQTtHTgz/femme-Nahid.png",
      delay:"cat-d1",
    },
    {
      id:"homme", label:"Homme", sub:"28 fragrances viriles & intenses",
      tag:"Masculin", tagCls:"", count:"28 parfums",
      path:"/collection/homme", cta:"Explorer",
      img:"/hommeNahid.png", fb:"https://i.postimg.cc/WpJbWJxx/homme-Nahid.jpg",
      delay:"cat-d2",
    },
    {
      id:"unisex", label:"Unisex", sub:"18 fragrances sans frontières",
      tag:"Libre", tagCls:"", count:"18 parfums",
      path:"/collection/unisex", cta:"Explorer",
      img:"/unisexNahid.png", fb:"https://i.postimg.cc/MZjKPjgN/unisex-Nahid.png",
      delay:"cat-d3",
    },
    {
      id:"originals", label:"Nahid Originals", sub:"Créations exclusives de la maison",
      tag:"✦ Exclusif", tagCls:"cat-tag-gold", count:null,
      path:"/originals", cta:"Découvrir",
      img:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=85",
      fb:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
      delay:"cat-d4", isOrig:true,
    },
    {
      id:"bestsellers", label:"Best-Sellers", sub:"Les fragrances préférées de nos clients",
      tag:"🔥 Tendance", tagCls:"cat-tag-coral", count:null,
      path:"/?category=Best-Sellers", cta:"Voir tout",
      img:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=85",
      fb:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
      delay:"cat-d5", isBest:true,
    },
  ];

  return (
    <section className="cat-section">
      <div className="cat-section-inner">
        <div className="cat-section-header sr">
          <div>
            <div className="eyebrow">Nos Collections</div>
            <h2 className="cat-section-title">Choisissez votre <em>univers</em></h2>
          </div>
          <Link to="/catalogue" className="cat-section-link">Voir tout le catalogue →</Link>
        </div>

        <div className="cat-grid" ref={catGridRef}>
          {CARDS.map((card, i) => (
            <Link
              key={card.id}
              to={card.path}
              ref={el => catCardRefs.current[i] = el}
              className={`cat-card ${card.isOrig ? "cat-card-orig" : card.isBest ? "cat-card-best" : ""} ${card.delay}`}
              style={{ textDecoration:"none" }}
              aria-label={`${card.label} — ${card.sub}`}
            >
              {card.isOrig && <div className="cat-orb" />}

              <img
                className="cat-card-img"
                src={card.img}
                alt={card.label}
                loading="lazy"
                onError={e => { e.currentTarget.src = card.fb; }}
              />
              <div className="cat-card-overlay-bot" />

              {card.isBest && <div className="cat-rank-badge">#1</div>}

              <div className="cat-card-top">
                <span className={`cat-card-tag ${card.tagCls}`}>
                  <span className="cat-tag-dot" />
                  {card.tag}
                </span>
                {card.count && <span className="cat-card-count-badge">{card.count}</span>}
              </div>

              <div className="cat-card-body">
                <div className="cat-card-line" />
                <span className="cat-card-name">{card.label}</span>
                <span className="cat-card-sub">{card.sub}</span>
                <div className="cat-card-cta-row">
                  <span className="cat-card-cta">
                    {card.cta}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  <span className="cat-card-ghost">
                    En savoir plus
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const catCardRefs = useRef([]);
  const catGridRef  = useRef(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tous");

  useScrollReveal();

  useEffect(() => {
    if (!document.getElementById("nahid-global-styles")) {
      const tag = document.createElement("style");
      tag.id = "nahid-global-styles";
      tag.textContent = globalCSS;
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    axios.get("/api/products")
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "Tous"
    ? products
    : products.filter(p => p.category === activeCategory);

  const scrollToCollection = (cat) => {
    if (cat) setActiveCategory(cat);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="ann-bar">
        <div className="ann-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{display:'inline-flex',gap:'64px',alignItems:'center'}}>
              <span>Livraison offerte <b>dès 500 MAD</b></span>
              <span className="ann-sep">✦</span>
              <span>Échantillon gratuit <b>avec chaque commande</b></span>
              <span className="ann-sep">✦</span>
              <span>4.9 / 5 — <b>2 400 avis clients</b></span>
              <span className="ann-sep">✦</span>
              <span>Fragrances <b>100% naturelles</b></span>
              <span className="ann-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=80"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-overlay-2" />

        <div className="hero-content">
          <div>
            <div className="hero-eyebrow">Maison de Parfums — Casablanca</div>
            <h1 className="hero-title" style={{color:'white'}}>
              L'Art de la<br />Séduction<br /><em>Olfactive</em>
            </h1>
            <div className="hero-actions">
              <button onClick={() => scrollToCollection(null)} className="btn-primary">
                Explorer la Collection
              </button>
              <Link to="/notre-histoire" className="btn-ghost">Notre Histoire →</Link>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-badge">
              <span className="live-dot" />
              En stock — Expédition 24h
            </div>
            <p className="hero-sub">
              Des fragrances d'exception, composées à partir des matières premières les plus nobles — oud, rose de Taif, ambre gris, iris de Florence.
            </p>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span className="scroll-label">Défiler</span>
        </div>
      </section>

      {/* ── TRUST STRIP — 4 items, no retours ── */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-inner">
            {[
              { icon: "🚚", title: "Livraison offerte", sub: "Dès 500 MAD" },
              { icon: "🧪", title: "Échantillon offert", sub: "Avec chaque commande" },
              { icon: "⭐", title: "4.9 / 5 · 2 400 avis", sub: "Clients satisfaits" },
              { icon: "🌿", title: "100% naturels", sub: "Sélectionnés à la source" },
            ].map(({ icon, title, sub }) => (
              <div className="trust-item" key={title}>
                <div className="trust-icon-wrap">{icon}</div>
                <div className="trust-text">
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY CARDS — 5 cards ── */}
      <CatSection catCardRefs={catCardRefs} catGridRef={catGridRef} />

      {/* ── STORY ── */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="sr sr-left">
              <div className="story-img-wrap">
                <div className="story-img-frame" />
                <img
                  className="story-img"
                  src="https://i.postimg.cc/26GdgKq8/Gemini-Generated-Image-k9jm4pk9jm4pk9jm.png"
                  alt="Notre histoire"
                  loading="lazy"
                />
                <div className="story-float">
                  <span className="story-float-icon">🏆</span>
                  <div>
                    <div className="story-float-num">12+</div>
                    <div className="story-float-label">Ans d'expertise</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sr sr-right d2">
              <div className="story-badge">✦ Née à Casablanca</div>
              <h2 className="story-title">
                Une Histoire<br /><em>Olfactive</em><br />Authentique
              </h2>
              <p className="story-body">
                Nahid Perfume est née au cœur des médinas parfumées du Maroc — une ode à la beauté sensorielle, entre souks épicés et jardins andalous. Chaque flacon renferme une histoire.
              </p>
              <p className="story-body">
                Nous sélectionnons les matières premières les plus nobles : oud de Camboge, rose de Taif, ambre gris et iris de Florence. Chaque fragrance est composée pour durer et laisser une empreinte unique.
              </p>
              <Link to="/notre-histoire" className="story-cta-link">Découvrir notre maison</Link>
              <div className="story-stats">
                {[
                  { n: "12", l: "Ans d'expertise" },
                  { n: "78", l: "Fragrances uniques" },
                  { n: "2 400", l: "Clients fidèles" },
                ].map(({ n, l }) => (
                  <div className="stat-item" key={l}>
                    <strong>{n}<span>+</span></strong>
                    <p>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ── */}
      <section className="ing-section">
        <div className="container">
          <div className="ing-grid">
            <div className="sr sr-left">
              <div className="eyebrow">Matières premières</div>
              <h2 className="ing-title">
                Les ingrédients<br />les plus précieux<br /><em>du monde</em>
              </h2>
              <p className="ing-body">
                Nous ne faisons aucun compromis. Chaque ingrédient est sourcé directement chez les meilleurs producteurs mondiaux — du oud de Camboge à la rose de Taif en passant par l'iris de Florence.
              </p>
              <div className="ing-tags">
                {["Oud de Camboge","Rose de Taif","Ambre Gris","Iris de Florence","Musc Blanc","Cèdre de l'Atlas"].map(t => (
                  <span key={t} className="ing-tag">{t}</span>
                ))}
              </div>
              <a href="#collection" className="ing-link">Explorer nos fragrances →</a>
            </div>
            <div className="ing-imgs sr sr-right d2">
              <div className="ing-tall">
                <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80" alt="Oud" loading="lazy" />
              </div>
              <div className="ing-sm">
                <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=80" alt="Rose" loading="lazy" />
              </div>
              <div className="ing-sm">
                <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80" alt="Ambre" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section id="collection" className="collection-section">
        <div className="container">
          <div className="collection-header sr">
            <div>
              <div className="eyebrow">Collection</div>
              <h2 className="collection-title">Nos <em>Parfums</em></h2>
            </div>
            <div className="filters">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="products-grid">
              {[1,2,3,4].map(n => <div key={n} className="skeleton" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="products-grid">
              <div className="empty-state">
                <div className="empty-icon">🌸</div>
                <p className="empty-text">Aucun produit dans cette catégorie.</p>
              </div>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section">
        <div className="container">
          <div className="process-header sr">
            <div className="eyebrow eyebrow-gold">Notre savoir-faire</div>
            <h2 className="process-header-title">Du terroir <em>au flacon</em></h2>
          </div>
          <div className="process-grid">
            {[
              { n:"01", icon:"🌍", name:"Sourcing", desc:"Nous sélectionnons les matières premières chez les meilleurs producteurs à travers le monde." },
              { n:"02", icon:"🔬", name:"Création", desc:"Nos parfumeurs assemblent chaque accord avec précision et sensibilité uniques." },
              { n:"03", icon:"🧪", name:"Tests", desc:"Chaque fragrance est testée pendant des mois avant validation pour notre collection." },
              { n:"04", icon:"📦", name:"Livraison", desc:"Votre parfum est emballé avec soin et livré directement chez vous en 24–48h." },
            ].map(({ n, icon, name, desc }) => (
              <div key={n} className="process-step">
                <div className="process-num">{n}</div>
                <div className="process-icon">{icon}</div>
                <div className="process-name">{name}</div>
                <p className="process-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackOffersSection />

      {/* ── BUNDLE BUILDER ── */}
      <BundleBuilder products={products} addToCart={addToCart} />

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── PRESS ── */}
      <section className="press-section">
        <div className="container">
          <div className="press-inner">
            <span className="press-label">Ils parlent de nous</span>
            <div className="press-names">
              {["Vogue","Elle Maroc","L'Obs","Marie Claire","Grazia"].map(p => (
                <a key={p} href="#" className="press-name">{p}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="promo-section">
        <div className="promo-inner">
          <div>
            <div className="promo-eyebrow">✦ Offre exclusive membres</div>
            <h2 className="promo-title">Rejoignez Nahid Club<br />&amp; profitez de 20% de remise</h2>
          </div>
          <Link to="/inscription" className="btn-white">Rejoindre gratuitement →</Link>
        </div>
      </section>

      {/* ── FOOTER BANNER ── */}
      <section className="footer-banner">
        <div className="footer-banner-content">
          <div className="container">
            <span className="banner-eyebrow">✦ Livraison offerte dès 500 MAD</span>
            <h2 className="banner-title">Prêt à trouver<br />votre signature ?</h2>
            <div className="banner-actions">
              <a href="#collection" className="btn-primary">Explorer la Collection</a>
              <Link to="/notre-histoire" className="btn-ghost-dark">Notre Histoire →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
<NahidFooter />

    </div>
  );
}