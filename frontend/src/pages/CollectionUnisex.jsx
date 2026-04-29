import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useCollectionStyles } from "./collectionStyles";

const CONFIG = {
  category:    "Unisex",
  apiFilter:   (p) => p.category === "Unisex",
  heroImage:   "https://i.postimg.cc/MZjKPjgN/unisex-Nahid.png",
  heroFallback:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1400&q=80",
  accentColor: "#7B68EE",
  badgeDot:    "#A0C4FF",
  eyebrow:     "Collection Sans Frontières",
  title:       <>Parfums <em>Unisex</em></>,
  desc:        "Des fragrances universelles qui transcendent les genres, pour celles et ceux qui cherchent l'équilibre parfait entre douceur et caractère.",
  badgeText:   "Pour toutes & tous",
  scents:      ["Tous","Floral","Boisé","Frais","Oriental","Musqué","Citrus","Oud"],
};

/* Unisex uses a purple/teal gradient accent */
const unisexCSS = `
  .coll-page.unisex {
    --coll-accent: #8B7CF6;
    --coll-accent-dark: #6D5CE8;
  }
  .coll-page.unisex .coll-chip.active {
    background: linear-gradient(135deg, #8B7CF6, #6D5CE8) !important;
    border-color: #8B7CF6 !important;
    box-shadow: 0 4px 14px rgba(139,124,246,0.35) !important;
  }
  .coll-page.unisex .coll-chip:hover {
    border-color: #8B7CF6 !important;
    color: #8B7CF6 !important;
  }
  .coll-page.unisex .coll-hero-eyebrow {
    color: #B8A9FF !important;
  }
  .coll-page.unisex .coll-hero-eyebrow::before {
    background: #B8A9FF !important;
  }
  .coll-page.unisex .coll-section-title em {
    color: #8B7CF6 !important;
  }
  .coll-page.unisex .coll-active-filter-tag {
    background: rgba(139,124,246,0.1) !important;
    border-color: rgba(139,124,246,0.25) !important;
    color: #8B7CF6 !important;
  }
`;

export default function CollectionUnisex({ addToCart }) {
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [sortBy,    setSortBy]    = useState("default");
  const [scent,     setScent]     = useState("Tous");
  const [viewCols,  setViewCols]  = useState("3");
  const filterRef = useRef(null);

  useCollectionStyles();

  useEffect(() => {
    if (!document.getElementById("nahid-unisex-css")) {
      const tag = document.createElement("style");
      tag.id = "nahid-unisex-css";
      tag.textContent = unisexCSS;
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
    <div className="coll-page unisex">

      {/* ── HERO ── */}
      <section className="coll-hero" style={{minHeight:"clamp(480px,62vh,700px)"}}>
        <img
          className="coll-hero-bg"
          src={CONFIG.heroImage}
          alt="Collection Unisex"
          onError={e => { e.currentTarget.src = CONFIG.heroFallback; }}
          style={{objectPosition:"center center"}}
        />
        <div className="coll-hero-grain" />
        {/* Gradient: purple/teal for gender-neutral feel */}
        <div className="coll-hero-overlay" style={{
          background:"linear-gradient(135deg,rgba(30,10,60,0.75) 0%,rgba(10,10,20,0.5) 60%,rgba(0,0,0,0.1) 100%)"
        }} />

        <div className="coll-hero-content">
          <div>
            <div className="coll-hero-eyebrow" style={{color:"#B8A9FF"}}>
              <span style={{width:"28px",height:"1px",background:"#B8A9FF",display:"block"}} />
              {CONFIG.eyebrow}
            </div>
            <h1 className="coll-hero-title">{CONFIG.title}</h1>
            <div className="coll-hero-badge" style={{marginTop:"24px",borderColor:"rgba(180,160,255,0.3)"}}>
              <span className="badge-dot" style={{background: CONFIG.badgeDot}} />
              {CONFIG.badgeText}
            </div>
          </div>
          <div className="coll-hero-right">
            <p className="coll-hero-desc">{CONFIG.desc}</p>
            <div className="coll-hero-stats">
              <div className="coll-hero-stat">
                <strong>{products.length || "18"}</strong>
                <span>Fragrances</span>
              </div>
              <div className="coll-hero-stat">
                <strong>∞</strong>
                <span>Sans genre</span>
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
            Nos parfums <em>Unisex</em>
          </h2>
          {scent !== "Tous" && (
            <span className="coll-active-filter-tag">
              ✦ {scent}
              <button
                onClick={() => setScent("Tous")}
                style={{background:"none",border:"none",cursor:"pointer",color:"#8B7CF6",fontWeight:800,padding:"0 0 0 4px",fontFamily:"inherit",fontSize:"0.8rem"}}
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
            <div className="coll-empty-icon">🫧</div>
            <h3 className="coll-empty-title">Aucun parfum trouvé</h3>
            <p className="coll-empty-text">Essayez une autre famille olfactive ou réinitialisez les filtres.</p>
            <button
              onClick={() => setScent("Tous")}
              style={{
                marginTop:"8px", padding:"12px 28px",
                background:"linear-gradient(135deg,#8B7CF6,#6D5CE8)",
                color:"white", border:"none", borderRadius:"999px",
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