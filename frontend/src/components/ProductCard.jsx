import { useState, useRef } from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

/* ══════════════════════════════════════════════════════
   PRODUCT CARD — Nahid Perfume
   Same palette throughout: cream · coral #EF776A · gold
   Original cards get a premium treatment but same colors.
══════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@200;300;400;500;600;700&display=swap');

:root {
  --c:   #EF776A;
  --cd:  #D35F52;
  --cl:  #FFF4F2;
  --cll: #FFE8E5;
  --w:   #FFFFFF;
  --bg:  #FAF8F5;
  --bg2: #F5EFE4;
  --ink: #1C1A16;
  --ink2:#3D3A33;
  --g:   #8C8478;
  --bd:  rgba(28,26,22,0.09);
  --gold:#C8A96A;
  --goldd:#A8883E;
  --goldl:#E9D6A9;
  --goldxl:#FAF3E3;
  --ff:  'DM Sans', sans-serif;
  --ffs: 'Cormorant Garamond', Georgia, serif;
  --sp:  cubic-bezier(.34,1.56,.64,1);
  --ex:  cubic-bezier(.16,1,.3,1);
  --ea:  cubic-bezier(.25,.46,.45,.94);
}

/* Keyframes */
@keyframes kPop  { 0%{transform:scale(1)} 42%{transform:scale(1.26)} 100%{transform:scale(1)} }
@keyframes kChk  { from{stroke-dashoffset:24} to{stroke-dashoffset:0} }
@keyframes kRip  { from{transform:scale(0);opacity:.5} to{transform:scale(4);opacity:0} }
@keyframes kBdg  { from{opacity:0;transform:translateY(-5px) scale(.85)} to{opacity:1;transform:none} }
@keyframes kGlw  { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0)} 50%{box-shadow:0 0 0 5px rgba(239,119,106,.18)} }
@keyframes kHrt  { 0%{transform:scale(1)} 30%{transform:scale(1.38)} 60%{transform:scale(.92)} 100%{transform:scale(1)} }
@keyframes kOrb  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,-6px)} }
@keyframes kShn  { from{transform:translateX(-100%) skewX(-18deg)} to{transform:translateX(220%) skewX(-18deg)} }

/* ══════════════════════════════════════════
   STANDARD CARD
══════════════════════════════════════════ */
.pc {
  position:relative; border-radius:22px; overflow:hidden;
  background:var(--w); border:1px solid var(--bd);
  font-family:var(--ff); cursor:pointer; will-change:transform;
  transition:transform .44s var(--sp), box-shadow .44s var(--ea), border-color .3s;
  display:flex; flex-direction:column;
}
.pc:hover {
  transform:translateY(-11px) scale(1.013);
  box-shadow:0 28px 68px rgba(28,26,22,.13), 0 4px 18px rgba(28,26,22,.05);
  border-color:transparent;
}
.pc:active { transform:translateY(-5px) scale(.997); }

/* Image */
.pc-img-wrap {
  position:relative; overflow:hidden; aspect-ratio:3/4;
  background:var(--bg); display:block; text-decoration:none; flex-shrink:0;
}
.pc-img {
  width:100%; height:100%; object-fit:cover; object-position:center top;
  display:block; filter:brightness(.97);
  transition:transform .8s var(--ea), filter .5s;
}
.pc:hover .pc-img { transform:scale(1.08); filter:brightness(1.04); }
.pc-ovl {
  position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(to top,rgba(28,26,22,.52) 0%,rgba(28,26,22,.06) 42%,transparent 70%);
  opacity:0; transition:opacity .4s;
}
.pc:hover .pc-ovl { opacity:1; }

/* Badges */
.pc-bgs { position:absolute; top:12px; left:12px; display:flex; flex-direction:column; gap:6px; z-index:3; }
.pc-b {
  display:inline-flex; align-items:center; gap:5px; padding:5px 12px;
  border-radius:999px; font-family:var(--ff); font-size:.56rem; font-weight:800;
  letter-spacing:.1em; text-transform:uppercase; animation:kBdg .4s var(--sp) both; line-height:1;
}
.pb-best { background:linear-gradient(135deg,var(--gold),#A0822A); color:white; box-shadow:0 3px 12px rgba(200,169,106,.45); }
.pb-orig { background:linear-gradient(135deg,var(--c),var(--cd)); color:white; box-shadow:0 3px 12px rgba(239,119,106,.42); }
.pb-new  { background:var(--w); color:var(--c); border:1px solid rgba(239,119,106,.28); }
.pb-low  { background:rgba(255,255,255,.93); color:var(--c); border:1px solid rgba(239,119,106,.2); backdrop-filter:blur(8px); }
.pb-out  { background:rgba(28,26,22,.82); color:white; backdrop-filter:blur(8px); }
.bd-dot  { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
.pb-best .bd-dot { background:rgba(255,255,255,.8); }
.pb-orig .bd-dot { background:rgba(255,255,255,.8); }
.pb-new  .bd-dot { background:var(--c); animation:kGlw 1.8s ease infinite; }
.pb-low  .bd-dot { background:var(--c); animation:kGlw 1.5s ease infinite; }

/* Wishlist */
.pc-wish {
  position:absolute; top:12px; right:12px; z-index:4;
  width:36px; height:36px; border-radius:50%; border:none;
  background:rgba(255,255,255,.9); backdrop-filter:blur(10px);
  color:var(--g); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transform:translateY(-4px) scale(.84);
  transition:opacity .25s, transform .25s var(--sp), color .2s, background .2s;
  box-shadow:0 2px 14px rgba(0,0,0,.1);
}
.pc:hover .pc-wish { opacity:1; transform:none; }
.pc-wish:hover { background:white; color:var(--c); transform:scale(1.12) !important; }
.pc-wish.wsh { color:var(--c); background:var(--cl); }
.pc-wish.wsh svg { animation:kHrt .4s var(--sp) both; }

/* Quick-add */
.pc-qa {
  position:absolute; bottom:0; left:0; right:0; z-index:4;
  padding:14px 13px 13px;
  background:linear-gradient(to top,rgba(28,26,22,.6) 0%,transparent 100%);
  transform:translateY(100%); opacity:0;
  transition:transform .36s var(--sp), opacity .26s;
}
.pc:hover .pc-qa { transform:none; opacity:1; }
.pc-qbtn {
  width:100%; padding:11px 16px; border-radius:999px; border:none;
  background:white; color:var(--ink);
  font-family:var(--ff); font-size:.7rem; font-weight:700;
  letter-spacing:.07em; text-transform:uppercase; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:8px;
  transition:background .2s, transform .14s var(--sp), box-shadow .2s;
  position:relative; overflow:hidden;
}
.pc-qbtn:hover { background:var(--c); color:white; transform:scale(1.02); box-shadow:0 6px 22px rgba(239,119,106,.42); }
.pc-qbtn.qadd { background:#1B5E20 !important; color:white !important; }
.pc-chk { stroke-dasharray:24; stroke-dashoffset:24; }
.pc-qbtn.qadd .pc-chk { animation:kChk .3s var(--ea) both; }
.k-rip { position:absolute; border-radius:50%; background:rgba(255,255,255,.36); width:10px; height:10px; margin:-5px 0 0 -5px; animation:kRip .5s var(--ea) forwards; pointer-events:none; }

/* Body */
.pc-body { padding:clamp(13px,2vw,17px); display:flex; flex-direction:column; flex:1; }

/* Category — styled pill */
.pc-meta { display:flex; align-items:center; justify-content:space-between; margin-bottom:9px; }
.pc-cat-pill {
  display:inline-flex; align-items:center; gap:5px;
  padding:4px 11px; border-radius:999px;
  background:var(--cl); border:1px solid rgba(239,119,106,.2);
  font-size:.54rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:var(--c);
  transition:background .2s, border-color .2s;
}
.pc:hover .pc-cat-pill { background:var(--cll); border-color:rgba(239,119,106,.38); }
.pc-cat-dot { width:4px; height:4px; border-radius:50%; background:var(--c); flex-shrink:0; }
.pc-stars { font-size:.55rem; color:var(--gold); letter-spacing:.5px; }
.pc-stars span { color:var(--g); font-size:.52rem; margin-left:2px; }

.pc-name {
  font-family:var(--ffs); font-size:clamp(1.06rem,1.8vw,1.22rem);
  font-weight:600; color:var(--ink); letter-spacing:-.01em; line-height:1.2;
  margin-bottom:6px; text-decoration:none; display:block; transition:color .22s;
}
.pc:hover .pc-name { color:var(--c); }
.pc-desc {
  font-size:.72rem; color:var(--g); line-height:1.66; flex:1; margin-bottom:13px;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.pc-div { height:1px; background:var(--bd); margin-bottom:12px; position:relative; overflow:hidden; }
.pc-div::after {
  content:''; position:absolute; top:0; left:0; height:100%; width:0%;
  background:linear-gradient(90deg,var(--c),var(--gold)); transition:width .56s var(--ea);
}
.pc:hover .pc-div::after { width:100%; }

.pc-foot { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.pc-pw { display:flex; flex-direction:column; gap:2px; }
.pc-price {
  font-family:var(--ffs); font-size:clamp(1.15rem,2vw,1.32rem);
  font-weight:600; color:var(--ink); letter-spacing:-.01em; line-height:1;
}
.pc-cur { font-family:var(--ff); font-size:.68rem; font-weight:700; color:var(--g); margin-left:3px; }
.pc-ship { font-size:.56rem; font-weight:600; color:var(--g); }
.pc-ship-free { color:#2E7D32; }

.pc-add {
  width:42px; height:42px; border-radius:50%; border:none; flex-shrink:0;
  background:linear-gradient(135deg,var(--c),var(--cd));
  color:white; display:flex; align-items:center; justify-content:center;
  cursor:pointer; transition:transform .22s var(--sp), box-shadow .22s;
  box-shadow:0 4px 16px rgba(239,119,106,.4); position:relative; overflow:hidden;
}
.pc-add:hover { transform:scale(1.18) rotate(90deg); box-shadow:0 8px 28px rgba(239,119,106,.54); }
.pc-add:active { transform:scale(.95) rotate(90deg); }
.pc-add.ok { background:linear-gradient(135deg,#2E7D32,#1B5E20); box-shadow:0 4px 14px rgba(46,125,50,.35); animation:kPop .4s var(--sp) both; }
.pc-add svg { pointer-events:none; }
.pc-oos { font-size:.63rem; font-weight:600; color:var(--g); font-style:italic; }

/* ══════════════════════════════════════════
   ORIGINAL CARD — same palette, premium look
   Warm cream base with gold accents, coral CTA
══════════════════════════════════════════ */
.oc {
  position:relative; border-radius:22px; overflow:hidden;
  background:var(--goldxl);
  border:1px solid var(--goldl);
  font-family:var(--ff); cursor:pointer; will-change:transform;
  transition:transform .44s var(--sp), box-shadow .44s var(--ea), border-color .35s;
  display:flex; flex-direction:column;
}
/* Gold top accent */
.oc::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2.5px; z-index:5;
  background:linear-gradient(90deg, var(--c), var(--gold), var(--c));
  background-size:200% 100%;
  animation:kShn 3s linear infinite;
}
.oc:hover {
  transform:translateY(-14px) scale(1.016);
  box-shadow:
    0 40px 90px rgba(28,26,22,.16),
    0 6px 24px rgba(28,26,22,.08),
    0 0 0 1px rgba(200,169,106,.4);
  border-color:var(--goldl);
}
.oc:active { transform:translateY(-7px) scale(.997); }

/* Image */
.oc-img-wrap {
  position:relative; overflow:hidden; aspect-ratio:3/4;
  background:var(--bg2); display:block; text-decoration:none; flex-shrink:0;
}
.oc-img {
  width:100%; height:100%; object-fit:cover; object-position:center top;
  display:block; filter:brightness(.95) saturate(.95);
  transition:transform .8s var(--ea), filter .6s;
}
.oc:hover .oc-img { transform:scale(1.09); filter:brightness(1.02) saturate(1.05); }

/* Overlay — warm tint */
.oc-ovl {
  position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(
    to top,
    rgba(28,26,22,.6) 0%,
    rgba(200,169,106,.06) 45%,
    transparent 72%
  );
  opacity:.85;
}

/* Decorative gold orbs */
.oc-orb {
  position:absolute; border-radius:50%; pointer-events:none; z-index:1;
}
.oc-orb-1 {
  width:140px; height:140px; top:-40px; right:-40px;
  background:radial-gradient(circle,rgba(200,169,106,.28),transparent 70%);
  animation:kOrb 12s ease-in-out infinite;
}
.oc-orb-2 {
  width:100px; height:100px; bottom:-20px; left:-20px;
  background:radial-gradient(circle,rgba(239,119,106,.18),transparent 70%);
  animation:kOrb 9s ease-in-out infinite reverse;
}

/* Original badge — always visible, top-left */
.oc-orig-bdg {
  position:absolute; top:13px; left:13px; z-index:3;
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 14px; border-radius:999px;
  background:var(--goldxl); border:1px solid var(--goldl);
  font-size:.56rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase;
  color:var(--goldd); backdrop-filter:blur(8px);
  box-shadow:0 3px 14px rgba(200,169,106,.35);
  animation:kBdg .5s var(--sp) both;
}
.oc-orig-dot { width:5px; height:5px; border-radius:50%; background:var(--gold); flex-shrink:0; }

/* Best badge top-right */
.oc-best-bdg {
  position:absolute; top:13px; right:13px; z-index:3;
  display:inline-flex; align-items:center; gap:5px;
  padding:5px 12px; border-radius:999px;
  background:linear-gradient(135deg,var(--c),var(--cd));
  color:white; font-size:.54rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
  box-shadow:0 3px 12px rgba(239,119,106,.45);
  animation:kBdg .5s var(--sp) .08s both;
}

/* Low stock */
.oc-low-bdg {
  position:absolute; top:13px; right:13px; z-index:3;
  padding:5px 12px; border-radius:999px;
  background:rgba(255,255,255,.88); border:1px solid rgba(239,119,106,.3);
  backdrop-filter:blur(8px);
  color:var(--c); font-size:.54rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
}

/* Wishlist */
.oc-wish {
  position:absolute; top:13px; right:13px; z-index:5;
  width:36px; height:36px; border-radius:50%; border:none;
  background:rgba(255,255,255,.88); backdrop-filter:blur(10px);
  color:var(--g); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transform:translateY(-4px) scale(.84);
  transition:opacity .25s, transform .25s var(--sp), color .2s, background .2s;
  box-shadow:0 2px 12px rgba(28,26,22,.12);
}
.oc:hover .oc-wish { opacity:1; transform:none; }
.oc-wish:hover { background:white; color:var(--c); transform:scale(1.12) !important; }
.oc-wish.wsh { color:var(--c); background:var(--cl); }
.oc-wish.wsh svg { animation:kHrt .4s var(--sp) both; }

/* Category in image — golden pill */
.oc-img-foot {
  position:absolute; bottom:0; left:0; right:0; z-index:2;
  padding:11px 13px 12px;
  background:linear-gradient(to top,rgba(28,26,22,.55) 0%,transparent 100%);
}
.oc-img-cat {
  display:inline-flex; align-items:center; gap:5px;
  padding:4px 11px; border-radius:999px;
  background:rgba(200,169,106,.2); border:1px solid rgba(200,169,106,.4);
  backdrop-filter:blur(8px);
  font-size:.54rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase;
  color:var(--goldl);
}
.oc-img-cat-dot { width:4px; height:4px; border-radius:50%; background:var(--goldl); flex-shrink:0; }

/* Quick-add */
.oc-qa {
  position:absolute; bottom:0; left:0; right:0; z-index:4;
  padding:14px 13px 13px;
  background:linear-gradient(to top,rgba(28,26,22,.6) 0%,transparent 100%);
  transform:translateY(100%); opacity:0;
  transition:transform .36s var(--sp), opacity .26s;
}
.oc:hover .oc-qa { transform:none; opacity:1; }
.oc-qbtn {
  width:100%; padding:11px 16px; border-radius:999px; border:none;
  background:var(--c); color:white;
  font-family:var(--ff); font-size:.7rem; font-weight:700;
  letter-spacing:.07em; text-transform:uppercase; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:8px;
  transition:background .2s, transform .14s var(--sp), box-shadow .2s;
  position:relative; overflow:hidden;
  box-shadow:0 5px 20px rgba(239,119,106,.45);
}
.oc-qbtn::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.22) 50%,transparent 65%);
  transform:translateX(-100%) skewX(-15deg);
  transition:transform .5s var(--ea);
}
.oc-qbtn:hover { background:var(--cd); transform:scale(1.02); box-shadow:0 8px 28px rgba(239,119,106,.52); }
.oc-qbtn:hover::after { transform:translateX(160%) skewX(-15deg); }
.oc-qbtn.qadd { background:#1B5E20 !important; box-shadow:0 5px 18px rgba(46,125,50,.42) !important; }
.oc-qbtn.qadd .pc-chk { animation:kChk .3s var(--ea) both; }

/* Body */
.oc-body {
  padding:clamp(14px,2vw,19px);
  background:var(--goldxl);
  display:flex; flex-direction:column; flex:1;
  position:relative; z-index:1;
}

/* Stars — gold */
.oc-stars { font-size:.54rem; color:var(--gold); letter-spacing:.5px; margin-bottom:9px; }
.oc-stars span { color:var(--g); font-size:.52rem; margin-left:2px; }

.oc-name {
  font-family:var(--ffs); font-size:clamp(1.1rem,2vw,1.28rem);
  font-weight:600; color:var(--ink); letter-spacing:-.01em; line-height:1.18;
  margin-bottom:7px; text-decoration:none; display:block;
  transition:color .22s;
}
.oc:hover .oc-name { color:var(--goldd); }
.oc-desc {
  font-size:.72rem; color:var(--g); line-height:1.68; flex:1; margin-bottom:12px;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}

/* Note teaser */
.oc-note {
  display:flex; align-items:flex-start; gap:8px; padding:9px 12px;
  border-radius:12px; margin-bottom:12px;
  background:rgba(200,169,106,.12); border:1px solid rgba(200,169,106,.22);
  transition:background .22s, border-color .22s;
}
.oc:hover .oc-note { background:rgba(200,169,106,.2); border-color:rgba(200,169,106,.38); }
.oc-note-icon { font-size:.88rem; flex-shrink:0; margin-top:1px; }
.oc-note-txt { font-size:.64rem; color:var(--ink2); line-height:1.45; }
.oc-note-txt b { color:var(--goldd); font-weight:700; }

/* Gold divider */
.oc-div { height:1px; background:rgba(200,169,106,.25); margin-bottom:12px; position:relative; overflow:hidden; }
.oc-div::after {
  content:''; position:absolute; top:0; left:0; height:100%; width:0%;
  background:linear-gradient(90deg,var(--c),var(--gold)); transition:width .56s var(--ea);
}
.oc:hover .oc-div::after { width:100%; }

.oc-foot { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.oc-pw { display:flex; flex-direction:column; gap:2px; }
.oc-price {
  font-family:var(--ffs); font-size:clamp(1.18rem,2vw,1.36rem);
  font-weight:600; color:var(--ink); letter-spacing:-.01em; line-height:1;
}
.oc-price-cur { font-family:var(--ff); font-size:.68rem; font-weight:700; color:var(--g); margin-left:3px; }
.oc-ship { font-size:.56rem; font-weight:700; color:#2E7D32; }

.oc-add {
  width:42px; height:42px; border-radius:50%; border:none; flex-shrink:0;
  background:linear-gradient(135deg,var(--c),var(--cd));
  color:white; display:flex; align-items:center; justify-content:center;
  cursor:pointer; transition:transform .22s var(--sp), box-shadow .22s;
  box-shadow:0 4px 18px rgba(239,119,106,.42); position:relative; overflow:hidden;
}
.oc-add:hover { transform:scale(1.18) rotate(90deg); box-shadow:0 8px 28px rgba(239,119,106,.56); }
.oc-add:active { transform:scale(.95) rotate(90deg); }
.oc-add.ok { background:linear-gradient(135deg,#2E7D32,#1B5E20); box-shadow:0 4px 14px rgba(46,125,50,.35); animation:kPop .4s var(--sp) both; }
.oc-add svg { pointer-events:none; }
.oc-oos { font-size:.63rem; font-weight:600; color:var(--g); font-style:italic; }

/* ── Responsive ── */
@media(max-width:480px){
  .pc,.oc { border-radius:18px; }
  .pc-body,.oc-body { padding:11px 12px 14px; }
  .pc-name { font-size:1rem; }
  .oc-name { font-size:1.02rem; }
  .pc-price,.oc-price { font-size:1.08rem; }
  .pc-add,.oc-add { width:36px; height:36px; }
  .pc-desc,.oc-desc { -webkit-line-clamp:1; }
  .oc-note { display:none; }
}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-pc-v8")) {
    const s = document.createElement("style");
    s.id = "nahid-pc-v8"; s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/* ── Parse first main note from scent_notes ── */
function parseMainNote(raw) {
  if (!raw) return null;
  const m = raw.match(/t[êe]te\s*[:：](.*?)(?:\||$)/i);
  if (!m) return null;
  return m[1]
    .replace(/[🌹🌿🌙💧🍊🏜️🪵🍦🍫🤍🔥⭐]/g, "")
    .trim()
    .split(",")
    .slice(0, 2)
    .join(", ");
}

/* ── Ripple helper ── */
function addRipple(e, el) {
  const r = el.getBoundingClientRect();
  const span = document.createElement("span");
  span.className = "k-rip";
  span.style.left = `${e.clientX - r.left}px`;
  span.style.top  = `${e.clientY - r.top}px`;
  el.appendChild(span);
  setTimeout(() => span.remove(), 550);
}

/* ══════════════════════════════════════════
   STANDARD CARD
══════════════════════════════════════════ */
function StandardCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);
  const qRef = useRef(null);

  const price    = parseFloat(product.price) || 0;
  const isOut    = product.stock === 0;
  const isLow    = product.stock > 0 && product.stock < 5;
  const isNew    = !!product.is_new;
  const isBest   = !!product.is_bestseller;
  const freeShip = price >= 300;

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (isOut) return;
    if (qRef.current) addRipple(e, qRef.current);
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="pc">
      <Link to={`/product/${product.id}`} className="pc-img-wrap">
        <img className="pc-img" src={product.image_url} alt={product.name} loading="lazy" />
        <div className="pc-ovl" />

        <div className="pc-bgs">
          {isBest && <span className="pc-b pb-best"><span className="bd-dot"/>🔥 Best-Seller</span>}
          {isNew && !isBest && <span className="pc-b pb-new"><span className="bd-dot"/>Nouveau</span>}
          {isLow && <span className="pc-b pb-low"><span className="bd-dot"/>Dernières pièces</span>}
          {isOut && <span className="pc-b pb-out">Épuisé</span>}
        </div>

        <button className={`pc-wish${wished ? " wsh" : ""}`}
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
          aria-label="Favoris">
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {!isOut && (
          <div className="pc-qa">
            <button ref={qRef} className={`pc-qbtn${added ? " qadd" : ""}`} onClick={handleAdd}>
              {added
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline className="pc-chk" points="20 6 9 17 4 12"/></svg>Ajouté !</>
                : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Ajouter au panier</>
              }
            </button>
          </div>
        )}
      </Link>

      <div className="pc-body">
        <div className="pc-meta">
          {product.category && (
            <span className="pc-cat-pill">
              <span className="pc-cat-dot" />{product.category}
            </span>
          )}
          <div className="pc-stars">★★★★★<span>(4.9)</span></div>
        </div>

        <Link to={`/product/${product.id}`} className="pc-name">{product.name}</Link>
        {product.description && <p className="pc-desc">{product.description}</p>}
        <div className="pc-div" />

        <div className="pc-foot">
          <div className="pc-pw">
            <span className="pc-price">{Math.round(price).toLocaleString("fr-MA")}<span className="pc-cur">MAD</span></span>
            <span className={`pc-ship${freeShip ? " pc-ship-free" : ""}`}>{freeShip ? "✓ Livraison gratuite" : "Livraison dès 300 MAD"}</span>
          </div>
          {!isOut
            ? <button className={`pc-add${added ? " ok" : ""}`} onClick={handleAdd} aria-label="Ajouter">
                {added
                  ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                }
              </button>
            : <span className="pc-oos">Épuisé</span>
          }
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ORIGINAL CARD — warm cream + gold
══════════════════════════════════════════ */
function OriginalCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);
  const qRef = useRef(null);

  const price    = parseFloat(product.price) || 0;
  const isOut    = product.stock === 0;
  const isLow    = product.stock > 0 && product.stock < 5;
  const isBest   = !!product.is_bestseller;
  const mainNote = parseMainNote(product.scent_notes);

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (isOut) return;
    if (qRef.current) addRipple(e, qRef.current);
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="oc">
      <Link to={`/product/${product.id}`} className="oc-img-wrap">
        {/* Decorative orbs */}
        <div className="oc-orb oc-orb-1" />
        <div className="oc-orb oc-orb-2" />

        <img className="oc-img" src={product.image_url} alt={product.name} loading="lazy" />
        <div className="oc-ovl" />

        {/* ✦ Original badge always visible */}
        <span className="oc-orig-bdg"><span className="oc-orig-dot"/>✦ Nahid Original</span>

        {/* Secondary */}
        {isBest && !isOut && <span className="oc-best-bdg">🔥 Best-Seller</span>}
        {isLow && !isBest && !isOut && <span className="oc-low-bdg">Dernières pièces</span>}

        {/* Category at bottom */}
        {product.category && (
          <div className="oc-img-foot">
            <span className="oc-img-cat"><span className="oc-img-cat-dot"/>{product.category}</span>
          </div>
        )}

        {/* Wishlist — offset if secondary badge */}
        <button
          className={`oc-wish${wished ? " wsh" : ""}`}
          style={{ top: (isBest || isLow) && !isOut ? 54 : 13 }}
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
          aria-label="Favoris">
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {!isOut && (
          <div className="oc-qa">
            <button ref={qRef} className={`oc-qbtn${added ? " qadd" : ""}`} onClick={handleAdd}>
              {added
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline className="pc-chk" points="20 6 9 17 4 12"/></svg>Ajouté !</>
                : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Ajouter au panier</>
              }
            </button>
          </div>
        )}
      </Link>

      <div className="oc-body">
        <div className="oc-stars">★★★★★<span>(4.9)</span></div>
        <Link to={`/product/${product.id}`} className="oc-name">{product.name}</Link>
        {product.description && <p className="oc-desc">{product.description}</p>}

        {mainNote && (
          <div className="oc-note">
            <span className="oc-note-icon">🌿</span>
            <span className="oc-note-txt"><b>Notes de tête :</b> {mainNote}</span>
          </div>
        )}

        <div className="oc-div" />

        <div className="oc-foot">
          <div className="oc-pw">
            <span className="oc-price">{Math.round(price).toLocaleString("fr-MA")}<span className="oc-price-cur">MAD</span></span>
            <span className="oc-ship">✓ Livraison gratuite</span>
          </div>
          {!isOut
            ? <button className={`oc-add${added ? " ok" : ""}`} onClick={handleAdd} aria-label="Ajouter">
                {added
                  ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                }
              </button>
            : <span className="oc-oos">Épuisé</span>
          }
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   EXPORT — auto-detect
══════════════════════════════════════════ */
const ProductCard = ({ product, addToCart }) => {
  injectStyles();
  const isOriginal = product.product_type === "Original" || product.category === "Originals";
  return isOriginal
    ? <OriginalCard product={product} addToCart={addToCart} />
    : <StandardCard product={product} addToCart={addToCart} />;
};

export default ProductCard;