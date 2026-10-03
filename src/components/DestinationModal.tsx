import React, { useState } from 'react';
import { X, Heart, Star, MapPin, Calendar, Clock, DollarSign, Sun, CheckCircle, Utensils, Lightbulb, Compass, Share2, Plus } from 'lucide-react';
import { Destination } from '../types';
import { useTravel } from '../context/TravelContext';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onViewExperiences: (destTitle: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onViewExperiences
}) => {
  const { isFavorite, toggleFavorite, formatPrice, formatTemp, addItineraryItem, itinerary } = useTravel();
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedActivityIdx, setAddedActivityIdx] = useState<number | null>(null);

  if (!destination) return null;

  const isFav = isFavorite(destination.id);
  const photos = [destination.heroImage, ...destination.gallery];
  const currentPhoto = photos[selectedPhotoIdx] || destination.heroImage;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddHighlightToPlan = (highlight: { title: string; desc: string }, index: number) => {
    addItineraryItem({
      day: Math.max(1, Math.min(3, Math.ceil(itinerary.length / 2) + 1)),
      time: '11:00 AM',
      activity: `${highlight.title}`,
      location: `${destination.title}, ${destination.country}`,
      cost: 20,
      notes: highlight.desc
    });
    setAddedActivityIdx(index);
    setTimeout(() => setAddedActivityIdx(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="relative h-72 sm:h-96 w-full bg-slate-900 shrink-0">
          <img
            src={currentPhoto}
            alt={destination.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/40" />

          {/* Action buttons on top of image */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold border border-white/20">
              {destination.continent} • {destination.country}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all active:scale-95"
                title="Share or copy link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleFavorite(destination.id)}
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 shadow-md backdrop-blur-md transition-all active:scale-95"
                title="Save destination"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Title Header */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-300 font-semibold mb-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {destination.country}
              </span>
              <span>•</span>
              <span className="capitalize">{destination.category} Category</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {destination.rating} ({destination.reviewsCount} reviews)
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {destination.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-1 mt-0.5">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Gallery Thumbnails Strip */}
        {photos.length > 1 && (
          <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 overflow-x-auto border-t border-slate-800 shrink-0">
            {photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhotoIdx(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  selectedPhotoIdx === idx ? 'border-sky-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Share notification toast */}
          {copiedLink && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Link copied to clipboard! Share with your travel buddies.</span>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Weather</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{formatTemp(destination.averageTemp)}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>Best Season</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{destination.bestSeason}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Clock className="w-4 h-4 text-teal-500" />
                <span>Recommended</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{destination.duration}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>Approx. Daily</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{formatPrice(destination.approxDailyCostUsd)}</p>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-600" />
              <span>About Destination</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {destination.description}
            </p>
          </div>

          {/* Top Highlights & Must-See Spots */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Top Highlights & Landmarks</span>
              </h3>
              <span className="text-xs text-slate-400">Click + to add to itinerary</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-sky-300 transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleAddHighlightToPlan(item, idx)}
                    className={`shrink-0 p-2 rounded-xl text-xs font-semibold transition-all ${
                      addedActivityIdx === idx
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-700 border border-slate-200'
                    }`}
                    title="Add this highlight to your trip itinerary"
                  >
                    {addedActivityIdx === idx ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Local Cuisine & Food Specialties */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-rose-500" />
              <span>Iconic Local Flavors & Cuisine</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {destination.localFood.map((food, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1">
                  <h4 className="text-xs font-bold text-rose-950">{food.name}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{food.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insider Travel Tips */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Insider Travel Tips</span>
            </h3>
            <ul className="space-y-2">
              {destination.travelTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-600 shrink-0">#{idx + 1}</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Tags:</span>
            <div className="flex flex-wrap gap-1">
              {destination.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] font-medium">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onViewExperiences(destination.title);
              }}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/20"
            >
              Browse Guided Experiences
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
