import React, { useState } from 'react';
import { Users, Presentation, CheckCircle, Mail, Phone, CalendarCheck } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const ConferenceSection: React.FC = () => {
  const { conferenceHalls, hotelInfo } = useHotel();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [hallName, setHallName] = useState('Abaya Grand Conference Hall');
  const [eventDate, setEventDate] = useState('2026-11-15');
  const [attendees, setAttendees] = useState(50);
  const [organizerName, setOrganizerName] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState('');

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setOrganizerName('');
      setOrganizerPhone('');
    }, 4000);
  };

  return (
    <section id="meetings" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Events & Corporate Summits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Meetings & Conference Facilities
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Host your government summits, corporate training retreats, NGO workshops, and wedding receptions in Arba Minch with comprehensive audiovisual technology and dedicated banquet service.
          </p>
        </div>

        {/* Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {conferenceHalls.map((hall) => (
            <div
              key={hall.id}
              className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Presentation className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">{hall.name}</h3>
                      <span className="text-xs text-stone-500 font-medium">Up to {hall.capacity} Attendees</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-stone-800 border border-stone-200">
                    Capacity: {hall.capacity}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {hall.description}
                </p>

                {/* Amenities */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Technical Provisions</span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-stone-700">
                    {hall.amenities.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <span>Backup Generator & High-Speed Wi-Fi</span>
                <span className="font-bold text-amber-800">Catering Packages Available</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Conference Booking / Inquiry Form */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-800">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Plan Your Event at Tourist Hotel</h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Submit your event details below or call our events manager directly at <strong>{hotelInfo.phonePrimary}</strong>.
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="p-4 bg-emerald-900/50 border border-emerald-500/50 rounded-2xl text-center text-xs text-emerald-200 font-semibold space-y-1">
                <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
                <p>Thank you! Your event inquiry has been received.</p>
                <p className="text-[11px] text-stone-300">Our events coordinator in Arba Minch will contact you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-stone-900">
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Select Venue</label>
                  <select
                    value={hallName}
                    onChange={(e) => setHallName(e.target.value)}
                    className="w-full bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden"
                  >
                    {conferenceHalls.map(h => (
                      <option key={h.id} value={h.name}>{h.name} ({h.capacity} max)</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden"
                    required
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Estimated Guests</label>
                  <input
                    type="number"
                    min="5"
                    max="250"
                    value={attendees}
                    onChange={(e) => setAttendees(Number(e.target.value))}
                    className="w-full bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden"
                    required
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Organization / Host Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ministry of Agriculture / NGO Summit"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    className="w-full bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden"
                    required
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="+251 91 ..."
                    value={organizerPhone}
                    onChange={(e) => setOrganizerPhone(e.target.value)}
                    className="w-full bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden"
                    required
                  />
                </div>

                <div className="sm:col-span-12 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Request Conference Proposal & Quote</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
