import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ═══════════════════════════════════════════════════════
   CHECKOUT CSS — Nahid Perfume · Luxury Warm Palette
═══════════════════════════════════════════════════════ */
const checkoutCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --co-ink:       #1C1A16;
    --co-ink-2:     #3D3A33;
    --co-cream:     #FBF8F3;
    --co-cream-2:   #F5EFE4;
    --co-cream-3:   #EDE5D8;
    --co-white:     #FFFFFF;
    --co-rose:      #D4857A;
    --co-rose-d:    #B86B60;
    --co-rose-l:    #F4E8E6;
    --co-rose-xl:   #FDF5F4;
    --co-gold:      #C8A96A;
    --co-gold-d:    #A8883E;
    --co-gold-l:    #E9D6A9;
    --co-gold-xl:   #FAF3E3;
    --co-sage:      #6A9B6A;
    --co-sage-l:    #EAF2EA;
    --co-muted:     #8C8478;
    --co-border:    rgba(28,26,22,0.09);
    --co-border-2:  rgba(28,26,22,0.05);
    --co-sans:      'DM Sans', sans-serif;
    --co-serif:     'Cormorant Garamond', Georgia, serif;
    --co-spring:    cubic-bezier(0.34,1.56,0.64,1);
    --co-expo:      cubic-bezier(0.16,1,0.3,1);
    --co-ease:      cubic-bezier(0.25,0.46,0.45,0.94);
  }

  /* ── Keyframes ── */
  @keyframes coFadeUp    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:none} }
  @keyframes coSlideIn   { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:none} }
  @keyframes coSlideR    { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:none} }
  @keyframes coPop       { from{opacity:0;transform:scale(0.78)} to{opacity:1;transform:scale(1)} }
  @keyframes coSpin      { to{transform:rotate(360deg)} }
  @keyframes coSuccess   { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
  @keyframes coCheckmark { to{stroke-dashoffset:0} }
  @keyframes coFloat     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes coPulse     { 0%,100%{box-shadow:0 0 0 0 rgba(212,133,122,0)} 50%{box-shadow:0 0 0 10px rgba(212,133,122,0.14)} }
  @keyframes coBarFill   { from{width:0} }
  @keyframes coItemIn    { from{opacity:0;transform:translateX(14px)} to{opacity:1;transform:none} }
  @keyframes coBadgePop  { from{transform:scale(0) rotate(-12deg)} to{transform:scale(1) rotate(0)} }
  @keyframes coShimmer   { 0%,100%{opacity:0.5} 50%{opacity:1} }
  @keyframes coOrb       { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(22px,-18px) scale(1.04)} }
  @keyframes coSheen     { from{transform:translateX(-100%) skewX(-18deg)} to{transform:translateX(200%) skewX(-18deg)} }
  @keyframes coInputFocus{ from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes coRipple    { from{transform:scale(0);opacity:0.4} to{transform:scale(4);opacity:0} }
  @keyframes coBounce    { 0%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} 60%{transform:translateY(-2px)} }

  /* ── Page ── */
  .co-page {
    background: var(--co-cream);
    min-height: 100vh;
    padding: clamp(44px,7vw,96px) 0 clamp(72px,10vw,140px);
    font-family: var(--co-sans);
    position: relative;
    overflow: hidden;
  }
  .co-page * { box-sizing: border-box; }

  /* Decorative orbs */
  .co-orb {
    position:fixed; border-radius:50%; pointer-events:none; z-index:0;
  }
  .co-orb-1 {
    width:700px; height:700px; top:-280px; left:-280px;
    background:radial-gradient(circle, rgba(200,169,106,0.1), transparent 68%);
    animation:coOrb 22s ease-in-out infinite;
  }
  .co-orb-2 {
    width:550px; height:550px; bottom:-200px; right:-200px;
    background:radial-gradient(circle, rgba(212,133,122,0.09), transparent 68%);
    animation:coOrb 18s ease-in-out infinite reverse;
  }

  /* Linen texture */
  .co-texture {
    position:fixed; inset:0; pointer-events:none; z-index:0; opacity:0.3;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(200,169,106,0.06) 28px, rgba(200,169,106,0.06) 29px),
      repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(200,169,106,0.04) 28px, rgba(200,169,106,0.04) 29px);
  }

  /* ── Breadcrumb ── */
  .co-breadcrumb {
    display:flex; align-items:center; gap:8px;
    margin-bottom:clamp(28px,4vw,44px);
    animation:coFadeUp 0.5s var(--co-expo) both;
    position:relative; z-index:1;
  }
  .co-breadcrumb a {
    font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
    color:var(--co-muted); text-decoration:none; transition:color 0.2s;
  }
  .co-breadcrumb a:hover { color:var(--co-rose); }
  .co-breadcrumb .co-bc-sep { font-size:0.7rem; color:var(--co-border); }
  .co-breadcrumb .co-bc-active {
    font-size:0.68rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase;
    color:var(--co-rose);
  }

  /* ── Page Header ── */
  .co-header {
    margin-bottom:clamp(28px,4vw,48px);
    animation:coFadeUp 0.6s var(--co-expo) 0.06s both;
    position:relative; z-index:1;
  }
  .co-header-eyebrow {
    display:inline-flex; align-items:center; gap:10px;
    font-size:0.6rem; font-weight:700; letter-spacing:0.32em; text-transform:uppercase;
    color:var(--co-gold); margin-bottom:12px;
  }
  .co-header-eyebrow::before,.co-header-eyebrow::after {
    content:''; width:24px; height:1px; background:var(--co-gold); opacity:0.7;
  }
  .co-title {
    font-family:var(--co-serif);
    font-size:clamp(2.2rem,5vw,3.6rem);
    font-weight:600; color:var(--co-ink);
    letter-spacing:-0.02em; line-height:1.04; margin-bottom:10px;
  }
  .co-title em { font-style:italic; font-weight:300; color:var(--co-rose); }
  .co-subtitle { font-size:0.84rem; color:var(--co-muted); letter-spacing:0.02em; }

  /* ── Steps ── */
  .co-steps {
    display:flex; align-items:center;
    margin-bottom:clamp(28px,5vw,52px);
    animation:coFadeUp 0.6s var(--co-expo) 0.12s both;
    position:relative; z-index:1;
  }
  .co-step { display:flex; align-items:center; gap:10px; }
  .co-step-dot {
    width:36px; height:36px; border-radius:50%;
    border:2px solid var(--co-border);
    background:var(--co-white);
    display:flex; align-items:center; justify-content:center;
    font-size:0.72rem; font-weight:800; color:var(--co-muted);
    transition:all 0.35s var(--co-spring); flex-shrink:0;
    box-shadow:0 2px 8px rgba(28,26,22,0.06);
  }
  .co-step.done .co-step-dot {
    background:var(--co-rose); border-color:var(--co-rose); color:white;
    box-shadow:0 4px 16px rgba(212,133,122,0.4);
  }
  .co-step.active .co-step-dot {
    background:var(--co-ink); border-color:var(--co-ink); color:white;
    animation:coPulse 2.5s ease infinite;
  }
  .co-step-label {
    font-size:0.66rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
    color:var(--co-muted); transition:color 0.2s; white-space:nowrap;
  }
  .co-step.active .co-step-label { color:var(--co-ink); }
  .co-step.done .co-step-label { color:var(--co-rose); }
  .co-step-line {
    flex:1; height:2px; background:var(--co-cream-3);
    margin:0 clamp(8px,2vw,18px); border-radius:1px; overflow:hidden; position:relative;
  }
  .co-step-line.filled::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg, var(--co-rose), var(--co-gold));
    animation:coBarFill 0.7s var(--co-expo) 0.2s both;
    border-radius:1px;
  }

  /* ── Layout ── */
  .co-layout {
    display:grid; grid-template-columns:1fr 400px;
    gap:clamp(18px,3vw,36px); align-items:start;
    position:relative; z-index:1;
  }

  /* ── Form panel ── */
  .co-form-panel { display:flex; flex-direction:column; gap:18px; }

  /* Card */
  .co-card {
    background:var(--co-white);
    border-radius:28px; border:1px solid var(--co-border);
    overflow:hidden;
    transition:box-shadow 0.35s, transform 0.35s var(--co-spring);
    box-shadow:0 3px 20px rgba(28,26,22,0.06);
  }
  .co-card:hover { box-shadow:0 12px 44px rgba(28,26,22,0.1); transform:translateY(-2px); }

  .co-card-header {
    display:flex; align-items:center; gap:14px;
    padding:20px 26px; border-bottom:1px solid var(--co-border);
    background:linear-gradient(135deg, var(--co-cream-2) 0%, var(--co-white) 100%);
    position:relative; overflow:hidden;
  }
  /* Subtle decorative corner */
  .co-card-header::after {
    content:'✦'; position:absolute; right:20px; top:50%; transform:translateY(-50%);
    font-size:1.8rem; color:rgba(200,169,106,0.12); font-family:var(--co-serif);
    pointer-events:none;
  }
  .co-card-icon {
    width:42px; height:42px; border-radius:14px;
    display:flex; align-items:center; justify-content:center;
    font-size:1.1rem; flex-shrink:0;
    transition:transform 0.3s var(--co-spring);
  }
  .co-card:hover .co-card-icon { transform:scale(1.1) rotate(-5deg); }
  .co-card-icon.rose {
    background:linear-gradient(135deg, var(--co-rose-l), #fdecea);
    border:1px solid rgba(212,133,122,0.2);
    box-shadow:0 4px 14px rgba(212,133,122,0.18);
  }
  .co-card-icon.gold {
    background:linear-gradient(135deg, var(--co-gold-xl), #f5e8c8);
    border:1px solid rgba(200,169,106,0.25);
    box-shadow:0 4px 14px rgba(200,169,106,0.18);
  }
  .co-card-icon.sage {
    background:linear-gradient(135deg, var(--co-sage-l), #dceedd);
    border:1px solid rgba(106,155,106,0.2);
    box-shadow:0 4px 14px rgba(106,155,106,0.15);
  }
  .co-card-title {
    font-size:0.88rem; font-weight:800; color:var(--co-ink); letter-spacing:-0.01em;
  }
  .co-card-sub { font-size:0.68rem; font-weight:500; color:var(--co-muted); margin-top:2px; }
  .co-card-body { padding:clamp(18px,3vw,28px); }

  /* ── Form fields ── */
  .co-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .co-field { display:flex; flex-direction:column; gap:7px; margin-bottom:14px; }
  .co-field:last-child { margin-bottom:0; }

  .co-label {
    font-size:0.64rem; font-weight:800; letter-spacing:0.14em; text-transform:uppercase;
    color:var(--co-ink-2);
  }
  .co-label-req { color:var(--co-rose); margin-left:2px; }

  .co-input-wrap { position:relative; }
  .co-input-icon {
    position:absolute; left:14px; top:50%; transform:translateY(-50%);
    font-size:0.9rem; pointer-events:none; opacity:0.45; z-index:1;
  }
  .co-textarea-wrap .co-input-icon { top:16px; transform:none; }

  .co-input, .co-select, .co-textarea {
    width:100%; padding:14px 16px 14px 44px;
    border:1.5px solid var(--co-border);
    border-radius:14px;
    font-family:var(--co-sans); font-size:0.88rem; font-weight:500;
    color:var(--co-ink); background:var(--co-cream-2);
    outline:none; appearance:none; -webkit-appearance:none;
    transition:border-color 0.25s, background 0.25s, box-shadow 0.25s;
    position:relative; z-index:0;
  }
  .co-input:focus, .co-select:focus, .co-textarea:focus {
    border-color:var(--co-rose);
    background:var(--co-white);
    box-shadow:0 0 0 4px rgba(212,133,122,0.12);
  }
  .co-input::placeholder, .co-textarea::placeholder { color:rgba(28,26,22,0.28); font-weight:400; }
  .co-textarea { resize:vertical; min-height:116px; padding-top:14px; line-height:1.65; }

  /* Animated underline on focus */
  .co-field-underline {
    display:block; height:2px; border-radius:999px;
    background:linear-gradient(to right, var(--co-rose), var(--co-gold));
    transform:scaleX(0); transform-origin:left;
    transition:transform 0.35s var(--co-expo);
    margin-top:-2px;
  }
  .co-input:focus ~ .co-field-underline,
  .co-select:focus ~ .co-field-underline,
  .co-textarea:focus ~ .co-field-underline { transform:scaleX(1); }

  /* City chips */
  .co-city-chips { display:flex; gap:6px; flex-wrap:wrap; margin-top:10px; }
  .co-city-chip {
    padding:5px 13px; border-radius:999px; cursor:pointer;
    background:var(--co-cream-2); border:1px solid var(--co-border);
    font-size:0.66rem; font-weight:700; color:var(--co-muted);
    transition:all 0.2s; letter-spacing:0.04em;
    user-select:none;
  }
  .co-city-chip:hover { border-color:var(--co-rose); color:var(--co-rose); transform:translateY(-2px); }
  .co-city-chip.active { background:var(--co-rose-xl); border-color:var(--co-rose); color:var(--co-rose-d); }

  /* Delivery info chips */
  .co-info-chips { display:flex; gap:6px; flex-wrap:wrap; margin-top:12px; }
  .co-info-chip {
    display:inline-flex; align-items:center; gap:5px;
    padding:5px 13px; border-radius:999px;
    background:var(--co-gold-xl); border:1px solid var(--co-gold-l);
    font-size:0.63rem; font-weight:700; color:var(--co-gold-d);
    letter-spacing:0.04em;
  }

  /* COD payment block */
  .co-cod-block {
    display:flex; align-items:flex-start; gap:16px;
    padding:18px 20px; border-radius:18px;
    background:linear-gradient(135deg, var(--co-sage-l) 0%, rgba(234,242,234,0.5) 100%);
    border:1.5px solid rgba(106,155,106,0.22);
  }
  .co-cod-icon {
    width:44px; height:44px; border-radius:14px; flex-shrink:0;
    background:linear-gradient(135deg, #5A9A5A, #3D7A3D);
    display:flex; align-items:center; justify-content:center;
    font-size:1.3rem;
    box-shadow:0 4px 14px rgba(61,122,61,0.28);
  }
  .co-cod-title { font-size:0.86rem; font-weight:800; color:#2E6B2E; margin-bottom:4px; }
  .co-cod-text { font-size:0.73rem; color:#4A7A4A; line-height:1.6; }
  .co-cod-badge {
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 11px; border-radius:999px; margin-top:8px;
    background:rgba(61,122,61,0.1); border:1px solid rgba(61,122,61,0.2);
    font-size:0.6rem; font-weight:800; color:#2E6B2E; letter-spacing:0.1em; text-transform:uppercase;
  }

  /* SSL badge */
  .co-ssl-badge {
    display:flex; align-items:center; gap:10px;
    padding:13px 18px; border-radius:14px;
    background:var(--co-cream-2); border:1px solid var(--co-border);
    margin-bottom:18px;
  }
  .co-ssl-text { font-size:0.7rem; font-weight:700; color:var(--co-muted); }

  /* ── Submit button ── */
  .co-submit {
    width:100%; padding:18px 24px; border:none; border-radius:999px;
    background:linear-gradient(135deg, var(--co-rose), var(--co-rose-d));
    color:white; font-family:var(--co-sans);
    font-size:0.82rem; font-weight:800;
    letter-spacing:0.1em; text-transform:uppercase;
    cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px;
    transition:transform 0.3s var(--co-spring), box-shadow 0.3s;
    box-shadow:0 8px 28px rgba(212,133,122,0.45);
    position:relative; overflow:hidden;
  }
  .co-submit::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%);
    transform:translateX(-100%) skewX(-15deg);
    transition:transform 0.5s var(--co-ease);
  }
  .co-submit:hover:not(:disabled) { transform:translateY(-4px) scale(1.01); box-shadow:0 16px 40px rgba(212,133,122,0.55); }
  .co-submit:hover:not(:disabled)::after { transform:translateX(160%) skewX(-15deg); }
  .co-submit:active:not(:disabled) { transform:scale(0.98); }
  .co-submit:disabled { opacity:0.65; cursor:not-allowed; transform:none; }
  .co-submit-ripple {
    position:absolute; border-radius:50%; background:rgba(255,255,255,0.3);
    width:10px; height:10px; margin-top:-5px; margin-left:-5px;
    animation:coRipple 0.55s var(--co-ease) forwards; pointer-events:none;
  }
  .co-spinner {
    width:18px; height:18px; border:2px solid rgba(255,255,255,0.35);
    border-top-color:white; border-radius:50%;
    animation:coSpin 0.7s linear infinite;
  }

  /* ── Summary panel ── */
  .co-summary-panel {
    position:sticky; top:clamp(80px,10vh,100px);
    animation:coSlideR 0.7s var(--co-expo) 0.18s both;
  }

  .co-summary-card {
    background:var(--co-white);
    border-radius:28px; border:1px solid var(--co-border);
    overflow:hidden;
    box-shadow:0 6px 32px rgba(28,26,22,0.08);
    position:relative;
  }
  /* Gold top line */
  .co-summary-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(to right, var(--co-rose), var(--co-gold));
    z-index:1;
  }

  .co-sum-head {
    padding:22px 26px 18px;
    background:linear-gradient(135deg, var(--co-cream-2), var(--co-white));
    border-bottom:1px solid var(--co-border);
  }
  .co-sum-head-top {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:4px;
  }
  .co-sum-head-title {
    font-family:var(--co-serif);
    font-size:1.4rem; font-weight:600; color:var(--co-ink); letter-spacing:-0.01em;
  }
  .co-sum-head-count {
    display:inline-flex; align-items:center; justify-content:center;
    width:26px; height:26px; border-radius:50%;
    background:var(--co-rose); color:white;
    font-size:0.66rem; font-weight:800;
  }
  .co-sum-head-sub { font-size:0.7rem; color:var(--co-muted); }

  /* Items list */
  .co-sum-items {
    padding:16px 22px; display:flex; flex-direction:column; gap:11px;
    max-height:260px; overflow-y:auto;
    scrollbar-width:thin; scrollbar-color:var(--co-border) transparent;
  }
  .co-sum-items::-webkit-scrollbar { width:3px; }
  .co-sum-items::-webkit-scrollbar-thumb { background:var(--co-border); border-radius:2px; }

  .co-sum-item {
    display:flex; align-items:center; gap:11px;
    animation:coItemIn 0.35s var(--co-expo) both; padding:6px 0;
    border-bottom:1px solid var(--co-border-2);
  }
  .co-sum-item:last-child { border-bottom:none; }
  .co-si-img-box {
    position:relative; flex-shrink:0; width:52px; height:52px;
    border-radius:12px; overflow:hidden; background:var(--co-cream-2);
  }
  .co-si-img { width:100%; height:100%; object-fit:cover; display:block; }
  .co-si-qty-badge {
    position:absolute; top:-4px; right:-4px;
    width:18px; height:18px; border-radius:50%;
    background:var(--co-rose); color:white;
    font-size:0.58rem; font-weight:800;
    display:flex; align-items:center; justify-content:center;
    animation:coBadgePop 0.3s var(--co-spring) both;
    border:1.5px solid var(--co-white);
  }
  /* Pack mosaic */
  .co-si-pack-mosaic {
    width:52px; height:52px; border-radius:12px; overflow:hidden; flex-shrink:0;
    display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--co-cream-3);
  }
  .co-si-pack-cell { overflow:hidden; background:var(--co-cream-2); }
  .co-si-pack-cell img { width:100%; height:100%; object-fit:cover; display:block; }
  .co-si-pack-cell.plus {
    display:flex; align-items:center; justify-content:center;
    font-size:0.55rem; font-weight:800; color:var(--co-gold-d);
    background:var(--co-gold-xl);
  }

  .co-si-info { flex:1; min-width:0; }
  .co-si-name {
    font-size:0.8rem; font-weight:700; color:var(--co-ink);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    letter-spacing:-0.01em;
  }
  .co-si-cat {
    font-size:0.6rem; font-weight:700; color:var(--co-rose);
    text-transform:uppercase; letter-spacing:0.08em; margin-top:2px;
  }
  .co-si-pack-tag {
    font-size:0.58rem; font-weight:700; color:var(--co-gold-d);
    text-transform:uppercase; letter-spacing:0.08em; margin-top:2px;
  }
  .co-si-price {
    font-family:var(--co-serif);
    font-size:0.95rem; font-weight:600; color:var(--co-ink);
    flex-shrink:0; letter-spacing:-0.01em;
  }
  .co-si-price.pack-price { color:var(--co-gold-d); }

  /* Pack savings row */
  .co-pack-savings-pill {
    display:flex; align-items:center; gap:6px; justify-content:center;
    margin:8px 22px 0;
    padding:7px 14px; border-radius:10px;
    background:var(--co-sage-l); border:1px solid rgba(106,155,106,0.2);
    font-size:0.65rem; font-weight:800; color:#3D7A3D;
  }

  /* Totals */
  .co-totals {
    padding:16px 22px 22px;
    border-top:1px solid var(--co-border);
    background:var(--co-cream-2);
  }
  .co-tot-row {
    display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;
  }
  .co-tot-label { font-size:0.78rem; font-weight:500; color:var(--co-muted); }
  .co-tot-val { font-size:0.84rem; font-weight:700; color:var(--co-ink); }
  .co-tot-val.free { color:var(--co-sage); font-weight:800; }
  .co-tot-hint {
    font-size:0.68rem; font-weight:700; color:var(--co-rose);
    text-align:center; padding:6px 0 4px;
    animation:coShimmer 2.5s ease infinite;
  }
  .co-tot-divider { height:1px; background:var(--co-border); margin:14px 0; }
  .co-tot-grand {
    display:flex; justify-content:space-between; align-items:baseline; margin-top:4px;
  }
  .co-tot-grand-label {
    font-size:0.78rem; font-weight:800; color:var(--co-ink);
    text-transform:uppercase; letter-spacing:0.1em;
  }
  .co-tot-grand-val {
    font-family:var(--co-serif);
    font-size:2rem; font-weight:600; color:var(--co-ink); letter-spacing:-0.02em;
  }

  /* Trust grid */
  .co-trust-grid {
    display:grid; grid-template-columns:1fr 1fr; gap:7px;
    padding:14px 22px 22px; border-top:1px solid var(--co-border);
  }
  .co-trust-item {
    display:flex; align-items:center; gap:7px;
    padding:9px 11px; background:var(--co-white);
    border-radius:12px; border:1px solid var(--co-border);
    transition:border-color 0.2s, transform 0.2s;
  }
  .co-trust-item:hover { border-color:var(--co-gold-l); transform:translateY(-2px); }
  .co-trust-icon { font-size:0.85rem; flex-shrink:0; }
  .co-trust-text { font-size:0.62rem; font-weight:700; color:var(--co-ink-2); line-height:1.3; }

  /* ── Empty state ── */
  .co-empty {
    min-height:72vh; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center; padding:48px 32px;
    font-family:var(--co-sans); gap:18px;
    position:relative; z-index:1;
  }
  .co-empty-icon-wrap {
    width:100px; height:100px; border-radius:50%;
    background:var(--co-cream-2); border:1px solid var(--co-border);
    display:flex; align-items:center; justify-content:center;
    font-size:2.8rem; animation:coFloat 3.5s ease-in-out infinite;
  }
  .co-empty-title {
    font-family:var(--co-serif);
    font-size:clamp(1.8rem,4vw,2.6rem); font-weight:600; color:var(--co-ink);
    letter-spacing:-0.01em;
  }
  .co-empty-title em { font-style:italic; font-weight:300; color:var(--co-rose); }
  .co-empty-text { font-size:0.88rem; color:var(--co-muted); line-height:1.8; max-width:320px; }
  .co-empty-btn {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg, var(--co-rose), var(--co-rose-d));
    color:white; padding:15px 36px; border-radius:999px; border:none;
    font-family:var(--co-sans); font-size:0.78rem; font-weight:800;
    letter-spacing:0.1em; text-transform:uppercase; cursor:pointer;
    box-shadow:0 8px 24px rgba(212,133,122,0.42);
    transition:transform 0.3s var(--co-spring), box-shadow 0.3s;
  }
  .co-empty-btn:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 14px 36px rgba(212,133,122,0.52); }

  /* ── Success state ── */
  .co-success-wrap {
    min-height:80vh; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center; padding:48px 32px; font-family:var(--co-sans);
    position:relative; z-index:1;
  }
  .co-success-ring {
    width:110px; height:110px; position:relative;
    margin-bottom:32px;
    animation:coSuccess 0.65s var(--co-spring) both;
  }
  .co-success-ring svg { width:100%; height:100%; transform:rotate(-90deg); }
  .ring-bg { fill:none; stroke:rgba(106,155,106,0.15); stroke-width:3; }
  .ring-fill {
    fill:none; stroke:#4A8A4A; stroke-width:3;
    stroke-dasharray:283; stroke-dashoffset:283;
    animation:coCheckmark 0.9s var(--co-ease) 0.3s forwards;
    stroke-linecap:round;
  }
  .co-success-check {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    font-size:2.6rem; animation:coPop 0.45s var(--co-spring) 0.5s both; opacity:0;
    animation-fill-mode:both;
  }
  .co-success-confetti {
    display:flex; gap:12px; margin-bottom:24px; font-size:1.4rem;
    animation:coBounce 1s var(--co-spring) 0.6s both; opacity:0;
    animation-fill-mode:both;
  }
  .co-success-title {
    font-family:var(--co-serif);
    font-size:clamp(1.8rem,4.5vw,2.8rem); font-weight:600; color:var(--co-ink);
    letter-spacing:-0.02em; margin-bottom:14px;
    animation:coFadeUp 0.5s var(--co-expo) 0.45s both; opacity:0; animation-fill-mode:both;
  }
  .co-success-title em { font-style:italic; font-weight:300; color:var(--co-rose); }
  .co-success-sub {
    font-size:0.9rem; color:var(--co-muted); line-height:1.8; max-width:400px; margin-bottom:32px;
    animation:coFadeUp 0.5s var(--co-expo) 0.55s both; opacity:0; animation-fill-mode:both;
  }
  .co-success-ref {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--co-gold-xl); border:1px solid var(--co-gold-l);
    border-radius:14px; padding:12px 24px;
    font-size:0.72rem; font-weight:700; color:var(--co-muted);
    letter-spacing:0.08em; margin-bottom:32px;
    animation:coFadeUp 0.5s var(--co-expo) 0.62s both; opacity:0; animation-fill-mode:both;
  }
  .co-success-ref span { color:var(--co-gold-d); font-family:monospace; font-size:0.86rem; font-weight:800; }
  .co-success-home {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg, var(--co-rose), var(--co-rose-d));
    color:white; padding:15px 36px; border-radius:999px; border:none;
    font-family:var(--co-sans); font-size:0.78rem; font-weight:800;
    letter-spacing:0.1em; text-transform:uppercase; cursor:pointer;
    box-shadow:0 8px 24px rgba(212,133,122,0.42);
    transition:transform 0.3s var(--co-spring), box-shadow 0.3s;
    animation:coFadeUp 0.5s var(--co-expo) 0.7s both; opacity:0; animation-fill-mode:both;
  }
  .co-success-home:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 14px 36px rgba(212,133,122,0.52); }
  .co-success-redirect {
    margin-top:14px; font-size:0.68rem; color:var(--co-muted);
    animation:coFadeUp 0.5s var(--co-expo) 0.8s both; opacity:0; animation-fill-mode:both;
  }

  /* ── Responsive ── */
  @media (max-width:1100px) {
    .co-layout { grid-template-columns:1fr; }
    .co-summary-panel { position:static; order:-1; }
    .co-sum-items { max-height:200px; }
  }
  @media (max-width:700px) {
    .co-card-body { padding:16px 18px; }
    .co-row { grid-template-columns:1fr; }
    .co-step-label { display:none; }
    .co-trust-grid { grid-template-columns:1fr; gap:6px; }
    .co-tot-grand-val { font-size:1.7rem; }
    .co-title { font-size:2rem; }
  }
  @media (max-width:440px) {
    .co-card-header { padding:16px 18px; }
    .co-totals, .co-trust-grid, .co-sum-items, .co-sum-head { padding-left:16px; padding-right:16px; }
    .co-card-header::after { display:none; }
  }
`;

/* ── Helper: detect pack item ─────────────────────── */
const isPack = (item) => !!(item.packId || item.packName || (item.fragrances && item.fragrances.length > 0));

const Checkout = ({ cart, clearCart }) => {
  const navigate  = useNavigate();
  const formRef   = useRef(null);
  const submitRef = useRef(null);

  const [formData, setFormData] = useState({
    customer_name:    "",
    customer_phone:   "",
    customer_address: "",
    customer_city:    "",
  });
  const [loading,    setLoading]    = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [localCart,  setLocalCart]  = useState([]);
  const [focusField, setFocusField] = useState(null);

  /* Inject styles */
  useEffect(() => {
    if (!document.getElementById("nahid-checkout-v2")) {
      const tag = document.createElement("style");
      tag.id = "nahid-checkout-v2";
      tag.textContent = checkoutCSS;
      document.head.appendChild(tag);
    }
  }, []);

  /* Cart sync */
  useEffect(() => {
    let current = cart;
    if (!current || current.length === 0) {
      const saved = localStorage.getItem("nahid_cart");
      if (saved) {
        try { current = JSON.parse(saved); setLocalCart(current); } catch {}
      }
    } else {
      setLocalCart(current);
    }
  }, [cart]);

  const activeCart = localCart.length > 0 ? localCart : (cart || []);

  /* Shipping: free for packs, free above 300 MAD for individual */
  const hasPackInCart = activeCart.some(isPack);
  const subtotal = activeCart.reduce((sum, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return sum + price * (item.quantity || 1);
  }, 0);
  const shipping = (hasPackInCart || subtotal >= 300) ? 0 : 30;
  const total    = subtotal + shipping;
  const fmt      = (n) => Math.round(n).toLocaleString("fr-MA");

  /* Pack savings */
  const totalPackSavings = activeCart
    .filter(isPack)
    .reduce((s, p) => s + ((p.origPrice || p.price) - p.price) * (p.quantity || 1), 0);

  const CITIES = ["Casablanca","Rabat","Marrakech","Fès","Agadir","Tanger"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCityClick = (city) => setFormData({ ...formData, customer_city: city });

  /* Ripple */
  const handleRipple = (e) => {
    if (!submitRef.current) return;
    const rect = submitRef.current.getBoundingClientRect();
    const rip = document.createElement("span");
    rip.className = "co-submit-ripple";
    rip.style.left = `${e.clientX - rect.left}px`;
    rip.style.top  = `${e.clientY - rect.top}px`;
    submitRef.current.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCart = activeCart;
    if (!finalCart || finalCart.length === 0) { navigate("/"); return; }
    handleRipple(e);
    setLoading(true);
    try {
      const items = finalCart.map((item) => ({
        id:         item.id || item.packId,
        name:       item.name || item.packName,
        quantity:   item.quantity || 1,
        price:      typeof item.price === "string" ? parseFloat(item.price) : item.price,
        is_pack:    isPack(item),
        fragrances: item.fragrances || [],
      }));
      await axios.post("/api/orders", {
        customer_name:    formData.customer_name,
        customer_phone:   formData.customer_phone,
        customer_address: `${formData.customer_address}${formData.customer_city ? ", " + formData.customer_city : ""}`,
        items,
        total_amount: total,
      });
      setSuccess(true);
      clearCart();
      localStorage.removeItem("nahid_cart");
      setTimeout(() => navigate("/"), 5500);
    } catch (err) {
      alert("Erreur : " + (err.response?.data?.error || "Erreur serveur"));
    } finally {
      setLoading(false);
    }
  };

  /* ── Empty cart ── */
  if (activeCart.length === 0 && !success) {
    return (
      <div className="co-page">
        <div className="co-orb co-orb-1" /><div className="co-orb co-orb-2" />
        <div className="co-texture" />
        <div className="container">
          <div className="co-empty">
            <div className="co-empty-icon-wrap">🛒</div>
            <h2 className="co-empty-title">Panier <em>vide</em></h2>
            <p className="co-empty-text">Découvrez nos fragrances d'exception et trouvez votre signature olfactive.</p>
            <button className="co-empty-btn" onClick={() => navigate("/")}>
              Découvrir nos parfums →
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Success ── */
  if (success) {
    const orderId = "NHD-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    return (
      <div className="co-page">
        <div className="co-orb co-orb-1" /><div className="co-orb co-orb-2" />
        <div className="co-texture" />
        <div className="container">
          <div className="co-success-wrap">
            <div className="co-success-ring">
              <svg viewBox="0 0 100 100">
                <circle className="ring-bg" cx="50" cy="50" r="45" />
                <circle className="ring-fill" cx="50" cy="50" r="45" />
              </svg>
              <div className="co-success-check">✓</div>
            </div>
            <div className="co-success-confetti">🎉 🌸 ✦ 🌸 🎉</div>
            <h2 className="co-success-title">Commande <em>confirmée !</em></h2>
            <p className="co-success-sub">
              Merci pour votre commande. Notre équipe prépare votre colis avec le plus grand soin. Livraison sous 24–48h partout au Maroc 🇲🇦
            </p>
            <div className="co-success-ref">
              Référence : <span>{orderId}</span>
            </div>
            <button className="co-success-home" onClick={() => navigate("/")}>
              Retour à l'accueil →
            </button>
            <p className="co-success-redirect">Redirection automatique dans 5 secondes…</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main checkout ── */
  return (
    <div className="co-page">
      <div className="co-orb co-orb-1" />
      <div className="co-orb co-orb-2" />
      <div className="co-texture" />

      <div className="container">

        {/* Breadcrumb */}
        <nav className="co-breadcrumb">
          <a href="/">Accueil</a>
          <span className="co-bc-sep">›</span>
          <a href="/cart">Panier</a>
          <span className="co-bc-sep">›</span>
          <span className="co-bc-active">Commande</span>
        </nav>

        {/* Header */}
        <div className="co-header">
          <div className="co-header-eyebrow">Finalisation</div>
          <h1 className="co-title">Votre <em>Commande</em></h1>
          <p className="co-subtitle">
            {activeCart.length} article{activeCart.length > 1 ? "s" : ""} · Livraison{" "}
            {shipping === 0 ? "offerte 🎉" : `${fmt(shipping)} MAD`}
          </p>
        </div>

        {/* Steps */}
        <div className="co-steps">
          <div className="co-step done">
            <div className="co-step-dot">✓</div>
            <span className="co-step-label">Panier</span>
          </div>
          <div className="co-step-line filled" />
          <div className="co-step active">
            <div className="co-step-dot">2</div>
            <span className="co-step-label">Livraison</span>
          </div>
          <div className="co-step-line" />
          <div className="co-step">
            <div className="co-step-dot">3</div>
            <span className="co-step-label">Confirmation</span>
          </div>
        </div>

        {/* Main layout */}
        <div className="co-layout">

          {/* ── FORM ── */}
          <form className="co-form-panel" onSubmit={handleSubmit} ref={formRef}>

            {/* Personal info */}
            <div className="co-card" style={{ animation: "coSlideIn 0.65s var(--co-expo) 0.08s both" }}>
              <div className="co-card-header">
                <div className="co-card-icon rose">👤</div>
                <div>
                  <div className="co-card-title">Informations personnelles</div>
                  <div className="co-card-sub">Vos coordonnées de contact</div>
                </div>
              </div>
              <div className="co-card-body">
                <div className="co-row">
                  <div className="co-field">
                    <label className="co-label">
                      Nom complet <span className="co-label-req">*</span>
                    </label>
                    <div className="co-input-wrap">
                      <span className="co-input-icon">👤</span>
                      <input
                        className="co-input"
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        onFocus={() => setFocusField("name")}
                        onBlur={() => setFocusField(null)}
                        required
                        placeholder="Prénom Nom"
                        autoComplete="name"
                      />
                      <span className="co-field-underline" />
                    </div>
                  </div>
                  <div className="co-field">
                    <label className="co-label">
                      Téléphone <span className="co-label-req">*</span>
                    </label>
                    <div className="co-input-wrap">
                      <span className="co-input-icon">📱</span>
                      <input
                        className="co-input"
                        type="tel"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleChange}
                        onFocus={() => setFocusField("phone")}
                        onBlur={() => setFocusField(null)}
                        required
                        placeholder="+212 6 00 00 00 00"
                        autoComplete="tel"
                      />
                      <span className="co-field-underline" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="co-card" style={{ animation: "coSlideIn 0.65s var(--co-expo) 0.16s both" }}>
              <div className="co-card-header">
                <div className="co-card-icon gold">📦</div>
                <div>
                  <div className="co-card-title">Adresse de livraison</div>
                  <div className="co-card-sub">Livraison partout au Maroc en 24–48h</div>
                </div>
              </div>
              <div className="co-card-body">
                <div className="co-field">
                  <label className="co-label">
                    Adresse complète <span className="co-label-req">*</span>
                  </label>
                  <div className="co-input-wrap co-textarea-wrap">
                    <span className="co-input-icon">📍</span>
                    <textarea
                      className="co-textarea"
                      name="customer_address"
                      value={formData.customer_address}
                      onChange={handleChange}
                      onFocus={() => setFocusField("address")}
                      onBlur={() => setFocusField(null)}
                      required
                      placeholder="Numéro, rue, quartier, code postal…"
                      rows={3}
                      autoComplete="street-address"
                    />
                    <span className="co-field-underline" />
                  </div>
                </div>

                <div className="co-field" style={{ marginBottom: 0 }}>
                  <label className="co-label">Ville</label>
                  <div className="co-input-wrap">
                    <span className="co-input-icon">🏙️</span>
                    <input
                      className="co-input"
                      type="text"
                      name="customer_city"
                      value={formData.customer_city}
                      onChange={handleChange}
                      placeholder="Votre ville"
                      autoComplete="address-level2"
                    />
                    <span className="co-field-underline" />
                  </div>
                  {/* Quick city chips */}
                  <div className="co-city-chips">
                    {CITIES.map(city => (
                      <span
                        key={city}
                        className={`co-city-chip${formData.customer_city === city ? " active" : ""}`}
                        onClick={() => handleCityClick(city)}
                      >{city}</span>
                    ))}
                  </div>
                </div>

                <div className="co-info-chips">
                  {["🚚 24–48h", "📍 Tout le Maroc", "📦 Suivi inclus"].map(t => (
                    <span key={t} className="co-info-chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="co-card" style={{ animation: "coSlideIn 0.65s var(--co-expo) 0.24s both" }}>
              <div className="co-card-header">
                <div className="co-card-icon sage">💳</div>
                <div>
                  <div className="co-card-title">Paiement</div>
                  <div className="co-card-sub">100% sécurisé · Aucun risque</div>
                </div>
              </div>
              <div className="co-card-body">
                <div className="co-cod-block">
                  <div className="co-cod-icon">💵</div>
                  <div>
                    <div className="co-cod-title">Paiement à la livraison</div>
                    <div className="co-cod-text">
                      Payez en cash à la réception de votre colis. Aucune information bancaire requise — vous payez uniquement quand vous recevez vos parfums.
                    </div>
                    <div className="co-cod-badge">✓ Zéro risque · Zéro prépaiement</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ animation: "coSlideIn 0.65s var(--co-expo) 0.32s both" }}>
              <div className="co-ssl-badge">
                <span>🔒</span>
                <span className="co-ssl-text">Vos données sont protégées par chiffrement SSL 256-bit</span>
              </div>
              <button
                type="submit"
                className="co-submit"
                disabled={loading}
                ref={submitRef}
              >
                {loading ? (
                  <><div className="co-spinner" /> Traitement en cours…</>
                ) : (
                  <>Confirmer la commande — {fmt(total)} MAD →</>
                )}
              </button>
            </div>

          </form>

          {/* ── SUMMARY ── */}
          <aside className="co-summary-panel">
            <div className="co-summary-card">

              <div className="co-sum-head">
                <div className="co-sum-head-top">
                  <div className="co-sum-head-title">Récapitulatif</div>
                  <div className="co-sum-head-count">{activeCart.length}</div>
                </div>
                <div className="co-sum-head-sub">
                  {activeCart.length} article{activeCart.length > 1 ? "s" : ""} sélectionné{activeCart.length > 1 ? "s" : ""}
                </div>
              </div>

              <div className="co-sum-items">
                {activeCart.map((item, i) => {
                  const p    = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                  const q    = item.quantity || 1;
                  const pack = isPack(item);
                  const frags = item.fragrances || [];

                  return (
                    <div key={item.id || item.packId || i} className="co-sum-item" style={{ animationDelay: `${i * 0.06}s` }}>
                      {/* Image */}
                      {pack && frags.length > 0 ? (
                        <div className="co-si-pack-mosaic">
                          {frags.slice(0, 3).map((f, fi) => (
                            <div key={fi} className="co-si-pack-cell">
                              {f.image_url ? <img src={f.image_url} alt={f.name} /> : null}
                            </div>
                          ))}
                          {frags.length > 3 && <div className="co-si-pack-cell plus">+{frags.length - 3}</div>}
                          {frags.length < 4 && Array.from({ length: 4 - frags.length }).map((_, xi) => (
                            <div key={`x${xi}`} className="co-si-pack-cell" />
                          ))}
                        </div>
                      ) : (
                        <div className="co-si-img-box">
                          <img className="co-si-img" src={item.image_url} alt={item.name} loading="lazy" />
                          <span className="co-si-qty-badge">{q}</span>
                        </div>
                      )}

                      <div className="co-si-info">
                        <div className="co-si-name">{item.name || item.packName}</div>
                        {pack
                          ? <div className="co-si-pack-tag">✦ Coffret · {frags.length} fragrances</div>
                          : item.category && <div className="co-si-cat">{item.category}</div>
                        }
                      </div>
                      <span className={`co-si-price${pack ? " pack-price" : ""}`}>
                        {fmt(p * q)} MAD
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pack savings indicator */}
              {totalPackSavings > 0 && (
                <div className="co-pack-savings-pill">
                  🎉 Économie coffret : {fmt(totalPackSavings)} MAD
                </div>
              )}

              {/* Totals */}
              <div className="co-totals">
                <div className="co-tot-row">
                  <span className="co-tot-label">Sous-total</span>
                  <span className="co-tot-val">{fmt(subtotal)} MAD</span>
                </div>
                <div className="co-tot-row">
                  <span className="co-tot-label">Livraison</span>
                  <span className={`co-tot-val${shipping === 0 ? " free" : ""}`}>
                    {shipping === 0 ? "🎉 Gratuite" : `${fmt(shipping)} MAD`}
                  </span>
                </div>
                {!hasPackInCart && subtotal > 0 && subtotal < 300 && (
                  <p className="co-tot-hint">+ {fmt(300 - subtotal)} MAD pour la livraison gratuite</p>
                )}
                <div className="co-tot-divider" />
                <div className="co-tot-grand">
                  <span className="co-tot-grand-label">Total</span>
                  <span className="co-tot-grand-val">{fmt(total)} MAD</span>
                </div>
              </div>

              {/* Trust */}
              <div className="co-trust-grid">
                {[
                  { icon: "🔒", text: "Paiement sécurisé" },
                  { icon: "🚚", text: "Livraison 24–48h" },
                  { icon: "💳", text: "Paiement à la livraison" },
                  { icon: "⭐", text: "4.9/5 · 2 400 avis" },
                ].map(({ icon, text }) => (
                  <div className="co-trust-item" key={text}>
                    <span className="co-trust-icon">{icon}</span>
                    <span className="co-trust-text">{text}</span>
                  </div>
                ))}
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Checkout;