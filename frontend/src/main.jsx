import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)

// Registered site-wide (not just under /admin) because PWA installability
// needs an active service worker on whichever page the "Add to Home
// Screen" prompt fires from -- for the admin that's typically the
// homepage, before they've ever navigated to /admin. Deliberately after
// the initial render and outside any user-facing flow: this must never
// delay or affect the customer's first paint.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}
