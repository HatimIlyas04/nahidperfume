import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiCheck, FiPlus, FiArrowRight, FiTruck } from "react-icons/fi";
import { packsApi, ordersApi } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import { NO_IMAGE_PLACEHOLDER } from "../utils/placeholderImage";
import { DEFAULT_UPSELL_PRICE } from "../utils/pricing";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.ty-wrap { max-width: 720px; margin: 0 auto; padding: 70px 32px 100px; text-align: center; }
.ty-icon { width: 76px; height: 76px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; animation: fadeUp 0.6s ease both; }
.ty-wrap h1 { font-family: var(--font-display); font-size: 2.1rem; font-weight: 500; margin-bottom: 10px; }
.ty-wrap p { color: var(--text-light); }
.ty-order-num { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; color: var(--primary); margin: 16px 0; }
.ty-total { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 40px; }

.ty-summary { background: var(--background); border-radius: var(--radius-lg); padding: 20px 22px; margin: 0 auto 12px; text-align: start; max-width: 420px; }
.ty-summary-row { display: flex; justify-content: space-between; gap: 12px; font-size: 0.83rem; color: var(--text-light); padding: 5px 0; }
.ty-summary-row strong { color: var(--text); font-weight: 600; }
.ty-summary-total { font-weight: 700; }
.ty-summary-total strong { color: var(--primary-dark); font-family: var(--font-display); font-size: 1.05rem; }
.ty-summary-divider { border-top: 1px solid var(--border-light); margin: 8px 0; }

.ty-upsell-section { margin-top: 20px; text-align: start; }
.ty-upsell-head { text-align: center; margin-bottom: 20px; }
.ty-upsell-head h2 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 500; margin-bottom: 6px; }
.ty-upsell-head p { color: var(--text-light); font-size: 0.9rem; }

.ty-upsell-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
.ty-upsell-card { background: white; border: 1.5px solid var(--border-light); border-radius: var(--radius-xl); padding: 20px; box-shadow: var(--shadow-sm); position: relative; overflow: hidden; animation: fadeUp 0.5s ease both; }
.ty-upsell-badge { position: absolute; top: 0; inset-inline-end: 0; background: var(--primary); color: white; font-size: 0.6rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 14px; border-end-start-radius: 12px; }
.ty-upsell-img { width: 100%; aspect-ratio: 970 / 1600; border-radius: var(--radius-md); object-fit: contain; object-position: center; background: var(--gray-100); margin-bottom: 12px; }
.ty-upsell-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 500; margin-bottom: 6px; }
.ty-upsell-perfumes { font-size: 0.76rem; color: var(--text-light); margin-bottom: 10px; line-height: 1.5; }
.ty-upsell-price { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
.ty-upsell-price-new { font-family: var(--font-display); font-size: 1.3rem; font-weight: 600; color: var(--primary); }
.ty-upsell-price-old { font-size: 0.82rem; color: var(--text-muted); text-decoration: line-through; }
.ty-upsell-delivery { display: flex; align-items: center; gap: 5px; font-size: 0.74rem; color: var(--text-light); margin-bottom: 14px; }
.ty-upsell-accept { width: 100%; padding: 12px; border-radius: var(--radius-full); border: none; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center; gap: 6px; background: var(--primary); color: white; }
.ty-upsell-accept:hover:not(:disabled) { background: var(--primary-dark); }
.ty-upsell-accept:disabled { opacity: 0.6; cursor: default; }
.ty-upsell-accepted { text-align: center; padding: 20px; color: var(--primary-dark); font-weight: 600; font-size: 0.85rem; }

.ty-upsell-decline-row { text-align: center; margin-top: 18px; }
.ty-upsell-decline { background: none; border: none; color: var(--text-light); font-size: 0.82rem; text-decoration: underline; cursor: pointer; }

.ty-continue-arrow { transition: transform 0.15s; }
[dir="rtl"] .ty-continue-arrow { transform: scaleX(-1); }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-thankyou-css")) {
    const s = document.createElement("style");
    s.id = "nahid-thankyou-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function ThankYou() {
  injectCSS();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [order, setOrder] = useState(location.state?.order || null);
  const [offers, setOffers] = useState([]);
  const [applyingId, setApplyingId] = useState(null);
  const [acceptedIds, setAcceptedIds] = useState(() => new Set());
  const [declinedAll, setDeclinedAll] = useState(false);

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
      return;
    }
    packsApi.getUpsellOffers().then(setOffers).catch(() => setOffers([]));
  }, [order, navigate]);

  if (!order) return null;

  const handleAccept = async (offer) => {
    setApplyingId(offer.id);
    try {
      const updated = await ordersApi.applyUpsell(order.id, order.upsell_token, offer.id);
      // Merge, don't replace: the upsell endpoint returns the fresh order
      // row (total, upsell_applied_at, etc.) but not the items summary
      // createOrder attached client-side -- replacing wholesale would blank
      // out the order summary card right after a successful upsell.
      setOrder((prev) => ({ ...prev, ...updated }));
      setAcceptedIds((prev) => new Set(prev).add(offer.id));
      Swal.fire({ icon: "success", title: t("thankYou.upsellSuccessTitle"), timer: 1800, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: t("thankYou.upsellErrorTitle"), text: err.response?.data?.error || t("thankYou.upsellErrorText") });
    } finally {
      setApplyingId(null);
    }
  };

  const visibleOffers = offers.filter((o) => !acceptedIds.has(o.id));
  const showUpsell = offers.length > 0 && !declinedAll && (visibleOffers.length > 0 || acceptedIds.size > 0);

  return (
    <>
      <SEO title={t("thankYou.title")} noindex path="/thank-you" />
      <div className="ty-wrap">
        <div className="ty-icon"><FiCheck size={36} /></div>
        <h1>{t("thankYou.title")}</h1>
        <p>{t("thankYou.subtitle")}</p>
        <div className="ty-order-num">{order.order_number}</div>

        <div className="ty-summary">
          {(order.items || []).map((item, i) => (
            <div className="ty-summary-row" key={i}>
              <span>{item.title}{item.quantity > 1 ? ` × ${item.quantity}` : ""}</span>
              <strong>{Math.round(item.price * item.quantity)} MAD</strong>
            </div>
          ))}
          <div className="ty-summary-row">
            <span>{t("checkout.shipping")}</span>
            <strong>{Number(order.shipping_amount) > 0 ? `${Math.round(order.shipping_amount)} MAD` : t("cart.free")}</strong>
          </div>
          <div className="ty-summary-row ty-summary-total"><span>{t("thankYou.totalLabel")}</span><strong>{Math.round(order.total_amount)} MAD</strong></div>
          <div className="ty-summary-divider" />
          <div className="ty-summary-row"><span>{t("checkout.fullName")}</span><span>{order.customer_name}</span></div>
          <div className="ty-summary-row"><span>{t("checkout.phone")}</span><span>{order.customer_phone}</span></div>
          {order.customer_city && <div className="ty-summary-row"><span>{t("checkout.city")}</span><span>{order.customer_city}</span></div>}
        </div>
        <p className="ty-total">{t("thankYou.codLabel")}</p>

        {showUpsell && (
          <div className="ty-upsell-section">
            <div className="ty-upsell-head">
              <h2>{t("thankYou.upsellSectionTitle")}</h2>
              <p>{t("thankYou.upsellSectionSubtitle")}</p>
            </div>

            <div className="ty-upsell-grid">
              {offers.map((offer) => {
                const upsellPrice = offer.upsell_price !== null ? Number(offer.upsell_price) : DEFAULT_UPSELL_PRICE;
                const accepted = acceptedIds.has(offer.id);
                if (accepted) {
                  return (
                    <div className="ty-upsell-card" key={offer.id}>
                      <div className="ty-upsell-accepted"><FiCheck size={16} style={{ verticalAlign: "middle", marginInlineEnd: "6px" }} />{offer.title}</div>
                    </div>
                  );
                }
                return (
                  <div className="ty-upsell-card" key={offer.id}>
                    <span className="ty-upsell-badge">{t("thankYou.upsellBadge")}</span>
                    <img className="ty-upsell-img" src={cldResize(offer.cover_image, 300) || NO_IMAGE_PLACEHOLDER} alt={offer.title} loading="lazy" />
                    <div className="ty-upsell-title">{offer.title}</div>
                    {(offer.perfumes || []).length > 0 && (
                      <div className="ty-upsell-perfumes">{offer.perfumes.map((p) => p.name).join(" · ")}</div>
                    )}
                    <div className="ty-upsell-price">
                      <span className="ty-upsell-price-new">{Math.round(upsellPrice)} MAD</span>
                      {Number(offer.price) > upsellPrice && <span className="ty-upsell-price-old">{Math.round(offer.price)} MAD</span>}
                    </div>
                    <div className="ty-upsell-delivery"><FiTruck size={12} /> {t("thankYou.upsellFreeDelivery")}</div>
                    <button
                      className="ty-upsell-accept"
                      onClick={() => handleAccept(offer)}
                      disabled={applyingId !== null}
                    >
                      <FiPlus size={14} />
                      {applyingId === offer.id ? t("thankYou.upsellAdding") : `${t("thankYou.upsellAccept")} ${Math.round(upsellPrice)} MAD`}
                    </button>
                  </div>
                );
              })}
            </div>

            {visibleOffers.length > 0 && (
              <div className="ty-upsell-decline-row">
                <button className="ty-upsell-decline" onClick={() => setDeclinedAll(true)}>{t("thankYou.upsellDecline")}</button>
              </div>
            )}
          </div>
        )}

        <Link to="/packs" className="btn-outline" style={{ marginTop: "32px", display: "inline-flex" }}>
          {t("thankYou.continueBtn")} <FiArrowRight size={14} className="ty-continue-arrow" />
        </Link>
      </div>
      <NahidFooter />
    </>
  );
}
