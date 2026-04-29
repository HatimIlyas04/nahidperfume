import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX, FiShoppingBag } from "react-icons/fi";

const CROSS_SELL = [
  {
    id: 99,
    name: "Oud Royal",
    price: 890,
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&q=80",
  },
  {
    id: 98,
    name: "Rose Mystique",
    price: 690,
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=200&q=80",
  },
  {
    id: 97,
    name: "Amber Noir",
    price: 750,
    image_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=200&q=80",
  },
];

const CartDrawer = ({ isOpen, onClose, cart, removeFromCart, updateQuantity, addToCart }) => {
  const fmt = (n) => Math.round(n).toLocaleString("fr-MA");

  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const FREE_SHIPPING = 500;
  const shipping = subtotal >= FREE_SHIPPING ? 0 : 30;
  const total = subtotal + shipping;
  const progress = Math.min((subtotal / FREE_SHIPPING) * 100, 100);
  const remaining = FREE_SHIPPING - subtotal;

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const crossSellItems = CROSS_SELL.filter(
    (cs) => !cart.some((c) => c.id === cs.id)
  ).slice(0, 2);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          ...styles.overlay,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
        }}
      />

      {/* Drawer */}
      <div style={{
        ...styles.drawer,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <FiShoppingBag size={18} />
            <h2 style={styles.title}>Mon Panier</h2>
            {cart.length > 0 && (
              <span style={styles.count}>{cart.length}</span>
            )}
          </div>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Fermer">
            <FiX size={22} />
          </button>
        </div>

        {/* Free shipping progress */}
        <div style={styles.shippingBar}>
          {subtotal >= FREE_SHIPPING ? (
            <p style={styles.shippingMsg}>
              🎉 <strong>Livraison gratuite</strong> débloquée !
            </p>
          ) : (
            <p style={styles.shippingMsg}>
              Plus que <strong>{fmt(remaining)} MAD</strong> pour la livraison gratuite
            </p>
          )}
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        </div>

        {/* Scrollable body */}
        <div style={styles.body}>
          {cart.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🛒</div>
              <p style={styles.emptyTitle}>Votre panier est vide</p>
              <p style={styles.emptyText}>Découvrez nos parfums d'exception</p>
              <button onClick={onClose} style={styles.emptyBtn}>
                Explorer →
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div style={styles.items}>
                {cart.map((item) => {
                  const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                  return (
                    <div key={item.id} style={styles.item}>
                      <div style={styles.imgWrap}>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          loading="lazy"
                          style={styles.itemImg}
                        />
                      </div>
                      <div style={styles.itemInfo}>
                        <span style={styles.itemName}>{item.name}</span>
                        {item.category && (
                          <span style={styles.itemCat}>{item.category}</span>
                        )}
                        <span style={styles.itemPrice}>{fmt(price)} MAD</span>
                        <div style={styles.qtyRow}>
                          <div style={styles.qtyCtrl}>
                            <button
                              style={styles.qtyBtn}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >−</button>
                            <span style={styles.qtyNum}>{item.quantity}</span>
                            <button
                              style={styles.qtyBtn}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >+</button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={styles.removeBtn}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                      <div style={styles.itemTotal}>
                        {fmt(price * item.quantity)} MAD
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cross-sell */}
              {crossSellItems.length > 0 && (
                <div style={styles.crossSell}>
                  <p style={styles.crossSellTitle}>Vous aimerez aussi</p>
                  <div style={styles.crossSellGrid}>
                    {crossSellItems.map((p) => (
                      <div key={p.id} style={styles.crossSellCard}>
                        <img
                          src={p.image_url}
                          alt={p.name}
                          loading="lazy"
                          style={styles.crossSellImg}
                        />
                        <div style={styles.crossSellInfo}>
                          <span style={styles.crossSellName}>{p.name}</span>
                          <span style={styles.crossSellPrice}>{fmt(p.price)} MAD</span>
                        </div>
                        <button
                          onClick={() => addToCart({ ...p, quantity: 1 }, 1)}
                          style={styles.crossSellBtn}
                        >
                          + Ajouter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Sous-total</span>
              <span style={styles.summaryValue}>{fmt(subtotal)} MAD</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Livraison</span>
              <span style={{
                ...styles.summaryValue,
                color: shipping === 0 ? "#2E7D32" : "#1A1A1A",
              }}>
                {shipping === 0 ? "Gratuite 🎉" : `${fmt(shipping)} MAD`}
              </span>
            </div>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalValue}>{fmt(total)} MAD</span>
            </div>
            <Link to="/checkout" onClick={onClose} style={{ display: "block", marginTop: "16px" }}>
              <button style={styles.checkoutBtn}>
                Procéder au paiement →
              </button>
            </Link>
            <p style={styles.secureNote}>🔒 Paiement sécurisé · Livraison Maroc</p>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1100,
    transition: "opacity 0.35s ease",
    backdropFilter: "blur(2px)",
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "420px",
    maxWidth: "100vw",
    backgroundColor: "white",
    zIndex: 1101,
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderBottom: "1px solid #F2F2F2",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    fontWeight: "500",
    color: "#1A1A1A",
    margin: 0,
  },
  count: {
    backgroundColor: "#EF776A",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.65rem",
    fontWeight: "700",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#1A1A1A",
    padding: "6px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  shippingBar: {
    padding: "14px 24px",
    backgroundColor: "#FFF8F7",
    borderBottom: "1px solid #F2F2F2",
  },
  shippingMsg: {
    fontSize: "0.8rem",
    color: "#555",
    marginBottom: "8px",
    lineHeight: "1.4",
  },
  progressTrack: {
    height: "4px",
    backgroundColor: "#F0F0F0",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#EF776A",
    borderRadius: "2px",
    transition: "width 0.5s ease",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "0 24px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "60px 0",
    textAlign: "center",
  },
  emptyIcon: { fontSize: "3rem", opacity: 0.3, marginBottom: "16px" },
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.4rem",
    fontWeight: "400",
    color: "#1A1A1A",
    marginBottom: "8px",
  },
  emptyText: { fontSize: "0.85rem", color: "#9B9B9B", marginBottom: "24px" },
  emptyBtn: {
    backgroundColor: "#EF776A",
    color: "white",
    border: "none",
    padding: "12px 28px",
    borderRadius: "999px",
    fontSize: "0.88rem",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  items: { paddingTop: "8px" },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    padding: "18px 0",
    borderBottom: "1px solid #F7F7F7",
    position: "relative",
  },
  imgWrap: {
    width: "72px",
    height: "72px",
    borderRadius: "10px",
    overflow: "hidden",
    flexShrink: 0,
    backgroundColor: "#F7F7F7",
  },
  itemImg: { width: "100%", height: "100%", objectFit: "cover" },
  itemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  itemName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#1A1A1A",
  },
  itemCat: { fontSize: "0.68rem", color: "#EF776A", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase" },
  itemPrice: { fontSize: "0.8rem", color: "#9B9B9B" },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "8px",
  },
  qtyCtrl: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #E8E8E8",
    borderRadius: "999px",
    overflow: "hidden",
  },
  qtyBtn: {
    width: "28px",
    height: "28px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#1A1A1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  },
  qtyNum: {
    minWidth: "24px",
    textAlign: "center",
    fontSize: "0.85rem",
    fontWeight: "600",
    borderLeft: "1px solid #F2F2F2",
    borderRight: "1px solid #F2F2F2",
    lineHeight: "28px",
  },
  removeBtn: {
    background: "none",
    border: "none",
    fontSize: "0.72rem",
    color: "#C62828",
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
  },
  itemTotal: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#1A1A1A",
    flexShrink: 0,
  },
  crossSell: {
    padding: "20px 0",
    borderTop: "1px solid #F2F2F2",
    marginTop: "8px",
  },
  crossSellTitle: {
    fontSize: "0.72rem",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9B9B9B",
    marginBottom: "14px",
  },
  crossSellGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  crossSellCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#FAFAFA",
    borderRadius: "12px",
  },
  crossSellImg: {
    width: "52px",
    height: "52px",
    borderRadius: "8px",
    objectFit: "cover",
    flexShrink: 0,
  },
  crossSellInfo: { flex: 1, display: "flex", flexDirection: "column", gap: "2px" },
  crossSellName: { fontSize: "0.85rem", fontWeight: "500", color: "#1A1A1A" },
  crossSellPrice: { fontSize: "0.78rem", color: "#6B6B6B" },
  crossSellBtn: {
    backgroundColor: "#1A1A1A",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "7px 14px",
    fontSize: "0.72rem",
    fontWeight: "600",
    cursor: "pointer",
    flexShrink: 0,
    fontFamily: "inherit",
  },
  footer: {
    padding: "20px 24px",
    borderTop: "1px solid #F2F2F2",
    backgroundColor: "white",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  summaryLabel: { fontSize: "0.82rem", color: "#6B6B6B" },
  summaryValue: { fontSize: "0.85rem", fontWeight: "500", color: "#1A1A1A" },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #F2F2F2",
  },
  totalLabel: { fontSize: "0.9rem", fontWeight: "700", color: "#1A1A1A" },
  totalValue: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
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
    letterSpacing: "0.01em",
    fontFamily: "inherit",
    transition: "background 0.2s",
  },
  secureNote: {
    textAlign: "center",
    fontSize: "0.68rem",
    color: "#9B9B9B",
    marginTop: "10px",
  },
};

export default CartDrawer;