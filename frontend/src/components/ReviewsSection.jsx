import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { feedbacksApi, testimonialsApi } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { AVATARS } from "../pages/Reviews";

const FALLBACK = [
  { id: "fb-1", name: "Yasmine El Amrani", avatarKey: "bloom",  avatarUrl: null, rating: 5, message: "Un parfum absolument envoûtant. L'oud est profond sans être écrasant, avec une touche florale qui le rend unique. Je reçois des compliments à chaque fois que je le porte." },
  { id: "fb-2", name: "Karim Bensaid",     avatarKey: "oud",    avatarUrl: null, rating: 5, message: "J'offre Nahid à toute ma famille maintenant. La qualité est exceptionnelle et les flacons sont magnifiques. La livraison était rapide et l'emballage très soigné." },
  { id: "fb-3", name: "Salma Tazi",        avatarKey: "rose",   avatarUrl: null, rating: 5, message: "Amber Noir est mon coup de cœur absolu. Il tient toute la journée et évolue magnifiquement. Le rapport qualité-prix est imbattable pour un parfum de cette qualité." },
  { id: "fb-4", name: "Hassan Alaoui",     avatarKey: "nature", avatarUrl: null, rating: 5, message: "Enfin un parfum marocain qui rivalise avec les grandes maisons. Nahid a trouvé l'équilibre parfait entre tradition et modernité. Je suis client fidèle depuis le début." },
  { id: "fb-5", name: "Nadia Berrada",     avatarKey: "amber",  avatarUrl: null, rating: 5, message: "J'ai commandé le coffret 3 parfums et je ne regrette absolument pas. Chaque fragrance est une découverte. Le service client est aux petits soins." },
  { id: "fb-6", name: "Omar Chraibi",      avatarKey: "marine", avatarUrl: null, rating: 5, message: "Ma femme et moi utilisons les parfums Nahid depuis 6 mois. Nous sommes conquis par la longueur en bouche et la sophistication des compositions. Bravo à l'équipe !" },
];

// Two content sources feed this widget: `testimonials` (admin-curated
// marketing quotes, can carry a real uploaded photo) and `feedbacks`
// (organic customer submissions via the /reviews form, always shown
// with an emoji avatar bubble, never a photo). Normalized to one shape
// so the card rendering below doesn't need to know which source a
// given review came from.
const normalizeTestimonial = (t) => ({ id: `ts-${t.id}`, name: t.name, rating: t.rating, message: t.quote, avatarKey: null, avatarUrl: t.avatar_url || null });
const normalizeFeedback = (f) => ({ id: `fb-${f.id}`, name: `${f.first_name} ${f.last_name}`, rating: f.rating, message: f.message, avatarKey: f.avatar, avatarUrl: null });

const getAvatar = id => AVATARS.find(a => a.id === id) || AVATARS[0];

const Stars = ({ count }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map(n => (
      <FiStar key={n} size={14} fill={n <= count ? "#EF776A" : "none"} color={n <= count ? "#EF776A" : "#DDD"} strokeWidth={1.5} />
    ))}
  </div>
);

const AvatarBubble = ({ avatarKey, avatarUrl, name, size = 48 }) => {
  if (avatarUrl) {
    return <img src={avatarUrl} alt={name} title={name} style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,.12)", border: "2px solid white" }} />;
  }
  const av = getAvatar(avatarKey);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: av.bg, display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.42, boxShadow: "0 2px 8px rgba(0,0,0,.12)",
      border: "2px solid white",
    }} title={name}>
      {av.icon}
    </div>
  );
};

const ReviewsSection = ({ titleOverride }) => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(0);
  const perPage = 3;

  useEffect(() => {
    Promise.all([
      testimonialsApi.listActive().catch(() => []),
      feedbacksApi.listApproved().catch(() => []),
    ]).then(([testimonials, feedbacks]) => {
      const combined = [
        ...(Array.isArray(testimonials) ? testimonials.map(normalizeTestimonial) : []),
        ...(Array.isArray(feedbacks) ? feedbacks.map(normalizeFeedback) : []),
      ];
      setReviews(combined.length > 0 ? combined : FALLBACK);
    }).finally(() => setLoading(false));
  }, []);

  const pages   = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, page * perPage + perPage);
  const avg     = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <span style={styles.eyebrow}>{t("reviewsSection.eyebrow")}</span>
          <h2 style={styles.title}>{titleOverride || t("reviewsSection.title")}</h2>
          <div style={styles.aggregate}>
            <Stars count={5} />
            <span style={styles.score}>{avg}</span>
            <span style={styles.total}>{reviews.length} {t("reviewsSection.reviewsWord")}</span>
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingRow}>
            {[0, 1, 2].map(i => <div key={i} style={styles.skeleton} />)}
          </div>
        ) : (
          <div className="reviews-grid" style={styles.grid}>
            {visible.map((review, idx) => (
              <div key={review.id} style={{ ...styles.card, animationDelay: `${idx * 0.1}s` }}>
                <div style={styles.quote}>"</div>
                <p style={styles.comment}>{review.message}</p>
                <div style={styles.cardFooter}>
                  <AvatarBubble avatarKey={review.avatarKey} avatarUrl={review.avatarUrl} name={review.name} />
                  <div style={styles.reviewer}>
                    <div style={styles.reviewerTop}>
                      <span style={styles.reviewerName}>{review.name}</span>
                      <Stars count={review.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={styles.pagination}>
            <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0} style={{ ...styles.pageBtn, opacity: page === 0 ? 0.3 : 1 }}>
              <FiChevronLeft size={18} />
            </button>
            <div style={styles.dots}>
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i)} style={{ ...styles.dot, backgroundColor: i === page ? "#EF776A" : "#E0E0E0", width: i === page ? "24px" : "8px" }} />
              ))}
            </div>
            <button onClick={() => setPage(p => Math.min(p + 1, pages - 1))} disabled={page === pages - 1} style={{ ...styles.pageBtn, opacity: page === pages - 1 ? 0.3 : 1 }}>
              <FiChevronRight size={18} />
            </button>
          </div>
        )}

        {/* CTA */}
        <div style={styles.cta}>
          <p style={styles.ctaSub}>{t("reviewsSection.ctaSub")}</p>
          <button style={styles.ctaBtn} onClick={() => navigate("/reviews")}>
            {t("reviewsSection.ctaBtn")} <span style={{ ...styles.ctaArrow, ...(isRTL ? { transform: "scaleX(-1)" } : null) }}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: "100px 0", backgroundColor: "white" },
  header:  { textAlign: "center", marginBottom: "56px" },
  eyebrow: { display: "inline-block", fontSize: "0.68rem", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "#EF776A", marginBottom: "12px" },
  title:   { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: "400", color: "#1A1A1A", marginBottom: "16px", lineHeight: "1.2" },
  aggregate: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  score:   { fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: "600", color: "#1A1A1A" },
  total:   { fontSize: "0.85rem", color: "#9B9B9B" },
  grid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "24px", marginBottom: "40px" },
  card:    { backgroundColor: "#FAFAFA", borderRadius: "20px", padding: "32px", border: "1px solid #F0F0F0", display: "flex", flexDirection: "column", gap: "16px", position: "relative", transition: "box-shadow 0.3s ease" },
  quote:   { fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: "#EF776A", lineHeight: 0.8, opacity: 0.3, position: "absolute", top: "24px", insetInlineStart: "28px", userSelect: "none" },
  comment: { fontSize: "0.9rem", lineHeight: "1.7", color: "#3A3A3A", flex: 1, paddingTop: "20px" },
  cardFooter: { display: "flex", alignItems: "center", gap: "14px", paddingTop: "16px", borderTop: "1px solid #EBEBEB" },
  reviewer: { display: "flex", flexDirection: "column", gap: "4px" },
  reviewerTop: { display: "flex", alignItems: "center", gap: "10px" },
  reviewerName: { fontSize: "0.88rem", fontWeight: "600", color: "#1A1A1A" },
  pagination:  { display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginBottom: "40px" },
  pageBtn: { background: "none", border: "1.5px solid #E0E0E0", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1A1A1A", transition: "all 0.2s" },
  dots:    { display: "flex", gap: "6px", alignItems: "center" },
  dot:     { height: "8px", borderRadius: "4px", border: "none", cursor: "pointer", transition: "all 0.3s ease" },
  loadingRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "24px", marginBottom: "40px" },
  skeleton: { height: "220px", borderRadius: "20px", background: "linear-gradient(90deg,#F0F0F0 25%,#F8F8F8 50%,#F0F0F0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" },
  cta: { textAlign: "center", paddingTop: "12px" },
  ctaSub: { fontSize: "0.9rem", color: "#9B9B9B", marginBottom: "16px" },
  ctaBtn: { display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "1.5px solid #EF776A", color: "#EF776A", padding: "12px 32px", borderRadius: "999px", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em" },
  ctaArrow: { fontSize: "1rem", transition: "transform 0.2s" },
};

export default ReviewsSection;
