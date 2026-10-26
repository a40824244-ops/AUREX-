import React from 'react';
import { TESTIMONIALS } from '../data/products';

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#ffffff] border-b border-[#d1c5b4]/30">
      <div className="w-full px-5 md:px-10 lg:px-16 mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#c5a059]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium">
              Customer Reviews
            </span>
            <span className="h-px w-8 bg-[#c5a059]"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1c1b] mb-4">
            Loved by Fragrance Lovers
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#4e4639] font-light">
            Read honest feedback from customers who wear and love AUREX perfumes.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f9f9f7] border border-[#d1c5b4]/40 p-8 flex flex-col justify-between hover:border-[#c5a059] transition-all duration-300 regal-shadow relative"
            >
              <div>
                <div className="flex gap-1 text-[#c5a059] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <blockquote className="font-serif text-base sm:text-lg text-[#1a1c1b] italic font-normal leading-relaxed mb-6">
                  "{item.quote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#d1c5b4]/30">
                <p className="font-sans text-xs font-semibold text-[#1a1c1b] tracking-wide">
                  {item.author}
                </p>
                <div className="flex justify-between items-center text-[10px] font-sans text-[#7f7667] mt-1">
                  <span>{item.location}</span>
                  <span className="italic">{item.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
