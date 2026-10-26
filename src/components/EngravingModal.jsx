import React, { useState } from 'react';

export default function EngravingModal({
  product,
  isOpen,
  onClose,
  onSaveEngraving
}) {
  const [engravingText, setEngravingText] = useState('');

  if (!isOpen || !product) return null;

  const handleApply = (e) => {
    e.preventDefault();
    onSaveEngraving(product, engravingText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1a1c1b]/75 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Modal Card */}
      <div className="relative bg-[#ffffff] border border-[#c5a059] w-full max-w-lg shadow-2xl z-10 p-6 sm:p-8 regal-shadow max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-[#7f7667] hover:text-[#1a1c1b] p-2 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="text-center mb-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block mb-1">
            Free Custom Service
          </span>
          <h3 className="font-serif text-2xl text-[#1a1c1b]">
            Custom Name Gold Engraving
          </h3>
          <p className="font-sans text-xs text-[#4e4639] font-light mt-1">
            Have your name or initials custom engraved on the crystal bottle of {product.name}.
          </p>
        </div>

        {/* Live Bottle Preview */}
        <div className="bg-[#f4f4f2] border border-[#d1c5b4]/40 p-6 mb-6 flex flex-col items-center justify-center relative">
          <div className="w-32 h-32 relative flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full object-contain filter drop-shadow-md"
            />
            {/* Overlay Engraved Plaque */}
            <div className="absolute inset-x-2 bottom-3 bg-[#1a1c1b]/85 border border-[#c5a059] py-1 px-2 text-center shadow-lg backdrop-blur-xs">
              <span className="font-serif italic text-xs tracking-widest text-[#dfba67] truncate block">
                {engravingText || "A • H • 2026"}
              </span>
            </div>
          </div>
          <span className="font-sans text-[9px] uppercase tracking-widest text-[#7f7667] mt-3">
            Live Bottle Name Preview
          </span>
        </div>

        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block font-sans text-[10px] uppercase tracking-[0.18em] text-[#4e4639] mb-1.5 font-medium">
              Enter Your Name or Initials (Max 18 Letters)
            </label>
            <input
              type="text"
              maxLength={18}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="e.g. AMEER HAMZA"
              className="w-full px-4 py-3 bg-[#ffffff] border border-[#d1c5b4] focus:border-[#775a19] focus:outline-hidden text-[#1a1c1b] font-serif text-sm tracking-wider uppercase"
              required
            />
            <div className="flex justify-between items-center text-[10px] font-sans text-[#7f7667] mt-1">
              <span>Font Style: Elegant Gold Capital Letters</span>
              <span>{engravingText.length} / 18</span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#d1c5b4] text-[#4e4639] hover:bg-[#f4f4f2] transition-colors font-sans text-xs uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all font-sans text-xs uppercase tracking-[0.2em] cursor-pointer"
            >
              Save &amp; Add to Bag
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
