import React, { useState, useRef } from 'react';
import { X, Lock, Save, Plus, Trash2, BedDouble, Compass, Utensils, Download, Upload, RefreshCw, CheckCircle, Film, Image as ImageIcon, Video, Calendar, MapPin, Eye, ShieldCheck, Key, LogOut, Settings, HelpCircle, Smartphone, Send, MessageSquare, Tag, UserPlus } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { Room, TourPackage, MenuItem, HotelInfo, HotelEvent } from '../types';
import { TelebirrDemoModal } from './TelebirrDemoModal';

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
    events,
    addEvent,
    deleteEvent,
    bookings,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    inquiries,
    updateInquiryStatus,
    promoCodes,
    togglePromoCodeActive,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    formatPrice,
    isAdminAuthenticated,
    authenticateAdmin,
    logoutAdmin,
    changeAdminPassword,
    adminHeaderVisibility,
    setAdminHeaderVisibility,
    telebirrConfig,
    updateTelebirrConfig,
    notifications,
    sendReceptionWhatsAppNotification,
    sendGuestWhatsAppConfirmation,
    clearNotifications
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'info' | 'rooms' | 'tours' | 'dining' | 'events' | 'bookings' | 'inquiries' | 'promos' | 'notifications' | 'security' | 'backup'>('events');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Telebirr Vendor Simulator in Admin
  const [isAdminTelebirrDemoOpen, setIsAdminTelebirrDemoOpen] = useState(false);

  // Authentication inputs
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [newPassInput, setNewPassInput] = useState('');

  // Editable local state for hotel info
  const [editableInfo, setEditableInfo] = useState<HotelInfo>(hotelInfo);

  // New room state
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCategory, setNewRoomCategory] = useState<'standard' | 'deluxe' | 'suite' | 'family'>('standard');
  const [newRoomPriceETB, setNewRoomPriceETB] = useState(3500);
  const [newRoomPriceUSD, setNewRoomPriceUSD] = useState(30);
  const [newRoomBed, setNewRoomBed] = useState('1 King Bed');
  const [newRoomDesc, setNewRoomDesc] = useState('');

  // New event / media state
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('2026-10-03');
  const [eventCategory, setEventCategory] = useState<HotelEvent['category']>('cultural');
  const [eventLocation, setEventLocation] = useState('Tourist Hotel Arba Minch');
  const [eventDesc, setEventDesc] = useState('');
  const [eventMediaType, setEventMediaType] = useState<'image' | 'video'>('image');
  const [eventMediaUrl, setEventMediaUrl] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Backup import state
  const [importJsonText, setImportJsonText] = useState('');

  // Walk-in / Phone reservation state
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('+251 9');
  const [walkInEmail, setWalkInEmail] = useState('');
  const [walkInRoomId, setWalkInRoomId] = useState(rooms[0]?.id || '');
  const [walkInCheckIn, setWalkInCheckIn] = useState('2026-10-15');
  const [walkInCheckOut, setWalkInCheckOut] = useState('2026-10-17');
  const [walkInPayMethod, setWalkInPayMethod] = useState<'pay_on_arrival' | 'telebirr' | 'cbe_birr'>('pay_on_arrival');

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleCreateWalkInBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName.trim()) return;
    const room = rooms.find(r => r.id === walkInRoomId) || rooms[0];
    const ref = `TH-WALK-${Math.floor(1000 + Math.random() * 9000)}`;
    addBooking({
      bookingRef: ref,
      roomId: room.id,
      roomName: room.name,
      roomCount: 1,
      guestName: walkInName,
      guestEmail: walkInEmail || 'frontdesk@touristhotel.et',
      guestPhone: walkInPhone,
      checkInDate: walkInCheckIn,
      checkOutDate: walkInCheckOut,
      adultsCount: 2,
      childrenCount: 0,
      totalNights: 2,
      totalPriceETB: room.priceETB * 2,
      totalPriceUSD: room.priceUSD * 2,
      airportPickupRequested: false,
      paymentMethod: walkInPayMethod,
      paymentStatus: walkInPayMethod === 'pay_on_arrival' ? 'Pay on Arrival' : 'Paid',
      specialRequests: 'Walk-in / Phone booking registered by Front Desk'
    });
    setShowWalkInModal(false);
    setWalkInName('');
    triggerToast(`Walk-in reservation ${ref} created successfully!`);
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

  // Handle local photo/video file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Calculate human readable size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setUploadedFileSize(`${sizeInMB} MB (${file.type})`);

    // Detect media type
    if (file.type.startsWith('video/')) {
      setEventMediaType('video');
    } else {
      setEventMediaType('image');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setEventMediaUrl(dataUrl);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading the file. Please try again.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      alert('Please provide an event title.');
      return;
    }
    if (!eventMediaUrl.trim()) {
      alert('Please upload a photo or video, or provide a media URL.');
      return;
    }

    const newEvent: HotelEvent = {
      id: `evt-${Date.now()}`,
      title: eventTitle.trim(),
      date: eventDate,
      category: eventCategory,
      location: eventLocation.trim(),
      description: eventDesc.trim(),
      mediaType: eventMediaType,
      mediaUrl: eventMediaUrl,
      thumbnailUrl: eventMediaType === 'video' ? '/src/assets/images/arbaminch_chamo_safari_1791052587992.jpg' : eventMediaUrl,
      videoDuration: eventMediaType === 'video' ? 'Clip' : undefined,
      featured: true
    };

    addEvent(newEvent);
    setShowAddEvent(false);
    setEventTitle('');
    setEventDesc('');
    setEventMediaUrl('');
    setUploadedFileSize(null);
    triggerToast(`New event "${newEvent.title}" published!`);
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

  // If not logged in, render the Secure Admin Authentication Barrier
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
        <div className="fixed inset-0" onClick={onClose} />

        <div className="relative w-full max-w-md bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 z-10 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Staff Management Portal</h3>
                <p className="text-[11px] text-stone-400">Tourist Hotel · Arba Minch</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const ok = authenticateAdmin(passwordInput);
              if (!ok) {
                setLoginError(true);
              } else {
                setLoginError(false);
                setPasswordInput('');
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Enter Admin / Staff Passcode
              </label>
              <input
                type="password"
                placeholder="Passcode..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                autoFocus
                required
              />
              <p className="text-[11px] text-stone-400 mt-1.5">
                Default passcode: <code className="bg-stone-800 px-1 py-0.5 rounded text-amber-300 font-mono">tourist2026</code>
              </p>
            </div>

            {loginError && (
              <div className="p-2.5 bg-rose-950/60 border border-rose-600/50 rounded-xl text-rose-300 text-xs">
                Incorrect passcode. Please check with hotel management.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-2 border-t border-stone-800 text-center">
            <span className="text-[11px] text-stone-500">
              Restricted to authorized front-desk staff & management.
            </span>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">System Admin Content Management Portal</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Staff Authenticated
                </span>
              </div>
              <p className="text-[11px] text-stone-400">Manage Tourist Hotel Arba Minch website content, rooms, media & bookings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logoutAdmin();
                triggerToast('Logged out of Admin Portal.');
              }}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Lock Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 px-6 py-2 border-b border-stone-200 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'events' ? 'bg-amber-100 text-amber-950 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-amber-700" />
            <span>Recent Events & Media</span>
            <span className="w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] flex items-center justify-center font-bold">
              {events.length}
            </span>
          </button>

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
              activeTab === 'bookings' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Guest Bookings</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-700 text-white text-[10px] font-bold">
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'inquiries' ? 'bg-amber-100 text-amber-950 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            <span>Guest Inquiries</span>
            {inquiries.filter(i => i.status === 'New').length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                {inquiries.filter(i => i.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'promos' ? 'bg-amber-100 text-amber-950 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-amber-700" />
            <span>Promo Codes</span>
            <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-800 text-[10px] flex items-center justify-center font-bold">
              {promoCodes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'notifications' ? 'bg-blue-100 text-blue-950 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-700" />
            <span>Notifications & Telebirr</span>
            <span className="w-4 h-4 rounded-full bg-blue-700 text-white text-[10px] flex items-center justify-center font-bold">
              {notifications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'security' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Security & Visibility</span>
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
          
          {/* TAB: RECENT EVENTS & MEDIA (NEW FEATURE) */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <Film className="w-4 h-4 text-amber-700" />
                    <span>Recent Events, Photos & Small Videos</span>
                  </h4>
                  <p className="text-xs text-stone-500">
                    Upload conference photos, wedding moments, or wildlife boat video clips directly to the hotel website.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddEvent(true)}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Photo / Video</span>
                </button>
              </div>

              {/* Upload New Event Form Modal */}
              {showAddEvent && (
                <form onSubmit={handleCreateEvent} className="p-5 sm:p-6 bg-amber-50/80 border border-amber-200 rounded-3xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                        <Upload className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-amber-950">Upload New Event or Media Highlight</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddEvent(false)}
                      className="text-xs text-stone-500 hover:text-stone-800 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Media File Upload Dropzone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-800">
                      Upload Media (Photo or Small Video)
                    </label>

                    <div className="border-2 border-dashed border-amber-300 rounded-2xl p-5 text-center bg-white hover:bg-amber-50/40 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-3 text-amber-700">
                          <ImageIcon className="w-6 h-6" />
                          <span className="text-stone-300">/</span>
                          <Video className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-stone-800">
                          Click here to select an Image (PNG, JPG) or Small Video (MP4, WebM)
                        </p>
                        <p className="text-[11px] text-stone-500">
                          Directly from your phone or computer. Recommended video size: under 25 MB.
                        </p>
                        {uploadedFileSize && (
                          <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                            ✓ File loaded: {uploadedFileSize}
                          </div>
                        )}
                        {isUploading && (
                          <p className="text-xs text-amber-700 font-bold animate-pulse">Reading file data...</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Or media URL alternative */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Or Paste Image / Video URL (Alternative)
                    </label>
                    <input
                      type="text"
                      value={eventMediaUrl}
                      onChange={(e) => {
                        setEventMediaUrl(e.target.value);
                        if (e.target.value.endsWith('.mp4') || e.target.value.includes('video')) {
                          setEventMediaType('video');
                        }
                      }}
                      placeholder="https://... or data:image/... (automatically filled if file is chosen above)"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-800"
                    />
                  </div>

                  {/* Live Media Preview if selected */}
                  {eventMediaUrl && (
                    <div className="p-3 bg-stone-900 rounded-2xl text-white space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <span>Live Media Preview:</span>
                        <span className="uppercase text-amber-400 font-bold">{eventMediaType}</span>
                      </div>
                      <div className="max-h-48 overflow-hidden rounded-xl flex items-center justify-center bg-black">
                        {eventMediaType === 'video' ? (
                          <video
                            src={eventMediaUrl}
                            controls
                            className="max-h-48 w-full object-contain"
                          />
                        ) : (
                          <img
                            src={eventMediaUrl}
                            alt="Preview"
                            className="max-h-48 w-full object-contain"
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Event Details Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Event / Highlight Title</label>
                      <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="e.g. Traditional Music Night or Lake Chamo Crocodile Sighting"
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold"
                        required
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Event Date</label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold"
                        required
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Category</label>
                      <select
                        value={eventCategory}
                        onChange={(e) => setEventCategory(e.target.value as any)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold"
                      >
                        <option value="cultural">Cultural Festival & Traditions</option>
                        <option value="safari">Safari & Wildlife Clip</option>
                        <option value="celebration">Awards & Celebrations</option>
                        <option value="conference">Conference / Workshop</option>
                        <option value="general">Hotel Life & Gardens</option>
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Media Type</label>
                      <select
                        value={eventMediaType}
                        onChange={(e) => setEventMediaType(e.target.value as any)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold"
                      >
                        <option value="image">Photo (Still Image)</option>
                        <option value="video">Small Video Reel</option>
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Garden Terrace or Lake Chamo"
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>

                    <div className="sm:col-span-12">
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Story / Description</label>
                      <textarea
                        rows={2}
                        value={eventDesc}
                        onChange={(e) => setEventDesc(e.target.value)}
                        placeholder="Tell visitors what happened during this event or safari highlight..."
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => setShowAddEvent(false)}
                      className="px-4 py-2 bg-white text-stone-700 border border-stone-300 rounded-xl text-xs font-bold hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Publish Event to Website</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Existing Events Feed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Currently Published Events ({events.length})</span>
                  <span>Displayed on homepage under "Recent Events"</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {events.map((evt) => {
                    const isVideo = evt.mediaType === 'video';
                    return (
                      <div
                        key={evt.id}
                        className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {isVideo ? (
                                <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                                  <Film className="w-3 h-3" />
                                  <span>VIDEO</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3" />
                                  <span>PHOTO</span>
                                </span>
                              )}
                              <span className="text-[11px] text-stone-400 capitalize">{evt.category}</span>
                            </div>

                            <button
                              onClick={() => {
                                if (confirm(`Delete event "${evt.title}"?`)) {
                                  deleteEvent(evt.id);
                                  triggerToast('Event deleted.');
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                              title="Delete event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="h-32 rounded-xl overflow-hidden bg-stone-900 relative">
                            {isVideo ? (
                              <video
                                src={evt.mediaUrl}
                                className="w-full h-full object-cover"
                                muted
                              />
                            ) : (
                              <img
                                src={evt.thumbnailUrl || evt.mediaUrl}
                                alt={evt.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </div>

                          <h5 className="font-bold text-stone-900 text-xs line-clamp-1">{evt.title}</h5>
                          <p className="text-[11px] text-stone-500 line-clamp-2">{evt.description}</p>
                        </div>

                        <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400">
                          <span>📅 {evt.date}</span>
                          <span>📍 {evt.location || 'Arba Minch'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

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

              {/* Rooms list */}
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Guest Bookings Registry</h4>
                  <p className="text-xs text-stone-500">View and update real-time room reservations made on the website or front desk.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWalkInModal(!showWalkInModal)}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Walk-in / Phone Reservation</span>
                  </button>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {bookings.length} Total Reservations
                  </span>
                </div>
              </div>

              {/* Inline Walk-in / Phone Reservation Form */}
              {showWalkInModal && (
                <form onSubmit={handleCreateWalkInBooking} className="p-4 bg-amber-50/70 border border-amber-300 rounded-2xl space-y-3 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <UserPlus className="w-4 h-4 text-amber-700" />
                      <span>Front Desk Manual / Walk-in Booking Entry</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowWalkInModal(false)}
                      className="text-stone-400 hover:text-stone-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Guest Full Name *</label>
                      <input
                        type="text"
                        required
                        value={walkInName}
                        onChange={(e) => setWalkInName(e.target.value)}
                        placeholder="e.g. Alemayehu Bekele"
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={walkInPhone}
                        onChange={(e) => setWalkInPhone(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Accommodation</label>
                      <select
                        value={walkInRoomId}
                        onChange={(e) => setWalkInRoomId(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 font-medium"
                      >
                        {rooms.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({formatPrice(r.priceETB, r.priceUSD)})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Check-in Date</label>
                      <input
                        type="date"
                        required
                        value={walkInCheckIn}
                        onChange={(e) => setWalkInCheckIn(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Check-out Date</label>
                      <input
                        type="date"
                        required
                        value={walkInCheckOut}
                        onChange={(e) => setWalkInCheckOut(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Payment Method</label>
                      <select
                        value={walkInPayMethod}
                        onChange={(e) => setWalkInPayMethod(e.target.value as any)}
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 font-medium"
                      >
                        <option value="pay_on_arrival">Pay at Front Desk (Cash / Birr)</option>
                        <option value="telebirr">Telebirr Mobile Money</option>
                        <option value="cbe_birr">CBE Birr Shortcode</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowWalkInModal(false)}
                      className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                    >
                      Save & Issue Voucher
                    </button>
                  </div>
                </form>
              )}

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

                      {/* Payment & Telebirr details */}
                      <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-stone-400 font-bold uppercase">PAYMENT:</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.paymentMethod === 'telebirr'
                              ? 'bg-blue-100 text-blue-900 border border-blue-200'
                              : b.paymentMethod === 'cbe_birr'
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {b.paymentMethod ? b.paymentMethod.toUpperCase() : 'TELEBIRR'} ({b.paymentStatus || 'Paid'})
                          </span>
                          {b.telebirrTxnId && (
                            <span className="font-mono text-[10px] text-blue-800 font-bold">
                              TXN: {b.telebirrTxnId}
                            </span>
                          )}
                        </div>

                        {/* Automated WhatsApp Dispatch buttons for staff */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => sendGuestWhatsAppConfirmation(b)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200 flex items-center gap-1 transition-colors cursor-pointer"
                            title="Send voucher WhatsApp to guest"
                          >
                            <Send className="w-3 h-3 text-emerald-700" />
                            <span>WhatsApp Guest</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => sendReceptionWhatsAppNotification(b)}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Forward alert to reception WhatsApp"
                          >
                            <Smartphone className="w-3 h-3 text-stone-600" />
                            <span>WhatsApp Reception</span>
                          </button>
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

          {/* TAB 6: GUEST INQUIRIES & CONTACT MESSAGES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Guest Messages & Inquiries</h4>
                  <p className="text-xs text-stone-500">Submissions received through the hotel website contact form and tour inquiries.</p>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {inquiries.length} Inquiries
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-stone-400 bg-stone-50 rounded-2xl border border-stone-200">
                  No guest inquiries recorded yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-4 rounded-2xl border transition-all text-xs space-y-3 ${
                        inq.status === 'New'
                          ? 'bg-amber-50/60 border-amber-300'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            inq.status === 'New'
                              ? 'bg-amber-600 text-white'
                              : inq.status === 'Responded'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-stone-200 text-stone-700'
                          }`}>
                            {inq.status.toUpperCase()}
                          </span>
                          <span className="font-bold text-stone-900 text-sm">
                            {inq.department.toUpperCase()} INQUIRY
                          </span>
                          {inq.dates && (
                            <span className="text-[11px] text-amber-800 font-semibold bg-amber-100/70 px-2 py-0.5 rounded">
                              {inq.dates}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 font-medium">{inq.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-stone-600">
                        <div>
                          <strong className="text-stone-900 block">{inq.guestName}</strong>
                          <span>Guest Name</span>
                        </div>
                        <div>
                          <span className="font-medium text-stone-800 block">{inq.email}</span>
                          <span>Email</span>
                        </div>
                        <div>
                          <span className="font-medium text-stone-800 block">{inq.phone}</span>
                          <span>Phone / WhatsApp</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 leading-relaxed">
                        {inq.message}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateInquiryStatus(inq.id, inq.status === 'Responded' ? 'New' : 'Responded')}
                            className="px-3 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
                          >
                            Mark as {inq.status === 'Responded' ? 'Unread / New' : 'Responded'}
                          </button>
                        </div>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.guestName)},%20regarding%20your%20inquiry%20to%20Tourist%20Hotel%20Arba%20Minch...`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>Reply via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: PROMO CODES & DISCOUNTS */}
          {activeTab === 'promos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Promo Codes & Seasonal Vouchers</h4>
                  <p className="text-xs text-stone-500">Active discount vouchers usable by guests in the booking modal and quick search bar.</p>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {promoCodes.filter(p => p.isActive).length} Active Codes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promoCodes.map((p) => (
                  <div
                    key={p.code}
                    className={`p-4 rounded-2xl border transition-all text-xs space-y-3 ${
                      p.isActive
                        ? 'bg-white border-amber-300 shadow-xs'
                        : 'bg-stone-100 border-stone-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-amber-800 text-base bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                          {p.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                          {p.discountPercent}% OFF
                        </span>
                      </div>
                      <button
                        onClick={() => togglePromoCodeActive(p.code)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          p.isActive
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
                        }`}
                      >
                        {p.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </div>

                    <p className="text-stone-600 text-xs">{p.description}</p>
                    <div className="text-[11px] text-stone-400 pt-1 border-t border-stone-100">
                      Voucher Status: <strong className={p.isActive ? 'text-emerald-700' : 'text-stone-500'}>{p.isActive ? 'Active for Online Bookings' : 'Paused'}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: AUTOMATED NOTIFICATIONS & TELEBIRR GATEWAY */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-700" />
                  <span>Automated Notifications & Telebirr Mobile Money</span>
                </h4>
                <p className="text-xs text-stone-500">
                  Manage real-time guest/reception alerts (WhatsApp & Ethio Telecom SMS) and test the Telebirr vendor payment flow.
                </p>
              </div>

              {/* 1. Telebirr Vendor Payment Simulator & Configuration */}
              <div className="p-5 bg-blue-50/80 rounded-2xl border border-blue-200 space-y-4 text-xs text-blue-950">
                <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#005cb9] text-white font-black text-xs flex items-center justify-center">
                      tb
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-blue-950">Telebirr Merchant Gateway Integration</h5>
                      <p className="text-[11px] text-blue-800">Ethio Telecom Mobile Money API & In-Store USSD</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-blue-950">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-blue-900 font-bold mb-1">Merchant Shortcode</label>
                    <input
                      type="text"
                      value={telebirrConfig.merchantCode}
                      onChange={(e) => updateTelebirrConfig({ merchantCode: e.target.value })}
                      className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 font-mono font-bold text-blue-950"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-blue-900 font-bold mb-1">Merchant Name</label>
                    <input
                      type="text"
                      value={telebirrConfig.merchantName}
                      onChange={(e) => updateTelebirrConfig({ merchantName: e.target.value })}
                      className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 font-bold text-blue-950"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-blue-900 font-bold mb-1">Settlement Mobile Number</label>
                    <input
                      type="text"
                      value={telebirrConfig.accountPhone}
                      onChange={(e) => updateTelebirrConfig({ accountPhone: e.target.value })}
                      className="w-full bg-white border border-blue-300 rounded-lg px-2.5 py-1.5 font-mono text-blue-950"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-blue-950 block">Vendor Payment Demonstration Tool</span>
                    <span className="text-[11px] text-stone-600 block">
                      Launch a realistic Telebirr mobile authorization prompt to demonstrate payments to Ethio Telecom reps and hotel stakeholders.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAdminTelebirrDemoOpen(true)}
                    className="px-4 py-2 bg-[#005cb9] hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Launch Vendor Demo Flow</span>
                  </button>
                </div>
              </div>

              {/* 2. Automated Notifications Dispatch History */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">Automated Guest & Reception Notification Logs</h5>
                    <p className="text-[11px] text-stone-500">Live records of alerts dispatched via WhatsApp & SMS</p>
                  </div>
                  <button
                    onClick={clearNotifications}
                    className="text-[11px] text-stone-500 hover:text-stone-800 font-semibold cursor-pointer"
                  >
                    Clear Log
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-stone-400">
                    No notification logs recorded yet.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 bg-white rounded-xl border border-stone-200 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>{n.title}</span>
                          </span>
                          <span className="text-[10px] text-stone-400">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed">{n.message}</p>
                        <div className="pt-1 flex items-center justify-between text-[10px] text-stone-400 border-t border-stone-100">
                          <span>To: <strong>{n.recipient}</strong></span>
                          <span className="text-emerald-700 font-bold uppercase">Status: {n.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: SECURITY & DEPLOYMENT VISIBILITY SETTINGS */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Admin Portal Security & Visibility Controls</h4>
                <p className="text-xs text-stone-500">
                  Control how the "Admin CMS" link appears to regular guests during deployment, change your passcode, and manage secret access.
                </p>
              </div>

              {/* 1. Header Visibility Control */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-700" />
                  <h5 className="font-bold text-stone-900 text-sm">Top Navigation Link Visibility in Production</h5>
                </div>
                <p className="text-stone-600">
                  Choose whether ordinary hotel guests visiting your website can see the "Admin CMS" button in the top bar:
                </p>

                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200 cursor-pointer hover:border-amber-400 transition-colors">
                    <input
                      type="radio"
                      name="headerVisibility"
                      checked={adminHeaderVisibility === 'authenticated_only'}
                      onChange={() => {
                        setAdminHeaderVisibility('authenticated_only');
                        triggerToast('Updated: Admin CMS button is now only visible after staff signs in.');
                      }}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        Visible Only When Staff Is Signed In (Recommended for Deployment)
                      </span>
                      <span className="text-[11px] text-stone-500 leading-relaxed block mt-0.5">
                        Normal website guests browsing the hotel will never see the "Admin CMS" button. Once staff unlocks the portal via the footer or shortcut, the button becomes visible during their session.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200 cursor-pointer hover:border-amber-400 transition-colors">
                    <input
                      type="radio"
                      name="headerVisibility"
                      checked={adminHeaderVisibility === 'hidden'}
                      onChange={() => {
                        setAdminHeaderVisibility('hidden');
                        triggerToast('Updated: Admin CMS button is completely hidden from the header.');
                      }}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        Completely Hidden from Top Bar (Stealth Mode)
                      </span>
                      <span className="text-[11px] text-stone-500 leading-relaxed block mt-0.5">
                        Never show the Admin button in the header. Only reachable by clicking "Staff & Management" in the footer, or using the secret keyboard shortcut.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200 cursor-pointer hover:border-amber-400 transition-colors">
                    <input
                      type="radio"
                      name="headerVisibility"
                      checked={adminHeaderVisibility === 'always'}
                      onChange={() => {
                        setAdminHeaderVisibility('always');
                        triggerToast('Updated: Admin CMS button is always visible.');
                      }}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        Always Visible in Top Bar (Testing & Development Mode)
                      </span>
                      <span className="text-[11px] text-stone-500 leading-relaxed block mt-0.5">
                        Keeps the "Admin CMS" button permanently visible in the header for easy demonstration.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* 2. Change Passcode */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-700" />
                  <h5 className="font-bold text-stone-900 text-sm">Change Admin / Staff Passcode</h5>
                </div>
                <p className="text-stone-600">
                  Update the password required to unlock the Admin Portal:
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="password"
                    placeholder="Enter new passcode..."
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  />
                  <button
                    onClick={() => {
                      if (!newPassInput.trim() || newPassInput.trim().length < 4) {
                        alert('Passcode must be at least 4 characters.');
                        return;
                      }
                      changeAdminPassword(newPassInput.trim());
                      setNewPassInput('');
                      triggerToast('Admin passcode updated successfully!');
                    }}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl whitespace-nowrap shadow-sm"
                  >
                    Save New Passcode
                  </button>
                </div>
              </div>

              {/* 3. Secret Access Methods */}
              <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3 text-xs text-amber-950">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>How Staff Accesses the Admin Portal When Hidden:</span>
                </div>
                <ul className="space-y-2 text-[11px] text-stone-700 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-800">1. Secret Keyboard Shortcut:</span>
                    <span>Press <kbd className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono font-bold text-stone-900">Alt + A</kbd> (or <kbd className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono font-bold text-stone-900">Ctrl + Shift + A</kbd>) anywhere on the website to open the login screen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-800">2. Secret URL Query:</span>
                    <span>Type <code className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono font-bold text-stone-900">?admin</code> at the end of the web address (e.g. <code className="text-amber-900 font-semibold">https://touristhotelarbaminch.com/?admin</code>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-800">3. Discreet Footer Link:</span>
                    <span>Click the small <code className="font-semibold text-stone-900">Staff & Management</code> link at the very bottom of the website footer.</span>
                  </li>
                </ul>
              </div>
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
                <p>Download the current database of rooms, prices, events, videos, and menu items to your computer as a `.json` backup file.</p>
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

      {/* Admin Vendor Telebirr Simulator */}
      <TelebirrDemoModal
        isOpen={isAdminTelebirrDemoOpen}
        onClose={() => setIsAdminTelebirrDemoOpen(false)}
        amountETB={4800}
        merchantName={telebirrConfig.merchantName}
        merchantCode={telebirrConfig.merchantCode}
        guestPhone={hotelInfo.phonePrimary}
        onSuccess={(txnId) => {
          triggerToast(`Demo Telebirr payment verified! Txn Ref: ${txnId}`);
        }}
      />
    </div>
  );
};
