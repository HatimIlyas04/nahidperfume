import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import axios from "axios";

import { WishlistProvider } from "./context/WishlistContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import PageLoader from "./components/PageLoader";

const Home            = lazy(() => import("./pages/Home"));
const PacksListing    = lazy(() => import("./pages/PacksListing"));
const PackDetails     = lazy(() => import("./pages/PackDetails"));
const BuildYourOwnPack= lazy(() => import("./pages/BuildYourOwnPack"));
const Cart             = lazy(() => import("./pages/Cart"));
const AdminApp         = lazy(() => import("./admin/AdminApp"));
const Checkout        = lazy(() => import("./pages/Checkout"));
const NotreHistoire   = lazy(() => import("./pages/NotreHistoire"));
const Wishlist        = lazy(() => import("./pages/Wishlist"));
const Reviews         = lazy(() => import("./pages/Reviews"));
const OrderTracking   = lazy(() => import("./pages/OrderTracking"));
const Contact         = lazy(() => import("./pages/Contact"));
const Faq              = lazy(() => import("./pages/Faq"));
const ThankYou         = lazy(() => import("./pages/ThankYou"));

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : "https://nahidperfume-backend.onrender.com");

// Keep backend awake (ping every 14 min)
setInterval(() => axios.get("/api/ping").catch(() => {}), 14 * 60 * 1000);

function StorefrontChrome({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return children;
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      {children}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <StorefrontChrome>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/"                 element={<Home />} />
                  <Route path="/notre-histoire"   element={<NotreHistoire />} />
                  <Route path="/packs"            element={<PacksListing />} />
                  <Route path="/packs/:id"        element={<PackDetails />} />
                  <Route path="/build-your-pack"  element={<BuildYourOwnPack />} />
                  <Route path="/cart"             element={<Cart />} />
                  <Route path="/checkout"         element={<Checkout />} />
                  <Route path="/wishlist"         element={<Wishlist />} />
                  <Route path="/reviews"          element={<Reviews />} />
                  <Route path="/track-order"      element={<OrderTracking />} />
                  <Route path="/contact"          element={<Contact />} />
                  <Route path="/faq"              element={<Faq />} />
                  <Route path="/thank-you"        element={<ThankYou />} />
                  <Route path="/admin/*"          element={<AdminApp />} />
                </Routes>
              </Suspense>
            </StorefrontChrome>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </LanguageProvider>
  );
}

export default App;
