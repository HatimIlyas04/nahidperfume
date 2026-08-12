// Web Push helpers for the admin notification-settings UI. No third-party
// SDK -- just the standard Push API + Notifications API + this project's
// own service worker (public/service-worker.js).

export function isPushSupported() {
  return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
}

// PushManager.subscribe() requires the VAPID public key as a raw
// Uint8Array (its applicationServerKey), not the base64url string the
// backend hands out -- this is the standard conversion every Web Push
// implementation needs.
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  return navigator.serviceWorker.register("/service-worker.js");
}

export async function getExistingSubscription() {
  if (!isPushSupported()) return null;
  const registration = await navigator.serviceWorker.ready;
  return registration.pushManager.getSubscription();
}

/** Requests Notification permission, subscribes this browser/device, and
 *  returns the raw PushSubscription (caller sends it to the backend). */
export async function subscribeToPush(vapidPublicKey) {
  if (!isPushSupported()) {
    throw new Error("Push notifications are not supported on this device/browser.");
  }
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }
  const registration = await navigator.serviceWorker.ready;
  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });
}

export async function unsubscribeFromPush() {
  const subscription = await getExistingSubscription();
  if (!subscription) return null;
  const endpoint = subscription.endpoint;
  await subscription.unsubscribe();
  return endpoint;
}

/** Converts a PushSubscription into the plain shape the backend expects. */
export function subscriptionToPayload(subscription) {
  const json = subscription.toJSON();
  return {
    endpoint: json.endpoint,
    keys: json.keys,
    user_agent: navigator.userAgent.slice(0, 255),
  };
}
