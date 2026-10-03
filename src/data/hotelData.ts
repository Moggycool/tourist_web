import { HotelInfo, Room, TourPackage, MenuItem, ConferenceHall } from '../types';

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
