import React, { useState, useMemo } from 'react';
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
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order, Notification, Customer, CustomerActivity, CustomerSegment } from '../types';
import { formatCurrency } from '../App';

interface CustomerStorefrontProps {
  products: Product[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  supabaseService: any;
  onGoToLogin: () => void;
  themeMode: 'light' | 'dark';
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
  }
];

export default function CustomerStorefront({
  products,
  orders,
  setOrders,
  setNotifications,
  supabaseService,
  onGoToLogin,
  themeMode
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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
  
  // Checkout Status State
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState<Order | null>(null);
  
  // Tracking State
  const [trackingId, setTrackingId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [trackingError, setTrackingError] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  // Merge default premium jerseys with sports/apparel products created from Dashboard to show everything
  const allStoreProducts = useMemo(() => {
    // Convert current products to storefront schema format
    const formattedDashboardProducts = products
      .filter(p => p.category === 'Apparel' || p.category === 'Football' || p.category === 'Cricket' || p.category === 'Activewear')
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
        brand: p.brand || 'Aura Lux'
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

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return allStoreProducts;
    return allStoreProducts.filter(p => p.category === selectedCategory);
  }, [allStoreProducts, selectedCategory]);

  const handleAddToCart = (product: any, sizeSelected?: string) => {
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
    setShowCart(true);
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
    
    setIsOrdering(true);
    
    const shippingCost = deliveryRegion === 'dhaka' ? 80 : 150;
    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = itemsTotal + shippingCost;
    
    // Generate order ID
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
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
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      timeline: [
        {
          status: 'New Order',
          timestamp: today,
          note: 'কাস্টমার ওয়েবসাইট থেকে কার্টের মাধ্যমে সরাসরি অর্ডার প্লেস করেছেন।'
        }
      ],
      internalNotes: `কার্ট থেকে সরাসরি রিসিভ করা হয়েছে। ডেলিভারি অঞ্চল: ${deliveryRegion === 'dhaka' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে'}`
    };

    try {
      // 1. Save directly to Supabase orders table
      await supabaseService.upsertOrder(orderPayload);
      
      // 2. Also save custom customer node to Supabase if possible to keep CRM active
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
            action: `কার্ট থেকে ${cart.length} টি পণ্য অর্ডার করেছেন।`,
            date: today
          }
        ],
        gender: 'Unisex',
        preferredSize: cart[0]?.size || 'M',
        favoriteCategory: cart[0]?.brand || 'Aura Lux',
        lastPurchaseDate: today
      };
      await supabaseService.upsertCustomer(newCustomer);

      // 3. Add notification to Supabase system
      const itemNames = cart.map(item => `${item.name} (${item.size}) x${item.quantity}`).join(', ');
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        title: `নতুন কার্ট অর্ডার! ${newOrderId}`,
        message: `${customerName} সরাসরি কার্ট থেকে অর্ডার করেছেন। পণ্য: ${itemNames}. বিল: ৳${grandTotal}`,
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
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
    } catch (err) {
      console.error("Order submission error:", err);
      // Fallback update to local memory state
      setOrders(prev => [orderPayload, ...prev]);
      setOrderSuccessData(orderPayload);
      setCart([]);
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
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#120e0c] text-[#f6f3ed]' : 'bg-[#faf8f5] text-[#2c2621]'} transition-colors duration-300 font-sans pb-20`}>
      
      {/* Dynamic Aura Gradient Lightspot */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#e07a5f]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Modern High-End Store Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 
        ${themeMode === 'dark' ? 'bg-[#120e0c]/85 border-[#28211c]' : 'bg-[#faf8f5]/85 border-[#eae5de]'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-2xl bg-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-teal-500/10">
              AL
            </div>
            <div>
              <span className="text-sm font-black tracking-widest uppercase block text-teal-500 font-mono">AURA LUX</span>
              <span className="text-[10px] tracking-widest font-extrabold uppercase opacity-60">Premium Sportswear</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider">
            <a href="#products" className="hover:text-teal-500 transition-colors">আমাদের কালেকশন</a>
            <button 
              onClick={() => {
                setShowTracking(true);
                setTrackedOrder(null);
                setTrackingId('');
              }} 
              className="hover:text-teal-500 transition-colors text-left"
            >
              অর্ডার ট্র্যাক করুন
            </button>
            <a href="#about" className="hover:text-teal-500 transition-colors">প্রিমিয়াম ফেব্রিক কোয়ালিটি</a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setShowTracking(true);
                setTrackedOrder(null);
                setTrackingId('');
              }}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 hover:bg-teal-500/10 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Search className="h-4.5 w-4.5 text-teal-500" />
              <span className="hidden sm:inline">ট্র্যাক করুন</span>
            </button>

            {/* Shopping Cart Trigger Icon */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 hover:bg-teal-500/10 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <ShoppingBag className="h-4.5 w-4.5 text-teal-500" />
              <span className="hidden sm:inline">কার্ট</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-md">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            
            <button
              onClick={onGoToLogin}
              className="px-4 py-2.5 rounded-xl border text-xs font-extrabold uppercase tracking-wider transition-all flex items-center space-x-2 
                hover:bg-teal-500 hover:text-white hover:border-teal-500 border-inherit"
            >
              <Lock className="h-3.5 w-3.5" />
              <span className="hidden md:inline">ড্যাশবোর্ড লগইন</span>
            </button>
          </div>
        </div>
      </header>

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
            }
          ];

          const activeSlide = HERO_SLIDES[currentSlide];

          const handleHeroCta = (productId: string) => {
            const found = allStoreProducts.find(p => p.id === productId);
            if (found) {
              handleAddToCart(found);
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
          <div className="flex flex-wrap gap-2">
            {storefrontCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border
                  ${selectedCategory === cat 
                    ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/10' 
                    : 'border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 opacity-80'}`}
              >
                {cat === 'All' ? 'সবগুলো পণ্য' : cat === 'Football' ? 'ফুটবল জার্সি ⚽' : cat === 'Cricket' ? 'ক্রিকেট জার্সি 🏏' : cat === 'Activewear' ? 'টি-শার্ট ও ইনার 👕' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const hasDiscount = p.originalPrice && p.originalPrice > p.price;
            const discountPct = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
            
            return (
              <div 
                key={p.id}
                className={`rounded-[2.2rem] border transition-all duration-300 group overflow-hidden flex flex-col justify-between text-left
                  ${themeMode === 'dark' ? 'bg-[#181412]/65 border-[#28211c] hover:border-[#3a3028]' : 'bg-white border-[#eae5de] hover:border-teal-500/40 shadow-sm hover:shadow-lg'}`}
              >
                {/* Visual Area */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-white/2 border-b border-inherit">
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {p.isBestSeller && (
                      <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-amber-500 text-neutral-900 shadow-md">
                        Best Seller
                      </span>
                    )}
                    {p.isNewArrival && (
                      <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-teal-500 text-white shadow-md">
                        New
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-rose-500 text-white shadow-md">
                        -{discountPct}% OFF
                      </span>
                    )}
                  </div>

                  {/* Material rating tag bottom right */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[10px] font-bold flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{p.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Info and button */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest uppercase text-teal-500 font-mono">
                      {p.brand} • {p.category}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug group-hover:text-teal-500 transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-[11px] opacity-60 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  {/* Size quick show */}
                  <div className="flex items-center space-x-1">
                    <span className="text-[9px] opacity-40 uppercase font-bold shrink-0 mr-1.5">Sizes:</span>
                    {p.sizes.map((sz: string) => (
                      <span key={sz} className="text-[9px] font-bold border border-inherit rounded px-1.5 py-0.5 opacity-60">
                        {sz}
                      </span>
                    ))}
                  </div>

                  {/* Price and Action row */}
                  <div className="pt-4 border-t border-dashed border-inherit flex items-center justify-between gap-3">
                    <div>
                      <span className="text-lg font-black text-teal-500 block leading-tight">
                        {formatCurrency(p.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[11px] opacity-40 line-through leading-none">
                          {formatCurrency(p.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="px-3.5 py-2.5 bg-neutral-100 dark:bg-white/5 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 text-teal-600 dark:text-teal-400 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer border border-inherit/10"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>কার্ট</span>
                      </button>

                      {/* Instant Buy Button */}
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center space-x-1 shadow-md shadow-teal-500/15 cursor-pointer"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
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
      <footer className="border-t border-inherit pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs opacity-60 text-center space-y-4">
        <p className="font-bold">© {new Date().getFullYear()} Aura Lux Sports. All Rights Reserved.</p>
        <p>সরাসরি ক্যাশ অন ডেলিভারি (Cash on Delivery) ডেলিভারি ম্যানের কাছে টাকা পরিশোধের নিশ্চয়তা।</p>
        <div className="flex justify-center space-x-6 pt-2">
          <button onClick={onGoToLogin} className="hover:text-teal-500 transition-colors font-bold flex items-center space-x-1 text-teal-500">
            <Lock className="h-3.5 w-3.5" />
            <span>অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</span>
          </button>
        </div>
      </footer>

      {/* INSTANT ORDER SLIDE-OVER DRAWER / MODAL */}
      <AnimatePresence>
        {cartProduct && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isOrdering) setCartProduct(null);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-md h-full flex flex-col justify-between shadow-2xl overflow-y-auto text-left
                ${themeMode === 'dark' ? 'bg-[#15110f] text-[#f6f3ed]' : 'bg-white text-[#2c2621]'}`}
            >
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-inherit flex items-center justify-between sticky top-0 bg-inherit z-10">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-teal-500" />
                  <span className="font-extrabold text-sm sm:text-base tracking-tight uppercase">সরাসরি অর্ডার করুন (Instant Checkout)</span>
                </div>
                <button
                  onClick={() => setCartProduct(null)}
                  disabled={isOrdering}
                  className="p-1.5 rounded-lg border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Success Screen OR checkout Form */}
              {orderSuccessData ? (
                /* SUCCESS SCREEN */
                <div className="flex-1 p-8 flex flex-col justify-center items-center text-center space-y-6">
                  <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-black tracking-tight text-emerald-500">আপনার অর্ডারটি সফল হয়েছে!</h3>
                    <p className="text-xs opacity-75">আমাদের স্টোরফ্রন্ট থেকে অর্ডার করার জন্য ধন্যবাদ। খুব শীঘ্রই আমাদের প্রতিনিধি কল করে কনফার্ম করবেন।</p>
                  </div>

                  <div className="w-full p-4.5 rounded-2xl bg-neutral-100 dark:bg-white/5 space-y-3.5 border border-inherit text-xs">
                    <div className="flex justify-between">
                      <span className="opacity-50">অর্ডার আইডি:</span>
                      <span className="font-mono font-bold select-all text-teal-500">{orderSuccessData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">গ্রাহক:</span>
                      <span className="font-bold">{orderSuccessData.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">মোবাইল নাম্বার:</span>
                      <span className="font-bold">{orderSuccessData.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">পণ্য:</span>
                      <span className="font-bold line-clamp-1 max-w-xs">{orderSuccessData.items[0]?.name} ({orderSuccessData.items[0]?.size})</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-inherit font-bold">
                      <span>মোট মূল্য (ডেলিভারিসহ):</span>
                      <span className="text-teal-500">{formatCurrency(orderSuccessData.total)}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-teal-500/5 text-[10px] text-teal-600 dark:text-teal-400 border border-teal-500/10 flex items-center space-x-2">
                    <Truck className="h-4 w-4 shrink-0" />
                    <span>ক্যাশ অন ডেলিভারি: ঢাকা সিটি ২ দিন, ঢাকার বাইরে ৩-৪ দিন।</span>
                  </div>

                  <button
                    onClick={() => setCartProduct(null)}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    আলাপ বন্ধ করুন এবং কেনাকাটা চালিয়ে যান
                  </button>
                </div>
              ) : (
                /* ORDER CHECKOUT FORM */
                <form onSubmit={handlePlaceOrder} className="flex-1 p-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Selected item mini preview */}
                    <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-white/2 border border-inherit flex space-x-4">
                      <img 
                        src={cartProduct.image} 
                        alt={cartProduct.name}
                        className="w-16 h-16 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1 text-xs">
                        <span className="text-[10px] uppercase font-bold text-teal-500 font-mono">{cartProduct.brand}</span>
                        <h4 className="font-extrabold line-clamp-1">{cartProduct.name}</h4>
                        <p className="text-teal-500 font-black">{formatCurrency(cartProduct.price)}</p>
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider opacity-60">সাইজ নির্বাচন করুন (Select Size):</label>
                      <div className="flex gap-2">
                        {cartProduct.sizes.map((sz: string) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`h-9 w-12 rounded-xl text-xs font-bold transition-all border
                              ${selectedSize === sz 
                                ? 'bg-teal-500 text-white border-teal-500' 
                                : 'border-inherit hover:bg-neutral-100 dark:hover:bg-white/5'}`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity counter */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider opacity-60">অর্ডারের পরিমাণ (Quantity):</label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-9 w-9 rounded-xl border border-inherit flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-bold text-sm w-8 text-center">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-9 w-9 rounded-xl border border-inherit flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                          <User className="h-3 w-3 text-teal-500" />
                          <span>আপনার সম্পূর্ণ নাম:</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="যেমন: তৌহিদুল ইসলাম"
                          className="w-full px-4 py-2.5 rounded-xl border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-teal-500" />
                          <span>মোবাইল নাম্বার (১১ ডিজিট):</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="যেমন: 01712345678"
                          className="w-full px-4 py-2.5 rounded-xl border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-teal-500" />
                          <span>ডেলিভারি ঠিকানা:</span>
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="যেমন: বাসা #৪, ফ্ল্যাট #৩এ, রোড #৮, ধানমণ্ডি, ঢাকা"
                          className="w-full px-4 py-2.5 rounded-xl border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 resize-none"
                        />
                      </div>
                    </div>

                    {/* Delivery charge toggler */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                        <Truck className="h-3 w-3 text-teal-500" />
                        <span>ডেলিভারি এলাকা:</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setDeliveryRegion('dhaka')}
                          className={`p-3 rounded-xl border text-left transition-all
                            ${deliveryRegion === 'dhaka' 
                              ? 'border-teal-500 bg-teal-500/5' 
                              : 'border-inherit hover:bg-neutral-50 dark:hover:bg-white/2'}`}
                        >
                          <span className="block font-bold text-xs">ঢাকার ভেতরে</span>
                          <span className="text-[10px] opacity-60">চার্জ: ৳৮০ (২ দিন)</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setDeliveryRegion('outside')}
                          className={`p-3 rounded-xl border text-left transition-all
                            ${deliveryRegion === 'outside' 
                              ? 'border-teal-500 bg-teal-500/5' 
                              : 'border-inherit hover:bg-neutral-50 dark:hover:bg-white/2'}`}
                        >
                          <span className="block font-bold text-xs">ঢাকার বাইরে</span>
                          <span className="text-[10px] opacity-60">চার্জ: ৳১৫০ (৩-৪ দিন)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calculations and submit */}
                  <div className="pt-6 border-t border-inherit space-y-4">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between opacity-70">
                        <span>জার্সি মূল্য:</span>
                        <span>{formatCurrency(cartProduct.price)} × {quantity}</span>
                      </div>
                      <div className="flex justify-between opacity-70">
                        <span>ডেলিভারি চার্জ:</span>
                        <span>{formatCurrency(deliveryRegion === 'dhaka' ? 80 : 150)}</span>
                      </div>
                      <div className="flex justify-between font-black text-sm pt-2 border-t border-dashed border-inherit text-teal-500">
                        <span>সর্বমোট বিল (Net Payable):</span>
                        <span>{formatCurrency((cartProduct.price * quantity) + (deliveryRegion === 'dhaka' ? 80 : 150))}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isOrdering}
                      className="w-full py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/15"
                    >
                      {isOrdering ? (
                        <>
                          <RefreshCcw className="h-4 w-4 animate-spin" />
                          <span>অর্ডার প্রসেস হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span>অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[9px] text-center opacity-50 flex items-center justify-center space-x-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-teal-500" />
                      <span>ডেলিভারি পাওয়ার পর চেক করে টাকা পরিশোধের ১০০% গ্যারান্টি।</span>
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

    </div>
  );
}
