import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiSave, FiLock, FiBell } from "react-icons/fi";
import { adminSettingsApi, adminAuthApi, adminPushApi } from "../../services/api";
import {
  isPushSupported,
  registerServiceWorker,
  getExistingSubscription,
  subscribeToPush,
  subscriptionToPayload,
} from "../../utils/pushNotifications";

export default function SettingsPage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pwForm, setPwForm] = useState({ current_password: "", new_password: "" });

  // "unsupported" | "checking" | "denied" | "subscribed" | "not-subscribed"
  const [pushStatus, setPushStatus] = useState(() => {
    if (!isPushSupported()) return "unsupported";
    if (Notification.permission === "denied") return "denied";
    return "checking";
  });
  const [enabling, setEnabling] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    adminSettingsApi.list().then(setSettings).catch(() => {}).finally(() => setLoading(false));
  }, []);

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

  const setValue = (key, value) =>
    setSettings((prev) => prev.map((s) => (s.setting_key === key ? { ...s, setting_value: value } : s)));

  const save = async () => {
    await adminSettingsApi.update(settings.map((s) => ({ key: s.setting_key, value: s.setting_value })));
    Swal.fire({ icon: "success", title: "Paramètres enregistrés", timer: 1200, showConfirmButton: false });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await adminAuthApi.changePassword(pwForm.current_password, pwForm.new_password);
      Swal.fire({ icon: "success", title: "Mot de passe modifié", timer: 1200, showConfirmButton: false });
      setPwForm({ current_password: "", new_password: "" });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error });
    }
  };

  const groups = settings.reduce((acc, s) => {
    (acc[s.setting_group || "general"] ||= []).push(s);
    return acc;
  }, {});

  if (loading) return <p style={{ color: "var(--adm-text-light)" }}>Chargement...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {Object.entries(groups).map(([group, items]) => (
        <div className="adm-card" key={group}>
          <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px", textTransform: "capitalize" }}>{group}</h3>
          <div className="adm-form-row">
            {items.map((s) => (
              <div className="adm-form-group" key={s.setting_key}>
                <label>{s.setting_key.replace(/_/g, " ")}</label>
                <input value={s.setting_value || ""} onChange={(e) => setValue(s.setting_key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="adm-btn adm-btn-primary" style={{ alignSelf: "flex-start" }} onClick={save}><FiSave size={13} /> Enregistrer les paramètres</button>

      <div className="adm-card">
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "12px" }}><FiBell size={15} style={{ marginRight: "6px" }} />Notifications</h3>

        {pushStatus === "unsupported" && (
          <p style={{ color: "var(--adm-text-light)", fontSize: "0.85rem" }}>
            Ce navigateur ne supporte pas les notifications push. Utilisez Chrome sur Android (ou un navigateur
            à jour) pour activer les notifications de commande sur votre téléphone.
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

      <div className="adm-card">
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px" }}><FiLock size={15} style={{ marginRight: "6px" }} />Changer mon mot de passe</h3>
        <form onSubmit={changePassword}>
          <div className="adm-form-row">
            <div className="adm-form-group"><label>Mot de passe actuel</label><input type="password" required value={pwForm.current_password} onChange={(e) => setPwForm({ ...pwForm, current_password: e.target.value })} /></div>
            <div className="adm-form-group"><label>Nouveau mot de passe</label><input type="password" required minLength={8} value={pwForm.new_password} onChange={(e) => setPwForm({ ...pwForm, new_password: e.target.value })} /></div>
          </div>
          <button type="submit" className="adm-btn adm-btn-outline">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
}
