import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  Heart,
  MessageSquare,
  Sparkles,
  Award,
  Filter,
  UserCheck,
  Compass,
  BedDouble,
  Building2,
  Calendar
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { PostStayFeedback } from '../types';

export const ReviewsSection: React.FC = () => {
  const { feedbacks, openFeedbackModal, t } = useHotel();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter only published feedbacks for public site
  const publishedFeedbacks = feedbacks.filter(f => f.status === 'Published');

  // Calculate statistics
  const totalReviews = publishedFeedbacks.length;
  const avgOverall = totalReviews > 0
    ? (publishedFeedbacks.reduce((sum, f) => sum + f.ratingOverall, 0) / totalReviews).toFixed(1)
    : '4.9';

  const recommendCount = publishedFeedbacks.filter(f => f.wouldRecommend).length;
  const recommendPercent = totalReviews > 0 ? Math.round((recommendCount / totalReviews) * 100) : 98;

  // Filtered reviews
  const displayedReviews = publishedFeedbacks.filter(f => {
    if (selectedFilter === 'all') return true;
    return f.travelType === selectedFilter;
  });

  return (
    <section id="reviews" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Post-Stay Guest Satisfaction & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Loved by Safari Adventurers, Families & Explorers
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Read authentic impressions from travelers who woke up to Rift Valley lake sunrises, cruised with giant
            crocodiles on Lake Chamo, and experienced true Southern Ethiopian hospitality.
          </p>
        </div>

        {/* Aggregate Ratings & Metrics Overview Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Big Score Block */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-linear-to-b from-amber-50 to-stone-50 rounded-2xl border border-amber-200/80 text-center">
            <span className="text-5xl sm:text-6xl font-black text-stone-900 tracking-tight font-mono">
              {avgOverall}
            </span>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="font-bold text-stone-800 text-xs uppercase tracking-wider">
              Exceptional Guest Rating
            </p>
            <p className="text-stone-500 text-xs mt-1">
              Based on {totalReviews} verified post-stay satisfaction surveys
            </p>

            <div className="mt-4 pt-4 border-t border-amber-200/80 w-full flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-200">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{recommendPercent}% of guests recommend staying with us</span>
            </div>
          </div>

          {/* Category Breakdown Bars */}
          <div className="lg:col-span-8 space-y-3.5 text-xs">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
              Verified Satisfaction by Category
            </h4>

            {/* Cleanliness */}
            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Room Cleanliness & Linens</span>
                <span className="font-bold text-stone-900">4.9 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '98%' }} />
              </div>
            </div>

            {/* Hospitality */}
            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Staff Warmth & Front Desk Hospitality</span>
                <span className="font-bold text-stone-900">5.0 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Dining & Fresh Fish */}
            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Lake Chamo Tilapia Dining & Traditional Buna</span>
                <span className="font-bold text-stone-900">4.9 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '98%' }} />
              </div>
            </div>

            {/* Safari Excursions */}
            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Lake Chamo Boat Safari & Nechisar Coordination</span>
                <span className="font-bold text-stone-900">5.0 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Value for Money */}
            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1">
                <span>Solar Hot Water, Power Generator & Overall Value</span>
                <span className="font-bold text-stone-900">4.8 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Filters Bar & Write Review CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Travel Type Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'couple', label: 'Couples' },
              { id: 'family', label: 'Families' },
              { id: 'solo', label: 'Solo Explorers' },
              { id: 'safari_group', label: 'Safari Groups' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Trigger Button to Submit Feedback */}
          <button
            onClick={() => openFeedbackModal()}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Leave Post-Stay Feedback (Claim 15% Off)</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedReviews.map((fb) => (
            <div
              key={fb.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-300 transition-colors"
            >
              <div className="space-y-3">
                {/* Review Header: User & Verified Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-stone-900 text-sm">
                        {fb.guestName}
                      </h4>
                      {fb.verifiedStay && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Stay</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {fb.guestCountry || 'Ethiopia'} · {fb.stayMonthYear}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= fb.ratingOverall
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-bold text-amber-900 ml-1">
                      {fb.ratingOverall}.0
                    </span>
                  </div>
                </div>

                {/* Room and Travel Type Badges */}
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-md font-medium flex items-center gap-1">
                    <BedDouble className="w-3 h-3 text-amber-700" />
                    <span>{fb.roomName}</span>
                  </span>
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md capitalize">
                    {fb.travelType.replace('_', ' ')}
                  </span>
                </div>

                {/* Review Title & Comments */}
                <div className="space-y-1.5 pt-1">
                  <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                    "{fb.title}"
                  </h5>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {fb.comments}
                  </p>
                </div>

                {/* Highlights & Compliments */}
                <div className="pt-2 space-y-1.5 text-[11px]">
                  {fb.favoriteHighlight && (
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <span className="font-bold text-amber-900">🌟 Highlight:</span>
                      <span className="bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 text-amber-950 font-medium">
                        {fb.favoriteHighlight}
                      </span>
                    </div>
                  )}

                  {fb.staffCompliment && (
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <span className="font-bold text-stone-900">👏 Staff Praise:</span>
                      <span className="italic text-stone-600">
                        "{fb.staffCompliment}"
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Management Response Card (if present) */}
              {fb.managementResponse && (
                <div className="mt-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200/90 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-800 font-bold text-[11px]">
                    <Building2 className="w-3.5 h-3.5 text-amber-800" />
                    <span>Response from Hotel Management</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      · {fb.managementResponse.responseDate}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed italic">
                    "{fb.managementResponse.responseText}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Post-Stay Call to Action Card */}
        <div className="bg-linear-to-r from-stone-900 via-stone-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Checked Out Recently?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Share Your Post-Stay Satisfaction Experience
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed">
              Did our team welcome you warmly? Did you catch the sunrise over Lake Chamo? Your review directly
              inspires our staff and helps fellow Rift Valley travelers. Receive an instant 15% discount for your return visit.
            </p>
          </div>

          <button
            onClick={() => openFeedbackModal()}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-2xl text-xs font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>Submit Post-Stay Review</span>
          </button>
        </div>

      </div>
    </section>
  );
};
