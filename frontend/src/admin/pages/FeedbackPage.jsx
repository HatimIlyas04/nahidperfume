import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiCheck, FiX, FiTrash2, FiStar } from "react-icons/fi";
import { adminFeedbacksApi, adminTestimonialsApi } from "../../services/api";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminFeedbacksApi.list(statusFilter || undefined).then(setFeedbacks).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [statusFilter]);

  const setStatus = async (id, status) => { await adminFeedbacksApi.setStatus(id, status); load(); };

  const remove = async (id) => {
    const r = await Swal.fire({ icon: "warning", title: "Supprimer cet avis ?", showCancelButton: true, confirmButtonColor: "#C62828" });
    if (!r.isConfirmed) return;
    await adminFeedbacksApi.remove(id);
    load();
  };

  const promote = async (f) => {
    await adminTestimonialsApi.create({
      source_feedback_id: f.id, name: `${f.first_name} ${f.last_name}`, rating: f.rating, quote: f.message,
    });
    Swal.fire({ icon: "success", title: "Promu en témoignage", timer: 1400, showConfirmButton: false });
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Avis clients</h1>
        <select className="adm-search-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Tous</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvés</option>
          <option value="rejected">Rejetés</option>
        </select>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Client</th><th>Note</th><th>Message</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: "30px" }}>Chargement...</td></tr>
            ) : feedbacks.length === 0 ? (
              <tr><td colSpan={5} className="adm-empty">Aucun avis</td></tr>
            ) : (
              feedbacks.map((f) => (
                <tr key={f.id}>
                  <td>{f.first_name} {f.last_name}</td>
                  <td>{"★".repeat(f.rating)}</td>
                  <td style={{ maxWidth: 320 }}>{f.message}</td>
                  <td><span className={`adm-badge adm-badge-${f.status}`}>{f.status}</span></td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    {f.status !== "approved" && (
                      <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => setStatus(f.id, "approved")} title="Approuver"><FiCheck size={13} /></button>
                    )}{" "}
                    {f.status !== "rejected" && (
                      <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => setStatus(f.id, "rejected")} title="Rejeter"><FiX size={13} /></button>
                    )}{" "}
                    {f.status === "approved" && (
                      <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => promote(f)} title="Promouvoir en témoignage"><FiStar size={13} /></button>
                    )}{" "}
                    <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => remove(f.id)}><FiTrash2 size={13} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
