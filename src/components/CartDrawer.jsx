import React from 'react';
import { api } from '../services/api';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
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

  const totalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeCoffretThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((totalUSD / freeCoffretThreshold) * 100));

  const handleWhatsAppCheckout = () => {
    // Record order in backend database asynchronously
    try {
      api.placeOrder({
        customer: 'WhatsApp Direct Client',
        email: '',
        location: 'WhatsApp Order (0310 8116918)',
        items: items.map(i => ({
          name: i.product.name + (i.engraving ? ` (Engraved: ${i.engraving})` : ''),
          qty: i.quantity,
          price: i.product.price
        })),
        total: totalUSD,
        payment: 'WhatsApp Order',
        shipping: 'Express Delivery Included'
      }).catch(() => {});
    } catch {
      // Non-blocking
    }

    // Your WhatsApp number (0310 8116918)
    const phoneNumber = "923108116918";

    let text = `*✦ NEW ORDER — AUREX LUXURY PERFUMES ✦*\n\n`;
    text += `Hello, I would like to place an order for the following items:\n\n`;

    items.forEach((item, index) => {
      const p = item.product;
      const vol = p.volume ? ` (${p.volume})` : '';
      text += `*${index + 1}. ${p.name}${vol}*\n`;
      text += `   • Quantity: ${item.quantity}\n`;
      text += `   • Price: ${formatPrice(p.price * item.quantity)}\n`;
      if (item.engraving) {
        text += `   • Custom Engraving: "${item.engraving}"\n`;
      }
      text += `\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Total Order Amount:* ${formatPrice(totalUSD)}\n`;
    text += `*Delivery:* Express Delivery Included\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    text += `Please confirm my order and share the payment and shipping details. Thank you!`;

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1a1c1b]/60 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#ffffff] h-full shadow-2xl flex flex-col z-10 border-l border-[#c5a059]/40">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#d1c5b4]/40 flex items-center justify-between bg-[#f9f9f7]">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block">
              Your Items
            </span>
            <h3 className="font-serif text-xl text-[#1a1c1b]">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7f7667] hover:text-[#1a1c1b] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Free Gift Notification Bar */}
        <div className="p-4 bg-[#f4f4f2] border-b border-[#d1c5b4]/30 text-xs font-sans">
          <div className="flex justify-between items-center mb-1.5 text-[10px] uppercase tracking-wider text-[#4e4639]">
            <span>Free Velvet Gift Box on $250+</span>
            <span className="font-semibold text-[#775a19]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#eeeeec] overflow-hidden">
            <div
              className="h-full bg-[#c5a059] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-[#7f7667] mt-1.5 italic">
            {totalUSD >= freeCoffretThreshold
              ? "✓ You unlocked a Free Velvet Gift Box!"
              : `Add ${formatPrice(freeCoffretThreshold - totalUSD)} more to get a free luxury gift box.`}
          </p>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <span className="material-symbols-outlined text-5xl text-[#d1c5b4]">shopping_bag</span>
              <p className="font-serif text-lg text-[#1a1c1b]">Your shopping bag is empty.</p>
              <p className="font-sans text-xs text-[#7f7667] max-w-xs mx-auto">
                Explore our perfume collection and add your favorite fragrances to the bag.
              </p>
              <button
                onClick={onClose}
                className="inline-block mt-4 px-6 py-3 bg-[#1a1c1b] text-[#dfba67] uppercase tracking-widest text-[11px] font-sans cursor-pointer hover:bg-[#775a19] transition-colors"
              >
                Explore Perfumes
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 border border-[#d1c5b4]/40 bg-[#f9f9f7] relative"
              >
                <div className="w-20 h-20 bg-[#ffffff] p-2 border border-[#d1c5b4]/30 shrink-0 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-base text-[#1a1c1b] font-normal">
                        {item.product.name}
                      </h4>
                      <p className="font-sans text-[10px] text-[#7f7667] uppercase tracking-wider">
                        {item.product.type} • {item.product.volume}
                      </p>
                      {item.engraving && (
                        <p className="font-serif italic text-[11px] text-[#775a19] mt-0.5">
                          Engraved: "{item.engraving}"
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#7f7667] hover:text-[#ba1a1a] transition-colors p-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#d1c5b4]/20">
                    <div className="flex items-center border border-[#d1c5b4] bg-[#ffffff]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-0.5 text-xs text-[#1a1c1b] hover:bg-[#f4f4f2] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 text-xs font-sans text-[#1a1c1b]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-0.5 text-xs text-[#1a1c1b] hover:bg-[#f4f4f2] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-base text-[#775a19]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Subtotal & WhatsApp Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#d1c5b4]/40 bg-[#f9f9f7] space-y-4">
            <div className="flex justify-between items-baseline font-sans">
              <span className="text-xs uppercase tracking-[0.2em] text-[#7f7667]">Total Amount</span>
              <span className="font-serif text-2xl text-[#1a1c1b] font-normal">
                {formatPrice(totalUSD)}
              </span>
            </div>

            <p className="text-[10px] text-[#7f7667] font-sans text-center">
              Free express delivery included on all orders worldwide.
            </p>

            {/* WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-[#ffffff] transition-all duration-300 font-sans text-xs uppercase tracking-[0.18em] font-semibold text-center shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {/* WhatsApp Official SVG Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.184 1.564 5.946l-1.664 6.082 6.262-1.642c1.71.933 3.666 1.464 5.748 1.464 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.87 0-3.616-.541-5.086-1.476l-.365-.232-3.774.99 1.007-3.678-.255-.407c-1.026-1.636-1.577-3.535-1.577-5.547 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              <span>Order via WhatsApp</span>
            </button>
            <p className="text-[10px] text-[#7f7667] text-center">
              Tap to chat directly with our concierge and confirm your order instantly.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
