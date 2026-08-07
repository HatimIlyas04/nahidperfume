import { useState } from "react";
import { FiSearch, FiCheck, FiPackage, FiTruck, FiHome, FiX } from "react-icons/fi";
import { ordersApi } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.ot-wrap { max-width: 720px; margin: 0 auto; padding: 60px 32px 100px; }
.ot-title { font-family: var(--font-display); font-size: 2rem; font-weight: 500; text-align: center; margin-bottom: 8px; }
.ot-sub { text-align: center; color: var(--text-light); margin-bottom: 36px; }
.ot-form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 40px; }
.ot-form input { flex: 1; min-width: 200px; }
.ot-result { background: white; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); }
.ot-result-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 10px; }
.ot-order-num { font-family: var(--font-display); font-size: 1.4rem; font-weight: 600; }
.ot-timeline { display: flex; justify-content: space-between; position: relative; margin: 30px 0 10px; }
.ot-timeline::before { content: ''; position: absolute; top: 18px; left: 0; right: 0; height: 2px; background: var(--border); }
.ot-tl-step { display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; z-index: 1; flex: 1; }
.ot-tl-dot { width: 36px; height: 36px; border-radius: 50%; background: white; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }
.ot-tl-step.done .ot-tl-dot { background: var(--primary); border-color: var(--primary); color: white; }
.ot-tl-label { font-size: 0.68rem; font-weight: 600; color: var(--text-muted); text-align: center; }
.ot-tl-step.done .ot-tl-label { color: var(--secondary); }
.ot-items { margin-top: 28px; border-top: 1px solid var(--border-light); padding-top: 20px; }
.ot-item-row { display: flex; justify-content: space-between; font-size: 0.85rem; padding: 8px 0; color: var(--text-light); }
.ot-cancelled { text-align: center; padding: 20px; background: #FDECEC; border-radius: var(--radius-md); color: var(--error); font-weight: 600; }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-order-tracking-css")) {
    const s = document.createElement("style");
    s.id = "nahid-order-tracking-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

const STEP_ICONS = [
  { key: "pending", icon: FiCheck },
  { key: "confirmed", icon: FiCheck },
  { key: "preparing", icon: FiPackage },
  { key: "shipping", icon: FiTruck },
  { key: "delivered", icon: FiHome },
];

export default function OrderTracking() {
  injectCSS();
  const { t } = useLanguage();
  const STEPS = STEP_ICONS.map((s) => ({ ...s, label: t(`orderTrackingPage.steps.${s.key}`) }));
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);
    try {
      const result = await ordersApi.track(orderNumber.trim(), phone.trim());
      setOrder(result);
    } catch (err) {
      setError(err.response?.data?.error || t("orderTrackingPage.notFound"));
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order ? STEPS.findIndex((s) => s.key === order.status) : -1;

  return (
    <>
      <SEO
        title={t("orderTrackingPage.title")}
        description={t("orderTrackingPage.subtitle")}
        path="/track-order"
      />
      <div className="ot-wrap">
        <h1 className="ot-title">{t("orderTrackingPage.title")}</h1>
        <p className="ot-sub">{t("orderTrackingPage.subtitle")}</p>

        <form className="ot-form" onSubmit={handleSubmit}>
          <input
            className="form-input" placeholder={t("orderTrackingPage.orderNumberPlaceholder")}
            value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} required
          />
          <input
            className="form-input" placeholder={t("orderTrackingPage.phonePlaceholder")}
            value={phone} onChange={(e) => setPhone(e.target.value)} required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            <FiSearch size={14} /> {loading ? t("orderTrackingPage.searching") : t("orderTrackingPage.submitBtn")}
          </button>
        </form>

        {error && (
          <div className="ot-cancelled" style={{ background: "#FFF3F2" }}>
            <FiX size={16} style={{ marginRight: "6px" }} />{error}
          </div>
        )}

        {order && (
          <div className="ot-result">
            <div className="ot-result-head">
              <span className="ot-order-num">{order.order_number}</span>
              <span className="badge badge-primary">{Math.round(order.total_amount)} MAD</span>
            </div>

            {order.status === "cancelled" ? (
              <div className="ot-cancelled">{t("orderTrackingPage.cancelled")}</div>
            ) : (
              <div className="ot-timeline">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div className={`ot-tl-step${i <= currentStepIndex ? " done" : ""}`} key={step.key}>
                      <div className="ot-tl-dot"><Icon size={15} /></div>
                      <span className="ot-tl-label">{step.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="ot-items">
              {order.items.map((item) => (
                <div className="ot-item-row" key={item.id}>
                  <span>{item.item_name_snapshot} × {item.quantity}</span>
                  <span>{Math.round(item.unit_price * item.quantity)} MAD</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <NahidFooter />
    </>
  );
}
