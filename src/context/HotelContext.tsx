import React, { createContext, useContext, useState, useEffect } from 'react';
import { HotelInfo, Room, TourPackage, MenuItem, ConferenceHall, RoomBooking, HotelEvent, Currency } from '../types';
import { INITIAL_HOTEL_INFO, INITIAL_ROOMS, INITIAL_TOURS, INITIAL_MENU_ITEMS, INITIAL_CONFERENCE_HALLS, INITIAL_EVENTS } from '../data/hotelData';

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

  conferenceHalls: ConferenceHall[];

  bookings: RoomBooking[];
  addBooking: (bookingData: Omit<RoomBooking, 'id' | 'createdAt' | 'status'>) => RoomBooking;
  updateBookingStatus: (id: string, status: RoomBooking['status']) => void;
  deleteBooking: (id: string) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountETB: number, amountUSD?: number) => string;

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
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  
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

  const addBooking = (bookingData: Omit<RoomBooking, 'id' | 'createdAt' | 'status'>): RoomBooking => {
    const newBooking: RoomBooking = {
      ...bookingData,
      id: `bk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };
    setBookings(prev => [newBooking, ...prev]);
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
        conferenceHalls,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        currency,
        setCurrency,
        formatPrice,
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
