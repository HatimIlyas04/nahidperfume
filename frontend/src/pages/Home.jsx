import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FiArrowRight, FiPackage, FiSliders, FiTruck, FiShield, FiHeart,
  FiMail, FiCheckCircle, FiPlay,
} from "react-icons/fi";
import { packsApi, faqApi, bannersApi, wishlistApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import PackCard from "../components/PackCard";
import ReviewsSection from "../components/ReviewsSection";
import TrustBadges from "../components/TrustBadges";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.home-top-eyebrow {
  max-width: var(--container-max); margin: 0 auto; padding: 40px 32px 8px; text-align: center;
}
.home-top-eyebrow span {
  display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px;
  border-radius: var(--radius-full); background: var(--primary-light); color: var(--primary);
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
}
.home-top-title {
  font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 500;
  text-align: center; margin: 14px 0 6px;
}
.home-top-sub { text-align: center; color: var(--text-light); max-width: 560px; margin: 0 auto 36px; }

.home-section { padding: var(--section-gap) 0; }
.home-section-head { max-width: var(--container-max); margin: 0 auto 40px; padding: 0 32px; display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; }
.home-section-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--primary); }
.home-section-title { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 500; margin-top: 8px; }
.home-section-sub { color: var(--text-light); margin-top: 8px; max-width: 480px; }
/* Same controlled 3/2/1 grid as the packs listing page — a fixed column
   count keeps cards a consistent, premium size instead of stretching. */
.home-packs-grid { max-width: var(--container-max); margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
@media (max-width: 1024px) {
  .home-packs-grid { grid-template-columns: repeat(2, 1fr); gap: 22px; }
}
@media (max-width: 640px) {
  .home-packs-grid { grid-template-columns: 1fr; gap: 18px; padding: 0 16px; }
}
.home-pack-skel { border-radius: var(--radius-xl); background: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%); background-size: 200% 100%; animation: home-skel 1.4s infinite; aspect-ratio: 4/6.2; }
@keyframes home-skel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.home-cta-band {
  background: linear-gradient(135deg, var(--secondary) 0%, #2a2a2a 100%);
  border-radius: var(--radius-xl); max-width: var(--container-max); margin: 0 auto; padding: 64px 48px;
  display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; color: white; position: relative; overflow: hidden;
}
.home-cta-band::before { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(239,119,106,0.18), transparent 70%); top: -150px; right: -100px; }
.home-cta-band-text h2 { font-family: var(--font-display); font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 500; margin-bottom: 10px; color: white; }
.home-cta-band-text p { color: rgba(255,255,255,0.7); max-width: 420px; }
.home-cta-band-btn {
  background: var(--primary); color: white; padding: 16px 32px; border-radius: var(--radius-full);
  font-weight: 600; display: inline-flex; align-items: center; gap: 10px; white-space: nowrap; transition: var(--transition); position: relative; z-index: 1;
}
.home-cta-band-btn:hover { background: var(--primary-dark); transform: translateY(-2px); }

.home-why { background: var(--background); }
.home-why-grid { max-width: var(--container-max); margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
@media (max-width: 900px) { .home-why-grid { grid-template-columns: 1fr; } }
.home-why-card { background: white; border-radius: var(--radius-lg); padding: 32px 26px; box-shadow: var(--shadow-sm); transition: var(--transition); }
.home-why-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
.home-why-icon { width: 48px; height: 48px; border-radius: 14px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.home-why-card h4 { font-size: 1.05rem; font-weight: 600; margin-bottom: 8px; }
.home-why-card p { font-size: 0.86rem; color: var(--text-light); line-height: 1.6; }

.home-faq { max-width: 780px; margin: 0 auto; padding: 0 32px; }
.home-faq-item { border-bottom: 1px solid var(--border-light); }
.home-faq-q { width: 100%; text-align: left; background: none; border: none; padding: 20px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.98rem; font-weight: 600; color: var(--secondary); font-family: var(--font-body); }
.home-faq-a { padding: 0 0 20px; color: var(--text-light); font-size: 0.88rem; line-height: 1.6; max-width: 640px; }
.home-faq-plus { font-size: 1.3rem; color: var(--primary); transition: transform 0.25s; }
.home-faq-item.open .home-faq-plus { transform: rotate(45deg); }
[dir="rtl"] .home-faq-q { text-align: right; }

.home-ugc-grid { max-width: var(--container-max); margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
@media (max-width: 900px) { .home-ugc-grid { grid-template-columns: repeat(3, 1fr); } }
.home-ugc-item { aspect-ratio: 1; border-radius: var(--radius-md); overflow: hidden; position: relative; }
.home-ugc-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.home-ugc-item:hover img { transform: scale(1.1); }
.home-ugc-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.25s; color: white; }
.home-ugc-item:hover .home-ugc-overlay { opacity: 1; }

.home-newsletter { background: var(--primary-light); border-radius: var(--radius-xl); max-width: var(--container-max); margin: var(--section-gap) auto 0; padding: 56px 40px; text-align: center; }
.home-newsletter h3 { font-family: var(--font-display); font-size: 1.8rem; font-weight: 500; margin-bottom: 10px; }
.home-newsletter p { color: var(--text-light); margin-bottom: 24px; }
.home-newsletter-form { display: flex; gap: 10px; max-width: 420px; margin: 0 auto; }
.home-newsletter-form input { flex: 1; }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-home-css")) {
    const s = document.createElement("style");
    s.id = "nahid-home-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

const WHY_ICONS = [
  <FiPackage size={22} key="pkg" />, <FiSliders size={22} key="sli" />, <FiTruck size={22} key="trk" />,
  <FiShield size={22} key="shd" />, <FiHeart size={22} key="hrt" />, <FiCheckCircle size={22} key="chk" />,
];

export default function Home() {
  injectCSS();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [packs, setPacks] = useState([]);
  const [packsLoading, setPacksLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [ugcItems, setUgcItems] = useState([]);
  const [wishedIds, setWishedIds] = useState(() => new Set());

  useEffect(() => {
    packsApi.list().then(setPacks).catch(() => setPacks([])).finally(() => setPacksLoading(false));
    faqApi.listActive().then((data) => setFaqs(data.slice(0, 6))).catch(() => setFaqs([]));
    bannersApi.listActive("ugc_gallery").then(setUgcItems).catch(() => setUgcItems([]));
    wishlistApi.get().then((w) => setWishedIds(new Set(w.packs.map((p) => p.id)))).catch(() => {});
  }, []);

  const bestsellers = packs.slice(0, 8);
  const whyItems = t("home.whyItems");

  const handleToggleWishlist = useCallback(async (pack) => {
    const wished = wishedIds.has(pack.id);
    setWishedIds((prev) => {
      const next = new Set(prev);
      wished ? next.delete(pack.id) : next.add(pack.id);
      return next;
    });
    try {
      if (wished) await wishlistApi.removePack(pack.id);
      else await wishlistApi.addPack(pack.id);
    } catch {
      setWishedIds((prev) => {
        const next = new Set(prev);
        wished ? next.add(pack.id) : next.delete(pack.id);
        return next;
      });
      Swal.fire({ icon: "error", title: t("packDetails.errorTitle"), text: t("packDetails.wishlistError") });
    }
  }, [wishedIds, t]);

  const handleAddToCart = useCallback((pack) => {
    addToCart({
      cartItemId: `ready_${pack.id}`,
      item_type: "ready_pack",
      pack_id: pack.id,
      title: pack.title,
      image: pack.cover_image,
      price: Number(pack.price),
      quantity: 1,
      perfumes: (pack.perfumes || []).map((p) => ({ perfume_id: p.perfume_id, name: p.name, image_url: p.image_url })),
    });
    Swal.fire({ icon: "success", title: t("home.addedToCart"), timer: 1400, showConfirmButton: false });
  }, [addToCart, t]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    Swal.fire({ icon: "success", title: t("home.newsletterSuccessTitle"), text: t("home.newsletterSuccessText"), confirmButtonColor: "#EF776A" });
    setEmail("");
  };

  return (
    <>
      <SEO
        description="Nahid Perfumes crée des packs de 4 parfums curés avec soin. Choisissez un pack prêt-à-offrir ou composez le vôtre sur mesure. Livraison partout au Maroc."
        path="/"
      />

      {/* NO HERO — packs are the first thing visitors see. The countdown now lives in the sticky Navbar announcement bar (site-wide, not just Home). */}
      <div className="home-top-eyebrow">
        <span>{t("home.eyebrow")}</span>
      </div>
      <h1 className="home-top-title">{t("home.title")}</h1>
      <p className="home-top-sub">{t("home.subtitle")}</p>

      {packsLoading ? (
        <section style={{ paddingBottom: "var(--section-gap)" }}>
          <div className="home-packs-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => <div className="home-pack-skel" key={i} />)}
          </div>
        </section>
      ) : bestsellers.length > 0 ? (
        <section style={{ paddingBottom: "var(--section-gap)" }}>
          <div className="home-packs-grid">
            {bestsellers.map((pack, i) => (
              <PackCard
                key={pack.id}
                pack={pack}
                priority={i < 4}
                isWished={wishedIds.has(pack.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          {packs.length > 8 && (
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <Link to="/packs" className="btn-outline">{t("home.viewAll")}</Link>
            </div>
          )}
        </section>
      ) : (
        <section style={{ textAlign: "center", paddingBottom: "var(--section-gap)" }}>
          <p style={{ color: "var(--text-muted)" }}>{t("home.comingSoon")}</p>
        </section>
      )}

      <TrustBadges />

      {/* CREATE YOUR OWN PACK CTA */}
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 32px 0" }}>
        <div className="home-cta-band">
          <div className="home-cta-band-text">
            <h2>{t("home.ctaTitle")}</h2>
            <p>{t("home.ctaText")}</p>
          </div>
          <Link to="/build-your-pack" className="home-cta-band-btn">{t("home.ctaBtn")} <FiArrowRight size={16} /></Link>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="home-section home-why">
        <div className="home-section-head" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
          <span className="home-section-eyebrow">{t("home.whyEyebrow")}</span>
          <h2 className="home-section-title">{t("home.whyTitle")}</h2>
        </div>
        <div className="home-why-grid">
          {Array.isArray(whyItems) && whyItems.map((item, i) => (
            <div className="home-why-card" key={item.title}>
              <div className="home-why-icon">{WHY_ICONS[i]}</div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* UGC / DELIVERY PHOTOS */}
      {ugcItems.length > 0 && (
        <section className="home-section">
          <div className="home-section-head" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <span className="home-section-eyebrow">{t("home.ugcEyebrow")}</span>
            <h2 className="home-section-title">{t("home.ugcTitle")}</h2>
          </div>
          <div className="home-ugc-grid">
            {ugcItems.map((item) => (
              <a className="home-ugc-item" href={item.link_url || "#"} key={item.id} target={item.link_url ? "_blank" : undefined} rel="noreferrer">
                <img src={cldResize(item.image_url, 400)} alt={item.title || "Nahid Perfumes"} loading="lazy" />
                {item.link_url && <div className="home-ugc-overlay"><FiPlay size={22} /></div>}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="home-section">
          <div className="home-section-head" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <span className="home-section-eyebrow">{t("home.faqEyebrow")}</span>
            <h2 className="home-section-title">{t("home.faqTitle")}</h2>
          </div>
          <div className="home-faq">
            {faqs.map((f) => (
              <div className={`home-faq-item${openFaq === f.id ? " open" : ""}`} key={f.id}>
                <button className="home-faq-q" onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}>
                  {f.question}
                  <span className="home-faq-plus">+</span>
                </button>
                {openFaq === f.id && <div className="home-faq-a">{f.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 32px" }}>
        <div className="home-newsletter">
          <h3>{t("home.newsletterTitle")}</h3>
          <p>{t("home.newsletterText")}</p>
          <form className="home-newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email" required placeholder={t("home.newsletterPlaceholder")} className="form-input"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-primary"><FiMail size={15} /></button>
          </form>
        </div>
      </div>

      <NahidFooter />
    </>
  );
}
