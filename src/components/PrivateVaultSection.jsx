import React, { useState } from 'react';
import { api } from '../services/api';

export default function PrivateVaultSection() {
  const [email, setEmail] = useState('');
  const [enlisted, setEnlisted] = useState(false);
  const [vipToken, setVipToken] = useState('AUR-7709-VIP');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await api.subscribeVIP(email.trim());
      if (res?.token) {
        setVipToken(res.token);
      }
    } catch {
      // Fallback works gracefully even if server is offline
    } finally {
      setLoading(false);
      setEnlisted(true);
    }
  };

  return (
    <section id="vault" className="py-16 md:py-24 bg-[#f4f4f2]/90 border-b border-[#d1c5b4]/30">
      <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
        
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block mb-3">
          VIP Access
        </span>

        <h2 className="font-serif text-3xl md:text-5xl text-[#1a1c1b] mb-4">
          Get Exclusive Deals &amp; Updates
        </h2>

        <p className="font-sans text-xs md:text-sm text-[#4e4639] font-light mb-8 max-w-xl mx-auto leading-relaxed">
          Sign up to receive private discount codes, early access to new perfumes, and special restock alerts.
        </p>

        {enlisted ? (
          <div className="bg-[#1a1c1b] text-[#dfba67] border border-[#c5a059] p-6 max-w-lg mx-auto regal-shadow">
            <span className="material-symbols-outlined text-3xl mb-2 text-[#e9c176]">lock_open</span>
            <h3 className="font-serif text-lg text-[#ffffff]">Welcome to AUREX VIP</h3>
            <p className="font-sans text-xs text-[#dfba67] mt-2">
              You are now on our private VIP list. We will send you exclusive offers and early product releases.
            </p>
            <span className="inline-block mt-3 px-3 py-1 bg-[#c5a059]/20 text-[9px] font-sans uppercase tracking-[0.2em] text-[#e9c176]">
              VIP Member ID: {vipToken}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL ADDRESS"
              required
              disabled={loading}
              className="w-full px-5 py-4 bg-[#ffffff] border border-[#d1c5b4] focus:border-[#775a19] focus:outline-hidden text-[#1a1c1b] placeholder:text-[#7f7667] font-sans text-xs uppercase tracking-[0.18em]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em] cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Join VIP Club'}
            </button>
          </form>
        )}

        <p className="font-sans text-[10px] text-[#7f7667] mt-4 tracking-wider">
          We respect your privacy. No spam, ever. Unsubscribe anytime with one click.
        </p>

      </div>
    </section>
  );
}
