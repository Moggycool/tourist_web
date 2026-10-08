import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight, ShieldCheck, Waves, Coffee, Car } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface HeroSectionProps {
  onCheckAvailability: (dates: { checkIn: string; checkOut: string; guests: number; category: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability }) => {
  const { hotelInfo, rooms, t } = useHotel();

  const [checkIn, setCheckIn] = useState<string>('2026-10-10');
  const [checkOut, setCheckOut] = useState<string>('2026-10-13');
  const [roomCategory, setRoomCategory] = useState<string>('all');
  const [guests, setGuests] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      guests,
      category: roomCategory
    });
  };

  return (
    <div id="hero" className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
      {/* Background Image with Warm Ethiopian Rift Valley Tone */}
      <img
        src={hotelInfo.heroImage}
        alt={hotelInfo.name}
        className="absolute inset-0 w-full h-full object-cover scale-105"
        referrerPolicy="no-referrer"
      />
      
      {/* Measured Scrim Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/75 via-stone-900/40 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        
        {/* Subtitle location badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
          <span>{t('hero_badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          {t('hero_title')}
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto font-normal mb-10 leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* Interactive Booking Reservation Bar (like Saro Hotel) */}
        <div className="max-w-4xl mx-auto bg-white text-stone-900 rounded-2xl shadow-2xl p-4 sm:p-5 border border-white/20 text-left">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            
            {/* Check-In */}
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('hero_check_in')}</span>
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('hero_check_out')}</span>
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            {/* Room Type */}
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('rooms_section_title')}</span>
              </label>
              <select
                aria-label="Room Category"
                value={roomCategory}
                onChange={(e) => setRoomCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 cursor-pointer"
              >
                <option value="all">{t('rooms_all')}</option>
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Guests & Action Button */}
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full h-10 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('hero_search_btn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Feature Highlights Ticker */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="flex items-center justify-center gap-2">
            <Waves className="w-4 h-4 text-amber-400" />
            <span>{t('hero_feature_lakes')}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Car className="w-4 h-4 text-amber-400" />
            <span>{t('hero_feature_shuttle')}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>{t('hero_feature_buna')}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t('hero_feature_food')}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
