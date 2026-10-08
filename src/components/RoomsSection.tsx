import React, { useState } from 'react';
import { BedDouble, Users, Maximize, Check, ArrowRight } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { Room } from '../types';

interface RoomsSectionProps {
  onSelectRoomForBooking: (room: Room) => void;
  onSelectRoomForDetail: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onSelectRoomForBooking,
  onSelectRoomForDetail
}) => {
  const { rooms, formatPrice, t } = useHotel();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'standard' | 'deluxe' | 'suite' | 'family'>('all');

  const filteredRooms = selectedFilter === 'all'
    ? rooms
    : rooms.filter(r => r.category === selectedFilter);

  const categories = [
    { id: 'all', label: t('rooms_all') },
    { id: 'deluxe', label: t('rooms_deluxe') },
    { id: 'suite', label: t('rooms_suite') },
    { id: 'standard', label: t('rooms_standard') },
    { id: 'family', label: t('rooms_family') },
  ];

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t('rooms_section_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('rooms_section_title')}
            </h2>
            <p className="text-sm text-stone-600 max-w-xl">
              {t('rooms_section_subtitle')}
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl overflow-x-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === cat.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo Area */}
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md">
                    {room.statusText || 'Available'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Unboxed Metadata Line */}
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1 font-medium text-stone-700">
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      <span>{room.capacity}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-amber-700" />
                      <span>{room.bedType}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5 text-amber-700" />
                      <span>{room.sizeSqMeters} m²</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {room.description}
                    </p>
                  </div>

                  {/* Highlights/Amenities checklist */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs text-stone-700">
                    {room.amenities.slice(0, 4).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-6 pt-4 border-t border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div>
                  <span className="text-[11px] text-stone-500 block">Starting from</span>
                  <div className="text-xl font-black text-stone-900">
                    {formatPrice(room.priceETB, room.priceUSD)}
                    <span className="text-xs font-normal text-stone-500"> / {t('rooms_per_night')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectRoomForDetail(room)}
                    className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                  >
                    {t('rooms_view_details')}
                  </button>

                  <button
                    onClick={() => onSelectRoomForBooking(room)}
                    className="px-4.5 py-2 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t('rooms_reserve_now')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
