import React, { useState } from 'react';
import { PYRAMID_DATA } from '../data/products';

export default function OlfactoryPyramid() {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section id="pyramid" className="py-16 md:py-24 bg-[#ffffff] border-b border-[#d1c5b4]/30 relative overflow-hidden">
      <div className="w-full px-5 md:px-10 lg:px-16 mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#c5a059]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium">
              Fragrance Layers
            </span>
            <span className="h-px w-8 bg-[#c5a059]"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1c1b] mb-4">
            How Our Fragrance Notes Unfold
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#4e4639] font-light leading-relaxed">
            Discover how our perfumes evolve throughout the day — from fresh opening top notes to deep, long-lasting base notes.
          </p>
        </div>

        {/* Interactive Pyramid Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Visual Pyramid Representation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
            {PYRAMID_DATA.map((tier, idx) => {
              const widths = ["w-[70%] max-w-[240px] sm:w-60", "w-[85%] max-w-[300px] sm:w-80", "w-full max-w-[360px] sm:w-96"];
              const isActive = activeTier === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTier(idx)}
                  className={`${widths[idx]} py-4 px-4 border transition-all duration-300 text-center relative group ${
                    isActive
                      ? 'bg-[#1a1c1b] text-[#dfba67] border-[#c5a059] shadow-md scale-[1.02]'
                      : 'bg-[#f9f9f7] text-[#4e4639] border-[#d1c5b4]/50 hover:border-[#c5a059] hover:bg-[#f4f4f2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold">
                      Level {3 - idx}
                    </span>
                    <span className="font-serif text-sm tracking-wider">
                      {tier.tier}
                    </span>
                    <span className="material-symbols-outlined text-sm">
                      {isActive ? 'check_circle' : 'touch_app'}
                    </span>
                  </div>
                </button>
              );
            })}
            <p className="font-sans text-[10px] uppercase tracking-widest text-[#7f7667] pt-2 text-center">
              Click any layer above to see its natural ingredients
            </p>
          </div>

          {/* Detailed Accord Vitrine (7 cols) */}
          <div className="lg:col-span-7 bg-[#f9f9f7] border border-[#c5a059]/40 p-6 sm:p-10 regal-shadow relative">
            <div className="flex items-start justify-between border-b border-[#d1c5b4]/40 pb-4 mb-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block">
                  Layer Details
                </span>
                <h3 className="font-serif text-2xl text-[#1a1c1b] mt-1 font-normal">
                  {PYRAMID_DATA[activeTier].tier}
                </h3>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-[#c5a059]/15 text-[#775a19] text-[9px] font-sans uppercase tracking-[0.18em] border border-[#c5a059]/40">
                  {PYRAMID_DATA[activeTier].subtitle}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs md:text-sm text-[#4e4639] leading-relaxed mb-6 font-light">
              {PYRAMID_DATA[activeTier].description}
            </p>

            {/* Note Cards in this tier */}
            <div className="space-y-4">
              {PYRAMID_DATA[activeTier].notes.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-[#ffffff] border border-[#d1c5b4]/30 p-4 hover:border-[#c5a059] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-serif text-base text-[#1a1c1b] font-normal">
                      {note.name}
                    </h4>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#c5a059]">
                      Rare Extraction
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#4e4639] font-light">
                    {note.detail}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
