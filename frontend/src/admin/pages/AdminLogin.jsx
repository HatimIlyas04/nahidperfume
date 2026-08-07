import { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { adminAuthApi } from "../../services/api";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await adminAuthApi.login(username.trim(), password);
      onLogin(result);
    } catch (err) {
      setError(err.response?.data?.error || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <h1>Espace Admin</h1>
        <p>Nahid Perfumes — Tableau de bord</p>
        <form onSubmit={handleSubmit}>
          <div className="adm-form-group">
            <label><FiUser size={12} style={{ marginRight: "5px" }} />Identifiant</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </div>
          <div className="adm-form-group">
            <label><FiLock size={12} style={{ marginRight: "5px" }} />Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: "var(--error)", fontSize: "0.82rem", marginBottom: "14px" }}>{error}</p>}
          <button type="submit" className="adm-btn adm-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px" }} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
