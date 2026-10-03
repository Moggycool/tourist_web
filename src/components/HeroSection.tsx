import React from 'react';
import { Search, Sparkles, MapPin, Compass, ShieldCheck, Camera, Users, Sun } from 'lucide-react';
import { CategoryType } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  selectedContinent: string;
  setSelectedContinent: (cont: string) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedContinent,
  setSelectedContinent,
  onExploreClick
}) => {
  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Destinations', icon: '🌍' },
    { id: 'nature', label: 'Nature & Parks', icon: '🌲' },
    { id: 'heritage', label: 'Cultural Heritage', icon: '⛩️' },
    { id: 'beach', label: 'Coastal & Beaches', icon: '🏖️' },
    { id: 'adventure', label: 'Adventure & Mountains', icon: '🧗' },
    { id: 'culinary', label: 'Food & Gastronomy', icon: '🍜' },
  ];

  const continents = ['All Regions', 'Europe', 'Asia', 'Americas', 'Africa'];

  const trendingTags = ['Kyoto Temples', 'Amalfi Cliffside', 'Banff Rockies', 'Machu Picchu', 'Swiss Alps'];

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-xl border border-slate-800">
      {/* Background with ambient gradient and travel photo texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/70 via-slate-950/50 to-transparent" />

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Curated Global Travel Guide & Itinerary Planner</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Discover Extraordinary Places. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-amber-200">
            Plan Unforgettable Journeys.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal mb-8 leading-relaxed">
          From ancient stone temples and secret glacial lakes to Mediterranean cliffs and vibrant souks, explore hand-crafted travel itineraries and book local experiences.
        </p>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/20 text-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search destination, country, or vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl text-sm font-medium border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Continent / Region Selector */}
            <div className="sm:col-span-3 relative flex items-center">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                aria-label="Continent"
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl text-xs font-semibold border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer text-slate-700"
              >
                {continents.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Action Button */}
            <div className="sm:col-span-3">
              <button
                onClick={onExploreClick}
                className="w-full h-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-sky-600/30 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Find Spots</span>
              </button>
            </div>

          </div>

          {/* Quick Trending Tags */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-600 text-[11px] mr-1">Trending:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag.split(' ')[0])}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-[11px] font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-sky-400 mb-1">
              <Compass className="w-4 h-4" />
              <span className="text-xl font-black text-white">100%</span>
            </div>
            <span className="text-xs text-slate-400">Verified Travel Data</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              <Sun className="w-4 h-4" />
              <span className="text-xl font-black text-white">Season Guide</span>
            </div>
            <span className="text-xs text-slate-400">Optimal Weather Tips</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-teal-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xl font-black text-white">4.9 / 5.0</span>
            </div>
            <span className="text-xs text-slate-400">Top Traveler Rating</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-rose-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xl font-black text-white">Local Guides</span>
            </div>
            <span className="text-xs text-slate-400">Authentic Food & Tips</span>
          </div>
        </div>

      </div>
    </div>
  );
};
