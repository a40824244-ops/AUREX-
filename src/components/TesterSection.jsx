import React from 'react';
import { TESTER_PRODUCTS } from '../data/products';

const CURRENCY_RATES = {
  PKR: { rate: 1, symbol: 'Rs. ' },
  USD: { rate: 0.0036, symbol: '$' },
  AED: { rate: 0.013, symbol: 'AED ' },
  GBP: { rate: 0.0028, symbol: '£' },
  EUR: { rate: 0.0033, symbol: '€' }
};

function formatPrice(amount, currencyCode) {
  const c = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.PKR;
  const converted = amount * c.rate;
  if (currencyCode === 'PKR') return `${c.symbol}${Math.round(converted).toLocaleString()}`;
  return `${c.symbol}${converted.toFixed(2)}`;
}

export default function TesterSection({ currency, onAddToCart, onQuickView }) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#1a1c1b] via-[#241f1a] to-[#1a1c1b] border-y border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 sm:w-10 bg-[#c9a96e]"></span>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#c9a96e] uppercase">
              Try Before You Buy
            </span>
            <span className="h-px w-6 sm:w-10 bg-[#c9a96e]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Tester Sample Vials
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Not sure which scent suits you? Try our 5ml pocket-size spray testers at a small price. 
            Perfect for testing before buying the full bottle.
          </p>
        </div>

        {/* Tester Grid: 2 columns on mobile, 4 columns on desktop (perfect 2 rows of 4 for 8 testers) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {TESTER_PRODUCTS.map((tester) => (
            <div
              key={tester.id}
              className="group flex flex-col justify-between bg-[#24201c] rounded-2xl overflow-hidden border border-[#c9a96e]/25 hover:border-[#c9a96e] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(201,169,110,0.15)] cursor-pointer"
              onClick={() => onQuickView && onQuickView(tester)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full bg-[#181614] overflow-hidden flex items-center justify-center">
                {/* 5ml Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#c9a96e] text-[#1a1c1b] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-1V1h-2m-3 12h-2v-2h2v2m0 4h-2v-2h2v2m4-4h-2v-2h2v2m0 4h-2v-2h2v2z" />
                    </svg>
                    5ml Vial
                  </span>
                </div>

                <img
                  src={tester.image}
                  alt={tester.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Quick View Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-[#1a1c1b]/90 text-[#c9a96e] border border-[#c9a96e]/40 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    className="text-white font-semibold text-sm sm:text-base mb-1.5 group-hover:text-[#c9a96e] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {tester.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                    {tester.subtitle}
                  </p>
                </div>

                <div>
                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[#c9a96e] font-bold text-base sm:text-lg">
                      {formatPrice(tester.price, currency.code)}
                    </span>
                    {tester.originalPrice && (
                      <span className="text-gray-500 line-through text-xs sm:text-sm">
                        {formatPrice(tester.originalPrice, currency.code)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart && onAddToCart(tester);
                    }}
                    className="w-full bg-[#c9a96e] hover:bg-[#b8953d] active:scale-95 text-[#1a1c1b] font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 tracking-wider uppercase shadow-md cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/923108116918?text=Hi%20AUREX!%20I%20want%20to%20order%20tester%20sample%20vials.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.184 1.564 5.946l-1.664 6.082 6.262-1.642c1.71.933 3.666 1.464 5.748 1.464 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.87 0-3.616-.541-5.086-1.476l-.365-.232-3.774.99 1.007-3.678-.255-.407c-1.026-1.636-1.577-3.535-1.577-5.547 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
            <span>Order Testers on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
