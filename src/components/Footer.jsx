import React from 'react';

export default function Footer({ onOpenConsultation, onOpenAdmin }) {
  return (
    <footer className="bg-[#ffffff] border-t border-[#d1c5b4]/30 text-[#775a19]">
      <div className="w-full px-5 md:px-10 lg:px-16 mx-auto pt-14 md:pt-20 pb-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#d1c5b4]/30">
          
          <div className="lg:col-span-6 space-y-3">
            <span className="font-serif text-3xl tracking-[0.25em] text-[#775a19] font-normal block">
              AUREX
            </span>
            <p className="font-sans text-xs text-[#4e4639] max-w-md leading-relaxed font-light">
              Luxury Perfumes &amp; 100% Pure Attars. Handcrafted in Grasse and distilled in traditional copper vessels using the world's finest natural ingredients.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-6 sm:gap-8 font-sans text-xs uppercase tracking-[0.18em] text-[#4e4639]">
            <a href="#collection" className="hover:text-[#775a19] transition-colors">
              Collection
            </a>
            <a href="#pillars" className="hover:text-[#775a19] transition-colors">
              Standards
            </a>
            <a href="#bespoke" className="hover:text-[#775a19] transition-colors">
              Craft
            </a>
            <button onClick={onOpenConsultation} className="hover:text-[#775a19] transition-colors uppercase">
              Consultation
            </button>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[#4e4639] text-center md:text-left">
          <p>© 2025 AUREX Haute Parfumerie &amp; Royal Attars. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-3 sm:space-x-6 text-[10px] uppercase tracking-[0.22em] text-[#7f7667]">
              <span>Paris 8e</span>
              <span>•</span>
              <span>Mayfair W1</span>
              <span>•</span>
              <span>Downtown Dubai</span>
            </div>
            <a
              href="https://wa.me/923108116918"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.18em] text-[#1a1c1b] hover:text-[#25D366] transition-colors flex items-center gap-1 cursor-pointer font-medium"
              title="Chat on WhatsApp"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse"></span>
              <span>WhatsApp Support</span>
            </a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[10px] uppercase tracking-[0.18em] text-[#b8a888] hover:text-[#775a19] transition-colors opacity-60 hover:opacity-100 cursor-pointer"
                title="Admin Panel"
              >
                Admin
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
