import React from 'react';
import { X, Calendar, MapPin, Film, Image as ImageIcon, Share2, Download } from 'lucide-react';
import { HotelEvent } from '../types';

interface EventMediaModalProps {
  event: HotelEvent | null;
  onClose: () => void;
}

export const EventMediaModal: React.FC<EventMediaModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const isVideo = event.mediaType === 'video';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-stone-900 text-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] border border-stone-800">
        
        {/* Top bar with close button */}
        <div className="p-4 bg-stone-950 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            {isVideo ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-600/30 text-amber-400 text-xs font-bold border border-amber-500/30">
                <Film className="w-3.5 h-3.5" />
                <span>Video Reel</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-600/30 text-sky-400 text-xs font-bold border border-sky-500/30">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Event Photography</span>
              </span>
            )}
            <span className="text-xs text-stone-400 font-medium capitalize">{event.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Display Area */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[55vh] overflow-hidden shrink-0">
          {isVideo ? (
            <video
              src={event.mediaUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[55vh] w-full object-contain"
            >
              Your browser does not support HTML5 video streaming.
            </video>
          ) : (
            <img
              src={event.mediaUrl}
              alt={event.title}
              className="max-h-[55vh] w-full object-contain"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Event Story & Metadata Details */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-stone-900 text-stone-200">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mb-1.5">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </span>
              {event.location && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{event.location}</span>
                  </span>
                </>
              )}
              {event.videoDuration && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Duration: {event.videoDuration}</span>
                </>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {event.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
            {event.description}
          </p>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Tourist Hotel Arba Minch Archive</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                alert('Event link copied to clipboard!');
              }}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Event</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
