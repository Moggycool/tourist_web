import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  HotelInfo,
  Room,
  TourPackage,
  MenuItem,
  ConferenceHall,
  RoomBooking,
  HotelEvent,
  Currency,
  Language,
  TelebirrMerchantConfig,
  NotificationLog,
  BookingAddon,
  PromoCode,
  GuestInquiry,
  HotelPolicyItem,
  FAQItem
} from '../types';
import {
  INITIAL_HOTEL_INFO,
  INITIAL_ROOMS,
  INITIAL_TOURS,
  INITIAL_MENU_ITEMS,
  INITIAL_CONFERENCE_HALLS,
  INITIAL_EVENTS,
  INITIAL_TELEBIRR_CONFIG,
  INITIAL_NOTIFICATIONS,
  INITIAL_ADDONS,
  INITIAL_PROMO_CODES,
  INITIAL_POLICIES,
  INITIAL_FAQS,
  INITIAL_INQUIRIES
} from '../data/hotelData';
import { TRANSLATIONS } from '../data/translations';

export interface BookingSearchCriteria {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  category: string;
  promoCode?: string;
}

interface HotelContextType {
  hotelInfo: HotelInfo;
  setHotelInfo: React.Dispatch<React.SetStateAction<HotelInfo>>;
  updateHotelInfo: (info: Partial<HotelInfo>) => void;
  
  rooms: Room[];
  updateRoom: (id: string, updated: Partial<Room>) => void;
  addRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;

  tours: TourPackage[];
  updateTour: (id: string, updated: Partial<TourPackage>) => void;
  addTour: (tour: TourPackage) => void;
  deleteTour: (id: string) => void;

  menuItems: MenuItem[];
  updateMenuItem: (id: string, updated: Partial<MenuItem>) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;

  events: HotelEvent[];
  addEvent: (event: HotelEvent) => void;
  updateEvent: (id: string, updated: Partial<HotelEvent>) => void;
  deleteEvent: (id: string) => void;

  addons: BookingAddon[];
  promoCodes: PromoCode[];
  togglePromoCodeActive: (code: string) => void;
  validatePromoCode: (code: string) => PromoCode | null;

  policies: HotelPolicyItem[];
  faqs: FAQItem[];

  inquiries: GuestInquiry[];
  addInquiry: (inquiry: Omit<GuestInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: GuestInquiry['status']) => void;

  conferenceHalls: ConferenceHall[];

  bookings: RoomBooking[];
  addBooking: (bookingData: Omit<RoomBooking, 'id' | 'createdAt' | 'status'>) => RoomBooking;
  updateBookingStatus: (id: string, status: RoomBooking['status']) => void;
  deleteBooking: (id: string) => void;
  getBookingByRef: (bookingRef: string, phoneOrEmail?: string) => RoomBooking | undefined;
  addGuestServiceRequest: (bookingRef: string, requestNote: string) => boolean;
  cancelBookingByGuest: (bookingRef: string, phoneOrEmail: string) => { success: boolean; message: string };

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountETB: number, amountUSD?: number) => string;

  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  searchCriteria: BookingSearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<BookingSearchCriteria>>;

  isGuestPortalOpen: boolean;
  setIsGuestPortalOpen: (open: boolean) => void;

  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  adminPassword: string;
  authenticateAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPass: string) => void;
  adminHeaderVisibility: 'always' | 'authenticated_only' | 'hidden';
  setAdminHeaderVisibility: (val: 'always' | 'authenticated_only' | 'hidden') => void;

  telebirrConfig: TelebirrMerchantConfig;
  updateTelebirrConfig: (cfg: Partial<TelebirrMerchantConfig>) => void;

  notifications: NotificationLog[];
  addNotification: (n: Omit<NotificationLog, 'id' | 'timestamp'>) => void;
  sendReceptionWhatsAppNotification: (booking: RoomBooking) => void;
  sendGuestWhatsAppConfirmation: (booking: RoomBooking) => void;
  clearNotifications: () => void;

  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
  selectedRoomForDetail: Room | null;
  setSelectedRoomForDetail: (room: Room | null) => void;

  selectedTourForBooking: TourPackage | null;
  setSelectedTourForBooking: (tour: TourPackage | null) => void;

  selectedEventForMedia: HotelEvent | null;
  setSelectedEventForMedia: (event: HotelEvent | null) => void;

  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'tourist_hotel_arbaminch_v1';

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state if exists
  const [hotelInfo, setHotelInfo] = useState<HotelInfo>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_info`);
      return saved ? JSON.parse(saved) : INITIAL_HOTEL_INFO;
    } catch {
      return INITIAL_HOTEL_INFO;
    }
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_rooms`);
      return saved ? JSON.parse(saved) : INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  });

  const [tours, setTours] = useState<TourPackage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tours`);
      return saved ? JSON.parse(saved) : INITIAL_TOURS;
    } catch {
      return INITIAL_TOURS;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_menu`);
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [events, setEvents] = useState<HotelEvent[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [conferenceHalls] = useState<ConferenceHall[]>(INITIAL_CONFERENCE_HALLS);

  const [bookings, setBookings] = useState<RoomBooking[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_bookings`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'bk-sample-1',
        bookingRef: 'TH-AM-7489',
        roomId: 'deluxe-king',
        roomName: 'Deluxe King Lake View',
        guestName: 'Elias Bekele',
        guestEmail: 'elias.b@gmail.com',
        guestPhone: '+251 91 144 8899',
        checkInDate: '2026-10-12',
        checkOutDate: '2026-10-15',
        adultsCount: 2,
        childrenCount: 0,
        totalNights: 3,
        totalPriceETB: 14400,
        totalPriceUSD: 126,
        specialRequests: 'High floor room with lake view and quiet balcony.',
        airportPickupRequested: true,
        flightDetails: 'Ethiopian Airlines ET135 Arriving 11:45 AM',
        status: 'Confirmed',
        createdAt: '2026-10-02'
      }
    ];
  });

  const [currency, setCurrency] = useState<Currency>('ETB');
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_lang`);
      return (saved === 'am' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  
  // Telebirr Merchant configuration
  const [telebirrConfig, setTelebirrConfig] = useState<TelebirrMerchantConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_telebirr`);
      return saved ? JSON.parse(saved) : INITIAL_TELEBIRR_CONFIG;
    } catch {
      return INITIAL_TELEBIRR_CONFIG;
    }
  });

  // Notifications Log
  const [notifications, setNotifications] = useState<NotificationLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_notifs`);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [addons] = useState<BookingAddon[]>(INITIAL_ADDONS);
  const [policies] = useState<HotelPolicyItem[]>(INITIAL_POLICIES);
  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_promos`);
      return saved ? JSON.parse(saved) : INITIAL_PROMO_CODES;
    } catch {
      return INITIAL_PROMO_CODES;
    }
  });

  const [inquiries, setInquiries] = useState<GuestInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [searchCriteria, setSearchCriteria] = useState<BookingSearchCriteria>({
    checkIn: '2026-10-12',
    checkOut: '2026-10-15',
    adults: 2,
    children: 0,
    roomsCount: 1,
    category: 'all',
    promoCode: ''
  });

  const [isGuestPortalOpen, setIsGuestPortalOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_promos`, JSON.stringify(promoCodes));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [promoCodes]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [inquiries]);

  const togglePromoCodeActive = (code: string) => {
    setPromoCodes(prev =>
      prev.map(p => (p.code.toUpperCase() === code.toUpperCase() ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const validatePromoCode = (code: string): PromoCode | null => {
    if (!code) return null;
    const clean = code.trim().toUpperCase();
    const found = promoCodes.find(p => p.code.toUpperCase() === clean && p.isActive);
    return found || null;
  };

  const addInquiry = (inquiry: Omit<GuestInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: GuestInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substr(0, 16),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);

    // Also trigger reception alert
    addNotification({
      bookingRef: `INQ-${newInquiry.department.toUpperCase()}`,
      type: 'whatsapp_reception',
      recipient: `Hotel Management (${hotelInfo.phonePrimary})`,
      title: `New Website Inquiry: ${newInquiry.guestName} (${newInquiry.department.toUpperCase()})`,
      message: `${newInquiry.guestName} (${newInquiry.phone}): "${newInquiry.message.substr(0, 80)}..."`,
      status: 'Delivered'
    });
  };

  const updateInquiryStatus = (id: string, status: GuestInquiry['status']) => {
    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status } : inq)));
  };

  const getBookingByRef = (bookingRef: string, phoneOrEmail?: string): RoomBooking | undefined => {
    if (!bookingRef) return undefined;
    const cleanRef = bookingRef.trim().toUpperCase();
    const found = bookings.find(b => b.bookingRef.toUpperCase() === cleanRef);
    if (!found) return undefined;
    if (phoneOrEmail) {
      const query = phoneOrEmail.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchEmail = found.guestEmail.toLowerCase().includes(phoneOrEmail.trim().toLowerCase());
      const matchPhone = found.guestPhone.replace(/[^0-9]/g, '').includes(query);
      if (!matchEmail && !matchPhone) return undefined;
    }
    return found;
  };

  const addGuestServiceRequest = (bookingRef: string, requestNote: string): boolean => {
    const booking = bookings.find(b => b.bookingRef.toUpperCase() === bookingRef.trim().toUpperCase());
    if (!booking) return false;

    setBookings(prev =>
      prev.map(b => {
        if (b.bookingRef.toUpperCase() === bookingRef.trim().toUpperCase()) {
          const notes = b.guestRequestsNotes || [];
          return {
            ...b,
            guestRequestsNotes: [
              ...notes,
              `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: ${requestNote}`
            ]
          };
        }
        return b;
      })
    );

    addNotification({
      bookingRef: booking.bookingRef,
      type: 'whatsapp_reception',
      recipient: `Front Desk (${hotelInfo.phonePrimary})`,
      title: `Guest Service Request: ${booking.guestName} (Room ${booking.roomName})`,
      message: `In-stay request for ${booking.bookingRef}: "${requestNote}"`,
      status: 'Delivered'
    });

    return true;
  };

  const cancelBookingByGuest = (bookingRef: string, phoneOrEmail: string): { success: boolean; message: string } => {
    const booking = getBookingByRef(bookingRef, phoneOrEmail);
    if (!booking) {
      return { success: false, message: 'Reservation not found. Please verify your reference and contact details.' };
    }

    if (booking.status === 'Cancelled') {
      return { success: false, message: 'This reservation has already been cancelled.' };
    }

    // Check 48h cancellation rule
    try {
      const checkInTime = new Date(booking.checkInDate).getTime();
      const nowTime = new Date().getTime();
      const hoursDiff = (checkInTime - nowTime) / (1000 * 3600);
      if (hoursDiff < 48) {
        // Still allow cancel, but inform of policy
        setBookings(prev => prev.map(b => (b.id === booking.id ? { ...b, status: 'Cancelled' } : b)));
        return {
          success: true,
          message:
            'Booking cancelled. Since arrival is within 48 hours, please contact hotel reception regarding the one-night cancellation fee.'
        };
      }
    } catch {
      // ignore date calc error
    }

    setBookings(prev => prev.map(b => (b.id === booking.id ? { ...b, status: 'Cancelled' } : b)));
    return { success: true, message: 'Reservation cancelled successfully free of charge per our 48-hour policy.' };
  };

  // Admin password & session auth
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_pwd`) || 'tourist2026';
    } catch {
      return 'tourist2026';
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(`${STORAGE_KEY}_auth`) === 'true';
    } catch {
      return false;
    }
  });

  // Admin button visibility: 'authenticated_only' (hidden from guests during deployment)
  const [adminHeaderVisibility, setAdminHeaderVisibility] = useState<'always' | 'authenticated_only' | 'hidden'>(() => {
    try {
      return (localStorage.getItem(`${STORAGE_KEY}_header_vis`) as any) || 'authenticated_only';
    } catch {
      return 'authenticated_only';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_header_vis`, adminHeaderVisibility);
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [adminHeaderVisibility]);

  useEffect(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_auth`, isAdminAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [isAdminAuthenticated]);

  // URL trigger (?admin) and keyboard shortcut (Alt + A) for secret admin access
  useEffect(() => {
    // Check URL query parameters (?admin=1 or #admin)
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('admin') || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Alt + A or Ctrl + Shift + A
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const authenticateAdmin = (pass: string): boolean => {
    if (pass === adminPassword) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const changeAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    try {
      localStorage.setItem(`${STORAGE_KEY}_pwd`, newPass);
    } catch (e) {
      console.warn('Storage error', e);
    }
  };

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<TourPackage | null>(null);
  const [selectedEventForMedia, setSelectedEventForMedia] = useState<HotelEvent | null>(null);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_info`, JSON.stringify(hotelInfo));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [hotelInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_rooms`, JSON.stringify(rooms));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_tours`, JSON.stringify(tours));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [tours]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_menu`, JSON.stringify(menuItems));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookings));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_telebirr`, JSON.stringify(telebirrConfig));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [telebirrConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_notifs`, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_lang`, language);
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [language]);

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return (dict as any)[key] || (TRANSLATIONS.en as any)[key] || key;
  };

  // Price Formatter
  const formatPrice = (amountETB: number, amountUSD?: number): string => {
    if (currency === 'USD') {
      const usdVal = amountUSD !== undefined ? amountUSD : Math.round(amountETB / 115);
      return `$${usdVal.toLocaleString()}`;
    }
    return `${amountETB.toLocaleString()} ETB`;
  };

  const updateHotelInfo = (info: Partial<HotelInfo>) => {
    setHotelInfo(prev => ({ ...prev, ...info }));
  };

  const updateRoom = (id: string, updated: Partial<Room>) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
  };

  const addRoom = (room: Room) => {
    setRooms(prev => [...prev, room]);
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const updateTour = (id: string, updated: Partial<TourPackage>) => {
    setTours(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const addTour = (tour: TourPackage) => {
    setTours(prev => [...prev, tour]);
  };

  const deleteTour = (id: string) => {
    setTours(prev => prev.filter(t => t.id !== id));
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, item]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(m => m.id !== id));
  };

  const addEvent = (event: HotelEvent) => {
    setEvents(prev => [event, ...prev]);
  };

  const updateEvent = (id: string, updated: Partial<HotelEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateTelebirrConfig = (cfg: Partial<TelebirrMerchantConfig>) => {
    setTelebirrConfig(prev => ({ ...prev, ...cfg }));
  };

  const addNotification = (n: Omit<NotificationLog, 'id' | 'timestamp'>) => {
    const newNotif: NotificationLog = {
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toISOString().split('T')[0]
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const sendReceptionWhatsAppNotification = (booking: RoomBooking) => {
    const text = `🏨 *NEW RESERVATION - TOURIST HOTEL ARBA MINCH*\n\nRef: *${booking.bookingRef}*\nGuest: *${booking.guestName}* (${booking.guestPhone})\nRoom: *${booking.roomName}*\nDates: ${booking.checkInDate} to ${booking.checkOutDate} (${booking.totalNights} nights)\nGuests: ${booking.adultsCount} Adults${booking.childrenCount ? `, ${booking.childrenCount} Children` : ''}\nTotal: *${booking.totalPriceETB.toLocaleString()} ETB*\nPayment: *${booking.paymentMethod?.toUpperCase() || 'TELEBIRR'}* (${booking.paymentStatus || 'Paid'})\n${booking.telebirrTxnId ? `Telebirr TXN: *${booking.telebirrTxnId}*\n` : ''}Airport Pickup: ${booking.airportPickupRequested ? `YES (Flight: ${booking.flightDetails || 'AMH'})` : 'No'}\nNotes: ${booking.specialRequests || 'None'}`;
    
    // Clean hotel phone for international WhatsApp link
    const cleanPhone = (hotelInfo.phonePrimary || '251468811234').replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    addNotification({
      bookingRef: booking.bookingRef,
      type: 'whatsapp_reception',
      recipient: `Reception (+${cleanPhone})`,
      title: 'WhatsApp Alert Dispatched to Hotel Reception',
      message: `Direct WhatsApp message dispatched for reservation ${booking.bookingRef} (${booking.guestName}).`,
      status: 'Delivered'
    });
  };

  const sendGuestWhatsAppConfirmation = (booking: RoomBooking) => {
    const text = `🏨 *TOURIST HOTEL ARBA MINCH - RESERVATION CONFIRMATION*\n\nDear ${booking.guestName},\nThank you for choosing Tourist Hotel Arba Minch!\n\nYour Booking Ref: *${booking.bookingRef}*\nRoom: *${booking.roomName}*\nCheck-in: *${booking.checkInDate}* (from 2:00 PM)\nCheck-out: *${booking.checkOutDate}* (until 11:00 AM)\nTotal Amount: *${booking.totalPriceETB.toLocaleString()} ETB*\nPayment Status: *${booking.paymentStatus || 'Confirmed'}*\n${booking.telebirrTxnId ? `Telebirr TXN: *${booking.telebirrTxnId}*\n` : ''}Airport Transfer: ${booking.airportPickupRequested ? 'Arranged at Arba Minch Domestic Airport (AMH)' : 'Not needed'}\n\n📍 Tourist Hotel, Sikela Area, Arba Minch\n📞 Reception: ${hotelInfo.phonePrimary}\nHave a wonderful journey to the Great Rift Valley!`;

    const cleanGuestPhone = booking.guestPhone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanGuestPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    addNotification({
      bookingRef: booking.bookingRef,
      type: 'whatsapp_guest',
      recipient: `Guest WhatsApp (+${cleanGuestPhone})`,
      title: 'Voucher WhatsApp Sent to Guest',
      message: `Reservation voucher sent directly to guest ${booking.guestName}.`,
      status: 'Delivered'
    });
  };

  const addBooking = (bookingData: Omit<RoomBooking, 'id' | 'createdAt' | 'status'>): RoomBooking => {
    const newBooking: RoomBooking = {
      ...bookingData,
      id: `bk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };
    setBookings(prev => [newBooking, ...prev]);

    // Automated Reception & Guest Notifications triggered upon booking
    addNotification({
      bookingRef: newBooking.bookingRef,
      type: 'whatsapp_reception',
      recipient: `Hotel Front Desk (${hotelInfo.phonePrimary})`,
      title: `Automated Reception Alert: ${newBooking.roomName}`,
      message: `New booking received for ${newBooking.guestName} (${newBooking.totalNights} nights). Payment: ${newBooking.paymentMethod || 'Telebirr'} (${newBooking.paymentStatus || 'Confirmed'}). Total: ${newBooking.totalPriceETB.toLocaleString()} ETB.`,
      status: 'Delivered'
    });

    addNotification({
      bookingRef: newBooking.bookingRef,
      type: 'sms_guest',
      recipient: newBooking.guestPhone,
      title: 'Automated Guest Booking SMS Confirmation',
      message: `Tourist Hotel: Selam ${newBooking.guestName}! Reservation ${newBooking.bookingRef} is confirmed. View details at reception. Tel: ${hotelInfo.phonePrimary}.`,
      status: 'Sent'
    });

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: RoomBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const resetToDefaults = () => {
    setHotelInfo(INITIAL_HOTEL_INFO);
    setRooms(INITIAL_ROOMS);
    setTours(INITIAL_TOURS);
    setMenuItems(INITIAL_MENU_ITEMS);
    setEvents(INITIAL_EVENTS);
    localStorage.removeItem(`${STORAGE_KEY}_info`);
    localStorage.removeItem(`${STORAGE_KEY}_rooms`);
    localStorage.removeItem(`${STORAGE_KEY}_tours`);
    localStorage.removeItem(`${STORAGE_KEY}_menu`);
    localStorage.removeItem(`${STORAGE_KEY}_events`);
  };

  const exportDataJSON = (): string => {
    const exportData = {
      hotelInfo,
      rooms,
      tours,
      menuItems,
      events,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(exportData, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.hotelInfo) setHotelInfo(data.hotelInfo);
      if (Array.isArray(data.rooms)) setRooms(data.rooms);
      if (Array.isArray(data.tours)) setTours(data.tours);
      if (Array.isArray(data.menuItems)) setMenuItems(data.menuItems);
      if (Array.isArray(data.events)) setEvents(data.events);
      return true;
    } catch (e) {
      console.error('Import error', e);
      return false;
    }
  };

  return (
    <HotelContext.Provider
      value={{
        hotelInfo,
        setHotelInfo,
        updateHotelInfo,
        rooms,
        updateRoom,
        addRoom,
        deleteRoom,
        tours,
        updateTour,
        addTour,
        deleteTour,
        menuItems,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        addons,
        promoCodes,
        togglePromoCodeActive,
        validatePromoCode,
        policies,
        faqs,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        conferenceHalls,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        getBookingByRef,
        addGuestServiceRequest,
        cancelBookingByGuest,
        currency,
        setCurrency,
        formatPrice,
        language,
        setLanguage,
        t,
        searchCriteria,
        setSearchCriteria,
        isGuestPortalOpen,
        setIsGuestPortalOpen,
        isCompareOpen,
        setIsCompareOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminPassword,
        authenticateAdmin,
        logoutAdmin,
        changeAdminPassword,
        adminHeaderVisibility,
        setAdminHeaderVisibility,
        telebirrConfig,
        updateTelebirrConfig,
        notifications,
        addNotification,
        sendReceptionWhatsAppNotification,
        sendGuestWhatsAppConfirmation,
        clearNotifications,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        selectedRoomForDetail,
        setSelectedRoomForDetail,
        selectedTourForBooking,
        setSelectedTourForBooking,
        selectedEventForMedia,
        setSelectedEventForMedia,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
