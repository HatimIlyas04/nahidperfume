import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiSave, FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import {
  adminHomepageSectionsApi, adminBannersApi, adminCustomPackSettingsApi,
  customPackSettingsApi, uploadApi,
} from "../../services/api";

export default function HomepagePage() {
  const [sections, setSections] = useState([]);
  const [banners, setBanners] = useState([]);
  const [customSettings, setCustomSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newBanner, setNewBanner] = useState({ title: "", image_url: "", link_url: "", placement: "homepage_hero" });

  const load = () => {
    Promise.all([adminHomepageSectionsApi.list(), adminBannersApi.list(), customPackSettingsApi.get()])
      .then(([s, b, cp]) => { setSections(s); setBanners(b); setCustomSettings(cp); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const updateSection = (id, data) => setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));

  const saveSection = async (section) => {
    await adminHomepageSectionsApi.update(section.id, {
      title: section.title, subtitle: section.subtitle, is_active: section.is_active,
    });
    Swal.fire({ icon: "success", title: "Section enregistrée", timer: 1000, showConfirmButton: false });
  };

  const saveCustomSettings = async () => {
    await adminCustomPackSettingsApi.update({
      is_active: customSettings.is_active, flat_price: Number(customSettings.flat_price),
      title: customSettings.title, description: customSettings.description,
    });
    Swal.fire({ icon: "success", title: "Paramètres enregistrés", timer: 1000, showConfirmButton: false });
  };

  const uploadBannerImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { data } = await uploadApi.image(file);
    setNewBanner((b) => ({ ...b, image_url: data.url }));
  };

  const addBanner = async () => {
    if (!newBanner.image_url) {
      Swal.fire({ icon: "warning", title: "Ajoutez une image" });
      return;
    }
    await adminBannersApi.create(newBanner);
    setNewBanner({ title: "", image_url: "", link_url: "", placement: "homepage_hero" });
    load();
  };

  const removeBanner = async (id) => {
    await adminBannersApi.remove(id);
    load();
  };

  if (loading) return <p style={{ color: "var(--adm-text-light)" }}>Chargement...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="adm-card">
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px" }}>Sections de la page d'accueil</h3>
        {sections.map((s) => (
          <div key={s.id} style={{ borderBottom: "1px solid var(--adm-border)", padding: "14px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <strong style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--adm-text-light)" }}>{s.section_key}</strong>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}>
                <input type="checkbox" checked={!!s.is_active} onChange={(e) => updateSection(s.id, { is_active: e.target.checked })} /> Visible
              </label>
            </div>
            <div className="adm-form-row">
              <input placeholder="Titre" value={s.title || ""} onChange={(e) => updateSection(s.id, { title: e.target.value })} />
              <input placeholder="Sous-titre" value={s.subtitle || ""} onChange={(e) => updateSection(s.id, { subtitle: e.target.value })} />
            </div>
            <button className="adm-btn adm-btn-outline adm-btn-sm" style={{ marginTop: "8px" }} onClick={() => saveSection(s)}>
              <FiSave size={12} /> Enregistrer
            </button>
          </div>
        ))}
      </div>

      <div className="adm-card">
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px" }}>Créer Votre Propre Pack — paramètres</h3>
        {customSettings && (
          <>
            <div className="adm-form-row">
              <div className="adm-form-group"><label>Titre</label><input value={customSettings.title || ""} onChange={(e) => setCustomSettings({ ...customSettings, title: e.target.value })} /></div>
              <div className="adm-form-group"><label>Prix fixe (MAD)</label><input type="number" value={customSettings.flat_price} onChange={(e) => setCustomSettings({ ...customSettings, flat_price: e.target.value })} /></div>
            </div>
            <div className="adm-form-group"><label>Description</label><textarea rows={2} value={customSettings.description || ""} onChange={(e) => setCustomSettings({ ...customSettings, description: e.target.value })} /></div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", margin: "8px 0 14px" }}>
              <input type="checkbox" checked={!!customSettings.is_active} onChange={(e) => setCustomSettings({ ...customSettings, is_active: e.target.checked })} /> Activé sur le site
            </label>
            <button className="adm-btn adm-btn-primary" onClick={saveCustomSettings}><FiSave size={13} /> Enregistrer</button>
          </>
        )}
      </div>

      <div className="adm-card">
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "4px" }}>Bannières & Galerie UGC / Livraisons</h3>
        <p style={{ fontSize: "0.78rem", color: "var(--adm-text-light)", marginBottom: "16px" }}>
          Utilisez "Galerie UGC" pour les photos de livraison / vidéos clients affichées sur la page d'accueil.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", marginBottom: "20px" }}>
          {banners.map((b) => (
            <div key={b.id} style={{ border: "1px solid var(--adm-border)", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
              <img src={b.image_url} alt={b.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
              <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" style={{ position: "absolute", top: 6, right: 6 }} onClick={() => removeBanner(b.id)}>
                <FiTrash2 size={12} />
              </button>
              <div style={{ padding: "8px", fontSize: "0.75rem" }}>
                {b.title || "(sans titre)"}
                <div style={{ fontSize: "0.65rem", color: "var(--adm-text-light)" }}>{b.placement === "ugc_gallery" ? "Galerie UGC" : "Bannière accueil"}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="adm-form-row">
          <div className="adm-form-group"><label>Titre</label><input value={newBanner.title} onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })} /></div>
          <div className="adm-form-group">
            <label>Emplacement</label>
            <select value={newBanner.placement} onChange={(e) => setNewBanner({ ...newBanner, placement: e.target.value })}>
              <option value="homepage_hero">Bannière page d'accueil</option>
              <option value="ugc_gallery">Galerie UGC / Livraisons</option>
            </select>
          </div>
        </div>
        <div className="adm-form-group"><label>Lien (optionnel — vidéo, Instagram, etc.)</label><input value={newBanner.link_url} onChange={(e) => setNewBanner({ ...newBanner, link_url: e.target.value })} /></div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "6px" }}>
          <label className="adm-btn adm-btn-outline adm-btn-sm" style={{ cursor: "pointer" }}>
            <FiUploadCloud size={13} /> Image
            <input type="file" accept="image/*" hidden onChange={uploadBannerImage} />
          </label>
          {newBanner.image_url && <img src={newBanner.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }} />}
          <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={addBanner}><FiPlus size={12} /> Ajouter</button>
        </div>
      </div>
    </div>
  );
}
