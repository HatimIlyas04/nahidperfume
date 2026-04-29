import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FiShoppingCart, FiUser, FiLogOut, FiSearch,
  FiMenu, FiX, FiGrid, FiBookOpen, FiHome, FiHeart,
  FiChevronRight, FiInstagram, FiFacebook
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { RiTiktokLine } from "react-icons/ri";

const ANN_ITEMS = [
  "✦ Livraison offerte dès 500 MAD",
  "✦ Échantillon gratuit avec chaque commande",
  "✦ Nouveauté — Collection Oud de Camboge",
  "✦ Retours 100% gratuits sous 30 jours",
  "✦ Paiement sécurisé — CB · PayPal · Virement",
];

export default function Navbar({ cartCount = 0, isAdminLoggedIn, setIsAdminLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const token = localStorage.getItem("adminToken");
  const isAdmin = !!token || isAdminLoggedIn;
  const isHome = location.pathname === "/";
  
  const heroMode = false;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const fn = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    if (setIsAdminLoggedIn) setIsAdminLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const scrollToCollection = (e) => {
    e?.preventDefault();
    const el = document.getElementById("collection") || document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const navLinks = [
    { to: "/", label: "Accueil", icon: <FiHome size={13} />, exact: true },
    { to: "/notre-histoire", label: "Notre Histoire", icon: <FiBookOpen size={13} />, exact: false },
    { isAction: true, label: "Collection", icon: <FiGrid size={13} /> },
  ];

  const isActive = (link) => {
    if (link.isAction) return false;
    if (link.exact) return location.pathname === link.to;
    return location.pathname.startsWith(link.to) && link.to !== "/";
  };

  const doubled = [...ANN_ITEMS, ...ANN_ITEMS];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --nb-ink: #0E0E0C;
          --nb-cream: #FAF8F5;
          --nb-sand: #EDE9E1;
          --nb-coral: #C8956C;
          --nb-coral-d: #B07A55;
          --nb-gold: #C9A96E;
          --nb-gold-l: #E8D5B0;
          --nb-muted: #8A8680;
          --nb-border: rgba(14,14,12,0.09);
          --nb-serif: 'Cormorant Garamond', Georgia, serif;
          --nb-sans: 'Jost', sans-serif;
          --nb-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          --nb-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
          --nb-h: 72px;
        }

        .nb-ann {
          background: linear-gradient(90deg, #0E0E0C 0%, #1a1814 50%, #0E0E0C 100%);
          height: 36px;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }
        .nb-ann::before, .nb-ann::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .nb-ann::before {
          left: 0;
          background: linear-gradient(90deg, #0E0E0C, transparent);
        }
        .nb-ann::after {
          right: 0;
          background: linear-gradient(-90deg, #0E0E0C, transparent);
        }
        .nb-ann-track {
          display: flex;
          white-space: nowrap;
          animation: annScroll 36s linear infinite;
          will-change: transform;
          align-items: center;
        }
        .nb-ann-track:hover { animation-play-state: paused; }
        @keyframes annScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nb-ann-item {
          font-family: var(--nb-sans);
          font-size: 0.64rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          display: inline-flex;
          align-items: center;
          padding: 0 36px;
          flex-shrink: 0;
          gap: 8px;
        }
        .nb-ann-item span.star {
          color: var(--nb-gold);
          font-size: 0.5rem;
        }
        .nb-ann-sep {
          width: 1px;
          height: 10px;
          background: rgba(201,169,110,0.3);
          flex-shrink: 0;
        }

        .nb-root {
          position: sticky;
          top: 0;
          z-index: 999;
          font-family: var(--nb-sans);
          background: var(--nb-cream);
          transition: box-shadow 0.4s var(--nb-ease), background 0.5s var(--nb-ease), border-color 0.4s var(--nb-ease);
        }
        .nb-root::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--nb-gold-l), transparent);
          opacity: 0.6;
          transition: opacity 0.4s;
        }
        .nb-root.scrolled {
          background: rgba(250,248,245,0.96);
          backdrop-filter: blur(24px) saturate(1.4);
          box-shadow: 0 1px 0 rgba(201,169,110,0.15), 0 8px 32px rgba(14,14,12,0.07), 0 2px 8px rgba(14,14,12,0.04);
        }
        .nb-root.scrolled::after { opacity: 0.9; }
        
        .nb-root.hero-mode { background: var(--nb-cream) !important; }
        .nb-root.hero-mode::after { opacity: 0.6 !important; }
        
        .nb-logo-name { color: var(--nb-ink) !important; }
        .nb-logo-sub { color: var(--nb-muted) !important; }
        .nb-link { color: var(--nb-muted) !important; }
        .nb-link:hover { color: var(--nb-ink) !important; background: var(--nb-sand) !important; }
        .nb-link.active { color: var(--nb-ink) !important; }
        .nb-icon-btn { color: var(--nb-ink) !important; }
        .nb-icon-btn:hover { color: var(--nb-coral) !important; background: var(--nb-sand) !important; }
        .nb-pill-ghost { color: var(--nb-ink) !important; border-color: var(--nb-border) !important; }
        .nb-pill-ghost:hover { color: var(--nb-gold) !important; border-color: var(--nb-gold) !important; }

        .nb-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--nb-gold), var(--nb-coral), var(--nb-gold));
          background-size: 200% 100%;
          animation: progressShimmer 3s linear infinite;
          transition: width 0.1s linear;
          z-index: 10;
        }
        @keyframes progressShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .nb-bar {
          height: var(--nb-h);
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 clamp(18px, 4vw, 72px);
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 24px;
        }

        /* ===== NOUVEAU STYLE LOGO AVEC IMAGE ===== */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 13px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb-logo-img {
          height: 42px;
          width: auto;
          max-width: 140px;
          object-fit: contain;
          transition: transform 0.3s var(--nb-spring);
        }
        .nb-logo:hover .nb-logo-img {
          transform: scale(1.02);
        }
        .nb-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .nb-logo-name {
          font-family: var(--nb-serif);
          font-size: 1.12rem;
          font-weight: 600;
          color: var(--nb-ink);
          letter-spacing: 0.01em;
        }
        .nb-logo-sub {
          font-size: 0.57rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--nb-muted);
          margin-top: 3px;
        }
        @media (max-width: 640px) {
          .nb-logo-img {
            height: 32px;
          }
          .nb-logo-sub {
            display: none;
          }
        }

        .nb-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        .nb-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--nb-muted);
          border-radius: 999px;
          transition: color 0.25s var(--nb-ease), background 0.25s var(--nb-ease);
          white-space: nowrap;
        }
        .nb-link svg { transition: transform 0.25s var(--nb-spring), opacity 0.2s; opacity: 0.5; flex-shrink: 0; }
        .nb-link:hover { color: var(--nb-ink); background: var(--nb-sand); }
        .nb-link:hover svg { opacity: 1; transform: translateY(-1px); }
        .nb-link.active { color: var(--nb-ink); font-weight: 600; }
        .nb-link.active::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 1.5px;
          background: linear-gradient(90deg, var(--nb-gold), var(--nb-coral));
          border-radius: 999px;
        }
        .nb-link.active svg { opacity: 1; color: var(--nb-gold); }

        .nb-actions {
          display: flex;
          align-items: center;
          gap: 3px;
          flex-shrink: 0;
        }
        .nb-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-ink);
          cursor: pointer;
          transition: background 0.22s, color 0.22s, transform 0.25s var(--nb-spring);
          position: relative;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nb-icon-btn:hover {
          background: var(--nb-sand);
          color: var(--nb-coral);
          transform: translateY(-2px);
        }
        .nb-icon-btn:active { transform: scale(0.94); }

        .nb-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          min-width: 17px;
          height: 17px;
          background: linear-gradient(135deg, var(--nb-coral), #b07a55);
          color: white;
          font-size: 0.55rem;
          font-weight: 700;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          line-height: 1;
          border: 2px solid var(--nb-cream);
          box-shadow: 0 2px 8px rgba(200,149,108,0.4);
        }

        .nb-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s var(--nb-ease);
          white-space: nowrap;
          flex-shrink: 0;
          font-family: var(--nb-sans);
          line-height: 1;
          border: none;
        }
        .nb-pill-gold {
          background: linear-gradient(135deg, var(--nb-gold), var(--nb-coral));
          color: white;
          box-shadow: 0 4px 16px rgba(201,169,110,0.25);
        }
        .nb-pill-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,169,110,0.38);
          filter: brightness(1.05);
        }
        .nb-pill-ghost {
          background: transparent;
          color: var(--nb-ink);
          border: 1.5px solid var(--nb-border);
        }
        .nb-pill-ghost:hover {
          border-color: var(--nb-gold);
          color: var(--nb-gold);
          transform: translateY(-2px);
          background: rgba(201,169,110,0.05);
        }

        .nb-vline {
          width: 1px;
          height: 22px;
          background: var(--nb-border);
          margin: 0 6px;
          flex-shrink: 0;
          transition: background 0.3s;
        }

        .nb-search-wrap { position: relative; }
        .nb-search-box {
          position: absolute;
          top: calc(100% + 14px);
          right: -14px;
          width: 320px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(14,14,12,0.12), 0 0 0 1px rgba(201,169,110,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
          padding: 10px;
          z-index: 300;
          transform-origin: top right;
          animation: searchIn 0.25s var(--nb-spring);
        }
        @keyframes searchIn {
          0% { opacity: 0; transform: scale(0.88) translateY(-12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .nb-search-inner {
          display: flex;
          align-items: center;
          background: var(--nb-sand);
          border-radius: 12px;
          padding: 0 14px;
          gap: 10px;
          transition: box-shadow 0.22s, background 0.22s;
        }
        .nb-search-inner.focused {
          background: white;
          box-shadow: 0 0 0 2px var(--nb-gold), 0 4px 16px rgba(201,169,110,0.15);
        }
        .nb-search-inner input {
          flex: 1;
          border: none;
          background: none;
          font-family: var(--nb-sans);
          font-size: 0.86rem;
          color: var(--nb-ink);
          padding: 13px 0;
          outline: none;
        }
        .nb-search-inner input::placeholder { color: var(--nb-muted); }
        .nb-search-submit {
          background: none;
          border: none;
          color: var(--nb-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.2s, transform 0.2s var(--nb-spring);
          border-radius: 8px;
        }
        .nb-search-submit:hover { color: var(--nb-coral); transform: scale(1.15); }
        .nb-search-hint {
          font-family: var(--nb-sans);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--nb-muted);
          padding: 8px 14px 2px;
          text-transform: uppercase;
        }

        .nb-mobile-actions { display: none; align-items: center; gap: 2px; }

        .nb-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(14,14,12,0.55);
          backdrop-filter: blur(10px) saturate(0.8);
          z-index: 1000;
          animation: bkIn 0.3s ease;
        }
        @keyframes bkIn { from { opacity: 0; } to { opacity: 1; } }

        .nb-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 360px;
          max-width: 95vw;
          height: 100dvh;
          background: #FDFBF8;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
          box-shadow: -32px 0 80px rgba(14,14,12,0.16), -1px 0 0 rgba(201,169,110,0.1);
        }
        .nb-drawer.open { transform: translateX(0); }
        .nb-drawer.close { transform: translateX(110%); }

        .nb-drawer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--nb-gold), var(--nb-coral), var(--nb-gold), transparent);
        }

        .nb-drawer-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 24px 20px;
          border-bottom: 1px solid var(--nb-border);
          flex-shrink: 0;
          background: white;
        }
        .nb-drawer-logo { display: flex; align-items: center; gap: 11px; text-decoration: none; }
        .nb-drawer-gem {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--nb-ink);
          border: 1px solid rgba(201,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--nb-serif);
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }
        .nb-drawer-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
        .nb-drawer-logo-name {
          font-family: var(--nb-serif);
          font-size: 1.02rem;
          font-weight: 600;
          color: var(--nb-ink);
        }
        .nb-drawer-logo-sub {
          font-size: 0.54rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--nb-muted);
          margin-top: 3px;
        }
        .nb-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--nb-border);
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-muted);
          transition: background 0.2s, color 0.2s, transform 0.25s var(--nb-spring), border-color 0.2s;
          flex-shrink: 0;
        }
        .nb-close-btn:hover {
          background: var(--nb-ink);
          color: white;
          border-color: var(--nb-ink);
          transform: rotate(90deg);
        }

        .nb-drawer-search {
          margin: 16px 20px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          background: var(--nb-sand);
          padding: 0 16px;
          gap: 10px;
          flex-shrink: 0;
          transition: box-shadow 0.22s, background 0.22s;
        }
        .nb-drawer-search:focus-within {
          background: white;
          box-shadow: 0 0 0 2px var(--nb-gold), 0 4px 16px rgba(201,169,110,0.12);
        }
        .nb-drawer-search input {
          flex: 1;
          border: none;
          background: none;
          font-family: var(--nb-sans);
          font-size: 0.85rem;
          color: var(--nb-ink);
          padding: 13px 0;
          outline: none;
        }
        .nb-drawer-search input::placeholder { color: var(--nb-muted); }

        .nb-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 6px 0 16px;
          overscroll-behavior: contain;
        }
        .nb-drawer-body::-webkit-scrollbar { width: 4px; }
        .nb-drawer-body::-webkit-scrollbar-track { background: transparent; }
        .nb-drawer-body::-webkit-scrollbar-thumb { background: var(--nb-sand); border-radius: 2px; }

        .nb-m-section-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--nb-muted);
          padding: 16px 24px 6px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nb-m-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--nb-border), transparent);
        }

        .nb-m-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 13px 24px;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          color: var(--nb-ink);
          letter-spacing: 0.025em;
          transition: background 0.18s, padding-left 0.22s var(--nb-ease);
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: var(--nb-sans);
        }
        .nb-m-link:hover { background: var(--nb-sand); padding-left: 32px; }
        .nb-m-link.active { color: var(--nb-coral); }
        .nb-m-link.active .nb-m-icon { color: var(--nb-coral); }
        .nb-m-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: var(--nb-sand);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-muted);
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .nb-m-link:hover .nb-m-icon { background: white; color: var(--nb-coral); }
        .nb-m-link-text { flex: 1; }
        .nb-m-chevron { color: var(--nb-muted); opacity: 0.4; transition: opacity 0.18s, transform 0.18s; }
        .nb-m-link:hover .nb-m-chevron { opacity: 0.7; transform: translateX(3px); }
        .nb-m-tag {
          background: linear-gradient(135deg, var(--nb-gold), var(--nb-coral));
          color: white;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          border-radius: 999px;
          padding: 2px 8px;
          line-height: 1.5;
          flex-shrink: 0;
        }

        .nb-drawer-foot {
          border-top: 1px solid var(--nb-border);
          padding: 18px 20px 22px;
          flex-shrink: 0;
          background: white;
        }
        .nb-drawer-foot-cta { display: flex; gap: 10px; margin-bottom: 16px; }
        .nb-social-row {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .nb-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--nb-border);
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-muted);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.25s var(--nb-spring);
        }
        .nb-social-btn:hover {
          background: var(--nb-ink);
          color: white;
          border-color: var(--nb-ink);
          transform: translateY(-3px);
        }
        .nb-social-divider {
          height: 1px;
          background: var(--nb-border);
          margin: 14px 0;
        }
        .nb-foot-legal {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nb-foot-legal a {
          font-size: 0.65rem;
          color: var(--nb-muted);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .nb-foot-legal a:hover { color: var(--nb-coral); }

        @media (max-width: 960px) {
          .nb-links { display: none !important; }
          .nb-actions { display: none !important; }
          .nb-mobile-actions { display: flex !important; }
          .nb-bar {
            grid-template-columns: auto auto;
            justify-content: space-between;
            gap: 0;
          }
        }
        @media (max-width: 640px) {
          :root { --nb-h: 64px; }
          .nb-logo-sub { display: none; }
          .nb-ann { height: 32px; }
          .nb-ann-item { font-size: 0.6rem; padding: 0 24px; }
        }
        @media (max-width: 480px) {
          .nb-drawer { max-width: 100vw; width: 100%; }
        }
        @media (max-width: 360px) {
          .nb-logo-text { display: none; }
        }
      `}</style>

      <div className="nb-ann" aria-label="Informations promotionnelles">
        <div className="nb-ann-track" aria-hidden="true">
          {doubled.map((text, i) => (
            <span className="nb-ann-item" key={i}>
              {i > 0 && <span className="nb-ann-sep" />}
              <span className="star">✦</span>
              {text.replace("✦ ", "")}
            </span>
          ))}
        </div>
      </div>

      <nav
        className={["nb-root", scrolled ? "scrolled" : "", heroMode ? "hero-mode" : ""].filter(Boolean).join(" ")}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="nb-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

        <div className="nb-bar">
          {/* ===== NOUVEAU LOGO AVEC IMAGE ===== */}
          <Link to="/" className="nb-logo" aria-label="Nahid Perfume — Retour à l'accueil">
            <img 
              src="/nahid.png" 
              alt="Nahid Perfume" 
              className="nb-logo-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/120x40/EF776A/white?text=Nahid";
              }}
            />
          </Link>

          <div className="nb-links" role="menubar">
            {navLinks.map((link, i) =>
              link.isAction ? (
                <a
                  key={i}
                  href="#collection"
                  onClick={scrollToCollection}
                  className="nb-link"
                  role="menuitem"
                >
                  {link.icon} {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nb-link${isActive(link) ? " active" : ""}`}
                  role="menuitem"
                  aria-current={isActive(link) ? "page" : undefined}
                >
                  {link.icon} {link.label}
                </Link>
              )
            )}
          </div>

          <div className="nb-actions">
            <div className="nb-search-wrap" ref={searchRef}>
              <button
                className="nb-icon-btn"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Rechercher"
                aria-expanded={searchOpen}
              >
                <FiSearch size={16} />
              </button>
              {searchOpen && (
                <div className="nb-search-box" role="dialog" aria-label="Recherche">
                  <p className="nb-search-hint">Rechercher</p>
                  <form
                    onSubmit={handleSearch}
                    className={`nb-search-inner${searchFocused ? " focused" : ""}`}
                  >
                    <FiSearch size={14} style={{ color: "var(--nb-muted)", flexShrink: 0 }} />
                    <input
                      ref={inputRef}
                      type="search"
                      placeholder="Rechercher un parfum…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      aria-label="Terme de recherche"
                    />
                    <button type="submit" className="nb-search-submit" aria-label="Lancer la recherche">
                      <FiChevronRight size={16} />
                    </button>
                  </form>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="nb-icon-btn" aria-label="Liste de souhaits">
              <FiHeart size={16} />
            </Link>

            <div className="nb-vline" aria-hidden="true" />

            {isAdmin ? (
              <>
                <Link
                  to="/admin"
                  className="nb-pill nb-pill-gold"
                  style={{ padding: "8px 16px", fontSize: "0.67rem" }}
                >
                  <FaCrown size={10} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="nb-pill nb-pill-ghost"
                  style={{ padding: "8px 15px", fontSize: "0.67rem" }}
                >
                  <FiLogOut size={11} /> Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="nb-pill nb-pill-ghost"
                style={{ padding: "8px 16px", fontSize: "0.7rem" }}
              >
                <FiUser size={12} /> Espace Pro
              </Link>
            )}

            <div className="nb-vline" aria-hidden="true" />

            <Link
              to="/cart"
              className="nb-icon-btn"
              aria-label={`Panier — ${cartCount} article${cartCount !== 1 ? "s" : ""}`}
            >
              <FiShoppingCart size={17} />
              {cartCount > 0 && (
                <span className="nb-badge" aria-hidden="true">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="nb-mobile-actions">
            <Link to="/cart" className="nb-icon-btn" aria-label="Panier">
              <FiShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="nb-badge" aria-hidden="true">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <button
              className="nb-icon-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
            >
              <FiMenu size={21} />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="nb-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <aside
        className={`nb-drawer ${menuOpen ? "open" : "close"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        <div className="nb-drawer-head">
          <Link to="/" className="nb-drawer-logo" onClick={() => setMenuOpen(false)}>
            <div className="nb-drawer-gem">N</div>
            <div className="nb-drawer-logo-text">
              <span className="nb-drawer-logo-name">Nahid Perfume</span>
              <span className="nb-drawer-logo-sub">Maison de Parfums · Casablanca</span>
            </div>
          </Link>
          <button className="nb-close-btn" onClick={() => setMenuOpen(false)} aria-label="Fermer">
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="nb-drawer-search">
          <FiSearch size={15} style={{ color: "var(--nb-muted)", flexShrink: 0 }} />
          <input
            type="search"
            placeholder="Rechercher un parfum…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Recherche"
          />
        </form>

        <nav className="nb-drawer-body">
          <div className="nb-m-section-label">Navigation</div>

          {navLinks.map((link, i) =>
            link.isAction ? (
              <a
                key={i}
                href="#collection"
                onClick={scrollToCollection}
                className="nb-m-link"
              >
                <div className="nb-m-icon">{link.icon}</div>
                <span className="nb-m-link-text">{link.label}</span>
                <FiChevronRight size={14} className="nb-m-chevron" />
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`nb-m-link${isActive(link) ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link) ? "page" : undefined}
              >
                <div className="nb-m-icon">{link.icon}</div>
                <span className="nb-m-link-text">{link.label}</span>
                <FiChevronRight size={14} className="nb-m-chevron" />
              </Link>
            )
          )}

          <Link to="/wishlist" className="nb-m-link" onClick={() => setMenuOpen(false)}>
            <div className="nb-m-icon">
              <FiHeart size={14} />
            </div>
            <span className="nb-m-link-text">Liste de souhaits</span>
            <FiChevronRight size={14} className="nb-m-chevron" />
          </Link>

          <div className="nb-m-section-label">Mon compte</div>

          {isAdmin ? (
            <>
              <Link to="/admin" className="nb-m-link" onClick={() => setMenuOpen(false)}>
                <div className="nb-m-icon">
                  <FaCrown size={13} />
                </div>
                <span className="nb-m-link-text">Dashboard</span>
                <span className="nb-m-tag">Admin</span>
              </Link>
              <button
                className="nb-m-link"
                onClick={handleLogout}
                style={{ color: "var(--nb-muted)" }}
              >
                <div className="nb-m-icon">
                  <FiLogOut size={14} />
                </div>
                <span className="nb-m-link-text">Déconnexion</span>
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              className="nb-m-link"
              onClick={() => setMenuOpen(false)}
              style={{ color: "var(--nb-coral)" }}
            >
              <div className="nb-m-icon">
                <FiUser size={14} />
              </div>
              <span className="nb-m-link-text">Espace Pro</span>
              <FiChevronRight size={14} className="nb-m-chevron" />
            </Link>
          )}

          <div className="nb-m-section-label">Aide & Infos</div>

          {[
            { label: "Livraison & Retours", to: "/livraison" },
            { label: "FAQ", to: "/faq" },
            { label: "Contact", to: "/contact" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="nb-m-link"
              onClick={() => setMenuOpen(false)}
            >
              <div className="nb-m-icon" style={{ background: "transparent" }} />
              <span className="nb-m-link-text" style={{ color: "var(--nb-muted)", fontSize: "0.84rem" }}>
                {label}
              </span>
              <FiChevronRight size={14} className="nb-m-chevron" />
            </Link>
          ))}
        </nav>

        <div className="nb-drawer-foot">
          <div className="nb-drawer-foot-cta">
            <a
              href="#collection"
              onClick={(e) => {
                scrollToCollection(e);
                setMenuOpen(false);
              }}
              className="nb-pill nb-pill-gold"
              style={{ flex: 1, justifyContent: "center", padding: "12px 16px" }}
            >
              Explorer la collection
            </a>
            <Link
              to="/cart"
              className="nb-pill nb-pill-ghost"
              style={{ padding: "12px 16px" }}
              onClick={() => setMenuOpen(false)}
              aria-label="Panier"
            >
              <FiShoppingCart size={16} />
              {cartCount > 0 && <span className="nb-m-tag">{cartCount}</span>}
            </Link>
          </div>

          <div className="nb-social-divider" />

          <div className="nb-social-row">
            <a href="#" className="nb-social-btn" aria-label="Instagram">
              <FiInstagram size={15} />
            </a>
            <a href="#" className="nb-social-btn" aria-label="TikTok">
              <RiTiktokLine size={15} />
            </a>
            <a href="#" className="nb-social-btn" aria-label="Facebook">
              <FiFacebook size={15} />
            </a>
          </div>

          <div className="nb-social-divider" />

          <div className="nb-foot-legal">
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </aside>
    </>
  );
}