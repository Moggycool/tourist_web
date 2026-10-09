import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Compass,
  Waves,
  Trees,
  ShieldCheck,
  FileText,
  Download,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  Calendar,
  Users,
  Printer
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const AboutSection: React.FC = () => {
  const { hotelInfo, policies, faqs, addInquiry, language, t } = useHotel();

  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-airport');
  const [expandedPolicyId, setExpandedPolicyId] = useState<string | null>('policy-checkin');

  // Inquiry form state
  const [inqName, setInqName] = useState<string>('');
  const [inqEmail, setInqEmail] = useState<string>('');
  const [inqPhone, setInqPhone] = useState<string>('');
  const [inqDept, setInqDept] = useState<'general' | 'reservations' | 'conferences' | 'weddings' | 'airport'>('conferences');
  const [inqDates, setInqDates] = useState<string>('');
  const [inqGuests, setInqGuests] = useState<number>(20);
  const [inqMessage, setInqMessage] = useState<string>('');
  const [inqSubmitted, setInqSubmitted] = useState<boolean>(false);

  // Brochure preview modal
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const distances = [
    { name: 'Arba Minch Domestic Airport (AMH)', time: '10 Mins Drive', desc: 'Daily Ethiopian Airlines flights from Addis Ababa' },
    { name: 'Lake Chamo Boat Pier & Crocodile Market', time: '18 Mins Drive', desc: 'Direct boat launches to hippo & crocodile spots' },
    { name: 'Nechisar National Park Gate', time: '15 Mins Drive', desc: 'Wildlife safari and Burchell zebra grasslands' },
    { name: 'Dorze Cultural Bamboo Villages', time: '40 Mins Scenic Drive', desc: 'Highlands overlooking the twin Rift Valley lakes' },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName.trim() || !inqPhone.trim() || !inqMessage.trim()) return;

    addInquiry({
      guestName: inqName.trim(),
      email: inqEmail.trim() || 'info@guest.com',
      phone: inqPhone.trim(),
      department: inqDept,
      dates: inqDates.trim() || undefined,
      guestsCount: inqGuests,
      message: inqMessage.trim()
    });

    setInqSubmitted(true);
    setInqName('');
    setInqEmail('');
    setInqPhone('');
    setInqDates('');
    setInqMessage('');
    setTimeout(() => setInqSubmitted(false), 7000);
  };

  const handleDownloadBrochure = (type: string) => {
    setDownloadNotice(`Generated digital PDF preview for: ${type}. Opening printable document.`);
    setTimeout(() => {
      setDownloadNotice(null);
      window.print();
    }, 1200);
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Story Intro & Location Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t('about_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('about_title')}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              Arba Minch takes its name from the legendary Amharic words meaning <em>"Forty Springs"</em>, celebrating the dozens of natural crystalline springs bubbling up from the floor of the Rift Valley forest.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              At <strong>{hotelInfo.name}</strong>, we have welcomed international travelers, wildlife photographers, government dignitaries, and families exploring the wonders of Southern Ethiopia. Our hotel offers lush green gardens, peaceful courtyards, reliable 24/7 power backup, solar hot water, and authentic hospitality that makes you feel right at home.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Waves className="w-5 h-5 text-amber-700 mb-1" />
                <h4 className="text-xs font-bold text-stone-900">{t('about_location_card')}</h4>
                <p className="text-[11px] text-stone-500">{t('about_location_desc')}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Trees className="w-5 h-5 text-amber-700 mb-1" />
                <h4 className="text-xs font-bold text-stone-900">{t('about_hours_card')}</h4>
                <p className="text-[11px] text-stone-500">{t('about_hours_desc')}</p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Location & Distances Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
              <MapPin className="w-5 h-5 text-amber-700" />
              <div>
                <h3 className="text-base font-bold text-stone-900">Strategic Location & Map</h3>
                <p className="text-xs text-stone-500">{hotelInfo.addressLine}</p>
              </div>
            </div>

            {/* Stylized Visual Map Card */}
            <div className="relative aspect-16/8 bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 shadow-inner p-4 flex flex-col justify-between text-white">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="bg-amber-600 text-stone-950 font-bold px-2 py-0.5 rounded text-[10px]">
                  📍 Tourist Hotel · Arba Minch (Sikela)
                </span>
                <span className="text-[10px] text-stone-300">Elevation: 1,285m · Great Rift Valley</span>
              </div>
              <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-stone-200 pt-6">
                <div className="bg-stone-800/80 p-2 rounded-lg border border-stone-700">
                  <span className="text-amber-400 block font-bold">Lake Chamo Pier</span>
                  <span>18 mins South</span>
                </div>
                <div className="bg-stone-800/80 p-2 rounded-lg border border-stone-700">
                  <span className="text-amber-400 block font-bold">Nechisar Park Gate</span>
                  <span>15 mins East</span>
                </div>
                <div className="bg-stone-800/80 p-2 rounded-lg border border-stone-700">
                  <span className="text-amber-400 block font-bold">Dorze Chencha</span>
                  <span>40 mins Scenic</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Key Nearby Landmarks & Distances
              </span>
              <div className="space-y-2">
                {distances.map((d, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-stone-900">{d.name}</h4>
                      <p className="text-[11px] text-stone-500">{d.desc}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                      {d.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">{hotelInfo.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold truncate">{hotelInfo.email}</span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Downloadable Brochures & Materials */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Downloadable Hotel Brochures & Documents
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Guest Guides, Menus & Event Packages
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Download or print digital brochures for your upcoming stay, dining, or corporate workshop in Arba Minch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white">Hotel & Rooms Factsheet</h4>
                <p className="text-[11px] text-stone-400">
                  Full overview of Standard, Deluxe, Suite, and Family villas, amenities, and policies.
                </p>
              </div>
              <button
                onClick={() => handleDownloadBrochure('Hotel & Suites Digital Brochure')}
                className="w-full py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print</span>
              </button>
            </div>

            <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white">Restaurant & Terrace Menu</h4>
                <p className="text-[11px] text-stone-400">
                  Lake Chamo fresh fish, Ethiopian specialties, Italian pasta, and Buna coffee ceremony.
                </p>
              </div>
              <button
                onClick={() => handleDownloadBrochure('Restaurant & Terrace Dining Menu')}
                className="w-full py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print</span>
              </button>
            </div>

            <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white">Conferences & Safari Booklet</h4>
                <p className="text-[11px] text-stone-400">
                  Abaya and Chamo meeting halls capacity, projector equipment, and boat safari schedules.
                </p>
              </div>
              <button
                onClick={() => handleDownloadBrochure('Conferences & Safari Tour Booklet')}
                className="w-full py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print</span>
              </button>
            </div>
          </div>

          {downloadNotice && (
            <div className="mt-4 p-3 bg-amber-600/30 border border-amber-500 text-amber-200 text-xs rounded-xl flex items-center gap-2">
              <Printer className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{downloadNotice}</span>
            </div>
          )}
        </div>

        {/* 3. Hotel Policies & FAQs Section */}
        <div id="policies" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Hotel Policies */}
          <div className="lg:col-span-6 space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Transparent Hospitality
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                Hotel Policies & Guest Rules
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Clear rules covering check-in, 48-hour cancellations, payment windows, and family stay.
              </p>
            </div>

            <div className="space-y-2.5">
              {policies.map((p) => {
                const isExpanded = expandedPolicyId === p.id;
                return (
                  <div
                    key={p.id}
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setExpandedPolicyId(isExpanded ? null : p.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        {language === 'am' ? p.titleAmharic : p.title}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                        {language === 'am' ? p.detailsAmharic : p.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: FAQs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Quick Answers
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                Frequently Asked Questions (FAQ)
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Everything you need to know about airport shuttles, safari logistics, and amenities.
              </p>
            </div>

            <div className="space-y-2.5">
              {faqs.map((f) => {
                const isExpanded = expandedFaqId === f.id;
                return (
                  <div
                    key={f.id}
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : f.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{language === 'am' ? f.questionAmharic : f.question}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                        {language === 'am' ? f.answerAmharic : f.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 4. Direct Inquiry & Banquet Request Form */}
        <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Direct Contact & Proposals
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              {t('inquiry_section_title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {t('inquiry_section_subtitle')}
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abebe Bikila"
                  value={inqName}
                  onChange={(e) => setInqName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. +251 91 234 5678"
                  value={inqPhone}
                  onChange={(e) => setInqPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@organization.org"
                  value={inqEmail}
                  onChange={(e) => setInqEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Inquiry Department *
                </label>
                <select
                  value={inqDept}
                  onChange={(e) => setInqDept(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 cursor-pointer"
                >
                  <option value="conferences">Conferences & Meeting Halls (Abaya / Chamo)</option>
                  <option value="weddings">Weddings & Banquets</option>
                  <option value="reservations">Group Room Reservations</option>
                  <option value="airport">Arba Minch Airport Shuttle Coordination</option>
                  <option value="general">General Inquiries & Tours</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Target Dates (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nov 15 - 18, 2026"
                  value={inqDates}
                  onChange={(e) => setInqDates(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Estimated Attendees / Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={inqGuests}
                  onChange={(e) => setInqGuests(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Message / Event Specifications *
              </label>
              <textarea
                rows={3}
                placeholder="Describe your requirements (e.g. Hall setup, projector, coffee breaks, special menu, rooms needed)..."
                value={inqMessage}
                onChange={(e) => setInqMessage(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-stone-500">
                Our hotel management team responds within 2-4 business hours.
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </div>

            {inqSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Thank you! Your inquiry has been submitted and delivered to our hotel events desk.</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};

