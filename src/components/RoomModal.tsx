import React from 'react';
import { X, Check, Users, BedDouble, Maximize, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Room } from '../types';
import { useHotel } from '../context/HotelContext';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (room: Room) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onBook }) => {
  const { formatPrice, hotelInfo } = useHotel();

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Photo Header */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-900 shrink-0">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay titles */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              {hotelInfo.name} · Accommodation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{room.name}</h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-0.5">{room.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-stone-800">
          
          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Capacity</span>
              <div className="text-sm font-extrabold text-stone-900 flex items-center justify-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-amber-700" />
                <span>{room.capacity}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Bed Type</span>
              <div className="text-sm font-extrabold text-stone-900 flex items-center justify-center gap-1.5 mt-0.5">
                <BedDouble className="w-4 h-4 text-amber-700" />
                <span>{room.bedType}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Room Size</span>
              <div className="text-sm font-extrabold text-stone-900 flex items-center justify-center gap-1.5 mt-0.5">
                <Maximize className="w-4 h-4 text-amber-700" />
                <span>{room.sizeSqMeters} m²</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">Room Overview</h3>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              {room.description}
            </p>
          </div>

          {/* All Amenities */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">Included Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Policies & Inclusions */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-2 text-stone-800">
            <h4 className="font-bold text-amber-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Stay Perks & Guarantee</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700">
              <div>• Complimentary breakfast buffet included</div>
              <div>• Free pickup from Arba Minch Airport (AMH)</div>
              <div>• Check-in: {hotelInfo.checkInTime} / Check-out: {hotelInfo.checkOutTime}</div>
              <div>• Free cancellation up to 24h before arrival</div>
            </div>
          </div>

        </div>

        {/* Footer with Price and Action */}
        <div className="p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-stone-500 block">Rate per night</span>
            <div className="text-xl font-black text-stone-900">
              {formatPrice(room.priceETB, room.priceUSD)}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBook(room);
            }}
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Proceed to Reservation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
