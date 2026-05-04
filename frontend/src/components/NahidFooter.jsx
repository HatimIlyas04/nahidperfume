const FOOTER_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --gold:    #C9A96E;
  --gold-l:  #E8D5A8;
  --coral:   #EF776A;
  --coral-d: #D45F53;
  --serif:   'Cormorant Garamond', Georgia, serif;
  --sans:    'DM Sans', sans-serif;
  --border:  rgba(255,255,255,0.07);
}

.nahid-footer {
  background: linear-gradient(160deg, #2A2018 0%, #1C1710 50%, #130E09 100%);
  padding: clamp(56px,9vw,96px) 0 0;
  color: rgba(255,255,255,0.38);
  font-family: var(--sans);
  position: relative;
  overflow: hidden;
}

.nahid-footer::before {
  content: '✦';
  position: absolute;
  right: 5%;
  top: 8%;
  font-size: 200px;
  color: rgba(201,169,110,0.04);
  font-family: var(--serif);
  pointer-events: none;
  line-height: 1;
}

.nf-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(20px,5vw,80px);
}

.nf-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 52px;
  margin-bottom: 60px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.nf-brand {}

.nf-logo {
  font-family: var(--serif);
  font-size: 2rem;
  font-weight: 500;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
  display: block;
  text-decoration: none;
}

.nf-logo-dot { color: var(--gold); }

.nf-logo-sub {
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  display: block;
  margin-bottom: 20px;
}

.nf-tagline {
  font-size: 0.82rem;
  line-height: 1.82;
  color: rgba(255,255,255,0.26);
  margin-bottom: 28px;
  max-width: 260px;
}

.nf-social {
  display: flex;
  gap: 9px;
}

.nf-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  position: relative;
  overflow: hidden;
}

.nf-social-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.nf-social-btn:hover {
  transform: translateY(-3px) scale(1.1);
}

.nf-social-btn.ig:hover { border-color: #E1306C; color: #E1306C; background: rgba(225,48,108,0.1); }
.nf-social-btn.fb:hover { border-color: #1877F2; color: #1877F2; background: rgba(24,119,242,0.1); }
.nf-social-btn.wa:hover { border-color: #25D366; color: #25D366; background: rgba(37,211,102,0.1); }
.nf-social-btn.tk:hover { border-color: #ff0050; color: #ff0050; background: rgba(255,0,80,0.08); }

.nf-col-title {
  color: white;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nf-col-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(201,169,110,0.3), transparent);
}

.nf-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.26);
  text-decoration: none;
  margin-bottom: 13px;
  transition: color 0.2s, padding-left 0.2s;
}

.nf-link::before {
  content: '›';
  color: var(--coral);
  font-size: 0.9rem;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s, transform 0.2s;
}

.nf-link:hover {
  color: rgba(255,255,255,0.85);
  padding-left: 4px;
}

.nf-link:hover::before {
  opacity: 1;
  transform: none;
}

.nf-newsletter-desc {
  font-size: 0.8rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.24);
  margin-bottom: 20px;
}

.nf-email-wrap {
  display: flex;
  gap: 8px;
}

.nf-email-input {
  flex: 1;
  min-width: 0;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 14px;
  padding: 13px 18px;
  font-family: var(--sans);
  font-size: 0.8rem;
  color: white;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.nf-email-input::placeholder { color: rgba(255,255,255,0.18); }

.nf-email-input:focus {
  border-color: rgba(201,169,110,0.5);
  background: rgba(255,255,255,0.08);
}

.nf-email-btn {
  background: linear-gradient(135deg, var(--coral), var(--coral-d));
  color: white;
  border: none;
  border-radius: 14px;
  padding: 13px 22px;
  font-family: var(--sans);
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 18px rgba(239,119,106,0.35);
}

.nf-email-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(239,119,106,0.5);
}

.nf-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px 0;
  flex-wrap: wrap;
  gap: 16px;
}

.nf-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nf-copy {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.15);
}

.nf-credit {
  font-size: 0.66rem;
  color: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 5px;
}

.nf-credit-heart {
  color: var(--coral);
  font-size: 0.72rem;
}

.nf-credit-link {
  color: var(--gold);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.nf-credit-link:hover { color: rgba(201,169,110,0.75); }

.nf-bottom-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.nf-bottom-link {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.16);
  text-decoration: none;
  transition: color 0.2s;
}

.nf-bottom-link:hover { color: rgba(255,255,255,0.55); }

.nf-divider-bar {
  height: 3px;
  background: linear-gradient(90deg, var(--coral), var(--gold), transparent);
  margin-top: 0;
}

@media (max-width: 1100px) {
  .nf-top { grid-template-columns: 1fr 1fr; gap: 44px; }
}

@media (max-width: 640px) {
  .nf-top { grid-template-columns: 1fr; gap: 36px; }
  .nf-tagline { max-width: 100%; }
  .nf-bottom-bar { flex-direction: column; align-items: flex-start; gap: 12px; }
  .nf-bottom-links { gap: 16px; }
}
`;

function injectFooterCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-footer-css")) {
    const s = document.createElement("style");
    s.id = "nahid-footer-css";
    s.textContent = FOOTER_CSS;
    document.head.appendChild(s);
  }
}

const NahidFooter = () => {
  injectFooterCSS();

  const DISCOVER = ["Nos Parfums", "Notre Histoire", "Originals", "Best-Sellers", "Gift Sets"];
  const HELP     = ["Contact", "FAQ", "Livraison & Retours", "Suivi commande", "Mentions légales"];
  const LEGAL    = ["Mentions légales", "Confidentialité", "CGV"];

  return (
    <footer className="nahid-footer">
      <div className="nf-container">
        <div className="nf-top">

          <div className="nf-brand">
            <a href="/" className="nf-logo">
              Nahid<span className="nf-logo-dot">·</span>Perfume
            </a>
            <span className="nf-logo-sub">Maison de Parfums · Casablanca</span>
            <p className="nf-tagline">
              L'art de la parfumerie marocaine, composé avec passion depuis le cœur de Casablanca.
            </p>
            <div className="nf-social">
              <a href="https://www.instagram.com/ilyas_hatim_10/" target="_blank" rel="noopener" className="nf-social-btn ig" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" className="nf-social-btn fb" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="nf-social-btn wa" aria-label="WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  <path d="M12 2C6.486 2 2 6.486 2 12c0 1.89.522 3.66 1.427 5.18L2 22l4.949-1.397A9.948 9.948 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2"/>
                </svg>
              </a>
              <a href="#" className="nf-social-btn tk" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.07a8.16 8.16 0 0 0 4.77 1.52V7.15a4.85 4.85 0 0 1-1-.46z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="nf-col-title">Découvrir</h4>
            {DISCOVER.map(l => <a key={l} href="#" className="nf-link">{l}</a>)}
          </div>

          <div>
            <h4 className="nf-col-title">Aide</h4>
            {HELP.map(l => <a key={l} href="#" className="nf-link">{l}</a>)}
          </div>

          <div>
            <h4 className="nf-col-title">Newsletter</h4>
            <p className="nf-newsletter-desc">
              Nouvelles fragrances et offres exclusives réservées à nos abonnés.
            </p>
            <div className="nf-email-wrap">
              <input className="nf-email-input" type="email" placeholder="votre@email.com" />
              <button className="nf-email-btn">S'inscrire</button>
            </div>
          </div>
        </div>

        <div className="nf-bottom-bar">
          <div className="nf-bottom-left">
            <span className="nf-copy">© 2026 Nahid Perfume · Casablanca, Maroc</span>
            <span className="nf-credit">
              <span className="nf-credit-heart">♥</span>
              Créé par{" "}
              <a href="https://www.instagram.com/ilyas_hatim_10/" target="_blank" rel="noopener" className="nf-credit-link">
                Hatim Ilyas Viti
              </a>
            </span>
          </div>
          <div className="nf-bottom-links">
            {LEGAL.map(l => <a key={l} href="#" className="nf-bottom-link">{l}</a>)}
          </div>
        </div>
      </div>
      <div className="nf-divider-bar" />
    </footer>
  );
};

export default NahidFooter;