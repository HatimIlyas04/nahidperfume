import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiBell } from "react-icons/fi";
import { adminPushApi } from "../../services/api";
import {
  isPushSupported,
  registerServiceWorker,
  getExistingSubscription,
  subscribeToPush,
  subscriptionToPayload,
} from "../../utils/pushNotifications";

// Shared by Dashboard.jsx (most discoverable, first screen after login --
// important for a first-time mobile setup) and SettingsPage.jsx (where an
// admin would expect to find it later). Same status/enable/test logic
// either way, so it lives once here instead of being copy-pasted twice.
export default function NotificationSettingsCard() {
  // "unsupported" | "checking" | "denied" | "subscribed" | "not-subscribed"
  const [pushStatus, setPushStatus] = useState(() => {
    if (!isPushSupported()) return "unsupported";
    if (Notification.permission === "denied") return "denied";
    return "checking";
  });
  const [enabling, setEnabling] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (pushStatus !== "checking") return;
    registerServiceWorker()
      .then(() => getExistingSubscription())
      .then((sub) => setPushStatus(sub ? "subscribed" : "not-subscribed"))
      .catch(() => setPushStatus("not-subscribed"));
    // pushStatus deliberately omitted: the guard above already makes every
    // re-run past the first a no-op once status leaves "checking".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enablePush = async () => {
    setEnabling(true);
    try {
      const { publicKey } = await adminPushApi.vapidPublicKey();
      const subscription = await subscribeToPush(publicKey);
      await adminPushApi.subscribe(subscriptionToPayload(subscription));
      setPushStatus("subscribed");
      Swal.fire({ icon: "success", title: "Notifications activées", timer: 1500, showConfirmButton: false });
    } catch (err) {
      setPushStatus(Notification.permission === "denied" ? "denied" : "not-subscribed");
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.response?.data?.error || err.message || "Impossible d'activer les notifications.",
      });
    } finally {
      setEnabling(false);
    }
  };

  const testPush = async () => {
    setTesting(true);
    try {
      await adminPushApi.test();
      Swal.fire({ icon: "success", title: "Notification de test envoyée", text: "Vérifiez votre téléphone.", timer: 2000, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error || "Échec de l'envoi du test." });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="adm-card">
      <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "12px" }}><FiBell size={15} style={{ marginRight: "6px" }} />Notifications</h3>

      {pushStatus === "unsupported" && (
        <p style={{ color: "var(--adm-text-light)", fontSize: "0.85rem" }}>
          Cet appareil/navigateur ne supporte pas les notifications push. Sur iPhone/iPad : installez le site
          depuis /admin via "Sur l'écran d'accueil" (iOS 16.4+), puis ouvrez l'app installée avant de réessayer
          — les notifications ne fonctionnent pas dans un simple onglet Safari sur iOS. Sur Android : utilisez
          Chrome à jour.
        </p>
      )}

      {pushStatus === "denied" && (
        <p style={{ color: "#C62828", fontSize: "0.85rem" }}>
          🔕 Notifications bloquées par le navigateur. Autorisez les notifications pour ce site dans les
          paramètres de votre navigateur/téléphone, puis rechargez cette page.
        </p>
      )}

      {pushStatus === "checking" && (
        <p style={{ color: "var(--adm-text-light)", fontSize: "0.85rem" }}>Vérification...</p>
      )}

      {pushStatus === "not-subscribed" && (
        <>
          <p style={{ color: "var(--adm-text-light)", fontSize: "0.85rem", marginBottom: "12px" }}>
            Statut : 🔕 Notifications désactivées sur cet appareil.
          </p>
          <button className="adm-btn adm-btn-primary" onClick={enablePush} disabled={enabling}>
            <FiBell size={13} /> {enabling ? "Activation..." : "Activer les notifications sur ce téléphone"}
          </button>
        </>
      )}

      {pushStatus === "subscribed" && (
        <>
          <p style={{ color: "#2E7D32", fontSize: "0.85rem", marginBottom: "12px", fontWeight: 600 }}>
            ✅ Notifications activées sur cet appareil.
          </p>
          <button className="adm-btn adm-btn-outline" onClick={testPush} disabled={testing}>
            {testing ? "Envoi..." : "Tester les notifications"}
          </button>
        </>
      )}
    </div>
  );
}
