export type Currency = 'ETB' | 'USD';

export interface Room {
  id: string;
  name: string;
  category: 'standard' | 'deluxe' | 'suite' | 'family';
  tagline: string;
  priceETB: number;
  priceUSD: number;
  capacity: string;
  bedType: string;
  sizeSqMeters: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  features: string[];
  available: boolean;
  statusText?: string; // e.g. "Available", "Popular", "High Demand"
}

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  priceETB: number;
  priceUSD: number;
  image: string;
  description: string;
  highlights: string[];
  included: string[];
  schedule: string;
}

export interface MenuItem {
  id: string;
  name: string;
  amharicName?: string;
  category: 'traditional' | 'international' | 'beverages' | 'breakfast';
  priceETB: number;
  priceUSD: number;
  description: string;
  isSpecialty?: boolean;
}

export interface ConferenceHall {
  id: string;
  name: string;
  capacity: number;
  image: string;
  description: string;
  suitableFor: string[];
  amenities: string[];
}

export interface HotelInfo {
  name: string;
  tagline: string;
  description: string;
  location: string;
  city: string;
  region: string;
  country: string;
  addressLine: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  receptionHours: string;
  checkInTime: string;
  checkOutTime: string;
  airportPickupAvailable: boolean;
  airportName: string;
  heroImage: string;
  restaurantImage: string;
}

export interface RoomBooking {
  id: string;
  bookingRef: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  adultsCount: number;
  childrenCount: number;
  totalNights: number;
  totalPriceETB: number;
  totalPriceUSD: number;
  specialRequests?: string;
  airportPickupRequested: boolean;
  flightDetails?: string;
  status: 'Confirmed' | 'Pending' | 'Checked-in' | 'Cancelled';
  createdAt: string;
}
