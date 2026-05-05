import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function injectCSS() {
  if (typeof document === "undefined" || document.getElementById("n-cats")) return;
  const s = document.createElement("style");
  s.id = "n-cats";
  s.textContent = RAW_CSS;
  document.head.appendChild(s);
}

const CARDS = [
  { id:"femme",    to:"/collection/femme",       img:"/femmeNahid.png",   fb:"https://i.postimg.cc/dQTtHTgz/femme-Nahid.png",  tag:"Féminin",   tagV:"glass", count:"32 parfums", label:"Femme",          sub:"Florales & boisées",        cta:"Explorer",  delay:.06  },
  { id:"homme",    to:"/collection/homme",       img:"/hommeNahid.png",   fb:"https://i.postimg.cc/WpJbWJxx/homme-Nahid.jpg",  tag:"Masculin",  tagV:"glass", count:"28 parfums", label:"Homme",          sub:"Viriles & intenses",        cta:"Explorer",  delay:.15  },
  { id:"unisex",   to:"/collection/unisex",      img:"/unisexNahid.png",  fb:"https://i.postimg.cc/MZjKPjgN/unisex-Nahid.png", tag:"Libre",     tagV:"glass", count:"18 parfums", label:"Unisex",         sub:"Sans frontières",           cta:"Explorer",  delay:.24  },
  { id:"originals",to:"/originals",              img:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=88", fb:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=600", tag:"✦ Exclusif", tagV:"gold",  count:null, label:"Nahid Originals", sub:"Créations exclusives", cta:"Découvrir", delay:.33, variant:"orig" },
  { id:"best",     to:"/?category=Best-Sellers", img:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=88", fb:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",  tag:"🔥 Tendance", tagV:"coral",count:null, label:"Best-Sellers",    sub:"Les plus aimés",           cta:"Voir tout", delay:.42, variant:"best" },
];

export default function CategorySection() {
  injectCSS();
  const refs = useRef([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.animationPlayState = "running"; io.unobserve(e.target); }
      }),
      { threshold: 0.07 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="ncs">
      <div className="ncs-orb ncs-orb-a" />
      <div className="ncs-orb ncs-orb-b" />
      <div className="ncs-inner">

        <header className="ncs-hd">
          <div className="ncs-hd-l">
            <p className="ncs-eyebrow">
              <span className="ncs-eline" />Nos Collections<span className="ncs-eline ncs-eline-r" />
            </p>
            <h2 className="ncs-title">Choisissez<br /><em>votre univers</em></h2>
          </div>
          <div className="ncs-hd-r">
            <div className="ncs-stats">
              {[["78","Fragrances"],["4.9★","Note clients"],["100%","Marocain"]].map(([n,l]) => (
                <div key={l} className="ncs-stat">
                  <span className="ncs-stat-n">{n}</span>
                  <span className="ncs-stat-l">{l}</span>
                </div>
              ))}
            </div>
            <Link to="/catalogue" className="ncs-all">
              Voir tout le catalogue
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
            </Link>
          </div>
        </header>

        <div className="ncs-grid">
          {CARDS.map((c,i) => (
            <Link key={c.id} to={c.to}
              ref={el => refs.current[i] = el}
              className={`ncs-card ncs-v-${c.variant ?? "base"}`}
              style={{ animationDelay:`${c.delay}s`, animationPlayState:"paused" }}
              aria-label={`${c.label} — ${c.sub}`}
            >
              {c.variant === "orig" && <><span className="ncs-glyph" aria-hidden>✦</span><div className="ncs-gorb" /></>}
              <img className="ncs-img" src={c.img} alt={c.label} loading="lazy" onError={e => { e.currentTarget.src = c.fb; }}/>
              <div className="ncs-ovl" />
              {c.variant === "best" && <div className="ncs-rank" aria-hidden>#1</div>}
              <div className="ncs-top">
                <span className={`ncs-tag ncs-t-${c.tagV}`}><i className="ncs-tdot" />{c.tag}</span>
                {c.count && <span className="ncs-count">{c.count}</span>}
              </div>
              <div className="ncs-body">
                <div className="ncs-line" />
                <strong className="ncs-label">{c.label}</strong>
                <span className="ncs-sub">{c.sub}</span>
                <div className="ncs-ctar">
                  <span className={`ncs-btn ncs-btn-${c.variant ?? "base"}`}>
                    {c.cta}
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
                  </span>
                  <span className="ncs-more">
                    En savoir plus
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 10h12"/></svg>
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

const RAW_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

.ncs {
  --c:  #EF776A; --cd:#C8503F; --cl:#FFF4F2;
  --g:  #C8A86A; --gd:#A8883E; --gl:#E9D6A9; --gxl:#FAF3E3;
  --bg: #FBF8F2; --bg2:#F2EDE3; --ink:#1C1A16; --ink2:#3D3A33; --mu:#8C8478;
  --bd: rgba(28,26,22,.08);
  --S:  'Cormorant Garamond',Georgia,serif;
  --F:  'DM Sans',sans-serif;
  --sp: cubic-bezier(.34,1.56,.64,1);
  --ex: cubic-bezier(.16,1,.3,1);
  --ea: cubic-bezier(.25,.46,.45,.94);
}

.ncs {
  position:relative; padding:clamp(88px,11vw,148px) 0;
  background:var(--bg); overflow:hidden; font-family:var(--F);
}
.ncs::before {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:0; opacity:.18;
  background:
    repeating-linear-gradient(0deg,transparent,transparent 32px,rgba(200,168,106,.07) 32px,rgba(200,168,106,.07) 33px),
    repeating-linear-gradient(90deg,transparent,transparent 32px,rgba(200,168,106,.05) 32px,rgba(200,168,106,.05) 33px);
}
.ncs-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }
.ncs-orb-a { width:720px; height:720px; top:-280px; right:-220px; background:radial-gradient(circle,rgba(239,119,106,.08),transparent 68%); animation:orbD 24s ease-in-out infinite; }
.ncs-orb-b { width:540px; height:540px; bottom:-220px; left:-160px; background:radial-gradient(circle,rgba(200,168,106,.1),transparent 70%); animation:orbD 19s ease-in-out infinite reverse; }
@keyframes orbD { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-12px) scale(1.04)} }

.ncs-inner { position:relative; z-index:1; max-width:1480px; margin:0 auto; padding:0 clamp(18px,4vw,64px); }

/* ── header ── */
.ncs-hd { display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:24px; margin-bottom:clamp(44px,6vw,76px); }
.ncs-hd-l { flex:1; min-width:0; }
.ncs-eyebrow { display:inline-flex; align-items:center; gap:10px; font-size:.59rem; font-weight:700; letter-spacing:.34em; text-transform:uppercase; color:var(--c); margin:0 0 14px; }
.ncs-eline { display:inline-block; width:26px; height:1px; background:var(--c); opacity:.65; }
.ncs-eline-r { opacity:.28; width:16px; }
.ncs-title { font-family:var(--S); font-size:clamp(2.4rem,5.5vw,4.8rem); font-weight:300; line-height:.91; letter-spacing:-.03em; color:var(--ink); margin:0; }
.ncs-title em { display:block; font-style:italic; font-weight:500; color:var(--c); }
.ncs-hd-r { display:flex; flex-direction:column; align-items:flex-end; gap:18px; }
.ncs-stats { display:flex; gap:32px; }
.ncs-stat { text-align:right; }
.ncs-stat-n { display:block; font-family:var(--S); font-size:clamp(1.6rem,2.8vw,2.2rem); font-weight:300; letter-spacing:-.02em; color:var(--ink); line-height:1; }
.ncs-stat-l { display:block; font-size:.52rem; letter-spacing:.18em; text-transform:uppercase; color:var(--mu); margin-top:3px; }
.ncs-all { display:inline-flex; align-items:center; gap:9px; font-size:.72rem; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:var(--mu); text-decoration:none; padding:12px 26px; border-radius:999px; border:1.5px solid var(--bd); background:#fff; transition:color .2s,border-color .2s,gap .22s,transform .28s var(--sp); }
.ncs-all:hover { color:var(--c); border-color:var(--c); gap:13px; transform:translateY(-2px); }

/* ── grid ── */
.ncs-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:clamp(10px,1.4vw,18px); }

/* ── card ── */
@keyframes cardIn { from{opacity:0;transform:translateY(44px) scale(.97)} to{opacity:1;transform:none} }
.ncs-card {
  position:relative; overflow:hidden; border-radius:24px; display:block; text-decoration:none;
  background:var(--bg2); border:1px solid var(--bd); aspect-ratio:3/4; will-change:transform;
  animation:cardIn .75s var(--ex) both;
  transition:transform .5s var(--sp),box-shadow .5s var(--ea),border-color .3s; cursor:pointer;
}
.ncs-card:hover { transform:translateY(-18px) scale(1.02); box-shadow:0 56px 110px rgba(28,26,22,.18),0 10px 32px rgba(28,26,22,.09); border-color:transparent; }
.ncs-card:active { transform:translateY(-9px) scale(.998); }

/* image */
.ncs-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center top; display:block; filter:brightness(.88) saturate(.92); transition:transform .9s var(--ea),filter .65s; }
.ncs-card:hover .ncs-img { transform:scale(1.11); filter:brightness(1.04) saturate(1.1); }

/* overlay */
.ncs-ovl { position:absolute; inset:0; pointer-events:none; background:linear-gradient(to top,rgba(28,26,22,.92) 0%,rgba(28,26,22,.3) 42%,rgba(28,26,22,.07) 68%,transparent 100%); }

/* top */
.ncs-top { position:absolute; top:15px; left:15px; right:15px; z-index:4; display:flex; align-items:flex-start; justify-content:space-between; }
.ncs-tag { display:inline-flex; align-items:center; gap:6px; padding:6px 15px; border-radius:999px; font-size:.56rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; transition:background .25s,border-color .25s; }
.ncs-tdot { width:5px; height:5px; border-radius:50%; flex-shrink:0; background:currentColor; opacity:.75; display:inline-block; }
.ncs-t-glass { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.28); color:rgba(255,255,255,.92); backdrop-filter:blur(12px); }
.ncs-card:hover .ncs-t-glass { background:rgba(255,255,255,.26); border-color:rgba(255,255,255,.44); }
.ncs-t-gold  { background:rgba(200,168,106,.22); border:1px solid rgba(200,168,106,.52); color:var(--gl); backdrop-filter:blur(12px); animation:tgp 3s ease infinite; }
.ncs-t-coral { background:rgba(239,119,106,.2); border:1px solid rgba(239,119,106,.5); color:rgba(255,218,212,.95); backdrop-filter:blur(12px); animation:tcp 3s ease infinite; }
@keyframes tgp { 0%,100%{box-shadow:0 0 0 0 rgba(200,168,106,0)} 50%{box-shadow:0 0 0 7px rgba(200,168,106,.18)} }
@keyframes tcp { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0)} 50%{box-shadow:0 0 0 7px rgba(239,119,106,.18)} }
.ncs-count { font-size:.58rem; font-weight:700; color:rgba(255,255,255,.6); padding:5px 12px; border-radius:999px; background:rgba(0,0,0,.25); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.1); }

/* body */
.ncs-body { position:absolute; bottom:0; left:0; right:0; z-index:4; padding:clamp(18px,3vw,28px); display:flex; flex-direction:column; gap:5px; }
.ncs-line { width:0; height:1.5px; border-radius:999px; margin-bottom:10px; background:linear-gradient(90deg,var(--c),var(--g)); transition:width .56s var(--ex); }
.ncs-card:hover .ncs-line { width:56px; }
.ncs-label { font-family:var(--S); font-size:clamp(1.7rem,3.5vw,2.6rem); font-weight:400; color:#fff; letter-spacing:-.01em; line-height:1.0; display:block; transition:transform .32s var(--ex); }
.ncs-card:hover .ncs-label { transform:translateY(-3px); }
.ncs-sub { font-size:.7rem; font-weight:500; color:rgba(255,255,255,.48); letter-spacing:.05em; transition:color .25s; }
.ncs-card:hover .ncs-sub { color:rgba(255,255,255,.74); }
.ncs-ctar { display:flex; align-items:center; gap:10px; margin-top:13px; opacity:0; transform:translateY(16px); transition:opacity .32s var(--ex),transform .32s var(--ex); }
.ncs-card:hover .ncs-ctar { opacity:1; transform:none; }
.ncs-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 26px; border-radius:999px; font-family:var(--F); font-size:.68rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; position:relative; overflow:hidden; transition:transform .22s var(--sp),box-shadow .22s; }
.ncs-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.24) 50%,transparent 65%); transform:translateX(-100%) skewX(-15deg); transition:transform .6s var(--ea); }
.ncs-card:hover .ncs-btn::before { transform:translateX(180%) skewX(-15deg); }
.ncs-btn:hover { transform:scale(1.06); }
.ncs-btn-base,.ncs-btn-undefined { background:var(--c); color:#fff; box-shadow:0 6px 24px rgba(239,119,106,.5); }
.ncs-btn-orig { background:linear-gradient(135deg,var(--g),var(--gd)); color:var(--ink2); box-shadow:0 6px 24px rgba(200,168,106,.52); }
.ncs-btn-best { background:var(--c); color:#fff; box-shadow:0 6px 24px rgba(239,119,106,.5); }
.ncs-more { display:flex; align-items:center; gap:6px; font-size:.64rem; font-weight:600; color:rgba(255,255,255,.46); letter-spacing:.07em; white-space:nowrap; transition:color .2s,gap .22s; }
.ncs-card:hover .ncs-more { color:rgba(255,255,255,.82); gap:9px; }

/* ── Originals ── */
.ncs-v-orig { border-color:rgba(200,168,106,.32); }
.ncs-v-orig::before { content:''; position:absolute; top:0; left:0; right:0; height:2.5px; z-index:6; background:linear-gradient(90deg,transparent,var(--g),var(--c),var(--g),transparent); animation:sheen 4.5s linear infinite; }
@keyframes sheen { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
.ncs-v-orig:hover { box-shadow:0 56px 110px rgba(28,22,10,.26),0 10px 32px rgba(200,168,106,.2),0 0 0 1.5px rgba(200,168,106,.38); border-color:rgba(200,168,106,.58); }
.ncs-v-orig .ncs-ovl { background:linear-gradient(to top,rgba(28,18,6,.94) 0%,rgba(28,18,6,.26) 44%,rgba(200,168,106,.08) 70%,transparent 100%); }
.ncs-v-orig .ncs-line { background:linear-gradient(90deg,var(--g),var(--c)); }
.ncs-glyph { position:absolute; top:50%; left:50%; z-index:2; font-family:var(--S); font-size:9rem; font-weight:300; color:rgba(200,168,106,.06); pointer-events:none; user-select:none; line-height:1; transform:translate(-50%,-50%); animation:spin 50s linear infinite; }
@keyframes spin { to{transform:translate(-50%,-50%) rotate(360deg)} }
.ncs-gorb { position:absolute; width:240px; height:240px; top:-80px; right:-80px; border-radius:50%; pointer-events:none; z-index:1; background:radial-gradient(circle,rgba(200,168,106,.28),transparent 70%); animation:orbD 16s ease-in-out infinite; }

/* ── Best-Sellers ── */
.ncs-v-best { border-color:rgba(239,119,106,.24); }
.ncs-v-best::before { content:''; position:absolute; top:0; left:0; right:0; height:2.5px; z-index:6; background:linear-gradient(90deg,transparent,var(--c),var(--g),var(--c),transparent); animation:sheen 3.8s linear infinite; }
.ncs-v-best:hover { box-shadow:0 56px 110px rgba(28,18,14,.22),0 10px 32px rgba(239,119,106,.16),0 0 0 1.5px rgba(239,119,106,.3); border-color:rgba(239,119,106,.56); }
.ncs-v-best .ncs-ovl { background:linear-gradient(to top,rgba(26,12,8,.96) 0%,rgba(180,54,34,.12) 50%,transparent 100%); }
.ncs-rank { position:absolute; z-index:5; bottom:clamp(74px,12vw,94px); right:18px; width:54px; height:54px; border-radius:50%; background:linear-gradient(135deg,var(--c),var(--cd)); color:#fff; display:flex; align-items:center; justify-content:center; font-family:var(--S); font-size:1.3rem; font-weight:600; box-shadow:0 10px 32px rgba(239,119,106,.58); animation:rnkF 3.6s ease-in-out infinite; transition:transform .3s var(--sp); }
.ncs-v-best:hover .ncs-rank { transform:scale(1.16) rotate(12deg); }
@keyframes rnkF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

/* ── Responsive ── */
@media(max-width:1300px){
  .ncs-grid{grid-template-columns:repeat(3,1fr);}
  .ncs-card:nth-child(4){grid-column:1/span 2;aspect-ratio:16/9;}
  .ncs-card:nth-child(4) .ncs-label{font-size:clamp(1.9rem,4vw,3rem);}
}
@media(max-width:860px){
  .ncs-stats{display:none;}
  .ncs-grid{grid-template-columns:1fr 1fr;gap:clamp(9px,2vw,15px);}
  .ncs-card:nth-child(4){grid-column:2;aspect-ratio:3/4;}
  .ncs-card:nth-child(5){grid-column:1/span 2;aspect-ratio:16/10;}
  .ncs-rank{display:none;}
}
@media(max-width:580px){
  .ncs-grid{grid-template-columns:1fr;gap:13px;}
  .ncs-card,.ncs-card:nth-child(4),.ncs-card:nth-child(5){grid-column:1!important;aspect-ratio:4/5;}
  .ncs-hd{flex-direction:column;align-items:flex-start;}
  .ncs-hd-r{align-items:flex-start;}
  .ncs-ctar{display:none;}
  .ncs-label{font-size:clamp(1.7rem,9vw,2.4rem)!important;}
  .ncs-title{font-size:clamp(2rem,9vw,3.2rem);}
}
`;