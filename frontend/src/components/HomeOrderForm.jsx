import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiCheck, FiShoppingBag, FiTruck } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import { NO_IMAGE_PLACEHOLDER } from "../utils/placeholderImage";
import { cartToOrderItems } from "../context/CartContext";
import { ordersApi, getDeviceToken } from "../services/api";
import { isValidMoroccanPhone } from "../utils/validation";
import { getRecaptchaToken } from "../utils/recaptcha";
import { SHIPPING_FEE } from "../utils/pricing";
import { buildPackContentDetail } from "../utils/packContent";
import { getStockLevel } from "../utils/packStock";

// Major Moroccan delivery cities, common e-commerce list — "Autre" reveals
// a free-text field so any city is still accepted.
const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Fès", "Marrakech", "Tanger", "Agadir", "Meknès",
  "Oujda", "Kénitra", "Tétouan", "Salé", "Nador", "Mohammedia", "El Jadida",
  "Béni Mellal", "Khouribga", "Settat", "Larache", "Khemisset", "Guelmim",
  "Berrechid", "Taza", "Essaouira", "Ifrane", "Laâyoune",
];

const CSS = `
.hof-wrap { max-width: var(--container-max); margin: 0 auto; padding: 0 32px; scroll-margin-top: 90px; }
.hof-card { background: white; border: 1px solid var(--border-light); border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); overflow: hidden; }
.hof-grid { display: grid; grid-template-columns: 380px 1fr; }
@media (max-width: 860px) { .hof-grid { grid-template-columns: 1fr; } }
.hof-head { text-align: center; margin-bottom: 28px; }
.hof-head h2 { font-family: var(--font-display); font-size: clamp(1.7rem, 3vw, 2.3rem); font-weight: 500; }
.hof-head p { color: var(--text-light); margin-top: 6px; }

.hof-pack { background: var(--background); padding: 28px 26px; display: flex; flex-direction: column; }
.hof-pack-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary); margin-bottom: 14px; }
.hof-pack-select { margin-bottom: 16px; }
.hof-pack-media { border-radius: var(--radius-lg); overflow: hidden; aspect-ratio: 970 / 1600; max-height: 340px; background: var(--white); margin-bottom: 16px; }
.hof-pack-media img { width: 100%; height: 100%; object-fit: contain; object-position: center; display: block; }
.hof-pack-title { font-family: var(--font-display); font-size: 1.3rem; font-weight: 500; margin-bottom: 12px; }
.hof-contains-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-light); margin-bottom: 2px; }
.hof-contains-detail { font-size: 0.76rem; color: var(--text); margin-bottom: 10px; }
.hof-perfume-list { list-style: none; margin: 0 0 16px; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.hof-perfume-list li { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text); }
.hof-perfume-check { width: 18px; height: 18px; border-radius: 50%; background: var(--primary-light); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.hof-pack-price-row { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-light); display: flex; align-items: baseline; gap: 8px; }
.hof-pack-price { font-family: var(--font-display); font-size: 1.7rem; font-weight: 600; color: var(--primary-dark); }
.hof-pack-compare { font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through; }
.hof-empty { padding: 60px 26px; text-align: center; color: var(--text-light); }

.hof-form { padding: 28px 30px 30px; }
.hof-form h3 { font-family: var(--font-display); font-size: 1.1rem; font-weight: 500; margin-bottom: 18px; }
.hof-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
@media (max-width: 560px) { .hof-row { grid-template-columns: 1fr; } }
.hof-label { font-size: 0.75rem; font-weight: 600; color: var(--text-light); margin-bottom: 6px; display: block; }
.hof-error { font-size: 0.7rem; color: var(--error); margin-top: 4px; }
.hof-totals { display: flex; flex-direction: column; justify-content: center; gap: 4px; }
.hof-totals-row { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-light); }
.hof-totals-total { font-weight: 700; color: var(--text); font-size: 0.86rem; padding-top: 4px; border-top: 1px solid var(--border-light); }
.hof-submit { width: 100%; margin-top: 8px; padding: 16px; font-size: 0.95rem; }
.hof-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.hof-stock-note { font-size: 0.78rem; font-weight: 600; text-align: center; margin-top: 4px; }
.hof-stock-low { color: var(--primary-dark); }
.hof-stock-out { color: var(--error, #C62828); }
.hof-cod-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 12px; font-size: 0.76rem; color: var(--text-light); }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-home-order-form-css")) {
    const s = document.createElement("style");
    s.id = "nahid-home-order-form-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

const HomeOrderForm = forwardRef(function HomeOrderForm({ pack, packs = [], onSelectPack }, ref) {
  injectCSS();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", city: "", cityOther: "", address: "", quantity: 1 });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const quantity = Math.max(1, Math.min(10, Number(form.quantity) || 1));
  const packContentDetail = pack ? buildPackContentDetail(pack.perfumes, lang) : null;
  const stockLevel = pack ? getStockLevel(pack.stock_quantity) : "in";
  const outOfStock = stockLevel === "out";
  const subtotal = pack ? Number(pack.price) * quantity : 0;
  const shipping = pack ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t("checkout.fullNameError");
    if (!isValidMoroccanPhone(form.phone)) e.phone = t("checkout.phoneError");
    const effectiveCity = form.city === "__other__" ? form.cityOther : form.city;
    if (!effectiveCity.trim()) e.city = t("checkout.cityError");
    if (!form.address.trim()) e.address = t("checkout.addressError");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pack || outOfStock || !validate()) return;
    setSubmitting(true);
    try {
      const buyNowItem = {
        cartItemId: `ready_${pack.id}_buynow_${Date.now()}`,
        item_type: "ready_pack",
        pack_id: pack.id,
        quantity,
      };
      const recaptchaToken = await getRecaptchaToken("checkout");
      const effectiveCity = form.city === "__other__" ? form.cityOther : form.city;
      const order = await ordersApi.create({
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: effectiveCity.trim(),
          deviceToken: getDeviceToken(),
        },
        items: cartToOrderItems([buyNowItem]),
        recaptcha_token: recaptchaToken || undefined,
      });
      Swal.fire({
        icon: "success",
        title: t("directOrder.successTitle"),
        text: t("directOrder.successText"),
        timer: 1600,
        showConfirmButton: false,
      });
      navigate("/thank-you", { state: { order } });
    } catch (err) {
      // The backend re-checks stock atomically at order-creation time
      // regardless of what this form's own display shows -- a code of
      // OUT_OF_STOCK means the pack sold out between page load and
      // submit, so the raw backend string (English, not translated) is
      // replaced with the proper bilingual message instead of shown as-is.
      const code = err.response?.data?.details?.code;
      const text = code === "OUT_OF_STOCK"
        ? t("packStock.outOfStockError")
        : err.response?.data?.error || t("checkout.errorRetry");
      Swal.fire({ icon: "error", title: t("checkout.errorTitle"), text });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hof-wrap" ref={ref}>
      <div className="hof-head">
        <h2>{t("directOrder.title")}</h2>
        <p>{t("directOrder.subtitle")}</p>
      </div>
      <div className="hof-card">
        <div className="hof-grid">
          <div className="hof-pack">
            <span className="hof-pack-label">{t("directOrder.yourPack")}</span>
            {packs.length > 0 && (
              <select
                className="form-input hof-pack-select"
                value={pack?.id || ""}
                onChange={(e) => onSelectPack?.(packs.find((p) => String(p.id) === e.target.value) || null)}
              >
                <option value="" disabled>{t("directOrder.choosePackLabel")}</option>
                {packs.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            )}
            {!pack ? (
              <div className="hof-empty">{t("directOrder.noPackPrompt")}</div>
            ) : (
              <>
                <div className="hof-pack-media">
                  <img src={cldResize(pack.cover_image, 500) || NO_IMAGE_PLACEHOLDER} alt={pack.title} loading="lazy" />
                </div>
                <h3 className="hof-pack-title">{pack.title}</h3>
                {(pack.perfumes || []).length > 0 && (
                  <>
                    <div className="hof-contains-label">{t("packDetails.containsFour")}</div>
                    {packContentDetail && <div className="hof-contains-detail">{packContentDetail}</div>}
                    <ul className="hof-perfume-list">
                      {pack.perfumes.slice(0, 4).map((p) => (
                        <li key={p.perfume_id || p.id}>
                          <span className="hof-perfume-check"><FiCheck size={11} /></span>
                          {p.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <div className="hof-pack-price-row">
                  <span className="hof-pack-price">{Math.round(Number(pack.price)).toLocaleString("fr-MA")} MAD</span>
                  {pack.compare_at_price && Number(pack.compare_at_price) > Number(pack.price) && (
                    <span className="hof-pack-compare">{Math.round(Number(pack.compare_at_price)).toLocaleString("fr-MA")} MAD</span>
                  )}
                </div>
              </>
            )}
          </div>

          <form className="hof-form" onSubmit={handleSubmit} noValidate>
            <h3>{t("directOrder.formTitle")}</h3>
            <div className="hof-row">
              <div>
                <label className="hof-label">{t("checkout.fullName")} *</label>
                <input className="form-input" value={form.name} onChange={set("name")} disabled={!pack} />
                {errors.name && <div className="hof-error">{errors.name}</div>}
              </div>
              <div>
                <label className="hof-label">{t("checkout.phone")} *</label>
                <input className="form-input" value={form.phone} onChange={set("phone")} placeholder={t("checkout.phonePlaceholder")} disabled={!pack} />
                {errors.phone && <div className="hof-error">{errors.phone}</div>}
              </div>
            </div>
            <div className="hof-row">
              <div>
                <label className="hof-label">{t("checkout.city")} *</label>
                <select className="form-input" value={form.city} onChange={set("city")} disabled={!pack}>
                  <option value="">{t("directOrder.cityPlaceholder")}</option>
                  {MOROCCAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="__other__">{t("directOrder.cityOther")}</option>
                </select>
                {errors.city && <div className="hof-error">{errors.city}</div>}
              </div>
              <div>
                <label className="hof-label">{t("checkout.address")} *</label>
                <input className="form-input" value={form.address} onChange={set("address")} disabled={!pack} />
                {errors.address && <div className="hof-error">{errors.address}</div>}
              </div>
            </div>
            {form.city === "__other__" && (
              <div className="hof-row" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <label className="hof-label">{t("directOrder.cityOtherPlaceholder")} *</label>
                  <input className="form-input" value={form.cityOther} onChange={set("cityOther")} placeholder={t("directOrder.cityOtherPlaceholder")} disabled={!pack} />
                </div>
              </div>
            )}
            <div className="hof-row">
              <div>
                <label className="hof-label">{t("directOrder.quantityLabel")}</label>
                <input
                  type="number" min={1} max={10} className="form-input"
                  value={form.quantity} onChange={set("quantity")} disabled={!pack}
                />
              </div>
              {pack && (
                <div className="hof-totals">
                  <div className="hof-totals-row"><span>{t("checkout.subtotal")}</span><span>{Math.round(subtotal).toLocaleString("fr-MA")} MAD</span></div>
                  <div className="hof-totals-row"><span>{t("checkout.shipping")}</span><span>{shipping > 0 ? `${Math.round(shipping).toLocaleString("fr-MA")} MAD` : t("cart.free")}</span></div>
                  <div className="hof-totals-row hof-totals-total"><span>{t("checkout.total")}</span><span>{Math.round(total).toLocaleString("fr-MA")} MAD</span></div>
                </div>
              )}
            </div>
            {stockLevel === "low" && (
              <p className="hof-stock-note hof-stock-low">
                {t("packStock.lowStockPrefix")} {pack.stock_quantity} {t("packStock.lowStockSuffix")}
              </p>
            )}
            {outOfStock && <p className="hof-stock-note hof-stock-out">{t("packStock.outOfStockError")}</p>}
            <button type="submit" className="btn-primary hof-submit" disabled={!pack || outOfStock || submitting}>
              <FiShoppingBag size={16} style={{ marginInlineEnd: "8px" }} />
              {outOfStock ? t("packStock.outOfStock") : submitting ? t("checkout.submitting") : t("directOrder.confirmBtn")}
            </button>
            <p className="hof-cod-note"><FiTruck size={13} /> {t("checkout.codTitle")}</p>
          </form>
        </div>
      </div>
    </div>
  );
});

export default HomeOrderForm;
