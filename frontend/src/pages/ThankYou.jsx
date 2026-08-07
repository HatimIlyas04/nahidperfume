import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiCheck, FiPlus, FiArrowRight } from "react-icons/fi";
import { packsApi, ordersApi } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.ty-wrap { max-width: 640px; margin: 0 auto; padding: 70px 32px 100px; text-align: center; }
.ty-icon { width: 76px; height: 76px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; animation: fadeUp 0.6s ease both; }
.ty-wrap h1 { font-family: var(--font-display); font-size: 2.1rem; font-weight: 500; margin-bottom: 10px; }
.ty-wrap p { color: var(--text-light); }
.ty-order-num { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; color: var(--primary); margin: 16px 0; }
.ty-total { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 40px; }

.ty-upsell { background: white; border: 2px solid var(--primary); border-radius: var(--radius-xl); padding: 28px; margin-top: 20px; text-align: left; box-shadow: var(--shadow-lg); animation: fadeUp 0.7s ease 0.2s both; position: relative; overflow: hidden; }
.ty-upsell-badge { position: absolute; top: 0; right: 0; background: var(--primary); color: white; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 6px 16px; border-bottom-left-radius: 12px; }
.ty-upsell-inner { display: flex; gap: 18px; align-items: center; }
.ty-upsell-img { width: 84px; height: 84px; border-radius: var(--radius-md); object-fit: cover; background: var(--gray-100); flex-shrink: 0; }
.ty-upsell-title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 500; margin-bottom: 4px; }
.ty-upsell-price { display: flex; align-items: baseline; gap: 8px; margin-top: 6px; }
.ty-upsell-price-new { font-family: var(--font-display); font-size: 1.4rem; font-weight: 600; color: var(--primary); }
.ty-upsell-price-old { font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through; }
.ty-upsell-actions { display: flex; gap: 10px; margin-top: 18px; }
.ty-upsell-btn { flex: 1; padding: 13px; border-radius: var(--radius-full); border: none; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: var(--transition); display: flex; align-items: center; justify-content: center; gap: 6px; }
.ty-upsell-accept { background: var(--primary); color: white; }
.ty-upsell-accept:hover { background: var(--primary-dark); }
.ty-upsell-decline { background: none; border: 1.5px solid var(--border); color: var(--text-light); }
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
  const [offer, setOffer] = useState(null);
  const [applying, setApplying] = useState(false);
  const [resolved, setResolved] = useState(false); // accepted or declined

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
      return;
    }
    packsApi.getUpsellOffer().then(setOffer).catch(() => setOffer(null));
  }, [order, navigate]);

  if (!order) return null;

  const handleAccept = async () => {
    setApplying(true);
    try {
      const updated = await ordersApi.applyUpsell(order.id, order.upsell_token);
      setOrder(updated);
      setResolved(true);
      Swal.fire({ icon: "success", title: t("thankYou.upsellSuccessTitle"), timer: 1800, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: t("thankYou.upsellErrorTitle"), text: err.response?.data?.error || t("thankYou.upsellErrorText") });
    } finally {
      setApplying(false);
    }
  };

  const upsellPrice = offer ? (offer.upsell_price !== null ? Number(offer.upsell_price) : Number(offer.price)) : 0;

  return (
    <>
      <SEO title={t("thankYou.title")} noindex path="/thank-you" />
      <div className="ty-wrap">
        <div className="ty-icon"><FiCheck size={36} /></div>
        <h1>{t("thankYou.title")}</h1>
        <p>{t("thankYou.subtitle")}</p>
        <div className="ty-order-num">{order.order_number}</div>
        <p className="ty-total">{t("thankYou.totalLabel")} : {Math.round(order.total_amount)} MAD · {t("thankYou.codLabel")}</p>

        {offer && !resolved && (
          <div className="ty-upsell">
            <span className="ty-upsell-badge">{t("thankYou.upsellBadge")}</span>
            <div className="ty-upsell-inner">
              <img className="ty-upsell-img" src={offer.cover_image || "/nahid1.png"} alt={offer.title} />
              <div>
                <div className="ty-upsell-title">{t("thankYou.upsellAddTitle")} {offer.title}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{t("thankYou.upsellOnly")}</div>
                <div className="ty-upsell-price">
                  <span className="ty-upsell-price-new">{Math.round(upsellPrice)} MAD</span>
                  {Number(offer.price) > upsellPrice && <span className="ty-upsell-price-old">{Math.round(offer.price)} MAD</span>}
                </div>
              </div>
            </div>
            <div className="ty-upsell-actions">
              <button className="ty-upsell-btn ty-upsell-decline" onClick={() => setResolved(true)}>{t("thankYou.upsellDecline")}</button>
              <button className="ty-upsell-btn ty-upsell-accept" onClick={handleAccept} disabled={applying}>
                <FiPlus size={14} /> {applying ? t("thankYou.upsellAdding") : `${t("thankYou.upsellAccept")} ${Math.round(upsellPrice)} MAD`}
              </button>
            </div>
          </div>
        )}

        <Link to="/packs" className="btn-outline" style={{ marginTop: "32px", display: "inline-flex" }}>
          {t("thankYou.continueBtn")} <FiArrowRight size={14} />
        </Link>
      </div>
      <NahidFooter />
    </>
  );
}
