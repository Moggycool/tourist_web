import React, { useState } from 'react';
import { Compass, Heart, Calendar, MapPin, Globe2, Menu, X, BookOpen, Sparkles } from 'lucide-react';
import { useTravel, Currency } from '../context/TravelContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { favorites, currency, setCurrency, tempUnit, toggleTempUnit, setIsWishlistOpen, itinerary } = useTravel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

  const navItems = [
    { id: 'explore', label: 'Explore Destinations', icon: Compass },
    { id: 'map', label: 'World Map', icon: MapPin },
    { id: 'experiences', label: 'Tours & Experiences', icon: Sparkles },
    { id: 'itinerary', label: 'Trip Planner', icon: Calendar, badge: itinerary.length },
    { id: 'guides', label: 'Travel Guides', icon: BookOpen }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('explore')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>Tourist</span>
                <span className="text-sky-600">Web</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">World Travel & Discovery</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-sky-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 text-[10px] rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Currency, Temp, Wishlist */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/70 transition-colors px-2.5 py-1.5 rounded-lg border border-slate-200/80 text-xs font-semibold text-slate-700">
              <Globe2 className="w-3.5 h-3.5 text-slate-500" />
              <select
                aria-label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent border-none text-xs font-bold focus:outline-hidden cursor-pointer text-slate-800"
              >
                {currencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Temp Unit Toggle */}
            <button
              onClick={toggleTempUnit}
              title="Toggle Celsius / Fahrenheit"
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 text-slate-700 transition-colors"
            >
              °{tempUnit}
            </button>

            {/* Saved Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200/80"
              title="Saved destinations"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute 0 right-0 w-3.5 h-3.5 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 shadow-lg">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-sky-600 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Currency:</span>
              <select
                aria-label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-slate-100 text-xs font-bold rounded-md px-2 py-1 border border-slate-200"
              >
                {currencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              onClick={toggleTempUnit}
              className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"
            >
              Unit: °{tempUnit}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
