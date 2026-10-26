import React from 'react';

export default function Hero({ onExploreClick, onDealsClick, onConsultationClick }) {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#d1c5b4]/30 bg-[#f9f9f7] pt-8 md:pt-14 pb-12 md:pb-20">
      <div className="w-full px-5 md:px-10 lg:px-16 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Editorial Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 border border-[#c5a059]/40 bg-[#c5a059]/10 px-3 py-1.5">
              <span className="material-symbols-outlined text-xs text-[#775a19]">star</span>
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#775a19] font-medium">
                100% Pure Luxury Perfumes
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1c1b] leading-[1.12] tracking-tight">
              The Signature of <br />
              <span className="italic font-normal font-serif gold-foil-text">Luxury</span>
            </h1>

            {/* Description */}
            <p className="font-sans text-sm md:text-base text-[#4e4639] font-light max-w-lg leading-relaxed">
              Handcrafted pure perfumes and oils made with aged wild oudh, fresh mountain roses, and natural ambers. 100% alcohol-free, gentle on skin, and bottled in luxury crystal.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="inline-flex justify-center items-center px-8 md:px-10 py-4 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em] regal-shadow text-center"
              >
                Shop Collection
              </a>
              <button
                onClick={onDealsClick}
                className="inline-flex justify-center items-center px-6 py-4 border border-[#c5a059] text-[#1a1c1b] hover:bg-[#c5a059]/15 transition-all duration-300 font-sans text-xs uppercase tracking-[0.18em] cursor-pointer"
              >
                Special Deals &amp; Offers
              </button>
            </div>

            {/* Provenance Micro-markers */}
            <div className="pt-6 border-t border-[#d1c5b4]/40 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="block font-serif text-lg font-normal text-[#775a19]">30 Yrs</span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-[#4e4639]">Naturally Aged</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-normal text-[#775a19]">100%</span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-[#4e4639]">Alcohol-Free</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-normal text-[#775a19]">Pure</span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-[#4e4639]">Natural Oils</span>
              </div>
            </div>

          </div>

          {/* Flacon Visual Composition (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/11] bg-[#f4f4f2] p-2.5 sm:p-4 gold-foil-border regal-shadow overflow-hidden">
              
              {/* Outer framing lines */}
              <div className="absolute inset-2 sm:inset-3 border border-[#d1c5b4]/30 pointer-events-none z-10"></div>

              {/* Still life image */}
              <img
                src="/images/products/janan-sports.jpeg"
                alt="AUREX Janan Sports Luxury Flacon"
                className="w-full h-full object-cover object-center shadow-inner"
              />

              {/* Decorative AUREX Brand Tag */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#c5a059] flex items-center justify-center bg-[#1a1c1b]/90 text-[#dfba67] backdrop-blur-xs regal-shadow z-20">
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full border border-dashed border-[#dfba67]/50 flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-[9px] sm:text-[11px] font-bold tracking-widest text-[#dfba67]">
                    AUREX
                  </span>
                  <span className="font-sans text-[5px] sm:text-[6px] uppercase tracking-[0.2em] text-[#ffdea5]">
                    ORIGINAL
                  </span>
                </div>
              </div>

            </div>

            {/* Vitrine Info Bar - Placed Below Picture So Entire Bottle & Label Are 100% Visible */}
            <div className="mt-3 bg-[#ffffff] p-3 sm:px-5 sm:py-3.5 border border-[#d1c5b4]/40 regal-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-sans text-[8px] sm:text-[10px] text-[#775a19] tracking-[0.2em] uppercase block font-semibold">
                  Featured Best Seller
                </span>
                <h3 className="font-serif text-sm sm:text-base text-[#1a1c1b] font-medium">
                  AUREX Janan Sports
                </h3>
                <p className="font-sans text-[10px] sm:text-xs text-[#4e4639] mt-0.5">
                  Pure Parfum 50ml in faceted crystal flacon with diamond-cut cap.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1a1c1b] text-[#dfba67] font-serif text-xs font-semibold self-start sm:self-center shrink-0">
                Rs. 2,199 <span className="text-[10px] font-sans font-normal text-stone-300">50ML</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
