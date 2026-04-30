import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import BundleBuilder from "../components/BundleBuilder.jsx";
import ReviewsSection from "../components/ReviewsSection";
import PackOffersSection from "../components/PackOffersSection";

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════ */
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:      #FAF8F4;
  --cream-2:    #F4F0E8;
  --white:      #FFFFFF;
  --ink:        #0E0D0B;
  --ink-2:      #3A3830;
  --muted:      #8A8478;
  --gold:       #C9A96E;
  --gold-l:     #E8D5A8;
  --coral:      #EF776A;
  --coral-d:    #D45F53;
  --coral-xl:   #FFF3F1;
  --border:     rgba(14,13,11,0.09);
  --border-2:   rgba(14,13,11,0.05);
  --serif:      'Fraunces', Georgia, serif;
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
.container { max-width: 1320px; margin: 0 auto; padding: 0 clamp(16px,5vw,80px); }

/* ── ANIMATIONS ─────────────────────────────────── */
@keyframes fadeUp    { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:none} }
@keyframes fadeLeft  { from{opacity:0;transform:translateX(48px)} to{opacity:1;transform:none} }
@keyframes scaleUp   { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:none} }
@keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes scrollPulse { 0%,100%{opacity:0.3;transform:scaleY(0.7)} 50%{opacity:1;transform:scaleY(1)} }
@keyframes rotateSlow  { from{transform:rotate(0)} to{transform:rotate(360deg)} }
@keyframes drawLine  { from{width:0} to{width:100%} }
@keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,30px) scale(0.95)} }

/* scroll reveal */
.sr {
  opacity:0;
  transform:translateY(50px);
  transition:opacity 0.85s var(--expo), transform 0.85s var(--expo);
}
.sr.visible { opacity:1; transform:none; }
.sr.sr-left  { transform:translateX(-50px); }
.sr.sr-right { transform:translateX(50px); }
.sr.sr-scale { transform:scale(0.9); }
.sr.visible.sr-left, .sr.visible.sr-right, .sr.visible.sr-scale { transform:none; }
.sr.d1 { transition-delay:0.1s; }
.sr.d2 { transition-delay:0.2s; }
.sr.d3 { transition-delay:0.3s; }
.sr.d4 { transition-delay:0.4s; }
.sr.d5 { transition-delay:0.5s; }

/* ── ANNOUNCEMENT BAR ────────────────────────────── */
.ann-bar {
  background: var(--ink);
  color: rgba(255,255,255,0.55);
  font-family: var(--sans);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 0;
  overflow: hidden;
  white-space: nowrap;
}
.ann-track {
  display: inline-flex;
  gap: 56px;
  animation: marquee 28s linear infinite;
}
.ann-track b { color: var(--gold); font-weight: 600; }

/* ── HERO ─────────────────────────────────────────── */
.hero {
  position: relative;
  height: 100vh;
  min-height: 620px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-video {
  position: absolute; inset: 0;
  width:100%; height:100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(14,13,11,0.80) 0%,
    rgba(14,13,11,0.40) 55%,
    rgba(14,13,11,0.10) 100%
  );
}

/* big decorative grain texture over hero */
.hero::after {
  content:'';
  position:absolute;inset:0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events:none;
  z-index:3;
  opacity:0.5;
}

.hero-content {
  position:relative;z-index:4;
  color:white;
  width:100%;
  padding: 0 clamp(24px,6vw,100px) clamp(56px,9vh,110px);
  display:grid;
  grid-template-columns:1.3fr 1fr;
  align-items:flex-end;
  gap:40px;
}
.hero-tag {
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-size:0.6rem;
  font-weight:700;
  letter-spacing:0.32em;
  text-transform:uppercase;
  color:var(--gold);
  margin-bottom:22px;
  animation:fadeUp 0.8s var(--expo) 0.15s both;
}
.hero-tag::before {
  content:'';width:36px;height:1px;background:var(--gold);
}
.hero-title {
  font-family: var(--serif);
  font-size: clamp(3rem,7.5vw,6.4rem);
  font-weight:700;
  line-height:0.97;
  letter-spacing:-0.02em;
  animation:fadeUp 0.9s var(--expo) 0.3s both;
}
.hero-title em {
  font-style:italic;
  font-weight:300;
  color:var(--gold);
}
.hero-right {
  display:flex;flex-direction:column;align-items:flex-start;gap:22px;
  padding-bottom:8px;
  animation:fadeLeft 0.9s var(--expo) 0.45s both;
}
.hero-sub {
  font-size:clamp(0.82rem,1.1vw,0.95rem);
  font-weight:400;
  line-height:1.82;
  color:rgba(255,255,255,0.62);
  max-width:360px;
}
.hero-actions { display:flex;gap:12px;flex-wrap:wrap; }

/* Primary button */
.btn-primary {
  display:inline-flex;align-items:center;gap:9px;
  background:var(--coral);
  color:white;
  padding:15px 36px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.72rem;font-weight:700;
  letter-spacing:0.1em;text-transform:uppercase;
  transition:transform 0.25s var(--spring), box-shadow 0.25s, background 0.2s;
  box-shadow:0 6px 28px rgba(239,119,106,0.45);
}
.btn-primary:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 12px 36px rgba(239,119,106,0.55); background:var(--coral-d); }

/* Ghost button */
.btn-ghost {
  display:inline-flex;align-items:center;gap:9px;
  background:rgba(255,255,255,0.08);
  color:white;
  padding:15px 28px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.72rem;font-weight:600;
  letter-spacing:0.06em;
  border:1px solid rgba(255,255,255,0.28);
  backdrop-filter:blur(10px);
  transition:background 0.2s, transform 0.2s;
}
.btn-ghost:hover { background:rgba(255,255,255,0.18); transform:translateY(-2px); }

.hero-badge {
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(255,255,255,0.08);
  backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,0.18);
  border-radius:999px;
  padding:10px 20px;
  font-size:0.7rem;font-weight:600;
  color:rgba(255,255,255,0.9);
}
.live-dot {
  width:7px;height:7px;border-radius:50%;
  background:#4ADE80;
  animation:blink 2s ease-in-out infinite;
}

/* Scroll indicator */
.hero-scroll-hint {
  position:absolute;
  right:clamp(20px,4vw,60px);
  top:50%;
  transform:translateY(-50%);
  display:flex;flex-direction:column;align-items:center;gap:10px;
  z-index:4;
}
.scroll-line {
  width:1px;height:64px;
  background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.55),transparent);
  animation:scrollPulse 2.2s ease-in-out infinite;
}
.scroll-label {
  font-size:0.52rem;font-weight:700;letter-spacing:0.28em;
  text-transform:uppercase;color:rgba(255,255,255,0.4);
  writing-mode:vertical-rl;
}

/* ── TRUST STRIP ──────────────────────────────────── */
.trust-strip {
  background:var(--white);
  border-bottom:1px solid var(--border);
}
.trust-inner {
  display:flex;align-items:stretch;flex-wrap:wrap;
}
.trust-item {
  flex:1;min-width:160px;
  display:flex;align-items:center;justify-content:center;gap:14px;
  padding:22px 16px;
  border-right:1px solid var(--border);
  transition:background 0.2s;
  cursor:default;
}
.trust-item:last-child { border-right:none; }
.trust-item:hover { background:var(--cream); }
.trust-icon { font-size:18px;flex-shrink:0; }
.trust-text strong { display:block;font-size:0.74rem;font-weight:700;color:var(--ink); }
.trust-text span   { font-size:0.67rem;color:var(--muted); }

/* ── SECTION LABELS ───────────────────────────────── */
.eyebrow {
  display:inline-flex;align-items:center;gap:10px;
  font-size:0.6rem;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;
  color:var(--coral);margin-bottom:14px;
}
.eyebrow::before,.eyebrow::after { content:'';width:22px;height:1px;background:var(--coral); }
.eyebrow-gold { color:var(--gold); }
.eyebrow-gold::before,.eyebrow-gold::after { background:var(--gold); }

/* ── CATEGORY CARDS ───────────────────────────────── */
.cat-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--cream);
  position:relative;
  overflow:hidden;
}
/* Large decorative orbs — NO black background */
.cat-section::before {
  content:'';
  position:absolute;top:-200px;right:-200px;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(201,169,110,0.09) 0%,transparent 70%);
  pointer-events:none;
  animation:orb-drift 18s ease-in-out infinite;
}
.cat-section::after {
  content:'';
  position:absolute;bottom:-180px;left:-180px;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(239,119,106,0.07) 0%,transparent 70%);
  pointer-events:none;
  animation:orb-drift 22s ease-in-out infinite reverse;
}

.cat-section-header {
  text-align:center;margin-bottom:52px;
  position:relative;z-index:1;
}
.cat-section-title {
  font-family:var(--serif);
  font-size:clamp(2.2rem,4.5vw,3.6rem);
  font-weight:700;
  color:var(--ink);
  letter-spacing:-0.02em;
  line-height:1.06;
}
.cat-section-title em { font-style:italic;font-weight:300;color:var(--coral); }

.cat-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
  position:relative;z-index:1;
}

/* Category card */
.cat-card {
  position:relative;overflow:hidden;
  border-radius:28px;
  cursor:pointer;
  aspect-ratio:3/4;
  background:#E8E3DC;
  border:1px solid rgba(14,13,11,0.06);
  transition:transform 0.55s var(--expo), box-shadow 0.55s;
  /* neumorphic ring on hover */
}
.cat-card:hover {
  transform:translateY(-10px) scale(1.01);
  box-shadow:0 40px 80px rgba(14,13,11,0.18), 0 0 0 2px rgba(239,119,106,0.25);
}

.cat-card-img {
  width:100%;height:100%;
  object-fit:cover;object-position:center top;
  transition:transform 0.8s var(--expo), filter 0.5s;
  filter:brightness(0.88) saturate(0.95);
}
.cat-card:hover .cat-card-img { transform:scale(1.09); filter:brightness(0.98) saturate(1.05); }

.cat-card-overlay {
  position:absolute;inset:0;
  background:linear-gradient(
    170deg,
    rgba(14,13,11,0.0) 30%,
    rgba(14,13,11,0.55) 70%,
    rgba(14,13,11,0.88) 100%
  );
  transition:opacity 0.4s;
}

.cat-card-top {
  position:absolute;top:20px;left:20px;right:20px;
  display:flex;justify-content:space-between;align-items:center;
  z-index:2;
}
.cat-card-tag {
  background:rgba(201,169,110,0.18);
  border:1px solid rgba(201,169,110,0.45);
  backdrop-filter:blur(10px);
  color:var(--gold);
  font-size:0.58rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;
  padding:7px 15px;border-radius:999px;
}
.cat-card-count-badge {
  background:rgba(255,255,255,0.1);
  backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,0.18);
  color:rgba(255,255,255,0.82);
  font-size:0.58rem;font-weight:600;
  padding:7px 13px;border-radius:999px;
}

.cat-card-body {
  position:absolute;bottom:0;left:0;right:0;
  padding:30px 26px;
  display:flex;flex-direction:column;gap:6px;
  z-index:2;
}
/* animated underline */
.cat-card-line {
  width:0;height:2px;
  background:linear-gradient(to right,var(--coral),var(--gold));
  border-radius:999px;
  transition:width 0.45s var(--expo);
  margin-bottom:4px;
}
.cat-card:hover .cat-card-line { width:52px; }

.cat-card-name {
  font-family:var(--serif);
  font-size:clamp(2rem,3.5vw,2.8rem);
  font-weight:700;
  color:white;
  letter-spacing:-0.02em;
  line-height:1;
}
.cat-card-sub {
  font-size:0.68rem;font-weight:500;
  color:rgba(255,255,255,0.52);
  letter-spacing:0.1em;text-transform:uppercase;
}
.cat-card-cta {
  display:inline-flex;align-items:center;gap:8px;
  background:var(--coral);
  color:white;
  font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  padding:11px 24px;border-radius:999px;
  width:fit-content;margin-top:10px;
  opacity:0;transform:translateY(14px);
  transition:opacity 0.3s, transform 0.35s var(--spring);
  box-shadow:0 4px 18px rgba(239,119,106,0.45);
}
.cat-card:hover .cat-card-cta { opacity:1; transform:none; }

/* ── STORY ────────────────────────────────────────── */
.story-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--white);
  position:relative;
  overflow:hidden;
}
/* subtle decorative element */
.story-section::before {
  content:'✦';
  position:absolute;right:6%;top:12%;
  font-size:120px;
  color:rgba(201,169,110,0.05);
  pointer-events:none;
  font-family:var(--serif);
  animation:rotateSlow 30s linear infinite;
}

.story-grid {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:80px;
  align-items:center;
}

.story-img-wrap { position:relative;z-index:1; }

.story-img {
  width:100%;border-radius:28px;
  aspect-ratio:4/5;object-fit:cover;
  box-shadow:0 40px 80px rgba(14,13,11,0.12);
  transition:transform 0.65s var(--expo);
}
.story-img-wrap:hover .story-img { transform:scale(1.025); }

/* offset gold border */
.story-img-frame {
  position:absolute;
  top:-18px;right:-18px;bottom:18px;left:18px;
  border:2px solid var(--gold);
  border-radius:28px;
  opacity:0.35;
  pointer-events:none;
  z-index:0;
}

.story-float {
  position:absolute;
  bottom:36px;left:-28px;
  background:white;
  border-radius:20px;
  padding:18px 22px;
  box-shadow:0 20px 60px rgba(14,13,11,0.12);
  display:flex;align-items:center;gap:14px;
  animation:floatY 5s ease-in-out infinite;
  z-index:3;
  border:1px solid var(--border);
}
.story-float-icon { font-size:28px; }
.story-float-num { font-family:var(--serif);font-size:1.6rem;font-weight:700;color:var(--ink);line-height:1; }
.story-float-label { font-size:0.65rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.07em; }

.story-content {}
.story-badge {
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,var(--gold-l),#f5e6c5);
  border-radius:999px;padding:8px 20px;
  font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  color:#7A5C1E;margin-bottom:26px;
}
.story-title {
  font-family:var(--serif);
  font-size:clamp(2rem,4vw,3.2rem);
  font-weight:700;
  color:var(--ink);
  line-height:1.05;
  letter-spacing:-0.02em;
  margin-bottom:26px;
}
.story-title em { font-style:italic;font-weight:300;color:var(--coral); }
.story-body { font-size:0.9rem;font-weight:400;line-height:1.9;color:var(--muted);margin-bottom:16px; }

.story-cta-link {
  display:inline-flex;align-items:center;gap:10px;
  margin-top:8px;
  color:var(--ink);font-size:0.78rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  transition:color 0.2s, gap 0.25s;
}
.story-cta-link::after { content:'→';transition:transform 0.2s; }
.story-cta-link:hover { color:var(--coral); gap:16px; }
.story-cta-link:hover::after { transform:translateX(6px); }

.story-stats {
  display:flex;gap:36px;flex-wrap:wrap;
  margin-top:40px;padding-top:32px;
  border-top:1px solid var(--border);
}
.stat-item strong {
  display:block;
  font-family:var(--serif);font-size:2.4rem;font-weight:700;
  color:var(--ink);line-height:1;letter-spacing:-0.03em;
}
.stat-item strong span { color:var(--coral); }
.stat-item p { font-size:0.65rem;font-weight:600;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-top:5px; }

/* ── INGREDIENTS ──────────────────────────────────── */
.ing-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--cream-2);
  position:relative;
  overflow:hidden;
}
/* wave top divider */
.ing-section::before {
  content:'';
  position:absolute;top:0;left:0;right:0;
  height:80px;
  background:var(--white);
  clip-path:ellipse(60% 100% at 50% 0%);
  pointer-events:none;
}

.ing-grid {
  display:grid;
  grid-template-columns:1fr 1.25fr;
  gap:80px;
  align-items:center;
}

.ing-title {
  font-family:var(--serif);
  font-size:clamp(1.9rem,4vw,3.2rem);
  font-weight:700;
  color:var(--ink);
  line-height:1.06;
  letter-spacing:-0.02em;
  margin-bottom:22px;
}
.ing-title em { font-style:italic;font-weight:300;color:var(--coral); }
.ing-body { font-size:0.9rem;line-height:1.88;color:var(--muted);margin-bottom:28px; }

.ing-tags { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px; }
.ing-tag {
  display:inline-block;
  background:white;
  border:1px solid var(--border);
  border-radius:999px;
  padding:7px 18px;
  font-size:0.67rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;
  color:var(--ink-2);
  transition:all 0.2s;
  cursor:default;
}
.ing-tag:hover { border-color:var(--coral);color:var(--coral);transform:translateY(-2px); }

.ing-link {
  display:inline-flex;align-items:center;gap:10px;
  color:var(--coral);font-weight:700;font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;
  transition:gap 0.2s;
}
.ing-link:hover { gap:16px; }

.ing-imgs {
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:auto auto;
  gap:14px;
}
.ing-tall {
  grid-row:span 2;
  border-radius:22px;overflow:hidden;
}
.ing-tall img { width:100%;height:100%;object-fit:cover;min-height:280px;transition:transform 0.7s var(--expo); }
.ing-tall:hover img { transform:scale(1.07); }
.ing-sm { border-radius:22px;overflow:hidden;aspect-ratio:1; }
.ing-sm img { width:100%;height:100%;object-fit:cover;transition:transform 0.7s var(--expo); }
.ing-sm:hover img { transform:scale(1.07); }

/* ── COLLECTION ───────────────────────────────────── */
.collection-section {
  padding:clamp(72px,9vw,120px) 0 clamp(90px,11vw,140px);
  background:var(--white);
  position:relative;
}
/* Decorative corner flower */
.collection-section::after {
  content:'✦';
  position:absolute;left:4%;bottom:6%;
  font-size:180px;
  color:rgba(239,119,106,0.04);
  pointer-events:none;
  font-family:var(--serif);
}

.collection-header {
  display:flex;justify-content:space-between;align-items:flex-end;
  margin-bottom:48px;flex-wrap:wrap;gap:20px;
}
.collection-title {
  font-family:var(--serif);
  font-size:clamp(2rem,4vw,3.2rem);
  font-weight:700;
  color:var(--ink);
  letter-spacing:-0.02em;
}
.collection-title em { font-style:italic;font-weight:300;color:var(--coral); }

/* Filter tabs — refined pill row */
.filters {
  display:flex;gap:6px;
  background:var(--cream);
  border:1px solid var(--border);
  border-radius:999px;
  padding:5px;
}
.filter-btn {
  padding:9px 24px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.7rem;font-weight:700;
  cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;
  transition:all 0.25s var(--spring);
  border:none;background:none;color:var(--muted);
}
.filter-btn:hover { color:var(--coral); }
.filter-btn.active {
  background:var(--coral);color:white;
  box-shadow:0 4px 18px rgba(239,119,106,0.35);
  transform:scale(1.04);
}

.products-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
  gap:24px;
}
.skeleton {
  height:400px;border-radius:22px;
  background:linear-gradient(90deg,#ece9e4 25%,#f5f2ee 50%,#ece9e4 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
}

/* Empty state */
.empty-state {
  grid-column:1/-1;
  text-align:center;
  padding:80px 20px;
  color:var(--muted);
}
.empty-icon { font-size:48px;margin-bottom:16px;opacity:0.5; }
.empty-text { font-size:0.9rem; }

/* ── PROCESS ──────────────────────────────────────── */
.process-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--cream);
  position:relative;
  overflow:hidden;
}
.process-section::before {
  content:'';
  position:absolute;top:-100px;right:-100px;
  width:400px;height:400px;border-radius:50%;
  background:radial-gradient(circle,rgba(201,169,110,0.1) 0%,transparent 70%);
  pointer-events:none;
}

.process-header { text-align:center;margin-bottom:52px; }
.process-header-title {
  font-family:var(--serif);
  font-size:clamp(1.9rem,4vw,3rem);
  font-weight:700;
  color:var(--ink);
  letter-spacing:-0.02em;
}
.process-header-title em { font-style:italic;font-weight:300;color:var(--gold); }

.process-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  border:1px solid var(--border);
  border-radius:28px;
  overflow:hidden;
  background:var(--white);
}
.process-step {
  padding:40px 28px;
  border-right:1px solid var(--border);
  position:relative;
  overflow:hidden;
  transition:background 0.3s;
}
.process-step:last-child { border-right:none; }
.process-step:hover { background:var(--cream); }
/* bottom bar animation */
.process-step::after {
  content:'';
  position:absolute;bottom:0;left:0;right:0;
  height:3px;
  background:linear-gradient(to right,var(--coral),var(--gold));
  transform:scaleX(0);transform-origin:left;
  transition:transform 0.45s var(--expo);
}
.process-step:hover::after { transform:scaleX(1); }

.process-num {
  font-family:var(--serif);
  font-size:4rem;font-weight:900;
  color:rgba(14,13,11,0.04);
  line-height:1;
  margin-bottom:14px;letter-spacing:-0.04em;
}
.process-icon { font-size:22px;margin-bottom:14px; }
.process-name { font-size:0.76rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink);margin-bottom:10px; }
.process-desc { font-size:0.8rem;line-height:1.72;color:var(--muted); }

/* ── PROMO BANNER ─────────────────────────────────── */
.promo-section {
  background:linear-gradient(135deg,var(--coral) 0%,#C25045 100%);
  position:relative;overflow:hidden;
}
.promo-section::before {
  content:'';position:absolute;
  top:-60%;left:-10%;
  width:600px;height:600px;border-radius:50%;
  background:rgba(255,255,255,0.05);pointer-events:none;
}
.promo-section::after {
  content:'✦';
  position:absolute;right:6%;top:50%;transform:translateY(-50%);
  font-size:200px;color:rgba(255,255,255,0.04);
  font-family:var(--serif);pointer-events:none;
}
.promo-inner {
  position:relative;z-index:1;
  display:flex;align-items:center;justify-content:space-between;
  padding:clamp(48px,7vw,80px) clamp(24px,6vw,100px);
  gap:32px;flex-wrap:wrap;
}
.promo-eyebrow { font-size:0.65rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:10px; }
.promo-title {
  font-family:var(--serif);
  font-size:clamp(1.6rem,3.5vw,2.8rem);font-weight:700;
  color:white;line-height:1.1;letter-spacing:-0.02em;
}
.btn-white {
  display:inline-flex;align-items:center;gap:10px;
  background:white;color:var(--coral);
  padding:16px 40px;border-radius:999px;
  font-family:var(--sans);font-size:0.72rem;font-weight:800;
  letter-spacing:0.1em;text-transform:uppercase;
  white-space:nowrap;flex-shrink:0;
  transition:transform 0.25s var(--spring), box-shadow 0.25s;
  box-shadow:0 8px 32px rgba(14,13,11,0.18);
}
.btn-white:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 16px 40px rgba(14,13,11,0.25); }

/* ── PRESS STRIP ──────────────────────────────────── */
.press-section {
  padding:44px 0;
  background:var(--white);
  border-bottom:1px solid var(--border);
}
.press-inner {
  display:flex;align-items:center;gap:48px;justify-content:center;flex-wrap:wrap;
}
.press-label {
  font-size:0.62rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
  color:var(--muted);flex-shrink:0;
}
.press-names { display:flex;gap:40px;align-items:center;flex-wrap:wrap;justify-content:center; }
.press-name {
  font-family:var(--serif);font-size:1.4rem;font-weight:400;
  color:rgba(14,13,11,0.18);letter-spacing:0.06em;white-space:nowrap;
  transition:color 0.3s, transform 0.3s;
}
.press-name:hover { color:var(--ink);transform:translateY(-3px); }

/* ── FOOTER BANNER ────────────────────────────────── */
.footer-banner {
  position:relative;
  padding:clamp(80px,12vw,140px) 0;
  background:var(--cream-2);
  text-align:center;overflow:hidden;
}
.footer-banner::before {
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 100%,rgba(239,119,106,0.12) 0%,transparent 70%);
  pointer-events:none;
}
.footer-banner-content { position:relative;z-index:2; }
.banner-eyebrow { display:inline-block;font-size:0.62rem;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:var(--coral);margin-bottom:18px; }
.banner-title {
  font-family:var(--serif);
  font-size:clamp(2rem,5vw,4rem);font-weight:700;
  color:var(--ink);line-height:1.07;letter-spacing:-0.02em;
  margin-bottom:36px;
}
.banner-actions { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }

/* Ghost dark */
.btn-ghost-dark {
  display:inline-flex;align-items:center;gap:9px;
  background:rgba(14,13,11,0.06);
  color:var(--ink);
  padding:15px 28px;border-radius:999px;
  font-family:var(--sans);font-size:0.72rem;font-weight:600;letter-spacing:0.06em;
  border:1px solid var(--border);
  transition:background 0.2s, transform 0.2s;
}
.btn-ghost-dark:hover { background:rgba(14,13,11,0.1); transform:translateY(-2px); }

/* ── FOOTER ───────────────────────────────────────── */
.footer { background:var(--ink);padding:clamp(52px,8vw,84px) 0 40px;color:rgba(255,255,255,0.45); }
.footer-top { display:grid;grid-template-columns:2fr 1fr 1fr 2fr;gap:48px;margin-bottom:56px; }
.footer-logo { font-family:var(--serif);font-size:1.7rem;font-weight:700;color:white;margin-bottom:10px;letter-spacing:-0.01em; }
.footer-logo span { color:var(--gold); }
.footer-tagline { font-size:0.8rem;line-height:1.75;color:rgba(255,255,255,0.3);margin-bottom:24px; }
.footer-social { display:flex;gap:10px; }
.social-btn {
  display:flex;align-items:center;justify-content:center;
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(255,255,255,0.1);
  color:rgba(255,255,255,0.35);
  font-size:0.62rem;font-weight:700;
  transition:all 0.2s;
}
.social-btn:hover { border-color:var(--gold);color:var(--gold);transform:translateY(-3px); }

.footer-heading { color:white;font-size:0.65rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:20px; }
.footer-link { display:block;font-size:0.8rem;color:rgba(255,255,255,0.32);margin-bottom:11px;transition:color 0.2s; }
.footer-link:hover { color:white; }

.email-form { display:flex;gap:8px;margin-top:4px; }
.email-input {
  flex:1;min-width:0;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:12px;padding:12px 16px;
  font-family:var(--sans);font-size:0.8rem;color:white;outline:none;
  transition:border-color 0.2s;
}
.email-input::placeholder { color:rgba(255,255,255,0.22); }
.email-input:focus { border-color:rgba(255,255,255,0.3); }
.email-btn {
  background:var(--coral);color:white;border-radius:12px;
  padding:12px 20px;font-family:var(--sans);font-size:0.73rem;font-weight:700;
  cursor:pointer;white-space:nowrap;transition:background 0.2s, transform 0.2s;
}
.email-btn:hover { background:var(--coral-d);transform:translateY(-1px); }

.footer-bottom {
  display:flex;justify-content:space-between;align-items:center;
  padding-top:28px;border-top:1px solid rgba(255,255,255,0.06);
  flex-wrap:wrap;gap:12px;
}
.footer-copy { font-size:0.7rem;color:rgba(255,255,255,0.18); }
.footer-bottom-links { display:flex;gap:24px;flex-wrap:wrap; }
.footer-bottom-link { font-size:0.7rem;color:rgba(255,255,255,0.2);transition:color 0.2s; }
.footer-bottom-link:hover { color:rgba(255,255,255,0.55); }

/* ══════════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════════ */
@media (max-width:1100px) {
  .hero-content { grid-template-columns:1fr; }
  .hero-right { display:none; }
  .story-grid,.ing-grid { grid-template-columns:1fr;gap:40px; }
  .story-img-frame { display:none; }
  .story-float { left:16px; }
  .process-grid { grid-template-columns:1fr 1fr; }
  .process-step:nth-child(2) { border-right:none; }
  .process-step:nth-child(1),
  .process-step:nth-child(2) { border-bottom:1px solid var(--border); }
  .footer-top { grid-template-columns:1fr 1fr;gap:36px; }
}
@media (max-width:768px) {
  .cat-grid { grid-template-columns:1fr;gap:16px; }
  .cat-card { aspect-ratio:4/3; }
  .trust-inner { flex-direction:column; }
  .trust-item { border-right:none;border-bottom:1px solid var(--border);justify-content:flex-start;padding:16px 20px;min-width:100%; }
  .trust-item:last-child { border-bottom:none; }
  .process-grid { grid-template-columns:1fr; }
  .process-step { border-right:none !important;border-bottom:1px solid var(--border); }
  .process-step:last-child { border-bottom:none; }
  .footer-top { grid-template-columns:1fr; }
  .story-stats { flex-direction:column;gap:20px; }
  .promo-inner { text-align:center;justify-content:center; }
  .hero-scroll-hint { display:none; }
  .story-float { display:none; }
  .collection-header { flex-direction:column;align-items:flex-start; }
  .products-grid { grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
}
@media (max-width:480px) {
  .hero-title { font-size:2.6rem; }
  .cat-card { aspect-ratio:16/9; }
  .products-grid { grid-template-columns:1fr 1fr;gap:12px; }
  .hero-actions { flex-direction:column; }
  .btn-primary,.btn-ghost { width:100%;justify-content:center; }
  .filters { flex-wrap:wrap;border-radius:16px; }
  .ing-imgs { grid-template-columns:1fr; }
  .ing-tall { grid-row:auto; }
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
export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
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

        <div className="hero-content">
          <div>
            <span className="hero-tag">Maison de Parfums — Casablanca</span>
<h1 className="hero-title" style={{ color: "white" }}>
  L'Art de<br />la Séduction<br /><em>Olfactive</em>
</h1>
            <div className="hero-actions" style={{ marginTop: "34px" }}>
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

      {/* ── TRUST STRIP ── */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-inner">
            {[
              { icon: "🚚", title: "Livraison offerte", sub: "-" },
              { icon: "🧪", title: "Échantillon offert", sub: "Avec chaque commande" },
              { icon: "⭐", title: "4.9 / 5 · 2 400 avis", sub: "Clients satisfaits" },
              { icon: "🌿", title: "100% naturels", sub: "Sélectionnés à la source" },
            ].map(({ icon, title, sub }) => (
              <div className="trust-item" key={title}>
                <span className="trust-icon">{icon}</span>
                <div className="trust-text">
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section className="cat-section">
        <div className="container">
          <div className="cat-section-header sr">
            <div className="eyebrow">Nos Collections</div>
            <h2 className="cat-section-title">
              Choisissez votre <em>univers</em>
            </h2>
          </div>
          <div className="cat-grid">
            {[
              {
                label: "Femme",
                count: "32 parfums",
                img: "/femmeNahid.png",
                fallback: "https://i.postimg.cc/dQTtHTgz/femme-Nahid.png",
                path: "/collection/femme",  // ← Lien vers CollectionFemme
                tag: "Féminin",
                delay: "d1"
              },
              {
                label: "Homme",
                count: "28 parfums",
                img: "/hommeNahid.png",
                fallback: "https://i.postimg.cc/WpJbWJxx/homme-Nahid.jpg",
                path: "/collection/homme",  // ← Lien vers CollectionHomme
                tag: "Masculin",
                delay: "d2"
              },
              {
                label: "Unisex",
                count: "18 parfums",
                img: "/unisexNahid.png",
                fallback: "https://i.postimg.cc/MZjKPjgN/unisex-Nahid.png",
                path: "/collection/unisex",  // ← Lien vers CollectionUnisex
                tag: "Libre",
                delay: "d3"
              },
            ].map(({ label, count, img, fallback, path, tag, delay }) => (
              <Link
                key={label}
                to={path}
                className={`cat-card sr sr-scale ${delay}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <img
                  className="cat-card-img"
                  src={img}
                  alt={label}
                  loading="lazy"
                  onError={e => { e.currentTarget.src = fallback; }}
                />
                <div className="cat-card-overlay" />

                <div className="cat-card-top">
                  <span className="cat-card-tag">{tag}</span>
                  <span className="cat-card-count-badge">{count}</span>
                </div>

                <div className="cat-card-body">
                  <div className="cat-card-line" />
                  <span className="cat-card-name">{label}</span>
                  <span className="cat-card-sub">{count}</span>
                  <span className="cat-card-cta">Explorer →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
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
              <div className="story-badge">Née à Casablanca</div>
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
                  { n: "12+", l: "Ans d'expertise" },
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
                {["Oud de Camboge", "Rose de Taif", "Ambre Gris", "Iris de Florence", "Musc Blanc", "Cèdre de l'Atlas"].map(t => (
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
              {[1, 2, 3, 4].map(n => <div key={n} className="skeleton" />)}
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
            <div className="eyebrow">Notre savoir-faire</div>
            <h2 className="process-header-title">Du terroir <em>au flacon</em></h2>
          </div>
          <div className="process-grid">
            {[
              { n: "01", icon: "🌍", name: "Sourcing", desc: "Nous sélectionnons les matières premières chez les meilleurs producteurs à travers le monde." },
              { n: "02", icon: "🔬", name: "Création", desc: "Nos parfumeurs assemblent chaque accord avec précision et sensibilité uniques." },
              { n: "03", icon: "🧪", name: "Tests", desc: "Chaque fragrance est testée pendant des mois avant validation pour notre collection." },
              { n: "04", icon: "📦", name: "Livraison", desc: "Votre parfum est emballé avec soin et livré directement chez vous en 24–48h." },
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
              {["Vogue", "Elle Maroc", "L'Obs", "Marie Claire", "Grazia"].map(p => (
                <a key={p} href="#" className="press-name">{p}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="promo-section">
        <div className="promo-inner">
          <div className="promo-text">
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
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <h3 className="footer-logo">Nahid<span>·</span>Perfume</h3>
              <p className="footer-tagline">L'art de la parfumerie marocaine,<br />composé avec passion à Casablanca.</p>
              <div className="footer-social">
                {["In", "Tk", "Fb", "Yt"].map(s => <a key={s} href="#" className="social-btn">{s}</a>)}
              </div>
            </div>
            <div>
              <h4 className="footer-heading">Découvrir</h4>
              {["Nos Parfums", "Notre Histoire", "Scent Finder", "Blog Olfactif", "Gift Sets"].map(l => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
            <div>
              <h4 className="footer-heading">Aide</h4>
              {["Contact", "FAQ", "Livraison", "Suivi commande", "Mentions légales"].map(l => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
            <div>
              <h4 className="footer-heading">Newsletter</h4>
              <p style={{ fontSize: "0.8rem", lineHeight: "1.75", color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>
                Nouvelles fragrances et offres exclusives réservées à nos abonnés.
              </p>
              <div className="email-form">
                <input className="email-input" type="email" placeholder="votre@email.com" />
                <button className="email-btn">S'inscrire</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Nahid Perfume · Casablanca, Maroc</span>
            <div className="footer-bottom-links">
              {["Mentions légales", "Politique de confidentialité", "CGV"].map(l => (
                <a key={l} href="#" className="footer-bottom-link">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}