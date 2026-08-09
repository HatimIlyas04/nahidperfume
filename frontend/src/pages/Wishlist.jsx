import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiHeart, FiX, FiShoppingBag } from "react-icons/fi";
import { wishlistApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import PerfumeModal from "../components/PerfumeModal";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.wl-wrap { max-width: var(--container-max); margin: 0 auto; padding: 48px 32px 100px; }
.wl-title { font-family: var(--font-display); font-size: 2.2rem; font-weight: 500; margin-bottom: 8px; }
.wl-sub { color: var(--text-light); margin-bottom: 36px; }
.wl-section-title { font-size: 1rem; font-weight: 700; color: var(--secondary); margin: 32px 0 16px; text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.78rem; }
.wl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 18px; }
.wl-card { border-radius: var(--radius-lg); border: 1px solid var(--border-light); overflow: hidden; background: white; position: relative; transition: var(--transition); }
.wl-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.wl-card-img { aspect-ratio: 1; background: var(--gray-100); cursor: pointer; }
.wl-card-img img { width: 100%; height: 100%; object-fit: cover; }
.wl-card-body { padding: 12px 14px; }
.wl-card-name { font-size: 0.88rem; font-weight: 600; color: var(--secondary); }
.wl-card-remove { position: absolute; top: 8px; inset-inline-end: 8px; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.92); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.wl-card-cta { width: 100%; margin-top: 8px; padding: 8px; border-radius: var(--radius-full); border: none; background: var(--primary); color: white; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
.wl-empty { text-align: center; padding: 80px 20px; }
.wl-empty-icon { font-size: 3rem; opacity: 0.25; margin-bottom: 16px; }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-wishlist-v2-css")) {
    const s = document.createElement("style");
    s.id = "nahid-wishlist-v2-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function Wishlist() {
  injectCSS();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [data, setData] = useState({ perfumes: [], packs: [] });
  const [loading, setLoading] = useState(true);
  const [previewPerfume, setPreviewPerfume] = useState(null);

  const load = () => wishlistApi.get().then(setData).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const removePerfume = async (id) => {
    await wishlistApi.removePerfume(id);
    load();
  };
  const removePack = async (id) => {
    await wishlistApi.removePack(id);
    load();
  };

  const addPackToCart = (pack) => {
    addToCart({
      cartItemId: `ready_${pack.id}`,
      item_type: "ready_pack",
      pack_id: pack.id,
      title: pack.title,
      image: pack.cover_image,
      price: Number(pack.price),
      quantity: 1,
      perfumes: [],
    });
    Swal.fire({ icon: "success", title: t("wishlistPage.addedToCart"), timer: 1300, showConfirmButton: false });
  };

  const isEmpty = !loading && data.perfumes.length === 0 && data.packs.length === 0;

  return (
    <>
      <SEO title="Mes Favoris" path="/wishlist" noindex />
      <div className="wl-wrap">
        <h1 className="wl-title">{t("wishlistPage.title")}</h1>
        <p className="wl-sub">{t("wishlistPage.subtitle")}</p>

        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>{t("wishlistPage.loading")}</p>
        ) : isEmpty ? (
          <div className="wl-empty">
            <div className="wl-empty-icon"><FiHeart /></div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "10px" }}>{t("wishlistPage.emptyTitle")}</h2>
            <Link to="/packs" className="btn-primary">{t("wishlistPage.exploreBtn")}</Link>
          </div>
        ) : (
          <>
            {data.packs.length > 0 && (
              <>
                <div className="wl-section-title">{t("wishlistPage.packsTitle")}</div>
                <div className="wl-grid">
                  {data.packs.map((pack) => (
                    <div className="wl-card" key={pack.id}>
                      <button className="wl-card-remove" onClick={() => removePack(pack.id)}><FiX size={14} /></button>
                      <Link to={`/packs/${pack.id}`} className="wl-card-img">
                        <img src={cldResize(pack.cover_image, 300) || "/nahid1.png"} alt={pack.title} loading="lazy" />
                      </Link>
                      <div className="wl-card-body">
                        <div className="wl-card-name">{pack.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "4px" }}>{Math.round(pack.price)} MAD</div>
                        <button className="wl-card-cta" onClick={() => addPackToCart(pack)}>
                          <FiShoppingBag size={12} /> {t("wishlistPage.addToCart")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {data.perfumes.length > 0 && (
              <>
                <div className="wl-section-title">{t("wishlistPage.perfumesTitle")}</div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "-8px", marginBottom: "16px" }}>
                  {t("wishlistPage.perfumesNote")}
                </p>
                <div className="wl-grid">
                  {data.perfumes.map((perfume) => (
                    <div className="wl-card" key={perfume.id}>
                      <button className="wl-card-remove" onClick={() => removePerfume(perfume.id)}><FiX size={14} /></button>
                      <div className="wl-card-img" onClick={() => setPreviewPerfume(perfume)}>
                        <img src={cldResize(perfume.image_url, 300) || "/nahid1.png"} alt={perfume.name} loading="lazy" />
                      </div>
                      <div className="wl-card-body">
                        <div className="wl-card-name">{perfume.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "4px" }}>{perfume.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      {previewPerfume && <PerfumeModal perfume={previewPerfume} onClose={() => setPreviewPerfume(null)} />}
      <NahidFooter />
    </>
  );
}
