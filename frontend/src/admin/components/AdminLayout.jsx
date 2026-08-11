import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import {
  FiGrid, FiShoppingBag, FiPackage, FiBox, FiUsers, FiMessageSquare,
  FiStar, FiHelpCircle, FiTag, FiHome, FiSettings, FiShield, FiFileText,
  FiBell, FiMoon, FiSun, FiLogOut, FiMenu, FiX, FiEdit3,
} from "react-icons/fi";
import { adminNotificationsApi, API_BASE_URL } from "../../services/api";
import { playNotificationSound } from "../utils/notifSound";

const NAV = [
  { section: "Général" },
  { to: "/admin", end: true, icon: FiGrid, label: "Tableau de bord" },
  { to: "/admin/orders", icon: FiShoppingBag, label: "Commandes" },
  { to: "/admin/customers", icon: FiUsers, label: "Clients" },
  { section: "Catalogue" },
  { to: "/admin/perfumes", icon: FiBox, label: "Parfums" },
  { to: "/admin/packs", icon: FiPackage, label: "Packs Prêts" },
  { section: "Contenu" },
  { to: "/admin/homepage", icon: FiHome, label: "Page d'accueil" },
  { to: "/admin/content", icon: FiEdit3, label: "Contenu du site" },
  { to: "/admin/testimonials", icon: FiStar, label: "Témoignages" },
  { to: "/admin/feedback", icon: FiMessageSquare, label: "Avis clients" },
  { to: "/admin/faq", icon: FiHelpCircle, label: "FAQ" },
  { to: "/admin/coupons", icon: FiTag, label: "Coupons" },
  { section: "Système" },
  { to: "/admin/settings", icon: FiSettings, label: "Paramètres" },
  { to: "/admin/admins", icon: FiShield, label: "Administrateurs", superOnly: true },
  { to: "/admin/logs", icon: FiFileText, label: "Journaux", superOnly: true },
];

export default function AdminLayout({ admin, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("nahid_admin_theme") === "dark");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifData, setNotifData] = useState({ notifications: [], unreadCount: 0 });
  const notifRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("nahid_admin_theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const load = () => adminNotificationsApi.list().then(setNotifData).catch(() => {});
    load();
    // Fallback poll in case the socket connection drops — the live push
    // below is the primary path, this just guarantees eventual consistency.
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return undefined;

    const socket = io(API_BASE_URL, { auth: { token }, transports: ["websocket", "polling"] });

    socket.on("new_notification", (notification) => {
      setNotifData((d) => ({
        notifications: [notification, ...d.notifications].slice(0, 50),
        unreadCount: d.unreadCount + 1,
      }));
      playNotificationSound();
      Swal.fire({
        toast: true, position: "top-end", icon: "info", title: notification.title,
        text: notification.body, showConfirmButton: false, timer: 5000, timerProgressBar: true,
      });
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const markAllRead = async () => {
    await adminNotificationsApi.markAllRead();
    setNotifData((d) => ({ notifications: d.notifications.map((n) => ({ ...n, is_read: 1 })), unreadCount: 0 }));
  };

  const currentTitle = NAV.find((n) => n.to && window.location.pathname === n.to)?.label || "Tableau de bord";

  return (
    <div className="adm-shell">
      <aside className={`adm-sidebar${sidebarOpen ? " open" : ""}`}>
        <Link to="/admin" className="adm-sidebar-logo">
          <img src="/nahid.png" alt="Nahid" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span>Nahid Admin</span>
        </Link>
        <nav className="adm-nav">
          {NAV.map((item, i) =>
            item.section ? (
              <div className="adm-nav-section" key={`s${i}`}>{item.section}</div>
            ) : item.superOnly && admin.role !== "super_admin" ? null : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `adm-nav-link${isActive ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={16} /> {item.label}
              </NavLink>
            )
          )}
        </nav>
        <div className="adm-sidebar-foot">
          <div style={{ color: "white", fontSize: "0.8rem", fontWeight: 600, marginBottom: "8px" }}>
            {admin.full_name || admin.username}
          </div>
          <button className="adm-logout-btn" onClick={onLogout}>
            <FiLogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="adm-icon-btn adm-menu-toggle" onClick={() => setSidebarOpen((v) => !v)}>
              {sidebarOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
            <span className="adm-topbar-title">{currentTitle}</span>
          </div>
          <div className="adm-topbar-right">
            <button className="adm-icon-btn" onClick={() => setDark((v) => !v)} aria-label="Thème">
              {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <div style={{ position: "relative" }} ref={notifRef}>
              <button className="adm-icon-btn" onClick={() => setNotifOpen((v) => !v)} aria-label="Notifications">
                <FiBell size={16} />
                {notifData.unreadCount > 0 && <span className="adm-badge-dot" />}
              </button>
              {notifOpen && (
                <div className="adm-notif-dropdown">
                  <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--adm-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: "0.85rem" }}>Notifications</strong>
                    {notifData.unreadCount > 0 && (
                      <button onClick={markAllRead} style={{ fontSize: "0.7rem", background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
                        Tout marquer lu
                      </button>
                    )}
                  </div>
                  {notifData.notifications.length === 0 ? (
                    <div style={{ padding: "24px", textAlign: "center", fontSize: "0.8rem", color: "var(--adm-text-light)" }}>
                      Aucune notification
                    </div>
                  ) : (
                    notifData.notifications.map((n) => (
                      <div className={`adm-notif-item${!n.is_read ? " unread" : ""}`} key={n.id}>
                        <strong>{n.title}</strong>
                        <span>{n.body}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="adm-content">{children}</main>
      </div>
    </div>
  );
}
