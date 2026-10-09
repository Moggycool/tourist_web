import React from 'react';
import { X, Check, BedDouble, Users, Maximize, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { Room } from '../types';

interface RoomCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoomForBooking: (room: Room) => void;
  onSelectRoomForDetail: (room: Room) => void;
}

export const RoomCompareModal: React.FC<RoomCompareModalProps> = ({
  isOpen,
  onClose,
  onSelectRoomForBooking,
  onSelectRoomForDetail,
}) => {
  const { rooms, formatPrice, t } = useHotel();

  if (!isOpen) return null;

  const comparisonFeatures = [
    { label: 'Room Category', key: 'category' },
    { label: 'Max Occupancy', key: 'capacity' },
    { label: 'Bed Configuration', key: 'bedType' },
    { label: 'Room Area', key: 'size' },
    { label: 'Lake / Landscape View', key: 'view' },
    { label: 'Private Balcony / Patio', key: 'balcony' },
    { label: 'Buffet Breakfast Included', key: 'breakfast' },
    { label: 'Solar Hot Water Ensuite', key: 'hotWater' },
    { label: 'High-Speed Wi-Fi', key: 'wifi' },
    { label: 'Smart TV & Satellite', key: 'tv' },
    { label: 'Minibar / Tea & Coffee', key: 'refreshments' },
    { label: 'Free Airport Shuttle', key: 'shuttle' },
  ];

  const getFeatureValue = (room: Room, key: string) => {
    switch (key) {
      case 'category':
        return <span className="font-bold uppercase tracking-wider text-[11px] text-amber-800">{room.category}</span>;
      case 'capacity':
        return <span className="font-semibold text-stone-800">{room.capacity}</span>;
      case 'bedType':
        return <span className="text-stone-700">{room.bedType}</span>;
      case 'size':
        return <span className="font-mono text-stone-700">{room.sizeSqMeters} m²</span>;
      case 'view':
        return room.category === 'deluxe' || room.category === 'suite' ? (
          <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> Lake Chamo
          </span>
        ) : (
          <span className="text-stone-500">Garden Courtyard</span>
        );
      case 'balcony':
        return room.category !== 'standard' ? (
          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
        ) : (
          <span className="text-stone-400">—</span>
        );
      case 'breakfast':
      case 'hotWater':
      case 'wifi':
      case 'shuttle':
        return <Check className="w-4 h-4 text-emerald-600 mx-auto" />;
      case 'tv':
        return room.category !== 'standard' ? (
          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
        ) : (
          <span className="text-stone-400">On Request</span>
        );
      case 'refreshments':
        return room.category === 'deluxe' || room.category === 'suite' ? (
          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
        ) : (
          <span className="text-stone-400">—</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Compare Accommodations & Suites</h3>
              <p className="text-[11px] text-stone-400">
                Transparent side-by-side comparison of Tourist Hotel room categories in Arba Minch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Comparison Table */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1 text-xs">
          <div className="min-w-[760px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left bg-stone-100 rounded-l-xl font-bold text-stone-700 w-1/5">
                    Feature & Inclusions
                  </th>
                  {rooms.map((room) => (
                    <th key={room.id} className="p-3 text-center bg-stone-50 border-l border-stone-200">
                      <div className="space-y-2">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-24 object-cover rounded-xl shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">{room.name}</h4>
                        <div className="text-amber-800 font-extrabold text-sm sm:text-base">
                          {formatPrice(room.priceETB, room.priceUSD)}
                          <span className="text-[10px] text-stone-500 font-normal block">/ night</span>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectRoomForBooking(room);
                          }}
                          className="w-full py-1.5 px-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-xs cursor-pointer"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {comparisonFeatures.map((feat, idx) => (
                  <tr key={feat.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'}>
                    <td className="p-3 font-semibold text-stone-800 border-r border-stone-200">{feat.label}</td>
                    {rooms.map((room) => (
                      <td key={room.id} className="p-3 text-center border-l border-stone-200">
                        {getFeatureValue(room, feat.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-600 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All direct reservations include free AMH Airport Shuttle, 24/7 power backup, and free cancellation up to
              48h prior.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-800 font-semibold cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
