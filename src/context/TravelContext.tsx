import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination, TourExperience, ItineraryItem, BookingDetails } from '../types';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD';

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string }> = {
  USD: { rate: 1.0, symbol: '$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.78, symbol: '£' },
  JPY: { rate: 154, symbol: '¥' },
  AUD: { rate: 1.52, symbol: 'A$' },
  CAD: { rate: 1.38, symbol: 'C$' }
};

interface TravelContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountUsd: number) => string;
  tempUnit: 'C' | 'F';
  toggleTempUnit: () => void;
  formatTemp: (tempStr: string) => string;
  itinerary: ItineraryItem[];
  addItineraryItem: (item: Omit<ItineraryItem, 'id'>) => void;
  removeItineraryItem: (id: string) => void;
  clearItinerary: () => void;
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  bookingExperience: TourExperience | null;
  setBookingExperience: (exp: TourExperience | null) => void;
  bookings: BookingDetails[];
  addBooking: (booking: BookingDetails) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tourist_web_favorites');
      return saved ? JSON.parse(saved) : ['kyoto-japan', 'amalfi-coast-italy'];
    } catch {
      return ['kyoto-japan', 'amalfi-coast-italy'];
    }
  });

  const [currency, setCurrency] = useState<Currency>('USD');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [bookingExperience, setBookingExperience] = useState<TourExperience | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const [itinerary, setItinerary] = useState<ItineraryItem[]>(() => {
    try {
      const saved = localStorage.getItem('tourist_web_itinerary');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { id: 'item-1', day: 1, time: '09:00 AM', activity: 'Arashiyama Bamboo Grove early morning walk', location: 'Kyoto, Japan', cost: 0, notes: 'Rent a bicycle from Saga-Arashiyama Station' },
      { id: 'item-2', day: 1, time: '01:30 PM', activity: 'Kinkaku-ji (Golden Pavilion) & garden stroll', location: 'Kyoto, Japan', cost: 15, notes: 'Golden reflections are best in afternoon sun' },
      { id: 'item-3', day: 2, time: '08:00 AM', activity: 'Hike 10,000 torii gates up Mount Inari', location: 'Kyoto, Japan', cost: 0, notes: 'Stop at Yotsutsuji intersection for Kyoto city view' },
      { id: 'item-4', day: 2, time: '06:00 PM', activity: 'Traditional Kaiseki multi-course dinner in Gion', location: 'Gion, Kyoto', cost: 85, notes: 'Try seasonal matsutake and tempura' }
    ];
  });

  const [bookings, setBookings] = useState<BookingDetails[]>(() => {
    try {
      const saved = localStorage.getItem('tourist_web_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tourist_web_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('tourist_web_itinerary', JSON.stringify(itinerary));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [itinerary]);

  useEffect(() => {
    try {
      localStorage.setItem('tourist_web_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [bookings]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleTempUnit = () => {
    setTempUnit(prev => (prev === 'C' ? 'F' : 'C'));
  };

  const formatPrice = (amountUsd: number): string => {
    const { rate, symbol } = CURRENCY_RATES[currency];
    const converted = amountUsd * rate;
    if (currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${Math.round(converted)}`;
  };

  const formatTemp = (tempStr: string): string => {
    // Input format example: "24°C / 75°F"
    if (tempUnit === 'C') {
      const match = tempStr.match(/(\d+°C)/);
      return match ? match[1] : tempStr;
    } else {
      const match = tempStr.match(/(\d+°F)/);
      return match ? match[1] : tempStr;
    }
  };

  const addItineraryItem = (item: Omit<ItineraryItem, 'id'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: `itin-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    };
    setItinerary(prev => [...prev, newItem]);
  };

  const removeItineraryItem = (id: string) => {
    setItinerary(prev => prev.filter(i => i.id !== id));
  };

  const clearItinerary = () => {
    setItinerary([]);
  };

  const addBooking = (booking: BookingDetails) => {
    setBookings(prev => [booking, ...prev]);
  };

  return (
    <TravelContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        currency,
        setCurrency,
        formatPrice,
        tempUnit,
        toggleTempUnit,
        formatTemp,
        itinerary,
        addItineraryItem,
        removeItineraryItem,
        clearItinerary,
        selectedDestination,
        setSelectedDestination,
        bookingExperience,
        setBookingExperience,
        bookings,
        addBooking,
        isWishlistOpen,
        setIsWishlistOpen
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
