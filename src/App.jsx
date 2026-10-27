import React, { useEffect, useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeritagePillars from './components/HeritagePillars';
import ProductCollection from './components/ProductCollection';
import CraftsmanshipSection from './components/CraftsmanshipSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import CollectionPage from './components/CollectionPage';
import DealsPage from './components/DealsPage';
import AdminLoginGate from './components/admin/AdminLoginGate';

import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import EngravingModal from './components/EngravingModal';
import ConsultationModal from './components/ConsultationModal';
import SearchModal from './components/SearchModal';

import { PRODUCTS, ALL_COLLECTION_PRODUCTS, CURATED_DEALS, HERO_DEAL, TESTER_PRODUCTS } from './data/products';
import { api } from './services/api';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [storeProducts, setStoreProducts] = useState(ALL_COLLECTION_PRODUCTS);
  const newlyAddedProducts = storeProducts.filter(
    (product) => !ALL_COLLECTION_PRODUCTS.some((bundled) => bundled.id === product.id),
  );
  const featuredProducts = [...PRODUCTS, ...newlyAddedProducts.slice(-4)];

  useEffect(() => {
    let isMounted = true;
    api.getProducts()
      .then((response) => {
        if (!response.success || !Array.isArray(response.data)) {
          throw new Error('The products service returned an invalid response.');
        }
        if (isMounted) setStoreProducts(response.data);
      })
      .catch((error) => {
        console.warn('Could not load live products; showing the bundled catalog:', error.message);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Currency state (defaults to Pakistani Rupees - Rs)
  const [currency] = useState({ code: 'PKR', symbol: 'Rs. ', label: 'PKR (Rs)' });

  // Cart state (empty by default)
  const [cartItems, setCartItems] = useState([]);

  // Wishlist state (empty by default)
  const [wishlist, setWishlist] = useState([]);

  // Modals / Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [engraveProduct, setEngraveProduct] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product, engraving = null) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, engraving: engraving || item.engraving }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1, engraving }];
      }
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Engraving save
  const handleSaveEngraving = (product, text) => {
    handleAddToCart(product, text);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#1a1c1b] flex flex-col font-sans selection:bg-[#ffdea5] selection:text-[#261900]">

      {/* Admin Page — full-screen, no navbar/footer */}
      {currentPage === 'admin' ? (
        <AdminLoginGate onExit={() => handleNavigate('home')} />
      ) : (
        <>
          {/* 1. Announcement Bar */}
          <AnnouncementBar />

          {/* 2. Sticky Navbar with Page Navigation */}
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            cartCount={totalCartCount}
            wishlistCount={wishlist.length}
            onOpenCart={() => setCartOpen(true)}
            onOpenWishlist={() => setWishlistOpen(true)}
            onOpenConsultation={() => setConsultationOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
          />

          {/* View Switcher */}
          {currentPage === 'collection' ? (
            <CollectionPage
              products={storeProducts}
              currency={currency}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              onOpenConsultation={() => setConsultationOpen(true)}
              onReturnHome={() => handleNavigate('home')}
            />
          ) : currentPage === 'deals' ? (
            <DealsPage
              currency={currency}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              onReturnHome={() => handleNavigate('home')}
            />
          ) : (
            <main className="flex-1">
              {/* Hero Section */}
              <Hero
                onExploreClick={() => handleNavigate('collection')}
                onDealsClick={() => handleNavigate('deals')}
              />

              {/* Four Imperial Pillars (Heritage & Pure Ingredients) */}
              <HeritagePillars />

              {/* Product Collection Bento Grid */}
              <ProductCollection
                products={featuredProducts}
                allProducts={storeProducts}
                currency={currency}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                onOpenEngrave={(p) => setEngraveProduct(p)}
                onOpenVault={() => handleNavigate('collection')}
              />

              {/* Craftsmanship & Savoir-Faire */}
              <CraftsmanshipSection
                onOpenEngraveModal={() => setEngraveProduct(PRODUCTS[0])}
              />

              {/* Client Testimonials & Press Acclaim */}
              <TestimonialsSection />
            </main>
          )}

          {/* Shared Royal Footer */}
          <Footer
            onOpenConsultation={() => setConsultationOpen(true)}
            onOpenAdmin={() => handleNavigate('admin')}
          />

          {/* Slide-over Cart Drawer */}
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            currency={currency}
          />

          {/* Wishlist Drawer */}
          <WishlistDrawer
            isOpen={wishlistOpen}
            onClose={() => setWishlistOpen(false)}
            wishlist={wishlist}
            onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(i => i.id !== id))}
            onAddToCart={(p) => {
              handleAddToCart(p);
              setWishlistOpen(false);
            }}
            currency={currency}
          />

          {/* Quick View Inspection Modal */}
          <QuickViewModal
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            currency={currency}
            onAddToCart={handleAddToCart}
            onOpenEngrave={(p) => setEngraveProduct(p)}
          />

          {/* Custom Gold Engraving Modal */}
          <EngravingModal
            product={engraveProduct}
            isOpen={!!engraveProduct}
            onClose={() => setEngraveProduct(null)}
            onSaveEngraving={handleSaveEngraving}
          />

          {/* Bespoke Consultation Booking Modal */}
          <ConsultationModal
            isOpen={consultationOpen}
            onClose={() => setConsultationOpen(false)}
          />

          {/* Search Modal */}
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            products={[...storeProducts, ...TESTER_PRODUCTS, ...CURATED_DEALS, HERO_DEAL]}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            currency={currency}
          />

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/923108116918"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            title="Chat with us on WhatsApp (0310 8116918)"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.184 1.564 5.946l-1.664 6.082 6.262-1.642c1.71.933 3.666 1.464 5.748 1.464 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.87 0-3.616-.541-5.086-1.476l-.365-.232-3.774.99 1.007-3.678-.255-.407c-1.026-1.636-1.577-3.535-1.577-5.547 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
          </a>
        </>
      )}
    </div>
  );
}
