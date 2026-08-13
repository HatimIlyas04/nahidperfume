import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import { NO_IMAGE_PLACEHOLDER } from "../utils/placeholderImage";
import { getDraft, dismissForSession, isDismissedThisSession } from "../utils/abandonedOrder";

const CSS = `
.aor-card {
  position: fixed;
  bottom: 24px;
  inset-inline-start: 24px;
  max-width: 340px;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 16px 18px;
  z-index: 2000;
  animation: aor-in 0.4s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes aor-in { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.aor-head { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px; }
.aor-head svg { color: var(--primary); flex-shrink: 0; }
.aor-close { margin-inline-start: auto; background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; display: flex; border-radius: 50%; flex-shrink: 0; }
.aor-close:hover { background: var(--gray-100); color: var(--text); }
.aor-body { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.aor-img { width: 46px; height: 46px; border-radius: var(--radius-sm); object-fit: cover; background: var(--background); flex-shrink: 0; border: 1px solid var(--border-light); }
.aor-info { min-width: 0; }
.aor-pack-name { font-size: 0.85rem; font-weight: 600; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.aor-pack-price { font-size: 0.78rem; color: var(--text-light); margin-top: 1px; }
.aor-actions { display: flex; gap: 8px; }
.aor-resume { flex: 1; background: var(--primary); color: white; border: none; border-radius: var(--radius-full); padding: 10px 14px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: var(--transition); }
.aor-resume:hover { background: var(--primary-dark); }
.aor-dismiss { background: none; border: 1.5px solid var(--border); color: var(--text-light); border-radius: var(--radius-full); padding: 10px 14px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: var(--transition); }
.aor-dismiss:hover { border-color: var(--secondary); color: var(--secondary); }
@media (max-width: 640px) {
  .aor-card { inset-inline: 16px; bottom: 90px; max-width: none; padding: 14px 16px; }
}
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-abandoned-order-css")) {
    const s = document.createElement("style");
    s.id = "nahid-abandoned-order-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/** Bilingual, dismissible reminder for a direct-order form the customer
 *  started (typed a name/phone/address for a specific pack) but never
 *  confirmed. Mounted once, site-wide (see App.jsx) -- suppressed on the
 *  exact pack's own page, both because there's no point reminding someone
 *  about the order they're already looking at, and because PackDetails has
 *  its own position:sticky bottom CTA bar that this fixed card would
 *  otherwise sit on top of. */
export default function AbandonedOrderReminder() {
  injectCSS();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  // localStorage/sessionStorage reads are synchronous, so this can resolve
  // directly in the lazy initializer instead of a setState-in-effect.
  const [draft, setDraft] = useState(() => (isDismissedThisSession() ? null : getDraft()));

  if (!draft) return null;
  if (location.pathname === `/packs/${draft.packId}`) return null;

  const handleResume = () => {
    navigate(`/packs/${draft.packId}#order-form`);
  };

  const handleDismiss = () => {
    dismissForSession();
    setDraft(null);
  };

  return (
    <div className="aor-card">
      <div className="aor-head">
        <FiShoppingBag size={15} />
        <span>{t("abandonedOrder.title")}</span>
        <button className="aor-close" onClick={handleDismiss} aria-label={t("abandonedOrder.close")}>
          <FiX size={14} />
        </button>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginBottom: "12px", marginTop: "-6px" }}>
        {t("abandonedOrder.subtitle")}
      </p>
      <div className="aor-body">
        <img className="aor-img" src={cldResize(draft.packImage, 100) || NO_IMAGE_PLACEHOLDER} alt="" />
        <div className="aor-info">
          <div className="aor-pack-name">{draft.packTitle}</div>
          <div className="aor-pack-price">{Math.round(draft.packPrice)} MAD</div>
        </div>
      </div>
      <div className="aor-actions">
        <button className="aor-resume" onClick={handleResume}>{t("abandonedOrder.resume")}</button>
        <button className="aor-dismiss" onClick={handleDismiss}>{t("abandonedOrder.dismiss")}</button>
      </div>
    </div>
  );
}
