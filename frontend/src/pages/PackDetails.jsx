import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiHeart, FiShare2, FiSliders, FiShoppingBag, FiRefreshCw, FiArrowLeft, FiCreditCard } from "react-icons/fi";
import { packsApi, perfumesApi, wishlistApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import { NO_IMAGE_PLACEHOLDER } from "../utils/placeholderImage";
import PerfumeModal from "../components/PerfumeModal";
import ReplacePerfumeModal from "../components/ReplacePerfumeModal";
import HomeOrderForm from "../components/HomeOrderForm";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.pd-wrap { max-width: var(--container-max); margin: 0 auto; padding: 32px 32px 0; }
.pd-back { display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--text-light); margin-bottom: 20px; }
.pd-back-arrow { transition: transform 0.15s; }
[dir="rtl"] .pd-back-arrow { transform: scaleX(-1); }
.pd-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
@media (max-width: 900px) { .pd-hero { grid-template-columns: 1fr; gap: 28px; } }

/* The catalog photography is already a complete, full-bleed studio shot,
   not an isolated cutout -- so the gallery panel goes edge-to-edge with
   object-fit: cover and zero inner padding. Padding + a synthetic
   background behind an already-finished photo only shrinks it and boxes
   it in, which read as small/cheap rather than premium. */
.pd-media {
  position: relative;
  border-radius: var(--radius-lg); overflow: hidden;
  aspect-ratio: 4/5; max-height: 620px;
  background: var(--background);
  border: 1px solid var(--border-light);
  box-shadow: 0 1px 2px rgba(20,16,14,0.04), 0 20px 40px -20px rgba(20,16,14,0.18);
}
.pd-media img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
@media (max-width: 900px) { .pd-media { max-height: 440px; } }

.pd-info { display: flex; flex-direction: column; }
.pd-title { font-family: var(--font-display); font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 500; margin-bottom: 8px; }
.pd-desc { color: var(--text-light); line-height: 1.65; margin-bottom: 16px; font-size: 0.92rem; }

.pd-price-row { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.pd-price { font-family: var(--font-display); font-size: 1.9rem; font-weight: 600; }
.pd-compare { font-size: 0.95rem; color: var(--text-muted); text-decoration: line-through; }
.pd-save { font-size: 0.72rem; font-weight: 700; color: var(--primary-dark); background: var(--primary-light); padding: 3px 10px; border-radius: var(--radius-full); }

/* Compact "what's inside" summary — answers "what am I buying?" before
   the customer scrolls, without duplicating the full grid below. */
.pd-contains { margin: 18px 0; padding: 14px 16px; background: var(--background); border-radius: var(--radius-md); }
.pd-contains-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-light); margin-bottom: 10px; }
.pd-contains-list { display: flex; flex-wrap: wrap; gap: 10px; }
.pd-contains-item { display: flex; align-items: center; gap: 7px; }
.pd-contains-thumb { width: 34px; height: 34px; border-radius: 50%; overflow: hidden; background: var(--white); border: 1.5px solid var(--border-light); flex-shrink: 0; }
.pd-contains-thumb img { width: 100%; height: 100%; object-fit: cover; }
.pd-contains-name { font-size: 0.76rem; font-weight: 500; color: var(--text); max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Compact, hierarchical CTA stack -- one dominant primary action instead
   of 3-4 same-size buttons competing for attention. Row 1 is the sale:
   direct order + the two icon-only secondary affordances (wishlist,
   share) that don't need a label. Row 2 is two lighter, smaller actions
   for customers who want the cart/customize path instead. */
.pd-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; margin-bottom: 8px; }
.pd-actions-row1 { display: flex; gap: 8px; }
.pd-btn-primary {
  flex: 1; min-width: 0; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 12px 18px; border-radius: var(--radius-full); border: none;
  background: var(--primary); color: white; font-size: 0.86rem; font-weight: 600;
  cursor: pointer; transition: var(--transition); box-shadow: 0 6px 16px -6px rgba(239,119,106,0.55);
}
.pd-btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 8px 20px -6px rgba(239,119,106,0.65); }
.pd-actions-row2 { display: flex; gap: 8px; }
.pd-btn-secondary, .pd-btn-tertiary {
  flex: 1; min-width: 0; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 14px; border-radius: var(--radius-full);
  font-size: 0.76rem; font-weight: 600; cursor: pointer; transition: var(--transition); white-space: nowrap;
}
.pd-btn-secondary { border: 1.3px solid var(--border); background: white; color: var(--secondary); }
.pd-btn-secondary:hover, .pd-btn-secondary.active { border-color: var(--secondary); background: var(--secondary); color: white; }
.pd-btn-tertiary { border: none; background: none; color: var(--text-light); }
.pd-btn-tertiary:hover { color: var(--primary-dark); background: var(--primary-light); }
.pd-icon-btn {
  width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid var(--border); background: white;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition); flex-shrink: 0;
}
.pd-icon-btn:hover, .pd-icon-btn.active { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }

.pd-perfumes-section { margin-top: 56px; }
.pd-perfumes-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; flex-wrap: wrap; gap: 12px; }
.pd-perfumes-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 500; }
.pd-customize-toggle {
  display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: var(--radius-full);
  border: 1.5px solid var(--border); background: white; cursor: pointer; font-size: 0.82rem; font-weight: 600; transition: var(--transition);
}
.pd-customize-toggle.active { background: var(--secondary); border-color: var(--secondary); color: white; }
.pd-perfumes-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 760px) { .pd-perfumes-grid { grid-template-columns: repeat(2, 1fr); } }
.pd-perfume-card { border-radius: var(--radius-md); border: 1px solid var(--border-light); overflow: hidden; background: white; transition: var(--transition); position: relative; box-shadow: 0 1px 2px rgba(20,16,14,0.04); }
.pd-perfume-card:hover { box-shadow: 0 14px 24px -12px rgba(20,16,14,0.16); }
.pd-perfume-card.changed { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(239,119,106,0.12); }
.pd-perfume-img-btn {
  display: block; width: 100%; aspect-ratio: 1122 / 1402; overflow: hidden;
  background: var(--background);
  border: none; padding: 0; cursor: pointer;
}
.pd-perfume-img-btn img { width: 100%; height: 100%; object-fit: contain; object-position: center; display: block; transition: transform 0.4s; }
.pd-perfume-img-btn:hover img { transform: scale(1.06); }
.pd-perfume-body { padding: 12px 14px; }
.pd-perfume-name { font-size: 0.92rem; font-weight: 700; color: var(--secondary); }
.pd-perfume-inspired { font-size: 0.68rem; color: var(--text-muted); margin-top: 2px; margin-bottom: 10px; line-height: 1.4; }
.pd-replace-btn {
  width: 100%; padding: 8px; border-radius: var(--radius-full); border: 1.5px solid var(--border);
  background: none; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: var(--transition);
}
.pd-replace-btn:hover { border-color: var(--primary); color: var(--primary); }
.pd-changed-tag { position: absolute; top: 10px; inset-inline-start: 10px; background: var(--primary); color: white; font-size: 0.6rem; font-weight: 700; padding: 3px 9px; border-radius: var(--radius-full); text-transform: uppercase; }
.pd-sticky-cta { position: sticky; bottom: 0; background: white; border-top: 1px solid var(--border-light); padding: 16px 32px; margin-top: 40px; display: flex; justify-content: flex-end; align-items: center; gap: 12px; box-shadow: 0 -6px 24px rgba(0,0,0,0.05); flex-wrap: wrap; }
@media (max-width: 640px) {
  .pd-sticky-cta { padding: 12px 16px; justify-content: center; }
  .pd-sticky-cta > span { display: none; }
}
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-pack-details-css")) {
    const s = document.createElement("style");
    s.id = "nahid-pack-details-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function PackDetails() {
  injectCSS();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const [pack, setPack] = useState(null);
  const [allPerfumes, setAllPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customizing, setCustomizing] = useState(searchParams.get("customize") === "1");
  const [replacements, setReplacements] = useState({}); // position -> perfume object
  const [replaceTarget, setReplaceTarget] = useState(null); // position being replaced
  const [previewPerfume, setPreviewPerfume] = useState(null);
  const [isWished, setIsWished] = useState(false);
  const orderFormRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([packsApi.get(id), perfumesApi.list({ active: "true" })])
      .then(([p, perfumes]) => {
        setPack(p);
        setAllPerfumes(perfumes);
        setReplacements({});
      })
      .catch(() => Swal.fire({ icon: "error", title: t("packDetails.notFound") }).then(() => navigate("/packs")))
      .finally(() => setLoading(false));
  }, [id, navigate, t]);

  useEffect(() => {
    wishlistApi.get().then((w) => setIsWished(w.packs.some((p) => p.id === Number(id)))).catch(() => {});
  }, [id]);

  const currentSlots = useMemo(() => {
    if (!pack) return [];
    return pack.perfumes.map((p) => replacements[p.position] || p);
  }, [pack, replacements]);

  const hasChanges = Object.keys(replacements).length > 0;
  const excludeIds = currentSlots.map((s) => s.perfume_id || s.id);

  const handlePickReplacement = (perfume) => {
    setReplacements((prev) => ({ ...prev, [replaceTarget]: { ...perfume, position: replaceTarget } }));
    setReplaceTarget(null);
  };

  const handleAddToCart = () => {
    if (!pack) return;
    if (hasChanges) {
      addToCart({
        cartItemId: `custom_ready_${pack.id}_${Object.entries(replacements).map(([pos, p]) => `${pos}-${p.perfume_id || p.id}`).join("_")}_${Date.now()}`,
        item_type: "ready_pack_customized",
        pack_id: pack.id,
        title: `${pack.title} ${t("packDetails.customizedSuffix")}`,
        image: pack.cover_image,
        price: Number(pack.price),
        quantity: 1,
        perfumes: currentSlots.map((s) => ({ perfume_id: s.perfume_id || s.id, name: s.name, image_url: s.image_url })),
        replacements: Object.entries(replacements).map(([position, p]) => ({
          position: Number(position),
          newPerfumeId: p.perfume_id || p.id,
        })),
      });
    } else {
      addToCart({
        cartItemId: `ready_${pack.id}`,
        item_type: "ready_pack",
        pack_id: pack.id,
        title: pack.title,
        image: pack.cover_image,
        price: Number(pack.price),
        quantity: 1,
        perfumes: pack.perfumes.map((p) => ({ perfume_id: p.perfume_id, name: p.name, image_url: p.image_url })),
      });
    }
    Swal.fire({
      icon: "success", title: t("packDetails.addedTitle"), confirmButtonColor: "#EF776A",
      showCancelButton: true, cancelButtonText: t("packDetails.continueBtn"), confirmButtonText: t("packDetails.viewCartBtn"),
    }).then((r) => r.isConfirmed && navigate("/cart"));
  };

  const toggleWishlist = async () => {
    try {
      if (isWished) await wishlistApi.removePack(pack.id);
      else await wishlistApi.addPack(pack.id);
      setIsWished((v) => !v);
    } catch {
      Swal.fire({ icon: "error", title: t("packDetails.errorTitle"), text: t("packDetails.wishlistError") });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: pack.title, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      Swal.fire({ icon: "success", title: t("packDetails.linkCopied"), timer: 1400, showConfirmButton: false });
    }
  };

  if (loading) return <div style={{ padding: "120px 32px", textAlign: "center", color: "var(--text-muted)" }}>{t("packDetails.loading")}</div>;
  if (!pack) return null;

  const hasDiscount = pack.compare_at_price && Number(pack.compare_at_price) > Number(pack.price);
  const savePercent = hasDiscount ? Math.round((1 - Number(pack.price) / Number(pack.compare_at_price)) * 100) : 0;
  const saveAmount = hasDiscount ? Math.round(Number(pack.compare_at_price) - Number(pack.price)) : 0;

  const scrollToCustomize = () => {
    setCustomizing(true);
    document.getElementById("pd-perfumes-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToOrderForm = () => {
    orderFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pack.title,
    description: pack.description,
    image: pack.cover_image,
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: pack.price,
      availability: pack.is_active ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://www.nahidperfumes.com/packs/${pack.id}`,
    },
  };

  return (
    <>
      <SEO title={pack.title} description={pack.description} path={`/packs/${pack.id}`} image={pack.cover_image} structuredData={structuredData} />
      <div className="pd-wrap">
        <Link to="/packs" className="pd-back"><FiArrowLeft size={13} className="pd-back-arrow" /> {t("packDetails.back")}</Link>

        <div className="pd-hero">
          <div className="pd-media">
            <img src={cldResize(pack.cover_image, 700) || NO_IMAGE_PLACEHOLDER} alt={pack.title} />
          </div>
          <div className="pd-info">
            <h1 className="pd-title">{pack.title}</h1>
            {pack.description && <p className="pd-desc">{pack.description}</p>}
            <div className="pd-price-row">
              <span className="pd-price">{Math.round(pack.price)} MAD</span>
              {hasDiscount && <span className="pd-compare">{Math.round(pack.compare_at_price)} MAD</span>}
              {hasDiscount && savePercent > 0 && (
                <span className="pd-save">{t("packDetails.youSave")} {saveAmount} MAD (-{savePercent}%)</span>
              )}
            </div>

            <div className="pd-contains">
              <div className="pd-contains-label">{t("packDetails.containsFour")}</div>
              <div className="pd-contains-list">
                {currentSlots.map((slot) => (
                  <div className="pd-contains-item" key={slot.position}>
                    <div className="pd-contains-thumb">
                      <img src={cldResize(slot.image_url, 70) || NO_IMAGE_PLACEHOLDER} alt={slot.name} loading="lazy" />
                    </div>
                    <span className="pd-contains-name">{slot.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pd-actions">
              <div className="pd-actions-row1">
                <button className="pd-btn-primary" onClick={scrollToOrderForm}>
                  <FiCreditCard size={15} /> {t("packCard.order")}
                </button>
                <button className={`pd-icon-btn${isWished ? " active" : ""}`} onClick={toggleWishlist} aria-label={t("packDetails.wishlist")}>
                  <FiHeart size={17} fill={isWished ? "currentColor" : "none"} />
                </button>
                <button className="pd-icon-btn" onClick={handleShare} aria-label={t("packDetails.share")}><FiShare2 size={16} /></button>
              </div>
              <div className="pd-actions-row2">
                <button className={`pd-btn-secondary${customizing ? " active" : ""}`} onClick={scrollToCustomize}>
                  <FiSliders size={13} /> {t("packDetails.customizeToggle")}
                </button>
                <button className="pd-btn-tertiary" onClick={handleAddToCart}>
                  <FiShoppingBag size={13} /> {t("packDetails.addToCart")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pd-perfumes-section" id="pd-perfumes-section">
          <div className="pd-perfumes-head">
            <h2 className="pd-perfumes-title">{t("packDetails.perfumesTitle")}</h2>
            <button
              className={`pd-customize-toggle${customizing ? " active" : ""}`}
              onClick={() => setCustomizing((v) => !v)}
            >
              <FiSliders size={14} /> {customizing ? t("packDetails.finishCustomize") : t("packDetails.customizeToggle")}
            </button>
          </div>

          <div className="pd-perfumes-grid">
            {currentSlots.map((slot) => {
              const changed = !!replacements[slot.position];
              return (
                <div className={`pd-perfume-card${changed ? " changed" : ""}`} key={slot.position}>
                  {changed && <span className="pd-changed-tag">{t("packDetails.changedTag")}</span>}
                  <button className="pd-perfume-img-btn" onClick={() => setPreviewPerfume(slot)}>
                    <img src={cldResize(slot.image_url, 300) || NO_IMAGE_PLACEHOLDER} alt={slot.name} loading="lazy" />
                  </button>
                  <div className="pd-perfume-body">
                    <div className="pd-perfume-name">{slot.name}</div>
                    {slot.inspired_by && (
                      <div className="pd-perfume-inspired">{t("perfumeCard.inspiredBy")} {slot.inspired_by}</div>
                    )}
                    {customizing && (
                      <button className="pd-replace-btn" onClick={() => setReplaceTarget(slot.position)}>
                        <FiRefreshCw size={11} /> {t("packDetails.replace")}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Direct order: "Commander" above scrolls here instead of forcing
          Add to cart -> Cart -> Checkout. Cart flow remains fully intact
          for customers who prefer it (or want the customized version). */}
      <section style={{ padding: "var(--section-gap) 0" }}>
        <HomeOrderForm pack={pack} ref={orderFormRef} />
      </section>

      {hasChanges && (
        <div className="pd-sticky-cta">
          <span style={{ alignSelf: "center", fontSize: "0.85rem", color: "var(--text-light)", marginInlineEnd: "auto" }}>
            {t("packDetails.customizedNote")}
          </span>
          <button className="btn-primary" onClick={handleAddToCart}>
            <FiShoppingBag size={15} /> {t("packDetails.customizedCta")}
          </button>
        </div>
      )}

      {previewPerfume && <PerfumeModal perfume={previewPerfume} onClose={() => setPreviewPerfume(null)} />}
      {replaceTarget !== null && (
        <ReplacePerfumeModal
          perfumes={allPerfumes}
          excludeIds={excludeIds}
          currentPerfume={currentSlots.find((s) => s.position === replaceTarget)}
          currentPerfumeId={currentSlots.find((s) => s.position === replaceTarget)?.perfume_id || currentSlots.find((s) => s.position === replaceTarget)?.id}
          onSelect={handlePickReplacement}
          onClose={() => setReplaceTarget(null)}
        />
      )}

      <NahidFooter />
    </>
  );
}
