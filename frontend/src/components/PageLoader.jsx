const CSS = `
@keyframes pl-sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }
.pl-topbar { position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 5000; background: rgba(239,119,106,0.15); overflow: hidden; }
.pl-topbar-inner { position: absolute; top: 0; bottom: 0; width: 40%; background: var(--primary); animation: pl-sweep 0.9s ease-in-out infinite; }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-page-loader-css")) {
    const s = document.createElement("style");
    s.id = "nahid-page-loader-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/** Thin top progress bar shown while a lazy-loaded route chunk is fetching — keeps navigation feeling instant instead of a blank flash. */
export default function PageLoader() {
  injectCSS();
  return (
    <div className="pl-topbar">
      <div className="pl-topbar-inner" />
    </div>
  );
}
