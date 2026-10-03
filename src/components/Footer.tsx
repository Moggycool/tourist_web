import React from 'react';
import { Compass, Globe, Heart, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">Tourist Web</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your comprehensive portal for world exploration, hand-crafted day-by-day itineraries, certified local experiences, and responsible travel inspiration.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>Verified Guides</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span>Global Reach</span>
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore Tourist Web</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('explore')} className="hover:text-white transition-colors">
                  Top Destinations
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('map')} className="hover:text-white transition-colors">
                  Interactive Geographic Map
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('experiences')} className="hover:text-white transition-colors">
                  Tours & Guided Experiences
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('itinerary')} className="hover:text-white transition-colors">
                  Day-by-Day Itinerary Planner
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('guides')} className="hover:text-white transition-colors">
                  Curated Travel Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Continents */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Featured Continents</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('explore')}>Europe (Amalfi, Santorini, Alps)</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('explore')}>Asia (Kyoto, Tokyo, Kyoto Gardens)</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('explore')}>Americas (Banff Rockies, Machu Picchu)</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('explore')}>Africa (Cape Town, Marrakesh Medina)</li>
            </ul>
          </div>

          {/* Travel Tip of the Day */}
          <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Traveler Pro Tip</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Always arrive at major landmark temples and mountain viewpoints 30 minutes before sunrise for golden light photography and crowd-free wonder."
            </p>
            <span className="text-[10px] text-slate-400 block">— Tourist Web Editorial Team</span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Tourist Web. Built for world travelers & global wanderers.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sustainable Travel Charter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
