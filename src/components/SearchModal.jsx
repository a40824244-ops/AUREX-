import React, { useState } from 'react';

export default function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  currency
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name?.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.accords?.top?.toLowerCase().includes(q) ||
          p.accords?.heart?.toLowerCase().includes(q) ||
          p.accords?.base?.toLowerCase().includes(q)
        );
      });

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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1a1c1b]/75 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Modal */}
      <div className="relative bg-[#ffffff] border border-[#c5a059] w-full max-w-2xl shadow-2xl z-10 regal-shadow overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#d1c5b4]/40 flex items-center gap-3 bg-[#f9f9f7]">
          <span className="material-symbols-outlined text-2xl text-[#775a19]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search perfumes by name or notes (e.g. Oudh, Rose, Vanilla)..."
            className="w-full bg-transparent border-none focus:outline-hidden text-sm sm:text-base font-serif placeholder:font-sans placeholder:text-xs placeholder:text-[#7f7667] text-[#1a1c1b]"
          />
          <button
            onClick={onClose}
            className="text-[#7f7667] hover:text-[#1a1c1b] p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="text-center py-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#775a19] block mb-2">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Aged Oudh", "Taif Rose", "Amber", "Frankincense", "White Musk"].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-[#f4f4f2] hover:bg-[#c5a059]/20 border border-[#d1c5b4]/30 text-xs font-sans text-[#4e4639] cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-[#7f7667]">
              <p className="font-serif text-base text-[#1a1c1b]">No perfumes found matching "{query}".</p>
              <p className="font-sans text-xs mt-1">Try searching for notes like "Oudh", "Rose", "Musk", or "Vanilla".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-[#f9f9f7] border border-[#d1c5b4]/30 cursor-pointer transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 object-contain bg-[#f4f4f2] p-1 border border-[#d1c5b4]/20"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-base text-[#1a1c1b]">{p.name}</h4>
                    <p className="font-sans text-xs text-[#7f7667]">{p.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-sm text-[#775a19] font-medium">{formatPrice(p.price)}</span>
                    <span className="block font-sans text-[9px] uppercase tracking-wider text-[#c5a059]">{p.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
