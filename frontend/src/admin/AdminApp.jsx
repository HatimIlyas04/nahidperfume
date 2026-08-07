import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./admin.css";
import { adminAuthApi } from "../services/api";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import PerfumesPage from "./pages/PerfumesPage";
import PacksPage from "./pages/PacksPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FeedbackPage from "./pages/FeedbackPage";
import FaqPage from "./pages/FaqPage";
import CouponsPage from "./pages/CouponsPage";
import HomepagePage from "./pages/HomepagePage";
import SettingsPage from "./pages/SettingsPage";
import AdminsPage from "./pages/AdminsPage";
import ActivityLogsPage from "./pages/ActivityLogsPage";

export default function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setChecking(false);
      return;
    }
    adminAuthApi
      .verify()
      .then(setAdmin)
      .catch(() => localStorage.removeItem("adminToken"))
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = (result) => {
    localStorage.setItem("adminToken", result.token);
    setAdmin(result.admin);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  if (checking) return null;

  if (!admin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout admin={admin} onLogout={handleLogout}>
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
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admins" element={admin.role === "super_admin" ? <AdminsPage /> : <Navigate to="/admin" />} />
        <Route path="/logs" element={admin.role === "super_admin" ? <ActivityLogsPage /> : <Navigate to="/admin" />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </AdminLayout>
  );
}
