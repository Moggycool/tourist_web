import React, { useState } from 'react';
import { Compass, Clock, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { TourPackage } from '../types';

interface ToursSectionProps {
  onBookTour: (tour: TourPackage) => void;
}

export const ToursSection: React.FC<ToursSectionProps> = ({ onBookTour }) => {
  const { tours, formatPrice, t } = useHotel();
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  return (
    <section id="tours" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            {t('tours_badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t('tours_title')}
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            {t('tours_subtitle')}
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Key Highlights
                    </span>
                    <div className="space-y-1">
                      {tour.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                    🗓️ <strong>Departure:</strong> {tour.schedule}
                  </div>

                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 pt-4 border-t border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div>
                  <span className="text-[10px] text-stone-500 block">Package from</span>
                  <div className="text-lg font-black text-stone-900">
                    {formatPrice(tour.priceETB, tour.priceUSD)}
                    <span className="text-xs font-normal text-stone-500"> / guest</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookTour(tour)}
                  className="px-4.5 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t('tours_book_excursion')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
