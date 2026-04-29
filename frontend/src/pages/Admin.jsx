import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/* ═══════════════════════════════════════════════
   STATIC CONFIG
═══════════════════════════════════════════════ */
const STATUS_CFG = {
  pending:    { label: "En attente",  bg: "#FFF7ED", color: "#C2410C", dot: "#FB923C" },
  processing: { label: "En cours",    bg: "#EFF6FF", color: "#1D4ED8", dot: "#60A5FA" },
  shipped:    { label: "Expédiée",    bg: "#F5F3FF", color: "#6D28D9", dot: "#A78BFA" },
  delivered:  { label: "Livrée",     bg: "#F0FDF4", color: "#166534", dot: "#4ADE80" },
  cancelled:  { label: "Annulée",    bg: "#FEF2F2", color: "#991B1B", dot: "#F87171" },
};

const NAV = [
  { id: "dashboard", label: "Vue d'ensemble", icon: "◈" },
  { id: "products",  label: "Produits",        icon: "✦" },
  { id: "orders",    label: "Commandes",        icon: "◫" },
  { id: "customers", label: "Clients",          icon: "◉" },
  { id: "delivery",  label: "Livraison",        icon: "◎" },
  { id: "settings",  label: "Paramètres",       icon: "◬" },
];

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
const Admin = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const [activePage,      setActivePage]      = useState("dashboard");
  const [sidebarOpen,     setSidebarOpen]     = useState(true);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [username,        setUsername]        = useState("");
  const [password,        setPassword]        = useState("");
  const [error,           setError]           = useState("");
  const [loading,         setLoading]         = useState(false);
  const [products,        setProducts]        = useState([]);
  const [orders,          setOrders]          = useState([]);
  const [customers,       setCustomers]       = useState([]);
  const [stats,           setStats]           = useState({ totalProducts: 0, totalOrders: 0, revenue: 0 });
  const [editingProduct,  setEditingProduct]  = useState(null);
  const [formData,        setFormData]        = useState({ name:"", description:"", price:"", image_url:"", category:"", stock:"" });
  const [notification,    setNotification]    = useState({ text:"", type:"" });
  const [searchTerm,      setSearchTerm]      = useState("");
  const [orderSearch,     setOrderSearch]     = useState("");
  const [currentPage,     setCurrentPage]     = useState(1);
  const [imagePreview,    setImagePreview]    = useState("");
  const [showForm,        setShowForm]        = useState(false);
  const itemsPerPage = 8;

  const token     = localStorage.getItem("adminToken");
  const isLoggedIn = !!token || isAdminLoggedIn;
  const authHdr   = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } });
  const fmt       = (n) => Math.round(Number(n)).toLocaleString("fr-MA");

  const notify = (text, type = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification({ text:"", type:"" }), 3500);
  };

  const fetchData = async () => {
    const t = localStorage.getItem("adminToken");
    if (!t) return;
    try {
      const h = { headers: { Authorization: `Bearer ${t}` } };
      const [p, o, s] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/orders", h),
        axios.get("/api/admin/stats", h),
      ]);
      setProducts(p.data);
      setOrders(o.data);
      setStats(s.data);
      setCustomers([...new Map(o.data.map(ord => [ord.customer_email, ord])).values()]);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    }
  };

  useEffect(() => { if (isLoggedIn && token) fetchData(); }, [isLoggedIn]);
  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await axios.post("/api/admin/login", { username, password });
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        setIsAdminLoggedIn?.(true);
        setTimeout(fetchData, 100);
      }
    } catch (err) { setError(err.response?.data?.error || "Identifiants invalides"); }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn?.(false);
    setProducts([]); setOrders([]);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) { notify("Nom et prix sont requis", "error"); return; }
    setLoading(true);
    try {
      const data = {
        name: formData.name, description: formData.description || "",
        price: parseFloat(formData.price),
        image_url: formData.image_url || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
        category: formData.category || "Autre",
        stock: parseInt(formData.stock) || 10,
      };
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct.id}`, data, authHdr());
        notify(`"${formData.name}" modifié avec succès`);
      } else {
        await axios.post("/api/products", data, authHdr());
        notify(`"${formData.name}" ajouté avec succès`);
      }
      setEditingProduct(null);
      setFormData({ name:"", description:"", price:"", image_url:"", category:"", stock:"" });
      setImagePreview(""); setShowForm(false);
      await fetchData();
    } catch (err) {
      if (err.response?.status === 401) { notify("Session expirée", "error"); handleLogout(); }
      else notify(err.response?.data?.error || "Erreur serveur", "error");
    } finally { setLoading(false); }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Supprimer "${name}" ?`)) return;
    try {
      await axios.delete(`/api/products/${id}`, authHdr());
      notify(`"${name}" supprimé`);
      fetchData();
    } catch (err) { notify(err.response?.data?.error || "Impossible de supprimer", "error"); }
  };

  const handleEditProduct = (p) => {
    setEditingProduct(p);
    setFormData({ name:p.name, description:p.description||"", price:p.price, image_url:p.image_url||"", category:p.category||"", stock:p.stock });
    setImagePreview(p.image_url);
    setShowForm(true); setActivePage("products");
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, authHdr());
      notify("Statut mis à jour");
      fetchData();
    } catch { notify("Erreur lors de la mise à jour", "error"); }
  };

  const exportOrdersToExcel = () => {
    const data = orders.map(o => ({
      ID: o.id, Client: o.customer_name, Email: o.customer_email,
      Téléphone: o.customer_phone || "-", Adresse: o.customer_address || "-",
      "Total (MAD)": o.total_amount, Statut: o.status,
      Date: new Date(o.created_at).toLocaleDateString("fr-FR"),
      Articles: o.items?.map(i => `${i.product_name} (x${i.quantity})`).join(", ") || "-",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Commandes");
    saveAs(new Blob([XLSX.write(wb, { bookType:"xlsx", type:"array" })], { type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `commandes_${new Date().toISOString().split("T")[0]}.xlsx`);
    notify("Export Excel réussi !");
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category||"").toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages      = Math.ceil(filteredProducts.length / itemsPerPage);
  const pagedProducts   = filteredProducts.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const filteredOrders  = orders.filter(o =>
    o.customer_name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer_email?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    String(o.id).includes(orderSearch)
  );

  /* ── Login ── */
  if (!isLoggedIn) return (
    <>
      <style>{CSS}</style>
      <div className="a-login">
        {/* Decorative petals */}
        <div className="a-petal a-petal-1" />
        <div className="a-petal a-petal-2" />
        <div className="a-petal a-petal-3" />
        <div className="a-login-card">
          <div className="a-login-mark">N</div>
          <h1 className="a-login-title">Espace Admin</h1>
          <p className="a-login-sub">Nahid Perfume · Tableau de bord</p>
          <form onSubmit={handleLogin} className="a-login-form">
            <div className="a-field">
              <label className="a-field-label">Identifiant</label>
              <input className="a-field-input" type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="a-field">
              <label className="a-field-label">Mot de passe</label>
              <input className="a-field-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <div className="a-login-err">{error}</div>}
            <button className="a-btn-coral a-btn-full" type="submit" disabled={loading}>
              {loading ? <span className="a-spin" /> : "Se connecter →"}
            </button>
          </form>
        </div>
      </div>
    </>
  );

  /* ── Dashboard ── */
  return (
    <>
      <style>{CSS}</style>
      <div className="a-root">

        {/* Mobile overlay */}
        {mobileOpen && <div className="a-overlay" onClick={() => setMobileOpen(false)} />}

        {/* ── SIDEBAR ── */}
        <aside className={`a-sidebar ${sidebarOpen || mobileOpen ? "a-sidebar--open" : "a-sidebar--closed"}`}>
          {/* Decorative accent line */}
          <div className="a-sidebar-accent" />

          <div className="a-sidebar-top">
            <div className="a-sidebar-logo">
              <div className="a-logo-mark">N</div>
              <div>
                <div className="a-logo-name">Nahid Perfume</div>
                <div className="a-logo-sub">Administration</div>
              </div>
            </div>
            <button className="a-sidebar-close" onClick={() => { setSidebarOpen(false); setMobileOpen(false); }}>✕</button>
          </div>

          <nav className="a-nav">
            <div className="a-nav-group-label">Navigation</div>
            {NAV.map(item => (
              <button
                key={item.id}
                className={`a-nav-item ${activePage === item.id ? "a-nav-item--active" : ""}`}
                onClick={() => { setActivePage(item.id); if (window.innerWidth < 1024) setMobileOpen(false); }}
              >
                <span className="a-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.id === "orders" && orders.filter(o => o.status === "pending").length > 0 && (
                  <span className="a-nav-badge">{orders.filter(o => o.status === "pending").length}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="a-sidebar-foot">
            <button className="a-logout" onClick={handleLogout}>
              <span>⎋</span> Déconnexion
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className={`a-main ${sidebarOpen && window.innerWidth >= 1024 ? "a-main--pushed" : ""}`}>

          {/* Topbar */}
          <div className="a-topbar">
            <button className="a-menu-btn" onClick={() => window.innerWidth < 1024 ? setMobileOpen(!mobileOpen) : setSidebarOpen(!sidebarOpen)}>
              <span /><span /><span />
            </button>
            <h2 className="a-topbar-title">
              {{ dashboard:"Vue d'ensemble", products:"Produits", orders:"Commandes", customers:"Clients", delivery:"Livraison", settings:"Paramètres" }[activePage]}
            </h2>
            <div className="a-topbar-right">
              <div className="a-topbar-avatar">A</div>
            </div>
          </div>

          {/* Notification */}
          {notification.text && (
            <div className={`a-notif ${notification.type === "error" ? "a-notif--err" : "a-notif--ok"}`}>
              <span>{notification.type === "error" ? "⚠" : "✓"}</span>
              {notification.text}
            </div>
          )}

          <div className="a-content">

            {/* ══════════════════ DASHBOARD ══════════════════ */}
            {activePage === "dashboard" && (
              <>
                <div className="a-page-head">
                  <div>
                    <h1 className="a-page-title">Tableau de bord</h1>
                    <p className="a-page-sub">Bienvenue dans votre espace Nahid Perfume</p>
                  </div>
                  <button className="a-btn-coral" onClick={() => { setActivePage("products"); setShowForm(true); setEditingProduct(null); setFormData({ name:"", description:"", price:"", image_url:"", category:"", stock:"" }); setImagePreview(""); }}>
                    + Nouveau produit
                  </button>
                </div>

                {/* KPI cards */}
                <div className="a-kpi-grid">
                  {[
                    { icon:"📦", label:"Produits",            value: stats.totalProducts,     color:"#FFF4F2", border:"#FFD7D2" },
                    { icon:"🛒", label:"Commandes",           value: stats.totalOrders,        color:"#F0F4FF", border:"#C7D5FF" },
                    { icon:"💰", label:"Chiffre d'affaires",  value: fmt(stats.revenue)+" MAD",color:"#F2FDF6", border:"#B5EDCA" },
                    { icon:"👥", label:"Clients",             value: customers.length,         color:"#FFF9F0", border:"#FFE4AC" },
                  ].map((k, i) => (
                    <div key={i} className="a-kpi" style={{ "--kpi-bg": k.color, "--kpi-border": k.border, animationDelay: `${i*0.07}s` }}>
                      <div className="a-kpi-icon">{k.icon}</div>
                      <div className="a-kpi-value">{k.value}</div>
                      <div className="a-kpi-label">{k.label}</div>
                    </div>
                  ))}
                </div>

                {/* Status summary strip */}
                <div className="a-status-strip">
                  {Object.entries(STATUS_CFG).map(([k, s]) => (
                    <div key={k} className="a-status-pill" style={{ "--s-bg": s.bg, "--s-color": s.color }}>
                      <span className="a-status-dot" style={{ background: s.dot }} />
                      {s.label} · <strong>{orders.filter(o => o.status === k).length}</strong>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="a-card">
                  <div className="a-card-head">
                    <div className="a-card-title">Dernières commandes</div>
                    <button className="a-btn-ghost" onClick={() => setActivePage("orders")}>Voir tout →</button>
                  </div>
                  <ATable
                    cols={["#", "Client", "Total", "Statut", "Date"]}
                    empty={{ icon:"📋", text:"Aucune commande" }}
                    rows={orders.slice(0, 5).map(o => {
                      const sc = STATUS_CFG[o.status] || STATUS_CFG.pending;
                      return [
                        <span className="a-id">#{o.id}</span>,
                        <span className="a-fw5">{o.customer_name}</span>,
                        <span className="a-coral-fw">{fmt(o.total_amount)} MAD</span>,
                        <StatusBadge cfg={sc} />,
                        <span className="a-date">{new Date(o.created_at).toLocaleDateString("fr-FR")}</span>,
                      ];
                    })}
                  />
                </div>
              </>
            )}

            {/* ══════════════════ PRODUCTS ══════════════════ */}
            {activePage === "products" && (
              <>
                <div className="a-page-head">
                  <div>
                    <h1 className="a-page-title">Produits</h1>
                    <p className="a-page-sub">{products.length} produits au catalogue</p>
                  </div>
                  <button className="a-btn-coral" onClick={() => {
                    setShowForm(!showForm);
                    if (showForm) { setEditingProduct(null); setFormData({ name:"", description:"", price:"", image_url:"", category:"", stock:"" }); setImagePreview(""); }
                  }}>
                    {showForm ? "✕ Fermer" : "+ Nouveau produit"}
                  </button>
                </div>

                {/* Form */}
                {showForm && (
                  <div className="a-form-card">
                    <div className="a-form-title">
                      <div className="a-form-title-dot" />
                      {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
                    </div>
                    <form onSubmit={handleSaveProduct}>
                      <div className="a-form-grid">
                        <div className="a-field a-span2">
                          <label className="a-field-label">Nom du produit *</label>
                          <input className="a-field-input" type="text" placeholder="Ex: Parfum Oud Royal 100ml" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} required />
                        </div>
                        <div className="a-field">
                          <label className="a-field-label">Catégorie</label>
                          <select className="a-field-input" value={formData.category} onChange={e => setFormData({...formData, category:e.target.value})}>
                            <option value="">Sélectionner…</option>
                            {["Homme","Femme","Unisex","Oud"].map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="a-field">
                          <label className="a-field-label">Prix (MAD) *</label>
                          <input className="a-field-input" type="number" step="1" min="0" placeholder="299" value={formData.price} onChange={e => setFormData({...formData, price:e.target.value})} required />
                        </div>
                        <div className="a-field">
                          <label className="a-field-label">Stock</label>
                          <input className="a-field-input" type="number" min="0" placeholder="50" value={formData.stock} onChange={e => setFormData({...formData, stock:e.target.value})} />
                        </div>
                        <div className="a-field a-span3">
                          <label className="a-field-label">URL image</label>
                          <input className="a-field-input" type="text" placeholder="https://…" value={formData.image_url} onChange={e => { setFormData({...formData, image_url:e.target.value}); setImagePreview(e.target.value); }} />
                          {imagePreview && <img src={imagePreview} alt="" className="a-img-preview" onError={e => e.target.style.display="none"} />}
                        </div>
                        <div className="a-field a-span3">
                          <label className="a-field-label">Description</label>
                          <textarea className="a-field-input a-field-textarea" placeholder="Description du produit…" value={formData.description} onChange={e => setFormData({...formData, description:e.target.value})} />
                        </div>
                      </div>
                      <div className="a-form-actions">
                        <button type="submit" className="a-btn-coral" disabled={loading}>
                          {loading ? <span className="a-spin" /> : editingProduct ? "💾 Enregistrer" : "+ Ajouter"}
                        </button>
                        <button type="button" className="a-btn-ghost" onClick={() => { setShowForm(false); setEditingProduct(null); }}>Annuler</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Table */}
                <div className="a-card">
                  <div className="a-card-head">
                    <div className="a-card-title">Catalogue ({filteredProducts.length})</div>
                    <div className="a-search">
                      <span className="a-search-icon">⌕</span>
                      <input type="text" placeholder="Rechercher…" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
                    </div>
                  </div>
                  <ATable
                    cols={["Produit", "Catégorie", "Prix", "Stock", "Actions"]}
                    empty={{ icon:"📦", text:"Aucun produit" }}
                    rows={pagedProducts.map(p => [
                      <div className="a-prod-cell">
                        {p.image_url
                          ? <img src={p.image_url} alt={p.name} className="a-thumb" onError={e => e.target.style.display="none"} />
                          : <div className="a-thumb-ph">🌸</div>}
                        <div>
                          <div className="a-fw5">{p.name}</div>
                          {p.description && <div className="a-text-sm">{p.description.substring(0,42)}…</div>}
                        </div>
                      </div>,
                      <span className="a-cat-badge">{p.category || "Parfum"}</span>,
                      <span className="a-coral-fw">{fmt(p.price)} MAD</span>,
                      <span className={`a-stock-badge ${p.stock < 5 ? "a-stock-low" : "a-stock-ok"}`}>
                        <span className="a-status-dot" style={{ background: p.stock < 5 ? "#F87171" : "#4ADE80" }} />
                        {p.stock} unités
                      </span>,
                      <div className="a-actions">
                        <button className="a-icon-btn a-icon-edit" onClick={() => handleEditProduct(p)}>✎</button>
                        <button className="a-icon-btn a-icon-del"  onClick={() => handleDeleteProduct(p.id, p.name)}>🗑</button>
                      </div>,
                    ])}
                  />
                  {totalPages > 1 && (
                    <div className="a-pagination">
                      <span className="a-pagination-info">Affichage {(currentPage-1)*itemsPerPage+1}–{Math.min(currentPage*itemsPerPage, filteredProducts.length)} / {filteredProducts.length}</span>
                      <div className="a-pagination-btns">
                        <button className="a-page-btn" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>‹</button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pg = currentPage <= 3 ? i+1 : currentPage-2+i;
                          if (pg < 1 || pg > totalPages) return null;
                          return <button key={pg} className={`a-page-btn ${pg === currentPage ? "a-page-btn--active" : ""}`} onClick={() => setCurrentPage(pg)}>{pg}</button>;
                        })}
                        <button className="a-page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>›</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ══════════════════ ORDERS ══════════════════ */}
            {activePage === "orders" && (
              <>
                <div className="a-page-head">
                  <div>
                    <h1 className="a-page-title">Commandes</h1>
                    <p className="a-page-sub">{orders.length} commandes au total</p>
                  </div>
                  <button className="a-btn-coral" onClick={exportOrdersToExcel}>⬇ Exporter Excel</button>
                </div>

                {/* Status strip */}
                <div className="a-status-strip">
                  {Object.entries(STATUS_CFG).map(([k, s]) => (
                    <div key={k} className="a-status-pill" style={{ "--s-bg": s.bg, "--s-color": s.color }}>
                      <span className="a-status-dot" style={{ background: s.dot }} />
                      {s.label} · <strong>{orders.filter(o => o.status === k).length}</strong>
                    </div>
                  ))}
                </div>

                <div className="a-card">
                  <div className="a-card-head">
                    <div className="a-card-title">Toutes les commandes ({filteredOrders.length})</div>
                    <div className="a-search">
                      <span className="a-search-icon">⌕</span>
                      <input type="text" placeholder="Rechercher…" value={orderSearch} onChange={e => setOrderSearch(e.target.value)} />
                    </div>
                  </div>
                  <ATable
                    cols={["Commande", "Client", "Articles", "Total", "Statut", "Date"]}
                    empty={{ icon:"📋", text:"Aucune commande" }}
                    rows={filteredOrders.map(o => {
                      const sc = STATUS_CFG[o.status] || STATUS_CFG.pending;
                      return [
                        <div>
                          <div className="a-id">#{o.id}</div>
                          {o.customer_phone && <div className="a-text-xs">📞 {o.customer_phone}</div>}
                        </div>,
                        <div>
                          <div className="a-fw5">{o.customer_name}</div>
                          <div className="a-text-xs">{o.customer_email}</div>
                          {o.customer_address && <div className="a-text-xs">📍 {o.customer_address}</div>}
                        </div>,
                        <div className="a-items-cell">
                          {o.items?.slice(0,2).map((it,i) => <div key={i} className="a-text-sm">{it.product_name} <span className="a-gray">×{it.quantity}</span></div>)}
                          {o.items?.length > 2 && <span className="a-more">+{o.items.length-2} autres</span>}
                        </div>,
                        <span className="a-coral-fw">{fmt(o.total_amount)} MAD</span>,
                        <select
                          className="a-status-select"
                          value={o.status}
                          onChange={e => handleUpdateOrderStatus(o.id, e.target.value)}
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {Object.entries(STATUS_CFG).map(([v, c]) => <option key={v} value={v}>{c.label}</option>)}
                        </select>,
                        <span className="a-date">{new Date(o.created_at).toLocaleDateString("fr-FR")}</span>,
                      ];
                    })}
                  />
                </div>
              </>
            )}

            {/* ══════════════════ CUSTOMERS ══════════════════ */}
            {activePage === "customers" && (
              <>
                <div className="a-page-head">
                  <div>
                    <h1 className="a-page-title">Clients</h1>
                    <p className="a-page-sub">{customers.length} clients enregistrés</p>
                  </div>
                </div>
                <div className="a-card">
                  <div className="a-card-head">
                    <div className="a-card-title">Base clients</div>
                  </div>
                  <ATable
                    cols={["Client", "Email", "Téléphone", "Commandes", "Total dépensé"]}
                    empty={{ icon:"👥", text:"Aucun client" }}
                    rows={customers.map((c, i) => {
                      const clientOrders = orders.filter(o => o.customer_email === c.customer_email);
                      const total = clientOrders.reduce((s, o) => s + Number(o.total_amount), 0);
                      return [
                        <div className="a-cust-cell">
                          <div className="a-cust-avatar">{c.customer_name?.charAt(0)?.toUpperCase()}</div>
                          <span className="a-fw5">{c.customer_name}</span>
                        </div>,
                        <span className="a-text-sm">{c.customer_email}</span>,
                        <span className="a-text-sm">{c.customer_phone || "—"}</span>,
                        <span className="a-count-badge">{clientOrders.length} cmd</span>,
                        <span className="a-coral-fw">{fmt(total)} MAD</span>,
                      ];
                    })}
                  />
                </div>
              </>
            )}

            {/* ══════════════════ DELIVERY ══════════════════ */}
            {activePage === "delivery" && (
              <>
                <div className="a-page-head">
                  <h1 className="a-page-title">Livraison</h1>
                </div>
                <div className="a-delivery-banner">
                  <div className="a-delivery-icon-wrap">🚚</div>
                  <div>
                    <div className="a-delivery-title">Livraison partout au Maroc</div>
                    <div className="a-delivery-sub">Offerte dès 500 MAD · Délai 24-48h · Suivi en temps réel</div>
                  </div>
                  <div className="a-delivery-active">● Actif</div>
                </div>

                <div className="a-card">
                  <div className="a-card-head"><div className="a-card-title">En cours de livraison</div></div>
                  <ATable
                    cols={["Commande","Client","Adresse","Statut"]}
                    empty={{ icon:"🚚", text:"Aucune livraison en cours" }}
                    rows={orders.filter(o => ["shipped","processing"].includes(o.status)).map(o => {
                      const sc = STATUS_CFG[o.status];
                      return [
                        <span className="a-id">#{o.id}</span>,
                        <span className="a-fw5">{o.customer_name}</span>,
                        <span className="a-text-sm">{o.customer_address || "—"}</span>,
                        <StatusBadge cfg={sc} />,
                      ];
                    })}
                  />
                </div>

                <div className="a-card" style={{ marginTop:18, padding:24 }}>
                  <div className="a-card-title" style={{ marginBottom:14 }}>🇲🇦 Zones desservies</div>
                  <div className="a-zones">
                    {["Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Tétouan","Meknès","Oujda","El Jadida","Settat","Khouribga","Béni Mellal","Kénitra","Laâyoune"].map(z => (
                      <span key={z} className="a-zone-chip">{z}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ══════════════════ SETTINGS ══════════════════ */}
            {activePage === "settings" && (
              <>
                <div className="a-page-head">
                  <h1 className="a-page-title">Paramètres</h1>
                </div>
                <div className="a-form-card" style={{ maxWidth:560 }}>
                  <div className="a-form-title"><div className="a-form-title-dot" />Informations de la boutique</div>
                  <div className="a-form-grid" style={{ gridTemplateColumns:"1fr 1fr" }}>
                    {[
                      { label:"Nom de la boutique", type:"text",  value:"Nahid Perfume",         span:2 },
                      { label:"Email admin",         type:"email", value:"admin@nahidperfume.com", span:1 },
                      { label:"Téléphone",           type:"text",  value:"+212 6 00 00 00 00",    span:1 },
                      { label:"Ville",               type:"text",  value:"Casablanca, Maroc",      span:1 },
                    ].map((f, i) => (
                      <div key={i} className={`a-field ${f.span === 2 ? "a-span2" : ""}`}>
                        <label className="a-field-label">{f.label}</label>
                        <input className="a-field-input" type={f.type} defaultValue={f.value} />
                      </div>
                    ))}
                    <div className="a-field">
                      <label className="a-field-label">Devise</label>
                      <select className="a-field-input" defaultValue="MAD">
                        <option>MAD</option><option>EUR</option><option>USD</option>
                      </select>
                    </div>
                  </div>
                  <div className="a-form-actions">
                    <button className="a-btn-coral">💾 Sauvegarder</button>
                  </div>
                </div>
              </>
            )}

          </div>{/* /a-content */}
        </main>
      </div>
    </>
  );
};

/* ── Sub-components ── */
const StatusBadge = ({ cfg }) => (
  <span className="a-status-badge" style={{ "--s-bg": cfg.bg, "--s-color": cfg.color }}>
    <span className="a-status-dot" style={{ background: cfg.dot }} />
    {cfg.label}
  </span>
);

const ATable = ({ cols, rows, empty }) => (
  <div className="a-table-wrap">
    {rows.length === 0
      ? <div className="a-empty"><div className="a-empty-icon">{empty.icon}</div><p>{empty.text}</p></div>
      : <table className="a-table">
          <thead>
            <tr>{cols.map(c => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ animationDelay: `${ri*0.03}s` }}>
                {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
    }
  </div>
);

/* ═══════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500&display=swap');

/* ── Tokens ──────────────────────────────── */
:root {
  --coral:    #EF776A;
  --coral-d:  #D4574A;
  --coral-xl: #FFF4F2;
  --coral-l:  #FFE8E5;
  --white:    #FFFFFF;
  --bg:       #F8F5F3;
  --border:   #EDE8E5;
  --ink:      #1C1917;
  --ink2:     #57534E;
  --ink3:     #A8A29E;
  --sidebar:  260px;
  --radius:   16px;
  --ease:     cubic-bezier(0.16,1,0.3,1);
  --ff:       'DM Sans', sans-serif;
  --ff-d:     'Playfair Display', serif;
  --shadow:   0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05);
  --shadow-h: 0 4px 16px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.07);
}

/* ── Reset ───────────────────────────────── */
.a-root *, .a-root *::before, .a-root *::after,
.a-login *, .a-login *::before, .a-login *::after { box-sizing:border-box; margin:0; padding:0; }
.a-root, .a-login { font-family: var(--ff); color: var(--ink); }
button { font-family: var(--ff); cursor: pointer; }
input, select, textarea { font-family: var(--ff); }

/* ══════════════════════════════════════════
   LOGIN
══════════════════════════════════════════ */
.a-login {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Decorative petals */
.a-petal {
  position: absolute;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%;
  background: var(--coral);
  opacity: 0.06;
  pointer-events: none;
  animation: a-petal-drift 12s ease-in-out infinite;
}
.a-petal-1 { width:420px;height:420px; top:-160px;right:-120px; animation-delay:0s; }
.a-petal-2 { width:280px;height:280px; bottom:-80px;left:-80px; animation-delay:-5s; opacity:0.04; }
.a-petal-3 { width:160px;height:160px; top:40%;left:60%; animation-delay:-9s; opacity:0.05; }
@keyframes a-petal-drift { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(12deg) scale(1.05)} }

.a-login-card {
  position: relative;
  z-index: 2;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 52px 44px;
  width: 100%;
  max-width: 420px;
  margin: 24px;
  box-shadow: var(--shadow-h);
  animation: a-slide-up 0.6s var(--ease);
}
@keyframes a-slide-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

.a-login-mark {
  width: 60px; height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--coral), var(--coral-d));
  color: white;
  font-size: 26px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 22px;
  box-shadow: 0 8px 24px rgba(239,119,106,0.35);
}
.a-login-title { font-family: var(--ff-d); font-size: 26px; text-align:center; color:var(--ink); font-weight:500; margin-bottom:6px; }
.a-login-sub   { font-size:13px; color:var(--ink3); text-align:center; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:32px; }
.a-login-form  { display:flex; flex-direction:column; gap:14px; }
.a-login-err   { background:#FEF2F2; border:1px solid #FECACA; color:#991B1B; padding:11px 14px; border-radius:10px; font-size:13px; text-align:center; }
.a-login-hint  { font-size:11px; color:var(--ink3); text-align:center; margin-top:20px; letter-spacing:0.04em; }

/* ══════════════════════════════════════════
   ROOT LAYOUT
══════════════════════════════════════════ */
.a-root   { display:flex; min-height:100vh; background:var(--bg); }
.a-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.25);z-index:49;backdrop-filter:blur(3px); }

/* ══════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════ */
.a-sidebar {
  position: fixed;
  top:0; left:0;
  width: var(--sidebar);
  height: 100vh;
  background: var(--white);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s var(--ease);
  overflow: hidden;
}
.a-sidebar--closed { transform: translateX(-100%); }

/* Thin coral accent bar on the right edge */
.a-sidebar-accent {
  position: absolute;
  top: 0; right: 0;
  width: 3px; height: 100%;
  background: linear-gradient(to bottom, var(--coral) 0%, transparent 100%);
  opacity: 0.35;
  pointer-events: none;
}

.a-sidebar-top {
  padding: 22px 18px 18px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 12px;
}
.a-sidebar-logo { display:flex;align-items:center;gap:12px;flex:1;min-width:0; }
.a-logo-mark {
  width:36px;height:36px;border-radius:11px;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white;font-size:16px;font-weight:700;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
  box-shadow:0 4px 12px rgba(239,119,106,0.3);
}
.a-logo-name { font-size:14px;font-weight:600;color:var(--ink);line-height:1.2; }
.a-logo-sub  { font-size:10px;color:var(--ink3);letter-spacing:0.05em;text-transform:uppercase; }
.a-sidebar-close {
  background:none;border:none;color:var(--ink3);font-size:14px;padding:4px;
  border-radius:6px;transition:all 0.15s;display:none;
}
.a-sidebar-close:hover { background:var(--bg);color:var(--ink); }

.a-nav { flex:1;padding:12px 10px;overflow-y:auto;display:flex;flex-direction:column;gap:2px; }
.a-nav-group-label { font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--ink3);padding:10px 10px 6px; }

.a-nav-item {
  display:flex;align-items:center;gap:10px;
  padding:10px 14px;border-radius:12px;
  border:none;background:none;
  font-size:13.5px;font-weight:500;color:var(--ink2);
  width:100%;text-align:left;
  transition:all 0.18s;position:relative;
  cursor:pointer;
}
.a-nav-item:hover { background:var(--coral-xl);color:var(--coral); }
.a-nav-item--active {
  background: var(--coral-l);
  color: var(--coral);
  font-weight: 600;
}
.a-nav-item--active::before {
  content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:3px;height:20px;background:var(--coral);border-radius:0 3px 3px 0;
}
.a-nav-icon { font-size:15px;width:18px;text-align:center;flex-shrink:0; }
.a-nav-badge {
  margin-left:auto;background:var(--coral);color:white;
  border-radius:20px;font-size:10px;padding:2px 7px;font-weight:700;
}
.a-sidebar-foot { padding:14px 10px;border-top:1px solid var(--border); }
.a-logout {
  display:flex;align-items:center;gap:10px;
  padding:10px 14px;border-radius:12px;
  border:none;background:none;
  font-size:13px;font-weight:500;color:#C0897E;
  width:100%;cursor:pointer;transition:all 0.18s;
}
.a-logout:hover { background:#FEF2F2;color:#B91C1C; }

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
.a-main {
  flex:1;
  transition:margin-left 0.3s var(--ease);
  min-width:0;
}
.a-main--pushed { margin-left:var(--sidebar); }

/* ── Topbar ──────────────────────────────── */
.a-topbar {
  position:sticky;top:0;z-index:40;
  background:rgba(255,255,255,0.88);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
  height:60px;padding:0 24px;
  display:flex;align-items:center;gap:14px;
}
.a-menu-btn {
  width:36px;height:36px;border:none;background:none;
  border-radius:10px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:4px;
  transition:background 0.15s;flex-shrink:0;
}
.a-menu-btn:hover { background:var(--bg); }
.a-menu-btn span { display:block;width:16px;height:1.5px;background:var(--ink2);border-radius:2px;transition:all 0.2s; }
.a-topbar-title { font-family:var(--ff-d);font-size:17px;font-weight:500;color:var(--ink); }
.a-topbar-right { margin-left:auto;display:flex;align-items:center;gap:10px; }
.a-topbar-avatar {
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white;font-size:12px;font-weight:700;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
}

/* ── Content ─────────────────────────────── */
.a-content { padding:28px;max-width:1400px; }

/* ── Notification ────────────────────────── */
.a-notif {
  position:fixed;top:72px;right:24px;z-index:9999;
  display:flex;align-items:center;gap:10px;
  padding:13px 20px;border-radius:14px;
  font-size:14px;font-weight:500;
  box-shadow:var(--shadow-h);
  animation:a-notif-in 0.35s var(--ease);
  max-width:340px;
}
@keyframes a-notif-in { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
.a-notif--ok  { background:#F0FDF4;color:#166534;border:1px solid #BBF7D0; }
.a-notif--err { background:#FEF2F2;color:#991B1B;border:1px solid #FECACA; }

/* ── Page header ─────────────────────────── */
.a-page-head { display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;flex-wrap:wrap;gap:12px; }
.a-page-title { font-family:var(--ff-d);font-size:26px;font-weight:500;color:var(--ink);line-height:1.2; }
.a-page-sub   { font-size:13px;color:var(--ink3);margin-top:4px; }

/* ── KPI Cards ───────────────────────────── */
.a-kpi-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px; }
.a-kpi {
  background:var(--white);
  border:1px solid var(--kpi-border);
  border-radius:var(--radius);
  padding:22px 20px;
  box-shadow:var(--shadow);
  cursor:default;
  animation:a-kpi-in 0.5s var(--ease) both;
  position:relative;
  overflow:hidden;
  transition:transform 0.2s var(--ease), box-shadow 0.2s;
}
.a-kpi::before {
  content:'';position:absolute;top:-30px;right:-30px;
  width:80px;height:80px;border-radius:50%;
  background:var(--kpi-bg);
  opacity:0.8;
  pointer-events:none;
}
.a-kpi:hover { transform:translateY(-3px);box-shadow:var(--shadow-h); }
@keyframes a-kpi-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.a-kpi-icon  { font-size:22px;margin-bottom:12px; }
.a-kpi-value { font-family:var(--ff-d);font-size:26px;font-weight:400;color:var(--ink);line-height:1;margin-bottom:6px; }
.a-kpi-label { font-size:12px;font-weight:500;color:var(--ink3);letter-spacing:0.03em; }

/* ── Status strip ────────────────────────── */
.a-status-strip { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px; }
.a-status-pill {
  display:flex;align-items:center;gap:6px;
  padding:7px 14px;border-radius:999px;
  background:var(--s-bg);color:var(--s-color);
  font-size:12px;font-weight:500;
  border:1px solid color-mix(in srgb, var(--s-color) 15%, transparent);
}
.a-status-dot { width:7px;height:7px;border-radius:50%;flex-shrink:0; }

/* ── Card ────────────────────────────────── */
.a-card {
  background:var(--white);
  border:1px solid var(--border);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  overflow:hidden;
  margin-bottom:20px;
  transition:box-shadow 0.2s;
}
.a-card-head {
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 22px;
  border-bottom:1px solid var(--border);
  flex-wrap:wrap;gap:12px;
}
.a-card-title { font-size:15px;font-weight:600;color:var(--ink); }

/* ── Table ───────────────────────────────── */
.a-table-wrap { overflow-x:auto; }
.a-table { width:100%;border-collapse:collapse;font-size:14px; }
.a-table thead tr { background:#FDFCFC; }
.a-table thead th {
  padding:12px 20px;text-align:left;
  font-size:10px;font-weight:700;color:var(--ink3);
  letter-spacing:0.1em;text-transform:uppercase;
  border-bottom:1px solid var(--border);white-space:nowrap;
}
.a-table tbody tr {
  border-bottom:1px solid #F5F2F0;
  transition:background 0.15s;
  animation:a-row-in 0.35s var(--ease) both;
}
@keyframes a-row-in { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
.a-table tbody tr:last-child { border-bottom:none; }
.a-table tbody tr:hover { background:#FDFAF8; }
.a-table tbody td { padding:14px 20px;vertical-align:middle; }

/* ── Table cell helpers ──────────────────── */
.a-id        { font-weight:600;color:var(--ink3);font-size:13px; }
.a-fw5       { font-weight:500; }
.a-coral-fw  { font-weight:600;color:var(--coral); }
.a-date      { font-size:12px;color:var(--ink3);white-space:nowrap; }
.a-text-sm   { font-size:12px;color:var(--ink3);margin-top:2px; }
.a-text-xs   { font-size:11px;color:var(--ink3);margin-top:2px; }
.a-gray      { color:var(--ink3); }
.a-more      { font-size:11px;color:var(--coral); }
.a-items-cell { max-width:180px; }

.a-prod-cell { display:flex;align-items:center;gap:12px; }
.a-thumb { width:44px;height:44px;border-radius:10px;object-fit:cover;border:1px solid var(--border); }
.a-thumb-ph { width:44px;height:44px;border-radius:10px;background:var(--coral-xl);display:flex;align-items:center;justify-content:center;font-size:18px;border:1px solid var(--coral-l); }

.a-cust-cell { display:flex;align-items:center;gap:10px; }
.a-cust-avatar {
  width:36px;height:36px;border-radius:50%;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white;font-weight:700;font-size:14px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}

/* ── Badges ──────────────────────────────── */
.a-status-badge {
  display:inline-flex;align-items:center;gap:5px;
  padding:4px 11px;border-radius:20px;
  background:var(--s-bg);color:var(--s-color);
  font-size:12px;font-weight:500;white-space:nowrap;
}
.a-cat-badge    { background:var(--coral-xl);color:var(--coral);padding:4px 11px;border-radius:20px;font-size:12px;font-weight:500; }
.a-count-badge  { background:#F0F4FF;color:#4F46E5;padding:4px 11px;border-radius:20px;font-size:12px;font-weight:500; }
.a-stock-badge  { display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:20px;font-size:12px;font-weight:500; }
.a-stock-ok  { background:#F0FDF4;color:#166534; }
.a-stock-low { background:#FEF2F2;color:#991B1B; }

/* ── Status select ───────────────────────── */
.a-status-select {
  padding:5px 12px;border-radius:20px;
  border:none;cursor:pointer;outline:none;
  font-size:12px;font-weight:500;
  font-family:var(--ff);transition:all 0.15s;
}

/* ── Actions ─────────────────────────────── */
.a-actions { display:flex;gap:6px; }
.a-icon-btn {
  width:32px;height:32px;border-radius:9px;
  border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:13px;transition:all 0.15s;
}
.a-icon-edit { background:#EFF6FF;color:#3B82F6; }
.a-icon-edit:hover { background:#DBEAFE;transform:scale(1.1); }
.a-icon-del  { background:#FEF2F2;color:#EF4444; }
.a-icon-del:hover  { background:#FEE2E2;transform:scale(1.1); }

/* ── Pagination ──────────────────────────── */
.a-pagination { display:flex;align-items:center;justify-content:space-between;padding:14px 22px;border-top:1px solid var(--border);flex-wrap:wrap;gap:10px; }
.a-pagination-info { font-size:12px;color:var(--ink3); }
.a-pagination-btns { display:flex;gap:6px; }
.a-page-btn {
  width:32px;height:32px;border-radius:9px;
  border:1px solid var(--border);background:white;
  cursor:pointer;font-size:13px;font-weight:500;color:var(--ink2);
  transition:all 0.15s;display:flex;align-items:center;justify-content:center;
  font-family:var(--ff);
}
.a-page-btn:hover:not(:disabled) { background:var(--coral-xl);border-color:var(--coral-l);color:var(--coral); }
.a-page-btn--active { background:var(--coral);border-color:var(--coral);color:white; }
.a-page-btn:disabled { opacity:0.35;cursor:not-allowed; }

/* ── Empty state ─────────────────────────── */
.a-empty { text-align:center;padding:56px 20px;color:var(--ink3); }
.a-empty-icon { font-size:36px;margin-bottom:12px;opacity:0.5; }

/* ── Search ──────────────────────────────── */
.a-search {
  display:flex;align-items:center;gap:8px;
  background:var(--bg);border:1px solid var(--border);
  border-radius:40px;padding:8px 16px;
  transition:border-color 0.15s;
}
.a-search:focus-within { border-color:var(--coral); }
.a-search-icon { font-size:14px;color:var(--ink3); }
.a-search input { border:none;background:none;outline:none;font-size:13px;color:var(--ink);font-family:var(--ff);min-width:160px; }
.a-search input::placeholder { color:var(--ink3); }

/* ── Buttons ─────────────────────────────── */
.a-btn-coral {
  display:inline-flex;align-items:center;justify-content:center;gap:7px;
  background:var(--coral);color:white;border:none;
  padding:10px 22px;border-radius:40px;
  font-size:13.5px;font-weight:600;
  cursor:pointer;transition:all 0.2s var(--ease);
  box-shadow:0 4px 16px rgba(239,119,106,0.3);
  white-space:nowrap;
}
.a-btn-coral:hover:not(:disabled) { background:var(--coral-d);transform:translateY(-1px);box-shadow:0 6px 22px rgba(239,119,106,0.4); }
.a-btn-coral:active { transform:none; }
.a-btn-coral:disabled { opacity:0.6;cursor:not-allowed; }
.a-btn-full { width:100%;margin-top:4px; }

.a-btn-ghost {
  background:none;border:1px solid var(--border);color:var(--ink2);
  padding:9px 18px;border-radius:40px;font-size:13px;font-weight:500;
  cursor:pointer;transition:all 0.15s;white-space:nowrap;
}
.a-btn-ghost:hover { background:var(--bg);border-color:var(--coral-l);color:var(--coral); }

/* ── Form card ───────────────────────────── */
.a-form-card {
  background:var(--white);border:1px solid var(--border);
  border-radius:var(--radius);padding:26px 28px;
  box-shadow:var(--shadow);margin-bottom:20px;
  animation:a-form-in 0.4s var(--ease);
}
@keyframes a-form-in { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

.a-form-title {
  display:flex;align-items:center;gap:10px;
  font-size:15px;font-weight:600;color:var(--ink);
  margin-bottom:22px;
}
.a-form-title-dot {
  width:10px;height:10px;border-radius:50%;
  background:var(--coral);flex-shrink:0;
  box-shadow:0 0 0 3px rgba(239,119,106,0.2);
  animation:a-dot-pulse 2.5s ease-in-out infinite;
}
@keyframes a-dot-pulse { 0%,100%{box-shadow:0 0 0 3px rgba(239,119,106,0.2)} 50%{box-shadow:0 0 0 6px rgba(239,119,106,0.1)} }

.a-form-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px; }
.a-span2 { grid-column:span 2; }
.a-span3 { grid-column:span 3; }

/* ── Fields ──────────────────────────────── */
.a-field { display:flex;flex-direction:column;gap:6px; }
.a-field-label { font-size:11.5px;font-weight:600;color:var(--ink2);letter-spacing:0.04em; }
.a-field-input {
  padding:11px 14px;
  border:1.5px solid var(--border);
  border-radius:12px;font-size:14px;color:var(--ink);
  background:white;outline:none;
  transition:border-color 0.2s,box-shadow 0.2s;
  width:100%;
}
.a-field-input:focus {
  border-color:var(--coral);
  box-shadow:0 0 0 3px rgba(239,119,106,0.12);
}
.a-field-input::placeholder { color:var(--ink3); }
.a-field-textarea { min-height:90px;resize:vertical; }
.a-img-preview { width:72px;height:72px;object-fit:cover;border-radius:10px;border:1px solid var(--border);margin-top:10px; }

.a-form-actions { display:flex;gap:10px;padding-top:4px; }

/* ── Delivery ────────────────────────────── */
.a-delivery-banner {
  background:linear-gradient(135deg,var(--coral-xl),white);
  border:1px solid var(--coral-l);
  border-radius:var(--radius);padding:24px 28px;
  display:flex;align-items:center;gap:20px;
  margin-bottom:20px;flex-wrap:wrap;
  position:relative;overflow:hidden;
}
.a-delivery-banner::after {
  content:'✦';position:absolute;right:28px;bottom:-8px;
  font-size:80px;color:var(--coral);opacity:0.06;
  pointer-events:none;
}
.a-delivery-icon-wrap { font-size:32px;flex-shrink:0; }
.a-delivery-title { font-family:var(--ff-d);font-size:18px;font-weight:500;color:var(--ink); }
.a-delivery-sub   { font-size:13px;color:var(--ink3);margin-top:3px; }
.a-delivery-active {
  margin-left:auto;background:white;color:#166534;
  border:1px solid #BBF7D0;padding:7px 16px;
  border-radius:40px;font-size:12px;font-weight:600;flex-shrink:0;
}

.a-zones { display:flex;flex-wrap:wrap;gap:8px; }
.a-zone-chip {
  background:var(--coral-xl);color:var(--coral);
  border:1px solid var(--coral-l);
  padding:6px 14px;border-radius:40px;font-size:12px;font-weight:500;
  transition:all 0.15s;cursor:default;
}
.a-zone-chip:hover { background:var(--coral-l);transform:translateY(-1px); }

/* ── Spinner ─────────────────────────────── */
.a-spin {
  display:inline-block;width:16px;height:16px;
  border:2px solid rgba(255,255,255,0.4);
  border-top-color:white;border-radius:50%;
  animation:a-spin 0.7s linear infinite;
}
@keyframes a-spin { to{transform:rotate(360deg)} }

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width:1280px) {
  .a-kpi-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:1024px) {
  .a-main--pushed { margin-left:0 !important; }
  .a-sidebar-close { display:flex !important; }
  .a-content { padding:18px; }
  .a-form-grid { grid-template-columns:1fr 1fr; }
  .a-span3 { grid-column:span 2; }
}
@media (max-width:768px) {
  .a-kpi-grid { grid-template-columns:1fr 1fr;gap:12px; }
  .a-form-grid { grid-template-columns:1fr; }
  .a-span2,.a-span3 { grid-column:span 1; }
  .a-content { padding:14px; }
  .a-topbar { padding:0 14px; }
  .a-page-head { flex-direction:column;align-items:flex-start; }
  .a-card-head { flex-direction:column;align-items:flex-start; }
  .a-table thead th:nth-child(n+4) { display:none; }
  .a-table tbody td:nth-child(n+4) { display:none; }
}
@media (max-width:480px) {
  .a-kpi-grid { grid-template-columns:1fr 1fr;gap:10px; }
  .a-kpi { padding:16px 14px; }
  .a-kpi-value { font-size:20px; }
  .a-status-strip { gap:6px; }
  .a-status-pill { font-size:11px;padding:5px 10px; }
  .a-login-card { padding:36px 24px; }
  .a-btn-coral { padding:9px 18px;font-size:13px; }
}
`;

export default Admin;