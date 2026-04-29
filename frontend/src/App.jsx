import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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


axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const [cart, setCart] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    loadCartFromStorage();

    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Fonction pour charger le panier
  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem("nahid_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (e) {
        console.error("Erreur chargement panier:", e);
        setCart([]);
      }
    }
  };

  // Sauvegarder le panier dans localStorage à chaque changement
  const saveCartToStorage = (newCart) => {
    localStorage.setItem("nahid_cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  // Ajouter au panier
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      let newCart;

      if (existing) {
        newCart = prevCart.map(item =>
          item.id === product.id
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

  // Retirer du panier
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem("nahid_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Mettre à jour la quantité
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("nahid_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("nahid_cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/notre-histoire" element={<NotreHistoire />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              isAdminLoggedIn={isAdminLoggedIn}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
            />
          }
        />
        <Route path="/collection/femme" element={<CollectionFemme addToCart={addToCart} />} />
        <Route path="/collection/homme" element={<CollectionHomme addToCart={addToCart} />} />
        <Route path="/collection/unisex" element={<CollectionUnisex addToCart={addToCart} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;