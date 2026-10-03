import React from 'react';
import { X, Heart, Trash2, ArrowRight, Compass } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';

interface WishlistModalProps {
  onSelectDestination: (dest: Destination) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ onSelectDestination }) => {
  const { isWishlistOpen, setIsWishlistOpen, favorites, toggleFavorite, formatPrice } = useTravel();

  if (!isWishlistOpen) return null;

  const favoriteDestinations = DESTINATIONS.filter(d => favorites.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 space-y-6 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Saved Wishlist</h3>
              <p className="text-xs text-slate-500">{favoriteDestinations.length} Dream Destinations</p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {favoriteDestinations.length === 0 ? (
            <div className="py-12 text-center space-y-3 text-slate-400">
              <Compass className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
              <p className="text-xs">Your wishlist is currently empty.</p>
              <p className="text-[11px] text-slate-400">Click the heart on any destination card to save it here!</p>
            </div>
          ) : (
            favoriteDestinations.map(dest => (
              <div
                key={dest.id}
                className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 flex items-center justify-between gap-3 group hover:border-sky-300 transition-colors"
              >
                <div 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onSelectDestination(dest);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <img
                    src={dest.heroImage}
                    alt={dest.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {dest.title}
                    </h4>
                    <p className="text-xs text-slate-500">{dest.country} • {dest.continent}</p>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      ~{formatPrice(dest.approxDailyCostUsd)} / day
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleFavorite(dest.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onSelectDestination(dest);
                    }}
                    className="p-2 text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="View details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteDestinations.length > 0 && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Synchronized to local session</span>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-xs font-bold text-sky-600 hover:underline"
            >
              Continue Exploring
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
