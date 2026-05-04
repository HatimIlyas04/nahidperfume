import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { WishlistProvider } from "./context/WishlistContext";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import NotreHistoire from "./pages/NotreHistoire";
import Navbar from "./components/Navbar";
import CollectionFemme from "./pages/CollectionFemme";
import CollectionHomme from "./pages/CollectionHomme";
import CollectionUnisex from "./pages/CollectionUnisex";
import OriginalsPage from "./pages/OriginalsPage";
import Catalogue from "./pages/Catalogue";
import Wishlist from "./pages/Wishlist";

axios.defaults.baseURL = "https://nahidperfume-backend.onrender.com";
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
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item =>
        item.id === product.id || item.packId === product.packId
      );
      let newCart;
      if (existing) {
        newCart = prevCart.map(item =>
          (item.id === product.id || item.packId === product.packId)
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
      const newCart = prevCart.filter(item =>
        item.id !== productId && item.packId !== productId
      );
      localStorage.setItem("nahid_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        (item.id === productId || item.packId === productId)
          ? { ...item, quantity }
          : item
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
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/notre-histoire" element={<NotreHistoire />} />
            <Route path="/originals" element={<OriginalsPage addToCart={addToCart} />} />
            <Route path="/catalogue" element={<Catalogue addToCart={addToCart} />} />
            <Route path="/collection/femme" element={<CollectionFemme addToCart={addToCart} />} />
            <Route path="/collection/homme" element={<CollectionHomme addToCart={addToCart} />} />
            <Route path="/collection/unisex" element={<CollectionUnisex addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            <Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} />
            <Route path="/admin" element={<Admin isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </LanguageProvider>
  );
}

export default App;