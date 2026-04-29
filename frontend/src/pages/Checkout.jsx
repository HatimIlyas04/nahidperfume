import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ─── Checkout Global Styles ──────────────────────────── */
const checkoutCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --ink:         #0E0E0C;
    --cream:       #FAF8F5;
    --sand:        #EDE9E1;
    --white:       #FFFFFF;
    --coral:       #EF776A;
    --coral-dark:  #D35F52;
    --gold:        #C9A96E;
    --gold-light:  #F0E2C4;
    --muted:       #7A7770;
    --border:      rgba(14,14,12,0.09);
    --border-focus:rgba(239,119,106,0.5);
    --sans:        'Poppins', sans-serif;
    --serif:       'Cormorant Garamond', Georgia, serif;
    --ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --r-lg:        18px;
    --r-xl:        26px;
  }

  /* ── Animations ── */
  @keyframes coFadeUp   { from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);} }
  @keyframes coSlideIn  { from{opacity:0;transform:translateX(-24px);} to{opacity:1;transform:translateX(0);} }
  @keyframes coSlideR   { from{opacity:0;transform:translateX(24px);} to{opacity:1;transform:translateX(0);} }
  @keyframes coPop      { from{opacity:0;transform:scale(0.8);} to{opacity:1;transform:scale(1);} }
  @keyframes coShimmer  { 0%{opacity:0.6;} 50%{opacity:1;} 100%{opacity:0.6;} }
  @keyframes coSpin     { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes coSuccess  { 0%{transform:scale(0);opacity:0;} 60%{transform:scale(1.15);} 100%{transform:scale(1);opacity:1;} }
  @keyframes coCheckmark{ to{stroke-dashoffset:0;} }
  @keyframes coFloat    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  @keyframes coPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);} 50%{box-shadow:0 0 0 10px rgba(239,119,106,0.12);} }
  @keyframes coBarFill  { from{width:0;} }
  @keyframes coItemIn   { from{opacity:0;transform:translateX(16px);} to{opacity:1;transform:translateX(0);} }
  @keyframes coBadgePop { from{transform:scale(0) rotate(-10deg);} to{transform:scale(1) rotate(0deg);} }

  /* ── Page ── */
  .co-page {
    background: var(--cream);
    min-height: 100vh;
    padding: clamp(40px, 7vw, 90px) 0 clamp(60px, 8vw, 120px);
    font-family: var(--sans);
    position: relative;
    overflow: hidden;
  }
  .co-page::before {
    content: '';
    position: absolute;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(239,119,106,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .co-page::after {
    content: '';
    position: absolute;
    bottom: -150px; left: -150px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Breadcrumb ── */
  .co-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 36px;
    animation: coFadeUp 0.5s var(--ease) both;
  }
  .co-breadcrumb a {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .co-breadcrumb a:hover { color: var(--coral); }
  .co-breadcrumb span { font-size: 0.72rem; color: var(--border); }
  .co-breadcrumb .active {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--coral);
  }

  /* ── Page Header ── */
  .co-header {
    margin-bottom: clamp(32px, 5vw, 52px);
    animation: coFadeUp 0.6s var(--ease) 0.05s both;
  }
  .co-header-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .co-header-eyebrow::before {
    content: '';
    display: block;
    width: 28px; height: 1px;
    background: var(--gold);
  }
  .co-title {
    font-family: var(--sans);
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 8px;
  }
  .co-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    color: var(--coral);
    font-size: 1.1em;
  }
  .co-subtitle {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.02em;
  }

  /* ── Steps Indicator ── */
  .co-steps {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: clamp(32px, 5vw, 52px);
    animation: coFadeUp 0.6s var(--ease) 0.1s both;
  }
  .co-step {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  .co-step-circle {
    width: 34px; height: 34px;
    border-radius: 50%;
    border: 2px solid var(--border);
    background: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--muted);
    transition: all 0.3s var(--ease-spring);
    flex-shrink: 0;
  }
  .co-step.done .co-step-circle {
    background: var(--coral);
    border-color: var(--coral);
    color: white;
  }
  .co-step.active .co-step-circle {
    background: var(--ink);
    border-color: var(--ink);
    color: white;
    animation: coPulse 2s ease infinite;
  }
  .co-step-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
  }
  .co-step.active .co-step-label { color: var(--ink); }
  .co-step.done .co-step-label { color: var(--coral); }
  .co-step-line {
    flex: 1;
    height: 2px;
    background: var(--border);
    margin: 0 16px;
    position: relative;
    overflow: hidden;
    border-radius: 1px;
  }
  .co-step-line.filled::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, var(--coral), var(--gold));
    animation: coBarFill 0.6s var(--ease) both;
  }

  /* ── Main Layout ── */
  .co-layout {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: clamp(20px, 3vw, 40px);
    align-items: start;
    position: relative;
    z-index: 1;
  }

  /* ── Form Panel ── */
  .co-form-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .co-card {
    background: var(--white);
    border-radius: var(--r-xl);
    border: 1px solid var(--border);
    overflow: hidden;
    transition: box-shadow 0.3s;
  }
  .co-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.06); }

  .co-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 22px 28px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(to right, var(--cream), white);
  }
  .co-card-icon {
    width: 38px; height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--coral), var(--coral-dark));
    color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(239,119,106,0.3);
  }
  .co-card-title {
    font-family: var(--sans);
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .co-card-sub {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted);
    margin-top: 1px;
  }
  .co-card-body { padding: 28px; }

  /* ── Form Fields ── */
  .co-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .co-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .co-field:last-child { margin-bottom: 0; }

  .co-label {
    font-family: var(--sans);
    font-size: 0.67rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .co-label span { color: var(--coral); margin-left: 2px; }

  .co-input-wrap { position: relative; }
  .co-input-icon {
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    font-size: 0.95rem;
    pointer-events: none;
    opacity: 0.5;
  }
  .co-input, .co-textarea {
    width: 100%;
    padding: 14px 16px 14px 42px;
    border: 1.5px solid var(--border);
    border-radius: 14px;
    font-family: var(--sans);
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--ink);
    background: var(--cream);
    outline: none;
    transition: border-color 0.2s var(--ease), background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    -webkit-appearance: none;
  }
  .co-input:focus, .co-textarea:focus {
    border-color: var(--coral);
    background: white;
    box-shadow: 0 0 0 4px rgba(239,119,106,0.1);
  }
  .co-input::placeholder, .co-textarea::placeholder {
    color: rgba(14,14,12,0.3);
    font-weight: 400;
  }
  .co-textarea {
    resize: vertical;
    min-height: 110px;
    padding-top: 14px;
    line-height: 1.6;
  }
  /* textarea icon at top */
  .co-textarea-wrap .co-input-icon { top: 18px; transform: none; }

  /* floating label effect */
  .co-input:not(:placeholder-shown) + .co-input-valid,
  .co-textarea:not(:placeholder-shown) + .co-input-valid {
    opacity: 1;
  }
  .co-input-valid {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    color: #2E7D32;
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  /* ── Secure Badge ── */
  .co-secure-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: linear-gradient(135deg, rgba(46,125,50,0.06), rgba(46,125,50,0.03));
    border: 1px solid rgba(46,125,50,0.15);
    border-radius: 12px;
    margin-bottom: 20px;
  }
  .co-secure-badge span:first-child { font-size: 1.1rem; }
  .co-secure-text {
    font-size: 0.72rem;
    font-weight: 600;
    color: #2E7D32;
    letter-spacing: 0.02em;
  }

  /* ── Submit Button ── */
  .co-submit {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, var(--coral) 0%, var(--coral-dark) 100%);
    color: white;
    border: none;
    border-radius: 999px;
    font-family: var(--sans);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s var(--ease-spring), box-shadow 0.2s;
    box-shadow: 0 8px 28px rgba(239,119,106,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
  }
  .co-submit::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .co-submit:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 16px 40px rgba(239,119,106,0.5);
  }
  .co-submit:hover::before { opacity: 1; }
  .co-submit:active:not(:disabled) { transform: scale(0.98); }
  .co-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  .co-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: coSpin 0.7s linear infinite;
  }

  /* ── Summary Panel ── */
  .co-summary-panel {
    position: sticky;
    top: 88px;
    animation: coSlideR 0.7s var(--ease) 0.2s both;
  }

  .co-summary-card {
    background: var(--white);
    border-radius: var(--r-xl);
    border: 1px solid var(--border);
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  }

  .co-summary-head {
    padding: 22px 26px 18px;
    border-bottom: 1px solid var(--border);
    background: var(--ink);
  }
  .co-summary-head-title {
    font-family: var(--sans);
    font-size: 0.82rem;
    font-weight: 800;
    color: white;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .co-summary-head-count {
    font-size: 0.68rem;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.06em;
  }

  /* Items list */
  .co-summary-items {
    padding: 16px 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 280px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }
  .co-summary-items::-webkit-scrollbar { width: 3px; }
  .co-summary-items::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .co-summary-item {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: coItemIn 0.3s var(--ease) both;
  }
  .co-si-img-wrap {
    position: relative;
    flex-shrink: 0;
    width: 50px; height: 50px;
  }
  .co-si-img {
    width: 50px; height: 50px;
    border-radius: 12px;
    object-fit: cover;
    background: var(--sand);
    display: block;
  }
  .co-si-qty {
    position: absolute;
    top: -5px; right: -5px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--coral);
    color: white;
    font-size: 0.6rem;
    font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    animation: coBadgePop 0.3s var(--ease-spring) both;
  }
  .co-si-info {
    flex: 1;
    min-width: 0;
  }
  .co-si-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.01em;
  }
  .co-si-cat {
    font-size: 0.62rem;
    font-weight: 600;
    color: var(--coral);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 2px;
  }
  .co-si-price {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--ink);
    flex-shrink: 0;
    letter-spacing: -0.01em;
  }

  /* Totals area */
  .co-totals {
    padding: 16px 26px 24px;
    border-top: 1px solid var(--border);
    background: var(--cream);
  }
  .co-totals-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .co-totals-label {
    font-size: 0.76rem;
    font-weight: 500;
    color: var(--muted);
  }
  .co-totals-val {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--ink);
  }
  .co-totals-val.free { color: #2E7D32; }
  .co-totals-hint {
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--coral);
    text-align: center;
    padding: 8px 0 2px;
    animation: coShimmer 2s ease infinite;
  }
  .co-totals-divider {
    height: 1px;
    background: var(--border);
    margin: 14px 0;
  }
  .co-grand-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }
  .co-grand-label {
    font-family: var(--sans);
    font-size: 0.8rem;
    font-weight: 900;
    color: var(--ink);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .co-grand-val {
    font-family: var(--serif);
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  /* Trust badges */
  .co-trust-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 16px 26px;
    border-top: 1px solid var(--border);
  }
  .co-trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: var(--white);
    border-radius: 10px;
    border: 1px solid var(--border);
  }
  .co-trust-item span:first-child { font-size: 0.9rem; flex-shrink: 0; }
  .co-trust-text {
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  /* ── Empty State ── */
  .co-empty {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px 32px;
    font-family: var(--sans);
    gap: 16px;
  }
  .co-empty-icon { font-size: 4rem; opacity: 0.2; animation: coFloat 3s ease-in-out infinite; }
  .co-empty-title {
    font-size: 1.4rem;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .co-empty-text { font-size: 0.85rem; color: var(--muted); line-height: 1.7; max-width: 300px; }

  /* ── Success State ── */
  .co-success {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px 32px;
    font-family: var(--sans);
    gap: 0;
    background: var(--cream);
    position: relative;
    overflow: hidden;
  }
  .co-success::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,125,50,0.06), transparent 70%);
    pointer-events: none;
  }
  .co-success-ring {
    position: relative;
    width: 100px; height: 100px;
    margin-bottom: 32px;
    animation: coSuccess 0.6s var(--ease-spring) both;
  }
  .co-success-ring svg {
    width: 100%; height: 100%;
    transform: rotate(-90deg);
  }
  .co-success-ring .ring-bg { fill: none; stroke: rgba(46,125,50,0.1); stroke-width: 3; }
  .co-success-ring .ring-fill {
    fill: none;
    stroke: #2E7D32;
    stroke-width: 3;
    stroke-dasharray: 283;
    stroke-dashoffset: 283;
    animation: coCheckmark 0.8s var(--ease) 0.3s forwards;
    stroke-linecap: round;
  }
  .co-success-check {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.4rem;
    animation: coPop 0.4s var(--ease-spring) 0.5s both;
  }
  .co-success-title {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    margin-bottom: 12px;
    animation: coFadeUp 0.5s var(--ease) 0.4s both;
    opacity: 0;
    animation-fill-mode: both;
  }
  .co-success-sub {
    font-size: 0.88rem;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.75;
    max-width: 380px;
    margin-bottom: 36px;
    animation: coFadeUp 0.5s var(--ease) 0.5s both;
    opacity: 0;
    animation-fill-mode: both;
  }
  .co-success-id {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.08em;
    margin-bottom: 32px;
    animation: coFadeUp 0.5s var(--ease) 0.6s both;
    opacity: 0;
    animation-fill-mode: both;
  }
  .co-success-id span { color: var(--coral); font-family: monospace; font-size: 0.8rem; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .co-layout { grid-template-columns: 1fr; }
    .co-summary-panel { position: static; order: -1; }
    .co-summary-items { max-height: 200px; }
  }
  @media (max-width: 640px) {
    .co-card-body { padding: 20px; }
    .co-row { grid-template-columns: 1fr; }
    .co-steps .co-step-label { display: none; }
    .co-trust-grid { grid-template-columns: 1fr; }
    .co-grand-val { font-size: 1.5rem; }
    .co-title { font-size: 1.8rem; }
  }
  @media (max-width: 400px) {
    .co-card-header { padding: 18px 20px; }
    .co-totals, .co-trust-grid, .co-summary-items { padding-left: 18px; padding-right: 18px; }
  }
`;

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const formRef  = useRef(null);

  const [formData, setFormData] = useState({
    customer_name:    "",
    customer_email:   "",
    customer_phone:   "",
    customer_address: "",
  });
  const [loading,    setLoading]    = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [localCart,  setLocalCart]  = useState([]);
  const [focusField, setFocusField] = useState(null);

  /* Inject styles */
  useEffect(() => {
    if (!document.getElementById("nahid-checkout-styles")) {
      const tag = document.createElement("style");
      tag.id = "nahid-checkout-styles";
      tag.textContent = checkoutCSS;
      document.head.appendChild(tag);
    }
  }, []);

  /* ── Same cart logic as original ── */
  useEffect(() => {
    let currentCart = cart;
    if (!currentCart || currentCart.length === 0) {
      const saved = localStorage.getItem("nahid_cart");
      if (saved) {
        try { currentCart = JSON.parse(saved); setLocalCart(currentCart); } catch {}
      }
    } else {
      setLocalCart(currentCart);
    }
  }, [cart]);

  const activeCart = localCart.length > 0 ? localCart : cart;
  const subtotal   = activeCart.reduce((sum, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return sum + price * (item.quantity || 1);
  }, 0);
  const shipping = subtotal >= 500 ? 0 : 30;
  const total    = subtotal + shipping;
  const fmt      = (n) => Math.round(n).toLocaleString("fr-MA");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCart = localCart.length > 0 ? localCart : cart;
    if (!finalCart || finalCart.length === 0) {
      alert("Votre panier est vide.");
      navigate("/");
      return;
    }
    setLoading(true);
    try {
      const items = finalCart.map((item) => ({
        id:       item.id,
        name:     item.name,
        quantity: item.quantity || 1,
        price:    typeof item.price === "string" ? parseFloat(item.price) : item.price,
      }));
      await axios.post("/api/orders", { ...formData, items, total_amount: total });
      setSuccess(true);
      clearCart();
      localStorage.removeItem("nahid_cart");
      setTimeout(() => navigate("/"), 5000);
    } catch (err) {
      alert("Erreur : " + (err.response?.data?.error || "Erreur serveur"));
    } finally {
      setLoading(false);
    }
  };

  /* ── Empty cart ── */
  if (activeCart.length === 0 && !success) {
    return (
      <div className="co-empty co-page">
        <div className="co-empty-icon">🛒</div>
        <h2 className="co-empty-title">Votre panier est vide</h2>
        <p className="co-empty-text">
          Découvrez notre sélection de parfums d'exception et trouvez votre signature olfactive.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop:"8px", padding:"15px 34px",
            background:"linear-gradient(135deg,#EF776A,#D35F52)",
            color:"white", border:"none", borderRadius:"999px",
            fontFamily:"var(--sans)", fontSize:"0.8rem", fontWeight:"800",
            letterSpacing:"0.1em", textTransform:"uppercase",
            cursor:"pointer", boxShadow:"0 8px 24px rgba(239,119,106,0.35)",
          }}
        >Découvrir nos parfums →</button>
      </div>
    );
  }

  /* ── Success ── */
  if (success) {
    const orderId = "NHD-" + Math.random().toString(36).substring(2,8).toUpperCase();
    return (
      <div className="co-success co-page">
        <div className="co-success-ring">
          <svg viewBox="0 0 100 100">
            <circle className="ring-bg" cx="50" cy="50" r="45" />
            <circle className="ring-fill" cx="50" cy="50" r="45" />
          </svg>
          <div className="co-success-check">✓</div>
        </div>
        <h2 className="co-success-title">Commande confirmée !</h2>
        <p className="co-success-sub">
          Merci pour votre commande. Vous recevrez une confirmation par email sous peu.
          Notre équipe prépare votre colis avec soin 🇲🇦
        </p>
        <div className="co-success-id">
          Référence commande : <span>{orderId}</span>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            padding:"15px 34px",
            background:"linear-gradient(135deg,#EF776A,#D35F52)",
            color:"white", border:"none", borderRadius:"999px",
            fontFamily:"var(--sans)", fontSize:"0.8rem", fontWeight:"800",
            letterSpacing:"0.1em", textTransform:"uppercase",
            cursor:"pointer", boxShadow:"0 8px 24px rgba(239,119,106,0.35)",
            animation:"coFadeUp 0.5s ease 0.7s both", opacity:0,
            animationFillMode:"both",
          }}
        >Retour à l'accueil →</button>
        <p style={{marginTop:"16px",fontSize:"0.7rem",color:"var(--muted)",animation:"coFadeUp 0.5s ease 0.8s both",opacity:0,animationFillMode:"both"}}>
          Redirection automatique dans 5 secondes…
        </p>
      </div>
    );
  }

  /* ── Main Checkout ── */
  return (
    <div className="co-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="co-breadcrumb">
          <a href="/">Accueil</a>
          <span>›</span>
          <a href="/">Panier</a>
          <span>›</span>
          <span className="active">Commande</span>
        </nav>

        {/* Header */}
        <div className="co-header">
          <div className="co-header-eyebrow">Finalisation</div>
          <h1 className="co-title">Votre <em>Commande</em></h1>
          <p className="co-subtitle">
            {activeCart.length} article{activeCart.length > 1 ? "s" : ""} · Livraison {shipping === 0 ? "offerte 🎉" : `${fmt(shipping)} MAD`}
          </p>
        </div>

        {/* Steps */}
        <div className="co-steps">
          <div className="co-step done">
            <div className="co-step-circle">✓</div>
            <span className="co-step-label">Panier</span>
          </div>
          <div className="co-step-line filled" />
          <div className="co-step active">
            <div className="co-step-circle">2</div>
            <span className="co-step-label">Livraison</span>
          </div>
          <div className="co-step-line" />
          <div className="co-step">
            <div className="co-step-circle">3</div>
            <span className="co-step-label">Confirmation</span>
          </div>
        </div>

        {/* Layout */}
        <div className="co-layout">

          {/* ── FORM ── */}
          <div className="co-form-panel">

            {/* Personal Info Card */}
            <div className="co-card" style={{animation:"coSlideIn 0.6s var(--ease) 0.1s both"}}>
              <div className="co-card-header">
                <div className="co-card-icon">👤</div>
                <div>
                  <div className="co-card-title">Informations personnelles</div>
                  <div className="co-card-sub">Vos coordonnées de contact</div>
                </div>
              </div>
              <div className="co-card-body">
                <div className="co-row">
                  <div className="co-field">
                    <label className="co-label">Nom complet <span>*</span></label>
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
                      />
                    </div>
                  </div>
                  <div className="co-field">
                    <label className="co-label">Adresse email <span>*</span></label>
                    <div className="co-input-wrap">
                      <span className="co-input-icon">✉️</span>
                      <input
                        className="co-input"
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleChange}
                        onFocus={() => setFocusField("email")}
                        onBlur={() => setFocusField(null)}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="co-field">
                  <label className="co-label">Téléphone <span>*</span></label>
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
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Card */}
            <div className="co-card" style={{animation:"coSlideIn 0.6s var(--ease) 0.2s both"}}>
              <div className="co-card-header">
                <div className="co-card-icon" style={{background:"linear-gradient(135deg,var(--gold),#B8922A)"}}>📦</div>
                <div>
                  <div className="co-card-title">Adresse de livraison</div>
                  <div className="co-card-sub">Livraison partout au Maroc en 24–48h</div>
                </div>
              </div>
              <div className="co-card-body">
                <div className="co-field">
                  <label className="co-label">Adresse complète <span>*</span></label>
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
                      placeholder="Numéro, rue, quartier, ville, code postal…"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Delivery info chips */}
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"8px"}}>
                  {["🚚 Livraison 24–48h","📍 Tout le Maroc","📦 Suivi en temps réel"].map(t => (
                    <span key={t} style={{
                      display:"inline-flex",alignItems:"center",gap:"4px",
                      background:"var(--cream)",border:"1px solid var(--border)",
                      borderRadius:"999px",padding:"5px 12px",
                      fontSize:"0.65rem",fontWeight:"700",color:"var(--muted)",
                      letterSpacing:"0.04em",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Card (visual only - COD) */}
            <div className="co-card" style={{animation:"coSlideIn 0.6s var(--ease) 0.3s both"}}>
              <div className="co-card-header">
                <div className="co-card-icon" style={{background:"linear-gradient(135deg,#2E7D32,#1B5E20)"}}>💳</div>
                <div>
                  <div className="co-card-title">Paiement</div>
                  <div className="co-card-sub">Paiement à la livraison — 100% sécurisé</div>
                </div>
              </div>
              <div className="co-card-body">
                <div style={{
                  display:"flex",alignItems:"center",gap:"14px",
                  padding:"16px 18px",
                  background:"linear-gradient(135deg,rgba(46,125,50,0.07),rgba(46,125,50,0.03))",
                  border:"1.5px solid rgba(46,125,50,0.18)",
                  borderRadius:"14px",
                }}>
                  <span style={{fontSize:"1.6rem"}}>💵</span>
                  <div>
                    <div style={{fontSize:"0.82rem",fontWeight:"800",color:"#2E7D32",marginBottom:"3px"}}>
                      Paiement à la livraison
                    </div>
                    <div style={{fontSize:"0.72rem",fontWeight:"500",color:"var(--muted)",lineHeight:"1.5"}}>
                      Payez en cash à la réception de votre colis. Aucune information bancaire requise.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{animation:"coSlideIn 0.6s var(--ease) 0.4s both"}}>
              <div className="co-secure-badge">
                <span>🔒</span>
                <span className="co-secure-text">
                  Vos données sont protégées par un chiffrement SSL 256-bit
                </span>
              </div>
              <form onSubmit={handleSubmit} ref={formRef}>
                <button
                  type="submit"
                  className="co-submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <><div className="co-spinner" /> Traitement en cours…</>
                  ) : (
                    <>Confirmer la commande — {fmt(total)} MAD →</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── SUMMARY PANEL ── */}
          <aside className="co-summary-panel">
            <div className="co-summary-card">

              {/* Dark header */}
              <div className="co-summary-head">
                <div className="co-summary-head-title">Récapitulatif</div>
                <div className="co-summary-head-count">
                  {activeCart.length} article{activeCart.length > 1 ? "s" : ""}
                </div>
              </div>

              {/* Items */}
              <div className="co-summary-items">
                {activeCart.map((item, i) => {
                  const p = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                  const q = item.quantity || 1;
                  return (
                    <div
                      key={item.id}
                      className="co-summary-item"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div className="co-si-img-wrap">
                        <img className="co-si-img" src={item.image_url} alt={item.name} loading="lazy" />
                        <span className="co-si-qty">{q}</span>
                      </div>
                      <div className="co-si-info">
                        <div className="co-si-name">{item.name}</div>
                        {item.category && <div className="co-si-cat">{item.category}</div>}
                      </div>
                      <span className="co-si-price">{fmt(p * q)} MAD</span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="co-totals">
                <div className="co-totals-row">
                  <span className="co-totals-label">Sous-total</span>
                  <span className="co-totals-val">{fmt(subtotal)} MAD</span>
                </div>
                <div className="co-totals-row">
                  <span className="co-totals-label">Livraison</span>
                  <span className={`co-totals-val${shipping === 0 ? " free" : ""}`}>
                    {shipping === 0 ? "🎉 Gratuite" : `${fmt(shipping)} MAD`}
                  </span>
                </div>
                {subtotal > 0 && subtotal < 500 && (
                  <p className="co-totals-hint">
                    + {fmt(500 - subtotal)} MAD pour la livraison gratuite
                  </p>
                )}
                <div className="co-totals-divider" />
                <div className="co-grand-row">
                  <span className="co-grand-label">Total</span>
                  <span className="co-grand-val">{fmt(total)} MAD</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="co-trust-grid">
                {[
                  { icon:"🔒", text:"Paiement sécurisé" },
                  { icon:"🚚", text:"Livraison 24–48h" },
                  { icon:"↩️", text:"Retours 30 jours" },
                  { icon:"⭐", text:"4.9/5 — 2400 avis" },
                ].map(({ icon, text }) => (
                  <div className="co-trust-item" key={text}>
                    <span>{icon}</span>
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