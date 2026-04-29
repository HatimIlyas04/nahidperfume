import { useEffect, useRef, useState } from "react";

/* ─── Inject CSS once ─────────────────────────────────── */
const NH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');

  :root {
    --coral:      #EF776A;
    --coral-dk:   #C9503F;
    --coral-lt:   #FFF3F1;
    --gold:       #C9A96E;
    --gold-lt:    #F5E9D0;
    --ink:        #0E0E0C;
    --cream:      #FAF8F5;
    --sand:       #EDE9E1;
    --muted:      #7A7770;
    --white:      #FFFFFF;
    --border:     rgba(14,14,12,0.08);
    --sans:       'Poppins', sans-serif;
    --serif:      'Cormorant Garamond', Georgia, serif;
    --ease:       cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Animations ── */
  @keyframes nhFadeUp     { from{opacity:0;transform:translateY(40px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes nhFadeLeft   { from{opacity:0;transform:translateX(-50px);} to{opacity:1;transform:translateX(0);} }
  @keyframes nhFadeRight  { from{opacity:0;transform:translateX(50px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes nhScaleIn    { from{opacity:0;transform:scale(0.85);}        to{opacity:1;transform:scale(1);} }
  @keyframes nhRotateSlow { from{transform:rotate(0deg);}   to{transform:rotate(360deg);} }
  @keyframes nhFloat      { 0%,100%{transform:translateY(0);}    50%{transform:translateY(-14px);} }
  @keyframes nhFloatR     { 0%,100%{transform:translateY(0) rotate(3deg);} 50%{transform:translateY(-10px) rotate(-3deg);} }
  @keyframes nhPulse      { 0%,100%{opacity:0.6;transform:scale(1);}  50%{opacity:1;transform:scale(1.05);} }
  @keyframes nhShimmer    { from{background-position:200% 0;} to{background-position:-200% 0;} }
  @keyframes nhCountUp    { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
  @keyframes nhLineGrow   { from{width:0;} to{width:100%;} }
  @keyframes nhStar       { 0%,100%{transform:scale(1) rotate(0deg);} 50%{transform:scale(1.2) rotate(10deg);} }
  @keyframes nhGrain      { 0%,100%{transform:translate(0,0);}  20%{transform:translate(-2px,2px);}  40%{transform:translate(2px,-2px);}  60%{transform:translate(-1px,3px);}  80%{transform:translate(3px,-1px);} }
  @keyframes nhOrb        { 0%,100%{transform:translate(0,0) scale(1);}  33%{transform:translate(40px,-30px) scale(1.1);}  66%{transform:translate(-20px,20px) scale(0.95);} }
  @keyframes nhMarquee    { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes nhReveal     { from{clip-path:inset(0 100% 0 0);} to{clip-path:inset(0 0% 0 0);} }
  @keyframes nhBorderRot  { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

  /* AOS utility */
  .nh-aos { opacity:0; transform:translateY(36px); transition:opacity 0.85s var(--ease), transform 0.85s var(--ease); }
  .nh-aos.nh-visible { opacity:1; transform:translateY(0); }
  .nh-aos-l { opacity:0; transform:translateX(-40px); transition:opacity 0.8s var(--ease), transform 0.8s var(--ease); }
  .nh-aos-l.nh-visible { opacity:1; transform:translateX(0); }
  .nh-aos-r { opacity:0; transform:translateX(40px); transition:opacity 0.8s var(--ease), transform 0.8s var(--ease); }
  .nh-aos-r.nh-visible { opacity:1; transform:translateX(0); }
  .nh-aos-s { opacity:0; transform:scale(0.88); transition:opacity 0.7s var(--ease), transform 0.7s var(--ease); }
  .nh-aos-s.nh-visible { opacity:1; transform:scale(1); }
  .nh-d1{transition-delay:.08s} .nh-d2{transition-delay:.16s} .nh-d3{transition-delay:.24s}
  .nh-d4{transition-delay:.32s} .nh-d5{transition-delay:.40s} .nh-d6{transition-delay:.48s}

  /* ─────────────────────────────────────────
     PAGE WRAPPER
  ───────────────────────────────────────── */
  .nh-page {
    font-family: var(--sans);
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .nh-page * { box-sizing: border-box; }

  /* ─────────────────────────────────────────
     CINEMATIC HERO
  ───────────────────────────────────────── */
  .nh-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--ink);
    padding: clamp(100px,14vh,160px) 20px clamp(80px,10vh,120px);
  }

  /* Orbs */
  .nh-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .nh-orb-1 {
    width: 700px; height: 700px;
    top: -200px; left: -200px;
    background: radial-gradient(circle, rgba(239,119,106,0.18) 0%, transparent 70%);
    animation: nhOrb 18s ease-in-out infinite;
  }
  .nh-orb-2 {
    width: 500px; height: 500px;
    bottom: -150px; right: -100px;
    background: radial-gradient(circle, rgba(201,169,110,0.14) 0%, transparent 70%);
    animation: nhOrb 14s ease-in-out infinite reverse;
  }
  .nh-orb-3 {
    width: 300px; height: 300px;
    top: 40%; left: 60%;
    background: radial-gradient(circle, rgba(239,119,106,0.08) 0%, transparent 70%);
    animation: nhOrb 22s ease-in-out infinite 4s;
  }

  /* Grain */
  .nh-grain {
    position: absolute; inset: -50%;
    width: 200%; height: 200%;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px;
    animation: nhGrain 6s steps(1) infinite;
    pointer-events: none;
  }

  /* Decorative rings */
  .nh-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.05);
    pointer-events: none;
  }
  .nh-ring-1 { width:500px;height:500px; top:50%;left:50%;transform:translate(-50%,-50%); }
  .nh-ring-2 { width:750px;height:750px; top:50%;left:50%;transform:translate(-50%,-50%); }
  .nh-ring-3 { width:1050px;height:1050px; top:50%;left:50%;transform:translate(-50%,-50%); animation:nhBorderRot 60s linear infinite; border-color:rgba(239,119,106,0.04); }

  /* Hero logo */
  .nh-hero-logo {
    position: relative; z-index: 2;
    width: clamp(70px, 10vw, 100px);
    height: clamp(70px, 10vw, 100px);
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid rgba(255,255,255,0.12);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(239,119,106,0.2);
    margin-bottom: 32px;
    animation: nhScaleIn 0.8s var(--spring) 0.2s both, nhFloat 6s ease-in-out 1.5s infinite;
  }
  .nh-hero-logo img { width:100%; height:100%; object-fit:cover; display:block; }
  .nh-hero-logo-fallback {
    width:100%; height:100%;
    background: linear-gradient(135deg, var(--coral), var(--coral-dk));
    display: flex; align-items: center; justify-content: center;
    font-family: var(--serif);
    font-size: clamp(28px,5vw,42px);
    font-weight: 600;
    color: white;
    letter-spacing: -0.02em;
  }

  .nh-hero-eyebrow {
    position: relative; z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
    animation: nhFadeUp 0.8s var(--ease) 0.4s both;
  }
  .nh-hero-eyebrow::before, .nh-hero-eyebrow::after {
    content: '';
    display: block;
    width: 40px; height: 1px;
    background: linear-gradient(to right, transparent, var(--gold));
  }
  .nh-hero-eyebrow::after { background: linear-gradient(to left, transparent, var(--gold)); }

  .nh-hero-title {
    position: relative; z-index: 2;
    font-family: var(--sans);
    font-size: clamp(3.2rem, 10vw, 8rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.04em;
    line-height: 0.9;
    text-align: center;
    margin-bottom: 16px;
    animation: nhFadeUp 0.9s var(--ease) 0.5s both;
  }
  .nh-hero-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    color: var(--coral);
    font-size: 1.1em;
    display: block;
  }

  .nh-hero-sub {
    position: relative; z-index: 2;
    font-size: clamp(0.85rem, 1.5vw, 1.05rem);
    font-weight: 400;
    color: rgba(255,255,255,0.55);
    text-align: center;
    max-width: 520px;
    line-height: 1.85;
    margin-bottom: 48px;
    animation: nhFadeUp 0.9s var(--ease) 0.65s both;
  }

  .nh-hero-badges {
    position: relative; z-index: 2;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    animation: nhFadeUp 0.9s var(--ease) 0.75s both;
  }
  .nh-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(12px);
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    letter-spacing: 0.04em;
  }
  .nh-hero-badge-dot { width:6px;height:6px;border-radius:50%;background:var(--coral);animation:nhPulse 2s ease infinite;flex-shrink:0; }
  .nh-hero-badge-dot.gold { background: var(--gold); }

  /* Scroll cue */
  .nh-hero-scroll {
    position: absolute;
    bottom: 32px; left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    animation: nhFadeUp 0.8s var(--ease) 1.2s both;
  }
  .nh-scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
    animation: nhPulse 2s ease-in-out infinite;
  }
  .nh-scroll-txt {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }

  /* ─────────────────────────────────────────
     MARQUEE STRIP
  ───────────────────────────────────────── */
  .nh-marquee {
    background: var(--coral);
    padding: 14px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .nh-marquee-track {
    display: inline-flex;
    gap: 48px;
    animation: nhMarquee 30s linear infinite;
  }
  .nh-marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: white;
    white-space: nowrap;
  }
  .nh-marquee-sep { opacity: 0.5; font-size: 0.5rem; }

  /* ─────────────────────────────────────────
     STATS SECTION
  ───────────────────────────────────────── */
  .nh-stats {
    background: white;
    padding: clamp(60px,8vw,100px) 0;
  }
  .nh-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 80px);
  }
  .nh-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 28px;
    overflow: hidden;
  }
  .nh-stat-item {
    padding: clamp(28px,4vw,48px) clamp(20px,3vw,36px);
    border-right: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }
  .nh-stat-item:hover { background: var(--cream); }
  .nh-stat-item:last-child { border-right: none; }
  .nh-stat-item::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--coral), var(--gold));
    transform: scaleX(0);
    transition: transform 0.4s var(--ease);
    transform-origin: left;
  }
  .nh-stat-item:hover::after { transform: scaleX(1); }
  .nh-stat-num {
    font-family: var(--sans);
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 8px;
  }
  .nh-stat-num span { color: var(--coral); }
  .nh-stat-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ─────────────────────────────────────────
     SECTION COMMONS
  ───────────────────────────────────────── */
  .nh-section { padding: clamp(80px,10vw,140px) 0; }
  .nh-section-alt { background: white; }

  .nh-section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--coral);
    margin-bottom: 18px;
  }
  .nh-section-eyebrow::before {
    content: '';
    width: 28px; height: 1px;
    background: var(--coral);
    display: block;
  }

  .nh-section-title {
    font-family: var(--sans);
    font-size: clamp(2rem, 5vw, 3.8rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 24px;
  }
  .nh-section-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    color: var(--coral);
    font-size: 1.08em;
  }
  .nh-section-body {
    font-size: clamp(0.9rem, 1.3vw, 1.05rem);
    font-weight: 400;
    line-height: 1.9;
    color: var(--muted);
    max-width: 560px;
  }

  /* ─────────────────────────────────────────
     FOUNDER SECTION
  ───────────────────────────────────────── */
  .nh-founder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 100px);
    align-items: center;
  }
  .nh-founder-img-wrap {
    position: relative;
  }
  .nh-founder-img-frame {
    position: absolute;
    top: -20px; right: -20px;
    bottom: 20px; left: 20px;
    border: 2px solid rgba(239,119,106,0.25);
    border-radius: 32px;
    pointer-events: none;
  }
  .nh-founder-img {
    width: 100%;
    aspect-ratio: 4/5;
    object-fit: cover;
    border-radius: 28px;
    display: block;
    box-shadow: 0 40px 80px rgba(0,0,0,0.12);
    position: relative; z-index: 1;
  }
  .nh-founder-badge {
    position: absolute;
    bottom: 28px; left: -24px;
    z-index: 2;
    background: white;
    border-radius: 20px;
    padding: 18px 24px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    gap: 14px;
    animation: nhFloat 4s ease-in-out infinite;
  }
  .nh-founder-badge-icon { font-size: 2rem; }
  .nh-founder-badge-num {
    font-family: var(--sans);
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .nh-founder-badge-txt {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .nh-founder-signature {
    font-family: var(--serif);
    font-size: 2.2rem;
    font-weight: 400;
    font-style: italic;
    color: var(--coral);
    margin: 24px 0 8px;
    line-height: 1;
  }
  .nh-founder-role {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 28px;
  }

  .nh-founder-quote {
    position: relative;
    padding: 24px 28px;
    background: var(--cream);
    border-left: 3px solid var(--coral);
    border-radius: 0 16px 16px 0;
    margin: 32px 0;
  }
  .nh-founder-quote p {
    font-family: var(--serif);
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-style: italic;
    font-weight: 400;
    color: var(--ink);
    line-height: 1.65;
  }
  .nh-founder-quote::before {
    content: '"';
    position: absolute;
    top: -10px; left: 20px;
    font-family: var(--serif);
    font-size: 5rem;
    color: var(--coral);
    opacity: 0.2;
    line-height: 1;
    pointer-events: none;
  }

  /* ─────────────────────────────────────────
     VALUES GRID
  ───────────────────────────────────────── */
  .nh-values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 60px;
  }
  .nh-value-card {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: clamp(28px,4vw,44px) clamp(24px,3vw,36px);
    position: relative;
    overflow: hidden;
    transition: transform 0.4s var(--spring), box-shadow 0.4s, border-color 0.3s;
  }
  .nh-value-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(239,119,106,0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .nh-value-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 24px 60px rgba(0,0,0,0.1); border-color: rgba(239,119,106,0.2); }
  .nh-value-card:hover::before { opacity: 1; }
  .nh-value-num {
    position: absolute;
    top: 16px; right: 20px;
    font-family: var(--sans);
    font-size: 4rem;
    font-weight: 900;
    color: rgba(14,14,12,0.04);
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .nh-value-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .nh-value-title {
    font-family: var(--sans);
    font-size: 1rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 10px;
    position: relative; z-index: 1;
  }
  .nh-value-text {
    font-size: 0.82rem;
    font-weight: 400;
    line-height: 1.7;
    color: var(--muted);
    position: relative; z-index: 1;
  }

  /* ─────────────────────────────────────────
     STORY TIMELINE
  ───────────────────────────────────────── */
  .nh-timeline {
    position: relative;
    padding-left: 40px;
    margin-top: 60px;
  }
  .nh-timeline::before {
    content: '';
    position: absolute;
    left: 12px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--coral), var(--gold), transparent);
  }
  .nh-timeline-item {
    position: relative;
    margin-bottom: 48px;
  }
  .nh-timeline-item:last-child { margin-bottom: 0; }
  .nh-timeline-dot {
    position: absolute;
    left: -34px; top: 6px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--coral);
    border: 3px solid var(--cream);
    box-shadow: 0 0 0 3px rgba(239,119,106,0.25);
  }
  .nh-timeline-year {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--coral);
    margin-bottom: 6px;
  }
  .nh-timeline-title {
    font-family: var(--sans);
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 8px;
  }
  .nh-timeline-body {
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.75;
    color: var(--muted);
  }

  /* ─────────────────────────────────────────
     INGREDIENTS SECTION
  ───────────────────────────────────────── */
  .nh-ingredients {
    background: var(--ink);
    padding: clamp(80px,10vw,140px) 0;
    position: relative;
    overflow: hidden;
  }
  .nh-ingredients::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 60% at 70% 50%, rgba(239,119,106,0.08), transparent);
    pointer-events: none;
  }
  .nh-ing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px,6vw,100px);
    align-items: center;
  }
  .nh-ing-title {
    font-family: var(--sans);
    font-size: clamp(2rem, 5vw, 3.8rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 24px;
  }
  .nh-ing-title em {
    font-style: italic; font-weight: 300;
    font-family: var(--serif);
    color: var(--gold); font-size: 1.08em;
  }
  .nh-ing-body {
    font-size: 0.9rem;
    line-height: 1.85;
    color: rgba(255,255,255,0.5);
    margin-bottom: 32px;
  }
  .nh-ing-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .nh-ing-tag {
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid rgba(201,169,110,0.25);
    background: rgba(201,169,110,0.08);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
  }
  .nh-ing-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .nh-ing-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 24px 20px;
    transition: background 0.3s, transform 0.3s;
  }
  .nh-ing-card:hover { background: rgba(255,255,255,0.07); transform: translateY(-4px); }
  .nh-ing-card-icon { font-size: 1.8rem; margin-bottom: 12px; }
  .nh-ing-card-name {
    font-family: var(--sans);
    font-size: 0.85rem;
    font-weight: 800;
    color: white;
    margin-bottom: 5px;
    letter-spacing: -0.01em;
  }
  .nh-ing-card-origin {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  /* ─────────────────────────────────────────
     DELIVERY SECTION
  ───────────────────────────────────────── */
  .nh-delivery {
    padding: clamp(80px,10vw,120px) 0;
    background: white;
  }
  .nh-delivery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px,6vw,80px);
    align-items: center;
  }
  .nh-cities {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .nh-city-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 999px;
    background: var(--cream);
    border: 1.5px solid var(--border);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.02em;
    transition: all 0.2s var(--spring);
  }
  .nh-city-chip:hover { background: var(--coral); color: white; border-color: var(--coral); transform: translateY(-3px); }
  .nh-delivery-card {
    background: var(--ink);
    border-radius: 28px;
    padding: clamp(32px,4vw,52px);
    position: relative;
    overflow: hidden;
  }
  .nh-delivery-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(239,119,106,0.1);
    pointer-events: none;
  }
  .nh-delivery-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 28px;
    position: relative; z-index: 1;
  }
  .nh-delivery-item:last-child { margin-bottom: 0; }
  .nh-delivery-icon {
    width: 44px; height: 44px;
    border-radius: 14px;
    background: rgba(239,119,106,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .nh-delivery-item-title {
    font-size: 0.82rem;
    font-weight: 800;
    color: white;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }
  .nh-delivery-item-body {
    font-size: 0.75rem;
    font-weight: 400;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
  }

  /* ─────────────────────────────────────────
     INSPIRATION SECTION
  ───────────────────────────────────────── */
  .nh-inspiration {
    padding: clamp(80px,10vw,120px) 0;
    background: var(--cream);
  }
  .nh-insp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 52px;
  }
  .nh-insp-card {
    border-radius: 24px;
    padding: clamp(28px,3vw,40px);
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border);
    transition: transform 0.4s var(--spring), box-shadow 0.4s;
  }
  .nh-insp-card:hover { transform: translateY(-8px); box-shadow: 0 28px 64px rgba(0,0,0,0.1); }
  .nh-insp-card-tag {
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .nh-insp-card-num {
    font-family: var(--sans);
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 8px;
  }
  .nh-insp-card-title {
    font-family: var(--sans);
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .nh-insp-card-body {
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.7;
    opacity: 0.7;
  }
  .nh-insp-card-deco {
    position: absolute;
    bottom: -20px; right: -20px;
    font-size: 6rem;
    opacity: 0.07;
    pointer-events: none;
    transform: rotate(-15deg);
  }

  /* ─────────────────────────────────────────
     CTA SECTION
  ───────────────────────────────────────── */
  .nh-cta {
    padding: clamp(100px,12vw,160px) 0;
    background: var(--ink);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .nh-cta-orb-1 { position:absolute; top:-100px;left:-100px; width:400px;height:400px; border-radius:50%; background:radial-gradient(circle,rgba(239,119,106,0.12),transparent 70%); pointer-events:none; }
  .nh-cta-orb-2 { position:absolute; bottom:-100px;right:-100px; width:400px;height:400px; border-radius:50%; background:radial-gradient(circle,rgba(201,169,110,0.1),transparent 70%); pointer-events:none; }
  .nh-cta-title {
    font-family: var(--sans);
    font-size: clamp(2.4rem, 6vw, 5rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.04em;
    line-height: 1.0;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .nh-cta-title em {
    font-style: italic; font-weight: 300;
    font-family: var(--serif);
    color: var(--coral); font-size: 1.1em;
  }
  .nh-cta-sub {
    font-size: clamp(0.85rem,1.3vw,1rem);
    color: rgba(255,255,255,0.45);
    line-height: 1.8;
    max-width: 440px;
    margin: 0 auto 40px;
    position: relative; z-index: 1;
  }
  .nh-cta-btns {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
    position: relative; z-index: 1;
  }
  .nh-btn-coral {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 36px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--coral), var(--coral-dk));
    color: white;
    font-family: var(--sans);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 0.25s var(--spring), box-shadow 0.25s;
    box-shadow: 0 8px 28px rgba(239,119,106,0.4);
  }
  .nh-btn-coral:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 16px 40px rgba(239,119,106,0.5); }
  .nh-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 32px;
    border-radius: 999px;
    background: rgba(255,255,255,0.07);
    color: white;
    font-family: var(--sans);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .nh-btn-ghost:hover { background: rgba(255,255,255,0.14); transform: translateY(-2px); }

  /* ─────────────────────────────────────────
     RESPONSIVE
  ───────────────────────────────────────── */
  @media (max-width: 1024px) {
    .nh-founder { grid-template-columns: 1fr; }
    .nh-founder-img-frame { display: none; }
    .nh-ing-grid { grid-template-columns: 1fr; }
    .nh-delivery-grid { grid-template-columns: 1fr; }
    .nh-stats-grid { grid-template-columns: 1fr 1fr; }
    .nh-stat-item:nth-child(2) { border-right: none; }
    .nh-stat-item:nth-child(1),
    .nh-stat-item:nth-child(2) { border-bottom: 1px solid var(--border); }
  }
  @media (max-width: 768px) {
    .nh-values-grid { grid-template-columns: 1fr; }
    .nh-insp-grid { grid-template-columns: 1fr; }
    .nh-ing-cards { grid-template-columns: 1fr 1fr; }
    .nh-founder-badge { left: 10px; }
  }
  @media (max-width: 600px) {
    .nh-stats-grid { grid-template-columns: 1fr 1fr; border-radius: 20px; }
    .nh-stat-item { padding: 20px 16px; }
    .nh-ing-cards { grid-template-columns: 1fr; }
    .nh-hero-title { letter-spacing: -0.03em; }
    .nh-values-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 400px) {
    .nh-values-grid { grid-template-columns: 1fr; }
    .nh-stats-grid { grid-template-columns: 1fr; }
    .nh-stat-item { border-right: none !important; border-bottom: 1px solid var(--border); }
    .nh-stat-item:last-child { border-bottom: none; }
  }
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nh-styles")) {
    const tag = document.createElement("style");
    tag.id = "nh-styles";
    tag.textContent = NH_CSS;
    document.head.appendChild(tag);
  }
}

/* ─── Counter animation hook ─────────────────────────── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

/* ─── Animated stat ──────────────────────────────────── */
function AnimatedStat({ num, suffix = "", prefix = "", label, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(num, 1800, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="nh-stat-item nh-aos" ref={ref} style={{ transitionDelay: `${delay}s` }}>
      <div className="nh-stat-num">
        {prefix}{count}{suffix}<span>+</span>
      </div>
      <div className="nh-stat-label">{label}</div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
const NotreHistoire = () => {
  injectStyles();
  const [logoError, setLogoError] = useState(false);

  /* AOS Observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("nh-visible"); }),
      { threshold: 0.1 }
    );
    const targets = document.querySelectorAll(".nh-aos,.nh-aos-l,.nh-aos-r,.nh-aos-s");
    targets.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  const VALUES = [
    { icon:"🌹", bg:"#FFF0EE", iconBg:"#FFE4E0", title:"Ingrédients nobles", text:"Nous sourcions les matières premières les plus précieuses : oud de Camboge, rose de Taif, ambre gris et iris de Florence.", num:"01" },
    { icon:"✋", bg:"#FFF9EE", iconBg:"#FFF0C8", title:"Création artisanale", text:"Chaque fragrance est assemblée à la main par nos maîtres parfumeurs, avec une attention absolue aux moindres détails.", num:"02" },
    { icon:"🌿", bg:"#F0FDF4", iconBg:"#D1FAE5", title:"Éco-responsable", text:"Nos emballages sont recyclables à 100% et nous veillons à réduire notre empreinte carbone à chaque étape de production.", num:"03" },
    { icon:"🔬", bg:"#F0F4FF", iconBg:"#DBEAFE", title:"Formules exclusives", text:"Développées dans notre laboratoire privé, nos formules sont uniques, protégées et ne contiennent aucun allergène commun.", num:"04" },
    { icon:"🏆", bg:"#F5F0FF", iconBg:"#EDE9FE", title:"Qualité premium", text:"Chaque flacon passe par 18 contrôles qualité stricts avant d'arriver entre vos mains. Zéro compromis.", num:"05" },
    { icon:"❤️", bg:"#FFF0F4", iconBg:"#FFE4EE", title:"Passion pure", text:"Nahid n'est pas une marque, c'est un amour profond pour l'art des fragrances, transmis depuis les marchés de Casablanca.", num:"06" },
  ];

  const INGREDIENTS = [
    { icon:"🪵", name:"Oud de Camboge", origin:"Cambodge" },
    { icon:"🌹", name:"Rose de Taif", origin:"Arabie Saoudite" },
    { icon:"🌊", name:"Ambre Gris", origin:"Océan Indien" },
    { icon:"🌸", name:"Iris de Florence", origin:"Italie" },
    { icon:"🌲", name:"Cèdre de l'Atlas", origin:"Maroc" },
    { icon:"🍋", name:"Bergamote", origin:"Calabre, Italie" },
  ];

  const CITIES = ["Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Tétouan","Meknès","Oujda","El Jadida","Settat","Khouribga","Béni Mellal","Kénitra","Laâyoune","Dakhla","Safi","Mohammedia","Nador"];

  const INSPIRATION = [
    { bg:"#0E0E0C", color:"white", tag:"Monde arabe", tagColor:"#C9A96E", num:"01", title:"Héritage Oriental", body:"Inspirés par les grands maîtres du Golfe — Amouage, Bvlgari, Al Haramain — nous avons traduit cette richesse olfactive en fragrances accessibles au Maroc.", deco:"🕌" },
    { bg:"#FFF3F1", color:"#0E0E0C", tag:"Haute parfumerie", tagColor:"#EF776A", num:"02", title:"Tradition Française", body:"L'élégance de Chanel, Dior, Guerlain nous inspire. Leur approche du luxe discret et de la sophistication guide notre philosophie de création.", deco:"🗼" },
    { bg:"#FAF8F5", color:"#0E0E0C", tag:"Art & nature", tagColor:"#7A7770", num:"03", title:"Maroc Authentique", body:"Les souks de Marrakech, les roses du Kelâa M'Gouna, les cèdres du Moyen Atlas — notre terre est notre plus grande source d'inspiration.", deco:"🇲🇦" },
  ];

  return (
    <div className="nh-page">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="nh-hero">
        <div className="nh-orb nh-orb-1" />
        <div className="nh-orb nh-orb-2" />
        <div className="nh-orb nh-orb-3" />
        <div className="nh-ring nh-ring-1" />
        <div className="nh-ring nh-ring-2" />
        <div className="nh-ring nh-ring-3" />
        <div className="nh-grain" />

        {/* Logo */}
        <div className="nh-hero-logo">
          {!logoError ? (
            <img src="/nahid1.png" alt="Nahid Perfume" onError={() => setLogoError(true)} />
          ) : (
            <div className="nh-hero-logo-fallback">N</div>
          )}
        </div>

        <div className="nh-hero-eyebrow">Fondée en 2020 — Casablanca, Maroc</div>

        <h1 className="nh-hero-title">
          Notre
          <em>Histoire</em>
        </h1>

        <p className="nh-hero-sub">
          De la passion d'un homme, Yassine, est née une maison de parfums d'exception — inspirée des plus grands noms mondiaux, enracinée dans l'âme du Maroc.
        </p>

        <div className="nh-hero-badges">
          <span className="nh-hero-badge">
            <span className="nh-hero-badge-dot" />
            100% Maroc 🇲🇦
          </span>
          <span className="nh-hero-badge">
            <span className="nh-hero-badge-dot gold" />
            Livraison nationale
          </span>
          <span className="nh-hero-badge">
            <span className="nh-hero-badge-dot" />
            4.9★ · 2 400 clients
          </span>
        </div>

        <div className="nh-hero-scroll">
          <div className="nh-scroll-line" />
          <span className="nh-scroll-txt">Découvrir</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <div className="nh-marquee" aria-hidden="true">
        <div className="nh-marquee-track">
          {[
            "✦ Livraison partout au Maroc 🇲🇦",
            "✦ Inspiré des meilleurs parfums mondiaux",
            "✦ Fondé par Yassine en 2020",
            "✦ Ingrédients 100% naturels",
            "✦ Fragrances uniques & exclusives",
            "✦ Livraison partout au Maroc 🇲🇦",
            "✦ Inspiré des meilleurs parfums mondiaux",
            "✦ Fondé par Yassine en 2020",
            "✦ Ingrédients 100% naturels",
            "✦ Fragrances uniques & exclusives",
          ].map((t, i) => (
            <span key={i} className="nh-marquee-item">{t}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="nh-stats">
        <div className="nh-container">
          <div className="nh-stats-grid">
            <AnimatedStat num={4}   suffix="ans" label="D'excellence parfumée" delay={0} />
            <AnimatedStat num={78}  suffix="" label="Fragrances créées" delay={0.08} />
            <AnimatedStat num={2400} suffix="" label="Clients satisfaits" delay={0.16} />
            <AnimatedStat num={19}  suffix="" label="Villes desservies" delay={0.24} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOUNDER SECTION
      ══════════════════════════════════════ */}
      <section className="nh-section nh-section-alt">
        <div className="nh-container">
          <div className="nh-founder">

            {/* Image side */}
            <div className="nh-founder-img-wrap nh-aos-l">
              <div className="nh-founder-img-frame" />
              <img
                className="nh-founder-img"
                src="https://i.postimg.cc/DfpGr62w/540935792-122260831478147069-8458687735403437790-n.jpg"
                alt="Yassine — Fondateur Nahid Perfume"
              />
              <div className="nh-founder-badge">
                <span className="nh-founder-badge-icon">🏆</span>
                <div>
                  <div className="nh-founder-badge-num">2020</div>
                  <div className="nh-founder-badge-txt">Fondation</div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="nh-aos-r">
              <div className="nh-section-eyebrow">Le fondateur</div>
              <h2 className="nh-section-title">
                Yassine,<br/><em>l'artisan</em><br/>des sens
              </h2>

              <div className="nh-founder-signature">Yassine</div>
              <div className="nh-founder-role">Fondateur & Maître Parfumeur · Nahid Perfume</div>

              <p className="nh-section-body">
                Passionné par l'univers olfactif depuis son enfance dans les ruelles parfumées de Casablanca, Yassine a fondé Nahid Perfume en 2020 avec une vision claire : rendre accessible la haute parfumerie mondiale aux Marocains, sans compromis sur la qualité.
              </p>

              <div className="nh-founder-quote">
                <p>
                  « Je voulais créer des parfums qui racontent l'histoire de notre Maroc — sa chaleur, sa générosité, sa beauté — tout en s'inspirant des plus grands noms mondiaux. Nahid, c'est cette rencontre entre Orient et modernité. »
                </p>
              </div>

              <p className="nh-section-body">
                Formé aux techniques des maîtres parfumeurs de Grasse et du Golfe, Yassine sélectionne personnellement chaque matière première et supervise la création de chaque fragrance. Une exigence absolue, un amour inconditionnel pour l'art des odeurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORY TIMELINE + VALUES
      ══════════════════════════════════════ */}
      <section className="nh-section">
        <div className="nh-container">

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,6vw,100px)",alignItems:"start"}}>

            {/* Timeline */}
            <div className="nh-aos-l">
              <div className="nh-section-eyebrow">Notre parcours</div>
              <h2 className="nh-section-title" style={{marginBottom:"40px"}}>
                De la vision<br/><em>à la réalité</em>
              </h2>
              <div className="nh-timeline">
                {[
                  { year:"2020", title:"La naissance de Nahid", body:"Yassine lance Nahid Perfume depuis Casablanca avec 5 fragrances signatures, une passion et un rêve : démocratiser la haute parfumerie au Maroc." },
                  { year:"2021", title:"Les premières collections", body:"Lancement des collections Femme, Homme et Unisex. Plus de 200 clients les deux premiers mois. Le bouche-à-oreille fait le reste." },
                  { year:"2022", title:"Expansion nationale", body:"Livraison étendue à 15 villes marocaines. Partenariats avec des fournisseurs exclusifs d'oud au Cambodge et de roses en Arabie Saoudite." },
                  { year:"2023", title:"78 fragrances au catalogue", body:"Nahid devient l'une des marques de parfumerie artisanale les plus reconnues au Maroc avec plus de 1 500 clients fidèles." },
                  { year:"2024", title:"2 400 clients & croissance", body:"Note moyenne de 4.9/5. Extension à toutes les villes du Royaume et lancement de la collection Oud Royale, sold-out en 48h." },
                  { year:"2025+", title:"L'avenir de Nahid", body:"Ouverture de notre premier atelier-boutique à Casablanca, et lancement d'une collection capsule en collaboration avec des artisans marocains.", dot:"gold" },
                ].map((item, i) => (
                  <div className="nh-timeline-item" key={i}>
                    <div className="nh-timeline-dot" style={item.dot === "gold" ? {background:"var(--gold)",boxShadow:"0 0 0 3px rgba(201,169,110,0.25)"} : {}} />
                    <div className="nh-timeline-year">{item.year}</div>
                    <div className="nh-timeline-title">{item.title}</div>
                    <div className="nh-timeline-body">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="nh-aos-r">
              <div className="nh-section-eyebrow">Nos valeurs</div>
              <h2 className="nh-section-title" style={{marginBottom:"0"}}>
                Ce qui nous<br/><em>définit</em>
              </h2>
              <div className="nh-values-grid" style={{gridTemplateColumns:"1fr 1fr",marginTop:"32px"}}>
                {VALUES.map((v, i) => (
                  <div className={`nh-value-card nh-aos nh-d${Math.min(i+1,6)}`} key={i} style={{background:v.bg}}>
                    <div className="nh-value-num">{v.num}</div>
                    <div className="nh-value-icon-wrap" style={{background:v.iconBg}}>{v.icon}</div>
                    <div className="nh-value-title">{v.title}</div>
                    <div className="nh-value-text">{v.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INGREDIENTS (dark section)
      ══════════════════════════════════════ */}
      <section className="nh-ingredients">
        <div className="nh-container">
          <div className="nh-ing-grid">

            <div className="nh-aos-l">
              <div className="nh-section-eyebrow" style={{color:"var(--gold)"}}>
                <span style={{width:"28px",height:"1px",background:"var(--gold)",display:"block"}} />
                Matières premières
              </div>
              <h2 className="nh-ing-title">
                Les trésors<br/>les plus précieux<br/><em>du monde</em>
              </h2>
              <p className="nh-ing-body">
                Nous ne faisons aucun compromis sur la qualité de nos ingrédients. Chaque matière première est sourcée directement auprès des meilleurs producteurs, soigneusement sélectionnée par Yassine lors de ses voyages à travers le monde.
              </p>
              <div className="nh-ing-tags">
                {["Naturel","Éthique","Traçable","Premium","Sans allergènes","Éco-sourcé"].map(t => (
                  <span key={t} className="nh-ing-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="nh-ing-cards nh-aos-r">
              {INGREDIENTS.map((ing, i) => (
                <div className={`nh-ing-card nh-aos nh-d${Math.min(i+1,6)}`} key={i}>
                  <div className="nh-ing-card-icon">{ing.icon}</div>
                  <div className="nh-ing-card-name">{ing.name}</div>
                  <div className="nh-ing-card-origin">📍 {ing.origin}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INSPIRATION SECTION
      ══════════════════════════════════════ */}
      <section className="nh-inspiration">
        <div className="nh-container">
          <div style={{textAlign:"center"}}>
            <div className="nh-section-eyebrow" style={{justifyContent:"center"}}>
              <span style={{width:"24px",height:"1px",background:"var(--coral)",display:"block"}} />
              Sources d'inspiration
              <span style={{width:"24px",height:"1px",background:"var(--coral)",display:"block"}} />
            </div>
            <h2 className="nh-section-title nh-aos" style={{marginBottom:"8px"}}>
              Inspiré par <em>l'excellence</em>
            </h2>
            <p className="nh-aos" style={{fontSize:"0.9rem",color:"var(--muted)",maxWidth:"520px",margin:"0 auto",lineHeight:"1.8"}}>
              أشهر العطور العالمية — Nous puisons notre inspiration dans les plus grandes maisons de parfumerie mondiales pour créer des fragrances d'exception accessibles au Maroc.
            </p>
          </div>

          {/* World house logos strip */}
          <div className="nh-aos" style={{
            display:"flex",gap:"0",flexWrap:"wrap",justifyContent:"center",
            margin:"48px 0 0",
            border:"1px solid var(--border)",borderRadius:"20px",overflow:"hidden",
            background:"white"
          }}>
            {["Chanel","Dior","Tom Ford","Creed","Amouage","Bvlgari","YSL","Guerlain"].map((brand, i, arr) => (
              <div key={brand} style={{
                flex:"1",minWidth:"120px",padding:"20px 16px",
                textAlign:"center",
                borderRight: i < arr.length-1 ? "1px solid var(--border)" : "none",
                fontFamily:"var(--serif)",
                fontSize:"1.1rem",color:"rgba(14,14,12,0.25)",letterSpacing:"0.04em",
                transition:"color 0.2s",cursor:"default",
              }}
              onMouseEnter={e => e.currentTarget.style.color="var(--ink)"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(14,14,12,0.25)"}
              >{brand}</div>
            ))}
          </div>

          <div className="nh-insp-grid">
            {INSPIRATION.map((card, i) => (
              <div
                className={`nh-insp-card nh-aos nh-d${i+1}`}
                key={i}
                style={{background:card.bg,color:card.color}}
              >
                <div className="nh-insp-card-deco">{card.deco}</div>
                <div className="nh-insp-card-tag" style={{color:card.tagColor}}>
                  <span style={{width:"16px",height:"1px",background:card.tagColor,display:"inline-block"}} />
                  {card.tag}
                </div>
                <div className="nh-insp-card-num" style={{color:card.tagColor}}>{card.num}</div>
                <div className="nh-insp-card-title">{card.title}</div>
                <div className="nh-insp-card-body">{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DELIVERY
      ══════════════════════════════════════ */}
      <section className="nh-delivery">
        <div className="nh-container">
          <div className="nh-delivery-grid">

            <div className="nh-aos-l">
              <div className="nh-section-eyebrow">Livraison nationale</div>
              <h2 className="nh-section-title">
                Partout<br/>au <em>Maroc 🇲🇦</em>
              </h2>
              <p className="nh-section-body" style={{marginBottom:"28px"}}>
                توصيل لجميع مدن المغرب — Nous livrons dans les 19 principales villes du Royaume, avec un délai de 24 à 48h et un suivi en temps réel.
              </p>
              <div className="nh-cities">
                {CITIES.map(city => (
                  <span key={city} className="nh-city-chip">
                    📍 {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="nh-aos-r">
              <div className="nh-delivery-card">
                {[
                  { icon:"🚚", title:"Livraison 24–48h", body:"Partout au Maroc. Suivi en temps réel par SMS et email dès l'expédition de votre colis." },
                  { icon:"📦", title:"Emballage luxe", body:"Chaque commande est emballée dans notre coffret signature, avec papier de soie et carte personnalisée." },
                  { icon:"🎁", title:"Échantillon offert", body:"Un échantillon exclusif est glissé dans chaque commande pour vous faire découvrir une nouvelle fragrance." },
                  { icon:"↩️", title:"Retours gratuits 30j", body:"Pas satisfait ? Nous prenons en charge le retour sans frais et vous remboursons intégralement." },
                  { icon:"💳", title:"Paiement à la livraison", body:"Payez en cash à la réception. Aucune carte bancaire requise. 100% sécurisé et transparent." },
                ].map((item, i) => (
                  <div className={`nh-delivery-item nh-aos nh-d${Math.min(i+1,6)}`} key={i}>
                    <div className="nh-delivery-icon">{item.icon}</div>
                    <div>
                      <div className="nh-delivery-item-title">{item.title}</div>
                      <div className="nh-delivery-item-body">{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="nh-cta">
        <div className="nh-cta-orb-1" />
        <div className="nh-cta-orb-2" />
        <div className="nh-container" style={{textAlign:"center"}}>
          <div className="nh-section-eyebrow nh-aos" style={{justifyContent:"center",color:"var(--gold)"}}>
            <span style={{width:"24px",height:"1px",background:"var(--gold)",display:"block"}} />
            Votre signature olfactive
            <span style={{width:"24px",height:"1px",background:"var(--gold)",display:"block"}} />
          </div>
          <h2 className="nh-cta-title nh-aos">
            Prêt à trouver<br/>votre <em>parfum idéal ?</em>
          </h2>
          <p className="nh-cta-sub nh-aos">
            Rejoignez 2 400 clients qui ont déjà trouvé leur signature olfactive avec Nahid Perfume. Livraison offerte dès 500 MAD partout au Maroc.
          </p>
          <div className="nh-cta-btns nh-aos">
            <a href="/" className="nh-btn-coral">
              Explorer nos parfums →
            </a>
            <a href="/collections/femme" className="nh-btn-ghost">
              Voir les collections
            </a>
          </div>

          {/* Trust mini row */}
          <div className="nh-aos" style={{
            display:"flex",gap:"24px",justifyContent:"center",flexWrap:"wrap",
            marginTop:"52px",paddingTop:"40px",
            borderTop:"1px solid rgba(255,255,255,0.07)"
          }}>
            {[
              { icon:"⭐", text:"4.9/5 satisfaction" },
              { icon:"🇲🇦", text:"19 villes marocaines" },
              { icon:"🌿", text:"100% naturels" },
              { icon:"🔒", text:"Paiement sécurisé" },
              { icon:"↩️", text:"30j satisfait ou remboursé" },
            ].map(({icon, text}) => (
              <div key={text} style={{
                display:"flex",alignItems:"center",gap:"8px",
                fontSize:"0.72rem",fontWeight:"600",
                color:"rgba(255,255,255,0.4)",letterSpacing:"0.04em"
              }}>
                <span>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default NotreHistoire;