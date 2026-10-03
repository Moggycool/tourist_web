import React, { useState } from 'react';
import { MapPin, Star, Compass, ArrowRight, Eye, Layers } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { useTravel } from '../context/TravelContext';

interface InteractiveMapProps {
  onSelectDestination: (dest: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectDestination }) => {
  const { formatTemp } = useTravel();
  const [activePin, setActivePin] = useState<Destination | null>(DESTINATIONS[0]);
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  const continents = ['All', 'Europe', 'Asia', 'Americas', 'Africa'];

  const filteredDestinations = selectedContinent === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.continent === selectedContinent);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
            <Compass className="w-4 h-4" />
            <span>Geographic Atlas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive World Destination Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Click on mapped coordinates to inspect local climate, highlights, and travel ratings.
          </p>
        </div>

        {/* Continent Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedContinent === continent
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {continent}
            </button>
          ))}
        </div>
      </div>

      {/* Map Board Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Stylized Interactive Map Canvas */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[420px] sm:min-h-[500px]">
          
          {/* Subtle Grid / Lat Long Lines Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
              backgroundSize: '28px 28px'
            }}
          />

          {/* Continents Outline (Stylized SVG World Map) */}
          <div className="absolute inset-4 sm:inset-8 opacity-25 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 1000 500" className="w-full h-full fill-slate-500">
              {/* Simplified stylized landmass silhouettes */}
              {/* North America */}
              <path d="M120,60 Q180,40 260,70 Q320,110 280,180 Q220,230 190,260 Q170,220 120,160 Q80,110 120,60 Z" />
              {/* South America */}
              <path d="M260,280 Q330,300 340,380 Q320,460 270,480 Q230,420 240,350 Q240,300 260,280 Z" />
              {/* Europe */}
              <path d="M470,80 Q560,70 580,130 Q540,180 480,170 Q440,140 470,80 Z" />
              {/* Africa */}
              <path d="M470,190 Q570,190 580,280 Q560,390 500,430 Q450,360 440,270 Q450,210 470,190 Z" />
              {/* Asia */}
              <path d="M590,70 Q780,60 860,140 Q840,240 760,280 Q680,240 600,190 Q580,130 590,70 Z" />
              {/* Australia / Oceania */}
              <path d="M780,330 Q860,320 880,380 Q840,430 780,420 Q750,370 780,330 Z" />
            </svg>
          </div>

          {/* Map Top Bar Controls */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>{filteredDestinations.length} Marked Destinations</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              LAT/LONG COORDINATE PROJECTION
            </div>
          </div>

          {/* Destination Markers */}
          <div className="relative w-full h-80 sm:h-96 my-auto">
            {filteredDestinations.map((dest) => {
              const isSelected = activePin?.id === dest.id;
              return (
                <div
                  key={dest.id}
                  style={{
                    left: `${dest.coordinates.x}%`,
                    top: `${dest.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => setActivePin(dest)}
                    className={`relative flex items-center justify-center transition-all ${
                      isSelected
                        ? 'scale-125 z-30'
                        : 'hover:scale-115'
                    }`}
                  >
                    {/* Pulsing ring around marker */}
                    <span className={`absolute w-7 h-7 rounded-full animate-ping opacity-60 ${
                      isSelected ? 'bg-sky-400' : 'bg-teal-400 opacity-20'
                    }`} />
                    
                    {/* Pin marker icon */}
                    <div className={`p-2 rounded-full shadow-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-sky-500 border-white text-white shadow-sky-500/50'
                        : 'bg-slate-800 border-sky-400/60 text-sky-300 hover:bg-sky-600 hover:text-white'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {/* Marker Tooltip label */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-md opacity-100 scale-100'
                      : 'bg-black/75 text-white opacity-0 group-hover:opacity-100 scale-95'
                  }`}>
                    {dest.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Footer Info */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Click any coordinate pin to inspect itinerary & stats</span>
            <span className="font-mono text-sky-400">GLOBAL DISCOVERY ATLAS</span>
          </div>
        </div>

        {/* Selected Destination Preview Card */}
        <div className="lg:col-span-4 space-y-4">
          {activePin ? (
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md space-y-4 animate-fadeIn">
              
              {/* Image Preview */}
              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activePin.heroImage}
                  alt={activePin.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                  {activePin.continent}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs text-sky-200 font-semibold">{activePin.country}</div>
                  <h3 className="text-xl font-bold tracking-tight">{activePin.title}</h3>
                </div>
              </div>

              {/* Rating & Temperature */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{activePin.rating} ({activePin.reviewsCount})</span>
                </div>
                <div className="text-slate-600 font-semibold">
                  Avg: {formatTemp(activePin.averageTemp)}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {activePin.tagline}
              </p>

              {/* Highlights Preview */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Featured Highlights
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {activePin.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-500 font-bold">•</span>
                      <span className="line-clamp-1">{h.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectDestination(activePin)}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Destination Guide</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </button>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-400">
              Select a pin on the map to view destination highlights.
            </div>
          )}

          {/* Quick List for rapid browsing */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-slate-600">Quick Destination Jump:</span>
            <div className="flex flex-wrap gap-1.5">
              {filteredDestinations.map(d => (
                <button
                  key={d.id}
                  onClick={() => setActivePin(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activePin?.id === d.id
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
