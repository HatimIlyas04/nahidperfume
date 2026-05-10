import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { getCachedProducts, setCachedProducts } from "../utils/productCache";
import NahidFooter from "../components/NahidFooter";
import { useCollectionStyles } from "./collectionStyles";

/* ── Config ──────────────────────────────────────────── */
const CONFIG = {
  category:    "Femme",
  apiFilter:   (p) => p.gender === "Femme",
  heroImage:   "https://i.postimg.cc/dQTtHTgz/femme-Nahid.png",
  heroFallback:"https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1400&q=80",
  accentColor: "#EF776A",
  accentDark:  "#D35F52",
  badgeDot:    "#FF8FA3",
  eyebrow:     "Collection Exclusive",
  title:       <>Parfums <em>Femme</em></>,
  desc:        "Des fragrances florales et envoûtantes, créées pour révéler votre féminité et votre élégance naturelle. De la rose de Taif à l'iris de Florence.",
  badgeText:   "Pour elle",
  scents:      ["Tous","Floral","Oriental","Boisé","Frais","Musqué"],
};

export default function CollectionFemme({ addToCart }) {
  const [products,    setProducts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [sortBy,      setSortBy]      = useState("default");
  const [scent,       setScent]       = useState("Tous");
  const [viewCols,    setViewCols]    = useState("3");
  const filterRef = useRef(null);
  const [sticky, setSticky] = useState(false);

  /* Inject styles once */
  useCollectionStyles();

  /* Scroll-animation observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("coll-visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".coll-aos").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* Sticky filter bar */
  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        setSticky(window.scrollY > filterRef.current.offsetTop - 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Fetch */
  useEffect(() => {
    const cached = getCachedProducts();
    if (cached) { setProducts(cached.filter(CONFIG.apiFilter)); setLoading(false); return; }
    axios.get("/api/products")
      .then(res => { setCachedProducts(res.data); setProducts(res.data.filter(CONFIG.apiFilter)); })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  /* Sort + filter */
  let displayed = [...products];
  if (scent !== "Tous") displayed = displayed.filter(p => (p.scent_family || p.notes || "").includes(scent));
  if (sortBy === "price-asc")  displayed.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
  if (sortBy === "price-desc") displayed.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
  if (sortBy === "name-asc")   displayed.sort((a,b) => a.name.localeCompare(b.name));

  const gridClass = viewCols === "2" ? "coll-grid cols-2" : viewCols === "4" ? "coll-grid cols-4" : "coll-grid";

  return (
    <div className="coll-page">

      {/* ── HERO ── */}
      <section className="coll-hero">
        <img
          className="coll-hero-bg"
          src={CONFIG.heroImage}
          alt="Collection Femme"
          onError={e => { e.currentTarget.src = CONFIG.heroFallback; }}
        />
        <div className="coll-hero-grain" />
        <div className="coll-hero-overlay" />

        <div className="coll-hero-content">
          <div>
            <div className="coll-hero-eyebrow">{CONFIG.eyebrow}</div>
            <h1 className="coll-hero-title">{CONFIG.title}</h1>
            <div className="coll-hero-badge" style={{marginTop:"24px"}}>
              <span className="badge-dot" style={{background: CONFIG.badgeDot}} />
              {CONFIG.badgeText}
            </div>
          </div>
          <div className="coll-hero-right">
            <p className="coll-hero-desc">{CONFIG.desc}</p>
            <div className="coll-hero-stats">
              <div className="coll-hero-stat">
                <strong>{products.length || "32"}</strong>
                <span>Fragrances</span>
              </div>
              <div className="coll-hero-stat">
                <strong>100%</strong>
                <span>Naturels</span>
              </div>
              <div className="coll-hero-stat">
                <strong>4.9★</strong>
                <span>Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        <div className="coll-hero-scroll">
          <div className="coll-hero-scroll-line" />
          <span className="coll-hero-scroll-label">Défiler</span>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="coll-filter-section" ref={filterRef}>
        <div className="coll-filter-inner">

          {/* Left: scent chips */}
          <div className="coll-filter-left">
            <span className="coll-filter-label">Famille :</span>
            {CONFIG.scents.map(s => (
              <button
                key={s}
                className={`coll-chip${scent === s ? " active" : ""}`}
                onClick={() => setScent(s)}
              >{s}</button>
            ))}
          </div>

          {/* Right: count + sort + view */}
          <div className="coll-filter-right">
            <span className="coll-count-badge">
              <strong>{displayed.length}</strong> produit{displayed.length !== 1 ? "s" : ""}
            </span>

            <select
              className="coll-sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="default">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom A–Z</option>
            </select>

            <div className="coll-view-btns">
              {[["2","▬"],["3","⊞"],["4","⊟"]].map(([v, icon]) => (
                <button
                  key={v}
                  className={`coll-view-btn${viewCols === v ? " active" : ""}`}
                  onClick={() => setViewCols(v)}
                  title={`${v} colonnes`}
                >{icon}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="coll-products-section">

        {/* Section intro */}
        <div className="coll-section-intro coll-aos">
          <h2 className="coll-section-title">
            Nos parfums <em>Femme</em>
          </h2>
          {scent !== "Tous" && (
            <span className="coll-active-filter-tag">
              ✦ {scent}
              <button
                onClick={() => setScent("Tous")}
                style={{background:"none",border:"none",cursor:"pointer",color:"var(--coral)",fontWeight:800,padding:"0 0 0 4px",fontFamily:"inherit",fontSize:"0.8rem"}}
              >×</button>
            </span>
          )}
        </div>

        {loading ? (
          <div className={gridClass}>
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="coll-skeleton" style={{animationDelay:`${n*0.08}s`}} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="coll-empty">
            <div className="coll-empty-icon">🌸</div>
            <h3 className="coll-empty-title">Aucun parfum trouvé</h3>
            <p className="coll-empty-text">Essayez une autre famille olfactive ou réinitialisez les filtres.</p>
            <button
              onClick={() => setScent("Tous")}
              style={{
                marginTop:"8px", padding:"12px 28px",
                background:"var(--coral)", color:"white",
                border:"none", borderRadius:"999px",
                fontFamily:"var(--sans)", fontSize:"0.75rem",
                fontWeight:"800", letterSpacing:"0.08em", textTransform:"uppercase",
                cursor:"pointer",
              }}
            >Voir tous les parfums</button>
          </div>
        ) : (
          <div className={gridClass}>
            {displayed.map((product, i) => (
              <div
                key={product.id}
                className="coll-card-wrap coll-aos"
                style={{ animationDelay: `${(i % 12) * 0.06}s` }}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        )}
      </section>
      <NahidFooter />
    </div>
  );
}