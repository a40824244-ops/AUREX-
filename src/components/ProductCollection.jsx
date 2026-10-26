import React, { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductCollection({
  products,
  allProducts,
  currency,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onOpenEngrave,
  onOpenVault
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Attar"];

  const pool = allProducts || products;
  const filteredProducts = selectedCategory === "All"
    ? products
    : pool.filter(p => {
        if (selectedCategory === "Attar") return p.category === "Attar";
        return true;
      });

  return (
    <section className="py-16 md:py-24 bg-[#f9f9f7] border-b border-[#d1c5b4]/30" id="collection">
      <div className="w-full px-5 md:px-10 lg:px-16 mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#775a19]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium">
              Featured Fragrances
            </span>
            <span className="h-px w-8 bg-[#775a19]"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1c1b] mb-4">
            Our Signature Perfumes
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#4e4639] font-light leading-relaxed">
            Handcrafted with pure natural oils, 100% alcohol-free, and bottled in elegant luxury crystal.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-sans transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#1a1c1b] text-[#dfba67] shadow-sm'
                    : 'bg-[#ffffff] text-[#4e4639] border border-[#d1c5b4]/40 hover:border-[#775a19]'
                }`}
              >
                {cat === "All" ? "All Perfumes" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Card Bento Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlist.some(item => item.id === product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onOpenEngrave={onOpenEngrave}
            />
          ))}
        </div>

        {/* Section Bottom Link */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenVault}
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#775a19] border-b border-[#775a19] pb-1 hover:text-[#1a1c1b] hover:border-[#1a1c1b] transition-colors"
          >
            <span>View All Fragrances In The Collection</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </div>
    </section>
  );
}
