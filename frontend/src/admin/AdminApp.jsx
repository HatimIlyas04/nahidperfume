import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./admin.css";
import { adminAuthApi } from "../services/api";
import AdminLayout from "./components/AdminLayout";
// AdminLogin stays eager: it's the very first thing shown for any
// unauthenticated /admin visit, so lazy-loading it would just add a
// network round trip before anyone could even see the login form.
import AdminLogin from "./pages/AdminLogin";

// Every other admin page is lazy — previously all of these (plus their
// dependencies: chart.js for Dashboard, xlsx/jspdf for OrdersPage) were
// statically imported here, so AdminApp.jsx's own chunk was ~550KB and
// visiting the LOGIN SCREEN forced downloading charts+excel+pdf libraries
// nobody needed yet. Each page (and whatever heavy library it alone uses)
// now only loads when its route is actually visited.
const Dashboard          = lazy(() => import("./pages/Dashboard"));
const PerfumesPage       = lazy(() => import("./pages/PerfumesPage"));
const PacksPage          = lazy(() => import("./pages/PacksPage"));
const OrdersPage         = lazy(() => import("./pages/OrdersPage"));
const CustomersPage      = lazy(() => import("./pages/CustomersPage"));
const TestimonialsPage   = lazy(() => import("./pages/TestimonialsPage"));
const FeedbackPage       = lazy(() => import("./pages/FeedbackPage"));
const FaqPage            = lazy(() => import("./pages/FaqPage"));
const CouponsPage        = lazy(() => import("./pages/CouponsPage"));
const HomepagePage       = lazy(() => import("./pages/HomepagePage"));
const ContentPage        = lazy(() => import("./pages/ContentPage"));
const SettingsPage       = lazy(() => import("./pages/SettingsPage"));
const AdminsPage         = lazy(() => import("./pages/AdminsPage"));
const ActivityLogsPage   = lazy(() => import("./pages/ActivityLogsPage"));

function AdminPageLoader() {
  return (
    <div style={{ padding: "60px", textAlign: "center", color: "var(--adm-text-light)" }}>
      Chargement...
    </div>
  );
}

function readCachedAdmin() {
  try {
    const raw = localStorage.getItem("cachedAdmin");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function AdminApp() {
  // Optimistic auth: if a previous session already cached who's logged
  // in, render the dashboard shell immediately with that — never a blank
  // screen while the token is (re-)verified in the background. Only a
  // brand-new browser/token (no cache yet) sees a loading state, and even
  // then it's a message, not `return null`.
  const [admin, setAdmin] = useState(() => (localStorage.getItem("adminToken") ? readCachedAdmin() : null));
  const [checking, setChecking] = useState(() => !!localStorage.getItem("adminToken"));

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setChecking(false);
      return;
    }
    adminAuthApi
      .verify()
      .then((result) => {
        setAdmin(result);
        localStorage.setItem("cachedAdmin", JSON.stringify(result));
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("cachedAdmin");
        setAdmin(null);
      })
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = (result) => {
    localStorage.setItem("adminToken", result.token);
    localStorage.setItem("cachedAdmin", JSON.stringify(result.admin));
    setAdmin(result.admin);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("cachedAdmin");
    setAdmin(null);
  };

  // Only blocks when there's genuinely nothing to show yet (no cached
  // admin to render optimistically) — a returning admin with a cached
  // identity skips straight to the dashboard shell below while verify()
  // confirms/refreshes in the background.
  if (checking && !admin) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--adm-text-light)", fontSize: "0.85rem" }}>
        Chargement...
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout admin={admin} onLogout={handleLogout}>
      <Suspense fallback={<AdminPageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/perfumes" element={<PerfumesPage />} />
          <Route path="/packs" element={<PacksPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/homepage" element={<HomepagePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admins" element={admin.role === "super_admin" ? <AdminsPage /> : <Navigate to="/admin" />} />
          <Route path="/logs" element={admin.role === "super_admin" ? <ActivityLogsPage /> : <Navigate to="/admin" />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </Suspense>
    </AdminLayout>
  );
}
