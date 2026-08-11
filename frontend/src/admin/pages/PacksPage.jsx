import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2, FiCopy, FiUploadCloud, FiCheck, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { adminPacksApi, adminPerfumesApi, uploadApi } from "../../services/api";

const EMPTY = {
  title: "", description: "", cover_image: "", price: "", compare_at_price: "",
  is_active: true, is_featured: false, badge: "", is_upsell_offer: false, upsell_price: "",
};

const BADGE_LABELS = { best_seller: "Best Seller", new: "Nouveau", limited: "Édition limitée" };

export default function PacksPage() {
  const [packs, setPacks] = useState([]);
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [selectedPerfumeIds, setSelectedPerfumeIds] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | success | error
  const [saving, setSaving] = useState(false);

  const load = () => adminPacksApi.list().then(setPacks).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => {
    load();
    adminPerfumesApi.list().then(setPerfumes).catch(() => {});
  }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setSelectedPerfumeIds([]); setUploadStatus("idle"); setModalOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({
      ...EMPTY, ...p, is_active: !!p.is_active, is_featured: !!p.is_featured, badge: p.badge || "",
      is_upsell_offer: !!p.is_upsell_offer, upsell_price: p.upsell_price ?? "",
    });
    setSelectedPerfumeIds(p.perfumes.map((x) => x.perfume_id));
    setUploadStatus(p.cover_image ? "success" : "idle");
    setModalOpen(true);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const togglePerfume = (id) => {
    setSelectedPerfumeIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadStatus("idle");
    try {
      const { data } = await uploadApi.image(file);
      setForm((f) => ({ ...f, cover_image: data.url }));
      setUploadStatus("success");
    } catch (err) {
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
    if (selectedPerfumeIds.length !== 4) {
      Swal.fire({ icon: "warning", title: "Exactement 4 parfums requis", text: `Vous en avez sélectionné ${selectedPerfumeIds.length}.` });
      return;
    }
    if (!form.cover_image) {
      Swal.fire({ icon: "warning", title: "Image requise", text: "Téléversez une image de couverture avant d'enregistrer ce pack." });
      return;
    }
    setSaving(true);
    const payload = { ...form, price: Number(form.price), perfume_ids: selectedPerfumeIds };
    if (!payload.compare_at_price) delete payload.compare_at_price;
    if (!payload.upsell_price) payload.upsell_price = null;
    try {
      if (editing) await adminPacksApi.update(editing.id, payload);
      else await adminPacksApi.create(payload);
      setModalOpen(false);
      load();
      Swal.fire({ icon: "success", title: "Pack enregistré", timer: 1200, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error || "Échec de l'enregistrement" });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (p) => { await adminPacksApi.setActive(p.id, !p.is_active); load(); };
  const movePack = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= packs.length) return;
    const next = [...packs];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setPacks(next);
    await adminPacksApi.reorder(next.map((p, i) => ({ id: p.id, display_order: i })));
  };
  const handleDuplicate = async (p) => { await adminPacksApi.duplicate(p.id); load(); Swal.fire({ icon: "success", title: "Pack dupliqué", timer: 1200, showConfirmButton: false }); };
  const handleDelete = async (p) => {
    const result = await Swal.fire({ icon: "warning", title: `Supprimer "${p.title}" ?`, showCancelButton: true, confirmButtonText: "Supprimer", confirmButtonColor: "#C62828" });
    if (!result.isConfirmed) return;
    await adminPacksApi.remove(p.id);
    load();
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Packs Prêts ({packs.length})</h1>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}><FiPlus size={14} /> Nouveau pack</button>
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--adm-text-light)", marginBottom: "14px" }}>
        Les packs "Vedette" (★) apparaissent en premier sur la page d'accueil. Utilisez les flèches pour ajuster l'ordre d'affichage.
      </p>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th></th><th>Titre</th><th>Prix</th><th>Badge</th><th>Vedette</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "30px" }}>Chargement...</td></tr>
            ) : packs.length === 0 ? (
              <tr><td colSpan={7} className="adm-empty">Aucun pack. Créez-en un pour commencer.</td></tr>
            ) : (
              packs.map((p, i) => (
                <tr key={p.id}>
                  <td><img src={p.cover_image || "/nahid1.png"} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} /></td>
                  <td>{p.title}</td>
                  <td>{Math.round(p.price)} MAD</td>
                  <td>{p.badge ? BADGE_LABELS[p.badge] : "—"}</td>
                  <td>{p.is_featured ? "★" : "—"}{p.is_upsell_offer ? " 🎁" : ""}</td>
                  <td>
                    <span className={`adm-badge adm-badge-${p.is_active ? "active" : "inactive"}`} style={{ cursor: "pointer" }} onClick={() => handleToggleActive(p)}>
                      {p.is_active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => movePack(i, -1)} title="Monter (ordre sur la page d'accueil)"><FiArrowUp size={12} /></button>{" "}
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === packs.length - 1} onClick={() => movePack(i, 1)} title="Descendre"><FiArrowDown size={12} /></button>{" "}
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => openEdit(p)}><FiEdit2 size={13} /></button>{" "}
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => handleDuplicate(p)}><FiCopy size={13} /></button>{" "}
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
          <div className="adm-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "720px" }}>
            <div className="adm-modal-head"><h3>{editing ? "Modifier le pack" : "Nouveau pack"}</h3></div>
            <form onSubmit={handleSave}>
              <div className="adm-form-group">
                <label>Image de couverture *</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {form.cover_image && <img src={form.cover_image} alt="" style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover" }} />}
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
                          : form.cover_image ? "Changer l'image" : "Choisir une image"}
                    <input type="file" accept="image/*" hidden onChange={handleUpload} />
                  </label>
                </div>
                <p style={{ fontSize: "0.7rem", color: "var(--adm-text-light)", marginTop: "6px" }}>
                  Format recommandé : 970 × 1600 px (ratio portrait)
                </p>
              </div>
              <div className="adm-form-group"><label>Titre *</label><input required value={form.title} onChange={set("title")} /></div>
              <div className="adm-form-group"><label>Description</label><textarea rows={2} value={form.description} onChange={set("description")} /></div>
              <div className="adm-form-row">
                <div className="adm-form-group"><label>Prix (MAD) *</label><input type="number" step="0.01" required value={form.price} onChange={set("price")} /></div>
                <div className="adm-form-group"><label>Prix barré (optionnel)</label><input type="number" step="0.01" value={form.compare_at_price} onChange={set("compare_at_price")} /></div>
              </div>
              <div className="adm-form-group">
                <label>Badge affiché sur la carte du pack</label>
                <select value={form.badge} onChange={set("badge")}>
                  <option value="">Aucun</option>
                  <option value="best_seller">Best Seller</option>
                  <option value="new">Nouveau</option>
                  <option value="limited">Édition limitée</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "18px", margin: "10px 0 16px", flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}>
                  <input type="checkbox" checked={form.is_featured} onChange={set("is_featured")} /> Vedette
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}>
                  <input type="checkbox" checked={form.is_active} onChange={set("is_active")} /> Actif
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}>
                  <input type="checkbox" checked={form.is_upsell_offer} onChange={set("is_upsell_offer")} /> Offre upsell (Thank You page)
                </label>
              </div>
              {form.is_upsell_offer && (
                <div className="adm-form-group">
                  <label>Prix upsell (MAD) — laisser vide pour utiliser le prix normal</label>
                  <input type="number" step="0.01" value={form.upsell_price} onChange={set("upsell_price")} placeholder="ex: 200" />
                </div>
              )}

              <div className="adm-form-group">
                <label>Sélectionnez exactement 4 parfums ({selectedPerfumeIds.length}/4)</label>
                <div className="adm-perfume-picker">
                  {perfumes.map((p) => {
                    const idx = selectedPerfumeIds.indexOf(p.id);
                    const selected = idx !== -1;
                    return (
                      <div key={p.id} className={`adm-perfume-pick-card${selected ? " selected" : ""}`} onClick={() => togglePerfume(p.id)}>
                        <img src={p.image_url || "/nahid1.png"} alt={p.name} />
                        {selected && <span className="num">{idx + 1}</span>}
                        <div className="adm-perfume-pick-name">{p.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="adm-form-actions">
                <button type="button" className="adm-btn adm-btn-outline" onClick={() => setModalOpen(false)}>Annuler</button>
                <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>
                  <FiCheck size={14} /> {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
