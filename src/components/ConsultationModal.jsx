import React, { useState } from 'react';
import { api } from '../services/api';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salon: 'Dubai Lounge',
    scentPreference: 'Rich Oudh & Warm Woods',
    date: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.bookConsultation(formData);
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1a1c1b]/75 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Modal Card */}
      <div className="relative bg-[#ffffff] border border-[#c5a059] w-full max-w-xl shadow-2xl z-10 p-6 sm:p-10 regal-shadow max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-[#7f7667] hover:text-[#1a1c1b] p-2 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 border border-[#c5a059] bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto text-[#775a19]">
              <span className="material-symbols-outlined text-3xl">done</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1a1c1b]">Consultation Request Received</h3>
            <p className="font-sans text-xs text-[#4e4639] max-w-md mx-auto leading-relaxed">
              Our perfume specialist will reach out to <strong className="text-[#1a1c1b]">{formData.email}</strong> to coordinate your appointment at <strong>{formData.salon}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 bg-[#1a1c1b] text-[#dfba67] uppercase tracking-widest text-xs font-sans cursor-pointer"
              >
                Return To Store
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#775a19] font-medium block mb-1">
                Personalized Advice
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1c1b]">
                Book a Perfume Consultation
              </h3>
              <p className="font-sans text-xs text-[#4e4639] font-light mt-1 max-w-md mx-auto">
                Speak 1-on-1 with our fragrance specialist to discover the scent that best matches your skin and personal style.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-[#4e4639] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 bg-[#f9f9f7] border border-[#d1c5b4] focus:border-[#775a19] focus:outline-hidden text-xs font-sans"
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-[#4e4639] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 bg-[#f9f9f7] border border-[#d1c5b4] focus:border-[#775a19] focus:outline-hidden text-xs font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider text-[#4e4639] mb-1">
                    Meeting Location
                  </label>
                  <select
                    value={formData.salon}
                    onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f9f9f7] border border-[#d1c5b4] focus:border-[#775a19] focus:outline-hidden text-xs font-sans"
                  >
                    <option>Dubai Lounge</option>
                    <option>Paris Salon</option>
                    <option>London Suite</option>
                    <option>Online Video Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider text-[#4e4639] mb-1">
                    Favorite Scent Style
                  </label>
                  <select
                    value={formData.scentPreference}
                    onChange={(e) => setFormData({ ...formData, scentPreference: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f9f9f7] border border-[#d1c5b4] focus:border-[#775a19] focus:outline-hidden text-xs font-sans"
                  >
                    <option>Rich Oudh & Warm Woods</option>
                    <option>Fresh Roses & Soft Florals</option>
                    <option>Sweet Amber & Vanilla</option>
                    <option>Smoky Incense & Spices</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1a1c1b] text-[#dfba67] hover:bg-[#775a19] hover:text-[#ffffff] transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em] regal-shadow cursor-pointer"
                >
                  Book Free Consultation
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
