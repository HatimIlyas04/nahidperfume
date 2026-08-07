import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { adminAdminsApi } from "../../services/api";

const EMPTY = { username: "", password: "", full_name: "", role: "admin" };

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const load = () => adminAdminsApi.list().then(setAdmins).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const create = async (e) => {
    e.preventDefault();
    try {
      await adminAdminsApi.create(form);
      setModalOpen(false);
      setForm(EMPTY);
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error });
    }
  };

  const toggleActive = async (a) => { await adminAdminsApi.update(a.id, { is_active: !a.is_active }); load(); };

  const remove = async (a) => {
    const r = await Swal.fire({ icon: "warning", title: `Supprimer "${a.username}" ?`, showCancelButton: true, confirmButtonColor: "#C62828" });
    if (!r.isConfirmed) return;
    try {
      await adminAdminsApi.remove(a.id);
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Impossible", text: err.response?.data?.error });
    }
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Administrateurs ({admins.length})</h1>
        <button className="adm-btn adm-btn-primary" onClick={() => setModalOpen(true)}><FiPlus size={14} /> Nouvel admin</button>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Identifiant</th><th>Nom</th><th>Rôle</th><th>Statut</th><th>Dernière connexion</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={6} style={{ textAlign: "center", padding: 30 }}>Chargement...</td></tr> :
              admins.map((a) => (
                <tr key={a.id}>
                  <td>{a.username}</td>
                  <td>{a.full_name || "—"}</td>
                  <td><span className="adm-badge adm-badge-confirmed">{a.role}</span></td>
                  <td><span className={`adm-badge adm-badge-${a.is_active ? "active" : "inactive"}`} style={{ cursor: "pointer" }} onClick={() => toggleActive(a)}>{a.is_active ? "Actif" : "Inactif"}</span></td>
                  <td>{a.last_login_at ? new Date(a.last_login_at).toLocaleDateString("fr-FR") : "Jamais"}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => remove(a)}><FiTrash2 size={13} /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="adm-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-head"><h3>Nouvel administrateur</h3></div>
            <form onSubmit={create}>
              <div className="adm-form-group"><label>Identifiant *</label><input required value={form.username} onChange={set("username")} /></div>
              <div className="adm-form-group"><label>Mot de passe *</label><input type="password" required minLength={8} value={form.password} onChange={set("password")} /></div>
              <div className="adm-form-group"><label>Nom complet</label><input value={form.full_name} onChange={set("full_name")} /></div>
              <div className="adm-form-group">
                <label>Rôle</label>
                <select value={form.role} onChange={set("role")}>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="adm-form-actions">
                <button type="button" className="adm-btn adm-btn-outline" onClick={() => setModalOpen(false)}>Annuler</button>
                <button type="submit" className="adm-btn adm-btn-primary">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
