import { useState } from "react";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const REVIEWS = [
  {
    id: 1,
    name: "Yasmine El Amrani",
    city: "Casablanca",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    rating: 5,
    date: "Mars 2025",
    product: "Oud Mystique",
    comment: "Un parfum absolument envoûtant. L'oud est profond sans être écrasant, avec une touche florale qui le rend unique. Je reçois des compliments à chaque fois que je le porte.",
  },
  {
    id: 2,
    name: "Karim Bensaid",
    city: "Marrakech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    rating: 5,
    date: "Janvier 2025",
    product: "Rose Mystique",
    comment: "J'offre Nahid à toute ma famille maintenant. La qualité est exceptionnelle et les flacons sont magnifiques. La livraison était rapide et l'emballage très soigné.",
  },
  {
    id: 3,
    name: "Salma Tazi",
    city: "Rabat",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    rating: 5,
    date: "Février 2025",
    product: "Amber Noir",
    comment: "Amber Noir est mon coup de cœur absolu. Il tient toute la journée et évolue magnifiquement. Le rapport qualité-prix est imbattable pour un parfum de cette qualité.",
  },
  {
    id: 4,
    name: "Hassan Alaoui",
    city: "Fès",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    rating: 5,
    date: "Avril 2025",
    product: "Oud Royal",
    comment: "Enfin un parfum marocain qui rivalise avec les grandes maisons. Nahid a trouvé l'équilibre parfait entre tradition et modernité. Je suis client fidèle depuis le début.",
  },
  {
    id: 5,
    name: "Nadia Berrada",
    city: "Agadir",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80",
    rating: 5,
    date: "Mars 2025",
    product: "Rose Mystique",
    comment: "J'ai commandé le coffret 3 parfums et je ne regrette absolument pas. Chaque fragrance est une découverte. Le service client est aux petits soins.",
  },
  {
    id: 6,
    name: "Omar Chraibi",
    city: "Tanger",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    rating: 5,
    date: "Mai 2025",
    product: "Amber Noir",
    comment: "Ma femme et moi utilisons les parfums Nahid depuis 6 mois. Nous sommes conquis par la longueur en bouche et la sophistication des compositions. Bravo à l'équipe !",
  },
];

const Stars = ({ count }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <FiStar
        key={n}
        size={14}
        fill={n <= count ? "#EF776A" : "none"}
        color={n <= count ? "#EF776A" : "#DDD"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const ReviewsSection = () => {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(REVIEWS.length / perPage);
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <span style={styles.eyebrow}>✦ TÉMOIGNAGES</span>
          <h2 style={styles.title}>Ils ont trouvé leur signature</h2>
          <div style={styles.aggregate}>
            <Stars count={5} />
            <span style={styles.score}>{avgRating}</span>
            <span style={styles.total}>sur {REVIEWS.length} avis</span>
          </div>
        </div>

        <div className="reviews-grid" style={styles.grid}>
          {visible.map((review, idx) => (
            <div key={review.id} style={{
              ...styles.card,
              animationDelay: `${idx * 0.1}s`,
            }}>
              {/* Quote mark */}
              <div style={styles.quote}>"</div>

              <p style={styles.comment}>{review.comment}</p>

              <div style={styles.cardFooter}>
                <img
                  src={review.avatar}
                  alt={review.name}
                  loading="lazy"
                  style={styles.avatar}
                />
                <div style={styles.reviewer}>
                  <div style={styles.reviewerTop}>
                    <span style={styles.reviewerName}>{review.name}</span>
                    <Stars count={review.rating} />
                  </div>
                  <span style={styles.reviewerMeta}>
                    {review.city} · {review.date} · <em>{review.product}</em>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            style={{ ...styles.pageBtn, opacity: page === 0 ? 0.3 : 1 }}
          >
            <FiChevronLeft size={18} />
          </button>

          <div style={styles.dots}>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  ...styles.dot,
                  backgroundColor: i === page ? "#EF776A" : "#E0E0E0",
                  width: i === page ? "24px" : "8px",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, pages - 1))}
            disabled={page === pages - 1}
            style={{ ...styles.pageBtn, opacity: page === pages - 1 ? 0.3 : 1 }}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "100px 0",
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    marginBottom: "56px",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.68rem",
    fontWeight: "700",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#EF776A",
    marginBottom: "12px",
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: "400",
    color: "#1A1A1A",
    marginBottom: "16px",
    lineHeight: "1.2",
  },
  aggregate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  score: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  total: {
    fontSize: "0.85rem",
    color: "#9B9B9B",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#FAFAFA",
    borderRadius: "20px",
    padding: "32px",
    border: "1px solid #F0F0F0",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "relative",
    transition: "box-shadow 0.3s ease",
  },
  quote: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "4rem",
    color: "#EF776A",
    lineHeight: 0.8,
    opacity: 0.3,
    position: "absolute",
    top: "24px",
    left: "28px",
    userSelect: "none",
  },
  comment: {
    fontSize: "0.9rem",
    lineHeight: "1.7",
    color: "#3A3A3A",
    flex: 1,
    paddingTop: "20px",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    paddingTop: "16px",
    borderTop: "1px solid #EBEBEB",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
    border: "2px solid white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  reviewer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  reviewerTop: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  reviewerName: {
    fontSize: "0.88rem",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  reviewerMeta: {
    fontSize: "0.72rem",
    color: "#9B9B9B",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },
  pageBtn: {
    background: "none",
    border: "1.5px solid #E0E0E0",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1A1A1A",
    transition: "all 0.2s",
  },
  dots: { display: "flex", gap: "6px", alignItems: "center" },
  dot: {
    height: "8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default ReviewsSection;