import React, { useState } from 'react';
import {
  X,
  Search,
  Calendar,
  BedDouble,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Printer,
  Download,
  Send,
  MessageSquare,
  ShieldAlert,
  Car,
  Coffee,
  HelpCircle
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { RoomBooking } from '../types';

interface GuestPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuestPortalModal: React.FC<GuestPortalModalProps> = ({ isOpen, onClose }) => {
  const {
    getBookingByRef,
    addGuestServiceRequest,
    cancelBookingByGuest,
    formatPrice,
    hotelInfo,
    bookings,
    t
  } = useHotel();

  const [bookingRefInput, setBookingRefInput] = useState<string>('TH-AM-7489');
  const [phoneOrEmailInput, setPhoneOrEmailInput] = useState<string>('+251 91 144 8899');
  const [activeBooking, setActiveBooking] = useState<RoomBooking | null>(() => {
    return bookings[0] || null;
  });
  const [searchError, setSearchError] = useState<string>('');

  const [serviceRequestText, setServiceRequestText] = useState<string>('');
  const [serviceSuccessMsg, setServiceSuccessMsg] = useState<string>('');
  const [cancelFeedbackMsg, setCancelFeedbackMsg] = useState<{ isSuccess: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setCancelFeedbackMsg(null);
    setServiceSuccessMsg('');

    const found = getBookingByRef(bookingRefInput, phoneOrEmailInput);
    if (found) {
      setActiveBooking(found);
    } else {
      setSearchError('No matching reservation found. Please check your reference code or phone/email number.');
    }
  };

  const handleQuickFillSample = (b: RoomBooking) => {
    setBookingRefInput(b.bookingRef);
    setPhoneOrEmailInput(b.guestPhone);
    setActiveBooking(b);
    setSearchError('');
    setCancelFeedbackMsg(null);
  };

  const handleSendServiceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || !serviceRequestText.trim()) return;

    const ok = addGuestServiceRequest(activeBooking.bookingRef, serviceRequestText.trim());
    if (ok) {
      setServiceSuccessMsg('Your request has been dispatched to hotel reception!');
      setServiceRequestText('');
      setTimeout(() => setServiceSuccessMsg(''), 5000);
    }
  };

  const handleCancel = () => {
    if (!activeBooking) return;
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

    const res = cancelBookingByGuest(activeBooking.bookingRef, activeBooking.guestPhone);
    setCancelFeedbackMsg({
      isSuccess: res.success,
      text: res.message
    });

    // Refresh active booking
    const refreshed = getBookingByRef(activeBooking.bookingRef);
    if (refreshed) setActiveBooking(refreshed);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Guest Portal · Manage Your Stay</h3>
              <p className="text-[11px] text-stone-400">
                Retrieve reservation, download official stay voucher, or coordinate in-stay services
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

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* 1. Lookup Search Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Reservation Reference Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. TH-AM-7489"
                  value={bookingRefInput}
                  onChange={(e) => setBookingRefInput(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 font-mono uppercase"
                  required
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Guest Phone Number or Email
                </label>
                <input
                  type="text"
                  placeholder="e.g. +251 91 144 8899 or email@..."
                  value={phoneOrEmailInput}
                  onChange={(e) => setPhoneOrEmailInput(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-9 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Retrieve</span>
                </button>
              </div>
            </form>

            {searchError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {/* Quick Sample Selector for Convenience */}
            <div className="pt-2 border-t border-stone-200/80 flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
              <span className="font-semibold text-stone-700">Quick Test Samples:</span>
              {bookings.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleQuickFillSample(b)}
                  className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg hover:border-amber-600 hover:text-amber-800 font-mono text-[10px] transition-colors cursor-pointer"
                >
                  {b.bookingRef} ({b.guestName.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* 2. Active Reservation Card */}
          {activeBooking ? (
            <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
              {/* Header Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Booking Reference</span>
                    <span className="text-base font-extrabold font-mono text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                      {activeBooking.bookingRef}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mt-1">{activeBooking.roomName}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activeBooking.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : activeBooking.status === 'Cancelled'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    ● Status: {activeBooking.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                    Payment: {activeBooking.paymentStatus || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Lead Guest</span>
                  <p className="font-bold text-stone-900 text-sm mt-0.5">{activeBooking.guestName}</p>
                  <p className="text-stone-500 text-[11px]">{activeBooking.guestPhone}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Stay Dates</span>
                  <p className="font-bold text-stone-900 text-sm mt-0.5">
                    {activeBooking.checkInDate} → {activeBooking.checkOutDate}
                  </p>
                  <p className="text-stone-500 text-[11px]">{activeBooking.totalNights} Night(s)</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Occupancy</span>
                  <p className="font-bold text-stone-900 text-sm mt-0.5">
                    {activeBooking.adultsCount} Adults {activeBooking.childrenCount ? `, ${activeBooking.childrenCount} Children` : ''}
                  </p>
                  <p className="text-stone-500 text-[11px]">{activeBooking.roomCount || 1} Room(s)</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Total Rate</span>
                  <p className="font-extrabold text-amber-800 text-sm mt-0.5">
                    {formatPrice(activeBooking.totalPriceETB, activeBooking.totalPriceUSD)}
                  </p>
                  <p className="text-stone-500 text-[11px]">Method: {activeBooking.paymentMethod || 'Telebirr'}</p>
                </div>
              </div>

              {/* Additional Inclusions & Airport Transfer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                    <Car className="w-4 h-4 text-amber-700" />
                    <span>Airport Transfer Status</span>
                  </div>
                  {activeBooking.airportPickupRequested ? (
                    <p className="text-stone-600">
                      ✓ Complimentary Shuttle Scheduled for Arba Minch Domestic Airport (AMH).
                      {activeBooking.flightDetails && (
                        <span className="block font-semibold text-stone-800 mt-0.5">
                          Flight details: {activeBooking.flightDetails}
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="text-stone-500">No airport shuttle requested at booking time.</p>
                  )}
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                    <Coffee className="w-4 h-4 text-amber-700" />
                    <span>Special Notes & Inclusions</span>
                  </div>
                  <p className="text-stone-600">
                    {activeBooking.specialRequests || 'Daily complimentary breakfast and solar hot water included.'}
                  </p>
                </div>
              </div>

              {/* In-Stay Guest Service Request Form */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <MessageSquare className="w-4 h-4 text-amber-800" />
                  <span>Request In-Stay Service or Update (Direct to Front Desk)</span>
                </div>
                <p className="text-stone-600 text-[11px]">
                  Need extra towels, housekeeping, flight pickup time adjustment, or early room service? Send a direct alert
                  to our 24/7 reception desk:
                </p>

                <form onSubmit={handleSendServiceRequest} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Please send extra towels to room or our flight lands at 1:15 PM instead..."
                    value={serviceRequestText}
                    onChange={(e) => setServiceRequestText(e.target.value)}
                    className="flex-1 bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </button>
                </form>

                {serviceSuccessMsg && (
                  <p className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{serviceSuccessMsg}</span>
                  </p>
                )}

                {/* Show existing request log */}
                {activeBooking.guestRequestsNotes && activeBooking.guestRequestsNotes.length > 0 && (
                  <div className="pt-2 border-t border-amber-200/80 space-y-1 text-[11px]">
                    <span className="font-bold text-amber-900">Submitted Requests:</span>
                    {activeBooking.guestRequestsNotes.map((note, idx) => (
                      <p key={idx} className="text-stone-700 bg-white/80 p-1.5 rounded-lg border border-amber-200">
                        • {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: Print Voucher / Cancel Booking */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Official Stay Voucher</span>
                  </button>
                </div>

                {activeBooking.status !== 'Cancelled' && (
                  <button
                    onClick={handleCancel}
                    className="px-3.5 py-1.5 text-rose-700 hover:text-white hover:bg-rose-600 border border-rose-300 rounded-xl font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Cancel Reservation</span>
                  </button>
                )}
              </div>

              {cancelFeedbackMsg && (
                <div
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    cancelFeedbackMsg.isSuccess
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-rose-50 border-rose-300 text-rose-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{cancelFeedbackMsg.text}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Search className="w-8 h-8 mx-auto text-stone-400" />
              <p className="font-semibold text-stone-700">Enter your reservation reference above to view your booking.</p>
              <p className="text-[11px]">Reference numbers are formatted like TH-AM-7489.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between text-stone-600 text-xs shrink-0">
          <span>Need immediate phone assistance? Call Front Desk: {hotelInfo.phonePrimary}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-900 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
