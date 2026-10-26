import React from 'react';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  currency,
  onAddToCart,
  onOpenEngrave
}) {
  if (!isOpen || !product) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1a1c1b]/70 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Modal Card */}
      <div className="relative bg-[#ffffff] border border-[#c5a059] w-full max-w-3xl shadow-2xl z-10 regal-shadow overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 text-[#7f7667] hover:text-[#1a1c1b] p-2 bg-[#ffffff]/80 backdrop-blur-xs transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Side */}
          <div className="bg-[#f4f4f2] p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-[#d1c5b4]/40 relative">
            <span className="self-start px-2.5 py-1 text-[8px] font-sans tracking-[0.2em] uppercase border border-[#775a19] text-[#775a19] bg-[#c5a059]/10 font-medium">
              {product.badge}
            </span>

            <div className="w-full aspect-square flex items-center justify-center my-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-72 object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="w-full text-center border-t border-[#d1c5b4]/30 pt-3">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#7f7667]">
                Origin: {product.origin || '—'}
              </span>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="font-sans text-[10px] tracking-[0.22em] text-[#775a19] uppercase block font-medium">
                  {[product.type, product.volume].filter(Boolean).join(' • ')}
                </span>
                <h3 className="font-serif text-2xl text-[#1a1c1b] font-normal mt-1">
                  {product.name}
                </h3>
                <p className="font-sans text-xs text-[#4e4639] italic font-light">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl text-[#775a19] font-normal">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[10px] font-sans text-[#7f7667] uppercase tracking-wider">
                  All Taxes Included • Free Shipping
                </span>
              </div>

              <p className="font-sans text-xs text-[#4e4639] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Accords Breakdown */}
              <div className="border border-[#d1c5b4]/30 bg-[#f9f9f7] p-3 space-y-1.5 text-xs font-sans">
                <div className="flex justify-between">
                  <span className="text-[#7f7667] uppercase text-[9px] tracking-wider">Top Notes:</span>
                  <span className="font-serif text-[#1a1c1b] italic">{product.accords?.top || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7f7667] uppercase text-[9px] tracking-wider">Heart Notes:</span>
                  <span className="font-serif text-[#1a1c1b] italic">{product.accords?.heart || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7f7667] uppercase text-[9px] tracking-wider">Base Notes:</span>
                  <span className="font-serif text-[#775a19] italic">{product.accords?.base || '—'}</span>
                </div>
              </div>

              {/* Presentation note */}
              {(product.presentation || product.subtitle) && (
                <p className="text-[10px] font-sans text-[#7f7667] italic">
                  Packaging: {product.presentation || product.subtitle}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenEngrave(product);
                }}
                className="w-full py-2.5 border border-[#c5a059] text-[#1a1c1b] hover:bg-[#c5a059]/10 transition-colors font-sans text-[11px] uppercase tracking-[0.18em] cursor-pointer"
              >
                Add Free Custom Name Engraving
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
