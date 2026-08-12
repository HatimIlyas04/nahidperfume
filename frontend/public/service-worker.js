// Minimal Web Push service worker for Nahid Perfumes admin order alerts.
// Deliberately has NO fetch handler: it never intercepts/caches network
// requests, so it cannot interfere with the existing Vercel SPA routing or
// any API call. Its only jobs are (1) let the browser install this as a
// PWA and (2) receive/display push notifications while the site is closed.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = { title: "Nahid Perfumes", body: "" };
  try {
    if (event.data) payload = event.data.json();
  } catch {
    // Non-JSON payload (shouldn't happen -- backend always sends JSON) --
    // fall back to the default title/body above rather than crash.
  }

  const { title, body, data } = payload;
  event.waitUntil(
    self.registration.showNotification(title || "Nahid Perfumes", {
      body: body || "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: data || {},
      tag: data?.orderId ? `order-${data.orderId}` : undefined,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetPath = event.notification.data?.url || "/admin/orders";
  const targetUrl = new URL(targetPath, self.location.origin).href;

  // AdminApp.jsx itself decides authenticated-vs-login based on the
  // stored token, so navigating straight to /admin/orders is enough --
  // an expired session naturally falls through to the login screen there.
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (clients) => {
      for (const client of clients) {
        if (new URL(client.url).origin !== self.location.origin) continue;
        if ("navigate" in client) await client.navigate(targetUrl).catch(() => {});
        if ("focus" in client) return client.focus();
      }
      return self.clients.openWindow(targetUrl);
    })
  );
});
