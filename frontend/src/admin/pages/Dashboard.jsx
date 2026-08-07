import { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Tooltip, Legend, Filler,
} from "chart.js";
import { FiShoppingBag, FiDollarSign, FiClock, FiTrendingUp } from "react-icons/fi";
import { adminOrdersApi } from "../../services/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const STATUS_COLORS = {
  pending: "#E65100", confirmed: "#1565C0", preparing: "#7B1FA2",
  shipping: "#00695C", delivered: "#2E7D32", cancelled: "#C62828",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminOrdersApi.stats().then(setStats).catch(() => {});
  }, []);

  if (!stats) {
    return (
      <div>
        <div className="adm-stat-grid">
          {[0, 1, 2, 3].map((i) => <div className="adm-dash-skel" key={i} style={{ height: "96px" }} />)}
        </div>
        <div className="adm-dash-grid">
          <div className="adm-dash-skel" style={{ height: "280px" }} />
          <div className="adm-dash-skel" style={{ height: "280px" }} />
        </div>
      </div>
    );
  }

  const { totals, byStatus, revenueByDay, topPerfumes } = stats;

  const lineData = {
    labels: revenueByDay.map((d) => new Date(d.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })),
    datasets: [
      {
        label: "Revenu (MAD)",
        data: revenueByDay.map((d) => Number(d.revenue)),
        borderColor: "#EF776A",
        backgroundColor: "rgba(239,119,106,0.12)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const doughnutData = {
    labels: byStatus.map((s) => s.status),
    datasets: [
      {
        data: byStatus.map((s) => s.count),
        backgroundColor: byStatus.map((s) => STATUS_COLORS[s.status] || "#999"),
        borderWidth: 0,
      },
    ],
  };

  const cards = [
    { label: "Commandes totales", value: totals.totalOrders, icon: FiShoppingBag, color: "#EF776A" },
    { label: "Revenu total", value: `${Math.round(totals.totalRevenue).toLocaleString("fr-MA")} MAD`, icon: FiDollarSign, color: "#2E7D32" },
    { label: "En attente", value: totals.pendingOrders, icon: FiClock, color: "#E65100" },
    { label: "Aujourd'hui", value: `${totals.ordersToday} · ${Math.round(totals.revenueToday)} MAD`, icon: FiTrendingUp, color: "#1565C0" },
  ];

  return (
    <div>
      <div className="adm-stat-grid">
        {cards.map((c) => (
          <div className="adm-stat-card" key={c.label}>
            <div className="adm-stat-icon" style={{ background: `${c.color}20`, color: c.color }}>
              <c.icon size={18} />
            </div>
            <div className="adm-stat-label">{c.label}</div>
            <div className="adm-stat-value">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="adm-dash-grid">
        <div className="adm-card">
          <h3 className="adm-dash-card-title">Revenu (30 derniers jours)</h3>
          {revenueByDay.length === 0 ? (
            <p style={{ color: "var(--adm-text-light)" }}>Pas encore de données.</p>
          ) : (
            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          )}
        </div>
        <div className="adm-card">
          <h3 className="adm-dash-card-title">Statuts</h3>
          {byStatus.length === 0 ? (
            <p style={{ color: "var(--adm-text-light)" }}>Pas encore de données.</p>
          ) : (
            <Doughnut data={doughnutData} options={{ plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } } } }} />
          )}
        </div>
      </div>

      <div className="adm-card">
        <h3 className="adm-dash-card-title">Parfums les plus inclus dans les packs commandés</h3>
        {topPerfumes.length === 0 ? (
          <p style={{ color: "var(--adm-text-light)" }}>Pas encore de données.</p>
        ) : (
          <div className="adm-table-wrap" style={{ border: "none" }}>
            <table className="adm-table">
              <thead><tr><th>Parfum</th><th>Fois inclus</th></tr></thead>
              <tbody>
                {topPerfumes.map((p) => (
                  <tr key={p.perfume_id}><td>{p.perfume_name_snapshot}</td><td>{p.timesIncluded}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
