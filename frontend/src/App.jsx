import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

import { WishlistProvider } from "./context/WishlistContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";

const Home            = lazy(() => import("./pages/Home"));
const Cart            = lazy(() => import("./pages/Cart"));
const ProductDetails  = lazy(() => import("./pages/ProductDetails"));
const Admin           = lazy(() => import("./pages/Admin"));
const Checkout        = lazy(() => import("./pages/Checkout"));
const NotreHistoire   = lazy(() => import("./pages/NotreHistoire"));
const CollectionFemme = lazy(() => import("./pages/CollectionFemme"));
const CollectionHomme = lazy(() => import("./pages/CollectionHomme"));
const CollectionUnisex= lazy(() => import("./pages/CollectionUnisex"));
const OriginalsPage   = lazy(() => import("./pages/OriginalsPage"));
const Catalogue       = lazy(() => import("./pages/Catalogue"));
const Wishlist        = lazy(() => import("./pages/Wishlist"));

axios.defaults.baseURL = "https://nahidperfume-backend.onrender.com";

// Keep Render.com backend awake (ping every 14 min)
setInterval(() => axios.get("/api/ping").catch(() => {}), 14 * 60 * 1000);

function App() {
  const [cart, setCart] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    loadCartFromStorage();
    const token = localStorage.getItem("adminToken");
    if (token) setIsAdminLoggedIn(true);
  }, []);

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem("nahid_cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch { setCart([]); }
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item =>
        item.id === product.id ||
        (product.packId != null && item.packId === product.packId)
      );
      let newCart;
      if (existing) {
        newCart = prevCart.map(item =>
          (item.id === product.id || (product.packId != null && item.packId === product.packId))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }
      localStorage.setItem("nahid_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId && item.packId !== productId);
      localStorage.setItem("nahid_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        (item.id === productId || item.packId === productId) ? { ...item, quantity } : item
      );
      localStorage.setItem("nahid_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("nahid_cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <LanguageProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Navbar
            cartCount={cartCount}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
          />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/"                    element={<Home addToCart={addToCart} />} />
              <Route path="/notre-histoire"      element={<NotreHistoire />} />
              <Route path="/originals"           element={<OriginalsPage addToCart={addToCart} />} />
              <Route path="/catalogue"           element={<Catalogue addToCart={addToCart} />} />
              <Route path="/collection/femme"    element={<CollectionFemme addToCart={addToCart} />} />
              <Route path="/collection/homme"    element={<CollectionHomme addToCart={addToCart} />} />
              <Route path="/collection/unisex"   element={<CollectionUnisex addToCart={addToCart} />} />
              <Route path="/product/:id"         element={<ProductDetails addToCart={addToCart} />} />
              <Route path="/cart"                element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
              <Route path="/checkout"            element={<Checkout cart={cart} clearCart={clearCart} />} />
              <Route path="/wishlist"            element={<Wishlist addToCart={addToCart} />} />
              <Route path="/admin"               element={<Admin isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </WishlistProvider>
    </LanguageProvider>
  );
}

export default App;
