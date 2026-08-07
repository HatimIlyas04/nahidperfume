import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiSave, FiLock } from "react-icons/fi";
import { adminSettingsApi, adminAuthApi } from "../../services/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pwForm, setPwForm] = useState({ current_password: "", new_password: "" });

  useEffect(() => {
    adminSettingsApi.list().then(setSettings).catch(() => {}).finally(() => setLoading(false));
  }, []);

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
