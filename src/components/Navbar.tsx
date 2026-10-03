import React, { useState } from 'react';
import { Menu, X, Phone, Lock, CalendarCheck } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface NavbarProps {
  onBookClick: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, activeSection, setActiveSection }) => {
  const { hotelInfo, currency, setCurrency, setIsAdminOpen, bookings } = useHotel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'dining', label: 'Dining & Coffee' },
    { id: 'tours', label: 'Tours & Safaris' },
    { id: 'events', label: 'Events & Media' },
    { id: 'meetings', label: 'Conferences' },
    { id: 'about', label: 'About & Location' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top micro info strip */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">📍 {hotelInfo.city}, {hotelInfo.country}</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Reception: {hotelInfo.phonePrimary}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-400 hidden md:inline">24/7 Front Desk · Free Airport Transfer</span>
            {/* Currency toggle */}
            <div className="flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded text-white">
              <span className="text-stone-400">Currency:</span>
              <button
                onClick={() => setCurrency('ETB')}
                className={`px-1 font-bold ${currency === 'ETB' ? 'text-amber-400 underline' : 'text-stone-300'}`}
              >
                ETB
              </button>
              <span className="text-stone-500">|</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-1 font-bold ${currency === 'USD' ? 'text-amber-400 underline' : 'text-stone-300'}`}
              >
                USD
              </button>
            </div>
            {/* Admin Portal Shortcut */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 text-stone-300 hover:text-amber-300 transition-colors ml-2"
              title="System Admin Portal (Edit Hotel Content & Upload Media)"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span className="font-semibold">Admin CMS</span>
              {bookings.length > 0 && (
                <span className="w-3.5 h-3.5 bg-amber-500 text-stone-950 font-bold text-[9px] rounded-full flex items-center justify-center">
                  {bookings.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main One-Row Three-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
              {hotelInfo.name}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-stone-500">
              Arba Minch · Ethiopia
            </span>
          </a>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 ${
                  activeSection === link.id
                    ? 'text-amber-800 font-bold border-b-2 border-amber-600'
                    : 'hover:text-stone-950'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBookClick}
              className="px-4.5 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-5 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-2 rounded-lg"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="px-4 py-2 bg-amber-700 text-white rounded-lg text-xs font-bold"
            >
              Book Room
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
