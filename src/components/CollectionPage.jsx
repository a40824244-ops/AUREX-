import React, { useState, useMemo } from 'react';
import { TESTER_PRODUCTS } from '../data/products';

export default function CollectionPage({
  products = [],
  currency,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onOpenConsultation,
  onReturnHome
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'All', label: 'All Perfumes' },
    { id: 'Attar', label: 'Attar' },
    { id: 'Signature Blends', label: 'Signature Blends' },
    { id: 'Tester Vials', label: 'Tester Samples' }
  ];

  const allProducts = useMemo(
    () => [...products, ...TESTER_PRODUCTS],
    [products],
  );

  const formatPrice = (priceInUSD) => {
    const rates = {
      PKR: { rate: 1, symbol: 'Rs. ' },
      USD: { rate: 1, symbol: '$' },
      EUR: { rate: 0.92, symbol: '€' },
      GBP: { rate: 0.79, symbol: '£' },
      AED: { rate: 3.67, symbol: 'د.إ ' }
    };
    const current = rates[currency?.code] || rates.PKR;
    return `${current.symbol}${Math.round((priceInUSD || 0) * current.rate).toLocaleString()}`;
  };

  const filteredAndSortedProducts = useMemo(() => {
    let list = selectedCategory === 'All'
      ? [...allProducts]
      : allProducts.filter(p => {
          if (selectedCategory === 'Attar') return p.category === 'Attar';
          return p.category === selectedCategory;
        });

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rarity') {
      list.sort((a, b) => b.sillage - a.sillage);
    }
    return list;
  }, [allProducts, selectedCategory, sortBy]);

  return (
    <div className="bg-[#f9f9f7] text-[#1a1c1b] min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 pt-6">
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-sans text-[#7f7667]">
          <button
            onClick={onReturnHome}
            className="hover:text-[#775a19] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#775a19] font-medium">Royal Collection</span>
        </nav>
      </div>

      {/* ========================================== */}
      {/* HERO BANNER: Editorial White & Gold Header */}
      {/* ========================================== */}
      <section className="relative pt-12 pb-10 border-b border-[#d1c5b4]/20 text-center">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
          
          {/* Regal Archival Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 border border-[#c5a059]/40 bg-[#c5a059]/5">
            <span className="w-1.5 h-1.5 bg-[#c5a059] rotate-45 inline-block"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-semibold">
              Pure Handcrafted Perfumes
            </span>
            <span className="w-1.5 h-1.5 bg-[#c5a059] rotate-45 inline-block"></span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a1c1b] mb-3 tracking-tight font-normal">
            Royal Perfume Collection
          </h1>

          {/* Minimal 1-line Subtitle */}
          <p className="font-sans text-xs sm:text-sm text-[#4e4639] max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Pure attars, aged wild oudh, and long-lasting perfumes made 100% without alcohol.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 font-sans text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a1c1b] text-[#dfba67] border border-[#1a1c1b] shadow-sm'
                    : 'text-[#4e4639] hover:text-[#775a19] border border-[#d1c5b4]/40 hover:border-[#c5a059] bg-[#ffffff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* UTILITY BAR (Count & Sort) */}
      {/* ========================================== */}
      <section className="w-full border-b border-[#d1c5b4]/20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-3.5 flex justify-between items-center text-[#4e4639]">
          
          {/* Total Count */}
          <div className="flex items-center space-x-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#7f7667]">Showing</span>
            <span className="font-sans text-xs font-semibold text-[#1a1c1b]">
              {selectedCategory === 'Signature Blends' ? 'Coming Soon' : `${filteredAndSortedProducts.length} Perfumes`}
            </span>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <label htmlFor="collection-sort" className="font-sans text-[10px] uppercase tracking-widest text-[#7f7667]">
              Sort By:
            </label>
            <div className="relative">
              <select
                id="collection-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pr-7 pl-1 py-1 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-[#1a1c1b] border-0 border-b border-[#d1c5b4]/60 focus:ring-0 focus:border-[#775a19] focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rarity">Longest Lasting</option>
              </select>
              <svg className="w-3.5 h-3.5 absolute right-0 top-1.5 pointer-events-none text-[#4e4639]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* COLLECTION PRODUCT GRID */}
      {/* ========================================== */}
      <main className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-16">
        {selectedCategory === 'Signature Blends' ? (
          <div className="text-center py-16 sm:py-20 px-6 max-w-xl mx-auto bg-[#ffffff] border border-[#d1c5b4]/40 regal-shadow p-8 sm:p-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f4f4f2] border border-[#c5a059]/40 flex items-center justify-center text-[#775a19]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-semibold block mb-2">
              Exclusive Blends
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1c1b] mb-4 font-normal">
              Signature Perfume is Coming Soon
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#4e4639] font-light leading-relaxed mb-8 max-w-md mx-auto">
              Our signature perfume collection is currently being crafted with the finest natural oils. Stay tuned for the upcoming launch!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] font-sans text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-sm"
              >
                View All Perfumes
              </button>
              <a
                href="https://wa.me/923108116918?text=Hi%20AUREX!%20Please%20notify%20me%20when%20the%20Signature%20Perfumes%20launch."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Notify on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredAndSortedProducts.map((product) => {
            const isWishlisted = wishlist.some(w => w.id === product.id);
            return (
              <article
                key={product.id}
                className="group flex flex-col bg-[#ffffff] border border-[#d1c5b4]/30 hover:border-[#c5a059] transition-all duration-300 regal-shadow relative"
              >
                {/* Flacon Image Box */}
                <div
                  onClick={() => onQuickView(product)}
                  className="relative w-full aspect-[3/4] bg-[#f4f4f2] overflow-hidden flex items-center justify-center p-6 cursor-pointer"
                >
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#ffffff]/90 border border-[#c5a059]/40 font-sans text-[8px] uppercase tracking-widest text-[#775a19] z-10 font-medium">
                    {product.badge}
                  </span>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label={`Save ${product.name}`}
                    className={`absolute top-3 right-3 z-10 p-1.5 rounded-full bg-[#ffffff]/80 backdrop-blur-xs transition-colors cursor-pointer ${
                      isWishlisted ? 'text-[#ba1a1a]' : 'text-[#7f7667] hover:text-[#775a19]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  {/* Flacon Picture */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Desktop Hover Actions Bar */}
                  <div className="hidden md:flex absolute inset-0 bg-[#1a1c1b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-end pb-4 px-4 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full py-2.5 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] font-sans text-[10px] uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                      </svg>
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="w-full py-1.5 bg-[#ffffff]/95 text-[#1a1c1b] hover:bg-[#c5a059] hover:text-[#ffffff] font-sans text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow text-center">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-[#7f7667] mb-1.5">
                    {product.type} · {product.volume}
                  </span>
                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-serif text-lg text-[#1a1c1b] mb-1.5 font-normal group-hover:text-[#775a19] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs text-[#4e4639] font-light mb-4 line-clamp-1">
                    {product.subtitle}
                  </p>

                  <div className="mt-auto pt-3 border-t border-[#d1c5b4]/20 flex items-center justify-between mb-3">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#7f7667]">
                      Price
                    </span>
                    <span className="font-serif text-base text-[#775a19] font-normal">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  {/* Mobile Direct Action Buttons */}
                  <div className="md:hidden flex gap-2 pt-1">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-2 bg-[#1a1c1b] text-[#dfba67] font-sans text-[9px] uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                      </svg>
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => onQuickView(product)}
                      className="py-2 px-3 border border-[#c5a059] text-[#775a19] font-sans text-[9px] uppercase tracking-wider cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        )}
      </main>

    </div>
  );
}
