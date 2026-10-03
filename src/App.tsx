import React, { useState, useMemo } from 'react';
import { TravelProvider, useTravel } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationCard } from './components/DestinationCard';
import { DestinationModal } from './components/DestinationModal';
import { InteractiveMap } from './components/InteractiveMap';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { ExperiencesSection } from './components/ExperiencesSection';
import { BookingModal } from './components/BookingModal';
import { TravelGuidesSection } from './components/TravelGuidesSection';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { DESTINATIONS } from './data/destinations';
import { CategoryType, Destination, TourExperience } from './types';
import { Compass, SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    selectedDestination,
    setSelectedDestination,
    bookingExperience,
    setBookingExperience,
  } = useTravel();

  const [activeTab, setActiveTab] = useState<string>('explore');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedContinent, setSelectedContinent] = useState<string>('All Regions');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'cost-low' | 'cost-high'>('rating');
  const [experienceDestFilter, setExperienceDestFilter] = useState<string>('');

  // Filter & sort logic
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      // Category filter
      if (selectedCategory !== 'all' && dest.category !== selectedCategory) {
        return false;
      }
      // Continent filter
      if (selectedContinent !== 'All Regions' && dest.continent !== selectedContinent) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = dest.title.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesTag = dest.tags.some(t => t.toLowerCase().includes(q));
        const matchesDesc = dest.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCountry && !matchesTag && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'cost-low') return a.approxDailyCostUsd - b.approxDailyCostUsd;
      if (sortBy === 'cost-high') return b.approxDailyCostUsd - a.approxDailyCostUsd;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedContinent, sortBy]);

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handleViewExperiences = (destTitle: string) => {
    setExperienceDestFilter(destTitle);
    setActiveTab('experiences');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookExperience = (exp: TourExperience) => {
    setBookingExperience(exp);
  };

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* TAB 1: EXPLORE DESTINATIONS */}
        {activeTab === 'explore' && (
          <div className="space-y-12">
            
            {/* Hero Banner with Search */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedContinent={selectedContinent}
              setSelectedContinent={setSelectedContinent}
              onExploreClick={scrollToDestinations}
            />

            {/* Destinations Directory Section */}
            <div id="destinations-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
              
              {/* Section Sub-header & Sort Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Compass className="w-5 h-5 text-sky-600" />
                    <span>Featured Destinations</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing {filteredDestinations.length} verified tourist spots worldwide
                  </p>
                </div>

                {/* Sort dropdown & reset */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs text-slate-600">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-500">Sort by:</span>
                    <select
                      aria-label="Sort destinations by"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent font-bold focus:outline-hidden text-slate-800 cursor-pointer"
                    >
                      <option value="rating">Top Rated</option>
                      <option value="reviews">Most Reviewed</option>
                      <option value="cost-low">Budget: Low to High</option>
                      <option value="cost-high">Budget: High to Low</option>
                    </select>
                  </div>

                  {(searchQuery || selectedCategory !== 'all' || selectedContinent !== 'All Regions') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedContinent('All Regions');
                      }}
                      className="text-xs text-sky-600 hover:text-sky-700 font-bold hover:underline"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>

              {/* Destination Cards Grid */}
              {filteredDestinations.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No destinations match your criteria</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try clearing your search query or picking "All Regions" to discover places across the globe.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedContinent('All Regions');
                    }}
                    className="mt-2 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-500"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onSelect={handleSelectDestination}
                    />
                  ))}
                </div>
              )}

            </div>

            {/* Quick Teaser for Guided Experiences */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Small-Group Tour Adventures</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Looking for guided experiences with certified locals?</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Discover sunrise canoe safaris, authentic Kyoto tea ceremonies, Amalfi sunset cruises, and alpine paragliding flights.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('experiences');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold shadow-lg transition-all shrink-0 hover:scale-105"
                >
                  Explore Guided Tours
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE MAP */}
        {activeTab === 'map' && (
          <InteractiveMap onSelectDestination={handleSelectDestination} />
        )}

        {/* TAB 3: EXPERIENCES & TOURS */}
        {activeTab === 'experiences' && (
          <ExperiencesSection
            onBook={handleBookExperience}
            filterDestination={experienceDestFilter}
          />
        )}

        {/* TAB 4: ITINERARY PLANNER */}
        {activeTab === 'itinerary' && (
          <ItineraryPlanner />
        )}

        {/* TAB 5: TRAVEL GUIDES */}
        {activeTab === 'guides' && (
          <TravelGuidesSection />
        )}

      </main>

      {/* Modals */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onViewExperiences={handleViewExperiences}
      />

      <BookingModal
        experience={bookingExperience}
        onClose={() => setBookingExperience(null)}
      />

      <WishlistModal
        onSelectDestination={handleSelectDestination}
      />

      {/* Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
};

export default function App() {
  return (
    <TravelProvider>
      <MainAppContent />
    </TravelProvider>
  );
}
