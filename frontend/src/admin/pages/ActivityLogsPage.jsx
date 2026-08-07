import { useEffect, useState } from "react";
import { adminActivityLogsApi } from "../../services/api";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminActivityLogsApi.list({ page_size: 100 })
      .then((r) => { setLogs(r.rows); setTotal(r.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="adm-toolbar"><h1>Journaux d'activité ({total})</h1></div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Admin</th><th>Action</th><th>Cible</th><th>Date</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: "30px" }}>Chargement...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={4} className="adm-empty">Aucune activité enregistrée</td></tr>
            ) : (
              logs.map((l) => (
                <tr key={l.id}>
                  <td>{l.admin_username || "Système"}</td>
                  <td><code style={{ fontSize: "0.78rem" }}>{l.action}</code></td>
                  <td>{l.entity_type ? `${l.entity_type} #${l.entity_id}` : "—"}</td>
                  <td>{new Date(l.created_at).toLocaleString("fr-FR")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
