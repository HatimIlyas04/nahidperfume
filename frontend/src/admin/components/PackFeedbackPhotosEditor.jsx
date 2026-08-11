import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiUploadCloud, FiX, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { adminPackFeedbackImagesApi, uploadApi } from "../../services/api";

const FEEDBACK_FOLDER = "nahid-perfume/feedbacks/packs";

/** Self-contained: each action (upload, reorder, remove) saves immediately
 *  via its own API call rather than being deferred to the pack form's
 *  "Enregistrer" button -- so photo work is never lost if the admin
 *  navigates away without submitting the main form. Only rendered when
 *  editing an existing pack (packId is required) since a feedback image
 *  needs a real pack_id to attach to. */
export default function PackFeedbackPhotosEditor({ packId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    adminPackFeedbackImagesApi.list(packId).then(setImages).catch(() => {}).finally(() => setLoading(false));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [packId]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const { data } = await uploadApi.image(file, FEEDBACK_FOLDER);
        await adminPackFeedbackImagesApi.create(packId, data.url);
      }
      load();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Échec du téléchargement",
        text: err.response?.data?.message || err.response?.data?.error || "Veuillez réessayer.",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const remove = async (img) => {
    const r = await Swal.fire({ icon: "warning", title: "Supprimer cette photo ?", showCancelButton: true, confirmButtonColor: "#C62828" });
    if (!r.isConfirmed) return;
    setImages((prev) => prev.filter((i) => i.id !== img.id));
    await adminPackFeedbackImagesApi.remove(img.id);
  };

  const move = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const next = [...images];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setImages(next);
    await adminPackFeedbackImagesApi.reorder(packId, next.map((img, i) => ({ id: img.id, display_order: i })));
  };

  return (
    <div className="adm-form-group">
      <label>Photos de retours clients</label>
      <p style={{ fontSize: "0.74rem", color: "var(--adm-text-light)", marginTop: "-4px", marginBottom: "10px" }}>
        Ajoutez les captures d'écran et photos de clientes ayant partagé leur expérience avec cette offre.
        Ces photos apparaissent uniquement sur la page de ce pack.
      </p>

      {loading ? (
        <p style={{ fontSize: "0.78rem", color: "var(--adm-text-light)" }}>Chargement...</p>
      ) : images.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
          {images.map((img, i) => (
            <div key={img.id} style={{ position: "relative", width: 90 }}>
              <img
                src={img.image_url}
                alt=""
                style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8, border: "1px solid var(--adm-border)", display: "block" }}
              />
              <button
                type="button"
                onClick={() => remove(img)}
                aria-label="Supprimer"
                style={{
                  position: "absolute", top: -6, insetInlineEnd: -6, width: 20, height: 20, borderRadius: "50%",
                  background: "#C62828", color: "white", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <FiX size={12} />
              </button>
              <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "4px" }}>
                <button type="button" className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => move(i, -1)}><FiArrowUp size={10} /></button>
                <button type="button" className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" disabled={i === images.length - 1} onClick={() => move(i, 1)}><FiArrowDown size={10} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="adm-btn adm-btn-outline adm-btn-sm" style={{ cursor: "pointer", display: "inline-flex" }}>
        <FiUploadCloud size={13} /> {uploading ? "Téléchargement..." : "+ Ajouter des photos"}
        <input type="file" accept="image/*" multiple hidden onChange={handleUpload} disabled={uploading} />
      </label>
    </div>
  );
}
