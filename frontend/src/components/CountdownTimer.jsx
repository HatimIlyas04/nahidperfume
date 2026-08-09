import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const CSS = `
.cd-bar {
  background: var(--secondary); color: white; text-align: center;
  padding: 10px 16px; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;
  font-size: 0.82rem; font-weight: 600;
}
.cd-units { display: flex; gap: 8px; }
.cd-unit { background: var(--primary); border-radius: 8px; padding: 3px 9px; font-family: var(--font-display); font-weight: 700; font-size: 0.95rem; min-width: 34px; text-align: center; }

.cd-compact { display: flex; align-items: center; gap: 6px; flex-shrink: 0; padding-block: 0; padding-inline-start: 12px; padding-inline-end: 16px; }
.cd-compact-label { font-size: 0.59rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.88); white-space: nowrap; }
.cd-compact-units { display: flex; gap: 4px; }
.cd-compact-unit { background: rgba(0,0,0,0.18); border-radius: 5px; padding: 1px 6px; font-weight: 700; font-size: 0.68rem; min-width: 26px; text-align: center; color: white; }
@media (max-width: 600px) { .cd-compact-label { display: none; } }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-countdown-css")) {
    const s = document.createElement("style");
    s.id = "nahid-countdown-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

function getRemaining(endAt) {
  const diff = new Date(endAt).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

/** Real countdown to an admin-set end datetime — never a fake looping timer. */
export default function CountdownTimer({ endAt, label, compact = false }) {
  injectCSS();
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(() => getRemaining(endAt));

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining(endAt)), 1000);
    return () => clearInterval(interval);
  }, [endAt]);

  if (!remaining) return null;

  const pad = (n) => String(n).padStart(2, "0");

  if (compact) {
    return (
      <div className="cd-compact">
        <FiClock size={11} color="rgba(255,255,255,0.88)" />
        <span className="cd-compact-label">{label || t("countdown.defaultLabel")}</span>
        <div className="cd-compact-units">
          {remaining.d > 0 && <span className="cd-compact-unit">{remaining.d}j</span>}
          <span className="cd-compact-unit">{pad(remaining.h)}h</span>
          <span className="cd-compact-unit">{pad(remaining.m)}m</span>
          <span className="cd-compact-unit">{pad(remaining.s)}s</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cd-bar">
      <FiClock size={14} />
      <span>{label || t("countdown.defaultLabel")}</span>
      <div className="cd-units">
        {remaining.d > 0 && <span className="cd-unit">{remaining.d}j</span>}
        <span className="cd-unit">{pad(remaining.h)}h</span>
        <span className="cd-unit">{pad(remaining.m)}m</span>
        <span className="cd-unit">{pad(remaining.s)}s</span>
      </div>
    </div>
  );
}
