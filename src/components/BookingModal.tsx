import React, { useState } from 'react';
import { X, Calendar, Users, CheckCircle, ShieldCheck, QrCode, ArrowRight, Printer } from 'lucide-react';
import { TourExperience, BookingDetails } from '../types';
import { useTravel } from '../context/TravelContext';

interface BookingModalProps {
  experience: TourExperience | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ experience, onClose }) => {
  const { formatPrice, addBooking } = useTravel();

  const [date, setDate] = useState<string>('2026-10-15');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('Alex Johnson');
  const [email, setEmail] = useState<string>('alex.travels@example.com');
  const [requests, setRequests] = useState<string>('');
  
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  if (!experience) return null;

  const pricePerGuest = experience.priceUsd;
  const subtotal = pricePerGuest * guests;
  const serviceFee = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `TW-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const booking: BookingDetails = {
      experienceId: experience.id,
      experienceTitle: experience.title,
      destinationTitle: experience.destinationTitle,
      guestCount: guests,
      date,
      contactName: name,
      contactEmail: email,
      specialRequests: requests,
      totalPriceUsd: total,
      bookingRef: refCode
    };

    addBooking(booking);
    setConfirmedBooking(booking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBooking ? (
          /* Booking Form */
          <form onSubmit={handleConfirm} className="space-y-5">
            <div>
              <div className="text-[11px] font-bold text-sky-600 uppercase tracking-wider mb-1">
                {experience.destinationTitle} Experience
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Reserve Your Experience
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {experience.title}
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                {/* Guests Counter */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Number of Guests</label>
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-slate-900">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Traveler Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirmation Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Requirements / Dietary (Optional)</label>
                <input
                  type="text"
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="e.g. Vegetarian, hotel pickup location, etc."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{formatPrice(pricePerGuest)} × {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Booking & Operator Protection Fee</span>
                <span>{formatPrice(serviceFee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                <span>Total Amount</span>
                <span className="text-sky-600">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center justify-center gap-2"
            >
              <span>Confirm & Issue Digital Voucher</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Free cancellation up to 24h before tour start</span>
            </div>
          </form>
        ) : (
          /* Digital Voucher Confirmation Screen */
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Booking Confirmed!</h3>
              <p className="text-xs text-slate-500">
                A confirmation copy has been generated. Present this digital voucher to your tour guide.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-xl border border-slate-700 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div>
                  <span className="text-[10px] text-sky-400 font-mono font-bold tracking-widest block">PASS REF</span>
                  <span className="text-base font-mono font-bold">{confirmedBooking.bookingRef}</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-sky-300" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-sky-300 font-medium">{confirmedBooking.destinationTitle}</div>
                <div className="text-sm font-bold">{confirmedBooking.experienceTitle}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block">DATE</span>
                  <span className="font-semibold">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">GUESTS</span>
                  <span className="font-semibold">{confirmedBooking.guestCount} Travelers</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">LEAD TRAVELER</span>
                  <span className="font-semibold">{confirmedBooking.contactName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">TOTAL PAID</span>
                  <span className="font-semibold text-emerald-400">{formatPrice(confirmedBooking.totalPriceUsd)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
