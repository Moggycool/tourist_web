import React, { useState } from 'react';
import { Star, Clock, Users, CheckCircle, Sparkles, DollarSign, Calendar, ShieldCheck } from 'lucide-react';
import { TOUR_EXPERIENCES } from '../data/destinations';
import { TourExperience } from '../types';
import { useTravel } from '../context/TravelContext';

interface ExperiencesSectionProps {
  onBook: (exp: TourExperience) => void;
  filterDestination?: string;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onBook, filterDestination = '' }) => {
  const { formatPrice } = useTravel();
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>(filterDestination || 'All');

  const destinationsList = ['All', ...Array.from(new Set(TOUR_EXPERIENCES.map(e => e.destinationTitle)))];

  const filteredExperiences = selectedDestinationFilter === 'All'
    ? TOUR_EXPERIENCES
    : TOUR_EXPERIENCES.filter(e => e.destinationTitle === selectedDestinationFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Guided Tours & Activities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Curated Local Experiences
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Handpicked adventures with certified local guides, small groups, and instant confirmation passes.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {destinationsList.map((dest) => (
            <button
              key={dest}
              onClick={() => setSelectedDestinationFilter(dest)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDestinationFilter === dest
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              {/* Photo */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md">
                  {exp.destinationTitle} • {exp.country}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-slate-900 shadow-md">
                  {exp.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{exp.duration}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    <span>{exp.groupSize}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                  {exp.title}
                </h3>

                {/* Inclusions */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Benefits</span>
                  <div className="space-y-1">
                    {exp.included.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Footer with Price & CTA */}
            <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">From only</span>
                <div className="text-lg font-black text-slate-900">
                  {formatPrice(exp.priceUsd)}
                  <span className="text-xs font-normal text-slate-500"> / guest</span>
                </div>
              </div>

              <button
                onClick={() => onBook(exp)}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/20"
              >
                Book Experience
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Trust Guarantee Banner */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-800">100% Verified Local Operators</p>
            <p className="text-slate-500 text-[11px]">Free cancellation up to 24 hours prior to activity departure.</p>
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          Instant digital vouchers provided with all bookings.
        </div>
      </div>

    </div>
  );
};
