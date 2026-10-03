import React, { useState } from 'react';
import { Film, Image as ImageIcon, Play, Calendar, MapPin, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { HotelEvent } from '../types';

interface EventsSectionProps {
  onSelectEvent: (event: HotelEvent) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  const { events, setIsAdminOpen } = useHotel();
  const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'cultural' | 'safari'>('all');

  const filteredEvents = events.filter((evt) => {
    if (filter === 'all') return true;
    if (filter === 'video') return evt.mediaType === 'video';
    if (filter === 'image') return evt.mediaType === 'image';
    if (filter === 'cultural') return evt.category === 'cultural';
    if (filter === 'safari') return evt.category === 'safari';
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All Events & Highlights' },
    { id: 'video', label: 'Video Reels 🎬' },
    { id: 'image', label: 'Photo Galleries 📸' },
    { id: 'cultural', label: 'Cultural Festivals' },
    { id: 'safari', label: 'Lake & Safari Media' },
  ];

  return (
    <section id="events" className="py-16 sm:py-24 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Live Memories & Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Recent Events & Media Gallery
            </h2>
            <p className="text-sm text-stone-600 max-w-xl">
              Glimpse recent celebrations, wildlife boat recordings from Lake Chamo, and cultural festivals hosted at Tourist Hotel.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl overflow-x-auto shrink-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-500 bg-white rounded-3xl border border-stone-200 space-y-3">
            <Film className="w-10 h-10 text-stone-300 mx-auto" />
            <p>No events found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => {
              const isVideo = evt.mediaType === 'video';
              const displayImage = evt.thumbnailUrl || evt.mediaUrl;

              return (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(evt)}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  <div>
                    {/* Media Thumbnail Container */}
                    <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                      {isVideo ? (
                        <video
                          src={evt.mediaUrl}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={displayImage}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      
                      {/* Dark overlay scrim */}
                      <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-stone-950/20 transition-colors" />

                      {/* Top Type Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {isVideo ? (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-amber-400 text-[11px] font-bold">
                            <Film className="w-3 h-3" />
                            <span>Video Clip</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-md text-white text-[11px] font-bold">
                            <ImageIcon className="w-3 h-3" />
                            <span>Photo</span>
                          </span>
                        )}
                      </div>

                      {/* Video Play Button Overlay */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Video Duration or Category tag */}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                        {evt.videoDuration ? evt.videoDuration : evt.category.toUpperCase()}
                      </div>
                    </div>

                    {/* Body Text */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="flex items-center gap-1 font-semibold text-amber-800">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{evt.date}</span>
                        </span>
                        {evt.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{evt.location}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>{isVideo ? 'Watch Video' : 'View Full Image'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Admin Quick Upload Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-stone-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Have a new event, conference photo, or tour video?</span>
            </h4>
            <p className="text-xs text-stone-300">
              Hotel management can upload high-res photos and video recordings directly through the Admin CMS.
            </p>
          </div>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-4.5 py-2.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-stone-950 rounded-xl text-xs font-bold shadow-md transition-all whitespace-nowrap flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Event / Media</span>
          </button>
        </div>

      </div>
    </section>
  );
};
