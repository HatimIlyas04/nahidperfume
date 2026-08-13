import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiSearch, FiCheck, FiPlus, FiX } from "react-icons/fi";
import { perfumesApi, customPackSettingsApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { cldResize } from "../utils/cloudinary";
import { NO_IMAGE_PLACEHOLDER } from "../utils/placeholderImage";
import PerfumeModal from "../components/PerfumeModal";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.byop-hero {
  background: linear-gradient(175deg, var(--primary-light) 0%, var(--white) 60%);
  padding: 64px 0 40px; text-align: center;
}
.byop-hero h1 { font-family: var(--font-display); font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 500; color: var(--secondary); }
.byop-hero p { color: var(--text-light); font-size: 1rem; max-width: 560px; margin: 14px auto 0; }
.byop-counter {
  display: inline-flex; align-items: center; gap: 10px; margin-top: 24px;
  background: white; border-radius: var(--radius-full); padding: 10px 22px; box-shadow: var(--shadow-md);
}
.byop-counter-dots { display: flex; gap: 6px; }
.byop-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gray-300); transition: background 0.25s, transform 0.25s; }
.byop-dot.filled { background: var(--primary); transform: scale(1.15); }
.byop-counter-text { font-weight: 700; font-size: 0.9rem; color: var(--secondary); font-family: var(--font-body); }

.byop-body { max-width: var(--container-max); margin: 0 auto; padding: 40px 32px 100px; display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
@media (max-width: 960px) { .byop-body { grid-template-columns: 1fr; padding: 32px 16px 140px; } }

.byop-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; align-items: center; }
.byop-search { display: flex; align-items: center; gap: 8px; border: 1.5px solid var(--border); border-radius: var(--radius-full); padding: 10px 18px; flex: 1; min-width: 220px; }
.byop-search input { border: none; outline: none; flex: 1; font-size: 0.88rem; }
.byop-chip {
  padding: 8px 16px; border-radius: var(--radius-full); border: 1.5px solid var(--border);
  background: white; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: var(--transition); white-space: nowrap;
}
.byop-chip.active { background: var(--secondary); border-color: var(--secondary); color: white; }

.byop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }
.byop-card {
  border-radius: var(--radius-lg); border: 2px solid var(--border-light); overflow: hidden; cursor: pointer;
  transition: border-color 0.2s, transform 0.2s; position: relative; background: white;
}
.byop-card:hover { transform: translateY(-3px); }
.byop-card.selected { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(239,119,106,0.15); }
.byop-card-img { aspect-ratio: 1122 / 1402; background: var(--gray-100); position: relative; }
.byop-card-img img { width: 100%; height: 100%; object-fit: contain; object-position: center; }
.byop-card-check {
  position: absolute; top: 8px; inset-inline-end: 8px; width: 26px; height: 26px; border-radius: 50%;
  background: white; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center;
  color: transparent; transition: var(--transition);
}
.byop-card.selected .byop-card-check { background: var(--primary); border-color: var(--primary); color: white; }
.byop-card-info { padding: 10px 12px; }
.byop-card-name { font-size: 0.86rem; font-weight: 700; color: var(--secondary); line-height: 1.25; }
.byop-card-inspired { font-size: 0.65rem; color: var(--text-muted); margin-top: 2px; line-height: 1.35; }
.byop-card-meta { font-size: 0.65rem; color: var(--text-muted); margin-top: 2px; line-height: 1.35; }
.byop-card-view { position: absolute; bottom: 8px; inset-inline-start: 8px; font-size: 0.6rem; background: rgba(255,255,255,0.9); padding: 3px 8px; border-radius: var(--radius-full); color: var(--secondary); font-weight: 700; }

.byop-empty { text-align: center; padding: 60px 20px; color: var(--text-muted); }

.byop-preview {
  position: sticky; top: 90px; background: white; border-radius: var(--radius-lg);
  border: 1px solid var(--border-light); box-shadow: var(--shadow-md); padding: 24px; height: fit-content;
}
.byop-preview h3 { font-family: var(--font-display); font-size: 1.3rem; font-weight: 500; margin-bottom: 16px; }
.byop-slot { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border-light); }
.byop-slot:last-of-type { border-bottom: none; }
.byop-slot-num {
  width: 26px; height: 26px; border-radius: 50%; background: var(--gray-100); color: var(--text-muted);
  display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; flex-shrink: 0;
}
.byop-slot.filled .byop-slot-num { background: var(--primary); color: white; }
.byop-slot-img { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; background: var(--gray-100); flex-shrink: 0; }
.byop-slot-name { flex: 1; font-size: 0.8rem; font-weight: 500; color: var(--secondary); }
.byop-slot-empty { flex: 1; font-size: 0.78rem; color: var(--text-muted); font-style: italic; }
.byop-slot-remove { background: none; border: none; cursor: pointer; color: var(--text-muted); }
.byop-preview-price { display: flex; justify-content: space-between; align-items: baseline; margin: 18px 0 4px; }
.byop-preview-price-val { font-family: var(--font-display); font-size: 1.8rem; font-weight: 600; color: var(--secondary); }
.byop-preview-cta {
  width: 100%; padding: 14px; border-radius: var(--radius-full); border: none; margin-top: 10px;
  background: var(--primary); color: white; font-weight: 600; font-size: 0.92rem; cursor: pointer; transition: var(--transition);
}
.byop-preview-cta:disabled { background: var(--gray-200); color: var(--text-muted); cursor: not-allowed; }
.byop-preview-cta:not(:disabled):hover { background: var(--primary-dark); }

.byop-mobile-bar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 500;
  background: white; box-shadow: 0 -8px 30px rgba(0,0,0,0.1); padding: 14px 16px;
  align-items: center; justify-content: space-between; gap: 14px;
}
@media (max-width: 960px) { .byop-mobile-bar { display: flex; } .byop-preview { display: none; } }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-byop-css")) {
    const s = document.createElement("style");
    s.id = "nahid-byop-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function BuildYourOwnPack() {
  injectCSS();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const [perfumes, setPerfumes] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [selected, setSelected] = useState([]); // array of perfume objects, order matters
  const [previewPerfume, setPreviewPerfume] = useState(null);

  useEffect(() => {
    Promise.all([perfumesApi.list({ active: "true" }), customPackSettingsApi.get()])
      .then(([p, s]) => {
        setPerfumes(p);
        setSettings(s);
      })
      .catch(() => Swal.fire({ icon: "error", title: t("buildPack.errorTitle"), text: t("buildPack.loadError") }))
      .finally(() => setLoading(false));
  }, [t]);

  const genders = useMemo(() => [...new Set(perfumes.map((p) => p.gender).filter(Boolean))], [perfumes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return perfumes.filter((p) => {
      if (genderFilter && p.gender !== genderFilter) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || (p.inspired_by || "").toLowerCase().includes(q);
    });
  }, [perfumes, query, genderFilter]);

  const toggleSelect = (perfume) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === perfume.id);
      if (exists) return prev.filter((p) => p.id !== perfume.id);
      if (prev.length >= 4) return prev;
      return [...prev, perfume];
    });
  };

  const removeSlot = (id) => setSelected((prev) => prev.filter((p) => p.id !== id));

  const isComplete = selected.length === 4;
  const price = settings ? Number(settings.flat_price) : 0;

  const handleAddToCart = () => {
    if (!isComplete) return;
    addToCart({
      cartItemId: `custom_${selected.map((p) => p.id).join("-")}_${Date.now()}`,
      item_type: "custom_pack",
      pack_id: null,
      title: settings?.title || t("buildPack.defaultTitle"),
      image: selected[0]?.image_url,
      price,
      quantity: 1,
      perfumes: selected.map((p) => ({ perfume_id: p.id, name: p.name, image_url: p.image_url })),
    });
    Swal.fire({
      icon: "success",
      title: t("buildPack.addedTitle"),
      text: t("buildPack.addedText"),
      confirmButtonColor: "#EF776A",
      showCancelButton: true,
      cancelButtonText: t("buildPack.continueBtn"),
      confirmButtonText: t("buildPack.viewCartBtn"),
    }).then((r) => {
      if (r.isConfirmed) navigate("/cart");
      else setSelected([]);
    });
  };

  if (settings && !settings.is_active) {
    return (
      <div className="byop-hero">
        <h1>{t("buildPack.unavailableTitle")}</h1>
        <p>{t("buildPack.unavailableText")}</p>
      </div>
    );
  }

  return (
    <>
      <SEO title={t("buildPack.title")} description={t("buildPack.subtitle")} path="/build-your-pack" />
      <div className="byop-hero">
        <h1>{t("buildPack.title")}</h1>
        <p>{settings?.description || t("buildPack.subtitle")}</p>
        <div className="byop-counter">
          <div className="byop-counter-dots">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`byop-dot${i < selected.length ? " filled" : ""}`} />
            ))}
          </div>
          <span className="byop-counter-text">{selected.length} / 4 {t("buildPack.selectedCount")}</span>
        </div>
      </div>

      <div className="byop-body">
        <div>
          <div className="byop-filters">
            <div className="byop-search">
              <FiSearch size={14} color="var(--text-muted)" />
              <input placeholder={t("buildPack.searchPlaceholder")} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button className={`byop-chip${!genderFilter ? " active" : ""}`} onClick={() => setGenderFilter("")}>{t("buildPack.allGenders")}</button>
            {genders.map((g) => (
              <button key={g} className={`byop-chip${genderFilter === g ? " active" : ""}`} onClick={() => setGenderFilter(g)}>
                {g}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="byop-empty">{t("buildPack.loading")}</div>
          ) : filtered.length === 0 ? (
            <div className="byop-empty">{t("buildPack.noMatch")}</div>
          ) : (
            <div className="byop-grid">
              {filtered.map((p) => {
                const isSelected = selected.some((s) => s.id === p.id);
                return (
                  <div key={p.id} className={`byop-card${isSelected ? " selected" : ""}`} onClick={() => toggleSelect(p)}>
                    <div className="byop-card-img">
                      <img src={cldResize(p.image_url, 250) || NO_IMAGE_PLACEHOLDER} alt={p.name} loading="lazy" />
                      <div className="byop-card-check"><FiCheck size={15} /></div>
                      <button
                        className="byop-card-view"
                        onClick={(e) => { e.stopPropagation(); setPreviewPerfume(p); }}
                      >
                        {t("buildPack.view")}
                      </button>
                    </div>
                    <div className="byop-card-info">
                      <div className="byop-card-name">{p.name}</div>
                      {p.inspired_by && (
                        <div className="byop-card-inspired">{t("perfumeCard.inspiredBy")} {p.inspired_by}</div>
                      )}
                      {[p.size && `${p.size}ml`, p.concentration, p.longevity].some(Boolean) && (
                        <div className="byop-card-meta">
                          {[p.size && `${p.size}ml`, p.concentration, p.longevity].filter(Boolean).join(" · ")}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <aside className="byop-preview">
          <h3>{t("buildPack.yourPack")}</h3>
          {[0, 1, 2, 3].map((i) => {
            const p = selected[i];
            return (
              <div key={i} className={`byop-slot${p ? " filled" : ""}`}>
                <div className="byop-slot-num">{i + 1}</div>
                {p ? (
                  <>
                    <img className="byop-slot-img" src={cldResize(p.image_url, 80) || NO_IMAGE_PLACEHOLDER} alt={p.name} />
                    <span className="byop-slot-name">{p.name}</span>
                    <button className="byop-slot-remove" onClick={() => removeSlot(p.id)} aria-label={t("buildPack.remove")}>
                      <FiX size={15} />
                    </button>
                  </>
                ) : (
                  <span className="byop-slot-empty">{t("buildPack.chooseAPerfume")}</span>
                )}
              </div>
            );
          })}
          <div className="byop-preview-price">
            <span>{t("buildPack.priceLabel")}</span>
            <span className="byop-preview-price-val">{price} MAD</span>
          </div>
          <button className="byop-preview-cta" disabled={!isComplete} onClick={handleAddToCart}>
            {isComplete ? t("buildPack.addToCart") : `${t("buildPack.remaining")} ${4 - selected.length} ${t("buildPack.remainingSuffix")}`}
          </button>
        </aside>
      </div>

      <div className="byop-mobile-bar">
        <span style={{ fontWeight: 700 }}>{selected.length}/4 · {price} MAD</span>
        <button className="byop-preview-cta" style={{ width: "auto", padding: "10px 24px" }} disabled={!isComplete} onClick={handleAddToCart}>
          <FiPlus size={14} /> {t("buildPack.addToCart")}
        </button>
      </div>

      {previewPerfume && <PerfumeModal perfume={previewPerfume} onClose={() => setPreviewPerfume(null)} />}

      <NahidFooter />
    </>
  );
}
