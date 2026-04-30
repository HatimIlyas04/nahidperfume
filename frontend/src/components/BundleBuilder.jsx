import { useState, useEffect, useRef } from "react";

/* ─── Inject styles once ──────────────────────────────── */
const BB_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --bb-ink:       #1C1A16;
    --bb-ink-2:     #3D3A33;
    --bb-cream:     #FBF8F3;
    --bb-cream-2:   #F5EFE4;
    --bb-cream-3:   #EDE5D8;
    --bb-white:     #FFFFFF;
    --bb-rose:      #D4857A;
    --bb-rose-d:    #B86B60;
    --bb-rose-l:    #F4E8E6;
    --bb-rose-xl:   #FDF5F4;
    --bb-gold:      #C8A96A;
    --bb-gold-d:    #A8883E;
    --bb-gold-l:    #E9D6A9;
    --bb-gold-xl:   #FAF3E3;
    --bb-sage:      #6A9B6A;
    --bb-sage-l:    #EAF2EA;
    --bb-muted:     #8C8478;
    --bb-border:    rgba(28,26,22,0.09);
    --bb-border-2:  rgba(28,26,22,0.05);
    --bb-sans:      'DM Sans', sans-serif;
    --bb-serif:     'Cormorant Garamond', Georgia, serif;
    --bb-ease:      cubic-bezier(0.25,0.46,0.45,0.94);
    --bb-spring:    cubic-bezier(0.34,1.56,0.64,1);
    --bb-expo:      cubic-bezier(0.16,1,0.3,1);
  }

  /* ── Animations ── */
  @keyframes bbFadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes bbScaleIn  { from{opacity:0;transform:scale(0.82)} to{opacity:1;transform:none} }
  @keyframes bbCheck    { from{stroke-dashoffset:30} to{stroke-dashoffset:0} }
  @keyframes bbPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(212,133,122,0)} 55%{box-shadow:0 0 0 9px rgba(212,133,122,0.12)} }
  @keyframes bbGoldPulse{ 0%,100%{box-shadow:0 0 0 0 rgba(200,169,106,0)} 55%{box-shadow:0 0 0 9px rgba(200,169,106,0.16)} }
  @keyframes bbShake    { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
  @keyframes bbSlideUp  { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes bbBounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes bbRipple   { from{transform:scale(0);opacity:0.45} to{transform:scale(4);opacity:0} }
  @keyframes bbFlicker  { 0%,100%{opacity:1} 50%{opacity:0.6} }
  @keyframes bbBarFill  { from{width:0} }
  @keyframes bbOrb      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-16px) scale(1.04)} }
  @keyframes bbSheen    { from{transform:translateX(-100%) skewX(-18deg)} to{transform:translateX(200%) skewX(-18deg)} }
  @keyframes bbFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

  .bb-aos {
    opacity:0; transform:translateY(24px);
    transition:opacity 0.85s var(--bb-expo), transform 0.85s var(--bb-expo);
  }
  .bb-aos.bb-vis { opacity:1; transform:none; }
  .bb-d1{transition-delay:.07s} .bb-d2{transition-delay:.14s}
  .bb-d3{transition-delay:.22s} .bb-d4{transition-delay:.30s}

  /* ══════════════════════════════════════
     SECTION — warm cream, no black
  ══════════════════════════════════════ */
  .bb-section {
    padding: clamp(80px,10vw,140px) 0 clamp(120px,14vw,180px);
    background: var(--bb-cream);
    position: relative;
    overflow: hidden;
    font-family: var(--bb-sans);
  }
  .bb-section * { box-sizing: border-box; }

  /* Warm decorative orbs */
  .bb-orb {
    position:absolute; border-radius:50%; pointer-events:none;
  }
  .bb-orb-1 {
    width:700px; height:700px; top:-280px; left:-280px;
    background:radial-gradient(circle, rgba(200,169,106,0.13), transparent 68%);
    animation:bbOrb 22s ease-in-out infinite;
  }
  .bb-orb-2 {
    width:500px; height:500px; bottom:-160px; right:-160px;
    background:radial-gradient(circle, rgba(212,133,122,0.1), transparent 68%);
    animation:bbOrb 18s ease-in-out infinite reverse;
  }
  .bb-orb-3 {
    width:360px; height:360px; top:35%; left:45%;
    background:radial-gradient(circle, rgba(200,169,106,0.07), transparent 68%);
    animation:bbOrb 30s ease-in-out infinite 5s;
  }

  /* Top wave */
  .bb-section::before {
    content:'';
    position:absolute; top:0; left:0; right:0;
    height:90px;
    background:var(--bb-cream-2);
    clip-path:ellipse(55% 100% at 50% 0%);
    pointer-events:none; z-index:0;
  }

  /* Linen texture */
  .bb-texture {
    position:absolute; inset:0; pointer-events:none; opacity:0.35;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(200,169,106,0.06) 30px, rgba(200,169,106,0.06) 31px),
      repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(200,169,106,0.04) 30px, rgba(200,169,106,0.04) 31px);
  }

  /* ── Header ── */
  .bb-header {
    text-align:center;
    margin-bottom:clamp(52px,7vw,90px);
    position:relative; z-index:1;
  }
  .bb-eyebrow {
    display:inline-flex; align-items:center; gap:12px;
    font-size:0.6rem; font-weight:700; letter-spacing:0.32em; text-transform:uppercase;
    color:var(--bb-rose); margin-bottom:18px;
  }
  .bb-eyebrow::before,.bb-eyebrow::after { content:''; width:26px; height:1px; background:var(--bb-rose); opacity:0.6; }
  .bb-title {
    font-family:var(--bb-serif);
    font-size:clamp(2.4rem,6vw,4.6rem);
    font-weight:600; color:var(--bb-ink);
    letter-spacing:-0.02em; line-height:1.02; margin-bottom:18px;
  }
  .bb-title em { font-style:italic; font-weight:300; color:var(--bb-rose); display:block; }
  .bb-subtitle {
    font-size:clamp(0.84rem,1.2vw,0.96rem);
    color:var(--bb-muted); max-width:440px; margin:0 auto; line-height:1.82;
  }

  /* ── Pack Cards ── */
  .bb-packs {
    display:grid; grid-template-columns:repeat(4,1fr);
    gap:16px;
    margin-bottom:clamp(48px,6vw,72px);
    position:relative; z-index:1;
  }

  .bb-pack {
    background:var(--bb-white);
    border:1.5px solid var(--bb-border);
    border-radius:24px;
    padding:clamp(22px,2.5vw,34px) clamp(18px,2vw,26px);
    cursor:pointer; position:relative; overflow:hidden;
    transition:transform 0.4s var(--bb-spring), box-shadow 0.4s, border-color 0.25s, background 0.25s;
    box-shadow:0 2px 16px rgba(28,26,22,0.06);
  }
  /* Sheen on hover */
  .bb-pack::after {
    content:''; position:absolute; inset:0; z-index:5; pointer-events:none;
    background:linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.65) 50%, transparent 65%);
    transform:translateX(-100%) skewX(-15deg);
  }
  .bb-pack:hover::after { animation:bbSheen 0.65s var(--bb-ease) forwards; }

  .bb-pack:hover {
    transform:translateY(-7px) scale(1.015);
    border-color:rgba(28,26,22,0.14);
    box-shadow:0 28px 60px rgba(28,26,22,0.13);
  }
  .bb-pack.active {
    border-color:var(--bb-rose) !important;
    background:var(--bb-rose-xl) !important;
    box-shadow:0 0 0 1px var(--bb-rose), 0 20px 56px rgba(212,133,122,0.18) !important;
    transform:translateY(-8px) scale(1.02);
    animation:bbPulse 2.5s ease infinite;
  }
  .bb-pack.best {
    border-color:var(--bb-gold-l);
    background:var(--bb-gold-xl);
  }
  .bb-pack.best:hover {
    border-color:var(--bb-gold);
    box-shadow:0 28px 60px rgba(200,169,106,0.14);
  }
  .bb-pack.best.active {
    border-color:var(--bb-gold) !important;
    background:var(--bb-gold-xl) !important;
    box-shadow:0 0 0 1px var(--bb-gold), 0 20px 56px rgba(200,169,106,0.22) !important;
    animation:bbGoldPulse 2.5s ease infinite;
  }

  /* Pack badge */
  .bb-pack-badge {
    position:absolute; top:-1px; left:50%; transform:translateX(-50%);
    display:inline-flex; align-items:center; gap:5px;
    padding:6px 16px; border-radius:0 0 14px 14px;
    font-size:0.56rem; font-weight:800; letter-spacing:0.14em; text-transform:uppercase;
    white-space:nowrap; z-index:6;
  }
  .bb-pack-badge.rose { background:linear-gradient(135deg,var(--bb-rose),var(--bb-rose-d)); color:white; box-shadow:0 3px 12px rgba(212,133,122,0.4); }
  .bb-pack-badge.gold { background:linear-gradient(135deg,var(--bb-gold),var(--bb-gold-d)); color:white; box-shadow:0 3px 12px rgba(200,169,106,0.4); }
  .bb-pack-badge.sage { background:linear-gradient(135deg,#5A9A5A,#3D7A3D); color:white; }

  /* Pack content */
  .bb-pack-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:18px; }
  .bb-pack-name {
    font-size:0.58rem; font-weight:800; letter-spacing:0.2em; text-transform:uppercase;
    color:var(--bb-muted); margin-bottom:6px;
  }
  .bb-pack.active:not(.best) .bb-pack-name { color:var(--bb-rose-d); }
  .bb-pack.best.active .bb-pack-name { color:var(--bb-gold-d); }

  .bb-pack-qty {
    font-family:var(--bb-serif);
    font-size:clamp(2.4rem,4vw,3.2rem); font-weight:700;
    color:var(--bb-ink); letter-spacing:-0.03em; line-height:1;
  }
  .bb-pack.active:not(.best) .bb-pack-qty { color:var(--bb-rose-d); }
  .bb-pack.best.active .bb-pack-qty { color:var(--bb-gold-d); }
  .bb-pack-qty sub { font-size:0.48em; font-weight:600; color:var(--bb-muted); letter-spacing:0; vertical-align:baseline; }

  .bb-pack-check {
    width:28px; height:28px; border-radius:50%;
    border:2px solid var(--bb-border);
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; background:transparent;
    transition:all 0.3s var(--bb-spring);
  }
  .bb-pack.active:not(.best) .bb-pack-check { background:var(--bb-rose); border-color:var(--bb-rose); }
  .bb-pack.best.active .bb-pack-check { background:var(--bb-gold); border-color:var(--bb-gold); }
  .bb-pack-check svg .bb-chk {
    stroke-dasharray:20; stroke-dashoffset:20;
    transition:stroke-dashoffset 0.35s var(--bb-ease) 0.1s;
  }
  .bb-pack.active .bb-pack-check svg .bb-chk { stroke-dashoffset:0; }

  .bb-pack-price {
    font-family:var(--bb-serif);
    font-size:clamp(1.6rem,2.8vw,2.2rem); font-weight:600;
    color:var(--bb-ink); letter-spacing:-0.01em; line-height:1; margin-bottom:4px;
  }
  .bb-pack.active:not(.best) .bb-pack-price { color:var(--bb-rose-d); }
  .bb-pack.best.active .bb-pack-price { color:var(--bb-gold-d); }
  .bb-pack-price-sub {
    font-size:0.62rem; font-weight:600; color:var(--bb-muted);
    margin-bottom:16px; letter-spacing:0.04em;
  }

  .bb-pack-tags { display:flex; flex-direction:column; gap:6px; }
  .bb-pack-tag {
    display:inline-flex; align-items:center; gap:7px;
    font-size:0.66rem; font-weight:500; color:var(--bb-muted);
  }
  .bb-pack-tag .dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
  .bb-pack-tag.sage  { color:#3D7A3D; } .bb-pack-tag.sage .dot  { background:#5A9A5A; }
  .bb-pack-tag.rose  { color:var(--bb-rose-d); } .bb-pack-tag.rose .dot  { background:var(--bb-rose); animation:bbFlicker 1.8s ease infinite; }
  .bb-pack-tag.gold  { color:var(--bb-gold-d); } .bb-pack-tag.gold .dot  { background:var(--bb-gold); }

  .bb-pack-savings {
    margin-top:14px; padding:7px 12px; border-radius:12px;
    background:var(--bb-sage-l);
    border:1px solid rgba(106,155,106,0.2);
    font-size:0.62rem; font-weight:800;
    color:#3D7A3D; letter-spacing:0.08em; text-transform:uppercase;
    text-align:center;
  }

  /* ── Step Indicator ── */
  .bb-steps {
    display:flex; justify-content:center; align-items:center;
    margin-bottom:clamp(36px,5vw,56px);
    position:relative; z-index:1;
    flex-wrap:wrap; gap:4px;
  }
  .bb-step-item { display:flex; flex-direction:column; align-items:center; gap:8px; position:relative; z-index:1; }
  .bb-step-conn {
    width:clamp(32px,5vw,72px); height:2px;
    background:var(--bb-cream-3); margin-bottom:22px;
    border-radius:1px; position:relative; overflow:hidden;
  }
  .bb-step-conn-fill {
    position:absolute; inset-y:0; left:0;
    background:linear-gradient(to right, var(--bb-rose), var(--bb-gold));
    transition:width 0.5s var(--bb-ease); border-radius:1px;
  }
  .bb-step-dot {
    width:36px; height:36px; border-radius:50%;
    border:2px solid var(--bb-border);
    background:var(--bb-white);
    display:flex; align-items:center; justify-content:center;
    font-size:0.76rem; font-weight:700; color:var(--bb-muted);
    transition:all 0.35s var(--bb-spring);
    box-shadow:0 2px 8px rgba(28,26,22,0.06);
  }
  .bb-step-dot.filled {
    background:var(--bb-rose); border-color:var(--bb-rose);
    color:white; box-shadow:0 4px 16px rgba(212,133,122,0.4);
    animation:bbScaleIn 0.4s var(--bb-spring) both;
  }
  .bb-step-dot.partial { border-color:var(--bb-rose); color:var(--bb-rose-d); background:var(--bb-rose-xl); }
  .bb-step-label {
    font-size:0.58rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
    color:var(--bb-muted); white-space:nowrap; transition:color 0.25s;
    max-width:72px; overflow:hidden; text-overflow:ellipsis; text-align:center;
  }
  .bb-step-label.active { color:var(--bb-ink-2); }

  /* ── Section label ── */
  .bb-section-label {
    font-size:0.62rem; font-weight:800; letter-spacing:0.22em; text-transform:uppercase;
    color:var(--bb-muted); margin-bottom:22px;
    display:flex; align-items:center; gap:12px;
    position:relative; z-index:1;
  }
  .bb-section-label::after { content:''; flex:1; height:1px; background:var(--bb-border); }

  /* ── Product Grid ── */
  .bb-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(clamp(148px,18vw,196px), 1fr));
    gap:14px;
    margin-bottom:clamp(40px,5vw,64px);
    position:relative; z-index:1;
  }

  /* Product card */
  .bb-card {
    border-radius:20px; overflow:hidden; cursor:pointer;
    background:var(--bb-white);
    border:1.5px solid var(--bb-border);
    transition:transform 0.4s var(--bb-spring), box-shadow 0.4s, border-color 0.25s, background 0.25s, opacity 0.25s;
    position:relative;
    box-shadow:0 2px 12px rgba(28,26,22,0.06);
  }
  .bb-card:hover:not(.bb-card-disabled) {
    transform:translateY(-7px) scale(1.02);
    box-shadow:0 24px 52px rgba(28,26,22,0.14);
    border-color:rgba(28,26,22,0.14);
  }
  .bb-card.bb-card-selected {
    border-color:var(--bb-rose) !important;
    background:var(--bb-rose-xl) !important;
    box-shadow:0 0 0 1px var(--bb-rose), 0 16px 44px rgba(212,133,122,0.18) !important;
  }
  .bb-card.bb-card-disabled { opacity:0.32; cursor:not-allowed; filter:grayscale(0.2); }

  .bb-card-img-wrap {
    position:relative; overflow:hidden; aspect-ratio:1/1;
    background:var(--bb-cream-2);
  }
  .bb-card-img {
    width:100%; height:100%; object-fit:cover; display:block;
    transition:transform 0.65s var(--bb-ease), filter 0.4s;
    filter:brightness(0.92) saturate(0.95);
  }
  .bb-card:hover:not(.bb-card-disabled) .bb-card-img { transform:scale(1.09); filter:brightness(1.0) saturate(1.05); }

  .bb-card-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to top, rgba(28,26,22,0.35) 0%, transparent 55%);
    opacity:0; transition:opacity 0.35s; pointer-events:none;
  }
  .bb-card:hover:not(.bb-card-disabled) .bb-card-overlay { opacity:1; }

  .bb-card-check-badge {
    position:absolute; top:10px; right:10px;
    width:30px; height:30px; border-radius:50%;
    background:var(--bb-rose);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 14px rgba(212,133,122,0.55);
    animation:bbScaleIn 0.35s var(--bb-spring) both;
    z-index:2;
  }
  .bb-card-check-badge svg .bb-ck {
    stroke-dasharray:16; stroke-dashoffset:16;
    animation:bbCheck 0.3s var(--bb-ease) 0.1s forwards;
  }
  .bb-card-num {
    position:absolute; top:10px; left:10px;
    width:24px; height:24px; border-radius:50%;
    background:var(--bb-rose); color:white;
    font-size:0.65rem; font-weight:800;
    display:flex; align-items:center; justify-content:center;
    animation:bbScaleIn 0.35s var(--bb-spring) both; z-index:2;
  }

  .bb-card-body { padding:12px 14px 14px; }
  .bb-card-cat {
    font-size:0.55rem; font-weight:800; letter-spacing:0.14em; text-transform:uppercase;
    color:var(--bb-rose); margin-bottom:4px;
  }
  .bb-card-name {
    font-size:0.8rem; font-weight:700;
    color:var(--bb-ink); letter-spacing:-0.01em; line-height:1.25; margin-bottom:8px;
  }
  .bb-card-footer { display:flex; justify-content:space-between; align-items:center; }
  .bb-card-price {
    font-family:var(--bb-serif); font-size:1.05rem; font-weight:600;
    color:var(--bb-ink-2);
  }
  .bb-card-add {
    width:28px; height:28px; border-radius:50%; border:none;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:all 0.22s var(--bb-spring);
    font-size:0.95rem; font-weight:300; line-height:1;
  }
  .bb-card-add.plus { background:var(--bb-cream-2); color:var(--bb-ink); border:1px solid var(--bb-border); }
  .bb-card-add.plus:hover { background:var(--bb-rose); color:white; border-color:var(--bb-rose); transform:scale(1.18) rotate(90deg); }
  .bb-card-add.minus { background:var(--bb-rose); color:white; }
  .bb-card-add.minus:hover { background:var(--bb-rose-d); transform:scale(1.12); }

  /* ── Summary Panel ── */
  .bb-summary {
    position:relative; z-index:2;
    background:var(--bb-white);
    border:1px solid var(--bb-border);
    border-radius:28px;
    padding:clamp(24px,3vw,38px);
    box-shadow:0 8px 40px rgba(28,26,22,0.08);
    overflow:hidden;
  }
  .bb-summary::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(to right, var(--bb-rose), var(--bb-gold));
  }
  .bb-summary-top {
    display:flex; align-items:flex-start; justify-content:space-between;
    gap:24px; flex-wrap:wrap; margin-bottom:24px;
  }

  /* Pills */
  .bb-pills-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
  .bb-pill {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border-radius:999px;
    background:var(--bb-rose-l);
    border:1px solid rgba(212,133,122,0.25);
    color:var(--bb-rose-d); font-size:0.7rem; font-weight:600;
    animation:bbFadeUp 0.3s var(--bb-spring) both;
  }
  .bb-pill-rm {
    width:16px; height:16px; border-radius:50%;
    background:rgba(212,133,122,0.15); border:none; color:var(--bb-rose-d);
    font-size:0.6rem; display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:all 0.15s; flex-shrink:0; font-family:var(--bb-sans);
  }
  .bb-pill-rm:hover { background:var(--bb-rose); color:white; transform:scale(1.18); }
  .bb-pill-empty {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 16px; border-radius:999px;
    border:1.5px dashed var(--bb-border);
    color:var(--bb-muted); font-size:0.68rem; font-weight:500; font-style:italic;
  }

  /* Price */
  .bb-price-block { text-align:right; flex-shrink:0; }
  .bb-price-original {
    font-size:0.8rem; color:var(--bb-muted); text-decoration:line-through;
    margin-bottom:4px; opacity:0.7;
  }
  .bb-price-final {
    font-family:var(--bb-serif);
    font-size:clamp(1.9rem,3vw,2.7rem); font-weight:600;
    color:var(--bb-rose-d); letter-spacing:-0.02em; line-height:1;
  }
  .bb-savings-tag {
    display:inline-flex; align-items:center; gap:5px;
    background:var(--bb-sage-l); border:1px solid rgba(106,155,106,0.25);
    border-radius:999px; padding:4px 12px;
    font-size:0.62rem; font-weight:800; color:#3D7A3D;
    letter-spacing:0.08em; text-transform:uppercase; margin-top:6px;
  }

  /* Progress */
  .bb-progress-wrap { margin-bottom:22px; }
  .bb-progress-label {
    display:flex; justify-content:space-between; align-items:center;
    margin-bottom:9px;
  }
  .bb-progress-text { font-size:0.7rem; font-weight:600; color:var(--bb-muted); letter-spacing:0.04em; }
  .bb-progress-pct  { font-size:0.7rem; font-weight:800; color:var(--bb-rose); }
  .bb-progress-track {
    height:5px; background:var(--bb-cream-3); border-radius:999px; overflow:hidden;
  }
  .bb-progress-fill {
    height:100%;
    background:linear-gradient(to right, var(--bb-rose), var(--bb-gold));
    border-radius:999px;
    transition:width 0.5s var(--bb-ease);
  }

  /* CTA */
  .bb-cta {
    width:100%; padding:18px 32px; border:none; border-radius:999px;
    font-family:var(--bb-sans); font-size:0.82rem; font-weight:800;
    letter-spacing:0.1em; text-transform:uppercase; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:10px;
    transition:transform 0.3s var(--bb-spring), box-shadow 0.3s, background 0.2s;
    position:relative; overflow:hidden;
  }
  .bb-cta.ready {
    background:linear-gradient(135deg, var(--bb-rose), var(--bb-rose-d));
    color:white; box-shadow:0 8px 28px rgba(212,133,122,0.45);
  }
  .bb-cta.ready:hover { transform:translateY(-4px) scale(1.01); box-shadow:0 16px 44px rgba(212,133,122,0.55); }
  .bb-cta.ready:active { transform:scale(0.98); }
  .bb-cta.success {
    background:linear-gradient(135deg, #3D7A3D, #2A5A2A) !important;
    box-shadow:0 8px 28px rgba(61,122,61,0.4) !important;
    color:white;
  }
  .bb-cta.disabled {
    background:var(--bb-cream-2); color:var(--bb-muted);
    cursor:not-allowed; border:1.5px dashed var(--bb-border);
    box-shadow:none;
  }
  .bb-cta-ripple {
    position:absolute; border-radius:50%; background:rgba(255,255,255,0.35);
    width:10px; height:10px; margin-top:-5px; margin-left:-5px;
    animation:bbRipple 0.5s var(--bb-ease) forwards; pointer-events:none;
  }

  /* Trust row */
  .bb-trust-row {
    display:flex; gap:18px; justify-content:center; flex-wrap:wrap; margin-top:18px;
  }
  .bb-trust-badge {
    font-size:0.64rem; font-weight:600; color:var(--bb-muted); letter-spacing:0.04em;
    display:flex; align-items:center; gap:5px;
  }

  /* ── Sticky bar (mobile) ── */
  .bb-sticky {
    position:fixed; bottom:0; left:0; right:0; z-index:999;
    background:rgba(251,248,243,0.96); backdrop-filter:blur(20px);
    border-top:1px solid var(--bb-border);
    padding:14px 20px max(20px, env(safe-area-inset-bottom));
    display:flex; align-items:center; gap:14px;
    transform:translateY(100%);
    transition:transform 0.4s var(--bb-spring);
    font-family:var(--bb-sans);
    box-shadow:0 -8px 32px rgba(28,26,22,0.1);
  }
  .bb-sticky.show { transform:translateY(0); }
  .bb-sticky-info { flex:1; min-width:0; }
  .bb-sticky-label { font-size:0.6rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--bb-muted); margin-bottom:3px; }
  .bb-sticky-price { font-family:var(--bb-serif); font-size:1.5rem; font-weight:600; color:var(--bb-ink); line-height:1; }
  .bb-sticky-savings { font-size:0.62rem; font-weight:700; color:#3D7A3D; margin-top:2px; }
  .bb-sticky-cta {
    padding:14px 26px; border:none; border-radius:999px;
    background:linear-gradient(135deg, var(--bb-rose), var(--bb-rose-d));
    color:white; font-family:var(--bb-sans); font-size:0.76rem; font-weight:800;
    letter-spacing:0.1em; text-transform:uppercase; cursor:pointer;
    box-shadow:0 4px 18px rgba(212,133,122,0.45);
    transition:transform 0.2s var(--bb-spring); white-space:nowrap; flex-shrink:0;
  }
  .bb-sticky-cta:hover { transform:scale(1.04); }
  .bb-sticky-cta:disabled { background:var(--bb-cream-3); color:var(--bb-muted); box-shadow:none; cursor:not-allowed; transform:none; }

  /* ── Responsive ── */
  @media (max-width:1100px) { .bb-packs { grid-template-columns:repeat(2,1fr); gap:12px; } }
  @media (max-width:768px) {
    .bb-packs { grid-template-columns:repeat(2,1fr); }
    .bb-steps .bb-step-conn { width:clamp(18px,4vw,44px); }
    .bb-grid { grid-template-columns:repeat(auto-fill,minmax(138px,1fr)); gap:10px; }
    .bb-summary-top { flex-direction:column; }
    .bb-price-block { text-align:left; }
    .bb-step-label { font-size:0.52rem; max-width:60px; }
  }
  @media (max-width:560px) {
    .bb-packs { grid-template-columns:1fr 1fr; gap:10px; }
    .bb-pack-qty { font-size:2.2rem; }
    .bb-pack-price { font-size:1.5rem; }
    .bb-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
    .bb-step-dot { width:30px; height:30px; font-size:0.68rem; }
    .bb-step-conn { width:clamp(14px,3vw,32px); }
  }
  @media (max-width:380px) {
    .bb-packs { grid-template-columns:1fr; }
  }
`;

/* ─── Pack definitions ────────────────────────────── */
const PACKS = [
  {
    id: "p1", name: "Pack 1", qty: 4, price: 160, label: "35ML × 4",
    badge: null,
    tags: [
      { text: "Livraison gratuite 🚚", cls: "sage" },
      { text: "Idéal pour débuter", cls: "gold" },
    ],
    savings: null, origPrice: null,
  },
  {
    id: "p2", name: "Pack 2", qty: 8, price: 290, label: "35ML × 8",
    badge: { text: "Plus populaire", cls: "rose" },
    tags: [
      { text: "Livraison gratuite 🚚", cls: "sage" },
      { text: "Best seller 🔥", cls: "rose" },
    ],
    savings: "Économie 30 dh", origPrice: 320,
  },
  {
    id: "p3", name: "Pack 3", qty: 12, price: 410, label: "35ML × 12",
    badge: { text: "Meilleur rapport", cls: "sage" },
    tags: [
      { text: "Livraison gratuite 🚚", cls: "sage" },
      { text: "Stock limité ⚡", cls: "rose" },
    ],
    savings: "Économie 70 dh", origPrice: 480,
  },
  {
    id: "golden", name: "Golden Offer", qty: 6, price: 210, label: "35ML × 6",
    badge: { text: "✦ Offre dorée", cls: "gold" },
    tags: [
      { text: "Livraison gratuite 🚚", cls: "sage" },
      { text: "Édition limitée ✦", cls: "gold" },
    ],
    savings: "Économie 30 dh", origPrice: 240, isBest: true,
  },
];

function injectBBStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-bb-css-v2")) {
    const tag = document.createElement("style");
    tag.id = "nahid-bb-css-v2";
    tag.textContent = BB_CSS;
    document.head.appendChild(tag);
  }
}

/* ─── BundleBuilder ────────────────────────────────── */
const BundleBuilder = ({ products, addToCart }) => {
  injectBBStyles();

  const [selected,   setSelected]   = useState([]);
  const [added,      setAdded]      = useState(false);
  const [activePack, setActivePack] = useState(PACKS[1]);
  const [showSticky, setShowSticky] = useState(false);
  const sectionRef = useRef(null);
  const ctaRef     = useRef(null);

  /* AOS observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("bb-vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".bb-aos").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* Sticky bar visibility */
  useEffect(() => {
    if (!ctaRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setShowSticky(!e.isIntersecting && selected.length > 0),
      { threshold: 0 }
    );
    obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, [selected.length]);

  const handleSelectPack = (pack) => {
    setActivePack(pack);
    setSelected([]);
  };

  const available = (products || []).filter(p => p.stock > 0).slice(0, 12);

  const toggle = (product) => {
    setSelected(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= activePack.qty) return prev;
      return [...prev, product];
    });
  };

  const getPrice = p => typeof p.price === "string" ? parseFloat(p.price) : p.price;

  const finalPrice    = activePack.price;
  const originalPrice = activePack.origPrice ?? activePack.price;
  const savings       = originalPrice - finalPrice;
  const fmt = n => Math.round(n).toLocaleString("fr-MA");

  const handleRipple = (e, el) => {
    const rect = el.getBoundingClientRect();
    const rip = document.createElement("span");
    rip.className = "bb-cta-ripple";
    rip.style.left = `${e.clientX - rect.left}px`;
    rip.style.top  = `${e.clientY - rect.top}px`;
    el.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  };

  const handleAddBundle = (e) => {
    if (selected.length !== activePack.qty) return;
    if (e?.currentTarget) handleRipple(e, e.currentTarget);

    /* Build a single pack cart item */
    const packCartItem = {
      id:         `pack_${activePack.id}_${Date.now()}`,
      packId:     `pack_${activePack.id}_${Date.now()}`,
      packName:   `Coffret ${activePack.name}`,
      packLabel:  activePack.label,
      qty:        activePack.qty,
      price:      activePack.price,
      origPrice:  activePack.origPrice,
      fragrances: selected.map(p => ({
        id:        p.id,
        name:      p.name,
        image_url: p.image_url,
        category:  p.category,
      })),
      image_url:  selected[0]?.image_url || "",
      name:       `Coffret ${activePack.name} — ${activePack.qty} fragrances`,
      quantity:   1,
      category:   "Coffret personnalisé",
    };

    addToCart(packCartItem, 1);
    setAdded(true);
    setTimeout(() => { setAdded(false); setSelected([]); }, 2800);
  };

  const pct     = Math.round((selected.length / activePack.qty) * 100);
  const isReady = selected.length === activePack.qty;

  return (
    <>
      <section className="bb-section" ref={sectionRef}>
        <div className="bb-orb bb-orb-1" />
        <div className="bb-orb bb-orb-2" />
        <div className="bb-orb bb-orb-3" />
        <div className="bb-texture" />

        <div className="container">

          {/* Header */}
          <div className="bb-header">
            <div className="bb-eyebrow bb-aos">Offre exclusive</div>
            <h2 className="bb-title bb-aos">
              Créez votre<br /><em>Coffret Personnalisé</em>
            </h2>
            <p className="bb-subtitle bb-aos">
              Choisissez votre pack, sélectionnez vos fragrances préférées et profitez de la livraison gratuite partout au Maroc 🇲🇦
            </p>
          </div>

          {/* Pack Cards */}
          <div className="bb-packs">
            {PACKS.map((pack, i) => (
              <div
                key={pack.id}
                className={`bb-pack bb-aos bb-d${i + 1}${pack.isBest ? " best" : ""}${activePack.id === pack.id ? " active" : ""}`}
                onClick={() => handleSelectPack(pack)}
              >
                {pack.badge && (
                  <div className={`bb-pack-badge ${pack.badge.cls}`}>{pack.badge.text}</div>
                )}
                <div className="bb-pack-top">
                  <div>
                    <div className="bb-pack-name">{pack.name}</div>
                    <div className="bb-pack-qty">{pack.qty}<sub>×</sub></div>
                  </div>
                  <div className="bb-pack-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline className="bb-chk" points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
                <div className="bb-pack-price">
                  {fmt(pack.price)}{" "}
                  <span style={{ fontSize: "0.48em", fontFamily: "var(--bb-sans)", fontWeight: 700, color: "var(--bb-muted)" }}>MAD</span>
                </div>
                <div className="bb-pack-price-sub">{pack.label}</div>
                <div className="bb-pack-tags">
                  {pack.tags.map((t, ti) => (
                    <span key={ti} className={`bb-pack-tag ${t.cls}`}>
                      <span className="dot" />{t.text}
                    </span>
                  ))}
                </div>
                {pack.savings && (
                  <div className="bb-pack-savings">🎉 {pack.savings}</div>
                )}
              </div>
            ))}
          </div>

          {/* Step Indicator */}
          <div className="bb-steps bb-aos">
            {Array.from({ length: activePack.qty }, (_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div className="bb-step-item">
                  <div className={`bb-step-dot${i < selected.length ? " filled" : i === selected.length ? " partial" : ""}`}>
                    {i < selected.length ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                        <polyline className="bb-ck" points="20 6 9 17 4 12" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`bb-step-label${i <= selected.length ? " active" : ""}`}>
                    {i < selected.length
                      ? selected[i]?.name.substring(0, 8) + "…"
                      : `Parfum ${i + 1}`}
                  </span>
                </div>
                {i < activePack.qty - 1 && (
                  <div className="bb-step-conn">
                    <div
                      className="bb-step-conn-fill"
                      style={{ width: i < selected.length - 1 ? "100%" : i === selected.length - 1 ? "50%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section label */}
          <div className="bb-section-label bb-aos">
            Choisissez vos {activePack.qty} fragrances
            {selected.length > 0 && (
              <span style={{ color: "var(--bb-rose)", fontStyle: "italic", fontWeight: 700 }}>
                — {selected.length}/{activePack.qty} sélectionné{selected.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Product Grid */}
          <div className="bb-grid">
            {available.map((product, i) => {
              const isSel  = selected.some(p => p.id === product.id);
              const isDis  = !isSel && selected.length >= activePack.qty;
              const selIdx = selected.findIndex(p => p.id === product.id);
              const price  = getPrice(product);

              return (
                <div
                  key={product.id}
                  className={`bb-card${isSel ? " bb-card-selected" : ""}${isDis ? " bb-card-disabled" : ""} bb-aos bb-d${(i % 4) + 1}`}
                  onClick={() => !isDis && toggle(product)}
                >
                  <div className="bb-card-img-wrap">
                    <img className="bb-card-img" src={product.image_url} alt={product.name} loading="lazy" />
                    <div className="bb-card-overlay" />
                    {isSel && (
                      <>
                        <div className="bb-card-check-badge">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                            <polyline className="bb-ck" points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div className="bb-card-num">{selIdx + 1}</div>
                      </>
                    )}
                  </div>
                  <div className="bb-card-body">
                    {product.category && <div className="bb-card-cat">{product.category}</div>}
                    <div className="bb-card-name">{product.name}</div>
                    <div className="bb-card-footer">
                      <span className="bb-card-price">{fmt(price)} MAD</span>
                      <button
                        className={`bb-card-add ${isSel ? "minus" : "plus"}`}
                        onClick={e => { e.stopPropagation(); !isDis && toggle(product); }}
                        aria-label={isSel ? "Retirer" : "Ajouter"}
                      >
                        {isSel ? "−" : "+"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Panel */}
          <div className="bb-summary bb-aos" ref={ctaRef}>

            {/* Progress */}
            <div className="bb-progress-wrap">
              <div className="bb-progress-label">
                <span className="bb-progress-text">
                  {isReady
                    ? "✓ Sélection complète — Prêt à commander !"
                    : `${selected.length} / ${activePack.qty} fragrances sélectionnées`}
                </span>
                <span className="bb-progress-pct">{pct}%</span>
              </div>
              <div className="bb-progress-track">
                <div className="bb-progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="bb-summary-top">
              {/* Pills */}
              <div>
                <div style={{ fontSize: "0.6rem", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bb-muted)", marginBottom: "10px" }}>
                  Vos fragrances
                </div>
                <div className="bb-pills-row">
                  {selected.map(p => (
                    <span key={p.id} className="bb-pill">
                      {p.name.substring(0, 16)}{p.name.length > 16 ? "…" : ""}
                      <button className="bb-pill-rm" onClick={e => { e.stopPropagation(); toggle(p); }} aria-label="Retirer">✕</button>
                    </span>
                  ))}
                  {Array.from({ length: activePack.qty - selected.length }).map((_, i) => (
                    <span key={`empty-${i}`} className="bb-pill-empty">Choisir…</span>
                  ))}
                </div>
              </div>

              {/* Price */}
              {selected.length > 0 && (
                <div className="bb-price-block">
                  {savings > 0 && <div className="bb-price-original">{fmt(originalPrice)} MAD</div>}
                  <div className="bb-price-final">{fmt(finalPrice)} MAD</div>
                  {savings > 0 && (
                    <div><span className="bb-savings-tag">🎉 Économie {fmt(savings)} MAD</span></div>
                  )}
                  <div style={{ marginTop: "6px", fontSize: "0.62rem", fontWeight: "700", color: "#3D7A3D", letterSpacing: "0.06em" }}>
                    ✓ Livraison gratuite incluse
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              className={`bb-cta${added ? " success" : isReady ? " ready" : " disabled"}`}
              onClick={handleAddBundle}
              disabled={!isReady && !added}
            >
              {added ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  Coffret ajouté avec succès !
                </>
              ) : isReady ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                  Ajouter le coffret — {fmt(finalPrice)} MAD
                </>
              ) : (
                <>Choisissez encore {activePack.qty - selected.length} parfum{activePack.qty - selected.length > 1 ? "s" : ""}</>
              )}
            </button>

            {/* Trust */}
            <div className="bb-trust-row">
              {["🚚 Livraison gratuite", "🔒 Paiement sécurisé", "⭐ 4.9/5 clients"].map(t => (
                <span key={t} className="bb-trust-badge">{t}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Sticky bar */}
      <div className={`bb-sticky${showSticky && selected.length > 0 ? " show" : ""}`}>
        <div className="bb-sticky-info">
          <div className="bb-sticky-label">{activePack.name} · {selected.length}/{activePack.qty} sélectionnés</div>
          <div className="bb-sticky-price">{fmt(finalPrice)} MAD</div>
          {savings > 0 && <div className="bb-sticky-savings">🎉 Économie {fmt(savings)} MAD · Livraison gratuite</div>}
        </div>
        <button className="bb-sticky-cta" onClick={handleAddBundle} disabled={!isReady}>
          {isReady ? "Commander →" : `Encore ${activePack.qty - selected.length}`}
        </button>
      </div>
    </>
  );
};

export default BundleBuilder;