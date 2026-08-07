import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "nahid_cart_v2";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/** Cart line shape:
 * {
 *   cartItemId, item_type: 'ready_pack'|'ready_pack_customized'|'custom_pack',
 *   pack_id, title, image, price, quantity,
 *   perfumes: [{ perfume_id, name, image_url }],
 *   replacements: [{ position, newPerfumeId }] // only for ready_pack_customized
 * }
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    persist(cart);
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === item.cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === item.cartItemId ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

/** Converts the cart into the /api/orders `items[]` payload shape. */
export function cartToOrderItems(cart) {
  return cart.map((item) => {
    if (item.item_type === "custom_pack") {
      return {
        item_type: "custom_pack",
        perfume_ids: item.perfumes.map((p) => p.perfume_id),
        quantity: item.quantity,
      };
    }
    if (item.item_type === "ready_pack_customized") {
      return {
        item_type: "ready_pack_customized",
        pack_id: item.pack_id,
        replacements: item.replacements,
        quantity: item.quantity,
      };
    }
    return { item_type: "ready_pack", pack_id: item.pack_id, quantity: item.quantity };
  });
}
