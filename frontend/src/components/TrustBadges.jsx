import { FiShield, FiTruck, FiRefreshCw, FiPhoneCall } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const CSS = `
.tb-row { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; padding: 28px 32px; max-width: var(--container-max); margin: 0 auto; }
.tb-item { display: flex; align-items: center; gap: 10px; }
.tb-icon { width: 38px; height: 38px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tb-label { font-size: 0.76rem; font-weight: 600; color: var(--secondary); white-space: nowrap; }
.tb-sub { font-size: 0.64rem; color: var(--text-muted); white-space: nowrap; }

/* On narrow screens, four full items can't fit without wrapping onto
   several lines -- keep them on one row and let it scroll horizontally
   instead, which reads as one coherent trust strip rather than a
   staggered block. Scrollbar hidden since the row is short enough to
   swipe through at a glance. */
@media (max-width: 640px) {
  .tb-row {
    flex-wrap: nowrap; justify-content: flex-start; gap: 22px;
    padding: 18px 20px; overflow-x: auto; scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .tb-row::-webkit-scrollbar { display: none; }
  .tb-item { flex-shrink: 0; }
  .tb-icon { width: 32px; height: 32px; }
  .tb-label { font-size: 0.7rem; }
  .tb-sub { font-size: 0.6rem; }
}
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
