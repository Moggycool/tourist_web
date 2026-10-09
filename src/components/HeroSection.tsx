import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight, ShieldCheck, Waves, Coffee, Car, Tag, Star, Zap, Wifi, CreditCard, Copy, Check } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface HeroSectionProps {
  onCheckAvailability: (dates: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomsCount: number;
    category: string;
    promoCode?: string;
  }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability }) => {
  const { hotelInfo, rooms, searchCriteria, setSearchCriteria, validatePromoCode, t } = useHotel();

  const [checkIn, setCheckIn] = useState<string>(searchCriteria.checkIn || '2026-10-12');
  const [checkOut, setCheckOut] = useState<string>(searchCriteria.checkOut || '2026-10-15');
  const [roomCategory, setRoomCategory] = useState<string>(searchCriteria.category || 'all');
  const [adults, setAdults] = useState<number>(searchCriteria.adults || 2);
  const [childrenCount, setChildrenCount] = useState<number>(searchCriteria.children || 0);
  const [roomsCount, setRoomsCount] = useState<number>(searchCriteria.roomsCount || 1);
  const [promoCodeInput, setPromoCodeInput] = useState<string>(searchCriteria.promoCode || '');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const promoStatus = promoCodeInput.trim() ? validatePromoCode(promoCodeInput.trim()) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCriteria({
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      roomsCount,
      category: roomCategory,
      promoCode: promoCodeInput.trim()
    });

    onCheckAvailability({
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      roomsCount,
      category: roomCategory,
      promoCode: promoCodeInput.trim()
    });
  };

  const handleCopyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setPromoCodeInput(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div id="hero" className="relative min-h-[640px] sm:min-h-[700px] flex flex-col justify-between bg-stone-900 text-white overflow-hidden">
      {/* Background Image with Warm Ethiopian Rift Valley Tone */}
      <img
        src={hotelInfo.heroImage}
        alt={hotelInfo.name}
        className="absolute inset-0 w-full h-full object-cover scale-105"
        referrerPolicy="no-referrer"
      />
      
      {/* Measured Scrim Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/50 to-transparent" />

      {/* Seasonal Announcement Bar */}
      <div className="relative z-20 bg-amber-500/90 text-stone-950 py-2 px-4 backdrop-blur-md shadow-xs border-b border-amber-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-stone-950 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              {t('announcement_badge')}
            </span>
            <span>{t('announcement_text')}</span>
          </div>
          <button
            onClick={() => handleCopyPromo('ARBA2026')}
            className="flex items-center gap-1.5 px-3 py-1 bg-stone-950 hover:bg-stone-800 text-amber-300 rounded-lg text-[11px] font-mono font-bold transition-all shadow-xs cursor-pointer"
            title="Click to apply promo code"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Applied: ARBA2026' : 'Use Code ARBA2026'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center my-auto">
        
        {/* Subtitle location badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md">
          <span>{t('hero_badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 max-w-4xl mx-auto leading-tight">
          {t('hero_title')}
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto font-normal mb-8 leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* Interactive Booking Reservation Bar with Multi-Rooms & Promo Support */}
        <div className="max-w-5xl mx-auto bg-white text-stone-900 rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/30 text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-end">
              
              {/* Check-In */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('hero_check_in')}</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              {/* Check-Out */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('hero_check_out')}</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              {/* Room Category */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('rooms_section_title')}</span>
                </label>
                <select
                  aria-label="Room Category"
                  value={roomCategory}
                  onChange={(e) => setRoomCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 cursor-pointer"
                >
                  <option value="all">{t('rooms_all')}</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Guests (Adults & Children) */}
              <div className="md:col-span-3 grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    {t('hero_adults')}
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2 py-2 text-xs font-semibold text-stone-900"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    {t('hero_children')}
                  </label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2 py-2 text-xs font-semibold text-stone-900"
                  >
                    {[0, 1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Second Line: Rooms Count, Promo Code & Search Button */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-stone-100 items-center">
              
              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                  {t('hero_rooms_count')}
                </label>
                <select
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-amber-700" />
                    <span>{t('hero_promo_code')} (Optional)</span>
                  </span>
                  {promoStatus && (
                    <span className="text-[10px] text-emerald-700 font-bold">
                      ✓ Valid: -{promoStatus.discountPercent}% Off!
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter promo code (e.g. ARBA2026)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-xs font-mono font-semibold uppercase ${
                      promoStatus ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900' : 'border-stone-300 text-stone-900'
                    }`}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <button
                  type="submit"
                  className="w-full h-10 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('hero_search_btn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </form>
        </div>

        {/* Feature Highlights Ticker */}
        <div className="mt-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="flex items-center justify-center gap-2">
            <Waves className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('hero_feature_lakes')}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Car className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('hero_feature_shuttle')}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('hero_feature_buna')}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('hero_feature_food')}</span>
          </div>
        </div>

      </div>

      {/* Trust & Guarantee Bar */}
      <div className="relative z-10 bg-stone-950/80 border-t border-stone-800 py-3 px-4 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-stone-300">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-bold text-white">4.8 / 5 Rating</span>
            <span className="text-stone-500">· 320+ Verified Guest Reviews</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>24/7 Power Generator</span>
            </span>
            <span className="flex items-center gap-1 text-stone-300">
              <Wifi className="w-3.5 h-3.5 text-amber-400" />
              <span>High-Speed Wi-Fi</span>
            </span>
            <span className="flex items-center gap-1 text-stone-300">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span>telebirr · CBE Birr · Cash · Visa</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

