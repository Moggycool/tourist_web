import React, { useState } from 'react';
import { X, Lock, Save, Plus, Trash2, Edit3, BedDouble, Compass, Utensils, BookOpen, Download, Upload, RefreshCw, CheckCircle, ShieldAlert } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { Room, TourPackage, MenuItem, HotelInfo } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const {
    hotelInfo,
    updateHotelInfo,
    rooms,
    updateRoom,
    addRoom,
    deleteRoom,
    tours,
    updateTour,
    menuItems,
    updateMenuItem,
    bookings,
    updateBookingStatus,
    deleteBooking,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    formatPrice
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'info' | 'rooms' | 'tours' | 'dining' | 'bookings' | 'backup'>('info');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Editable local state for hotel info
  const [editableInfo, setEditableInfo] = useState<HotelInfo>(hotelInfo);

  // New room modal state
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCategory, setNewRoomCategory] = useState<'standard' | 'deluxe' | 'suite' | 'family'>('standard');
  const [newRoomPriceETB, setNewRoomPriceETB] = useState(3500);
  const [newRoomPriceUSD, setNewRoomPriceUSD] = useState(30);
  const [newRoomBed, setNewRoomBed] = useState('1 King Bed');
  const [newRoomDesc, setNewRoomDesc] = useState('');

  // Backup import state
  const [importJsonText, setImportJsonText] = useState('');

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveHotelInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateHotelInfo(editableInfo);
    triggerToast('Hotel profile & contact information updated successfully!');
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName) return;

    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: newRoomName,
      category: newRoomCategory,
      tagline: 'Comfortable guest room in Tourist Hotel',
      priceETB: Number(newRoomPriceETB),
      priceUSD: Number(newRoomPriceUSD),
      capacity: '2 Guests',
      bedType: newRoomBed,
      sizeSqMeters: 30,
      image: '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
      gallery: ['/src/assets/images/hotel_room_deluxe_1791052567783.jpg'],
      description: newRoomDesc || 'Equipped with modern amenities, comfortable linens, and ensuite bathroom.',
      amenities: ['High-speed Wi-Fi', 'Hot Shower & Toiletries', 'Complimentary Breakfast', 'Work Desk'],
      features: ['Garden View', 'Daily Housekeeping'],
      available: true,
      statusText: 'Available'
    };

    addRoom(newRoom);
    setShowAddRoom(false);
    setNewRoomName('');
    setNewRoomDesc('');
    triggerToast(`New room "${newRoom.name}" created!`);
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tourist-hotel-arbaminch-content-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Content configuration exported as JSON file!');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJSON(importJsonText.trim());
    if (ok) {
      triggerToast('Content configuration imported and applied successfully!');
      setImportJsonText('');
    } else {
      alert('Invalid JSON structure. Please check the file contents.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">System Admin Content Management Portal</h3>
              <p className="text-[11px] text-stone-400">Manage Tourist Hotel Arba Minch website content, rooms, and bookings</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 px-6 py-2 border-b border-stone-200 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'info' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hotel Profile & Contacts
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rooms' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Rooms & Rates</span>
            <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-800 text-[10px] flex items-center justify-center font-bold">
              {rooms.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tours')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'tours' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tours & Safaris ({tours.length})
          </button>

          <button
            onClick={() => setActiveTab('dining')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'dining' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Restaurant Menu ({menuItems.length})
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'bg-amber-100 text-amber-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Guest Bookings</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-700 text-white text-[10px] font-bold">
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'backup' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Export / Sync JSON
          </button>
        </div>

        {/* Toast alert */}
        {saveToast && (
          <div className="bg-emerald-600 text-white px-6 py-2 text-xs font-semibold flex items-center justify-between shrink-0">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{saveToast}</span>
            </span>
            <button onClick={() => setSaveToast(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800">
          
          {/* TAB 1: HOTEL PROFILE & CONTACTS */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveHotelInfo} className="space-y-4 max-w-3xl">
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Hotel Identity & Public Information</h4>
                <p className="text-xs text-stone-500">Edit the hotel name, description, address, and phone numbers displayed on the live website.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    value={editableInfo.name}
                    onChange={(e) => setEditableInfo({ ...editableInfo, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editableInfo.tagline}
                    onChange={(e) => setEditableInfo({ ...editableInfo, tagline: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">About Hotel Description</label>
                  <textarea
                    rows={3}
                    value={editableInfo.description}
                    onChange={(e) => setEditableInfo({ ...editableInfo, description: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Primary Reception Phone</label>
                  <input
                    type="text"
                    value={editableInfo.phonePrimary}
                    onChange={(e) => setEditableInfo({ ...editableInfo, phonePrimary: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Reservations Mobile / WhatsApp</label>
                  <input
                    type="text"
                    value={editableInfo.phoneSecondary}
                    onChange={(e) => setEditableInfo({ ...editableInfo, phoneSecondary: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={editableInfo.email}
                    onChange={(e) => setEditableInfo({ ...editableInfo, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Address / Location in Arba Minch</label>
                  <input
                    type="text"
                    value={editableInfo.addressLine}
                    onChange={(e) => setEditableInfo({ ...editableInfo, addressLine: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Check-In Time</label>
                  <input
                    type="text"
                    value={editableInfo.checkInTime}
                    onChange={(e) => setEditableInfo({ ...editableInfo, checkInTime: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Check-Out Time</label>
                  <input
                    type="text"
                    value={editableInfo.checkOutTime}
                    onChange={(e) => setEditableInfo({ ...editableInfo, checkOutTime: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hotel Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ROOMS & RATES */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Manage Rooms & Nightly Rates</h4>
                  <p className="text-xs text-stone-500">Edit pricing in Ethiopian Birr (ETB) and USD, update availability, or add new categories.</p>
                </div>

                <button
                  onClick={() => setShowAddRoom(true)}
                  className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Room</span>
                </button>
              </div>

              {/* Add Room Modal / Form */}
              {showAddRoom && (
                <form onSubmit={handleCreateRoom} className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">Create New Room Type</span>
                    <button type="button" onClick={() => setShowAddRoom(false)} className="text-xs text-stone-500">Cancel</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Room Name</label>
                      <input
                        type="text"
                        placeholder="e.g. VIP Penthouse Suite"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Category</label>
                      <select
                        value={newRoomCategory}
                        onChange={(e) => setNewRoomCategory(e.target.value as any)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value="standard">Standard</option>
                        <option value="deluxe">Deluxe</option>
                        <option value="suite">Suite</option>
                        <option value="family">Family</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Bed Configuration</label>
                      <input
                        type="text"
                        value={newRoomBed}
                        onChange={(e) => setNewRoomBed(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Rate (ETB / night)</label>
                      <input
                        type="number"
                        value={newRoomPriceETB}
                        onChange={(e) => setNewRoomPriceETB(Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Rate (USD / night)</label>
                      <input
                        type="number"
                        value={newRoomPriceUSD}
                        onChange={(e) => setNewRoomPriceUSD(Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Brief Description</label>
                      <input
                        type="text"
                        value={newRoomDesc}
                        onChange={(e) => setNewRoomDesc(e.target.value)}
                        placeholder="Balcony view, amenities, etc."
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button type="button" onClick={() => setShowAddRoom(false)} className="px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-1.5 text-xs font-bold bg-amber-700 text-white rounded-lg">Save Room</button>
                  </div>
                </form>
              )}

              {/* Rooms list table */}
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div key={room.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-stone-900">{room.name}</h5>
                        <p className="text-xs text-stone-500">{room.category.toUpperCase()} · {room.bedType} · {room.sizeSqMeters} m²</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={room.available}
                            onChange={(e) => updateRoom(room.id, { available: e.target.checked })}
                            className="rounded text-amber-700"
                          />
                          <span>Available for booking</span>
                        </label>

                        <button
                          onClick={() => deleteRoom(room.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Delete room"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Rate & Status Editor */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-200 text-xs">
                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Rate in ETB (Birr)</label>
                        <input
                          type="number"
                          value={room.priceETB}
                          onChange={(e) => updateRoom(room.id, { priceETB: Number(e.target.value) })}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-1 font-bold text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Rate in USD ($)</label>
                        <input
                          type="number"
                          value={room.priceUSD}
                          onChange={(e) => updateRoom(room.id, { priceUSD: Number(e.target.value) })}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-1 font-bold text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Badge / Status Text</label>
                        <input
                          type="text"
                          value={room.statusText || 'Available'}
                          onChange={(e) => updateRoom(room.id, { statusText: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-900"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TOURS & SAFARIS */}
          {activeTab === 'tours' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-stone-900">Manage Arba Minch Tour Excursions</h4>
                <p className="text-xs text-stone-500">Edit pricing and departure details for Lake Chamo boat safari, Dorze village, and Forty Springs.</p>
              </div>

              <div className="space-y-3">
                {tours.map((t) => (
                  <div key={t.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-stone-900 text-sm">{t.title}</h5>
                      <span className="text-xs text-stone-500">{t.duration}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Price in ETB</label>
                        <input
                          type="number"
                          value={t.priceETB}
                          onChange={(e) => updateTour(t.id, { priceETB: Number(e.target.value) })}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-1 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Price in USD ($)</label>
                        <input
                          type="number"
                          value={t.priceUSD}
                          onChange={(e) => updateTour(t.id, { priceUSD: Number(e.target.value) })}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-1 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Departure Schedule</label>
                        <input
                          type="text"
                          value={t.schedule}
                          onChange={(e) => updateTour(t.id, { schedule: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded px-2 py-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RESTAURANT & DINING MENU */}
          {activeTab === 'dining' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-stone-900">Manage Restaurant & Bar Menu</h4>
                <p className="text-xs text-stone-500">Update dishes, fresh Lake Chamo fish pricing, and coffee ceremony selections.</p>
              </div>

              <div className="space-y-2">
                {menuItems.map((m) => (
                  <div key={m.id} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-4 text-xs">
                    <div className="flex-1">
                      <div className="font-bold text-stone-900">{m.name}</div>
                      <div className="text-[11px] text-stone-500">{m.category} {m.amharicName ? `· ${m.amharicName}` : ''}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-stone-500 font-medium">ETB:</span>
                      <input
                        type="number"
                        value={m.priceETB}
                        onChange={(e) => updateMenuItem(m.id, { priceETB: Number(e.target.value) })}
                        className="w-20 bg-white border border-stone-300 rounded px-2 py-1 font-bold"
                      />

                      <span className="text-stone-500 font-medium ml-2">USD:</span>
                      <input
                        type="number"
                        value={m.priceUSD}
                        onChange={(e) => updateMenuItem(m.id, { priceUSD: Number(e.target.value) })}
                        className="w-16 bg-white border border-stone-300 rounded px-2 py-1 font-bold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GUEST BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Guest Bookings Registry</h4>
                  <p className="text-xs text-stone-500">View and update real-time room reservations made on the website.</p>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                  {bookings.length} Total Reservations
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="py-12 text-center text-xs text-stone-400 bg-stone-50 rounded-2xl border border-stone-200">
                  No guest bookings recorded yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3 text-xs">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <div>
                          <span className="font-mono font-bold text-amber-800 text-sm">{b.bookingRef}</span>
                          <span className="text-stone-500 ml-2">({b.roomName})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                            className="bg-white border border-stone-300 rounded px-2 py-1 font-bold text-xs"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Checked-in">Checked-in</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="p-1 text-stone-400 hover:text-rose-600"
                            title="Delete booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-700">
                        <div>
                          <span className="text-[10px] text-stone-400 block font-bold">GUEST NAME</span>
                          <span className="font-semibold text-stone-900">{b.guestName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-bold">DATES ({b.totalNights} nights)</span>
                          <span>{b.checkInDate} to {b.checkOutDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-bold">TOTAL AMOUNT</span>
                          <span className="font-bold text-stone-900">{formatPrice(b.totalPriceETB, b.totalPriceUSD)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-bold">PHONE / EMAIL</span>
                          <span>{b.guestPhone}</span>
                        </div>
                      </div>

                      {b.airportPickupRequested && (
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-900 text-[11px] border border-amber-100 flex items-center gap-2">
                          <span>✈️ <strong>Airport Pickup:</strong> {b.flightDetails || 'Required from Arba Minch Airport'}</span>
                        </div>
                      )}

                      {b.specialRequests && (
                        <div className="text-[11px] text-stone-500 italic">
                          Special notes: {b.specialRequests}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: BACKUP, EXPORT & SYNC */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Export, Sync & Backup Content Configuration</h4>
                <p className="text-xs text-stone-500">
                  How the system admin can safely transfer or preserve content changes across environments:
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs text-stone-700">
                <h5 className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>1. One-Click JSON Export</span>
                </h5>
                <p>Download the current database of rooms, prices, tours, and menu items to your computer as a `.json` backup file.</p>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download tourist-hotel-content.json</span>
                </button>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs text-stone-700">
                <h5 className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-amber-700" />
                  <span>2. Restore / Import from JSON</span>
                </h5>
                <p>Paste previously exported JSON content to instantly restore or mass-update the entire website.</p>
                <textarea
                  rows={4}
                  placeholder="Paste JSON content here..."
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-[11px] font-mono"
                />
                <button
                  onClick={handleImport}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Apply Imported Content</span>
                </button>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-xs text-rose-800">
                <h5 className="font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset to Factory Defaults</span>
                </h5>
                <p className="text-[11px]">Clear all local customizations and restore original Tourist Hotel Arba Minch defaults.</p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to restore default hotel data? All custom edits will be reset.')) {
                      resetToDefaults();
                      setEditableInfo(hotelInfo);
                      triggerToast('Reset to original default data successfully.');
                    }
                  }}
                  className="px-3 py-1.5 bg-rose-700 text-white rounded-lg font-bold"
                >
                  Reset All to Defaults
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>Changes are instantly saved to local browser storage.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800"
          >
            Close Admin Portal
          </button>
        </div>

      </div>
    </div>
  );
};
