import React from 'react';
import { Star, Heart, Clock, DollarSign, ArrowRight, Sun, Plus, Check } from 'lucide-react';
import { Destination } from '../types';
import { useTravel } from '../context/TravelContext';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (dest: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  const { isFavorite, toggleFavorite, formatPrice, formatTemp, itinerary, addItineraryItem } = useTravel();

  const isFav = isFavorite(destination.id);
  const isInItinerary = itinerary.some(i => i.location.toLowerCase().includes(destination.title.toLowerCase()));

  const handleAddToItinerary = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInItinerary) return;

    // Add first highlight as default activity
    const firstHighlight = destination.highlights[0] || { title: `Explore ${destination.title}`, desc: '' };
    addItineraryItem({
      day: Math.max(1, Math.min(3, Math.ceil(itinerary.length / 2) + 1)),
      time: '10:00 AM',
      activity: `${firstHighlight.title} - ${destination.title}`,
      location: `${destination.title}, ${destination.country}`,
      cost: destination.approxDailyCostUsd / 3,
      notes: destination.travelTips[0] || ''
    });
  };

  return (
    <div 
      onClick={() => onSelect(destination)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Photo Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={destination.heroImage}
          alt={destination.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/50 backdrop-blur-md text-white border border-white/20">
            {destination.continent}
          </span>

          {/* Heart / Wishlist button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(destination.id);
            }}
            className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600 backdrop-blur-md shadow-md transition-all active:scale-90"
            title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay details */}
        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs text-sky-200 font-medium mb-0.5">
            <span>{destination.country}</span>
            <span>•</span>
            <span className="capitalize">{destination.category}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors">
            {destination.title}
          </h3>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {destination.tagline}
          </p>

          {/* Highlights Mini Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destination.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Key Attributes (Season, Temp, Budget) */}
        <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Weather / Temp</span>
            </span>
            <span className="font-semibold text-slate-800">
              {formatTemp(destination.averageTemp)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Ideal Stay</span>
            </span>
            <span className="font-semibold text-slate-800">{destination.duration}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Est. Daily Cost</span>
            </span>
            <span className="font-bold text-slate-900">
              ~{formatPrice(destination.approxDailyCostUsd)} <span className="text-[10px] font-normal text-slate-400">/day</span>
            </span>
          </div>
        </div>

        {/* Footer: Rating & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md text-amber-800 font-bold text-xs border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{destination.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400">({destination.reviewsCount})</span>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddToItinerary}
              title={isInItinerary ? "Already in trip planner" : "Add to trip planner"}
              className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                isInItinerary
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 border border-slate-200/80'
              }`}
            >
              {isInItinerary ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(destination);
              }}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
