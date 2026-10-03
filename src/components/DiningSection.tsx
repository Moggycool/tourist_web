import React, { useState } from 'react';
import { Coffee, Utensils, Sparkles, Wine, Flame } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const DiningSection: React.FC = () => {
  const { menuItems, formatPrice, hotelInfo } = useHotel();
  const [activeCategory, setActiveCategory] = useState<'all' | 'traditional' | 'international' | 'beverages'>('all');

  const filteredMenu = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(m => m.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'traditional', label: 'Traditional Ethiopian' },
    { id: 'international', label: 'Continental & Italian' },
    { id: 'beverages', label: 'Coffee Ceremony & Bar' },
  ];

  return (
    <section id="dining" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Gastronomy & Traditions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Dining & Coffee Experience
            </h2>
            <p className="text-sm text-stone-600 max-w-xl">
              Savor fresh catch from Lake Chamo, sizzling Ethiopian clay pot tibs, and the world-renowned traditional Buna coffee ceremony on our garden terrace.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Feature Row: Coffee Ceremony & Lake Chamo Catch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl aspect-16/11 bg-stone-900 group">
            <img
              src={hotelInfo.restaurantImage}
              alt="Tourist Hotel Restaurant & Coffee Ceremony"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Coffee className="w-4 h-4" />
                <span>Daily Traditional Buna Ceremony</span>
              </div>
              <h3 className="text-xl font-bold">The Birthplace of Coffee, Served with Love</h3>
              <p className="text-xs text-stone-300 line-clamp-2">
                Green Arabica beans roasted over charcoal before your eyes, hand-ground, and served piping hot in traditional clay jebenas with popped corn.
              </p>
            </div>
          </div>

          {/* Right Column: Culinary Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 bg-amber-50/60 rounded-3xl border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Utensils className="w-4 h-4" />
                <span>Locally Sourced Ingredients</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">Fresh Lake Chamo Tilapia Daily</h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Our chef visits the Lake Chamo fishermen every morning to secure wild tilapia caught at dawn. Prepared whole or in delicate fillets with fresh local garlic, wild herbs, and freshly squeezed lemon.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <Flame className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="text-sm font-bold text-stone-900">Sizzling Shekla Tibs</h4>
                <p className="text-[11px] text-stone-600 mt-1">Prime Ethiopian beef or tender goat cooked in clay burners with rosemary and peppers.</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <Wine className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="text-sm font-bold text-stone-900">Terrace Sunset Bar</h4>
                <p className="text-[11px] text-stone-600 mt-1">Chilled Habesha and St. George lagers, South African wines, and fruit cocktails.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Menu Items Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900">Featured Culinary Selections</h3>
            <span className="text-xs text-stone-500">Available from 07:00 AM – 10:30 PM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-amber-300 transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-stone-900">{item.name}</h4>
                    {item.isSpecialty && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                        Specialty
                      </span>
                    )}
                  </div>
                  {item.amharicName && (
                    <span className="text-[11px] text-amber-800 font-medium block">
                      {item.amharicName}
                    </span>
                  )}
                  <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-stone-900 block">
                    {formatPrice(item.priceETB, item.priceUSD)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
