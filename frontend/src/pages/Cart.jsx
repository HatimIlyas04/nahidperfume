import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return sum + price * item.quantity;
  }, 0);

  // Livraison gratuite dès 500 MAD, sinon 30 MAD
  const shipping = subtotal >= 500 ? 0 : 30;
  const total = subtotal + shipping;

  const fmt = (n) => Math.round(n).toLocaleString("fr-MA");

  if (cart.length === 0) {
    return (
      <div style={cartStyles.emptyPage}>
        <div style={cartStyles.emptyContent}>
          <div style={cartStyles.emptyIcon}>🛒</div>
          <h2 style={cartStyles.emptyTitle}>Votre panier est vide</h2>
          <p style={cartStyles.emptyText}>
            Découvrez notre sélection de parfums d'exception et trouvez votre signature olfactive.
          </p>
          <Link to="/" style={cartStyles.shopLink}>
            Explorer nos parfums →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={cartStyles.page}>
      <div className="container">
        {/* Header */}
        <div style={cartStyles.header}>
          <div>
            <h1 style={cartStyles.title}>Mon Panier</h1>
            <p style={cartStyles.subtitle}>{cart.length} article{cart.length > 1 ? "s" : ""}</p>
          </div>
          <Link to="/" style={cartStyles.continueLink}>
            ← Continuer les achats
          </Link>
        </div>

        {/* Grid */}
        <div className="cart-container" style={cartStyles.cartContainer}>
          {/* Items */}
          <div style={cartStyles.itemsCol}>
            {/* Column headers */}
            <div style={cartStyles.colHeaders}>
              <span>Produit</span>
              <span style={{ textAlign: "center" }}>Quantité</span>
              <span className="cart-item-total" style={{ textAlign: "right" }}>Total</span>
            </div>

            {cart.map((item) => {
              const itemPrice =
                typeof item.price === "string" ? parseFloat(item.price) : item.price;
              const itemTotal = itemPrice * item.quantity;

              return (
                <div key={item.id} className="cart-item" style={cartStyles.cartItem}>
                  {/* Product info */}
                  <div style={cartStyles.productCol}>
                    <div style={cartStyles.imgWrapper}>
                      <img
                        src={item.image_url}
                        alt={item.name}
                        style={cartStyles.itemImg}
                      />
                    </div>
                    <div style={cartStyles.itemInfo}>
                      <Link to={`/product/${item.id}`} style={cartStyles.itemName}>
                        {item.name}
                      </Link>
                      {item.category && (
                        <span style={cartStyles.itemCategory}>{item.category}</span>
                      )}
                      <span style={cartStyles.itemUnitPrice}>
                        {fmt(itemPrice)} MAD / pièce
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={cartStyles.removeBtn}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div style={cartStyles.qtyCol}>
                    <div style={cartStyles.qtyControls}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={cartStyles.qtyBtn}
                      >
                        −
                      </button>
                      <span style={cartStyles.qtyValue}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={cartStyles.qtyBtn}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="cart-item-total" style={cartStyles.totalCol}>
                    {fmt(itemTotal)} MAD
                  </div>

                  {/* Remove (desktop) */}
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    style={cartStyles.deleteBtnDesktop}
                    title="Supprimer"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div style={cartStyles.summaryCol}>
            <div style={cartStyles.summaryCard}>
              <h3 style={cartStyles.summaryTitle}>Récapitulatif</h3>

              <div style={cartStyles.summaryRow}>
                <span style={cartStyles.summaryLabel}>Sous-total</span>
                <span style={cartStyles.summaryValue}>{fmt(subtotal)} MAD</span>
              </div>

              <div style={cartStyles.summaryRow}>
                <span style={cartStyles.summaryLabel}>Livraison</span>
                <span style={{
                  ...cartStyles.summaryValue,
                  color: shipping === 0 ? "#2E7D32" : "#2D2D2D",
                }}>
                  {shipping === 0 ? "Gratuite 🎉" : `${fmt(shipping)} MAD`}
                </span>
              </div>

              {subtotal > 0 && subtotal < 500 && (
                <div style={cartStyles.shippingProgress}>
                  <div style={cartStyles.progressTrack}>
                    <div
                      style={{
                        ...cartStyles.progressFill,
                        width: `${Math.min((subtotal / 500) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p style={cartStyles.shippingNote}>
                    Encore {fmt(500 - subtotal)} MAD pour la livraison gratuite
                  </p>
                </div>
              )}

              <div style={cartStyles.divider} />

              <div style={cartStyles.totalRow}>
                <span style={cartStyles.totalLabel}>Total</span>
                <span style={cartStyles.totalValue}>{fmt(total)} MAD</span>
              </div>

              <Link to="/checkout" style={{ display: "block" }}>
                <button style={cartStyles.checkoutBtn}>
                  Procéder au paiement →
                </button>
              </Link>

              <div style={cartStyles.securityNote}>
                🔒 Paiement 100% sécurisé · Livraison partout au Maroc
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const cartStyles = {
  page: {
    backgroundColor: "#FAFAFA",
    minHeight: "70vh",
    padding: "48px 0 80px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "16px",
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2rem, 4vw, 2.8rem)",
    fontWeight: "400",
    color: "#1A1A1A",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "0.85rem",
    color: "#9B9B9B",
  },
  continueLink: {
    fontSize: "0.82rem",
    color: "#6B6B6B",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  emptyPage: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  emptyContent: {
    textAlign: "center",
    maxWidth: "400px",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
    opacity: 0.4,
  },
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.8rem",
    fontWeight: "400",
    color: "#1A1A1A",
    marginBottom: "12px",
  },
  emptyText: {
    fontSize: "0.9rem",
    color: "#9B9B9B",
    lineHeight: "1.6",
    marginBottom: "28px",
  },
  shopLink: {
    display: "inline-block",
    backgroundColor: "#EF776A",
    color: "white",
    padding: "13px 28px",
    borderRadius: "999px",
    fontSize: "0.9rem",
    fontWeight: "500",
    textDecoration: "none",
    transition: "background 0.2s",
  },
  cartContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: "32px",
    alignItems: "start",
  },
  itemsCol: {
    backgroundColor: "white",
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid #F2F2F2",
  },
  colHeaders: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto auto",
    gap: "16px",
    padding: "14px 24px",
    borderBottom: "1px solid #F2F2F2",
    fontSize: "0.72rem",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9B9B9B",
  },
  cartItem: {
    display: "grid",
    gridTemplateColumns: "1fr auto 120px 36px",
    gap: "16px",
    padding: "20px 24px",
    borderBottom: "1px solid #F2F2F2",
    alignItems: "center",
  },
  productCol: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  imgWrapper: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    overflow: "hidden",
    flexShrink: 0,
    backgroundColor: "#F7F7F7",
  },
  itemImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  itemName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    fontWeight: "500",
    color: "#1A1A1A",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  itemCategory: {
    fontSize: "0.72rem",
    color: "#EF776A",
    fontWeight: "600",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  itemUnitPrice: {
    fontSize: "0.8rem",
    color: "#9B9B9B",
  },
  removeBtn: {
    background: "none",
    border: "none",
    fontSize: "0.75rem",
    color: "#C62828",
    cursor: "pointer",
    padding: "0",
    textAlign: "left",
    marginTop: "4px",
    fontFamily: "inherit",
  },
  qtyCol: {
    display: "flex",
    justifyContent: "center",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #E8E8E8",
    borderRadius: "999px",
    overflow: "hidden",
  },
  qtyBtn: {
    width: "34px",
    height: "34px",
    background: "none",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    color: "#1A1A1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s",
    fontFamily: "inherit",
  },
  qtyValue: {
    width: "32px",
    textAlign: "center",
    fontSize: "0.9rem",
    fontWeight: "600",
    borderLeft: "1px solid #F2F2F2",
    borderRight: "1px solid #F2F2F2",
    lineHeight: "34px",
  },
  totalCol: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "right",
  },
  deleteBtnDesktop: {
    background: "none",
    border: "none",
    fontSize: "0.9rem",
    color: "#DDDDDD",
    cursor: "pointer",
    transition: "color 0.2s",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontFamily: "inherit",
  },
  summaryCol: {},
  summaryCard: {
    backgroundColor: "white",
    borderRadius: "18px",
    padding: "28px",
    border: "1px solid #F2F2F2",
    position: "sticky",
    top: "88px",
  },
  summaryTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: "24px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },
  summaryLabel: {
    fontSize: "0.85rem",
    color: "#6B6B6B",
  },
  summaryValue: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#1A1A1A",
  },
  shippingProgress: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  progressTrack: {
    height: "4px",
    backgroundColor: "#F2F2F2",
    borderRadius: "2px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#EF776A",
    borderRadius: "2px",
    transition: "width 0.4s ease",
  },
  shippingNote: {
    fontSize: "0.75rem",
    color: "#EF776A",
    textAlign: "center",
  },
  divider: {
    height: "1px",
    backgroundColor: "#F2F2F2",
    margin: "20px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  totalLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  totalValue: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  checkoutBtn: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#EF776A",
    color: "white",
    border: "none",
    borderRadius: "999px",
    fontSize: "0.92rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s",
    letterSpacing: "0.01em",
    fontFamily: "inherit",
  },
  securityNote: {
    textAlign: "center",
    fontSize: "0.68rem",
    color: "#9B9B9B",
    marginTop: "14px",
    lineHeight: "1.5",
  },
};

export default Cart;