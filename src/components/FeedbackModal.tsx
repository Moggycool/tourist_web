import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Sparkles,
  Heart,
  ThumbsUp,
  Award,
  Copy,
  Check,
  BedDouble,
  ShieldCheck,
  Compass,
  MessageSquare
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { RoomBooking } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledBooking?: Partial<RoomBooking> | null;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  prefilledBooking
}) => {
  const { rooms, addFeedback, bookings, hotelInfo } = useHotel();

  // Form State
  const [bookingRef, setBookingRef] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestCountry, setGuestCountry] = useState<string>('Addis Ababa, Ethiopia');
  const [roomName, setRoomName] = useState<string>('Deluxe King Lake View');
  const [stayMonthYear, setStayMonthYear] = useState<string>('October 2026');
  const [travelType, setTravelType] = useState<'couple' | 'solo' | 'family' | 'business' | 'safari_group'>('couple');

  // Star Ratings
  const [ratingOverall, setRatingOverall] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const [ratingCleanliness, setRatingCleanliness] = useState<number>(5);
  const [ratingHospitality, setRatingHospitality] = useState<number>(5);
  const [ratingDining, setRatingDining] = useState<number>(5);
  const [ratingSafari, setRatingSafari] = useState<number>(5);
  const [ratingComfort, setRatingComfort] = useState<number>(5);
  const [ratingValue, setRatingValue] = useState<number>(5);

  const [title, setTitle] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [favoriteHighlight, setFavoriteHighlight] = useState<string>('Lake Chamo Crocodile Market Boat Trip');
  const [staffCompliment, setStaffCompliment] = useState<string>('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean>(true);

  // Status & Success state
  const [isVerifiedBooking, setIsVerifiedBooking] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [discountCodeAwarded, setDiscountCodeAwarded] = useState<string>('RETURNING15');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Prefill when provided
  useEffect(() => {
    if (prefilledBooking) {
      if (prefilledBooking.bookingRef) setBookingRef(prefilledBooking.bookingRef);
      if (prefilledBooking.guestName) setGuestName(prefilledBooking.guestName);
      if (prefilledBooking.guestEmail) setGuestEmail(prefilledBooking.guestEmail);
      if (prefilledBooking.roomName) setRoomName(prefilledBooking.roomName);
      setIsVerifiedBooking(true);
    } else {
      // Default to sample booking if available
      setBookingRef('TH-AM-7489');
      setGuestName('Elias Bekele');
      setGuestEmail('elias.b@gmail.com');
      setIsVerifiedBooking(true);
    }
  }, [prefilledBooking, isOpen]);

  if (!isOpen) return null;

  // Check verification against existing bookings
  const handleBookingRefBlur = () => {
    if (!bookingRef) return;
    const match = bookings.find(
      b => b.bookingRef.trim().toUpperCase() === bookingRef.trim().toUpperCase()
    );
    if (match) {
      setIsVerifiedBooking(true);
      if (!guestName) setGuestName(match.guestName);
      if (!guestEmail) setGuestEmail(match.guestEmail);
      if (match.roomName) setRoomName(match.roomName);
    } else {
      setIsVerifiedBooking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !comments.trim()) return;

    const res = addFeedback({
      bookingRef: bookingRef.trim() || 'VERIFIED-GUEST',
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim() || 'guest@touristhotel.com',
      guestCountry: guestCountry.trim() || 'Ethiopia',
      roomName,
      stayMonthYear,
      ratingOverall,
      ratings: {
        cleanliness: ratingCleanliness,
        hospitality: ratingHospitality,
        diningFood: ratingDining,
        lakeTourSafari: ratingSafari,
        wifiComfort: ratingComfort,
        valueForMoney: ratingValue
      },
      title: title.trim() || `${ratingOverall >= 4 ? 'Superb' : 'Pleasant'} stay at Tourist Hotel Arba Minch`,
      comments: comments.trim(),
      favoriteHighlight: favoriteHighlight.trim(),
      staffCompliment: staffCompliment.trim(),
      wouldRecommend,
      travelType,
      verifiedStay: isVerifiedBooking || true
    });

    if (res.discountCode) {
      setDiscountCodeAwarded(res.discountCode);
    }
    setIsSubmitted(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCodeAwarded);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const getOverallLabel = (val: number) => {
    switch (val) {
      case 5:
        return '5 / 5 · Exceptional! Exceeded all expectations';
      case 4:
        return '4 / 5 · Very Good! A thoroughly delightful stay';
      case 3:
        return '3 / 5 · Good! Met expectations';
      case 2:
        return '2 / 5 · Fair! Several areas could improve';
      default:
        return '1 / 5 · Disappointing';
    }
  };

  const sampleHighlights = [
    'Lake Chamo Crocodile Market Boat Trip',
    'Garden Buna Coffee Ceremony',
    'Fresh Pan-Fried Lake Chamo Tilapia',
    'Nechisar Plains Wildlife Safari',
    'Dorze Traditional Weavers Village Tour',
    'Forty Springs Forest Sanctuary Walk',
    'Panoramic Twin Lakes Sunrise from Balcony'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md">
              <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Post-Stay Satisfaction Review</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                  Guest Voice
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Tourist Hotel Arba Minch · Southern Rift Valley, Ethiopia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-stone-800">
          {isSubmitted ? (
            /* Submission Success Screen */
            <div className="text-center py-6 sm:py-8 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Review Verified & Recorded
                </span>
                <h3 className="text-xl font-black text-stone-900">
                  Amesegenalehu! Thank You, {guestName}!
                </h3>
                <p className="text-stone-600 text-xs max-w-md mx-auto mt-1.5">
                  Your heartfelt feedback helps us preserve authentic Ethiopian hospitality while continually
                  improving our rooms, dining, and lake excursions.
                </p>
              </div>

              {/* Reward Coupon Box */}
              <div className="bg-linear-to-br from-amber-50 via-amber-100/70 to-stone-100 border border-amber-300/80 rounded-2xl p-5 max-w-md mx-auto space-y-3 shadow-xs">
                <div className="flex items-center justify-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Exclusive Return Guest Benefit</span>
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-stone-700 text-xs">
                  As our token of gratitude, please enjoy <span className="font-bold text-stone-900">15% off</span> your next visit to Arba Minch:
                </p>

                <div className="flex items-center justify-between bg-white border border-amber-300 rounded-xl px-4 py-2.5 shadow-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block font-semibold">Promotion Code</span>
                    <span className="text-base font-extrabold text-amber-800 tracking-wider font-mono">
                      {discountCodeAwarded}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Apply during online reservation or mention to front desk ({hotelInfo.phonePrimary}) upon your next booking.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('reviews');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold cursor-pointer transition-colors"
                >
                  View Guest Reviews Section
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-semibold cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Review Entry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Top Banner */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3">
                <Heart className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-stone-900 text-xs">
                    How was your experience at Tourist Hotel Arba Minch?
                  </p>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    Whether you stayed with us to explore the giant crocodiles of Lake Chamo, discover Dorze cultural
                    traditions, or relax in our verdant Rift Valley gardens, we value your feedback. All respondents receive a{' '}
                    <span className="font-bold text-amber-900">15% Return Guest Voucher</span>.
                  </p>
                </div>
              </div>

              {/* Step 1: Booking Reference & Guest Identification */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Reservation Verification</span>
                  </span>
                  {isVerifiedBooking && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Stay
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Reservation Reference (Voucher Code)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TH-AM-7489"
                      value={bookingRef}
                      onChange={(e) => setBookingRef(e.target.value)}
                      onBlur={handleBookingRefBlur}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                    <span className="text-[10px] text-stone-500 mt-0.5 block">
                      Found on your stay voucher or SMS confirmation.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Room Category Stayed
                    </label>
                    <select
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    >
                      {rooms.map(r => (
                        <option key={r.id} value={r.name}>{r.name}</option>
                      ))}
                      <option value="Executive Garden Suite">Executive Garden Suite</option>
                      <option value="Family Villa Suite">Family Villa Suite</option>
                      <option value="Standard Double Room">Standard Double Room</option>
                      <option value="Deluxe King Lake View">Deluxe King Lake View</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elias Bekele"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Email Address (for discount voucher)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. elias@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Home City / Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Addis Ababa / Germany"
                      value={guestCountry}
                      onChange={(e) => setGuestCountry(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Travel Style
                    </label>
                    <select
                      value={travelType}
                      onChange={(e) => setTravelType(e.target.value as any)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    >
                      <option value="couple">Couple / Romantic Getaway</option>
                      <option value="solo">Solo Explorer / Nature Lover</option>
                      <option value="family">Family with Children</option>
                      <option value="safari_group">Wildlife Safari & Friends Group</option>
                      <option value="business">Business / NGO / Conference Delegate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Stay Month & Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. October 2026"
                      value={stayMonthYear}
                      onChange={(e) => setStayMonthYear(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Overall Satisfaction Rating */}
              <div className="p-4 bg-amber-50/50 border border-amber-200/80 rounded-2xl space-y-3 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                  Overall Stay Rating
                </span>

                <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingOverall(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 sm:p-2 transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                      title={`${star} Stars`}
                    >
                      <Star
                        className={`w-8 h-8 sm:w-9 sm:h-9 ${
                          (hoverRating !== null ? star <= hoverRating : star <= ratingOverall)
                            ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="font-extrabold text-stone-800 text-sm">
                  {getOverallLabel(hoverRating || ratingOverall)}
                </p>
              </div>

              {/* Step 3: Aspect Ratings Breakdown (Cleanliness, Staff, Food, Safaris, Power, Value) */}
              <div className="border border-stone-200 rounded-2xl p-4 space-y-3 bg-stone-50/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                  Detailed Experience Criteria (1 to 5 Stars)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Cleanliness */}
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                    <span className="font-medium text-stone-800">Room Cleanliness & Comfort</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRatingCleanliness(s)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              s <= ratingCleanliness ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Staff */}
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                    <span className="font-medium text-stone-800">Staff Warmth & Hospitality</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRatingHospitality(s)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              s <= ratingHospitality ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Food */}
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                    <span className="font-medium text-stone-800">Dining, Fish & Buna Coffee</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRatingDining(s)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              s <= ratingDining ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Safari */}
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                    <span className="font-medium text-stone-800">Lake Chamo Safari / Tours</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRatingSafari(s)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              s <= ratingSafari ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comfort */}
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                    <span className="font-medium text-stone-800">Power, Wi-Fi & Hot Water</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRatingComfort(s)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              s <= ratingComfort ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                    <span className="font-medium text-stone-800">Overall Value for Money</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRatingValue(s)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              s <= ratingValue ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Narrative Comments & Review Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Review Headline / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unforgettable sunrise over the Rift Valley lakes & super friendly team"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Describe Your Stay Experience *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell other travelers what you enjoyed most about Tourist Hotel, the rooms, Lake Chamo boat safari, dining, or the staff..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Favorite Highlights Chips */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Favorite Highlight of Your Stay
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {sampleHighlights.map((hl) => (
                      <button
                        key={hl}
                        type="button"
                        onClick={() => setFavoriteHighlight(hl)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer ${
                          favoriteHighlight === hl
                            ? 'bg-amber-700 text-white font-bold'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {hl}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={favoriteHighlight}
                    onChange={(e) => setFavoriteHighlight(e.target.value)}
                    placeholder="Or type a custom favorite memory..."
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Staff Compliment */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Staff Recognition / Commendation (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dawit at the reception desk, driver Abebe, or Chef Martha..."
                    value={staffCompliment}
                    onChange={(e) => setStaffCompliment(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    We recognize and reward our team members based on guest compliments!
                  </span>
                </div>

                {/* Recommendation Toggle */}
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4 text-amber-700" />
                    <span>Would you recommend Tourist Hotel Arba Minch to fellow travelers?</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setWouldRecommend(true)}
                      className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer text-xs ${
                        wouldRecommend
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                      }`}
                    >
                      Yes, Definitely!
                    </button>
                    <button
                      type="button"
                      onClick={() => setWouldRecommend(false)}
                      className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer text-xs ${
                        !wouldRecommend
                          ? 'bg-rose-600 text-white'
                          : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <span className="text-[11px] text-stone-500">
                  🎁 Submitting unlocks a 15% return stay discount code.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Submit Verified Review</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
