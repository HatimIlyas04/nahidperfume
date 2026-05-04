/* ─── Shared Collection Page CSS ─────────────────────────
   Inject once via: useCollectionStyles()
   ──────────────────────────────────────────────────────── */

export const COLLECTION_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --ink:          #0E0E0C;
    --cream:        #FAF8F5;
    --sand:         #EDE9E1;
    --white:        #FFFFFF;
    --coral:        #EF776A;
    --coral-dark:   #D35F52;
    --gold:         #C9A96E;
    --gold-light:   #F0E2C4;
    --muted:        #7A7770;
    --border:       rgba(14,14,12,0.09);
    --sans:         'Poppins', sans-serif;
    --serif:        'Cormorant Garamond', Georgia, serif;
    --ease:         cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Global resets for collection pages ── */
  .coll-page * { box-sizing: border-box; }
  .coll-page { font-family: var(--sans); }

  /* ── Animations ── */
  @keyframes collFadeUp  { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
  @keyframes collSlideL  { from{opacity:0;transform:translateX(-32px);} to{opacity:1;transform:translateX(0);} }
  @keyframes collSlideR  { from{opacity:0;transform:translateX(32px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes collScale   { from{opacity:0;transform:scale(0.94);}       to{opacity:1;transform:scale(1);} }
  @keyframes collSpin    { to{transform:rotate(360deg);} }
  @keyframes collShimmer { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
  @keyframes collLine    { from{transform:scaleX(0);} to{transform:scaleX(1);} }
  @keyframes collFloat   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
  @keyframes collGrain   { 0%,100%{transform:translate(0,0);}
    10%{transform:translate(-2%,-3%);} 30%{transform:translate(3%,-1%);}
    50%{transform:translate(-1%,3%);} 70%{transform:translate(2%,1%);} }
  @keyframes collItemIn  { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
  @keyframes collPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);} 60%{box-shadow:0 0 0 8px rgba(239,119,106,0.12);} }

  /* ── Scroll animation utility ── */
  .coll-aos { opacity:0; transform:translateY(24px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
  .coll-aos.coll-visible { opacity:1; transform:translateY(0); }
  .coll-aos.d1 { transition-delay:0.08s; }
  .coll-aos.d2 { transition-delay:0.16s; }
  .coll-aos.d3 { transition-delay:0.24s; }
  .coll-aos.d4 { transition-delay:0.32s; }

  /* ─────────────────────────────────────────
     PAGE
  ───────────────────────────────────────── */
  .coll-page {
    background: var(--cream);
    min-height: 100vh;
    padding-top: 80px;
    position: relative;
    overflow-x: hidden;
  }

  /* ─────────────────────────────────────────
     HERO
  ───────────────────────────────────────── */
  .coll-hero {
    position: relative;
    min-height: clamp(480px, 60vh, 680px);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    margin-bottom: 0;
  }

  /* Background image fills hero */
  .coll-hero-bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 8s ease;
    transform-origin: center;
  }
  .coll-hero:hover .coll-hero-bg { transform: scale(1.04); }

  .coll-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(10,10,8,0.88) 0%,
      rgba(10,10,8,0.45) 45%,
      rgba(10,10,8,0.12) 100%
    );
  }

  /* Grain texture overlay */
  .coll-hero-grain {
    position: absolute; inset: -50%;
    width: 200%; height: 200%;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    animation: collGrain 8s steps(1) infinite;
    pointer-events: none;
  }

  .coll-hero-content {
    position: relative; z-index: 3;
    padding: 0 clamp(20px,6vw,96px) clamp(48px,7vh,96px);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-end;
    gap: 40px;
  }

  .coll-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 18px;
    animation: collFadeUp 0.7s var(--ease) 0.1s both;
  }
  .coll-hero-eyebrow::before {
    content:'';
    display:block;
    width:28px; height:1px;
    background: var(--gold);
  }

  .coll-hero-title {
    font-family: var(--sans);
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.03em;
    line-height: 0.95;
    margin-bottom: 0;
    animation: collSlideL 0.8s var(--ease) 0.2s both;
  }
  .coll-hero-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    font-size: 1.08em;
  }

  .coll-hero-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    animation: collSlideR 0.8s var(--ease) 0.3s both;
  }
  .coll-hero-desc {
    font-size: clamp(0.82rem, 1.1vw, 0.95rem);
    font-weight: 400;
    line-height: 1.85;
    color: rgba(255,255,255,0.65);
    max-width: 340px;
  }
  .coll-hero-stats {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
  }
  .coll-hero-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .coll-hero-stat strong {
    font-family: var(--sans);
    font-size: 1.5rem;
    font-weight: 900;
    color: white;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .coll-hero-stat span {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  /* Scroll hint */
  .coll-hero-scroll {
    position: absolute;
    bottom: 32px; right: clamp(20px,4vw,60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 4;
    animation: collFadeUp 0.8s var(--ease) 0.6s both;
  }
  .coll-hero-scroll-line {
    width:1px; height:48px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
    animation: collShimmer 2s ease-in-out infinite;
  }
  .coll-hero-scroll-label {
    font-size:0.55rem; font-weight:700; letter-spacing:0.22em;
    text-transform:uppercase; color:rgba(255,255,255,0.4);
    writing-mode:vertical-rl;
  }

  /* Category badge pill */
  .coll-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 999px;
    padding: 9px 20px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    animation: collFadeUp 0.7s var(--ease) 0.45s both;
    width: fit-content;
  }
  .coll-hero-badge .badge-dot {
    width:6px; height:6px; border-radius:50%; flex-shrink:0;
  }

  /* ─────────────────────────────────────────
     FILTER BAR
  ───────────────────────────────────────── */
  .coll-filter-section {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(16px);
    background: rgba(255,255,255,0.92);
  }
  .coll-filter-inner {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 clamp(16px,5vw,80px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    min-height: 64px;
  }

  .coll-filter-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .coll-filter-label {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-right: 4px;
    white-space: nowrap;
  }

  /* Filter chips */
  .coll-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 999px;
    border: 1.5px solid var(--border);
    background: var(--cream);
    font-family: var(--sans);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s var(--ease-spring);
    white-space: nowrap;
  }
  .coll-chip:hover {
    border-color: var(--coral);
    color: var(--coral);
    transform: translateY(-1px);
  }
  .coll-chip.active {
    background: var(--coral);
    border-color: var(--coral);
    color: white;
    box-shadow: 0 4px 14px rgba(239,119,106,0.3);
    transform: translateY(-1px);
  }

  .coll-filter-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .coll-count-badge {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .coll-count-badge strong { color: var(--ink); }

  /* Sort select */
  .coll-sort {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    background: var(--cream);
    font-family: var(--sans);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A7770' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
    transition: border-color 0.2s;
  }
  .coll-sort:focus { border-color: var(--coral); }

  /* View toggle */
  .coll-view-btns {
    display: flex;
    gap: 4px;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 3px;
  }
  .coll-view-btn {
    width: 32px; height: 32px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-size: 0.85rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
    font-family: var(--sans);
  }
  .coll-view-btn.active {
    background: var(--white);
    color: var(--ink);
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }

  /* ─────────────────────────────────────────
     PRODUCTS SECTION
  ───────────────────────────────────────── */
  .coll-products-section {
    max-width: 1320px;
    margin: 0 auto;
    padding: clamp(40px,5vw,72px) clamp(16px,5vw,80px) clamp(60px,8vw,120px);
  }

  /* Grid view */
  .coll-grid {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .coll-grid.cols-2 { grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); }
  .coll-grid.cols-4 { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }

  /* Product card wrapper for animation */
  .coll-card-wrap {
    animation: collItemIn 0.5s var(--ease) both;
  }

  /* ── Loading skeletons ── */
  .coll-skeleton {
    border-radius: 20px;
    height: 380px;
    background: linear-gradient(90deg, #eeece8 25%, #f5f3f0 50%, #eeece8 75%);
    background-size: 200% 100%;
    animation: collSpin 0s, collShimmer 1.5s ease-in-out infinite;
  }
  @keyframes collSkeletonMove {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .coll-skeleton { animation: collSkeletonMove 1.5s ease-in-out infinite; }

  /* ── Empty state ── */
  .coll-empty {
    text-align: center;
    padding: 80px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .coll-empty-icon { font-size:3.5rem; opacity:0.2; animation: collFloat 3s ease-in-out infinite; }
  .coll-empty-title {
    font-family: var(--sans);
    font-size: 1.2rem; font-weight: 800;
    color: var(--ink); letter-spacing:-0.02em;
  }
  .coll-empty-text { font-size:0.85rem; color:var(--muted); line-height:1.7; max-width:280px; }

  /* ── Section header (between filter and grid) ── */
  .coll-section-intro {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }
  .coll-section-title {
    font-family: var(--sans);
    font-size: clamp(1.4rem,3vw,2rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing:-0.03em;
    line-height:1.1;
  }
  .coll-section-title em {
    font-style:italic; font-weight:300; font-family:var(--serif);
    color:var(--coral); font-size:1.08em;
  }
  .coll-active-filter-tag {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(239,119,106,0.1); border:1px solid rgba(239,119,106,0.25);
    border-radius:999px; padding:5px 12px;
    font-size:0.65rem; font-weight:700; color:var(--coral);
    letter-spacing:0.08em; text-transform:uppercase;
  }

  /* ─────────────────────────────────────────
     RESPONSIVE
  ───────────────────────────────────────── */
  @media (max-width: 1024px) {
    .coll-hero-content { grid-template-columns:1fr; }
    .coll-hero-right { display:none; }
    .coll-hero-title { font-size: clamp(2.6rem,9vw,4.5rem); }
  }
  @media (max-width: 768px) {
    .coll-hero { min-height: 420px; }
    .coll-hero-content { padding:0 20px clamp(36px,8vh,60px); }
    .coll-hero-title { font-size: clamp(2.2rem,10vw,3.5rem); }
    .coll-filter-inner { gap:12px; min-height:auto; padding:12px 16px; }
    .coll-filter-label { display:none; }
    .coll-view-btns { display:none; }
    .coll-grid { grid-template-columns: repeat(2, 1fr); gap:14px; }
    .coll-grid.cols-2 { grid-template-columns: 1fr; }
    .coll-grid.cols-4 { grid-template-columns: repeat(2, 1fr); }
    .coll-products-section { padding:28px 16px 60px; }
    .coll-hero-scroll { display:none; }
  }
  @media (max-width: 480px) {
    .coll-grid { grid-template-columns: 1fr 1fr; gap:10px; }
    .coll-section-intro { flex-direction:column; align-items:flex-start; gap:10px; }
  }
  @media (max-width: 360px) {
    .coll-grid { grid-template-columns: 1fr 1fr; gap:8px; }
  }
`;

/* Hook to inject shared CSS once */
export function useCollectionStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-collection-css")) {
    const tag = document.createElement("style");
    tag.id = "nahid-collection-css";
    tag.textContent = COLLECTION_CSS;
    document.head.appendChild(tag);
  }
}

/* Hook for IntersectionObserver scroll animations */
export function useCollectionAOS() {
  const { useEffect } = require("react");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("coll-visible"); }),
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll(".coll-aos");
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}