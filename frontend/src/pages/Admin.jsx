import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { clearProductCache } from "../utils/productCache";

/* ═══════════════════════ CONFIG ══════════════════════════ */
const STATUS_CFG = {
  pending:    { label: "En attente",  bg: "#FFF7ED", color: "#C2410C", dot: "#FB923C" },
  processing: { label: "En cours",    bg: "#EFF6FF", color: "#1D4ED8", dot: "#60A5FA" },
  shipped:    { label: "Expédiée",    bg: "#F5F3FF", color: "#6D28D9", dot: "#A78BFA" },
  delivered:  { label: "Livrée",      bg: "#F0FDF4", color: "#166534", dot: "#4ADE80" },
  cancelled:  { label: "Annulée",     bg: "#FEF2F2", color: "#991B1B", dot: "#F87171" },
};

const CATEGORIES     = ["Oud", "Floral", "Amber", "Fraîcheur", "Boisé", "Gourmand", "Herbal", "Originals", "Autre"];
const SCENT_FAMILIES = ["flowery", "fresh", "gourmand", "herbal", "earthy", "warm"];
const SCENT_LABELS   = { flowery: "🌸 Fleuri", fresh: "🍃 Frais", gourmand: "🍫 Gourmand", herbal: "🌿 Herbal", earthy: "🌍 Terreux", warm: "🔥 Chaud" };
const GENDERS        = ["Femme", "Homme", "Unisex"];
const PRODUCT_TYPES  = ["Original", "Inspired By"];
const CONCENTRATIONS = ["Extrait de Parfum", "Eau de Parfum", "Eau de Toilette", "Eau de Cologne", "Parfum de Niche"];
const LONGEVITY_OPTS = ["2–4h", "4–6h", "6–8h", "8h+", "12h+"];

const NAV = [
  { id: "dashboard", label: "Vue d'ensemble", icon: "⬡" },
  { id: "products",  label: "Produits",        icon: "✦" },
  { id: "orders",    label: "Commandes",        icon: "◫" },
  { id: "customers", label: "Clients",          icon: "◉" },
  { id: "delivery",  label: "Livraison",        icon: "◎" },
  { id: "settings",  label: "Paramètres",       icon: "◬" },
];

/* ── EMPTY_FORM: scent_notes REMOVED — uses top/middle/base_notes only ── */
const EMPTY_FORM = {
  name: "", description: "", scent_family: "warm",
  price: "", image_url: "", gallery_images: ["", "", "", ""], category: "", gender: "Unisex",
  product_type: "Original", inspired_by: "", stock: "10",
  is_new: "0", is_bestseller: "0",
  concentration: "", scent_intensity: "3", longevity: "",
  ingredients: "", top_notes: "", middle_notes: "", base_notes: "",
};

/* ── SweetAlert2 Toast ── */
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3200,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

/* ═══════════════════════ COMPONENT ═══════════════════════ */
const Admin = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const [activePage,     setActivePage]     = useState("dashboard");
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [username,       setUsername]       = useState("");
  const [password,       setPassword]       = useState("");
  const [error,          setError]          = useState("");
  const [loading,        setLoading]        = useState(false);
  const [products,       setProducts]       = useState([]);
  const [orders,         setOrders]         = useState([]);
  const [customers,      setCustomers]      = useState([]);
  const [stats,          setStats]          = useState({ totalProducts: 0, totalOrders: 0, revenue: 0 });
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData,       setFormData]       = useState(EMPTY_FORM);
  const [searchTerm,     setSearchTerm]     = useState("");
  const [orderSearch,    setOrderSearch]    = useState("");
  const [currentPage,    setCurrentPage]    = useState(1);
  const [imagePreview,   setImagePreview]   = useState("");
  const [showForm,       setShowForm]       = useState(false);
  const [uploadingSlot,  setUploadingSlot]  = useState(null);
  const [filterCat,      setFilterCat]      = useState("Tous");
  const itemsPerPage = 8;

  const token      = localStorage.getItem("adminToken");
  const isLoggedIn = !!token || isAdminLoggedIn;
  const authHdr    = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } });
  const fmt        = n => Math.round(Number(n)).toLocaleString("fr-MA");

  const notify = (text, type = "success") =>
    Toast.fire({ icon: type, title: text });

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
    const fn = () => setSidebarOpen(window.innerWidth >= 1024);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleLogin = async e => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await axios.post("/api/admin/login", { username, password });
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        setIsAdminLoggedIn?.(true);
        setTimeout(fetchData, 100);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Identifiants invalides");
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn?.(false);
    setProducts([]); setOrders([]);
  };

  /* ── handleSaveProduct: scent_notes NOT sent, top/middle/base_notes used ── */
  const handleSaveProduct = async e => {
    e.preventDefault();
    if (!formData.name) { notify("Nom est requis", "error"); return; }

    const priceNum = parseFloat(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum < 0) {
      notify("Prix invalide — entrez un nombre positif", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name:            formData.name,
        description:     formData.description     || "",
        scent_family:    formData.scent_family     || "warm",
        price:           priceNum,
        image_url:       formData.image_url        || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
        category:        formData.category         || "Autre",
        gender:          formData.gender           || "Unisex",
        product_type:    formData.product_type     || "Original",
        inspired_by:     formData.product_type === "Inspired By" ? (formData.inspired_by || "") : null,
        stock:           parseInt(formData.stock)  || 10,
        is_new:          formData.is_new === "1" || formData.is_new === true ? 1 : 0,
        is_bestseller:   formData.is_bestseller === "1" || formData.is_bestseller === true ? 1 : 0,
        concentration:   formData.concentration    || null,
        scent_intensity: formData.scent_intensity  ? parseInt(formData.scent_intensity) : null,
        longevity:       formData.longevity        || null,
        ingredients:     formData.ingredients      || null,
        top_notes:       formData.top_notes        || null,
        middle_notes:    formData.middle_notes     || null,
        base_notes:      formData.base_notes       || null,
      gallery_images:  JSON.stringify((formData.gallery_images || []).filter(u => u && u.trim())),
      };

      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct.id}`, payload, authHdr());
        clearProductCache();
        notify(`"${formData.name}" modifié avec succès`);
      } else {
        await axios.post("/api/products", payload, authHdr());
        clearProductCache();
        notify(`"${formData.name}" ajouté avec succès`);
      }
      setEditingProduct(null);
      setFormData(EMPTY_FORM);
      setImagePreview("");
      setShowForm(false);
      await fetchData();
    } catch (err) {
      if (err.response?.status === 401) { notify("Session expirée", "error"); handleLogout(); }
      else notify(err.response?.data?.error || "Erreur serveur", "error");
    } finally { setLoading(false); }
  };

  const handleDeleteProduct = async (id, name) => {
    const result = await Swal.fire({
      title: "Supprimer ce produit ?",
      html:  `<span style="color:#1C1917;font-weight:600">"${name}"</span> sera définitivement supprimé.`,
      icon:  "warning", iconColor: "#EF776A",
      showCancelButton: true,
      confirmButtonText: "🗑 Supprimer",
      cancelButtonText:  "Annuler",
      confirmButtonColor: "#EF776A",
      cancelButtonColor:  "#E9E7E5",
      reverseButtons: true,
      backdrop: "rgba(28,26,22,0.55)",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`/api/products/${id}`, authHdr());
      clearProductCache();
      notify(`"${name}" supprimé avec succès`);
      fetchData();
    } catch (err) { notify(err.response?.data?.error || "Impossible de supprimer", "error"); }
  };

  /* ── handleEditProduct: scent_notes field OMITTED from form state ── */
  const handleEditProduct = p => {
    setEditingProduct(p);
    setFormData({
      name:            p.name              || "",
      description:     p.description       || "",
      scent_family:    p.scent_family       || "warm",
      price:           p.price != null     ? String(parseFloat(p.price)) : "",
      image_url:       p.image_url          || "",
      category:        p.category           || "",
      gender:          p.gender             || "Unisex",
      product_type:    p.product_type       || "Original",
      inspired_by:     p.inspired_by        || "",
      stock:           p.stock != null     ? String(parseInt(p.stock)) : "10",
      is_new:          p.is_new             ? "1" : "0",
      is_bestseller:   p.is_bestseller      ? "1" : "0",
      concentration:   p.concentration      || "",
      scent_intensity: p.scent_intensity != null ? String(p.scent_intensity) : "3",
      longevity:       p.longevity          || "",
      ingredients:     p.ingredients        || "",
      top_notes:       p.top_notes          || "",
      middle_notes:    p.middle_notes       || "",
      base_notes:      p.base_notes         || "",
      gallery_images:  (() => {
        try {
          const arr = JSON.parse(p.gallery_images || "[]");
          return [...arr, "", "", "", ""].slice(0, 4);
        } catch { return ["", "", "", ""]; }
      })(),
    });
    setImagePreview(p.image_url);
    setShowForm(true);
    setActivePage("products");
  };

  const handleImageUpload = async (file, slot) => {
    if (!file) return;
    setUploadingSlot(slot);
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await axios.post("/api/upload/image", data, authHdr());
      const url = res.data.url;
      if (slot === "main") {
        setFormData(f => ({ ...f, image_url: url }));
        setImagePreview(url);
      } else {
        setFormData(f => {
          const gallery = [...(f.gallery_images || ["", "", "", ""])];
          gallery[slot] = url;
          return { ...f, gallery_images: gallery };
        });
      }
      notify("Image uploadée avec succès ✓");
    } catch (err) {
      notify("Erreur upload : " + (err.response?.data?.error || err.message), "error");
    } finally {
      setUploadingSlot(null);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, authHdr());
      notify("Statut mis à jour");
      fetchData();
    } catch { notify("Erreur lors de la mise à jour", "error"); }
  };

  const exportExcel = () => {
    const data = orders.map(o => ({
      ID: o.id,
      Client: o.customer_name,
      Email: o.customer_email,
      Téléphone: o.customer_phone || "-",
      Adresse: o.customer_address || "-",
      "Total (MAD)": o.total_amount,
      Statut: o.status,
      Date: new Date(o.created_at).toLocaleDateString("fr-FR"),
      Articles: o.items?.map(i => `${i.product_name} (x${i.quantity})`).join(", ") || "-",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Commandes");
    saveAs(
      new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })],
        { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
      `commandes_${new Date().toISOString().split("T")[0]}.xlsx`
    );
    notify("Export Excel réussi !");
  };

  const cats = ["Tous", ...new Set(products.map(p => p.category).filter(Boolean))];
  const filteredProducts = products.filter(p => {
    const matchCat  = filterCat === "Tous" || p.category === filterCat;
    const matchSrch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (p.category || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSrch;
  });
  const totalPages    = Math.ceil(filteredProducts.length / itemsPerPage);
  const pagedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const filteredOrders = orders.filter(o =>
    o.customer_name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer_email?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    String(o.id).includes(orderSearch)
  );

  const set = k => e => setFormData(f => ({ ...f, [k]: e.target.value }));
  const closeSidebar = () => { setSidebarOpen(false); setMobileOpen(false); };

  /* ─────────────── LOGIN PAGE ─────────────── */
  if (!isLoggedIn) return (
    <>
      <style>{CSS}</style>
      <div className="al-wrap">
        <div className="al-orb al-orb-1" />
        <div className="al-orb al-orb-2" />
        <div className="al-orb al-orb-3" />
        <div className="al-card">
          <div className="al-logo">
            <div className="al-logo-mark">N</div>
            <div>
              <div className="al-logo-name">Nahid Perfume</div>
              <div className="al-logo-sub">Administration</div>
            </div>
          </div>
          <h1 className="al-title">Bienvenue 👋</h1>
          <p className="al-desc">Connectez-vous à votre tableau de bord</p>
          <form onSubmit={handleLogin} className="al-form">
            <div className="a-field">
              <label className="a-lbl">👤 Identifiant</label>
              <input className="af-input" type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="a-field">
              <label className="a-lbl">🔒 Mot de passe</label>
              <input className="af-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <div className="al-err"><span>⚠</span> {error}</div>}
            <button className="a-btn-primary a-btn-full" type="submit" disabled={loading}>
              {loading ? <span className="a-spin" /> : <>Se connecter <span>→</span></>}
            </button>
          </form>
          <div className="al-hint">Nahid Perfume · Casablanca 🇲🇦</div>
        </div>
      </div>
    </>
  );

  /* ─────────────── MAIN DASHBOARD ─────────────── */
  return (
    <>
      <style>{CSS}</style>
      <div className="a-root">
        {mobileOpen && <div className="a-overlay" onClick={closeSidebar} />}

        {/* ══ SIDEBAR ══ */}
        <aside className={`a-sidebar${sidebarOpen || mobileOpen ? " a-sidebar-open" : " a-sidebar-closed"}`}>
          <div className="a-sb-top">
            <div className="a-sb-logo">
              <div className="a-sb-mark">N</div>
              <div>
                <div className="a-sb-name">Nahid Perfume</div>
                <div className="a-sb-role">Administration</div>
              </div>
            </div>
            <button className="a-sb-close" onClick={closeSidebar}>✕</button>
          </div>

          <div className="a-sb-divider" />

          <nav className="a-nav">
            <div className="a-nav-section-lbl">Menu principal</div>
            {NAV.map(item => (
              <button
                key={item.id}
                className={`a-nav-item${activePage === item.id ? " a-nav-active" : ""}`}
                onClick={() => { setActivePage(item.id); if (window.innerWidth < 1024) setMobileOpen(false); }}
              >
                <span className="a-nav-icon">{item.icon}</span>
                <span className="a-nav-txt">{item.label}</span>
                {item.id === "orders" && orders.filter(o => o.status === "pending").length > 0 && (
                  <span className="a-nav-badge">{orders.filter(o => o.status === "pending").length}</span>
                )}
              </button>
            ))}
          </nav>

          <div style={{ flex: 1 }} />
          <div className="a-sb-foot">
            <div className="a-sb-user">
              <div className="a-sb-avatar">A</div>
              <div>
                <div className="a-sb-uname">Admin</div>
                <div className="a-sb-uemail">admin@nahid.ma</div>
              </div>
            </div>
            <button className="a-logout-btn" onClick={handleLogout}>⎋ Déconnexion</button>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className={`a-main${sidebarOpen && window.innerWidth >= 1024 ? " a-main-pushed" : ""}`}>

          {/* Topbar */}
          <div className="a-topbar">
            <button className="a-hamburger" onClick={() => window.innerWidth < 1024 ? setMobileOpen(!mobileOpen) : setSidebarOpen(!sidebarOpen)}>
              <span /><span /><span />
            </button>
            <div className="a-topbar-title">
              {NAV.find(n => n.id === activePage)?.label || "Dashboard"}
            </div>
            <div style={{ flex: 1 }} />
            <div className="a-topbar-actions">
              {activePage === "products" && (
                <button className="a-btn-primary a-btn-sm" onClick={() => {
                  setShowForm(!showForm);
                  if (!showForm) { setEditingProduct(null); setFormData(EMPTY_FORM); setImagePreview(""); }
                }}>
                  {showForm ? "✕ Fermer" : "+ Produit"}
                </button>
              )}
              <div className="a-topbar-avatar">A</div>
            </div>
          </div>

          <div className="a-content">

            {/* ════════ DASHBOARD ════════ */}
            {activePage === "dashboard" && (<>
              <div className="a-page-head">
                <div>
                  <h1 className="a-page-title">Tableau de bord</h1>
                  <p className="a-page-sub">Bienvenue dans votre espace Nahid Perfume ✦</p>
                </div>
                <button className="a-btn-primary" onClick={() => {
                  setActivePage("products"); setShowForm(true);
                  setEditingProduct(null); setFormData(EMPTY_FORM); setImagePreview("");
                }}>
                  + Nouveau produit
                </button>
              </div>

              {/* KPIs */}
              <div className="a-kpi-row">
                {[
                  { icon: "📦", label: "Produits",           value: stats.totalProducts,       accent: "#EF776A" },
                  { icon: "🛒", label: "Commandes",          value: stats.totalOrders,          accent: "#6366F1" },
                  { icon: "💰", label: "Chiffre d'affaires", value: fmt(stats.revenue) + " MAD",accent: "#10B981" },
                  { icon: "👥", label: "Clients",            value: customers.length,           accent: "#F59E0B" },
                ].map((k, i) => (
                  <div className="a-kpi" key={i} style={{ "--ka": k.accent, animationDelay: `${i * .07}s` }}>
                    <div className="a-kpi-top">
                      <div className="a-kpi-icon">{k.icon}</div>
                      <div className="a-kpi-glyph" style={{ background: `${k.accent}18` }} />
                    </div>
                    <div className="a-kpi-val">{k.value}</div>
                    <div className="a-kpi-lbl">{k.label}</div>
                  </div>
                ))}
              </div>

              {/* Status strip */}
              <div className="a-strip">
                {Object.entries(STATUS_CFG).map(([k, s]) => (
                  <div className="a-strip-pill" key={k} style={{ "--sb": s.bg, "--sc": s.color }}>
                    <span className="a-dot" style={{ background: s.dot }} />
                    {s.label} · <b>{orders.filter(o => o.status === k).length}</b>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="a-card">
                <div className="a-card-head">
                  <div className="a-card-title">Dernières commandes</div>
                  <button className="a-btn-ghost-sm" onClick={() => setActivePage("orders")}>Voir tout →</button>
                </div>
                <ATable
                  cols={["#", "Client", "Total", "Statut", "Date"]}
                  empty={{ icon: "📋", text: "Aucune commande" }}
                  rows={orders.slice(0, 5).map(o => {
                    const sc = STATUS_CFG[o.status] || STATUS_CFG.pending;
                    return [
                      <span className="a-id">#{o.id}</span>,
                      <span className="a-fw">{o.customer_name}</span>,
                      <span className="a-coral">{fmt(o.total_amount)} MAD</span>,
                      <ABadge cfg={sc} />,
                      <span className="a-muted-sm">{new Date(o.created_at).toLocaleDateString("fr-FR")}</span>,
                    ];
                  })}
                />
              </div>
            </>)}

            {/* ════════ PRODUCTS ════════ */}
            {activePage === "products" && (<>
              <div className="a-page-head">
                <div>
                  <h1 className="a-page-title">Produits</h1>
                  <p className="a-page-sub">{products.length} parfums au catalogue</p>
                </div>
                <button className="a-btn-primary" onClick={() => {
                  setShowForm(!showForm);
                  if (showForm) { setEditingProduct(null); setFormData(EMPTY_FORM); setImagePreview(""); }
                }}>
                  {showForm ? "✕ Fermer le formulaire" : "+ Nouveau produit"}
                </button>
              </div>

              {/* ── PRODUCT FORM ── */}
              {showForm && (
                <div className="a-form-wrap">
                  <div className="a-form-header">
                    <div className="a-form-header-left">
                      <div className="a-form-pulse" />
                      <div>
                        <div className="a-form-title">{editingProduct ? "Modifier le parfum" : "Ajouter un nouveau parfum"}</div>
                        <div className="a-form-sub">Remplissez tous les champs pour un affichage optimal sur la boutique</div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProduct}>

                    {/* Section: Identité */}
                    <div className="a-form-section-title">✦ Identité du produit</div>
                    <div className="a-form-grid-3">
                      <div className="a-field a-col-2">
                        <label className="a-lbl">Nom du parfum <span className="a-req">*</span></label>
                        <input className="af-input" type="text" placeholder="Ex: Rose Mystique 100ml" value={formData.name} onChange={set("name")} required />
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">Prix (MAD) <span className="a-req">*</span></label>
                        <input className="af-input" type="number" step="1" min="0" placeholder="299" value={formData.price} onChange={set("price")} required />
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">Stock</label>
                        <input className="af-input" type="number" min="0" placeholder="10" value={formData.stock} onChange={set("stock")} />
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">Catégorie</label>
                        <select className="af-input" value={formData.category} onChange={set("category")}>
                          <option value="">Sélectionner…</option>
                          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="a-field a-col-3">
                        <label className="a-lbl">Description</label>
                        <textarea className="af-input af-textarea" rows={3} placeholder="Description du parfum, histoire, occasion…" value={formData.description} onChange={set("description")} />
                      </div>
                    </div>

                    {/* Section: Classification */}
                    <div className="a-form-section-title">🌸 Classification olfactive</div>
                    <div className="a-form-grid-3">
                      <div className="a-field">
                        <label className="a-lbl">Famille olfactive</label>
                        <select className="af-input" value={formData.scent_family} onChange={set("scent_family")}>
                          {SCENT_FAMILIES.map(f => <option key={f} value={f}>{SCENT_LABELS[f]}</option>)}
                        </select>
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">Genre</label>
                        <div className="a-radio-group">
                          {GENDERS.map(g => (
                            <label key={g} className={`a-radio-pill${formData.gender === g ? " a-radio-active" : ""}`}>
                              <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={set("gender")} hidden />
                              {g === "Femme" ? "👩" : g === "Homme" ? "👨" : "✦"} {g}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">Type de produit</label>
                        <div className="a-radio-group">
                          {PRODUCT_TYPES.map(t => (
                            <label key={t} className={`a-radio-pill${formData.product_type === t ? " a-radio-active" : ""}`}>
                              <input type="radio" name="product_type" value={t} checked={formData.product_type === t} onChange={set("product_type")} hidden />
                              {t === "Original" ? "⭐" : "🔄"} {t}
                            </label>
                          ))}
                        </div>
                      </div>
                      {formData.product_type === "Inspired By" && (
                        <div className="a-field a-col-3">
                          <label className="a-lbl">Inspiré par (marque / parfum de référence)</label>
                          <input className="af-input" type="text" placeholder="Ex: Tom Ford Oud Wood / Creed Aventus" value={formData.inspired_by} onChange={set("inspired_by")} />
                        </div>
                      )}
                    </div>

                    {/* Section: Pyramide olfactive — top/middle/base_notes ONLY, no scent_notes */}
                    <div className="a-form-section-title">🔺 Pyramide olfactive</div>
                    <div className="a-form-note">
                      Renseignez les notes séparément pour un affichage optimisé sur la fiche produit.
                    </div>
                    <div className="a-form-grid-3">
                      <div className="a-field">
                        <label className="a-lbl">🌿 Notes de tête</label>
                        <input className="af-input" type="text" placeholder="Bergamote, Citron, Gingembre…" value={formData.top_notes} onChange={set("top_notes")} />
                        <span className="af-hint">Première impression · 15–30 min</span>
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">🌸 Notes de cœur</label>
                        <input className="af-input" type="text" placeholder="Rose, Jasmin, Iris…" value={formData.middle_notes} onChange={set("middle_notes")} />
                        <span className="af-hint">L'âme du parfum · 2–4 heures</span>
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">🪵 Notes de fond</label>
                        <input className="af-input" type="text" placeholder="Musc, Ambre, Santal…" value={formData.base_notes} onChange={set("base_notes")} />
                        <span className="af-hint">Signature durable · 6h+</span>
                      </div>
                    </div>

                    {/* Section: Caractéristiques */}
                    <div className="a-form-section-title">⚗️ Caractéristiques</div>
                    <div className="a-form-grid-3">
                      <div className="a-field">
                        <label className="a-lbl">Concentration</label>
                        <select className="af-input" value={formData.concentration} onChange={set("concentration")}>
                          <option value="">Sélectionner…</option>
                          {CONCENTRATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">Longévité</label>
                        <select className="af-input" value={formData.longevity} onChange={set("longevity")}>
                          <option value="">Sélectionner…</option>
                          {LONGEVITY_OPTS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      <div className="a-field">
                        <label className="a-lbl">
                          Intensité olfactive &nbsp;
                          <span className="a-intensity-badge">{formData.scent_intensity}/5</span>
                        </label>
                        <input
                          className="af-range"
                          type="range" min="1" max="5" step="1"
                          value={formData.scent_intensity}
                          style={{ "--v": `${((parseInt(formData.scent_intensity) - 1) / 4) * 100}%` }}
                          onChange={set("scent_intensity")}
                        />
                        <div className="a-range-labels"><span>Légère</span><span>Forte</span></div>
                      </div>
                      <div className="a-field a-col-3">
                        <label className="a-lbl">Ingrédients (INCI)</label>
                        <textarea className="af-input af-textarea" rows={2} placeholder="Alcohol Denat, Fragrance, Aqua, Linalool, Citronellol…" value={formData.ingredients} onChange={set("ingredients")} />
                      </div>
                    </div>

                    {/* Section: Média */}
                    <div className="a-form-section-title">🖼 Média & Visibilité</div>

                    {/* ── Main image ── */}
                    <div className="a-media-lbl">Image principale</div>
                    <div className="a-media-main-zone">
                      <div className="a-media-preview-box">
                        {imagePreview
                          ? <img src={imagePreview} alt="Aperçu" className="a-media-preview-img" onError={e => { e.target.style.display = "none"; }} />
                          : <div className="a-media-placeholder"><span style={{ fontSize: 28 }}>🖼</span><span>Aperçu</span></div>
                        }
                        {uploadingSlot === "main" && <div className="a-media-uploading"><span className="a-spin" /></div>}
                      </div>
                      <div className="a-media-main-body">
                        <div className="a-media-main-title">Photo principale du produit</div>
                        <p className="a-media-main-sub">JPG · PNG · WEBP · Max 15 MB · Recommandé 900×900 px</p>
                        <div className="a-media-actions">
                          <label className={`a-btn-primary a-btn-sm a-media-upload-lbl${uploadingSlot !== null ? " a-btn-disabled" : ""}`}>
                            {uploadingSlot === "main" ? <><span className="a-spin" /> Chargement…</> : "📤 Choisir un fichier"}
                            <input type="file" accept="image/*" hidden disabled={uploadingSlot !== null}
                              onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, "main"); e.target.value = ""; }} />
                          </label>
                          <span className="a-media-or">ou URL :</span>
                          <input className="af-input a-media-url-in" type="text" placeholder="https://…" value={formData.image_url}
                            onChange={e => { set("image_url")(e); setImagePreview(e.target.value); }} />
                        </div>
                      </div>
                    </div>

                    {/* ── Gallery slots ── */}
                    <div className="a-media-lbl" style={{ marginTop: 20 }}>Galerie — 4 images supplémentaires</div>
                    <div className="a-gallery-url-list">
                      {[0, 1, 2, 3].map(idx => (
                        <div key={idx} className="a-gallery-url-row">
                          {formData.gallery_images?.[idx] && (
                            <img src={formData.gallery_images[idx]} alt={`Photo ${idx + 1}`} className="a-gallery-url-thumb"
                              onError={e => { e.target.style.display = "none"; }} />
                          )}
                          <input
                            className="af-input a-gallery-url-in"
                            type="text"
                            placeholder={`URL photo ${idx + 1} (https://…)`}
                            value={formData.gallery_images?.[idx] || ""}
                            onChange={e => setFormData(f => {
                              const g = [...(f.gallery_images || ["", "", "", ""])];
                              g[idx] = e.target.value;
                              return { ...f, gallery_images: g };
                            })}
                          />
                          {formData.gallery_images?.[idx] && (
                            <button type="button" className="a-gallery-url-clear"
                              onClick={() => setFormData(f => { const g = [...f.gallery_images]; g[idx] = ""; return { ...f, gallery_images: g }; })}>
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="a-field" style={{ marginTop: 20 }}>
                      <label className="a-lbl">Tags spéciaux</label>
                      <div className="a-toggle-group">
                        <label className={`a-toggle-pill${formData.is_new === "1" ? " a-toggle-on" : ""}`}>
                          <input type="checkbox" checked={formData.is_new === "1"} onChange={e => setFormData(f => ({ ...f, is_new: e.target.checked ? "1" : "0" }))} hidden />
                          🆕 Nouveau
                        </label>
                        <label className={`a-toggle-pill${formData.is_bestseller === "1" ? " a-toggle-on-gold" : ""}`}>
                          <input type="checkbox" checked={formData.is_bestseller === "1"} onChange={e => setFormData(f => ({ ...f, is_bestseller: e.target.checked ? "1" : "0" }))} hidden />
                          🔥 Best-Seller
                        </label>
                      </div>
                    </div>

                    <div className="a-form-footer">
                      <button type="submit" className="a-btn-primary" disabled={loading}>
                        {loading ? <span className="a-spin" /> : editingProduct ? "💾 Enregistrer les modifications" : "✦ Ajouter le parfum"}
                      </button>
                      <button type="button" className="a-btn-ghost" onClick={() => { setShowForm(false); setEditingProduct(null); }}>
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Category filter */}
              <div className="a-cat-tabs">
                {cats.map(c => (
                  <button key={c} className={`a-cat-tab${filterCat === c ? " a-cat-tab-active" : ""}`}
                    onClick={() => { setFilterCat(c); setCurrentPage(1); }}>
                    {c}
                  </button>
                ))}
              </div>

              {/* Products table */}
              <div className="a-card">
                <div className="a-card-head">
                  <div className="a-card-title">Catalogue ({filteredProducts.length} produits)</div>
                  <div className="a-searchbar">
                    <span>⌕</span>
                    <input type="text" placeholder="Rechercher…" value={searchTerm}
                      onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
                  </div>
                </div>
                <ATable
                  cols={["Produit", "Catégorie", "Genre", "Type", "Prix", "Stock", "Actions"]}
                  empty={{ icon: "📦", text: "Aucun produit" }}
                  rows={pagedProducts.map(p => [
                    <div className="a-prod-row">
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} className="a-thumb" onError={e => e.target.style.display = "none"} />
                        : <div className="a-thumb-ph">🌸</div>}
                      <div>
                        <div className="a-fw">{p.name}</div>
                        {p.scent_family && <div className="a-muted-sm">{SCENT_LABELS[p.scent_family]}</div>}
                        {/* Show pyramid notes preview if available */}
                        {(p.top_notes || p.middle_notes || p.base_notes) && (
                          <div className="a-notes-preview">
                            {[p.top_notes, p.middle_notes, p.base_notes].filter(Boolean).join(" · ")}
                          </div>
                        )}
                        {p.inspired_by && <div className="a-inspired">≈ {p.inspired_by}</div>}
                      </div>
                    </div>,
                    <span className="a-chip a-chip-coral">{p.category || "—"}</span>,
                    <span className="a-chip a-chip-blue">{p.gender || "Unisex"}</span>,
                    <span className={`a-chip${p.product_type === "Original" ? " a-chip-gold" : " a-chip-gray"}`}>{p.product_type || "Original"}</span>,
                    <span className="a-coral a-fw">{fmt(p.price)} MAD</span>,
                    <span className={`a-stock${p.stock < 5 ? " a-stock-low" : ""}`}>
                      <span className="a-dot" style={{ background: p.stock < 5 ? "#F87171" : "#4ADE80" }} />{p.stock}
                    </span>,
                    <div className="a-actions-row">
                      <button className="a-ic-btn a-ic-edit" onClick={() => handleEditProduct(p)} title="Modifier">✎</button>
                      <button className="a-ic-btn a-ic-del"  onClick={() => handleDeleteProduct(p.id, p.name)} title="Supprimer">🗑</button>
                    </div>,
                  ])}
                />
                {totalPages > 1 && (
                  <div className="a-pager">
                    <span className="a-pager-info">Page {currentPage}/{totalPages} · {filteredProducts.length} produits</span>
                    <div className="a-pager-btns">
                      <button className="a-pg-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pg = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (pg < 1 || pg > totalPages) return null;
                        return <button key={pg} className={`a-pg-btn${pg === currentPage ? " a-pg-active" : ""}`} onClick={() => setCurrentPage(pg)}>{pg}</button>;
                      })}
                      <button className="a-pg-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
                    </div>
                  </div>
                )}
              </div>
            </>)}

            {/* ════════ ORDERS ════════ */}
            {activePage === "orders" && (<>
              <div className="a-page-head">
                <div>
                  <h1 className="a-page-title">Commandes</h1>
                  <p className="a-page-sub">{orders.length} commandes au total</p>
                </div>
                <button className="a-btn-primary" onClick={exportExcel}>⬇ Exporter Excel</button>
              </div>
              <div className="a-strip">
                {Object.entries(STATUS_CFG).map(([k, s]) => (
                  <div className="a-strip-pill" key={k} style={{ "--sb": s.bg, "--sc": s.color }}>
                    <span className="a-dot" style={{ background: s.dot }} />{s.label} · <b>{orders.filter(o => o.status === k).length}</b>
                  </div>
                ))}
              </div>
              <div className="a-card">
                <div className="a-card-head">
                  <div className="a-card-title">Toutes les commandes ({filteredOrders.length})</div>
                  <div className="a-searchbar">
                    <span>⌕</span>
                    <input type="text" placeholder="Rechercher…" value={orderSearch} onChange={e => setOrderSearch(e.target.value)} />
                  </div>
                </div>
                <ATable
                  cols={["Commande", "Client", "Articles", "Total", "Statut", "Date"]}
                  empty={{ icon: "📋", text: "Aucune commande" }}
                  rows={filteredOrders.map(o => {
                    const sc = STATUS_CFG[o.status] || STATUS_CFG.pending;
                    return [
                      <div>
                        <div className="a-id">#{o.id}</div>
                        {o.customer_phone && <div className="a-muted-sm">📞 {o.customer_phone}</div>}
                      </div>,
                      <div>
                        <div className="a-fw">{o.customer_name}</div>
                        <div className="a-muted-sm">{o.customer_email}</div>
                        {o.customer_address && <div className="a-muted-sm">📍 {o.customer_address}</div>}
                      </div>,
                      <div style={{ maxWidth: 180 }}>
                        {o.items?.slice(0, 2).map((it, i) => (
                          <div key={i} className="a-muted-sm">{it.product_name} <span style={{ color: "#aaa" }}>×{it.quantity}</span></div>
                        ))}
                        {o.items?.length > 2 && <span style={{ fontSize: 11, color: "#EF776A" }}>+{o.items.length - 2} autres</span>}
                      </div>,
                      <span className="a-coral a-fw">{fmt(o.total_amount)} MAD</span>,
                      <select className="a-status-sel" value={o.status} onChange={e => handleUpdateOrderStatus(o.id, e.target.value)} style={{ background: sc.bg, color: sc.color }}>
                        {Object.entries(STATUS_CFG).map(([v, c]) => <option key={v} value={v}>{c.label}</option>)}
                      </select>,
                      <span className="a-muted-sm">{new Date(o.created_at).toLocaleDateString("fr-FR")}</span>,
                    ];
                  })}
                />
              </div>
            </>)}

            {/* ════════ CUSTOMERS ════════ */}
            {activePage === "customers" && (<>
              <div className="a-page-head">
                <h1 className="a-page-title">Clients</h1>
                <p className="a-page-sub">{customers.length} clients enregistrés</p>
              </div>
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-title">Base clients</div></div>
                <ATable
                  cols={["Client", "Email", "Téléphone", "Commandes", "Total dépensé"]}
                  empty={{ icon: "👥", text: "Aucun client" }}
                  rows={customers.map(c => {
                    const clientOrders = orders.filter(o => o.customer_email === c.customer_email);
                    const total = clientOrders.reduce((s, o) => s + Number(o.total_amount), 0);
                    return [
                      <div className="a-cust-row">
                        <div className="a-avatar">{c.customer_name?.charAt(0)?.toUpperCase()}</div>
                        <span className="a-fw">{c.customer_name}</span>
                      </div>,
                      <span className="a-muted-sm">{c.customer_email}</span>,
                      <span className="a-muted-sm">{c.customer_phone || "—"}</span>,
                      <span className="a-chip a-chip-blue">{clientOrders.length} cmd</span>,
                      <span className="a-coral a-fw">{fmt(total)} MAD</span>,
                    ];
                  })}
                />
              </div>
            </>)}

            {/* ════════ DELIVERY ════════ */}
            {activePage === "delivery" && (<>
              <div className="a-page-head"><h1 className="a-page-title">Livraison</h1></div>
              <div className="a-delivery-hero">
                <div className="a-dh-icon">🚚</div>
                <div>
                  <div className="a-dh-title">Livraison partout au Maroc</div>
                  <div className="a-dh-sub">Offerte dès 160 MAD · Délai 24–72h · Paiement à la livraison</div>
                </div>
                <div className="a-dh-badge">● Actif</div>
              </div>
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-title">En cours de livraison</div></div>
                <ATable
                  cols={["Commande", "Client", "Adresse", "Statut"]}
                  empty={{ icon: "🚚", text: "Aucune livraison en cours" }}
                  rows={orders.filter(o => ["shipped", "processing"].includes(o.status)).map(o => [
                    <span className="a-id">#{o.id}</span>,
                    <span className="a-fw">{o.customer_name}</span>,
                    <span className="a-muted-sm">{o.customer_address || "—"}</span>,
                    <ABadge cfg={STATUS_CFG[o.status]} />,
                  ])}
                />
              </div>
              <div className="a-card" style={{ padding: 24 }}>
                <div className="a-card-title" style={{ marginBottom: 16 }}>🇲🇦 Zones desservies</div>
                <div className="a-zones">
                  {["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Tétouan", "Meknès", "Oujda", "El Jadida", "Settat", "Khouribga", "Béni Mellal", "Kénitra", "Laâyoune"].map(z => (
                    <span key={z} className="a-zone">{z}</span>
                  ))}
                </div>
              </div>
            </>)}

            {/* ════════ SETTINGS ════════ */}
            {activePage === "settings" && (<>
              <div className="a-page-head"><h1 className="a-page-title">Paramètres</h1></div>
              <div className="a-form-wrap" style={{ maxWidth: 600 }}>
                <div className="a-form-header">
                  <div className="a-form-header-left">
                    <div className="a-form-pulse" />
                    <div className="a-form-title">Informations de la boutique</div>
                  </div>
                </div>
                <div className="a-form-grid-2">
                  {[
                    { label: "Nom de la boutique", type: "text",  value: "Nahid Perfume",          col: 2 },
                    { label: "Email admin",         type: "email", value: "admin@nahidperfume.com", col: 1 },
                    { label: "Téléphone",           type: "text",  value: "+212 6 00 00 00 00",     col: 1 },
                    { label: "Ville",               type: "text",  value: "Casablanca, Maroc",      col: 1 },
                  ].map((f, i) => (
                    <div key={i} className={`a-field${f.col === 2 ? " a-col-2" : ""}`}>
                      <label className="a-lbl">{f.label}</label>
                      <input className="af-input" type={f.type} defaultValue={f.value} />
                    </div>
                  ))}
                  <div className="a-field">
                    <label className="a-lbl">Devise</label>
                    <select className="af-input" defaultValue="MAD">
                      <option>MAD</option><option>EUR</option><option>USD</option>
                    </select>
                  </div>
                </div>
                <div className="a-form-footer">
                  <button className="a-btn-primary">💾 Sauvegarder</button>
                </div>
              </div>
            </>)}

          </div>{/* /a-content */}
        </main>
      </div>
    </>
  );
};

/* ──────────────────────────────────────
   Sub-components
   ────────────────────────────────────── */
const ABadge = ({ cfg }) => (
  <span className="a-badge" style={{ "--sb": cfg.bg, "--sc": cfg.color }}>
    <span className="a-dot" style={{ background: cfg.dot }} />{cfg.label}
  </span>
);

const ATable = ({ cols, rows, empty }) => (
  <div className="a-tbl-wrap">
    {rows.length === 0
      ? <div className="a-empty"><div style={{ fontSize: 36, marginBottom: 10, opacity: .4 }}>{empty.icon}</div><p>{empty.text}</p></div>
      : <table className="a-tbl">
          <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>{rows.map((row, ri) => <tr key={ri} style={{ animationDelay: `${ri * .03}s` }}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>)}</tbody>
        </table>
    }
  </div>
);

/* ══════════════════════════════════════════
   CSS
   ══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Cormorant:wght@400;500;600&display=swap');

:root {
  --c:    #EF776A;
  --cd:   #D4574A;
  --cl:   #FFF4F2;
  --cll:  #FFE8E5;
  --gold: #C49A44;
  --w:    #FFFFFF;
  --bg:   #F6F4F1;
  --bd:   #EAE6E1;
  --bd2:  #D8D3CC;
  --ink:  #1A1816;
  --ink2: #3A3632;
  --g:    #7A7470;
  --g2:   #ABA6A0;
  --sb:   264px;
  --r:    16px;
  --r2:   22px;
  --ff:   'DM Sans', system-ui, sans-serif;
  --ffd:  'Cormorant', Georgia, serif;
  --sh:   0 1px 2px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.04);
  --shh:  0 4px 24px rgba(0,0,0,.08), 0 16px 56px rgba(0,0,0,.07);
  --ea:   cubic-bezier(.16,1,.3,1);
  --sp:   cubic-bezier(.34,1.56,.64,1);
}

/* reset */
.a-root *, .al-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
.a-root, .al-wrap { font-family: var(--ff); color: var(--ink); }
button, input, select, textarea { font-family: var(--ff); }

/* ════════ LOGIN ════════ */
.al-wrap {
  min-height: 100vh; background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.al-orb {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, var(--c), transparent 70%);
  filter: blur(60px);
}
.al-orb-1 { width: 500px; height: 500px; top: -200px; right: -150px; opacity: .07; animation: orbFloat 16s ease-in-out infinite; }
.al-orb-2 { width: 350px; height: 350px; bottom: -150px; left: -100px; opacity: .06; animation: orbFloat 20s ease-in-out infinite reverse; }
.al-orb-3 { width: 200px; height: 200px; top: 40%; left: 30%; opacity: .04; animation: orbFloat 12s ease-in-out infinite 4s; }
@keyframes orbFloat { 0%,100% { transform: scale(1) translateY(0); } 50% { transform: scale(1.08) translateY(-20px); } }

.al-card {
  position: relative; z-index: 2;
  background: var(--w); border: 1px solid var(--bd);
  border-radius: 28px; padding: clamp(36px,6vw,56px) clamp(28px,5vw,48px);
  width: 100%; max-width: 440px; margin: 24px;
  box-shadow: var(--shh); animation: slideUp .55s var(--ea);
}
@keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }

.al-logo { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
.al-logo-mark {
  width: 52px; height: 52px; border-radius: 16px;
  background: linear-gradient(135deg, var(--c), var(--cd));
  color: white; font-family: var(--ffd); font-size: 24px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(239,119,106,.35); flex-shrink: 0;
}
.al-logo-name { font-family: var(--ffd); font-size: 19px; font-weight: 500; color: var(--ink); }
.al-logo-sub  { font-size: 10.5px; color: var(--g2); letter-spacing: .1em; text-transform: uppercase; margin-top: 2px; }
.al-title { font-family: var(--ffd); font-size: clamp(22px,4vw,28px); font-weight: 500; color: var(--ink); margin-bottom: 6px; }
.al-desc  { font-size: 14px; color: var(--g); margin-bottom: 28px; }
.al-form  { display: flex; flex-direction: column; gap: 16px; }
.al-err   { background: #FEF2F2; border: 1px solid #FECACA; color: #991B1B; padding: 11px 14px; border-radius: 10px; font-size: 13px; display: flex; align-items: center; gap: 8px; }
.al-hint  { margin-top: 20px; font-size: 11px; color: var(--g2); text-align: center; letter-spacing: .06em; }

/* ════════ SHELL ════════ */
.a-root { display: flex; min-height: 100vh; background: var(--bg); }
.a-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.22); z-index: 49; backdrop-filter: blur(4px); }

/* ════════ SIDEBAR ════════ */
.a-sidebar {
  position: fixed; top: 0; left: 0;
  width: var(--sb); height: 100vh;
  background: var(--w); border-right: 1px solid var(--bd);
  display: flex; flex-direction: column; z-index: 50;
  transition: transform .32s var(--ea); overflow: hidden;
}
.a-sidebar-closed { transform: translateX(-100%); }
.a-sb-top {
  padding: 20px 16px 16px;
  border-bottom: 1px solid var(--bd);
  display: flex; align-items: center; gap: 12px;
}
.a-sb-logo { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.a-sb-mark {
  width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--c), var(--cd));
  color: white; font-family: var(--ffd); font-size: 18px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(239,119,106,.32);
}
.a-sb-name { font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.2; }
.a-sb-role { font-size: 9.5px; color: var(--g2); letter-spacing: .1em; text-transform: uppercase; }
.a-sb-close { background: none; border: none; color: var(--g); font-size: 13px; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; display: none; align-items: center; justify-content: center; }
.a-sb-close:hover { background: var(--bg); color: var(--ink); }
.a-sb-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--bd), transparent); margin: 0 16px; }

.a-nav { padding: 12px 10px; display: flex; flex-direction: column; gap: 2px; }
.a-nav-section-lbl { font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--g2); padding: 8px 10px 6px; }
.a-nav-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  border-radius: 12px; border: none; background: none;
  font-size: 13.5px; font-weight: 500; color: var(--g);
  width: 100%; text-align: left; cursor: pointer;
  transition: all .16s; position: relative;
}
.a-nav-item:hover { background: var(--cl); color: var(--c); }
.a-nav-active { background: var(--cll) !important; color: var(--c) !important; font-weight: 700; }
.a-nav-active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 20px; background: var(--c); border-radius: 0 3px 3px 0; }
.a-nav-icon { font-size: 14px; width: 18px; text-align: center; flex-shrink: 0; }
.a-nav-txt  { flex: 1; }
.a-nav-badge { margin-left: auto; background: var(--c); color: white; border-radius: 20px; font-size: 10px; padding: 2px 7px; font-weight: 800; }

.a-sb-foot { padding: 12px 10px; border-top: 1px solid var(--bd); }
.a-sb-user { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 12px; background: var(--bg); margin-bottom: 7px; }
.a-sb-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,var(--c),var(--cd)); color: white; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.a-sb-uname  { font-size: 13px; font-weight: 600; color: var(--ink); }
.a-sb-uemail { font-size: 10px; color: var(--g2); }
.a-logout-btn { display: flex; align-items: center; gap: 9px; padding: 9px 14px; border-radius: 10px; border: none; background: none; font-size: 13px; font-weight: 500; color: #B88880; width: 100%; cursor: pointer; transition: all .16s; }
.a-logout-btn:hover { background: #FEF2F2; color: #991B1B; }

/* ════════ MAIN ════════ */
.a-main { flex: 1; transition: margin-left .32s var(--ea); min-width: 0; overflow-x: hidden; }
.a-main-pushed { margin-left: var(--sb); }

/* Topbar */
.a-topbar {
  position: sticky; top: 0; z-index: 40;
  background: rgba(255,255,255,.9); backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid var(--bd); height: 62px;
  padding: 0 clamp(14px,2.5vw,28px);
  display: flex; align-items: center; gap: 12px;
}
.a-hamburger { width: 38px; height: 38px; border: none; background: none; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4.5px; cursor: pointer; transition: background .15s; flex-shrink: 0; }
.a-hamburger:hover { background: var(--bg); }
.a-hamburger span { display: block; width: 16px; height: 1.5px; background: var(--g); border-radius: 2px; }
.a-topbar-title { font-family: var(--ffd); font-size: 17px; font-weight: 500; color: var(--ink); white-space: nowrap; }
.a-topbar-actions { display: flex; align-items: center; gap: 8px; }
.a-topbar-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,var(--c),var(--cd)); color: white; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }

/* Content area */
.a-content { padding: clamp(16px,3vw,32px); max-width: 1400px; }

/* Page header */
.a-page-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: clamp(16px,2.5vw,28px); flex-wrap: wrap; gap: 12px; }
.a-page-title { font-family: var(--ffd); font-size: clamp(20px,3vw,28px); font-weight: 500; color: var(--ink); line-height: 1.2; }
.a-page-sub   { font-size: 13px; color: var(--g); margin-top: 4px; }

/* KPIs */
.a-kpi-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 20px; }
.a-kpi {
  background: var(--w); border: 1px solid var(--bd); border-radius: var(--r);
  padding: 22px 20px; box-shadow: var(--sh);
  animation: kpiIn .5s var(--ea) both; position: relative; overflow: hidden;
  transition: transform .22s var(--ea), box-shadow .22s;
}
.a-kpi::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--ka, var(--c)); border-radius: 3px 3px 0 0; }
.a-kpi:hover { transform: translateY(-4px); box-shadow: var(--shh); }
@keyframes kpiIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
.a-kpi-top    { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
.a-kpi-icon   { font-size: 24px; }
.a-kpi-glyph  { width: 30px; height: 30px; border-radius: 9px; }
.a-kpi-val    { font-family: var(--ffd); font-size: clamp(20px,3vw,28px); font-weight: 500; color: var(--ink); margin-bottom: 5px; }
.a-kpi-lbl    { font-size: 12px; font-weight: 500; color: var(--g2); letter-spacing: .03em; }

/* Status strip */
.a-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.a-strip-pill { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; background: var(--sb); color: var(--sc); font-size: 12px; font-weight: 500; border: 1px solid color-mix(in srgb, var(--sc) 14%, transparent); }

/* Card */
.a-card { background: var(--w); border: 1px solid var(--bd); border-radius: var(--r2); box-shadow: var(--sh); overflow: hidden; margin-bottom: 20px; transition: box-shadow .2s; }
.a-card:hover { box-shadow: var(--shh); }
.a-card-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 22px; border-bottom: 1px solid var(--bd); flex-wrap: wrap; gap: 12px; }
.a-card-title { font-size: 15px; font-weight: 700; color: var(--ink); }

/* Table */
.a-tbl-wrap { overflow-x: auto; }
.a-tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.a-tbl thead tr { background: #FDFCFB; }
.a-tbl thead th { padding: 11px 18px; text-align: left; font-size: 9px; font-weight: 800; color: var(--g2); letter-spacing: .14em; text-transform: uppercase; border-bottom: 1px solid var(--bd); white-space: nowrap; }
.a-tbl tbody tr { border-bottom: 1px solid #F2EFEB; transition: background .14s; animation: rowIn .3s var(--ea) both; }
@keyframes rowIn { from { opacity:0; transform:translateX(-4px); } to { opacity:1; transform:none; } }
.a-tbl tbody tr:last-child { border-bottom: none; }
.a-tbl tbody tr:hover { background: #FDFAF8; }
.a-tbl tbody td { padding: 14px 18px; vertical-align: middle; }

/* Helpers */
.a-id       { font-weight: 700; color: var(--g2); font-size: 13px; }
.a-fw       { font-weight: 600; }
.a-coral    { font-weight: 700; color: var(--c); }
.a-muted-sm { font-size: 11.5px; color: var(--g); margin-top: 2px; }
.a-inspired { font-size: 10.5px; color: var(--g2); font-style: italic; margin-top: 2px; }
.a-notes-preview { font-size: 10.5px; color: var(--g2); margin-top: 2px; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.a-prod-row { display: flex; align-items: center; gap: 12px; }
.a-thumb    { width: 46px; height: 46px; border-radius: 10px; object-fit: cover; border: 1px solid var(--bd); flex-shrink: 0; }
.a-thumb-ph { width: 46px; height: 46px; border-radius: 10px; background: var(--cl); display: flex; align-items: center; justify-content: center; font-size: 20px; border: 1px solid var(--cll); flex-shrink: 0; }
.a-cust-row { display: flex; align-items: center; gap: 10px; }
.a-avatar   { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg,var(--c),var(--cd)); color: white; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.a-dot      { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.a-stock    { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 500; }
.a-stock-low { color: #B91C1C; }
.a-badge    { display: inline-flex; align-items: center; gap: 5px; padding: 4px 11px; border-radius: 20px; background: var(--sb); color: var(--sc); font-size: 12px; font-weight: 500; white-space: nowrap; }

/* Chips */
.a-chip       { display: inline-flex; align-items: center; padding: 4px 11px; border-radius: 20px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
.a-chip-coral { background: var(--cl); color: var(--c); }
.a-chip-blue  { background: #EFF6FF; color: #1D4ED8; }
.a-chip-gold  { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
.a-chip-gray  { background: #F4F4F5; color: #71717A; }

/* Actions */
.a-actions-row { display: flex; gap: 6px; }
.a-ic-btn  { width: 32px; height: 32px; border-radius: 9px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; transition: all .16s; }
.a-ic-edit { background: #EFF6FF; color: #3B82F6; }
.a-ic-edit:hover { background: #DBEAFE; transform: scale(1.1); }
.a-ic-del  { background: #FEF2F2; color: #EF4444; }
.a-ic-del:hover  { background: #FEE2E2; transform: scale(1.1); }

/* Pagination */
.a-pager { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-top: 1px solid var(--bd); flex-wrap: wrap; gap: 10px; }
.a-pager-info { font-size: 12px; color: var(--g2); }
.a-pager-btns { display: flex; gap: 5px; }
.a-pg-btn { width: 32px; height: 32px; border-radius: 9px; border: 1px solid var(--bd); background: white; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--g); transition: all .14s; display: flex; align-items: center; justify-content: center; }
.a-pg-btn:hover:not(:disabled) { background: var(--cl); border-color: var(--cll); color: var(--c); }
.a-pg-active   { background: var(--c) !important; border-color: var(--c) !important; color: white !important; }
.a-pg-btn:disabled { opacity: .35; cursor: not-allowed; }

/* Empty state */
.a-empty { text-align: center; padding: 56px 20px; color: var(--g2); font-size: 13px; }

/* Search */
.a-searchbar { display: flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--bd); border-radius: 40px; padding: 8px 16px; transition: border-color .15s; }
.a-searchbar:focus-within { border-color: var(--c); }
.a-searchbar span { font-size: 14px; color: var(--g2); }
.a-searchbar input { border: none; background: none; outline: none; font-size: 13px; color: var(--ink); min-width: 140px; }
.a-searchbar input::placeholder { color: var(--g2); }

/* Status select */
.a-status-sel { padding: 5px 12px; border-radius: 20px; border: none; cursor: pointer; outline: none; font-size: 12px; font-weight: 500; font-family: var(--ff); }

/* Buttons */
.a-btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  background: var(--c); color: white; border: none;
  padding: 10px 22px; border-radius: 40px; font-size: 13.5px; font-weight: 700;
  cursor: pointer; transition: all .2s var(--ea);
  box-shadow: 0 4px 16px rgba(239,119,106,.3); white-space: nowrap;
}
.a-btn-primary:hover:not(:disabled) { background: var(--cd); transform: translateY(-1px); box-shadow: 0 8px 26px rgba(239,119,106,.42); }
.a-btn-primary:disabled { opacity: .6; cursor: not-allowed; }
.a-btn-full { width: 100%; margin-top: 4px; }
.a-btn-sm   { padding: 8px 16px; font-size: 13px; }
.a-btn-ghost { background: none; border: 1.5px solid var(--bd); color: var(--g); padding: 9px 20px; border-radius: 40px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; }
.a-btn-ghost:hover { background: var(--bg); border-color: var(--c); color: var(--c); }
.a-btn-ghost-sm { background: none; border: none; color: var(--c); font-size: 13px; font-weight: 600; cursor: pointer; padding: 4px 8px; border-radius: 8px; }
.a-btn-ghost-sm:hover { background: var(--cl); }

/* Category tabs */
.a-cat-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.a-cat-tab  { padding: 7px 16px; border-radius: 999px; border: 1.5px solid var(--bd); background: white; font-size: 13px; font-weight: 500; color: var(--g); cursor: pointer; transition: all .15s; }
.a-cat-tab:hover { border-color: var(--c); color: var(--c); }
.a-cat-tab-active { background: var(--c); border-color: var(--c); color: white; font-weight: 700; }

/* ════════ FORM ════════ */
.a-form-wrap {
  background: var(--w); border: 1px solid var(--bd); border-radius: var(--r2);
  padding: clamp(20px,3vw,36px); box-shadow: var(--sh); margin-bottom: 20px;
  animation: formIn .32s var(--ea);
}
@keyframes formIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:none; } }
.a-form-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 12px; flex-wrap: wrap; }
.a-form-header-left { display: flex; align-items: flex-start; gap: 14px; }
.a-form-pulse {
  width: 12px; height: 12px; border-radius: 50%; background: var(--c); flex-shrink: 0; margin-top: 4px;
  box-shadow: 0 0 0 3px rgba(239,119,106,.2); animation: pulseDot 2.8s ease infinite;
}
@keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 3px rgba(239,119,106,.2); } 55% { box-shadow: 0 0 0 8px rgba(239,119,106,.06); } }
.a-form-title { font-size: 16px; font-weight: 700; color: var(--ink); }
.a-form-sub   { font-size: 12px; color: var(--g); margin-top: 3px; }
.a-form-note  {
  background: #FFF8F2; border: 1px solid #FDDBB8; border-radius: 10px;
  padding: 10px 14px; font-size: 12px; color: #92610A;
  margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
}
.a-form-note::before { content: 'ℹ'; font-size: 14px; flex-shrink: 0; }

.a-form-section-title {
  font-size: 10px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase;
  color: var(--c); padding: 16px 0 10px;
  display: flex; align-items: center; gap: 10px;
}
.a-form-section-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, var(--cll), transparent); }

.a-form-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 4px; }
.a-form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.a-col-2 { grid-column: span 2; }
.a-col-3 { grid-column: span 3; }

.a-field { display: flex; flex-direction: column; gap: 6px; }
.a-lbl   { font-size: 11px; font-weight: 700; color: var(--g); letter-spacing: .06em; text-transform: uppercase; }
.a-req   { color: var(--c); }

.af-input {
  padding: 11px 14px; border: 1.5px solid var(--bd); border-radius: 12px;
  font-size: 13.5px; color: var(--ink); background: white; outline: none;
  transition: border-color .2s, box-shadow .2s; width: 100%;
}
.af-input:focus { border-color: var(--c); box-shadow: 0 0 0 3px rgba(239,119,106,.1); }
.af-input::placeholder { color: var(--g2); }
.af-textarea { min-height: 88px; resize: vertical; line-height: 1.6; }
.af-hint { font-size: 10.5px; color: var(--g2); }

/* Range */
.af-range {
  width: 100%; -webkit-appearance: none; height: 6px; border-radius: 999px;
  background: linear-gradient(90deg, var(--c) calc(var(--v,60%)), var(--bd) 0);
  outline: none; cursor: pointer; margin-top: 8px;
}
.af-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--c); box-shadow: 0 2px 8px rgba(239,119,106,.4); cursor: pointer; transition: transform .15s; }
.af-range::-webkit-slider-thumb:hover { transform: scale(1.2); }
.af-range::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--c); border: none; cursor: pointer; }
.a-range-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--g2); margin-top: 3px; }
.a-intensity-badge { display: inline-block; padding: 2px 9px; border-radius: 999px; background: var(--c); color: #fff; font-size: 11px; font-weight: 700; margin-left: 6px; }

/* Preview */
.af-preview-wrap  { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
.af-preview       { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; border: 1px solid var(--bd); }
.af-preview-lbl   { font-size: 10px; color: var(--g2); font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.af-preview-empty {
  width: 100%; height: 80px; border-radius: 12px; border: 2px dashed var(--bd);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  color: var(--g2); font-size: 20px; background: var(--bg); transition: border-color .2s; cursor: pointer;
}
.af-preview-empty span { font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.af-preview-empty:hover { border-color: var(--c); }

/* Radio & Toggle */
.a-radio-group { display: flex; flex-wrap: wrap; gap: 6px; }
.a-radio-pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 7px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600;
  border: 1.5px solid var(--bd); background: white; color: var(--g);
  cursor: pointer; transition: all .15s;
}
.a-radio-pill:hover { border-color: var(--c); color: var(--c); }
.a-radio-active { background: var(--c) !important; border-color: var(--c) !important; color: white !important; }

.a-toggle-group { display: flex; flex-wrap: wrap; gap: 8px; }
.a-toggle-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 600;
  border: 1.5px solid var(--bd); background: white; color: var(--g);
  cursor: pointer; transition: all .18s;
}
.a-toggle-pill:hover { border-color: var(--c); color: var(--c); }
.a-toggle-on      { background: var(--c) !important; border-color: var(--c) !important; color: white !important; }
.a-toggle-on-gold { background: #F59E0B !important; border-color: #D97706 !important; color: white !important; }

.a-form-footer { display: flex; gap: 10px; padding-top: 22px; border-top: 1px solid var(--bd); margin-top: 10px; }

/* ════════ DELIVERY ════════ */
.a-delivery-hero {
  background: linear-gradient(135deg, var(--cl), white);
  border: 1px solid var(--cll); border-radius: var(--r);
  padding: clamp(18px,3vw,28px) clamp(20px,3vw,32px);
  display: flex; align-items: center; gap: 20px; margin-bottom: 20px;
  flex-wrap: wrap; position: relative; overflow: hidden;
}
.a-delivery-hero::after { content: '✦'; position: absolute; right: 24px; bottom: -10px; font-size: 88px; color: var(--c); opacity: .05; pointer-events: none; }
.a-dh-icon  { font-size: 36px; flex-shrink: 0; }
.a-dh-title { font-family: var(--ffd); font-size: 18px; font-weight: 500; color: var(--ink); }
.a-dh-sub   { font-size: 13px; color: var(--g); margin-top: 3px; }
.a-dh-badge { margin-left: auto; background: white; color: #166534; border: 1px solid #BBF7D0; padding: 7px 16px; border-radius: 40px; font-size: 12px; font-weight: 700; flex-shrink: 0; }

.a-zones { display: flex; flex-wrap: wrap; gap: 8px; }
.a-zone  { background: var(--cl); color: var(--c); border: 1px solid var(--cll); padding: 6px 14px; border-radius: 40px; font-size: 12px; font-weight: 500; transition: all .14s; cursor: default; }
.a-zone:hover { background: var(--cll); transform: translateY(-1px); }

/* Spinner */
.a-spin { display: inline-block; width: 16px; height: 16px; border: 2.5px solid rgba(255,255,255,.4); border-top-color: white; border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ════════ RESPONSIVE ════════ */
@media (max-width: 1280px) { .a-kpi-row { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 1024px) {
  .a-main-pushed { margin-left: 0 !important; }
  .a-sb-close { display: flex !important; }
  .a-content { padding: clamp(12px,2vw,20px); }
  .a-form-grid-3 { grid-template-columns: 1fr 1fr; }
  .a-col-3 { grid-column: span 2; }
}
@media (max-width: 768px) {
  .a-kpi-row { grid-template-columns: 1fr 1fr; gap: 12px; }
  .a-form-grid-3, .a-form-grid-2 { grid-template-columns: 1fr; }
  .a-col-2, .a-col-3 { grid-column: span 1; }
  .a-page-head { flex-direction: column; align-items: flex-start; }
  .a-card-head { flex-direction: column; align-items: flex-start; }
  .a-tbl thead th:nth-child(n+5) { display: none; }
  .a-tbl tbody td:nth-child(n+5) { display: none; }
  .a-topbar-title { font-size: 15px; }
}
@media (max-width: 480px) {
  .a-kpi-row { gap: 10px; }
  .a-kpi { padding: 16px 14px; }
  .a-kpi-val { font-size: 20px; }
  .a-strip { gap: 5px; }
  .a-strip-pill { font-size: 11px; padding: 5px 10px; }
  .al-card { padding: 32px 22px; }
  .a-btn-primary { padding: 9px 18px; font-size: 13px; }
  .a-radio-group, .a-toggle-group { gap: 5px; }
  .a-radio-pill, .a-toggle-pill { padding: 6px 12px; font-size: 12px; }
}

/* ════════ MEDIA UPLOAD ════════ */
.a-media-lbl {
  font-size: 10px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
  color: var(--g); margin-bottom: 10px;
}
.a-media-main-zone {
  display: flex; align-items: flex-start; gap: 18px;
  background: var(--bg); border: 1.5px dashed var(--bd2);
  border-radius: 16px; padding: 18px 20px;
  transition: border-color .2s;
}
.a-media-main-zone:hover { border-color: var(--c); }
.a-media-preview-box {
  position: relative; width: 96px; height: 96px; flex-shrink: 0;
  border-radius: 14px; overflow: hidden; border: 1px solid var(--bd);
  background: white; display: flex; align-items: center; justify-content: center;
}
.a-media-preview-img { width: 100%; height: 100%; object-fit: cover; }
.a-media-placeholder  {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; color: var(--g2);
}
.a-media-placeholder span { font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.a-media-uploading {
  position: absolute; inset: 0; background: rgba(255,255,255,.85);
  display: flex; align-items: center; justify-content: center;
}
.a-media-main-body  { flex: 1; min-width: 0; }
.a-media-main-title { font-size: 13.5px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
.a-media-main-sub   { font-size: 11px; color: var(--g2); margin-bottom: 13px; line-height: 1.5; }
.a-media-actions    { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.a-media-upload-lbl { cursor: pointer; user-select: none; display: inline-flex; align-items: center; gap: 6px; }
.a-btn-disabled     { opacity: .6; pointer-events: none; }
.a-media-or         { font-size: 11px; color: var(--g2); font-weight: 500; flex-shrink: 0; }
.a-media-url-in     { flex: 1; min-width: 150px; font-size: 12px !important; padding: 8px 12px !important; border-radius: 10px !important; }

.a-gallery-url-list { display: flex; flex-direction: column; gap: 10px; }
.a-gallery-url-row  { display: flex; align-items: center; gap: 10px; }
.a-gallery-url-thumb {
  width: 42px; height: 42px; border-radius: 10px; object-fit: cover; flex-shrink: 0;
  border: 1px solid var(--bd2);
}
.a-gallery-url-in   { flex: 1; font-size: 12px !important; padding: 8px 12px !important; border-radius: 10px !important; }
.a-gallery-url-clear {
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  background: var(--bg); border: 1px solid var(--bd2); color: var(--g2);
  font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background .15s, color .15s;
}
.a-gallery-url-clear:hover { background: #EF4444; color: white; border-color: #EF4444; }
.a-spin-dark { border-color: rgba(0,0,0,.1); border-top-color: var(--c); }

@media (max-width: 640px) {
  .a-media-main-zone  { flex-direction: column; }
  .a-media-actions    { flex-direction: column; align-items: flex-start; }
  .a-media-url-in     { width: 100%; }
}

/* ════════ SweetAlert2 overrides ════════ */
.swal2-container { z-index: 99999 !important; }
.swal2-popup {
  font-family: 'DM Sans', sans-serif !important;
  border-radius: 24px !important; border: 1px solid #EDE9E5;
  padding: 32px 28px !important;
  box-shadow: 0 24px 64px rgba(28,26,22,.18) !important;
}
.swal2-title { font-family: 'DM Sans', sans-serif !important; font-size: 17px !important; font-weight: 700 !important; color: #1A1816 !important; padding: 0 !important; margin-bottom: 8px !important; }
.swal2-html-container { font-size: 13.5px !important; color: #7A7470 !important; line-height: 1.65 !important; margin: 0 !important; padding: 0 !important; }
.swal2-icon { margin: 0 auto 20px !important; }
.swal2-icon.swal2-warning { border-color: #EF776A !important; color: #EF776A !important; }
.swal2-icon.swal2-success { border-color: #4ADE80 !important; }
.swal2-icon.swal2-success [class^=swal2-success-line] { background: #4ADE80 !important; }
.swal2-icon.swal2-success .swal2-success-ring { border-color: #4ADE80 !important; }
.swal2-actions { gap: 8px !important; margin-top: 24px !important; }
.swal2-confirm { border-radius: 999px !important; font-family: 'DM Sans', sans-serif !important; font-weight: 700 !important; font-size: 13px !important; padding: 10px 24px !important; box-shadow: 0 4px 16px rgba(239,119,106,.3) !important; }
.swal2-cancel  { border-radius: 999px !important; font-family: 'DM Sans', sans-serif !important; font-weight: 700 !important; font-size: 13px !important; padding: 10px 24px !important; color: #7A7470 !important; border: 1.5px solid #EAE6E1 !important; background: white !important; }
.swal2-cancel:hover { background: #F6F4F1 !important; border-color: var(--c) !important; color: #1A1816 !important; }
.swal2-timer-progress-bar { background: rgba(239,119,106,.45) !important; }
.swal2-toast { border-radius: 14px !important; padding: 12px 18px !important; box-shadow: 0 8px 32px rgba(28,26,22,.12) !important; font-family: 'DM Sans', sans-serif !important; }
.swal2-toast .swal2-title { font-size: 13.5px !important; font-weight: 600 !important; color: #1A1816 !important; }
.swal2-toast.swal2-icon-success { border-left: 4px solid #4ADE80 !important; }
.swal2-toast.swal2-icon-error   { border-left: 4px solid #F87171 !important; }
.swal2-toast.swal2-icon-warning { border-left: 4px solid #FBBF24 !important; }
`;

export default Admin;