import { useState, useEffect, useRef } from "react";

/* ─── Inject styles once ──────────────────────────────── */
const BB_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --bb-ink:      #0E0E0C;
    --bb-cream:    #FAF8F5;
    --bb-sand:     #EDE9E1;
    --bb-white:    #FFFFFF;
    --bb-coral:    #EF776A;
    --bb-coral-dk: #C9503F;
    --bb-gold:     #C9A96E;
    --bb-gold-lt:  #F5E9D0;
    --bb-muted:    #7A7770;
    --bb-border:   rgba(14,14,12,0.09);
    --bb-green:    #1B5E20;
    --bb-green-lt: #E8F5E9;
    --bb-sans:     'Poppins', sans-serif;
    --bb-serif:    'Cormorant Garamond', Georgia, serif;
    --bb-ease:     cubic-bezier(0.25,0.46,0.45,0.94);
    --bb-spring:   cubic-bezier(0.34,1.56,0.64,1);
  }

  /* ── Animations ── */
  @keyframes bbFadeUp  { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
  @keyframes bbScaleIn { from{opacity:0;transform:scale(0.85);}      to{opacity:1;transform:scale(1);} }
  @keyframes bbCheck   { from{stroke-dashoffset:30;} to{stroke-dashoffset:0;} }
  @keyframes bbPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);}  55%{box-shadow:0 0 0 8px rgba(239,119,106,0.15);} }
  @keyframes bbGoldPulse{ 0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,0);} 55%{box-shadow:0 0 0 8px rgba(201,169,110,0.2);} }
  @keyframes bbShake   { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-4px);} 40%{transform:translateX(4px);} 60%{transform:translateX(-3px);} 80%{transform:translateX(3px);} }
  @keyframes bbSlideUp { from{transform:translateY(100%);} to{transform:translateY(0);} }
  @keyframes bbBounce  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
  @keyframes bbSpin    { to{transform:rotate(360deg);} }
  @keyframes bbRipple  { from{transform:scale(0);opacity:0.5;} to{transform:scale(4);opacity:0;} }
  @keyframes bbFlicker { 0%,100%{opacity:1;} 50%{opacity:0.65;} }
  @keyframes bbBarFill { from{width:0;} }
  @keyframes bbGlow    { 0%,100%{opacity:0.4;} 50%{opacity:1;} }

  .bb-aos { opacity:0;transform:translateY(20px);transition:opacity 0.7s var(--bb-ease),transform 0.7s var(--bb-ease); }
  .bb-aos.bb-vis { opacity:1;transform:translateY(0); }
  .bb-d1{transition-delay:.06s}.bb-d2{transition-delay:.12s}.bb-d3{transition-delay:.18s}.bb-d4{transition-delay:.24s}

  /* ── Section ── */
  .bb-section {
    padding: clamp(80px,10vw,140px) 0 clamp(120px,14vw,180px);
    background: var(--bb-ink);
    position: relative;
    overflow: hidden;
    font-family: var(--bb-sans);
  }
  .bb-section * { box-sizing: border-box; }

  /* Orbs */
  .bb-orb {
    position: absolute; border-radius: 50%; pointer-events: none;
  }
  .bb-orb-1 { width:600px;height:600px;top:-200px;left:-200px;background:radial-gradient(circle,rgba(239,119,106,0.1),transparent 70%); }
  .bb-orb-2 { width:400px;height:400px;bottom:-100px;right:-100px;background:radial-gradient(circle,rgba(201,169,110,0.08),transparent 70%); }

  /* ── Header ── */
  .bb-header { text-align:center; margin-bottom: clamp(48px,6vw,80px); position:relative;z-index:1; }
  .bb-eyebrow {
    display:inline-flex;align-items:center;gap:10px;
    font-size:0.6rem;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;
    color:var(--bb-gold);margin-bottom:18px;
  }
  .bb-eyebrow::before,.bb-eyebrow::after { content:'';display:block;width:24px;height:1px;background:var(--bb-gold); }
  .bb-title {
    font-family:var(--bb-sans);
    font-size:clamp(2.2rem,6vw,4.5rem);
    font-weight:900;color:white;
    letter-spacing:-0.03em;line-height:1.0;margin-bottom:16px;
  }
  .bb-title em { font-style:italic;font-weight:300;font-family:var(--bb-serif);color:var(--bb-coral);font-size:1.08em; }
  .bb-subtitle { font-size:clamp(0.82rem,1.2vw,0.95rem);color:rgba(255,255,255,0.45);max-width:420px;margin:0 auto;line-height:1.75; }

  /* ── Pack Cards Grid ── */
  .bb-packs {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:14px;
    margin-bottom:clamp(48px,6vw,72px);
    position:relative;z-index:1;
  }

  .bb-pack {
    background:rgba(255,255,255,0.04);
    border:1.5px solid rgba(255,255,255,0.07);
    border-radius:24px;
    padding:clamp(22px,3vw,34px) clamp(18px,2.5vw,28px);
    cursor:pointer;
    position:relative;
    overflow:hidden;
    transition:transform 0.35s var(--bb-spring), box-shadow 0.35s, border-color 0.25s, background 0.25s;
  }
  .bb-pack:hover {
    transform:translateY(-6px) scale(1.015);
    border-color:rgba(255,255,255,0.15);
    background:rgba(255,255,255,0.07);
    box-shadow:0 24px 64px rgba(0,0,0,0.3);
  }
  .bb-pack.active {
    border-color:var(--bb-coral) !important;
    background:rgba(239,119,106,0.08) !important;
    box-shadow:0 0 0 1px var(--bb-coral), 0 20px 60px rgba(239,119,106,0.2) !important;
    transform:translateY(-8px) scale(1.02);
  }
  .bb-pack.best {
    border-color:var(--bb-gold);
    background:rgba(201,169,110,0.06);
  }
  .bb-pack.best:hover {
    border-color:var(--bb-gold);
    background:rgba(201,169,110,0.1);
    box-shadow:0 24px 64px rgba(201,169,110,0.15);
  }
  .bb-pack.best.active {
    border-color:var(--bb-gold) !important;
    background:rgba(201,169,110,0.12) !important;
    box-shadow:0 0 0 1px var(--bb-gold), 0 20px 60px rgba(201,169,110,0.25) !important;
    animation: bbGoldPulse 2s ease infinite;
  }
  .bb-pack.active:not(.best) { animation: bbPulse 2s ease infinite; }

  /* Pack badge */
  .bb-pack-badge {
    position:absolute;top:-1px;left:50%;transform:translateX(-50%);
    display:inline-flex;align-items:center;gap:5px;
    padding:5px 14px;border-radius:0 0 12px 12px;
    font-size:0.58rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;
  }
  .bb-pack-badge.coral { background:var(--bb-coral);color:white; }
  .bb-pack-badge.gold { background:linear-gradient(135deg,var(--bb-gold),#B8922A);color:white; }
  .bb-pack-badge.green { background:#2E7D32;color:white; }

  /* Pack content */
  .bb-pack-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px; }
  .bb-pack-name {
    font-size:0.65rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;
    color:rgba(255,255,255,0.45);margin-bottom:6px;
  }
  .bb-pack-qty {
    font-family:var(--bb-sans);
    font-size:clamp(2.2rem,4vw,3rem);font-weight:900;
    color:white;letter-spacing:-0.04em;line-height:1;
  }
  .bb-pack-qty sub { font-size:0.55em;font-weight:600;color:rgba(255,255,255,0.5);letter-spacing:0;vertical-align:baseline; }
  .bb-pack-check {
    width:28px;height:28px;border-radius:50%;
    border:2px solid rgba(255,255,255,0.15);
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;
    transition:all 0.3s var(--bb-spring);
    background:transparent;
  }
  .bb-pack.active .bb-pack-check { background:var(--bb-coral);border-color:var(--bb-coral); }
  .bb-pack.best.active .bb-pack-check { background:var(--bb-gold);border-color:var(--bb-gold); }
  .bb-pack-check svg .bb-chk { stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset 0.35s var(--bb-ease) 0.1s; }
  .bb-pack.active .bb-pack-check svg .bb-chk { stroke-dashoffset:0; }

  .bb-pack-price {
    font-family:var(--bb-serif);
    font-size:clamp(1.8rem,3vw,2.4rem);font-weight:600;
    color:white;letter-spacing:-0.01em;line-height:1;margin-bottom:4px;
  }
  .bb-pack-price-sub { font-family:var(--bb-sans);font-size:0.62rem;font-weight:600;color:rgba(255,255,255,0.35);margin-bottom:16px;letter-spacing:0.04em; }

  .bb-pack-tags { display:flex;flex-direction:column;gap:6px; }
  .bb-pack-tag {
    display:inline-flex;align-items:center;gap:6px;
    font-size:0.65rem;font-weight:700;color:rgba(255,255,255,0.5);
    letter-spacing:0.04em;
  }
  .bb-pack-tag .dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
  .bb-pack-tag.green .dot { background:#4ADE80; }
  .bb-pack-tag.coral .dot { background:var(--bb-coral);animation:bbFlicker 1.5s ease infinite; }
  .bb-pack-tag.gold .dot { background:var(--bb-gold); }
  .bb-pack-tag.green { color:rgba(74,222,128,0.85); }
  .bb-pack-tag.coral { color:rgba(239,119,106,0.85); }
  .bb-pack-tag.gold  { color:rgba(201,169,110,0.85); }

  .bb-pack-savings {
    margin-top:16px;
    padding:8px 12px;border-radius:10px;
    background:rgba(74,222,128,0.08);
    border:1px solid rgba(74,222,128,0.15);
    font-size:0.62rem;font-weight:800;
    color:rgba(74,222,128,0.85);letter-spacing:0.08em;text-transform:uppercase;
    text-align:center;
  }

  /* ── Step Indicator ── */
  .bb-steps {
    display:flex;justify-content:center;align-items:center;gap:0;
    margin-bottom:clamp(36px,5vw,56px);position:relative;z-index:1;
  }
  .bb-step-item {
    display:flex;flex-direction:column;align-items:center;gap:8px;
    position:relative;z-index:1;
  }
  .bb-step-conn {
    width:clamp(40px,6vw,80px);height:2px;
    background:rgba(255,255,255,0.08);
    position:relative;overflow:hidden;margin-bottom:22px;
    border-radius:1px;
  }
  .bb-step-conn-fill {
    position:absolute;inset-y:0;left:0;
    background:linear-gradient(to right,var(--bb-coral),var(--bb-gold));
    transition:width 0.5s var(--bb-ease);
    border-radius:1px;
  }
  .bb-step-dot {
    width:36px;height:36px;border-radius:50%;
    border:2px solid rgba(255,255,255,0.12);
    background:rgba(255,255,255,0.04);
    display:flex;align-items:center;justify-content:center;
    font-family:var(--bb-sans);font-size:0.75rem;font-weight:800;color:rgba(255,255,255,0.3);
    transition:all 0.35s var(--bb-spring);
    position:relative;
  }
  .bb-step-dot.filled {
    background:var(--bb-coral);border-color:var(--bb-coral);
    color:white;box-shadow:0 4px 16px rgba(239,119,106,0.4);
    animation:bbScaleIn 0.4s var(--bb-spring) both;
  }
  .bb-step-dot.partial {
    border-color:rgba(239,119,106,0.5);
    color:rgba(239,119,106,0.7);
  }
  .bb-step-label {
    font-size:0.6rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
    color:rgba(255,255,255,0.25);white-space:nowrap;
    transition:color 0.25s;
  }
  .bb-step-label.active { color:rgba(255,255,255,0.7); }

  /* ── Product Grid ── */
  .bb-section-label {
    font-size:0.62rem;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;
    color:rgba(255,255,255,0.3);margin-bottom:20px;
    display:flex;align-items:center;gap:12px;
    position:relative;z-index:1;
  }
  .bb-section-label::after { content:'';flex:1;height:1px;background:rgba(255,255,255,0.06); }

  .bb-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(clamp(150px,18vw,200px),1fr));
    gap:14px;
    margin-bottom:clamp(40px,5vw,64px);
    position:relative;z-index:1;
  }

  /* Product card */
  .bb-card {
    border-radius:18px;overflow:hidden;cursor:pointer;
    background:rgba(255,255,255,0.04);
    border:1.5px solid rgba(255,255,255,0.06);
    transition:transform 0.35s var(--bb-spring),box-shadow 0.35s,border-color 0.25s,background 0.25s,opacity 0.25s;
    position:relative;
  }
  .bb-card:hover:not(.bb-card-disabled) {
    transform:translateY(-6px) scale(1.02);
    box-shadow:0 20px 50px rgba(0,0,0,0.35);
    border-color:rgba(255,255,255,0.14);
    background:rgba(255,255,255,0.07);
  }
  .bb-card.bb-card-selected {
    border-color:var(--bb-coral) !important;
    background:rgba(239,119,106,0.1) !important;
    box-shadow:0 0 0 1px var(--bb-coral), 0 16px 48px rgba(239,119,106,0.2) !important;
  }
  .bb-card.bb-card-disabled { opacity:0.28;cursor:not-allowed;filter:grayscale(0.3); }

  .bb-card-img-wrap {
    position:relative;overflow:hidden;aspect-ratio:1/1;background:rgba(255,255,255,0.03);
  }
  .bb-card-img {
    width:100%;height:100%;object-fit:cover;display:block;
    transition:transform 0.6s var(--bb-ease),filter 0.4s;
    filter:brightness(0.9);
  }
  .bb-card:hover:not(.bb-card-disabled) .bb-card-img { transform:scale(1.08);filter:brightness(1.0); }

  .bb-card-overlay {
    position:absolute;inset:0;
    background:linear-gradient(to top,rgba(14,14,12,0.6) 0%,transparent 55%);
    opacity:0;transition:opacity 0.35s;pointer-events:none;
  }
  .bb-card:hover:not(.bb-card-disabled) .bb-card-overlay { opacity:1; }

  /* Check badge */
  .bb-card-check-badge {
    position:absolute;top:10px;right:10px;
    width:30px;height:30px;border-radius:50%;
    background:var(--bb-coral);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 4px 12px rgba(239,119,106,0.5);
    animation:bbScaleIn 0.35s var(--bb-spring) both;
    z-index:2;
  }
  .bb-card-check-badge svg .bb-ck { stroke-dasharray:16;stroke-dashoffset:16;animation:bbCheck 0.3s var(--bb-ease) 0.1s forwards; }

  /* Number badge */
  .bb-card-num {
    position:absolute;top:10px;left:10px;
    width:24px;height:24px;border-radius:50%;
    background:var(--bb-coral);color:white;
    font-family:var(--bb-sans);font-size:0.65rem;font-weight:800;
    display:flex;align-items:center;justify-content:center;
    animation:bbScaleIn 0.35s var(--bb-spring) both;z-index:2;
  }

  .bb-card-body { padding:12px 13px 14px; }
  .bb-card-cat {
    font-size:0.55rem;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;
    color:var(--bb-coral);margin-bottom:4px;
  }
  .bb-card-name {
    font-family:var(--bb-sans);font-size:0.78rem;font-weight:700;
    color:white;letter-spacing:-0.01em;line-height:1.25;margin-bottom:8px;
  }
  .bb-card-footer { display:flex;justify-content:space-between;align-items:center; }
  .bb-card-price {
    font-family:var(--bb-serif);font-size:1rem;font-weight:600;
    color:rgba(255,255,255,0.85);
  }
  .bb-card-add {
    width:26px;height:26px;border-radius:50%;border:none;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all 0.2s var(--bb-spring);
    font-family:var(--bb-sans);font-size:0.9rem;line-height:1;font-weight:300;
  }
  .bb-card-add.plus { background:rgba(255,255,255,0.1);color:white; }
  .bb-card-add.plus:hover { background:var(--bb-coral);transform:scale(1.15) rotate(90deg); }
  .bb-card-add.minus { background:var(--bb-coral);color:white; }
  .bb-card-add.minus:hover { background:var(--bb-coral-dk);transform:scale(1.1); }

  /* ── Summary Panel ── */
  .bb-summary {
    position:relative;z-index:2;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:28px;padding:clamp(24px,3vw,36px);
    backdrop-filter:blur(20px);
  }
  .bb-summary-top {
    display:flex;align-items:flex-start;justify-content:space-between;
    gap:24px;flex-wrap:wrap;margin-bottom:24px;
  }

  /* Pills selected */
  .bb-pills-row { display:flex;gap:8px;flex-wrap:wrap;align-items:center; }
  .bb-pill {
    display:inline-flex;align-items:center;gap:6px;
    padding:6px 14px;border-radius:999px;
    background:rgba(239,119,106,0.12);
    border:1px solid rgba(239,119,106,0.25);
    color:rgba(255,255,255,0.8);font-size:0.7rem;font-weight:600;
    animation:bbFadeUp 0.3s var(--bb-spring) both;
  }
  .bb-pill-rm {
    width:16px;height:16px;border-radius:50%;
    background:rgba(255,255,255,0.1);border:none;color:rgba(255,255,255,0.5);
    font-size:0.6rem;display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all 0.15s;flex-shrink:0;font-family:var(--bb-sans);
  }
  .bb-pill-rm:hover { background:var(--bb-coral);color:white;transform:scale(1.15); }
  .bb-pill-empty {
    display:inline-flex;align-items:center;gap:6px;
    padding:6px 16px;border-radius:999px;
    border:1.5px dashed rgba(255,255,255,0.12);
    color:rgba(255,255,255,0.2);font-size:0.68rem;font-weight:500;font-style:italic;
  }

  /* Price block */
  .bb-price-block { text-align:right;flex-shrink:0; }
  .bb-price-original {
    font-size:0.8rem;color:rgba(255,255,255,0.3);
    text-decoration:line-through;margin-bottom:3px;
  }
  .bb-price-final {
    font-family:var(--bb-serif);
    font-size:clamp(1.8rem,3vw,2.6rem);font-weight:600;
    color:white;letter-spacing:-0.01em;line-height:1;
  }
  .bb-savings-tag {
    display:inline-flex;align-items:center;gap:5px;
    background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.2);
    border-radius:999px;padding:4px 12px;
    font-size:0.62rem;font-weight:800;color:rgba(74,222,128,0.9);
    letter-spacing:0.08em;text-transform:uppercase;margin-top:6px;
  }

  /* Progress bar */
  .bb-progress-wrap { margin-bottom:20px; }
  .bb-progress-label {
    display:flex;justify-content:space-between;align-items:center;
    margin-bottom:8px;
  }
  .bb-progress-text { font-size:0.68rem;font-weight:600;color:rgba(255,255,255,0.35);letter-spacing:0.04em; }
  .bb-progress-pct  { font-size:0.68rem;font-weight:700;color:var(--bb-coral); }
  .bb-progress-track {
    height:4px;background:rgba(255,255,255,0.06);border-radius:999px;overflow:hidden;
  }
  .bb-progress-fill {
    height:100%;background:linear-gradient(to right,var(--bb-coral),var(--bb-gold));
    border-radius:999px;transition:width 0.5s var(--bb-ease);
    animation:bbBarFill 0.5s var(--bb-ease);
  }

  /* CTA button */
  .bb-cta {
    width:100%;padding:18px 32px;border:none;border-radius:999px;
    font-family:var(--bb-sans);font-size:0.82rem;font-weight:800;
    letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:10px;
    transition:transform 0.25s var(--bb-spring),box-shadow 0.25s,background 0.2s;
    position:relative;overflow:hidden;
  }
  .bb-cta.ready {
    background:linear-gradient(135deg,var(--bb-coral),var(--bb-coral-dk));
    color:white;
    box-shadow:0 8px 28px rgba(239,119,106,0.45);
  }
  .bb-cta.ready:hover {
    transform:translateY(-3px) scale(1.01);
    box-shadow:0 16px 44px rgba(239,119,106,0.55);
  }
  .bb-cta.ready:active { transform:scale(0.98); }
  .bb-cta.success {
    background:linear-gradient(135deg,#1B5E20,#2E7D32) !important;
    box-shadow:0 8px 28px rgba(46,125,50,0.4) !important;
  }
  .bb-cta.disabled {
    background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.25);
    cursor:not-allowed;border:1px dashed rgba(255,255,255,0.1);
  }
  .bb-cta-ripple {
    position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);
    width:10px;height:10px;margin-top:-5px;margin-left:-5px;
    animation:bbRipple 0.5s var(--bb-ease) forwards;pointer-events:none;
  }

  /* Sticky bottom bar (mobile) */
  .bb-sticky {
    position:fixed;bottom:0;left:0;right:0;z-index:999;
    background:rgba(10,10,8,0.92);backdrop-filter:blur(20px);
    border-top:1px solid rgba(255,255,255,0.08);
    padding:14px 20px 20px;
    display:flex;align-items:center;gap:14px;
    transform:translateY(100%);
    transition:transform 0.4s var(--bb-spring);
    font-family:var(--bb-sans);
  }
  .bb-sticky.show { transform:translateY(0); }
  .bb-sticky-info { flex:1;min-width:0; }
  .bb-sticky-label { font-size:0.62rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:3px; }
  .bb-sticky-price {
    font-family:var(--bb-serif);font-size:1.5rem;font-weight:600;color:white;line-height:1;letter-spacing:-0.01em;
  }
  .bb-sticky-savings { font-size:0.62rem;font-weight:700;color:rgba(74,222,128,0.8);margin-top:2px; }
  .bb-sticky-cta {
    padding:14px 24px;border:none;border-radius:999px;
    background:linear-gradient(135deg,var(--bb-coral),var(--bb-coral-dk));
    color:white;font-family:var(--bb-sans);font-size:0.75rem;font-weight:800;
    letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;
    box-shadow:0 4px 16px rgba(239,119,106,0.4);
    transition:transform 0.2s var(--bb-spring);white-space:nowrap;flex-shrink:0;
  }
  .bb-sticky-cta:hover { transform:scale(1.03); }
  .bb-sticky-cta:disabled { background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.25);box-shadow:none;cursor:not-allowed;transform:none; }

  /* ── Responsive ── */
  @media (max-width:1100px) { .bb-packs { grid-template-columns:repeat(2,1fr);gap:12px; } }
  @media (max-width:768px) {
    .bb-packs { grid-template-columns:repeat(2,1fr); }
    .bb-steps .bb-step-conn { width:clamp(20px,5vw,50px); }
    .bb-grid { grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px; }
    .bb-summary-top { flex-direction:column; }
    .bb-price-block { text-align:left; }
  }
  @media (max-width:480px) {
    .bb-packs { grid-template-columns:1fr 1fr;gap:10px; }
    .bb-pack-qty { font-size:2rem; }
    .bb-pack-price { font-size:1.5rem; }
    .bb-grid { grid-template-columns:repeat(2,1fr);gap:8px; }
  }
`;

/* ─── Pack definitions ──────────────────────────────── */
const PACKS = [
  {
    id:      "p1",
    name:    "Pack 1",
    qty:     4,
    price:   160,
    label:   "35ML × 4",
    badge:   null,
    tags:    [
      { text: "Livraison gratuite 🚚", cls: "green" },
      { text: "Idéal pour débuter", cls: "gold" },
    ],
    savings: null,
    origPrice: null,
  },
  {
    id:      "p2",
    name:    "Pack 2",
    qty:     8,
    price:   290,
    label:   "35ML × 8",
    badge:   { text: "Plus populaire", cls: "coral" },
    tags:    [
      { text: "Livraison gratuite 🚚", cls: "green" },
      { text: "Best seller", cls: "coral" },
    ],
    savings: "Économie 30dh",
    origPrice: 320,
  },
  {
    id:      "p3",
    name:    "Pack 3",
    qty:     12,
    price:   410,
    label:   "35ML × 12",
    badge:   { text: "Meilleur rapport", cls: "green" },
    tags:    [
      { text: "Livraison gratuite 🚚", cls: "green" },
      { text: "Stock limité ⚡", cls: "coral" },
    ],
    savings: "Économie 70dh",
    origPrice: 480,
  },
  {
    id:      "golden",
    name:    "Golden Offer",
    qty:     6,
    price:   210,
    label:   "35ML × 6",
    badge:   { text: "✦ Offre dorée", cls: "gold" },
    tags:    [
      { text: "Livraison gratuite 🚚", cls: "green" },
      { text: "Édition limitée ✦", cls: "gold" },
    ],
    savings: "Économie 30dh",
    origPrice: 240,
    isBest:  true,
  },
];

function injectBBStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-bb-css")) {
    const tag = document.createElement("style");
    tag.id = "nahid-bb-css";
    tag.textContent = BB_CSS;
    document.head.appendChild(tag);
  }
}

/* ─── BundleBuilder ─────────────────────────────────── */
const BundleBuilder = ({ products, addToCart }) => {
  injectBBStyles();

  const [selected,     setSelected]     = useState([]);
  const [added,        setAdded]        = useState(false);
  const [activePack,   setActivePack]   = useState(PACKS[1]); // default Pack 2
  const [showSticky,   setShowSticky]   = useState(false);
  const sectionRef = useRef(null);
  const ctaRef     = useRef(null);

  /* AOS */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("bb-vis"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".bb-aos").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* Sticky bar visibility */
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setShowSticky(!e.isIntersecting && selected.length > 0),
      { threshold: 0 }
    );
    obs.observe(ctaRef.current ?? sectionRef.current);
    return () => obs.disconnect();
  }, [selected.length]);

  /* When pack changes, reset selection */
  const handleSelectPack = (pack) => {
    setActivePack(pack);
    setSelected([]);
  };

  /* Available products (in-stock, max 12) */
  const available = products.filter(p => p.stock > 0).slice(0, 12);

  /* Toggle product (original logic) */
  const toggle = (product) => {
    setSelected(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= activePack.qty) return prev;
      return [...prev, product];
    });
  };

  const getPrice = p =>
    typeof p.price === "string" ? parseFloat(p.price) : p.price;

  /* Use pack fixed prices */
  const finalPrice    = activePack.price;
  const originalPrice = activePack.origPrice ?? activePack.price;
  const savings       = originalPrice - finalPrice;
  const fmt = n => Math.round(n).toLocaleString("fr-MA");

  /* Ripple */
  const handleRipple = (e, el) => {
    const rect = el.getBoundingClientRect();
    const rip = document.createElement("span");
    rip.className = "bb-cta-ripple";
    rip.style.left = `${e.clientX - rect.left}px`;
    rip.style.top  = `${e.clientY - rect.top}px`;
    el.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  };

  /* Add to cart (original logic) */
  const handleAddBundle = (e) => {
    if (selected.length !== activePack.qty) return;
    if (e?.currentTarget) handleRipple(e, e.currentTarget);
    selected.forEach(p => addToCart(p, 1));
    setAdded(true);
    setTimeout(() => { setAdded(false); setSelected([]); }, 2800);
  };

  const pct = Math.round((selected.length / activePack.qty) * 100);
  const isReady = selected.length === activePack.qty;

  return (
    <>
      <section className="bb-section" ref={sectionRef}>
        <div className="bb-orb bb-orb-1" />
        <div className="bb-orb bb-orb-2" />

        <div className="container">

          {/* ── Header ── */}
          <div className="bb-header">
            <div className="bb-eyebrow bb-aos">Offre exclusive</div>
            <h2 className="bb-title bb-aos">
              Créez votre<br/><em>Coffret Personnalisé</em>
            </h2>
            <p className="bb-subtitle bb-aos">
              Choisissez votre pack, sélectionnez vos fragrances préférées et profitez de la livraison gratuite partout au Maroc 🇲🇦
            </p>
          </div>

          {/* ── Pack Cards ── */}
          <div className="bb-packs">
            {PACKS.map((pack, i) => (
              <div
                key={pack.id}
                className={`bb-pack bb-aos bb-d${i+1}${pack.isBest ? " best" : ""}${activePack.id === pack.id ? " active" : ""}`}
                onClick={() => handleSelectPack(pack)}
              >
                {pack.badge && (
                  <div className={`bb-pack-badge ${pack.badge.cls}`}>
                    {pack.badge.text}
                  </div>
                )}

                <div className="bb-pack-top">
                  <div>
                    <div className="bb-pack-name">{pack.name}</div>
                    <div className="bb-pack-qty">
                      {pack.qty}<sub>×</sub>
                    </div>
                  </div>
                  <div className="bb-pack-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline className="bb-chk" points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>

                <div className="bb-pack-price">
                  {fmt(pack.price)} <span style={{fontSize:"0.5em",fontFamily:"var(--bb-sans)",fontWeight:700,color:"rgba(255,255,255,0.45)"}}>MAD</span>
                </div>
                <div className="bb-pack-price-sub">{pack.label}</div>

                <div className="bb-pack-tags">
                  {pack.tags.map((t, ti) => (
                    <span key={ti} className={`bb-pack-tag ${t.cls}`}>
                      <span className="dot" />
                      {t.text}
                    </span>
                  ))}
                </div>

                {pack.savings && (
                  <div className="bb-pack-savings">🎉 {pack.savings}</div>
                )}
              </div>
            ))}
          </div>

          {/* ── Step Indicator ── */}
          <div className="bb-steps bb-aos">
            {Array.from({ length: activePack.qty }, (_, i) => (
              <div key={i} style={{display:"flex",alignItems:"center"}}>
                <div className="bb-step-item">
                  <div className={`bb-step-dot${i < selected.length ? " filled" : i === selected.length ? " partial" : ""}`}>
                    {i < selected.length ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                        <polyline className="bb-ck" points="20 6 9 17 4 12"/>
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`bb-step-label${i <= selected.length ? " active" : ""}`}>
                    {i < selected.length ? selected[i]?.name.substring(0,8)+"…" : `Parfum ${i+1}`}
                  </span>
                </div>
                {i < activePack.qty - 1 && (
                  <div className="bb-step-conn">
                    <div className="bb-step-conn-fill" style={{width: i < selected.length - 1 ? "100%" : i === selected.length - 1 ? "50%" : "0%"}} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Section label ── */}
          <div className="bb-section-label bb-aos">
            Choisissez vos {activePack.qty} fragrances
            {selected.length > 0 && (
              <span style={{color:"var(--bb-coral)",fontStyle:"italic",fontWeight:700}}>
                — {selected.length}/{activePack.qty} sélectionné{selected.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* ── Product Grid ── */}
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
                    <img
                      className="bb-card-img"
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                    />
                    <div className="bb-card-overlay" />
                    {isSel && (
                      <>
                        <div className="bb-card-check-badge">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                            <polyline className="bb-ck" points="20 6 9 17 4 12"/>
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

          {/* ── Summary Panel ── */}
          <div className="bb-summary bb-aos" ref={ctaRef}>

            {/* Progress */}
            <div className="bb-progress-wrap">
              <div className="bb-progress-label">
                <span className="bb-progress-text">
                  {isReady ? "✓ Sélection complète — Prêt à commander !" : `${selected.length} / ${activePack.qty} fragrances sélectionnées`}
                </span>
                <span className="bb-progress-pct">{pct}%</span>
              </div>
              <div className="bb-progress-track">
                <div className="bb-progress-fill" style={{width:`${pct}%`}} />
              </div>
            </div>

            <div className="bb-summary-top">
              {/* Pills */}
              <div>
                <div style={{fontSize:"0.6rem",fontWeight:"700",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:"10px"}}>
                  Vos fragrances
                </div>
                <div className="bb-pills-row">
                  {selected.map(p => (
                    <span key={p.id} className="bb-pill">
                      {p.name.substring(0, 16)}{p.name.length > 16 ? "…" : ""}
                      <button
                        className="bb-pill-rm"
                        onClick={e => { e.stopPropagation(); toggle(p); }}
                        aria-label="Retirer"
                      >✕</button>
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
                  {savings > 0 && (
                    <div className="bb-price-original">{fmt(originalPrice)} MAD</div>
                  )}
                  <div className="bb-price-final">{fmt(finalPrice)} MAD</div>
                  {savings > 0 && (
                    <div>
                      <span className="bb-savings-tag">🎉 Économie {fmt(savings)} MAD</span>
                    </div>
                  )}
                  <div style={{marginTop:"6px",fontSize:"0.6rem",fontWeight:"700",color:"rgba(74,222,128,0.7)",letterSpacing:"0.06em"}}>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Coffret ajouté avec succès !
                </>
              ) : isReady ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  Ajouter le coffret — {fmt(finalPrice)} MAD
                </>
              ) : (
                <>Choisissez encore {activePack.qty - selected.length} parfum{activePack.qty - selected.length > 1 ? "s" : ""}</>
              )}
            </button>

            {/* Trust row */}
            <div style={{display:"flex",gap:"20px",justifyContent:"center",flexWrap:"wrap",marginTop:"16px"}}>
              {["🚚 Livraison gratuite","↩️ Retours 30j","🔒 Paiement sécurisé","⭐ 4.9/5 clients"].map(t => (
                <span key={t} style={{fontSize:"0.62rem",fontWeight:"600",color:"rgba(255,255,255,0.25)",letterSpacing:"0.04em"}}>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Sticky Bottom Bar (mobile) ── */}
      <div className={`bb-sticky${showSticky && selected.length > 0 ? " show" : ""}`}>
        <div className="bb-sticky-info">
          <div className="bb-sticky-label">{activePack.name} · {selected.length}/{activePack.qty} sélectionnés</div>
          <div className="bb-sticky-price">{fmt(finalPrice)} MAD</div>
          {savings > 0 && <div className="bb-sticky-savings">🎉 Économie {fmt(savings)} MAD · Livraison gratuite</div>}
        </div>
        <button
          className="bb-sticky-cta"
          onClick={handleAddBundle}
          disabled={!isReady}
        >
          {isReady ? "Commander →" : `Encore ${activePack.qty - selected.length}`}
        </button>
      </div>
    </>
  );
};

export default BundleBuilder;
