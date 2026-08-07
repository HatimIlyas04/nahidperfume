import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { adminFaqApi } from "../../services/api";

const EMPTY = { question: "", answer: "", category: "", is_active: true };

export default function FaqPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => adminFaqApi.list().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (f) => { setEditing(f); setForm({ ...EMPTY, ...f, is_active: !!f.is_active }); setModalOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (editing) await adminFaqApi.update(editing.id, form);
    else await adminFaqApi.create(form);
    setModalOpen(false);
    load();
  };

  const remove = async (id) => {
    const r = await Swal.fire({ icon: "warning", title: "Supprimer cette question ?", showCancelButton: true, confirmButtonColor: "#C62828" });
    if (!r.isConfirmed) return;
    await adminFaqApi.remove(id);
    load();
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>FAQ ({items.length})</h1>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}><FiPlus size={14} /> Nouvelle question</button>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Question</th><th>Catégorie</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={4} style={{ textAlign: "center", padding: 30 }}>Chargement...</td></tr> :
              items.length === 0 ? <tr><td colSpan={4} className="adm-empty">Aucune question</td></tr> :
              items.map((f) => (
                <tr key={f.id}>
                  <td style={{ maxWidth: 360 }}>{f.question}</td>
                  <td>{f.category || "—"}</td>
                  <td><span className={`adm-badge adm-badge-${f.is_active ? "active" : "inactive"}`}>{f.is_active ? "Actif" : "Inactif"}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => openEdit(f)}><FiEdit2 size={13} /></button>{" "}
                    <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => remove(f.id)}><FiTrash2 size={13} /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="adm-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-head"><h3>{editing ? "Modifier" : "Nouvelle question"}</h3></div>
            <form onSubmit={save}>
              <div className="adm-form-group"><label>Question *</label><input required value={form.question} onChange={set("question")} /></div>
              <div className="adm-form-group"><label>Réponse *</label><textarea required rows={3} value={form.answer} onChange={set("answer")} /></div>
              <div className="adm-form-group"><label>Catégorie</label><input value={form.category} onChange={set("category")} /></div>
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
