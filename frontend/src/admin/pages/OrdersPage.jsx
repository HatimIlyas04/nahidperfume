import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import {
  FiEye, FiDownload, FiFileText, FiX, FiUser, FiPhone, FiMapPin,
  FiCheck, FiPackage, FiTruck, FiHome, FiClock, FiTrash2,
} from "react-icons/fi";
import { adminOrdersApi } from "../../services/api";

const STATUSES = ["pending", "confirmed", "preparing", "shipping", "delivered", "cancelled"];
const STATUS_LABEL = {
  pending: "En attente", confirmed: "Confirmée", preparing: "Préparation",
  shipping: "Expédition", delivered: "Livrée", cancelled: "Annulée",
};
const TIMELINE_STEPS = [
  { key: "pending", label: "Reçue", icon: FiClock },
  { key: "confirmed", label: "Confirmée", icon: FiCheck },
  { key: "preparing", label: "Préparation", icon: FiPackage },
  { key: "shipping", label: "Expédition", icon: FiTruck },
  { key: "delivered", label: "Livrée", icon: FiHome },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    adminOrdersApi.list({ search: search || undefined, status: statusFilter || undefined, page_size: 100 })
      .then((r) => { setOrders(r.rows); setTotal(r.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Debounced: typing in the search box previously fired one request per
    // keystroke. statusFilter changes (a <select>, not free text) still
    // fire immediately since there's no rapid-keystroke concern there.
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  const handleStatusChange = async (id, status) => {
    await adminOrdersApi.updateStatus(id, status);
    load();
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const handleDelete = async (order) => {
    const r = await Swal.fire({
      icon: "warning",
      title: "Supprimer cette commande ?",
      html: `<strong>${order.order_number}</strong><br/>Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.<br/><span dir="rtl">هل أنت متأكد من رغبتك في حذف هذا الطلب؟ هذا الإجراء لا يمكن التراجع عنه.</span>`,
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#C62828",
    });
    if (!r.isConfirmed) return;
    try {
      await adminOrdersApi.remove(order.id);
      if (selected?.id === order.id) setSelected(null);
      load();
      Swal.fire({ icon: "success", title: "Commande supprimée", timer: 1400, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error || "Impossible de supprimer cette commande." });
    }
  };

  const exportExcel = () => {
    const rows = orders.map((o) => ({
      "N° Commande": o.order_number, Client: o.customer_name, Téléphone: o.customer_phone,
      Ville: o.customer_city, Total: o.total_amount, Statut: STATUS_LABEL[o.status],
      Date: new Date(o.created_at).toLocaleString("fr-FR"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Commandes");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), `commandes_${Date.now()}.xlsx`);
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Nahid Perfumes — Commandes", 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [["N°", "Client", "Téléphone", "Ville", "Total", "Statut", "Date"]],
      body: orders.map((o) => [
        o.order_number, o.customer_name, o.customer_phone, o.customer_city || "-",
        `${Math.round(o.total_amount)} MAD`, STATUS_LABEL[o.status],
        new Date(o.created_at).toLocaleDateString("fr-FR"),
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [239, 119, 106] },
    });
    doc.save(`commandes_${Date.now()}.pdf`);
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Commandes ({total})</h1>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input className="adm-search-input" placeholder="Rechercher (N°, nom, téléphone)..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="adm-search-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Tous les statuts</option>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
          <button className="adm-btn adm-btn-outline" onClick={exportExcel}><FiDownload size={13} /> Excel</button>
          <button className="adm-btn adm-btn-outline" onClick={exportPdf}><FiFileText size={13} /> PDF</button>
        </div>
      </div>

      <div className="adm-table-wrap" style={{ opacity: loading && orders.length > 0 ? 0.55 : 1, transition: "opacity 0.15s" }}>
        <table className="adm-table">
          <thead><tr><th>N°</th><th>Client</th><th>Téléphone</th><th>Total</th><th>Statut</th><th>Date</th><th></th></tr></thead>
          <tbody>
            {loading && orders.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "30px" }}>Chargement...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="adm-empty">Aucune commande</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.order_number}</td>
                  <td>{o.customer_name}</td>
                  <td>{o.customer_phone}</td>
                  <td>{Math.round(o.total_amount)} MAD</td>
                  <td>
                    <select
                      className={`adm-badge adm-badge-${o.status}`}
                      style={{ border: "none", cursor: "pointer" }}
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                    </select>
                  </td>
                  <td>{new Date(o.created_at).toLocaleDateString("fr-FR")}</td>
                  <td style={{ display: "flex", gap: "6px" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => setSelected(o)}><FiEye size={13} /></button>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" style={{ color: "#C62828", borderColor: "#C62828" }} onClick={() => handleDelete(o)} aria-label="Supprimer"><FiTrash2 size={13} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="adm-modal-overlay" onClick={() => setSelected(null)}>
          <div className="adm-modal adm-order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-order-head">
              <div>
                <h3>{selected.order_number}</h3>
                <span className={`adm-badge adm-badge-${selected.status}`}>{STATUS_LABEL[selected.status]}</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="adm-btn adm-btn-outline adm-btn-sm" style={{ color: "#C62828", borderColor: "#C62828" }} onClick={() => handleDelete(selected)}>
                  <FiTrash2 size={13} /> Supprimer
                </button>
                <button className="adm-order-close" onClick={() => setSelected(null)} aria-label="Fermer"><FiX size={16} /></button>
              </div>
            </div>

            <div className="adm-order-body">
              <div className="adm-order-customer">
                <div className="adm-order-customer-row"><FiUser size={14} /> <strong>{selected.customer_name}</strong></div>
                <div className="adm-order-customer-row"><FiPhone size={14} /> {selected.customer_phone}</div>
                <div className="adm-order-customer-row">
                  <FiMapPin size={14} /> {selected.customer_address}{selected.customer_city ? `, ${selected.customer_city}` : ""}
                </div>
              </div>

              {selected.status === "cancelled" ? (
                <div className="adm-order-cancelled">Cette commande a été annulée.</div>
              ) : (
                <div className="adm-order-timeline">
                  {TIMELINE_STEPS.map((step, i) => {
                    const currentIdx = STATUSES.indexOf(selected.status);
                    const done = i <= currentIdx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className={`adm-order-tl-step${done ? " done" : ""}`}>
                        <div className="adm-order-tl-dot"><Icon size={14} /></div>
                        <span className="adm-order-tl-label">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="adm-order-section-label">Articles</div>
              <div className="adm-order-items">
                {selected.items.map((item) => (
                  <div className="adm-order-item" key={item.id}>
                    <img className="adm-order-item-img" src={item.item_image_snapshot || "/nahid1.png"} alt="" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="adm-order-item-name">{item.item_name_snapshot}</div>
                      {item.perfumes?.length > 0 && (
                        <div className="adm-order-item-sub">{item.perfumes.map((p) => p.perfume_name_snapshot).join(", ")}</div>
                      )}
                    </div>
                    <div className="adm-order-item-qty">× {item.quantity}</div>
                    <div className="adm-order-item-price">{Math.round(item.unit_price * item.quantity)} MAD</div>
                  </div>
                ))}
              </div>

              <div className="adm-order-totals">
                <div className="adm-order-totals-row"><span>Sous-total</span><span>{Math.round(selected.subtotal_amount)} MAD</span></div>
                <div className="adm-order-totals-row"><span>Livraison</span><span>{Number(selected.shipping_amount) > 0 ? `${Math.round(selected.shipping_amount)} MAD` : "Gratuite"}</span></div>
                {selected.discount_amount > 0 && (
                  <div className="adm-order-totals-row"><span>Réduction{selected.coupon_code_snapshot ? ` (${selected.coupon_code_snapshot})` : ""}</span><span>−{Math.round(selected.discount_amount)} MAD</span></div>
                )}
                <div className="adm-order-totals-row total"><span>Total</span><span>{Math.round(selected.total_amount)} MAD</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
