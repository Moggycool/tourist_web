import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles, CheckCircle2, User } from 'lucide-react';
import { TRAVEL_GUIDES } from '../data/destinations';
import { TravelGuide } from '../types';

export const TravelGuidesSection: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<TravelGuide | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Expert Dispatches & Advice</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Curated Travel Guides & Stories
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          In-depth masterclasses on packing light, responsible tourism, and dining like a local.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TRAVEL_GUIDES.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                  {guide.category}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{guide.readTime}</span>
                  <span>•</span>
                  <span>{guide.publishedDate}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={guide.author.avatar}
                  alt={guide.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{guide.author.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{guide.author.role}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-sky-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Read
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Detail Reader Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setSelectedGuide(null)} />

          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
            
            {/* Modal Top Header */}
            <div className="relative h-64 w-full bg-slate-900 shrink-0">
              <img
                src={selectedGuide.image}
                alt={selectedGuide.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500 text-white mb-2 inline-block">
                  {selectedGuide.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black leading-tight">
                  {selectedGuide.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                  <span>By {selectedGuide.author.name}</span>
                  <span>•</span>
                  <span>{selectedGuide.publishedDate}</span>
                  <span>•</span>
                  <span>{selectedGuide.readTime}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
              
              {/* Lead Excerpt */}
              <div className="text-sm font-semibold text-sky-950 bg-sky-50/70 p-4 rounded-2xl border border-sky-100 leading-relaxed">
                {selectedGuide.excerpt}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm leading-relaxed">
                {selectedGuide.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Actionable Golden Rules */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Key Takeaways & Action Rules</span>
                </h4>
                <div className="space-y-2">
                  {selectedGuide.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author bio footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
                <img
                  src={selectedGuide.author.avatar}
                  alt={selectedGuide.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900">{selectedGuide.author.name}</p>
                  <p className="text-[11px] text-slate-500">{selectedGuide.author.role} at Tourist Web</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
