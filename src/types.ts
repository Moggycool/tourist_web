export type Currency = 'ETB' | 'USD';
export type Language = 'en' | 'am';

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
  statusText?: string;
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

export interface BookingAddon {
  id: string;
  name: string;
  nameAmharic?: string;
  priceETB: number;
  priceUSD: number;
  description: string;
  category: 'transport' | 'meal' | 'comfort' | 'safari';
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
  isActive: boolean;
}

export interface GuestInquiry {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  department: 'general' | 'reservations' | 'conferences' | 'weddings' | 'airport';
  dates?: string;
  guestsCount?: number;
  message: string;
  createdAt: string;
  status: 'New' | 'Responded' | 'Archived';
}

export interface HotelPolicyItem {
  id: string;
  title: string;
  titleAmharic: string;
  details: string;
  detailsAmharic: string;
  iconName?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionAmharic: string;
  answer: string;
  answerAmharic: string;
  category: 'general' | 'booking' | 'tours' | 'facilities';
}

export interface RoomBooking {
  id: string;
  bookingRef: string;
  roomId: string;
  roomName: string;
  roomCount: number;
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
  promoCode?: string;
  discountETB?: number;
  discountUSD?: number;
  selectedAddons?: string[];
  specialRequests?: string;
  airportPickupRequested: boolean;
  flightDetails?: string;
  status: 'Confirmed' | 'Pending' | 'Checked-in' | 'Checked-out' | 'Cancelled';
  paymentMethod?: 'telebirr' | 'cbe_birr' | 'pay_on_arrival';
  paymentStatus?: 'Paid' | 'Pending' | 'Pay on Arrival';
  telebirrTxnId?: string;
  telebirrPhone?: string;
  guestRequestsNotes?: string[];
  createdAt: string;
}

export interface NotificationLog {
  id: string;
  bookingRef: string;
  type: 'whatsapp_reception' | 'whatsapp_guest' | 'sms_guest' | 'email_guest';
  recipient: string;
  title: string;
  message: string;
  status: 'Sent' | 'Delivered' | 'Simulated';
  timestamp: string;
}

export interface TelebirrMerchantConfig {
  merchantName: string;
  merchantCode: string;
  shortCode: string;
  accountPhone: string;
  appId: string;
  sandboxMode: boolean;
}

export interface HotelEvent {
  id: string;
  title: string;
  date: string;
  category: 'cultural' | 'conference' | 'celebration' | 'safari' | 'general';
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string; // Base64 data URL or remote URL
  thumbnailUrl?: string;
  videoDuration?: string;
  location?: string;
  featured?: boolean;
}

export interface PostStayFeedback {
  id: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestCountry?: string;
  roomName: string;
  stayMonthYear: string;
  ratingOverall: number; // 1 to 5
  ratings: {
    cleanliness: number;
    hospitality: number;
    diningFood: number;
    lakeTourSafari: number;
    wifiComfort: number;
    valueForMoney: number;
  };
  title: string;
  comments: string;
  favoriteHighlight?: string;
  staffCompliment?: string;
  wouldRecommend: boolean;
  travelType: 'couple' | 'solo' | 'family' | 'business' | 'safari_group';
  verifiedStay: boolean;
  status: 'Published' | 'Pending' | 'Flagged';
  managementResponse?: {
    responderName: string;
    responseText: string;
    responseDate: string;
  };
  createdAt: string;
}
