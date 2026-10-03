import { Destination, TourExperience, TravelGuide } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'kyoto-japan',
    title: 'Kyoto',
    tagline: 'Timeless temples, zen bamboo groves & imperial majesty',
    country: 'Japan',
    continent: 'Asia',
    category: 'heritage',
    rating: 4.9,
    reviewsCount: 3820,
    priceLevel: '$$$',
    approxDailyCostUsd: 145,
    duration: '4 - 6 days',
    bestSeason: 'Mar - May & Oct - Nov',
    averageTemp: '18°C / 64°F',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kyoto is the cultural heartbeat of Japan, boasting thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden machiya houses. Experience the whisper of wind through the Sagano Bamboo Forest and witness the thousand vermilion torii gates of Fushimi Inari Shrine.',
    highlights: [
      { title: 'Fushimi Inari-Taisha', desc: 'Hike through winding paths lined with over 10,000 vibrant vermilion torii gates on Mount Inari.' },
      { title: 'Arashiyama Bamboo Grove', desc: 'Stroll beneath towering emerald bamboo stalks that creak gently with the breeze.' },
      { title: 'Kinkaku-ji (Golden Pavilion)', desc: 'Marvel at the top two floors completely covered in brilliant gold leaf overlooking the mirror pond.' },
      { title: 'Gion Geisha District', desc: 'Walk cobblestone alleys illuminated by paper lanterns in the evening to glimpse traditional tea houses.' }
    ],
    localFood: [
      { name: 'Kaiseki Ryori', desc: 'Multi-course culinary art form balancing taste, texture, and seasonal aesthetics.' },
      { name: 'Uji Matcha Treats', desc: 'Artisanal stone-ground green tea soft serve, parfaits, and freshly whisked ceremonial tea.' },
      { name: 'Yudofu (Simmered Tofu)', desc: 'Silken tofu gently simmered in kombu dashi broth served with dipping sauce and scallions.' }
    ],
    travelTips: [
      'Arrive at Fushimi Inari and Arashiyama by 7:00 AM to beat peak tour groups.',
      'Purchase an ICOCA card for seamless rides on Kyoto city buses and subway lines.',
      'Rent a bicycle to explore the peaceful eastern temple path (Philosopher’s Walk).'
    ],
    coordinates: { x: 82, y: 39 },
    featured: true,
    tags: ['Culture', 'Temples', 'Gardens', 'Cherry Blossoms', 'Tea Ceremony']
  },
  {
    id: 'amalfi-coast-italy',
    title: 'Amalfi Coast',
    tagline: 'Dramatic cliffside villages overlooking the sapphire Tyrrhenian Sea',
    country: 'Italy',
    continent: 'Europe',
    category: 'beach',
    rating: 4.8,
    reviewsCount: 2940,
    priceLevel: '$$$$',
    approxDailyCostUsd: 220,
    duration: '4 - 7 days',
    bestSeason: 'May - Sep',
    averageTemp: '25°C / 77°F',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A breathtaking stretch of mountainous coastline south of Naples, celebrated for its pastel villages clinging to steep cliffs, fragrant lemon groves, and sparkling azure waters. Positano, Amalfi, and Ravello offer unparalleled Mediterranean romance and cliffside dining.',
    highlights: [
      { title: 'Path of the Gods (Sentiero degli Dei)', desc: 'Spectacular coastal ridge hiking trail 600m above the ocean with panoramic views.' },
      { title: 'Villa Cimbrone Gardens in Ravello', desc: 'Perched high in the clouds featuring the Terrace of Infinity lined with classical marble busts.' },
      { title: 'Positano Beach & Cliffside Village', desc: 'Iconic pebble beaches with sun loungers surrounded by cascading pastel houses.' },
      { title: 'Emerald Grotto (Grotta dello Smeraldo)', desc: 'Sea cave lit from beneath by natural subterranean turquoise light.' }
    ],
    localFood: [
      { name: 'Scialatielli ai Frutti di Mare', desc: 'Fresh ribbon pasta tossed with clams, mussels, prawns, and cherry tomatoes.' },
      { name: 'Limoncello di Sorrento', desc: 'Sweet, chilled digestif crafted from giant sun-drenched Amalfi lemons.' },
      { name: 'Delizia al Limone', desc: 'Dome-shaped sponge cake filled and coated with delicate lemon cream.' }
    ],
    travelTips: [
      'Take local ferries between coastal towns instead of buses to avoid winding cliff roads and traffic.',
      'Book beach club sunbeds in Positano at least several days in advance during July and August.',
      'Pack sturdy walking shoes as most towns have hundreds of vertical stone stairways.'
    ],
    coordinates: { x: 52, y: 36 },
    featured: true,
    tags: ['Coastal', 'Luxury', 'Romance', 'Hiking', 'Seafood']
  },
  {
    id: 'banff-canada',
    title: 'Banff National Park',
    tagline: 'Glacial turquoise lakes surrounded by the majestic Canadian Rockies',
    country: 'Canada',
    continent: 'Americas',
    category: 'nature',
    rating: 4.9,
    reviewsCount: 4120,
    priceLevel: '$$$',
    approxDailyCostUsd: 160,
    duration: '5 - 8 days',
    bestSeason: 'Jun - Sep & Dec - Mar',
    averageTemp: '19°C / 66°F (Summer)',
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536697246787-1f7ae568d88a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Canada’s oldest national park encompasses 6,641 square kilometers of pristine mountainous terrain, glacier-fed jewel-toned waters, dense pine forests, and alpine meadows. Home to the legendary Lake Louise, Moraine Lake, and the Icefields Parkway.',
    highlights: [
      { title: 'Moraine Lake & Valley of the Ten Peaks', desc: 'Vivid turquoise water fed by glaciers, framed by ten jagged snow-capped peaks.' },
      { title: 'Lake Louise & Plain of Six Glaciers', desc: 'Iconic canoe paddles across mirror-like water followed by a hike to the historic tea house.' },
      { title: 'Banff Gondola to Sulphur Mountain', desc: 'Sweep above the Bow Valley for 360-degree vistas of six Rocky Mountain ranges.' },
      { title: 'Peyto Lake Viewpoint', desc: 'A stunning wolf-shaped glacial lake view from Bow Summit on the Icefields Parkway.' }
    ],
    localFood: [
      { name: 'Alberta AAA Bison Steak', desc: 'Tender, lean heritage cut char-grilled with juniper berry glaze.' },
      { name: 'Warm Beavertails Pastry', desc: 'Fried whole-wheat pastry dough served hot with cinnamon sugar, Nutella, or lemon.' },
      { name: 'Rocky Mountain Craft Beer', desc: 'Locally brewed ales made with crisp, pure glacier runoff water.' }
    ],
    travelTips: [
      'Moraine Lake road is restricted to public transit and licensed shuttles; reserve shuttles months ahead.',
      'Always carry bear spray and know how to use it when hiking any trail.',
      'Purchase the Parks Canada Discovery Pass if staying more than 3 days.'
    ],
    coordinates: { x: 22, y: 28 },
    featured: true,
    tags: ['National Parks', 'Mountains', 'Glacial Lakes', 'Hiking', 'Wildlife']
  },
  {
    id: 'cape-town-south-africa',
    title: 'Cape Town',
    tagline: 'Where dramatic ocean waters meet the iconic flat-topped Table Mountain',
    country: 'South Africa',
    continent: 'Africa',
    category: 'adventure',
    rating: 4.8,
    reviewsCount: 2610,
    priceLevel: '$$',
    approxDailyCostUsd: 95,
    duration: '5 - 7 days',
    bestSeason: 'Nov - Apr',
    averageTemp: '24°C / 75°F',
    heroImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A cosmopolitan harbor city crowned by the majestic Table Mountain, fringed with golden beaches, vineyards, and rugged sea cliffs. Experience penguin colonies at Boulders Beach, vibrant Bo-Kaap cobblestones, world-class Cape Winelands, and thrilling coastal drives.',
    highlights: [
      { title: 'Table Mountain Aerial Cableway', desc: 'Rotating cable car ascent up 1,000 meters offering sweeping vistas of the Atlantic ocean.' },
      { title: 'Boulders Beach Penguin Sanctuary', desc: 'Sheltered inlet where wild African penguins waddle across white sands and granitic boulders.' },
      { title: 'Chapman’s Peak Drive', desc: 'One of the world’s most spectacular marine drives carved into near-vertical mountainsides.' },
      { title: 'Cape of Good Hope', desc: 'The dramatic southwestern tip of the African continent with soaring lighthouse views.' }
    ],
    localFood: [
      { name: 'Cape Malay Bobotie', desc: 'Spiced minced meat baked with an egg-based custard topping, served with yellow rice.' },
      { name: 'Braai Grill', desc: 'Traditional South African wood-fired barbecue featuring boerewors and Karoo lamb.' },
      { name: 'Stellenbosch Pinotage', desc: 'Signature South African red wine known for rich dark fruit and smoky undertones.' }
    ],
    travelTips: [
      'Take the Table Mountain cable car early in the morning before the "tablecloth" cloud rolls in.',
      'Rent a car to explore the Cape Peninsula and the Winelands of Franschhoek and Stellenbosch.',
      'Check the wind forecast before visiting Clifton and Camps Bay beaches.'
    ],
    coordinates: { x: 55, y: 76 },
    featured: true,
    tags: ['Wildlife', 'Beaches', 'Wine Tasting', 'Road Trips', 'Adventure']
  },
  {
    id: 'santorini-greece',
    title: 'Santorini',
    tagline: 'Whitewashed cliffside villas and world-famous caldera sunsets',
    country: 'Greece',
    continent: 'Europe',
    category: 'beach',
    rating: 4.8,
    reviewsCount: 3410,
    priceLevel: '$$$$',
    approxDailyCostUsd: 210,
    duration: '3 - 5 days',
    bestSeason: 'Apr - Jun & Sep - Oct',
    averageTemp: '26°C / 79°F',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Santorini was shaped by one of the largest volcanic eruptions in human history, leaving behind a colossal water-filled caldera encircled by sheer 300-meter cliffs. Whitewashed cubic houses with cobalt blue domes perch dramatically over the Aegean Sea.',
    highlights: [
      { title: 'Oia Sunset Point', desc: 'Watch golden twilight cast a warm glow across whitewashed windmills and volcanic cliffs.' },
      { title: 'Fira to Oia Caldera Hike', desc: 'A 10km scenic cliff-top walk connecting quaint villages with non-stop sea panoramas.' },
      { title: 'Red Beach & Akrotiri Ruins', desc: 'Dramatic crimson volcanic sand beach alongside ancient Bronze Age Minoan settlements.' },
      { title: 'Catamaran Caldera Cruise', desc: 'Sail inside the volcanic bay, soak in geothermal hot springs, and snorkel vibrant reefs.' }
    ],
    localFood: [
      { name: 'Tomatokeftedes', desc: 'Crispy fried Santorini tomato fritters blended with mint, onions, and oregano.' },
      { name: 'Fresh Grilled Octopus', desc: 'Sun-dried and char-grilled with olive oil, oregano, and fresh lemon wedges.' },
      { name: 'Assyrtiko Volcanic Wine', desc: 'Crisp, mineral-rich white wine harvested from ancient volcanic basket vines.' }
    ],
    travelTips: [
      'For sunset in Oia, secure your spot at the Venetian castle ruins at least 90 minutes before dusk.',
      'Wear flat rubber-soled shoes; marble stones in the pedestrian paths are very slippery.',
      'Consider visiting in May or late September to enjoy warm weather with fewer cruise ship crowds.'
    ],
    coordinates: { x: 56, y: 39 },
    featured: false,
    tags: ['Caldera', 'Sunset', 'Cyclades', 'Beaches', 'Romantic']
  },
  {
    id: 'machu-picchu-peru',
    title: 'Cusco & Machu Picchu',
    tagline: 'The mystical Incan Citadel hidden high within the cloud forest peaks',
    country: 'Peru',
    continent: 'Americas',
    category: 'heritage',
    rating: 4.9,
    reviewsCount: 3950,
    priceLevel: '$$',
    approxDailyCostUsd: 110,
    duration: '5 - 7 days',
    bestSeason: 'May - Oct',
    averageTemp: '20°C / 68°F',
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perched 2,430 meters above sea level on an Andean ridge, Machu Picchu stands as the peak achievement of Inca civilization. Marvel at precision-cut granite blocks assembled without mortar, surrounded by plunging river gorges and mystical cloud forest peaks.',
    highlights: [
      { title: 'The Lost Citadel of Machu Picchu', desc: 'Explore the Sun Temple, Room of Three Windows, and Intihuatana sundial stone.' },
      { title: 'Huayna Picchu Peak Climb', desc: 'Exhilarating vertical climb up the iconic mountain backdrop for aerial views.' },
      { title: 'Sacred Valley of the Incas', desc: 'Visit Ollantaytambo fortress, Pisac market, and the concentric agricultural terraces of Moray.' },
      { title: 'Maras Salt Mines', desc: 'Thousands of terraced evaporation pools harvested by local families since pre-Inca times.' }
    ],
    localFood: [
      { name: 'Ceviche Clásico', desc: 'Fresh local trout or sea bass cured in tangy lime juice with rocoto pepper, choclo corn, and sweet potato.' },
      { name: 'Lomo Saltado', desc: 'Flambéed strips of tender beef sirloin stir-fried with red onions, tomatoes, and french fries.' },
      { name: 'Mate de Coca', desc: 'Traditional herbal tea brewed from whole coca leaves to soothe altitude adjustments.' }
    ],
    travelTips: [
      'Spend at least 2 full days in Cusco or the Sacred Valley to acclimatize to the 3,400m altitude.',
      'Machu Picchu entry tickets and train passes sell out months in advance; book early.',
      'Hire a licensed local Quechua guide at the gate to truly appreciate the engineering genius.'
    ],
    coordinates: { x: 30, y: 62 },
    featured: true,
    tags: ['Inca Heritage', 'High Altitude', 'Trekking', 'Cloud Forest', 'Archaeology']
  },
  {
    id: 'swiss-alps-switzerland',
    title: 'Interlaken & Swiss Alps',
    tagline: 'Snow-crowned peaks, green valleys & crystal alpine lakes',
    country: 'Switzerland',
    continent: 'Europe',
    category: 'adventure',
    rating: 4.9,
    reviewsCount: 3100,
    priceLevel: '$$$$',
    approxDailyCostUsd: 260,
    duration: '4 - 7 days',
    bestSeason: 'Jun - Sep & Dec - Mar',
    averageTemp: '21°C / 70°F (Summer)',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Nestled between Lake Thun and Lake Brienz and overshadowed by the towering Eiger, Mönch, and Jungfrau peaks, the Bernese Oberland is the ultimate alpine adventure hub. Travel by cogwheel train to the top of Europe and hike past 72 cascading waterfalls in Lauterbrunnen.',
    highlights: [
      { title: 'Jungfraujoch - Top of Europe', desc: 'Highest railway station in Europe at 3,454m featuring the Sphinx observatory and Ice Palace.' },
      { title: 'Lauterbrunnen Valley of Waterfalls', desc: 'Fairytale glacial trough valley with sheer limestone cliffs and Staubbach Falls.' },
      { title: 'Tandem Paragliding over Interlaken', desc: 'Soar like an eagle between two alpine lakes with the snow peaks as your backdrop.' },
      { title: 'Lake Brienz Turquoise Cruise', desc: 'Steamboat ride across incandescent turquoise glacial waters stopping at Giessbach Falls.' }
    ],
    localFood: [
      { name: 'Traditional Swiss Cheese Fondue', desc: 'Melted Gruyère and Emmental with white wine and kirsch, served with crusty bread cubes.' },
      { name: 'Crispy Rösti', desc: 'Pan-fried grated potato pancake topped with fried egg, melted raclette, and bacon.' },
      { name: 'Swiss Artisan Chocolate', desc: 'Silky smooth alpine milk truffles and freshly poured hazelnut slabs.' }
    ],
    travelTips: [
      'Invest in a Swiss Travel Pass or Bernese Oberland Pass for unlimited trains, boats, and discounts on cable cars.',
      'Check mountain webcams each morning before purchasing summit tickets to avoid foggy views.',
      'Fill your reusable water bottle at any public town fountain — the water is glacial and pure.'
    ],
    coordinates: { x: 49, y: 34 },
    featured: false,
    tags: ['Mountains', 'Paragliding', 'Waterfalls', 'Scenic Trains', 'Alpine']
  },
  {
    id: 'marrakesh-morocco',
    title: 'Marrakesh',
    tagline: 'Labyrinthine souks, palatial riads & vibrant spice-scented plazas',
    country: 'Morocco',
    continent: 'Africa',
    category: 'culinary',
    rating: 4.7,
    reviewsCount: 2890,
    priceLevel: '$$',
    approxDailyCostUsd: 85,
    duration: '3 - 5 days',
    bestSeason: 'Oct - Apr',
    averageTemp: '23°C / 73°F',
    heroImage: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An enchanting sensory experience of color, sound, and aromas. Walk through medieval medina alleyways crowded with artisan carpet weavers, copper lamps, and pyramids of fragrant spices. At night, Jemaa el-Fnaa square transforms into a bustling open-air banquet.',
    highlights: [
      { title: 'Jemaa el-Fnaa Square', desc: 'Alive with musicians, henna artists, storytellers, and steaming tagine food stalls.' },
      { title: 'Jardin Majorelle & YSL Museum', desc: 'Botanical sanctuary with electric cobalt blue architecture designed by Jacques Majorelle.' },
      { title: 'Bahia Palace & Saadian Tombs', desc: 'Masterpiece of Moroccan Islamic architecture with intricate zellij tilework and carved cedarwood.' },
      { title: 'The Old Medina Souks', desc: 'Vibrant maze of bazaars selling leather babouche slippers, ceramics, and argan oil.' }
    ],
    localFood: [
      { name: 'Slow-Cooked Lamb Tagine', desc: 'Braised in earthenware cone with prunes, toasted almonds, saffron, and cinnamon.' },
      { name: 'Pigeon or Chicken Pastilla', desc: 'Flaky filo pastry layered with spiced tender poultry, roasted almonds, and dusted with powdered sugar.' },
      { name: 'Maghrebi Mint Tea', desc: 'Green gunpowder tea brewed with fresh spearmint leaves and poured high to create froth.' }
    ],
    travelTips: [
      'Stay in an authentic riad inside the medina for a peaceful oasis experience away from the streets.',
      'Polite bargaining is customary and expected in souks; start at about half the original quote.',
      'Download an offline map like Maps.me as GPS can lose signal inside the covered medina alleys.'
    ],
    coordinates: { x: 44, y: 41 },
    featured: false,
    tags: ['Medina', 'Riads', 'Spices', 'Palaces', 'Culture']
  }
];

export const TOUR_EXPERIENCES: TourExperience[] = [
  {
    id: 'exp-kyoto-tea',
    destinationId: 'kyoto-japan',
    destinationTitle: 'Kyoto',
    country: 'Japan',
    title: 'Traditional Zen Tea Ceremony & Bamboo Forest Walk',
    category: 'Cultural Heritage',
    duration: '4.5 Hours',
    priceUsd: 85,
    rating: 4.95,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80',
    groupSize: 'Max 8 guests',
    included: ['Certified Tea Master ceremony', 'Kimono dressing experience', 'Matcha & wagashi sweets', 'Guided bamboo path tour'],
    highlights: ['Learn step-by-step etiquette in a 300-year-old tea house', 'Wander quiet secluded bamboo paths away from crowds']
  },
  {
    id: 'exp-amalfi-boat',
    destinationId: 'amalfi-coast-italy',
    destinationTitle: 'Amalfi Coast',
    country: 'Italy',
    title: 'Capri & Faraglioni Rocks Private Sunset Catamaran',
    category: 'Cruises & Water',
    duration: '6 Hours',
    priceUsd: 165,
    rating: 4.98,
    reviewsCount: 388,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    groupSize: 'Max 10 guests',
    included: ['Prosecco & limoncello open bar', 'Caprese salad & snacks', 'Snorkel gear', 'Coastline swimming stops'],
    highlights: ['Cruise through the iconic Faraglioni sea arch', 'Swim in glowing blue and emerald hidden grottoes']
  },
  {
    id: 'exp-banff-canoe',
    destinationId: 'banff-canada',
    destinationTitle: 'Banff National Park',
    country: 'Canada',
    title: 'Sunrise Canoe Safari & Moraine Lake Photography Tour',
    category: 'Outdoor Adventure',
    duration: '5 Hours',
    priceUsd: 110,
    rating: 4.92,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=600&q=80',
    groupSize: 'Max 12 guests',
    included: ['Exclusive morning shuttle pass', 'Handcrafted cedar canoe rental', 'Professional photo guidance', 'Hot cocoa & maple pastries'],
    highlights: ['Witness glowing pink sunrise reflections on the Ten Peaks', 'Guaranteed shuttle access without pre-booking chaos']
  },
  {
    id: 'exp-peru-sacred-valley',
    destinationId: 'machu-picchu-peru',
    destinationTitle: 'Cusco & Machu Picchu',
    country: 'Peru',
    title: 'Sacred Valley Incan Weaving & Gastronomy Trek',
    category: 'Culture & Food',
    duration: '7 Hours',
    priceUsd: 95,
    rating: 4.91,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=600&q=80',
    groupSize: 'Max 10 guests',
    included: ['Indigenous Quechua weaver workshop', 'Pachamanca earth-oven lunch', 'Private transportation', 'Archaeological site entrance'],
    highlights: ['Dye raw alpaca wool using native Andean plants', 'Feast on slow-cooked roasted meats and potatoes from volcanic stone pits']
  },
  {
    id: 'exp-swiss-paragliding',
    destinationId: 'swiss-alps-switzerland',
    destinationTitle: 'Interlaken & Swiss Alps',
    country: 'Switzerland',
    title: 'Tandem Paragliding Over Interlaken & Lake Thun',
    category: 'Extreme Thrills',
    duration: '2 Hours',
    priceUsd: 190,
    rating: 4.99,
    reviewsCount: 670,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    groupSize: 'Individual tandem with pilot',
    included: ['SHV-certified pilot', 'Safety gear & flight suit', 'Transport to Beatenberg takeoff', 'Optional 4K GoPro photo package'],
    highlights: ['Fly over deep valleys with views of Eiger, Mönch, and Jungfrau', 'Smooth landing in the heart of downtown Interlaken park']
  },
  {
    id: 'exp-marrakesh-cooking',
    destinationId: 'marrakesh-morocco',
    destinationTitle: 'Marrakesh',
    country: 'Morocco',
    title: 'Medina Spice Souk Tour & Masterclass Tagine Cooking',
    category: 'Culinary Masterclass',
    duration: '4 Hours',
    priceUsd: 65,
    rating: 4.88,
    reviewsCount: 315,
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=600&q=80',
    groupSize: 'Max 8 guests',
    included: ['Spice market shopping tasting tour', 'Hands-on clay tagine cooking', 'Riad terrace dining', 'Recipe keepsake booklet'],
    highlights: ['Unravel the secrets of ras el hanout spice blends', 'Dine on your creations under shaded orange trees in a riad courtyard']
  }
];

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: 'guide-smart-packing',
    title: 'The Art of Minimalist Packing: Travel Anywhere with Carry-On Only',
    category: 'Travel Tips',
    readTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Senior Travel Writer'
    },
    publishedDate: 'Sep 28, 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Skip the luggage carousel, eliminate baggage fees, and glide through cobbled streets effortlessly by adopting the capsule wardrobe system.',
    paragraphs: [
      'The single most liberating decision a frequent traveler can make is leaving the checked luggage behind. When your entire journey fits into a 40-liter backpack or lightweight carry-on spinner, your flexibility skyrockets.',
      'Begin by building your attire around a unified three-color palette (e.g., navy, cream, and charcoal). Every top should seamlessly pair with every bottom. Merino wool garments are legendary for odor resistance, temperature regulation, and rapid overnight drying in hotel sinks.',
      'Employ compression packing cubes not just for saving volume, but for categorizing clean vs. worn clothes. Carry a solid shampoo bar and multipurpose moisturizer to satisfy liquid security limits without headache.'
    ],
    tips: [
      'Wear your heaviest layers (boots, jacket, sweater) on the flight.',
      'Limit footwear to two pairs: one stylish walking shoe and one versatile sneaker.',
      'Always stash an ultralight waterproof rain shell in your personal item.'
    ]
  },
  {
    id: 'guide-responsible-tourism',
    title: 'Sustainable Tourism in 2026: Leaving Destinations Better Than You Found Them',
    category: 'Eco & Ethics',
    readTime: '8 min read',
    author: {
      name: 'Marcus Thorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Conservation Geographer'
    },
    publishedDate: 'Aug 14, 2026',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How mindful travelers can combat overtourism, support indigenous economies, and protect delicate ecosystems while exploring the planet.',
    paragraphs: [
      'Tourism has the power to fund vital conservation projects and uplift vulnerable communities, but unchecked footfall can degrade fragile biomes and price out long-time locals.',
      'True conscious travel starts with timing: visiting high-demand destinations during the shoulder seasons (spring or autumn) distributes economic benefit across the year while reducing resource strain on local infrastructure.',
      'Choose family-operated guesthouses, dine at neighborhood eateries where ingredients are procured from nearby farms, and hire licensed resident guides whose storytelling reflects lived heritage rather than rehearsed scripts.'
    ],
    tips: [
      'Carry a filtration water bottle to eliminate hundreds of single-use plastic bottles.',
      'Stick strictly to marked trail pathways to avoid soil erosion and alpine plant destruction.',
      'Respect sacred sites and local photography boundaries with genuine humility.'
    ]
  },
  {
    id: 'guide-culinary-exploration',
    title: 'How to Eat Like a Local: Navigating Street Food Markets with Confidence',
    category: 'Food & Culture',
    readTime: '5 min read',
    author: {
      name: 'Aiko Tanaka',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      role: 'Culinary Anthropologist'
    },
    publishedDate: 'Jul 22, 2026',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Street stalls often serve the most authentic recipes on earth. Here is the golden formula for finding hygienic, mouthwatering delicacies anywhere.',
    paragraphs: [
      'Food is an edible passport into a culture’s soul. From sizzling night stalls in Southeast Asia to bustling taco stands in Oaxaca, some of the world’s finest gastronomic memories happen on plastic stools rather than white-tablecloth restaurants.',
      'The single best heuristic for safety and flavor is queue length: stalls with long lines of local families guarantee high turnover, meaning ingredients are cooked piping hot to order and never sit out at ambient room temperatures.',
      'Look for vendors specializing in a single dish. A cook who has spent forty years perfecting one broth or one pastry has honed the technique to sheer perfection.'
    ],
    tips: [
      'Always eat at peak local meal hours when pans are hottest and turnover is rapid.',
      'Peel it, boil it, cook it, or forget it remains a handy rule of thumb in rural regions.',
      'Carry local currency in small bills and coins for hassle-free payment.'
    ]
  }
];
