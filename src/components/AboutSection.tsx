import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Compass, Waves, Trees } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const AboutSection: React.FC = () => {
  const { hotelInfo, t } = useHotel();

  const distances = [
    { name: 'Arba Minch Domestic Airport (AMH)', time: '10 Mins Drive', desc: 'Daily Ethiopian Airlines flights from Addis Ababa' },
    { name: 'Lake Chamo Boat Pier & Crocodile Market', time: '18 Mins Drive', desc: 'Direct boat launches to hippo & crocodile spots' },
    { name: 'Nechisar National Park Gate', time: '15 Mins Drive', desc: 'Wildlife safari and Burchell zebra grasslands' },
    { name: 'Dorze Cultural Bamboo Villages', time: '40 Mins Scenic Drive', desc: 'Highlands overlooking the twin Rift Valley lakes' },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t('about_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('about_title')}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              Arba Minch takes its name from the legendary Amharic words meaning <em>"Forty Springs"</em>, celebrating the dozens of natural crystalline springs bubbling up from the floor of the Rift Valley forest.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              At <strong>{hotelInfo.name}</strong>, we have welcomed international travelers, wildlife photographers, government dignitaries, and families exploring the wonders of Southern Ethiopia. Our hotel offers lush green gardens, peaceful courtyards, reliable 24/7 power backup, solar hot water, and authentic hospitality that makes you feel right at home.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Waves className="w-5 h-5 text-amber-700 mb-1" />
                <h4 className="text-xs font-bold text-stone-900">{t('about_location_card')}</h4>
                <p className="text-[11px] text-stone-500">{t('about_location_desc')}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Trees className="w-5 h-5 text-amber-700 mb-1" />
                <h4 className="text-xs font-bold text-stone-900">{t('about_hours_card')}</h4>
                <p className="text-[11px] text-stone-500">{t('about_hours_desc')}</p>
              </div>
            </div>
          </div>

          {/* Right: Location & Distances Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
              <MapPin className="w-5 h-5 text-amber-700" />
              <div>
                <h3 className="text-base font-bold text-stone-900">Strategic Location</h3>
                <p className="text-xs text-stone-500">{hotelInfo.addressLine}</p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Key Nearby Landmarks & Distances
              </span>
              <div className="space-y-2">
                {distances.map((d, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-stone-900">{d.name}</h4>
                      <p className="text-[11px] text-stone-500">{d.desc}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                      {d.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">{hotelInfo.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold truncate">{hotelInfo.email}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
