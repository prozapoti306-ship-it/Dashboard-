import React, { useState, useMemo } from 'react';
// @ts-ignore
import trendZoneLogo from '../assets/images/trend_zone_logo_1782968033190.jpg';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Filter, 
  Check, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Info, 
  Truck, 
  ShieldCheck, 
  Search,
  Activity,
  Heart,
  RefreshCcw,
  XCircle,
  Copy,
  Trash2,
  CreditCard,
  MessageCircle,
  LogOut,
  Key,
  Mail,
  Upload,
  Play,
  Facebook,
  Instagram,
  Home,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order, Notification, Customer, CustomerActivity, CustomerSegment, SystemSettings } from '../types';
import { formatCurrency } from '../App';

interface CustomerStorefrontProps {
  products: Product[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  supabaseService: any;
  onGoToLogin: () => void;
  themeMode: 'light' | 'dark';
  settings?: SystemSettings;
}

// 6 Premium curated sports jerseys for the instant storefront
const DEFAULT_JERSEYS = [
  {
    id: "JERSEY-001",
    name: "Bangladesh Premium Cricket Jersey 2026",
    description: "জাতীয় দলের অফিশিয়াল ক্রিকেট জার্সি। প্রিমিয়াম ডাবল-মেস ড্রাই-ফিট ফেব্রিক, চমৎকার সাব্লিমেশন প্রিন্ট এবং আরামদায়ক অ্যাথলেটিক ফিট। ঘাম শোষণ ক্ষমতা সম্পন্ন এবং খেলা বা পরার জন্য অত্যন্ত উপযোগী।",
    price: 1150,
    originalPrice: 1500,
    stock: 45,
    category: "Cricket",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Green-Red"],
    fabric: "Premium Micro-Mesh Polyester",
    sku: "BD-CRIC-JRS-26",
    isBestSeller: true,
    isNewArrival: false,
    brand: "Aura Lux Sports"
  },
  {
    id: "JERSEY-002",
    name: "Argentina Retro Edition '86 Football Jersey",
    description: "কিংবদন্তি ম্যারাডোনার ১৯৮৬ বিশ্বকাপের স্মারক জার্সি। চমৎকার ফেব্রিক কোয়ালিটি, এমব্রয়ডারি করা লোগো এবং ঐতিহ্যবাহী আকাশী-সাদা স্ট্রাইপ ডিজাইন। ফুটবল প্রেমীদের জন্য সেরা কালেকশন।",
    price: 1390,
    originalPrice: 1800,
    stock: 20,
    category: "Football",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL"],
    colors: ["Sky Blue-White"],
    fabric: "Bespoke Soft-Weave Cotton-Poly",
    sku: "ARG-RET-86",
    isBestSeller: true,
    isNewArrival: true,
    brand: "Aura Lux Vintage"
  },
  {
    id: "JERSEY-003",
    name: "Real Madrid Stealth Edition Jersey 26",
    description: "রিয়াল মাদ্রিদের অল-ব্ল্যাক স্পেশাল লিমিটেড এডিশন কিট। ম্যাট ব্ল্যাক এমবস করা লোগো, গোল্ডেন কার্বন ফাইবার প্যাটার্ন অ্যাকসেন্ট এবং সম্পূর্ণ ঘাম নিরোধক অ্যাক্টিভ-কুল প্রযুক্তি।",
    price: 1290,
    originalPrice: 1650,
    stock: 35,
    category: "Football",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stealth Black"],
    fabric: "Aeroready Sweat-Wick Mesh",
    sku: "RM-STL-BLK-26",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Aura Lux Sports"
  },
  {
    id: "JERSEY-004",
    name: "Aura Breathable Vent-Air Training Tee",
    description: "অফিস বা জিম ওয়ার্কআউটের জন্য বেস্ট পারফরম্যান্স স্পোর্টস টি-শার্ট। অতি-হালকা ড্রাই-ফিট সুতা, থার্মাল রেগুলেশন সাইড প্যানেল এবং নিখুঁত স্ট্রেচেবল কমফোর্ট।",
    price: 790,
    originalPrice: 990,
    stock: 60,
    category: "Activewear",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Cool Grey", "Active Navy", "Carbon Black"],
    fabric: "Ultra-Lightweight Vent-Air Mesh",
    sku: "AURA-VNT-TEE-04",
    isBestSeller: true,
    isNewArrival: false,
    brand: "Aura Active"
  },
  {
    id: "JERSEY-005",
    name: "Brazil Classic Gold Samba Kit 2026",
    description: "ব্রাজিলের ঐতিহ্যবাহী ক্যানারি হলুদ ফুটবল জার্সি। ঐতিহ্যবাহী সবুজ কলার ফিনিশিং, থ্রি-ডি এমবসড লোগো এবং সর্বোচ্চ আরামদায়ক ড্রাই-ফিট প্রযুক্তির ব্যবহার।",
    price: 1190,
    originalPrice: 1450,
    stock: 15,
    category: "Football",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Canary Yellow"],
    fabric: "Dry-Fit Polyester Jacquard",
    sku: "BR-GOLD-26",
    isBestSeller: false,
    isNewArrival: false,
    brand: "Aura Lux Sports"
  },
  {
    id: "JERSEY-006",
    name: "Aura Strike-Force Compression Longsleeve",
    description: "অ্যাথলেটদের জন্য ফুল স্লিভ স্পোর্টস ইনার এবং ট্রেনিং টি-শার্ট। মাংসপেশি সচল রাখতে মৃদু কম্প্রেশন প্রযুক্তি, ইউভি সূর্যরশ্মি সুরক্ষা এবং ফোর-ওয়ে সুপার স্ট্রেচ ফেব্রিক।",
    price: 890,
    originalPrice: 1150,
    stock: 28,
    category: "Activewear",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL"],
    colors: ["Pitch Black", "Steel Blue"],
    fabric: "Premium Lycra-Spandex Active Blend",
    sku: "AURA-STK-LS-06",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Aura Active"
  },
  {
    id: "KIDS-COMBO-01",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set A)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nPockets: None\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: প্রিমিয়াম ১০০% কটন দিয়ে তৈরি আমাদের ৪ পিসের এই স্টাইলিশ ট্যাংক টপ কম্বো সেটটি আপনার আদরের সোনামণির জন্য গরমে অত্যন্ত আরামদায়ক। এর সফট ফেব্রিক বাচ্চার ত্বকের জন্য খুবই নিরাপদ ও মসৃণ। আকর্ষণীয় কিউট কার্টুন এবং স্পেস থিম ডিটিএফ প্রিন্ট করা রয়েছে।",
    price: 690,
    originalPrice: 950,
    stock: 50,
    category: "Baby Category",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Cute Bear & Astronaut Theme Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C1",
    isBestSeller: true,
    isNewArrival: true,
    brand: "Trend Zone Baby"
  },
  {
    id: "KIDS-COMBO-02",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set B)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nPockets: None\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: গরমে বাচ্চাদের দৈনিক ব্যবহারের জন্য ১০০% সুতি ৪ পিসের ট্যাংক টপ স্লিভলেস কম্বো সেট। আরামদায়ক সাইজ ফিটিং এবং কিউট অ্যানিমেলস ও সুপারহিরো স্পাইডারম্যান প্রিন্টসহ পাওয়া যাচ্ছে। প্রতিটি টপ অত্যন্ত মসৃণ ফিনিশিংযুক্ত।",
    price: 690,
    originalPrice: 950,
    stock: 40,
    category: "Baby Category",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Samba Animals & Spiderman Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C2",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Trend Zone Baby"
  },
  {
    id: "KIDS-COMBO-03",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set C)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nPockets: None\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: ১০০% প্রিমিয়াম সুতি কাপড়ে তৈরি ৪টি চমৎকার ডিজাইনের বেবি স্লিভলেস কম্বো প্যাক। চমত্কার কার ও ট্রাক প্রিন্ট সমৃদ্ধ যা আপনার সোনামণির প্রিয় থিম। কোমল স্পর্শ ও সর্বোচ্চ আরাম নিশ্চিত করে।",
    price: 690,
    originalPrice: 950,
    stock: 35,
    category: "Baby Category",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Heavy Duty Trucks Yellow/Black Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C3",
    isBestSeller: true,
    isNewArrival: false,
    brand: "Trend Zone Baby"
  },
  {
    id: "KIDS-COMBO-04",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set D - Streetwear Cities)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Streetwear Cities Edition)\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: Premium DTF\nSet Includes: 4 piece Tank Top Combo\nNeckline: Crewneck\nSleeves: Sleeveless\nFeatures: Super-Soft Feel, Anti-Shrinkage, High-Color Fastness\nCare: Machine Washable\n\nবিবরণ: প্রিমিয়াম ১০০% কটন দিয়ে তৈরি ৪ পিসের এই স্টাইলিশ ট্যাংক টপ কম্বো সেটটি আপনার আদরের সোনামণির জন্য গরমে অত্যন্ত আরামদায়ক। এর সফট ফেব্রিক বাচ্চার ত্বকের জন্য খুবই নিরাপদ ও মসৃণ। হলুদ, সাদা, কালো ও লাল কালারের ট্যাংকের উপর আকর্ষণীয় পাম অ্যাঞ্জেলস (Palm Angels), নিউ ইয়র্ক (New York), লস অ্যাঞ্জেলেস (Los Angeles) এবং প্যারিস (Paris) থিম প্রিমিয়াম প্রিন্ট করা রয়েছে যা আপনার সোনামণিকে দেবে আকর্ষণীয় ও ট্রেন্ডি ক্যাজুয়াল লুক।",
    price: 690,
    originalPrice: 950,
    stock: 60,
    category: "Baby Category",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Yellow/White/Black/Red Cities Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C4",
    isBestSeller: true,
    isNewArrival: true,
    brand: "Trend Zone Baby"
  },
  {
    id: "KIDS-COMBO-05",
    name: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (Set E - California Retro Cars)",
    description: "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo (California Retro Cars Edition)\n\nFabric: 100% Cotton\nGSM: 160-170\nPrint: Premium DTF\nSet Includes: 4 piece Tank Top Combo\nNeckline: Crewneck\nSleeves: Sleeveless\nFeatures: Super-Soft Feel, Maximum Ventilation\nCare: Machine Washable\n\nবিবরণ: গরমে বাচ্চাদের দৈনিক ব্যবহারের জন্য ১০০% সুতি ৪ পিসের ট্যাংক টপ স্লিভলেস কম্বো সেট। আরামদায়ক সাইজ ফিটিং এবং আকর্ষণীয় রেট্রো কার রেসিং ও ক্যালিফোর্নিয়া (California Retro Cars) প্রিমিয়াম প্রিন্টসহ পাওয়া যাচ্ছে। প্রতিটি টপ অত্যন্ত মসৃণ ফিনিশিংযুক্ত এবং কোমল স্পর্শ ও সর্বোচ্চ আরাম নিশ্চিত করে। হলুদ, সাদা, কালো ও অ্যাশ গ্রে কালারের চমৎকার কম্বিনেশন।",
    price: 690,
    originalPrice: 950,
    stock: 45,
    category: "Baby Category",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519242220831-09410926fbff?auto=format&fit=crop&q=80&w=600",
    sizes: ["1-2 Years", "3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years", "13-14 Years"],
    colors: ["Yellow/White/Black/Grey California Combo"],
    fabric: "100% Cotton (GSM 160-170)",
    sku: "BB-SUM-TT-C5",
    isBestSeller: false,
    isNewArrival: true,
    brand: "Trend Zone Baby"
  }
];

// Helper to scale up Unsplash images for a pure 4K/8K ultra-definition zoom look on hover!
const getHighResImage = (url: string) => {
  if (url && url.includes('unsplash.com')) {
    return url.replace(/w=\d+/, 'w=2000').replace(/q=\d+/, 'q=95');
  }
  return url || '';
};

// Map premium look/production-quality showcase videos on YouTube based on category
const getProductVideoUrl = (productId: string, category: string) => {
  const cat = category?.toLowerCase() || '';
  if (cat === 'football') {
    // Beautiful Nike/Adidas professional football kits fabric and look presentation
    return "https://www.youtube.com/embed/S_8qM7P76uM";
  } else if (cat === 'cricket') {
    // Premium sublimation cricket jersey fabrication & printing showcase video
    return "https://www.youtube.com/embed/Z0pZf4I_R-o";
  } else if (cat === 'baby category') {
    // Premium cotton kids fashion showcase
    return "https://www.youtube.com/embed/XgZ3_Wc7gQ8";
  } else {
    // Premium athleisure performance look, fit and lifestyle video
    return "https://www.youtube.com/embed/T009gHqD9OQ";
  }
};

const extractYouTubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  
  // Case 1: Simple 11-character video ID
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.') && !trimmed.includes('?') && !trimmed.includes('=')) {
    return trimmed;
  }

  // Case 2: Regex matching for all common formats
  const regexes = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
  ];

  for (const regex of regexes) {
    const match = trimmed.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Try standard fallback match if needed
  try {
    const match = trimmed.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:&|\?|$)/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (e) {
    console.error("Error parsing backup YouTube regex:", e);
  }

  return null;
};

const getCustomYouTubeEmbedUrl = (url: string | undefined) => {
  if (!url) return null;
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    return url.trim().startsWith('http') ? url.trim() : null;
  }
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
};

export default function CustomerStorefront({
  products,
  orders,
  setOrders,
  setNotifications,
  supabaseService,
  onGoToLogin,
  themeMode,
  settings
}: CustomerStorefrontProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cartProduct, setCartProduct] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryRegion, setDeliveryRegion] = useState<'dhaka' | 'outside'>('dhaka');
  
  // E-commerce Cart State
  interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
    brand: string;
    sizes: string[];
  }
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [showCart, setShowCart] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Customer Auth States
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(() => {
    const saved = localStorage.getItem('current_customer');
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authStep, setAuthStep] = useState<'signup' | 'otp'>('signup');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPhotoUrl, setSignupPhotoUrl] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [userOTP, setUserOTP] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Auto-fill checkout details when currentCustomer changes
  React.useEffect(() => {
    if (currentCustomer) {
      setCustomerName(currentCustomer.name);
      setCustomerPhone(currentCustomer.phone);
      if (currentCustomer.address) {
        setCustomerAddress(currentCustomer.address);
      }
    }
  }, [currentCustomer]);

  const handleLogout = () => {
    localStorage.removeItem('current_customer');
    setCurrentCustomer(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignupPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPhone) {
      alert('সবগুলো ঘর সঠিকভাবে পূরণ করুন।');
      return;
    }

    setIsVerifying(true);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const newCustomer: Customer = {
        id: `CUST-${Date.now()}`,
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
        address: '',
        avatar: signupPhotoUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(signupName)}`,
        joinDate: todayStr,
        totalSpending: 0,
        ordersCount: 0,
        segment: 'New',
        activityTimeline: [
          {
            action: 'Aura Lux-এ নতুন গ্রাহক হিসেবে অ্যাকাউন্ট তৈরি করেছেন।',
            date: todayStr
          }
        ],
        gender: 'Unisex',
        membershipTier: 'Bronze',
        rewardPoints: 50
      };

      // Save customer to Supabase
      await supabaseService.upsertCustomer(newCustomer);

      // Save customer to LocalStorage & Login
      localStorage.setItem('current_customer', JSON.stringify(newCustomer));
      setCurrentCustomer(newCustomer);
      setShowAuthModal(false);
      alert('অভিনন্দন! আপনার প্রোফাইল তৈরি হয়ে গেছে।');
    } catch (err) {
      console.error('Error during customer sign up:', err);
      alert('সুপাবেজে ডাটা সেভ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-sliding Banner rotation every 3 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Nagad' | 'Rocket'>('COD');
  const [transactionId, setTransactionId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  
  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };
  
  // Checkout Status State
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState<Order | null>(null);
  
  // Tracking State
  const [trackingId, setTrackingId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [trackingError, setTrackingError] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  // Product Zoom Detail State
  const [viewingProduct, setViewingProduct] = useState<any | null>(null);
  const [selectedDetailSize, setSelectedDetailSize] = useState<string>('');
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });
  const [showLens, setShowLens] = useState(false);

  // Interactive Five-Star Review System States
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('cottoon_user_reviews');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Advanced Search & Wishlist State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cottoon_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('cottoon_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Mobile Back Button Modal Interception (Daraz & Bikroy Style Navigation)
  const modalPushedRef = React.useRef(false);

  React.useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (viewingProduct || showCart || showTracking || showAuthModal || showWishlistModal || showSuggestions) {
        setViewingProduct(null);
        setShowCart(false);
        setShowTracking(false);
        setShowAuthModal(false);
        setShowWishlistModal(false);
        setShowSuggestions(false);
        modalPushedRef.current = false;
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [viewingProduct, showCart, showTracking, showAuthModal, showWishlistModal, showSuggestions]);

  React.useEffect(() => {
    const isAnyOpen = viewingProduct || showCart || showTracking || showAuthModal || showWishlistModal || showSuggestions;
    if (isAnyOpen) {
      if (!modalPushedRef.current) {
        window.history.pushState({ modalOpen: true }, "");
        modalPushedRef.current = true;
      }
    } else {
      if (modalPushedRef.current) {
        modalPushedRef.current = false;
        window.history.back();
      }
    }
  }, [viewingProduct, showCart, showTracking, showAuthModal, showWishlistModal, showSuggestions]);

  // Merge default premium jerseys with sports/apparel products created from Dashboard to show everything
  const allStoreProducts = useMemo(() => {
    // Convert current products to storefront schema format
    const formattedDashboardProducts = products
      .map(p => ({
        id: p.id,
        name: p.name,
        description: p.description || '',
        price: p.price,
        originalPrice: p.originalPrice || p.price,
        stock: p.stock,
        category: p.category || 'Apparel',
        rating: p.rating || 4.5,
        image: p.image || "https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=400",
        sizes: p.sizes && p.sizes.length > 0 ? p.sizes : ["S", "M", "L", "XL"],
        colors: p.colors || [],
        fabric: p.fabric || 'Premium Mesh',
        sku: p.sku || p.id,
        isBestSeller: p.isBestSeller || false,
        isNewArrival: p.isNewArrival || false,
        brand: p.brand || 'Aura Lux',
        season: p.season || '',
        videoUrl: p.videoUrl || ''
      }));

    // Avoid duplicate IDs
    const dashboardIds = new Set(formattedDashboardProducts.map(p => p.id));
    const uniqueDefaults = DEFAULT_JERSEYS.filter(dj => !dashboardIds.has(dj.id));

    return [...uniqueDefaults, ...formattedDashboardProducts];
  }, [products]);

  // Categories list
  const storefrontCategories = useMemo(() => {
    const list = new Set(allStoreProducts.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, [allStoreProducts]);

  // Dynamic Banner Image URL for the active category
  const categoryBannerUrl = useMemo(() => {
    if (selectedCategory === 'All') return null;
    const prodWithBanner = allStoreProducts.find(
      p => p.category === selectedCategory && p.season && (p.season.startsWith('http://') || p.season.startsWith('https://') || p.season.startsWith('/') || p.season.startsWith('data:'))
    );
    return prodWithBanner ? prodWithBanner.season : null;
  }, [allStoreProducts, selectedCategory]);

  // Find baby category banner specifically to use in slide 4
  const babyBannerUrl = useMemo(() => {
    const prodWithBanner = allStoreProducts.find(
      p => p.category === 'Baby Category' && p.season && (p.season.startsWith('http://') || p.season.startsWith('https://') || p.season.startsWith('/') || p.season.startsWith('data:'))
    );
    return prodWithBanner ? prodWithBanner.season : null;
  }, [allStoreProducts]);

  // Filter products by selectedCategory AND search query
  const filteredProducts = useMemo(() => {
    let result = allStoreProducts;
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }
    return result;
  }, [allStoreProducts, selectedCategory, searchQuery]);

  const generateTrackingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PZ-'; // প্রজাপতি ডট কম-এর শর্ট ফর্ম
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleAddToCart = (product: any, sizeSelected?: string, openCart = false) => {
    const finalSize = sizeSelected || product.sizes[0] || 'M';
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.productId === product.id && item.size === finalSize
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            size: finalSize,
            image: product.image,
            brand: product.brand,
            sizes: product.sizes || ['S', 'M', 'L', 'XL']
          }
        ];
      }
    });
    setOrderSuccessData(null);
    if (openCart) {
      setShowCart(true);
    }
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.size === size)));
  };

  const handleUpdateCartQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.size === size) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleUpdateCartSize = (productId: string, oldSize: string, newSize: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.productId === productId && item.size === newSize);
      const itemToMoveIdx = prev.findIndex((item) => item.productId === productId && item.size === oldSize);
      
      if (itemToMoveIdx === -1) return prev;
      
      const updated = [...prev];
      const itemToMove = updated[itemToMoveIdx];
      
      if (existingIdx > -1 && existingIdx !== itemToMoveIdx) {
        updated[existingIdx].quantity += itemToMove.quantity;
        return updated.filter((_, idx) => idx !== itemToMoveIdx);
      } else {
        updated[itemToMoveIdx] = { ...itemToMove, size: newSize };
        return updated;
      }
    });
  };

  const shippingCost = deliveryRegion === 'dhaka' ? 80 : 150;
  const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const grandTotal = itemsTotal + shippingCost;

  const handlePlaceCartOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('আপনার কার্ট খালি আছে। অনুগ্রহ করে জার্সি যোগ করুন।');
      return;
    }
    if (!customerName || !customerPhone || !customerAddress) {
      alert('অনুগ্রহ করে নাম, মোবাইল নাম্বার এবং ঠিকানা সঠিকভাবে পূরণ করুন।');
      return;
    }

    if (paymentMethod !== 'COD' && !transactionId.trim()) {
      alert('অনুগ্রহ করে টাকা পাঠানোর পর Transaction ID (ট্রানজেকশন আইডি) প্রদান করুন।');
      return;
    }
    
    setIsOrdering(true);
    
    const shippingCost = deliveryRegion === 'dhaka' ? 80 : 150;
    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = itemsTotal + shippingCost;
    
    // Generate tracking code and use as order ID
    const trackingCode = generateTrackingCode();
    const newOrderId = trackingCode;
    const today = new Date().toISOString().split('T')[0];

    const orderPayload: Order = {
      id: newOrderId,
      customerName,
      customerPhone,
      customerAddress,
      customerEmail: '',
      date: today,
      items: cart.map(item => ({
        productId: item.productId,
        productName: `${item.name} (${item.size})`,
        quantity: item.quantity,
        price: item.price
      })),
      total: grandTotal,
      status: 'New Order',
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      transactionId: paymentMethod !== 'COD' ? transactionId.trim() : undefined,
      timeline: [
        {
          status: 'New Order',
          timestamp: today,
          note: `কাস্টমার ওয়েবসাইট থেকে সরাসরি কার্টের মাধ্যমে অর্ডার প্লেস করেছেন। ট্র্যাকিং কোড: ${newOrderId}। পেমেন্ট পদ্ধতি: ${paymentMethod === 'COD' ? 'ক্যাশ অন ডেলিভারি' : paymentMethod}${paymentMethod !== 'COD' && transactionId ? ` (TrxID: ${transactionId})` : ''}।`
        }
      ],
      internalNotes: `কার্ট থেকে সরাসরি রিসিভ করা হয়েছে। ট্র্যাকিং কোড: ${newOrderId} | পেমেন্ট: ${paymentMethod}${transactionId ? ` | TrxID: ${transactionId}` : ''} | ডেলিভারি অঞ্চল: ${deliveryRegion === 'dhaka' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে'}`
    };

    try {
      // 1. Save directly to Supabase orders table
      await supabaseService.upsertOrder(orderPayload);
      
      // 2. Also save custom customer node to Supabase if possible to keep CRM active
      if (currentCustomer) {
        const updatedCustomer: Customer = {
          ...currentCustomer,
          address: customerAddress,
          totalSpending: (currentCustomer.totalSpending || 0) + grandTotal,
          ordersCount: (currentCustomer.ordersCount || 0) + 1,
          lastPurchaseDate: today,
          activityTimeline: [
            {
              action: `কার্ট থেকে ${cart.length} টি পণ্য অর্ডার করেছেন। অর্ডার আইডি: ${newOrderId}। পেমেন্ট: ${paymentMethod}`,
              date: today
            },
            ...(currentCustomer.activityTimeline || [])
          ]
        };
        await supabaseService.upsertCustomer(updatedCustomer);
        localStorage.setItem('current_customer', JSON.stringify(updatedCustomer));
        setCurrentCustomer(updatedCustomer);
      } else {
        const customerId = `CUST-${Math.floor(100000 + Math.random() * 900000)}`;
        const newCustomer: Customer = {
          id: customerId,
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
          email: `${customerPhone}@auralux.com`,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
          joinDate: today,
          totalSpending: grandTotal,
          ordersCount: 1,
          segment: 'New',
          activityTimeline: [
            {
              action: `কার্ট থেকে ${cart.length} টি পণ্য অর্ডার করেছেন। পেমেন্ট: ${paymentMethod}`,
              date: today
            }
          ],
          gender: 'Unisex',
          preferredSize: cart[0]?.size || 'M',
          favoriteCategory: cart[0]?.brand || 'Aura Lux',
          lastPurchaseDate: today
        };
        await supabaseService.upsertCustomer(newCustomer);
      }

      // 3. Add notification to Supabase system
      const itemNames = cart.map(item => `${item.name} (${item.size}) x${item.quantity}`).join(', ');
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        title: `নতুন কার্ট অর্ডার! ${newOrderId}`,
        message: `${customerName} সরাসরি কার্ট থেকে অর্ডার করেছেন। পণ্য: ${itemNames}. বিল: ৳${grandTotal}. পেমেন্ট: ${paymentMethod}`,
        type: 'success',
        timestamp: new Date().toISOString(),
        read: false
      };
      await supabaseService.upsertNotification(newNotif);

      // 4. Update parent states immediately
      setOrders(prev => [orderPayload, ...prev]);
      setNotifications(prev => [newNotif, ...prev]);
      
      // Set success screen state
      setOrderSuccessData(orderPayload);
      
      // Clear forms and cart
      setCart([]);
      localStorage.removeItem('cart');
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setTransactionId('');
      setPaymentMethod('COD');
    } catch (err) {
      console.error("Order submission error:", err);
      // Fallback update to local memory state
      setOrders(prev => [orderPayload, ...prev]);
      setOrderSuccessData(orderPayload);
      setCart([]);
      setTransactionId('');
      setPaymentMethod('COD');
    } finally {
      setIsOrdering(false);
    }
  };

  const handleTrackOrder = async () => {
    if (!trackingId.trim()) {
      setTrackingError('অনুগ্রহ করে অর্ডার আইডি প্রদান করুন।');
      return;
    }
    setTrackingError('');
    setTrackedOrder(null);

    // Search in orders state
    const foundLocal = orders.find(o => o.id.toLowerCase() === trackingId.trim().toLowerCase());
    if (foundLocal) {
      setTrackedOrder(foundLocal);
      return;
    }

    // Try fetching live from database
    try {
      const response = await supabaseService.getOrders([]);
      const foundDb = response.find((o: any) => o.id.toLowerCase() === trackingId.trim().toLowerCase());
      if (foundDb) {
        setTrackedOrder(foundDb);
      } else {
        setTrackingError('দুঃখিত! এই অর্ডার আইডি দিয়ে কোনো অর্ডার খুঁজে পাওয়া যায়নি। আইডিটি সঠিক কিনা দেখে নিন।');
      }
    } catch (e) {
      setTrackingError('অর্ডার ট্র্যাক করতে সমস্যা হচ্ছে। অনুগ্রহ করে পরে চেষ্টা করুন।');
    }
  };

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#120e0c] text-[#f6f3ed]' : 'bg-[#fcfbfa] text-[#111111]'} transition-colors duration-300 font-sans pb-20`}>
      
      {/* Dynamic Aura Gradient Lightspot */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#e07a5f]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Premium Multi-Tier Header with Smart Search, Notice Bar and Main Navigation Menu */}
      <div className="relative z-40 shadow-xl">
        {/* Animated Notice Bar (Top) */}
        <div className="bg-[#26af5f] text-white text-[11px] font-black tracking-wider py-1.5 px-4 text-center flex items-center justify-center space-x-2.5 overflow-hidden animate-pulse">
          <span>🚚 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (Cash on Delivery)!</span>
          <span className="hidden md:inline-block opacity-60">•</span>
          <span className="hidden md:inline-block">💬 সরাসরি অর্ডার করতে কল বা হোয়াটসঅ্যাপ করুন: 01792572306</span>
        </div>

        <header className="transition-colors duration-300 brand-header"
        >
          {/* Line 1: Top Bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex items-center space-x-3 logo-container shrink-0">
              <a href="/" className="flex items-center space-x-3">
                <img 
                  src={settings?.brandLogo || trendZoneLogo} 
                  alt={`${settings?.brandName || 'Trend Zone'} Logo`} 
                  referrerPolicy="no-referrer"
                  className="h-[64px] w-[64px] sm:h-[68px] sm:w-[68px] object-contain shrink-0 transition-transform duration-300 hover:scale-105"
                  style={{ filter: 'drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.8))' }}
                />
                <div id="fallback-logo-text" className="block leading-tight">
                  <span className="text-base sm:text-lg font-black tracking-widest uppercase block text-[#d4af37] font-sans">{settings?.brandName || "TREND ZONE"}</span>
                  <span className="text-[10px] sm:text-[11px] tracking-widest font-extrabold uppercase text-[#f6f3ed]/80 block font-mono">TREND ZONE.com</span>
                </div>
              </a>
            </div>

            {/* Middle: Advanced AJAX Search Box with Suggestion Pop-up */}
            <div className="relative flex-1 max-w-lg mx-2 sm:mx-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="জার্সির নাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-8 py-2 bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/50 text-[11px] sm:text-xs rounded-full border border-white/15 focus:border-[#26af5f] focus:ring-1 focus:ring-[#26af5f] outline-none transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/50" />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}
                    className="absolute right-3 top-2.5 text-white/50 hover:text-white cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Advanced Suggestions Panel */}
              <AnimatePresence>
                {showSuggestions && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowSuggestions(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] md:w-full md:left-0 md:translate-x-0 mt-2 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40 p-4 space-y-4 text-left"
                    >
                      {/* Popular Category Shortcuts */}
                      <div>
                        <p className="text-[9px] uppercase font-black tracking-widest text-[#26af5f] mb-2 font-mono">পপুলার ক্যাটাগরি শর্টকাট</p>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: '👨 ম্যান (Men)', value: 'man', category: 'All' },
                            { label: '👩 উইমেন (Women)', value: 'woman', category: 'All' },
                            { label: '👶 চাইল্ড (Kids)', value: 'child', category: 'All' },
                            { label: '🧸 বেবি কম্বো', value: '', category: 'Baby Category' },
                            { label: '⚽ ফুটবল', value: '', category: 'Football' },
                            { label: '🏏 ক্রিকেট', value: '', category: 'Cricket' },
                            { label: '🏃 অ্যাক্টিভ', value: '', category: 'Activewear' }
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (item.value) {
                                  setSearchQuery(item.value);
                                } else {
                                  setSearchQuery('');
                                }
                                if (item.category) {
                                  setSelectedCategory(item.category);
                                }
                                setShowSuggestions(false);
                                const el = document.getElementById('products');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1.5 bg-white/5 hover:bg-[#26af5f]/20 hover:text-white border border-white/10 hover:border-[#26af5f]/30 rounded-lg text-[10px] font-bold text-white/80 transition-all cursor-pointer"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Matching Products Suggestions */}
                      <div>
                        <p className="text-[9px] uppercase font-black tracking-widest text-[#26af5f] mb-2 font-mono">ম্যাচিং প্রোডাক্টস</p>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar">
                          {allStoreProducts
                            .filter(p => {
                              if (!searchQuery.trim()) return p.isBestSeller;
                              const q = searchQuery.toLowerCase();
                              return p.name.toLowerCase().includes(q) || 
                                     (p.category && p.category.toLowerCase().includes(q)) ||
                                     (p.brand && p.brand.toLowerCase().includes(q));
                            })
                            .slice(0, 4)
                            .map(p => (
                              <div 
                                key={p.id}
                                onClick={() => {
                                  setViewingProduct(p);
                                  setSelectedDetailSize(p.sizes?.[0] || 'M');
                                  setShowSuggestions(false);
                                }}
                                className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 cursor-pointer transition-all"
                              >
                                <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded-lg bg-neutral-900 border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-extrabold truncate text-white">{p.name}</p>
                                  <p className="text-[9px] text-[#26af5f] font-mono">{formatCurrency(p.price)}</p>
                                </div>
                                <span className="text-[8px] font-bold text-white/40 uppercase font-mono">{p.category}</span>
                              </div>
                            ))}
                          {allStoreProducts.filter(p => {
                            if (!searchQuery.trim()) return true;
                            const q = searchQuery.toLowerCase();
                            return p.name.toLowerCase().includes(q) || 
                                   (p.category && p.category.toLowerCase().includes(q)) ||
                                   (p.brand && p.brand.toLowerCase().includes(q));
                          }).length === 0 && (
                            <p className="text-[10px] opacity-50 py-2">কোনো প্রোডাক্ট পাওয়া যায়নি</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Actions (Hotline, Wishlist, Cart, Profile) */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* Support Hotline Link */}
              <a 
                href="tel:01792572306" 
                className="hidden lg:flex items-center space-x-1.5 bg-white/5 hover:bg-[#26af5f]/15 px-3 py-2 rounded-xl text-white border border-white/10 hover:border-[#26af5f]/30 transition-all text-xs font-black cursor-pointer"
                title="সরাসরি কল করুন"
              >
                <Phone className="h-3.5 w-3.5 text-[#26af5f] animate-bounce" />
                <span>01792572306</span>
              </a>

              {/* Wishlist Button */}
              <button
                onClick={() => setShowWishlistModal(true)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-[#26af5f]/15 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer text-white border border-white/10 hover:border-[#26af5f]/30"
                title="পছন্দের তালিকা (Wishlist)"
              >
                <Heart className="h-4 w-4 text-[#26af5f] fill-[#26af5f]/10" />
                <span className="hidden md:inline">পছন্দ</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4.5 w-4.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-[#26af5f]/15 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer text-white border border-white/10 hover:border-[#26af5f]/30"
              >
                <ShoppingBag className="h-4 w-4 text-[#26af5f]" />
                <span className="hidden md:inline">কার্ট</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4.5 w-4.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse shadow-md">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              
              {/* Customer Profile Account Trigger */}
              {currentCustomer ? (
                <div className="flex items-center space-x-1.5 border border-white/10 bg-white/5 pl-1.5 pr-2 py-1.5 rounded-xl text-xs text-white">
                  <img 
                    id="nav-profile-pic" 
                    src={currentCustomer.avatar} 
                    alt="Profile" 
                    className="h-6.5 w-6.5 rounded-full object-cover border border-[#26af5f] bg-neutral-800"
                    referrerPolicy="no-referrer"
                  />
                  <span id="nav-customer-name" className="font-extrabold max-w-[70px] truncate hidden sm:inline-block text-white">
                    {currentCustomer.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="p-1 hover:bg-rose-500/15 hover:text-rose-500 rounded-lg transition-all cursor-pointer text-white"
                    title="Logout"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthStep('signup');
                    setSignupName('');
                    setSignupEmail('');
                    setSignupPhone('');
                    setSignupPhotoUrl('');
                    setUserOTP('');
                    setShowAuthModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#26af5f] hover:bg-[#1e924d] text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#26af5f]/10"
                >
                  Account
                </button>
              )}
            </div>
          </div>

          {/* Line 2: Main Menu Row */}
          <div className="bg-[#181818]/95 border-t border-white/5 py-2.5 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center space-x-5 sm:space-x-6 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shrink-0">
                {/* Home Button */}
                <a 
                  href="#products" 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="text-white hover:text-[#26af5f] transition-colors flex items-center space-x-1.5"
                >
                  <Home className="h-3.5 w-3.5 text-[#26af5f]" />
                  <span>হোম কালেকশন</span>
                </a>

                {/* Categories Dropdown Menu */}
                <div className="relative group py-1">
                  <button className="text-white group-hover:text-[#26af5f] transition-colors flex items-center space-x-1 cursor-pointer">
                    <span>ক্যাটাগরি সমূহ</span>
                    <span className="text-[8px] opacity-60">▼</span>
                  </button>

                  {/* Hover dropdown pane */}
                  <div className="absolute left-0 top-full mt-1.5 bg-[#111111] border border-white/10 rounded-xl shadow-2xl p-2 w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 space-y-1">
                    {[
                      { label: '👨 ম্যান কালেকশন (Men)', value: 'man', category: 'All' },
                      { label: '👩 উইমেন কালেকশন (Women)', value: 'woman', category: 'All' },
                      { label: '👶 চাইল্ড কালেকশন (Kids)', value: 'child', category: 'All' },
                      { label: '🧸 বেবি কটন কম্বো (Baby)', value: '', category: 'Baby Category' },
                      { label: '⚽ ফুটবল জার্সি (Football)', value: '', category: 'Football' },
                      { label: '🏏 ক্রিকেট জার্সি (Cricket)', value: '', category: 'Cricket' },
                      { label: '🏃 অ্যাথলেটিকস (Activewear)', value: '', category: 'Activewear' },
                      // Dynamic custom categories added via Bulk Upload or others
                      ...storefrontCategories
                        .filter(cat => cat !== 'All' && !['Football', 'Cricket', 'Activewear', 'Baby Category'].includes(cat))
                        .map(cat => ({
                          label: `✨ ${cat}`,
                          value: '',
                          category: cat
                        }))
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.value) {
                            setSearchQuery(item.value);
                          } else {
                            setSearchQuery('');
                          }
                          if (item.category) {
                            setSelectedCategory(item.category);
                          }
                          const el = document.getElementById('products');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left px-3 py-2.5 hover:bg-[#26af5f]/15 hover:text-white rounded-lg text-[10px] font-extrabold text-white/80 transition-all cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Dynamic Category Links */}
                {storefrontCategories.filter(cat => cat !== 'All').map((cat) => (
                  <a
                    key={cat}
                    href="#products"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchQuery('');
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`transition-colors flex items-center space-x-1 whitespace-nowrap px-1.5 py-0.5 rounded-lg hover:text-[#26af5f] hover:bg-white/5
                      ${selectedCategory === cat ? 'text-[#26af5f] bg-[#26af5f]/10 font-black' : 'text-white/80'}`}
                  >
                    <span>
                      {cat === 'Football' ? 'ফুটবল ⚽' : 
                       cat === 'Cricket' ? 'ক্রিকেট 🏏' : 
                       cat === 'Activewear' ? 'অ্যাক্টিভওয়্যার 👕' : 
                       cat === 'Baby Category' ? 'বেবি কটন 🧸' : cat}
                    </span>
                  </a>
                ))}

                {/* Tracking Action */}
                <button 
                  onClick={() => {
                    setShowTracking(true);
                    setTrackedOrder(null);
                    setTrackingId('');
                  }} 
                  className="text-white hover:text-[#26af5f] transition-colors text-left cursor-pointer whitespace-nowrap"
                >
                  অর্ডার ট্র্যাকিং
                </button>

                {/* Premium Fabric Guarantee Link */}
                <a href="#about" className="text-white hover:text-[#26af5f] transition-colors hidden sm:inline-block whitespace-nowrap">প্রিমিয়াম ফেব্রিক গ্যারান্টি</a>
              </div>

              {/* Support Hotline Info Tag */}
              <div className="flex items-center space-x-1.5 text-[10px] text-white/80 font-black">
                <span className="animate-pulse h-2 w-2 rounded-full bg-[#26af5f]" />
                <span className="hidden sm:inline">সাপোর্ট হটলাইন:</span>
                <a href="tel:01792572306" className="text-[#26af5f] hover:underline">01792572306</a>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Immersive Sports Apparel Hero (2026 Auto-sliding Premium Banner) */}
      <section className="relative overflow-hidden pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        {(() => {
          const HERO_SLIDES = [
            {
              id: "JERSEY-001",
              title: "খেলার মাঠের শ্রেষ্ঠত্ব",
              subtitle: "Bangladesh Premium Cricket Jersey 2026",
              image: "https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200",
              badge: "Limited Edition - Buy Now",
              accentText: "বাংলাদেশ প্রিমিয়াম ক্রিকেট জার্সি ২০২৬",
              description: "জাতীয় দলের অফিশিয়াল ক্রিকেট জার্সি ২০২৬। চমৎকার সাব্লিমেশন প্রিন্ট এবং প্রিমিয়াম ডাবল-মেস আরামদায়ক অ্যাথলেটিক ফিট। ঘাম শোষণ ক্ষমতা সম্পন্ন এবং খেলা বা পরার জন্য অত্যন্ত উপযোগী।"
            },
            {
              id: "JERSEY-002",
              title: "কিংবদন্তির রেট্রো ম্যাজিক",
              subtitle: "Argentina Retro Edition '86",
              image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200",
              badge: "Exclusive Drop - 2026 Collection",
              accentText: "আর্জেন্টিনা রেট্রো এডিশন ১৯৮৬",
              description: "কিংবদন্তি ম্যারাডোনার ১৯৮৬ বিশ্বকাপের স্মারক জার্সি। চমৎকার ফেব্রিক কোয়ালিটি, এমব্রয়ডারি করা লোগো এবং ঐতিহ্যবাহী আকাশী-সাদা স্ট্রাইপ ডিজাইন।"
            },
            {
              id: "JERSEY-003",
              title: "ম্যাট ব্ল্যাক স্টেলথ লুক",
              subtitle: "Real Madrid Stealth Edition",
              image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200",
              badge: "Hot Seller - Trending Now",
              accentText: "রিয়াল মাদ্রিদ স্টেলথ ব্ল্যাক এডিশন",
              description: "রিয়াল মাদ্রিদের অল-ব্ল্যাক স্পেশাল লিমিটেড এডিশন কিট। ম্যাট ব্ল্যাক এমবস করা লোগো, গোল্ডেন কার্বন ফাইবার প্যাটার্ন অ্যাকসেন্ট এবং সম্পূর্ণ ঘাম নিরোধক অ্যাক্টিভ-কুল প্রযুক্তি।"
            },
            {
              id: "KIDS-COMBO-04",
              title: "শিশুদের রঙিন ও আরামদায়ক কালেকশন!",
              subtitle: "Kids & Baby Summer Special Cotton Combo",
              image: babyBannerUrl || "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=1200",
              badge: "NEW COMODITY - 100% COTTON",
              accentText: "কিউট কার্টুন, স্পেস ও ব্র্যান্ড থিম স্লিভলেস ট্যাংক টপ কম্বো সেট",
              description: "১০০% প্রিমিয়াম সুতি কাপড়ে তৈরি আমাদের বেবি ট্যাংক টপ কম্বো সেটগুলো অত্যন্ত সফট এবং গরমে শিশুদের আরামের কথা চিন্তা করে ডিজাইন করা। ৭টি সাইজ ভ্যারিয়েশন (১ থেকে ১৪ বছর) নিয়ে ৪ পিসের দুর্দান্ত সেট মাত্র ৬৯০ টাকায়!"
            }
          ];

          const activeSlide = HERO_SLIDES[currentSlide];

          const handleHeroCta = (productId: string) => {
            const found = allStoreProducts.find(p => p.id === productId);
            if (found) {
              handleAddToCart(found, undefined, true);
            } else {
              const el = document.getElementById('products');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          };

          return (
            <div className="relative rounded-[2.5rem] border border-[#eae5de] dark:border-[#28211c] overflow-hidden bg-neutral-100 dark:bg-[#181412]/80 shadow-2xl min-h-[460px] md:min-h-[520px] flex flex-col justify-between">
              
              {/* Backgound Image Slider Layer with Cross-fade and subtle scale zoom */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
                >
                  <img
                    src={activeSlide.image}
                    alt=""
                    className="w-full h-full object-cover filter blur-[2px]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14 relative z-10 w-full">
                
                {/* Dynamic animated text details on left */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest font-mono">
                        <Sparkles className="h-3.5 w-3.5 animate-pulse text-teal-500" />
                        <span>{activeSlide.badge}</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-sans">
                        {activeSlide.title} <br className="hidden sm:inline" />
                        <span className="text-teal-500">{activeSlide.subtitle}</span>
                      </h1>

                      <p className="text-xs sm:text-sm font-bold text-teal-600/90 dark:text-teal-400 font-mono">
                        ✨ {activeSlide.accentText}
                      </p>
                      
                      <p className="text-xs sm:text-sm opacity-75 leading-relaxed max-w-xl">
                        {activeSlide.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Micro features built into slider */}
                  <div className="hidden sm:grid grid-cols-3 gap-3 pt-2 max-w-lg">
                    <div className="p-2.5 rounded-xl border border-inherit bg-neutral-100/40 dark:bg-white/2 flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-teal-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] font-extrabold leading-tight">ড্রাই-ফিট প্রযুক্তি</span>
                        <span className="text-[8px] opacity-60">দ্রুত ঘাম শোষণ</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl border border-inherit bg-neutral-100/40 dark:bg-white/2 flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-teal-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] font-extrabold leading-tight">ক্যাশ অন ডেলিভারি</span>
                        <span className="text-[8px] opacity-60">সারাদেশে</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl border border-inherit bg-neutral-100/40 dark:bg-white/2 flex items-center space-x-2">
                      <ShieldCheck className="h-4 w-4 text-teal-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] font-extrabold leading-tight">প্রিমিয়াম কোয়ালিটি</span>
                        <span className="text-[8px] opacity-60">রিপ্লেসমেন্ট গ্যারান্টি</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Call To Actions */}
                  <div className="pt-4 flex items-center space-x-4">
                    <button 
                      onClick={() => handleHeroCta(activeSlide.id)}
                      className="px-6 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg shadow-teal-500/20 cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>সরাসরি অর্ডার করুন (Buy Now)</span>
                    </button>
                    <a 
                      href="#products"
                      className="px-6 py-3.5 rounded-xl border border-inherit hover:bg-neutral-200 dark:hover:bg-white/5 text-xs font-extrabold uppercase tracking-wider transition-all hidden sm:inline-block"
                    >
                      সব জার্সি দেখুন
                    </a>
                  </div>
                </div>

                {/* Right Column Image Banner Container (beautiful floating preview with responsive aspects) */}
                <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex justify-center">
                  <div className="absolute inset-0 bg-teal-500/10 rounded-[2.5rem] rotate-2 scale-105 blur-sm" />
                  
                  <div className="relative rounded-[2.5rem] border border-inherit overflow-hidden shadow-xl bg-white dark:bg-neutral-900 group w-full max-w-[320px] aspect-square flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={activeSlide.image} 
                        alt="Aura Lux Jersey Product" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
                      <span className="text-[9px] font-black tracking-widest text-teal-400 uppercase font-mono">Exclusive Drop 2026</span>
                      <h3 className="text-base font-black tracking-tight">{activeSlide.subtitle}</h3>
                    </div>
                  </div>
                </div>

              </div>

              {/* Slider Bottom Indicators & manual control arrows */}
              <div className="p-4 border-t border-inherit/60 flex items-center justify-between relative z-10 w-full">
                
                {/* Dots / capsule line trackers with active fills */}
                <div className="flex space-x-2.5 pl-4 sm:pl-8">
                  {HERO_SLIDES.map((_, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 relative overflow-hidden cursor-pointer
                          ${isActive ? 'w-10 bg-teal-500' : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'}`}
                        aria-label={`Slide ${idx + 1}`}
                      >
                        {isActive && (
                          <motion.span 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: 'linear' }}
                            className="absolute inset-y-0 left-0 bg-teal-600 rounded-full"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Left and Right Navigation arrows */}
                <div className="flex space-x-2 pr-4 sm:pr-8">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                    className="p-1.5 sm:p-2 rounded-lg border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Minus className="h-4 w-4 rotate-90" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="p-1.5 sm:p-2 rounded-lg border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4 rotate-90" />
                  </button>
                </div>

              </div>

            </div>
          );
        })()}
      </section>

      {/* Main Catalog Section */}
      <section id="products" className="py-16 border-t border-inherit px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        
        {/* Header and filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-2">
            <h2 className="text-2xl sm:text-3.5xl font-black tracking-tight">আমাদের স্পোর্টস কালেকশন</h2>
            <p className="text-xs sm:text-sm opacity-60">পছন্দের ক্যাটাগরি বেছে নিন এবং সরাসরি আপনার ঠিকানায় অর্ডার করুন</p>
          </div>

          {/* Filters */}
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none snap-x snap-mandatory flex-nowrap pb-2 gap-2 w-full md:flex-wrap md:overflow-visible">
            {storefrontCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border shrink-0 snap-center
                  ${selectedCategory === cat 
                    ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/10' 
                    : 'border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 opacity-80'}`}
              >
                {cat === 'All' ? 'সবগুলো পণ্য' : cat === 'Football' ? 'ফুটবল জার্সি ⚽' : cat === 'Cricket' ? 'ক্রিকেট জার্সি 🏏' : cat === 'Activewear' ? 'টি-শার্ট ও ইনার 👕' : cat === 'Baby Category' ? 'বেবি কালেকশন 🧸' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Banner for Kids/Baby category */}
        {selectedCategory === 'Baby Category' && (
          <div className="mb-12 relative rounded-[2.2rem] overflow-hidden border border-[#eae5de] dark:border-[#28211c] bg-neutral-100/60 dark:bg-[#181412]/60 shadow-xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: `url(${categoryBannerUrl || 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=1200'})` }} />
            <div className="flex-1 space-y-4 text-left relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-500/15 text-rose-500 text-[10px] font-black uppercase tracking-wider">
                🧸 Kids & Baby Summer Special
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-teal-600 dark:text-teal-400">
                শিশুদের রঙিন ও আরামদায়ক কালেকশন!
              </h3>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed max-w-xl">
                ১০০% প্রিমিয়াম সুতি কাপড়ে তৈরি আমাদের বেবি ট্যাংক টপ কম্বো সেটগুলো অত্যন্ত সফট এবং গরমে শিশুদের আরামের কথা চিন্তা করে ডিজাইন করা। একাধিক বৈচিত্র্যময় এবং কিউট ডিজাইনে উপলব্ধ।
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-[11px] font-black text-neutral-600 dark:text-neutral-400">
                <span className="flex items-center space-x-1"><span className="text-rose-500 text-sm">✔</span> <span>১০০% প্রিমিয়াম সুতি (GSM: 160-170)</span></span>
                <span className="flex items-center space-x-1"><span className="text-rose-500 text-sm">✔</span> <span>সফট প্রিমিয়াম প্রিন্টিং (DTF)</span></span>
                <span className="flex items-center space-x-1"><span className="text-rose-500 text-sm">✔</span> <span>৭টি সাইজ ভ্যারিয়েশন (১ থেকে ১৪ বছর)</span></span>
              </div>
            </div>
            <div className="w-full md:w-1/3 max-w-[280px] shrink-0 relative z-10">
              <img 
                src={categoryBannerUrl || "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=600"} 
                alt="Kids playing happily" 
                className="rounded-3xl object-cover shadow-lg aspect-[4/3] w-full border border-inherit bg-neutral-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Dynamic Custom Category Banner */}
        {selectedCategory !== 'All' && selectedCategory !== 'Baby Category' && categoryBannerUrl && (
          <div className="mb-12 relative rounded-[2.2rem] overflow-hidden border border-[#eae5de] dark:border-[#28211c] bg-[#1a1614]/40 backdrop-blur-md shadow-xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url(${categoryBannerUrl})` }} />
            <div className="flex-1 space-y-4 text-left relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-wider">
                ✨ {selectedCategory} Special Collection
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-teal-600 dark:text-teal-400">
                {selectedCategory} কালেকশন!
              </h3>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed max-w-xl">
                সরাসরি আমাদের কারখানায় তৈরি প্রিমিয়াম কোয়ালিটি পণ্য দিয়ে সাজানো হয়েছে এই বিশেষ ডায়নামিক কালেকশনটি। এখনই এক্সপ্লোর করুন!
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-[11px] font-black text-neutral-600 dark:text-neutral-400">
                <span className="flex items-center space-x-1"><span className="text-teal-500 text-sm">✔</span> <span>রিয়েল-টাইম লাইভ ডাটা কানেক্টেড</span></span>
                <span className="flex items-center space-x-1"><span className="text-teal-500 text-sm">✔</span> <span>১০০% প্রিমিয়াম সুতি কোয়ালিটি</span></span>
                <span className="flex items-center space-x-1"><span className="text-teal-500 text-sm">✔</span> <span>সারা বাংলাদেশে হোম ডেলিভারি</span></span>
              </div>
            </div>
            <div className="w-full md:w-1/3 max-w-[280px] shrink-0 relative z-10">
              <img 
                src={categoryBannerUrl} 
                alt={`${selectedCategory} Banner`} 
                className="rounded-3xl object-cover shadow-lg aspect-[16/9] md:aspect-[4/3] w-full border border-inherit bg-neutral-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Catalog Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {filteredProducts.map((p) => {
            const hasDiscount = p.originalPrice && p.originalPrice > p.price;
            const discountPct = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
            
            return (
              <div 
                key={p.id}
                className={`rounded-[1.2rem] sm:rounded-[1.8rem] border transition-all duration-300 group overflow-hidden flex flex-col justify-between text-left
                  ${themeMode === 'dark' ? 'bg-[#181412]/65 border-[#28211c] hover:border-[#3a3028]' : 'bg-white border-[#eae5de] hover:border-teal-500/40 shadow-sm hover:shadow-lg'}`}
              >
                {/* Visual Area */}
                <div 
                  className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-white/2 border-b border-inherit"
                >
                  <img 
                    src={p.image} 
                    alt={p.name}
                    onClick={() => { setViewingProduct(p); setSelectedDetailSize(p.sizes?.[0] || 'M'); }}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Absolute Wishlist heart icon button on top right of card visual area */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 h-7 sm:h-9 w-7 sm:w-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer z-10 shadow-lg"
                    title="পছন্দের তালিকায় রাখুন"
                  >
                    <Heart 
                      className="h-3.5 sm:h-4 w-3.5 sm:w-4 transition-colors" 
                    />
                  </button>
                  
                  {/* Badges */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col space-y-1 sm:space-y-2">
                    {p.isBestSeller && (
                      <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded sm:rounded-lg text-[7px] sm:text-[9px] font-black uppercase tracking-widest bg-amber-500 text-neutral-900 shadow-md">
                        Best Seller
                      </span>
                    )}
                    {p.isNewArrival && (
                      <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded sm:rounded-lg text-[7px] sm:text-[9px] font-black uppercase tracking-widest bg-teal-500 text-white shadow-md">
                        New
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded sm:rounded-lg text-[7px] sm:text-[9px] font-black uppercase tracking-widest bg-rose-500 text-white shadow-md">
                        -{discountPct}% OFF
                      </span>
                    )}
                  </div>

                  {/* Material rating tag bottom right */}
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-white text-[8px] sm:text-[10px] font-bold flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{p.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Info and button */}
                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 
                      onClick={() => { setViewingProduct(p); setSelectedDetailSize(p.sizes?.[0] || 'M'); }}
                      className="font-extrabold text-xs sm:text-sm tracking-tight leading-tight group-hover:text-teal-500 transition-colors line-clamp-1 truncate cursor-pointer"
                      title={p.name}
                    >
                      {p.name}
                    </h3>
                  </div>

                  {/* Price and Action row */}
                  <div className="pt-2 border-t border-dashed border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-sm sm:text-base font-black text-teal-500 block leading-none">
                        {formatCurrency(p.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[9px] sm:text-[10px] opacity-40 line-through leading-none block mt-0.5">
                          {formatCurrency(p.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-1 shrink-0 w-full sm:w-auto">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(p, undefined, false)}
                        className="flex-1 sm:flex-initial px-2 py-1.5 bg-neutral-100 dark:bg-white/5 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 text-teal-600 dark:text-teal-400 font-extrabold rounded-md sm:rounded-lg text-[9px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer border border-inherit/10"
                      >
                        <Plus className="h-3 w-3" />
                        <span>কার্ট</span>
                      </button>

                      {/* Instant Buy Button */}
                      <button
                        onClick={() => handleAddToCart(p, undefined, true)}
                        className="flex-1 sm:flex-initial px-2.5 py-1.5 bg-teal-500 hover:bg-teal-600 text-white font-black rounded-md sm:rounded-lg text-[9px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1 shadow-md shadow-teal-500/15 cursor-pointer"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        <span>কিনুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Premium Quality / Fabric details section */}
      <section id="about" className={`py-16 border-t border-inherit ${themeMode === 'dark' ? 'bg-[#15110f]/40' : 'bg-[#faf8f5]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">কেন আমাদের জার্সি সেরা?</h2>
            <p className="text-xs sm:text-sm opacity-60">আমরা গুণগত মানের ব্যাপারে কোনো আপোষ করিনা। আমাদের ফেব্রিকের বিশেষ সুবিধাসমূহ:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-[2.2rem] border text-left space-y-4
              ${themeMode === 'dark' ? 'bg-[#181412]/50 border-[#28211c]' : 'bg-white border-[#eae5de]'}`}
            >
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold">ড্রাই-ফিট ঘাম শোষক</h3>
              <p className="text-xs opacity-75 leading-relaxed">
                আমাদের উন্নত পলিয়েস্টার মাইক্রো-ফাইবার স্ট্রাকচার শরীরের ঘাম শোষণ করে বাইরের স্তরে পাঠিয়ে দেয়, যা দ্রুত বাষ্পীভূত হয় এবং শরীরকে শুষ্ক ও শীতল রাখে।
              </p>
            </div>

            <div className={`p-8 rounded-[2.2rem] border text-left space-y-4
              ${themeMode === 'dark' ? 'bg-[#181412]/50 border-[#28211c]' : 'bg-white border-[#eae5de]'}`}
            >
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold">হাই-রেজোলিউশন প্রিন্টিং</h3>
              <p className="text-xs opacity-75 leading-relaxed">
                ১০০% প্রিমিয়াম ইতালিয়ান সাব্লিমেশন কালার দিয়ে জার্সি প্রিন্ট করা হয়, যার ফলে শতবার ধোয়ার পরেও কালার ফেড বা ফ্যাকাশে হয়ে যায় না এবং ডিজাইন থাকে নতুনের মত।
              </p>
            </div>

            <div className={`p-8 rounded-[2.2rem] border text-left space-y-4
              ${themeMode === 'dark' ? 'bg-[#181412]/50 border-[#28211c]' : 'bg-white border-[#eae5de]'}`}
            >
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold">১০০% রিটার্ন গ্যারান্টি</h3>
              <p className="text-xs opacity-75 leading-relaxed">
                অর্ডার রিসিভ করার পর কোনো প্রকার সাইজ জটিলতা বা ডিফেক্ট থাকলে ৩ দিনের মধ্যে কোনো রকম বাড়তি খরচ ছাড়াই ফ্রি রিপ্লেসমেন্ট অথবা রিফান্ড সুবিধা দেওয়া হবে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-inherit pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-center space-y-6">
        {/* Address and Premium Glowing Social Media Buttons */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2 text-sm font-black text-neutral-800 dark:text-neutral-200">
            <MapPin className="h-4.5 w-4.5 text-teal-500 animate-pulse" />
            <span>Mirpur-13, Dhaka.</span>
          </div>
          
          <div className="flex justify-center items-center gap-5 pt-1">
            {/* Facebook Page Button */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-14 w-14 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(59,89,152,0.35)] group cursor-pointer"
              title="আমাদের ফেসবুক পেজ"
            >
              <Facebook className="h-6 w-6 text-[#3b5998] transition-transform duration-300 group-hover:scale-110" />
            </a>

            {/* Instagram Button */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-14 w-14 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(225,48,108,0.35)] group cursor-pointer"
              title="আমাদের ইন্সটাগ্রাম"
            >
              <Instagram className="h-6 w-6 text-[#e1306c] transition-transform duration-300 group-hover:scale-110" />
            </a>

            {/* WhatsApp Direct Message Button */}
            <a 
              href="https://wa.me/8801792572306?text=আসসালামু%20আলাইকুম!%20আমি%20জার্সি%20সম্পর্কে%20জানতে%20চাই।" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-14 w-14 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(37,211,102,0.35)] group cursor-pointer"
              title="সরাসরি হোয়াটসঅ্যাপ মেসেজ"
            >
              <MessageCircle className="h-6 w-6 text-[#25d366] transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
        </div>

        <div className="space-y-2 opacity-65 pt-4 border-t border-dashed border-inherit">
          <p className="font-bold">© {new Date().getFullYear()} Aura Lux Sports. All Rights Reserved.</p>
          <p>সরাসরি ক্যাশ অন ডেলিভারি (Cash on Delivery) ডেলিভারি ম্যানের কাছে টাকা পরিশোধের নিশ্চয়তা।</p>
        </div>

        <div className="flex justify-center space-x-6 pt-2">
          <button onClick={onGoToLogin} className="hover:text-teal-500 transition-colors font-bold flex items-center space-x-1 text-teal-500 cursor-pointer">
            <Lock className="h-3.5 w-3.5" />
            <span>অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</span>
          </button>
        </div>
      </footer>

      {/* SHOPPING CART & PAYMENT SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isOrdering) {
                  setShowCart(false);
                  setOrderSuccessData(null);
                }
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-lg h-full flex flex-col justify-between shadow-2xl overflow-hidden text-left
                ${themeMode === 'dark' ? 'bg-[#15110f] text-[#f6f3ed]' : 'bg-white text-[#2c2621]'}`}
            >
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-inherit flex items-center justify-between sticky top-0 z-10"
                style={{ backgroundColor: themeMode === 'dark' ? '#15110f' : '#ffffff' }}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-teal-500" />
                  <span className="font-extrabold text-sm sm:text-base tracking-tight uppercase">শপিং কার্ট ও চেকআউট (Shopping Cart)</span>
                </div>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setOrderSuccessData(null);
                  }}
                  disabled={isOrdering}
                  className="p-3 rounded-full border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* SUCCESS SCREEN */}
              {orderSuccessData ? (
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-start items-center text-center space-y-6 overflow-y-auto">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-bounce shrink-0">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-emerald-500">🎉 আপনার অর্ডারটি সফলভাবে গৃহীতো হয়েছে!</h3>
                    <p className="text-xs opacity-90 max-w-sm mx-auto leading-relaxed">
                      আমাদের কাছ থেকে কেনাকাটা করার জন্য আপনাকে অসংখ্য ধন্যবাদ। আপনার অর্ডারটি আমাদের সিস্টেমে যুক্ত হয়ে গেছে।
                    </p>
                  </div>

                  {/* Tracking Code Section */}
                  <div className="w-full p-4.5 rounded-2xl bg-teal-500/5 border border-teal-500/10 text-left space-y-2.5">
                    <div className="flex items-center space-x-2 text-xs font-black text-teal-600 dark:text-teal-400">
                      <ShoppingBag className="h-4 w-4 shrink-0" />
                      <span>📦 অর্ডার ট্র্যাকিং কোড:</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-neutral-100 dark:bg-white/5 p-3 rounded-xl border border-inherit">
                      <span id="order-track-code" className="font-mono font-black text-xs sm:text-sm select-all text-teal-500 tracking-wider">
                        {orderSuccessData.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyNumber(orderSuccessData.id)}
                        className="px-2.5 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center space-x-1 shrink-0"
                      >
                        {copiedNumber ? <span>কপি হয়েছে!</span> : <span>কপি করুন</span>}
                      </button>
                    </div>
                    
                    <p className="text-[10px] opacity-70 leading-relaxed text-center">
                      (এই কোডটি সংরক্ষণ করুন। এটি দিয়ে পরবর্তীতে আপনি আপনার অর্ডারের বর্তমান অবস্থা জানতে পারবেন)
                    </p>
                  </div>

                  {/* Delivery Update Section */}
                  <div className="w-full p-4.5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-inherit text-left space-y-1.5 text-xs" id="delivery-message-box">
                    {deliveryRegion === 'dhaka' ? (
                      <>
                        <div className="flex items-center space-x-2 font-black text-neutral-800 dark:text-neutral-200">
                          <Truck className="h-4 w-4 text-teal-500" />
                          <span className="font-bold">🚚 ডেলিভারি আপডেট (ঢাকার ভিতরে):</span>
                        </div>
                        <p className="opacity-80 leading-relaxed text-[11px]">
                          আমাদের ডেলিভারি পার্সন সর্বোচ্চ <strong>১ থেকে ২ দিনের মধ্যে</strong> আপনার পার্সেলটি নিয়ে আপনার ঠিকানায় পৌঁছে যাবে। খুব দ্রুত আপনি <strong>হোম ডেলিভারি</strong> পেয়ে যাচ্ছেন। অনুগ্রহ করে একটু ধৈর্য ধরে অপেক্ষা করুন এবং পার্সেলটি রিসিভ করুন। আমাদের সাথে থাকার জন্য ধন্যবাদ!
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 font-black text-neutral-800 dark:text-neutral-200">
                          <Truck className="h-4 w-4 text-teal-500" />
                          <span className="font-bold">🚚 ডেলিভারি আপডেট (ঢাকার বাইরে):</span>
                        </div>
                        <p className="opacity-80 leading-relaxed text-[11px]">
                          ঢাকার বাইরে সুন্দরবন বা রেডিয়েন্ট কুরিয়ারের মাধ্যমে সর্বোচ্চ <strong>২ থেকে ৩ দিনের মধ্যে</strong> পার্সেলটি আপনার এলাকায় পৌঁছে যাবে। কুরিয়ার অফিস থেকে আপনাকে ফোন করা হবে। দয়া করে একটু ধৈর্য ধরুন এবং কুরিয়ার থেকে পার্সেলটি যত্নসহকারে রিসিভ করুন। আপনার কেনাকাটা শুভ হোক!
                        </p>
                      </>
                    )}
                  </div>

                  {/* Order Items Info Summary */}
                  <div className="w-full p-3.5 rounded-xl border border-inherit/40 text-[11px] text-left space-y-2 opacity-80">
                    <div className="flex justify-between">
                      <span className="opacity-60">গ্রাহক:</span>
                      <span className="font-bold">{orderSuccessData.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">মোবাইল নাম্বার:</span>
                      <span className="font-bold">{orderSuccessData.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">মোট পরিশোধযোগ্য মূল্য:</span>
                      <span className="font-bold text-teal-500">{formatCurrency(orderSuccessData.total)}</span>
                    </div>
                  </div>

                  <div className="space-y-4 w-full pt-2">
                    <p className="text-xs font-extrabold text-teal-600 dark:text-teal-400">
                      কোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করতে পারেন। আপনার দিনটি শুভ হোক!
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCart(false);
                        setOrderSuccessData(null);
                      }}
                      className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-teal-500/10"
                    >
                      কেনাকাটা চালিয়ে যান
                    </button>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                /* EMPTY CART STATE */
                <div className="flex-1 p-8 flex flex-col justify-center items-center text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-400">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="font-black text-base">আপনার শপিং কার্ট খালি আছে</h3>
                  <p className="text-xs opacity-60 max-w-xs leading-relaxed">
                    কার্টে কোনো স্পোর্টস জার্সি বা প্রোডাক্ট যোগ করা হয়নি। জার্সি কালেকশন থেকে আপনার পছন্দের জার্সি নির্বাচন করে কার্টে যোগ করুন।
                  </p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-black rounded-xl transition-all cursor-pointer"
                  >
                    শপিং শুরু করুন
                  </button>
                </div>
              ) : (
                /* CHECKOUT AND LISTING FLOW */
                <form onSubmit={handlePlaceCartOrder} className="flex-1 flex flex-col justify-between h-full">
                  <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                    
                    {/* Cart Items List */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                        <span>আপনার কার্টের পণ্যসমূহ (Cart Items):</span>
                        <span className="text-teal-500">({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                      </span>
                      
                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                        {cart.map((item, index) => (
                          <div 
                            key={`${item.productId}-${item.size}-${index}`}
                            className="p-3.5 rounded-xl bg-neutral-100/50 dark:bg-white/2 border border-inherit flex items-center space-x-3 text-xs"
                          >
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                              <h4 className="font-extrabold line-clamp-1 text-xs">{item.name}</h4>
                              <div className="flex items-center space-x-2 text-[10px]">
                                <span className="opacity-50">সাইজ:</span>
                                <span className="font-black text-teal-500">{item.size}</span>
                                <span className="opacity-30">|</span>
                                <span className="opacity-60">{formatCurrency(item.price)}</span>
                              </div>
                            </div>
                            
                            {/* Quantity Adjusters */}
                            <div className="flex items-center space-x-2 border border-inherit rounded-lg px-1 py-0.5 bg-neutral-100 dark:bg-white/5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleUpdateCartQuantity(item.productId, item.size, -1)}
                                className="h-5 w-5 flex items-center justify-center hover:bg-teal-500/10 hover:text-teal-500 rounded transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="font-bold text-[11px] w-4 text-center">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateCartQuantity(item.productId, item.size, 1)}
                                className="h-5 w-5 flex items-center justify-center hover:bg-teal-500/10 hover:text-teal-500 rounded transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Remove Item */}
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(item.productId, item.size)}
                              className="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-colors text-neutral-400 shrink-0"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-inherit opacity-60" />

                    {/* Customer Info Form */}
                    <div className="space-y-4">
                      <span className="text-[11px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                        <User className="h-3.5 w-3.5 text-teal-500" />
                        <span>১. কাস্টমার ডেলিভারি তথ্য (Delivery Information):</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold opacity-75">আপনার সম্পূর্ণ নাম *</label>
                          <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="যেমন: তৌহিদুল ইসলাম"
                            className="w-full px-3.5 py-2 rounded-lg border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold opacity-75">মোবাইল নাম্বার (১১ ডিজিট) *</label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{11}"
                            maxLength={11}
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="যেমন: 017XXXXXXXX"
                            className="w-full px-3.5 py-2 rounded-lg border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold opacity-75">ডেলিভারি ঠিকানা (জেলা, থানা ও এলাকা উল্লেখ করুন) *</label>
                        <textarea
                          required
                          rows={2}
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="যেমন: বাসা #৪, ফ্ল্যাট #৩এ, রোড #৮, ধানমণ্ডি, ঢাকা"
                          className="w-full px-3.5 py-2 rounded-lg border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 resize-none"
                        />
                      </div>

                      {/* Delivery Area Picker */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold opacity-75">ডেলিভারি এলাকা নির্বাচন করুন:</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setDeliveryRegion('dhaka')}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer
                              ${deliveryRegion === 'dhaka' 
                                ? 'border-teal-500 bg-teal-500/5' 
                                : 'border-inherit hover:bg-neutral-50 dark:hover:bg-white/2'}`}
                          >
                            <span className="block font-black text-xs">ঢাকার ভেতরে</span>
                            <span className="text-[9px] opacity-65">চার্জ: ৳৮০ (২ দিন)</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setDeliveryRegion('outside')}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer
                              ${deliveryRegion === 'outside' 
                                ? 'border-teal-500 bg-teal-500/5' 
                                : 'border-inherit hover:bg-neutral-50 dark:hover:bg-white/2'}`}
                          >
                            <span className="block font-black text-xs">ঢাকার বাইরে</span>
                            <span className="text-[9px] opacity-65">চার্জ: ৳১৫০ (৩-৪ দিন)</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr className="border-inherit opacity-60" />

                    {/* Payment Mode Selection with required Transaction ID */}
                    <div className="space-y-4">
                      <span className="text-[11px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                        <CreditCard className="h-3.5 w-3.5 text-teal-500" />
                        <span>২. পেমেন্ট পদ্ধতি (Payment Methods) ও ট্রানজেকশন:</span>
                      </span>

                      {/* 2x2 Payment Methods Selection Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        
                        {/* Cash on Delivery (COD) Option */}
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentMethod('COD');
                            setTransactionId('');
                          }}
                          className={`p-3 rounded-xl border flex flex-col justify-between transition-all text-left relative cursor-pointer
                            ${paymentMethod === 'COD' 
                              ? 'border-teal-500 bg-teal-500/5 ring-1 ring-teal-500/30' 
                              : 'border-inherit hover:bg-neutral-100 dark:hover:bg-white/5'}`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-black">ক্যাশ অন ডেলিভারি</span>
                            <Truck className="h-4 w-4 text-teal-500" />
                          </div>
                          <span className="text-[9px] opacity-60 mt-1.5">পণ্য রিসিভ করার সময় পেমেন্ট</span>
                          {paymentMethod === 'COD' && (
                            <span className="absolute bottom-1 right-2 h-1.5 w-1.5 rounded-full bg-teal-500" />
                          )}
                        </button>

                        {/* bKash Payment Option */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bKash')}
                          className={`p-3 rounded-xl border flex flex-col justify-between transition-all text-left relative cursor-pointer
                            ${paymentMethod === 'bKash' 
                              ? 'border-[#e2136e] bg-[#e2136e]/5 ring-1 ring-[#e2136e]/30' 
                              : 'border-inherit hover:bg-neutral-100 dark:hover:bg-white/5'}`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-black text-[#e2136e] dark:text-pink-400">বিকাশ (bKash)</span>
                            <span className="text-[10px] bg-[#e2136e] text-white px-1 rounded font-bold">bK</span>
                          </div>
                          <span className="text-[9px] opacity-60 mt-1.5">সেন্ড মানি পেমেন্ট (Send Money)</span>
                          {paymentMethod === 'bKash' && (
                            <span className="absolute bottom-1 right-2 h-1.5 w-1.5 rounded-full bg-[#e2136e]" />
                          )}
                        </button>

                        {/* Nagad Payment Option */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('Nagad')}
                          className={`p-3 rounded-xl border flex flex-col justify-between transition-all text-left relative cursor-pointer
                            ${paymentMethod === 'Nagad' 
                              ? 'border-[#f15a22] bg-[#f15a22]/5 ring-1 ring-[#f15a22]/30' 
                              : 'border-inherit hover:bg-neutral-100 dark:hover:bg-white/5'}`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-black text-[#f15a22] dark:text-orange-400">নগদ (Nagad)</span>
                            <span className="text-[10px] bg-[#f15a22] text-white px-1 rounded font-bold">Nagad</span>
                          </div>
                          <span className="text-[9px] opacity-60 mt-1.5">সেন্ড মানি পেমেন্ট (Send Money)</span>
                          {paymentMethod === 'Nagad' && (
                            <span className="absolute bottom-1 right-2 h-1.5 w-1.5 rounded-full bg-[#f15a22]" />
                          )}
                        </button>

                        {/* Rocket / Card Option */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('Rocket')}
                          className={`p-3 rounded-xl border flex flex-col justify-between transition-all text-left relative cursor-pointer
                            ${paymentMethod === 'Rocket' 
                              ? 'border-[#8c3494] bg-[#8c3494]/5 ring-1 ring-[#8c3494]/30' 
                              : 'border-inherit hover:bg-neutral-100 dark:hover:bg-white/5'}`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-black text-[#8c3494] dark:text-purple-400 font-mono">রকেট / কার্ড</span>
                            <span className="text-[10px] bg-[#8c3494] text-white px-1 rounded font-bold">R</span>
                          </div>
                          <span className="text-[9px] opacity-60 mt-1.5">পার্সোনাল সেন্ড মানি (Rocket)</span>
                          {paymentMethod === 'Rocket' && (
                            <span className="absolute bottom-1 right-2 h-1.5 w-1.5 rounded-full bg-[#8c3494]" />
                          )}
                        </button>

                      </div>

                      {/* Displaying Personal Account Details based on selection */}
                      {paymentMethod !== 'COD' && (
                        <div className={`p-4 rounded-xl border space-y-3 animate-fadeIn text-xs
                          ${paymentMethod === 'bKash' ? 'bg-[#e2136e]/5 border-[#e2136e]/20 text-[#e2136e] dark:text-pink-300' :
                            paymentMethod === 'Nagad' ? 'bg-[#f15a22]/5 border-[#f15a22]/20 text-[#f15a22] dark:text-orange-300' :
                            'bg-[#8c3494]/5 border-[#8c3494]/20 text-[#8c3494] dark:text-purple-300'}`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-extrabold text-[11px] uppercase tracking-wide opacity-80">আমাদের পার্সোনাল অ্যাকাউন্ট নাম্বার:</p>
                              <p className="text-base font-black font-mono tracking-wider mt-0.5 select-all">
                                {paymentMethod === 'bKash' ? '01712-345678' :
                                 paymentMethod === 'Nagad' ? '01912-345678' :
                                 '01512-345678-9'}
                              </p>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => handleCopyNumber(
                                paymentMethod === 'bKash' ? '01712345678' :
                                paymentMethod === 'Nagad' ? '01912345678' :
                                '015123456789'
                              )}
                              className="px-2.5 py-1.5 rounded-lg border border-current hover:bg-current/10 flex items-center space-x-1.5 transition-all text-[10px] font-bold cursor-pointer shrink-0"
                            >
                              <Copy className="h-3 w-3" />
                              <span>{copiedNumber ? 'কপি হয়েছে!' : 'নাম্বার কপি'}</span>
                            </button>
                          </div>

                          <div className="space-y-1 leading-normal opacity-90 text-[11px]">
                            <p>১. আপনার ফোন থেকে পেমেন্ট পদ্ধতিটির অ্যাপে যান অথবা ডায়াল কোড ব্যবহার করুন।</p>
                            <p>২. উপরে প্রদত্ত নাম্বারে ৳<span className="font-extrabold">{grandTotal}</span> টাকা **Send Money** করুন।</p>
                            <p>৩. টাকা পাঠানো সফল হওয়ার পর যে **Transaction ID (TrxID)** পাবেন, তা প্রমাণস্বরূপ নিচের বক্সে বসান।</p>
                          </div>

                          {/* Required Transaction ID Input */}
                          <div className="space-y-1 pt-1 border-t border-current/20">
                            <label className="text-[10px] font-black uppercase tracking-wider block">
                              Transaction ID (ট্রানজেকশন আইডি) *
                            </label>
                            <input
                              type="text"
                              required={paymentMethod !== 'COD'}
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              placeholder="যেমন: K8H9L2P1"
                              className="w-full px-3 py-2 rounded-lg border border-current bg-transparent text-xs font-mono tracking-widest placeholder:opacity-50 uppercase focus:ring-1 focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                  {/* Calculations and submit action details footer */}
                  <div className="p-5 sm:p-6 border-t border-inherit bg-neutral-50 dark:bg-black/15 space-y-3 sticky bottom-0 z-20 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:relative">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between opacity-70">
                        <span>পণ্যের উপমোট (Subtotal):</span>
                        <span>{formatCurrency(itemsTotal)}</span>
                      </div>
                      <div className="flex justify-between opacity-70">
                        <span>ডেলিভারি চার্জ ({deliveryRegion === 'dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}):</span>
                        <span>{formatCurrency(shippingCost)}</span>
                      </div>
                      <div className="flex justify-between font-black text-sm pt-2 border-t border-dashed border-inherit text-teal-500">
                        <span>সর্বমোট বিল (Net Payable):</span>
                        <span>{formatCurrency(grandTotal)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isOrdering}
                      className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/15 cursor-pointer active:scale-95"
                    >
                      {isOrdering ? (
                        <>
                          <RefreshCcw className="h-4 w-4 animate-spin" />
                          <span>অর্ডার সম্পন্ন হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span>{paymentMethod === 'COD' ? 'অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)' : 'পেমেন্ট ও অর্ডার নিশ্চিত করুন'}</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[9px] text-center opacity-50 flex items-center justify-center space-x-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                      <span>{paymentMethod === 'COD' ? 'ডেলিভারি পাওয়ার পর চেক করে টাকা পরিশোধের ১০০% গ্যারান্টি।' : 'আপনার পেমেন্ট বিবরণ সম্পূর্ণ নিরাপদ ও সুরক্ষিত থাকবে।'}</span>
                    </p>
                  </div>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REAL-TIME ORDER TRACKING MODAL */}
      <AnimatePresence>
        {showTracking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTracking(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-lg rounded-[2.5rem] border p-6 shadow-2xl overflow-hidden text-left
                ${themeMode === 'dark' ? 'bg-[#15110f] text-[#f6f3ed] border-[#28211c]' : 'bg-white text-[#2c2621] border-[#eae5de]'}`}
            >
              <div className="flex items-center justify-between border-b border-inherit pb-4 mb-5">
                <div className="flex items-center space-x-2 font-extrabold">
                  <Truck className="h-5 w-5 text-teal-500" />
                  <span>অর্ডার ট্র্যাকিং সিস্টেম (Live Tracking)</span>
                </div>
                <button
                  onClick={() => setShowTracking(false)}
                  className="p-1.5 rounded-lg border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs opacity-75">
                  আপনার অর্ডারের সঠিক অবস্থা জানতে নিচে আপনার ৬ ডিজিটের অর্ডার আইডি (যেমন: ORD-123456) প্রদান করে ট্র্যাকিং বোতামে ক্লিক করুন।
                </p>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="অর্ডার আইডি (যেমন: ORD-483921)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 font-mono"
                  />
                  <button
                    onClick={handleTrackOrder}
                    className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-black rounded-xl transition-all font-sans"
                  >
                    ট্র্যাক করুন
                  </button>
                </div>

                {trackingError && (
                  <p className="text-[11px] text-rose-500 leading-normal bg-rose-500/5 p-3 rounded-xl border border-rose-500/10">
                    ⚠️ {trackingError}
                  </p>
                )}

                {/* Tracked Order Timeline Output */}
                {trackedOrder && (
                  <div className="space-y-4 pt-3">
                    <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-white/2 border border-inherit text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="opacity-50">গ্রাহক নাম:</span>
                        <span className="font-bold">{trackedOrder.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-50">পণ্য:</span>
                        <span className="font-bold line-clamp-1 max-w-xs">
                          {trackedOrder.items[0]?.name} ({trackedOrder.items[0]?.size})
                        </span>
                      </div>
                      <div className="flex justify-between text-teal-500 font-bold">
                        <span>অর্ডার স্ট্যাটাস:</span>
                        <span className="uppercase tracking-wider">
                          {trackedOrder.status === 'Pending' ? 'অপেক্ষমান (Pending)' : 
                           trackedOrder.status === 'Processing' ? 'প্যাকিং চলছে (Processing)' :
                           trackedOrder.status === 'Shipped' ? 'কুরিয়ারে পাঠানো হয়েছে (Shipped)' :
                           trackedOrder.status === 'Delivered' ? 'ডেলিভারি সম্পন্ন (Delivered)' : 
                           trackedOrder.status === 'Cancelled' ? 'বাতিলকৃত (Cancelled)' : trackedOrder.status}
                        </span>
                      </div>
                    </div>

                    {/* Timeline logs */}
                    <div className="space-y-3 pl-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-50 block">অর্ডারের টাইমলাইন ট্র্যাকিং:</span>
                      
                      <div className="relative border-l border-teal-500/20 pl-4 space-y-4">
                        {(trackedOrder.timeline || []).map((step: any, idx: number) => (
                          <div key={idx} className="relative">
                            {/* Bullet dot */}
                            <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-teal-500 border-2 border-white dark:border-neutral-900" />
                            <div className="text-xs">
                              <div className="flex items-center space-x-2">
                                <span className="font-extrabold text-teal-500 uppercase text-[10px] tracking-wider">{step.status}</span>
                                <span className="text-[9px] opacity-40 font-mono">{step.time}</span>
                              </div>
                              <p className="text-[11px] opacity-70 mt-0.5 leading-normal">{step.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. SIGN-UP AND OTP POP-UP MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`relative w-full max-w-md p-6 rounded-3xl shadow-2xl border transition-all z-10
                ${themeMode === 'dark' ? 'bg-[#15110f] border-[#2c241f] text-[#f6f3ed]' : 'bg-[#fcfbf9] border-[#eae5de] text-neutral-800'}`}
              id="authModal"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-neutral-500/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div id="signup-step" className="space-y-4">
                {/* Beautiful Accent Offer Block */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1 text-amber-600 dark:text-amber-400">
                  <p className="text-[11px] font-black leading-relaxed">
                    🎁 আমাদের পরিবারে যুক্ত হোন! পরবর্তী অর্ডারে স্পেশাল ডিসকাউন্ট পেতে এবং খুব দ্রুত অর্ডার ট্র্যাক করতে এখনই সাইন-আপ করতে পারেন।
                  </p>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-lg font-black tracking-tight font-sans">গ্রাহক সাইন-আপ (Customer Sign Up)</h3>
                  <p className="text-[11px] opacity-60">অ্যাকাউন্ট তৈরি করে প্রিমিয়াম সেবা উপভোগ করুন</p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-3 pt-1">
                  {/* Name input */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-wider opacity-65 flex items-center space-x-1">
                      <User className="h-3 w-3 text-teal-500" />
                      <span>নাম (Name) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      id="custName"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-inherit bg-transparent focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all"
                    />
                  </div>

                  {/* Email input */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-wider opacity-65 flex items-center space-x-1">
                      <Mail className="h-3 w-3 text-teal-500" />
                      <span>ইমেইল (Email) *</span>
                    </label>
                    <input
                      type="email"
                      required
                      id="custEmail"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-inherit bg-transparent focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all font-mono"
                    />
                  </div>

                  {/* Phone input */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-wider opacity-65 flex items-center space-x-1">
                      <Phone className="h-3 w-3 text-teal-500" />
                      <span>ফোন নাম্বার (Phone Number) *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      id="custPhone"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="যেমন: 01712345678"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-inherit bg-transparent focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 transition-all font-mono"
                    />
                  </div>

                  {/* Photo input (Optional) */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-wider opacity-65 flex items-center space-x-1">
                      <Upload className="h-3 w-3 text-teal-500" />
                      <span>📸 আপনার সুন্দর একটি ছবি দিন (ঐচ্ছিক)</span>
                    </label>
                    
                    <div className="flex items-center space-x-3 p-2 border border-dashed border-inherit rounded-xl hover:border-teal-500/50 transition-all relative">
                      <input
                        type="file"
                        id="custPhoto"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      <div className="h-10 w-10 rounded-full border border-teal-500 bg-neutral-100 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                        {signupPhotoUrl ? (
                          <img src={signupPhotoUrl} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-neutral-400" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold">একটি ছবি আপলোড করুন</p>
                        <p className="text-[8px] opacity-55">PNG, JPG অথবা WEBP ফাইল</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAuthModal(false)}
                      className="flex-1 py-3 bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                    >
                      পরে করব / ডাইরেক্ট শপিং
                    </button>
                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-lg shadow-teal-500/10 transition-all cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{isVerifying ? 'প্রোফাইল তৈরি হচ্ছে...' : 'সাইন-আপ সম্পূর্ণ করুন'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* 4K/8K High-Definition Magnifier Product Detail Modal Overlay */}
        {viewingProduct && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-4xl rounded-[2rem] md:rounded-[2.5rem] overflow-y-auto md:overflow-hidden max-h-[92vh] md:max-h-[640px] border shadow-2xl flex flex-col md:flex-row transition-colors duration-300
                ${themeMode === 'dark' ? 'bg-[#181412] border-[#28211c] text-[#f6f3ed]' : 'bg-[#fcfbfa] border-[#eae5de] text-[#111111]'}`}
            >
              {/* Floating Close button for mobile and desktop, highly visible, in thumb zone */}
              <button 
                onClick={() => setViewingProduct(null)}
                className="absolute top-4 right-4 z-50 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md shadow-lg border border-white/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
              {/* Left Column: Image Viewer with Interactive Lens Magnifier */}
              <div className="md:w-1/2 w-full flex flex-col items-center bg-neutral-100/30 dark:bg-black/10 border-b md:border-b-0 md:border-r border-inherit p-6 justify-center">
                <div 
                  className="relative aspect-square w-full max-w-[360px] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-white/2 border border-inherit cursor-crosshair select-none"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const bgX = (x / rect.width) * 100;
                    const bgY = (y / rect.height) * 100;
                    setLensPos({ x, y, bgX, bgY });
                  }}
                  onMouseEnter={() => setShowLens(true)}
                  onMouseLeave={() => setShowLens(false)}
                >
                  <img 
                    src={viewingProduct.image} 
                    alt={viewingProduct.name}
                    className="w-full h-full object-cover rounded-3xl"
                    referrerPolicy="no-referrer"
                  />

                  {/* 4K/8K high-definition dynamic zoom magnifier lens */}
                  {showLens && (
                    <div 
                      className="absolute pointer-events-none rounded-full border-2 border-teal-500 shadow-2xl w-36 h-36 bg-no-repeat"
                      style={{
                        left: `${lensPos.x - 72}px`,
                        top: `${lensPos.y - 72}px`,
                        backgroundImage: `url(${getHighResImage(viewingProduct.image)})`,
                        backgroundPosition: `${lensPos.bgX}% ${lensPos.bgY}%`,
                        backgroundSize: '350%', // 3.5x magnification for 4K/8K detail simulation
                      }}
                    />
                  )}
                </div>

                <div className="mt-4 flex items-center space-x-2 text-[10px] text-teal-600 dark:text-teal-400 font-bold bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/20">
                  <span className="animate-pulse">🔍</span>
                  <span>মাউস দিয়ে কলার, হাতা ও শোল্ডার জুম করে দেখুন (4K/8K রেজুলেশন লেন্স)</span>
                </div>

                {/* Five-Star Interactive Review Component */}
                <div className={`mt-5 w-full p-4 rounded-2xl border transition-all duration-300 ${
                  themeMode === 'dark' 
                    ? 'bg-[#1b1715] border-[#2e2621] text-[#f6f3ed]' 
                    : 'bg-[#faf8f5] border-[#eae5de] text-[#111111]'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold tracking-wide uppercase opacity-70">
                      পণ্যটির রিভিউ দিন (Product Review)
                    </span>
                    <span className="text-[10px] font-mono opacity-50">
                      {submittedReviews[viewingProduct.id] ? 'আপনার রেটিং সংরক্ষিত' : 'রেট করতে ক্লিক করুন'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = hoveredRating ? star <= hoveredRating : star <= (submittedReviews[viewingProduct.id] || 0);
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => {
                              const newReviews = { ...submittedReviews, [viewingProduct.id]: star };
                              setSubmittedReviews(newReviews);
                              localStorage.setItem('cottoon_user_reviews', JSON.stringify(newReviews));
                              setNotifications(prev => [
                                {
                                  id: `NOTIF-REV-${Date.now()}`,
                                  title: 'রিভিউ সফল হয়েছে!',
                                  message: `আপনি এই পণ্যটিকে ${star} স্টার রেটিং দিয়েছেন। ধন্যবাদ!`,
                                  timestamp: new Date().toISOString(),
                                  type: 'info',
                                  read: false
                                },
                                ...prev
                              ]);
                            }}
                            className="p-1 rounded-md transition-all duration-150 hover:scale-125 focus:outline-none cursor-pointer"
                          >
                            <Star
                              className={`h-6 w-6 transition-colors duration-150 ${
                                isFilled 
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]' 
                                  : 'text-neutral-300 dark:text-neutral-700 hover:text-amber-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex-1">
                      {submittedReviews[viewingProduct.id] ? (
                        <div className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 text-center animate-fade-in">
                          {submittedReviews[viewingProduct.id]} স্টার রেটিং! ধন্যবাদ ❤️
                        </div>
                      ) : (
                        <div className="text-xs opacity-60 text-center italic">
                          রিভিউ দিতে স্টার স্পর্শ করুন
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed info & video block */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto md:max-h-[580px] md:h-[580px] space-y-5">
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-widest uppercase text-teal-500 font-mono">
                      {viewingProduct.brand} • {viewingProduct.category}
                    </span>
                    <button 
                      onClick={() => setViewingProduct(null)}
                      className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <h2 className="text-lg md:text-xl font-black tracking-tight leading-snug mt-1.5">
                    {viewingProduct.name}
                  </h2>
                  <p className="text-[10px] opacity-40 font-mono mt-0.5">SKU: {viewingProduct.sku}</p>
                </div>

                {/* Price block */}
                <div className="flex items-baseline space-x-2.5">
                  <span className="text-2xl font-black text-teal-500">
                    {formatCurrency(viewingProduct.price)}
                  </span>
                  {viewingProduct.originalPrice > viewingProduct.price && (
                    <span className="text-xs opacity-50 line-through">
                      {formatCurrency(viewingProduct.originalPrice)}
                    </span>
                  )}
                  <span className="ml-2 text-[9px] font-extrabold uppercase bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-md">
                    স্টকে আছে
                  </span>
                </div>

                {/* Description info */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider opacity-75">বিস্তারিত বিবরণ:</h4>
                  <p className="text-xs opacity-70 leading-relaxed bg-neutral-100/40 dark:bg-white/2 p-3 rounded-2xl border border-inherit">
                    {viewingProduct.description}
                  </p>
                </div>

                {/* Specs list */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-neutral-100/40 dark:bg-white/2 p-2.5 rounded-2xl border border-inherit">
                    <span className="opacity-55 block text-[9px] font-bold">ফেব্রিক উপাদান</span>
                    <span className="font-extrabold text-teal-600 dark:text-teal-400">{viewingProduct.fabric || 'Premium Mesh'}</span>
                  </div>
                  <div className="bg-neutral-100/40 dark:bg-white/2 p-2.5 rounded-2xl border border-inherit">
                    <span className="opacity-55 block text-[9px] font-bold">প্যাকিং কালার</span>
                    <span className="font-extrabold">{viewingProduct.colors?.[0] || 'Premium Palette'}</span>
                  </div>
                </div>

                {/* Sizes selection */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider opacity-75 flex justify-between">
                    <span>সাইজ নির্বাচন করুন:</span>
                    <span className="text-[9px] text-teal-500 font-bold">
                      {viewingProduct.category === 'Baby Category' ? 'বেবি সাইজ গাইড' : 'অ্যাথলেটিক ফিট গাইড'}
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingProduct.sizes?.map((sz: string) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedDetailSize(sz)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                          selectedDetailSize === sz
                            ? 'bg-teal-500 border-teal-500 text-white shadow-md'
                            : 'border-inherit hover:bg-neutral-200 dark:hover:bg-white/5 opacity-80 text-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  {viewingProduct.category === 'Baby Category' && selectedDetailSize && (
                    <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 p-3 rounded-2xl border border-rose-500/20 text-xs font-bold space-y-1 mt-2">
                      <p className="flex justify-between">
                        <span>নির্বাচিত বয়সসীমা (Age):</span>
                        <span className="font-extrabold text-neutral-800 dark:text-white">{selectedDetailSize}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>বুকের মাপ (Chest):</span>
                        <span className="font-extrabold text-[#26af5f]">
                          {selectedDetailSize === '1-2 Years' && '22 inches'}
                          {selectedDetailSize === '3-4 Years' && '24 inches'}
                          {selectedDetailSize === '5-6 Years' && '26 inches'}
                          {selectedDetailSize === '7-8 Years' && '28 inches'}
                          {selectedDetailSize === '9-10 Years' && '30 inches'}
                          {selectedDetailSize === '11-12 Years' && '32 inches'}
                          {selectedDetailSize === '13-14 Years' && '34 inches'}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>দৈর্ঘ্য (Length/Long):</span>
                        <span className="font-extrabold text-[#26af5f]">
                          {selectedDetailSize === '1-2 Years' && '16 inches'}
                          {selectedDetailSize === '3-4 Years' && '18 inches'}
                          {selectedDetailSize === '5-6 Years' && '19 inches'}
                          {selectedDetailSize === '7-8 Years' && '20 inches'}
                          {selectedDetailSize === '9-10 Years' && '21 inches'}
                          {selectedDetailSize === '11-12 Years' && '22 inches'}
                          {selectedDetailSize === '13-14 Years' && '23 inches'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* YouTube Look Video embed */}
                {(() => {
                  const embedUrl = getCustomYouTubeEmbedUrl(viewingProduct.videoUrl);
                  if (!embedUrl) return null;
                  return (
                    <div className="space-y-2 pt-2 border-t border-dashed border-inherit">
                      <h4 className="text-[11px] font-extrabold uppercase tracking-wider opacity-75 flex items-center space-x-1.5">
                        <Play className="h-4 w-4 text-rose-500 fill-rose-500" />
                        <span>{viewingProduct.category === 'Baby Category' ? 'পোশাকের অরিজিনাল ভিডিও লুক:' : 'জার্সির অরিজিনাল ভিডিও লুক:'}</span>
                      </h4>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-inherit bg-black shadow-inner">
                        <iframe
                          src={embedUrl}
                          title={`${viewingProduct.name} Preview Video`}
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                          allowFullScreen
                        />
                      </div>
                      <p className="text-[8px] opacity-50 text-center">
                        *ভিডিওতে কাপড়ের প্রিমিয়াম বুনন, অরিজিনাল সেলাই ও প্রিমিয়াম ফিনিশিং লুকটি ফুটিয়ে তোলা হয়েছে।
                      </p>
                    </div>
                  );
                })()}

                {/* Modal actions */}
                <div className="flex gap-2.5 pt-4 border-t border-inherit">
                  <button
                    onClick={() => setViewingProduct(null)}
                    className="px-4 py-3 bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(viewingProduct, selectedDetailSize, false);
                      setViewingProduct(null);
                    }}
                    className="flex-1 py-3 bg-neutral-100 dark:bg-white/5 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 text-teal-600 dark:text-teal-400 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer border border-inherit/10"
                  >
                    <Plus className="h-4 w-4" />
                    <span>কার্ট এ রাখুন</span>
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(viewingProduct, selectedDetailSize, true);
                      setViewingProduct(null);
                    }}
                    className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1 shadow-md shadow-teal-500/15 cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>এখনই কিনুন</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* WISHLIST MODAL OVERLAY */}
      <AnimatePresence>
        {showWishlistModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWishlistModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-lg rounded-[2.5rem] border p-6 shadow-2xl overflow-hidden text-left flex flex-col max-h-[80vh] z-50
                ${themeMode === 'dark' ? 'bg-[#15110f] text-[#f6f3ed] border-[#28211c]' : 'bg-[#fcfbfa] text-[#111111] border-[#eae5de]'}`}
            >
              <div className="flex items-center justify-between border-b border-inherit pb-4 mb-4">
                <div className="flex items-center space-x-2 font-black text-sm text-[#26af5f]">
                  <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                  <span>আমার পছন্দের তালিকা ({wishlist.length})</span>
                </div>
                <button
                  onClick={() => setShowWishlistModal(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {wishlist.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="text-4xl text-neutral-300 dark:text-neutral-700 animate-pulse">❤️</div>
                    <p className="text-xs opacity-60">আপনার পছন্দের তালিকায় কোনো জার্সি নেই।</p>
                    <button
                      onClick={() => setShowWishlistModal(false)}
                      className="px-4 py-2 bg-[#26af5f] text-white text-[10px] font-black uppercase rounded-lg hover:bg-teal-600 cursor-pointer"
                    >
                      কালেকশন দেখুন
                    </button>
                  </div>
                ) : (
                  allStoreProducts
                    .filter(p => wishlist.includes(p.id))
                    .map(p => (
                      <div 
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-neutral-100/40 dark:bg-white/2 border border-inherit transition-all"
                      >
                        <div 
                          onClick={() => {
                            setViewingProduct(p);
                            setSelectedDetailSize(p.sizes?.[0] || 'M');
                            setShowWishlistModal(false);
                          }}
                          className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0"
                        >
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-11 h-11 object-cover rounded-xl border border-white/10 shrink-0 bg-neutral-900" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-extrabold truncate leading-tight">{p.name}</h4>
                            <p className="text-[10px] text-[#26af5f] font-bold font-mono">{formatCurrency(p.price)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 shrink-0">
                          <button
                            onClick={() => {
                              handleAddToCart(p, p.sizes?.[0] || 'M', true);
                              setShowWishlistModal(false);
                            }}
                            className="p-2 bg-[#26af5f]/10 hover:bg-[#26af5f] text-[#26af5f] hover:text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                            title="কার্ট এ যোগ করুন"
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-2 hover:bg-rose-500/15 text-neutral-400 hover:text-rose-500 rounded-xl transition-all cursor-pointer"
                            title="পছন্দের তালিকা থেকে বাদ দিন"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>

              {/* Modal Actions */}
              {wishlist.length > 0 && (
                <div className="pt-4 border-t border-inherit mt-4 flex gap-2">
                  <button
                    onClick={() => setWishlist([])}
                    className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer border border-rose-500/10"
                  >
                    সব ডিলিট করুন
                  </button>
                  <button
                    onClick={() => setShowWishlistModal(false)}
                    className="flex-1 py-2 bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* FLOATING WHATSAPP CUSTOMER SUPPORT BUTTON */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="fixed bottom-6 right-6 z-40 flex items-center group"
      >
        {/* Help tooltip message */}
        <span className="mr-3 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 dark:bg-[#15110f]/95 text-white dark:text-[#f6f3ed] text-[10px] font-black tracking-wide shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none uppercase hidden sm:inline-block">
          সাহায্য লাগবে? মেসেজ দিন
        </span>
        
        {/* Main interactive button */}
        <a
          href="https://wa.me/8801792572306?text=আসসালামু%20আলাইকুম!%20আমি%20জার্সি%20সম্পর্কে%20জানতে%20চাই।"
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer group"
          id="whatsapp-floating-support"
        >
          {/* Animated glowing rings */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40" />
          
          <MessageCircle className="h-6 w-6 relative z-10" />
        </a>
      </motion.div>

    </div>
  );
}
