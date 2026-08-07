import { useState } from "react";
import Swal from "sweetalert2";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { contactApi } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { getRecaptchaToken } from "../utils/recaptcha";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.ct-page-wrap { max-width: 1000px; margin: 0 auto; padding: 60px 32px 100px; }
.ct-page-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 500; text-align: center; margin-bottom: 10px; }
.ct-page-sub { text-align: center; color: var(--text-light); max-width: 480px; margin: 0 auto 48px; }
.ct-page-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; }
@media (max-width: 800px) { .ct-page-grid { grid-template-columns: 1fr; } }
.ct-info-card { background: var(--background); border-radius: var(--radius-lg); padding: 32px; display: flex; flex-direction: column; gap: 20px; height: fit-content; }
.ct-info-row { display: flex; align-items: flex-start; gap: 14px; }
.ct-info-icon { width: 42px; height: 42px; border-radius: 12px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ct-info-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 3px; }
.ct-info-value { font-size: 0.92rem; color: var(--secondary); font-weight: 500; }
.ct-form-group { margin-bottom: 16px; }
.ct-form-group label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-light); margin-bottom: 6px; }
.ct-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 560px) { .ct-form-row { grid-template-columns: 1fr; } }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-contact-css")) {
    const s = document.createElement("style");
    s.id = "nahid-contact-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function Contact() {
  injectCSS();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const recaptcha_token = await getRecaptchaToken("contact");
      await contactApi.submit({ ...form, recaptcha_token: recaptcha_token || undefined });
      Swal.fire({ icon: "success", title: t("contactPage.successTitle"), text: t("contactPage.successText"), confirmButtonColor: "#EF776A" });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      Swal.fire({ icon: "error", title: t("contactPage.errorTitle"), text: err.response?.data?.error || t("contactPage.errorRetry") });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO title={t("contactPage.title")} description={t("contactPage.subtitle")} path="/contact" />
      <div className="ct-page-wrap">
        <h1 className="ct-page-title">{t("contactPage.title")}</h1>
        <p className="ct-page-sub">{t("contactPage.subtitle")}</p>

        <div className="ct-page-grid">
          <div className="ct-info-card">
            <div className="ct-info-row">
              <div className="ct-info-icon"><FiPhone size={17} /></div>
              <div><div className="ct-info-label">{t("contactPage.phoneLabel")}</div><div className="ct-info-value">+212 6 00 00 00 00</div></div>
            </div>
            <div className="ct-info-row">
              <div className="ct-info-icon"><FiMail size={17} /></div>
              <div><div className="ct-info-label">{t("contactPage.emailLabel")}</div><div className="ct-info-value">contact@nahidperfumes.com</div></div>
            </div>
            <div className="ct-info-row">
              <div className="ct-info-icon"><FiMapPin size={17} /></div>
              <div><div className="ct-info-label">{t("contactPage.deliveryLabel")}</div><div className="ct-info-value">{t("contactPage.deliveryValue")}</div></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="ct-form-row">
              <div className="ct-form-group"><label>{t("contactPage.fullName")} *</label><input className="form-input" required value={form.name} onChange={set("name")} /></div>
              <div className="ct-form-group"><label>{t("contactPage.phone")}</label><input className="form-input" value={form.phone} onChange={set("phone")} /></div>
            </div>
            <div className="ct-form-group"><label>{t("contactPage.email")}</label><input className="form-input" type="email" value={form.email} onChange={set("email")} /></div>
            <div className="ct-form-group"><label>{t("contactPage.subject")}</label><input className="form-input" value={form.subject} onChange={set("subject")} /></div>
            <div className="ct-form-group"><label>{t("contactPage.message")} *</label><textarea className="form-input" rows={5} required value={form.message} onChange={set("message")} /></div>
            <button type="submit" className="btn-primary" disabled={sending}>
              <FiSend size={14} /> {sending ? t("contactPage.sending") : t("contactPage.submitBtn")}
            </button>
          </form>
        </div>
      </div>
      <NahidFooter />
    </>
  );
}
