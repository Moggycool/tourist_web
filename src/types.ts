export type CategoryType = 
  | 'all'
  | 'nature'
  | 'heritage'
  | 'city'
  | 'beach'
  | 'adventure'
  | 'culinary';

export interface Destination {
  id: string;
  title: string;
  tagline: string;
  country: string;
  continent: 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania';
  category: 'nature' | 'heritage' | 'city' | 'beach' | 'adventure' | 'culinary';
  rating: number;
  reviewsCount: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  approxDailyCostUsd: number;
  duration: string;
  bestSeason: string;
  averageTemp: string;
  heroImage: string;
  gallery: string[];
  description: string;
  highlights: { title: string; desc: string }[];
  localFood: { name: string; desc: string }[];
  travelTips: string[];
  coordinates: { x: number; y: number }; // percentage on 0-100 world map
  featured?: boolean;
  tags: string[];
}

export interface TourExperience {
  id: string;
  destinationId: string;
  destinationTitle: string;
  country: string;
  title: string;
  category: string;
  duration: string;
  priceUsd: number;
  rating: number;
  reviewsCount: number;
  image: string;
  groupSize: string;
  included: string[];
  highlights: string[];
}

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  cost: number;
  notes?: string;
}

export interface TravelGuide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedDate: string;
  image: string;
  excerpt: string;
  paragraphs: string[];
  tips: string[];
}

export interface BookingDetails {
  experienceId: string;
  experienceTitle: string;
  destinationTitle: string;
  guestCount: number;
  date: string;
  contactName: string;
  contactEmail: string;
  specialRequests?: string;
  totalPriceUsd: number;
  bookingRef: string;
}
