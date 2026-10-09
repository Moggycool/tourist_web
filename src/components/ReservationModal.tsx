import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  BedDouble,
  Plane,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Printer,
  Smartphone,
  CreditCard,
  MessageSquare,
  Send,
  Check,
  Tag,
  Plus,
  HelpCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { Room, RoomBooking } from '../types';
import { TelebirrDemoModal } from './TelebirrDemoModal';

interface ReservationModalProps {
  initialRoom?: Room | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ initialRoom, onClose }) => {
  const {
    rooms,
    addons,
    currency,
    formatPrice,
    addBooking,
    hotelInfo,
    telebirrConfig,
    validatePromoCode,
    searchCriteria,
    setIsGuestPortalOpen,
    sendReceptionWhatsAppNotification,
    sendGuestWhatsAppConfirmation
  } = useHotel();

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoom ? initialRoom.id : (searchCriteria.category !== 'all' ? searchCriteria.category : rooms[0]?.id || '')
  );

  const [checkIn, setCheckIn] = useState<string>(searchCriteria.checkIn || '2026-10-12');
  const [checkOut, setCheckOut] = useState<string>(searchCriteria.checkOut || '2026-10-15');
  const [adults, setAdults] = useState<number>(searchCriteria.adults || 2);
  const [childrenCount, setChildrenCount] = useState<number>(searchCriteria.children || 0);
  const [roomsCount, setRoomsCount] = useState<number>(searchCriteria.roomsCount || 1);

  const [guestName, setGuestName] = useState<string>('Daniel Haile');
  const [guestEmail, setGuestEmail] = useState<string>('daniel.haile@example.com');
  const [guestPhone, setGuestPhone] = useState<string>('+251 91 234 5678');
  const [airportPickup, setAirportPickup] = useState<boolean>(true);
  const [flightDetails, setFlightDetails] = useState<string>('Ethiopian Airlines ET135 Arba Minch');
  const [specialRequests, setSpecialRequests] = useState<string>('Quiet room facing garden or lake.');

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState<string>(searchCriteria.promoCode || 'ARBA2026');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon-airport-shuttle']);

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe_birr' | 'pay_on_arrival'>('telebirr');
  const [telebirrTxnId, setTelebirrTxnId] = useState<string>('');
  const [isTelebirrDemoOpen, setIsTelebirrDemoOpen] = useState<boolean>(false);

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

  // Pricing calculations
  const baseRoomRateETB = (selectedRoom?.priceETB || 3200) * nights * roomsCount;
  const baseRoomRateUSD = (selectedRoom?.priceUSD || 28) * nights * roomsCount;

  // Addons total
  const selectedAddonsList = addons.filter(a => selectedAddonIds.includes(a.id));
  const addonsTotalETB = selectedAddonsList.reduce((acc, a) => acc + a.priceETB, 0);
  const addonsTotalUSD = selectedAddonsList.reduce((acc, a) => acc + a.priceUSD, 0);

  // Promo discount
  const validPromo = promoCodeInput.trim() ? validatePromoCode(promoCodeInput.trim()) : null;
  const discountPercent = validPromo ? validPromo.discountPercent : 0;
  const discountETB = Math.round((baseRoomRateETB * discountPercent) / 100);
  const discountUSD = Math.round((baseRoomRateUSD * discountPercent) / 100);

  const subtotalETB = baseRoomRateETB + addonsTotalETB - discountETB;
  const subtotalUSD = baseRoomRateUSD + addonsTotalUSD - discountUSD;

  // Taxes: VAT (15%) & Service Charge (10%) included in transparent total
  const totalPriceETB = Math.max(0, subtotalETB);
  const totalPriceUSD = Math.max(0, subtotalUSD);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TH-AM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = addBooking({
      bookingRef: ref,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomCount: roomsCount,
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
      promoCode: validPromo ? validPromo.code : undefined,
      discountETB,
      discountUSD,
      selectedAddons: selectedAddonIds,
      specialRequests,
      airportPickupRequested: airportPickup || selectedAddonIds.includes('addon-airport-shuttle'),
      flightDetails: airportPickup ? flightDetails : undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'pay_on_arrival' ? 'Pay on Arrival' : telebirrTxnId ? 'Paid' : 'Pending',
      telebirrTxnId:
        telebirrTxnId || (paymentMethod === 'telebirr' ? `TB-${Math.floor(1000000 + Math.random() * 9000000)}` : undefined),
      telebirrPhone: guestPhone
    });

    setConfirmedBooking(newBooking);
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <>
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
                {confirmedBooking ? 'Reservation Voucher' : 'Room Reservation & Checkout'}
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

              {/* Dates & Rooms Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Number of Rooms</label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value={1}>1 Room</option>
                    <option value={2}>2 Rooms</option>
                    <option value={3}>3 Rooms</option>
                    <option value={4}>4 Rooms</option>
                  </select>
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
                    <option value={6}>6 Adults (Group)</option>
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
                    <option value={3}>3 Children</option>
                  </select>
                </div>
              </div>

              {/* Optional Add-on Services & Experiences */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-amber-700" />
                    <span>Optional Add-ons & Stay Enhancements</span>
                  </label>
                  <span className="text-[10px] text-stone-500">Customise your visit</span>
                </div>

                <div className="space-y-2">
                  {addons.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                          isChecked
                            ? 'bg-amber-50/80 border-amber-300 text-stone-900'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by parent onClick
                            className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">{addon.name}</span>
                            <span className="text-[10px] text-stone-500 block">{addon.description}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          {addon.priceETB === 0 ? (
                            <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md">
                              Included Free
                            </span>
                          ) : (
                            <span className="font-bold text-amber-900">
                              +{formatPrice(addon.priceETB, addon.priceUSD)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code Voucher Box */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-700" />
                    <span>Promo or Discount Code</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setPromoCodeInput('ARBA2026')}
                    className="text-[10px] text-amber-800 hover:underline font-semibold"
                  >
                    Try code: <strong>ARBA2026</strong> (15% Off)
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. ARBA2026 or WELCOME10"
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-mono font-bold tracking-wider focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                  {validPromo ? (
                    <span className="px-2.5 py-1.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                      <span>{validPromo.discountPercent}% Off</span>
                    </span>
                  ) : promoCodeInput.trim() ? (
                    <span className="px-2 py-1 text-rose-600 text-[10px] font-bold">Invalid</span>
                  ) : null}
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
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Phone Number (Ethiopian or WhatsApp)</label>
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

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Special Requests or Needs</label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="E.g., high floor room, quiet view, extra pillows, late check-in..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
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

              {/* PAYMENT OPTION: TELEBIRR / CBE BIRR / ON ARRIVAL */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                    Choose Payment Method
                  </span>
                  <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                    Ethio Telecom Telebirr Supported
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Telebirr Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('telebirr')}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      paymentMethod === 'telebirr'
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#005cb9] text-white font-black text-[10px] flex items-center justify-center mb-1.5">
                      tb
                    </div>
                    <div className="font-extrabold text-xs text-blue-950">telebirr</div>
                    <span className="text-[10px] text-blue-800 font-medium block mt-0.5">Mobile Pay</span>
                  </button>

                  {/* CBE Birr Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cbe_birr')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'cbe_birr'
                        ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-700 text-white font-bold text-[10px] flex items-center justify-center mb-1.5">
                      CBE
                    </div>
                    <div className="font-extrabold text-xs text-purple-950">CBE Birr</div>
                    <span className="text-[10px] text-purple-800 font-medium block mt-0.5">Bank Mobile</span>
                  </button>

                  {/* Pay on Arrival */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pay_on_arrival')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'pay_on_arrival'
                        ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-700 text-white font-bold text-[10px] flex items-center justify-center mb-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-extrabold text-xs text-stone-900">On Arrival</div>
                    <span className="text-[10px] text-stone-600 font-medium block mt-0.5">Pay at Hotel</span>
                  </button>
                </div>

                {/* TELEBIRR DETAILS & VENDOR DEMONSTRATOR PANEL */}
                {paymentMethod === 'telebirr' && (
                  <div className="p-4 bg-blue-50/90 border border-blue-200 rounded-2xl space-y-3 animate-fadeIn text-xs text-blue-950">
                    <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900">
                        <Smartphone className="w-4 h-4 text-blue-700" />
                        <span>Telebirr Merchant Checkout</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold bg-white text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                        Code: {telebirrConfig.merchantCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-stone-700">
                      <div>
                        <span className="text-stone-500 block">Merchant Name:</span>
                        <strong className="text-blue-950">{telebirrConfig.merchantName}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Payable Amount:</span>
                        <strong className="text-blue-950 text-xs">{totalPriceETB.toLocaleString()} ETB</strong>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-blue-200 text-[11px] space-y-1">
                      <p className="font-semibold text-blue-950">How to Pay via Telebirr:</p>
                      <p className="text-stone-600">• Dial <strong>*127#</strong> &gt; Pay Merchant &gt; Code: <strong>{telebirrConfig.merchantCode}</strong></p>
                      <p className="text-stone-600">• Or scan hotel QR code in Telebirr SuperApp.</p>
                    </div>

                    {/* VENDOR DEMO TRIGGER BUTTON */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setIsTelebirrDemoOpen(true)}
                        className="w-full py-2 bg-[#005cb9] hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4 text-amber-300" />
                        <span>Launch Telebirr Payment Simulator (Vendor Demo)</span>
                      </button>
                    </div>

                    {telebirrTxnId && (
                      <div className="p-2 bg-emerald-100/80 border border-emerald-300 rounded-xl text-emerald-900 text-[11px] flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Verified Telebirr Txn: <strong>{telebirrTxnId}</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'cbe_birr' && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-2 text-xs text-purple-950 animate-fadeIn">
                    <p className="font-bold">CBE Birr Shortcode Payment</p>
                    <p className="text-[11px] text-stone-700">Dial <strong>*847#</strong> or use CBE Birr App. Select <em>Pay Merchant</em> and enter Hotel Shortcode: <strong>982144</strong>.</p>
                  </div>
                )}

                {paymentMethod === 'pay_on_arrival' && (
                  <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-2xl space-y-2 text-xs text-emerald-950 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Zero Risk · 48-Hour Free Cancellation Policy</span>
                    </div>
                    <p className="text-[11px] text-stone-700">
                      No credit card or advance deposit required today. Your booking is confirmed and guaranteed. You can settle the payment in ETB (cash, Telebirr, CBE Birr) or USD upon arrival at the Tourist Hotel front desk.
                    </p>
                    <p className="text-[10px] text-emerald-800 font-medium">
                      ✓ Free cancellation up to 48 hours before check-in.
                    </p>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 text-xs space-y-2">
                <div className="flex justify-between text-stone-700">
                  <span>
                    {selectedRoom?.name} ({nights} {nights === 1 ? 'night' : 'nights'} × {roomsCount} {roomsCount === 1 ? 'room' : 'rooms'})
                  </span>
                  <span className="font-semibold">{formatPrice(baseRoomRateETB, baseRoomRateUSD)}</span>
                </div>

                {selectedAddonsList.length > 0 && (
                  <div className="space-y-1 pt-1.5 border-t border-amber-200/60">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Selected Add-ons</span>
                    {selectedAddonsList.map(a => (
                      <div key={a.id} className="flex justify-between text-stone-600 text-[11px]">
                        <span>• {a.name}</span>
                        <span>{a.priceETB === 0 ? 'Free' : `+${formatPrice(a.priceETB, a.priceUSD)}`}</span>
                      </div>
                    ))}
                  </div>
                )}

                {validPromo && discountETB > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold pt-1 border-t border-amber-200/60">
                    <span>Promo Discount ({validPromo.code} - {validPromo.discountPercent}% Off)</span>
                    <span>-{formatPrice(discountETB, discountUSD)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 text-[11px]">
                  <span>Buffet Breakfast & High-Speed Wi-Fi</span>
                  <span className="text-emerald-700 font-bold">Included Free</span>
                </div>

                <div className="flex justify-between text-stone-500 text-[10px] pt-1 border-t border-amber-200/60">
                  <span>Taxes (15% VAT & 10% Service Charge)</span>
                  <span>Included</span>
                </div>

                <div className="pt-2 border-t border-amber-200 flex justify-between items-baseline font-black text-sm text-stone-900">
                  <span>Total Payable</span>
                  <div className="text-right">
                    <span className="text-amber-800 block text-base">{formatPrice(totalPriceETB, totalPriceUSD)}</span>
                    <span className="text-[10px] font-normal text-stone-500 block">
                      {currency === 'ETB' ? `≈ $${totalPriceUSD} USD` : `≈ ${totalPriceETB.toLocaleString()} ETB`}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Issue Reservation Voucher</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Confirmation Screen with Automated Notifications Actions */
            <div className="space-y-5 animate-fadeIn overflow-y-auto pr-1">
              <div className="text-center space-y-1">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-stone-900">Reservation Confirmed!</h4>
                <p className="text-xs text-stone-500">
                  Voucher issued & automated notifications dispatched to hotel reception.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 space-y-4 shadow-xl">
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
                    <span className="text-[10px] text-stone-400 block">PAYMENT METHOD</span>
                    <span className="font-bold text-amber-400 uppercase">
                      {confirmedBooking.paymentMethod} ({confirmedBooking.paymentStatus})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">AIRPORT PICKUP</span>
                    <span className="font-semibold text-white">
                      {confirmedBooking.airportPickupRequested ? 'Arranged (AMH Airport)' : 'Not needed'}
                    </span>
                  </div>
                  {confirmedBooking.telebirrTxnId && (
                    <div className="col-span-2 pt-1 border-t border-stone-800/80">
                      <span className="text-[10px] text-stone-400 block">TELEBIRR TRANSACTION REF</span>
                      <span className="font-mono text-emerald-400 font-bold">{confirmedBooking.telebirrTxnId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* AUTOMATED GUEST & RECEPTION NOTIFICATIONS ACTION BAR */}
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>Automated Guest & Reception Notifications</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Dispatched
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => sendReceptionWhatsAppNotification(confirmedBooking)}
                    className="p-2.5 bg-white hover:bg-emerald-100/50 border border-emerald-300 rounded-xl font-bold text-emerald-950 flex items-center justify-center gap-2 transition-colors cursor-pointer text-left"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Send WhatsApp to Reception</span>
                  </button>

                  <button
                    onClick={() => sendGuestWhatsAppConfirmation(confirmedBooking)}
                    className="p-2.5 bg-white hover:bg-emerald-100/50 border border-emerald-300 rounded-xl font-bold text-emerald-950 flex items-center justify-center gap-2 transition-colors cursor-pointer text-left"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Send Voucher to Guest WhatsApp</span>
                  </button>
                </div>

                <div className="text-[11px] text-stone-600 flex items-center gap-2 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SMS notification queued to Ethio Telecom SMS Gateway for <strong>{confirmedBooking.guestPhone}</strong>.</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={handlePrintVoucher}
                  className="w-full sm:flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Voucher</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setIsGuestPortalOpen(true);
                  }}
                  className="w-full sm:flex-1 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>Open Guest Portal</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Telebirr Interactive Vendor Simulator Modal */}
      <TelebirrDemoModal
        isOpen={isTelebirrDemoOpen}
        onClose={() => setIsTelebirrDemoOpen(false)}
        amountETB={totalPriceETB}
        merchantName={telebirrConfig.merchantName}
        merchantCode={telebirrConfig.merchantCode}
        guestPhone={guestPhone}
        onSuccess={(txnId) => {
          setTelebirrTxnId(txnId);
        }}
      />
    </>
  );
};
