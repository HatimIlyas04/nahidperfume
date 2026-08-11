import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { adminPerfumesApi, uploadApi } from "../../services/api";

const SIZES_ML = ["10", "20", "30", "50", "60", "100"];

const EMPTY = {
  name: "", image_url: "", description: "", category: "", gender: "Unisex",
  product_type: "Original", inspired_by: "", concentration: "", scent_family: "",
  longevity: "", size: "", top_notes: "", middle_notes: "", base_notes: "",
  is_new: false, is_bestseller: false, is_active: true,
};

export default function PerfumesPage() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | success | error
  const [saving, setSaving] = useState(false);

  const load = () => adminPerfumesApi.list().then(setPerfumes).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return perfumes;
    return perfumes.filter((p) => p.name.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q));
  }, [perfumes, query]);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setUploadStatus("idle"); setModalOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...EMPTY, ...p, is_new: !!p.is_new, is_bestseller: !!p.is_bestseller, is_active: !!p.is_active });
    setUploadStatus(p.image_url ? "success" : "idle");
    setModalOpen(true);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadStatus("idle");
    try {
      const { data } = await uploadApi.image(file);
      setForm((f) => ({ ...f, image_url: data.url }));
      setUploadStatus("success");
    } catch (err) {
      // Upload failing must never silently leave image_url as-is and let
      // the form get saved anyway -- that's exactly how a perfume ends up
      // with no real photo. Surface the real backend message and make the
      // button itself say so, not just a toast that disappears.
      setUploadStatus("error");
      Swal.fire({
        icon: "error",
        title: "Échec du téléchargement de l'image",
        text: err.response?.data?.message || "Veuillez réessayer.",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.image_url) {
      Swal.fire({ icon: "warning", title: "Image requise", text: "Téléversez une image avant d'enregistrer ce parfum." });
      return;
    }
    setSaving(true);
    try {
      if (editing) await adminPerfumesApi.update(editing.id, form);
      else await adminPerfumesApi.create(form);
      setModalOpen(false);
      load();
      Swal.fire({ icon: "success", title: "Enregistré", timer: 1200, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error || "Échec de l'enregistrement" });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (p) => {
    await adminPerfumesApi.setActive(p.id, !p.is_active);
    load();
  };

  const handleDelete = async (p) => {
    const result = await Swal.fire({
      icon: "warning", title: `Supprimer "${p.name}" ?`, showCancelButton: true,
      confirmButtonText: "Supprimer", confirmButtonColor: "#C62828", cancelButtonText: "Annuler",
    });
    if (!result.isConfirmed) return;
    try {
      await adminPerfumesApi.remove(p.id);
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Impossible de supprimer", text: err.response?.data?.error });
    }
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Parfums ({perfumes.length})</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <input className="adm-search-input" placeholder="Rechercher..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="adm-btn adm-btn-primary" onClick={openCreate}><FiPlus size={14} /> Nouveau parfum</button>
        </div>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th></th><th>Nom</th><th>Catégorie</th><th>Genre</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "30px" }}>Chargement...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="adm-empty">Aucun parfum</td></tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td><img src={p.image_url || "/nahid1.png"} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} /></td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.gender}</td>
                  <td>
                    <span className={`adm-badge adm-badge-${p.is_active ? "active" : "inactive"}`} style={{ cursor: "pointer" }} onClick={() => handleToggleActive(p)}>
                      {p.is_active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => openEdit(p)}><FiEdit2 size={13} /></button>{" "}
                    <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => handleDelete(p)}><FiTrash2 size={13} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="adm-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-head"><h3>{editing ? "Modifier le parfum" : "Nouveau parfum"}</h3></div>
            <form onSubmit={handleSave}>
              <div className="adm-form-group">
                <label>Image *</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {form.image_url && <img src={form.image_url} alt="" style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover" }} />}
                  <label
                    className="adm-btn adm-btn-outline adm-btn-sm"
                    style={{ cursor: "pointer", color: uploadStatus === "error" ? "#C62828" : uploadStatus === "success" ? "#2E7D32" : undefined }}
                  >
                    <FiUploadCloud size={13} />{" "}
                    {uploading
                      ? "Upload en cours..."
                      : uploadStatus === "success"
                        ? "Image téléchargée avec succès ✓"
                        : uploadStatus === "error"
                          ? "Erreur d'upload — réessayer"
                          : form.image_url ? "Changer l'image" : "Choisir une image"}
                    <input type="file" accept="image/*" hidden onChange={handleUpload} />
                  </label>
                </div>
                <p style={{ fontSize: "0.7rem", color: "var(--adm-text-light)", marginTop: "6px" }}>
                  Format recommandé : 1122 × 1402 px (ratio portrait)
                </p>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group"><label>Nom *</label><input required value={form.name} onChange={set("name")} /></div>
                <div className="adm-form-group"><label>Catégorie</label><input value={form.category} onChange={set("category")} /></div>
              </div>
              <div className="adm-form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={set("description")} /></div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Genre</label>
                  <select value={form.gender} onChange={set("gender")}>
                    <option>Unisex</option><option>Femme</option><option>Homme</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Type</label>
                  <select value={form.product_type} onChange={set("product_type")}>
                    <option>Original</option><option>Inspired By</option>
                  </select>
                </div>
              </div>
              {form.product_type === "Inspired By" && (
                <div className="adm-form-group"><label>Inspiration</label><input value={form.inspired_by} onChange={set("inspired_by")} /></div>
              )}
              <div className="adm-form-row">
                <div className="adm-form-group"><label>Concentration</label><input value={form.concentration} onChange={set("concentration")} /></div>
                <div className="adm-form-group"><label>Tenue</label><input value={form.longevity} onChange={set("longevity")} /></div>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Taille</label>
                  <select value={form.size} onChange={set("size")}>
                    <option value="">—</option>
                    {SIZES_ML.map((s) => <option key={s} value={s}>{s} ml</option>)}
                  </select>
                </div>
              </div>
              <div className="adm-form-group"><label>Notes de tête</label><input value={form.top_notes} onChange={set("top_notes")} /></div>
              <div className="adm-form-group"><label>Notes de cœur</label><input value={form.middle_notes} onChange={set("middle_notes")} /></div>
              <div className="adm-form-group"><label>Notes de fond</label><input value={form.base_notes} onChange={set("base_notes")} /></div>
              <div style={{ display: "flex", gap: "18px", margin: "14px 0" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}>
                  <input type="checkbox" checked={form.is_new} onChange={set("is_new")} /> Nouveau
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}>
                  <input type="checkbox" checked={form.is_bestseller} onChange={set("is_bestseller")} /> Best-seller
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}>
                  <input type="checkbox" checked={form.is_active} onChange={set("is_active")} /> Actif
                </label>
              </div>
              <div className="adm-form-actions">
                <button type="button" className="adm-btn adm-btn-outline" onClick={() => setModalOpen(false)}>Annuler</button>
                <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
