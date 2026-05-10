const FOOTER_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --nf-gold:    #C9A96E;
  --nf-gold-l:  #E8D5A8;
  --nf-gold-d:  #A07840;
  --nf-coral:   #EF776A;
  --nf-coral-d: #D45F53;
  --nf-serif:   'Cormorant Garamond', Georgia, serif;
  --nf-sans:    'DM Sans', sans-serif;
}

/* ─── WRAPPER ─────────────────────────────────────────────────── */
.nahid-footer {
  background: linear-gradient(175deg, #221A12 0%, #19130C 40%, #100D08 100%);
  color: rgba(255,255,255,0.38);
  font-family: var(--nf-sans);
  position: relative;
  overflow: hidden;
}

/* Decorative ambient orbs */
.nahid-footer::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,169,110,0.045) 0%, transparent 70%);
  top: -180px;
  right: -180px;
  pointer-events: none;
}
.nahid-footer::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(239,119,106,0.03) 0%, transparent 70%);
  bottom: 60px;
  left: -100px;
  pointer-events: none;
}

.nf-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 80px);
  position: relative;
  z-index: 1;
}

/* ─── HERO QUOTE SECTION ──────────────────────────────────────── */
.nf-hero {
  text-align: center;
  padding: clamp(56px, 8vw, 88px) 0 clamp(40px, 6vw, 64px);
  position: relative;
}

.nf-hero-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 28px;
}

.nf-hero-ornament-line {
  height: 1px;
  width: clamp(40px, 8vw, 100px);
  background: linear-gradient(90deg, transparent, rgba(201,169,110,0.5));
}
.nf-hero-ornament-line:last-child {
  background: linear-gradient(270deg, transparent, rgba(201,169,110,0.5));
}

.nf-hero-ornament-icon {
  color: var(--nf-gold);
  font-size: 1.1rem;
  letter-spacing: 8px;
  opacity: 0.7;
}

.nf-hero-quote {
  font-family: var(--nf-serif);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 400;
  font-style: italic;
  color: rgba(255,255,255,0.82);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 16px;
}

.nf-hero-quote em {
  color: var(--nf-gold);
  font-style: normal;
}

.nf-hero-sub {
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.22);
}

/* ─── DIVIDER ─────────────────────────────────────────────────── */
.nf-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,169,110,0.2), rgba(239,119,106,0.15), transparent);
  margin-bottom: clamp(40px, 6vw, 64px);
}

/* ─── MAIN GRID ───────────────────────────────────────────────── */
.nf-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr 1fr 1.6fr;
  gap: clamp(32px, 4vw, 60px);
  margin-bottom: clamp(40px, 6vw, 64px);
}

/* Brand column */
.nf-brand-logo {
  font-family: var(--nf-serif);
  font-size: 1.85rem;
  font-weight: 500;
  color: white;
  letter-spacing: -0.02em;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  transition: color 0.2s;
}
.nf-brand-logo:hover { color: var(--nf-gold); }
.nf-brand-logo-dot { color: var(--nf-gold); }

.nf-brand-sub {
  font-size: 0.56rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.18);
  display: block;
  margin-bottom: 22px;
}

.nf-brand-desc {
  font-size: 0.82rem;
  line-height: 1.85;
  color: rgba(255,255,255,0.26);
  margin-bottom: 28px;
  max-width: 270px;
}

/* Social icons */
.nf-social {
  display: flex;
  gap: 10px;
}

.nf-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
              border-color 0.25s, color 0.25s, background 0.25s, box-shadow 0.25s;
  position: relative;
}

.nf-social-btn:hover {
  transform: translateY(-4px) scale(1.1);
}

.nf-social-btn.ig:hover {
  border-color: #E1306C; color: #E1306C;
  background: rgba(225,48,108,0.1);
  box-shadow: 0 6px 20px rgba(225,48,108,0.25);
}
.nf-social-btn.fb:hover {
  border-color: #1877F2; color: #1877F2;
  background: rgba(24,119,242,0.1);
  box-shadow: 0 6px 20px rgba(24,119,242,0.25);
}
.nf-social-btn.tk:hover {
  border-color: #ff0050; color: #ff0050;
  background: rgba(255,0,80,0.08);
  box-shadow: 0 6px 20px rgba(255,0,80,0.2);
}
.nf-social-btn.wa:hover {
  border-color: #25D366; color: #25D366;
  background: rgba(37,211,102,0.1);
  box-shadow: 0 6px 20px rgba(37,211,102,0.25);
}

/* Column titles */
.nf-col-title {
  color: rgba(255,255,255,0.9);
  font-size: 0.59rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.nf-col-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(201,169,110,0.25), transparent);
}

/* Nav links */
.nf-link {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.27);
  text-decoration: none;
  margin-bottom: 14px;
  transition: color 0.2s, padding-left 0.25s;
  position: relative;
}
.nf-link::before {
  content: '›';
  color: var(--nf-coral);
  font-size: 0.9rem;
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity 0.2s, transform 0.2s;
  line-height: 1;
}
.nf-link:hover {
  color: rgba(255,255,255,0.82);
  padding-left: 5px;
}
.nf-link:hover::before {
  opacity: 1;
  transform: none;
}

/* Contact column */
.nf-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 0.81rem;
  color: rgba(255,255,255,0.27);
  text-decoration: none;
  transition: color 0.2s;
}
.nf-contact-item:hover { color: rgba(255,255,255,0.72); }

.nf-contact-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid rgba(255,255,255,0.09);
  background: rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--nf-gold);
  transition: background 0.2s, border-color 0.2s;
}
.nf-contact-item:hover .nf-contact-icon {
  background: rgba(201,169,110,0.1);
  border-color: rgba(201,169,110,0.3);
}

.nf-contact-text strong {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.05em;
  margin-bottom: 2px;
  text-transform: uppercase;
}

/* ─── NEWSLETTER STRIP ────────────────────────────────────────── */
.nf-newsletter {
  background: rgba(255,255,255,0.028);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: clamp(28px, 4vw, 40px) clamp(24px, 4vw, 48px);
  margin-bottom: clamp(40px, 5vw, 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.nf-newsletter-text h4 {
  font-family: var(--nf-serif);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 400;
  font-style: italic;
  color: rgba(255,255,255,0.82);
  margin: 0 0 6px;
}

.nf-newsletter-text p {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.24);
  margin: 0;
  line-height: 1.6;
}

.nf-newsletter-form {
  display: flex;
  gap: 10px;
  flex: 1;
  min-width: 260px;
  max-width: 420px;
}

.nf-email-input {
  flex: 1;
  min-width: 0;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 14px 20px;
  font-family: var(--nf-sans);
  font-size: 0.82rem;
  color: white;
  outline: none;
  transition: border-color 0.25s, background 0.25s;
}
.nf-email-input::placeholder { color: rgba(255,255,255,0.2); }
.nf-email-input:focus {
  border-color: rgba(201,169,110,0.45);
  background: rgba(255,255,255,0.07);
}

.nf-email-btn {
  background: linear-gradient(135deg, var(--nf-coral), var(--nf-coral-d));
  color: white;
  border: none;
  border-radius: 14px;
  padding: 14px 24px;
  font-family: var(--nf-sans);
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(239,119,106,0.4);
  letter-spacing: 0.04em;
}
.nf-email-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(239,119,106,0.55);
}

/* ─── BOTTOM BAR ──────────────────────────────────────────────── */
.nf-separator {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin-bottom: 28px;
}

.nf-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.nf-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nf-copy {
  font-size: 0.69rem;
  color: rgba(255,255,255,0.17);
}

.nf-credit {
  font-size: 0.67rem;
  color: rgba(255,255,255,0.22);
  display: flex;
  align-items: center;
  gap: 5px;
}
.nf-credit-heart { color: var(--nf-coral); font-size: 0.75rem; }
.nf-credit-link {
  color: var(--nf-gold);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.nf-credit-link:hover { color: rgba(201,169,110,0.7); }

.nf-bottom-right {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.nf-legal-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.nf-legal-link {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.16);
  text-decoration: none;
  transition: color 0.2s;
}
.nf-legal-link:hover { color: rgba(255,255,255,0.52); }

.nf-payment-tag {
  font-size: 0.62rem;
  color: rgba(255,255,255,0.14);
  letter-spacing: 0.06em;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  padding: 4px 10px;
}

/* ─── ACCENT BAR ──────────────────────────────────────────────── */
.nf-accent-bar {
  height: 3px;
  background: linear-gradient(90deg, var(--nf-coral), var(--nf-gold), var(--nf-gold-l), transparent);
}

/* ─── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 1080px) {
  .nf-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .nf-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .nf-brand-desc { max-width: 100%; }
  .nf-newsletter { flex-direction: column; align-items: flex-start; gap: 24px; }
  .nf-newsletter-form { max-width: 100%; width: 100%; }
  .nf-bottom { flex-direction: column; align-items: flex-start; }
  .nf-bottom-right { flex-direction: column; align-items: flex-start; gap: 14px; }
  .nf-hero-quote { font-size: 1.65rem; }
}
`;

function injectFooterCSS() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('nahid-footer-css')) {
    const s = document.createElement('style');
    s.id = 'nahid-footer-css';
    s.textContent = FOOTER_CSS;
    document.head.appendChild(s);
  }
}

const DISCOVER_LINKS = [
  { label: 'Nos Parfums',    href: '/catalogue' },
  { label: 'Notre Histoire', href: '/notre-histoire' },
  { label: 'Originals',      href: '/originals' },
  { label: 'Collection Femme', href: '/collection/femme' },
  { label: 'Collection Homme', href: '/collection/homme' },
];

const HELP_LINKS = [
  { label: 'FAQ',                href: '#' },
  { label: 'Livraison & Retours', href: '#' },
  { label: 'Suivi commande',     href: '#' },
  { label: 'Mentions légales',   href: '#' },
  { label: 'Confidentialité',    href: '#' },
];

const LEGAL_LINKS = ['Mentions légales', 'Confidentialité', 'CGV'];

const NahidFooter = () => {
  injectFooterCSS();

  return (
    <footer className="nahid-footer">

      {/* ── HERO QUOTE ─────────────────────────────────────── */}
      <div className="nf-container">
        <div className="nf-hero">
          <div className="nf-hero-ornament">
            <span className="nf-hero-ornament-line" />
            <span className="nf-hero-ornament-icon">✦ ✦ ✦</span>
            <span className="nf-hero-ornament-line" />
          </div>
          <h2 className="nf-hero-quote">
            L'art du parfum, né au cœur de <em>Casablanca</em>
          </h2>
          <span className="nf-hero-sub">Maison de Parfums · Depuis 2020</span>
        </div>

        <div className="nf-divider" />

        {/* ── MAIN GRID ───────────────────────────────────── */}
        <div className="nf-grid">

          {/* Brand */}
          <div className="nf-brand">
            <a href="/" className="nf-brand-logo">
              Nahid<span className="nf-brand-logo-dot">·</span>Perfume
            </a>
            <span className="nf-brand-sub">Maison de Parfums · Casablanca</span>
            <p className="nf-brand-desc">
              La parfumerie marocaine réinventée — des compositions uniques qui
              capturent l'âme de l'Orient avec une élégance contemporaine.
            </p>
            <div className="nf-social">
              <a href="https://www.instagram.com/nahidperfumes" target="_blank" rel="noopener" className="nf-social-btn ig" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/nahidperfumes" target="_blank" rel="noopener" className="nf-social-btn fb" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@nahid.perfumes" target="_blank" rel="noopener" className="nf-social-btn tk" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.07a8.16 8.16 0 0 0 4.77 1.52V7.15a4.85 4.85 0 0 1-1-.46z"/>
                </svg>
              </a>
              <a href="https://wa.me/212636550058" target="_blank" rel="noopener" className="nf-social-btn wa" aria-label="WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.486 2 2 6.486 2 12c0 1.89.522 3.66 1.427 5.18L2 22l4.949-1.397A9.948 9.948 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="nf-col-title">Découvrir</h4>
            {DISCOVER_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="nf-link">{label}</a>
            ))}
          </div>

          {/* Help */}
          <div>
            <h4 className="nf-col-title">Aide</h4>
            {HELP_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="nf-link">{label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="nf-col-title">Contact</h4>

            <a href="https://wa.me/212636550058" target="_blank" rel="noopener" className="nf-contact-item">
              <span className="nf-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.486 2 2 6.486 2 12c0 1.89.522 3.66 1.427 5.18L2 22l4.949-1.397A9.948 9.948 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2"/>
                </svg>
              </span>
              <span className="nf-contact-text">
                <strong>WhatsApp</strong>
                +212 636-550058
              </span>
            </a>

            <a href="mailto:contact@nahidperfume.ma" className="nf-contact-item">
              <span className="nf-contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <span className="nf-contact-text">
                <strong>Email</strong>
                contact@nahidperfume.ma
              </span>
            </a>

            <div className="nf-contact-item">
              <span className="nf-contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span className="nf-contact-text">
                <strong>Adresse</strong>
                Casablanca, Maroc
              </span>
            </div>
          </div>
        </div>

        {/* ── NEWSLETTER ──────────────────────────────────── */}
        <div className="nf-newsletter">
          <div className="nf-newsletter-text">
            <h4>Offres exclusives &amp; nouveautés</h4>
            <p>Inscrivez-vous pour recevoir nos lancements en avant-première.</p>
          </div>
          <div className="nf-newsletter-form">
            <input className="nf-email-input" type="email" placeholder="votre@email.com" />
            <button className="nf-email-btn">S'inscrire</button>
          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────── */}
        <div className="nf-separator" />
        <div className="nf-bottom">
          <div className="nf-bottom-left">
            <span className="nf-copy">© 2026 Nahid Perfume · Casablanca, Maroc · Tous droits réservés</span>
            <span className="nf-credit">
              <span className="nf-credit-heart">♥</span>
              Créé par{' '}
              <a href="https://www.instagram.com/ilyas_hatim_10/" target="_blank" rel="noopener" className="nf-credit-link">
                Hatim Ilyas Viti
              </a>
            </span>
          </div>
          <div className="nf-bottom-right">
            <div className="nf-legal-links">
              {LEGAL_LINKS.map(l => (
                <a key={l} href="#" className="nf-legal-link">{l}</a>
              ))}
            </div>
            <span className="nf-payment-tag">Paiement sécurisé</span>
          </div>
        </div>
      </div>

      <div className="nf-accent-bar" />
    </footer>
  );
};

export default NahidFooter;
