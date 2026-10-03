import React, { useState } from 'react';
import { X, Calendar, Users, BedDouble, Plane, CheckCircle2, ShieldCheck, QrCode, ArrowRight, Printer } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { Room, RoomBooking } from '../types';

interface ReservationModalProps {
  initialRoom?: Room | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ initialRoom, onClose }) => {
  const { rooms, formatPrice, addBooking, hotelInfo } = useHotel();

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoom ? initialRoom.id : rooms[0]?.id || ''
  );

  const [checkIn, setCheckIn] = useState<string>('2026-10-12');
  const [checkOut, setCheckOut] = useState<string>('2026-10-15');
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [guestName, setGuestName] = useState<string>('Daniel Haile');
  const [guestEmail, setGuestEmail] = useState<string>('daniel.haile@example.com');
  const [guestPhone, setGuestPhone] = useState<string>('+251 91 234 5678');
  const [airportPickup, setAirportPickup] = useState<boolean>(true);
  const [flightDetails, setFlightDetails] = useState<string>('Ethiopian Airlines ET135 Arba Minch');
  const [specialRequests, setSpecialRequests] = useState<string>('Quiet room facing garden or lake.');

  const [confirmedBooking, setConfirmedBooking] = useState<RoomBooking | null>(null);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // Calculate nights
  const calculateNights = (): number => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();
  const totalPriceETB = (selectedRoom?.priceETB || 3200) * nights;
  const totalPriceUSD = (selectedRoom?.priceUSD || 28) * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TH-AM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = addBooking({
      bookingRef: ref,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adultsCount: adults,
      childrenCount,
      totalNights: nights,
      totalPriceETB,
      totalPriceUSD,
      specialRequests,
      airportPickupRequested: airportPickup,
      flightDetails: airportPickup ? flightDetails : undefined
    });

    setConfirmedBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              {hotelInfo.name} · Arba Minch
            </span>
            <h3 className="text-xl font-extrabold text-stone-900">
              {confirmedBooking ? 'Reservation Voucher' : 'Room Reservation'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!confirmedBooking ? (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="overflow-y-auto space-y-5 pr-1 flex-1">
            
            {/* Select Room */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-amber-700" />
                <span>Selected Accommodation</span>
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
              >
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {formatPrice(r.priceETB, r.priceUSD)} / night
                  </option>
                ))}
              </select>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Adults</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Children</label>
                <select
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold"
                >
                  <option value={0}>0 Children</option>
                  <option value={1}>1 Child</option>
                  <option value={2}>2 Children</option>
                </select>
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Primary Guest Contact
              </span>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Guest Full Name"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Phone Number / WhatsApp</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+251 91 ..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Airport Transfer Toggle */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={airportPickup}
                  onChange={(e) => setAirportPickup(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600"
                />
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-amber-700" />
                  <span>Request Free Arba Minch Airport (AMH) Shuttle</span>
                </span>
              </label>

              {airportPickup && (
                <input
                  type="text"
                  value={flightDetails}
                  onChange={(e) => setFlightDetails(e.target.value)}
                  placeholder="Flight number & arrival time (e.g., ET135 at 11:45 AM)"
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-800"
                />
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 text-xs space-y-1.5">
              <div className="flex justify-between text-stone-700">
                <span>{selectedRoom?.name} ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                <span className="font-semibold">{formatPrice(totalPriceETB, totalPriceUSD)}</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Buffet Breakfast & Wi-Fi</span>
                <span className="text-emerald-700 font-bold">Included Free</span>
              </div>
              <div className="pt-2 border-t border-amber-200 flex justify-between font-black text-sm text-stone-900">
                <span>Total Stay Cost</span>
                <span className="text-amber-800">{formatPrice(totalPriceETB, totalPriceUSD)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm & Generate Digital Voucher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-stone-900">Reservation Successful!</h4>
              <p className="text-xs text-stone-500">
                A digital pass has been issued and stored in the hotel database.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold block">CONFIRMATION REF</span>
                  <span className="text-base font-mono font-bold text-white">{confirmedBooking.bookingRef}</span>
                </div>
                <QrCode className="w-8 h-8 text-amber-400" />
              </div>

              <div>
                <div className="text-xs text-amber-300 font-semibold">{hotelInfo.name} · {hotelInfo.city}</div>
                <h4 className="text-base font-bold text-white mt-0.5">{confirmedBooking.roomName}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-stone-800 text-stone-300">
                <div>
                  <span className="text-[10px] text-stone-400 block">GUEST</span>
                  <span className="font-semibold text-white">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">DATES</span>
                  <span className="font-semibold text-white">{confirmedBooking.checkInDate} to {confirmedBooking.checkOutDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">TOTAL AMOUNT</span>
                  <span className="font-bold text-amber-400">
                    {formatPrice(confirmedBooking.totalPriceETB, confirmedBooking.totalPriceUSD)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">AIRPORT PICKUP</span>
                  <span className="font-semibold text-white">
                    {confirmedBooking.airportPickupRequested ? 'Arranged (AMH)' : 'Not needed'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl"
            >
              Done & Return to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
