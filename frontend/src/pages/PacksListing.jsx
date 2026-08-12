import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FiSearch } from "react-icons/fi";
import { packsApi, wishlistApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import PackCard from "../components/PackCard";
import NahidFooter from "../components/NahidFooter";
import SEO from "../components/SEO";

const CSS = `
.pl-hero { text-align: center; padding: 60px 32px 30px; background: var(--background); }
.pl-hero h1 { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 500; }
.pl-hero p { color: var(--text-light); max-width: 520px; margin: 12px auto 0; }
.pl-toolbar { max-width: var(--container-max); margin: 0 auto; padding: 28px 32px 0; display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.pl-search { display: flex; align-items: center; gap: 8px; border: 1.5px solid var(--border); border-radius: var(--radius-full); padding: 10px 18px; flex: 1; min-width: 220px; }
.pl-search input { border: none; outline: none; flex: 1; font-size: 0.88rem; }
.pl-sort { border: 1.5px solid var(--border); border-radius: var(--radius-full); padding: 10px 18px; font-size: 0.82rem; background: white; }
.pl-gender-row { display: flex; gap: 8px; flex-wrap: wrap; padding: 18px 32px 0; max-width: var(--container-max); margin: 0 auto; }
@media (max-width: 640px) { .pl-gender-row { padding: 14px 16px 0; } }
.pl-gender-chip {
  padding: 8px 18px; border-radius: var(--radius-full); border: 1.5px solid var(--border);
  background: white; font-size: 0.8rem; font-weight: 600; color: var(--secondary);
  cursor: pointer; transition: var(--transition); white-space: nowrap;
}
.pl-gender-chip:hover { border-color: var(--primary); }
.pl-gender-chip.active { background: var(--secondary); border-color: var(--secondary); color: white; }
/* Premium catalog grid: a controlled 3/2/1 column layout (not auto-fill),
   so cards keep a consistent, comfortable size instead of stretching to
   fill whatever width happens to be available. */
.pl-grid { max-width: var(--container-max); margin: 0 auto; padding: 28px 32px 100px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
@media (max-width: 1024px) {
  .pl-grid { grid-template-columns: repeat(2, 1fr); gap: 22px; }
}
@media (max-width: 640px) {
  .pl-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 20px 16px 80px; }
}
.pl-empty { text-align: center; padding: 80px 20px; color: var(--text-muted); }
.pl-skel { border-radius: var(--radius-xl); background: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%); background-size: 200% 100%; animation: skel 1.4s infinite; aspect-ratio: 4/6.2; }
@keyframes skel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("nahid-packs-listing-css")) {
    const s = document.createElement("style");
    s.id = "nahid-packs-listing-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

export default function PacksListing() {
  injectCSS();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState("default");
  const [genderFilter, setGenderFilter] = useState("");
  const [wishedIds, setWishedIds] = useState(() => new Set());

  useEffect(() => {
    packsApi.list()
      .then(setPacks)
      .catch(() => Swal.fire({ icon: "error", title: t("packsPage.errorTitle"), text: t("packsPage.errorText") }))
      .finally(() => setLoading(false));
    wishlistApi.get().then((w) => setWishedIds(new Set(w.packs.map((p) => p.id)))).catch(() => {});
  }, [t]);

  const visible = useMemo(() => {
    let list = [...packs];
    if (genderFilter) list = list.filter((p) => p.gender === genderFilter);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q)
      );
    }
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [packs, query, sort, genderFilter]);

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
    Swal.fire({ icon: "success", title: t("packsPage.addedToCart"), timer: 1400, showConfirmButton: false });
  }, [addToCart, t]);

  return (
    <>
      <SEO title="Nos Packs" description="Découvrez tous nos packs de 4 parfums curés, prêts-à-offrir ou personnalisables." path="/packs" />
      <div className="pl-hero">
        <h1>{t("packsPage.title")}</h1>
        <p>{t("packsPage.subtitle")}</p>
      </div>

      <div className="pl-gender-row">
        {[
          { value: "", label: t("packStock.all") },
          { value: "Femme", label: t("packStock.femme") },
          { value: "Homme", label: t("packStock.homme") },
          { value: "Unisexe", label: t("packStock.unisexe") },
        ].map((opt) => (
          <button
            key={opt.value || "all"}
            className={`pl-gender-chip${genderFilter === opt.value ? " active" : ""}`}
            onClick={() => setGenderFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="pl-toolbar">
        <div className="pl-search">
          <FiSearch size={14} color="var(--text-muted)" />
          <input placeholder={t("packsPage.searchPlaceholder")} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="pl-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">{t("packsPage.sortDefault")}</option>
          <option value="price_asc">{t("packsPage.sortPriceAsc")}</option>
          <option value="price_desc">{t("packsPage.sortPriceDesc")}</option>
        </select>
      </div>

      {loading ? (
        <div className="pl-grid">
          {[0, 1, 2, 3, 4, 5].map((i) => <div className="pl-skel" key={i} />)}
        </div>
      ) : visible.length === 0 ? (
        <div className="pl-empty">{t("packsPage.empty")}</div>
      ) : (
        <div className="pl-grid">
          {visible.map((pack, i) => (
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
      )}

      <NahidFooter />
    </>
  );
}
