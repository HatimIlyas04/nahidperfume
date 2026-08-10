import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiTruck, FiCreditCard, FiShield } from "react-icons/fi";
import { useCart, cartToOrderItems } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { ordersApi, getDeviceToken } from "../services/api";
import { isValidMoroccanPhone } from "../utils/validation";
import { getRecaptchaToken } from "../utils/recaptcha";
import NahidFooter from "../components/NahidFooter";

const CSS = `
.co-wrap { max-width: 1100px; margin: 0 auto; padding: 48px 32px 100px; }
.co-title { font-family: var(--font-display); font-size: 2.2rem; font-weight: 500; margin-bottom: 32px; }
.co-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: flex-start; }
@media (max-width: 900px) { .co-grid { grid-template-columns: 1fr; } }
.co-card { background: white; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 26px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
.co-card h3 { font-family: var(--font-display); font-size: 1.15rem; font-weight: 500; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.co-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.co-form-row.full { grid-template-columns: 1fr; }
@media (max-width: 560px) { .co-form-row { grid-template-columns: 1fr; } }
.co-label { font-size: 0.75rem; font-weight: 600; color: var(--text-light); margin-bottom: 6px; display: block; }
.co-error { font-size: 0.7rem; color: var(--error); margin-top: 4px; }
.co-cod-block { display: flex; align-items: center; gap: 14px; padding: 16px 18px; background: var(--primary-light); border-radius: var(--radius-md); }
.co-trust-row { display: flex; gap: 16px; margin-top: 16px; flex-wrap: wrap; }
.co-trust-item { display: flex; align-items: center; gap: 6px; font-size: 0.72rem; color: var(--text-light); }
.co-summary { background: var(--background); border-radius: var(--radius-lg); padding: 26px; position: sticky; top: 90px; }
.co-summary h3 { font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 16px; }
.co-summary-item { display: flex; justify-content: space-between; gap: 10px; font-size: 0.82rem; margin-bottom: 10px; color: var(--text-light); }
.co-summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.86rem; }
.co-total-row { display: flex; justify-content: space-between; align-items: baseline; padding-top: 14px; border-top: 1px solid var(--border); margin-top: 8px; }
.co-total-val { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; }
.co-confirm { text-align: center; padding: 100px 20px; }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-checkout-v3-css")) {
    const s = document.createElement("style");
    s.id = "nahid-checkout-v3-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function Checkout() {
  injectCSS();
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, subtotal: cartSubtotal, clearCart } = useCart();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const couponCode = location.state?.couponCode;

  // "Commander" on a pack card skips the cart page entirely and lands here
  // with a single item in router state -- an isolated one-item order that
  // doesn't touch (or get mixed into) whatever is already in the persisted
  // cart, and isn't cleared from it on submit either.
  const buyNowItem = location.state?.buyNowItem;
  const effectiveCart = buyNowItem ? [buyNowItem] : cart;
  const subtotal = buyNowItem ? buyNowItem.price * buyNowItem.quantity : cartSubtotal;

  // Pack prices are all-inclusive -- delivery is free, not a fee added at
  // checkout. Matches backend orderService.computeShipping, which reads the
  // same policy from the settings table (shipping_flat_rate).
  const SHIPPING_FLAT = 0;
  const shipping = effectiveCart.length === 0 ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t("checkout.fullNameError");
    if (!isValidMoroccanPhone(form.phone)) e.phone = t("checkout.phoneError");
    if (!form.city.trim()) e.city = t("checkout.cityError");
    if (!form.address.trim()) e.address = t("checkout.addressError");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const recaptchaToken = await getRecaptchaToken("checkout");
      const order = await ordersApi.create({
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.notes.trim() ? `${form.address.trim()} — Note: ${form.notes.trim()}` : form.address.trim(),
          city: form.city.trim(),
          deviceToken: getDeviceToken(),
        },
        items: cartToOrderItems(effectiveCart),
        coupon_code: couponCode || undefined,
        recaptcha_token: recaptchaToken || undefined,
      });
      if (!buyNowItem) clearCart();
      navigate("/thank-you", { state: { order } });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: t("checkout.errorTitle"),
        text: err.response?.data?.error || t("checkout.errorRetry"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (effectiveCart.length === 0) {
    return (
      <>
        <div className="co-confirm">
          <h2>{t("checkout.emptyCartTitle")}</h2>
          <Link to="/packs" className="btn-primary" style={{ marginTop: "16px", display: "inline-flex" }}>{t("checkout.exploreBtn")}</Link>
        </div>
        <NahidFooter />
      </>
    );
  }

  return (
    <>
      <form className="co-wrap" onSubmit={handleSubmit} noValidate>
        <h1 className="co-title">{t("checkout.title")}</h1>
        <div className="co-grid">
          <div>
            <div className="co-card">
              <h3><FiTruck size={17} /> {t("checkout.deliveryTitle")}</h3>
              <div className="co-form-row">
                <div>
                  <label className="co-label">{t("checkout.fullName")} *</label>
                  <input className="form-input" value={form.name} onChange={set("name")} />
                  {errors.name && <div className="co-error">{errors.name}</div>}
                </div>
                <div>
                  <label className="co-label">{t("checkout.phone")} *</label>
                  <input className="form-input" value={form.phone} onChange={set("phone")} placeholder={t("checkout.phonePlaceholder")} />
                  {errors.phone && <div className="co-error">{errors.phone}</div>}
                </div>
              </div>
              <div className="co-form-row">
                <div>
                  <label className="co-label">{t("checkout.city")} *</label>
                  <input className="form-input" value={form.city} onChange={set("city")} />
                  {errors.city && <div className="co-error">{errors.city}</div>}
                </div>
                <div>
                  <label className="co-label">{t("checkout.address")} *</label>
                  <input className="form-input" value={form.address} onChange={set("address")} />
                  {errors.address && <div className="co-error">{errors.address}</div>}
                </div>
              </div>
              <div className="co-form-row full">
                <div>
                  <label className="co-label">{t("checkout.note")}</label>
                  <textarea className="form-input" rows={2} value={form.notes} onChange={set("notes")} placeholder={t("checkout.notePlaceholder")} />
                </div>
              </div>
              <div className="co-trust-row">
                <span className="co-trust-item"><FiShield size={12} /> {t("checkout.trustSecure")}</span>
                <span className="co-trust-item">🚚 {t("checkout.trustDelivery")}</span>
                <span className="co-trust-item">↩︎ {t("checkout.trustRefund")}</span>
              </div>
            </div>

            <div className="co-card">
              <h3><FiCreditCard size={17} /> {t("checkout.paymentTitle")}</h3>
              <div className="co-cod-block">
                <span style={{ fontSize: "1.4rem" }}>💵</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t("checkout.codTitle")}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{t("checkout.codText")}</div>
                </div>
              </div>
            </div>
          </div>

          <aside className="co-summary">
            <h3>{t("checkout.summaryTitle")}</h3>
            {effectiveCart.map((item) => (
              <div className="co-summary-item" key={item.cartItemId}>
                <span>{item.title} × {item.quantity}</span>
                <strong>{Math.round(item.price * item.quantity)} MAD</strong>
              </div>
            ))}
            <div className="co-summary-row"><span>{t("checkout.subtotal")}</span><strong>{Math.round(subtotal)} MAD</strong></div>
            <div className="co-summary-row"><span>{t("checkout.shipping")}</span><strong>{shipping > 0 ? `${shipping} MAD` : t("cart.free")}</strong></div>
            <div className="co-total-row">
              <span style={{ fontWeight: 700 }}>{t("checkout.total")}</span>
              <span className="co-total-val">{Math.round(total)} MAD</span>
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "20px" }} disabled={submitting}>
              {submitting ? t("checkout.submitting") : t("checkout.submitBtn")}
            </button>
          </aside>
        </div>
      </form>
      <NahidFooter />
    </>
  );
}
