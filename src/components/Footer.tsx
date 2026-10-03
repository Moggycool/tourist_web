import React from 'react';
import { MapPin, Phone, Mail, Clock, Lock } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface FooterProps {
  onNavClick: (sec: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { hotelInfo, setIsAdminOpen } = useHotel();

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">{hotelInfo.name}</h3>
              <p className="text-[11px] text-amber-400 uppercase tracking-widest font-semibold mt-0.5">
                Arba Minch · Ethiopia
              </p>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your premier lodge in the Great Rift Valley. Gateway to Lake Chamo crocodile boat safaris, Nechisar National Park, and Dorze cultural villages.
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              Reception open {hotelInfo.receptionHours}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hotel Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavClick('rooms')} className="hover:text-white transition-colors">
                  Rooms & Executive Suites
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('dining')} className="hover:text-white transition-colors">
                  Restaurant & Buna Ceremony
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('tours')} className="hover:text-white transition-colors">
                  Lake Chamo Boat Safaris
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('meetings')} className="hover:text-white transition-colors">
                  Conference & Banquet Halls
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-white transition-colors">
                  About Arba Minch & Forty Springs
                </button>
              </li>
            </ul>
          </div>

          {/* Local Attractions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Arba Minch Highlights</h4>
            <ul className="space-y-2 text-stone-400">
              <li>Lake Chamo Crocodile Market</li>
              <li>Lake Abaya Red Waters</li>
              <li>Nechisar Zebra Plains</li>
              <li>Dorze Bamboo Elephant Huts</li>
              <li>The Forty Natural Springs</li>
              <li>Lower Omo Valley Expeditions</li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Inquiries</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{hotelInfo.addressLine}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{hotelInfo.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">{hotelInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Check-in: {hotelInfo.checkInTime} / Out: {hotelInfo.checkOutTime}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} {hotelInfo.name}, Arba Minch, Ethiopia. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-stone-400 hover:text-amber-400 flex items-center gap-1 font-semibold transition-colors"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Admin Management Portal</span>
            </button>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Booking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
