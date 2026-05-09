import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function injectCSS() {
  if (typeof document === "undefined" || document.getElementById("n-cats-v3")) return;
  const s = document.createElement("style");
  s.id = "n-cats-v3";
  s.textContent = RAW_CSS;
  document.head.appendChild(s);
}

/* ─── Cards data ─────────────────────────────────────────── */
const TOP_CARDS = [
  {
    id: "originals",
    to: "/originals",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=88",
    fb:  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
    title: "Nahid\nOriginals",
    sub: "Créations exclusives de la maison",
    tag: "✦ Exclusif",
    tagV: "gold",
    cta: "Découvrir",
    accent: "#C8A86A",
  },
  {
    id: "best",
    to: "/?category=Best-Sellers",
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=88",
    fb:  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
    title: "Best\nSellers",
    sub: "Les fragrances préférées",
    tag: "🔥 Tendance",
    tagV: "coral",
    cta: "Voir tout",
    accent: "#EF776A",
  },
];

const BOTTOM_CARDS = [
  {
    id: "femme",
    to: "/collection/femme",
    img: "/femmeNahid.png",
    fb:  "https://i.postimg.cc/mgsWFdpC/Whats-App-Image-2026-05-08-at-23-19-51.jpg",
    title: "FEMME",
    count: "32 parfums",
    accent: "#EF776A",
  },
  {
    id: "homme",
    to: "/collection/homme",
    img: "/hommeNahid.png",
    fb:  "https://i.postimg.cc/L8pFZyQj/Whats-App-Image-2026-05-08-at-23-19-50-(2).jpg",
    title: "HOMME",
    count: "28 parfums",
    accent: "#C8A86A",
  },
  {
    id: "unisex",
    to: "/collection/unisex",
    img: "/unisexNahid.png",
    fb:  "https://i.postimg.cc/52VWFPKw/Whats-App-Image-2026-05-08-at-23-19-50-(1).jpg",
    title: "UNISEX",
    count: "18 parfums",
    accent: "#B5C4B1",
  },
];

export default function CategorySection() {
  injectCSS();
  const topRefs = useRef([]);
  const botRefs = useRef([]);

  useEffect(() => {
    const all = [...topRefs.current, ...botRefs.current].filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = "running";
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.06 }
    );
    all.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="nc3">
      <div className="nc3-inner">

        {/* ── Section header ── */}
        <div className="nc3-hd">
          <div className="nc3-hd-left">
            <p className="nc3-eyebrow"><span className="nc3-line"/>Nos Collections</p>
            <h2 className="nc3-title">Choisissez<br/><em>votre univers</em></h2>
          </div>
          <Link to="/catalogue" className="nc3-see-all">
            Voir tout
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 10h12M10 4l6 6-6 6"/>
            </svg>
          </Link>
        </div>

        {/* ══ TOP ROW — 2 large editorial cards ══ */}
        <div className="nc3-top-row">
          {TOP_CARDS.map((c, i) => (
            <Link
              key={c.id}
              to={c.to}
              ref={el => topRefs.current[i] = el}
              className="nc3-top-card"
              style={{
                animationDelay: `${i * 0.12}s`,
                animationPlayState: "paused",
                "--accent": c.accent,
              }}
            >
              <img
                className="nc3-top-img"
                src={c.img}
                alt={c.title}
                loading="lazy"
                onError={e => { e.currentTarget.src = c.fb; }}
              />
              {/* Gradient overlay */}
              <div className="nc3-top-ovl" />

              {/* Badge */}
              <div className={`nc3-badge nc3-badge-${c.tagV}`}>
                {c.tag}
              </div>

              {/* Text block */}
              <div className="nc3-top-body">
                <p className="nc3-top-sub">{c.sub}</p>
                <h3 className="nc3-top-title">
                  {c.title.split("\n").map((line, j) => (
                    <span key={j}>{line}<br/></span>
                  ))}
                </h3>
                <div className="nc3-top-cta">
                  <span className="nc3-cta-btn" style={{ "--accent": c.accent }}>
                    {c.cta}
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M4 10h12M10 4l6 6-6 6"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Hover frame */}
              <div className="nc3-top-frame"/>
            </Link>
          ))}
        </div>

        {/* ══ BOTTOM ROW — 3 bold cards (Dossier style) ══ */}
        <div className="nc3-bot-row">
          {BOTTOM_CARDS.map((c, i) => (
            <Link
              key={c.id}
              to={c.to}
              ref={el => botRefs.current[i] = el}
              className="nc3-bot-card"
              style={{
                animationDelay: `${0.24 + i * 0.1}s`,
                animationPlayState: "paused",
                "--accent": c.accent,
              }}
            >
              <img
                className="nc3-bot-img"
                src={c.img}
                alt={c.title}
                loading="lazy"
                onError={e => { e.currentTarget.src = c.fb; }}
              />

              {/* Colour tint overlay */}
              <div className="nc3-bot-tint"/>

              {/* Big bold title like Dossier */}
              <div className="nc3-bot-body">
                <h3 className="nc3-bot-title">{c.title}</h3>
                <p className="nc3-bot-count">{c.count}</p>
                <div className="nc3-bot-arrow">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M4 10h12M10 4l6 6-6 6"/>
                  </svg>
                </div>
              </div>

              {/* Hover bottom bar */}
              <div className="nc3-bot-bar"/>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════
   CSS — all inline, no external dependencies
═════════════════════════════════════════════════════════ */
const RAW_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* ── tokens ── */
.nc3 {
  --c:   #EF776A;
  --cd:  #C8503F;
  --g:   #C8A86A;
  --gd:  #A8883E;
  --gl:  #E9D6A9;
  --bg:  #FBF8F2;
  --bg2: #F2EDE3;
  --ink: #1C1A16;
  --mu:  #8C8478;
  --bd:  rgba(28,26,22,.1);
  --S:   'Cormorant Garamond', Georgia, serif;
  --F:   'DM Sans', sans-serif;
  --sp:  cubic-bezier(.34,1.56,.64,1);
  --ex:  cubic-bezier(.16,1,.3,1);
  --ea:  cubic-bezier(.25,.46,.45,.94);
}

/* ── section ── */
.nc3 {
  background: var(--bg);
  padding: clamp(72px,9vw,120px) 0;
  font-family: var(--F);
  position: relative;
  overflow: hidden;
}
.nc3::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  opacity: .14;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 32px, rgba(200,168,106,.07) 32px, rgba(200,168,106,.07) 33px),
    repeating-linear-gradient(90deg, transparent, transparent 32px, rgba(200,168,106,.05) 32px, rgba(200,168,106,.05) 33px);
}

.nc3-inner {
  position: relative; z-index: 1;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 clamp(16px,4vw,64px);
}

/* ── header ── */
.nc3-hd {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: clamp(28px,4vw,52px);
  flex-wrap: wrap;
  gap: 16px;
}
.nc3-hd-left { min-width: 0; }
.nc3-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: .59rem; font-weight: 700; letter-spacing: .34em;
  text-transform: uppercase; color: var(--c);
  margin: 0 0 12px;
}
.nc3-line {
  display: inline-block;
  width: 26px; height: 1px;
  background: var(--c); opacity: .65;
}
.nc3-title {
  font-family: var(--S);
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  font-weight: 300; line-height: .92;
  letter-spacing: -.03em; color: var(--ink); margin: 0;
}
.nc3-title em {
  display: block; font-style: italic;
  font-weight: 500; color: var(--c);
}
.nc3-see-all {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: .72rem; font-weight: 700; letter-spacing: .09em;
  text-transform: uppercase; color: var(--mu);
  text-decoration: none; padding: 11px 24px;
  border-radius: 999px; border: 1.5px solid var(--bd);
  background: #fff; white-space: nowrap; flex-shrink: 0;
  transition: color .2s, border-color .2s, gap .2s, transform .25s var(--sp);
}
.nc3-see-all:hover { color: var(--c); border-color: var(--c); gap: 12px; transform: translateY(-2px); }

/* ══════════════════════════════════════
   TOP ROW — 2 large editorial cards
══════════════════════════════════════ */
.nc3-top-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(12px,1.8vw,20px);
  margin-bottom: clamp(12px,1.8vw,20px);
}

@keyframes nc3In { from{opacity:0;transform:translateY(40px) scale(.97)} to{opacity:1;transform:none} }

.nc3-top-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  display: block;
  text-decoration: none;
  /* aspect ratio: adapté pour 390×244 px minimum */
  aspect-ratio: 390 / 320;
  background: var(--bg2);
  border: 1px solid var(--bd);
  animation: nc3In .72s var(--ex) both;
  will-change: transform;
  transition: transform .5s var(--sp), box-shadow .5s var(--ea), border-color .3s;
  cursor: pointer;
}
.nc3-top-card:hover {
  transform: translateY(-12px) scale(1.015);
  box-shadow: 0 48px 96px rgba(28,26,22,.18), 0 8px 24px rgba(28,26,22,.08);
  border-color: transparent;
}
.nc3-top-card:active { transform: translateY(-6px) scale(.998); }

/* Gold shimmer bar for Originals */
.nc3-top-card:first-child::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2.5px; z-index: 6;
  background: linear-gradient(90deg, transparent, var(--g), var(--c), var(--g), transparent);
  animation: nc3Sheen 4.5s linear infinite;
}
.nc3-top-card:last-child::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2.5px; z-index: 6;
  background: linear-gradient(90deg, transparent, var(--c), var(--g), var(--c), transparent);
  animation: nc3Sheen 3.8s linear infinite;
}
@keyframes nc3Sheen { from{transform:translateX(-100%)} to{transform:translateX(100%)} }

.nc3-top-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center top;
  display: block;
  filter: brightness(.86) saturate(.92);
  transition: transform .9s var(--ea), filter .65s;
}
.nc3-top-card:hover .nc3-top-img {
  transform: scale(1.09);
  filter: brightness(1.02) saturate(1.08);
}

.nc3-top-ovl {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(28,26,22,.94) 0%,
    rgba(28,26,22,.4)  36%,
    rgba(28,26,22,.1)  65%,
    transparent 100%
  );
}

/* Badge */
.nc3-badge {
  position: absolute; top: 16px; left: 16px; z-index: 5;
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 14px; border-radius: 999px;
  font-family: var(--F); font-size: .56rem;
  font-weight: 800; letter-spacing: .14em; text-transform: uppercase;
  backdrop-filter: blur(12px);
}
.nc3-badge-gold {
  background: rgba(200,168,106,.22);
  border: 1px solid rgba(200,168,106,.52);
  color: var(--gl);
  animation: nc3GoldP 3s ease infinite;
}
.nc3-badge-coral {
  background: rgba(239,119,106,.2);
  border: 1px solid rgba(239,119,106,.5);
  color: rgba(255,218,212,.95);
  animation: nc3CoralP 3s ease infinite;
}
@keyframes nc3GoldP  { 0%,100%{box-shadow:0 0 0 0 rgba(200,168,106,0)} 50%{box-shadow:0 0 0 7px rgba(200,168,106,.18)} }
@keyframes nc3CoralP { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0)} 50%{box-shadow:0 0 0 7px rgba(239,119,106,.18)} }

/* Body */
.nc3-top-body {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
  padding: clamp(18px,3vw,30px);
}
.nc3-top-sub {
  font-size: .68rem; font-weight: 500;
  color: rgba(255,255,255,.52); letter-spacing: .08em;
  text-transform: uppercase; margin: 0 0 6px;
  transition: color .25s;
}
.nc3-top-card:hover .nc3-top-sub { color: rgba(255,255,255,.78); }
.nc3-top-title {
  font-family: var(--S);
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  font-weight: 300; color: #fff; letter-spacing: -.02em;
  line-height: 1.0; margin: 0 0 16px;
  transition: transform .3s var(--ex);
}
.nc3-top-card:hover .nc3-top-title { transform: translateY(-3px); }

.nc3-top-cta {
  opacity: 0; transform: translateY(12px);
  transition: opacity .3s var(--ex), transform .3s var(--ex);
}
.nc3-top-card:hover .nc3-top-cta { opacity: 1; transform: none; }

.nc3-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 24px; border-radius: 999px;
  background: var(--accent, var(--c)); color: #fff;
  font-family: var(--F); font-size: .68rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase;
  position: relative; overflow: hidden;
  transition: transform .22s var(--sp), box-shadow .22s;
  box-shadow: 0 6px 22px rgba(0,0,0,.28);
}
.nc3-cta-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,.22) 50%, transparent 65%);
  transform: translateX(-100%) skewX(-15deg);
  transition: transform .6s var(--ea);
}
.nc3-top-card:hover .nc3-cta-btn::before { transform: translateX(180%) skewX(-15deg); }
.nc3-cta-btn:hover { transform: scale(1.04); }

/* Hover frame */
.nc3-top-frame {
  position: absolute; inset: 0; border-radius: 20px;
  border: 2px solid rgba(255,255,255,0);
  transition: border-color .35s;
  pointer-events: none; z-index: 5;
}
.nc3-top-card:hover .nc3-top-frame {
  border-color: rgba(255,255,255,.12);
}

/* ══════════════════════════════════════
   BOTTOM ROW — 3 bold Dossier-style cards
   Aspect ratio: 390 × 244 px (= 195/122 ≈ 1.598)
══════════════════════════════════════ */
.nc3-bot-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(12px,1.8vw,20px);
}

.nc3-bot-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  display: block;
  text-decoration: none;
  /* exact ratio 390:244 */
  aspect-ratio: 390 / 244;
  background: #111;
  animation: nc3In .72s var(--ex) both;
  will-change: transform;
  transition: transform .5s var(--sp), box-shadow .5s var(--ea);
  cursor: pointer;
}
.nc3-bot-card:hover {
  transform: translateY(-10px) scale(1.018);
  box-shadow: 0 40px 80px rgba(28,26,22,.22), 0 6px 20px rgba(28,26,22,.1);
}
.nc3-bot-card:active { transform: translateY(-5px) scale(.998); }

.nc3-bot-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center top;
  display: block;
  filter: brightness(.78) saturate(.9);
  transition: transform .9s var(--ea), filter .65s;
}
.nc3-bot-card:hover .nc3-bot-img {
  transform: scale(1.08);
  filter: brightness(.88) saturate(1.05);
}

/* Colour tint + vignette */
.nc3-bot-tint {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(var(--tint-rgb, 28,26,22),.35) 0%,
    transparent 60%,
    rgba(28,26,22,.5) 100%
  );
  transition: opacity .4s;
}

/* Per-card tint colour from accent */
.nc3-bot-card:nth-child(1) .nc3-bot-tint { background: linear-gradient(135deg,rgba(239,119,106,.32) 0%,transparent 55%,rgba(28,22,16,.5) 100%); }
.nc3-bot-card:nth-child(2) .nc3-bot-tint { background: linear-gradient(135deg,rgba(200,168,106,.28) 0%,transparent 55%,rgba(28,22,16,.5) 100%); }
.nc3-bot-card:nth-child(3) .nc3-bot-tint { background: linear-gradient(135deg,rgba(181,196,177,.28) 0%,transparent 55%,rgba(28,22,16,.5) 100%); }

/* Big Dossier-style bold title */
.nc3-bot-body {
  position: absolute; inset: 0; z-index: 4;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  padding: clamp(14px,2.5vw,24px);
}
.nc3-bot-title {
  font-family: var(--F);
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 700; color: #fff;
  letter-spacing: -.01em; line-height: 1;
  margin: 0 0 4px;
  text-shadow: 0 2px 16px rgba(0,0,0,.4);
  transition: transform .3s var(--ex), letter-spacing .3s;
}
.nc3-bot-card:hover .nc3-bot-title {
  transform: translateY(-3px);
  letter-spacing: .02em;
}
.nc3-bot-count {
  font-size: .72rem; font-weight: 600;
  color: rgba(255,255,255,.6);
  letter-spacing: .1em; text-transform: uppercase;
  margin: 0;
  transition: color .25s;
}
.nc3-bot-card:hover .nc3-bot-count { color: rgba(255,255,255,.88); }

/* Arrow icon */
.nc3-bot-arrow {
  position: absolute; top: 16px; right: 16px; z-index: 5;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.28);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: scale(.7) translateY(-6px);
  transition: opacity .3s var(--ex), transform .32s var(--sp);
}
.nc3-bot-card:hover .nc3-bot-arrow { opacity: 1; transform: scale(1) translateY(0); }

/* Animated bottom colour bar */
.nc3-bot-bar {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px; z-index: 5;
  background: var(--accent, var(--c));
  transform: scaleX(0); transform-origin: left;
  transition: transform .48s var(--ex);
}
.nc3-bot-card:hover .nc3-bot-bar { transform: scaleX(1); }

/* Per-card bar colour */
.nc3-bot-card:nth-child(1) .nc3-bot-bar { background: var(--c); }
.nc3-bot-card:nth-child(2) .nc3-bot-bar { background: var(--g); }
.nc3-bot-card:nth-child(3) .nc3-bot-bar { background: #B5C4B1; }

/* ══════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════ */

/* 1024–1300 */
@media(max-width:1300px){
  .nc3-top-title { font-size: clamp(1.6rem,3.2vw,2.8rem); }
  .nc3-bot-title { font-size: clamp(1.6rem,4vw,3rem); }
}

/* 768–1024 */
@media(max-width:1024px){
  .nc3-top-row { grid-template-columns: 1fr 1fr; }
  .nc3-bot-row { grid-template-columns: repeat(3,1fr); }
  .nc3-top-card { aspect-ratio: 390/300; }
}

/* 640–768 tablet */
@media(max-width:768px){
  .nc3-top-row { grid-template-columns: 1fr; gap: 12px; }
  .nc3-top-card { aspect-ratio: 390/260; }
  .nc3-bot-row { grid-template-columns: repeat(3,1fr); gap: 10px; }
  .nc3-bot-title { font-size: clamp(1.3rem,5vw,2.2rem); }
  .nc3-top-title { font-size: clamp(1.8rem,5vw,2.8rem); }
  .nc3-top-cta { display: none; }
}

/* 480–640 */
@media(max-width:640px){
  .nc3-bot-row { grid-template-columns: repeat(3,1fr); gap: 8px; }
  .nc3-bot-card { aspect-ratio: 390/280; border-radius: 14px; }
  .nc3-bot-title { font-size: clamp(1.1rem,5.5vw,1.8rem); letter-spacing: -.02em; }
  .nc3-bot-count { font-size: .6rem; }
  .nc3-top-card { aspect-ratio: 390/280; border-radius: 14px; }
  .nc3-top-title { font-size: clamp(1.6rem,6vw,2.4rem); }
  .nc3-hd { flex-direction: column; align-items: flex-start; }
}

/* < 400px — very small */
@media(max-width:400px){
  .nc3-bot-row { grid-template-columns: 1fr; gap: 10px; }
  .nc3-bot-card { aspect-ratio: 390/244; }
  .nc3-top-row { gap: 10px; }
  .nc3-bot-title { font-size: clamp(2rem,8vw,2.8rem); }
}
`;