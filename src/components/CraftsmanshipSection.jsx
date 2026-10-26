import React from 'react';

export default function CraftsmanshipSection({ onOpenEngraveModal }) {
  return (
    <section className="py-16 md:py-24 bg-[#f9f9f7] border-b border-[#d1c5b4]/30" id="bespoke">
      <div className="w-full px-5 md:px-10 lg:px-16 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Image Vitrine (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="gold-foil-border p-3 sm:p-5 bg-[#ffffff] regal-shadow">
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <img
                  src="/images/products/afshan-black.jpeg"
                  alt="AUREX Afshan Black handcrafted luxury flacon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Cert Pill */}
            <div className="absolute -bottom-5 -right-3 sm:bottom-6 sm:right-6 bg-[#1a1c1b] text-[#ffdea5] p-4 border border-[#c5a059] max-w-xs hidden sm:block shadow-xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#e9c176]">verified</span>
                <div>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold">
                    100% Authentic
                  </p>
                  <p className="font-sans text-xs text-[#e2e3e1]">
                    Includes Certificate of Authenticity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block">
              Luxury Packaging &amp; Bottles
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1a1c1b] leading-tight font-normal">
              Crafted in Fine Crystal &amp; Velvet
            </h2>
            <p className="font-sans text-sm md:text-base text-[#4e4639] font-light leading-relaxed">
              Every AUREX perfume is made with uncompromising attention to detail. Our bottles are sculpted from heavy, lead-free crystal that feels substantial in your hands. The caps are precision-milled from solid brass and finished in 24K gold.
            </p>

            {/* Specification List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center shrink-0 text-[#775a19]">
                  <span className="material-symbols-outlined text-xl">brush</span>
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#1a1c1b] font-normal">
                    Handmade Wooden Presentation Box
                  </h3>
                  <p className="font-sans text-xs text-[#4e4639] font-light mt-0.5">
                    Each bottle rests inside a glossy black wooden gift box lined with soft emerald green velvet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center shrink-0 text-[#775a19]">
                  <span className="material-symbols-outlined text-xl">stylus_note</span>
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#1a1c1b] font-normal">
                    Crystal Application Wand
                  </h3>
                  <p className="font-sans text-xs text-[#4e4639] font-light mt-0.5">
                    Includes a smooth crystal wand to easily apply pure perfume oil to your pulse points without waste.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center shrink-0 text-[#775a19]">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#1a1c1b] font-normal">
                    Tamper-Evident Beeswax Seal
                  </h3>
                  <p className="font-sans text-xs text-[#4e4639] font-light mt-0.5">
                    Sealed at our Grasse laboratory with raw beeswax stamped with the royal crest of AUREX to guarantee virgin preservation.
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                onClick={onOpenEngraveModal}
                className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] px-8 py-4 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all duration-300 regal-shadow"
              >
                <span>Request Custom Gold Engraving</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
