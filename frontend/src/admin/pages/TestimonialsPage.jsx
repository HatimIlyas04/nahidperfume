import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2, FiUploadCloud, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { adminTestimonialsApi, uploadApi } from "../../services/api";

const EMPTY = { name: "", role_or_location: "", rating: 5, quote: "", avatar_url: "", is_active: true };

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const load = () => adminTestimonialsApi.list().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setUploadStatus("idle"); setModalOpen(true); };
  const openEdit = (t) => { setEditing(t); setForm({ ...EMPTY, ...t, is_active: !!t.is_active }); setUploadStatus(t.avatar_url ? "success" : "idle"); setModalOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadStatus("idle");
    try {
      const { data } = await uploadApi.image(file);
      setForm((f) => ({ ...f, avatar_url: data.url }));
      setUploadStatus("success");
    } catch (err) {
      setUploadStatus("error");
      Swal.fire({ icon: "error", title: "Échec du téléchargement de l'image", text: err.response?.data?.message || "Veuillez réessayer." });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

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

  const move = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const next = [...items];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setItems(next);
    await adminTestimonialsApi.reorder(next.map((t, i) => ({ id: t.id, display_order: i })));
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Témoignages ({items.length})</h1>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}><FiPlus size={14} /> Nouveau</button>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--adm-text-light)", marginBottom: "14px" }}>
        Les témoignages actifs, avec ou sans photo, apparaissent dans la section "Avis clients" de la page d'accueil.
      </p>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th></th><th>Nom</th><th>Note</th><th>Citation</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={6} style={{ textAlign: "center", padding: 30 }}>Chargement...</td></tr> :
              items.length === 0 ? <tr><td colSpan={6} className="adm-empty">Aucun témoignage</td></tr> :
              items.map((t, i) => (
                <tr key={t.id}>
                  <td>
                    {t.avatar_url
                      ? <img src={t.avatar_url} alt="" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
                      : <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--adm-bg)", border: "1px solid var(--adm-border)" }} />}
                  </td>
                  <td>{t.name}</td>
                  <td>{"★".repeat(t.rating || 0)}</td>
                  <td style={{ maxWidth: 320 }}>{t.quote}</td>
                  <td><span className={`adm-badge adm-badge-${t.is_active ? "active" : "inactive"}`}>{t.is_active ? "Actif" : "Inactif"}</span></td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => move(i, -1)}><FiArrowUp size={12} /></button>{" "}
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === items.length - 1} onClick={() => move(i, 1)}><FiArrowDown size={12} /></button>{" "}
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
              <div className="adm-form-group">
                <label>Photo (optionnel — photo client, capture WhatsApp, etc.)</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {form.avatar_url && <img src={form.avatar_url} alt="" style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }} />}
                  <label
                    className="adm-btn adm-btn-outline adm-btn-sm"
                    style={{ cursor: "pointer", color: uploadStatus === "error" ? "#C62828" : uploadStatus === "success" ? "#2E7D32" : undefined }}
                  >
                    <FiUploadCloud size={13} />{" "}
                    {uploading
                      ? "Upload en cours..."
                      : uploadStatus === "success"
                        ? "Image téléchargée ✓"
                        : uploadStatus === "error"
                          ? "Erreur — réessayer"
                          : form.avatar_url ? "Changer" : "Choisir une image"}
                    <input type="file" accept="image/*" hidden onChange={handleUpload} />
                  </label>
                  {form.avatar_url && (
                    <button type="button" className="adm-btn adm-btn-outline adm-btn-sm" onClick={() => { setForm((f) => ({ ...f, avatar_url: "" })); setUploadStatus("idle"); }}>
                      Retirer
                    </button>
                  )}
                </div>
              </div>
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
                <input type="checkbox" checked={form.is_active} onChange={set("is_active")} /> Actif (visible sur le site)
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
