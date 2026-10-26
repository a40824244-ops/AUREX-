import React from 'react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  currency
}) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1a1c1b]/60 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#ffffff] h-full shadow-2xl flex flex-col z-10 border-l border-[#c5a059]/40">
        
        {/* Header */}
        <div className="p-6 border-b border-[#d1c5b4]/40 flex items-center justify-between bg-[#f9f9f7]">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block">
              Saved Items
            </span>
            <h3 className="font-serif text-xl text-[#1a1c1b]">
              Your Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7f7667] hover:text-[#1a1c1b] transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <span className="material-symbols-outlined text-5xl text-[#d1c5b4]">favorite_border</span>
              <p className="font-serif text-lg text-[#1a1c1b]">Your wishlist is empty.</p>
              <p className="font-sans text-xs text-[#7f7667] max-w-xs mx-auto">
                Click the heart icon on any perfume to save it to your wishlist.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border border-[#d1c5b4]/40 bg-[#f9f9f7] relative"
              >
                <div className="w-20 h-20 bg-[#ffffff] p-2 border border-[#d1c5b4]/30 shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-base text-[#1a1c1b]">
                        {item.name}
                      </h4>
                      <p className="font-sans text-[10px] text-[#7f7667] uppercase tracking-wider">
                        {item.type} • {item.volume}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="text-[#7f7667] hover:text-[#ba1a1a] p-1"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#d1c5b4]/20">
                    <span className="font-serif text-sm text-[#775a19]">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3 py-1.5 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all text-[10px] uppercase font-sans tracking-wider"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
