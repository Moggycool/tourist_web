import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Clock, MapPin, DollarSign, Download, Copy, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { DESTINATIONS } from '../data/destinations';

export const ItineraryPlanner: React.FC = () => {
  const { itinerary, addItineraryItem, removeItineraryItem, clearItinerary, formatPrice } = useTravel();

  const [activeDay, setActiveDay] = useState<number | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // New item form state
  const [newDay, setNewDay] = useState<number>(1);
  const [newTime, setNewTime] = useState<string>('09:00 AM');
  const [newActivity, setNewActivity] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('Kyoto, Japan');
  const [newCost, setNewCost] = useState<number>(25);
  const [newNotes, setNewNotes] = useState<string>('');

  const daysPresent = Array.from(new Set(itinerary.map(i => i.day))).sort((a, b) => a - b);
  const totalDays = Math.max(3, ...daysPresent, 1);
  const availableDays = Array.from({ length: Math.max(totalDays, 3) }, (_, i) => i + 1);

  const filteredItems = activeDay === 'all'
    ? [...itinerary].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
    : itinerary.filter(i => i.day === activeDay).sort((a, b) => a.time.localeCompare(b.time));

  const totalBudgetUsd = itinerary.reduce((sum, item) => sum + (item.cost || 0), 0);

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    addItineraryItem({
      day: Number(newDay),
      time: newTime,
      activity: newActivity.trim(),
      location: newLocation.trim(),
      cost: Number(newCost) || 0,
      notes: newNotes.trim()
    });

    setNewActivity('');
    setNewNotes('');
    setShowAddForm(false);
  };

  const handleAddPreset = (destTitle: string, highlightTitle: string, cost = 25) => {
    addItineraryItem({
      day: activeDay === 'all' ? 1 : activeDay,
      time: '11:00 AM',
      activity: highlightTitle,
      location: destTitle,
      cost,
      notes: 'Recommended by Tourist Web guides'
    });
  };

  const handleCopyItinerary = () => {
    const lines = [
      `=== TOURIST WEB TRIP ITINERARY ===`,
      `Total Estimated Activities Cost: ${formatPrice(totalBudgetUsd)}`,
      ``
    ];

    const sorted = [...itinerary].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
    let curDay = 0;
    sorted.forEach(item => {
      if (item.day !== curDay) {
        curDay = item.day;
        lines.push(`\n--- DAY ${curDay} ---`);
      }
      lines.push(`[${item.time}] ${item.activity} @ ${item.location} (${formatPrice(item.cost)})`);
      if (item.notes) lines.push(`   Note: ${item.notes}`);
    });

    navigator.clipboard?.writeText?.(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Trip Builder & Schedule</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personal Itinerary Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Structure your days, map schedule timings, budget costs, and take your plan on the go.
          </p>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyItinerary}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-xs flex items-center gap-1.5 transition-all"
            title="Copy formatted plan"
          >
            {copiedSummary ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-md shadow-sky-600/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Scheduled Activities</span>
            <p className="text-xl font-extrabold text-slate-900">{itinerary.length} items</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Estimated Activity Budget</span>
            <p className="text-xl font-extrabold text-emerald-700">{formatPrice(totalBudgetUsd)}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Planned Duration</span>
            <p className="text-xl font-extrabold text-slate-900">{availableDays.length} Days Planned</p>
          </div>
        </div>
      </div>

      {/* Day Filter Pills */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDay('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeDay === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            All Days ({itinerary.length})
          </button>

          {availableDays.map((d) => {
            const count = itinerary.filter(i => i.day === d).length;
            return (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeDay === d
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>Day {d}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeDay === d ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {itinerary.length > 0 && (
          <button
            onClick={clearItinerary}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline shrink-0"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Add Activity Modal/Inline Form */}
      {showAddForm && (
        <form onSubmit={handleCreateActivity} className="bg-sky-50/70 border border-sky-200 rounded-3xl p-5 sm:p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>Add New Activity or Tour Stop</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Day</label>
              <select
                value={newDay}
                onChange={e => setNewDay(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                {availableDays.map(d => (
                  <option key={d} value={d}>Day {d}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Time</label>
              <input
                type="text"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                placeholder="e.g. 09:30 AM"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Activity Title</label>
              <input
                type="text"
                value={newActivity}
                onChange={e => setNewActivity(e.target.value)}
                placeholder="e.g. Sunset Boat Cruise or Museum Visit"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
                placeholder="e.g. Positano, Italy"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Est. Cost (USD)</label>
              <input
                type="number"
                min="0"
                value={newCost}
                onChange={e => setNewCost(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="sm:col-span-9">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Travel Notes / Tips (Optional)</label>
              <input
                type="text"
                value={newNotes}
                onChange={e => setNewNotes(e.target.value)}
                placeholder="e.g. Buy tickets online in advance to skip the line"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20"
            >
              Save Activity
            </button>
          </div>
        </form>
      )}

      {/* Itinerary Items Schedule Feed */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No activities scheduled for this day</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Add your own custom activities or pick one from our recommended destination highlights below!
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-2 px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl hover:bg-sky-500"
          >
            Add an Activity
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                
                {/* Day & Time Badge */}
                <div className="shrink-0 flex flex-col items-center justify-center w-20 py-2 bg-slate-50 group-hover:bg-sky-50 rounded-xl border border-slate-200 group-hover:border-sky-200 transition-colors text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 group-hover:text-sky-600">
                    Day {item.day}
                  </span>
                  <span className="text-xs font-black text-slate-800 group-hover:text-sky-900 mt-0.5">
                    {item.time}
                  </span>
                </div>

                {/* Activity details */}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.activity}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-sky-500" />
                      <span>{item.location}</span>
                    </span>
                    {item.cost > 0 && (
                      <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{formatPrice(item.cost)}</span>
                      </span>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      💡 {item.notes}
                    </p>
                  )}
                </div>

              </div>

              {/* Action */}
              <div className="flex items-center justify-end sm:justify-center">
                <button
                  onClick={() => removeItineraryItem(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove from itinerary"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Suggested Inspiration Presets */}
      <div className="pt-6 border-t border-slate-200 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Recommended Activities to Quick-Add</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DESTINATIONS.slice(0, 3).map((d) => {
            const highlight = d.highlights[0];
            return (
              <div
                key={d.id}
                className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/90 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wide">{d.title}</div>
                  <h4 className="text-xs font-bold text-slate-800 mt-0.5 line-clamp-1">{highlight.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{highlight.desc}</p>
                </div>
                <button
                  onClick={() => handleAddPreset(d.title, highlight.title)}
                  className="w-full py-1.5 bg-white hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Day {activeDay === 'all' ? 1 : activeDay}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
