import { Product, Order, Customer, Notification, DashboardStats, SystemSettings, OrderStatus } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "PROD-001",
    name: "Aura Silk Trench Coat",
    description: "Next-generation double-breasted trench coat tailored in luxurious premium mulberry silk. Featuring storm flaps, a belt with champagne-gold hardware, and protective water-resistant weave.",
    price: 185000,
    originalPrice: 220000,
    stock: 12,
    category: "Apparel",
    salesCount: 68,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Champagne Gold", "Warm White", "Charcoal Black"],
    fabric: "100% Premium Mulberry Silk",
    collection: "Summer Collection",
    sku: "AURA-SLK-TRN-01",
    isLimitedEdition: true,
    isBestSeller: true,
    sizeStock: { "S": 3, "M": 4, "L": 3, "XL": 2 },
    colorStock: { "Champagne Gold": 5, "Warm White": 4, "Charcoal Black": 3 },
    brand: "Aura Lux",
    season: "Summer",
    productCost: 80000,
    deliveryCost: 200,
    discount: 5000,
    marketingCost: 6000
  },
  {
    id: "PROD-002",
    name: "Monaco Calfskin Handbag",
    description: "Elegant bespoke leather handbag sculpted from premium full-grain Italian calfskin. Hand-stitched detailing, suede-lined interior compartments, and magnetic brass clasps.",
    price: 245000,
    originalPrice: 245000,
    stock: 8,
    category: "Leather Goods",
    salesCount: 142,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400",
    sizes: ["One Size"],
    colors: ["Soft Beige", "Chestnut", "Midnight Noir"],
    fabric: "Full-Grain Italian Calfskin Leather",
    collection: "Premium Collection",
    sku: "MNC-CLF-HDB-02",
    isBestSeller: true,
    sizeStock: { "One Size": 8 },
    colorStock: { "Soft Beige": 3, "Chestnut": 3, "Midnight Noir": 2 },
    brand: "Monaco Atelier",
    season: "All Season",
    productCost: 110000,
    deliveryCost: 250,
    discount: 0,
    marketingCost: 10000
  },
  {
    id: "PROD-003",
    name: "Chiffon Summer Breeze Gown",
    description: "Ethereal, floor-sweeping evening gown crafted from biological silk chiffon. Soft tiered layers, open-back architectural cut, and hand-embroidered delicate sequin accents.",
    price: 125000,
    originalPrice: 150000,
    stock: 4, // Low stock warning!
    category: "Apparel",
    salesCount: 310,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pastel Rose", "Warm White"],
    fabric: "French Organic Silk Chiffon",
    collection: "Summer Collection",
    sku: "BREEZE-CHF-GWN-03",
    isNewArrival: true,
    sizeStock: { "XS": 1, "S": 1, "M": 2, "L": 0 },
    colorStock: { "Pastel Rose": 2, "Warm White": 2 },
    brand: "Breeze Couture",
    season: "Summer",
    productCost: 55000,
    deliveryCost: 150,
    discount: 8000,
    marketingCost: 4000
  },
  {
    id: "PROD-004",
    name: "Vanguard Cashmere Knit",
    description: "Sustainably sourced, ultra-fine Mongolian cashmere sweater. Features a ribbed turtleneck, relaxed contemporary dropshoulder silhouette, and lightweight heat-retention weave.",
    price: 65000,
    originalPrice: 65000,
    stock: 22,
    category: "Apparel",
    salesCount: 228,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&q=80&w=400",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Soft Beige", "Slate Grey", "Camel Gold"],
    fabric: "100% Organic Mongolian Cashmere",
    collection: "Winter Collection",
    sku: "VNG-CSH-KNT-04",
    sizeStock: { "S": 6, "M": 8, "L": 5, "XL": 3 },
    colorStock: { "Soft Beige": 10, "Slate Grey": 7, "Camel Gold": 5 },
    brand: "Vanguard Knit",
    season: "Winter",
    productCost: 28000,
    deliveryCost: 150,
    discount: 0,
    marketingCost: 2000
  },
  {
    id: "PROD-005",
    name: "Atelier Champagne Heels",
    description: "Master-crafted pointed-toe heels draped in premium Italian satin. Embedded with Swarovski crystal-embellished straps and a delicate champagne gold-accented pencil stiletto.",
    price: 95000,
    originalPrice: 110000,
    stock: 3, // Low stock warning!
    category: "Footwear",
    salesCount: 540,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400",
    sizes: ["36", "37", "38", "39"],
    colors: ["Champagne Gold", "Classic Silver"],
    fabric: "Premium Silk Satin & Swarovski Crystals",
    collection: "Eid Collection",
    sku: "ATL-CHP-HLS-05",
    isLimitedEdition: true,
    sizeStock: { "36": 1, "37": 1, "38": 1, "39": 0 },
    colorStock: { "Champagne Gold": 2, "Classic Silver": 1 },
    brand: "Atelier Luxe",
    season: "Eid",
    productCost: 42000,
    deliveryCost: 150,
    discount: 5000,
    marketingCost: 5000
  },
  {
    id: "PROD-006",
    name: "Monarque Velvet Smoking Blazer",
    description: "An elegant tuxedo smoking jacket designed with silk-grosgrain peak lapels, double-vents, and covered buttons. Tailored from deep plush velvet with a bespoke full jacquard lining.",
    price: 140000,
    originalPrice: 140000,
    stock: 15,
    category: "Apparel",
    salesCount: 195,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400",
    sizes: ["48", "50", "52", "54"],
    colors: ["Royal Navy", "Classic Black"],
    fabric: "Plush Cotton-Blend Velvet",
    collection: "Eid Collection",
    sku: "MNQ-VVT-BLZ-06",
    isNewArrival: true,
    sizeStock: { "48": 4, "50": 5, "52": 4, "54": 2 },
    colorStock: { "Royal Navy": 8, "Classic Black": 7 },
    brand: "Monarque Premium",
    season: "Eid",
    productCost: 62000,
    deliveryCost: 200,
    discount: 0,
    marketingCost: 6000
  },
  {
    id: "JERSEY-001",
    name: "Bangladesh Premium Cricket Jersey 2026",
    description: "জাতীয় দলের অফিশিয়াল ক্রিকেট জার্সি। প্রিমিয়াম ডাবল-মেস ড্রাই-ফিট ফেব্রিক, চমৎকার সাব্লিমেশন প্রিন্ট এবং আরামদায়ক অ্যাথলেটিক ফিট। ঘাম শোষণ ক্ষমতা সম্পন্ন এবং খেলা বা পরার জন্য অত্যন্ত উপযোগী।",
    price: 1150,
    originalPrice: 1500,
    stock: 45,
    category: "Cricket",
    salesCount: 150,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Green-Red"],
    fabric: "Premium Micro-Mesh Polyester",
    sku: "BD-CRIC-JRS-26",
    isBestSeller: true,
    isNewArrival: false,
    brand: "Aura Lux Sports",
    productCost: 500,
    deliveryCost: 60,
    discount: 350,
    marketingCost: 100,
    sizeStock: { "S": 10, "M": 10, "L": 10, "XL": 10, "XXL": 5 },
    colorStock: { "Green-Red": 45 }
  },
  {
    id: "JERSEY-002",
    name: "Argentina Retro Edition '86 Football Jersey",
    description: "কিংবদন্তি ম্যারাডোনার ১৯৮৬ বিশ্বকাপের স্মারক জার্সি। চমৎকার ফেব্রিক কোয়ালিটি, এমব্রয়ডারি করা লোগো এবং ঐতিহ্যবাহী আকাশী-সাদা স্ট্রাইপ ডিজাইন। ফুটবল প্রেমীদের জন্য সেরা কালেকশন।",
    price: 1390,
    originalPrice: 1800,
    stock: 20,
    category: "Football",
    salesCount: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL"],
    colors: ["Sky Blue-White"],
    fabric: "Bespoke Soft-Weave Cotton-Poly",
    sku: "ARG-RET-86",
    isBestSeller: true,
    isNewArrival: true,
    brand: "Aura Lux Vintage",
    productCost: 600,
    deliveryCost: 60,
    discount: 410,
    marketingCost: 120,
    sizeStock: { "M": 8, "L": 8, "XL": 4 },
    colorStock: { "Sky Blue-White": 20 }
  },
  {
    id: "JERSEY-003",
    name: "Real Madrid Stealth Edition Jersey 26",
    description: "রিয়াল মাদ্রিদের অল-ব্ল্যাক স্পেশাল লিমিটেড এডিশন কিট। ম্যাট ব্ল্যাক এমবস করা লোগো, গোল্ডেন কার্বন ফাইবার প্যাটার্ন অ্যাকসেন্ট এবং সম্পূর্ণ ঘাম নিরোধক অ্যাক্টিভ-কুল প্রযুক্তি।",
    price: 1290,
    originalPrice: 1650,
    stock: 35,
    category: "Football",
    salesCount: 95,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stealth Black"],
    fabric: "Aeroready Sweat-Wick Mesh",
    sku: "RM-STL-BLK-26",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Aura Lux Sports",
    productCost: 550,
    deliveryCost: 60,
    discount: 360,
    marketingCost: 100,
    sizeStock: { "S": 8, "M": 10, "L": 10, "XL": 7 },
    colorStock: { "Stealth Black": 35 }
  },
  {
    id: "JERSEY-004",
    name: "Aura Breathable Vent-Air Training Tee",
    description: "অফিস বা জিম ওয়ার্কআউটের জন্য বেস্ট পারফরম্যান্স স্পোর্টস টি-শার্ট। অতি-হালকা ড্রাই-ফিট সুতা, থার্মাল রেগুলেশন সাইড প্যানেল এবং নিখুঁত স্ট্রেচেবল কমফোর্ট।",
    price: 790,
    originalPrice: 990,
    stock: 60,
    category: "Activewear",
    salesCount: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Cool Grey", "Active Navy", "Carbon Black"],
    fabric: "Ultra-Lightweight Vent-Air Mesh",
    sku: "AURA-VNT-TEE-04",
    isBestSeller: true,
    isNewArrival: false,
    brand: "Aura Active",
    productCost: 350,
    deliveryCost: 60,
    discount: 200,
    marketingCost: 80,
    sizeStock: { "M": 15, "L": 15, "XL": 15, "XXL": 15 },
    colorStock: { "Cool Grey": 20, "Active Navy": 20, "Carbon Black": 20 }
  },
  {
    id: "JERSEY-005",
    name: "Brazil Classic Gold Samba Kit 2026",
    description: "ব্রাজিলের ঐতিহ্যবাহী ক্যানারি হলুদ ফুটবল জার্সি। ঐতিহ্যবাহী সবুজ কলার ফিনিশিং, থ্রি-ডি এমবসড লোগো এবং সর্বোচ্চ আরামদায়ক ড্রাই-ফিট প্রযুক্তির ব্যবহার।",
    price: 1190,
    originalPrice: 1450,
    stock: 15,
    category: "Football",
    salesCount: 75,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Canary Yellow"],
    fabric: "Dry-Fit Polyester Jacquard",
    sku: "BR-GOLD-26",
    isBestSeller: false,
    isNewArrival: false,
    brand: "Aura Lux Sports",
    productCost: 500,
    deliveryCost: 60,
    discount: 260,
    marketingCost: 100,
    sizeStock: { "S": 3, "M": 5, "L": 4, "XL": 3 },
    colorStock: { "Canary Yellow": 15 }
  },
  {
    id: "JERSEY-006",
    name: "Aura Strike-Force Compression Longsleeve",
    description: "অ্যাথলেটদের জন্য ফুল স্লিভ স্পোর্টস ইনার এবং ট্রেনিং টি-শার্ট। মাংসপেশি সচল রাখতে মৃদু কম্প্রেশন প্রযুক্তি, ইউভি সূর্যরশ্মি সুরক্ষা এবং ফোর-ওয়ে সুপার স্ট্রেচ ফেব্রিক।",
    price: 890,
    originalPrice: 1150,
    stock: 28,
    category: "Activewear",
    salesCount: 65,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL"],
    colors: ["Pitch Black", "Steel Blue"],
    fabric: "Premium Lycra-Spandex Active Blend",
    sku: "AURA-STK-LS-06",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Aura Active",
    productCost: 400,
    deliveryCost: 60,
    discount: 260,
    marketingCost: 90,
    sizeStock: { "M": 10, "L": 10, "XL": 8 },
    colorStock: { "Pitch Black": 15, "Steel Blue": 13 }
  },
  {
    id: "KIDS-COMBO-01",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set A)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nPockets: None\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: প্রিমিয়াম ১০০% কটন দিয়ে তৈরি আমাদের ৪ পিসের এই স্টাইলিশ ট্যাংক টপ কম্বো সেটটি আপনার আদরের সোনামণির জন্য গরমে অত্যন্ত আরামদায়ক। এর সফট ফেব্রিক বাচ্চার ত্বকের জন্য খুবই নিরাপদ ও মসৃণ। আকর্ষণীয় কিউট কার্টুন এবং স্পেস থিম ডিটিএফ প্রিন্ট করা রয়েছে।",
    price: 690,
    originalPrice: 950,
    stock: 50,
    category: "Baby Category",
    salesCount: 210,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Cute Bear & Astronaut Theme Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C1",
    isBestSeller: true,
    isNewArrival: true,
    brand: "Trend Zone Baby",
    productCost: 300,
    deliveryCost: 60,
    discount: 260,
    marketingCost: 70,
    sizeStock: { "1-2 Years": 8, "3-4 Years": 7, "5-6 Years": 7, "7-8 Years": 7, "9-10 Years": 7, "11-12 Years": 7, "13-14 Years": 7 },
    colorStock: { "Cute Bear & Astronaut Theme Combo": 50 }
  },
  {
    id: "KIDS-COMBO-02",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set B)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nPockets: None\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: গরমে বাচ্চাদের দৈনিক ব্যবহারের জন্য ১০০% সুতি ৪ পিসের ট্যাংক টপ স্লিভলেস কম্বো সেট। আরামদায়ক সাইজ ফিটিং এবং কিউট অ্যানিমেলস ও সুপারহিরো স্পাইডারম্যান প্রিন্টসহ পাওয়া যাচ্ছে। প্রতিটি টপ অত্যন্ত মসৃণ ফিনিশিংযুক্ত।",
    price: 690,
    originalPrice: 950,
    stock: 40,
    category: "Baby Category",
    salesCount: 145,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Samba Animals & Spiderman Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C2",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Trend Zone Baby",
    productCost: 300,
    deliveryCost: 60,
    discount: 260,
    marketingCost: 70,
    sizeStock: { "1-2 Years": 6, "3-4 Years": 6, "5-6 Years": 6, "7-8 Years": 6, "9-10 Years": 6, "11-12 Years": 5, "13-14 Years": 5 },
    colorStock: { "Samba Animals & Spiderman Combo": 40 }
  },
  {
    id: "KIDS-COMBO-03",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set C)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nPockets: None\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: ১০০% প্রিমিয়াম সুতি কাপড়ে তৈরি ৪টি চমৎকার ডিজাইনের বেবি স্লিভলেস কম্বো প্যাক। চমত্কার কার ও ট্রাক প্রিন্ট সমৃদ্ধ যা আপনার সোনামণির প্রিয় থিম। কোমল স্পর্শ ও সর্বোচ্চ আরাম নিশ্চিত করে।",
    price: 690,
    originalPrice: 950,
    stock: 35,
    category: "Baby Category",
    salesCount: 160,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Heavy Duty Trucks Yellow/Black Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C3",
    isBestSeller: true,
    isNewArrival: false,
    brand: "Trend Zone Baby",
    productCost: 300,
    deliveryCost: 60,
    discount: 260,
    marketingCost: 70,
    sizeStock: { "1-2 Years": 5, "3-4 Years": 5, "5-6 Years": 5, "7-8 Years": 5, "9-10 Years": 5, "11-12 Years": 5, "13-14 Years": 5 },
    colorStock: { "Heavy Duty Trucks Yellow/Black Combo": 35 }
  },
  {
    id: "KIDS-COMBO-04",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set D - Streetwear Cities)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Streetwear Cities Edition)\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: Premium DTF\nSet Includes: 4 piece Tank Top Combo\nNeckline: Crewneck\nSleeves: Sleeveless\nFeatures: Super-Soft Feel, Anti-Shrinkage, High-Color Fastness\nCare: Machine Washable\n\nবিবরণ: প্রিমিয়াম ১০০% কটন দিয়ে তৈরি ৪ পিসের এই স্টাইলিশ ট্যাংক টপ কম্বো সেটটি আপনার আদরের সোনামণির জন্য গরমে অত্যন্ত আরামদায়ক। এর সফট ফেব্রিক বাচ্চার ত্বকের জন্য খুবই নিরাপদ ও মসৃণ। হলুদ, সাদা, কালো ও লাল কালারের ট্যাংকের উপর আকর্ষণীয় পাম অ্যাঞ্জেলস (Palm Angels), নিউ ইয়র্ক (New York), লস অ্যাঞ্জেলেস (Los Angeles) এবং প্যারিস (Paris) থিম প্রিমিয়াম প্রিন্ট করা রয়েছে যা আপনার সোনামণিকে দেবে আকর্ষণীয় ও ট্রেন্ডি ক্যাজুয়াল লুক।",
    price: 690,
    originalPrice: 950,
    stock: 60,
    category: "Baby Category",
    salesCount: 110,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Yellow/White/Black/Red Cities Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C4",
    isBestSeller: true,
    isNewArrival: true,
    brand: "Trend Zone Baby",
    productCost: 300,
    deliveryCost: 60,
    discount: 260,
    marketingCost: 70,
    sizeStock: { "1-2 Years": 9, "3-4 Years": 9, "5-6 Years": 9, "7-8 Years": 9, "9-10 Years": 8, "11-12 Years": 8, "13-14 Years": 8 },
    colorStock: { "Yellow/White/Black/Red Cities Combo": 60 }
  },
  {
    id: "KIDS-COMBO-05",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set E - California Retro Cars)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (California Retro Cars Edition)\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: Premium DTF\nSet Includes: 4 piece Tank Top Combo\nNeckline: Crewneck\nSleeves: Sleeveless\nFeatures: Super-Soft Feel, Maximum Ventilation\nCare: Machine Washable\n\nবিবরণ: গরমে বাচ্চাদের দৈনিক ব্যবহারের জন্য ১০০% সুতি ৪ পিসের ট্যাংক টপ স্লিভলেস কম্বো সেট। আরামদায়ক সাইজ ফিটিং এবং আকর্ষণীয় রেট্রো কার রেসিং ও ক্যালিফোর্নিয়া (California Retro Cars) প্রিমিয়াম প্রিন্টসহ পাওয়া যাচ্ছে। প্রতিটি টপ অত্যন্ত মসৃণ ফিনিশিংযুক্ত এবং কোমল স্পর্শ ও সর্বোচ্চ আরাম নিশ্চিত করে। হলুদ, সাদা, কালো ও অ্যাশ গ্রে কালারের চমৎকার কম্বিনেশন।",
    price: 690,
    originalPrice: 950,
    stock: 45,
    category: "Baby Category",
    salesCount: 85,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519242220831-09410926fbff?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Yellow/White/Black/Grey California Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C5",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Trend Zone Baby",
    productCost: 300,
    deliveryCost: 60,
    discount: 260,
    marketingCost: 70,
    sizeStock: { "1-2 Years": 7, "3-4 Years": 7, "5-6 Years": 7, "7-8 Years": 6, "9-10 Years": 6, "11-12 Years": 6, "13-14 Years": 6 },
    colorStock: { "Yellow/White/Black/Grey California Combo": 45 }
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Rahat Al-Momin",
    email: "rahata@example.com",
    phone: "+880 1711-223344",
    address: "House 24, Road 5, Dhanmondi, Dhaka, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joinDate: "2025-01-15",
    totalSpending: 711800,
    ordersCount: 3,
    segment: "VIP",
    activityTimeline: [
      { action: "Placed order ORD-2026-9041", date: "2026-06-25 14:32" },
      { action: "Subscribed to Premium Club newsletter", date: "2026-04-10 09:12" },
      { action: "Logged in via iOS Client", date: "2026-06-27 08:20" }
    ],
    gender: "Male",
    birthday: "1991-04-12",
    preferredSize: "L (50)",
    favoriteColor: "Charcoal Black",
    favoriteCategory: "Apparel",
    lastPurchaseDate: "2026-06-25",
    averageOrderValue: 237266,
    marketingTags: ["Luxury-Spender", "Silk-Lover", "VIP-Gold"],
    shirtSize: "L",
    pantSize: "34",
    shoeSize: "42",
    sizeHistory: [
      { date: "2025-01-15", item: "Aura Silk Trench Coat", size: "L" },
      { date: "2026-06-25", item: "Atelier Champagne Heels", size: "42" }
    ],
    customerValueScore: 98,
    buyingPatternAnalysis: "এই Customer গত ৬ মাসে ৫ বার Purchase করেছে এবং নতুন Collection-এর জন্য Target করা যেতে পারে। সিল্ক এবং ফর্মাল অ্যাপারেল আইটেম বেশি পছন্দ করেন।",
    nextPurchasePrediction: "Premium Eid Collection - Silk Kurta Set"
  },
  {
    id: "CUST-002",
    name: "Nusrat Jahan",
    email: "nusrat.j@example.com",
    phone: "+880 1819-334455",
    address: "Block B, Flat 4A, Nasirabad Heights, Chittagong, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joinDate: "2025-03-22",
    totalSpending: 434900,
    ordersCount: 2,
    segment: "VIP",
    activityTimeline: [
      { action: "Created support ticket regarding leather conditioning", date: "2026-06-26 11:05" },
      { action: "Placed order ORD-2026-9042", date: "2026-06-26 10:15" }
    ],
    gender: "Female",
    birthday: "1994-11-20",
    preferredSize: "S (38)",
    favoriteColor: "Midnight Noir",
    favoriteCategory: "Leather Goods",
    lastPurchaseDate: "2026-06-26",
    averageOrderValue: 217450,
    marketingTags: ["Handbag-Collector", "Atelier-Buyer", "VIP-Plat"],
    shirtSize: "S",
    pantSize: "28",
    shoeSize: "37",
    sizeHistory: [
      { date: "2025-03-22", item: "Monaco Calfskin Handbag", size: "One Size" },
      { date: "2026-06-26", item: "Chiffon Summer Breeze Gown", size: "S" }
    ],
    customerValueScore: 92,
    buyingPatternAnalysis: "প্রিমিয়াম ইতালিয়ান চামড়াজাত পণ্য এবং পার্টি গ্যালারির লাক্সারি কালেকশন পছন্দ করেন। গড় ক্রয়ের ভ্যালু অনেক বেশি।",
    nextPurchasePrediction: "Premium Winter Collection - Cashmere Coat"
  },
  {
    id: "CUST-003",
    name: "Tahmid Islam",
    email: "tahmid.syl@example.com",
    phone: "+880 1912-778899",
    address: "Kazi Jalaluddin Road, Kumarpara, Sylhet, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joinDate: "2026-06-27",
    totalSpending: 59800,
    ordersCount: 1,
    segment: "New",
    activityTimeline: [
      { action: "Registered a new account", date: "2026-06-27 09:05" },
      { action: "Placed order ORD-2026-9043", date: "2026-06-27 09:30" }
    ],
    gender: "Male",
    birthday: "1998-07-05",
    preferredSize: "M (48)",
    favoriteColor: "Slate Grey",
    favoriteCategory: "Apparel",
    lastPurchaseDate: "2026-06-27",
    averageOrderValue: 59800,
    marketingTags: ["New-User", "Casual-Cashmere"],
    shirtSize: "M",
    pantSize: "32",
    shoeSize: "41",
    sizeHistory: [
      { date: "2026-06-27", item: "Vanguard Cashmere Knit", size: "M" }
    ],
    customerValueScore: 50,
    buyingPatternAnalysis: "নতুন কাস্টমার, প্রিমিয়াম উইন্টার এবং ক্যাজুয়াল ওয়্যারে আগ্রহ দেখিয়েছেন। নিয়মিত ক্যাম্পেইনের মাধ্যমে এনগেজ করা দরকার।",
    nextPurchasePrediction: "Winter Collection - Cashmere Scarf"
  },
  {
    id: "CUST-004",
    name: "Farhana Yasmin",
    email: "farhana.y@example.com",
    phone: "+880 1515-556677",
    address: "Sector 3, Upashahar, Rajshahi, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joinDate: "2025-08-04",
    totalSpending: 124000,
    ordersCount: 4,
    segment: "Regular",
    activityTimeline: [
      { action: "Placed order ORD-2026-9044", date: "2026-06-26 18:22" },
      { action: "Left a 5-star review on Spectra Shield", date: "2026-05-19 14:10" }
    ],
    gender: "Female",
    birthday: "1993-02-14",
    preferredSize: "M (40)",
    favoriteColor: "Soft Beige",
    favoriteCategory: "Apparel",
    lastPurchaseDate: "2026-06-26",
    averageOrderValue: 31000,
    marketingTags: ["Regular", "Knit-Fan"],
    shirtSize: "M",
    pantSize: "30",
    shoeSize: "38",
    sizeHistory: [
      { date: "2025-08-04", item: "Chiffon Summer Breeze Gown", size: "M" },
      { date: "2026-06-26", item: "Vanguard Cashmere Knit", size: "M" }
    ],
    customerValueScore: 78,
    buyingPatternAnalysis: "নিয়মিত ট্রানজ্যাকশন করা কাস্টমার। সফট টোন কালার এবং মার্জিত ক্যাজুয়াল কটন/উল ড্রেসের প্রতি ঝোঁক বেশি।",
    nextPurchasePrediction: "Summer Collection - Linen Tops"
  },
  {
    id: "CUST-005",
    name: "Sadia Afrin",
    email: "sadia.khulna@example.com",
    phone: "+880 1616-990011",
    address: "Mujgunni Main Road, Boyra, Khulna, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joinDate: "2024-11-12",
    totalSpending: 96000,
    ordersCount: 3,
    segment: "Inactive",
    activityTimeline: [
      { action: "Cancelled order ORD-2026-9045", date: "2026-06-20 12:44" },
      { action: "Logged in and viewed Aura Lens Pro page", date: "2026-06-18 16:30" }
    ],
    gender: "Female",
    birthday: "1995-09-30",
    preferredSize: "XS (34)",
    favoriteColor: "Pastel Rose",
    favoriteCategory: "Footwear",
    lastPurchaseDate: "2026-06-20",
    averageOrderValue: 32000,
    marketingTags: ["Inactive-VIP", "Heels-Buyer"],
    shirtSize: "XS",
    pantSize: "26",
    shoeSize: "36",
    sizeHistory: [
      { date: "2024-11-12", item: "Atelier Champagne Heels", size: "36" }
    ],
    customerValueScore: 32,
    buyingPatternAnalysis: "এই কাস্টমার গত ৩ মাস ধরে কোনো নতুন প্রোডাক্ট কেনেননি এবং শেষ অর্ডার বাতিল করেছিলেন। ইনঅ্যাক্টিভ ক্যাটাগরিতে আছেন। রিকভারি ক্যাম্পেইন প্রযোজ্য।",
    nextPurchasePrediction: "New Arrival - Pastel Satin Flats"
  }
];

// --- 5 Core Orders from reference image 1000048513.png ---
const coreOrders: Order[] = [
  {
    id: "ORD-2026-1045",
    customerName: "Rahat Al-Momin",
    customerEmail: "rahat@example.com",
    customerPhone: "01712-345678",
    customerAddress: "Dhaka, Bangladesh",
    date: "2026-05-24 11:20 AM",
    items: [
      { productId: "PROD-001", productName: "Aura Silk Trench Coat", quantity: 1, price: 2450 }
    ],
    total: 2450,
    status: "New Order",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    timeline: [{ status: "New Order", timestamp: "2026-05-24 11:20 AM", note: "নতুন কাস্টমার অর্ডার তৈরি হয়েছে।" }]
  },
  {
    id: "ORD-2026-1044",
    customerName: "Nusrat Jahan",
    customerEmail: "nusrat@example.com",
    customerPhone: "01823-456789",
    customerAddress: "Chittagong, Bangladesh",
    date: "2026-05-24 10:45 AM",
    items: [
      { productId: "PROD-002", productName: "Monaco Calfskin Handbag", quantity: 1, price: 1850 }
    ],
    total: 1850,
    status: "New Order",
    paymentMethod: "bKash",
    paymentStatus: "Paid",
    timeline: [{ status: "New Order", timestamp: "2026-05-24 10:45 AM", note: "bKash পেমেন্ট সফল হয়েছে।" }]
  },
  {
    id: "ORD-2026-1043",
    customerName: "Tahmid Islam",
    customerEmail: "tahmid@example.com",
    customerPhone: "01678-901234",
    customerAddress: "Sylhet, Bangladesh",
    date: "2026-05-24 09:30 AM",
    items: [
      { productId: "PROD-003", productName: "Breeze Couture Scarf", quantity: 1, price: 3250 }
    ],
    total: 3250,
    status: "New Order",
    paymentMethod: "Nagad",
    paymentStatus: "Paid",
    timeline: [{ status: "New Order", timestamp: "2026-05-24 09:30 AM", note: "Nagad পেমেন্ট সফল হয়েছে।" }]
  },
  {
    id: "ORD-2026-1042",
    customerName: "Farhana Yasmin",
    customerEmail: "farhana@example.com",
    customerPhone: "01798-765432",
    customerAddress: "Dhaka, Bangladesh",
    date: "2026-05-24 08:15 AM",
    items: [
      { productId: "PROD-004", productName: "Vanguard Cashmere Knit", quantity: 1, price: 2100 }
    ],
    total: 2100,
    status: "New Order",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    timeline: [{ status: "New Order", timestamp: "2026-05-24 08:15 AM", note: "অর্ডার কনফার্মেশনের জন্য অপেক্ষমাণ।" }]
  },
  {
    id: "ORD-2026-1041",
    customerName: "Sadia Afrin",
    customerEmail: "sadia@example.com",
    customerPhone: "01911-223344",
    customerAddress: "Khulna, Bangladesh",
    date: "2026-05-24 07:50 AM",
    items: [
      { productId: "PROD-005", productName: "Atelier Champagne Heels", quantity: 1, price: 1550 }
    ],
    total: 1550,
    status: "New Order",
    paymentMethod: "bKash",
    paymentStatus: "Paid",
    timeline: [{ status: "New Order", timestamp: "2026-05-24 07:50 AM", note: "bKash পেমেন্ট গেটওয়ে ভ্যালিডেশন সফল।" }]
  }
];

// Generate extra orders to meet exact counts:
// New Orders: 12 (we have 5, need 7)
// Confirmed: 8
// Processing: 15
// Shipped: 7
// Delivered: 20
// Cancelled: 5
// Total = 67 orders
const banglaNames = [
  "Tariqul Islam", "Anika Rahman", "Sabbir Hossain", "Maisha Zaman", "Arifur Rahman",
  "Sultana Razia", "Nayeem Ahmed", "Mehnaz Karim", "Rashedul Bari", "Jannatul Ferdous",
  "Tanvir Rahman", "Zarin Subah", "Ahsan Habib", "Farzana Chowdhury", "Imran Khan"
];
const banglaDistricts = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Comilla"];
const paymentGateways: ('COD' | 'bKash' | 'Nagad' | 'Rocket' | 'Stripe')[] = ["COD", "bKash", "Nagad", "Rocket", "Stripe"];

const generateOrders = (): Order[] => {
  const list: Order[] = [...coreOrders];
  let idCounter = 1040;

  const addBatch = (status: OrderStatus, targetCount: number) => {
    const currentCount = list.filter(o => o.status === status).length;
    const needed = targetCount - currentCount;

    for (let i = 0; i < needed; i++) {
      const idStr = `ORD-2026-${idCounter--}`;
      const name = banglaNames[Math.floor(Math.random() * banglaNames.length)] + " " + String.fromCharCode(65 + (i % 26));
      const district = banglaDistricts[Math.floor(Math.random() * banglaDistricts.length)];
      const gateway = paymentGateways[Math.floor(Math.random() * paymentGateways.length)];
      
      const price = [1200, 1850, 2450, 3250, 4800, 6500, 12500][Math.floor(Math.random() * 7)];
      const dateHour = String(8 + (i % 12)).padStart(2, '0');
      const dateMin = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      
      list.push({
        id: idStr,
        customerName: name,
        customerEmail: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        customerPhone: `01${Math.floor(Math.random() * 3 + 7)}${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 900000 + 100000)}`,
        customerAddress: `${district}, Bangladesh`,
        date: `2026-05-24 ${dateHour}:${dateMin} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        items: [
          { productId: `PROD-00${Math.floor(Math.random() * 6 + 1)}`, productName: "Premium Silk wear", quantity: 1, price }
        ],
        total: price,
        status,
        paymentMethod: gateway,
        paymentStatus: status === "Delivered" || gateway === "bKash" || gateway === "Nagad" ? "Paid" : "Pending",
        timeline: [{ status, timestamp: "2026-05-24 10:00 AM", note: "সিস্টেম দ্বারা স্থিতি আপডেট করা হয়েছে।" }]
      });
    }
  };

  addBatch("New Order", 12);
  addBatch("Confirmed", 8);
  addBatch("Processing", 15);
  addBatch("Shipped", 7);
  addBatch("Delivered", 20);
  addBatch("Cancelled", 5);

  // Return the complete list sorted in descending order of IDs
  return list;
};

export const INITIAL_ORDERS: Order[] = generateOrders();

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "NOTIF-001",
    title: "Low Stock Alert: Atelier Champagne Heels",
    message: "Only 3 items remaining in primary Milan atelier warehouse.",
    type: "warning",
    timestamp: "2026-06-27T08:30:00Z",
    read: false
  },
  {
    id: "NOTIF-002",
    title: "Low Stock Alert: Chiffon Summer Breeze Gown",
    message: "Critical stock limit hit. Only 4 items left.",
    type: "warning",
    timestamp: "2026-06-27T07:12:00Z",
    read: false
  },
  {
    id: "NOTIF-003",
    title: "New Luxury Order Received",
    message: "Rahat Al-Momin placed an order worth ৳ 2,80,000.",
    type: "success",
    timestamp: "2026-06-25T14:32:00Z",
    read: true
  },
  {
    id: "NOTIF-004",
    title: "AI Trend Optimization Recommendation",
    message: "VIP customers show 40% higher interest in Silk collections. Consider launching the Resort 2026 early access campaign.",
    type: "info",
    timestamp: "2026-06-26T10:00:00Z",
    read: false
  }
];

export const DEFAULT_STATS: DashboardStats = {
  todaySales: 219800,
  totalRevenue: 13448000,
  totalOrders: 1840,
  pendingOrders: 12,
  deliveredOrders: 1782,
  cancelledOrders: 46,
  conversionRate: 3.42,
  revenueOverview: [
    { month: "Jan", revenue: 1450000, orders: 180 },
    { month: "Feb", revenue: 1820000, orders: 210 },
    { month: "Mar", revenue: 2100000, orders: 240 },
    { month: "Apr", revenue: 1980000, orders: 220 },
    { month: "May", revenue: 2850000, orders: 320 },
    { month: "Jun", revenue: 3248000, orders: 370 }
  ],
  customerGrowth: [
    { month: "Jan", customers: 120 },
    { month: "Feb", customers: 154 },
    { month: "Mar", customers: 210 },
    { month: "Apr", customers: 245 },
    { month: "May", customers: 310 },
    { month: "Jun", customers: 395 }
  ]
};

export const DEFAULT_SETTINGS: SystemSettings = {
  currency: "BDT",
  taxRate: 5,
  lowStockLimit: 5,
  eyeProtectionEnabled: false,
  blueLightFilterLevel: 0, 
  themeMode: "light", // Elegant default light mode for premium SaaS
  brandName: "TREND ZONE",
  brandLogo: "",
  tagline: ""
};
