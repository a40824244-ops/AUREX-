import React from 'react';
import { HERITAGE_PILLARS } from '../data/products';

export default function HeritagePillars() {
  return (
    <section id="pillars" className="py-14 md:py-20 bg-[#f4f4f2]/70 border-b border-[#d1c5b4]/30">
      <div className="w-full px-5 md:px-10 lg:px-16 mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#c5a059]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium">
              Why Choose AUREX
            </span>
            <span className="h-px w-8 bg-[#c5a059]"></span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl text-[#1a1c1b] mb-3">
            Our Four Quality Standards
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#4e4639] font-light max-w-lg mx-auto">
            Crafted with pure natural ingredients and traditional techniques for unforgettable, long-lasting fragrances.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERITAGE_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#ffffff] border border-[#d1c5b4]/40 p-6 md:p-8 flex flex-col justify-between hover:border-[#c5a059] transition-all duration-300 regal-shadow group"
            >
              <div>
                <div className="w-12 h-12 mb-6 border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center text-[#775a19] group-hover:bg-[#1a1c1b] group-hover:text-[#dfba67] group-hover:border-[#1a1c1b] transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                </div>
                <h3 className="font-serif text-lg text-[#1a1c1b] mb-3 font-normal">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs text-[#4e4639] leading-relaxed font-light">
                  {pillar.subtitle}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#d1c5b4]/20 flex items-center justify-between">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#c5a059] font-medium">
                  Standard {idx + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/60"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
