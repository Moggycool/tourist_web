import { HotelInfo, Room, TourPackage, MenuItem, ConferenceHall, HotelEvent, TelebirrMerchantConfig, NotificationLog, BookingAddon, PromoCode, GuestInquiry, HotelPolicyItem, FAQItem, PostStayFeedback } from '../types';

export const INITIAL_TELEBIRR_CONFIG: TelebirrMerchantConfig = {
  merchantName: 'Tourist Hotel Arba Minch',
  merchantCode: '589214',
  shortCode: '25109',
  accountPhone: '+251 91 144 8899',
  appId: 'TB_AMH_TOURIST_HOTEL_01',
  sandboxMode: true
};

export const INITIAL_NOTIFICATIONS: NotificationLog[] = [
  {
    id: 'notif-1',
    bookingRef: 'TH-AM-7489',
    type: 'whatsapp_reception',
    recipient: 'Reception Desk (+251 91 123 4567)',
    title: 'New Booking & Telebirr Payment Confirmed',
    message: 'New Guest: Elias Bekele (2 Guests) · Deluxe King Lake View · Oct 12-15 · Total: 14,400 ETB (Telebirr TXN: TB-9842103) · Airport pickup required.',
    status: 'Delivered',
    timestamp: '2026-10-02 11:45 AM'
  },
  {
    id: 'notif-2',
    bookingRef: 'TH-AM-7489',
    type: 'sms_guest',
    recipient: '+251 91 144 8899',
    title: 'Automated Guest Booking Voucher SMS',
    message: 'Tourist Hotel: Selam Elias! Your reservation TH-AM-7489 for Deluxe King Lake View is confirmed. Free AMH airport pickup scheduled. Tel: +251 46 881 1234.',
    status: 'Sent',
    timestamp: '2026-10-02 11:46 AM'
  }
];

export const INITIAL_HOTEL_INFO: HotelInfo = {
  name: 'Tourist Hotel',
  tagline: 'Your Peaceful Haven in Arba Minch & Gateway to the Rift Valley Lakes',
  description: 'Nestled on the verdant hillside of Arba Minch overlooking the Great Rift Valley, Lake Chamo, and Lake Abaya, Tourist Hotel provides an exceptional blend of authentic Ethiopian hospitality, modern comfort, and unforgettable nature excursions. Whether visiting for vacation, cultural exploration of the Dorze villages, or business conferences, our tranquil gardens and dedicated team make your stay unforgettable.',
  location: 'Arba Minch',
  city: 'Arba Minch (Sikela Area)',
  region: 'Southern Ethiopia Regional State',
  country: 'Ethiopia',
  addressLine: 'Tourist Hotel St., Sikela Sub-City, Arba Minch, Ethiopia',
  phonePrimary: '+251 46 881 1234',
  phoneSecondary: '+251 91 123 4567',
  email: 'info@touristhotelarbaminch.com',
  receptionHours: '24 Hours / 7 Days',
  checkInTime: '02:00 PM',
  checkOutTime: '11:00 AM',
  airportPickupAvailable: true,
  airportName: 'Arba Minch Airport (AMH) - 10 min drive',
  heroImage: '/src/assets/images/hotel_hero_arbaminch_1791052555679.jpg',
  restaurantImage: '/src/assets/images/hotel_restaurant_dining_1791052577683.jpg'
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'standard-double',
    name: 'Standard Double Room',
    category: 'standard',
    tagline: 'Cozy and quiet with garden view and modern workspace',
    priceETB: 3200,
    priceUSD: 28,
    capacity: '2 Guests',
    bedType: '1 Queen Bed',
    sizeSqMeters: 26,
    image: '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
    gallery: [
      '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
      '/src/assets/images/hotel_hero_arbaminch_1791052555679.jpg'
    ],
    description: 'Designed for individual travelers or couples seeking a peaceful, comfortable retreat after a day exploring Lake Chamo or Nechisar. Equipped with plush bedding, work desk, ensuite shower with solar hot water, and high-speed Wi-Fi.',
    amenities: ['High-speed Wi-Fi', 'Ensuite Bathroom & Hot Water', 'Daily Housekeeping', 'Complimentary Breakfast', 'Work Desk & Chair', 'Wardrobe & Safe'],
    features: ['Garden View', 'Quiet Courtyard Wing', 'Mosquito Netting', 'Room Service'],
    available: true,
    statusText: 'Popular'
  },
  {
    id: 'deluxe-king',
    name: 'Deluxe King Lake View',
    category: 'deluxe',
    tagline: 'Private balcony overlooking Lake Chamo and the Rift Valley',
    priceETB: 4800,
    priceUSD: 42,
    capacity: '2 Guests',
    bedType: '1 King Bed',
    sizeSqMeters: 36,
    image: '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
    gallery: [
      '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
      '/src/assets/images/arbaminch_chamo_safari_1791052587992.jpg'
    ],
    description: 'Our signature guest room boasting panoramic views of the Bridge of God and the shimmering waters of Lake Chamo. Features a private furnished balcony, premium king mattress, HD Smart TV, minibar, and coffee/tea station.',
    amenities: ['Private Balcony with Lake View', 'High-speed Wi-Fi', 'Complimentary Buffet Breakfast', 'HD Smart TV', 'Minibar Fridge', 'Tea & Coffee Maker', 'Hot Shower & Toiletries'],
    features: ['Panoramic Rift Valley View', 'Sitting Area with Sofa', 'Air Cooling / Fan', '24/7 Room Service'],
    available: true,
    statusText: 'Best Seller'
  },
  {
    id: 'executive-suite',
    name: 'Executive Lake Panorama Suite',
    category: 'suite',
    tagline: 'Expansive luxury with separate living room and wrap-around terrace',
    priceETB: 7200,
    priceUSD: 64,
    capacity: '2 Adults + 1 Child',
    bedType: '1 King Bed + Lounge Sofa',
    sizeSqMeters: 55,
    image: '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
    gallery: [
      '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
      '/src/assets/images/hotel_hero_arbaminch_1791052555679.jpg'
    ],
    description: 'The pinnacle of hospitality in Arba Minch. Includes an expansive master bedroom, separate contemporary lounge with dining space, spacious ensuite bathroom with walk-in rain shower, and a grand terrace overlooking the sunrise over the lakes.',
    amenities: ['Wrap-around Terrace', 'Separate Living Room', 'Complimentary Airport Transfer', 'Complimentary Breakfast & Fruit Basket', 'Fast Wi-Fi', 'Smart TV with Satellite Channels', 'Espresso Machine', 'Luxury Robes & Slippers'],
    features: ['VIP Express Check-in', 'Lake Chamo & Abaya Panoramic View', 'Executive Work Station'],
    available: true,
    statusText: 'VIP Suite'
  },
  {
    id: 'family-two-bedroom',
    name: 'Family Garden Suite',
    category: 'family',
    tagline: 'Two connected bedrooms with private garden patio for families',
    priceETB: 6500,
    priceUSD: 58,
    capacity: '4 - 5 Guests',
    bedType: '1 King Bed + 2 Twin Beds',
    sizeSqMeters: 62,
    image: '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
    gallery: [
      '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
      '/src/assets/images/hotel_restaurant_dining_1791052577683.jpg'
    ],
    description: 'Ideal for families or groups traveling together to explore Southern Ethiopia. Two independent bedrooms connected by a central hallway and spacious patio garden where children can play safely.',
    amenities: ['Two Separate Bedrooms', 'Two Ensuite Bathrooms', 'Complimentary Family Breakfast', 'Garden Access', 'High-Speed Wi-Fi', 'Baby Cot on Request'],
    features: ['Family Dining Table', 'Extra Storage Space', 'Interconnecting Doors'],
    available: true,
    statusText: 'Family Choice'
  }
];

export const INITIAL_TOURS: TourPackage[] = [
  {
    id: 'lake-chamo-safari',
    title: 'Lake Chamo Boat Safari & Crocodile Market',
    tagline: 'Encounter giant Nile crocodiles, pods of hippos, and exotic water birds up close',
    duration: '3 - 4 Hours',
    priceETB: 2400,
    priceUSD: 22,
    image: '/src/assets/images/arbaminch_chamo_safari_1791052587992.jpg',
    description: 'A highlight of any trip to Arba Minch. Board our comfortable motorboat across Lake Chamo inside Nechisar National Park. Visit the world-famous "Crocodile Market" sandbank where massive 5-meter Nile crocodiles bask in the sun alongside pods of snorting hippopotamuses, African fish eagles, and pink-backed pelicans.',
    highlights: [
      'Close encounters with some of Africa’s largest wild crocodiles',
      'Observation of hippo families cooling in shallow waters',
      'Abundant birdlife: African Fish Eagles, Goliath Herons, Kingfishers',
      'Scenic vistas across the water toward the Guge Mountains'
    ],
    included: ['Hotel roundtrip transfer', 'Licensed boat captain & safety life jackets', 'National park entrance assistance', 'Bottled mineral water'],
    schedule: 'Daily departures at 08:30 AM (Best morning light) and 03:00 PM (Golden hour)'
  },
  {
    id: 'dorze-village-cultural',
    title: 'Dorze Cultural Village & Bamboo House Tour',
    tagline: 'Discover traditional beehive bamboo homes, master weaving, and local Kocho bread',
    duration: 'Half Day (4 - 5 Hours)',
    priceETB: 2800,
    priceUSD: 25,
    image: '/src/assets/images/hotel_hero_arbaminch_1791052555679.jpg',
    description: 'Ascend 2,400 meters into the cool, misty Guge Mountains to Chencha and the Dorze community. The Dorze people are famous throughout Ethiopia for their towering bamboo huts shaped like elephant heads and their master handloom weaving. Learn how Kocho (bread made from the false banana plant) is fermented and baked, and savor fresh honey and spicy stews.',
    highlights: [
      'Step inside multi-story bamboo huts engineered to last up to 80 years',
      'Live demonstration of cotton spinning and intricate Dorze scarf weaving',
      'Hands-on Kocho preparation from the Enset (false banana) root',
      'Breathtaking views overlooking both Lake Abaya and Lake Chamo from high altitude'
    ],
    included: ['4WD mountain transport from Tourist Hotel', 'English/Amharic speaking local Dorze guide', 'Traditional coffee & Kocho tasting', 'Village community development fee'],
    schedule: 'Departures at 09:00 AM and 01:30 PM'
  },
  {
    id: 'forty-springs-forest',
    title: 'Forty Springs Nature Walk & Groundwater Forest',
    tagline: 'Visit the legendary crystal springs that give Arba Minch its Amharic name',
    duration: '2.5 Hours',
    priceETB: 1500,
    priceUSD: 14,
    image: '/src/assets/images/hotel_restaurant_dining_1791052577683.jpg',
    description: 'Arba Minch translates directly as "Forty Springs" in Amharic. Walk beneath ancient ficus and mahogany trees in the lush groundwater forest at the base of the escarpment where dozens of pure, ice-cold freshwater springs bubble up directly through volcanic rocks.',
    highlights: [
      'Gushing natural spring waters pure enough to drink',
      'Lush canopy alive with Colobus monkeys and baboons',
      'Cool microclimate even during warm afternoon hours',
      'Historical insights into Arba Minch water heritage'
    ],
    included: ['Guide and forest entrance', 'Hotel transfer', 'Refreshments'],
    schedule: 'Flexible morning or afternoon walk'
  },
  {
    id: 'omo-valley-expedition',
    title: 'Omo Valley Cultural Gateway Expedition',
    tagline: 'Multi-day tribal exploration starting and concluding in comfort at Tourist Hotel',
    duration: '2 - 3 Days',
    priceETB: 18000,
    priceUSD: 160,
    image: '/src/assets/images/arbaminch_chamo_safari_1791052587992.jpg',
    description: 'Arba Minch is the recognized launchpad for journeys into the Lower Omo Valley UNESCO cultural landscape. Return each evening or after your multi-day safari to the comfort, hot showers, and fine dining of Tourist Hotel.',
    highlights: [
      'Visits to Konso cultural landscape stone terraces',
      'Hamar, Mursi, and Karo cultural exchanges with respectful local guides',
      'Customized 4x4 Land Cruiser logistics managed by our hotel travel desk'
    ],
    included: ['Professional 4x4 expedition vehicle & driver', 'Customized itinerary', 'Luggage storage at Tourist Hotel'],
    schedule: 'Arranged upon advance inquiry'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'food-chamo-fish',
    name: 'Fresh Lake Chamo Tilapia (Whole or Fillet)',
    amharicName: 'የጫሞ ሀይቅ ትኩስ አሳ',
    category: 'traditional',
    priceETB: 650,
    priceUSD: 6.0,
    description: 'Freshly caught wild tilapia from Lake Chamo, seasoned with Arba Minch garlic, ginger, and rosemary, pan-fried crisp and served with mitmita, lime wedges, and house salad.',
    isSpecialty: true
  },
  {
    id: 'food-doro-wat',
    name: 'Special Doro Wat (Ethiopian Chicken Stew)',
    amharicName: 'ልዩ የዶሮ ወጥ',
    category: 'traditional',
    priceETB: 850,
    priceUSD: 7.8,
    description: 'Slow-simmered tender chicken drumstick in fragrant berbere sauce infused with spiced butter (niter kibbeh), served with boiled egg and fresh teff injera.',
    isSpecialty: true
  },
  {
    id: 'food-special-tibs',
    name: 'Tourist Hotel Sizzling Beef / Lamb Tibs',
    amharicName: 'ልዩ የጥብስ ድግስ',
    category: 'traditional',
    priceETB: 720,
    priceUSD: 6.5,
    description: 'Tender cubed beef sautéed with red onions, garlic, fresh rosemary, and mild green chili peppers in clay skillet, served with injera or crusty bread.',
    isSpecialty: true
  },
  {
    id: 'food-kitfo',
    name: 'Special Gurage Style Kitfo',
    amharicName: 'ክክፍቶ በቆጮ እና አይብ',
    category: 'traditional',
    priceETB: 890,
    priceUSD: 8.0,
    description: 'Finely minced lean beef infused with aromatic niter kibbeh and mitmita chili, served with homemade cottage cheese (ayib), gomen, and warm Dorze kocho bread.'
  },
  {
    id: 'food-pasta',
    name: 'Penne / Spaghetti alla Bolognese or Arrabbiata',
    category: 'international',
    priceETB: 480,
    priceUSD: 4.4,
    description: 'Al dente Italian pasta with slow-cooked savory minced beef sauce or spicy tomato herb sauce, topped with grated cheese.'
  },
  {
    id: 'food-grilled-steak',
    name: 'Prime Grilled Beef Tenderloin Steak',
    category: 'international',
    priceETB: 880,
    priceUSD: 8.0,
    description: 'Char-grilled prime local beef tenderloin served with seasonal grilled vegetables, hand-cut french fries, and peppercorn gravy.'
  },
  {
    id: 'food-coffee-ceremony',
    name: 'Traditional Ethiopian Buna Coffee Ceremony',
    amharicName: 'ባህላዊ የኢትዮጵያ ቡና ማፍላት',
    category: 'beverages',
    priceETB: 250,
    priceUSD: 2.3,
    description: 'Complete ceremony with green coffee beans roasted live on charcoal, ground by hand, brewed in a traditional black clay jebena, and served with freshly popped popcorn and burning frankincense.',
    isSpecialty: true
  },
  {
    id: 'bev-ethiopian-beer',
    name: 'Chilled Local Craft Beers (St. George, Habesha, Walia)',
    category: 'beverages',
    priceETB: 180,
    priceUSD: 1.6,
    description: 'Ice-cold bottled Ethiopian premium lagers, perfect to enjoy at sunset on the terrace.'
  }
];

export const INITIAL_CONFERENCE_HALLS: ConferenceHall[] = [
  {
    id: 'hall-abaya',
    name: 'Abaya Grand Conference Hall',
    capacity: 180,
    image: '/src/assets/images/hotel_restaurant_dining_1791052577683.jpg',
    description: 'State-of-the-art air-conditioned hall with high-definition laser projector, surround sound, wireless microphones, and flexible seating (Theatre, U-Shape, or Classroom).',
    suitableFor: ['Corporate Conferences', 'Government Workshops', 'International NGO Summits', 'Wedding Banquets'],
    amenities: ['Laser HD Projector & Motorized Screen', 'Wireless PA System & Lapel Mics', 'High-Speed Wi-Fi', 'Dedicated Coffee Break Service', 'Backup Generator']
  },
  {
    id: 'hall-chamo',
    name: 'Chamo Executive Boardroom',
    capacity: 25,
    image: '/src/assets/images/hotel_hero_arbaminch_1791052555679.jpg',
    description: 'Intimate, sound-insulated executive meeting room equipped with ergonomic leather armchairs, conference display, video conferencing camera, and dedicated refreshment lounge.',
    suitableFor: ['Board Meetings', 'Strategic Retreats', 'VIP Delegations', 'Interviews'],
    amenities: ['65" Ultra HD Presentation Screen', 'High-speed Fiber Wi-Fi', 'Executive Coffee & Snack Bar', 'Private Restrooms']
  }
];

export const INITIAL_EVENTS: HotelEvent[] = [
  {
    id: 'evt-enkutatash-2026',
    title: 'Enkutatash Ethiopian New Year Grand Gala & Buna Festival',
    date: 'Sep 11, 2026',
    category: 'cultural',
    description: 'Our annual celebration of the Ethiopian New Year in Arba Minch! Guests and travelers enjoyed traditional Adey Abeba yellow flower arrangements, live acoustic Kirar music, a continuous roasting coffee ceremony on the lawn, and a grand feast featuring Lake Chamo fish and Doro Wat.',
    mediaType: 'image',
    mediaUrl: '/src/assets/images/hotel_restaurant_dining_1791052577683.jpg',
    thumbnailUrl: '/src/assets/images/hotel_restaurant_dining_1791052577683.jpg',
    location: 'Tourist Hotel Garden Lawn',
    featured: true
  },
  {
    id: 'evt-lake-chamo-clip',
    title: 'Lake Chamo Sunrise Boat Safari Video Highlights',
    date: 'Aug 24, 2026',
    category: 'safari',
    description: 'Short video clip captured by our resident guide during the early morning boat expedition across Lake Chamo. Watch the Nile crocodiles gliding gracefully along the sandbanks and hippopotamus pods surfacing near the Nechisar boundary.',
    mediaType: 'video',
    // Standard reliable royalty-free video asset for natural water & safari showcase
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/src/assets/images/arbaminch_chamo_safari_1791052587992.jpg',
    videoDuration: '0:15',
    location: 'Lake Chamo, Arba Minch',
    featured: true
  },
  {
    id: 'evt-taxpayer-silver',
    title: 'Tourist Hotel Recognized with Regional Silver Award for Hospitality Excellence',
    date: 'Jul 18, 2026',
    category: 'celebration',
    description: 'We were deeply honored to receive the regional recognition award in Southern Ethiopia for institutional transparency, hospitality employment standards, and contributing to sustainable tourism across the Gamo Zone.',
    mediaType: 'image',
    mediaUrl: '/src/assets/images/hotel_hero_arbaminch_1791052555679.jpg',
    thumbnailUrl: '/src/assets/images/hotel_hero_arbaminch_1791052555679.jpg',
    location: 'Abaya Grand Hall',
    featured: false
  },
  {
    id: 'evt-dorze-weaving-demo',
    title: 'Dorze Cultural Master Weavers Live Garden Exhibition',
    date: 'Jun 05, 2026',
    category: 'cultural',
    description: 'Master artisans from the Chencha Dorze community brought their traditional wooden handlooms to our garden terrace, demonstrating how fine Ethiopian cotton scarves (Netela) are woven by hand.',
    mediaType: 'image',
    mediaUrl: '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
    thumbnailUrl: '/src/assets/images/hotel_room_deluxe_1791052567783.jpg',
    location: 'Tourist Hotel Open-Air Terrace',
    featured: false
  }
];

export const INITIAL_ADDONS: BookingAddon[] = [
  {
    id: 'addon-airport-shuttle',
    name: 'Complimentary AMH Airport Shuttle',
    nameAmharic: 'ነፃ የአውሮፕላን ማረፊያ ትራንስፖርት',
    priceETB: 0,
    priceUSD: 0,
    description: 'Dedicated air-conditioned hotel minivan waiting for your Ethiopian Airlines flight at Arba Minch Airport.',
    category: 'transport'
  },
  {
    id: 'addon-extra-bed',
    name: 'Extra Rollaway Bed & Linens',
    nameAmharic: 'ተጨማሪ አልጋ',
    priceETB: 600,
    priceUSD: 5,
    description: 'Comfortable extra spring bed placed in room with fresh cotton linens and towels.',
    category: 'comfort'
  },
  {
    id: 'addon-buna-welcome',
    name: 'Traditional Buna Coffee Welcome Ceremony',
    nameAmharic: 'የእንኳን ደህና መጡ ባህላዊ ቡና',
    priceETB: 300,
    priceUSD: 2.5,
    description: 'Private clay jebena brewing with popcorn and frankincense prepared upon arrival.',
    category: 'meal'
  },
  {
    id: 'addon-late-checkout',
    name: 'Late Checkout Guarantee (up to 4:00 PM)',
    nameAmharic: 'ዘግይቶ መውጣት (እስከ 10:00 ሰዓት)',
    priceETB: 500,
    priceUSD: 4.5,
    description: 'Relax in your room until late afternoon before your evening domestic flight or journey.',
    category: 'comfort'
  },
  {
    id: 'addon-chamo-boat-fastpass',
    name: 'Lake Chamo Boat Safari Priority Booking',
    nameAmharic: 'የጫሞ ሀይቅ ጀልባ ቅድሚያ ማስያዣ',
    priceETB: 2400,
    priceUSD: 22,
    description: 'Reserved motorboat and licensed wildlife captain directly coordinated with hotel reception.',
    category: 'safari'
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    description: '10% Welcome Discount for Direct Website Reservations',
    isActive: true
  },
  {
    code: 'ARBA2026',
    discountPercent: 15,
    description: '15% Seasonal Rift Valley & Safari Promotion',
    isActive: true
  },
  {
    code: 'TELEBIRR5',
    discountPercent: 5,
    description: '5% Instant Saving when paying via Telebirr',
    isActive: true
  }
];

export const INITIAL_POLICIES: HotelPolicyItem[] = [
  {
    id: 'policy-checkin',
    title: 'Check-In & Check-Out Times',
    titleAmharic: 'የመግቢያ እና የመውጫ ሰዓታት',
    details: 'Check-in begins at 2:00 PM. Check-out is until 11:00 AM. Early check-in or late check-out is available upon request subject to room availability.',
    detailsAmharic: 'መግቢያ ከቀኑ 8:00 ሰዓት ጀምሮ ነው። መውጫ ደግሞ ጠዋት 5:00 ሰዓት ነው። እንደ ክፍት ክፍሎች ሁኔታ በቅድሚያ ጥያቄ ማቅረብ ይቻላል።'
  },
  {
    id: 'policy-cancellation',
    title: 'Cancellation & Refund Rules',
    titleAmharic: 'የመሰረዝ እና የተመላሽ ገንዘብ ህጎች',
    details: 'Free cancellation up to 48 hours prior to scheduled arrival date. Cancellations made within 48 hours are subject to a one-night room rate charge.',
    detailsAmharic: 'ከመድረስዎ 48 ሰዓታት በፊት ያለ ምንም ቅጣት መሰረዝ ይችላሉ። ከ48 ሰዓት በታች ሲሰረዝ የአንድ ሌሊት ክፍያ ይያዛል።'
  },
  {
    id: 'policy-payment',
    title: 'Payment & Guarantee Window',
    titleAmharic: 'የክፍያ እና የማረጋገጫ ጊዜ',
    details: 'Instant payments via Telebirr or CBE Birr are confirmed immediately. For "Pay at Hotel", guests must confirm reservation at hotel reception or via WhatsApp within 2 hours of online booking to guarantee room hold during high season.',
    detailsAmharic: 'በቴሌብር ወይም በሲቢኢ ብር የሚፈጸም ክፍያ ወዲያውኑ ይረጋገጣል። "በሆቴል እከፍላለሁ" ለሚመርጡ እንግዶች ክፍሉ የተጠበቀ እንዲሆን በ2 ሰዓት ውስጥ በስልክ ወይም በዋትስአፕ ማረጋገጥ ያስፈልጋል።'
  },
  {
    id: 'policy-children',
    title: 'Children & Extra Bed Policy',
    titleAmharic: 'የልጆች እና የተጨማሪ አልጋ መመሪያ',
    details: 'Children under 6 stay free of charge using existing beds. Children aged 6-12 are charged 50% for breakfast. Extra rollaway beds are available upon request.',
    detailsAmharic: 'ከ6 ዓመት በታች የሆኑ ህፃናት በነፃ ያርፋሉ። ከ6 እስከ 12 ዓመት ላሉ ህፃናት ለቁርስ 50% ብቻ ይከፈላል።'
  },
  {
    id: 'policy-smoking',
    title: 'Smoking & Quiet Hours',
    titleAmharic: 'የማጨስ እና የጸጥታ ሰዓት ህግ',
    details: 'All indoor guest rooms are strictly non-smoking. Designated smoking areas are provided in our open-air garden terraces. Quiet hours in guest corridors are 10:00 PM to 06:30 AM.',
    detailsAmharic: 'በሁሉም የሆቴል ክፍሎች ውስጥ ማጨስ በጥብቅ የተከለከለ ነው። በአትክልት ስፍራው ላይ የተፈቀደ ቦታ አለ። የጸጥታ ሰዓት ከምሽቱ 4:00 እስከ ጠዋቱ 12:30 ነው።'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-airport',
    question: 'How far is Tourist Hotel from Arba Minch Airport (AMH)?',
    questionAmharic: 'ሆቴሉ ከአርባ ምንጭ አውሮፕላን ማረፊያ ምን ያህል ይርቃል?',
    answer: 'The hotel is located just 10 minutes (approx. 6 km) drive from Arba Minch Airport. We provide free pick-up and drop-off in our hotel shuttle for all direct reservations.',
    answerAmharic: 'ሆቴሉ ከአውሮፕላን ማረፊያው 10 ደቂቃ ብቻ (6 ኪ.ሜ) ርቀት ላይ ይገኛል። ለሁሉም ቀጥታ ተመዝጋቢዎች ነፃ የትራንስፖርት አገልግሎት እንሰጣለን።',
    category: 'general'
  },
  {
    id: 'faq-power',
    question: 'Do you have reliable electricity, Wi-Fi, and hot water?',
    questionAmharic: 'አስተማማኝ መብራት፣ ኢንተርኔት እና ሙቅ ውሃ አለ?',
    answer: 'Yes! Tourist Hotel is equipped with high-capacity automatic standby diesel power generators, solar hot water heating systems, and high-speed Wi-Fi across all rooms and garden dining areas.',
    answerAmharic: 'አዎ! ሆቴላችን ከፍተኛ አቅም ያለው የጄኔሬተር ኃይል፣ የፀሐይ ኃይል ሙቅ ውሃ እና ፈጣን ዋይፋይ በሁሉም ክፍሎች እና አትክልት ስፍራዎች አሉት።',
    category: 'facilities'
  },
  {
    id: 'faq-boat',
    question: 'Can you arrange the Lake Chamo Boat Safari to see giant crocodiles and hippos?',
    questionAmharic: 'የጫሞ ሀይቅ የጀልባ ጉዞ ማመቻቸት ትችላላችሁ?',
    answer: 'Absolutely. Our front desk travel coordinator organizes morning and afternoon private and shared motorboat excursions with licensed national park guides. The boat pier is only 18 minutes from the hotel.',
    answerAmharic: 'በእርግጥ። የእንግዳ መቀበያችን የጉዞ አስተባባሪ በጠዋት እና ከሰዓት ፈቃድ ካላቸው የፓርኩ አስጎብኚዎች ጋር የጀልባ ጉዞዎችን ያመቻቻል።',
    category: 'tours'
  },
  {
    id: 'faq-payment',
    question: 'What payment methods are accepted at Tourist Hotel?',
    questionAmharic: 'ምን አይነት የክፍያ አማራጮችን ትቀበላላችሁ?',
    answer: 'We accept Telebirr, CBE Birr, Ethiopian Commercial Bank transfers, Visa / Mastercard, and cash in Ethiopian Birr or US Dollars for foreign guests.',
    answerAmharic: 'ቴሌብር፣ የኢትዮጵያ ንግድ ባንክ (CBE Birr)፣ ቪዛ ካርድ እና ጥሬ ገንዘብ (በኢትዮጵያ ብር ወይም ዶላር) እንቀበላለን።',
    category: 'booking'
  }
];

export const INITIAL_INQUIRIES: GuestInquiry[] = [
  {
    id: 'inq-1',
    guestName: 'Mulugeta Tesfaye',
    email: 'mulugeta.t@ngo-ethiopia.org',
    phone: '+251 91 222 3344',
    department: 'conferences',
    dates: 'Nov 14 - 17, 2026',
    guestsCount: 45,
    message: 'Requesting quotation for a 3-day regional health workshop including Abaya Hall rental, projector, two coffee breaks with snacks, and buffet lunch for 45 participants.',
    createdAt: '2026-10-04 09:30 AM',
    status: 'New'
  },
  {
    id: 'inq-2',
    guestName: 'Sarah Jenkins',
    email: 'sarah.j@traveluk.com',
    phone: '+44 7700 900123',
    department: 'reservations',
    dates: 'Dec 02 - 06, 2026',
    guestsCount: 4,
    message: 'Inquiring about 2 Deluxe Lake View rooms and coordinating a combined Lake Chamo boat safari and Dorze village excursion.',
    createdAt: '2026-10-06 02:15 PM',
    status: 'Responded'
  }
];

export const INITIAL_FEEDBACKS: PostStayFeedback[] = [
  {
    id: 'fb-1',
    bookingRef: 'TH-AM-7489',
    guestName: 'Elias Bekele',
    guestEmail: 'elias.b@gmail.com',
    guestCountry: 'Addis Ababa, Ethiopia',
    roomName: 'Deluxe King Lake View',
    stayMonthYear: 'October 2026',
    ratingOverall: 5,
    ratings: {
      cleanliness: 5,
      hospitality: 5,
      diningFood: 5,
      lakeTourSafari: 5,
      wifiComfort: 4,
      valueForMoney: 5
    },
    title: 'Breathtaking Great Rift Valley views & warm Ethiopian hospitality',
    comments: 'Our 3-night stay at Tourist Hotel Arba Minch exceeded all expectations! The view of Lake Chamo and Abaya from the balcony at sunrise is magical. The room was pristine, bed very comfortable, and the free airport shuttle picked us up seamlessly from AMH. The restaurant prepared the best fried Lake Chamo tilapia with fresh rosemary we have ever tasted. We will definitely return!',
    favoriteHighlight: 'Lake Chamo Crocodile Market Boat Trip & Garden Buna Ceremony',
    staffCompliment: 'Dawit at reception was remarkably kind and guide Abebe made our crocodile boat tour unforgettable.',
    wouldRecommend: true,
    travelType: 'couple',
    verifiedStay: true,
    status: 'Published',
    managementResponse: {
      responderName: 'General Manager · Tourist Hotel Arba Minch',
      responseText: 'Dear Elias, thank you so much for your kind words! We are delighted that you enjoyed the panoramic lake sunrise, our chef’s tilapia, and Dawit’s warm welcome. We look forward to hosting you again on your next Rift Valley getaway!',
      responseDate: '2026-10-06'
    },
    createdAt: '2026-10-05'
  },
  {
    id: 'fb-2',
    bookingRef: 'TH-AM-6812',
    guestName: 'Dr. Hannah Meyer',
    guestEmail: 'hannah.meyer@wildlife-berlin.de',
    guestCountry: 'Berlin, Germany',
    roomName: 'Executive Garden Suite',
    stayMonthYear: 'September 2026',
    ratingOverall: 5,
    ratings: {
      cleanliness: 5,
      hospitality: 5,
      diningFood: 4,
      lakeTourSafari: 5,
      wifiComfort: 4,
      valueForMoney: 5
    },
    title: 'Peaceful garden sanctuary & ideal base for Nechisar wildlife',
    comments: 'As an ecologist visiting the Rift Valley, Tourist Hotel proved to be the best base in Arba Minch. Reliable standby electricity and hot water after dusty safari days. The front desk efficiently arranged our morning Nechisar plains excursion and the Dorze village weaving tour. The evening traditional coffee ceremony in the garden was authentic and relaxing.',
    favoriteHighlight: 'Nechisar National Park Plains Gazelle Excursion',
    staffCompliment: 'The travel coordinator and tour drivers were punctual and knowledgeable about wildlife.',
    wouldRecommend: true,
    travelType: 'solo',
    verifiedStay: true,
    status: 'Published',
    managementResponse: {
      responderName: 'Operations Director · Tourist Hotel Arba Minch',
      responseText: 'Thank you Dr. Meyer for choosing Tourist Hotel during your ecological research expedition. We are proud to support environmental travelers exploring Nechisar and Dorze traditions.',
      responseDate: '2026-09-28'
    },
    createdAt: '2026-09-27'
  },
  {
    id: 'fb-3',
    bookingRef: 'TH-AM-5530',
    guestName: 'Kidist & Samuel Tadesse',
    guestEmail: 'kidist.tadesse@yahoo.com',
    guestCountry: 'Hawassa, Ethiopia',
    roomName: 'Family Villa Suite',
    stayMonthYear: 'August 2026',
    ratingOverall: 5,
    ratings: {
      cleanliness: 5,
      hospitality: 5,
      diningFood: 5,
      lakeTourSafari: 4,
      wifiComfort: 5,
      valueForMoney: 5
    },
    title: 'Wonderful family vacation with kids · Safe, green and serene',
    comments: 'Traveling with two young kids can be demanding, but Tourist Hotel staff made everything effortless. The family suite is spacious with connected beds and immaculate bathrooms. The kids loved playing in the enclosed garden lawns while we enjoyed freshly brewed buna coffee. Breakfast buffet had great variety including fresh tropical fruit and local honey.',
    favoriteHighlight: 'Enclosed safe garden terraces & Forty Springs day trip',
    staffCompliment: 'Housekeeping team kept our suite spotless daily with fresh linens.',
    wouldRecommend: true,
    travelType: 'family',
    verifiedStay: true,
    status: 'Published',
    createdAt: '2026-08-19'
  },
  {
    id: 'fb-4',
    bookingRef: 'TH-AM-4419',
    guestName: 'Marcus Thorne',
    guestEmail: 'marcus.t@safariexplore.uk',
    guestCountry: 'London, United Kingdom',
    roomName: 'Standard Double Room',
    stayMonthYear: 'July 2026',
    ratingOverall: 4,
    ratings: {
      cleanliness: 4,
      hospitality: 5,
      diningFood: 4,
      lakeTourSafari: 5,
      wifiComfort: 4,
      valueForMoney: 5
    },
    title: 'Superb value, fast boat booking and authentic atmosphere',
    comments: 'Great honest hotel with character. Excellent value for money compared to overpriced resorts nearby. The priority boat pass for Lake Chamo was well worth it—we were on the lake at 7:30 AM before the heat and had close views of huge Nile crocodiles and pods of hippos. Wi-Fi worked decently in the lobby and terrace.',
    favoriteHighlight: 'Early morning Lake Chamo boat safari',
    staffCompliment: 'Captain Tariku on the boat and reception team.',
    wouldRecommend: true,
    travelType: 'safari_group',
    verifiedStay: true,
    status: 'Published',
    createdAt: '2026-07-22'
  }
];

