import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { adminTestimonialsApi } from "../../services/api";

const EMPTY = { name: "", role_or_location: "", rating: 5, quote: "", is_active: true };

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => adminTestimonialsApi.list().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (t) => { setEditing(t); setForm({ ...EMPTY, ...t, is_active: !!t.is_active }); setModalOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (editing) await adminTestimonialsApi.update(editing.id, form);
    else await adminTestimonialsApi.create(form);
    setModalOpen(false);
    load();
  };

  const remove = async (id) => {
    const r = await Swal.fire({ icon: "warning", title: "Supprimer ce témoignage ?", showCancelButton: true, confirmButtonColor: "#C62828" });
    if (!r.isConfirmed) return;
    await adminTestimonialsApi.remove(id);
    load();
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Témoignages ({items.length})</h1>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}><FiPlus size={14} /> Nouveau</button>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Nom</th><th>Note</th><th>Citation</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={5} style={{ textAlign: "center", padding: 30 }}>Chargement...</td></tr> :
              items.length === 0 ? <tr><td colSpan={5} className="adm-empty">Aucun témoignage</td></tr> :
              items.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{"★".repeat(t.rating || 0)}</td>
                  <td style={{ maxWidth: 320 }}>{t.quote}</td>
                  <td><span className={`adm-badge adm-badge-${t.is_active ? "active" : "inactive"}`}>{t.is_active ? "Actif" : "Inactif"}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => openEdit(t)}><FiEdit2 size={13} /></button>{" "}
                    <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => remove(t.id)}><FiTrash2 size={13} /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="adm-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-head"><h3>{editing ? "Modifier" : "Nouveau témoignage"}</h3></div>
            <form onSubmit={save}>
              <div className="adm-form-row">
                <div className="adm-form-group"><label>Nom *</label><input required value={form.name} onChange={set("name")} /></div>
                <div className="adm-form-group"><label>Ville / Rôle</label><input value={form.role_or_location} onChange={set("role_or_location")} /></div>
              </div>
              <div className="adm-form-group">
                <label>Note</label>
                <select value={form.rating} onChange={set("rating")}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} étoiles</option>)}
                </select>
              </div>
              <div className="adm-form-group"><label>Citation *</label><textarea required rows={3} value={form.quote} onChange={set("quote")} /></div>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", margin: "10px 0" }}>
                <input type="checkbox" checked={form.is_active} onChange={set("is_active")} /> Actif
              </label>
              <div className="adm-form-actions">
                <button type="button" className="adm-btn adm-btn-outline" onClick={() => setModalOpen(false)}>Annuler</button>
                <button type="submit" className="adm-btn adm-btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
