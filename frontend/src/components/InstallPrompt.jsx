import { useState, useEffect } from "react";
import { FiDownload, FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const CSS = `
.install-banner {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 10px 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 0.85rem;
  position: relative;
  animation: install-banner-in 0.4s ease both;
}
@keyframes install-banner-in {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.install-banner-text { display: flex; align-items: center; gap: 8px; font-weight: 500; }
.install-banner-btn {
  background: white; color: var(--primary-dark); border: none; padding: 7px 18px;
  border-radius: var(--radius-full); font-weight: 700; font-size: 0.8rem; cursor: pointer;
  display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
  transition: transform 0.2s;
}
.install-banner-btn:hover { transform: scale(1.05); }
.install-banner-close {
  position: absolute; inset-inline-end: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: rgba(255,255,255,0.8); cursor: pointer; padding: 6px;
  display: flex; border-radius: 50%;
}
.install-banner-close:hover { color: white; background: rgba(255,255,255,0.15); }
@media (max-width: 640px) {
  .install-banner { padding: 10px 40px 10px 14px; font-size: 0.78rem; gap: 10px; }
}
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("install-prompt-css")) {
    const s = document.createElement("style");
    s.id = "install-prompt-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

const DISMISS_KEY = "nahid_install_dismissed_at";
// A dismissed banner shouldn't come back on every single visit -- one
// week is long enough to not feel naggy, short enough that someone who
// dismissed it in a distracted moment still gets offered it again later.
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

function isStandalone() {
  if (typeof window === "undefined") return false;
  // iOS Safari exposes `navigator.standalone` instead of the standard
  // display-mode media query -- checked defensively even though iOS never
  // fires beforeinstallprompt, in case a future browser update changes that.
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

/**
 * Chrome-only (beforeinstallprompt has no Safari/Firefox equivalent): shows
 * a bilingual "Install app" banner exactly when Chrome signals the site is
 * installable, and never when already installed or recently dismissed.
 * Deliberately owns no heavy dependency -- react-icons is already loaded
 * elsewhere on every page, so this adds negligible bytes to the homepage.
 */
export default function InstallPrompt() {
  injectCSS();
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const lastDismissed = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() - lastDismissed < DISMISS_COOLDOWN_MS) return;

    const handleBeforeInstall = (e) => {
      // Suppresses Chrome's own mini-infobar so this custom banner is the
      // only install UI shown -- the deferred event is replayed later via
      // deferredPrompt.prompt() when the customer clicks our button.
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    const handleInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    // A given deferred event can only ever be prompted once, accepted or
    // not -- Chrome fires a fresh beforeinstallprompt later if the site is
    // still eligible, so there's nothing to keep around after this.
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="install-banner">
      <span className="install-banner-text">
        <span aria-hidden="true">📲</span>
        <span>{t("pwaInstall.bannerText")}</span>
      </span>
      <button className="install-banner-btn" onClick={handleInstall}>
        <FiDownload size={14} /> {t("pwaInstall.cta")}
      </button>
      <button className="install-banner-close" onClick={handleDismiss} aria-label={t("pwaInstall.dismiss")}>
        <FiX size={16} />
      </button>
    </div>
  );
}
