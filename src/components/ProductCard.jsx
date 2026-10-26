import React from 'react';

export default function ProductCard({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onOpenEngrave
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
    const converted = Math.round((priceInUSD || 0) * current.rate);
    return `${current.symbol}${converted.toLocaleString()}`;
  };

  return (
    <article aria-labelledby={`product-title-${product.id}`} className="group bg-[#ffffff] border border-[#d1c5b4]/40 p-6 flex flex-col justify-between hover:border-[#c5a059] transition-all duration-300 regal-shadow relative">
      <div>
        {/* Top Header: Badge & Wishlist */}
        <div className="flex justify-between items-start mb-4">
          <span className="px-2.5 py-1 text-[8px] font-sans tracking-[0.2em] uppercase border border-[#775a19] text-[#775a19] bg-[#c5a059]/10 font-medium">
            {product.badge}
          </span>
          <button
            onClick={() => onToggleWishlist(product)}
            aria-label={`Favorite ${product.name}`}
            className={`p-1 transition-colors ${
              isWishlisted ? 'text-[#ba1a1a]' : 'text-[#7f7667] hover:text-[#775a19]'
            }`}
          >
            <span
              className="material-symbols-outlined text-base"
              style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Flacon Image Container with Quick View */}
        <div
          onClick={() => onQuickView(product)}
          className="relative aspect-square w-full bg-[#f4f4f2] mb-6 overflow-hidden flex items-center justify-center p-4 group/img cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />

          {/* Quick View Overlay Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 inset-x-3 py-2 bg-[#1a1c1b]/90 text-[#dfba67] text-[10px] uppercase tracking-[0.2em] font-sans opacity-90 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 backdrop-blur-xs"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            <span>Quick View</span>
          </button>
        </div>

        {/* Product Meta */}
        <div className="space-y-1 mb-4 text-center">
          <span className="font-sans text-[10px] tracking-[0.2em] text-[#4e4639] uppercase block font-light">
            {product.type} • {product.volume}
          </span>
          <h3 id={`product-title-${product.id}`} className="font-serif text-xl text-[#1a1c1b] font-normal group-hover:text-[#775a19] transition-colors">
            {product.name}
          </h3>
          <p className="font-sans text-xs text-[#4e4639] italic font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Olfactory Accord Triplet */}
        <div className="py-3 px-3 bg-[#f9f9f7] border border-[#d1c5b4]/25 mb-4 text-[10px] font-sans space-y-1">
          <div className="flex justify-between items-center text-[#4e4639]">
            <span className="uppercase text-[9px] tracking-wider text-[#7f7667]">Top Notes:</span>
            <span className="font-serif italic text-right truncate max-w-[130px]">{product.accords.top}</span>
          </div>
          <div className="flex justify-between items-center text-[#4e4639]">
            <span className="uppercase text-[9px] tracking-wider text-[#7f7667]">Heart Notes:</span>
            <span className="font-serif italic text-right truncate max-w-[130px]">{product.accords.heart}</span>
          </div>
          <div className="flex justify-between items-center text-[#4e4639]">
            <span className="uppercase text-[9px] tracking-wider text-[#7f7667]">Base Notes:</span>
            <span className="font-serif italic text-right truncate max-w-[130px] text-[#775a19]">{product.accords.base}</span>
          </div>
        </div>

        {/* Sillage & Longevity Bar */}
        <div className="mb-5 space-y-1.5">
          <div className="flex justify-between text-[9px] font-sans uppercase tracking-wider text-[#7f7667]">
            <span>Lasts: {product.longevity}</span>
            <span>Strength: {product.sillage}%</span>
          </div>
          <div className="w-full h-1 bg-[#eeeeec] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#dfba67] via-[#c5a059] to-[#775a19]"
              style={{ width: `${product.sillage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer: Price & Add to Bag */}
      <div className="pt-2 border-t border-[#d1c5b4]/30">
        <div className="flex justify-between items-baseline mb-3">
          <span className="font-sans text-[10px] text-[#7f7667] uppercase tracking-[0.18em]">Price</span>
          <span className="font-serif text-xl text-[#775a19] font-normal">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-3 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">shopping_bag</span>
            <span>Add to Bag</span>
          </button>
          
          <button
            onClick={() => onOpenEngrave(product)}
            className="w-full text-center text-[9px] font-sans uppercase tracking-[0.18em] text-[#7f7667] hover:text-[#775a19] py-1 transition-colors"
          >
            + Free Custom Name Engraving
          </button>
        </div>
      </div>
    </article>
  );
}
