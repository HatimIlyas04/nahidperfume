import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useCollectionStyles } from "./collectionStyles";

const CONFIG = {
  category:    "Homme",
  apiFilter:   (p) => p.gender === "Homme",
  heroImage:   "https://i.postimg.cc/WpJbWJxx/homme-Nahid.jpg",
  heroFallback:"https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1400&q=80",
  accentColor: "#C9A96E",
  accentDark:  "#A8863A",
  badgeDot:    "#C9A96E",
  eyebrow:     "Collection Prestige",
  title:       <>Parfums <em>Homme</em></>,
  desc:        "Des fragrances boisées, épicées et fumées, conçues pour l'homme qui ose affirmer sa personnalité. Oud, cèdre, cuir et ambre.",
  badgeText:   "Pour lui",
  scents:      ["Tous","Boisé","Oud","Épicé","Oriental","Cuir","Frais"],
};

/* Override: use gold instead of coral for homme */
const hommeCSS = `
  .coll-page.homme .coll-chip.active {
    background: var(--gold) !important;
    border-color: var(--gold) !important;
    box-shadow: 0 4px 14px rgba(201,169,110,0.35) !important;
  }
  .coll-page.homme .coll-chip:hover {
    border-color: var(--gold) !important;
    color: var(--gold) !important;
  }
  .coll-page.homme .coll-hero-eyebrow { color: var(--gold) !important; }
  .coll-page.homme .coll-hero-eyebrow::before { background: var(--gold) !important; }
  .coll-page.homme .coll-section-title em { color: var(--gold) !important; }
  .coll-page.homme .coll-active-filter-tag {
    background: rgba(201,169,110,0.1) !important;
    border-color: rgba(201,169,110,0.25) !important;
    color: var(--gold) !important;
  }
`;

export default function CollectionHomme({ addToCart }) {
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [sortBy,    setSortBy]    = useState("default");
  const [scent,     setScent]     = useState("Tous");
  const [viewCols,  setViewCols]  = useState("3");
  const filterRef = useRef(null);

  useCollectionStyles();

  /* Inject homme accent override */
  useEffect(() => {
    if (!document.getElementById("nahid-homme-css")) {
      const tag = document.createElement("style");
      tag.id = "nahid-homme-css";
      tag.textContent = hommeCSS;
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("coll-visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".coll-aos").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  useEffect(() => {
    axios.get("/api/products")
      .then(res => { setProducts(res.data.filter(CONFIG.apiFilter)); })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  let displayed = [...products];
  if (scent !== "Tous") displayed = displayed.filter(p => (p.scent_family || p.notes || "").includes(scent));
  if (sortBy === "price-asc")  displayed.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
  if (sortBy === "price-desc") displayed.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
  if (sortBy === "name-asc")   displayed.sort((a,b) => a.name.localeCompare(b.name));

  const gridClass = viewCols === "2" ? "coll-grid cols-2" : viewCols === "4" ? "coll-grid cols-4" : "coll-grid";

  return (
    <div className="coll-page homme">

      {/* ── HERO ── */}
      <section className="coll-hero" style={{minHeight:"clamp(500px,65vh,720px)"}}>
        <img
          className="coll-hero-bg"
          src={CONFIG.heroImage}
          alt="Collection Homme"
          onError={e => { e.currentTarget.src = CONFIG.heroFallback; }}
          style={{objectPosition:"center 20%"}}
        />
        <div className="coll-hero-grain" />
        {/* Darker overlay for masculine mood */}
        <div className="coll-hero-overlay" style={{background:"linear-gradient(to top,rgba(6,6,4,0.92) 0%,rgba(6,6,4,0.5) 50%,rgba(6,6,4,0.15) 100%)"}} />

        <div className="coll-hero-content">
          <div>
            <div className="coll-hero-eyebrow" style={{color:"var(--gold)"}}>
              <span style={{width:"28px",height:"1px",background:"var(--gold)",display:"block"}} />
              {CONFIG.eyebrow}
            </div>
            <h1 className="coll-hero-title">{CONFIG.title}</h1>
            <div className="coll-hero-badge" style={{marginTop:"24px",borderColor:"rgba(201,169,110,0.3)"}}>
              <span className="badge-dot" style={{background: CONFIG.badgeDot}} />
              {CONFIG.badgeText}
            </div>
          </div>
          <div className="coll-hero-right">
            <p className="coll-hero-desc">{CONFIG.desc}</p>
            <div className="coll-hero-stats">
              <div className="coll-hero-stat">
                <strong>{products.length || "28"}</strong>
                <span>Fragrances</span>
              </div>
              <div className="coll-hero-stat">
                <strong>12+</strong>
                <span>Années expertise</span>
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
          <div className="coll-filter-right">
            <span className="coll-count-badge">
              <strong>{displayed.length}</strong> produit{displayed.length !== 1 ? "s" : ""}
            </span>
            <select className="coll-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
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
                >{icon}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="coll-products-section">
        <div className="coll-section-intro coll-aos">
          <h2 className="coll-section-title">
            Nos parfums <em>Homme</em>
          </h2>
          {scent !== "Tous" && (
            <span className="coll-active-filter-tag">
              ✦ {scent}
              <button
                onClick={() => setScent("Tous")}
                style={{background:"none",border:"none",cursor:"pointer",color:"var(--gold)",fontWeight:800,padding:"0 0 0 4px",fontFamily:"inherit",fontSize:"0.8rem"}}
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
            <div className="coll-empty-icon">🪵</div>
            <h3 className="coll-empty-title">Aucun parfum trouvé</h3>
            <p className="coll-empty-text">Essayez une autre famille olfactive ou réinitialisez les filtres.</p>
            <button
              onClick={() => setScent("Tous")}
              style={{
                marginTop:"8px", padding:"12px 28px",
                background:"var(--gold)", color:"white",
                border:"none", borderRadius:"999px",
                fontFamily:"var(--sans)", fontSize:"0.75rem",
                fontWeight:"800", letterSpacing:"0.08em",
                textTransform:"uppercase", cursor:"pointer",
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
    </div>
  );
}