import React, { useState } from 'react';

export default function Navbar({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenConsultation,
  onOpenSearch
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#f9f9f7]/95 backdrop-blur-md text-[#775a19] sticky top-0 z-40 border-b border-[#d1c5b4]/30 shadow-xs transition-all duration-300">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 mx-auto flex justify-between items-center py-3.5 sm:py-4">
        
        {/* Left: Brand Logo & Desktop Navigation Tabs */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          <button
            onClick={() => handleNavClick('home')}
            className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-[#775a19] hover:text-[#c5a059] transition-colors flex items-center cursor-pointer"
          >
            <span>AUREX</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-6 font-sans text-[11px] uppercase tracking-[0.2em]">
            <button
              onClick={() => handleNavClick('home')}
              className={`pb-1 transition-all cursor-pointer ${
                currentPage === 'home'
                  ? 'text-[#775a19] font-medium border-b border-[#775a19]'
                  : 'text-[#4e4639] hover:text-[#775a19] border-b border-transparent'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('collection')}
              className={`pb-1 transition-all cursor-pointer ${
                currentPage === 'collection'
                  ? 'text-[#775a19] font-medium border-b border-[#775a19]'
                  : 'text-[#4e4639] hover:text-[#775a19] border-b border-transparent'
              }`}
            >
              Royal Collection
            </button>
            <button
              onClick={() => handleNavClick('deals')}
              className={`pb-1 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'deals'
                  ? 'text-[#775a19] font-medium border-b border-[#775a19]'
                  : 'text-[#4e4639] hover:text-[#775a19] border-b border-transparent'
              }`}
            >
              Special Deals
              <span className="bg-[#c5a059] text-[#ffffff] text-[7px] font-bold px-1.5 py-0.5 uppercase tracking-wider leading-none">
                SALE
              </span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`pb-1 transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'text-[#775a19] font-medium border-b border-[#775a19]'
                  : 'text-[#8c8273] hover:text-[#775a19] border-b border-transparent'
              }`}
            >
              Admin
            </button>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
          
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Collection"
            className="p-2 text-[#1a1c1b] hover:text-[#c5a059] transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Curated Wishlist"
            className="p-2 text-[#1a1c1b] hover:text-[#c5a059] transition-colors relative cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#c5a059] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Velvet Shopping Bag"
            className="p-2 text-[#1a1c1b] hover:text-[#c5a059] transition-colors relative cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span className="absolute top-0.5 right-0.5 bg-[#775a19] text-[#ffffff] text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#1a1c1b] hover:text-[#775a19] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d1c5b4]/40 bg-[#ffffff] px-6 py-5 shadow-lg transition-all">
          <nav className="flex flex-col space-y-4 font-sans text-xs uppercase tracking-[0.2em]">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 transition-colors flex items-center justify-between ${
                currentPage === 'home'
                  ? 'text-[#775a19] font-semibold pl-2 border-l-2 border-[#775a19]'
                  : 'text-[#4e4639] hover:text-[#775a19]'
              }`}
            >
              <span>Home</span>
              <span className="text-[10px] text-[#c5a059]">01</span>
            </button>
            <button
              onClick={() => handleNavClick('collection')}
              className={`text-left py-2 transition-colors flex items-center justify-between ${
                currentPage === 'collection'
                  ? 'text-[#775a19] font-semibold pl-2 border-l-2 border-[#775a19]'
                  : 'text-[#4e4639] hover:text-[#775a19]'
              }`}
            >
              <span>Royal Collection</span>
              <span className="text-[10px] text-[#c5a059]">02</span>
            </button>
            <button
              onClick={() => handleNavClick('deals')}
              className={`text-left py-2 transition-colors flex items-center justify-between ${
                currentPage === 'deals'
                  ? 'text-[#775a19] font-semibold pl-2 border-l-2 border-[#775a19]'
                  : 'text-[#4e4639] hover:text-[#775a19]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Special Deals</span>
                <span className="bg-[#c5a059] text-[#ffffff] text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                  SALE
                </span>
              </div>
              <span className="text-[10px] text-[#c5a059]">03</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left py-2 transition-colors flex items-center justify-between ${
                currentPage === 'admin'
                  ? 'text-[#775a19] font-semibold pl-2 border-l-2 border-[#775a19]'
                  : 'text-[#8c8273] hover:text-[#775a19]'
              }`}
            >
              <span>Admin Panel</span>
              <span className="text-[10px] text-[#c5a059]">04</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
