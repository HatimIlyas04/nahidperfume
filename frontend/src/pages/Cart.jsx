import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import { NO_IMAGE_PLACEHOLDER } from "../utils/placeholderImage";
import { couponsApi } from "../services/api";
import NahidFooter from "../components/NahidFooter";

const CSS = `
.ct-wrap { max-width: 1100px; margin: 0 auto; padding: 48px 32px 100px; }
.ct-title { font-family: var(--font-display); font-size: 2.2rem; font-weight: 500; margin-bottom: 32px; }
.ct-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: flex-start; }
@media (max-width: 900px) { .ct-grid { grid-template-columns: 1fr; } }
.ct-empty { text-align: center; padding: 100px 20px; }
.ct-empty-icon { font-size: 3rem; opacity: 0.3; margin-bottom: 16px; }
.ct-empty h2 { font-family: var(--font-display); font-size: 1.6rem; margin-bottom: 10px; }
.ct-empty p { color: var(--text-muted); margin-bottom: 24px; }

.ct-item { display: grid; grid-template-columns: 96px 1fr auto; gap: 18px; padding: 20px 0; border-bottom: 1px solid var(--border-light); align-items: center; }
.ct-item-img { width: 96px; height: 96px; border-radius: var(--radius-md); overflow: hidden; background: var(--gray-100); }
.ct-item-img img { width: 100%; height: 100%; object-fit: cover; }
.ct-item-info { min-width: 0; }
.ct-item-title { font-family: var(--font-display); font-size: 1.15rem; font-weight: 500; color: var(--secondary); }
.ct-item-type { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--primary); margin: 4px 0 8px; }
.ct-item-perfumes { display: flex; gap: 5px; }
.ct-item-perfumes img { width: 26px; height: 26px; border-radius: 6px; object-fit: cover; border: 1.5px solid white; box-shadow: 0 0 0 1px var(--border-light); margin-inline-start: -8px; }
.ct-item-perfumes img:first-child { margin-inline-start: 0; }
.ct-item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.ct-item-price { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; }
.ct-qty { display: flex; align-items: center; border: 1.5px solid var(--border); border-radius: var(--radius-full); overflow: hidden; }
.ct-qty button { width: 28px; height: 28px; border: none; background: none; cursor: pointer; font-size: 0.95rem; }
.ct-qty span { min-width: 26px; text-align: center; font-size: 0.85rem; font-weight: 600; }
.ct-remove { background: none; border: none; color: var(--error); cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 0.75rem; }

.ct-summary { background: var(--background); border-radius: var(--radius-lg); padding: 28px; position: sticky; top: 90px; }
.ct-summary h3 { font-family: var(--font-display); font-size: 1.3rem; font-weight: 500; margin-bottom: 18px; }
.ct-summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.88rem; color: var(--text-light); }
.ct-summary-row strong { color: var(--secondary); }
.ct-coupon { display: flex; gap: 8px; margin: 18px 0; }
.ct-coupon input { flex: 1; }
.ct-total-row { display: flex; justify-content: space-between; align-items: baseline; padding-top: 14px; border-top: 1px solid var(--border); margin-top: 6px; }
.ct-total-label { font-weight: 700; }
.ct-total-val { font-family: var(--font-display); font-size: 1.6rem; font-weight: 600; }
.ct-checkout-arrow { transition: transform 0.15s; }
[dir="rtl"] .ct-checkout-arrow { transform: scaleX(-1); }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-cart-v2-css")) {
    const s = document.createElement("style");
    s.id = "nahid-cart-v2-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function Cart() {
  injectCSS();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const TYPE_LABEL = {
    ready_pack: t("cart.typeReadyPack"),
    ready_pack_customized: t("cart.typeCustomized"),
    custom_pack: t("cart.typeCustom"),
  };
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Pack prices are all-inclusive -- delivery is free, not a fee added at
  // checkout. Matches backend orderService.computeShipping, which reads the
  // same policy from the settings table (shipping_flat_rate).
  const SHIPPING_FLAT = 0;
  const shipping = cart.length === 0 ? 0 : SHIPPING_FLAT;
  const discount = coupon ? coupon.discount : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const result = await couponsApi.validate(couponCode.trim(), subtotal);
      setCoupon(result);
      Swal.fire({ icon: "success", title: t("cart.couponSuccessTitle"), timer: 1400, showConfirmButton: false });
    } catch (err) {
      setCoupon(null);
      Swal.fire({ icon: "error", title: t("cart.couponErrorTitle"), text: err.response?.data?.error || t("cart.couponErrorText") });
    } finally {
      setCouponLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <div className="ct-empty">
          <div className="ct-empty-icon">🛍️</div>
          <h2>{t("cart.emptyTitle")}</h2>
          <p>{t("cart.emptyText")}</p>
          <Link to="/packs" className="btn-primary">{t("cart.exploreBtn")}</Link>
        </div>
        <NahidFooter />
      </>
    );
  }

  return (
    <>
      <div className="ct-wrap">
        <h1 className="ct-title">{t("cart.title")}</h1>
        <div className="ct-grid">
          <div>
            {cart.map((item) => (
              <div className="ct-item" key={item.cartItemId}>
                <div className="ct-item-img">
                  <img src={cldResize(item.image, 200) || NO_IMAGE_PLACEHOLDER} alt={item.title} loading="lazy" />
                </div>
                <div className="ct-item-info">
                  <div className="ct-item-title">{item.title}</div>
                  <div className="ct-item-type">{TYPE_LABEL[item.item_type]}</div>
                  <div className="ct-item-perfumes">
                    {item.perfumes.map((p, i) => (
                      <img key={i} src={cldResize(p.image_url, 60) || NO_IMAGE_PLACEHOLDER} alt={p.name} title={p.name} loading="lazy" />
                    ))}
                  </div>
                </div>
                <div className="ct-item-right">
                  <div className="ct-item-price">{Math.round(item.price * item.quantity)} MAD</div>
                  <div className="ct-qty">
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                  </div>
                  <button className="ct-remove" onClick={() => removeFromCart(item.cartItemId)}>
                    <FiTrash2 size={13} /> {t("cart.remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="ct-summary">
            <h3>{t("cart.summaryTitle")}</h3>
            <div className="ct-summary-row"><span>{t("cart.subtotal")}</span><strong>{Math.round(subtotal)} MAD</strong></div>
            <div className="ct-summary-row"><span>{t("cart.shipping")}</span><strong>{shipping === 0 ? t("cart.free") : `${shipping} MAD`}</strong></div>
            {coupon && (
              <div className="ct-summary-row" style={{ color: "var(--success)" }}>
                <span>{t("cart.discount")} ({coupon.code})</span><strong>−{Math.round(discount)} MAD</strong>
              </div>
            )}
            <div className="ct-coupon">
              <input
                className="form-input" placeholder={t("cart.couponPlaceholder")}
                value={couponCode} onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="btn-outline" onClick={applyCoupon} disabled={couponLoading}>
                <FiTag size={14} />
              </button>
            </div>
            <div className="ct-total-row">
              <span className="ct-total-label">{t("cart.total")}</span>
              <span className="ct-total-val">{Math.round(total)} MAD</span>
            </div>
            <button
              className="btn-primary" style={{ width: "100%", marginTop: "20px" }}
              onClick={() => navigate("/checkout", { state: { couponCode: coupon?.code } })}
            >
              <FiShoppingBag size={15} /> {t("cart.checkoutBtn")} <FiArrowRight size={14} className="ct-checkout-arrow" />
            </button>
          </aside>
        </div>
      </div>
      <NahidFooter />
    </>
  );
}
