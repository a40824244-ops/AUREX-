import React from 'react';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-[#2f3130] text-[#ffdea5] py-2 sm:py-2.5 px-3 sm:px-6 md:px-16 text-center text-[9px] sm:text-[10px] md:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase flex items-center justify-center gap-2 sm:gap-3 border-b border-[#7f7667]/20 select-none leading-tight">
      <span className="hidden xs:inline-block w-1.5 h-1.5 rounded-full bg-[#e9c176] animate-pulse"></span>
      <span className="font-sans font-medium line-clamp-1 sm:line-clamp-none">
        Free Luxury Velvet Gift Box on Orders Over $250 • 100% Pure Alcohol-Free Perfumes
      </span>
      <span className="hidden xs:inline-block w-1.5 h-1.5 rounded-full bg-[#e9c176] animate-pulse"></span>
    </aside>
  );
}
