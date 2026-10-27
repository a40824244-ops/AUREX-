import React from 'react';
import { HERO_DEAL, CURATED_DEALS } from '../data/products';

export default function DealsPage({
  currency,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onReturnHome
}) {
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

  const isHeroWishlisted = wishlist.some(w => w.id === HERO_DEAL.id);

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
          <span className="text-[#775a19] font-medium">Special Deals &amp; Gift Sets</span>
        </nav>
      </div>

      {/* ========================================== */}
      {/* MINIMAL PAGE HERO */}
      {/* ========================================== */}
      <section className="pt-12 pb-10 px-5 md:px-10 lg:px-16 mx-auto text-center max-w-4xl">
        {/* Privilege Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 mb-5 border border-[#c5a059]/40 bg-[#f4f4f2]">
          <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full"></span>
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#775a19] font-semibold">
            LIMITED TIME OFFERS
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a1c1b] mb-4 font-normal tracking-tight">
          Special Deals &amp; Gift Sets
        </h1>

        {/* Elegant Subtext */}
        <p className="font-sans text-xs sm:text-sm text-[#4e4639] max-w-2xl mx-auto font-light leading-relaxed">
          Our finest perfume sets and gift boxes offered at special bundle prices with free luxury gift packaging.
        </p>
      </section>

      {/* ========================================== */}
      {/* PROMOTIONAL HERO FEATURE (The Royal Duo Coffret) */}
      {/* ========================================== */}
      <section className="px-5 md:px-10 lg:px-16 mx-auto mb-16 md:mb-24 max-w-7xl">
        <div className="bg-[#ffffff] border border-[#d1c5b4]/40 p-6 md:p-12 regal-shadow relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center">
            
            {/* Image Vitrine (7 cols on desktop) */}
            <div className="lg:col-span-7 relative group overflow-hidden bg-[#f4f4f2] flex items-center justify-center p-6 sm:p-12">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#ffffff]/90 backdrop-blur-xs border border-[#d1c5b4]/50 px-3 py-1 font-sans text-[9px] uppercase tracking-[0.2em] text-[#775a19] font-medium">
                  {HERO_DEAL.badge}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(HERO_DEAL)}
                aria-label={`Save ${HERO_DEAL.name}`}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-[#ffffff]/80 backdrop-blur-xs transition-colors cursor-pointer ${
                  isHeroWishlisted ? 'text-[#ba1a1a]' : 'text-[#7f7667] hover:text-[#775a19]'
                }`}
              >
                <svg className="w-5 h-5" fill={isHeroWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              <img
                src={HERO_DEAL.image}
                alt={HERO_DEAL.name}
                className="w-full max-h-[460px] object-contain transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            {/* Editorial Details (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block">
                  {HERO_DEAL.coffretNumber}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1c1b] font-normal">
                  {HERO_DEAL.name}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#4e4639] font-light pt-1 leading-relaxed">
                  {HERO_DEAL.subtitle}
                </p>
              </div>

              {/* Notes Accord Minimalist Bar */}
              <div className="py-4 border-y border-[#d1c5b4]/30 grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-sans text-[9px] uppercase tracking-widest text-[#7f7667] mb-1">
                    KEY INGREDIENTS
                  </span>
                  <span className="font-sans text-xs text-[#1a1c1b] font-normal leading-snug block">
                    {HERO_DEAL.primaryEssences}
                  </span>
                </div>
                <div>
                  <span className="block font-sans text-[9px] uppercase tracking-widest text-[#7f7667] mb-1">
                    PACKAGE
                  </span>
                  <span className="font-sans text-xs text-[#1a1c1b] font-normal leading-snug block">
                    {HERO_DEAL.presentation}
                  </span>
                </div>
              </div>

              {/* Pricing & Savings */}
              <div className="pt-1 flex flex-wrap items-baseline gap-2 sm:gap-4">
                <span className="font-serif text-3xl text-[#775a19] font-medium">
                  {formatPrice(HERO_DEAL.price)}
                </span>
                <span className="font-sans text-sm text-[#7f7667] line-through">
                  {formatPrice(HERO_DEAL.originalPrice)}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#775a19] bg-[#c5a059]/15 px-2.5 py-1 border border-[#c5a059]/30 font-medium">
                  Valued at {formatPrice(HERO_DEAL.originalPrice)}
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onAddToCart(HERO_DEAL)}
                  className="bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all duration-300 py-3.5 px-8 font-sans text-xs uppercase tracking-[0.2em] text-center cursor-pointer regal-shadow"
                >
                  Add Set to Bag
                </button>
                <button
                  onClick={() => onQuickView(HERO_DEAL)}
                  className="border border-[#d1c5b4] hover:border-[#775a19] text-[#1a1c1b] transition-all duration-300 py-3.5 px-6 font-sans text-xs uppercase tracking-widest text-center cursor-pointer bg-[#ffffff]"
                >
                  View Details
                </button>
              </div>

              <p className="font-sans text-[10px] uppercase tracking-widest text-[#7f7667]">
                * Includes Certificate of Authenticity
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION TITLE: CURATED DEAL GRID */}
      {/* ========================================== */}
      <section className="px-5 md:px-10 lg:px-16 mx-auto mb-8 max-w-7xl flex flex-col md:flex-row md:items-end justify-between border-b border-[#d1c5b4]/30 pb-4">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium">
            MORE SPECIAL OFFERS
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#1a1c1b] font-normal mt-1">
            Curated Perfume Sets
          </h2>
        </div>
        <p className="font-sans text-xs text-[#4e4639] font-light mt-2 md:mt-0">
          Exclusive limited-edition sets with special savings.
        </p>
      </section>

      {/* ========================================== */}
      {/* CURATED DEAL GRID (4 Clean Luxury Cards) */}
      {/* ========================================== */}
      <section className="px-5 md:px-10 lg:px-16 mx-auto mb-20 md:mb-28 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CURATED_DEALS.map((deal) => {
            const isWishlisted = wishlist.some(w => w.id === deal.id);
            return (
              <article
                key={deal.id}
                className="bg-[#ffffff] border border-[#d1c5b4]/30 flex flex-col justify-between group hover:border-[#c5a059] transition-all duration-300 p-5 regal-shadow relative"
              >
                <div>
                  {/* Image Area */}
                  <div className="relative bg-[#f4f4f2] aspect-[4/5] flex items-center justify-center p-6 mb-5 overflow-hidden">
                    <span className="absolute top-3 left-3 bg-[#ffffff]/90 px-2 py-0.5 font-sans text-[8px] uppercase tracking-widest text-[#775a19] border border-[#d1c5b4]/30 font-medium">
                      {deal.badge}
                    </span>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => onToggleWishlist(deal)}
                      aria-label={`Save ${deal.name}`}
                      className={`absolute top-3 right-3 z-10 p-1.5 rounded-full bg-[#ffffff]/80 backdrop-blur-xs transition-colors cursor-pointer ${
                        isWishlisted ? 'text-[#ba1a1a]' : 'text-[#7f7667] hover:text-[#775a19]'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>

                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-1 mb-4 text-center">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#7f7667] block">
                      {deal.tag}
                    </span>
                    <h3
                      onClick={() => onQuickView(deal)}
                      className="font-serif text-lg text-[#1a1c1b] font-normal group-hover:text-[#775a19] transition-colors cursor-pointer"
                    >
                      {deal.name}
                    </h3>
                    <p className="font-sans text-xs text-[#4e4639] font-light pt-1 line-clamp-2">
                      {deal.subtitle}
                    </p>
                  </div>
                </div>

                {/* Pricing & Action */}
                <div className="pt-4 border-t border-[#d1c5b4]/20">
                  <div className="flex items-baseline justify-center space-x-3 mb-3">
                    <span className="font-serif text-xl text-[#775a19] font-medium">
                      {formatPrice(deal.price)}
                    </span>
                    <span className="font-sans text-xs text-[#7f7667] line-through">
                      {formatPrice(deal.originalPrice)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onAddToCart(deal)}
                      className="w-full py-2.5 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-colors duration-300 font-sans text-[10px] uppercase tracking-widest text-center cursor-pointer shadow-xs"
                    >
                      Add to Bag
                    </button>
                    <button
                      onClick={() => onQuickView(deal)}
                      className="w-full py-1 text-center font-sans text-[9px] uppercase tracking-wider text-[#7f7667] hover:text-[#775a19] transition-colors cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ========================================== */}
      {/* LIMITED PRIVILEGE / VAULT NOTICE BANNER */}
      {/* ========================================== */}
      <section className="px-5 md:px-10 lg:px-16 mx-auto mb-20 md:mb-24 max-w-5xl">
        <div className="border border-[#c5a059]/40 bg-[#ffffff] p-8 md:p-10 text-center relative overflow-hidden regal-shadow">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-semibold">
              PRIVATE VAULT NOTICE
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#1a1c1b] font-light leading-relaxed">
              Limited to 50 curated coffrets per batch. Hand-numbered authenticity certificate included.
            </p>
            <div className="pt-2 flex justify-center items-center space-x-6 text-[#4e4639]">
              <span className="flex items-center space-x-1.5 font-sans text-[10px] uppercase tracking-widest">
                <svg className="w-4 h-4 text-[#775a19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Archival Batch Verified</span>
              </span>
              <span className="w-1 h-1 bg-[#d1c5b4] rounded-full"></span>
              <span className="flex items-center space-x-1.5 font-sans text-[10px] uppercase tracking-widest">
                <svg className="w-4 h-4 text-[#775a19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <span>Insured Courier</span>
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
