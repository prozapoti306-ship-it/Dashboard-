import { Product, Order, Customer, Notification, DashboardStats, SystemSettings, OrderStatus } from '../types';

export const INITIAL_PRODUCTS: Product[] = [];

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
