const WA_CSS = `
@keyframes wa-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
  70%  { box-shadow: 0 0 0 20px rgba(37,211,102,0); }
  100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
}

@keyframes wa-entrance {
  0%   { transform: translateX(90px) scale(0.5); opacity: 0; }
  100% { transform: translateX(0) scale(1); opacity: 1; }
}

.wa-fab-wrap {
  position: fixed;
  bottom: 28px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: wa-entrance 0.65s cubic-bezier(0.34,1.56,0.64,1) 1.2s both;
}

.wa-fab-tooltip {
  background: #161210;
  color: rgba(255,255,255,0.9);
  font-size: 0.76rem;
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, sans-serif;
  padding: 10px 16px;
  border-radius: 10px;
  white-space: nowrap;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  border: 1px solid rgba(255,255,255,0.1);
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.22s ease, transform 0.22s ease;
  pointer-events: none;
  position: relative;
}

.wa-fab-tooltip::after {
  content: '';
  position: absolute;
  right: -7px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid #161210;
}

.wa-fab-wrap:hover .wa-fab-tooltip {
  opacity: 1;
  transform: translateX(0);
}

.wa-fab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(145deg, #2ecc71, #128C7E);
  color: #fff;
  text-decoration: none;
  box-shadow: 0 6px 28px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.2);
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
  animation: wa-pulse 2.8s ease-out infinite;
  flex-shrink: 0;
}

.wa-fab-btn:hover {
  transform: scale(1.13) translateY(-3px);
  box-shadow: 0 14px 44px rgba(37,211,102,0.65), 0 4px 16px rgba(0,0,0,0.25);
  animation: none;
}

.wa-fab-btn svg {
  width: 30px;
  height: 30px;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.25));
}

@media (max-width: 640px) {
  .wa-fab-wrap {
    bottom: 20px;
    right: 16px;
  }
  .wa-fab-btn {
    width: 54px;
    height: 54px;
  }
  .wa-fab-btn svg {
    width: 27px;
    height: 27px;
  }
  .wa-fab-tooltip {
    display: none;
  }
}
`;

function injectWACSS() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('wa-fab-css')) {
    const s = document.createElement('style');
    s.id = 'wa-fab-css';
    s.textContent = WA_CSS;
    document.head.appendChild(s);
  }
}

const WhatsAppButton = () => {
  injectWACSS();
  return (
    <div className="wa-fab-wrap">
      <span className="wa-fab-tooltip">Contactez-nous sur WhatsApp</span>
      <a
        href="https://wa.me/212636550058"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab-btn"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741 1.001.998-3.721-.236-.374a9.905 9.905 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
