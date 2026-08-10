import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { settingsApi, packsApi } from "../services/api";
import LanguageSelector from "./LanguageSelector";
import CountdownTimer from "./CountdownTimer";
import {
  FiShoppingCart, FiSearch,
  FiMenu, FiX, FiHeart, FiChevronRight, FiInstagram, FiFacebook,
} from "react-icons/fi";
import { RiTiktokLine } from "react-icons/ri";

/* ─── CSS ────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --c:   #EF776A;
  --cd:  #d45f52;
  --cl:  #fde8e6;
  --cll: #fff4f3;
  --w:   #ffffff;
  --ink: #1a1a1a;
  --g:   #6b6b6b;
  --b:   rgba(0,0,0,0.08);
  --sans:'DM Sans',sans-serif;
  --ser: 'Cormorant Garamond',Georgia,serif;
  --sp:  cubic-bezier(.34,1.56,.64,1);
  --ex:  cubic-bezier(.16,1,.3,1);
  --ea:  cubic-bezier(.25,.46,.45,.94);
  --h:   70px;
}

.nb * { box-sizing: border-box; }

.nb-sticky-group { position: sticky; top: 0; z-index: 999; }

.nb-ann {
  background: var(--c); height: 34px; overflow: hidden; position: relative;
  display: flex; align-items: center; flex-shrink: 0;
}
.nb-ann::before, .nb-ann::after {
  content:''; position:absolute; top:0; bottom:0; width:70px; z-index:2; pointer-events:none;
}
.nb-ann::before { left:0;  background:linear-gradient(90deg,var(--c),transparent); }
.nb-ann::after  { right:0; background:linear-gradient(-90deg,var(--c),transparent); }
.nb-ann-track { display:flex; white-space:nowrap; align-items:center; animation:annScroll 44s linear infinite; flex:1; min-width:0; }
.nb-ann-track:hover { animation-play-state:paused; }
@keyframes annScroll    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes annScrollRTL { 0%{transform:translateX(0)} 100%{transform:translateX(50%)}  }
.nb-ann-item {
  font-family:var(--sans); font-size:.59rem; font-weight:600; letter-spacing:.18em; text-transform:uppercase;
  color:rgba(255,255,255,.88); display:inline-flex; align-items:center; gap:7px; padding:0 32px; flex-shrink:0;
}
.nb-ann-star { color:rgba(255,255,255,.6); font-size:.4rem; }
.nb-ann-sep  { width:1px; height:8px; background:rgba(255,255,255,.25); flex-shrink:0; }

.nb-root {
  position:relative; background:var(--w); border-bottom:1px solid var(--b);
  font-family:var(--sans); transition:box-shadow .3s var(--ea), background .3s; width:100%;
}
.nb-root.scrolled { background:rgba(255,255,255,.97); backdrop-filter:blur(20px) saturate(1.5); box-shadow:0 1px 0 var(--b), 0 4px 24px rgba(0,0,0,.06); }
.nb-prog { position:absolute; bottom:0; left:0; height:2px; background:var(--c); transition:width .1s linear; z-index:10; }

.nb-bar { height:var(--h); width:100%; max-width:1400px; margin:0 auto; padding:0 clamp(16px,4vw,64px); display:flex; align-items:center; gap:8px; }

.nb-logo { display:flex; align-items:center; text-decoration:none; flex-shrink:0; margin-right:16px; }
.nb-logo-img {
  height:54px; width:auto; max-width:180px; object-fit:contain; display:block;
  transition:opacity .25s, transform .35s var(--sp), filter .35s;
  animation:logoReveal .75s var(--ex) both, logoFloat 5s ease-in-out 1s infinite;
}
.nb-logo:hover .nb-logo-img { opacity:.88; transform:scale(1.05); filter:drop-shadow(0 6px 14px rgba(239,119,106,.45)); }
.nb-dr-logo-img { animation:logoReveal .6s var(--ex) both; }
@keyframes logoReveal { from { opacity:0; transform:translateY(-10px) scale(.88); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes logoFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }

.nb-pills { display:flex; align-items:center; gap:4px; flex-shrink:0; }
.nb-pill {
  display:inline-flex; align-items:center; gap:5px; padding:9px 18px; border-radius:999px;
  border:1.5px solid var(--b); background:transparent; font-family:var(--sans); font-size:.78rem; font-weight:600;
  letter-spacing:.02em; color:var(--ink); cursor:pointer; text-decoration:none; white-space:nowrap;
  transition:border-color .18s, color .18s, background .18s, transform .2s var(--sp); line-height:1;
}
.nb-pill:hover { border-color:var(--c); color:var(--c); transform:translateY(-1px); }
.nb-pill.pill-active { background:var(--cll); border-color:var(--c); color:var(--c); }
.nb-pill-accent { background:var(--c); border-color:var(--c); color:var(--w); box-shadow:0 3px 12px rgba(239,119,106,.3); }
.nb-pill-accent:hover { background:var(--cd); border-color:var(--cd); color:var(--w); box-shadow:0 5px 18px rgba(239,119,106,.42); transform:translateY(-2px); }

.nb-sp { flex:1; }

.nb-s-wrap { position:relative; flex-shrink:0; }
.nb-s-form {
  display:flex; align-items:center; gap:8px; height:40px; padding:0 6px 0 14px; width:clamp(150px,16vw,210px);
  border:1.5px solid var(--b); border-radius:999px; background:#f9f9f9;
  transition:border-color .22s, box-shadow .22s, width .35s var(--ex), background .22s;
}
.nb-s-form:focus-within { border-color:var(--c); background:var(--w); box-shadow:0 0 0 3px rgba(239,119,106,.12); width:clamp(190px,20vw,270px); }
.nb-s-form input { flex:1; border:none; background:none; outline:none; font-family:var(--sans); font-size:.83rem; color:var(--ink); min-width:0; }
.nb-s-form input::placeholder { color:var(--g); }
.nb-s-btn {
  width:28px; height:28px; border-radius:50%; flex-shrink:0; background:var(--c); border:none; cursor:pointer;
  display:flex; align-items:center; justify-content:center; color:var(--w); transition:background .18s, transform .2s var(--sp);
}
.nb-s-btn:hover { background:var(--cd); transform:scale(1.1); }
.nb-s-icon { color:var(--g); opacity:.5; flex-shrink:0; }
.nb-s-drop {
  position:absolute; top:calc(100% + 10px); left:0; right:0; min-width:290px; background:var(--w); border-radius:16px;
  border:1px solid var(--b); box-shadow:0 16px 56px rgba(0,0,0,.1); padding:8px 0; z-index:400; animation:dIn .2s var(--ex) both;
}
@keyframes dIn { from{opacity:0;transform:translateY(-6px) scale(.97)} to{opacity:1;transform:none} }
.nb-s-drop-lbl { font-size:.54rem; font-weight:800; letter-spacing:.24em; text-transform:uppercase; color:var(--g); padding:6px 14px 8px; }
.nb-s-drop-item {
  display:flex; align-items:center; gap:9px; padding:9px 14px; border:none; background:none; width:100%; text-align:left;
  font-family:var(--sans); font-size:.81rem; font-weight:500; color:var(--ink); cursor:pointer; transition:background .13s, color .13s;
}
.nb-s-drop-item:hover { background:var(--cll); color:var(--c); }
.nb-s-drop-icon { color:var(--g); opacity:.45; font-size:.68rem; }
.nb-s-drop-div  { height:1px; background:var(--b); margin:4px 0; }
.nb-s-res { display:flex; align-items:center; gap:11px; padding:8px 14px; border:none; background:none; width:100%; text-align:left; font-family:var(--sans); cursor:pointer; transition:background .13s; }
.nb-s-res:hover { background:var(--cll); }
.nb-s-res-img { width:36px; height:36px; border-radius:8px; object-fit:cover; background:#f2f2f2; flex-shrink:0; }
.nb-s-res-name { font-size:.79rem; font-weight:700; color:var(--ink); }
.nb-s-res-cat  { font-size:.63rem; color:var(--g); margin-top:1px; }

.nb-right { display:flex; align-items:center; gap:4px; flex-shrink:0; margin-left:2px; }
.nb-ic {
  width:38px; height:38px; border-radius:50%; border:none; background:none; display:flex; align-items:center; justify-content:center;
  color:var(--ink); cursor:pointer; text-decoration:none; position:relative; flex-shrink:0;
  transition:background .18s, color .18s, transform .2s var(--sp);
}
.nb-ic:hover { background:var(--cll); color:var(--c); transform:translateY(-1px); }
.nb-badge {
  position:absolute; top:1px; right:1px; min-width:16px; height:16px; border-radius:999px; background:var(--c); color:var(--w);
  font-size:.52rem; font-weight:800; display:flex; align-items:center; justify-content:center; padding:0 3px;
  border:2px solid var(--w); box-shadow:0 1px 5px rgba(239,119,106,.4); animation:bPop .3s var(--sp) both;
}
@keyframes bPop { from{transform:scale(0)} to{transform:scale(1)} }
.nb-div { width:1px; height:18px; background:var(--b); margin:0 4px; flex-shrink:0; }
.nb-ap {
  display:inline-flex; align-items:center; gap:5px; padding:7px 14px; border-radius:999px; font-family:var(--sans);
  font-size:.67rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; cursor:pointer; text-decoration:none;
  white-space:nowrap; flex-shrink:0; transition:all .2s var(--ea); border:none; line-height:1;
}
.nb-ap-ghost { background:none; border:1.5px solid var(--b); color:var(--ink); }
.nb-ap-ghost:hover { border-color:var(--c); color:var(--c); transform:translateY(-1px); }
.nb-ap-fill  { background:var(--c); color:var(--w); box-shadow:0 2px 10px rgba(239,119,106,.3); }
.nb-ap-fill:hover { background:var(--cd); transform:translateY(-1px); box-shadow:0 4px 16px rgba(239,119,106,.4); }

.nb-mob { display:none; align-items:center; gap:3px; }
.nb-bk { position:fixed; inset:0; background:rgba(0,0,0,.45); backdrop-filter:blur(8px); z-index:1000; animation:fIn .22s ease; }
@keyframes fIn { from{opacity:0} to{opacity:1} }
.nb-dr {
  position:fixed; top:0; right:0; width:340px; max-width:94vw; height:100dvh; background:var(--w); z-index:1001;
  display:flex; flex-direction:column; transition:transform .4s cubic-bezier(.32,.72,0,1); box-shadow:-20px 0 60px rgba(0,0,0,.12);
}
.nb-dr::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--c); }
.nb-dr.open  { transform:translateX(0); }
.nb-dr.close { transform:translateX(110%); }
.nb-dr-head { display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--b); flex-shrink:0; background:#fafafa; }
.nb-dr-logo { display:flex; align-items:center; text-decoration:none; }
.nb-dr-logo-img { height:44px; width:auto; object-fit:contain; }
.nb-xbtn {
  width:32px; height:32px; border-radius:50%; border:1.5px solid var(--b); background:none; cursor:pointer;
  display:flex; align-items:center; justify-content:center; color:var(--g);
  transition:background .18s, color .18s, transform .22s var(--sp), border-color .18s;
}
.nb-xbtn:hover { background:var(--c); color:var(--w); border-color:var(--c); transform:rotate(90deg); }
.nb-dr-s {
  margin:12px 16px; border-radius:10px; display:flex; align-items:center; background:#f4f4f4; padding:0 12px; gap:9px; flex-shrink:0;
  border:1.5px solid transparent; transition:border-color .2s, background .2s, box-shadow .2s;
}
.nb-dr-s:focus-within { background:var(--w); border-color:var(--c); box-shadow:0 0 0 3px rgba(239,119,106,.1); }
.nb-dr-s input { flex:1; border:none; background:none; font-family:var(--sans); font-size:.83rem; color:var(--ink); padding:11px 0; outline:none; }
.nb-dr-s input::placeholder { color:var(--g); }
.nb-dr-body { flex:1; overflow-y:auto; padding:4px 0 12px; overscroll-behavior:contain; }
.nb-dr-body::-webkit-scrollbar { width:3px; }
.nb-dr-body::-webkit-scrollbar-thumb { background:#e0e0e0; border-radius:2px; }
.nb-m-lbl {
  font-size:.54rem; font-weight:800; letter-spacing:.24em; text-transform:uppercase; color:var(--g); padding:13px 20px 6px;
  display:flex; align-items:center; gap:8px;
}
.nb-m-lbl::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,var(--b),transparent); }
.nb-m-lnk {
  display:flex; align-items:center; gap:12px; padding:12px 20px; font-size:.86rem; font-weight:600; text-decoration:none; color:var(--ink);
  transition:background .14s, padding-left .18s var(--ea); cursor:pointer; border:none; background:none; width:100%; text-align:left;
  font-family:var(--sans);
}
.nb-m-lnk:hover { background:var(--cll); padding-left:28px; }
.nb-m-lnk.act   { color:var(--c); }
.nb-m-tag { border-radius:999px; padding:2px 7px; font-size:.52rem; font-weight:800; letter-spacing:.06em; line-height:1.5; flex-shrink:0; background:var(--c); color:var(--w); }
.nb-dr-foot { border-top:1px solid var(--b); padding:14px 16px 18px; flex-shrink:0; background:#fafafa; }
.nb-dr-ftns { display:flex; gap:7px; margin-bottom:12px; }
.nb-soc-row { display:flex; gap:6px; justify-content:center; }
.nb-soc {
  width:32px; height:32px; border-radius:50%; border:1.5px solid var(--b); background:none; cursor:pointer;
  display:flex; align-items:center; justify-content:center; color:var(--g); text-decoration:none;
  transition:background .18s, color .18s, border-color .18s, transform .2s var(--sp);
}
.nb-soc:hover { background:var(--c); color:var(--w); border-color:var(--c); transform:translateY(-2px); }
.nb-soc-div { height:1px; background:var(--b); margin:10px 0; }
.nb-shop-foot-btn {
  flex:1; padding:10px; border-radius:999px; font-family:var(--sans); font-size:.68rem; font-weight:700;
  letter-spacing:.06em; text-transform:uppercase; cursor:pointer; text-decoration:none; text-align:center; border:none; transition:all .2s var(--ea);
}
.nb-sfoot-p { background:var(--c); color:var(--w); box-shadow:0 3px 12px rgba(239,119,106,.35); }
.nb-sfoot-p:hover { background:var(--cd); transform:translateY(-1px); }
.nb-sfoot-o { background:none; border:1.5px solid var(--b); color:var(--ink); }
.nb-sfoot-o:hover { border-color:var(--c); color:var(--c); }

@media(max-width:1060px){
  .nb-pills  { display:none!important; }
  .nb-s-wrap { display:none!important; }
  .nb-right  { display:none!important; }
  .nb-mob    { display:flex!important; }
  .nb-logo-img { height:66px; max-width:210px; }
}
@media(max-width:600px){
  :root { --h:66px; }
  .nb-logo-img { height:54px; max-width:180px; }
  .nb-ann { height:28px; }
  .nb-ann-item { font-size:.56rem; padding:0 20px; }
}
@media(max-width:480px){ .nb-dr{ max-width:100vw; width:100%; } }

[dir="rtl"] .nb-ann-track        { animation-name: annScrollRTL; }
[dir="rtl"] .nb-ann::before      { left:auto; right:0; background:linear-gradient(-90deg,var(--c),transparent); }
[dir="rtl"] .nb-ann::after       { right:auto; left:0; background:linear-gradient(90deg,var(--c),transparent); }
[dir="rtl"] .nb-logo             { margin-right:0; margin-left:16px; }
[dir="rtl"] .nb-right            { margin-left:0; margin-right:2px; }
[dir="rtl"] .nb-s-drop           { left:auto; right:0; }
[dir="rtl"] .nb-s-drop-item,
[dir="rtl"] .nb-s-res            { text-align:right; }
[dir="rtl"] .nb-dr               { right:auto; left:0; box-shadow:20px 0 60px rgba(0,0,0,.12); }
[dir="rtl"] .nb-dr.close         { transform:translateX(-110%); }
[dir="rtl"] .nb-m-lnk            { text-align:right; }
[dir="rtl"] .nb-m-lnk:hover      { padding-left:20px; padding-right:28px; }
[dir="rtl"] .nb-m-lbl::after     { background:linear-gradient(270deg,var(--b),transparent); }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-nb-v6")) {
    const s = document.createElement("style");
    s.id = "nahid-nb-v6"; s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/* ─── Component ─────────────────────────────────────────── */
export default function Navbar() {
  injectCSS();
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlist } = useWishlist();
  const { t } = useLanguage();
  const { cartCount } = useCart();
  const wishCount = wishlist.length;

  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [query,         setQuery]         = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [liveResults,   setLiveResults]   = useState([]);
  const [searching,     setSearching]     = useState(false);
  const [settings,      setSettings]      = useState(null);

  const searchRef = useRef(null);

  const ANN_ITEMS = t("nav.announcements");
  const QUICK_SEARCHES = t("nav.quickSearches");

  /* Only 5 links, per the packs-only, conversion-focused navigation. */
  const navLinks = [
    { to: "/packs",           label: t("nav.links.packs") },
    { to: "/build-your-pack", label: t("nav.links.createPack") },
    { to: "/notre-histoire",  label: t("nav.links.ourStory") },
    { to: "/faq",             label: t("nav.faq") },
    { to: "/contact",         label: t("nav.contact") },
  ];

  useEffect(() => {
    settingsApi.getPublic().then(setSettings).catch(() => setSettings({}));
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20);
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchFocused(false); }, [location]);

  useEffect(() => {
    const fn = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!query || query.length < 2) { setLiveResults([]); return; }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        // Routed through packsApi.list() instead of a raw fetch so it hits
        // the same stale-while-revalidate cache/dedup layer as the rest of
        // the app -- typing a search no longer re-downloads the full packs
        // payload on every keystroke once it's already cached.
        const data = await packsApi.list();
        if (cancelled) return;
        const q = query.trim().toLowerCase();
        const matches = (Array.isArray(data) ? data : []).filter((p) => p.title.toLowerCase().includes(q));
        setLiveResults(matches.slice(0, 5));
      } catch { if (!cancelled) setLiveResults([]); }
      finally { if (!cancelled) setSearching(false); }
    }, 280);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  const handleSearch = (e, q) => {
    e?.preventDefault();
    const term = q || query;
    if (!term.trim()) return;
    navigate(`/packs?search=${encodeURIComponent(term.trim())}`);
    setSearchFocused(false); setMenuOpen(false); setQuery(""); setLiveResults([]);
  };

  const isActive = link => location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);

  const doubled = [...ANN_ITEMS, ...ANN_ITEMS];
  const showCountdown = settings?.countdown_enabled === "1" && settings?.countdown_end_at;

  return (
    <>
      {/* Sticky group: announcement/promo bar (with countdown) + main nav pinned together */}
      <div className="nb-sticky-group">
        <div className="nb-ann">
          <div className="nb-ann-track" aria-hidden="true">
            {doubled.map((text, i) => (
              <span className="nb-ann-item" key={i}>
                {i > 0 && <span className="nb-ann-sep" />}
                <span className="nb-ann-star">✦</span>
                {text}
              </span>
            ))}
          </div>
          {showCountdown && (
            <CountdownTimer endAt={settings.countdown_end_at} label={settings.countdown_label} compact />
          )}
        </div>

        <nav className={`nb-root${scrolled ? " scrolled" : ""}`} role="navigation">
          <div className="nb-prog" style={{ width: `${progress}%` }} />

        <div className="nb-bar">
          <Link to="/" className="nb-logo" aria-label="Nahid Perfume">
            <img src="/nahid.png" alt="Nahid Perfume" className="nb-logo-img"
              onError={e => { e.currentTarget.style.display = "none"; }} />
          </Link>

          <div className="nb-pills">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`nb-pill${isActive(link) ? " pill-active" : ""}${link.to === "/build-your-pack" ? " nb-pill-accent" : ""}`}
                aria-current={isActive(link) ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nb-sp" />

          <div className="nb-s-wrap" ref={searchRef}>
            <form className="nb-s-form" onSubmit={handleSearch}>
              <FiSearch size={13} className="nb-s-icon" />
              <input
                type="search"
                placeholder={t("nav.searchPlaceholder")}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                autoComplete="off"
                aria-label={t("nav.searchLabel")}
              />
              <button type="submit" className="nb-s-btn"><FiSearch size={12} /></button>
            </form>

            {searchFocused && (
              <div className="nb-s-drop">
                {query.length === 0 && (
                  <>
                    <div className="nb-s-drop-lbl">{t("nav.suggestions")}</div>
                    {QUICK_SEARCHES.map(s => (
                      <button key={s} className="nb-s-drop-item" onClick={e => handleSearch(e, s)}>
                        <span className="nb-s-drop-icon">🔍</span>{s}
                      </button>
                    ))}
                  </>
                )}
                {query.length > 0 && searching && (
                  <div style={{ padding: "13px 14px", fontSize: ".77rem", color: "var(--g)", textAlign: "center" }}>
                    {t("nav.searching")}
                  </div>
                )}
                {query.length > 0 && !searching && liveResults.length > 0 && (
                  <>
                    <div className="nb-s-drop-lbl">{t("nav.results")}</div>
                    {liveResults.map(p => (
                      <button key={p.id} className="nb-s-res"
                        onClick={() => { navigate(`/packs/${p.id}`); setSearchFocused(false); setQuery(""); }}>
                        <img className="nb-s-res-img" src={p.cover_image} alt={p.title} loading="lazy" />
                        <div>
                          <div className="nb-s-res-name">{p.title}</div>
                          <div className="nb-s-res-cat">{Math.round(p.price)} MAD</div>
                        </div>
                      </button>
                    ))}
                    <div className="nb-s-drop-div" />
                    <button className="nb-s-drop-item" onClick={e => handleSearch(e, query)}>
                      <span className="nb-s-drop-icon">→</span>
                      {t("nav.viewAllResults")} « {query} »
                    </button>
                  </>
                )}
                {query.length > 0 && !searching && liveResults.length === 0 && (
                  <div style={{ padding: "13px 14px", fontSize: ".77rem", color: "var(--g)", textAlign: "center" }}>
                    {t("nav.noResults")} « {query} »
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="nb-right">
            {/* No admin/dashboard entry point in the customer-facing navbar
                on purpose -- the admin dashboard stays reachable at /admin
                directly by URL (still behind authAdmin), it's just not
                advertised to storefront visitors. */}
            <LanguageSelector />
            <div className="nb-div" />
            <Link to="/wishlist" className="nb-ic" aria-label={t("nav.favorites")}>
              <FiHeart size={17} />
              {wishCount > 0 && <span className="nb-badge">{wishCount > 99 ? "99+" : wishCount}</span>}
            </Link>
            <Link to="/cart" className="nb-ic" aria-label="Panier">
              <FiShoppingCart size={17} />
              {cartCount > 0 && <span className="nb-badge">{cartCount > 99 ? "99+" : cartCount}</span>}
            </Link>
          </div>

          <div className="nb-mob">
            <Link to="/cart" className="nb-ic">
              <FiShoppingCart size={20} />
              {cartCount > 0 && <span className="nb-badge">{cartCount > 99 ? "99+" : cartCount}</span>}
            </Link>
            <button className="nb-ic" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <FiMenu size={21} />
            </button>
          </div>
        </div>
        </nav>
      </div>

      {menuOpen && <div className="nb-bk" onClick={() => setMenuOpen(false)} />}

      <aside className={`nb-dr ${menuOpen ? "open" : "close"}`} role="dialog" aria-modal="true">
        <div className="nb-dr-head">
          <Link to="/" className="nb-dr-logo" onClick={() => setMenuOpen(false)}>
            <img src="/nahid.png" alt="Nahid Perfume" className="nb-dr-logo-img"
              onError={e => { e.currentTarget.style.display = "none"; }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LanguageSelector />
            <button className="nb-xbtn" onClick={() => setMenuOpen(false)}><FiX size={14} /></button>
          </div>
        </div>

        <form className="nb-dr-s" onSubmit={e => handleSearch(e)}>
          <FiSearch size={13} style={{ color: "var(--g)", flexShrink: 0 }} />
          <input type="search" placeholder={t("nav.searchPerfume")} value={query}
            onChange={e => setQuery(e.target.value)} />
          {query && (
            <button type="submit" style={{ background: "none", border: "none", color: "var(--c)", cursor: "pointer" }}>
              <FiChevronRight size={14} />
            </button>
          )}
        </form>

        <nav className="nb-dr-body">
          <div className="nb-m-lbl">{t("nav.navigation")}</div>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`nb-m-lnk${isActive(link) ? " act" : ""}`}
              onClick={() => setMenuOpen(false)}>
              <span>{link.label}</span>
            </Link>
          ))}

          <Link to="/wishlist" className="nb-m-lnk" onClick={() => setMenuOpen(false)}>
            <FiHeart size={14} />
            <span style={{ flex: 1 }}>{t("nav.favorites")}</span>
            {wishCount > 0 && <span className="nb-m-tag">{wishCount}</span>}
          </Link>

          {/* No admin/dashboard entry point in the customer-facing navbar
              on purpose -- see the desktop nb-right block for why. */}
        </nav>

        <div className="nb-dr-foot">
          <div className="nb-dr-ftns">
            <Link to="/packs" className="nb-shop-foot-btn nb-sfoot-p" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
              {t("nav.exploreCollection")}
            </Link>
            <Link to="/cart" className="nb-shop-foot-btn nb-sfoot-o"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
              onClick={() => setMenuOpen(false)}>
              <FiShoppingCart size={14} />
              {cartCount > 0 && <span className="nb-m-tag">{cartCount}</span>}
            </Link>
          </div>
          <div className="nb-soc-div" />
          <div className="nb-soc-row">
            <a href="#" className="nb-soc" aria-label="Instagram"><FiInstagram size={13} /></a>
            <a href="#" className="nb-soc" aria-label="TikTok"><RiTiktokLine size={13} /></a>
            <a href="#" className="nb-soc" aria-label="Facebook"><FiFacebook size={13} /></a>
          </div>
        </div>
      </aside>
    </>
  );
}
