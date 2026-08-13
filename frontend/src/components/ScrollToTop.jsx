import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router's BrowserRouter never resets scroll position on navigation
 * by default -- the browser keeps whatever scrollY the previous page had.
 * On a long page (PackDetails, Cart, ...) that means clicking any link
 * while scrolled near the bottom lands the NEW page at that same scrollY,
 * which is very often the new page's footer or blank space below its
 * shorter content. This is the single, centralized fix for that -- mounted
 * once in App.jsx, not scattered per-page.
 *
 * - Plain route change (no hash in the URL): jump to the very top,
 *   instantly. Deliberately overrides index.css's global
 *   `html { scroll-behavior: smooth }` for this one case -- animating a
 *   smooth scroll from wherever the old page was down/up to the top of a
 *   completely different page would look like a glitch, not a fix.
 * - URL has a hash (e.g. /#faq): scroll to that element instead, smoothly.
 *   This is intentional anchor navigation and must keep working -- this
 *   effect is the thing that makes it work at all in a client-rendered
 *   SPA, since the target element doesn't exist in the DOM yet at the
 *   moment a plain browser-native hash-scroll would normally fire.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
