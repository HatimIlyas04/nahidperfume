import { useEffect, useState } from "react";
import { adminCustomersApi } from "../../services/api";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debounced so typing a name doesn't fire one request per keystroke —
    // matches the pattern already used for the storefront's Navbar search.
    const timer = setTimeout(() => {
      setLoading(true);
      adminCustomersApi.list({ search: search || undefined })
        .then((r) => { setCustomers(r.rows); setTotal(r.total); })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Clients ({total})</h1>
        <input className="adm-search-input" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="adm-table-wrap" style={{ opacity: loading && customers.length > 0 ? 0.55 : 1, transition: "opacity 0.15s" }}>
        <table className="adm-table">
          <thead><tr><th>Nom</th><th>Téléphone</th><th>Email</th><th>Commandes</th><th>Total dépensé</th></tr></thead>
          <tbody>
            {loading && customers.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: "30px" }}>Chargement...</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={5} className="adm-empty">Aucun client pour le moment</td></tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.email || "—"}</td>
                  <td>{c.orders_count}</td>
                  <td>{Math.round(c.total_spent)} MAD</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
