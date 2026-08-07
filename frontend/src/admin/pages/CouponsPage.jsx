import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { adminCouponsApi } from "../../services/api";

const EMPTY = { code: "", discount_type: "percent", discount_value: "", min_order_amount: "", max_uses: "", is_active: true };

export default function CouponsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = () => adminCouponsApi.list().then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); setForm({ ...EMPTY, ...c, is_active: !!c.is_active }); setModalOpen(true); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      discount_value: Number(form.discount_value),
      min_order_amount: form.min_order_amount ? Number(form.min_order_amount) : null,
      max_uses: form.max_uses ? Number(form.max_uses) : null,
    };
    try {
      if (editing) await adminCouponsApi.update(editing.id, payload);
      else await adminCouponsApi.create(payload);
      setModalOpen(false);
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error });
    }
  };

  const remove = async (id) => {
    const r = await Swal.fire({ icon: "warning", title: "Supprimer ce coupon ?", showCancelButton: true, confirmButtonColor: "#C62828" });
    if (!r.isConfirmed) return;
    await adminCouponsApi.remove(id);
    load();
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h1>Coupons ({items.length})</h1>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}><FiPlus size={14} /> Nouveau coupon</button>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Code</th><th>Réduction</th><th>Utilisations</th><th>Statut</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={5} style={{ textAlign: "center", padding: 30 }}>Chargement...</td></tr> :
              items.length === 0 ? <tr><td colSpan={5} className="adm-empty">Aucun coupon</td></tr> :
              items.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.code}</strong></td>
                  <td>{c.discount_type === "percent" ? `${c.discount_value}%` : `${c.discount_value} MAD`}</td>
                  <td>{c.used_count}{c.max_uses ? ` / ${c.max_uses}` : ""}</td>
                  <td><span className={`adm-badge adm-badge-${c.is_active ? "active" : "inactive"}`}>{c.is_active ? "Actif" : "Inactif"}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button className="adm-btn adm-btn-outline adm-btn-sm adm-btn-icon" onClick={() => openEdit(c)}><FiEdit2 size={13} /></button>{" "}
                    <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" onClick={() => remove(c.id)}><FiTrash2 size={13} /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="adm-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-head"><h3>{editing ? "Modifier" : "Nouveau coupon"}</h3></div>
            <form onSubmit={save}>
              <div className="adm-form-group"><label>Code *</label><input required value={form.code} onChange={set("code")} style={{ textTransform: "uppercase" }} /></div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Type</label>
                  <select value={form.discount_type} onChange={set("discount_type")}>
                    <option value="percent">Pourcentage</option>
                    <option value="fixed">Montant fixe</option>
                  </select>
                </div>
                <div className="adm-form-group"><label>Valeur *</label><input type="number" step="0.01" required value={form.discount_value} onChange={set("discount_value")} /></div>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group"><label>Commande minimum</label><input type="number" step="0.01" value={form.min_order_amount} onChange={set("min_order_amount")} /></div>
                <div className="adm-form-group"><label>Utilisations max</label><input type="number" value={form.max_uses} onChange={set("max_uses")} /></div>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", margin: "10px 0" }}>
                <input type="checkbox" checked={form.is_active} onChange={set("is_active")} /> Actif
              </label>
              <div className="adm-form-actions">
                <button type="button" className="adm-btn adm-btn-outline" onClick={() => setModalOpen(false)}>Annuler</button>
                <button type="submit" className="adm-btn adm-btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
