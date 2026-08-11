import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiSave, FiPlus, FiTrash2, FiUploadCloud, FiArrowUp, FiArrowDown } from "react-icons/fi";
import {
  adminHomepageSectionsApi, adminBannersApi, adminCustomPackSettingsApi,
  adminTrustBadgesApi, customPackSettingsApi, uploadApi,
} from "../../services/api";

const ICON_OPTIONS = [
  { key: "shield", label: "Bouclier (sécurité)" },
  { key: "truck", label: "Camion (livraison)" },
  { key: "refresh", label: "Retour/échange" },
  { key: "phone", label: "Téléphone (support)" },
];
const EMPTY_BADGE = { icon_key: "shield", title_fr: "", title_ar: "", subtitle_fr: "", subtitle_ar: "", is_active: true };

export default function HomepagePage() {
  const [sections, setSections] = useState([]);
  const [banners, setBanners] = useState([]);
  const [badges, setBadges] = useState([]);
  const [customSettings, setCustomSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newBanner, setNewBanner] = useState({ title: "", caption: "", customer_name: "", image_url: "", link_url: "", placement: "homepage_hero" });
  const [newBadge, setNewBadge] = useState(EMPTY_BADGE);

  const load = () => {
    Promise.all([
      adminHomepageSectionsApi.list(), adminBannersApi.list(), customPackSettingsApi.get(), adminTrustBadgesApi.list(),
    ])
      .then(([s, b, cp, badges]) => { setSections(s); setBanners(b); setCustomSettings(cp); setBadges(badges); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const updateSection = (id, data) => setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));

  const saveSection = async (section) => {
    await adminHomepageSectionsApi.update(section.id, {
      title_fr: section.title_fr, title_ar: section.title_ar,
      subtitle_fr: section.subtitle_fr, subtitle_ar: section.subtitle_ar,
      is_active: section.is_active,
    });
    Swal.fire({ icon: "success", title: "Section enregistrée", timer: 1000, showConfirmButton: false });
  };

  const moveSection = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const next = [...sections];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setSections(next);
    await adminHomepageSectionsApi.reorder(next.map((s, i) => ({ id: s.id, display_order: i })));
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
    setNewBanner({ title: "", caption: "", customer_name: "", image_url: "", link_url: "", placement: "homepage_hero" });
    load();
  };

  const removeBanner = async (id) => {
    await adminBannersApi.remove(id);
    load();
  };

  const moveBanner = async (placementBanners, index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= placementBanners.length) return;
    const next = [...placementBanners];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    await adminBannersApi.reorder(next.map((b, i) => ({ id: b.id, display_order: i })));
    load();
  };

  const addBadge = async () => {
    if (!newBadge.title_fr) {
      Swal.fire({ icon: "warning", title: "Le titre (FR) est requis" });
      return;
    }
    await adminTrustBadgesApi.create(newBadge);
    setNewBadge(EMPTY_BADGE);
    load();
  };

  const updateBadge = (id, data) => setBadges((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  const saveBadge = async (badge) => {
    await adminTrustBadgesApi.update(badge.id, badge);
    Swal.fire({ icon: "success", title: "Badge enregistré", timer: 1000, showConfirmButton: false });
  };
  const removeBadge = async (id) => { await adminTrustBadgesApi.remove(id); load(); };
  const moveBadge = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= badges.length) return;
    const next = [...badges];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setBadges(next);
    await adminTrustBadgesApi.reorder(next.map((b, i) => ({ id: b.id, display_order: i })));
  };

  if (loading) return <p style={{ color: "var(--adm-text-light)" }}>Chargement...</p>;

  const heroBanners = banners.filter((b) => b.placement === "homepage_hero");
  const ugcBanners = banners.filter((b) => b.placement === "ugc_gallery");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="adm-card">
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "4px" }}>Sections de la page d'accueil</h3>
        <p style={{ fontSize: "0.78rem", color: "var(--adm-text-light)", marginBottom: "16px" }}>
          Titre/sous-titre en français et arabe pour chaque section. Utilisez les flèches pour changer l'ordre d'affichage.
        </p>
        {sections.map((s, i) => (
          <div key={s.id} style={{ borderBottom: "1px solid var(--adm-border)", padding: "14px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <strong style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--adm-text-light)" }}>{s.section_key}</strong>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => moveSection(i, -1)}><FiArrowUp size={12} /></button>
                <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === sections.length - 1} onClick={() => moveSection(i, 1)}><FiArrowDown size={12} /></button>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}>
                  <input type="checkbox" checked={!!s.is_active} onChange={(e) => updateSection(s.id, { is_active: e.target.checked })} /> Visible
                </label>
              </div>
            </div>
            <div className="adm-form-row">
              <input placeholder="Titre (FR)" value={s.title_fr || ""} onChange={(e) => updateSection(s.id, { title_fr: e.target.value })} />
              <input dir="rtl" placeholder="العنوان (AR)" value={s.title_ar || ""} onChange={(e) => updateSection(s.id, { title_ar: e.target.value })} />
            </div>
            <div className="adm-form-row" style={{ marginTop: "8px" }}>
              <input placeholder="Sous-titre (FR)" value={s.subtitle_fr || ""} onChange={(e) => updateSection(s.id, { subtitle_fr: e.target.value })} />
              <input dir="rtl" placeholder="الوصف (AR)" value={s.subtitle_ar || ""} onChange={(e) => updateSection(s.id, { subtitle_ar: e.target.value })} />
            </div>
            <button className="adm-btn adm-btn-outline adm-btn-sm" style={{ marginTop: "8px" }} onClick={() => saveSection(s)}>
              <FiSave size={12} /> Enregistrer
            </button>
          </div>
        ))}
      </div>

      <div className="adm-card">
        <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "16px" }}>Badges de confiance (bandeau sous les packs)</h3>
        {badges.map((b, i) => (
          <div key={b.id} style={{ borderBottom: "1px solid var(--adm-border)", padding: "14px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <select value={b.icon_key} onChange={(e) => updateBadge(b.id, { icon_key: e.target.value })} style={{ maxWidth: 220 }}>
                {ICON_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => moveBadge(i, -1)}><FiArrowUp size={12} /></button>
                <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === badges.length - 1} onClick={() => moveBadge(i, 1)}><FiArrowDown size={12} /></button>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}>
                  <input type="checkbox" checked={!!b.is_active} onChange={(e) => updateBadge(b.id, { is_active: e.target.checked })} /> Visible
                </label>
                <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => removeBadge(b.id)}><FiTrash2 size={12} /></button>
              </div>
            </div>
            <div className="adm-form-row">
              <input placeholder="Titre (FR)" value={b.title_fr || ""} onChange={(e) => updateBadge(b.id, { title_fr: e.target.value })} />
              <input dir="rtl" placeholder="العنوان (AR)" value={b.title_ar || ""} onChange={(e) => updateBadge(b.id, { title_ar: e.target.value })} />
            </div>
            <div className="adm-form-row" style={{ marginTop: "8px" }}>
              <input placeholder="Sous-texte (FR)" value={b.subtitle_fr || ""} onChange={(e) => updateBadge(b.id, { subtitle_fr: e.target.value })} />
              <input dir="rtl" placeholder="النص الفرعي (AR)" value={b.subtitle_ar || ""} onChange={(e) => updateBadge(b.id, { subtitle_ar: e.target.value })} />
            </div>
            <button className="adm-btn adm-btn-outline adm-btn-sm" style={{ marginTop: "8px" }} onClick={() => saveBadge(b)}>
              <FiSave size={12} /> Enregistrer
            </button>
          </div>
        ))}
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed var(--adm-border)" }}>
          <div className="adm-form-row">
            <select value={newBadge.icon_key} onChange={(e) => setNewBadge({ ...newBadge, icon_key: e.target.value })}>
              {ICON_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
            <input placeholder="Titre (FR) *" value={newBadge.title_fr} onChange={(e) => setNewBadge({ ...newBadge, title_fr: e.target.value })} />
          </div>
          <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ marginTop: "10px" }} onClick={addBadge}><FiPlus size={12} /> Ajouter un badge</button>
        </div>
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
          Utilisez "Galerie UGC" pour les photos de livraison / vidéos clients affichées sur la page d'accueil. Légende et nom du client optionnels.
        </p>
        {[["Bannière page d'accueil", heroBanners], ["Galerie UGC / Livraisons", ugcBanners]].map(([label, list]) => (
          <div key={label} style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--adm-text-light)", marginBottom: "8px" }}>{label}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {list.map((b, i) => (
                <div key={b.id} style={{ border: "1px solid var(--adm-border)", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                  <img src={b.image_url} alt={b.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 6, insetInlineEnd: 6, display: "flex", gap: "4px" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" style={{ background: "white" }} disabled={i === 0} onClick={() => moveBanner(list, i, -1)}><FiArrowUp size={11} /></button>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" style={{ background: "white" }} disabled={i === list.length - 1} onClick={() => moveBanner(list, i, 1)}><FiArrowDown size={11} /></button>
                    <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => removeBanner(b.id)}><FiTrash2 size={12} /></button>
                  </div>
                  <div style={{ padding: "8px", fontSize: "0.75rem" }}>
                    {b.title || "(sans titre)"}
                    {b.customer_name && <div style={{ fontSize: "0.68rem", fontWeight: 600 }}>@ {b.customer_name}</div>}
                    {b.caption && <div style={{ fontSize: "0.68rem", color: "var(--adm-text-light)" }}>{b.caption}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
        <div className="adm-form-row">
          <div className="adm-form-group"><label>Nom du client (optionnel)</label><input value={newBanner.customer_name} onChange={(e) => setNewBanner({ ...newBanner, customer_name: e.target.value })} /></div>
          <div className="adm-form-group"><label>Légende (optionnel)</label><input value={newBanner.caption} onChange={(e) => setNewBanner({ ...newBanner, caption: e.target.value })} /></div>
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
