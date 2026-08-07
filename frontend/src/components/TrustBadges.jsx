import { FiShield, FiTruck, FiRefreshCw, FiPhoneCall } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const CSS = `
.tb-row { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; padding: 28px 32px; max-width: var(--container-max); margin: 0 auto; }
.tb-item { display: flex; align-items: center; gap: 10px; }
.tb-icon { width: 38px; height: 38px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tb-label { font-size: 0.76rem; font-weight: 600; color: var(--secondary); }
.tb-sub { font-size: 0.64rem; color: var(--text-muted); }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-trust-badges-css")) {
    const s = document.createElement("style");
    s.id = "nahid-trust-badges-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

const BADGE_ICONS = [FiShield, FiTruck, FiRefreshCw, FiPhoneCall];

export default function TrustBadges() {
  injectCSS();
  const { t } = useLanguage();
  const items = t("trustBadges.items");
  return (
    <div className="tb-row">
      {Array.isArray(items) && items.map((b, i) => {
        const Icon = BADGE_ICONS[i];
        return (
          <div className="tb-item" key={b.label}>
            <div className="tb-icon"><Icon size={16} /></div>
            <div>
              <div className="tb-label">{b.label}</div>
              <div className="tb-sub">{b.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
