import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FiSave, FiRotateCcw, FiSearch } from "react-icons/fi";
import { adminSiteContentApi } from "../../services/api";

// Admin-facing category order (falls back to alphabetical for any
// category not listed here, so a future translation namespace never
// silently disappears from the editor).
const CATEGORY_ORDER = [
  "nav", "home", "directOrder", "reviewsSection", "packsPage", "packCard", "packDetails",
  "replaceModal", "perfumeModal", "perfumeCard", "buildPack", "cart", "checkout", "thankYou",
  "contactPage", "faqPage", "orderTrackingPage", "wishlistPage", "countdown", "whatsapp",
];

export default function ContentPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [edits, setEdits] = useState({}); // content_key -> { value_fr, value_ar }
  const [savingKey, setSavingKey] = useState(null);

  const load = () => adminSiteContentApi.list().then(setRows).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const categories = useMemo(() => {
    const present = [...new Set(rows.map((r) => r.category))];
    const ordered = CATEGORY_ORDER.filter((c) => present.includes(c));
    const rest = present.filter((c) => !CATEGORY_ORDER.includes(c)).sort();
    return [...ordered, ...rest];
  }, [rows]);

  const filtered = useMemo(() => {
    let list = rows;
    if (category !== "all") list = list.filter((r) => r.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((r) =>
        r.content_key.toLowerCase().includes(q) ||
        (r.value_fr || "").toLowerCase().includes(q) ||
        (r.value_ar || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [rows, category, query]);

  const getValue = (row, field) => (edits[row.content_key]?.[field] !== undefined ? edits[row.content_key][field] : row[field] || "");
  const setValue = (key, field, value) => setEdits((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));

  const save = async (row) => {
    setSavingKey(row.content_key);
    try {
      const value_fr = getValue(row, "value_fr");
      const value_ar = getValue(row, "value_ar");
      const updated = await adminSiteContentApi.update(row.content_key, { category: row.category, value_fr, value_ar });
      setRows((prev) => prev.map((r) => (r.content_key === row.content_key ? updated : r)));
      setEdits((prev) => { const next = { ...prev }; delete next[row.content_key]; return next; });
      Swal.fire({ icon: "success", title: "Enregistré", timer: 1000, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error || "Échec de l'enregistrement" });
    } finally {
      setSavingKey(null);
    }
  };

  const reset = async (row) => {
    const r = await Swal.fire({
      icon: "warning", title: "Rétablir le texte par défaut ?",
      text: "Ceci efface votre modification pour ce texte.",
      showCancelButton: true, confirmButtonText: "Rétablir", confirmButtonColor: "#C62828", cancelButtonText: "Annuler",
    });
    if (!r.isConfirmed) return;
    setSavingKey(row.content_key);
    try {
      const updated = await adminSiteContentApi.reset(row.content_key);
      setRows((prev) => prev.map((x) => (x.content_key === row.content_key ? updated : x)));
      setEdits((prev) => { const next = { ...prev }; delete next[row.content_key]; return next; });
    } finally {
      setSavingKey(null);
    }
  };

  const isDirty = (row) => {
    const e = edits[row.content_key];
    return e && ((e.value_fr !== undefined && e.value_fr !== (row.value_fr || "")) || (e.value_ar !== undefined && e.value_ar !== (row.value_ar || "")));
  };

  if (loading) return <p style={{ color: "var(--adm-text-light)" }}>Chargement...</p>;

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Contenu du site ({rows.length})</h1>
        <div style={{ position: "relative" }}>
          <FiSearch size={14} style={{ position: "absolute", insetInlineStart: 12, top: 11, color: "var(--adm-text-light)" }} />
          <input
            className="adm-search-input" style={{ paddingInlineStart: 34 }}
            placeholder="Rechercher une clé ou un texte..." value={query} onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <p style={{ fontSize: "0.8rem", color: "var(--adm-text-light)", marginBottom: "16px" }}>
        Modifiez ici les textes affichés aux clients (boutons, titres, messages...). Les changements sont visibles immédiatement sur le site.
        Laissez un champ vide et cliquez "Rétablir" pour revenir au texte d'origine.
      </p>

      <div className="adm-tabs">
        <button className={`adm-tab${category === "all" ? " active" : ""}`} onClick={() => setCategory("all")}>
          Tout <span className="adm-tab-count">({rows.length})</span>
        </button>
        {categories.map((c) => (
          <button key={c} className={`adm-tab${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
            {c} <span className="adm-tab-count">({rows.filter((r) => r.category === c).length})</span>
          </button>
        ))}
      </div>

      <div className="adm-card">
        {filtered.length === 0 ? (
          <div className="adm-empty">Aucun résultat</div>
        ) : (
          filtered.map((row) => (
            <div className="adm-content-row" key={row.content_key}>
              <div className="adm-content-key">{row.content_key}</div>
              <div className="adm-form-group" style={{ margin: 0 }}>
                <label>Français</label>
                <textarea rows={2} value={getValue(row, "value_fr")} onChange={(e) => setValue(row.content_key, "value_fr", e.target.value)} />
              </div>
              <div className="adm-form-group" style={{ margin: 0 }}>
                <label>العربية</label>
                <textarea dir="rtl" rows={2} value={getValue(row, "value_ar")} onChange={(e) => setValue(row.content_key, "value_ar", e.target.value)} />
              </div>
              <div className="adm-content-actions">
                <button
                  className="adm-btn adm-btn-primary adm-btn-sm"
                  disabled={!isDirty(row) || savingKey === row.content_key}
                  onClick={() => save(row)}
                >
                  <FiSave size={12} /> Enregistrer
                </button>
                <button className="adm-btn adm-btn-outline adm-btn-sm" disabled={savingKey === row.content_key} onClick={() => reset(row)}>
                  <FiRotateCcw size={12} /> Rétablir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
