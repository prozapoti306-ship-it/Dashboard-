import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_NOTIFICATIONS, 
  DEFAULT_STATS, 
  DEFAULT_SETTINGS 
} from './data/mockData';
import { 
  Product, 
  Order, 
  Customer, 
  Notification, 
  SystemSettings, 
  OrderStatus, 
  OrderItem,
  HomepageSettings,
  CourierSetting,
  TrackingSettings,
  Banner
} from './types';
import Sidebar from './components/Sidebar';
import CustomerStorefront from './components/CustomerStorefront';
import LoginPage from './components/LoginPage';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_HOMEPAGE_SETTINGS: HomepageSettings = {
  id: 'hero_banner',
  hero_title: 'খেলার মাঠের শ্রেষ্ঠত্ব',
  hero_subtitle: 'Bangladesh Premium Cricket Jersey 2026',
  hero_description: 'জাতীয় দলের অফিশিয়াল ক্রিকেট জার্সি ২০২৬। চমৎকার সাব্লিমেশন প্রিন্ট এবং প্রিমিয়াম ডাবল-মেস আরামদায়ক অ্যাথলেটিক ফিট। ঘাম শোষণ ক্ষমতা সম্পন্ন এবং খেলা বা পরার জন্য অত্যন্ত উপযোগী।',
  hero_image_url: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200'
};

const DEFAULT_BANNERS: Banner[] = [
  {
    id: 'banner_1',
    desktopImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200',
    mobileImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=600',
    title: 'খেলার মাঠের শ্রেষ্ঠত্ব',
    subtitle: 'Bangladesh Premium Cricket Jersey 2026',
    description: 'জাতীয় দলের অফিশিয়াল ক্রিকেট জার্সি ২০২৬। চমৎকার সাব্লিমেশন প্রিন্ট এবং প্রিমিয়াম ডাবল-মেস আরামদায়ক অ্যাথলেটিক ফিট। ঘাম শোষণ ক্ষমতা সম্পন্ন এবং খেলা বা পরার জন্য অত্যন্ত উপযোগী।',
    button1Text: 'সরাসরি অর্ডার করুন (Buy Now)',
    button1Link: '#products',
    button2Text: 'সব জার্সি দেখুন',
    button2Link: '#products',
    overlayColor: 'rgba(0,0,0,0.4)',
    textPosition: 'left',
    isActive: true,
    order: 1
  },
  {
    id: 'banner_2',
    desktopImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200',
    mobileImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600',
    title: 'কিংবদন্তির রেট্রো ম্যাজিক',
    subtitle: "Argentina Retro Edition '86",
    description: 'কিংবদন্তি ম্যারাডোনার ১৯৮৬ বিশ্বকাপের স্মারক জার্সি। চমৎকার ফেব্রিক কোয়ালিটি, এমব্রয়ডারি করা লোগো এবং ঐতিহ্যবাহী আকাশী-সাদা স্ট্রাইপ ডিজাইন।',
    button1Text: 'সরাসরি অর্ডার করুন (Buy Now)',
    button1Link: '#products',
    button2Text: 'সব জার্সি দেখুন',
    button2Link: '#products',
    overlayColor: 'rgba(0,0,0,0.5)',
    textPosition: 'center',
    isActive: true,
    order: 2
  },
  {
    id: 'banner_3',
    desktopImageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
    mobileImageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600',
    title: 'ম্যাট ব্ল্যাক স্টেলথ লুক',
    subtitle: 'Real Madrid Stealth Edition',
    description: 'রিয়াল মাদ্রিদের অল-ব্ল্যাক স্পেশাল লিমিটেড এডিশন কিট। ম্যাট ব্ল্যাক এমবস করা লোগো, গোল্ডেন কার্বন ফাইবার প্যাটার্ন অ্যাকসেন্ট এবং সম্পূর্ণ ঘাম নিরোধক অ্যাক্টিভ-কুল প্রযুক্তি।',
    button1Text: 'সরাসরি অর্ডার করুন (Buy Now)',
    button1Link: '#products',
    button2Text: 'সব জার্সি দেখুন',
    button2Link: '#products',
    overlayColor: 'rgba(0,0,0,0.6)',
    textPosition: 'right',
    isActive: true,
    order: 3
  }
];
// @ts-ignore
import trendZoneLogo from './assets/images/trend_zone_logo_1782968033190.jpg';
import { dbCache } from './lib/dbCache';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Check,
  XCircle, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit, 
  Download, 
  Printer, 
  User, 
  Users,
  Warehouse,
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  ArrowUpRight, 
  BadgeAlert, 
  Send, 
  Activity, 
  Briefcase, 
  FolderHeart, 
  ShieldAlert, 
  RefreshCcw,
  BookOpen,
  PieChart,
  HardDrive,
  Cpu,
  Layers,
  Key,
  Database,
  Code,
  Ticket,
  Gift,
  Coins,
  Settings,
  UserCheck,
  Undo2,
  HelpCircle,
  PlusSquare,
  PlusCircle,
  Upload,
  RotateCcw,
  AlertCircle,
  Menu,
  X,
  QrCode,
  Truck,
  Save,
  Tag,
  GripVertical,
  Eye,
  EyeOff,
  Layout,
  Edit3,
  Copy,
  Sliders,
  Calendar,
  Smartphone,
  Monitor,
  Globe,
  Facebook,
  Instagram
} from 'lucide-react';
import { supabaseService, supabase, mapOrderFromDb, mapProductFromDb, mapProductToDb } from './lib/supabaseService';



// Custom pure-CSS Barcode Widget for Thermal Label Printing
const BarcodeWidget = ({ value }: { value: string }) => {
  const numericOnly = value.replace(/[^0-9]/g, '') || "5428";
  const bars = [
    1, 2, 1, 3, 1, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 1, 1, 2, 2, 1, 1, 3, 1, 1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1
  ];
  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="flex items-stretch h-9 bg-black overflow-hidden select-none">
        {bars.map((bar, idx) => (
          <div
            key={idx}
            className={idx % 2 === 0 ? 'bg-black' : 'bg-white'}
            style={{ width: `${bar * 1.5}px` }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] tracking-[2.5px] text-black font-black mt-1 uppercase">
        {numericOnly || value}
      </span>
    </div>
  );
};

// Helper to format in Bangladeshi Taka format (e.g. ৳ 1,00,000)
export const formatCurrency = (amount: number): string => {
  return `৳ ${Math.floor(amount).toLocaleString('en-IN')}`;
};

// Helper to calculate discount percentage
export const calculateDiscountPercentage = (regular: string | number, sale: string | number): number => {
  const reg = Number(regular);
  const sl = Number(sale);
  if (!reg || reg <= 0 || !sl || sl <= 0 || sl >= reg) return 0;
  return Math.round(((reg - sl) / reg) * 100);
};

// Filter out products that were deleted locally (robust fallback safety)
export const filterDeletedProducts = (prods: Product[]): Product[] => {
  try {
    const deletedStr = localStorage.getItem('aura_deleted_product_ids');
    if (deletedStr) {
      const deletedIds = JSON.parse(deletedStr);
      if (Array.isArray(deletedIds) && deletedIds.length > 0) {
        const idSet = new Set(deletedIds);
        return prods.filter(p => !idSet.has(p.id));
      }
    }
  } catch (_) {}
  return prods;
};

// Filter out orders that were deleted locally (robust fallback safety)
export const filterDeletedOrders = (ords: Order[]): Order[] => {
  try {
    const deletedStr = localStorage.getItem('aura_deleted_order_ids');
    if (deletedStr) {
      const deletedIds = JSON.parse(deletedStr);
      if (Array.isArray(deletedIds) && deletedIds.length > 0) {
        const idSet = new Set(deletedIds);
        return ords.filter(o => !idSet.has(o.id));
      }
    }
  } catch (_) {}
  return ords;
};

// Check if a product is a legacy hardcoded demo product to prevent them from showing
export const isDemoProduct = (p: Product): boolean => {
  if (!p) return false;
  const id = String(p.id || '');
  const name = String(p.name || '');
  if (id.startsWith('PROD-00') || id.startsWith('JERSEY-') || id.startsWith('KIDS-COMBO-')) {
    return true;
  }
  const demoTitles = [
    "Aura Silk Trench Coat", "Monaco Calfskin Handbag", "Chiffon Summer Breeze Gown",
    "Vanguard Cashmere Knit", "Atelier Champagne Heels", "Monarque Velvet Smoking Blazer",
    "Bangladesh Premium Cricket Jersey 2026", "Argentina Retro Edition '86 Football Jersey",
    "Real Madrid Stealth Edition Jersey 26", "Aura Breathable Vent-Air Training Tee",
    "Brazil Classic Gold Samba Kit 2026", "Aura Strike-Force Compression Longsleeve",
    "Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo"
  ];
  return demoTitles.some(title => name.includes(title));
};

const getCourierStats = (phone: string) => {
  return {
    sf: { total: 0, success: 0, cancel: 0 },
    pt: { total: 0, success: 0, cancel: 0 },
    rx: { total: 0, success: 0, cancel: 0 },
    cw: { total: 0, success: 0, cancel: 0 },
    total: { total: 0, success: 0, cancel: 0 },
    successPercent: 0,
    cancelPercent: 0,
    status: 'No History'
  };
};

export default function App() {
  // --- Customer Storefront & Login State ---
  const [view, setView] = useState<'storefront' | 'login' | 'admin'>(() => {
    const saved = localStorage.getItem('aura_admin_authenticated');
    return saved === 'true' ? 'admin' : 'storefront';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aura_admin_authenticated') === 'true';
  });

  // --- Language switcher state & translator helper ---
  const [lang, setLang] = useState<'bn' | 'en'>(() => {
    try {
      const saved = localStorage.getItem('preferred_language');
      return (saved === 'bn' || saved === 'en') ? saved : 'bn';
    } catch (e) {
      return 'bn';
    }
  });
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const t = (bengali: string, english: string) => {
    return lang === 'bn' ? bengali : english;
  };

  useEffect(() => {
    localStorage.setItem('preferred_language', lang);
  }, [lang]);

  // --- Core State ---
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const cached = localStorage.getItem('aura_cached_products');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return filterDeletedProducts(parsed).filter(p => !isDemoProduct(p));
        }
      }
    } catch (e) {
      console.warn("Error reading cached products:", e);
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const cached = localStorage.getItem('aura_cached_orders');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out legacy mock orders containing "ORD-2026-" to starting fresh
          const realOrders = parsed.filter(o => !o.id.includes('ORD-2026-'));
          return filterDeletedOrders(realOrders);
        }
      }
    } catch (e) {
      console.warn("Error reading cached orders:", e);
    }
    return filterDeletedOrders(INITIAL_ORDERS);
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const cached = localStorage.getItem('aura_cached_customers');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out legacy mock customer IDs starting with CUST-00 or CUST-0
          const realCustomers = parsed.filter(c => !c.id.startsWith('CUST-00') && !c.id.startsWith('CUST-0'));
          return realCustomers;
        }
      }
    } catch (e) {
      console.warn("Error reading cached customers:", e);
    }
    return INITIAL_CUSTOMERS;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const cached = localStorage.getItem('aura_cached_notifications');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error reading cached notifications:", e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    try {
      const cached = localStorage.getItem('aura_cached_settings');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Error reading cached settings:", e);
    }
    return DEFAULT_SETTINGS;
  });

  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(() => {
    try {
      const cached = localStorage.getItem('aura_cached_homepage_settings');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Error reading cached homepage settings:", e);
    }
    return DEFAULT_HOMEPAGE_SETTINGS;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const cached = localStorage.getItem('aura_premium_banners');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Error reading cached premium banners:", e);
    }
    return DEFAULT_BANNERS;
  });

  const [bannerSlideInterval, setBannerSlideInterval] = useState<number>(() => {
    try {
      const cached = localStorage.getItem('aura_banner_slide_interval');
      if (cached) return Number(cached);
    } catch (_) {}
    return 3;
  });

  const updateBannerSlideInterval = async (val: number) => {
    setBannerSlideInterval(val);
    try {
      localStorage.setItem('aura_banner_slide_interval', val.toString());
    } catch (e) {
      console.warn("localStorage cache write failed for banner slide interval");
    }

    console.log(`[SYNC] Syncing Banner Slide Interval ${val}s to Supabase...`);
    try {
      // 1. Try 'settings' table first as per user's prompt instruction
      const { error: settingsError } = await supabase.from('settings').upsert({
        id: 'banner_slide_interval',
        value: String(val),
        updated_at: new Date().toISOString()
      });

      if (settingsError) {
        console.warn("Supabase upsert to 'settings' table failed (table may not exist yet, falling back):", settingsError.message);
        
        // 2. Fallback to 'system_settings' table
        const { error: fallbackError } = await supabase.from('system_settings').upsert({
          id: 'banner_slide_interval',
          tagline: JSON.stringify({ interval: val }),
          currency: 'BDT'
        });

        if (fallbackError) {
          console.error("Supabase fallback to 'system_settings' table also failed:", fallbackError.message);
        } else {
          console.log("Successfully synced interval to fallback 'system_settings' table.");
        }
      } else {
        console.log("Successfully synced interval to 'settings' table.");
      }
    } catch (err: any) {
      console.error("Failed to execute interval database sync:", err.message || err);
      // Inline catch-all fallback
      try {
        await supabase.from('system_settings').upsert({
          id: 'banner_slide_interval',
          tagline: JSON.stringify({ interval: val }),
          currency: 'BDT'
        });
      } catch (_) {}
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('aura_premium_banners', JSON.stringify(banners));
    } catch (e) {
      console.warn("localStorage cache write failed for premium banners");
    }
  }, [banners]);

  const DEFAULT_TRACKING_SETTINGS: TrackingSettings = {
    gtmContainerId: '',
    gtmServerUrl: '',
    metaPixelId: '',
    metaAccessToken: '',
    metaTestEventCode: '',
    tiktokPixelId: '',
    tiktokAccessToken: '',
    threadsPixelId: '',
    xPixelId: '',
    googleAnalyticsId: '',
  };

  const [trackingSettings, setTrackingSettings] = useState<TrackingSettings>(() => {
    try {
      const cached = localStorage.getItem('aura_tracking_settings');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Error reading cached tracking settings:", e);
    }
    return DEFAULT_TRACKING_SETTINGS;
  });
  const [isSavingTracking, setIsSavingTracking] = useState(false);

  const [isSavingBanner, setIsSavingBanner] = useState(false);
  const [isSavingIndividual, setIsSavingIndividual] = useState<Record<number, boolean>>({});
  const [bannerSaveStatus, setBannerSaveStatus] = useState<{ success: boolean; error?: string } | null>(null);

  // Synchronize state changes to IndexedDB and localStorage caches
  useEffect(() => {
    dbCache.set('aura_cached_homepage_settings', homepageSettings);
    try {
      localStorage.setItem('aura_cached_homepage_settings', JSON.stringify(homepageSettings));
    } catch (e) {
      console.warn("localStorage cache write failed for homepage settings");
    }
  }, [homepageSettings]);

  useEffect(() => {
    dbCache.set('aura_cached_products', products);
    try {
      localStorage.setItem('aura_cached_products', JSON.stringify(products));
    } catch (e) {
      console.warn("localStorage quota exceeded for products cache");
    }
  }, [products]);

  useEffect(() => {
    dbCache.set('aura_cached_orders', orders);
    try {
      localStorage.setItem('aura_cached_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn("localStorage cache write failed for orders");
    }
  }, [orders]);

  useEffect(() => {
    dbCache.set('aura_cached_customers', customers);
    try {
      localStorage.setItem('aura_cached_customers', JSON.stringify(customers));
    } catch (e) {
      console.warn("localStorage cache write failed for customers");
    }
  }, [customers]);

  useEffect(() => {
    dbCache.set('aura_cached_notifications', notifications);
    try {
      localStorage.setItem('aura_cached_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn("localStorage cache write failed for notifications");
    }
  }, [notifications]);

  useEffect(() => {
    dbCache.set('aura_cached_settings', settings);
    try {
      localStorage.setItem('aura_cached_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn("localStorage cache write failed for settings");
    }
  }, [settings]);

  // Google Tag Manager (GTM) Dynamic Script Injection & Cleanup (Supports Server-Side Tracking)
  useEffect(() => {
    const existingScript = document.getElementById('gtm-script-tag');
    if (existingScript) {
      existingScript.remove();
    }
    
    if (trackingSettings?.gtmContainerId) {
      const containerId = trackingSettings.gtmContainerId.trim();
      if (!containerId) return;

      let gtmDomain = 'https://www.googletagmanager.com';
      if (trackingSettings.gtmServerUrl) {
        let serverUrl = trackingSettings.gtmServerUrl.trim();
        if (serverUrl) {
          if (!serverUrl.startsWith('http://') && !serverUrl.startsWith('https://')) {
            serverUrl = 'https://' + serverUrl;
          }
          if (serverUrl.endsWith('/')) {
            serverUrl = serverUrl.slice(0, -1);
          }
          gtmDomain = serverUrl;
        }
      }

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      const f = document.getElementsByTagName('script')[0];
      const j = document.createElement('script');
      j.id = 'gtm-script-tag';
      j.async = true;
      j.src = `${gtmDomain}/gtm.js?id=${containerId}`;
      
      if (f && f.parentNode) {
        f.parentNode.insertBefore(j, f);
      } else {
        document.head.appendChild(j);
      }
      console.log(`[GTM Loader] GTM successfully initialized. Container ID: ${containerId}, Base Source: ${gtmDomain}`);
    }
  }, [trackingSettings?.gtmContainerId, trackingSettings?.gtmServerUrl]);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeSettingsTab, setActiveSettingsTab] = useState<string>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState<'sales' | 'profit' | 'customers' | 'status'>('sales');

  // --- Supabase State ---
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean;
    schemaCreated: boolean;
    loading: boolean;
    error: string | null;
  }>(() => {
    let hasCache = false;
    try {
      const cached = localStorage.getItem('aura_cached_products');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          hasCache = true;
        }
      }
    } catch (_) {}
    return {
      connected: false,
      schemaCreated: false,
      loading: !hasCache, // Zero-wait UI: if cache exists, don't show loading spinner
      error: null
    };
  });

  const [syncAlert, setSyncAlert] = useState<{
    message: string;
    type: 'success' | 'warning' | 'info';
  } | null>(null);

  // Auto-dismiss background sync alert toast
  useEffect(() => {
    if (syncAlert) {
      const timer = setTimeout(() => {
        setSyncAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [syncAlert]);

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingLogs, setSeedingLogs] = useState<string[]>([]);
  const [settingsSaveStatus, setSettingsSaveStatus] = useState<{ success: boolean; missingColumns?: boolean; error?: string } | null>(null);

  // --- Database & Multi-Store Isolation State ---
  const [customSupabaseUrl, setCustomSupabaseUrl] = useState(() => localStorage.getItem('aura_custom_supabase_url') || '');
  const [customSupabaseKey, setCustomSupabaseKey] = useState(() => localStorage.getItem('aura_custom_supabase_key') || '');
  const [storeTenantId, setStoreTenantId] = useState(() => localStorage.getItem('aura_store_tenant_id') || '');
  const [autoDomainIsolation, setAutoDomainIsolation] = useState(() => localStorage.getItem('aura_auto_domain_isolation') !== 'false');
  const [customDomainOverride, setCustomDomainOverride] = useState(() => localStorage.getItem('aura_custom_domain_override') || '');
  const [dbPingStatus, setDbPingStatus] = useState<{ testing: boolean; success?: boolean; message?: string; count?: number } | null>(null);


  // --- Filtering & Search ---
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<string>('All');
  const [customerSegmentFilter, setCustomerSegmentFilter] = useState<string>('All');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');
  const [productCollectionFilter, setProductCollectionFilter] = useState<string>('All');
  const [productSeasonFilter, setProductSeasonFilter] = useState<string>('All');
  const [productBrandFilter, setProductBrandFilter] = useState<string>('All');

  // --- Dynamic Category, Brand, & Collection Lists ---
  const [categoriesList, setCategoriesList] = useState<string[]>(['Apparel', 'Leather Goods', 'Footwear', 'Accessories', 'Eyewear']);
  const [brandsList, setBrandsList] = useState<string[]>(['Aura Lux', 'Monaco Atelier', 'Breeze Couture', 'Vanguard Knit', 'Atelier Luxe', 'Monarque Premium']);
  const [collectionsList, setCollectionsList] = useState<string[]>(['Eid Collection', 'Winter Collection', 'Summer Collection', 'New Arrival', 'Premium Collection']);
  const [seasonsList, setSeasonsList] = useState<string[]>(['Eid', 'Winter', 'Summer', 'All Season']);

  const [productSubTab, setProductSubTab] = useState<'catalog' | 'manager' | 'analytics' | 'homepage-designer'>('catalog');
  const [designerTab, setDesignerTab] = useState<'classic' | 'dynamic' | 'smart'>('classic');
  const [showClassicDesigner, setShowClassicDesigner] = useState(false);
  const [showDynamicDesigner, setShowDynamicDesigner] = useState(false);
  const [showSmartDesigner, setShowSmartDesigner] = useState(false);

  const [designerSuccessMessage, setDesignerSuccessMessage] = useState<string | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showSmartAdvancedSettings, setShowSmartAdvancedSettings] = useState(false);

  useEffect(() => {
    if (designerSuccessMessage) {
      const timer = setTimeout(() => {
        setDesignerSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [designerSuccessMessage]);

  const [dynamicSections, setDynamicSections] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_dynamic_sections_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Error reading cached dynamic sections config:", e);
    }
    return [
      { id: 'hero', name: 'Hero Banner', bengaliName: 'হিরো ব্যানার', visible: true, description: 'মাল্টি-স্লাইড প্রমোショナル ব্যানার', category: 'Hero & Visuals' },
      { id: 'categories', name: 'Categories', bengaliName: 'ক্যাটাগরি লিস্ট', visible: true, description: 'দ্রুত পণ্য ফিল্টারিং চিপস', category: 'Navigation' },
      { id: 'featured_products', name: 'Featured Products', bengaliName: 'ফিচার্ড প্রোডাক্টস', visible: true, description: 'নির্বাচিত আকর্ষণীয় জার্সি কালেকশন', category: 'Product Showcase' },
      { id: 'flash_sale', name: 'Flash Sale', bengaliName: 'ফ্ল্যাশ সেল প্যানেল', visible: true, description: 'কাউন্টডাউন সহ আকর্ষণীয় অফার', category: 'Promotions' },
      { id: 'collections', name: 'Collections', bengaliName: 'কালেকশনস গ্রিড', visible: true, description: 'বিশেষ কাস্টম ও থিমেটিক কালেকশন', category: 'Product Showcase' },
      { id: 'brand_logos', name: 'Brand Logos', bengaliName: 'ব্র্যান্ড লোগো ব্যান্ড', visible: true, description: 'অংশীদার ব্র্যান্ডের চমৎকার লোগো স্লাইডার', category: 'Social Proof' },
      { id: 'testimonials', name: 'Testimonials', bengaliName: 'গ্রাহকদের মতামত', visible: true, description: 'গ্রাহকদের রিভিউ ও ফিডব্যাক রিভিউ কার্ড', category: 'Social Proof' },
      { id: 'newsletter', name: 'Newsletter', bengaliName: 'নিউজলেটার সাবস্ক্রিপশন', visible: true, description: 'ইমেইল সাবস্ক্রিপশন ও অফার এলার্ট ফর্ম', category: 'Marketing' },
      { id: 'footer', name: 'Footer', bengaliName: 'ফুটার সেকশন', visible: true, description: 'যোগাযোগের ঠিকানা ও স্টোরের লিঙ্কসমূহ', category: 'Structure' },
    ];
  });
  const [selectedDynamicSection, setSelectedDynamicSection] = useState<string>('hero');
  const [previewingSectionId, setPreviewingSectionId] = useState<string | null>(null);
  const [showSettingsSectionId, setShowSettingsSectionId] = useState<string | null>(null);
  const [designerPreviewMode, setDesignerPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [designerPreviewSection, setDesignerPreviewSection] = useState<string | null>(null);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...dynamicSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSections.length) {
      const temp = newSections[index];
      newSections[index] = newSections[targetIndex];
      newSections[targetIndex] = temp;
      setDynamicSections(newSections);
    }
  };

  const [publishedTheme, setPublishedTheme] = useState<'classic' | 'dynamic' | 'smart'>(() => {
    try {
      const cached = localStorage.getItem('aura_published_theme');
      if (cached && ['classic', 'dynamic', 'smart'].includes(cached)) {
        return cached as 'classic' | 'dynamic' | 'smart';
      }
    } catch (e) {
      console.warn("Error reading cached published theme:", e);
    }
    return 'classic';
  });

  const [homepageSections, setHomepageSections] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem('aura_homepage_sections');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Error reading cached homepage sections:", e);
    }
    return [
      { id: 'hero', nameBangla: 'হিরো ব্যানার স্লাইডার (Hero Slider)', nameEnglish: 'Hero Banner Slider', visible: true },
      { id: 'products', nameBangla: 'স্পোর্টস ক্যাটালগ ও পণ্য গ্রিড (Product Catalog)', nameEnglish: 'Product Catalog Grid', visible: true },
      { id: 'about', nameBangla: 'কেন আমাদের জার্সি সেরা (Fabric Details)', nameEnglish: 'Fabric Details', visible: true }
    ];
  });

  const [smartTheme, setSmartTheme] = useState<any>(() => {
    try {
      const cached = localStorage.getItem('aura_smart_theme_settings');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Error reading cached smart theme settings:", e);
    }
    return {
      bannerBadge: 'AI RECOMMENDED',
      animation: 'fade',
      slideDuration: 5,
      priority: 'high',
      isDraft: false,
      isPreview: false
    };
  });

  const [smartBanners, setSmartBanners] = useState(() => {
    try {
      const cached = localStorage.getItem('aura_smart_banners');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Error reading cached smart banners:", e);
    }
    return [
      {
        id: 'sb_1',
        title: 'এআই কিউরেটেড রেট্রো কিটস',
        subtitle: 'Smart Recommendation Banner',
        description: 'গ্রাহকের পূর্ববর্তী ব্রাউজিং প্যাটার্ন অনুযায়ী স্বয়ংক্রিয়ভাবে রেট্রো জার্সিগুলো রিকমেন্ড করুন।',
        badge: 'Highly Recommended',
        animation: 'Slide Left (স্মুথ)',
        duration: 5,
        priority: 'High',
        status: 'Published',
        scheduleStart: '2026-07-11T12:00',
        scheduleEnd: '2026-07-18T12:00',
        desktopImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200',
      },
      {
        id: 'sb_2',
        title: 'মিডনাইট ফ্ল্যাশ ড্রপ',
        subtitle: 'Dynamic Customer Engagement',
        description: 'রাত ১২টা থেকে ৪টা পর্যন্ত সক্রিয় স্পেশাল লয়ালটি কুপন ও প্রমোশনাল অফার ব্যান্তর।',
        badge: 'Limited Edition',
        animation: 'Fade In (ধীর)',
        duration: 3,
        priority: 'Medium',
        status: 'Draft',
        scheduleStart: '2026-07-12T00:00',
        scheduleEnd: '2026-07-12T04:00',
        desktopImageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
      },
      {
        id: 'sb_3',
        title: 'সুপার ফ্যান প্রাইজ ড্রপ',
        subtitle: 'VIP Customer Exclusive',
        description: '১ বারের বেশি অর্ডার করা বিশ্বস্ত কাস্টমারদের জন্য স্বয়ংক্রিয় বিশেষ ৫% অতিরিক্ত ডিসকাউন্ট।',
        badge: 'VIP Only',
        animation: 'Scale Zoom (মডার্ন)',
        duration: 6,
        priority: 'Highest',
        status: 'Scheduled',
        scheduleStart: '2026-07-15T00:00',
        scheduleEnd: '2026-07-20T23:59',
        desktopImageUrl: 'https://images.unsplash.com/photo-1540747737956-378721767518?auto=format&fit=crop&q=80&w=1200',
      }
    ];
  });

  const [selectedSmartBanner, setSelectedSmartBanner] = useState<string>('sb_1');
  const [editingSmartBannerId, setEditingSmartBannerId] = useState<string | null>(null);
  const [smartBannerForm, setSmartBannerForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    badge: 'Highly Recommended',
    animation: 'Slide Left (স্মুথ)',
    duration: 5,
    priority: 'High',
    status: 'Published',
    scheduleStart: '2026-07-11T12:00',
    scheduleEnd: '2026-07-18T12:00',
    desktopImageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200',
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_published_theme', publishedTheme);
    } catch (e) {
      console.warn("localStorage write failed for published theme");
    }
  }, [publishedTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_homepage_sections', JSON.stringify(homepageSections));
    } catch (e) {
      console.warn("localStorage write failed for homepage sections");
    }
  }, [homepageSections]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_smart_theme_settings', JSON.stringify(smartTheme));
    } catch (e) {
      console.warn("localStorage write failed for smart theme settings");
    }
  }, [smartTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_smart_banners', JSON.stringify(smartBanners));
    } catch (e) {
      console.warn("localStorage write failed for smart banners");
    }
  }, [smartBanners]);

  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bannerIdToDelete, setBannerIdToDelete] = useState<string | null>(null);
  const [smartBannerIdToDelete, setSmartBannerIdToDelete] = useState<string | null>(null);
  const [bannerForm, setBannerForm] = useState<Partial<Banner>>({
    desktopImageUrl: '',
    mobileImageUrl: '',
    title: '',
    subtitle: '',
    description: '',
    button1Text: '',
    button1Link: '',
    button2Text: '',
    button2Link: '',
    overlayColor: 'rgba(0,0,0,0.4)',
    textPosition: 'left',
    isActive: true,
    order: 1
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');

  // --- Selection & Modal States ---
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [shouldTriggerPrint, setShouldTriggerPrint] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Courier selection state
  const [selectedCourier, setSelectedCourier] = useState<{ courier: string; order: Order } | null>(null);
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [showSuccessTick, setShowSuccessTick] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Global Fraud Checker state and hook
  const [fraudCheckResult, setFraudCheckResult] = useState<any>(null);
  const [isFraudChecking, setIsFraudChecking] = useState<boolean>(false);

  useEffect(() => {
    if (!showCourierModal) {
      setIsBooking(false);
      setBookingError(null);
    }
  }, [showCourierModal]);

  useEffect(() => {
    if (editingOrder && editingOrder.customerPhone) {
      setIsFraudChecking(true);
      setFraudCheckResult(null);
      
      fetch("/api/courier/fraud-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone: editingOrder.customerPhone })
      })
        .then(res => {
          if (!res.ok) throw new Error("API call failed");
          return res.json();
        })
        .then(data => {
          setFraudCheckResult(data);
        })
        .catch(err => {
          console.error("Failed to run global fraud checker:", err);
          setFraudCheckResult({
            phone: editingOrder.customerPhone,
            sf: { total: 0, success: 0, cancel: 0 },
            pt: { total: 0, success: 0, cancel: 0 },
            rx: { total: 0, success: 0, cancel: 0 },
            cw: { total: 0, success: 0, cancel: 0 },
            total: { total: 0, success: 0, cancel: 0 },
            successPercent: 0,
            cancelPercent: 0,
            status: 'No History'
          });
        })
        .finally(() => {
          setIsFraudChecking(false);
        });
    } else {
      setFraudCheckResult(null);
      setIsFraudChecking(false);
    }
  }, [editingOrder?.customerPhone]);

  // Courier API credentials integration states
  const [courierSettingsList, setCourierSettingsList] = useState<CourierSetting[]>([]);
  const [newCourierName, setNewCourierName] = useState('Steadfast Courier');
  const [newCourierApiKey, setNewCourierApiKey] = useState('');
  const [newCourierClientId, setNewCourierClientId] = useState('');
  const [newCourierSecretKey, setNewCourierSecretKey] = useState('');
  const [newCourierDefaultWeight, setNewCourierDefaultWeight] = useState('0.5');
  const [newCourierDefaultNote, setNewCourierDefaultNote] = useState('[INVO_CUSTOMER_NOTE]');
  const [showAddCourierRow, setShowAddCourierRow] = useState(false);

  // Effect to trigger window.print() after order is loaded and DOM updates
  useEffect(() => {
    if (selectedOrder && shouldTriggerPrint) {
      const timer = setTimeout(() => {
        window.print();
        setShouldTriggerPrint(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [selectedOrder, shouldTriggerPrint]);
  
  // Product Form Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: 'Apparel',
    price: 0,
    originalPrice: 0,
    stock: 10,
    image: '',
    sizes: 'S, M, L, XL',
    colors: 'Charcoal Black, Warm White',
    fabric: 'Premium Cotton Blend',
    sku: '',
    collection: 'New Arrival',
    season: 'All Season',
    brand: 'Aura Lux',
    productCost: 0,
    deliveryCost: 0,
    discount: 0,
    marketingCost: 0,
    videoUrl: ''
  });

  // New Bulk Upload State
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [bulkUploadForm, setBulkUploadForm] = useState({
    title: 'Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo',
    regularPrice: '990',
    salePrice: '690',
    details: 'Fabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: প্রিমিয়াম ১০০% কটন দিয়ে তৈরি আমাদের ৪ পিসের এই স্টাইলিশ ট্যাংক টপ কম্বো সেটটি আপনার আদরের সোনামণির জন্য গরমে অত্যন্ত আরামদায়ক। এর সফট ফেব্রিক বাচ্চার ত্বকের জন্য খুবই নিরাপদ ও মসৃণ।',
    sizes: '1-2 Years, 3-4 Years, 5-6 Years, 7-8 Years, 9-10 Years, 11-12 Years, 13-14 Years',
    images: [] as string[],
    category: 'Baby Category',
    categoryBannerUrl: '',
    videoUrl: ''
  });

  // New Mixed Upload State
  const [showMixedUploadModal, setShowMixedUploadModal] = useState(false);
  const [mixedUploadForm, setMixedUploadForm] = useState({
    title: '',
    regularPrice: '',
    salePrice: '',
    description: '',
    category: 'Baby Category',
    image: '',
    sizes: '1-2 Years, 3-4 Years, 5-6 Years, 7-8 Years, 9-10 Years, 11-12 Years, 13-14 Years',
    fabric: '100% Cotton (GSM 160-170)',
    brand: 'Trend Zone Baby',
    stock: '50'
  });

  // SKU QR Code state
  const [activeQrProduct, setActiveQrProduct] = useState<Product | null>(null);

  // --- Dynamic ERP Feature Lists ---
  const [collectionsData, setCollectionsData] = useState([
    { id: 'eid', name: 'Eid Collection', sales: 1250450, profit: 450200, itemsCount: 15, season: 'Eid', status: 'Active' },
    { id: 'winter', name: 'Winter Collection', sales: 845200, profit: 310500, itemsCount: 22, season: 'Winter', status: 'Draft' },
    { id: 'summer', name: 'Summer Collection', sales: 945600, profit: 340200, itemsCount: 18, season: 'Summer', status: 'Active' },
    { id: 'new-arrival', name: 'New Arrival', sales: 1560700, profit: 580400, itemsCount: 10, season: 'All Season', status: 'Active' },
    { id: 'premium', name: 'Premium Collection', sales: 2450800, profit: 980300, itemsCount: 8, season: 'All Season', status: 'Active' }
  ]);

  const [returnsData, setReturnsData] = useState([
    { id: 'RET-001', customerName: 'ইমরান খান', phone: '01712-345678', date: '2026-06-15', productName: 'Aura Silk Trench Coat', refundAmount: 185000, reason: 'Size doesn\'t fit, requesting L instead of M', status: 'Pending Approval' },
    { id: 'RET-002', customerName: 'আনিকা চৌধুরী', phone: '01819-234567', date: '2026-06-10', productName: 'Luna Silk Wrap Dress', refundAmount: 12500, reason: 'Fabric shade minor variation', status: 'Refunded' },
    { id: 'RET-003', customerName: 'তামিম ইকবাল', phone: '01911-345678', date: '2026-06-08', productName: 'Vanguard Knit Hoodie', refundAmount: 8500, reason: 'Changed mind', status: 'Rejected' }
  ]);

  const [staffData, setStaffData] = useState([
    { name: 'আরিফ রহমান', email: 'arif@auralux.com', role: 'Admin', status: 'Active', permissions: 'Full Access' },
    { name: 'সাদিয়া ইসলাম', email: 'sadia@auralux.com', role: 'Shop Manager', status: 'Active', permissions: 'Orders & Inventory' },
    { name: 'কবির আহমেদ', email: 'kabir@auralux.com', role: 'Support Team', status: 'Active', permissions: 'Customer CRM & Ticketing' },
    { name: 'মেহেদী হাসান', email: 'mehedi@auralux.com', role: 'Inventory Specialist', status: 'Active', permissions: 'Stock Controls only' }
  ]);

  useEffect(() => {
    dbCache.set('aura_cached_collections', collectionsData);
  }, [collectionsData]);

  useEffect(() => {
    dbCache.set('aura_cached_returns', returnsData);
  }, [returnsData]);

  useEffect(() => {
    dbCache.set('aura_cached_staff', staffData);
  }, [staffData]);

  const [ticketsData, setTicketsData] = useState([
    { id: 'TCK-4819', subject: 'WooCommerce Order Status Sync Timeout', category: 'Syncing', priority: 'High', status: 'Open', date: '2026-06-25' },
    { id: 'TCK-4815', subject: 'Printer alignment mismatch for PDF Invoice', category: 'Printing', priority: 'Medium', status: 'In Progress', date: '2026-06-24' },
    { id: 'TCK-4809', subject: 'bKash IPN callback failure confirmation', category: 'Payment Gateways', priority: 'Critical', status: 'Resolved', date: '2026-06-22' }
  ]);

  // --- Notification Sidebar ---
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);

  // --- AI Chat Assistant Drawer State ---
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; timestamp: string }>>([
    { 
      sender: 'assistant', 
      text: 'হ্যালো! আমি আপনার Aura Lux AI অ্যাসিস্ট্যান্ট। আমি আপনার বেচাবিক্রি, ইনভেন্টরি লেভেল এবং কাস্টমার রিলেশনশিপ ডেটা পর্যালোচনা করতে পারি। আজকের সেলস কেমন হলো জানতে চান নাকি কোনো VIP কাস্টমারের উইন-ব্যাক ক্যাম্পেইন ড্রাফট করতে চান?', 
      timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- Automated Reports (Gemini Powered) ---
  const [aiAnalysisType, setAiAnalysisType] = useState<'sales' | 'behavior' | 'general'>('sales');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);

  // Bulk selections for orders
  const [bulkSelectedOrders, setBulkSelectedOrders] = useState<string[]>([]);

  // CRM Customer and Order Notes states
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerForm, setCustomerForm] = useState<Partial<Customer>>({
    name: '',
    phone: '',
    email: '',
    address: '',
    gender: 'Male',
    birthday: '',
    preferredSize: '',
    favoriteColor: '',
    favoriteCategory: '',
    totalSpending: 0,
    ordersCount: 0,
    lastPurchaseDate: '',
    segment: 'New',
    shirtSize: 'M',
    pantSize: '32',
    shoeSize: '41',
    customerValueScore: 70,
    buyingPatternAnalysis: '',
    nextPurchasePrediction: ''
  });
  const [tempInternalNotes, setTempInternalNotes] = useState('');

  useEffect(() => {
    if (selectedOrder) {
      setTempInternalNotes(selectedOrder.internalNotes || '');
    } else {
      setTempInternalNotes('');
    }
  }, [selectedOrder?.id]);

  // --- Marketing & Loyalty States ---
  const [marketingSubTab, setMarketingSubTab] = useState<'campaigns' | 'segments' | 'offers' | 'loyalty'>('campaigns');
  const [coupons, setCoupons] = useState([
    { code: 'WELCOME20', discount: 20, type: 'percentage', status: 'active', usageCount: 48 },
    { code: 'CARTRECOVERY15', discount: 15, type: 'percentage', status: 'active', usageCount: 22 },
    { code: 'BBDAY30', discount: 30, type: 'percentage', status: 'active', usageCount: 12 },
    { code: 'VIPCLUB25', discount: 25, type: 'percentage', status: 'active', usageCount: 31 },
    { code: 'WINBACK10', discount: 10, type: 'percentage', status: 'active', usageCount: 15 }
  ]);
  const [campaignsList, setCampaignsList] = useState([
    { id: 'CAMP-01', name: 'Welcome Message', trigger: 'New Registration', sentCount: 154, openRate: 82, conversionRate: 14.5, status: 'Active' as const },
    { id: 'CAMP-02', name: 'Abandoned Cart Reminder', trigger: 'Cart Idle 1 hour', sentCount: 89, openRate: 65, conversionRate: 18.2, status: 'Active' as const },
    { id: 'CAMP-03', name: 'Birthday Offer', trigger: 'Customer Birthday', sentCount: 43, openRate: 91, conversionRate: 28.5, status: 'Active' as const },
    { id: 'CAMP-04', name: 'Win Back Campaign', trigger: 'Inactive 60 days', sentCount: 78, openRate: 48, conversionRate: 9.1, status: 'Active' as const },
    { id: 'CAMP-05', name: 'VIP Customer Offer', trigger: 'Value Score > 85', sentCount: 32, openRate: 98, conversionRate: 34.4, status: 'Active' as const }
  ]);
  const [couponForm, setCouponForm] = useState({ code: '', discount: 15, type: 'percentage', status: 'active' });

  // --- Inventory History & Profit States ---
  const [inventorySubTab, setInventorySubTab] = useState<'list' | 'analytics' | 'history'>('list');
  const [inventoryHistory, setInventoryHistory] = useState([
    { id: 'INV-H-001', productId: 'PROD-001', productName: 'Aura Silk Trench Coat', size: 'M', color: 'Champagne Gold', type: 'Restock' as const, quantity: 15, timestamp: '2026-06-27 10:15', note: 'সরাসরি ম্যানুফ্যাকচারার স্টক থেকে ইনপুট।' },
    { id: 'INV-H-002', productId: 'PROD-003', productName: 'Chiffon Summer Breeze Gown', size: 'S', color: 'Pastel Rose', type: 'Sale' as const, quantity: -1, timestamp: '2026-06-26 10:15', note: 'অর্ডার ORD-2026-9042 এর কারণে স্টক হ্রাস।' },
    { id: 'INV-H-003', productId: 'PROD-005', productName: 'Atelier Champagne Heels', size: '38', color: 'Classic Silver', type: 'Adjustment' as const, quantity: -2, timestamp: '2026-06-25 14:00', note: 'ড্যামেজ চেক এবং ডিসপ্লে রিটার্ন সমন্বয়।' },
    { id: 'INV-H-004', productId: 'PROD-002', productName: 'Monaco Calfskin Handbag', size: 'One Size', color: 'Soft Beige', type: 'Restock' as const, quantity: 10, timestamp: '2026-06-24 16:30', note: 'লজিস্টিক ইম্পোর্ট লট ৪ রি-স্টক।' }
  ]);

  // WordPress / WooCommerce Integration states
  const [wpActiveSubTab, setWpActiveSubTab] = useState<'explorer' | 'terminal' | 'database'>('terminal');
  const [wpCodeFile, setWpCodeFile] = useState<string>('main');
  const [syncStatusState, setSyncStatusState] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [syncConsoleLogs, setSyncConsoleLogs] = useState<string[]>([
    "[SYSTEM] AURA-LUX WooCommerce Core initialized successfully.",
    "[STATUS] Waiting for sync request... Credentials validated successfully.",
    "[SECURE] REST API Client Nonce verification layer: READY."
  ]);

  // Scroll chat bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, aiAssistantOpen]);

  // ==========================================
  // SUPABASE LOADING, SYNCING & REALTIME EFFECTS
  // ==========================================

  // 0. Instantly load all caches from IndexedDB (Zero-Wait UI mount stage)
  useEffect(() => {
    async function loadIndexedDBCaches() {
      try {
        const cachedProducts = await dbCache.get('aura_cached_products');
        if (cachedProducts && Array.isArray(cachedProducts) && cachedProducts.length > 0) {
          const filtered = filterDeletedProducts(cachedProducts);
          setProducts(filtered);
          prevProductsRef.current = cachedProducts;
          // Stop loading spinner immediately since we have products to show
          setSupabaseStatus(prev => ({ ...prev, loading: false }));
        }

        const cachedOrders = await dbCache.get('aura_cached_orders');
        if (cachedOrders && Array.isArray(cachedOrders) && cachedOrders.length > 0) {
          setOrders(filterDeletedOrders(cachedOrders));
          prevOrdersRef.current = cachedOrders;
        }

        const cachedCustomers = await dbCache.get('aura_cached_customers');
        if (cachedCustomers && Array.isArray(cachedCustomers) && cachedCustomers.length > 0) {
          setCustomers(cachedCustomers);
          prevCustomersRef.current = cachedCustomers;
        }

        const cachedNotifications = await dbCache.get('aura_cached_notifications');
        if (cachedNotifications && Array.isArray(cachedNotifications) && cachedNotifications.length > 0) {
          setNotifications(cachedNotifications);
          prevNotificationsRef.current = cachedNotifications;
        }

        const cachedSettings = await dbCache.get('aura_cached_settings');
        if (cachedSettings) {
          setSettings(cachedSettings);
          prevSettingsRef.current = cachedSettings;
        }

        const cachedHomepageSettings = await dbCache.get('aura_cached_homepage_settings');
        if (cachedHomepageSettings) {
          setHomepageSettings(cachedHomepageSettings);
        }

        const cachedCourierSettings = await dbCache.get('aura_cached_courier_settings');
        if (cachedCourierSettings && Array.isArray(cachedCourierSettings) && cachedCourierSettings.length > 0) {
          setCourierSettingsList(cachedCourierSettings);
        }

        const cachedTrackingSettings = await dbCache.get('aura_tracking_settings');
        if (cachedTrackingSettings) {
          setTrackingSettings(cachedTrackingSettings);
        }

        const cachedCollections = await dbCache.get('aura_cached_collections');
        if (cachedCollections && Array.isArray(cachedCollections) && cachedCollections.length > 0) {
          setCollectionsData(cachedCollections);
          prevCollectionsRef.current = cachedCollections;
        }

        const cachedReturns = await dbCache.get('aura_cached_returns');
        if (cachedReturns && Array.isArray(cachedReturns) && cachedReturns.length > 0) {
          setReturnsData(cachedReturns);
          prevReturnsRef.current = cachedReturns;
        }

        const cachedStaff = await dbCache.get('aura_cached_staff');
        if (cachedStaff && Array.isArray(cachedStaff) && cachedStaff.length > 0) {
          setStaffData(cachedStaff);
          prevStaffRef.current = cachedStaff;
        }
      } catch (err) {
        console.warn("Failed to load IndexedDB caches on mount:", err);
      }
    }
    loadIndexedDBCaches();
  }, []);
  
  // 1. Initial Load of all data from Supabase (Optimized for Speed)
  useEffect(() => {
    async function initSupabase() {
      // Step 1: Immediately render cached products from local Express cache if they weren't in localStorage
      fetch('/api/products')
        .then(res => res.json())
        .then(cacheData => {
          if (Array.isArray(cacheData) && cacheData.length > 0) {
            const mapped = cacheData.map(mapProductFromDb);
            const filtered = filterDeletedProducts(mapped);
            // Only update state if currently empty to avoid overwriting newer local state
            setProducts(prev => {
              if (prev.length === 0 && filtered.length > 0) {
                prevProductsRef.current = mapped;
                return filtered;
              }
              return prev;
            });
          }
        })
        .catch(err => console.warn("Local Express cache fetch failed:", err));

      try {
        // Step 2: Instant Connection Check (<50ms) to unblock the Zero-Wait UI
        const conn = await supabaseService.checkConnection();
        
        setSupabaseStatus({
          connected: conn.connected,
          schemaCreated: conn.schemaCreated,
          loading: false, // ZERO-WAIT UI: never lock up the user with a spinner
          error: conn.connected ? null : (conn.error || 'Connection failed')
        });

        if (!conn.connected || !conn.schemaCreated) {
          if (conn.connected && !conn.schemaCreated) {
            setSupabaseStatus(prev => ({
              ...prev,
              error: 'সুপাবেজে প্রয়োজনীয় টেবিলগুলো খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সেটিংস ট্যাব থেকে "Initialize Database" বাটনে ক্লিক করে টেবিলগুলো তৈরি এবং প্রথমবার ডাটা পুশ করুন।'
            }));
          }
          return;
        }

        // Step 3: Run Background Revalidations individually (No single blocking Promise.all)
        
        // Products Background Sync & Update Comparison
        supabaseService.getProducts(INITIAL_PRODUCTS)
          .then(async (dbProducts) => {
            if (dbProducts && dbProducts.length > 0) {
              // Get current cached items
              let localCached: Product[] = [];
              try {
                localCached = (await dbCache.get('aura_cached_products')) || [];
                if (localCached.length === 0) {
                  const cached = localStorage.getItem('aura_cached_products');
                  if (cached) localCached = JSON.parse(cached);
                }
              } catch (_) {}

              const filteredDb = filterDeletedProducts(dbProducts);
              const filteredCached = filterDeletedProducts(localCached);

              // Merge filteredDb with filteredCached so locally added products are never lost
              const mergedMap = new Map<string, Product>();
              filteredDb.forEach(p => mergedMap.set(p.id, p));
              filteredCached.forEach(p => {
                if (!mergedMap.has(p.id)) {
                  mergedMap.set(p.id, p);
                  // Ensure missing local product is pushed to Supabase
                  supabaseService.upsertProduct(p).catch(() => {});
                }
              });
              const mergedList = Array.from(mergedMap.values());

              const mergedListStr = JSON.stringify(mergedList);
              const cachedProductsStr = JSON.stringify(filteredCached);

              if (mergedListStr !== cachedProductsStr || localCached.length === 0) {
                console.log("[BG-SYNC] Products changed in database or local cache, updating state...");
                setProducts(mergedList);
                prevProductsRef.current = mergedList;
                dbCache.set('aura_cached_products', mergedList);
                localStorage.setItem('aura_cached_products', JSON.stringify(mergedList));

                // Trigger beautiful top-right floating sync success toast
                setSyncAlert({
                  message: "🔄 প্রোডাক্ট ডাটাবেজ ব্যাকগ্রাউন্ডে সফলভাবে সিঙ্ক্রোনাইজড হয়েছে! নতুন আপডেট বা স্টক এখন দৃশ্যমান।",
                  type: 'success'
                });

                // Add to internal system notifications
                const newNotif: Notification = {
                  id: `SYNC-PROD-${Date.now()}`,
                  title: "ইনভেন্টরি ব্যাকগ্রাউন্ড সিঙ্ক",
                  message: "সুপাবেজ ডাটাবেজ থেকে সর্বশেষ প্রোডাক্ট স্টক এবং ডিসক্রিপশন ব্যাকগ্রাউন্ডে আপডেট করা হয়েছে।",
                  type: "success",
                  timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
                  read: false
                };
                setNotifications(prev => [newNotif, ...prev]);
              } else {
                console.log("[BG-SYNC] Products are completely up to date with Supabase.");
              }
            }
          })
          .catch(err => console.warn("Background product sync failed:", err));

        // Settings Background Sync
        supabaseService.getSettings(DEFAULT_SETTINGS)
          .then(dbSettings => {
            if (dbSettings) {
              setSettings(dbSettings);
              prevSettingsRef.current = dbSettings;
              dbCache.set('aura_cached_settings', dbSettings);
              localStorage.setItem('aura_cached_settings', JSON.stringify(dbSettings));
            }
          }).catch(err => console.warn("Bg settings sync failed:", err));

        // Orders Background Sync
        supabaseService.getOrders(INITIAL_ORDERS)
          .then(dbOrders => {
            if (dbOrders) {
              const filtered = filterDeletedOrders(dbOrders);
              setOrders(filtered);
              prevOrdersRef.current = dbOrders;
              dbCache.set('aura_cached_orders', filtered);
              localStorage.setItem('aura_cached_orders', JSON.stringify(filtered));
            }
          }).catch(err => console.warn("Bg orders sync failed:", err));

        // Customers Background Sync
        supabaseService.getCustomers(INITIAL_CUSTOMERS)
          .then(dbCustomers => {
            if (dbCustomers) {
              setCustomers(dbCustomers);
              prevCustomersRef.current = dbCustomers;
              dbCache.set('aura_cached_customers', dbCustomers);
              localStorage.setItem('aura_cached_customers', JSON.stringify(dbCustomers));
            }
          }).catch(err => console.warn("Bg customers sync failed:", err));

        // Notifications Background Sync
        supabaseService.getNotifications(INITIAL_NOTIFICATIONS)
          .then(dbNotifications => {
            if (dbNotifications) {
              setNotifications(dbNotifications);
              prevNotificationsRef.current = dbNotifications;
              dbCache.set('aura_cached_notifications', dbNotifications);
              localStorage.setItem('aura_cached_notifications', JSON.stringify(dbNotifications));
            }
          }).catch(err => console.warn("Bg notifications sync failed:", err));

        // Auxiliary Lists
        supabaseService.getCategories(categoriesList).then(db => db && setCategoriesList(db)).catch(() => {});
        supabaseService.getBrands(brandsList).then(db => db && setBrandsList(db)).catch(() => {});
        supabaseService.getCollectionsList(collectionsList).then(db => db && setCollectionsList(db)).catch(() => {});

        // Fetch Banner Slide Interval and Premium Banners from Supabase on mount!
        (async () => {
          try {
            console.log("[SYNC] Fetching banner slide interval and premium banners from Supabase...");
            
            // 1. Try fetching from 'settings' table first (user's preferred table)
            let loadedInterval: number | null = null;
            try {
              const { data: settingsData, error: settingsError } = await supabase
                .from('settings')
                .select('value')
                .eq('id', 'banner_slide_interval')
                .maybeSingle();
              
              if (!settingsError && settingsData && settingsData.value) {
                loadedInterval = Number(settingsData.value);
                console.log("[SYNC] Loaded banner slide interval from 'settings' table:", loadedInterval);
              }
            } catch (err) {
              console.warn("Could not fetch from 'settings' table (expected if settings table does not exist):", err);
            }

            // 2. If not loaded from 'settings' table, try 'system_settings'
            if (loadedInterval === null) {
              try {
                const { data: sysData, error: sysError } = await supabase
                  .from('system_settings')
                  .select('tagline')
                  .eq('id', 'banner_slide_interval')
                  .maybeSingle();
                
                if (!sysError && sysData && sysData.tagline) {
                  const parsed = JSON.parse(sysData.tagline);
                  if (parsed && typeof parsed.interval === 'number') {
                    loadedInterval = parsed.interval;
                    console.log("[SYNC] Loaded banner slide interval from 'system_settings' table:", loadedInterval);
                  }
                }
              } catch (err) {
                console.warn("Could not fetch from 'system_settings' table:", err);
              }
            }

            // Apply loaded interval if valid
            if (loadedInterval !== null && !isNaN(loadedInterval)) {
              setBannerSlideInterval(loadedInterval);
              localStorage.setItem('aura_banner_slide_interval', String(loadedInterval));
            }

            // Fetch premium banners
            let loadedBanners: any[] | null = null;
            try {
              const { data: sysBData, error: sysBError } = await supabase
                .from('system_settings')
                .select('tagline')
                .eq('id', 'premium_banners')
                .maybeSingle();
              
              if (!sysBError && sysBData && sysBData.tagline) {
                loadedBanners = JSON.parse(sysBData.tagline);
                console.log("[SYNC] Loaded premium banners from 'system_settings' table:", loadedBanners?.length);
              }
            } catch (err) {
              console.warn("Could not fetch premium banners from 'system_settings' table:", err);
            }

            if (loadedBanners && Array.isArray(loadedBanners)) {
              setBanners(loadedBanners);
              localStorage.setItem('aura_premium_banners', JSON.stringify(loadedBanners));
            }
          } catch (err: any) {
            console.error("Failed to load custom banners/slide interval from Supabase:", err.message);
          }
        })();
        
        supabaseService.getHomepageSettings(DEFAULT_HOMEPAGE_SETTINGS).then(db => {
          if (db) {
            setHomepageSettings(db);
            dbCache.set('aura_cached_homepage_settings', db);
            localStorage.setItem('aura_cached_homepage_settings', JSON.stringify(db));
          }
        }).catch(() => {});

        supabaseService.getCourierSettings().then(db => {
          if (db) {
            setCourierSettingsList(db);
            dbCache.set('aura_cached_courier_settings', db);
            localStorage.setItem('aura_cached_courier_settings', JSON.stringify(db));
          }
        }).catch(() => {});

        supabaseService.getTrackingSettings().then(db => {
          if (db) {
            setTrackingSettings(db);
            dbCache.set('aura_tracking_settings', db);
            localStorage.setItem('aura_tracking_settings', JSON.stringify(db));
          }
        }).catch(() => {});

        supabaseService.getCollections(collectionsData).then(db => {
          if (db) {
            setCollectionsData(db);
            prevCollectionsRef.current = db;
            dbCache.set('aura_cached_collections', db);
          }
        }).catch(() => {});

        supabaseService.getReturns(returnsData).then(db => {
          if (db) {
            setReturnsData(db);
            prevReturnsRef.current = db;
            dbCache.set('aura_cached_returns', db);
          }
        }).catch(() => {});

        supabaseService.getStaff(staffData).then(db => {
          if (db) {
            setStaffData(db);
            prevStaffRef.current = db;
            dbCache.set('aura_cached_staff', db);
          }
        }).catch(() => {});

      } catch (err: any) {
        console.warn("Background init had failures:", err);
      }
    }

    initSupabase();
  }, []);

  // Real-time Order & Notification Polling (optimized to 35 seconds & only when tab is active to preserve Supabase quota)
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || view !== 'admin') return;

    const interval = setInterval(async () => {
      // Only poll if the tab is currently active to save data egress & requests
      if (document.hidden || document.visibilityState !== 'visible') {
        return;
      }

      try {
        const [dbOrders, dbNotifications, dbCustomers] = await Promise.all([
          supabaseService.getOrders(prevOrdersRef.current),
          supabaseService.getNotifications(prevNotificationsRef.current),
          supabaseService.getCustomers(prevCustomersRef.current)
        ]);

        if (dbOrders && JSON.stringify(dbOrders) !== JSON.stringify(prevOrdersRef.current)) {
          setOrders(filterDeletedOrders(dbOrders));
          prevOrdersRef.current = dbOrders;
        }
        if (dbNotifications && JSON.stringify(dbNotifications) !== JSON.stringify(prevNotificationsRef.current)) {
          setNotifications(dbNotifications);
          prevNotificationsRef.current = dbNotifications;
        }
        if (dbCustomers && JSON.stringify(dbCustomers) !== JSON.stringify(prevCustomersRef.current)) {
          setCustomers(dbCustomers);
          prevCustomersRef.current = dbCustomers;
        }
      } catch (e) {
        console.warn("Background polling for orders and notifications had some issues:", e);
      }
    }, 35000); // 35 seconds to keep database light & free

    return () => clearInterval(interval);
  }, [supabaseStatus.connected, supabaseStatus.schemaCreated, view]);

  // Refs to prevent recursive loops between local updates and DB triggers
  const prevProductsRef = useRef<Product[]>([]);
  const prevOrdersRef = useRef<Order[]>([]);
  const prevCustomersRef = useRef<Customer[]>([]);
  const prevNotificationsRef = useRef<Notification[]>([]);
  const prevSettingsRef = useRef<SystemSettings | null>(null);
  const prevCollectionsRef = useRef<any[]>([]);
  const prevReturnsRef = useRef<any[]>([]);
  const prevStaffRef = useRef<any[]>([]);

  // 2. Sync Products changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevProductsRef.current = products;
      return;
    }
    const deleted = prevProductsRef.current.filter(p => !products.some(curr => curr.id === p.id));
    deleted.forEach(p => {
      supabaseService.deleteProduct(p.id);
    });
    const changed = products.filter(curr => {
      const prev = prevProductsRef.current.find(p => p.id === curr.id);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });
    changed.forEach(p => {
      supabaseService.upsertProduct(p);
    });
    prevProductsRef.current = products;

    // Trigger fast cache sync if any database mutations occurred
    if (deleted.length > 0 || changed.length > 0) {
      fetch('/api/products/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products: products.map(mapProductToDb) })
      }).catch(() => {});
    }
  }, [products, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 3. Sync Orders changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevOrdersRef.current = orders;
      return;
    }
    const changed = orders.filter(curr => {
      const prev = prevOrdersRef.current.find(o => o.id === curr.id);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });
    changed.forEach(o => {
      supabaseService.upsertOrder(o);
    });
    prevOrdersRef.current = orders;
  }, [orders, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 4. Sync Customers changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevCustomersRef.current = customers;
      return;
    }
    const changed = customers.filter(curr => {
      const prev = prevCustomersRef.current.find(c => c.id === curr.id);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });
    changed.forEach(c => {
      supabaseService.upsertCustomer(c);
    });
    prevCustomersRef.current = customers;
  }, [customers, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 5. Sync Notifications changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevNotificationsRef.current = notifications;
      return;
    }
    const changed = notifications.filter(curr => {
      const prev = prevNotificationsRef.current.find(n => n.id === curr.id);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });
    changed.forEach(n => {
      supabaseService.upsertNotification(n);
    });
    prevNotificationsRef.current = notifications;
  }, [notifications, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 6. Sync Settings changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevSettingsRef.current = settings;
      return;
    }
    if (!prevSettingsRef.current || JSON.stringify(prevSettingsRef.current) !== JSON.stringify(settings)) {
      supabaseService.upsertSettings(settings);
    }
    prevSettingsRef.current = settings;
  }, [settings, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 7. Sync Collections changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevCollectionsRef.current = collectionsData;
      return;
    }
    const deleted = prevCollectionsRef.current.filter(c => !collectionsData.some(curr => curr.id === c.id));
    deleted.forEach(c => {
      supabaseService.deleteCollection(c.id);
    });
    const changed = collectionsData.filter(curr => {
      const prev = prevCollectionsRef.current.find(c => c.id === curr.id);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });
    changed.forEach(c => {
      supabaseService.upsertCollection(c);
    });
    prevCollectionsRef.current = collectionsData;
  }, [collectionsData, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 8. Sync Returns changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevReturnsRef.current = returnsData;
      return;
    }
    const changed = returnsData.filter(curr => {
      const prev = prevReturnsRef.current.find(r => r.id === curr.id);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });
    changed.forEach(r => {
      supabaseService.upsertReturn(r);
    });
    prevReturnsRef.current = returnsData;
  }, [returnsData, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 9. Sync Staff changes to Supabase
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated || supabaseStatus.loading || isSeeding) {
      prevStaffRef.current = staffData;
      return;
    }
    const deleted = prevStaffRef.current.filter(s => !staffData.some(curr => curr.email === s.email));
    deleted.forEach(s => {
      supabaseService.deleteStaff(s.email);
    });
    const changed = staffData.filter(curr => {
      const prev = prevStaffRef.current.find(s => s.email === curr.email);
      return !prev || JSON.stringify(prev) !== JSON.stringify(curr);
    });
    changed.forEach(s => {
      supabaseService.upsertStaff(s);
    });
    prevStaffRef.current = staffData;
  }, [staffData, supabaseStatus.connected, supabaseStatus.schemaCreated, supabaseStatus.loading, isSeeding]);

  // 10. Listen to real-time events on products & orders
  useEffect(() => {
    if (!supabaseStatus.connected || !supabaseStatus.schemaCreated) return;

    const ordersSubscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        const { eventType, new: newRow, old: oldRow } = payload;
        
        if (eventType === 'INSERT' || eventType === 'UPDATE') {
          const order = mapOrderFromDb(newRow);
          setOrders(prev => {
            const index = prev.findIndex(o => o.id === order.id);
            if (index > -1) {
              if (JSON.stringify(prev[index]) === JSON.stringify(order)) return prev;
              const next = [...prev];
              next[index] = order;
              return next;
            } else {
              return [order, ...prev];
            }
          });
        } else if (eventType === 'DELETE') {
          setOrders(prev => prev.filter(o => o.id !== oldRow.id));
        }
      })
      .subscribe();

    const productsSubscription = supabase
      .channel('public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        const { eventType, new: newRow, old: oldRow } = payload;
        
        if (eventType === 'INSERT' || eventType === 'UPDATE') {
          const product = mapProductFromDb(newRow);
          setProducts(prev => {
            const index = prev.findIndex(p => p.id === product.id);
            if (index > -1) {
              if (JSON.stringify(prev[index]) === JSON.stringify(product)) return prev;
              const next = [...prev];
              next[index] = product;
              return next;
            } else {
              return [...prev, product];
            }
          });
        } else if (eventType === 'DELETE') {
          setProducts(prev => prev.filter(p => p.id !== oldRow.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ordersSubscription);
      supabase.removeChannel(productsSubscription);
    };
  }, [supabaseStatus.connected, supabaseStatus.schemaCreated]);


  // --- Dynamic Dashboard Stats Calculation ---
  // Calculates live numbers based on the updated state of orders, products, and customers
  const liveStats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const currentMonthStr = todayStr.substring(0, 7);

    let todaySales = 0;
    let todayOrdersCount = 0;
    let monthlySales = 0;
    let pendingCount = 0;
    let deliveredCount = 0;
    let cancelledCount = 0;
    let shippedCount = 0;

    orders.forEach(order => {
      // Normalize order date to YYYY-MM-DD
      const orderDateOnly = order.date ? order.date.substring(0, 10) : '';

      // Calculate today's sales and order count
      if (orderDateOnly === todayStr) {
        if (order.status !== 'Cancelled' && order.status !== 'Do Canceled') {
          todaySales += order.total;
        }
        todayOrdersCount += 1;
      }
      
      // Monthly sales for current month
      if (orderDateOnly.startsWith(currentMonthStr)) {
        if (order.status !== 'Cancelled' && order.status !== 'Do Canceled') {
          monthlySales += order.total;
        }
      }

      // Accumulate order statuses
      if (order.status === 'Pending' || order.status === 'New Order') pendingCount++;
      else if (order.status === 'Delivered') deliveredCount++;
      else if (order.status === 'Cancelled' || order.status === 'Do Canceled') cancelledCount++;
      else shippedCount++;
    });

    // Compute dynamic revenue based on non-cancelled orders
    const activeOrdersTotal = orders
      .filter(o => o.status !== 'Cancelled' && o.status !== 'Do Canceled')
      .reduce((sum, o) => sum + o.total, 0);

    const finalTotalRevenue = activeOrdersTotal;
    const finalTotalProfit = finalTotalRevenue * 0.45; // 45% luxury profit margin

    // New customers in current month
    const newCustomersCount = customers.filter(c => c.joinDate && c.joinDate.startsWith(currentMonthStr)).length;

    return {
      todaySales: todaySales,
      todayOrdersCount: todayOrdersCount,
      monthlySales: monthlySales,
      totalRevenue: finalTotalRevenue,
      totalProfit: finalTotalProfit,
      newCustomersCount: newCustomersCount,
      pendingOrders: pendingCount,
      deliveredOrders: deliveredCount,
      cancelledOrders: cancelledCount,
      shippedOrders: shippedCount,
      totalOrders: orders.length,
      conversionRate: orders.length > 0 ? parseFloat(((orders.length / Math.max(1, customers.length)) * 100).toFixed(2)) : 0
    };
  }, [orders, customers]);

  // --- Dynamic Monthly Analytics Calculation ---
  const monthlyAnalyticsData = useMemo(() => {
    // Generate last 6 months names dynamically
    const months: string[] = [];
    const revenueMap: Record<string, number> = {};
    const ordersMap: Record<string, number> = {};
    const customerMap: Record<string, number> = {};

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mName = monthNames[d.getMonth()];
      months.push(mName);
      revenueMap[mName] = 0;
      ordersMap[mName] = 0;
      customerMap[mName] = 0;
    }

    // Dynamically aggregate from live orders
    orders.forEach(order => {
      if (!order.date) return;
      // Date format is typically "YYYY-MM-DD" or "YYYY-MM-DD HH:MM"
      const dateParts = order.date.split('-');
      if (dateParts.length >= 2) {
        const monthIndex = parseInt(dateParts[1], 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          const monthKey = monthNames[monthIndex];
          if (months.includes(monthKey)) {
            if (order.status !== 'Cancelled' && order.status !== 'Do Canceled') {
              revenueMap[monthKey] += order.total;
            }
            ordersMap[monthKey] += 1;
          }
        }
      }
    });

    // Calculate profit (45%) for each month
    const profitMap: Record<string, number> = {};
    months.forEach(m => {
      profitMap[m] = revenueMap[m] * 0.45;
    });

    // Calculate customer cumulative growth dynamically
    let runningCustomerCount = 0;
    months.forEach(m => {
      const count = customers.filter(c => {
        if (!c.joinDate) return false;
        const dateParts = c.joinDate.split('-');
        if (dateParts.length >= 2) {
          const monthIndex = parseInt(dateParts[1], 10) - 1;
          return monthNames[monthIndex] === m;
        }
        return false;
      }).length;

      runningCustomerCount += count;
      customerMap[m] = runningCustomerCount;
    });

    // Compute order status distribution dynamically
    let pending = 0;
    let shipped = 0;
    let delivered = 0;
    let cancelled = 0;

    orders.forEach(o => {
      if (o.status === 'Pending' || o.status === 'New Order') pending++;
      else if (o.status === 'Delivered') delivered++;
      else if (o.status === 'Cancelled' || o.status === 'Do Canceled') cancelled++;
      else shipped++;
    });

    return {
      revenue: months.map(m => ({ month: m, val: revenueMap[m], orders: ordersMap[m] })),
      profit: months.map(m => ({ month: m, val: profitMap[m] })),
      customerGrowth: months.map(m => ({ month: m, val: customerMap[m] })),
      orderStatus: [
        { name: "পেন্ডিং (Pending)", count: pending, color: "bg-amber-500", barColor: "#f59e0b" },
        { name: "প্রসেসিং/শিপড (Shipped)", count: shipped, color: "bg-sky-500", barColor: "#0ea5e9" },
        { name: "ডেলিভারড (Delivered)", count: delivered, color: "bg-emerald-500", barColor: "#10b981" },
        { name: "বাতিলকৃত (Cancelled)", count: cancelled, color: "bg-rose-500", barColor: "#f43f5e" },
      ]
    };
  }, [orders, customers]);

  // Categories list
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // --- Handlers ---
  
  // 1. Order Status Transition Handlers
  const updateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    const orderToUpdate = orders.find(o => o.id === orderId);
    if (orderToUpdate) {
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
      const updatedOrder: Order = {
        ...orderToUpdate,
        status: nextStatus,
        paymentStatus: nextStatus === 'Delivered' ? 'Paid' : orderToUpdate.paymentStatus,
        timeline: [
          ...orderToUpdate.timeline,
          { 
            status: nextStatus, 
            timestamp, 
            note: `অর্ডার স্ট্যাটাস পরিবর্তন করে '${nextStatus}' করা হয়েছে (Admin Panel দ্বারা)।` 
          }
        ]
      };

      setOrders(prev => prev.map(order => order.id === orderId ? updatedOrder : order));

      // Direct write to Supabase Database
      supabaseService.upsertOrder(updatedOrder).then(success => {
        if (!success) {
          console.error("Direct status update to Supabase failed for order", orderId);
        }
      });

      // Update in-place for active details modal
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updatedOrder);
      }
      
      // Update in-place for editing modal
      if (editingOrder && editingOrder.id === orderId) {
        setEditingOrder(updatedOrder);
      }
    }

    // Add real-time log notification
    const newNotif: Notification = {
      id: `NOTIF-${Date.now()}`,
      title: `Order ${orderId} Updated`,
      message: `Status is now ${nextStatus}`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Bulk operations
  const handleBulkStatusChange = (status: OrderStatus) => {
    if (bulkSelectedOrders.length === 0) return;
    setOrders(prev => prev.map(order => {
      if (bulkSelectedOrders.includes(order.id)) {
        return {
          ...order,
          status,
          paymentStatus: status === 'Delivered' ? 'Paid' : order.paymentStatus
        };
      }
      return order;
    }));
    setBulkSelectedOrders([]);
    
    // Notify
    setNotifications(prev => [{
      id: `NOTIF-${Date.now()}`,
      title: "Bulk Orders Updated",
      message: `${bulkSelectedOrders.length} orders status set to ${status}.`,
      type: "success",
      timestamp: new Date().toISOString(),
      read: false
    }, ...prev]);
  };

  // Delete Order
  const handleDeleteOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setOrderToDelete(order);
    }
  };

  const handleConfirmDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      const deletedStr = localStorage.getItem('aura_deleted_order_ids') || '[]';
      const deletedIds = JSON.parse(deletedStr);
      if (Array.isArray(deletedIds) && !deletedIds.includes(orderToDelete.id)) {
        deletedIds.push(orderToDelete.id);
        localStorage.setItem('aura_deleted_order_ids', JSON.stringify(deletedIds));
      }
    } catch (e) {
      console.warn("Failed to update deleted orders storage:", e);
    }

    const updatedOrders = orders.filter(o => o.id !== orderToDelete.id);
    setOrders(updatedOrders);

    try {
      await dbCache.set('aura_cached_orders', updatedOrders);
      localStorage.setItem('aura_cached_orders', JSON.stringify(updatedOrders));
    } catch (err) {
      console.warn("Failed to update db cache on delete:", err);
    }

    if (selectedOrder?.id === orderToDelete.id) {
      setSelectedOrder(null);
    }

    const success = await supabaseService.deleteOrder(orderToDelete.id);
    if (success) {
      alert('অর্ডারটি সফলভাবে ডিলিট করা হয়েছে।');
    } else {
      alert('অর্ডারটি সফলভাবে লোকাল ব্রাউজার থেকে মুছে ফেলা হয়েছে (ডেটাবেজ সার্ভার অফলাইন রয়েছে)। ডেটাবেজ সচল হলে স্থায়ীভাবে সিঙ্ক হয়ে যাবে।');
    }
    setOrderToDelete(null);
  };

  // Add/Edit Product Handler
  const handleOpenProductModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        stock: product.stock,
        image: product.image,
        sizes: product.sizes ? product.sizes.join(', ') : '',
        colors: product.colors ? product.colors.join(', ') : '',
        fabric: product.fabric || '',
        sku: product.sku || '',
        collection: product.collection || 'New Arrival',
        season: product.season || 'All Season',
        brand: product.brand || 'Aura Lux',
        productCost: product.productCost || 0,
        deliveryCost: product.deliveryCost || 0,
        discount: product.discount || 0,
        marketingCost: product.marketingCost || 0,
        videoUrl: product.videoUrl || ''
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        category: categoriesList[0] || 'Apparel',
        price: 0,
        originalPrice: 0,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
        sizes: 'S, M, L, XL',
        colors: 'Charcoal Black, Warm White',
        fabric: 'Premium Cotton Blend',
        sku: `AURA-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        collection: collectionsList[0] || 'New Arrival',
        season: seasonsList[0] || 'All Season',
        brand: brandsList[0] || 'Aura Lux',
        productCost: 0,
        deliveryCost: 150,
        discount: 0,
        marketingCost: 0,
        videoUrl: ''
      });
    }
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('দয়া করে প্রোডাক্টের নাম এবং সঠিক মূল্য প্রদান করুন।');
      return;
    }

    const sizeArray = productForm.sizes ? productForm.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const colorArray = productForm.colors ? productForm.colors.split(',').map(c => c.trim()).filter(Boolean) : [];

    // Ensure we also register any brand/category if not already in the selection lists
    if (productForm.category && !categoriesList.includes(productForm.category)) {
      setCategoriesList(prev => [...prev, productForm.category]);
      if (supabaseStatus.connected) {
        supabaseService.insertCategory(productForm.category).catch(e => console.warn("Error inserting category:", e));
      }
    }
    if (productForm.brand && !brandsList.includes(productForm.brand)) {
      setBrandsList(prev => [...prev, productForm.brand]);
      if (supabaseStatus.connected) {
        supabaseService.insertBrand(productForm.brand).catch(e => console.warn("Error inserting brand:", e));
      }
    }
    if (productForm.collection && !collectionsList.includes(productForm.collection)) {
      setCollectionsList(prev => [...prev, productForm.collection]);
      if (supabaseStatus.connected) {
        supabaseService.insertCollectionList(productForm.collection).catch(e => console.warn("Error inserting collection:", e));
      }
    }

    if (editingProduct) {
      // Edit mode
      const updatedProduct: Product = {
        ...editingProduct,
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        stock: Number(productForm.stock),
        image: productForm.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
        sizes: sizeArray,
        colors: colorArray,
        fabric: productForm.fabric,
        sku: productForm.sku,
        collection: productForm.collection,
        season: productForm.season,
        brand: productForm.brand,
        productCost: Number(productForm.productCost),
        deliveryCost: Number(productForm.deliveryCost),
        discount: Number(productForm.discount),
        marketingCost: Number(productForm.marketingCost),
        videoUrl: productForm.videoUrl || ''
      };

      const dbSuccess = await supabaseService.upsertProduct(updatedProduct);
      setProducts(prev => {
        const next = prev.map(p => p.id === editingProduct.id ? updatedProduct : p);
        dbCache.set('aura_cached_products', next);
        localStorage.setItem('aura_cached_products', JSON.stringify(next));
        fetch('/api/products/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next)
        }).catch(() => {});
        return next;
      });
      if (dbSuccess) {
        alert('প্রোডাক্ট বিবরণ সফলভাবে আপডেট করা হয়েছে।');
      } else {
        alert('ডাটাবেজে আপডেট করতে সংকেত দেওয়া হয়েছে, অফলাইন ক্যাশেও সংরক্ষিত রাখা হয়েছে।');
      }
    } else {
      // Add mode
      const newProduct: Product = {
        id: `PROD-${Date.now()}`,
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        stock: Number(productForm.stock),
        salesCount: 0,
        rating: 5.0,
        image: productForm.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
        sizes: sizeArray,
        colors: colorArray,
        fabric: productForm.fabric,
        sku: productForm.sku,
        collection: productForm.collection,
        season: productForm.season,
        brand: productForm.brand,
        productCost: Number(productForm.productCost),
        deliveryCost: Number(productForm.deliveryCost),
        discount: Number(productForm.discount),
        marketingCost: Number(productForm.marketingCost),
        videoUrl: productForm.videoUrl || ''
      };

      setProducts(prev => {
        const next = [...prev, newProduct];
        dbCache.set('aura_cached_products', next);
        localStorage.setItem('aura_cached_products', JSON.stringify(next));
        fetch('/api/products/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next)
        }).catch(() => {});
        return next;
      });

      const dbSuccess = await supabaseService.upsertProduct(newProduct);
      if (dbSuccess) {
        alert('নতুন প্রোডাক্ট সফলভাবে তৈরি এবং ডাটাবেজে সেভ করা হয়েছে।');
      } else {
        alert('নতুন প্রোডাক্ট লোকালি তৈরি এবং ক্যাশে সেভ করা হয়েছে।');
      }
    }

    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleBulkUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkUploadForm.title || !bulkUploadForm.salePrice || !bulkUploadForm.regularPrice) {
      alert('দয়া করে প্রোডাক্টের নাম, পূর্বের মূল্য (Regular Price) এবং বর্তমান অফার মূল্য (Sale Price) প্রদান করুন।');
      return;
    }
    if (bulkUploadForm.images.length === 0) {
      alert('দয়া করে কমপক্ষে ১টি ছবি আপলোড করুন অথবা ডেমো ইমেজ লোড করুন।');
      return;
    }

    const sizeArray = bulkUploadForm.sizes ? bulkUploadForm.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const calculatedDiscount = calculateDiscountPercentage(bulkUploadForm.regularPrice, bulkUploadForm.salePrice);
    
    // Register category if not already in list
    const bulkCategory = bulkUploadForm.category || 'Baby Category';
    if (bulkCategory && !categoriesList.includes(bulkCategory)) {
      setCategoriesList(prev => [...prev, bulkCategory]);
      if (supabaseStatus.connected) {
        supabaseService.insertCategory(bulkCategory).catch(e => console.warn("Error inserting bulk category:", e));
      }
    }

    // Create new products
    const newProducts: Product[] = bulkUploadForm.images.map((img, idx) => {
      const uniqueId = `PROD-BULK-${Date.now()}-${idx}`;
      return {
        id: uniqueId,
        name: `${bulkUploadForm.title} (Combo Variant ${idx + 1})`,
        description: bulkUploadForm.details,
        category: bulkUploadForm.category || "Baby Category", // Use dynamic category
        price: Number(bulkUploadForm.salePrice),
        originalPrice: Number(bulkUploadForm.regularPrice),
        stock: 50,
        salesCount: 0,
        rating: Number((4.7 + Math.random() * 0.3).toFixed(1)), // nice random high rating
        image: img,
        sizes: sizeArray,
        colors: ["Assorted Baby Combo"],
        fabric: "100% Cotton (GSM 160-170)",
        sku: `BB-BULK-${Date.now()}-${idx}`,
        collection: "New Arrival",
        season: bulkUploadForm.categoryBannerUrl || "Summer", // Save banner URL in season
        brand: "Trend Zone Baby",
        productCost: Math.round(Number(bulkUploadForm.salePrice) * 0.4),
        deliveryCost: 60,
        discount: calculatedDiscount,
        marketingCost: 20,
        videoUrl: bulkUploadForm.videoUrl
      };
    });

    // Update frontend state immediately
    setProducts(prev => {
      const next = [...prev, ...newProducts];
      dbCache.set('aura_cached_products', next);
      localStorage.setItem('aura_cached_products', JSON.stringify(next));
      fetch('/api/products/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next)
      }).catch(() => {});
      return next;
    });

    // Supabase Bulk Insert in background
    if (supabaseStatus.connected && supabaseStatus.schemaCreated) {
      (async () => {
        try {
          await Promise.all(newProducts.map(p => supabaseService.upsertProduct(p)));
          console.log(`Successfully bulk inserted ${newProducts.length} products to Supabase!`);
        } catch (err: any) {
          console.error("Supabase background insertion exception:", err);
        }
      })();
    }

    // Instant Success Message & Modal Closure
    alert('আপনার প্রোডাক্টগুলো সফলভাবে ওয়েবসাইটে যোগ হয়েছে!');

    // Reset Form instantly
    setBulkUploadForm({
      title: 'Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo',
      regularPrice: '990',
      salePrice: '690',
      details: 'Fabric: 100% Cotton\nGSM: 160-170\nPrint: DTF\nSet Includes: 4 piece Tank Top\nNeckline: Crewneck\nSleeves: Sleeveless\nFeatures: Super-Soft Feel\nCare: Machine Washable\n\nবিবরণ: প্রিমিয়াম ১০০% কটন দিয়ে তৈরি আমাদের ৪ পিসের এই স্টাইলিশ ট্যাংক টপ কম্বো সেটটি আপনার আদরের সোনামণির জন্য গরমে অত্যন্ত আরামদায়ক। এর সফট ফেব্রিক বাচ্চার ত্বকের জন্য খুবই নিরাপদ ও মসৃণ।',
      sizes: '1-2 Years, 3-4 Years, 5-6 Years, 7-8 Years, 9-10 Years, 11-12 Years, 13-14 Years',
      images: [],
      category: 'Baby Category',
      categoryBannerUrl: ''
    });
    setShowBulkUploadModal(false);
  };

  const handleMixedUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mixedUploadForm.title || !mixedUploadForm.salePrice || !mixedUploadForm.regularPrice) {
      alert('দয়া করে প্রোডাক্টের নাম, পূর্বের মূল্য (Regular Price) এবং বর্তমান অফার মূল্য (Sale Price) প্রদান করুন।');
      return;
    }
    if (!mixedUploadForm.image) {
      alert('দয়া করে প্রোডাক্টের একটি ছবি বা ছবির ইউআরএল প্রদান করুন।');
      return;
    }

    const sizeArray = mixedUploadForm.sizes ? mixedUploadForm.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const uniqueId = `PROD-MIX-${Date.now()}`;
    const calculatedDiscount = calculateDiscountPercentage(mixedUploadForm.regularPrice, mixedUploadForm.salePrice);

    // Register category if not already in list
    const mixedCategory = mixedUploadForm.category || 'Baby Category';
    if (mixedCategory && !categoriesList.includes(mixedCategory)) {
      setCategoriesList(prev => [...prev, mixedCategory]);
      if (supabaseStatus.connected) {
        supabaseService.insertCategory(mixedCategory).catch(e => console.warn("Error inserting mixed category:", e));
      }
    }

    const newProduct: Product = {
      id: uniqueId,
      name: mixedUploadForm.title,
      description: mixedUploadForm.description,
      category: mixedUploadForm.category,
      price: Number(mixedUploadForm.salePrice),
      originalPrice: Number(mixedUploadForm.regularPrice),
      stock: Number(mixedUploadForm.stock) || 50,
      salesCount: 0,
      rating: 4.8,
      image: mixedUploadForm.image,
      sizes: sizeArray,
      colors: ["Single Color"],
      fabric: mixedUploadForm.fabric,
      sku: `BB-MIX-${Date.now()}`,
      collection: "New Arrival",
      season: "Summer",
      brand: mixedUploadForm.brand,
      productCost: Math.round(Number(mixedUploadForm.salePrice) * 0.4),
      deliveryCost: 60,
      discount: calculatedDiscount,
      marketingCost: 20
    };

    // Update frontend state
    setProducts(prev => [...prev, newProduct]);

    // Supabase Insert
    if (supabaseStatus.connected && supabaseStatus.schemaCreated) {
      try {
        const mapped = mapProductToDb(newProduct);
        const { error } = await supabase.from('products').upsert(mapped);
        if (error) {
          console.error("Supabase insert failed, local state updated:", error);
          alert(`সুপাবেজে সংরক্ষণে সমস্যা হয়েছে: ${error.message}। তবে লোকাল ড্যাশবোর্ডে প্রোডাক্টটি যুক্ত হয়েছে।`);
        } else {
          alert('সফলভাবে প্রোডাক্টটি সুপাবেজ ডাটাবেজে এবং ড্যাশবোর্ডে যুক্ত হয়েছে!');
          // Re-fetch latest from database to stay fully in sync
          try {
            const dbProducts = await supabaseService.getProducts(products);
            setProducts(dbProducts);
            prevProductsRef.current = dbProducts;
          } catch (fetchErr) {
            console.error("Error re-fetching after mixed insert:", fetchErr);
          }
        }
      } catch (err: any) {
        console.error(err);
        alert(`সংরক্ষণ করা যায়নি: ${err.message || err}`);
      }
    } else {
      alert('সফলভাবে প্রোডাক্টটি লোকাল ড্যাশবোর্ডে যুক্ত হয়েছে! (সুপাবেজ সংযোগ নেই)');
    }

    // Reset Form
    setMixedUploadForm({
      title: '',
      regularPrice: '',
      salePrice: '',
      description: '',
      category: 'Baby Category',
      image: '',
      sizes: '1-2 Years, 3-4 Years, 5-6 Years, 7-8 Years, 9-10 Years, 11-12 Years, 13-14 Years',
      fabric: '100% Cotton (GSM 160-170)',
      brand: 'Trend Zone Baby',
      stock: '50'
    });
    setShowMixedUploadModal(false);
  };

  const handleDeleteProduct = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setProductToDelete(prod);
    }
  };

  const handleConfirmDeleteProduct = async () => {
    if (!productToDelete) return;
    
    // Always store the deleted product ID locally in localStorage
    // This acts as a robust fail-safe so deleted products stay hidden even if the database falls back to INITIAL_PRODUCTS
    try {
      const deletedStr = localStorage.getItem('aura_deleted_product_ids') || '[]';
      const deletedIds = JSON.parse(deletedStr);
      if (Array.isArray(deletedIds) && !deletedIds.includes(productToDelete.id)) {
        deletedIds.push(productToDelete.id);
        localStorage.setItem('aura_deleted_product_ids', JSON.stringify(deletedIds));
      }
    } catch (e) {
      console.warn("Failed to update deleted products storage:", e);
    }

    // Always remove from local state immediately to guarantee an instant UI update
    setProducts(prev => prev.filter(p => p.id !== productToDelete.id));

    const success = await supabaseService.deleteProduct(productToDelete.id);
    if (success) {
      alert('প্রোডাক্টটি সফলভাবে ডিলিট করা হয়েছে।');
    } else {
      // Supabase is offline (e.g. Cloudflare error 521). Explain to the user nicely that it's successfully removed locally.
      alert('প্রোডাক্টটি সফলভাবে লোকাল ব্রাউজার থেকে মুছে ফেলা হয়েছে (ডেটাবেজ সার্ভার অফলাইন রয়েছে)। ডেটাবেজ সচল হলে স্থায়ীভাবে সিঙ্ক হয়ে যাবে।');
    }
    setProductToDelete(null);
  };

  // Adjust stock directly
  const handleQuickStockUpdate = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, newStock) };
      }
      return p;
    }));
  };

  // --- CRM & Advanced Order Handlers ---
  
  // Seed local data into Supabase
  const handleSeedSupabase = async () => {
    setIsSeeding(true);
    setSeedingLogs(['সুপাবেজ প্রজেক্ট কানেকশন চেক করা হচ্ছে...']);
    
    // Check connection first
    const conn = await supabaseService.checkConnection();
    if (!conn.connected) {
      setSeedingLogs(prev => [...prev, `❌ কানেকশন ব্যর্থ হয়েছে: ${conn.error}`, 'অনুগ্রহ করে .env ফাইলে VITE_SUPABASE_URL এবং VITE_SUPABASE_ANON_KEY সঠিক কিনা পরীক্ষা করুন।']);
      setIsSeeding(false);
      return;
    }

    setSeedingLogs(prev => [...prev, '✅ সুপাবেজ কানেকশন সফল!']);
    
    // Call seed function
    const result = await supabaseService.seedTables({
      products,
      orders,
      customers,
      notifications,
      settings,
      collections: collectionsData,
      returns: returnsData,
      staff: staffData
    });

    setSeedingLogs(prev => [...prev, ...result.logs]);
    
    if (result.success) {
      localStorage.removeItem('aura_deleted_product_ids');
      setSupabaseStatus({
        connected: true,
        schemaCreated: true,
        loading: false,
        error: null
      });
      // Trigger fast cache sync immediately
      fetch('/api/products/sync', { method: 'POST' }).catch(() => {});
      // Show success notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: `Supabase database initialized`,
        message: `সকল প্রোডাক্ট, অর্ডার, কাস্টমার এবং নোটিফিকেশন সফলভাবে সুপাবেজ ক্লাউড ডেটাবেজে আপলোড এবং সিঙ্ক করা হয়েছে।`,
        timestamp: new Date().toISOString(),
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    } else {
      setSeedingLogs(prev => [...prev, '⚠️ দ্রষ্টব্য: আপনার সুপাবেজ প্রোজেক্টে টেবিলগুলো তৈরি করা না থাকলে এই সিড সম্পন্ন হবে না। দয়া করে নিচের SQL কোডটি কপি করে সুপাবেজ SQL এডিটর-এ রান করুন।']);
    }
    setIsSeeding(false);
  };

  // Save internal notes for an order
  const handleSaveInternalNotes = (orderId: string, notes: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, internalNotes: notes } : o));
    
    // Also update active selectedOrder in-place
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, internalNotes: notes } : null);
    }
    
    // Add to order timeline logs
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          timeline: [
            ...o.timeline,
            { status: o.status, timestamp, note: `অভ্যন্তরীণ নোট যোগ করা হয়েছে: "${notes}"` }
          ]
        };
      }
      return o;
    }));
    
    alert('অভ্যন্তরীণ নোট সফলভাবে সংরক্ষণ করা হয়েছে।');
  };

  // Export orders to Excel-compatible CSV with UTF-8 BOM
  const handleExportCSV = () => {
    const headers = [
      "Order ID", "Customer Name", "Email", "Phone", "Date", 
      "Items", "Total (BDT)", "Status", "Payment Method", "Payment Status", 
      "Shipping Address", "Internal Notes"
    ];
    
    const rows = filteredOrders.map(order => {
      const itemNames = order.items.map(item => `${item.productName} (${item.quantity}x)`).join(" | ");
      return [
        order.id,
        order.customerName,
        order.customerEmail,
        order.customerPhone,
        order.date,
        itemNames,
        order.total,
        order.status,
        order.paymentMethod,
        order.paymentStatus,
        order.customerAddress,
        order.internalNotes || ""
      ];
    });

    let csvContent = headers.join(",") + "\n";
    rows.forEach(r => {
      const processedRow = r.map(val => {
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      });
      csvContent += processedRow.join(",") + "\n";
    });

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `aura_lux_orders_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    alert('অর্ডার তালিকা CSV ফরম্যাটে সফলভাবে ডাউনলোড করা হয়েছে।');
  };

  // Download high-fidelity invoice as HTML page
  const handleDownloadInvoicePDF = (order: Order) => {
    const itemRows = order.items.map(item => `
      <tr style="border-bottom: 1px solid #eeeeee;">
        <td style="padding: 12px 10px; font-weight: 600; font-size: 13px;">${item.productName} (ID: ${item.productId})</td>
        <td style="padding: 12px 10px; text-align: center; font-size: 13px;">৳ ${item.price.toLocaleString('en-IN')}</td>
        <td style="padding: 12px 10px; text-align: center; font-size: 13px;">${item.quantity}</td>
        <td style="padding: 12px 10px; text-align: right; font-weight: bold; font-size: 13px; color: #e07a5f;">৳ ${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>
    `).join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #2c2621; margin: 0; padding: 40px; background-color: #fcfcfc; }
          .invoice-box { max-width: 800px; margin: auto; padding: 40px; border: 1px solid #e8e4dc; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e07a5f; padding-bottom: 25px; }
          .brand { font-size: 26px; font-weight: 900; color: #e07a5f; letter-spacing: -0.5px; text-transform: uppercase; }
          .meta-info { text-align: right; font-size: 13px; }
          .details { margin-top: 30px; display: flex; justify-content: space-between; gap: 20px; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
          .col h4 { margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 0.5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          th { background-color: #fcfbfa; padding: 12px 10px; text-align: left; font-size: 11px; text-transform: uppercase; color: #666; border-bottom: 1px solid #ddd; }
          .total-section { margin-top: 35px; text-align: right; }
          .total-amount { font-size: 26px; font-weight: 900; color: #e07a5f; margin-top: 5px; }
          .notes-box { margin-top: 35px; background-color: #faf8f5; padding: 15px 20px; border-left: 4px solid #e07a5f; border-radius: 6px; font-size: 13px; }
          .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div>
              <div class="brand">${settings.brandName}</div>
              <div style="font-size: 11px; color: #888; margin-top: 2px;">Premium Bespoke Wearables & Fashion Store</div>
            </div>
            <div class="meta-info">
              <div style="font-weight: 900; font-size: 18px; color: #e07a5f; margin-bottom: 4px;">OFFICIAL INVOICE</div>
              <div>Invoice ID: <strong>${order.id}</strong></div>
              <div>Date: ${order.date}</div>
              <div>Status: <span style="color: #10b981; font-weight: bold;">${order.paymentStatus}</span></div>
            </div>
          </div>
          
          <div class="details">
            <div style="flex: 1;">
              <h4>Billed To (ক্রেতার বিবরণ)</h4>
              <strong style="font-size: 14px;">${order.customerName}</strong><br>
              <span style="color: #555;">Email: ${order.customerEmail}</span><br>
              <span style="color: #555;">Phone: ${order.customerPhone}</span>
            </div>
            <div style="flex: 1; text-align: right;">
              <h4>Shipping To (শিপিং ঠিকানা)</h4>
              <span style="color: #555;">${order.customerAddress}</span><br>
              <div style="margin-top: 6px;">Payment Method: <strong>${order.paymentMethod}</strong></div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 50%;">Product Details</th>
                <th style="text-align: center;">Price</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
          </table>

          <div class="total-section">
            <div style="font-size: 11px; text-transform: uppercase; color: #888; font-weight: bold;">Total Amount Paid</div>
            <div class="total-amount">৳ ${order.total.toLocaleString('en-IN')}</div>
            <div style="font-size: 10px; color: #999; margin-top: 4px;">All taxes & custom calibration checks are included.</div>
          </div>

          ${order.internalNotes ? `
            <div class="notes-box">
              <strong style="font-size: 11px; color: #e07a5f; text-transform: uppercase; display: block; margin-bottom: 6px; letter-spacing: 0.5px;">Memo Internal Notes (অভ্যন্তরীণ নোট)</strong>
              <p style="margin: 0; line-height: 1.5; color: #555;">${order.internalNotes}</p>
            </div>
          ` : ''}

          <div class="footer">
            Thank you for your valuable patronage with ${settings.brandName}. This receipt is a certified record of luxury item clearance.<br>
            For support and queries, contact us at concierge@example.com
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `invoice_${order.id}.html`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Open the customer modal in add or edit mode
  const handleOpenCustomerModal = (cust?: Customer) => {
    if (cust) {
      setEditingCustomer(cust);
      setCustomerForm({
        name: cust.name,
        phone: cust.phone,
        email: cust.email,
        address: cust.address,
        gender: cust.gender || 'Male',
        birthday: cust.birthday || '',
        preferredSize: cust.preferredSize || '',
        favoriteColor: cust.favoriteColor || '',
        favoriteCategory: cust.favoriteCategory || '',
        totalSpending: cust.totalSpending || 0,
        ordersCount: cust.ordersCount || 0,
        lastPurchaseDate: cust.lastPurchaseDate || '',
        segment: cust.segment || 'New',
        shirtSize: cust.shirtSize || 'M',
        pantSize: cust.pantSize || '32',
        shoeSize: cust.shoeSize || '41',
        customerValueScore: cust.customerValueScore || 70,
        buyingPatternAnalysis: cust.buyingPatternAnalysis || '',
        nextPurchasePrediction: cust.nextPurchasePrediction || ''
      });
    } else {
      setEditingCustomer(null);
      setCustomerForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        gender: 'Male',
        birthday: '',
        preferredSize: '',
        favoriteColor: '',
        favoriteCategory: '',
        totalSpending: 0,
        ordersCount: 0,
        lastPurchaseDate: '',
        segment: 'New',
        shirtSize: 'M',
        pantSize: '32',
        shoeSize: '41',
        customerValueScore: 50,
        buyingPatternAnalysis: '',
        nextPurchasePrediction: ''
      });
    }
    setShowCustomerModal(true);
  };

  // Save/Update CRM customer profile
  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerForm.name || !customerForm.phone) {
      alert('দয়া করে গ্রাহকের নাম এবং সচল মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    const avgValue = customerForm.ordersCount && customerForm.ordersCount > 0 
      ? Math.round(Number(customerForm.totalSpending || 0) / Number(customerForm.ordersCount))
      : 0;

    // Auto calculate segment if missing, or use selected
    let calculatedSegment = customerForm.segment || 'New';
    if (calculatedSegment === 'New' && Number(customerForm.ordersCount || 0) > 3) {
      calculatedSegment = 'Regular';
    }
    if (Number(customerForm.totalSpending || 0) > 400000) {
      calculatedSegment = 'VIP';
    }

    if (editingCustomer) {
      // Update
      setCustomers(prev => prev.map(c => {
        if (c.id === editingCustomer.id) {
          return {
            ...c,
            name: customerForm.name || '',
            phone: customerForm.phone || '',
            email: customerForm.email || '',
            address: customerForm.address || '',
            gender: customerForm.gender as any,
            birthday: customerForm.birthday || '',
            preferredSize: customerForm.preferredSize || '',
            favoriteColor: customerForm.favoriteColor || '',
            favoriteCategory: customerForm.favoriteCategory || '',
            totalSpending: Number(customerForm.totalSpending || 0),
            ordersCount: Number(customerForm.ordersCount || 0),
            lastPurchaseDate: customerForm.lastPurchaseDate || '',
            averageOrderValue: avgValue,
            segment: calculatedSegment as any,
            shirtSize: customerForm.shirtSize || 'M',
            pantSize: customerForm.pantSize || '32',
            shoeSize: customerForm.shoeSize || '41',
            customerValueScore: Number(customerForm.customerValueScore || 70),
            buyingPatternAnalysis: customerForm.buyingPatternAnalysis || `এই Customer গত ৬ মাসে ${customerForm.ordersCount || 0} বার Purchase করেছে এবং নতুন Collection-এর জন্য Target করা যেতে পারে।`,
            nextPurchasePrediction: customerForm.nextPurchasePrediction || 'New Arrival Premium Collection'
          };
        }
        return c;
      }));
      
      // Update details panel in-place if open
      if (selectedCustomer && selectedCustomer.id === editingCustomer.id) {
        setSelectedCustomer(prev => {
          if (!prev) return null;
          return {
            ...prev,
            name: customerForm.name || '',
            phone: customerForm.phone || '',
            email: customerForm.email || '',
            address: customerForm.address || '',
            gender: customerForm.gender as any,
            birthday: customerForm.birthday || '',
            preferredSize: customerForm.preferredSize || '',
            favoriteColor: customerForm.favoriteColor || '',
            favoriteCategory: customerForm.favoriteCategory || '',
            totalSpending: Number(customerForm.totalSpending || 0),
            ordersCount: Number(customerForm.ordersCount || 0),
            lastPurchaseDate: customerForm.lastPurchaseDate || '',
            averageOrderValue: avgValue,
            segment: calculatedSegment as any,
            shirtSize: customerForm.shirtSize || 'M',
            pantSize: customerForm.pantSize || '32',
            shoeSize: customerForm.shoeSize || '41',
            customerValueScore: Number(customerForm.customerValueScore || 70),
            buyingPatternAnalysis: customerForm.buyingPatternAnalysis || `এই Customer গত ৬ মাসে ${customerForm.ordersCount || 0} বার Purchase করেছে এবং নতুন Collection-এর জন্য Target করা যেতে পারে।`,
            nextPurchasePrediction: customerForm.nextPurchasePrediction || 'New Arrival Premium Collection'
          };
        });
      }
    } else {
      // Add
      const newCust: Customer = {
        id: `CUST-00${customers.length + 1}`,
        name: customerForm.name || '',
        email: customerForm.email || '',
        phone: customerForm.phone || '',
        address: customerForm.address || '',
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
        joinDate: new Date().toISOString().substring(0, 10),
        totalSpending: Number(customerForm.totalSpending || 0),
        ordersCount: Number(customerForm.ordersCount || 0),
        averageOrderValue: avgValue,
        lastPurchaseDate: customerForm.lastPurchaseDate || '',
        segment: calculatedSegment as any || 'New',
        gender: customerForm.gender as any || 'Male',
        birthday: customerForm.birthday || '',
        preferredSize: customerForm.preferredSize || '',
        favoriteColor: customerForm.favoriteColor || '',
        favoriteCategory: customerForm.favoriteCategory || '',
        shirtSize: customerForm.shirtSize || 'M',
        pantSize: customerForm.pantSize || '32',
        shoeSize: customerForm.shoeSize || '41',
        customerValueScore: Number(customerForm.customerValueScore || 50),
        buyingPatternAnalysis: customerForm.buyingPatternAnalysis || `নতুন গ্রাহক। নতুন কালেকশনের জন্য টার্গেট করা যেতে পারে।`,
        nextPurchasePrediction: customerForm.nextPurchasePrediction || 'Summer Collection New Arrival',
        activityTimeline: [
          { action: "গ্রাহক সিআরএম প্রোফাইল তৈরি করা হয়েছে।", date: new Date().toISOString().substring(0, 10) }
        ]
      };
      setCustomers(prev => [...prev, newCust]);
    }

    setShowCustomerModal(false);
    setEditingCustomer(null);
  };

  // Delete CRM customer profile
  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('আপনি কি এই গ্রাহকের সিআরএম প্রোফাইল মুছে ফেলতে চান?')) {
      setCustomers(prev => prev.filter(c => c.id !== customerId));
      setSelectedCustomer(null);
    }
  };

  // --- API Integrations for Server-Side AI ---

  // 1. Chat AI Assistant
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = { sender: 'user' as const, text: userInput, timestamp: new Date().toLocaleTimeString() };
    setChatMessages(prev => [...prev, userMsg]);
    const currentInput = userInput;
    setUserInput('');
    setAiLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: chatMessages.slice(-8), // send last few rounds
          contextData: { products, orders, customers, stats: liveStats }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setChatMessages(prev => [...prev, {
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, {
        sender: 'assistant',
        text: `দুঃখিত, সংযোগে সমস্যা হচ্ছে। আপনার API কি সঠিক আছে কিনা অনুগ্রহ করে নিশ্চিত করুন। Error: ${err.message}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setAiLoading(false);
    }
  };

  // 2. Automated AI Report Analyzer
  const handleTriggerAnalysis = async (type: 'sales' | 'behavior' | 'general') => {
    setAiAnalysisType(type);
    setAiAnalysisLoading(true);
    setAiAnalysisResult('');

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisType: type,
          contextData: { products, orders, customers, stats: liveStats }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAiAnalysisResult(data.analysis);
      } else {
        throw new Error(data.error || 'Failed analysis');
      }
    } catch (err: any) {
      setAiAnalysisResult(`বিশ্লেষণ রিপোর্ট জেনারেট করতে ব্যর্থ হয়েছে: ${err.message}. অনুগ্রহ করে AI Studio secrets প্যানেলে আপনার GEMINI_API_KEY কনফিগার করা আছে কিনা দেখে নিন।`);
    } finally {
      setAiAnalysisLoading(false);
    }
  };

  // Export orders to CSV file / Download JSON format
  const handleExportOrders = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aura_lux_orders_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    alert('সকল অর্ডার ডাটা JSON ফরম্যাটে সফলভাবে এক্সপোর্ট করা হয়েছে।');
  };

  // Print Invoice trigger
  const handlePrintInvoice = () => {
    window.print();
  };

  // Mark notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markSingleNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // --- Dynamic Filters ---
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;
      const matchPayment = orderPaymentFilter === 'All' || order.paymentMethod === orderPaymentFilter;
      
      return matchSearch && matchStatus && matchPayment;
    });
  }, [orders, searchQuery, orderStatusFilter, orderPaymentFilter]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(cust => {
      const matchSearch = cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cust.phone.includes(searchQuery);
      const matchSegment = customerSegmentFilter === 'All' || cust.segment === customerSegmentFilter;
      return matchSearch && matchSegment;
    });
  }, [customers, searchQuery, customerSegmentFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
      const matchSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (prod.brand && prod.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (prod.collection && prod.collection.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (prod.sku && prod.sku.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = productCategoryFilter === 'All' || prod.category === productCategoryFilter;
      const matchCol = productCollectionFilter === 'All' || prod.collection === productCollectionFilter;
      const matchSea = productSeasonFilter === 'All' || prod.season === productSeasonFilter;
      const matchBra = productBrandFilter === 'All' || prod.brand === productBrandFilter;
      return matchSearch && matchCat && matchCol && matchSea && matchBra;
    });
  }, [products, searchQuery, productCategoryFilter, productCollectionFilter, productSeasonFilter, productBrandFilter]);

  const collectionStats = useMemo(() => {
    return collectionsList.map(col => {
      // Find all products in this collection
      const colProducts = products.filter(p => p.collection === col);
      const totalSalesCount = colProducts.reduce((sum, p) => sum + (p.salesCount || 0), 0);
      const totalRevenue = colProducts.reduce((sum, p) => sum + (p.price * (p.salesCount || 0)), 0);
      const totalCost = colProducts.reduce((sum, p) => sum + ((p.originalPrice || p.price) * (p.salesCount || 0)), 0);
      const totalProfit = totalRevenue - totalCost;
      
      return {
        collectionName: col,
        productsCount: colProducts.length,
        salesCount: totalSalesCount,
        revenue: totalRevenue,
        profit: totalProfit
      };
    });
  }, [products, collectionsList]);

  const bestPerformingCollection = useMemo(() => {
    if (collectionStats.length === 0) return null;
    return [...collectionStats].sort((a, b) => b.revenue - a.revenue)[0];
  }, [collectionStats]);

  const renderSyncAlert = () => {
    if (!syncAlert) return null;
    return (
      <div className="fixed top-5 right-5 z-[9999] max-w-md animate-bounce-short">
        <div className="bg-[#120e0c]/95 backdrop-blur-md border border-emerald-500/30 shadow-[0_8px_32px_rgba(16,185,129,0.15)] rounded-2xl p-4 flex items-start space-x-3 text-white">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl mt-0.5 shrink-0">
            <RefreshCcw className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-0.5 font-sans">রিয়েল-টাইম ডাটাবেজ সিঙ্ক</h4>
            <p className="text-xs text-white/95 leading-relaxed font-sans">{syncAlert.message}</p>
          </div>
          <button 
            onClick={() => setSyncAlert(null)}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  if (view === 'storefront') {
    return (
      <>
        <CustomerStorefront
          products={products}
          orders={orders}
          setOrders={setOrders}
          setNotifications={setNotifications}
          supabaseService={supabaseService}
          onGoToLogin={() => setView('login')}
          themeMode={settings.themeMode}
          settings={settings}
          loading={supabaseStatus.loading}
          categoriesList={categoriesList}
          collectionsList={collectionsList}
          brandsList={brandsList}
          banners={banners}
          bannerSlideInterval={bannerSlideInterval}
          publishedTheme={publishedTheme}
          homepageSections={homepageSections}
          smartTheme={smartTheme}
          dynamicSections={dynamicSections}
        />
        {renderSyncAlert()}
      </>
    );
  }

  if (view === 'login') {
    return (
      <>
        <LoginPage
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setView('admin');
          }}
          onBackToStore={() => setView('storefront')}
          themeMode={settings.themeMode}
        />
        {renderSyncAlert()}
      </>
    );
  }

  if (view === 'admin' && !isAuthenticated) {
    return (
      <>
        <LoginPage
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setView('admin');
          }}
          onBackToStore={() => setView('storefront')}
          themeMode={settings.themeMode}
        />
        {renderSyncAlert()}
      </>
    );
  }

  return (
    <div 
      className={`min-h-screen flex transition-colors duration-500 overflow-x-hidden font-sans relative
        ${settings.themeMode === 'dark' 
          ? 'bg-[#120e0c] text-[#f6f3ed]' 
          : 'bg-[#faf8f5] text-[#2c2621]'
        }`}
    >
      {renderSyncAlert()}
      {/* 👁️ Eye Protection Blue-Light Warm Tint Overlay Layer */}
      {settings.eyeProtectionEnabled && (
        <div 
          className="fixed inset-0 pointer-events-none z-[9999] transition-all duration-300 mix-blend-multiply bg-amber-400/5"
          style={{ opacity: settings.blueLightFilterLevel / 100 }}
        />
      )}

      {/* Sidebar navigation backdrop overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery(''); // reset query on tab change
        }}
        settings={settings}
        setSettings={setSettings}
        notificationCount={notifications.filter(n => !n.read).length}
        openNotificationPanel={() => setNotificationPanelOpen(true)}
        openAiAssistant={() => setAiAssistantOpen(true)}
        isMobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        onGoToStore={() => setView('storefront')}
        t={t}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Sticky Header */}
        <header 
          className={`h-16 flex items-center justify-between px-8 border-b sticky top-0 backdrop-blur-xl z-20 transition-colors duration-300
            ${settings.themeMode === 'dark' 
              ? 'bg-[#120e0c]/80 border-[#322822]/40' 
              : 'bg-[#faf8f5]/80 border-[#e8e4dc]'
            }`}
        >
          {/* Dashboard Header Bar Title / Interactive Search */}
          <div className="flex items-center space-x-3 md:space-x-4 w-full md:w-96">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer shrink-0"
              title="Open Menu"
            >
              <Menu className="h-4.5 w-4.5 opacity-80" />
            </button>

            <div className={`flex items-center space-x-2 px-3 py-1.5 w-full rounded-xl border text-sm transition-all
              ${settings.themeMode === 'dark' 
                ? 'bg-[#1a1614] border-[#322822]/60 focus-within:border-amber-500/50' 
                : 'bg-[#f4f2ee] border-[#e8e4dc] focus-within:border-amber-500/50'
              }`}
            >
              <Search className="h-4 w-4 opacity-55" />
              <input 
                type="text" 
                placeholder={t('অর্ডার, প্রোডাক্ট বা কাস্টমার খুঁজুন...', 'Search orders, products or customers...')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-inherit placeholder:opacity-50 text-xs py-0.5"
              />
            </div>
          </div>

          {/* Quick status bar widgets */}
          <div className="flex items-center space-x-6 text-xs font-medium">
            {/* Quick stats indicators */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="opacity-70">{t('সিস্টেম স্ট্যাটাস: অনলাইন', 'System Status: Online')}</span>
              </span>
              <span className="opacity-30">|</span>
              <span className="opacity-70">{t('কারেন্সি:', 'Currency:')} {settings.currency} ($)</span>
            </div>

            {/* Bulk & Mixed Upload Quick Actions */}
            <div className="flex items-center space-x-2 border-l pl-4 border-inherit">
              <button
                onClick={() => setShowBulkUploadModal(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer shadow-md shadow-amber-500/10"
              >
                <PlusSquare className="h-3.5 w-3.5" />
                <span>Bulk Same Upload</span>
              </button>
              <button
                onClick={() => setShowMixedUploadModal(true)}
                className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer shadow-md shadow-orange-500/10"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Mixed Upload</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="relative flex items-center space-x-2 border-l pl-4 border-inherit">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="px-3 py-1.5 rounded-xl border border-inherit text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-white/5 transition-all flex items-center space-x-1.5 cursor-pointer text-inherit"
                title={lang === 'bn' ? "ভাষা পরিবর্তন করুন" : "Change Language"}
              >
                <Globe className="h-3.5 w-3.5 text-teal-500" />
                <span>{lang === 'bn' ? 'বাংলা' : 'English'}</span>
              </button>

              <AnimatePresence>
                {showLangDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowLangDropdown(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 top-full mt-2 w-32 border rounded-2xl shadow-2xl p-1.5 z-50 overflow-hidden
                        ${settings.themeMode === 'dark' 
                          ? 'bg-[#1a1614] border-[#322822]/60' 
                          : 'bg-white border-[#e8e4dc]'
                        }`}
                    >
                      <button
                        onClick={() => {
                          setLang('bn');
                          setShowLangDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                          lang === 'bn' 
                            ? 'bg-teal-500 text-white' 
                            : 'text-neutral-500 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>বাংলা</span>
                        {lang === 'bn' && <Check className="h-3 w-3" />}
                      </button>
                      <button
                        onClick={() => {
                          setLang('en');
                          setShowLangDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between mt-1 ${
                          lang === 'en' 
                            ? 'bg-teal-500 text-white' 
                            : 'text-neutral-500 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>English</span>
                        {lang === 'en' && <Check className="h-3 w-3" />}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Storefront & Logout Actions */}
            <div className="flex items-center space-x-2 border-l pl-4 border-inherit">
              <button
                onClick={() => setView('storefront')}
                className="px-3 py-1.5 rounded-xl border border-inherit text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-white/5 transition-all flex items-center space-x-1 cursor-pointer"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-teal-500" />
                <span className="hidden sm:inline">{t('স্টোরফ্রন্ট', 'Storefront')}</span>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('aura_admin_authenticated');
                  setIsAuthenticated(false);
                  setView('storefront');
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('লগআউট', 'Logout')}</span>
              </button>
            </div>

            {/* User Avatar & Settings trigger */}
            <div className="flex items-center space-x-3 border-l pl-4 border-inherit">
              <div className="text-right">
                <span className="block font-semibold">প্রতাপ (Admin)</span>
                <span className="text-[10px] opacity-50 block uppercase tracking-wide">Owner</span>
              </div>
              <div className="h-9 w-9 rounded-xl overflow-hidden border border-amber-500/30">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Admin" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic content pages */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          
          {/* ==========================================================
              TAB 1: DASHBOARD HOME
              ========================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Eye Protection Notice in content */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">ড্যাশবোর্ড ওভারভিউ (Aura Dashboard)</h1>
                  <p className="opacity-60 text-sm mt-1">আপনার ব্যবসার গুরুত্বপূর্ণ তথ্য এক নজরে পর্যবেক্ষণ করুন।</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className={`p-1.5 rounded-xl flex items-center space-x-1.5 text-xs font-mono
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614] border border-[#322822]' : 'bg-amber-50 border border-amber-100'}`}
                  >
                    <span className="opacity-60">আজকের তারিখ:</span>
                    <span className="font-bold text-[#e07a5f]">2026-06-27</span>
                  </div>
                  <button 
                    onClick={() => setShowBulkUploadModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-lg shadow-amber-500/15"
                  >
                    <PlusSquare className="h-4 w-4" />
                    <span>Bulk Same Product Upload</span>
                  </button>
                  <button 
                    onClick={() => setShowMixedUploadModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-lg shadow-orange-500/15"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Mixed Product Upload</span>
                  </button>
                  <button 
                    onClick={() => handleTriggerAnalysis('sales')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#e07a5f] hover:bg-[#d06a4f] text-white transition-all shadow-lg shadow-orange-600/10"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>AI সেলস অ্যানালাইসিস</span>
                  </button>
                </div>
              </div>

              {/* 1. 8 Business Overview Cards (Bento Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: আজকের বিক্রি */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">আজকের বিক্রি (Today's Sales)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 text-gradient font-sans">
                        {formatCurrency(liveStats.todaySales)}
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-[#e07a5f]">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs text-emerald-500 font-bold">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+18.4% গত কাল থেকে</span>
                  </div>
                </div>

                {/* Card 2: আজকের অর্ডার */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">আজকের অর্ডার (Today's Orders)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 font-sans">
                        {liveStats.todayOrdersCount} টি
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs opacity-60">
                    <span>রিয়েল-টাইম লাইভ অর্ডার</span>
                  </div>
                </div>

                {/* Card 3: মাসিক বিক্রি */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">মাসিক বিক্রি (Monthly Sales)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 text-gradient font-sans">
                        {formatCurrency(liveStats.monthlySales)}
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs text-emerald-500 font-bold">
                    <span>চলতি জুন মাসের মোট বিক্রি</span>
                  </div>
                </div>

                {/* Card 4: মোট Revenue */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">মোট Revenue (Total Revenue)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 text-gradient font-sans">
                        {formatCurrency(liveStats.totalRevenue)}
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500">
                      <Activity className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs text-emerald-500 font-bold">
                    <span>WooCommerce লাইভ ডাটাবেজ</span>
                  </div>
                </div>

                {/* Card 5: মোট Profit */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">মোট Profit (Total Profit)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 text-gradient font-sans">
                        {formatCurrency(liveStats.totalProfit)}
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs text-emerald-500 font-bold">
                    <span>৪৫% লাক্সারি মার্জিন প্রফিট</span>
                  </div>
                </div>

                {/* Card 6: নতুন Customer */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">নতুন Customer (New Customers)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 font-sans">
                        {liveStats.newCustomersCount} জন
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs opacity-60">
                    <span>জুন মাসে নিবন্ধিত কাস্টমার</span>
                  </div>
                </div>

                {/* Card 7: Pending Order */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">Pending Order (পেন্ডিং)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 font-sans text-amber-500">
                        {liveStats.pendingOrders} টি
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs text-amber-500 font-bold">
                    <span>অপেক্ষমান ও প্রক্রিয়াকরণাধীন</span>
                  </div>
                </div>

                {/* Card 8: Delivered Order */}
                <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 duration-300 group relative overflow-hidden
                  ${settings.themeMode === 'dark' 
                    ? 'bg-gradient-to-br from-[#1a1614]/90 to-[#231d1a]/80 border-[#322822]/80' 
                    : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">Delivered Order (ডেলিভারড)</p>
                      <h3 className="text-2xl font-black tracking-tight mt-2 font-sans text-emerald-500">
                        {liveStats.deliveredOrders} টি
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-1 text-xs text-emerald-500 font-bold">
                    <span>সফলভাবে ডেলিভারি সম্পন্ন</span>
                  </div>
                </div>

              </div>

              {/* 2. Charts and Reports */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Dynamic Chart Container */}
                <div className={`p-6 rounded-[2rem] border lg:col-span-2 flex flex-col justify-between relative overflow-hidden
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.02] blur-3xl pointer-events-none rounded-full" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[#e07a5f]" />
                        <span>WooCommerce লাইভ অ্যানালিটিক্স চার্ট</span>
                      </h3>
                      <p className="text-xs opacity-60">রিয়েল-টাইম ডাটাবেজ থেকে সংগৃহীত চার্ট ও তথ্য</p>
                    </div>
                    <div className="flex space-x-1 bg-amber-500/5 p-1 rounded-xl text-[10px] font-bold uppercase">
                      <span className="px-2 py-1 bg-[#e07a5f] text-white rounded-lg">BDT (৳)</span>
                    </div>
                  </div>

                  {/* Multi-chart Sub-tabs */}
                  <div className="flex flex-wrap gap-2 mb-6 border-b border-inherit pb-4">
                    <button 
                      onClick={() => setActiveChartTab('sales')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5
                        ${activeChartTab === 'sales' 
                          ? 'bg-[#e07a5f] text-white shadow-lg shadow-orange-600/15' 
                          : 'bg-amber-500/5 hover:bg-amber-500/10'}`}
                    >
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>বিক্রয় চার্ট (Sales)</span>
                    </button>
                    <button 
                      onClick={() => setActiveChartTab('profit')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5
                        ${activeChartTab === 'profit' 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-600/15' 
                          : 'bg-amber-500/5 hover:bg-amber-500/10'}`}
                    >
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>লাভ চার্ট (Profit)</span>
                    </button>
                    <button 
                      onClick={() => setActiveChartTab('customers')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5
                        ${activeChartTab === 'customers' 
                          ? 'bg-purple-500 text-white shadow-lg shadow-purple-600/15' 
                          : 'bg-amber-500/5 hover:bg-amber-500/10'}`}
                    >
                      <Users className="h-3.5 w-3.5" />
                      <span>কাস্টমার গ্রোথ (Customers)</span>
                    </button>
                    <button 
                      onClick={() => setActiveChartTab('status')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5
                        ${activeChartTab === 'status' 
                          ? 'bg-amber-500 text-white shadow-lg shadow-amber-600/15' 
                          : 'bg-amber-500/5 hover:bg-amber-500/10'}`}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>অর্ডার স্ট্যাটাস চার্ট</span>
                    </button>
                  </div>

                  {/* Dynamic Interactive SVG Charts Block */}
                  <div className="relative h-64 w-full flex items-end justify-between px-2 pt-6 min-h-[256px]">
                    
                    {/* Sales Chart (Revenue overview) */}
                    {activeChartTab === 'sales' && (
                      <>
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 text-[10px]">
                          <div className="border-b w-full flex justify-between"><span>৳ ৪,৫০০,০০০</span></div>
                          <div className="border-b w-full flex justify-between"><span>৳ ৩,০০০,০০০</span></div>
                          <div className="border-b w-full flex justify-between"><span>৳ ১,৫০০,০০০</span></div>
                          <div className="border-b w-full flex justify-between"><span>৳ ০</span></div>
                        </div>

                        <div className="w-full flex items-end justify-between h-full z-10">
                          {monthlyAnalyticsData.revenue.map((item) => {
                            const maxVal = 4500000;
                            const percent = Math.min(100, (item.val / maxVal) * 100);
                            return (
                              <div key={item.month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                {/* Hover Tooltip */}
                                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                                  <div className="bg-[#2c2621] text-[#f6f3ed] text-[10px] rounded-lg p-2.5 shadow-2xl border border-white/10 text-center font-mono">
                                    <p className="font-bold text-amber-400">{item.month} বিক্রয় রিপোর্ট</p>
                                    <p className="mt-1">মোট বিক্রি: {formatCurrency(item.val)}</p>
                                    <p className="opacity-60">মোট অর্ডার: {item.orders} টি</p>
                                  </div>
                                </div>
                                <div 
                                  style={{ height: `${percent}%` }}
                                  className="w-8 sm:w-12 bg-gradient-to-t from-[#e07a5f]/30 to-[#e07a5f] rounded-t-xl group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-300 relative shadow-lg shadow-orange-500/10"
                                >
                                  <div className="absolute inset-x-0 top-0 h-1 bg-amber-200 rounded-full opacity-40" />
                                </div>
                                <span className="text-[10px] font-bold mt-2 opacity-70">{item.month}</span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* Profit Chart */}
                    {activeChartTab === 'profit' && (
                      <>
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 text-[10px]">
                          <div className="border-b w-full flex justify-between"><span>৳ ২,০০০,০০০</span></div>
                          <div className="border-b w-full flex justify-between"><span>৳ ১,৩০০,০০০</span></div>
                          <div className="border-b w-full flex justify-between"><span>৳ ৬০০,০০০</span></div>
                          <div className="border-b w-full flex justify-between"><span>৳ ০</span></div>
                        </div>

                        <div className="w-full flex items-end justify-between h-full z-10">
                          {monthlyAnalyticsData.profit.map((item) => {
                            const maxVal = 2000000;
                            const percent = Math.min(100, (item.val / maxVal) * 100);
                            return (
                              <div key={item.month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                {/* Hover Tooltip */}
                                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                                  <div className="bg-[#2c2621] text-[#f6f3ed] text-[10px] rounded-lg p-2.5 shadow-2xl border border-white/10 text-center font-mono">
                                    <p className="font-bold text-emerald-400">{item.month} প্রফিট রিপোর্ট</p>
                                    <p className="mt-1">নীট প্রফিট: {formatCurrency(item.val)}</p>
                                    <p className="opacity-60">মার্জিন: ৪৫% (Luxury Brand)</p>
                                  </div>
                                </div>
                                <div 
                                  style={{ height: `${percent}%` }}
                                  className="w-8 sm:w-12 bg-gradient-to-t from-emerald-500/30 to-emerald-500 rounded-t-xl group-hover:from-emerald-400 group-hover:to-emerald-600 transition-all duration-300 relative shadow-lg shadow-emerald-500/10"
                                >
                                  <div className="absolute inset-x-0 top-0 h-1 bg-emerald-200 rounded-full opacity-40" />
                                </div>
                                <span className="text-[10px] font-bold mt-2 opacity-70">{item.month}</span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* Customer Growth Chart */}
                    {activeChartTab === 'customers' && (
                      <>
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 text-[10px]">
                          <div className="border-b w-full flex justify-between"><span>৫০০ জন কাস্টমার</span></div>
                          <div className="border-b w-full flex justify-between"><span>৩৫০ জন কাস্টমার</span></div>
                          <div className="border-b w-full flex justify-between"><span>২০০ জন কাস্টমার</span></div>
                          <div className="border-b w-full flex justify-between"><span>০ জন কাস্টমার</span></div>
                        </div>

                        <div className="w-full flex items-end justify-between h-full z-10">
                          {monthlyAnalyticsData.customerGrowth.map((item) => {
                            const maxVal = 500;
                            const percent = Math.min(100, (item.val / maxVal) * 100);
                            return (
                              <div key={item.month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                {/* Hover Tooltip */}
                                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                                  <div className="bg-[#2c2621] text-[#f6f3ed] text-[10px] rounded-lg p-2.5 shadow-2xl border border-white/10 text-center font-mono">
                                    <p className="font-bold text-purple-400">{item.month} গ্রাহক রিপোর্ট</p>
                                    <p className="mt-1">ক্রমবর্ধমান গ্রাহক: {item.val} জন</p>
                                    <p className="opacity-60">রিয়েল-টাইম CRM ডাটা</p>
                                  </div>
                                </div>
                                <div 
                                  style={{ height: `${percent}%` }}
                                  className="w-8 sm:w-12 bg-gradient-to-t from-purple-500/30 to-purple-500 rounded-t-xl group-hover:from-purple-400 group-hover:to-purple-600 transition-all duration-300 relative shadow-lg shadow-purple-500/10"
                                >
                                  <div className="absolute inset-x-0 top-0 h-1 bg-purple-200 rounded-full opacity-40" />
                                </div>
                                <span className="text-[10px] font-bold mt-2 opacity-70">{item.month}</span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* Order Status Distribution Chart */}
                    {activeChartTab === 'status' && (
                      <div className="w-full flex flex-col justify-center space-y-4 h-full z-10">
                        {monthlyAnalyticsData.orderStatus.map((item) => {
                          const maxCount = Math.max(...monthlyAnalyticsData.orderStatus.map(s => s.count)) || 1;
                          const barPercent = (item.count / maxCount) * 100;
                          return (
                            <div key={item.name} className="space-y-1.5">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold flex items-center space-x-2">
                                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                                  <span>{item.name}</span>
                                </span>
                                <span className="font-mono font-bold text-sm">{item.count} টি অর্ডার</span>
                              </div>
                              <div className="w-full h-3 rounded-full bg-amber-500/5 border border-inherit/10 overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ width: `${barPercent}%`, backgroundColor: item.barColor }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                </div>

                {/* Top Selling Products */}
                <div className={`p-6 rounded-[2rem] border flex flex-col justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <h3 className="text-lg font-bold mb-5">সেরা বিক্রিত প্রোডাক্ট (Top Selling)</h3>
                    <div className="space-y-4">
                      {products.slice(0, 4).map((p, idx) => (
                        <div key={p.id} className="flex items-center justify-between border-b border-inherit pb-3 last:border-b-0 last:pb-0">
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="h-10 w-10 rounded-xl overflow-hidden bg-[#2c2621]/10 flex-shrink-0">
                              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-xs block truncate">{p.name}</span>
                              <span className="text-[10px] opacity-50 block">{p.category} • {p.stock} in stock</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="font-mono text-xs font-bold block">{formatCurrency(p.price)}</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 font-bold rounded-full">{p.salesCount} sold</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-[#e07a5f] transition-all border border-[#e07a5f]/10 mt-4"
                  >
                    সকল প্রোডাক্ট লিস্ট দেখুন
                  </button>
                </div>

              </div>

              {/* 3. Recent Orders table & Quick CRM list */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Recent Orders Overview */}
                <div className={`p-6 rounded-[2rem] border xl:col-span-2 overflow-x-auto
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold">সাম্প্রতিক অর্ডার সমূহ (Recent Orders)</h3>
                      <p className="text-xs opacity-60">কাস্টমারদের সর্বশেষ ৫টি অর্ডার লিস্ট</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-[#e07a5f] hover:underline font-bold"
                    >
                      {t('সকল অর্ডার দেখুন →', 'View All Orders →')}
                    </button>
                  </div>

                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#322822]/10 opacity-60 text-xs">
                        <th className="pb-3">{t('অর্ডার আইডি', 'Order ID')}</th>
                        <th className="pb-3">{t('কাস্টমার', 'Customer')}</th>
                        <th className="pb-3">{t('তারিখ', 'Date')}</th>
                        <th className="pb-3 text-right">{t('মূল্য', 'Price')}</th>
                        <th className="pb-3 text-center">{t('স্ট্যাটাস', 'Status')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#322822]/5">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="text-xs hover:bg-amber-500/[0.02] transition-colors">
                          <td className="py-3.5 font-mono font-bold text-[#e07a5f]">{order.id}</td>
                          <td className="py-3.5">
                            <span className="font-semibold block">{order.customerName}</span>
                            <span className="text-[10px] opacity-50 block">{order.paymentMethod}</span>
                          </td>
                          <td className="py-3.5 opacity-70">{order.date}</td>
                          <td className="py-3.5 text-right font-bold font-mono">{formatCurrency(order.total)}</td>
                          <td className="py-3.5 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block
                              ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                                order.status === 'Processing' ? 'bg-indigo-500/10 text-indigo-500' :
                                order.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                                order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                                order.status === 'Incomplete' ? 'bg-rose-500/15 text-rose-400' :
                                'bg-rose-500/10 text-rose-500'
                              }`}
                            >
                              {order.status === 'Incomplete' ? 'Incomplete' : order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* VIP Customer segment growth */}
                <div className={`p-6 rounded-[2rem] border flex flex-col justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <h3 className="text-lg font-bold mb-4">VIP ক্লায়েন্ট লিস্ট (CRM highlights)</h3>
                    <div className="space-y-4">
                      {customers.filter(c => c.segment === 'VIP').slice(0, 3).map(c => (
                        <div key={c.id} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-amber-500/5 transition-all">
                          <div className="h-9 w-9 rounded-full overflow-hidden">
                            <img src={c.avatar} alt={c.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs truncate">{c.name}</span>
                              <span className="text-[9px] bg-amber-500/20 text-amber-600 font-mono font-bold px-1.5 rounded">VIP</span>
                            </div>
                            <span className="text-[10px] opacity-60 block">{c.email}</span>
                            <span className="text-[10px] text-amber-500 font-mono font-bold block mt-0.5">মোট খরচ: {formatCurrency(c.totalSpending)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('customers')}
                    className="w-full mt-4 py-2 bg-gradient-to-tr from-amber-500 to-[#e07a5f] hover:from-amber-400 hover:to-orange-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/10"
                  >
                    কাস্টমার পোর্টাল পরিচালনা করুন
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* ==========================================================
              TAB 2: ORDER MANAGEMENT SYSTEM
              ========================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">অর্ডার ম্যানেজমেন্ট (Orders Dashboard)</h1>
                  <p className="opacity-60 text-sm mt-1">কাস্টমার অর্ডার ও ট্র্যাকিং হিস্ট্রি কন্ট্রোল করুন।</p>
                </div>
                
                {/* Actions Panel */}
                <div className="flex items-center space-x-3 flex-wrap gap-2">
                  <button 
                    onClick={handleExportOrders}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border hover:bg-amber-500/5 transition-all border-inherit"
                    title="JSON ফরম্যাটে ডাউনলোড করুন"
                  >
                    <Download className="h-4 w-4" />
                    <span>এক্সপোর্ট JSON</span>
                  </button>
                  <button 
                    onClick={handleExportCSV}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border hover:bg-emerald-500/5 transition-all border-inherit text-emerald-500"
                    title="Excel-এ ওপেন করার জন্য CSV ফাইল ডাউনলোড করুন"
                  >
                    <Download className="h-4 w-4" />
                    <span>এক্সপোর্ট CSV (Excel)</span>
                  </button>
                  <button 
                    onClick={() => {
                      const id = `ORD-${Date.now().toString().substring(8)}`;
                      const newOrder: Order = {
                        id,
                        customerName: "New Guest Customer",
                        customerEmail: "guest@example.com",
                        customerPhone: "+880 1711-000000",
                        customerAddress: "Dhaka, Bangladesh",
                        date: new Date().toISOString().substring(0, 10),
                        items: [{ productId: "PROD-001", productName: "Aura Lens Pro", quantity: 1, price: 349900 }],
                        total: 349900,
                        status: "New Order",
                        paymentMethod: "Stripe",
                        paymentStatus: "Paid",
                        timeline: [{ status: "New Order", timestamp: new Date().toISOString().replace('T', ' ').substring(0,16), note: "ম্যানুয়াল নতুন অর্ডার তৈরি হয়েছে" }]
                      };
                      setOrders([newOrder, ...orders]);
                      setSelectedOrder(newOrder);
                      alert(`অর্ডার ${id} তৈরি হয়েছে।`);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#e07a5f] hover:bg-[#d06a4f] text-white transition-all shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    <span>ম্যানুয়াল অর্ডার তৈরি</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Status Tabs (Not Dropdowns) */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-inherit pb-4">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full lg:w-auto custom-scrollbar flex-nowrap md:flex-wrap gap-y-2">
                  {([
                    { id: 'All', label: 'সব অর্ডার (All)', icon: Layers, badge: orders.length },
                    { id: 'New Order', label: 'নিউ অর্ডার (New)', icon: Clock, badge: orders.filter(o => o.status === 'New Order').length },
                    { id: 'Incomplete', label: 'ইনকমপ্লিট (Incomplete)', icon: AlertCircle, badge: orders.filter(o => o.status === 'Incomplete').length },
                    { id: 'Confirmed', label: 'কনফার্মড (Confirmed)', icon: CheckCircle2, badge: orders.filter(o => o.status === 'Confirmed').length },
                    { id: 'Processing', label: 'প্রসেসিং (Processing)', icon: Activity, badge: orders.filter(o => o.status === 'Processing').length },
                    { id: 'Shipped', label: 'শিপড (Shipped)', icon: ShoppingBag, badge: orders.filter(o => o.status === 'Shipped' || o.status === 'Ready to Ship').length },
                    { id: 'Delivered', label: 'ডেলিভারড (Delivered)', icon: CheckCircle2, badge: orders.filter(o => o.status === 'Delivered').length },
                    { id: 'Cancelled', label: 'বাতিল (Cancelled)', icon: XCircle, badge: orders.filter(o => o.status === 'Cancelled').length }
                  ]).map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = orderStatusFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setOrderStatusFilter(tab.id)}
                        className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 border whitespace-nowrap
                          ${isActive 
                            ? 'bg-[#e07a5f]/15 text-[#e07a5f] border-[#e07a5f]/30 shadow-sm shadow-orange-600/5' 
                            : 'bg-neutral-50 dark:bg-[#1a1614] border-inherit opacity-75 hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-white/5'}`}
                      >
                        <TabIcon className={`h-4 w-4 ${isActive ? 'text-[#e07a5f]' : 'opacity-70'}`} />
                        <span>{tab.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold
                          ${isActive ? 'bg-[#e07a5f]/25 text-[#e07a5f]' : 'bg-neutral-200/50 dark:bg-white/10 text-inherit'}`}
                        >
                          {tab.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Secondary payment filter dropdown */}
                <div className="flex items-center space-x-2.5 flex-shrink-0">
                  <span className="text-xs opacity-60 font-bold flex items-center space-x-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>পেমেন্ট গেটওয়ে:</span>
                  </span>
                  <select
                    value={orderPaymentFilter}
                    onChange={(e) => setOrderPaymentFilter(e.target.value)}
                    className={`text-xs px-3 py-1.5 rounded-xl outline-none border border-inherit bg-transparent font-bold
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]' : 'bg-white'}`}
                  >
                    <option value="All">সকল পেমেন্ট (All Gateway)</option>
                    <option value="COD">COD (Cash on Delivery)</option>
                    <option value="bKash">bKash Mobile Wallet</option>
                    <option value="Nagad">Nagad Mobile Wallet</option>
                    <option value="Rocket">Rocket Mobile Wallet</option>
                    <option value="Stripe">Stripe / Visa / Card</option>
                    <option value="PayPal">PayPal Global</option>
                    <option value="Apple Pay">Apple Pay Mobile</option>
                    <option value="Credit Card">Credit Card Terminal</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions Menu */}
              {bulkSelectedOrders.length > 0 && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-amber-500">🛒 {bulkSelectedOrders.length}টি অর্ডার সিলেক্ট করা হয়েছে</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="opacity-70">স্ট্যাটাস পরিবর্তন:</span>
                    <select
                      className="px-2.5 py-1 bg-[#1a1614] border border-[#322822] rounded text-inherit text-xs"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleBulkStatusChange(e.target.value as OrderStatus);
                          e.target.value = '';
                        }
                      }}
                    >
                      <option value="">বাছাই করুন...</option>
                      <option value="New Order">New Order</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Ready to Ship">Ready to Ship</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Returned">Returned</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button 
                      onClick={() => {
                        const selectedObjects = orders.filter(o => bulkSelectedOrders.includes(o.id));
                        const headers = ["Order ID", "Customer Name", "Email", "Phone", "Date", "Items", "Total (BDT)", "Status", "Payment Method", "Payment Status", "Shipping Address"];
                        let csvContent = headers.join(",") + "\n";
                        selectedObjects.forEach(order => {
                          const itemNames = order.items.map(item => `${item.productName} (${item.quantity}x)`).join(" | ");
                          const row = [
                            order.id, order.customerName, order.customerEmail, order.customerPhone, order.date,
                            itemNames, order.total, order.status, order.paymentMethod, order.paymentStatus, order.customerAddress
                          ].map(v => `"${String(v).replace(/"/g, '""')}"`);
                          csvContent += row.join(",") + "\n";
                        });
                        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.setAttribute("href", url);
                        link.setAttribute("download", `bulk_orders_${Date.now()}.csv`);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                      }}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold transition-all"
                    >
                      সিলেক্টেড এক্সপোর্ট (CSV)
                    </button>

                    <button 
                      onClick={() => {
                        if (window.confirm(`আপনি কি নিশ্চিত যে সিলেক্ট করা ${bulkSelectedOrders.length}টি অর্ডার মুছে ফেলতে চান?`)) {
                          setOrders(prev => prev.filter(o => !bulkSelectedOrders.includes(o.id)));
                          setBulkSelectedOrders([]);
                        }
                      }}
                      className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded font-bold transition-all"
                    >
                      ডিলিট করুন
                    </button>

                    <button 
                      onClick={() => setBulkSelectedOrders([])}
                      className="px-2.5 py-1 bg-inherit text-inherit opacity-70 border rounded hover:opacity-100"
                    >
                      ক্লিয়ার
                    </button>
                  </div>
                </div>
              )}

              {/* Main Orders List Table */}
              <div className={`rounded-3xl border overflow-hidden
                ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
              >
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#322822]/10 opacity-60 text-xs">
                      <th className="p-4 w-12 text-center">
                        <input 
                          type="checkbox" 
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkSelectedOrders(filteredOrders.map(o => o.id));
                            } else {
                              setBulkSelectedOrders([]);
                            }
                          }}
                        />
                      </th>
                      <th className="p-4">{t('অর্ডার আইডি', 'Order ID')}</th>
                      <th className="p-4">{t('কাস্টমার নাম', 'Customer Name')}</th>
                      <th className="p-4">{t('ফোন নাম্বার', 'Phone Number')}</th>
                      <th className="p-4">{t('তারিখ', 'Date')}</th>
                      <th className="p-4 text-right">{t('মোট মূল্য', 'Total Price')}</th>
                      <th className="p-4">{t('পেমেন্ট গেটওয়ে', 'Payment Gateway')}</th>
                      <th className="p-4">{t('ডেলিভারি লোকেশন', 'Delivery Location')}</th>
                      <th className="p-4 text-center">{t('স্ট্যাটাস', 'Status')}</th>
                      <th className="p-4 text-right">{t('অ্যাকশন', 'Action')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#322822]/5">
                    {filteredOrders.map((order) => {
                      const isSelected = bulkSelectedOrders.includes(order.id);
                      
                      // Format gateway badge
                      let gatewayBadgeColor = "bg-amber-500/10 text-amber-500 border border-amber-500/10";
                      if (order.paymentMethod === 'bKash') {
                        gatewayBadgeColor = "bg-pink-500/10 text-pink-500 border border-pink-500/15";
                      } else if (order.paymentMethod === 'Nagad') {
                        gatewayBadgeColor = "bg-rose-500/10 text-rose-500 border border-rose-500/15";
                      } else if (order.paymentMethod === 'COD') {
                        gatewayBadgeColor = "bg-orange-500/10 text-orange-500 border border-orange-500/15";
                      } else if (order.paymentMethod === 'Rocket') {
                        gatewayBadgeColor = "bg-indigo-500/10 text-indigo-400 border border-indigo-500/15";
                      } else {
                        gatewayBadgeColor = "bg-sky-500/10 text-sky-500 border border-sky-500/15";
                      }

                      // Format location
                      const locationStr = order.customerAddress.split(',')[0] || "ঢাকা";

                      return (
                        <tr 
                          key={order.id} 
                          className={`text-xs hover:bg-amber-500/[0.01] transition-colors group border-b border-[#322822]/5
                            ${isSelected ? 'bg-amber-500/[0.02]' : ''}`}
                        >
                          <td className="p-4 text-center">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelectedOrders(prev => [...prev, order.id]);
                                } else {
                                  setBulkSelectedOrders(prev => prev.filter(id => id !== order.id));
                                }
                              }}
                            />
                          </td>
                          <td className="p-4 font-mono font-bold text-[#e07a5f] group-hover:underline cursor-pointer" onClick={() => setSelectedOrder(order)}>
                            {order.id}
                          </td>
                          <td className="p-4 font-bold">
                            {order.customerName}
                          </td>
                          <td className="p-4 font-mono font-medium opacity-85">
                            {order.customerPhone}
                          </td>
                          <td className="p-4 opacity-75 font-mono">
                            {order.date}
                          </td>
                          <td className="p-4 text-right font-black font-mono text-[#e07a5f]">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${gatewayBadgeColor}`}>
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="p-4 font-bold opacity-85">
                            {locationStr}
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block border
                              ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                order.status === 'Processing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                order.status === 'New Order' ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' :
                                order.status === 'Incomplete' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                                order.status === 'Confirmed' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                order.status === 'Ready to Ship' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                order.status === 'Returned' ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' :
                                'bg-rose-500/10 text-rose-500 border-rose-500/20'
                              }`}
                            >
                              {order.status === 'New Order' ? 'New Order' :
                               order.status === 'Confirmed' ? 'Confirmed' :
                               order.status === 'Processing' ? 'Processing' :
                               order.status === 'Shipped' ? 'Shipped' :
                               order.status === 'Delivered' ? 'Delivered' :
                               order.status === 'Incomplete' ? 'Incomplete (অসম্পূর্ণ)' :
                               order.status === 'Cancelled' ? 'Cancelled' : order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 hover:bg-amber-500/10 rounded-lg text-amber-500 transition-all inline-flex items-center justify-center"
                              title="অর্ডার বিবরণী (View)"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setEditingOrder(order)}
                              className="p-1.5 hover:bg-sky-500/10 rounded-lg text-sky-500 transition-all inline-flex items-center justify-center"
                              title="অর্ডার এডিট (Edit)"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                const nextStatusMap: Record<OrderStatus, OrderStatus> = {
                                  'New Order': 'Confirmed',
                                  'Confirmed': 'Processing',
                                  'Processing': 'Shipped',
                                  'Ready to Ship': 'Shipped',
                                  'Shipped': 'Delivered',
                                  'Delivered': 'Returned',
                                  'Returned': 'Cancelled',
                                  'Cancelled': 'New Order',
                                  'Payment Pending (will pay)': 'Confirmed',
                                  'Keep Hold': 'Confirmed',
                                  'Do Canceled': 'New Order',
                                  'Pre-Confirmed': 'Confirmed',
                                  'Incomplete': 'New Order'
                                };
                                const nextSt = nextStatusMap[order.status] || 'New Order';
                                updateOrderStatus(order.id, nextSt);
                              }}
                              className="p-1.5 hover:bg-purple-500/10 rounded-lg text-purple-400 transition-all inline-flex items-center justify-center"
                              title="স্ট্যাটাস পরিবর্তন (Change Status)"
                            >
                              <Activity className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setShouldTriggerPrint(true);
                              }}
                              className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-500 transition-all inline-flex items-center justify-center"
                              title="ইনভয়েস প্রিন্ট (Print Invoice)"
                            >
                              <Printer className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                const csv = `Order ID,Customer,Phone,Date,Total,Gateway,Location,Status\n"${order.id}","${order.customerName}","${order.customerPhone}","${order.date}","${order.total}","${order.paymentMethod}","${locationStr}","${order.status}"`;
                                const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement("a");
                                link.href = url;
                                link.download = `order_${order.id}.csv`;
                                link.click();
                              }}
                              className="p-1.5 hover:bg-neutral-500/10 rounded-lg text-neutral-400 transition-all inline-flex items-center justify-center"
                              title="এক্সপোর্ট (Export CSV)"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1.5 hover:bg-rose-500/10 rounded-lg text-rose-500 transition-all inline-flex items-center justify-center"
                              title="অর্ডার ডিলিট (Delete)"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <div className="p-8 text-center opacity-60 text-sm">
                    কোন অর্ডার পাওয়া যায়নি। ফিল্টার চেঞ্জ করে আবার চেষ্টা করুন।
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==========================================================
              TAB 3: CUSTOMER MANAGEMENT CRM
              ========================================================== */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">কাস্টমার রিলেশনশিপ (Customer CRM)</h1>
                  <p className="opacity-60 text-sm mt-1">গ্রাহকদের লাইফটাইম ভ্যালু (LTV), ফ্যাশন পরিমাপ ও ইন্টেলিজেন্স ট্র্যাকিং।</p>
                </div>
                
                {/* Segment stats tabs and Add customer */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex bg-black/15 p-1 rounded-xl border border-white/5 overflow-x-auto">
                    {['All', 'VIP', 'Regular', 'New', 'Inactive'].map(segment => (
                      <button
                        key={segment}
                        onClick={() => setCustomerSegmentFilter(segment)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                          ${customerSegmentFilter === segment 
                            ? 'bg-[#e07a5f] text-white shadow' 
                            : 'hover:bg-amber-500/5 opacity-70'}`}
                      >
                        {segment} ({customers.filter(c => segment === 'All' || c.segment === segment).length})
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleOpenCustomerModal(null)}
                    className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#e07a5f] hover:bg-[#d06a4f] text-white transition-all shadow-md self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span>নতুন কাস্টমার যোগ করুন</span>
                  </button>
                </div>
              </div>

              {/* Customers Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.map(cust => {
                  const isVIP = cust.segment === 'VIP' || (cust.customerValueScore && cust.customerValueScore >= 85);
                  const isInactive = cust.segment === 'Inactive';
                  
                  return (
                    <div 
                      key={cust.id}
                      onClick={() => setSelectedCustomer(cust)}
                      className={`p-6 rounded-[2rem] border transition-all hover:scale-[1.01] hover:-translate-y-1 duration-300 cursor-pointer relative group flex flex-col justify-between h-full
                        ${settings.themeMode === 'dark' 
                          ? 'bg-[#1a1614]/80 border-[#322822]/60 hover:border-amber-500/30' 
                          : 'bg-white border-[#e8e4dc] hover:border-orange-200 text-neutral-800'}`}
                    >
                      <div>
                        {/* VIP or Inactive status label */}
                        <div className="absolute top-4 right-4 flex space-x-1">
                          {isVIP && (
                            <span className="bg-amber-500/20 text-amber-500 text-[9px] font-black font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                              VIP
                            </span>
                          )}
                          {isInactive && (
                            <span className="bg-rose-500/20 text-rose-500 text-[9px] font-black font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                              INACTIVE
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full overflow-hidden border border-amber-500/20">
                            <img src={cust.avatar} alt={cust.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-extrabold text-sm truncate max-w-[130px]">{cust.name}</h3>
                              <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-black/15 text-neutral-400">
                                {cust.customerValueScore ? `${cust.customerValueScore} Pts` : 'N/A'}
                              </span>
                            </div>
                            <p className="text-[10px] opacity-60 font-mono mt-0.5">{cust.id}</p>
                          </div>
                        </div>

                        <div className="mt-5 space-y-2 text-xs opacity-75">
                          <p className="flex items-center space-x-2">
                            <Mail className="h-3.5 w-3.5 text-[#e07a5f]" />
                            <span className="truncate">{cust.email}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <Phone className="h-3.5 w-3.5 text-[#e07a5f]" />
                            <span>{cust.phone}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <MapPin className="h-3.5 w-3.5 text-[#e07a5f]" />
                            <span className="truncate">{cust.address}</span>
                          </p>
                        </div>

                        {/* Fashion preferences capsule list */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {cust.preferredSize && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#e07a5f]/15 text-[#e07a5f]">
                              Size: {cust.preferredSize}
                            </span>
                          )}
                          {cust.favoriteColor && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-500">
                              Color: {cust.favoriteColor}
                            </span>
                          )}
                          {cust.favoriteCategory && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400">
                              Pref: {cust.favoriteCategory}
                            </span>
                          )}
                        </div>

                        <div className="mt-5 pt-4 border-t border-inherit grid grid-cols-2 gap-4 text-center">
                          <div>
                            <span className="text-[10px] opacity-60 uppercase block">জীবনকাল খরচ (LTV)</span>
                            <span className="font-mono text-sm font-black text-amber-500">{formatCurrency(cust.totalSpending)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] opacity-60 uppercase block">মোট অর্ডার</span>
                            <span className="font-mono text-sm font-black text-[#e07a5f]">{cust.ordersCount}টি</span>
                          </div>
                        </div>
                      </div>

                      {/* Card actions bottom bar */}
                      <div className="mt-4 pt-3 border-t border-inherit flex justify-between items-center text-[10px] bg-black/5 p-2 rounded-xl">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenCustomerModal(cust);
                            }}
                            className="p-1 px-2 border border-[#322822]/20 hover:bg-amber-500/15 hover:border-amber-500/20 text-amber-500 rounded-lg transition-all font-bold"
                            title="সম্পাদনা করুন"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomer(cust.id);
                            }}
                            className="p-1 px-2 border border-rose-500/20 hover:bg-rose-500/15 hover:border-rose-500/20 text-rose-500 rounded-lg transition-all font-bold"
                            title="ডিলিট করুন"
                          >
                            Delete
                          </button>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setAiAssistantOpen(true);
                            setUserInput(`Draft a win-back email for customer ${cust.name}. Include their total spending of ${formatCurrency(cust.totalSpending)} and thank them for being a premium ${cust.segment} club member.`);
                          }}
                          className="text-[#e07a5f] hover:underline font-extrabold"
                        >
                          AI ইমেইল লিখুন
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {filteredCustomers.length === 0 && (
                <div className="p-8 text-center opacity-60 text-sm">
                  কোন কাস্টমার ডেটা খুঁজে পাওয়া যায়নি।
                </div>
              )}
            </div>
          )}

          {/* ==========================================================
              TAB 4: PRODUCT CATALOG & FASHION INTEL
              ========================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Header section with Sub-tab selectors */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-[#322822]/15">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">প্রোডাক্ট ও ফ্যাশন ড্যাশবোর্ড (Product Catalog)</h1>
                  <p className="opacity-60 text-sm mt-1">পণ্য ক্যাটালগ, ফ্যাশন সাইজ ও কালেকশন ম্যানেজমেন্ট সিস্টেম।</p>
                </div>
                
                {/* Sub tabs */}
                <div className="flex bg-black/15 p-1 rounded-2xl border border-white/5 self-start xl:self-auto">
                  <button
                    onClick={() => setProductSubTab('catalog')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      productSubTab === 'catalog' 
                        ? 'bg-[#e07a5f] text-white shadow-md' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    পণ্য ক্যাটালগ (Catalog)
                  </button>
                  <button
                    onClick={() => setProductSubTab('manager')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      productSubTab === 'manager' 
                        ? 'bg-[#e07a5f] text-white shadow-md' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    ক্যাটাগরি ও ব্র্যান্ড ম্যানেজার (Manager)
                  </button>
                  <button
                    onClick={() => setProductSubTab('analytics')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      productSubTab === 'analytics' 
                        ? 'bg-[#e07a5f] text-white shadow-md' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    কালেকশন অ্যানালিটিক্স (Analytics)
                  </button>
                  <button
                    onClick={() => setProductSubTab('homepage-designer')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      productSubTab === 'homepage-designer' 
                        ? 'bg-[#e07a5f] text-white shadow-md' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    Homepage Designer
                  </button>
                </div>
              </div>

              {/* --------------------------------------------------------
                  SUB-TAB 1: PRODUCT CATALOG LIST (WITH ADVANCED FILTERS)
                  -------------------------------------------------------- */}
              {productSubTab === 'catalog' && (
                <div className="space-y-6">
                  
                  {/* Advanced Multi-Filter Panel */}
                  <div className="bg-black/10 p-5 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-bold opacity-75">
                      <Filter className="h-4 w-4 text-[#e07a5f]" />
                      <span>মাল্টি-ফিল্টারিং অপশন (Advanced Search Filters):</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Category Filter */}
                      <div className="space-y-1">
                        <label className="text-[10px] opacity-60 font-bold block uppercase">ক্যাটাগরি (Category)</label>
                        <select
                          value={productCategoryFilter}
                          onChange={(e) => setProductCategoryFilter(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#322822]/40 bg-[#120e0c] text-[#f6f3ed] outline-none focus:border-[#e07a5f]"
                        >
                          <option value="All">সকল ক্যাটাগরি (All Categories)</option>
                          {categoriesList.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Brand Filter */}
                      <div className="space-y-1">
                        <label className="text-[10px] opacity-60 font-bold block uppercase">ব্র্যান্ড (Brand)</label>
                        <select
                          value={productBrandFilter}
                          onChange={(e) => setProductBrandFilter(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#322822]/40 bg-[#120e0c] text-[#f6f3ed] outline-none focus:border-[#e07a5f]"
                        >
                          <option value="All">সকল ব্র্যান্ড (All Brands)</option>
                          {brandsList.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>

                      {/* Collection Filter */}
                      <div className="space-y-1">
                        <label className="text-[10px] opacity-60 font-bold block uppercase">কালেকশন (Collection)</label>
                        <select
                          value={productCollectionFilter}
                          onChange={(e) => setProductCollectionFilter(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#322822]/40 bg-[#120e0c] text-[#f6f3ed] outline-none focus:border-[#e07a5f]"
                        >
                          <option value="All">সকল কালেকশন (All Collections)</option>
                          {collectionsList.map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </div>

                      {/* Season Filter */}
                      <div className="space-y-1">
                        <label className="text-[10px] opacity-60 font-bold block uppercase">সিজন (Season)</label>
                        <select
                          value={productSeasonFilter}
                          onChange={(e) => setProductSeasonFilter(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#322822]/40 bg-[#120e0c] text-[#f6f3ed] outline-none focus:border-[#e07a5f]"
                        >
                          <option value="All">সকল সিজন (All Seasons)</option>
                          {seasonsList.map(sea => (
                            <option key={sea} value={sea}>{sea}</option>
                          ))}
                        </select>
                      </div>

                    </div>

                    <div className="flex justify-between items-center pt-2 text-xs">
                      <div className="opacity-65">
                        ফলাফল: <span className="font-mono font-bold text-[#e07a5f]">{filteredProducts.length}</span> টি প্রোডাক্ট পাওয়া গিয়েছে।
                      </div>

                      <div className="flex space-x-2">
                        {(productCategoryFilter !== 'All' || productBrandFilter !== 'All' || productCollectionFilter !== 'All' || productSeasonFilter !== 'All') && (
                          <button
                            onClick={() => {
                              setProductCategoryFilter('All');
                              setProductBrandFilter('All');
                              setProductCollectionFilter('All');
                              setProductSeasonFilter('All');
                            }}
                            className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[11px] font-bold transition-all"
                          >
                            ফিল্টার রিসেট করুন
                          </button>
                        )}
                        <button 
                          onClick={() => handleOpenProductModal(null)}
                          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#e07a5f] hover:bg-[#d06a4f] text-white transition-all shadow-md"
                        >
                          <Plus className="h-4 w-4" />
                          <span>নতুন প্রোডাক্ট যোগ করুন</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(prod => (
                      <div 
                        key={prod.id}
                        className={`rounded-[2rem] border overflow-hidden group transition-all duration-300 hover:scale-[1.01] hover:border-amber-500/20 flex flex-col justify-between h-full
                          ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm text-neutral-800'}`}
                      >
                        <div>
                          {/* Image section */}
                          <div className="h-52 w-full bg-neutral-900 overflow-hidden relative">
                            <img 
                              src={prod.image} 
                              alt={prod.name} 
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            
                            {/* Badges in Image */}
                            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                              <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-xl bg-[#e07a5f] text-white shadow-md">
                                {prod.category}
                              </span>
                              {prod.collection && (
                                <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-xl bg-amber-500/90 text-black shadow-md font-mono">
                                  {prod.collection}
                                </span>
                              )}
                            </div>

                            <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
                              {prod.brand && (
                                <span className="text-[10px] font-black px-2.5 py-1 rounded-xl bg-black/75 text-amber-400 border border-amber-500/30 shadow-md">
                                  {prod.brand}
                                </span>
                              )}
                              {prod.stock <= settings.lowStockLimit && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-rose-500 text-white flex items-center space-x-1 animate-pulse shadow-md">
                                  <BadgeAlert className="h-3 w-3" />
                                  <span>LOW STOCK</span>
                                </span>
                              )}
                            </div>

                            {/* SKU bottom overlay */}
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (prod.sku) {
                                  setActiveQrProduct(prod);
                                }
                              }}
                              disabled={!prod.sku}
                              className={`absolute bottom-2 right-2 bg-black/75 hover:bg-amber-600 hover:text-white text-white px-2.5 py-1 rounded-xl text-[9px] font-mono tracking-widest uppercase flex items-center space-x-1.5 transition-all shadow-md border border-white/10 ${prod.sku ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                              title={prod.sku ? "QR কোড স্ক্যান/প্রিন্ট করুন" : "SKU অনুপস্থিত"}
                            >
                              <QrCode className="h-3 w-3 text-amber-400" />
                              <span>SKU: {prod.sku || 'N/A'}</span>
                            </button>
                          </div>

                          {/* Details content */}
                          <div className="p-6 space-y-4">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="font-extrabold text-sm group-hover:text-[#e07a5f] transition-colors leading-snug">{prod.name}</h3>
                                <span className="text-[9px] font-mono opacity-50 px-1 bg-white/5 rounded">{prod.season || 'All Season'}</span>
                              </div>
                              <p className="text-xs opacity-60 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                            </div>

                            {/* Fashion Attributes Specific UI Grid */}
                            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-2xl bg-black/10 border border-white/5">
                              <div>
                                <span className="opacity-50 block text-[9px] uppercase font-mono">Fabric / উপাদান</span>
                                <span className="font-bold truncate block">{prod.fabric || 'Premium Cotton'}</span>
                              </div>
                              <div>
                                <span className="opacity-50 block text-[9px] uppercase font-mono">Sizes / সাইজ</span>
                                <span className="font-bold truncate block font-mono text-amber-500">
                                  {prod.sizes && prod.sizes.length > 0 ? prod.sizes.join(', ') : 'Free Size'}
                                </span>
                              </div>
                              <div className="col-span-2 pt-1.5 border-t border-white/5">
                                <span className="opacity-50 block text-[9px] uppercase font-mono">Colors / কালার</span>
                                <span className="font-semibold block truncate">
                                  {prod.colors && prod.colors.length > 0 ? prod.colors.join(', ') : 'Multicolor'}
                                </span>
                              </div>
                            </div>

                            {/* Pricing and Sales Indicators */}
                            <div className="flex justify-between items-center py-2.5 border-y border-[#322822]/10">
                              <div>
                                <span className="text-[10px] opacity-50 block">বিক্রয় মূল্য</span>
                                <span className="font-mono font-black text-sm text-[#e07a5f]">{formatCurrency(prod.price)}</span>
                                {prod.originalPrice > prod.price && (
                                  <span className="font-mono text-[10px] line-through opacity-40 ml-1.5">{formatCurrency(prod.originalPrice)}</span>
                                )}
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] opacity-50 block">বিক্রি সংখ্যা</span>
                                <span className="font-mono font-bold text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-lg">{prod.salesCount} sold</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card controls (Bottom) */}
                        <div className="px-6 pb-6 pt-2 flex justify-between items-center bg-black/5 mt-auto">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[11px] font-semibold opacity-70">ইনভেন্টরি স্টক:</span>
                            <span className={`font-mono text-xs font-black ${prod.stock <= settings.lowStockLimit ? 'text-rose-500 text-sm animate-pulse' : 'text-emerald-500'}`}>
                              {prod.stock} Pcs
                            </span>
                          </div>
                          
                          <div className="flex space-x-2">
                            {prod.sku && (
                              <button 
                                type="button"
                                onClick={() => setActiveQrProduct(prod)}
                                className="p-2 border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/20 text-emerald-500 rounded-xl transition-all"
                                title="QR কোড দেখুন (SKU QR Code)"
                              >
                                <QrCode className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleOpenProductModal(prod)}
                              className="p-2 border border-[#322822]/20 hover:bg-amber-500/10 hover:border-amber-500/20 text-amber-500 rounded-xl transition-all"
                              title="সম্পাদনা করুন (Edit)"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-2 border border-rose-500/20 hover:bg-rose-500/10 hover:border-rose-500/20 text-rose-500 rounded-xl transition-all"
                              title="ডিলেট করুন (Delete)"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="p-16 text-center border-2 border-dashed border-[#322822]/20 rounded-[2rem] opacity-60">
                      কোন ম্যাচিং প্রোডাক্ট খুঁজে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে চেষ্টা করুন।
                    </div>
                  )}
                </div>
              )}

              {/* --------------------------------------------------------
                  SUB-TAB 2: CATEGORY & BRAND & COLLECTION MANAGER
                  -------------------------------------------------------- */}
              {productSubTab === 'manager' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Category Manager Column */}
                  <div className="bg-[#1a1614] border border-[#322822] rounded-[2rem] p-6 space-y-4">
                    <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                      <Layers className="h-5 w-5 text-[#e07a5f]" />
                      <div>
                        <h2 className="font-extrabold text-sm">ক্যাটাগরি ম্যানেজমেন্ট</h2>
                        <p className="text-[10px] opacity-50">পণ্য ক্যাটাগরি তৈরি ও ডিলিট করুন</p>
                      </div>
                    </div>

                    {/* New Category Input Form */}
                    <div className="flex space-x-2">
                      <input 
                        type="text"
                        placeholder="নতুন ক্যাটাগরি..."
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="flex-1 text-xs p-2.5 rounded-xl border border-[#322822]/50 bg-[#120e0c] outline-none"
                      />
                      <button 
                        onClick={async () => {
                          const trimmed = newCategoryName.trim();
                          if (trimmed) {
                            if (!categoriesList.includes(trimmed)) {
                              setCategoriesList(prev => [...prev, trimmed]);
                              setNewCategoryName('');
                              if (supabaseStatus.connected) {
                                await supabaseService.insertCategory(trimmed);
                              }
                            } else {
                              alert('ক্যাটাগরি আগে থেকেই বিদ্যমান আছে!');
                            }
                          }
                        }}
                        className="p-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] rounded-xl text-white"
                        title="ক্যাটাগরি যোগ করুন"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Categories List */}
                    <div className="space-y-2 max-h-[350px] overflow-y-auto">
                      {categoriesList.map(cat => {
                        const inUse = products.some(p => p.category === cat);
                        return (
                          <div key={cat} className="flex justify-between items-center text-xs p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span className="font-medium">{cat}</span>
                            <button
                              onClick={async () => {
                                if (inUse) {
                                  alert(`এই ক্যাটাগরিটি ডিলেট করা যাবে না। ${products.filter(p => p.category === cat).length}টি প্রোডাক্ট এতে রেজিস্টার্ড রয়েছে।`);
                                  return;
                                }
                                setCategoriesList(prev => prev.filter(c => c !== cat));
                                if (supabaseStatus.connected) {
                                  await supabaseService.deleteCategory(cat);
                                }
                              }}
                              className={`p-1 rounded ${inUse ? 'opacity-20 cursor-not-allowed' : 'text-rose-500 hover:bg-rose-500/10'}`}
                              disabled={inUse}
                              title={inUse ? "ব্যবহার হচ্ছে" : "ডিলেট করুন"}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brand Manager Column */}
                  <div className="bg-[#1a1614] border border-[#322822] rounded-[2rem] p-6 space-y-4">
                    <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                      <Briefcase className="h-5 w-5 text-amber-500" />
                      <div>
                        <h2 className="font-extrabold text-sm">ব্র্যান্ড ম্যানেজমেন্ট</h2>
                        <p className="text-[10px] opacity-50">ব্র্যান্ডের তালিকা নিয়ন্ত্রণ করুন</p>
                      </div>
                    </div>

                    {/* New Brand Input Form */}
                    <div className="flex space-x-2">
                      <input 
                        type="text"
                        placeholder="নতুন ব্র্যান্ড..."
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                        className="flex-1 text-xs p-2.5 rounded-xl border border-[#322822]/50 bg-[#120e0c] outline-none"
                      />
                      <button 
                        onClick={async () => {
                          const trimmed = newBrandName.trim();
                          if (trimmed) {
                            if (!brandsList.includes(trimmed)) {
                              setBrandsList(prev => [...prev, trimmed]);
                              setNewBrandName('');
                              if (supabaseStatus.connected) {
                                await supabaseService.insertBrand(trimmed);
                              }
                            } else {
                              alert('ব্র্যান্ড আগে থেকেই বিদ্যমান আছে!');
                            }
                          }
                        }}
                        className="p-2.5 bg-amber-500 hover:bg-amber-600 rounded-xl text-black"
                        title="ব্র্যান্ড যোগ করুন"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Brands List */}
                    <div className="space-y-2 max-h-[350px] overflow-y-auto">
                      {brandsList.map(brand => {
                        const inUse = products.some(p => p.brand === brand);
                        return (
                          <div key={brand} className="flex justify-between items-center text-xs p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span className="font-medium">{brand}</span>
                            <button
                              onClick={async () => {
                                if (inUse) {
                                  alert(`এই ব্র্যান্ড ডিলেট করা যাবে না। প্রোডাক্টে ব্যবহার হচ্ছে।`);
                                  return;
                                }
                                setBrandsList(prev => prev.filter(b => b !== brand));
                                if (supabaseStatus.connected) {
                                  await supabaseService.deleteBrand(brand);
                                }
                              }}
                              className={`p-1 rounded ${inUse ? 'opacity-20 cursor-not-allowed' : 'text-rose-500 hover:bg-rose-500/10'}`}
                              disabled={inUse}
                              title={inUse ? "ব্যবহার হচ্ছে" : "ডিলেট করুন"}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Collection Manager Column */}
                  <div className="bg-[#1a1614] border border-[#322822] rounded-[2rem] p-6 space-y-4">
                    <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                      <Sparkles className="h-5 w-5 text-indigo-400" />
                      <div>
                        <h2 className="font-extrabold text-sm">কালেকশন ম্যানেজমেন্ট</h2>
                        <p className="text-[10px] opacity-50">ঈদ, শীতকালীন, গ্রীষ্মকালীন বা বিশেষ কালেকশন</p>
                      </div>
                    </div>

                    {/* New Collection Input Form */}
                    <div className="flex space-x-2">
                      <input 
                        type="text"
                        placeholder="নতুন কালেকশন..."
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        className="flex-1 text-xs p-2.5 rounded-xl border border-[#322822]/50 bg-[#120e0c] outline-none"
                      />
                      <button 
                        onClick={async () => {
                          const trimmed = newCollectionName.trim();
                          if (trimmed) {
                            if (!collectionsList.includes(trimmed)) {
                              setCollectionsList(prev => [...prev, trimmed]);
                              setNewCollectionName('');
                              if (supabaseStatus.connected) {
                                await supabaseService.insertCollectionList(trimmed);
                              }
                            } else {
                              alert('কালেকশন আগে থেকেই বিদ্যমান আছে!');
                            }
                          }
                        }}
                        className="p-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white"
                        title="কালেকশন যোগ করুন"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Collections List */}
                    <div className="space-y-2 max-h-[350px] overflow-y-auto">
                      {collectionsList.map(col => {
                        const inUse = products.some(p => p.collection === col);
                        return (
                          <div key={col} className="flex justify-between items-center text-xs p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span className="font-medium">{col}</span>
                            <button
                              onClick={async () => {
                                if (inUse) {
                                  alert(`এই কালেকশন ডিলেট করা যাবে না। প্রোডাক্টে ব্যবহার হচ্ছে।`);
                                  return;
                                }
                                setCollectionsList(prev => prev.filter(c => c !== col));
                                if (supabaseStatus.connected) {
                                  await supabaseService.deleteCollectionList(col);
                                }
                              }}
                              className={`p-1 rounded ${inUse ? 'opacity-20 cursor-not-allowed' : 'text-rose-500 hover:bg-rose-500/10'}`}
                              disabled={inUse}
                              title={inUse ? "ব্যবহার হচ্ছে" : "ডিলেট করুন"}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* --------------------------------------------------------
                  SUB-TAB 3: COLLECTION SALES & PROFIT ANALYTICS
                  -------------------------------------------------------- */}
              {productSubTab === 'analytics' && (
                <div className="space-y-6">
                  
                  {/* Best Performing Highlights Card */}
                  {bestPerformingCollection && (
                    <div className="p-6 bg-gradient-to-r from-amber-500/10 via-indigo-500/5 to-transparent border border-amber-500/20 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-amber-500/20 text-amber-500 rounded-2xl">
                          <TrendingUp className="h-8 w-8" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">সর্বোচ্চ বিক্রিত কালেকশন (Best Performing)</span>
                          <h3 className="text-xl font-black text-[#f6f3ed]">{bestPerformingCollection.collectionName}</h3>
                          <p className="text-xs opacity-60 mt-1">
                            মোট <span className="text-amber-500 font-bold">{bestPerformingCollection.salesCount}টি</span> পণ্য ক্লিয়ারেন্স করা হয়েছে এবং মোট রেভিনিউ অর্জিত হয়েছে।
                          </p>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <span className="text-xs opacity-50 block">মোট কালেকশন রেভিনিউ</span>
                        <span className="text-2xl font-black text-amber-500 font-mono">{formatCurrency(bestPerformingCollection.revenue)}</span>
                      </div>
                    </div>
                  )}

                  {/* Collections Comparison Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {collectionStats.map(stat => {
                      const profitMargin = stat.revenue > 0 ? Math.round((stat.profit / stat.revenue) * 100) : 0;
                      return (
                        <div 
                          key={stat.collectionName}
                          className="bg-[#1a1614] border border-[#322822] rounded-[2.5rem] p-6 space-y-4 relative overflow-hidden group hover:border-[#e07a5f]/20 transition-all duration-300"
                        >
                          <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
                          
                          <div>
                            <span className="text-[10px] font-bold opacity-45 uppercase font-mono tracking-widest">Fashion Collection</span>
                            <h3 className="font-extrabold text-base text-[#f6f3ed] truncate">{stat.collectionName}</h3>
                          </div>

                          <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 text-center">
                            <div>
                              <span className="text-[10px] opacity-55 block uppercase">মোট রেভিনিউ</span>
                              <span className="font-mono text-sm font-black text-amber-500">{formatCurrency(stat.revenue)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] opacity-55 block uppercase">মোট প্রফিট</span>
                              <span className="font-mono text-sm font-black text-[#e07a5f]">{formatCurrency(stat.profit)}</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="opacity-60">ক্যাটালগে প্রোডাক্ট সংখ্যা:</span>
                              <span className="font-bold">{stat.productsCount} টি</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="opacity-60">অর্ডার সেলস ইউনিট:</span>
                              <span className="font-bold font-mono">{stat.salesCount} Pcs</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="opacity-60">প্রফিট মার্জিন রেট:</span>
                              <span className="font-bold font-mono text-emerald-500">{profitMargin}% Margin</span>
                            </div>
                          </div>

                          {/* Progress bar visualizer */}
                          <div className="pt-2">
                            <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, Math.max(5, stat.revenue > 0 ? (stat.profit / stat.revenue) * 100 : 0))}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {productSubTab === 'homepage-designer' && (
                <div className="space-y-6 animate-fade-in text-[#f6f3ed]">
                  
                  {/* View Header */}
                  <div className="bg-[#1a1614] p-6 rounded-3xl border border-[#322822]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-[#e07a5f] animate-pulse" />
                        <h2 className="text-xl font-extrabold tracking-tight">হোমপেজ ডিজাইনার (Homepage Designer)</h2>
                      </div>
                      <p className="opacity-70 text-xs leading-relaxed">
                        আপনার অনলাইন স্টোরের হোমপেজ লেআউট ও কাস্টম ডিজাইন নিয়ন্ত্রণ করুন। কাস্টমারদের কাছে স্টোরটিকে আরও আকর্ষণীয় করে তুলতে সঠিক লেআউটটি নির্বাচন করুন।
                      </p>
                    </div>
                    {(showClassicDesigner || showDynamicDesigner || showSmartDesigner) ? (
                      <button
                        onClick={() => {
                          setShowClassicDesigner(false);
                          setShowDynamicDesigner(false);
                          setShowSmartDesigner(false);
                          setEditingBannerId(null);
                          setEditingSmartBannerId(null);
                          setBannerForm({
                            desktopImageUrl: '',
                            mobileImageUrl: '',
                            title: '',
                            subtitle: '',
                            description: '',
                            button1Text: '',
                            button1Link: '',
                            button2Text: '',
                            button2Link: '',
                            overlayColor: 'rgba(0,0,0,0.4)',
                            textPosition: 'left',
                            isActive: true,
                            order: banners.length + 1
                          });
                        }}
                        className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>ডিজাইনার বন্ধ করুন (Back to Designer Home)</span>
                      </button>
                    ) : (
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="px-3.5 py-1.5 bg-[#e07a5f]/15 border border-[#e07a5f]/30 text-[#e07a5f] text-[10px] font-bold rounded-full self-start md:self-auto tracking-wider uppercase">
                          Visual Editor v2.1
                        </span>
                      </div>
                    )}
                  </div>

                  {showClassicDesigner ? (
                    /* Classic Premium Banner Designer */
                    <div className="space-y-6">
                      <div className="bg-[#1a1614] p-6 rounded-3xl border border-[#322822]/40 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#322822]/30 pb-4 gap-4">
                          <div>
                            <span className="px-2.5 py-1 bg-[#e07a5f]/10 text-[#e07a5f] text-[10px] font-extrabold rounded-md uppercase tracking-wider">Classic Designer</span>
                            <h3 className="text-base font-black tracking-tight mt-1">প্রিমিয়াম ব্যানার ম্যানেজার (Premium Banner Manager)</h3>
                            <p className="opacity-60 text-xs">আপনার স্টোরের মূল স্লাইডার ব্যানারগুলো পরিচালনা করুন। এগুলো গ্রাহকদের স্টোরে স্বয়ংক্রিয়ভাবে পরিবর্তিত (Auto Slide) হবে।</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Banner Slide Interval Settings Dropdown */}
                            <div className="flex items-center space-x-2 bg-black/35 px-3 py-1.5 rounded-xl border border-white/5">
                              <span className="text-[10px] font-bold text-[#e07a5f]">⏱️ Slide Interval:</span>
                              <select 
                                value={bannerSlideInterval}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  updateBannerSlideInterval(val);
                                  setDesignerSuccessMessage(`স্লাইডার পরিবর্তনের সময়সীমা ${val} সেকেন্ডে সেট করা হয়েছে!`);
                                }}
                                className="bg-[#120e0c] text-white text-[10px] font-bold border border-[#322822] rounded-lg p-1 outline-none focus:border-[#e07a5f] cursor-pointer"
                                id="designer-banner-interval-select"
                              >
                                <option value={3}>3 Seconds</option>
                                <option value={4}>4 Seconds</option>
                                <option value={5}>5 Seconds</option>
                              </select>
                            </div>

                            <button
                              onClick={() => {
                                const newId = 'banner_' + Date.now();
                                const newB: Banner = {
                                  id: newId,
                                  desktopImageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
                                  mobileImageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
                                  title: 'নতুন ধামাকা অফার ২০২৬',
                                  subtitle: 'Aura Premium Sports',
                                  description: 'আমাদের নতুন এবং এক্সক্লুসিভ স্টাইলিশ ফ্যাশন পণ্যের সমাহার এখন আপনার হাতের মুঠোয়। চমৎকার ফেব্রিক এবং আকর্ষণীয় ডিজাইন!',
                                  button1Text: 'এখনই কিনুন (Buy Now)',
                                  button1Link: '#products',
                                  button2Text: 'সব প্রোডাক্ট দেখুন',
                                  button2Link: '#products',
                                  overlayColor: 'rgba(0,0,0,0.45)',
                                  textPosition: 'left',
                                  isActive: true,
                                  order: banners.length + 1
                                };
                                setBanners(prev => [...prev, newB]);
                                setEditingBannerId(newId);
                                setBannerForm({ ...newB });
                                setDesignerSuccessMessage('সফলতা: নতুন ব্যানারটি তালিকায় যোগ করা হয়েছে এবং নিচে সম্পাদনার জন্য ফর্মটি লোড করা হয়েছে!');
                                setTimeout(() => {
                                  document.getElementById('classic-banner-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 150);
                              }}
                              className="px-4 py-2 bg-[#e07a5f] hover:bg-[#d06a4f] text-white text-xs font-black rounded-xl transition-all flex items-center space-x-1.5 shadow-lg shadow-orange-500/15 cursor-pointer border-none"
                            >
                              <Plus className="h-4 w-4" />
                              <span>নতুন ব্যানার যুক্ত করুন</span>
                            </button>

                            <button
                              onClick={() => {
                                setView('storefront');
                                setPublishedTheme('classic');
                                localStorage.setItem('aura_published_theme', 'classic');
                                setDesignerSuccessMessage('লাইভ প্রিভিউ মুড চালু হয়েছে! কাস্টমার হোমপেজে ব্যানারগুলো স্লাইড হওয়া দেখতে পাচ্ছেন।');
                              }}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/15 cursor-pointer border-none"
                              title="লাইভ স্টোরফ্রন্টে প্রিভিউ দেখুন"
                            >
                              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>লাইভ প্রিভিউ (Live Preview)</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                          {/* Banner List (Left Column) */}
                          <div className="xl:col-span-6 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider opacity-60">ব্যানার সমূহের তালিকা ({banners.length})</h4>
                            
                            {banners.length === 0 ? (
                              <div className="p-8 text-center bg-black/10 rounded-2xl border border-dashed border-[#322822] space-y-3">
                                <span className="text-2xl">🖼️</span>
                                <p className="text-xs font-bold text-neutral-300">কোনো ব্যানার খুঁজে পাওয়া যায়নি</p>
                                <p className="text-[10px] opacity-60">ডানদিকের ফর্মটি ব্যবহার করে আপনার প্রথম ব্যানার যোগ করুন অথবা নিচে ক্লিক করে ৩টি চমৎকার প্রিমিয়াম ডিফল্ট ব্যানার লোড করুন।</p>
                                <button
                                  onClick={() => {
                                    setBanners(DEFAULT_BANNERS);
                                    setDesignerSuccessMessage('সফলতা: ৩টি চমৎকার প্রিমিয়াম ডিফল্ট ব্যানার সফলভাবে রিস্টোর করা হয়েছে!');
                                  }}
                                  className="px-3 py-1.5 bg-[#e07a5f]/10 hover:bg-[#e07a5f] text-[#e07a5f] hover:text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer border border-[#e07a5f]/20"
                                >
                                  🔄 ডিফল্ট ব্যানারগুলো রিস্টোর করুন
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                                {[...banners].sort((a, b) => (a.order || 0) - (b.order || 0)).map((banner) => (
                                  <div 
                                    key={banner.id}
                                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-black/10
                                      ${editingBannerId === banner.id ? 'border-[#e07a5f] bg-[#e07a5f]/5' : 'border-[#322822]/40 hover:border-white/10'}`}
                                  >
                                    <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                                      {/* Banner thumbnail */}
                                      <div className="h-14 w-24 rounded-lg bg-neutral-900 border border-white/5 overflow-hidden shrink-0 relative">
                                        <img src={banner.desktopImageUrl} alt="" className="h-full w-full object-cover" />
                                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] font-mono px-1 rounded">
                                          Order: {banner.order}
                                        </span>
                                      </div>
                                      <div className="min-w-0 space-y-1">
                                        <div className="flex items-center space-x-2">
                                          <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${banner.isActive ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
                                          <h5 className="font-extrabold text-xs truncate text-white">{banner.title || 'শিরোনামহীন ব্যানার'}</h5>
                                        </div>
                                        <p className="text-[10px] opacity-60 truncate">{banner.subtitle || 'কোনো সাবটাইটেল নেই'}</p>
                                        <div className="flex items-center space-x-2 text-[9px] opacity-45">
                                          <span>Pos: {banner.textPosition}</span>
                                          <span>•</span>
                                          <span className="truncate max-w-[120px]" title={banner.desktopImageUrl}>Desktop UI Ready</span>
                                          <span>•</span>
                                          <span className="truncate max-w-[120px]" title={banner.mobileImageUrl}>Mobile UI Ready</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Actions button group */}
                                    <div className="flex sm:flex-col items-end gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#322822]/30 pt-3 sm:pt-0 shrink-0">
                                      <div className="flex items-center space-x-1.5">
                                        <button
                                          onClick={() => {
                                            // Move order up
                                            const sorted = [...banners].sort((a, b) => (a.order || 0) - (b.order || 0));
                                            const index = sorted.findIndex(b => b.id === banner.id);
                                            if (index > 0) {
                                              const newBanners = [...sorted];
                                              const temp = newBanners[index].order;
                                              newBanners[index].order = newBanners[index - 1].order;
                                              newBanners[index - 1].order = temp;
                                              setBanners(newBanners);
                                            }
                                          }}
                                          disabled={[...banners].sort((a, b) => (a.order || 0) - (b.order || 0)).findIndex(b => b.id === banner.id) === 0}
                                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-all disabled:opacity-35 disabled:hover:bg-white/5"
                                          title="উপরে সরান"
                                        >
                                          ↑
                                        </button>
                                        <button
                                          onClick={() => {
                                            // Move order down
                                            const sorted = [...banners].sort((a, b) => (a.order || 0) - (b.order || 0));
                                            const index = sorted.findIndex(b => b.id === banner.id);
                                            if (index < sorted.length - 1) {
                                              const newBanners = [...sorted];
                                              const temp = newBanners[index].order;
                                              newBanners[index].order = newBanners[index + 1].order;
                                              newBanners[index + 1].order = temp;
                                              setBanners(newBanners);
                                            }
                                          }}
                                          disabled={[...banners].sort((a, b) => (a.order || 0) - (b.order || 0)).findIndex(b => b.id === banner.id) === banners.length - 1}
                                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-all disabled:opacity-35 disabled:hover:bg-white/5"
                                          title="নিচে সরান"
                                        >
                                          ↓
                                        </button>
                                        <button
                                          onClick={() => {
                                            setEditingBannerId(banner.id);
                                            setBannerForm({ ...banner });
                                            setDesignerSuccessMessage(`"${banner.title}" ব্যানারটি এডিট করার জন্য ফর্ম লোড হয়েছে!`);
                                            setTimeout(() => {
                                              document.getElementById('classic-banner-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }, 100);
                                          }}
                                          className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-white border border-amber-500/20 text-amber-500 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                                        >
                                          সম্পাদনা
                                        </button>
                                        {bannerIdToDelete === banner.id ? (
                                          <div className="flex items-center space-x-1 bg-rose-500/15 p-1 rounded-lg border border-rose-500/30 animate-fade-in shrink-0">
                                            <span className="text-[9px] font-black text-rose-400 px-1">মুছবেন?</span>
                                            <button
                                              onClick={() => {
                                                const filtered = banners.filter(b => b.id !== banner.id);
                                                // Reassign orders cleanly
                                                const ordered = filtered.map((b, i) => ({ ...b, order: i + 1 }));
                                                setBanners(ordered);
                                                if (editingBannerId === banner.id) {
                                                  setEditingBannerId(null);
                                                }
                                                setBannerIdToDelete(null);
                                                setDesignerSuccessMessage(`"${banner.title}" ব্যানারটি সফলভাবে ডিলিট করা হয়েছে।`);
                                              }}
                                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-black rounded cursor-pointer border-none"
                                            >
                                              হ্যাঁ
                                            </button>
                                            <button
                                              onClick={() => setBannerIdToDelete(null)}
                                              className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 text-white text-[9px] font-black rounded cursor-pointer border-none"
                                            >
                                              না
                                            </button>
                                          </div>
                                        ) : (
                                          <button
                                            onClick={() => {
                                              setBannerIdToDelete(banner.id);
                                            }}
                                            className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/20 text-rose-500 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                                          >
                                            মুছুন
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Banner Form (Right Column) */}
                          <div id="classic-banner-form" className="xl:col-span-6 bg-[#161210] p-6 rounded-3xl border border-[#322822]/40 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e07a5f]">
                              {editingBannerId ? 'ব্যানার বিবরণ সম্পাদনা করুন (Edit Banner)' : 'নতুন ব্যানার বিবরণ যুক্ত করুন (Add Banner)'}
                            </h4>

                            <div className="space-y-4 text-xs">
                              {/* Desktop Image Upload & URL */}
                              <div className="space-y-1.5">
                                <label className="font-bold opacity-75">Desktop Banner Image URL:</label>
                                <input 
                                  type="text"
                                  value={bannerForm.desktopImageUrl || ''}
                                  onChange={(e) => setBannerForm(prev => ({ ...prev, desktopImageUrl: e.target.value }))}
                                  placeholder="যেমন: https://images.unsplash.com/..."
                                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50 font-mono"
                                />
                                
                                <div 
                                  className="border-2 border-dashed border-[#322822] hover:border-[#e07a5f]/40 rounded-xl p-3 bg-black/20 text-center cursor-pointer transition-all relative group"
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files?.[0];
                                    if (file && file.type.startsWith('image/')) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setBannerForm(prev => ({ ...prev, desktopImageUrl: reader.result as string }));
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                >
                                  <input 
                                    type="file"
                                    accept="image/*"
                                    id="desktop-banner-file"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          setBannerForm(prev => ({ ...prev, desktopImageUrl: reader.result as string }));
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                  <label htmlFor="desktop-banner-file" className="cursor-pointer block">
                                    <div className="flex items-center justify-center space-x-1.5">
                                      <PlusCircle className="h-4 w-4 text-[#e07a5f] opacity-80" />
                                      <span className="font-bold text-[10px]">Desktop ছবি আপলোড বা ড্রপ করুন</span>
                                    </div>
                                  </label>
                                </div>
                              </div>

                              {/* Mobile Image Upload is now removed, desktop image is auto-reused for both desktop and mobile layouts */}

                              {/* Title & Subtitle */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Main Title (ব্যানার প্রধান শিরোনাম):</label>
                                  <input 
                                    type="text"
                                    value={bannerForm.title || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="যেমন: নতুন ধামাকা অফার"
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Subtitle (ব্যানার সাবটাইটেল):</label>
                                  <input 
                                    type="text"
                                    value={bannerForm.subtitle || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, subtitle: e.target.value }))}
                                    placeholder="যেমন: Limited Stock Edition"
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50"
                                  />
                                </div>
                              </div>

                              {/* Description */}
                              <div className="space-y-1.5">
                                <label className="font-bold opacity-75">Description (ব্যানার বিবরণ):</label>
                                <textarea 
                                  value={bannerForm.description || ''}
                                  onChange={(e) => setBannerForm(prev => ({ ...prev, description: e.target.value }))}
                                  placeholder="অফার বা প্রোডাক্ট সম্পর্কে সংক্ষেপে কিছু লিখুন..."
                                  rows={2}
                                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50 leading-relaxed"
                                />
                              </div>

                              {/* Button 1 Text & Link */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Button 1 Text:</label>
                                  <input 
                                    type="text"
                                    value={bannerForm.button1Text || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, button1Text: e.target.value }))}
                                    placeholder="যেমন: এখনই অর্ডার করুন"
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Button 1 Link / Product ID:</label>
                                  <input 
                                    type="text"
                                    value={bannerForm.button1Link || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, button1Link: e.target.value }))}
                                    placeholder="যেমন: #products বা PROD-001"
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50"
                                  />
                                </div>
                              </div>

                              {/* Button 2 Text & Link */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Button 2 Text:</label>
                                  <input 
                                    type="text"
                                    value={bannerForm.button2Text || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, button2Text: e.target.value }))}
                                    placeholder="যেমন: সব প্রোডাক্ট দেখুন"
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Button 2 Link / Product ID:</label>
                                  <input 
                                    type="text"
                                    value={bannerForm.button2Link || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, button2Link: e.target.value }))}
                                    placeholder="যেমন: #products"
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50"
                                  />
                                </div>
                              </div>

                              {/* Overlay Color & Text Position */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Overlay Color (ব্যানার ওভারলে কালার):</label>
                                  <input 
                                    type="text"
                                    value={bannerForm.overlayColor || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, overlayColor: e.target.value }))}
                                    placeholder="যেমন: rgba(0,0,0,0.4)"
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50 font-mono"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Text Position (শিরোনাম পজিশন):</label>
                                  <select
                                    value={bannerForm.textPosition || 'left'}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, textPosition: e.target.value as any }))}
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50"
                                  >
                                    <option value="left">Left (বাম পাশে)</option>
                                    <option value="center">Center (মাঝখানে)</option>
                                    <option value="right">Right (ডান পাশে)</option>
                                  </select>
                                </div>
                              </div>

                              {/* Banner Order & Active Toggle */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <div className="space-y-1.5">
                                  <label className="font-bold opacity-75">Banner Order (ব্যানার ক্রম):</label>
                                  <input 
                                    type="number"
                                    min="1"
                                    value={bannerForm.order || ''}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, order: Number(e.target.value) }))}
                                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-[#e07a5f]/50 font-mono"
                                  />
                                </div>
                                <div className="flex items-center space-x-2.5 pt-4">
                                  <input 
                                    type="checkbox"
                                    id="banner-is-active"
                                    checked={bannerForm.isActive ?? true}
                                    onChange={(e) => setBannerForm(prev => ({ ...prev, isActive: e.target.checked }))}
                                    className="rounded border-[#322822] bg-[#120e0c] text-[#e07a5f] focus:ring-[#e07a5f]"
                                  />
                                  <label htmlFor="banner-is-active" className="font-bold opacity-75 cursor-pointer">
                                    ব্যানারটি সক্রিয় রাখুন (Active)
                                  </label>
                                </div>
                              </div>

                              {/* Form Buttons */}
                              <div className="flex gap-2 pt-4 border-t border-[#322822]/40">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingBannerId(null);
                                    setBannerForm({
                                      desktopImageUrl: '',
                                      mobileImageUrl: '',
                                      title: '',
                                      subtitle: '',
                                      description: '',
                                      button1Text: '',
                                      button1Link: '',
                                      button2Text: '',
                                      button2Link: '',
                                      overlayColor: 'rgba(0,0,0,0.4)',
                                      textPosition: 'left',
                                      isActive: true,
                                      order: banners.length + 1
                                    });
                                  }}
                                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 rounded-xl font-bold transition-all"
                                >
                                  বাতিল (Clear)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!bannerForm.desktopImageUrl) {
                                      setDesignerSuccessMessage('ত্রুটি: দয়া করে অন্তত একটি ডেক্সটপ ইমেজ ইউআরএল (Desktop Image URL) প্রদান করুন!');
                                      return;
                                    }
                                    
                                    if (editingBannerId) {
                                      const updated = banners.map(b => b.id === editingBannerId ? { ...b, ...bannerForm, mobileImageUrl: bannerForm.desktopImageUrl } as Banner : b);
                                      setBanners(updated);
                                      setDesignerSuccessMessage('অভিনন্দন! আপনার ব্যানার বিবরণটি সফলভাবে আপডেট করা হয়েছে এবং লাইভ স্টোরে পরিবর্তন প্রতিফলিত হয়েছে।');
                                      setEditingBannerId(null);
                                    } else {
                                      const newBanner: Banner = {
                                        id: 'banner_' + Date.now(),
                                        desktopImageUrl: bannerForm.desktopImageUrl || '',
                                        mobileImageUrl: bannerForm.desktopImageUrl || '',
                                        title: bannerForm.title || '',
                                        subtitle: bannerForm.subtitle || '',
                                        description: bannerForm.description || '',
                                        button1Text: bannerForm.button1Text || '',
                                        button1Link: bannerForm.button1Link || '',
                                        button2Text: bannerForm.button2Text || '',
                                        button2Link: bannerForm.button2Link || '',
                                        overlayColor: bannerForm.overlayColor || 'rgba(0,0,0,0.4)',
                                        textPosition: bannerForm.textPosition || 'left',
                                        isActive: bannerForm.isActive ?? true,
                                        order: bannerForm.order || (banners.length + 1)
                                      };
                                      setBanners([...banners, newBanner]);
                                      setDesignerSuccessMessage('সফলতা: আপনার নতুন স্লাইডার ব্যানারটি সফলভাবে তৈরি করা হয়েছে এবং লুপ সিকোয়েন্সে যুক্ত হয়েছে।');
                                    }
                                    setBannerForm({
                                      desktopImageUrl: '',
                                      mobileImageUrl: '',
                                      title: '',
                                      subtitle: '',
                                      description: '',
                                      button1Text: '',
                                      button1Link: '',
                                      button2Text: '',
                                      button2Link: '',
                                      overlayColor: 'rgba(0,0,0,0.4)',
                                      textPosition: 'left',
                                      isActive: true,
                                      order: banners.length + 1
                                    });
                                  }}
                                  className="flex-1 py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-black rounded-xl transition-all shadow-lg shadow-orange-500/10"
                                >
                                  {editingBannerId ? 'আপডেট করুন (Update)' : 'সংরক্ষণ করুন (Save)'}
                                </button>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : showDynamicDesigner ? (
                    /* Dynamic Layout Builder UI */
                    <div className="space-y-6 animate-fade-in text-left">
                      {/* Top Action Bar */}
                      <div className="bg-[#1a1614] p-5 rounded-3xl border border-[#322822]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-mono">Premium Designer Mode</span>
                          </div>
                          <h3 className="text-lg font-black text-white font-sans">ডাইনামিক থিম লেআউট বিল্ডার (Dynamic Theme Layout Builder)</h3>
                          <p className="opacity-70 text-xs font-sans">হোমপেজ সেকশনগুলোর অর্ডার পরিবর্তন করুন, ভিজিবিলিটি টগল এবং প্রিসেট সেটিংস কাস্টমাইজ করুন।</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => {
                              try {
                                localStorage.setItem('aura_dynamic_sections_config', JSON.stringify(dynamicSections));
                                setPublishedTheme('dynamic');
                                localStorage.setItem('aura_published_theme', 'dynamic');
                                setDesignerSuccessMessage('অভিনন্দন! আপনার ডাইনামিক লেআউট কনফিগারেশন সফলভাবে সেভ ও পাবলিশ করা হয়েছে এবং কাস্টমার স্টোরে লাইভ করা হয়েছে।');
                              } catch(e) {
                                setDesignerSuccessMessage('লেআউট সফলভাবে সংরক্ষিত হয়েছে!');
                              }
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/15 flex items-center space-x-1.5 transition-all cursor-pointer border-none"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>Save Layout</span>
                          </button>
                          <button
                            onClick={() => {
                              const activeSecs = dynamicSections.filter(s => s.visible).map(s => s.bengaliName).join(', ');
                              setDesignerSuccessMessage(`লাইভ স্টোরফ্রন্ট প্রিভিউ লোড হচ্ছে... ভিউ মোড: ${designerPreviewMode.toUpperCase()} | সক্রিয় সেকশনসমূহ: ${activeSecs || 'কোনো সেকশন নেই'}`);
                            }}
                            className="px-4 py-2 bg-[#2c221e] hover:bg-[#3d302a] text-white font-extrabold text-xs rounded-xl border border-[#4e3c32] flex items-center space-x-1.5 transition-all cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5 text-indigo-400" />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={() => {
                              if(confirm('আপনি কি লেআউটটি ডিফল্ট বিন্যাসে ফিরিয়ে নিতে চান?')) {
                                setDynamicSections([
                                  { id: 'hero', name: 'Hero Banner', bengaliName: 'হিরো ব্যানার', visible: true, description: 'মাল্টি-স্লাইড প্রমোショナル ব্যানার', category: 'Hero & Visuals' },
                                  { id: 'categories', name: 'Categories', bengaliName: 'ক্যাটাগরি লিস্ট', visible: true, description: 'দ্রুত পণ্য ফিল্টারিং চিপস', category: 'Navigation' },
                                  { id: 'featured_products', name: 'Featured Products', bengaliName: 'ফিচার্ড প্রোডাক্টস', visible: true, description: 'নির্বাচিত আকর্ষণীয় জার্সি কালেকশন', category: 'Product Showcase' },
                                  { id: 'flash_sale', name: 'Flash Sale', bengaliName: 'ফ্ল্যাশ সেল প্যানেল', visible: true, description: 'কাউন্টডাউন সহ আকর্ষণীয় অফার', category: 'Promotions' },
                                  { id: 'collections', name: 'Collections', bengaliName: 'কালেকশনস গ্রিড', visible: true, description: 'বিশেষ কাস্টম ও থিমেটিক কালেকশন', category: 'Product Showcase' },
                                  { id: 'brand_logos', name: 'Brand Logos', bengaliName: 'ব্র্যান্ড লোগো ব্যান্ড', visible: true, description: 'অংশীদার ব্র্যান্ডের চমৎকার লোগো স্লাইডার', category: 'Social Proof' },
                                  { id: 'testimonials', name: 'Testimonials', bengaliName: 'গ্রাহকদের মতামত', visible: true, description: 'গ্রাহকদের রিভিউ ও ফিডব্যাক রিভিউ কার্ড', category: 'Social Proof' },
                                  { id: 'newsletter', name: 'Newsletter', bengaliName: 'নিউজলেটার সাবস্ক্রিপশন', visible: true, description: 'ইমেইল সাবস্ক্রিপশন ও অফার এলার্ট ফর্ম', category: 'Marketing' },
                                  { id: 'footer', name: 'Footer', bengaliName: 'ফুটার সেকশন', visible: true, description: 'যোগাযোগের ঠিকানা ও স্টোরের লিঙ্কসমূহ', category: 'Structure' },
                                ]);
                                setDesignerPreviewSection(null);
                                alert('লেআউট ডিফল্ট অবস্থায় রিসেট করা হয়েছে।');
                              }
                            }}
                            className="px-4 py-2 bg-neutral-900/50 hover:bg-neutral-900/80 text-neutral-300 font-extrabold text-xs rounded-xl border border-white/5 flex items-center space-x-1.5 transition-all cursor-pointer"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Reset Layout</span>
                          </button>
                        </div>
                      </div>

                      {/* Main Workspace Layout - 12 Column Responsive Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Left Side: Homepage Sections List & Custom Settings (col-span-6) */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="bg-[#1a1614] rounded-3xl border border-[#322822]/40 overflow-hidden shadow-xl">
                            <div className="p-5 border-b border-[#322822]/40 bg-black/10 flex items-center justify-between">
                              <div className="space-y-0.5 text-left">
                                <h4 className="text-sm font-extrabold text-white">হোমপেজ সেকশন তালিকা (Homepage Sections List)</h4>
                                <p className="opacity-60 text-[11px] font-sans">অর্ডার ডানে বাটন দিয়ে সাজান, প্রিভিউ ও সেটিংস ম্যানেজ করুন।</p>
                              </div>
                              <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 text-[10px] font-black rounded-lg border border-indigo-500/20">
                                {dynamicSections.length} Sections Available
                              </span>
                            </div>

                            <div className="divide-y divide-[#322822]/40 p-4 space-y-3">
                              {dynamicSections.map((section, idx) => {
                                const isSelected = selectedDynamicSection === section.id || designerPreviewSection === section.id;
                                const isVisible = section.visible;
                                return (
                                  <div
                                    key={section.id}
                                    onClick={() => {
                                      setSelectedDynamicSection(section.id);
                                      setDesignerPreviewSection(section.id);
                                    }}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer group text-left space-y-3 relative overflow-hidden
                                      ${isSelected 
                                        ? 'bg-indigo-500/[0.04] border-indigo-500/50 shadow-md shadow-indigo-500/[0.02]' 
                                        : 'bg-black/10 border-white/5 hover:border-white/10'}`}
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <div className="flex items-center space-x-2.5 min-w-0">
                                        {/* Drag Handle UI */}
                                        <div className="text-neutral-500 hover:text-neutral-300 p-1 shrink-0 flex items-center space-x-2 border-r border-white/5 pr-2.5">
                                          <span className="text-xs font-mono select-none opacity-60">☰</span>
                                          {/* Mini move arrows for instant reordering! */}
                                          <div className="flex flex-col -space-y-1">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                moveSection(idx, 'up');
                                              }}
                                              disabled={idx === 0}
                                              className="p-0.5 text-neutral-600 hover:text-indigo-400 disabled:opacity-35 cursor-pointer transition-colors"
                                              title="Move Up"
                                            >
                                              ▲
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                moveSection(idx, 'down');
                                              }}
                                              disabled={idx === dynamicSections.length - 1}
                                              className="p-0.5 text-neutral-600 hover:text-indigo-400 disabled:opacity-35 cursor-pointer transition-colors"
                                              title="Move Down"
                                            >
                                              ▼
                                            </button>
                                          </div>
                                        </div>

                                        {/* Index, Name, and Desc */}
                                        <div className="space-y-0.5 min-w-0">
                                          <div className="flex items-center space-x-2">
                                            <span className="text-[10px] font-mono opacity-50 shrink-0">0{idx + 1}</span>
                                            <p className={`text-xs font-black truncate ${isVisible ? 'text-white' : 'text-neutral-500 line-through'}`}>
                                              {section.name} <span className="text-[10px] font-normal opacity-60">({section.bengaliName})</span>
                                            </p>
                                          </div>
                                          <p className="text-[10px] opacity-50 truncate max-w-xs font-sans">
                                            {section.description}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Category Chip */}
                                      <span className="hidden sm:inline-block px-1.5 py-0.5 text-[8px] font-mono rounded bg-neutral-800 text-neutral-400 shrink-0 uppercase tracking-wider">
                                        {section.category}
                                      </span>
                                    </div>

                                    {/* Action buttons footer for constraints */}
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5" onClick={(e) => e.stopPropagation()}>
                                      {/* Visible Status tag */}
                                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wider ${
                                        isVisible ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                                      }`}>
                                        {isVisible ? 'Active' : 'Hidden'}
                                      </span>

                                      {/* Buttons collection */}
                                      <div className="flex items-center space-x-1.5">
                                        {/* Show / Hide Toggle */}
                                        <button
                                          onClick={() => {
                                            setDynamicSections(dynamicSections.map(s => 
                                              s.id === section.id ? { ...s, visible: !s.visible } : s
                                            ));
                                          }}
                                          title={isVisible ? 'হাইড করুন (Hide)' : 'দেখুন (Show)'}
                                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                            isVisible 
                                              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20' 
                                              : 'bg-neutral-900 text-neutral-500 border-white/5 hover:text-neutral-300'
                                          }`}
                                        >
                                          {isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                                        </button>

                                        {/* Settings Button */}
                                        <button
                                          onClick={() => setShowSettingsSectionId(showSettingsSectionId === section.id ? null : section.id)}
                                          title="সেটিংস কাস্টমাইজ করুন"
                                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                            showSettingsSectionId === section.id
                                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                              : 'bg-neutral-900 text-neutral-400 border-white/5 hover:text-white hover:bg-neutral-800'
                                          }`}
                                        >
                                          <Settings className="h-3.5 w-3.5" />
                                        </button>

                                        {/* Mobile Preview Button */}
                                        <button
                                          onClick={() => {
                                            setSelectedDynamicSection(section.id);
                                            setDesignerPreviewSection(section.id);
                                            setDesignerPreviewMode('mobile');
                                          }}
                                          title="মোবাইল লেআউটে প্রিভিউ করুন"
                                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                            designerPreviewSection === section.id && designerPreviewMode === 'mobile'
                                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                                              : 'bg-neutral-900 text-neutral-400 border-white/5 hover:text-white hover:bg-neutral-800'
                                          }`}
                                        >
                                          <Smartphone className="h-3.5 w-3.5" />
                                        </button>

                                        {/* Desktop Preview Button */}
                                        <button
                                          onClick={() => {
                                            setSelectedDynamicSection(section.id);
                                            setDesignerPreviewSection(section.id);
                                            setDesignerPreviewMode('desktop');
                                          }}
                                          title="ডেস্কটপ লেআউটে প্রিভিউ করুন"
                                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                            designerPreviewSection === section.id && designerPreviewMode === 'desktop'
                                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                                              : 'bg-neutral-900 text-neutral-400 border-white/5 hover:text-white hover:bg-neutral-800'
                                          }`}
                                        >
                                          <Monitor className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Tips panel */}
                            <div className="p-4 bg-indigo-950/20 border-t border-[#322822]/40 text-[11px] opacity-70 flex items-center space-x-2 text-left">
                              <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 animate-pulse" />
                              <span className="font-sans">টিপস: অর্ডার আপ ও ডাউন এরোতে চাপলে লাইভ প্রিভিউ প্যানেলে সেটির বিন্যাস রিয়েল-টাইমে পরিবর্তিত হয়।</span>
                            </div>
                          </div>

                          {/* Custom Settings Panel inside Left Side */}
                          <div className="bg-[#1a1614] rounded-3xl border border-[#322822]/40 p-5 space-y-4 shadow-xl text-left">
                            <div className="flex items-center justify-between border-b border-[#322822]/40 pb-3">
                              <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 flex items-center space-x-1.5">
                                <Settings className="h-4 w-4" />
                                <span>সেকশন সেটিংস কনফিগারেশন (Custom Settings)</span>
                              </h4>
                              {showSettingsSectionId && (
                                <button 
                                  onClick={() => setShowSettingsSectionId(null)}
                                  className="text-[10px] text-neutral-400 hover:text-white bg-white/5 px-2 py-0.5 rounded"
                                >
                                  Close
                                </button>
                              )}
                            </div>

                            {/* Section Specific Settings Inputs Form */}
                            {(() => {
                              const activeSec = dynamicSections.find(s => s.id === (showSettingsSectionId || selectedDynamicSection));
                              if (!activeSec) return (
                                <p className="opacity-50 text-xs italic py-2">যেকোনো সেকশনের সেটিংস বাটনে চাপুন অথবা সেকশন সিলেক্ট করুন সেটিংস কনফিগার করতে।</p>
                              );

                              return (
                                <div className="space-y-4 text-xs">
                                  <div className="p-3 bg-amber-500/[0.03] border border-amber-500/20 rounded-xl space-y-1">
                                    <p className="font-bold text-amber-500">{activeSec.name} সেটিংস প্যানেল</p>
                                    <p className="text-[10px] opacity-60 font-sans">এই সেকশনটির জন্য কাস্টম হেডার, টেক্সট বা লেআউট প্যারামিটার পরিবর্তন করুন:</p>
                                  </div>

                                  <div className="space-y-3">
                                    <div>
                                      <label className="block text-[11px] opacity-70 mb-1 font-bold">সেকশন শিরোনাম (Section Title):</label>
                                      <input 
                                        type="text" 
                                        defaultValue={activeSec.bengaliName} 
                                        onChange={(e) => {
                                          const updated = dynamicSections.map(s => 
                                            s.id === activeSec.id ? { ...s, bengaliName: e.target.value } : s
                                          );
                                          setDynamicSections(updated);
                                        }}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all" 
                                      />
                                    </div>

                                    <div className="pt-1.5 border-t border-white/5">
                                      <button
                                        type="button"
                                        onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                                        className="w-full py-2 px-3 bg-[#1e1917] hover:bg-neutral-800 text-neutral-300 text-[10px] font-black rounded-xl transition-all flex items-center justify-between cursor-pointer border border-white/5"
                                      >
                                        <span>⚙️ Advanced Settings (উন্নত সেটিংস)</span>
                                        <span className="font-mono text-[9px]">{showAdvancedSettings ? 'Hide ▲' : 'Show ▼'}</span>
                                      </button>
                                    </div>

                                    {showAdvancedSettings && (
                                      <div className="space-y-4 pt-3 border-t border-white/5 animate-fade-in">
                                        {activeSec.id === 'hero' && (
                                          <div className="space-y-2 text-left">
                                            <div>
                                              <label className="block text-[11px] opacity-70 mb-1 font-bold">Auto Slide Interval:</label>
                                              <select defaultValue="5 Seconds" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none">
                                                <option>3 Seconds</option>
                                                <option>5 Seconds</option>
                                                <option>8 Seconds</option>
                                              </select>
                                            </div>
                                            <div className="flex items-center space-x-2 pt-1 justify-start">
                                              <input type="checkbox" defaultChecked className="rounded text-indigo-500" />
                                              <span className="text-[11px] opacity-70 font-sans">লুপ এনিমেশন এনাবেল করুন (Loop Animation)</span>
                                            </div>
                                          </div>
                                        )}

                                        {activeSec.id === 'flash_sale' && (
                                          <div className="space-y-2 text-left">
                                            <div>
                                              <label className="block text-[11px] opacity-70 mb-1 font-bold">কাউন্টডাউন টাইম (Countdown Target Date):</label>
                                              <input type="datetime-local" defaultValue="2026-07-15T18:00" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-xs text-white" />
                                            </div>
                                            <div>
                                              <label className="block text-[11px] opacity-70 mb-1 font-bold">ডিসকাউন্ট হার (Discount Percentage):</label>
                                              <input type="text" defaultValue="50% OFF" className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-xs text-white" />
                                            </div>
                                          </div>
                                        )}

                                        {activeSec.id !== 'hero' && activeSec.id !== 'flash_sale' && (
                                          <div className="text-left">
                                            <label className="block text-[11px] opacity-70 mb-1 font-bold">সর্বোচ্চ আইটেম সংখ্যা (Max Visible Items):</label>
                                            <input 
                                              type="number" 
                                              defaultValue={activeSec.id === 'brand_logos' ? 6 : 4} 
                                              className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none" 
                                            />
                                          </div>
                                        )}

                                        <button 
                                          type="button"
                                          onClick={() => {
                                            setDesignerSuccessMessage(`${activeSec.bengaliName} সেকশনের নতুন সেটিংস ড্রাফট হিসেবে সেভ হয়েছে!`);
                                            setShowSettingsSectionId(null);
                                          }}
                                          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-xl text-xs transition-all tracking-wider uppercase cursor-pointer"
                                        >
                                          Apply Settings
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Right Side: GRAND LIVE HOMEPAGE PREVIEW PANEL (col-span-6) */}
                        <div className="lg:col-span-6 flex flex-col space-y-4">
                          <div className="bg-[#1a1614] rounded-3xl border border-[#322822]/40 p-5 space-y-4 shadow-xl flex-1 flex flex-col justify-between">
                            
                            {/* Preview Control Switch bar */}
                            <div className="flex items-center justify-between border-b border-[#322822]/40 pb-3 flex-wrap gap-2">
                              <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
                                  <span>লাইভ হোমপেজ ডিজাইন প্রিভিউ (Live Preview Panel)</span>
                                </h4>
                              </div>

                              {/* Toggle Device Frame */}
                              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/5">
                                <button
                                  onClick={() => setDesignerPreviewMode('mobile')}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center space-x-1 ${
                                    designerPreviewMode === 'mobile'
                                      ? 'bg-indigo-500 text-white shadow-md'
                                      : 'text-neutral-400 hover:text-white'
                                  }`}
                                >
                                  <Smartphone className="h-3 w-3" />
                                  <span>Mobile</span>
                                </button>
                                <button
                                  onClick={() => setDesignerPreviewMode('desktop')}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center space-x-1 ${
                                    designerPreviewMode === 'desktop'
                                      ? 'bg-indigo-500 text-white shadow-md'
                                      : 'text-neutral-400 hover:text-white'
                                  }`}
                                >
                                  <Monitor className="h-3 w-3" />
                                  <span>Desktop</span>
                                </button>
                              </div>
                            </div>

                            {/* DEVICE PREVIEW AREA */}
                            <div className="flex-1 py-4 flex items-center justify-center bg-black/10 rounded-2xl border border-white/5 overflow-hidden">
                              
                              {designerPreviewMode === 'mobile' ? (
                                /* SMARTPHONE MOCKUP */
                                <div className="w-full max-w-[280px] sm:max-w-[310px] rounded-[3rem] border-[8px] border-neutral-800 bg-[#120e0c] shadow-2xl relative overflow-hidden flex flex-col aspect-[9/18]">
                                  {/* Camera notch / pill */}
                                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-30 flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 bg-neutral-900 rounded-full"></div>
                                  </div>
                                  
                                  {/* Mobile Status Bar */}
                                  <div className="h-6 bg-[#120e0c] flex items-center justify-between px-6 text-[8px] font-bold text-white/80 select-none z-20">
                                    <span>9:41</span>
                                    <div className="flex items-center space-x-1">
                                      <span>📶</span>
                                      <span>🔋</span>
                                    </div>
                                  </div>

                                  {/* Interactive Viewport */}
                                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 pr-0.5 space-y-4 p-3 bg-[#0d0908] text-left">
                                    {/* Small Floating Shop Header */}
                                    <div className="border-b border-white/5 pb-2 flex items-center justify-between">
                                      <span className="text-[10px] font-black tracking-wider text-white">TREND ZONE BD</span>
                                      <span className="text-[9px] text-indigo-400">⚡ Store</span>
                                    </div>

                                    {/* Render dynamicSections in exact sorted order */}
                                    {dynamicSections.filter(s => s.visible).map((section) => {
                                      const isHighlighted = selectedDynamicSection === section.id || designerPreviewSection === section.id;
                                      return (
                                        <div 
                                          key={section.id}
                                          onClick={() => {
                                            setSelectedDynamicSection(section.id);
                                            setDesignerPreviewSection(section.id);
                                          }}
                                          className={`relative rounded-xl overflow-hidden transition-all duration-300 border-2 cursor-pointer
                                            ${isHighlighted 
                                              ? 'border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.25)] ring-1 ring-indigo-400' 
                                              : 'border-white/5 hover:border-white/15'}`}
                                        >
                                          {/* Mini Badge Indicator */}
                                          <div className="absolute top-1 left-1.5 z-10 px-1.5 py-0.5 bg-black/70 text-[6px] font-mono rounded text-white font-bold pointer-events-none">
                                            {section.bengaliName}
                                          </div>

                                          {/* Section Contents */}
                                          {section.id === 'hero' && (
                                            <div className="h-32 bg-cover bg-center flex flex-col justify-end p-2.5 relative"
                                              style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 40%, transparent), url('https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=600')` }}>
                                              <p className="text-[6px] text-amber-400 uppercase tracking-widest font-black font-sans">Aura Elite Kits</p>
                                              <h5 className="text-[9px] font-black text-white leading-tight mt-0.5">নতুন ধামাকা ফুটবল কালেকশন</h5>
                                              <div className="flex space-x-1 mt-1 font-sans">
                                                <span className="px-2 py-0.5 bg-indigo-500 text-white text-[5px] font-bold rounded">Buy Now</span>
                                                <span className="px-2 py-0.5 bg-white/10 text-white text-[5px] font-bold rounded">Details</span>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'categories' && (
                                            <div className="p-2 bg-neutral-900/60 space-y-1.5 font-sans">
                                              <div className="flex overflow-x-auto gap-1 pb-0.5 scrollbar-none">
                                                <span className="px-2 py-0.5 bg-indigo-500 text-white text-[6px] font-bold rounded-full shrink-0">⚡ Premium Jersey</span>
                                                <span className="px-2 py-0.5 bg-[#120e0c] text-neutral-400 text-[6px] rounded-full shrink-0">Retro Fit</span>
                                                <span className="px-2 py-0.5 bg-[#120e0c] text-neutral-400 text-[6px] rounded-full shrink-0">Slim Fit</span>
                                                <span className="px-2 py-0.5 bg-[#120e0c] text-neutral-400 text-[6px] rounded-full shrink-0">Full Kit</span>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'featured_products' && (
                                            <div className="p-2 bg-neutral-900/40 space-y-1.5">
                                              <div className="grid grid-cols-2 gap-1.5 font-sans">
                                                {[
                                                  { name: 'RM Stealth Carbon', price: '৳১৪৫০', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=150' },
                                                  { name: 'ARG Retro Worldcup', price: '৳১৩৮০', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150' },
                                                ].map((p, i) => (
                                                  <div key={i} className="bg-black/30 p-1 rounded-lg border border-white/5 text-center">
                                                    <div className="h-12 bg-neutral-800 rounded overflow-hidden">
                                                      <img src={p.img} alt={p.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                                                    </div>
                                                    <p className="text-[7px] font-bold truncate text-white mt-1">{p.name}</p>
                                                    <p className="text-[7px] text-indigo-400 font-mono font-bold">{p.price}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'flash_sale' && (
                                            <div className="p-2.5 bg-rose-950/20 border border-rose-500/10 space-y-1.5 font-sans">
                                              <div className="flex justify-between items-center text-[7px]">
                                                <span className="text-rose-400 font-black">🔥 FLASH DEAL -50%</span>
                                                <span className="font-mono text-white bg-rose-500/30 px-1 rounded">02h : 14m</span>
                                              </div>
                                              <div className="h-1 bg-neutral-800 rounded overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 w-3/4"></div>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'collections' && (
                                            <div className="p-2 bg-neutral-900/60 space-y-1">
                                              <div className="grid grid-cols-2 gap-1.5 text-center font-sans">
                                                <div className="bg-[#120e0c] p-1.5 rounded border border-white/5 flex flex-col justify-center">
                                                  <span className="text-[7px] font-black text-white">Retro Masterpieces</span>
                                                  <span className="text-[5px] text-indigo-400">14+ items</span>
                                                </div>
                                                <div className="bg-[#120e0c] p-1.5 rounded border border-white/5 flex flex-col justify-center">
                                                  <span className="text-[7px] font-black text-white">Fan Version Kits</span>
                                                  <span className="text-[5px] text-indigo-400">22+ items</span>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'brand_logos' && (
                                            <div className="p-1.5 bg-black/40 flex justify-between items-center gap-1 overflow-x-auto text-[5px] text-neutral-400 font-mono select-none">
                                              <span>⚡ AURA LUX</span>
                                              <span>● MONACO</span>
                                              <span>▲ VANGUARD</span>
                                              <span>❖ BREEZE</span>
                                            </div>
                                          )}

                                          {section.id === 'testimonials' && (
                                            <div className="p-2 bg-neutral-900/40 space-y-1 font-sans">
                                              <div className="bg-[#120e0c] p-1.5 rounded text-[6px] text-neutral-300">
                                                <div className="flex justify-between text-yellow-500">
                                                  <span>রাকিব হাসান</span>
                                                  <span>★★★★★</span>
                                                </div>
                                                <p className="opacity-70 mt-0.5 line-clamp-1">জার্সির কোয়ালিটি অসাধারণ!</p>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'newsletter' && (
                                            <div className="p-2 bg-indigo-950/20 text-center space-y-1 font-sans">
                                              <p className="text-[7px] font-black text-indigo-300">ইনবক্সে বিশেষ কুপন কোড পান!</p>
                                              <div className="flex gap-1">
                                                <input type="text" placeholder="Your Email" disabled className="bg-black/40 border border-white/10 rounded px-1 text-[6px] text-white flex-1 focus:outline-none" />
                                                <button disabled className="bg-indigo-600 text-white font-bold text-[5px] px-1.5 py-0.5 rounded">Join</button>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'footer' && (
                                            <div className="p-2.5 bg-[#120e0c] text-[6px] text-neutral-500 text-center font-sans">
                                              <p className="font-bold text-white text-[7px]">Trend Zone BD</p>
                                              <p className="mt-0.5">© ২০২৬ Trend Zone. All Rights Reserved.</p>
                                            </div>
                                          )}

                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : (
                                /* BROWSER/DESKTOP MOCKUP */
                                <div className="w-full max-w-[450px] sm:max-w-[500px] rounded-2xl border-4 border-neutral-800 bg-[#120e0c] shadow-2xl relative overflow-hidden flex flex-col aspect-[16/11]">
                                  {/* Browser Header Controls */}
                                  <div className="h-8 bg-[#120e0c] flex items-center justify-between px-3.5 text-neutral-400 select-none border-b border-white/5">
                                    <div className="flex items-center space-x-1.5">
                                      <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                                      <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                                    </div>
                                    <div className="bg-black/30 rounded-md px-6 py-0.5 text-[7px] text-neutral-400 font-mono tracking-wider w-48 text-center truncate">
                                      https://trendzone.com.bd/live
                                    </div>
                                    <span className="text-[9px]">☰</span>
                                  </div>

                                  {/* Viewport content */}
                                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 pr-0.5 space-y-5 p-4 bg-[#0d0908] text-left">
                                    {/* Desktop Floating Store Header */}
                                    <div className="border-b border-white/5 pb-2.5 flex items-center justify-between font-sans">
                                      <span className="text-xs font-black tracking-wider text-white">TREND ZONE BD (প্রিমিয়াম অনলাইন স্টোর)</span>
                                      <div className="flex space-x-2 text-[8px] text-neutral-400">
                                        <span>হোম</span>
                                        <span>জার্সি কালেকশন</span>
                                        <span>অর্ডার ট্র্যাকিং</span>
                                        <span className="text-indigo-400 font-bold">⚡ হট অফার</span>
                                      </div>
                                    </div>

                                    {/* Render dynamicSections in exact sorted order */}
                                    {dynamicSections.filter(s => s.visible).map((section) => {
                                      const isHighlighted = selectedDynamicSection === section.id || designerPreviewSection === section.id;
                                      return (
                                        <div 
                                          key={section.id}
                                          onClick={() => {
                                            setSelectedDynamicSection(section.id);
                                            setDesignerPreviewSection(section.id);
                                          }}
                                          className={`relative rounded-2xl overflow-hidden transition-all duration-300 border-2 cursor-pointer
                                            ${isHighlighted 
                                              ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)] ring-1 ring-indigo-400' 
                                              : 'border-white/5 hover:border-white/15'}`}
                                        >
                                          {/* Mini Badge Indicator */}
                                          <div className="absolute top-2 left-3.5 z-10 px-2 py-0.5 bg-black/80 text-[8px] font-mono rounded text-white font-bold pointer-events-none">
                                            {section.bengaliName}
                                          </div>

                                          {/* Section Contents */}
                                          {section.id === 'hero' && (
                                            <div className="h-44 bg-cover bg-center flex flex-col justify-end p-4 relative"
                                              style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent), url('https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200')` }}>
                                              <p className="text-[8px] text-indigo-400 uppercase tracking-widest font-black font-sans">Aura Elite Series</p>
                                              <h5 className="text-sm font-black text-white leading-tight mt-1">নতুন সিজন ধামাকা ফুটবল জার্সি কালেকশন</h5>
                                              <p className="text-[10px] opacity-70 max-w-sm mt-1 leading-relaxed font-sans">প্রিমিয়াম এবং স্টাইলিশ ডিজাইনের খেলোয়াড় এডিশন কিটস এখন লাইভ অফারে উপলব্ধ।</p>
                                              <div className="flex space-x-2 mt-2 font-sans">
                                                <span className="px-3 py-1 bg-indigo-500 text-white text-[8px] font-black rounded-lg">অর্ডার করুন (Buy Now)</span>
                                                <span className="px-3 py-1 bg-white/10 text-white text-[8px] font-bold rounded-lg">বিস্তারিত দেখুন</span>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'categories' && (
                                            <div className="p-3 bg-neutral-900/60 space-y-1.5 font-sans">
                                              <div className="flex flex-wrap gap-1.5">
                                                <span className="px-3 py-1 bg-indigo-500 text-white text-[8px] font-bold rounded-full">⚡ প্রিমিয়াম প্লেয়ার এডিশন</span>
                                                <span className="px-3 py-1 bg-[#120e0c] text-neutral-300 text-[8px] rounded-full border border-white/5">ফ্যান এডিশন ক্লাসিক</span>
                                                <span className="px-3 py-1 bg-[#120e0c] text-neutral-300 text-[8px] rounded-full border border-white/5">রেট্রো ক্লাসিক ১৯৮৬</span>
                                                <span className="px-3 py-1 bg-[#120e0c] text-neutral-300 text-[8px] rounded-full border border-white/5">উইন্ডব্রেকার জ্যাকেট</span>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'featured_products' && (
                                            <div className="p-3.5 bg-neutral-900/40 space-y-2 font-sans">
                                              <div className="flex justify-between items-center text-[9px] mb-1">
                                                <span className="font-extrabold text-indigo-400">🔥 সপ্তাহের সেরা ডিল (Trending Now)</span>
                                                <span className="opacity-50">মোট ৩টি আইটেম</span>
                                              </div>
                                              <div className="grid grid-cols-3 gap-2">
                                                {[
                                                  { name: 'RM Stealth Carbon', price: '৳১৪৫০', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=150' },
                                                  { name: 'ARG Retro Worldcup', price: '৳১৩৮০', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150' },
                                                  { name: 'BD Cricket Official', price: '৳১১৫০', img: 'https://images.unsplash.com/photo-1540747737956-378721767518?auto=format&fit=crop&q=80&w=150' },
                                                ].map((p, i) => (
                                                  <div key={i} className="bg-black/30 p-1.5 rounded-lg border border-white/5 text-center">
                                                    <div className="h-14 bg-neutral-800 rounded overflow-hidden">
                                                      <img src={p.img} alt={p.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                                                    </div>
                                                    <p className="text-[8px] font-black truncate text-white mt-1">{p.name}</p>
                                                    <p className="text-[8px] text-indigo-400 font-mono font-bold mt-0.5">{p.price}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'flash_sale' && (
                                            <div className="p-3 bg-rose-950/20 border border-rose-500/10 space-y-2 font-sans">
                                              <div className="flex justify-between items-center text-[9px]">
                                                <span className="text-rose-400 font-black flex items-center">
                                                  <span className="h-1.5 w-1.5 bg-rose-500 rounded-full animate-ping mr-1"></span>
                                                  FLASH SALE (৫০% মেগা ডিসকাউন্ট অফার)
                                                </span>
                                                <span className="font-mono text-white bg-rose-500/30 px-1.5 py-0.5 rounded text-[8px]">০২ ঘন্টা : ১৪ মিনিট</span>
                                              </div>
                                              <div className="h-1.5 bg-neutral-800 rounded overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 w-3/4"></div>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'collections' && (
                                            <div className="p-3.5 bg-neutral-900/60 space-y-1.5 font-sans">
                                              <div className="grid grid-cols-2 gap-2 text-center">
                                                <div className="bg-[#120e0c] p-2 rounded-lg border border-white/5 flex flex-col justify-center hover:border-indigo-500/20 transition-all">
                                                  <span className="text-[9px] font-black text-white">Retro Masterpieces Collection</span>
                                                  <span className="text-[7px] text-indigo-400">14+ Premium Jerseys Available</span>
                                                </div>
                                                <div className="bg-[#120e0c] p-2 rounded-lg border border-white/5 flex flex-col justify-center hover:border-indigo-500/20 transition-all">
                                                  <span className="text-[9px] font-black text-white">Fan Version Official Kits</span>
                                                  <span className="text-[7px] text-indigo-400">22+ Club & Country Jerseys</span>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'brand_logos' && (
                                            <div className="p-2.5 bg-black/40 flex justify-around items-center gap-2 text-[7px] text-neutral-400 font-mono select-none">
                                              <span>⚡ AURA LUXURY CO.</span>
                                              <span>● MONACO SPECIALS</span>
                                              <span>▲ VANGUARD CLOTH</span>
                                              <span>❖ BREEZE SPORTS</span>
                                            </div>
                                          )}

                                          {section.id === 'testimonials' && (
                                            <div className="p-3 bg-neutral-900/40 space-y-1.5 font-sans">
                                              <div className="bg-[#120e0c] p-2 rounded text-[8px] text-neutral-300">
                                                <div className="flex justify-between text-yellow-500 font-bold mb-1">
                                                  <span>রাকিব হাসান (Verified Buyer)</span>
                                                  <span>★★★★★</span>
                                                </div>
                                                <p className="opacity-70">"জার্সিগুলোর ফেব্রিক কোয়ালিটি অসাধারণ! একদম প্রফেশনাল প্লেয়ার এডিশনের মতো ঘাম শোষণ করে এবং পড়ে খুব আরাম পাওয়া যায়।"</p>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'newsletter' && (
                                            <div className="p-3 bg-indigo-950/20 text-center space-y-1.5 font-sans">
                                              <p className="text-[9px] font-black text-indigo-300">ইনবক্সে বিশেষ কুপন কোড ও পরবর্তী ধামাকা অফার পান!</p>
                                              <div className="flex gap-2 max-w-xs mx-auto">
                                                <input type="text" placeholder="Your Email Address" disabled className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-[8px] text-white flex-1 focus:outline-none" />
                                                <button disabled className="bg-indigo-600 text-white font-bold text-[8px] px-3 py-1 rounded-lg">Subscribe</button>
                                              </div>
                                            </div>
                                          )}

                                          {section.id === 'footer' && (
                                            <div className="p-3 bg-[#120e0c] text-[8px] text-neutral-500 text-center font-sans">
                                              <p className="font-bold text-white text-[9px]">Trend Zone BD</p>
                                              <p className="mt-1 opacity-75">যোগাযোগ: ০১৭০০-০০০০০০ | প্রিমিয়াম ও রেট্রো জার্সি গন্তব্য।</p>
                                              <p className="mt-1 opacity-50">© ২০২৬ Trend Zone. All Rights Reserved.</p>
                                            </div>
                                          )}

                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                            </div>

                            {/* Synchronized status banner */}
                            <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5 text-[10px] space-y-1 text-left">
                              <div className="flex items-center justify-between text-[11px] text-indigo-400 font-black">
                                <span>⚙️ রিয়েল-টাইম সিনক্রোনাইজেশন অ্যাক্টিভ</span>
                                <span className="font-mono text-[9px] bg-indigo-500/10 px-1.5 py-0.5 rounded text-indigo-300">Layout Synchronized</span>
                              </div>
                              <p className="opacity-70 leading-relaxed font-sans">
                                বামপাশের প্যানেলে সেকশনগুলোর ভিজিবিলিটি অন/অফ করলে অথবা সেকশনের উপর/নিচে সরালে তা এখানে রিয়েল-টাইমে আপডেট হয়।
                              </p>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  ) : showSmartDesigner ? (

                    /* Smart Theme - Advanced Banner Control Panel UI */
                    <div className="space-y-6 animate-fade-in text-left">
                      {/* Top Action & Status Bar */}
                      <div className="bg-[#1a1614] p-5 rounded-3xl border border-[#322822]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Smart AI Workspace</span>
                          </div>
                          <h3 className="text-lg font-black text-white font-sans">অ্যাডভান্সড ব্যানার কন্ট্রোল প্যানেল (Advanced Banner Control Panel)</h3>
                          <p className="opacity-70 text-xs font-sans">এআই-চালিত স্মার্ট ব্যানারগুলোর অর্ডার, শিডিউলিং, অ্যানিমেশন এবং প্রায়োরিটি কাস্টমাইজ করুন।</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => {
                              try {
                                setPublishedTheme('smart');
                                localStorage.setItem('aura_published_theme', 'smart');
                                localStorage.setItem('aura_smart_banners', JSON.stringify(smartBanners));
                                localStorage.setItem('aura_smart_theme_settings', JSON.stringify({ ...smartTheme, isPreview: true }));
                                setDesignerSuccessMessage("স্মার্ট থিম সহ লাইভ স্টোরফ্রন্ট প্রিভিউ জেনারেট হচ্ছে... ২ সেকেন্ডের মধ্যে গ্রাহক হোমপেজে নিয়ে যাওয়া হচ্ছে!");
                                setTimeout(() => {
                                  setView('storefront');
                                }, 1800);
                              } catch (e) {
                                setDesignerSuccessMessage("প্রিভিউ করা যায়নি।");
                              }
                            }}
                            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-extrabold rounded-xl transition-all flex items-center space-x-1.5 border border-white/5 cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5 text-amber-400" />
                            <span>Preview Live</span>
                          </button>
                          <button
                            onClick={() => {
                              try {
                                localStorage.setItem('aura_smart_theme_settings', JSON.stringify(smartTheme));
                                localStorage.setItem('aura_smart_banners', JSON.stringify(smartBanners));
                                setDesignerSuccessMessage("স্মার্ট ব্যানার ড্রাফট এবং সেটিংস সফলভাবে ক্যাশে সংরক্ষিত হয়েছে!");
                              } catch(e) {
                                setDesignerSuccessMessage("ড্রাফট সংরক্ষণ করা যায়নি।");
                              }
                            }}
                            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-extrabold rounded-xl transition-all flex items-center space-x-1.5 border border-white/5 cursor-pointer"
                          >
                            <Save className="h-3.5 w-3.5 text-amber-400" />
                            <span>Save Draft</span>
                          </button>
                          <button
                            onClick={() => {
                              try {
                                setPublishedTheme('smart');
                                localStorage.setItem('aura_published_theme', 'smart');
                                localStorage.setItem('aura_smart_theme_settings', JSON.stringify(smartTheme));
                                localStorage.setItem('aura_smart_banners', JSON.stringify(smartBanners));
                                setDesignerSuccessMessage("অভিনন্দন! আপনার অ্যাডভান্সড স্মার্ট ব্যানার কনফিগারেশন সফলভাবে পাবলিশ হয়েছে এবং স্টোরে লাইভ করা হয়েছে।");
                              } catch(e) {
                                setDesignerSuccessMessage("পাবলিশ করা যায়নি।");
                              }
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-lg shadow-orange-500/10 flex items-center space-x-1.5 cursor-pointer border-none"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Publish to Store</span>
                          </button>
                        </div>
                      </div>

                      {/* Main Workspace: 12-column Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Left Sidebar: Banner List (col-span-4) */}
                        <div className="lg:col-span-4 space-y-4">
                          <div className="bg-[#1a1614] p-5 rounded-3xl border border-[#322822]/40 space-y-4">
                            <div className="flex items-center justify-between border-b border-[#322822]/40 pb-3">
                              <h4 className="text-xs font-black uppercase tracking-wider opacity-65 flex items-center space-x-2">
                                <Layers className="h-3.5 w-3.5 text-amber-500" />
                                <span>ব্যানার লিস্ট (Banner List)</span>
                              </h4>
                              <button
                                onClick={() => {
                                  setEditingSmartBannerId(null);
                                  setSmartBannerForm({
                                    title: 'নতুন স্মার্ট ব্যানার টাইটেল',
                                    subtitle: 'AI Targeting Subtitle',
                                    description: 'এই আকর্ষণীয় অফারটি শুধুমাত্র সীমিত সময়ের জন্য প্রযোজ্য।',
                                    badge: 'Highly Recommended',
                                    animation: 'Slide Left (স্মুথ)',
                                    duration: 5,
                                    priority: 'High',
                                    status: 'Draft',
                                    scheduleStart: '2026-07-11T12:00',
                                    scheduleEnd: '2026-07-18T12:00',
                                    desktopImageUrl: 'https://images.unsplash.com/photo-1540747737956-378721767518?auto=format&fit=crop&q=80&w=1200',
                                  });
                                  setDesignerSuccessMessage("নতুন ব্যানার তৈরির ফর্ম লোড হয়েছে। ডানে তথ্য পূরণ করে সংরক্ষণ করুন!");
                                }}
                                className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-[10px] font-black rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add New</span>
                              </button>
                            </div>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                              {smartBanners.map((sb) => {
                                const isSelected = selectedSmartBanner === sb.id;
                                return (
                                  <div
                                    key={sb.id}
                                    onClick={() => {
                                      setSelectedSmartBanner(sb.id);
                                      setSmartBannerForm({
                                        title: sb.title,
                                        subtitle: sb.subtitle,
                                        description: sb.description,
                                        badge: sb.badge,
                                        animation: sb.animation,
                                        duration: sb.duration,
                                        priority: sb.priority,
                                        status: sb.status,
                                        scheduleStart: sb.scheduleStart,
                                        scheduleEnd: sb.scheduleEnd,
                                        desktopImageUrl: sb.desktopImageUrl,
                                      });
                                    }}
                                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all space-y-3 group relative overflow-hidden
                                      ${isSelected 
                                        ? 'bg-amber-500/[0.08] border-amber-500/50 shadow-md shadow-amber-500/[0.02]' 
                                        : 'bg-black/20 border-white/5 hover:border-white/15'}`}
                                  >
                                    {/* Action Indicators */}
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-1.5">
                                        <span className={`h-1.5 w-1.5 rounded-full ${
                                          sb.status === 'Published' ? 'bg-emerald-500 animate-pulse' :
                                          sb.status === 'Scheduled' ? 'bg-amber-500' : 'bg-neutral-400'
                                        }`} />
                                        <span className="text-[9px] font-black font-mono tracking-wider uppercase opacity-60">
                                          {sb.status}
                                        </span>
                                      </div>
                                      <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider
                                        ${sb.priority === 'Highest' ? 'bg-red-500/15 text-red-400' :
                                          sb.priority === 'High' ? 'bg-amber-500/15 text-amber-400' :
                                          'bg-neutral-800 text-neutral-400'}`}>
                                        Priority: {sb.priority}
                                      </span>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-full border border-amber-500/10">
                                        {sb.badge}
                                      </span>
                                      <h5 className="font-extrabold text-xs text-white truncate mt-1.5">{sb.title}</h5>
                                      <p className="opacity-50 text-[10px] line-clamp-1">{sb.description}</p>
                                    </div>

                                    {/* Footer Metrics */}
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] opacity-60">
                                      <span className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3 text-neutral-400" />
                                        <span>{sb.duration}s Loop</span>
                                      </span>
                                      <span className="truncate max-w-[120px]">
                                        {sb.animation}
                                      </span>
                                    </div>

                                    {/* Quick Actions overlay on hover or active */}
                                    <div className="flex items-center justify-end space-x-1 pt-1.5 border-t border-white/5">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingSmartBannerId(sb.id);
                                          setSelectedSmartBanner(sb.id);
                                          setSmartBannerForm({
                                            title: sb.title,
                                            subtitle: sb.subtitle,
                                            description: sb.description,
                                            badge: sb.badge,
                                            animation: sb.animation,
                                            duration: sb.duration,
                                            priority: sb.priority,
                                            status: sb.status,
                                            scheduleStart: sb.scheduleStart,
                                            scheduleEnd: sb.scheduleEnd,
                                            desktopImageUrl: sb.desktopImageUrl,
                                          });
                                          setDesignerSuccessMessage(`"${sb.title}" এডিট করার জন্য সফলভাবে লোড করা হয়েছে। কাস্টমাইজেশন শেষ করে নিচের আপডেট বাটনে চাপুন।`);
                                        }}
                                        className="p-1.5 bg-[#120e0c]/40 hover:bg-[#e07a5f]/20 hover:text-[#e07a5f] rounded-lg text-neutral-300 transition-colors border-none cursor-pointer"
                                        title="ব্যানার এডিট করুন"
                                      >
                                        <Edit3 className="h-3 w-3" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const duplicated = {
                                            ...sb,
                                            id: 'sb_' + Date.now(),
                                            title: sb.title + ' (Copy)'
                                          };
                                          setSmartBanners([...smartBanners, duplicated]);
                                          setSelectedSmartBanner(duplicated.id);
                                          setDesignerSuccessMessage(`"${sb.title}" ব্যানারটি সফলভাবে ডুপ্লিকেট করা হয়েছে!`);
                                        }}
                                        className="p-1.5 bg-[#120e0c]/40 hover:bg-amber-500/20 hover:text-amber-500 rounded-lg text-neutral-300 transition-colors border-none cursor-pointer"
                                        title="ডুপ্লিকেট করুন"
                                      >
                                        <Copy className="h-3 w-3" />
                                      </button>
                                      {smartBannerIdToDelete === sb.id ? (
                                        <div className="flex items-center space-x-1 bg-rose-500/15 p-1 rounded-lg border border-rose-500/30 animate-fade-in shrink-0">
                                          <span className="text-[9px] font-black text-rose-400 px-1">মুছবেন?</span>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const filtered = smartBanners.filter(b => b.id !== sb.id);
                                              setSmartBanners(filtered);
                                              setSelectedSmartBanner(filtered[0]?.id || 'sb_1');
                                              setSmartBannerIdToDelete(null);
                                              setDesignerSuccessMessage("ব্যানারটি সফলভাবে ডিলিট করা হয়েছে।");
                                            }}
                                            className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-black rounded cursor-pointer border-none animate-fade-in"
                                          >
                                            হ্যাঁ
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSmartBannerIdToDelete(null);
                                            }}
                                            className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 text-white text-[9px] font-black rounded cursor-pointer border-none animate-fade-in"
                                          >
                                            না
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (smartBanners.length <= 1) {
                                              setDesignerSuccessMessage("সতর্কতা: স্টোরে কমপক্ষে একটি স্মার্ট ব্যানার অবশ্যই লাইভ থাকতে হবে!");
                                              return;
                                            }
                                            setSmartBannerIdToDelete(sb.id);
                                          }}
                                          className="p-1.5 bg-[#120e0c]/40 hover:bg-rose-500/20 hover:text-rose-500 rounded-lg text-neutral-300 transition-colors border-none cursor-pointer"
                                          title="ডিলিট করুন"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Right Form & Live Preview Canvas (col-span-8) */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                          
                          {/* Left Child: Advanced Control Form (col-span-6) */}
                          <div className="md:col-span-6 bg-[#1a1614] p-5 rounded-3xl border border-[#322822]/40 space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-wider opacity-65 flex items-center space-x-2">
                              <Sliders className="h-3.5 w-3.5 text-[#e07a5f]" />
                              <span>ব্যানার কনফিগারেশন (Control Panel)</span>
                            </h4>

                            <div className="space-y-4">
                              {/* Title */}
                              <div className="text-left">
                                <label className="block text-[11px] opacity-70 mb-1 font-bold">ব্যানার টাইটেল (Title):</label>
                                <input
                                  type="text"
                                  value={smartBannerForm.title}
                                  onChange={(e) => setSmartBannerForm({...smartBannerForm, title: e.target.value})}
                                  className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                                  placeholder="যেমন: রেট্রো ফুটবল জার্সি কালেকশন"
                                />
                              </div>

                              {/* Subtitle */}
                              <div className="text-left">
                                <label className="block text-[11px] opacity-70 mb-1 font-bold">ব্যানার সাবটাইটেল (Subtitle):</label>
                                <input
                                  type="text"
                                  value={smartBannerForm.subtitle}
                                  onChange={(e) => setSmartBannerForm({...smartBannerForm, subtitle: e.target.value})}
                                  className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                                  placeholder="যেমন: Special Recommendation"
                                />
                              </div>

                              {/* Description */}
                              <div className="text-left">
                                <label className="block text-[11px] opacity-70 mb-1 font-bold">ব্যানার ডেসক্রিপশন (Description):</label>
                                <textarea
                                  value={smartBannerForm.description}
                                  onChange={(e) => setSmartBannerForm({...smartBannerForm, description: e.target.value})}
                                  rows={2}
                                  className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                                  placeholder="ব্যানারের আকর্ষণীয় অফার বা বিস্তারিত টেক্সট..."
                                />
                              </div>

                              {/* Desktop Image URL */}
                              <div className="text-left">
                                <label className="block text-[11px] opacity-70 mb-1 font-bold">ব্যানার ইমেজ লিংক (Image URL):</label>
                                <input
                                  type="text"
                                  value={smartBannerForm.desktopImageUrl}
                                  onChange={(e) => setSmartBannerForm({...smartBannerForm, desktopImageUrl: e.target.value})}
                                  className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                                  placeholder="ইমেজ ইউআরএল লিংক..."
                                />
                              </div>

                              {/* Grid Layout for compact parameters */}
                              <div className="grid grid-cols-2 gap-4">
                                {/* Badge Selection */}
                                <div className="text-left">
                                  <label className="block text-[11px] opacity-70 mb-1 font-bold">ব্যাজ সিলেকশন (Badge):</label>
                                  <select
                                    value={smartBannerForm.badge}
                                    onChange={(e) => setSmartBannerForm({...smartBannerForm, badge: e.target.value})}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 cursor-pointer"
                                  >
                                    {['Highly Recommended', 'VIP Exclusive', 'Flash Sale Deal', 'Highly Rated', 'Limited Offer', 'New Arrival'].map(b => (
                                      <option key={b} value={b} className="bg-[#1a1614] text-white">{b}</option>
                                    ))}
                                  </select>
                                </div>

                                {/* Animation Selection */}
                                <div className="text-left">
                                  <label className="block text-[11px] opacity-70 mb-1 font-bold">অ্যানিমেশন (Animation):</label>
                                  <select
                                    value={smartBannerForm.animation}
                                    onChange={(e) => setSmartBannerForm({...smartBannerForm, animation: e.target.value})}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 cursor-pointer"
                                  >
                                    {['Slide Left (স্মুথ)', 'Fade In (ধীর)', 'Scale Zoom (মডার্ন)', 'Bounce Accented (আকর্ষণীয়)'].map(a => (
                                      <option key={a} value={a} className="bg-[#1a1614] text-white">{a}</option>
                                    ))}
                                  </select>
                                </div>

                                {/* Slide Duration */}
                                <div className="text-left">
                                  <label className="block text-[11px] opacity-70 mb-1 font-bold">লুপ সময় (Slide Duration):</label>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      min={1}
                                      max={20}
                                      value={smartBannerForm.duration}
                                      onChange={(e) => setSmartBannerForm({...smartBannerForm, duration: parseInt(e.target.value) || 5})}
                                      className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 font-mono"
                                    />
                                    <span className="absolute right-3 top-2.5 text-[10px] opacity-50 font-bold">Sec</span>
                                  </div>
                                </div>

                                {/* Priority Selection */}
                                <div className="text-left">
                                  <label className="block text-[11px] opacity-70 mb-1 font-bold">প্রায়োরিটি (Priority):</label>
                                  <select
                                    value={smartBannerForm.priority}
                                    onChange={(e) => setSmartBannerForm({...smartBannerForm, priority: e.target.value})}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 cursor-pointer"
                                  >
                                    {['Low', 'Medium', 'High', 'Highest'].map(p => (
                                      <option key={p} value={p} className="bg-[#1a1614] text-white">{p}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              {/* Schedule Inputs */}
                              <div className="border-t border-[#322822]/40 pt-3 space-y-3 text-left">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3 text-amber-500" />
                                  <span className="text-[10px] font-black uppercase opacity-60 tracking-wider">রানিং শিডিউল নির্ধারণ (Schedule)</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-left">
                                    <label className="block text-[10px] opacity-60 mb-0.5">শুরুর সময় (Start):</label>
                                    <input
                                      type="datetime-local"
                                      value={smartBannerForm.scheduleStart}
                                      onChange={(e) => setSmartBannerForm({...smartBannerForm, scheduleStart: e.target.value})}
                                      className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none font-mono"
                                    />
                                  </div>
                                  <div className="text-left">
                                    <label className="block text-[10px] opacity-60 mb-0.5">শেষের সময় (End):</label>
                                    <input
                                      type="datetime-local"
                                      value={smartBannerForm.scheduleEnd}
                                      onChange={(e) => setSmartBannerForm({...smartBannerForm, scheduleEnd: e.target.value})}
                                      className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none font-mono"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Status Toggle & Save Action */}
                              <div className="border-t border-[#322822]/40 pt-3 flex items-center justify-between gap-4">
                                <div className="text-left">
                                  <label className="block text-[10px] opacity-60 mb-1 font-bold">ব্যানার স্ট্যাটাস:</label>
                                  <div className="flex items-center space-x-2">
                                    {['Draft', 'Published', 'Scheduled'].map(st => (
                                      <button
                                        key={st}
                                        type="button"
                                        onClick={() => setSmartBannerForm({...smartBannerForm, status: st})}
                                        className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer
                                          ${smartBannerForm.status === st 
                                            ? 'bg-amber-500 text-black border-transparent font-black shadow-md' 
                                            : 'bg-black/30 border-white/5 text-neutral-400 hover:text-white'}`}
                                      >
                                        {st}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (editingSmartBannerId) {
                                      // Update existing
                                      const updated = smartBanners.map(b => b.id === editingSmartBannerId ? {
                                        ...b,
                                        ...smartBannerForm
                                      } : b);
                                      setSmartBanners(updated);
                                      setEditingSmartBannerId(null);
                                      setDesignerSuccessMessage("স্মার্ট ব্যানারটি সফলভাবে আপডেট করা হয়েছে!");
                                    } else {
                                      // Create new
                                      const newB = {
                                        id: 'sb_' + Date.now(),
                                        ...smartBannerForm,
                                        duration: smartBannerForm.duration || 5
                                      };
                                      setSmartBanners([...smartBanners, newB]);
                                      setSelectedSmartBanner(newB.id);
                                      setDesignerSuccessMessage("নতুন স্মার্ট ব্যানারটি সফলভাবে লিস্টে যুক্ত করা হয়েছে!");
                                    }
                                  }}
                                  className="px-5 py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer self-end"
                                >
                                  {editingSmartBannerId ? 'আপডেট করুন (Update)' : 'লিস্টে যোগ করুন (Add)'}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Right Child: Interactive Device Live Preview Canvas (col-span-6) */}
                          <div className="md:col-span-6 flex flex-col space-y-4">
                            <div className="bg-[#1a1614] p-5 rounded-3xl border border-[#322822]/40 flex-1 flex flex-col justify-between">
                              <div className="flex items-center justify-between border-b border-[#322822]/40 pb-3">
                                <h4 className="text-xs font-black uppercase tracking-wider opacity-65 flex items-center space-x-2">
                                  <Eye className="h-3.5 w-3.5 text-emerald-500" />
                                  <span>লাইভ প্রিভিউ (Live Preview)</span>
                                </h4>
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  Synchronized
                                </span>
                              </div>

                              {/* Styled Device Wrapper */}
                              <div className="flex-1 py-6 flex items-center justify-center">
                                <div className="w-full max-w-sm rounded-[2.5rem] border-[6px] border-neutral-800 bg-[#120e0c] p-3 shadow-2xl relative overflow-hidden aspect-[16/10] flex flex-col">
                                  
                                  {/* Banner Inside Device */}
                                  <div 
                                    className="h-full w-full rounded-2xl relative overflow-hidden flex flex-col justify-end p-4 text-left group bg-cover bg-center"
                                    style={{ 
                                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 80%), url(${smartBannerForm.desktopImageUrl || 'https://images.unsplash.com/photo-1540747737956-378721767518?auto=format&fit=crop&q=80&w=1200'})` 
                                    }}
                                  >
                                    {/* Premium Dynamic Badge */}
                                    <div className="absolute top-3 left-3 flex items-center space-x-1">
                                      <span className="px-2 py-1 bg-amber-500 text-black text-[8px] font-black uppercase rounded-lg tracking-wider shadow-lg flex items-center space-x-1">
                                        <Sparkles className="h-2 w-2 animate-pulse" />
                                        <span>{smartBannerForm.badge}</span>
                                      </span>
                                    </div>

                                    {/* Animation Info Tag */}
                                    <div className="absolute top-3 right-3 text-[7px] text-white/50 bg-black/40 px-2 py-1 rounded-md font-mono border border-white/5">
                                      ✨ {smartBannerForm.animation}
                                    </div>

                                    {/* Text Content */}
                                    <div className="space-y-1">
                                      <p className="text-[8px] text-amber-400 font-black tracking-widest uppercase">{smartBannerForm.subtitle || 'Smart Target Offer'}</p>
                                      <h4 className="text-xs font-extrabold text-white leading-tight">{smartBannerForm.title || 'স্মার্ট ব্যানার টাইটেল'}</h4>
                                      <p className="text-[9px] text-neutral-300 line-clamp-2 leading-snug">{smartBannerForm.description || 'ব্যানার ডেসক্রিপশন...'}</p>
                                    </div>

                                    {/* Action Buttons Mock */}
                                    <div className="mt-2.5 flex items-center space-x-2">
                                      <span className="px-2.5 py-1 bg-amber-500 text-black text-[8px] font-black rounded-lg transition-transform hover:scale-105 select-none">
                                        অর্ডার করুন
                                      </span>
                                      <span className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[8px] font-bold rounded-lg select-none border border-white/10">
                                        বিস্তারিত দেখুন
                                      </span>
                                    </div>

                                    {/* Interactive Progress Bar looping animation simulation */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                      <div 
                                        className="h-full bg-amber-500 rounded-r-full"
                                        style={{ 
                                          width: '60%',
                                          transition: `width ${smartBannerForm.duration}s linear`,
                                          animation: 'pulse 1.5s infinite' 
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Details panel */}
                              <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5 text-[10px] space-y-2 text-left">
                                <div className="flex items-center justify-between text-[11px] text-amber-500 font-bold">
                                  <span>⚙️ ইন্টেলিজেন্ট এআই প্যারামিটার</span>
                                  <span className="font-mono text-[9px] bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-400">Target Match: 98%</span>
                                </div>
                                <p className="opacity-70 leading-relaxed">
                                  এই ব্যানারটির জন্য লুপ সময় <strong>{smartBannerForm.duration} সেকেন্ড</strong> নির্ধারণ করা আছে। অগ্রাধিকার স্ট্যাটাস <strong>"{smartBannerForm.priority}"</strong> হওয়ায় এটি কাস্টমারের হোমপেজের উপরের রিকমেন্ডেশন স্লটে বেশি অগ্রাধিকার পাবে।
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Theme Selector Navigation Bar */}
                      <div className="bg-[#1a1614] p-4 rounded-3xl border border-[#322822]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                        <div className="space-y-0.5 text-left">
                          <p className="text-xs font-black text-[#e07a5f] uppercase tracking-wider">Theme Layout Designer</p>
                          <p className="opacity-70 text-[11px]">আপনার পছন্দের স্টোর থিম ও লেআউট নির্বাচন করে কাস্টমাইজ করুন</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: 'classic', label: 'Classic Layout', icon: Layers },
                            { id: 'dynamic', label: 'Dynamic Layout', icon: Activity, isComingSoon: true },
                            { id: 'smart', label: 'Smart AI Layout', icon: Cpu, isComingSoon: true }
                          ].map(t => {
                            const TabIcon = t.icon;
                            const isActive = designerTab === t.id;
                            return (
                              <button
                                key={t.id}
                                onClick={() => setDesignerTab(t.id as any)}
                                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer
                                  ${isActive 
                                    ? 'bg-gradient-to-r from-[#e07a5f] to-[#d95d39] text-white border-transparent shadow-lg shadow-orange-500/15' 
                                    : 'bg-black/25 border-[#322822]/30 text-neutral-400 hover:text-white hover:border-white/10'}`}
                              >
                                <TabIcon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'opacity-70'}`} />
                                <span>{t.label}</span>
                                {t.isComingSoon && (
                                  <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider shrink-0
                                    ${isActive ? 'bg-white/20 text-white' : 'bg-[#e07a5f]/15 text-[#e07a5f]'}`}>
                                    Soon
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tab Contents (The Classic / Dynamic / Smart Selection Cards) */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* Left Description Column: Description Card with Features List */}
                      <div className="md:col-span-7 bg-[#1a1614] rounded-3xl border border-[#322822]/40 overflow-hidden shadow-xl">
                        
                        {/* Classic Tab Card */}
                        {designerTab === 'classic' && (
                          <div className="p-6 sm:p-8 space-y-6">
                            <div className="space-y-2">
                              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 text-[9px] font-extrabold rounded-md uppercase tracking-widest">Standard Layout</span>
                              <h3 className="text-2xl font-black tracking-tight text-white">ক্লাসিক লেআউট (Classic Design Style)</h3>
                              <p className="opacity-70 text-xs sm:text-sm leading-relaxed">
                                একটি ঐতিহ্যগত ই-কমার্স ডিজাইন যা অত্যন্ত পরিষ্কার এবং ব্যবহারকারী-বান্ধব। সাধারণ গ্রিড লেআউট এবং সুনির্দিষ্ট ক্যাটাগরি ফোকাসড সেকশন কাস্টমারকে কোনো বিভ্রান্তি ছাড়াই কেনাকাটা করতে সাহায্য করে। এটি যেকোনো সাধারণ বুটিক বা কসমেটিক স্টোরের জন্য অত্যন্ত কার্যকরী।
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                              <h4 className="text-xs font-bold text-[#e07a5f]">মূল বৈশিষ্ট্যসমূহ (Key Features):</h4>
                              <ul className="space-y-2 text-xs opacity-80">
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-[#e07a5f] rounded-full"></span>
                                  <span>ক্লিন মিনিমালিস্ট হিরো ব্যানার ও স্লোগান সেকশন।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-[#e07a5f] rounded-full"></span>
                                  <span>প্রোডাক্ট ক্যাটালগের ৩/৪ কলাম বিশিষ্ট গ্রিড ভিউ।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-[#e07a5f] rounded-full"></span>
                                  <span>সহজ ও অত্যন্ত দ্রুত লোড হওয়া ক্যাটাগরি নেভিগেশন।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-[#e07a5f] rounded-full"></span>
                                  <span>মোবাইল স্ক্রিনে রি-স্পন্সিভ ও লাইটওয়েট পারফরম্যান্স।</span>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-4 border-t border-[#322822]/40">
                              <button 
                                onClick={() => {
                                  setShowClassicDesigner(true);
                                  setBannerForm({
                                    desktopImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200',
                                    mobileImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=600',
                                    title: 'নতুন ধামাকা অফার',
                                    subtitle: 'Aura Premium Casuals',
                                    description: 'আমাদের নতুন এবং এক্সক্লুসিভ স্টাইলিশ ফ্যাশন পণ্যের সমাহার এখন আপনার হাতের মুঠোয়।',
                                    button1Text: 'এখনই কিনুন (Buy Now)',
                                    button1Link: '#products',
                                    button2Text: 'সব প্রোডাক্ট দেখুন',
                                    button2Link: '#products',
                                    overlayColor: 'rgba(0,0,0,0.4)',
                                    textPosition: 'left',
                                    isActive: true,
                                    order: banners.length + 1
                                  });
                                }}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#e07a5f] to-[#d95d39] hover:from-[#d95d39] hover:to-[#c34a27] text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer border-none outline-none"
                              >
                                <span>Open Designer</span>
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Dynamic Tab Card */}
                        {designerTab === 'dynamic' && (
                          <div className="p-6 sm:p-8 space-y-6">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-1 bg-indigo-950/40 text-indigo-300 text-[9px] font-extrabold rounded-md uppercase tracking-widest border border-indigo-500/20">Vibrant Layout</span>
                              </div>
                              <h3 className="text-2xl font-black tracking-tight text-white">ডাইনামিক লেআউট (Dynamic Visual Style)</h3>
                              <p className="opacity-70 text-xs sm:text-sm leading-relaxed">
                                ফ্ল্যাশ সেলস, ট্রেন্ডিং প্রোডাক্ট কালেকশন স্লাইডার এবং ইন্টারঅ্যাক্টিভ এনিমেশনের সংমিশ্রণে তৈরি একটি আধুনিক লেআউট। এটি কাস্টমারদের মধ্যে ব্র্যান্ড ইমেজ বাড়াতে এবং পণ্য এক্সপ্লোর করার আগ্রহ তৈরি করতে অত্যন্ত সহায়ক। তরুন ও ফ্যাশন সচেতন দর্শকদের জন্য এটি সেরা চয়েস।
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                              <h4 className="text-xs font-bold text-indigo-400">মূল বৈশিষ্ট্যসমূহ (Key Features):</h4>
                              <ul className="space-y-2 text-xs opacity-80">
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></span>
                                  <span>ফুল-উইথ মাল্টি-স্লাইড হিরো ব্যানার উইজেট।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></span>
                                  <span>হরাইজোন্টাল স্ক্রোলিং ট্রেন্ডিং প্রোডাক্টস ও হট ডিলস ক্যারোসেল।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></span>
                                  <span>ক্লিক করলেই স্মুথলি ক্যাটাগরি অনুযায়ী ফিল্টার হওয়া চিপস।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></span>
                                  <span>রিচ ভিজ্যুয়াল ও কার্ড হোভার ট্রানজিশন ইফেক্টস।</span>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-4 border-t border-[#322822]/40">
                              <button 
                                onClick={() => setShowDynamicDesigner(true)}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer border-none outline-none"
                              >
                                <span>Open Designer</span>
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Smart Tab Card */}
                        {designerTab === 'smart' && (
                          <div className="p-6 sm:p-8 space-y-6">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-1 bg-amber-950/40 text-amber-300 text-[9px] font-extrabold rounded-md uppercase tracking-widest border border-amber-500/20">Personalized AI Layout</span>
                                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[9px] font-black rounded-md uppercase tracking-widest border border-amber-500/20 animate-pulse">Coming Soon (শীঘ্রই আসছে)</span>
                              </div>
                              <h3 className="text-2xl font-black tracking-tight text-white">স্মার্ট এআই লেআউট (Smart AI Assisted Style)</h3>
                              <p className="opacity-70 text-xs sm:text-sm leading-relaxed">
                                অত্যাধুনিক স্মার্ট পারসোনালাইজড লেআউট যা কাস্টমারের পূর্ববর্তী আচরণ, ব্রাউজিং হিস্টোরি এবং ইন্টারেস্ট ডেটার উপর ভিত্তি করে স্বয়ংক্রিয়ভাবে হোমপেজ সাজিয়ে তোলে। এটি কাস্টমারকে তার সবচেয়ে পছন্দের পণ্যটি প্রথমে প্রদর্শন করে সেলস রূপান্তরের হার বহু গুণ বাড়িয়ে দেয়।
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-black/20 border border-[#322822]/40 space-y-3">
                              <h4 className="text-xs font-bold text-amber-400">মূল বৈশিষ্ট্যসমূহ (Key Features):</h4>
                              <ul className="space-y-2 text-xs opacity-80">
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                                  <span>কাস্টমারের পছন্দ অনুযায়ী স্বয়ংক্রিয় পণ্য সাজানোর এআই অ্যালগরিদম।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                                  <span>স্মার্ট রিকমেন্ডেশন উইজেট (Recommended For You)।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                                  <span>ইন্টেলিজেন্ট উইন-ব্যাক এবং পুনরায় আগ্রহী করার অফার প্যানেল।</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                                  <span>গ্রাহকের ডিভাইসের সাইজ ও লোকেশনের উপর ভিত্তি করে ডাইনামিক অফার ব্যানার।</span>
                                </li>
                              </ul>
                            </div>

                            <div className="pt-4 border-t border-[#322822]/40">
                              <button 
                                onClick={() => {
                                  setShowSmartDesigner(true);
                                  setSmartBannerForm({
                                    title: smartBanners[0]?.title || 'নতুন স্মার্ট ব্যানার টাইটেল',
                                    subtitle: smartBanners[0]?.subtitle || 'AI Targeting Subtitle',
                                    description: smartBanners[0]?.description || 'এই আকর্ষণীয় অফারটি শুধুমাত্র সীমিত সময়ের জন্য প্রযোজ্য।',
                                    badge: smartBanners[0]?.badge || 'Highly Recommended',
                                    animation: smartBanners[0]?.animation || 'Slide Left (স্মুথ)',
                                    duration: smartBanners[0]?.duration || 5,
                                    priority: smartBanners[0]?.priority || 'High',
                                    status: smartBanners[0]?.status || 'Draft',
                                    scheduleStart: smartBanners[0]?.scheduleStart || '2026-07-11T12:00',
                                    scheduleEnd: smartBanners[0]?.scheduleEnd || '2026-07-18T12:00',
                                    desktopImageUrl: smartBanners[0]?.desktopImageUrl || 'https://images.unsplash.com/photo-1540747737956-378721767518?auto=format&fit=crop&q=80&w=1200',
                                  });
                                  setDesignerSuccessMessage("স্মার্ট এআই ব্যানার ডিজাইনার ওয়ার্কস্পেস লোড হয়েছে!");
                                }}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer border-none outline-none"
                              >
                                <span>Open Designer</span>
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Right Live Layout Preview Representation Column */}
                      <div className="md:col-span-5 bg-[#1a1614] rounded-3xl border border-[#322822]/40 p-6 space-y-4">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider opacity-60">Layout wireframe preview</h4>
                        
                        {designerTab === 'classic' && (
                          <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-white/5 font-mono text-[9px] opacity-80">
                            {/* Mini Wireframe for Classic */}
                            <div className="h-14 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 border border-neutral-700">
                              [ HERO BANNER (Standard Slider) ]
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500 text-center flex-wrap px-0.5">Apparel</div>
                              <div className="h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500 text-center flex-wrap px-0.5">Leather</div>
                              <div className="h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500 text-center flex-wrap px-0.5">Footwear</div>
                              <div className="h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500 text-center flex-wrap px-0.5">Accessory</div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-4 bg-neutral-800/60 rounded flex items-center px-2 text-neutral-400">Featured Products</div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="h-16 bg-neutral-900/80 rounded border border-neutral-800/40"></div>
                                <div className="h-16 bg-neutral-900/80 rounded border border-neutral-800/40"></div>
                                <div className="h-16 bg-neutral-900/80 rounded border border-neutral-800/40"></div>
                              </div>
                            </div>
                            <div className="h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500">
                              [ Footer Info ]
                            </div>
                          </div>
                        )}

                        {designerTab === 'dynamic' && (
                          <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-white/5 font-mono text-[9px] opacity-80">
                            {/* Mini Wireframe for Dynamic */}
                            <div className="h-14 bg-indigo-950/20 rounded-lg flex items-center justify-center text-indigo-400/80 border border-indigo-500/20">
                              [ FULL WIDE SLIDER (Vibrant) ]
                            </div>
                            <div className="flex space-x-1.5 overflow-x-auto pb-1">
                              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 shrink-0">🔥 All Deals</span>
                              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-full shrink-0">New In</span>
                              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-full shrink-0">Bestsellers</span>
                            </div>
                            <div className="space-y-1">
                              <div className="h-4 bg-indigo-950/30 rounded flex items-center px-2 text-indigo-300">FLASH SALES - 50% OFF</div>
                              <div className="flex space-x-2 overflow-x-auto pb-1">
                                <div className="h-16 w-16 bg-neutral-900 rounded shrink-0 border border-indigo-500/10"></div>
                                <div className="h-16 w-16 bg-neutral-900 rounded shrink-0 border border-indigo-500/10"></div>
                                <div className="h-16 w-16 bg-neutral-900 rounded shrink-0 border border-indigo-500/10"></div>
                              </div>
                            </div>
                            <div className="h-8 bg-indigo-950/10 rounded-lg flex items-center justify-center text-indigo-400/50">
                              [ Interactive Cart Trigger ]
                            </div>
                          </div>
                        )}

                        {designerTab === 'smart' && (
                          <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-white/5 font-mono text-[9px] opacity-80">
                            {/* Mini Wireframe for Smart AI */}
                            <div className="h-10 bg-amber-950/20 rounded-lg flex items-center justify-center text-amber-400/80 border border-amber-500/20">
                              [ AI PERSONALIZED BANNER ]
                            </div>
                            <div className="bg-amber-500/[0.04] p-2 rounded-lg border border-amber-500/10 space-y-1.5">
                              <div className="text-[8px] text-amber-400 font-bold">Recommended for "Visitor"</div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="h-14 bg-neutral-900 rounded p-1 flex flex-col justify-between border border-amber-500/5">
                                  <div className="h-8 bg-neutral-800 rounded"></div>
                                  <span className="text-[7px] text-amber-300">98% Match</span>
                                </div>
                                <div className="h-14 bg-neutral-900 rounded p-1 flex flex-col justify-between border border-amber-500/5">
                                  <div className="h-8 bg-neutral-800 rounded"></div>
                                  <span className="text-[7px] text-amber-300">95% Match</span>
                                </div>
                              </div>
                            </div>
                            <div className="h-8 bg-amber-950/10 rounded-lg flex items-center justify-center text-amber-400/50">
                              [ Smart Intent Coupon Code Widget ]
                            </div>
                          </div>
                        )}

                        <div className="pt-2 text-[10px] opacity-60 leading-relaxed text-center">
                          ডিজাইনার ওপেন করার পর আপনি রিয়েল-টাইমে সেকশনগুলো পরিবর্তন, রি-অর্ডার এবং নতুন কনটেন্ট যুক্ত করতে পারবেন।
                        </div>

                      </div>

                    </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* ==========================================================
              TAB 5: INVENTORY / STOCK CONTROL
              ========================================================== */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">ইনভেন্টরি ও লাভ কন্ট্রোল (Inventory & Profits)</h1>
                  <p className="opacity-60 text-sm mt-1">পণ্য স্টক, সাইজ-কালার বিবরণ এবং রিয়েল-টাইম নিট লাভ (Net Profit ৳) ট্র্যাক করুন।</p>
                </div>

                {/* Sub-tab switcher */}
                <div className="flex space-x-1.5 bg-[#120e0c]/10 dark:bg-[#faf8f5]/10 p-1 rounded-2xl w-fit">
                  {[
                    { id: 'list', label: 'স্টক ট্র্যাকিং', icon: Warehouse },
                    { id: 'analytics', label: 'প্রফিট অ্যানালিটিক্স', icon: Coins },
                    { id: 'history', label: 'ইনভেন্টরি ইতিহাস', icon: Clock }
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setInventorySubTab(tab.id as any)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all
                          ${inventorySubTab === tab.id
                            ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                            : 'opacity-70 hover:opacity-100'}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Tab 1: Stock list (with expandible size/color stock options) */}
              {inventorySubTab === 'list' && (
                <div className="space-y-6">
                  {/* Low stock alerts dashboard header banner */}
                  <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500 flex-shrink-0 animate-bounce">
                      <Warehouse className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">ইনভেন্টরি এলার্ট: ২ টি প্রোডাক্টের স্টক লিমিট শেষ হচ্ছে!</h3>
                      <p className="text-xs opacity-80 mt-1">ক্যাটালগে ২ টি প্রোডাক্টের স্টক ৫ ইউনিটের নিচে নেমে গিয়েছে। রি-স্টক রিকোয়েস্ট পাঠান বা স্টক বৃদ্ধি করুন।</p>
                    </div>
                  </div>

                  <div className={`rounded-3xl border overflow-hidden
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <div className="p-5 border-b border-inherit flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h3 className="font-extrabold text-sm text-amber-500">প্রোডাক্ট ক্যাটাগরি স্টক কন্ট্রোল</h3>
                      <span className="text-xs opacity-60">প্রতিটি লাইনে ক্লিক করে সাইজ এবং কালার অনুযায়ী স্টক ভেরিয়েশন চেক করুন।</span>
                    </div>

                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-[#322822]/10 opacity-60 text-xs">
                          <th className="p-4">প্রোডাক্ট বিবরণ</th>
                          <th className="p-4">ক্যাটাগরি</th>
                          <th className="p-4 text-center">ইনভেন্টরি স্টক</th>
                          <th className="p-4">স্টক স্ট্যাটাস</th>
                          <th className="p-4 text-right font-mono">SKU / Code</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#322822]/5">
                        {products.map((p) => {
                          const isLowStock = p.stock <= settings.lowStockLimit;
                          
                          return (
                            <React.Fragment key={p.id}>
                              <tr className="text-xs hover:bg-amber-500/[0.02] transition-all">
                                <td className="p-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                                    </div>
                                    <div>
                                      <span className="font-bold block">{p.name}</span>
                                      <span className="text-[10px] opacity-50 block font-mono">{p.id}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 opacity-80">{p.category}</td>
                                <td className="p-4 text-center">
                                  <div className="flex items-center justify-center space-x-2">
                                    <button 
                                      onClick={() => handleQuickStockUpdate(p.id, p.stock - 1)}
                                      className="px-2 py-1 bg-[#120e0c]/10 dark:bg-[#faf8f5]/10 hover:bg-amber-500/20 text-inherit font-bold rounded-lg transition-colors"
                                    >
                                      -
                                    </button>
                                    <span className={`font-mono font-bold text-sm px-2 ${isLowStock ? 'text-amber-500 font-extrabold' : ''}`}>
                                      {p.stock}
                                    </span>
                                    <button 
                                      onClick={() => handleQuickStockUpdate(p.id, p.stock + 1)}
                                      className="px-2 py-1 bg-[#120e0c]/10 dark:bg-[#faf8f5]/10 hover:bg-amber-500/20 text-inherit font-bold rounded-lg transition-colors"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="p-4">
                                  {isLowStock ? (
                                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 font-bold text-[10px] rounded">
                                      Critical Low Stock
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 font-bold text-[10px] rounded">
                                      Sufficient Stock
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    <span className="font-mono font-bold text-[11px] opacity-70">{p.sku || 'FBD-SKU-NA'}</span>
                                    {p.sku && (
                                      <button 
                                        type="button"
                                        onClick={() => setActiveQrProduct(p)}
                                        className="p-1 bg-emerald-500/10 hover:bg-[#e07a5f] hover:text-white text-emerald-500 rounded-md transition-all border border-emerald-500/10 hover:border-transparent flex items-center justify-center"
                                        title="QR কোড স্ক্যান/প্রিন্ট করুন (SKU QR Code)"
                                      >
                                        <QrCode className="h-3 w-3" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              
                              {/* Expanded Size / Color Stock row */}
                              <tr>
                                <td colSpan={5} className="p-4 bg-amber-500/[0.01] border-b border-inherit">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-12">
                                    {/* Size-wise list */}
                                    <div className="space-y-2">
                                      <p className="text-[10px] uppercase font-bold opacity-50 tracking-wider">📐 Size-Wise Stock (সাইজ ভিত্তিক স্টক)</p>
                                      <div className="flex flex-wrap gap-2">
                                        {p.sizes && p.sizes.map(size => {
                                          const sizeQty = p.sizeStock ? (p.sizeStock[size] || 0) : 0;
                                          return (
                                            <div key={size} className="flex items-center space-x-1.5 bg-[#120e0c]/5 dark:bg-[#faf8f5]/5 px-2.5 py-1.5 rounded-lg border border-inherit">
                                              <span className="font-extrabold text-[10px] opacity-60">{size}:</span>
                                              <span className="font-mono font-bold text-amber-500">{sizeQty}</span>
                                            </div>
                                          );
                                        })}
                                        {(!p.sizes || p.sizes.length === 0) && (
                                          <span className="text-xs opacity-50">No size variations defined.</span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Color-wise list */}
                                    <div className="space-y-2">
                                      <p className="text-[10px] uppercase font-bold opacity-50 tracking-wider">🎨 Color-Wise Stock (রং ভিত্তিক স্টক)</p>
                                      <div className="flex flex-wrap gap-2">
                                        {p.colors && p.colors.map(color => {
                                          const colorQty = p.colorStock ? (p.colorStock[color] || 0) : 0;
                                          return (
                                            <div key={color} className="flex items-center space-x-1.5 bg-[#120e0c]/5 dark:bg-[#faf8f5]/5 px-2.5 py-1.5 rounded-lg border border-inherit">
                                              <span className="font-bold text-[10px] opacity-60">{color}:</span>
                                              <span className="font-mono font-bold text-indigo-400">{colorQty}</span>
                                            </div>
                                          );
                                        })}
                                        {(!p.colors || p.colors.length === 0) && (
                                          <span className="text-xs opacity-50">No color variations defined.</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Profit Analytics (Calulating: Net Profit = Price - productCost - deliveryCost - discount - marketingCost) */}
              {inventorySubTab === 'analytics' && (
                <div className="space-y-6">
                  {/* Overview Stats Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      {
                        title: 'মোট ক্যাটালগ আইটেম',
                        val: products.length,
                        desc: 'সক্রিয় বিক্রয়যোগ্য পণ্য সংখ্যা',
                        color: 'text-amber-500'
                      },
                      {
                        title: 'গড় প্রোডাক্ট ম্যানুফ্যাকচারিং খরচ',
                        val: formatCurrency(products.reduce((acc, p) => acc + (p.productCost || 0), 0) / products.length),
                        desc: 'গড় ক্রয় বা উৎপাদন কস্ট',
                        color: 'text-indigo-400 font-mono'
                      },
                      {
                        title: 'গড় বিপণন ও ডেলিভারি কস্ট',
                        val: formatCurrency(products.reduce((acc, p) => acc + ((p.deliveryCost || 0) + (p.marketingCost || 0)), 0) / products.length),
                        desc: 'বিজ্ঞাপন ও ডেলিভারি গড় কস্ট',
                        color: 'text-rose-400 font-mono'
                      },
                      {
                        title: 'প্রজেক্টেড মোট নিট লাভ (Net Profit)',
                        val: formatCurrency(products.reduce((acc, p) => {
                          const netProfit = (p.price - (p.productCost || 0) - (p.deliveryCost || 0) - (p.discount || 0) - (p.marketingCost || 0));
                          return acc + (netProfit * p.salesCount);
                        }, 0)),
                        desc: 'সমস্ত বিক্রিত পণ্যের প্রকৃত লাভ ৳',
                        color: 'text-emerald-400 font-mono font-black'
                      }
                    ].map((stat, i) => (
                      <div key={i} className={`p-5 rounded-3xl border
                        ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc]'}`}
                      >
                        <p className="text-[11px] font-bold opacity-60">{stat.title}</p>
                        <p className={`text-xl font-extrabold mt-1 ${stat.color}`}>{stat.val}</p>
                        <p className="text-[10px] opacity-50 mt-1">{stat.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Net Profit Calculation Formula Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <p className="font-bold text-emerald-500">📊 নিট লাভ (Net Profit ৳) গণনার ফর্মুলা:</p>
                      <p className="opacity-75 mt-0.5 font-mono text-[11px]">
                        Net Profit (৳) = Selling Price - Product Cost - Delivery Cost - Discount - Marketing Cost
                      </p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-1 rounded-full">
                      Real-time Calculated
                    </span>
                  </div>

                  {/* Profit Calculation Grid Table */}
                  <div className={`rounded-3xl border overflow-hidden
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <table className="w-full text-left border-collapse min-w-[750px]">
                      <thead>
                        <tr className="border-b border-[#322822]/10 opacity-60 text-xs">
                          <th className="p-4">প্রোডাক্ট বিবরণ</th>
                          <th className="p-4 text-right">বিক্রয় মূল্য (৳)</th>
                          <th className="p-4 text-right text-indigo-400">প্রোডাক্ট কস্ট (৳)</th>
                          <th className="p-4 text-right text-amber-500">ডেলিভারি কস্ট (৳)</th>
                          <th className="p-4 text-right text-rose-400">ছাড়/ডিসকাউন্ট (৳)</th>
                          <th className="p-4 text-right text-blue-400">মার্কেটিং কস্ট (৳)</th>
                          <th className="p-4 text-right text-emerald-400 font-extrabold bg-emerald-500/[0.03]">নিট লাভ (Net Profit ৳)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#322822]/5">
                        {products.map((p) => {
                          const sellPrice = p.price;
                          const prodCost = p.productCost || 0;
                          const delivCost = p.deliveryCost || 0;
                          const disc = p.discount || 0;
                          const marketCost = p.marketingCost || 0;
                          const netProfit = sellPrice - prodCost - delivCost - disc - marketCost;
                          const totalProductProfit = netProfit * p.salesCount;

                          return (
                            <tr key={p.id} className="text-xs hover:bg-emerald-500/[0.01] transition-all">
                              <td className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="h-8 w-8 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                                  </div>
                                  <div>
                                    <span className="font-bold block">{p.name}</span>
                                    <span className="text-[9px] opacity-50 block font-mono">বিক্রিত পরিমাণ: {p.salesCount} টি</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-right font-mono font-bold">{formatCurrency(sellPrice)}</td>
                              <td className="p-4 text-right font-mono text-indigo-400 font-medium">{formatCurrency(prodCost)}</td>
                              <td className="p-4 text-right font-mono text-amber-500 font-medium">{formatCurrency(delivCost)}</td>
                              <td className="p-4 text-right font-mono text-rose-400 font-medium">{formatCurrency(disc)}</td>
                              <td className="p-4 text-right font-mono text-blue-400 font-medium">{formatCurrency(marketCost)}</td>
                              <td className="p-4 text-right font-mono font-black text-emerald-500 bg-emerald-500/[0.03]">
                                <div className="space-y-0.5">
                                  <span className="block">{formatCurrency(netProfit)} <span className="opacity-60 text-[9px] font-normal">/ unit</span></span>
                                  <span className="block text-[10px] text-emerald-400 font-bold">মোট: {formatCurrency(totalProductProfit)}</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Stock logs & adjustment history */}
              {inventorySubTab === 'history' && (
                <div className={`rounded-3xl border overflow-hidden
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="p-5 border-b border-inherit flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-amber-500">ইনভেন্টরি পরিবর্তন ও অ্যাকশন ইতিহাস (Stock Activity Log)</h3>
                    <span className="text-[10px] bg-amber-500/10 text-amber-500 font-mono px-2 py-0.5 rounded font-bold uppercase">Real-Time Sync</span>
                  </div>

                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="border-b border-[#322822]/10 opacity-60 text-xs">
                        <th className="p-4">তারিখ ও সময়</th>
                        <th className="p-4">প্রোডাক্টের নাম</th>
                        <th className="p-4">সাইজ ও কালার</th>
                        <th className="p-4 text-center">অ্যাকশন টাইপ</th>
                        <th className="p-4 text-center">পরিবর্তন (Qty)</th>
                        <th className="p-4">অতিরিক্ত নোট / বিবরণ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#322822]/5">
                      {inventoryHistory.map((h) => (
                        <tr key={h.id} className="text-xs hover:bg-[#120e0c]/5 dark:hover:bg-[#faf8f5]/5 transition-all">
                          <td className="p-4 font-mono opacity-70">{h.timestamp}</td>
                          <td className="p-4 font-bold">{h.productName}</td>
                          <td className="p-4">
                            <span className="opacity-75">সাইজ: {h.size} | কালার: {h.color}</span>
                          </td>
                          <td className="p-4 text-center">
                            {h.type === 'Restock' && (
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-bold">
                                রিস্টক (Restock)
                              </span>
                            )}
                            {h.type === 'Sale' && (
                              <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 rounded text-[9px] font-bold">
                                বিক্রি (Sale)
                              </span>
                            )}
                            {h.type === 'Adjustment' && (
                              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded text-[9px] font-bold">
                                সমন্বয় (Adjustment)
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center font-mono font-bold">
                            <span className={h.quantity > 0 ? 'text-emerald-500' : 'text-rose-500'}>
                              {h.quantity > 0 ? `+${h.quantity}` : h.quantity}
                            </span>
                          </td>
                          <td className="p-4 opacity-70 italic max-w-xs truncate">{h.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ==========================================================
              TAB 6: ANALYTICS & REPORTS
              ========================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">বিজনেস অ্যানালিটিক্স (Business Reports)</h1>
                  <p className="opacity-60 text-sm mt-1">Gemini AI দ্বারা ব্যবসার পারফরম্যান্স, লাভ ও ঝুঁকি নিরীক্ষণ করুন।</p>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleTriggerAnalysis('sales')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#e07a5f] text-white hover:bg-[#d06a4f] transition-all"
                  >
                    <PieChart className="h-4 w-4" />
                    <span>AI সেলস রিপোর্ট</span>
                  </button>
                  <button 
                    onClick={() => handleTriggerAnalysis('behavior')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-black transition-all"
                  >
                    <Users className="h-4 w-4" />
                    <span>CRM কাস্টমার রিপোর্ট</span>
                  </button>
                </div>
              </div>

              {/* Reports Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Selector */}
                <div className={`p-6 rounded-[2rem] border flex flex-col justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="space-y-4">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider opacity-60">অ্যানালাইসিস মডিউলস</h3>
                    
                    <button 
                      onClick={() => handleTriggerAnalysis('sales')}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start space-x-3
                        ${aiAnalysisType === 'sales' ? 'border-[#e07a5f] bg-[#e07a5f]/10' : 'border-[#322822]/10 hover:bg-amber-500/5'}`}
                    >
                      <TrendingUp className="h-5 w-5 text-[#e07a5f] mt-0.5" />
                      <div>
                        <span className="font-bold text-xs block">1. Sales Performance Report</span>
                        <span className="text-[10px] opacity-60 block mt-0.5">পণ্য বিক্রি ও মুনাফা সর্বোচ্চকরণের পরিকল্পনা</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleTriggerAnalysis('behavior')}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start space-x-3
                        ${aiAnalysisType === 'behavior' ? 'border-amber-500 bg-amber-500/10' : 'border-[#322822]/10 hover:bg-amber-500/5'}`}
                    >
                      <Users className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <span className="font-bold text-xs block">2. CRM Customer Segment Audit</span>
                        <span className="text-[10px] opacity-60 block mt-0.5">কাস্টমার উইন-ব্যাক এবং রিটেনশন পলিসি সাজেশন</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleTriggerAnalysis('general')}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start space-x-3
                        ${aiAnalysisType === 'general' ? 'border-orange-400 bg-orange-400/10' : 'border-[#322822]/10 hover:bg-amber-500/5'}`}
                    >
                      <ShieldAlert className="h-5 w-5 text-orange-400 mt-0.5" />
                      <div>
                        <span className="font-bold text-xs block">3. Risk & Fraud Detection Audit</span>
                        <span className="text-[10px] opacity-60 block mt-0.5">ক্ষতিকর অর্ডার ট্র্যাকিং এবং কম স্টক অ্যালার্ট</span>
                      </div>
                    </button>
                  </div>

                  <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 mt-6 text-[10px] leading-relaxed">
                    ⚙️ <strong>প্রো টিপ:</strong> এআই রিপোর্ট জেনারেট করতে রিয়েল-টাইম ড্যাশবোর্ড ডেটা স্ট্রাকচার পাঠানো হয়।
                  </div>
                </div>

                {/* AI report output panel */}
                <div className={`p-6 rounded-[2rem] border lg:col-span-2 min-h-[400px] flex flex-col justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="border-b border-[#322822]/10 pb-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">এআই জেনারেটেড বিজনেস ইন্টেলিজেন্স</h3>
                      <span className="text-[10px] opacity-50 font-mono">Powered by Gemini 3.5 Flash Model</span>
                    </div>
                    {aiAnalysisLoading && (
                      <span className="text-xs text-[#e07a5f] font-bold animate-pulse">রিপোর্ট প্রিপেয়ার করা হচ্ছে...</span>
                    )}
                  </div>

                  <div className="flex-1 py-6 overflow-y-auto max-h-[450px] space-y-4">
                    {aiAnalysisLoading ? (
                      <div className="h-full flex flex-col items-center justify-center space-y-4 text-center opacity-65 pt-12">
                        <div className="h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs">Aura AI স্টোরের রিয়েল-টাইম ডেটা নিয়ে বিশ্লেষণ করছে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন...</p>
                      </div>
                    ) : aiAnalysisResult ? (
                      <div className="prose dark:prose-invert text-xs max-w-none leading-relaxed whitespace-pre-wrap font-mono text-left bg-black/15 p-4 rounded-xl border border-white/5">
                        {aiAnalysisResult}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center space-y-3 text-center opacity-65 pt-12">
                        <Sparkles className="h-10 w-10 text-[#e07a5f] animate-pulse" />
                        <p className="font-bold text-xs">কোন রিপোর্ট এখনো জেনারেট করা হয়নি।</p>
                        <p className="text-[11px] max-w-sm">ডান পাশের বাটনগুলোতে ক্লিক করে কাস্টম সেলস, কাস্টমার আচরণ কিংবা সিকিউরিটি অডিট রিপোর্ট তৈরি করুন।</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#322822]/10 pt-4 flex justify-between items-center text-[10px] opacity-60">
                    <span>স্টোর ডেটা সিঙ্ক সম্পন্ন হয়েছে।</span>
                    <span>Aura Lux Client Management v2.4</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==========================================================
              TAB: MARKETING AUTOMATION & LOYALTY CLUB
              ========================================================== */}
          {activeTab === 'marketing' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">মার্কেটিং ও লয়্যালটি ড্যাশবোর্ড (Marketing & Loyalty Club)</h1>
                  <p className="opacity-60 text-sm mt-1">
                    কাস্টমার সেগমেন্টেশন, অটোমেটেড ক্যাম্পেইন, কুপন ম্যানেজমেন্ট এবং মেম্বারশিপ রিওয়ার্ড সিস্টেম।
                  </p>
                </div>
                
                {/* Sub-tab Selection */}
                <div className="flex items-center space-x-1.5 p-1 bg-neutral-900/10 dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/10">
                  {(['campaigns', 'segments', 'offers', 'loyalty'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setMarketingSubTab(tab)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200
                        ${marketingSubTab === tab 
                          ? 'bg-[#e07a5f] text-white shadow-md' 
                          : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/5'}`}
                    >
                      {tab === 'campaigns' && '📢 অটোমেটেড ক্যাম্পেইন'}
                      {tab === 'segments' && '👥 কাস্টমার সেগমেন্ট'}
                      {tab === 'offers' && '🎫 কুপন ও অফার'}
                      {tab === 'loyalty' && '🪙 লয়্যালটি মেম্বারশিপ'}
                    </button>
                  ))}
                </div>
              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-5 rounded-2xl border ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                  <span className="text-[10px] uppercase tracking-wider opacity-50 block font-mono">Total Campaigns Sent</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono">{campaignsList.reduce((sum, c) => sum + c.sentCount, 0)}</span>
                    <span className="text-xs text-emerald-500 font-bold">100% Delivery</span>
                  </div>
                </div>
                <div className={`p-5 rounded-2xl border ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                  <span className="text-[10px] uppercase tracking-wider opacity-50 block font-mono">Coupon Redemptions</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono">{coupons.reduce((sum, c) => sum + c.usageCount, 0)}</span>
                    <span className="text-xs text-amber-500 font-bold">Active Promo</span>
                  </div>
                </div>
                <div className={`p-5 rounded-2xl border ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                  <span className="text-[10px] uppercase tracking-wider opacity-50 block font-mono">Loyalty Club Members</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono">{customers.length}</span>
                    <span className="text-xs text-indigo-500 font-bold">Bronze to VIP</span>
                  </div>
                </div>
                <div className={`p-5 rounded-2xl border ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                  <span className="text-[10px] uppercase tracking-wider opacity-50 block font-mono">Reward Points Issued</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-amber-500">
                      {customers.reduce((sum, c) => sum + (c.rewardPoints || Math.floor(c.totalSpending * 0.05)), 0).toLocaleString()}
                    </span>
                    <span className="text-xs opacity-60">Points Issued</span>
                  </div>
                </div>
              </div>

              {/* TAB CONTENT: CAMPAIGNS */}
              {marketingSubTab === 'campaigns' && (
                <div className={`p-6 rounded-[2rem] border space-y-6 ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                  <div>
                    <h3 className="text-lg font-bold">এআই মার্কেটিং অটোমেশন ইঞ্জিন (Automation Workflows)</h3>
                    <p className="text-xs opacity-60 mt-0.5">নির্দিষ্ট কাস্টমার ইভেন্ট বা প্রোফাইল সেগমেন্ট পরিবর্তনের উপর ভিত্তি করে স্বয়ংক্রিয় মেসেজিং ক্যাম্পেইন।</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#322822]/10 opacity-60 text-[10px] uppercase">
                          <th className="p-3">ক্যাম্পেইন নাম</th>
                          <th className="p-3">অটোমেশন ট্রিগার (Trigger)</th>
                          <th className="p-3 text-center">মেসেজ প্রেরিত (Sent)</th>
                          <th className="p-3 text-center">ওপেন রেট (Open Rate)</th>
                          <th className="p-3 text-center">কনভার্সন (Conversion)</th>
                          <th className="p-3">স্ট্যাটাস</th>
                          <th className="p-3 text-right">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#322822]/5">
                        {campaignsList.map((camp) => (
                          <tr key={camp.id} className="hover:bg-amber-500/[0.01]">
                            <td className="p-3 font-bold flex items-center space-x-2">
                              <span className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg"><Send className="h-3.5 w-3.5" /></span>
                              <span>{camp.name === 'Welcome Message' ? 'স্বাগতম বার্তা (Welcome Message)' :
                                    camp.name === 'Abandoned Cart Reminder' ? 'ফেলে রাখা কার্ট রিমাইন্ডার (Abandoned Cart)' :
                                    camp.name === 'Birthday Offer' ? 'জন্মদিনের শুভেচ্ছা কুপন (Birthday Offer)' :
                                    camp.name === 'Win Back Campaign' ? 'ইনঅ্যাক্টিভ উইন-ব্যাক (Win Back Campaign)' :
                                    'ভিআইপি কাস্টমার ট্রিগার (VIP Offer)'}</span>
                            </td>
                            <td className="p-3 font-mono opacity-80">{camp.trigger}</td>
                            <td className="p-3 text-center font-mono font-bold">{camp.sentCount} বার</td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center space-x-1.5">
                                <span className="font-mono font-bold">{camp.openRate}%</span>
                                <div className="w-12 bg-neutral-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full" style={{ width: `${camp.openRate}%` }} />
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-center font-mono font-bold text-[#e07a5f]">{camp.conversionRate}%</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 font-bold rounded text-[9px]">
                                {camp.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => {
                                  // Simulate running campaign test
                                  setCampaignsList(prev => prev.map(c => c.id === camp.id ? { ...c, sentCount: c.sentCount + 1 } : c));
                                  setNotifications(prev => [
                                    {
                                      id: `NOTIF-${Math.random()}`,
                                      title: `Campaign Simulation: ${camp.name}`,
                                      message: `সফলভাবে '${camp.name}' অটোমেশন রান করা হয়েছে। কাস্টমার ট্রিগার চেক সম্পন্ন!`,
                                      type: 'success',
                                      timestamp: new Date().toLocaleTimeString(),
                                      read: false
                                    },
                                    ...prev
                                  ]);
                                }}
                                className="px-3 py-1 bg-[#120e0c]/10 dark:bg-[#faf8f5]/10 hover:bg-amber-500/20 text-inherit text-[10px] font-bold rounded-lg transition-colors"
                              >
                                টেস্ট করুন (Run Test)
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-xs">এআই জেনারেটিভ ক্যাটাগরি উইন-ব্যাক (Aura Intelligence Tip)</h4>
                      <p className="text-[11px] opacity-85 mt-1">ইনঅ্যাক্টিভ কাস্টমার Sadia Afrin গত ৬ মাসে কোনো প্রোডাক্ট ক্রয় করেননি। তার লাস্ট ফেভারিট ক্যাটাগরি Footwear-এর উপর ভিত্তি করে একটি "Atelier Heels Premium Discount" ইমেল অটোমেশন ড্রাফট করতে পারেন।</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: SEGMENTS */}
              {marketingSubTab === 'segments' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Segmentation Rules */}
                  <div className={`p-6 rounded-[2rem] border space-y-6 ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                    <div>
                      <h3 className="text-base font-bold">কাস্টমার সেগমেন্টেশন রুলস</h3>
                      <p className="text-[11px] opacity-60">মোট ক্রয় ভ্যালু (LTV) এর ভিত্তিতে স্বয়ংক্রিয় শ্রেণীবিভাগ।</p>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <div className="flex justify-between font-bold">
                          <span className="text-amber-500">👑 VIP Customers</span>
                          <span className="font-mono">{customers.filter(c => c.totalSpending >= 300000).length} জন</span>
                        </div>
                        <p className="text-[10px] opacity-70 mt-1">শর্ত: মোট ক্রয় ভ্যালু ৳ ৩,০০,০০০ বা বেশি। রিওয়ার্ড রেট ২০%।</p>
                      </div>
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <div className="flex justify-between font-bold">
                          <span className="text-yellow-500">⭐ Gold Segment</span>
                          <span className="font-mono">{customers.filter(c => c.totalSpending >= 100000 && c.totalSpending < 300000).length} জন</span>
                        </div>
                        <p className="text-[10px] opacity-70 mt-1">শর্ত: মোট ক্রয় ভ্যালু ৳ ১,০০,০০০ - ৳ ৩,০০,০০০। রিওয়ার্ড রেট ১৫%।</p>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex justify-between font-bold">
                          <span className="text-indigo-400">🛡️ Silver Segment</span>
                          <span className="font-mono">{customers.filter(c => c.totalSpending >= 50000 && c.totalSpending < 100000).length} জন</span>
                        </div>
                        <p className="text-[10px] opacity-70 mt-1">শর্ত: মোট ক্রয় ভ্যালু ৳ ৫০,০০০ - ৳ ১,০০,০০০। রিওয়ার্ড রেট ১০%।</p>
                      </div>
                      <div className="p-3 bg-neutral-500/10 border border-neutral-500/20 rounded-xl">
                        <div className="flex justify-between font-bold">
                          <span className="opacity-70">🌱 Bronze Segment</span>
                          <span className="font-mono">{customers.filter(c => c.totalSpending < 50000).length} জন</span>
                        </div>
                        <p className="text-[10px] opacity-70 mt-1">শর্ত: মোট ক্রয় ভ্যালু ৳ ৫০,০০০ এর কম। রিওয়ার্ড রেট ৫%।</p>
                      </div>
                    </div>
                  </div>

                  {/* Segment customers directory */}
                  <div className={`p-6 rounded-[2rem] border lg:col-span-2 space-y-6 ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold">সেগমেন্ট অনুযায়ী কাস্টমার ডিরেক্টরি</h3>
                        <p className="text-[11px] opacity-60">কাস্টমারের রিয়েল-টাইম লাইফটাইম ক্রয় ডেটা এবং মেম্বারশিপ লেভেল।</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#322822]/10 opacity-60 text-[10px]">
                            <th className="p-3">কাস্টমার প্রোফাইল</th>
                            <th className="p-3 text-center">মেম্বারশিপ টায়ার</th>
                            <th className="p-3 text-right">মোট ক্রয় (LTV)</th>
                            <th className="p-3 text-center">রিওয়ার্ড পয়েন্ট</th>
                            <th className="p-3 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#322822]/5">
                          {customers.map((cust) => {
                            const ltv = cust.totalSpending;
                            let tierColor = 'bg-neutral-500/20 text-neutral-400';
                            let tierLabel = 'Bronze';
                            if (ltv >= 300000) {
                              tierColor = 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold';
                              tierLabel = '👑 VIP';
                            } else if (ltv >= 100000) {
                              tierColor = 'bg-yellow-500/20 text-yellow-500 font-bold';
                              tierLabel = '⭐ Gold';
                            } else if (ltv >= 50000) {
                              tierColor = 'bg-slate-400/20 text-slate-400 font-bold';
                              tierLabel = '🛡️ Silver';
                            }
                            const points = cust.rewardPoints || Math.floor(ltv * 0.05);

                            return (
                              <tr key={cust.id} className="hover:bg-amber-500/[0.01]">
                                <td className="p-3 flex items-center space-x-2.5">
                                  <div className="h-8 w-8 rounded-full overflow-hidden bg-neutral-900">
                                    <img src={cust.avatar} alt={cust.name} className="h-full w-full object-cover" />
                                  </div>
                                  <div>
                                    <span className="font-bold block">{cust.name}</span>
                                    <span className="text-[9px] opacity-50 block font-mono">{cust.id}</span>
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  <span className={`px-2.5 py-0.5 rounded text-[9px] ${tierColor}`}>
                                    {tierLabel}
                                  </span>
                                </td>
                                <td className="p-3 text-right font-mono font-bold">{formatCurrency(ltv)}</td>
                                <td className="p-3 text-center font-mono font-bold text-amber-500">🪙 {points.toLocaleString()}</td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => {
                                      setSelectedCustomer(cust);
                                      setActiveTab('customers');
                                    }}
                                    className="px-2.5 py-1 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-bold rounded-lg transition-all text-[10px]"
                                  >
                                    CRM প্রোফাইল
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: OFFERS */}
              {marketingSubTab === 'offers' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Create offer form */}
                  <div className={`p-6 rounded-[2rem] border space-y-6 ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                    <div>
                      <h3 className="text-base font-bold">নতুন প্রোমো কোড তৈরি করুন</h3>
                      <p className="text-[11px] opacity-60">ক্যাম্পেইন ট্র্যাকিং ও ডিসকাউন্ট রুলস সংযুক্ত অফার।</p>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!couponForm.code.trim()) {
                        alert('দয়া করে কোড প্রদান করুন।');
                        return;
                      }
                      setCoupons(prev => [
                        { code: couponForm.code.toUpperCase().trim(), discount: Number(couponForm.discount), type: couponForm.type, status: 'active', usageCount: 0 },
                        ...prev
                      ]);
                      setCouponForm({ code: '', discount: 15, type: 'percentage', status: 'active' });
                      setNotifications(prev => [
                        {
                          id: `NOTIF-${Math.random()}`,
                          title: 'New Coupon Added',
                          message: `সফলভাবে কুপন কোড ${couponForm.code.toUpperCase()} যুক্ত করা হয়েছে।`,
                          type: 'success',
                          timestamp: new Date().toLocaleTimeString(),
                          read: false
                        },
                        ...prev
                      ]);
                    }} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold opacity-75">প্রোমো কোড (যেমন: EID50)</label>
                        <input
                          type="text"
                          placeholder="কুপন কোড লিখুন..."
                          value={couponForm.code}
                          onChange={(e) => setCouponForm(prev => ({ ...prev, code: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl bg-neutral-900/5 dark:bg-white/5 border border-neutral-300 dark:border-white/10 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-bold opacity-75">ডিসকাউন্ট পরিমাণ</label>
                          <input
                            type="number"
                            value={couponForm.discount}
                            onChange={(e) => setCouponForm(prev => ({ ...prev, discount: Number(e.target.value) }))}
                            className="w-full px-3.5 py-2 rounded-xl bg-neutral-900/5 dark:bg-white/5 border border-neutral-300 dark:border-white/10 outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold opacity-75">ডিসকাউন্ট টাইপ</label>
                          <select
                            value={couponForm.type}
                            onChange={(e) => setCouponForm(prev => ({ ...prev, type: e.target.value as any }))}
                            className="w-full px-3.5 py-2 rounded-xl bg-neutral-900/5 dark:bg-white/5 border border-neutral-300 dark:border-white/10 outline-none text-inherit bg-[#1a1614]"
                          >
                            <option value="percentage">শতকরা (%)</option>
                            <option value="fixed">৳ নির্দিষ্ট ছাড়</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/10"
                      >
                        কুপন কোড যুক্ত করুন
                      </button>
                    </form>
                  </div>

                  {/* Offers List */}
                  <div className={`p-6 rounded-[2rem] border lg:col-span-2 space-y-6 ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                    <div>
                      <h3 className="text-base font-bold">সক্রিয় কুপন কোড ও অফারসমূহ</h3>
                      <p className="text-[11px] opacity-60">WooCommerce এর সাথে সংযুক্ত সক্রিয় এবং ইনঅ্যাক্টিভ ভাউচারসমূহ।</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#322822]/10 opacity-60 text-[10px]">
                            <th className="p-3">প্রোমো কোড</th>
                            <th className="p-3">ডিসকাউন্ট মূল্য</th>
                            <th className="p-3 text-center">মোট ব্যবহার (Usage)</th>
                            <th className="p-3">স্ট্যাটাস</th>
                            <th className="p-3 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#322822]/5">
                          {coupons.map((cop) => (
                            <tr key={cop.code} className="hover:bg-amber-500/[0.01]">
                              <td className="p-3 font-mono font-bold text-amber-500 flex items-center space-x-2">
                                <Ticket className="h-4 w-4 opacity-75" />
                                <span>{cop.code}</span>
                              </td>
                              <td className="p-3 font-mono font-bold">
                                {cop.type === 'percentage' ? `${cop.discount}% ছাড়` : `${formatCurrency(cop.discount)} ছাড়`}
                              </td>
                              <td className="p-3 text-center font-mono font-bold">{cop.usageCount} বার</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold 
                                  ${cop.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                  {cop.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="p-3 text-right space-x-2">
                                <button
                                  onClick={() => {
                                    setCoupons(prev => prev.map(c => c.code === cop.code ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
                                  }}
                                  className="px-2 py-1 bg-[#120e0c]/5 dark:bg-white/5 hover:bg-amber-500/20 text-inherit text-[10px] font-bold rounded-lg transition-colors"
                                >
                                  স্ট্যাটাস টগল
                                </button>
                                <button
                                  onClick={() => {
                                    setCoupons(prev => prev.filter(c => c.code !== cop.code));
                                  }}
                                  className="p-1 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors inline-flex align-middle"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: LOYALTY CLUB */}
              {marketingSubTab === 'loyalty' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Loyalty levels rule sheet */}
                  <div className={`p-6 rounded-[2rem] border space-y-6 ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                    <div>
                      <h3 className="text-base font-bold flex items-center space-x-2">
                        <Coins className="h-5 w-5 text-amber-500 animate-pulse" />
                        <span>লয়্যালটি রিওয়ার্ড প্রোগ্রাম রুলস</span>
                      </h3>
                      <p className="text-[11px] opacity-60 mt-1">কাস্টমারকে পয়েন্ট ডিস্ট্রিবিউট ও পয়েন্ট ভিত্তিক বেনিফিট দেওয়ার গাইডলাইন।</p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="p-4 border border-indigo-500/10 bg-indigo-500/[0.02] rounded-xl space-y-2">
                        <h4 className="font-extrabold text-xs text-indigo-400">🪙 রিওয়ার্ড পয়েন্ট ক্যালকুলেশন রুল</h4>
                        <p className="text-[11px] leading-relaxed opacity-90">প্রতিটি অর্ডারে মোট ক্রয়ের মূল্যের **৫%** রিওয়ার্ড পয়েন্ট হিসেবে কাস্টমার অ্যাকাউন্টে ক্রেডিট হয়। (যেমন: ৳ ১০০০০ এর ক্রয়ে ৫০০ রিওয়ার্ড পয়েন্ট ক্রেডিট হয়)।</p>
                      </div>

                      <div className="space-y-2.5">
                        <h4 className="font-bold text-xs opacity-75">মেম্বারশিপ বেনিফিট চার্ট</h4>
                        <div className="divide-y divide-[#322822]/10 dark:divide-white/5 space-y-2 text-[11px]">
                          <div className="pt-2 flex justify-between">
                            <span className="font-bold text-amber-500">👑 VIP Member</span>
                            <span className="text-right opacity-80">ফ্ল্যাট ২০% ডিসকাউন্ট + ডেডিকেটেড এআই স্টাইল কনসিয়ার্জ</span>
                          </div>
                          <div className="pt-2 flex justify-between">
                            <span className="font-bold text-yellow-500">⭐ Gold Member</span>
                            <span className="text-right opacity-80">ফ্ল্যাট ১৫% ডিসকাউন্ট + বার্থডে লাক্সারি গিফট ভাউচার</span>
                          </div>
                          <div className="pt-2 flex justify-between">
                            <span className="font-bold text-slate-400">🛡️ Silver Member</span>
                            <span className="text-right opacity-80">ফ্ল্যাট ১০% ডিসকাউন্ট + নতুন কালেকশনে ২ দিন আগে অ্যাক্সেস</span>
                          </div>
                          <div className="pt-2 flex justify-between">
                            <span className="font-bold opacity-60">🌱 Bronze Member</span>
                            <span className="text-right opacity-80">ফ্ল্যাট ৫% ডিসকাউন্ট + ঢাকার ভেতরে ফ্রী হোম ডেলিভারি</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loyalty Points modification & adjustment table */}
                  <div className={`p-6 rounded-[2rem] border lg:col-span-2 space-y-6 ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}>
                    <div>
                      <h3 className="text-base font-bold">কাস্টমার পয়েন্ট সমন্বয় ও ম্যানুয়াল ক্রেডিট</h3>
                      <p className="text-[11px] opacity-60">কাস্টমারকে ম্যানুয়ালি অতিরিক্ত লয়্যালটি পয়েন্ট প্রদান অথবা কর্তন করুন।</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#322822]/10 opacity-60 text-[10px]">
                            <th className="p-3">কাস্টমার নাম</th>
                            <th className="p-3 text-center">মেম্বারশিপ লেভেল</th>
                            <th className="p-3 text-center">বর্তমান পয়েন্ট ব্যালেন্স</th>
                            <th className="p-3 text-right">পয়েন্ট ক্রেডিট / সমন্বয় অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#322822]/5">
                          {customers.map((cust) => {
                            const ltv = cust.totalSpending;
                            const points = cust.rewardPoints || Math.floor(ltv * 0.05);
                            let tierLabel = 'Bronze Member';
                            let tierColor = 'text-neutral-400';
                            if (ltv >= 300000) {
                              tierLabel = 'VIP Platinum Club';
                              tierColor = 'text-amber-500 font-extrabold';
                            } else if (ltv >= 100000) {
                              tierLabel = 'Gold Elite Club';
                              tierColor = 'text-yellow-500 font-bold';
                            } else if (ltv >= 50000) {
                              tierLabel = 'Silver Premier Club';
                              tierColor = 'text-slate-400 font-bold';
                            }

                            return (
                              <tr key={cust.id} className="hover:bg-amber-500/[0.01]">
                                <td className="p-3 flex items-center space-x-2">
                                  <div className="h-7 w-7 rounded-full overflow-hidden bg-neutral-950">
                                    <img src={cust.avatar} alt={cust.name} className="h-full w-full object-cover" />
                                  </div>
                                  <div>
                                    <span className="font-bold block">{cust.name}</span>
                                    <span className="text-[9px] opacity-50 block font-mono">{cust.id}</span>
                                  </div>
                                </td>
                                <td className="p-3 text-center font-bold text-[10px]">
                                  <span className={tierColor}>{tierLabel}</span>
                                </td>
                                <td className="p-3 text-center font-mono font-bold text-amber-500 text-sm">
                                  🪙 {points.toLocaleString()} pts
                                </td>
                                <td className="p-3 text-right space-x-1">
                                  <button
                                    onClick={() => {
                                      // Manual Points Increment
                                      setCustomers(prev => prev.map(c => c.id === cust.id ? { ...c, rewardPoints: points + 500 } : c));
                                      setNotifications(prev => [
                                        {
                                          id: `NOTIF-${Math.random()}`,
                                          title: 'Loyalty Points Manual Adjust',
                                          message: `${cust.name}-কে ম্যানুয়ালি ৫০০ পয়েন্ট ক্রেডিট করা হয়েছে। নতুন ব্যালেন্স: ${points + 500}`,
                                          type: 'success',
                                          timestamp: new Date().toLocaleTimeString(),
                                          read: false
                                        },
                                        ...prev
                                      ]);
                                    }}
                                    className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold rounded-lg transition-colors text-[10px]"
                                  >
                                    +৫০০ Points ক্রেডিট
                                  </button>
                                  <button
                                    onClick={() => {
                                      // Manual Points Decrement
                                      if (points < 500) {
                                        alert('পয়েন্ট ব্যালেন্স ৫০০ এর কম আছে। কর্তন করা সম্ভব নয়।');
                                        return;
                                      }
                                      setCustomers(prev => prev.map(c => c.id === cust.id ? { ...c, rewardPoints: points - 500 } : c));
                                      setNotifications(prev => [
                                        {
                                          id: `NOTIF-${Math.random()}`,
                                          title: 'Loyalty Points Manual Deduct',
                                          message: `${cust.name}-কে ম্যানুয়ালি ৫০০ পয়েন্ট কর্তন করা হয়েছে। নতুন ব্যালেন্স: ${points - 500}`,
                                          type: 'warning',
                                          timestamp: new Date().toLocaleTimeString(),
                                          read: false
                                        },
                                        ...prev
                                      ]);
                                    }}
                                    className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold rounded-lg transition-colors text-[10px]"
                                  >
                                    -৫০০ Points কর্তন
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==========================================================
              TAB 7: WORDPRESS & WOOCOMMERCE SYNC PORTAL
              ========================================================== */}
          {activeTab === 'tech-stack' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">WordPress & WooCommerce সিঙ্ক পোর্টাল (Sync Portal)</h1>
                  <p className="opacity-60 text-sm mt-1">
                    API ইন্টিগ্রেশন এবং কাস্টম প্লাগইন আর্কিটেকচার ম্যানেজমেন্ট ওয়ার্কস্পেস।
                  </p>
                </div>
                
                {/* Integration Sub-tabs */}
                <div className="flex space-x-2 bg-black/20 p-1 rounded-xl border border-inherit">
                  {(['terminal', 'explorer', 'database'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setWpActiveSubTab(tab)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize
                        ${wpActiveSubTab === tab 
                          ? 'bg-amber-500/20 text-amber-500 border-none shadow' 
                          : 'opacity-70 hover:opacity-100'}`}
                    >
                      {tab === 'terminal' && '🔌 REST API টার্মিনাল'}
                      {tab === 'explorer' && '📁 প্লাগইন কোড এক্সপ্লোরার'}
                      {tab === 'database' && '🗄️ MySQL স্কিমা অপ্টিমাইজেশন'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4
                ${settings.themeMode === 'dark' ? 'bg-[#1e1916] border-amber-500/15' : 'bg-amber-500/5 border-amber-500/10'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                    <RefreshCcw className={`h-5 w-5 ${syncStatusState === 'running' ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs">WooCommerce Sync Status</h3>
                    <p className="text-[10px] opacity-60 mt-0.5">
                      {syncStatusState === 'idle' && 'স্ট্যান্ডবাই - সিঙ্ক শুরু করার জন্য রেডি।'}
                      {syncStatusState === 'running' && 'WooCommerce REST v3 API এন্ডপয়েন্টে রিকোয়েস্ট পাঠানো হচ্ছে...'}
                      {syncStatusState === 'success' && 'ডাটা সিঙ্ক্রোনাইজেশন সফলভাবে সম্পন্ন হয়েছে!'}
                      {syncStatusState === 'failed' && 'সিঙ্ক ব্যর্থ হয়েছে। অনুগ্রহ করে নেটওয়ার্ক এবং API কি চেক করুন।'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="opacity-60">API SSL:</span>
                  <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">Secure TLS 1.3</span>
                </div>
              </div>

              {/* MAIN SUB-TAB 1: REST API TERMINAL / SIMULATOR */}
              {wpActiveSubTab === 'terminal' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls column */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className={`p-6 rounded-[2rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc]'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit">ইন্টারেক্টিভ টেস্ট কনসোল</h3>
                      
                      <div className="space-y-2.5">
                        <p className="text-[11px] opacity-70 leading-relaxed">
                          এই টার্মিনালটি WooCommerce REST API v3 ইন্টিগ্রেশন এবং সিকিউর Nonce অথেনটিকেশন লেয়ার পরীক্ষা করে। নিচের বাটনে ক্লিক করে লাইভ সিঙ্ক প্রসেস সিমুলেট করুন:
                        </p>

                        {/* Button 1: Sync products */}
                        <button
                          onClick={() => {
                            setSyncStatusState('running');
                            setSyncConsoleLogs(prev => [
                              ...prev,
                              `[${new Date().toLocaleTimeString()}] [GET] Sending REST Request to /wp-json/wc/v3/products...`,
                              `[${new Date().toLocaleTimeString()}] [SECURITY] Verifying wp_nonce: ${Math.random().toString(36).substring(7)}`,
                              `[${new Date().toLocaleTimeString()}] [REST-API] WooCommerce responded with 200 OK status. Found ${products.length} catalog items.`,
                              `[${new Date().toLocaleTimeString()}] [SYNC] Matching SKU codes and importing sizes (${products.map(p => p.sku).join(', ')})`,
                              `[${new Date().toLocaleTimeString()}] [SUCCESS] Successfully synched and updated local product catalog levels.`
                            ]);
                            setTimeout(() => setSyncStatusState('success'), 1200);
                          }}
                          disabled={syncStatusState === 'running'}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl transition-all"
                        >
                          <span>📦 ক্যাটালগ সিঙ্ক করুন (Get Products)</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>

                        {/* Button 2: Sync Customers */}
                        <button
                          onClick={() => {
                            setSyncStatusState('running');
                            setSyncConsoleLogs(prev => [
                              ...prev,
                              `[${new Date().toLocaleTimeString()}] [GET] Dispatching query: /wp-json/wc/v3/customers?role=all&per_page=100`,
                              `[${new Date().toLocaleTimeString()}] [AUTH] Verifying Consumer Key (ck_xxxx) and Secret (cs_xxxx) credentials...`,
                              `[${new Date().toLocaleTimeString()}] [WP-REST] Authorized. Fetching customer metadata, gender, and sizing preferences.`,
                              `[${new Date().toLocaleTimeString()}] [CRM-IMPORT] Synced ${customers.length} profiles successfully. VIP markers computed.`
                            ]);
                            setTimeout(() => setSyncStatusState('success'), 1200);
                          }}
                          disabled={syncStatusState === 'running'}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl transition-all"
                        >
                          <span>👤 কাস্টমার ডাটা সিঙ্ক (Sync CRM)</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>

                        {/* Button 3: Push orders */}
                        <button
                          onClick={() => {
                            setSyncStatusState('running');
                            setSyncConsoleLogs(prev => [
                              ...prev,
                              `[${new Date().toLocaleTimeString()}] [POST] Pushing ORD-2026-9043 details to Woocommerce...`,
                              `[${new Date().toLocaleTimeString()}] [PAYMENT] Synced status: Awaiting validation via Stripe webhook payload.`,
                              `[${new Date().toLocaleTimeString()}] [HOOKS] Triggered WordPress Action: 'woocommerce_new_order'`,
                              `[${new Date().toLocaleTimeString()}] [SUCCESS] WooCommerce Order reference mapped to Local DB.`
                            ]);
                            setTimeout(() => setSyncStatusState('success'), 1000);
                          }}
                          disabled={syncStatusState === 'running'}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-xl transition-all"
                        >
                          <span>🛍️ অর্ডার পুশ করুন (Push Orders)</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>

                        {/* Button 4: Clear terminal */}
                        <button
                          onClick={() => setSyncConsoleLogs([`[SYSTEM] Console cleared at ${new Date().toLocaleTimeString()}`])}
                          className="w-full text-center py-2 text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                        >
                          টার্মিনাল মুছুন (Clear Logs)
                        </button>
                      </div>
                    </div>

                    {/* WC Credentials Preview Card */}
                    <div className={`p-5 rounded-[2rem] border text-xs space-y-2.5
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc]'}`}
                    >
                      <h4 className="font-extrabold text-xs">WordPress REST API Credentials</h4>
                      <div className="space-y-1 font-mono text-[10px] opacity-80">
                        <p className="flex justify-between"><span className="opacity-60">Endpoint URL:</span> <span className="font-bold">https://example.com/wp-json</span></p>
                        <p className="flex justify-between"><span className="opacity-60">Consumer Key:</span> <span className="font-bold text-amber-500">ck_483a99...f91a</span></p>
                        <p className="flex justify-between"><span className="opacity-60">Consumer Secret:</span> <span className="font-bold text-amber-500">cs_de72b8...a003</span></p>
                        <p className="flex justify-between"><span className="opacity-60">Nonce Method:</span> <span className="font-bold text-indigo-400">X-WP-Nonce header</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Right Terminal Output Column */}
                  <div className="lg:col-span-8">
                    <div className="bg-[#0f0b08] text-[#f2e7dd] rounded-[2rem] border border-[#2b221d] overflow-hidden flex flex-col h-[380px] shadow-2xl">
                      {/* Terminal header */}
                      <div className="bg-[#181310] px-6 py-3 border-b border-[#2b221d] flex justify-between items-center">
                        <div className="flex space-x-1.5 items-center">
                          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                          <span className="text-[10px] font-mono opacity-50 ml-2">Secure WooCommerce REST Console</span>
                        </div>
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">REST v3</span>
                      </div>
                      
                      {/* Console Body */}
                      <div className="flex-1 overflow-y-auto p-6 font-mono text-xs space-y-2.5 leading-relaxed">
                        {syncConsoleLogs.map((log, index) => (
                          <div 
                            key={index} 
                            className={`
                              ${log.includes('[SUCCESS]') ? 'text-emerald-400' : ''}
                              ${log.includes('[SECURITY]') ? 'text-indigo-400' : ''}
                              ${log.includes('[STATUS]') ? 'text-amber-400' : ''}
                              ${log.includes('[GET]') || log.includes('[POST]') ? 'text-sky-400 font-bold' : ''}
                              ${log.includes('[CRM-IMPORT]') ? 'text-rose-400' : ''}
                              ${log.includes('[SYSTEM]') ? 'text-[#e8d3b9] opacity-60' : ''}
                            `}
                          >
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MAIN SUB-TAB 2: PLUGIN CODE EXPLORER */}
              {wpActiveSubTab === 'explorer' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Files list */}
                  <div className="lg:col-span-4 space-y-1.5 max-h-[500px] overflow-y-auto pr-2">
                    {[
                      { id: 'main', name: 'fashion-business-dashboard.php', desc: 'প্লাগইন বুটস্ট্র্যাপ ও কোর লোডার' },
                      { id: 'admin', name: 'admin/class-fashion-business-admin.php', desc: 'অ্যাডমিন ড্যাশবোর্ড ও মেনু ইন্টিগ্রেশন' },
                      { id: 'crm', name: 'modules/customer-crm/class-customer-crm.php', desc: 'সাইজ ইন্টেলিজেন্স ও সিআরএম ডাটা' },
                      { id: 'orders', name: 'modules/order-management/class-order-management.php', desc: 'অর্ডার সিঙ্ক ও ট্র্যাকিং হুক্স' },
                      { id: 'products', name: 'modules/product-management/class-product-management.php', desc: 'প্রোডাক্ট মেটাফিল্ড ও ফ্যাশন অ্যাট্রিবিউট' },
                      { id: 'inventory', name: 'modules/inventory/class-inventory-manager.php', desc: 'সাইজ ও কালার স্টক ট্র্যাকিং' },
                      { id: 'analytics', name: 'modules/analytics/class-profit-analytics.php', desc: 'নিট লাভ (Net Profit ৳) ক্যালকুলেটর' },
                      { id: 'marketing', name: 'modules/marketing/class-marketing-automation.php', desc: 'অটোমেটেড ক্যাম্পেইন ও লয়্যালটি মেম্বারশিপ' }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setWpCodeFile(f.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs
                          ${wpCodeFile === f.id
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold shadow-inner'
                            : 'bg-transparent border-inherit opacity-75 hover:opacity-100 hover:bg-amber-500/5'}`}
                      >
                        <p className="font-mono text-[11px] truncate">{f.name}</p>
                        <p className="text-[9px] opacity-65 font-sans mt-0.5 leading-relaxed">{f.desc}</p>
                      </button>
                    ))}
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-dashed border-amber-500/20 text-[10px] leading-relaxed opacity-80 mt-4">
                      💡 <strong>WordPress Architecture Standards:</strong> এই প্লাগইনটি অবজেক্ট ওরিয়েন্টেড পিএইচপি (OOP), ওয়ার্ডপ্রেস অ্যাকশন/ফিল্টার হুক্স এবং ওউন্স (Nonce Verification) সিকিউরিটি আর্কিটেকচার মেনে ডিজাইন করা।
                    </div>
                  </div>

                  {/* Code Editor Preview */}
                  <div className="lg:col-span-8">
                    <div className="bg-[#0f0b08] text-[#f2e7dd] rounded-[2rem] border border-[#2b221d] overflow-hidden flex flex-col shadow-2xl">
                      {/* Editor Title */}
                      <div className="bg-[#181310] px-6 py-3 border-b border-[#2b221d] flex justify-between items-center text-xs">
                        <span className="font-mono text-amber-500">
                          {wpCodeFile === 'main' && 'wp-content/plugins/fashion-business-dashboard/fashion-business-dashboard.php'}
                          {wpCodeFile === 'admin' && 'wp-content/plugins/fashion-business-dashboard/admin/class-fashion-business-admin.php'}
                          {wpCodeFile === 'crm' && 'wp-content/plugins/fashion-business-dashboard/modules/customer-crm/class-customer-crm.php'}
                          {wpCodeFile === 'orders' && 'wp-content/plugins/fashion-business-dashboard/modules/order-management/class-order-management.php'}
                          {wpCodeFile === 'products' && 'wp-content/plugins/fashion-business-dashboard/modules/product-management/class-product-management.php'}
                          {wpCodeFile === 'inventory' && 'wp-content/plugins/fashion-business-dashboard/modules/inventory/class-inventory-manager.php'}
                          {wpCodeFile === 'analytics' && 'wp-content/plugins/fashion-business-dashboard/modules/analytics/class-profit-analytics.php'}
                          {wpCodeFile === 'marketing' && 'wp-content/plugins/fashion-business-dashboard/modules/marketing/class-marketing-automation.php'}
                        </span>
                        <span className="font-bold opacity-40 font-mono">PHP (7.4+)</span>
                      </div>
                      
                      {/* Editor Code Pane */}
                      <pre className="p-6 overflow-x-auto font-mono text-xs leading-relaxed max-h-[420px] text-left">
                        {wpCodeFile === 'main' && `<?php
/**
 * Plugin Name: Fashion Business Dashboard Connector
 * Plugin URI:  https://github.com/aura-lux/fashion-business-dashboard
 * Description: WordPress plugin with custom modules (CRM, Profit Analytics, Stock, size/color variant, and loyalty automation) integrated with WooCommerce.
 * Version:     1.0.0
 * Author:      Aura Lux Systems
 * License:     GPL-2.0+
 */

defined( 'ABSPATH' ) || exit;

class Fashion_Business_Dashboard {
    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->define_constants();
        $this->includes();
        $this->init_hooks();
    }

    private function define_constants() {
        define( 'FBD_VERSION', '1.0.0' );
        define( 'FBD_PATH', plugin_dir_path( __FILE__ ) );
    }

    private function includes() {
        require_once FBD_PATH . 'admin/class-fashion-business-admin.php';
        require_once FBD_PATH . 'modules/customer-crm/class-customer-crm.php';
        require_once FBD_PATH . 'modules/order-management/class-order-management.php';
        require_once FBD_PATH . 'modules/product-management/class-product-management.php';
        require_once FBD_PATH . 'modules/inventory/class-inventory-manager.php';
        require_once FBD_PATH . 'modules/analytics/class-profit-analytics.php';
        require_once FBD_PATH . 'modules/marketing/class-marketing-automation.php';
    }

    private function init_hooks() {
        register_activation_hook( __FILE__, array( 'Fashion_Business_Dashboard_DB', 'create_tables' ) );
    }
}

Fashion_Business_Dashboard::get_instance();`}

                        {wpCodeFile === 'admin' && `<?php
/**
 * Admin Panel & Custom Menu registration for Fashion Business Dashboard.
 */

class Fashion_Business_Admin {
    public function __construct() {
        add_action( 'admin_menu', array( $this, 'register_admin_pages' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ) );
    }

    public function register_admin_pages() {
        add_menu_page(
            'Fashion Dashboard',
            'Fashion Dashboard',
            'manage_options',
            'fashion-business-dashboard',
            array( $this, 'render_dashboard_view' ),
            'dashicons-chart-area',
            25
        );
    }

    public function render_dashboard_view() {
        echo '<div class="wrap">';
        echo '<h1>ফ্যাশন বিজনেস ইন্টেলিজেন্স ড্যাশবোর্ড</h1>';
        echo '<p>WooCommerce রিয়েল-টাইম এআই অ্যানালিটিক্স, কাস্টমার সাইজ ইন্টেলিজেন্স এবং লয়্যালটি ক্লাব ইন্টিগ্রেশন প্যানেল।</p>';
        echo '</div>';
    }

    public function enqueue_admin_styles( $hook ) {
        if ( 'toplevel_page_fashion-business-dashboard' !== $hook ) {
            return;
        }
        wp_enqueue_style( 'fbd-admin-css', plugins_url( 'assets/admin.css', dirname(__FILE__) ) );
    }
}
new Fashion_Business_Admin();`}

                        {wpCodeFile === 'crm' && `<?php
/**
 * Customer CRM Module - Size Intelligence & History Tracker.
 */

class FBD_Customer_CRM {
    public function __construct() {
        // Add custom billing fields inside WooCommerce Admin checkout details
        add_action( 'woocommerce_admin_order_data_after_billing_address', array( $this, 'display_order_size_intelligence' ) );
        add_action( 'woocommerce_save_account_details', array( $this, 'save_user_custom_sizing_meta' ), 10, 1 );
    }

    public function save_user_custom_sizing_meta( $user_id ) {
        if ( isset( $_POST['fbd_shirt_size'] ) ) {
            update_user_meta( $user_id, '_fbd_shirt_size', sanitize_text_field( $_POST['fbd_shirt_size'] ) );
        }
        if ( isset( $_POST['fbd_pant_size'] ) ) {
            update_user_meta( $user_id, '_fbd_pant_size', sanitize_text_field( $_POST['fbd_pant_size'] ) );
        }
        if ( isset( $_POST['fbd_shoe_size'] ) ) {
            update_user_meta( $user_id, '_fbd_shoe_size', sanitize_text_field( $_POST['fbd_shoe_size'] ) );
        }
    }

    public function display_order_size_intelligence( $order ) {
        $customer_id = $order->get_customer_id();
        if ( ! $customer_id ) return;

        $shirt = get_user_meta( $customer_id, '_fbd_shirt_size', true );
        $pant = get_user_meta( $customer_id, '_fbd_pant_size', true );
        $shoe = get_user_meta( $customer_id, '_fbd_shoe_size', true );

        echo '<h3>কাস্টমার সাইজ ইন্টেলিজেন্স (Size Recommendation Data)</h3>';
        echo '<p><strong>শার্ট সাইজ:</strong> ' . esc_html( $shirt ?: 'Not Specified' ) . '</p>';
        echo '<p><strong>প্যান্ট সাইজ:</strong> ' . esc_html( $pant ?: 'Not Specified' ) . '</p>';
        echo '<p><strong>জুতো বা শু সাইজ:</strong> ' . esc_html( $shoe ?: 'Not Specified' ) . '</p>';
    }
}
new FBD_Customer_CRM();`}

                        {wpCodeFile === 'orders' && `<?php
/**
 * Order Sync & Hooks mapping.
 */

class FBD_Order_Sync {
    public function __construct() {
        add_action( 'woocommerce_payment_complete', array( $this, 'sync_on_payment_complete' ) );
    }

    public function sync_on_payment_complete( $order_id ) {
        $order = wc_get_order( $order_id );
        
        // Structure API packet for cloud platform synchronization
        $payload = array(
            'order_id'       => $order_id,
            'total_amount'   => $order->get_total(),
            'currency'       => $order->get_currency(),
            'items'          => array(),
            'customer_email' => $order->get_billing_email(),
        );

        foreach ( $order->get_items() as $item_id => $item ) {
            $payload['items'][] = array(
                'sku'      => $item->get_product()->get_sku(),
                'quantity' => $item->get_quantity(),
                'total'    => $item->get_total(),
            );
        }

        wp_remote_post( 'https://api.aura-lux.com/orders/sync-webhook', array(
            'method'    => 'POST',
            'body'      => json_encode( $payload ),
            'headers'   => array( 'Content-Type' => 'application/json' ),
            'blocking'  => false,
        ));
    }
}
new FBD_Order_Sync();`}

                        {wpCodeFile === 'products' && `<?php
/**
 * Product Management Module - Fashion attributes & Profit calculation fields.
 */

class FBD_Product_Management {
    public function __construct() {
        add_action( 'woocommerce_product_options_pricing', array( $this, 'add_cost_and_profit_fields' ) );
        add_action( 'woocommerce_process_product_meta', array( $this, 'save_custom_cost_fields' ) );
    }

    public function add_cost_and_profit_fields() {
        echo '<div class="options_group">';
        
        woocommerce_wp_text_input( array(
            'id'          => '_fbd_product_cost',
            'label'       => 'Product Cost (৳)',
            'description' => 'প্রোডাক্ট ক্রয়ের দাম বা ম্যানুফ্যাকচারিং কস্ট।',
            'desc_tip'    => 'true',
            'type'        => 'number',
        ));

        woocommerce_wp_text_input( array(
            'id'          => '_fbd_delivery_cost',
            'label'       => 'Delivery Cost (৳)',
            'description' => 'প্যাকেজিং এবং ডেলিভারি খরচ।',
            'desc_tip'    => 'true',
            'type'        => 'number',
        ));

        woocommerce_wp_text_input( array(
            'id'          => '_fbd_marketing_cost',
            'label'       => 'Marketing Cost (৳)',
            'description' => 'প্রতি প্রোডাক্টের মার্কেটিং বিজ্ঞাপন কস্ট।',
            'desc_tip'    => 'true',
            'type'        => 'number',
        ));

        echo '</div>';
    }

    public function save_custom_cost_fields( $post_id ) {
        if ( isset( $_POST['_fbd_product_cost'] ) ) {
            update_post_meta( $post_id, '_fbd_product_cost', sanitize_text_field( $_POST['_fbd_product_cost'] ) );
        }
        if ( isset( $_POST['_fbd_delivery_cost'] ) ) {
            update_post_meta( $post_id, '_fbd_delivery_cost', sanitize_text_field( $_POST['_fbd_delivery_cost'] ) );
        }
        if ( isset( $_POST['_fbd_marketing_cost'] ) ) {
            update_post_meta( $post_id, '_fbd_marketing_cost', sanitize_text_field( $_POST['_fbd_marketing_cost'] ) );
        }
    }
}
new FBD_Product_Management();`}

                        {wpCodeFile === 'inventory' && `<?php
/**
 * Inventory Module - Dynamic Size and Color Stocks tracking.
 */

class FBD_Inventory_Tracker {
    public function __construct() {
        add_action( 'woocommerce_variation_options_pricing', array( $this, 'add_fashion_attributes_fields' ), 10, 3 );
        add_action( 'woocommerce_save_product_variation', array( $this, 'save_fashion_attributes_fields' ), 10, 2 );
    }

    public function add_fashion_attributes_fields( $loop, $variation_data, $variation ) {
        woocommerce_wp_text_input( array(
            'id'          => '_fbd_season_attribute[' . $loop . ']',
            'label'       => 'Fashion Season',
            'value'       => get_post_meta( $variation->ID, '_fbd_season_attribute', true ),
            'placeholder' => 'Eid Collection, Winter, Summer',
        ));
    }

    public function save_fashion_attributes_fields( $variation_id, $i ) {
        if ( isset( $_POST['_fbd_season_attribute'][$i] ) ) {
            update_post_meta( $variation_id, '_fbd_season_attribute', sanitize_text_field( $_POST['_fbd_season_attribute'][$i] ) );
        }
    }
}
new FBD_Inventory_Tracker();`}

                        {wpCodeFile === 'analytics' && `<?php
/**
 * Net Profit (৳) Calculator and Profit Analytics.
 * Net Profit = Selling Price - Product Cost - Delivery Cost - Discount - Marketing Cost
 */

class FBD_Profit_Analytics {
    public static function calculate_net_profit( $selling_price, $cost, $delivery, $discount, $marketing ) {
        // Formula specified by user
        $net_profit = $selling_price - $cost - $delivery - $discount - $marketing;
        return $net_profit;
    }

    public function get_monthly_profit_summary() {
        global $wpdb;
        
        // Optimized raw SQL lookup to calculate profits dynamically from order meta
        $query = "
            SELECT 
                p.ID as order_id,
                MAX(CASE WHEN pm.meta_key = '_order_total' THEN pm.meta_value END) as selling_price,
                MAX(CASE WHEN pm.meta_key = '_fbd_total_product_cost' THEN pm.meta_value END) as product_cost,
                MAX(CASE WHEN pm.meta_key = '_fbd_total_delivery_cost' THEN pm.meta_value END) as delivery_cost,
                MAX(CASE WHEN pm.meta_key = '_fbd_total_marketing_cost' THEN pm.meta_value END) as marketing_cost,
                MAX(CASE WHEN pm.meta_key = '_cart_discount' THEN pm.meta_value END) as discount
            FROM {$wpdb->prefix}posts p
            JOIN {$wpdb->prefix}postmeta pm ON p.ID = pm.post_id
            WHERE p.post_type = 'shop_order' 
              AND p.post_status = 'wc-completed'
            GROUP BY p.ID
        ";
        
        $orders_data = $wpdb->get_results( $query, ARRAY_A );
        $total_net_profit = 0;

        foreach ( $orders_data as $order ) {
            $net = self::calculate_net_profit(
                (float)$order['selling_price'],
                (float)$order['product_cost'],
                (float)$order['delivery_cost'],
                (float)$order['discount'],
                (float)$order['marketing_cost']
            );
            $total_net_profit += $net;
        }

        return $total_net_profit;
    }
}
new FBD_Profit_Analytics();`}

                        {wpCodeFile === 'marketing' && `<?php
/**
 * Marketing Automation & Customer Loyalty Club.
 */

class FBD_Marketing_Automation {
    public function __construct() {
        add_action( 'woocommerce_created_customer', array( $this, 'trigger_welcome_message_campaign' ) );
        add_action( 'woocommerce_order_status_completed', array( $this, 'allocate_customer_loyalty_points' ), 10, 1 );
    }

    public function trigger_welcome_message_campaign( $customer_id ) {
        $customer = get_userdata( $customer_id );
        $email = $customer->user_email;

        // Dispatch Welcome Message Template with a 10% Welcome Coupon!
        $subject = "Welcome to Aura Lux Loyalty Club!";
        $message = "হ্যালো! আমাদের প্রিমিয়াম মেম্বারশিপ ক্লাবে আপনাকে স্বাগতম। আপনার জন্য উপহার কোড: WELCOME10";
        wp_mail( $email, $subject, $message );
    }

    public function allocate_customer_loyalty_points( $order_id ) {
        $order = wc_get_order( $order_id );
        $customer_id = $order->get_customer_id();
        if ( ! $customer_id ) return;

        $order_total = $order->get_total();
        // 5% Points Award rules
        $points_earned = floor( $order_total * 0.05 );

        $current_points = (int)get_user_meta( $customer_id, '_fbd_loyalty_points', true );
        update_user_meta( $customer_id, '_fbd_loyalty_points', $current_points + $points_earned );
    }
}
new FBD_Marketing_Automation();`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* MAIN SUB-TAB 3: DATABASE SCHEMA BLUEPRINT */}
              {wpActiveSubTab === 'database' && (
                <div className={`p-6 rounded-[2rem] border space-y-6
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc]'}`}
                >
                  <div className="flex items-center space-x-2 pb-4 border-b border-inherit">
                    <Database className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-bold">WooCommerce Relational Table Indexes (MySQL optimized for high scale)</h3>
                  </div>
                  
                  <p className="text-xs opacity-75">
                    স্টোরের ডাটাবেজ স্কেলিং অপ্টিমাইজড রাখতে এবং সার্চ কোয়েরি স্পিড বৃদ্ধি করতে WooCommerce কাস্টম ডাটাবেজ টেবিল রিলেショナル ডিজাইন এবং মেটা-ফিল্ড ইনডেক্সিং গাইডলাইন:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-[10px]">
                    {/* WP posts mapping */}
                    <div className="p-4 rounded-xl bg-black/10 border border-[#322822]/30 space-y-2">
                      <span className="font-extrabold text-[#e07a5f] block border-b border-inherit pb-1">🛍️ wp_posts Table</span>
                      <p className="opacity-80 font-bold">ID (bigint) [PK]</p>
                      <p className="opacity-60">post_title (text)</p>
                      <p className="opacity-60">post_status (varchar)</p>
                      <p className="opacity-60">post_type (varchar) [INDEXED]</p>
                      <p className="text-[9px] text-amber-500/80 italic pt-1 border-t border-inherit/25 leading-normal">
                        * প্রোডাক্ট এবং অর্ডারের ডেটা স্টোর করে।
                      </p>
                    </div>

                    {/* WP postmeta mapping */}
                    <div className="p-4 rounded-xl bg-black/10 border border-[#322822]/30 space-y-2">
                      <span className="font-extrabold text-[#f2cc8f] block border-b border-inherit pb-1">🔑 wp_postmeta Table</span>
                      <p className="opacity-80 font-bold">meta_id (bigint) [PK]</p>
                      <p className="opacity-60">post_id (bigint) [FK]</p>
                      <p className="opacity-60">meta_key [CUSTOM INDEXED]</p>
                      <p className="opacity-60">meta_value (longtext)</p>
                      <p className="text-[9px] text-amber-500/80 italic pt-1 border-t border-inherit/25 leading-normal">
                        * ফ্যাশন মেটা কস্ট, সাইজ, কালার ডেটা ধারণকারী টেবিল।
                      </p>
                    </div>

                    {/* WC custom fields */}
                    <div className="p-4 rounded-xl bg-black/10 border border-[#322822]/30 space-y-2">
                      <span className="font-extrabold text-emerald-400 block border-b border-inherit pb-1">📦 wp_wc_product_lookup</span>
                      <p className="opacity-80 font-bold">product_id [PK]</p>
                      <p className="opacity-60">sku (varchar) [INDEXED]</p>
                      <p className="opacity-60">min_price (decimal)</p>
                      <p className="opacity-60">stock_status [INDEXED]</p>
                      <p className="text-[9px] text-amber-500/80 italic pt-1 border-t border-inherit/25 leading-normal">
                        * স্টক ও প্রাইসের জন্য WooCommerce ফাস্ট মেটা লুকআপ।
                      </p>
                    </div>

                    {/* USERS mapping */}
                    <div className="p-4 rounded-xl bg-black/10 border border-[#322822]/30 space-y-2">
                      <span className="font-extrabold text-indigo-400 block border-b border-inherit pb-1">👥 wp_users Table</span>
                      <p className="opacity-80 font-bold">ID (bigint) [PK]</p>
                      <p className="opacity-60">user_login (varchar)</p>
                      <p className="opacity-60">user_email (varchar) [INDEX]</p>
                      <p className="opacity-60">display_name (varchar)</p>
                      <p className="text-[9px] text-amber-500/80 italic pt-1 border-t border-inherit/25 leading-normal">
                        * কাস্টমার অ্যাকাউন্ট এবং ক্রেডেনশিয়াল টেবিল।
                      </p>
                    </div>

                    {/* WC order stats */}
                    <div className="p-4 rounded-xl bg-black/10 border border-[#322822]/30 space-y-2">
                      <span className="font-extrabold text-rose-400 block border-b border-inherit pb-1">📊 wp_wc_order_stats</span>
                      <p className="opacity-80 font-bold">order_id [PK]</p>
                      <p className="opacity-60">date_created (datetime)</p>
                      <p className="opacity-60">num_items_sold (int)</p>
                      <p className="opacity-60">net_total [INDEXED]</p>
                      <p className="text-[9px] text-amber-500/80 italic pt-1 border-t border-inherit/25 leading-normal">
                        * লাভ এবং সেলস অ্যানালিটিক্স গ্রিড লোডিং টেবিল।
                      </p>
                    </div>
                  </div>

                  {/* Indexes optimization rules sheet */}
                  <div className="p-4 bg-[#e07a5f]/5 border border-[#e07a5f]/15 rounded-xl space-y-2">
                    <h4 className="font-extrabold text-xs text-[#e07a5f] flex items-center space-x-1.5">
                      <span>🚀 database-blueprint-optimizer: MySQL High-Scale indexing query</span>
                    </h4>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      কাস্টমার রিওয়ার্ড পয়েন্টস, শার্ট/প্যান্ট/শু সাইজের মতো মেটা ডাটা এবং প্রোডাক্টের খরচ ও লাভ অতি দ্রুত বের করার জন্য MySQL ডাটাবেজে নিম্নোক্ত কাস্টম মাল্টি-কলাম ইনডেক্স ব্যবহার করতে হবে:
                    </p>
                    <pre className="p-3 bg-black/40 text-[#f2e7dd] rounded-lg font-mono text-[10px] overflow-x-auto">
{`-- Optimize meta lookups for Custom Sizes, LTV and Net Profit Fields
ALTER TABLE wp_postmeta ADD INDEX fbd_postmeta_speed_idx (meta_key(12), meta_value(30));
ALTER TABLE wp_usermeta ADD INDEX fbd_user_sizing_idx (user_id, meta_key(15));
ALTER TABLE wp_wc_order_stats ADD INDEX fbd_sales_date_net_idx (date_created, net_total);`}
                    </pre>
                  </div>
                </div>
              )}

              {/* SaaS Architecture Section Header */}
              <div className="pt-6 border-t border-[#322822]/10">
                <h2 className="text-xl font-bold mb-1 text-amber-500">সিস্টেম আর্কিটেকচার ও টেক স্ট্যাক (SaaS Architecture & Tech Stack)</h2>
                <p className="text-xs opacity-60">ড্যাশবোর্ডের এন্ড-টু-এন্ড মডার্ন টেকনোলজি ফ্রেমওয়ার্ক এবং ডাটাবেজ ইন্টিগ্রেশন লেয়ার।</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1: Frontend & UI */}
                <div className={`p-6 rounded-3xl border
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 w-fit mb-4">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-sm">১. ফ্রন্টএন্ড ডিজাইন ও রিঅ্যাক্টিভ স্টেট (Frontend & UI)</h3>
                  <p className="text-xs opacity-80 mt-2 leading-relaxed">
                    <strong>React 19 + Tailwind CSS + Motion:</strong> আধুনিক কাস্টম শপফাই-স্টাইলড ইন্টারফেস যা অত্যন্ত হালকা এবং রেসপনসিভ। চোখের সুরক্ষার জন্য বিশেষ ব্লু-লাইট ফিল্টার টেকনোলজি ব্যবহার করা হয়েছে।
                  </p>
                  <ul className="text-[11px] opacity-60 mt-3 list-disc pl-4 space-y-1">
                    <li>টাইপ সেফ কোডিং প্যাটার্ন</li>
                    <li>সহজ ইন্টারেক্টিভ রিঅ্যাক্টিভ স্টেট</li>
                    <li>Tailwind CSS স্পিড অপ্টিমাইজেশন</li>
                  </ul>
                </div>

                {/* Card 2: Backend & Auth */}
                <div className={`p-6 rounded-3xl border
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 w-fit mb-4">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-sm">২. ব্যাকএন্ড ও এপিআই (Backend & APIs)</h3>
                  <p className="text-xs opacity-80 mt-2 leading-relaxed">
                    <strong>Node.js Express / NestJS Server:</strong> ড্যাশবোর্ডের মূল ডাটা ইন্টিগ্রেশন এবং এআই এপিআই হ্যান্ডলার হিসেবে একটি শক্তিশালী Express backend চলমান আছে। প্রোডাকশন লেভেলে NestJS ব্যবহার করা হবে যাতে রিয়েল-টাইম ওয়েব-সকেট কানেক্টিভিটি বজায় থাকে।
                  </p>
                  <ul className="text-[11px] opacity-60 mt-3 list-disc pl-4 space-y-1">
                    <li>RESTful / GraphQL APIs</li>
                    <li>OAuth Security Integration</li>
                    <li>JWT & Firebase Auth</li>
                  </ul>
                </div>

                {/* Card 3: Storage & Database */}
                <div className={`p-6 rounded-3xl border
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 w-fit mb-4">
                    <Database className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-sm">৩. ডেটাবেস ও স্টোরেজ (Database Strategy)</h3>
                  <p className="text-xs opacity-80 mt-2 leading-relaxed">
                    <strong>Cloud Firestore / PostgreSQL:</strong> আমাদের প্রথম চয়েস হচ্ছে Firebase (Firestore), কারণ এটি দিয়ে রিয়েল-টাইম ডাটা সিঙ্ক ও অটো-স্কেলিং করা সম্ভব। রিলেশনাল ডাটা বিশ্লেষণের জন্য Google Cloud SQL (PostgreSQL) ব্যবহার করা অত্যন্ত কার্যকরী।
                  </p>
                  <ul className="text-[11px] opacity-60 mt-3 list-disc pl-4 space-y-1">
                    <li>Durable cloud persistence</li>
                    <li>রিলেশনাল কাস্টমার ডাটা সিকিউরিটি</li>
                    <li>অফলাইন সাপোর্ট উইথ লিনিয়ার স্কেল</li>
                  </ul>
                </div>

              </div>

              {/* Database relational structure diagram view */}
              <div className={`p-6 rounded-[2rem] border
                ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-5 w-5 text-[#e07a5f]" />
                  <h3 className="text-lg font-bold">ডাটাবেজ রিলেショナル ডায়াগ্রাম আইডিয়া (Database Design Entity Schema)</h3>
                </div>
                <p className="text-xs opacity-75 mb-6">Aura Lux স্টোরের কাস্টমার, অর্ডার এবং ইনভেন্টরি ট্র্যাকিং ডাটা স্ট্রাকচার রিলেশন:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[11px]">
                  {/* Entity 1 */}
                  <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
                    <span className="font-bold text-amber-400 block border-b border-white/5 pb-1">👤 Customers CRM Table</span>
                    <p className="opacity-80">🔑 customer_id [PK]</p>
                    <p className="opacity-60">🔹 name (varchar)</p>
                    <p className="opacity-60">🔹 email (varchar) [Unique]</p>
                    <p className="opacity-60">🔹 segment (enum: VIP, regular, etc.)</p>
                    <p className="opacity-60">🔹 total_spending (decimal)</p>
                  </div>

                  {/* Entity 2 */}
                  <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
                    <span className="font-bold text-rose-400 block border-b border-white/5 pb-1">🛍️ Orders Table</span>
                    <p className="opacity-80">🔑 order_id [PK]</p>
                    <p className="opacity-60">🔗 customer_id [FK] ── (1:N)</p>
                    <p className="opacity-60">🔹 total_amount (decimal)</p>
                    <p className="opacity-60">🔹 status (enum: pending, shipped, etc.)</p>
                    <p className="opacity-60">🔹 payment_method (varchar)</p>
                  </div>

                  {/* Entity 3 */}
                  <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
                    <span className="font-bold text-emerald-400 block border-b border-white/5 pb-1">📦 Products Catalogue</span>
                    <p className="opacity-80">🔑 product_id [PK]</p>
                    <p className="opacity-60">🔹 name (varchar)</p>
                    <p className="opacity-60">🔹 category (varchar)</p>
                    <p className="opacity-60">🔹 price (decimal)</p>
                    <p className="opacity-60">🔹 stock (int)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              COLLECTIONS TAB
              ========================================================== */}
          {activeTab === 'collections' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-inherit">
                <div>
                  <span className="text-[10px] font-bold text-[#e07a5f] uppercase tracking-wider">কালেকশন হাব ও এনালিটিক্স</span>
                  <h1 className="text-2xl font-extrabold tracking-tight mt-0.5">কালেকশন ড্যাশবোর্ড (Collection Manager)</h1>
                  <p className="text-xs opacity-60">ঈদ, শীত ও গ্রীষ্মকালীন ফ্যাশন কালেকশনের সেলস, প্রফিট ও ক্যাটালগ সাইজ ট্র্যাকিং পোর্টাল।</p>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-3xl border flex items-center justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-55">সর্বমোট কালেকশন সেলস (Total Sales)</span>
                    <h3 className="text-2xl font-black mt-1 text-[#e07a5f]">{formatCurrency(collectionsData.reduce((acc, c) => acc + c.sales, 0))}</h3>
                    <p className="text-[9px] text-emerald-500 font-bold mt-1 flex items-center">↗ 14.5% Growth this season</p>
                  </div>
                  <div className="p-3.5 bg-[#e07a5f]/10 rounded-2xl text-[#e07a5f]">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border flex items-center justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-55">কালেকশন নিট প্রফিট (Net Profit ৳)</span>
                    <h3 className="text-2xl font-black mt-1 text-emerald-500">{formatCurrency(collectionsData.reduce((acc, c) => acc + c.profit, 0))}</h3>
                    <p className="text-[9px] opacity-60 mt-1">Average Profit Margin: 34.8%</p>
                  </div>
                  <div className="p-3.5 bg-emerald-500/10 rounded-2xl text-emerald-500">
                    <Coins className="h-6 w-6" />
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border flex items-center justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-55">সেরা পারফর্মিং ক্যাটাগরি (Best Seller)</span>
                    <h3 className="text-xl font-extrabold mt-1">Premium Wear</h3>
                    <p className="text-[9px] opacity-60 mt-1">৳ 2.45M Sales • Active</p>
                  </div>
                  <div className="p-3.5 bg-amber-500/10 rounded-2xl text-amber-500">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Form & List split container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Add collection form */}
                <div className="lg:col-span-4">
                  <div className={`p-6 rounded-[2.5rem] border space-y-4
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                      <Plus className="h-4 w-4 text-[#e07a5f]" />
                      <span>নতুন কালেকশন যোগ করুন (Add)</span>
                    </h3>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const name = (target.elements.namedItem('col_name') as HTMLInputElement).value;
                        const season = (target.elements.namedItem('col_season') as HTMLSelectElement).value;
                        const status = (target.elements.namedItem('col_status') as HTMLSelectElement).value;
                        const sales = Number((target.elements.namedItem('col_sales') as HTMLInputElement).value) || 0;
                        const profit = Math.floor(sales * 0.35);

                        const newCol = {
                          id: `col-${Date.now()}`,
                          name,
                          season,
                          status,
                          sales,
                          profit,
                          itemsCount: 0
                        };

                        setCollectionsData(prev => [newCol, ...prev]);
                        target.reset();

                        const newNotif = {
                          id: `notif-${Date.now()}`,
                          title: `নতুন কালেকশন যুক্ত করা হয়েছে`,
                          message: `"${name}" কালেকশনটি সফলভাবে সিস্টেমে এবং ওউ-কমার্সে রেজিস্টার করা হয়েছে।`,
                          timestamp: new Date().toISOString(),
                          read: false
                        };
                        setNotifications(prev => [newNotif, ...prev]);
                      }}
                      className="space-y-3.5"
                    >
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">কালেকশনের নাম (Name)</label>
                        <input 
                          name="col_name"
                          type="text"
                          required
                          placeholder="যেমন: Summer Collection 2026"
                          className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">সিজন ট্যাগ (Season)</label>
                        <select 
                          name="col_season"
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit
                            ${settings.themeMode === 'dark' ? 'bg-[#1a1614]' : 'bg-white'}`}
                        >
                          <option value="Eid">Eid</option>
                          <option value="Winter">Winter</option>
                          <option value="Summer">Summer</option>
                          <option value="Spring">Spring</option>
                          <option value="All Season">All Season</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">স্ট্যাটাস (Status)</label>
                        <select 
                          name="col_status"
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit
                            ${settings.themeMode === 'dark' ? 'bg-[#1a1614]' : 'bg-white'}`}
                        >
                          <option value="Active">Active</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">প্রারম্ভিক বিক্রয় (Initial Sales ৳)</label>
                        <input 
                          name="col_sales"
                          type="number"
                          placeholder="৳ 25000"
                          className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/10 transition-all"
                      >
                        কালেকশন সেভ করুন
                      </button>
                    </form>
                  </div>
                </div>

                {/* List table */}
                <div className="lg:col-span-8">
                  <div className={`p-6 rounded-[2.5rem] border overflow-hidden
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-extrabold">সক্রিয় কালেকশনসমূহ (Active Collections List)</h3>
                      <span className="text-[10px] font-mono opacity-50">মোট কালেকশন: {collectionsData.length}</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-inherit opacity-60 text-[10px] uppercase font-bold">
                            <th className="py-3 px-3">কালেকশন নাম (Collection)</th>
                            <th className="py-3 px-3">সিজন (Season)</th>
                            <th className="py-3 px-3">টোটাল সেলস (Sales)</th>
                            <th className="py-3 px-3">নিট প্রফিট (Net Profit)</th>
                            <th className="py-3 px-3">অবস্থা (Status)</th>
                            <th className="py-3 px-3 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-inherit/40 text-xs">
                          {collectionsData.map(c => (
                            <tr key={c.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3 font-bold">{c.name}</td>
                              <td className="py-3 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#e07a5f]/10 text-[#e07a5f]">
                                  {c.season}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-mono font-bold">{formatCurrency(c.sales)}</td>
                              <td className="py-3 px-3 font-mono font-bold text-emerald-500">{formatCurrency(c.profit)}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold
                                  ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}
                                >
                                  {c.status}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right space-x-1">
                                <button 
                                  onClick={() => {
                                    setCollectionsData(prev => prev.map(item => item.id === c.id ? { ...item, status: item.status === 'Active' ? 'Draft' : 'Active' } : item));
                                  }}
                                  className="p-1 hover:bg-[#e07a5f]/10 text-amber-500 rounded-lg text-[10px] font-bold"
                                  title="Toggle Status"
                                >
                                  স্ট্যাটাস পাল্টান
                                </button>
                                <button 
                                  onClick={() => {
                                    setCollectionsData(prev => prev.filter(item => item.id !== c.id));
                                  }}
                                  className="p-1.5 hover:bg-rose-500/15 text-rose-500 rounded-lg"
                                  title="Delete Collection"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              RETURNS & REFUND MANAGEMENT
              ========================================================== */}
          {activeTab === 'returns' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Header */}
              <div className="pb-4 border-b border-inherit">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">WooCommerce Return Center</span>
                <h1 className="text-2xl font-extrabold tracking-tight mt-0.5">রিটার্ন ও রিফান্ড ডেস্ক (Returns & Refund Desk)</h1>
                <p className="text-xs opacity-60">সাইজ অমিল বা অন্যান্য ড্যামেজ ইস্যুর জন্য কাস্টমারদের রিটার্ন রিকোয়েস্ট ও রিফান্ড ভেরিফিকেশন হাব।</p>
              </div>

              {/* KPI indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-3xl border flex items-center justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-55">অপেক্ষমাণ রিকোয়েস্ট (Pending Approval)</span>
                    <h3 className="text-2xl font-black mt-1 text-amber-500">
                      {returnsData.filter(r => r.status === 'Pending Approval').length} Orders
                    </h3>
                    <p className="text-[9px] opacity-60 mt-1">SLA response time: 2.4 Hours</p>
                  </div>
                  <div className="p-3.5 bg-amber-500/10 rounded-2xl text-amber-500">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border flex items-center justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-55">সর্বমোট রিফান্ড ভ্যালু (Total Refunded Value)</span>
                    <h3 className="text-2xl font-black mt-1 text-rose-500">
                      {formatCurrency(returnsData.filter(r => r.status === 'Refunded').reduce((acc, r) => acc + r.refundAmount, 0))}
                    </h3>
                    <p className="text-[9px] opacity-60 mt-1">Successfully debited back to customers</p>
                  </div>
                  <div className="p-3.5 bg-rose-500/10 rounded-2xl text-rose-500">
                    <Undo2 className="h-6 w-6" />
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border flex items-center justify-between
                  ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold opacity-55">রিটার্ন রেট (SaaS Return Rate)</span>
                    <h3 className="text-2xl font-black mt-1 text-indigo-500">1.84%</h3>
                    <p className="text-[9px] text-emerald-500 font-bold mt-1">↘ Industry average is 8.5% (AURA is super low!)</p>
                  </div>
                  <div className="p-3.5 bg-indigo-500/10 rounded-2xl text-indigo-500">
                    <Activity className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Table of returns */}
              <div className={`p-6 rounded-[2.5rem] border overflow-hidden
                ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-extrabold">রিটার্ন ট্রানজ্যাকশন লিস্ট (Active Returns Register)</h3>
                  <span className="text-[10px] font-mono opacity-50">মোট রিটার্ন হিস্ট্রি: {returnsData.length} টি</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-inherit opacity-60 text-[10px] uppercase font-bold">
                        <th className="py-3 px-3">রিটার্ন আইডি</th>
                        <th className="py-3 px-3">ক্রেতা ও কন্টাক্ট</th>
                        <th className="py-3 px-3">প্রোডাক্ট ও কারণ</th>
                        <th className="py-3 px-3">রিফান্ড এমাউন্ট</th>
                        <th className="py-3 px-3">তারিখ</th>
                        <th className="py-3 px-3">স্ট্যাটাস</th>
                        <th className="py-3 px-3 text-right">অ্যাকশন বাটন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-inherit/40 text-xs">
                      {returnsData.map(r => (
                        <tr key={r.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-rose-500">{r.id}</td>
                          <td className="py-3 px-3">
                            <p className="font-bold">{r.customerName}</p>
                            <p className="text-[10px] opacity-60">{r.phone}</p>
                          </td>
                          <td className="py-3 px-3">
                            <p className="font-bold">{r.productName}</p>
                            <p className="text-[10px] opacity-60 italic">" {r.reason} "</p>
                          </td>
                          <td className="py-3 px-3 font-mono font-bold">{formatCurrency(r.refundAmount)}</td>
                          <td className="py-3 px-3">{r.date}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold
                              ${r.status === 'Pending Approval' ? 'bg-amber-500/10 text-amber-500' : ''}
                              ${r.status === 'Refunded' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                              ${r.status === 'Rejected' ? 'bg-rose-500/10 text-rose-500' : ''}`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-1.5">
                            {r.status === 'Pending Approval' ? (
                              <>
                                <button
                                  onClick={() => {
                                    setReturnsData(prev => prev.map(item => item.id === r.id ? { ...item, status: 'Refunded' } : item));
                                    const notif = {
                                      id: `notif-${Date.now()}`,
                                      title: `রিফান্ড অ্যাপ্রুভড`,
                                      message: `${r.customerName} এর জন্য ${formatCurrency(r.refundAmount)} রিফান্ড প্রসেস সম্পন্ন হয়েছে।`,
                                      timestamp: new Date().toISOString(),
                                      read: false
                                    };
                                    setNotifications(prev => [notif, ...prev]);
                                  }}
                                  className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-lg transition-colors"
                                >
                                  অনুমোদন
                                </button>
                                <button
                                  onClick={() => {
                                    setReturnsData(prev => prev.map(item => item.id === r.id ? { ...item, status: 'Rejected' } : item));
                                    const notif = {
                                      id: `notif-${Date.now()}`,
                                      title: `রিটার্ন বাতিল করা হয়েছে`,
                                      message: `${r.customerName} এর রিটার্ন রিকোয়েস্ট রিজেক্ট করা হয়েছে।`,
                                      timestamp: new Date().toISOString(),
                                      read: false
                                    };
                                    setNotifications(prev => [notif, ...prev]);
                                  }}
                                  className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[10px] font-bold rounded-lg transition-colors"
                                >
                                  বাতিল
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] opacity-40 italic">মীমাংসিত</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              SYSTEM SETTINGS WITH EYE PROTECTION & LIVE UPDATES
              ========================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Header */}
              {activeSettingsTab === 'grid' && (
                <div className="pb-4 border-b border-inherit">
                  <span className="text-[10px] font-bold text-[#e07a5f] uppercase tracking-wider">Aura Lux Preferences</span>
                  <h1 className="text-2xl font-extrabold tracking-tight mt-0.5">গ্লোবাল সেটিংস (System Settings)</h1>
                  <p className="text-xs opacity-60">স্টোর ব্র্যান্ডিং, ওউ-কমার্স কানেকশন প্যারামিটার এবং রিঅ্যাক্টিভ ব্লু-লাইট আই প্রটেকশন টিউন করার কন্ট্রোল প্যানেল।</p>
                </div>
              )}

              {/* Back to Settings Button Header when a form is active */}
              {activeSettingsTab !== 'grid' && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-inherit gap-3 mt-1 mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveSettingsTab('grid')}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-[11px] font-extrabold tracking-tight transition-all duration-300 border cursor-pointer hover:scale-[1.01] shadow-sm
                      ${settings.themeMode === 'dark'
                        ? 'bg-[#1a1614]/80 border-[#322822]/60 text-neutral-300 hover:text-white hover:border-[#e07a5f]/40'
                        : 'bg-white border-[#e8e4dc] text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 hover:border-[#e07a5f]/40'
                      }`}
                  >
                    <span className="text-[#e07a5f] font-extrabold">←</span>
                    <span>সেটিংস তালিকায় ফিরে যান (Back to Settings)</span>
                  </button>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-[#e07a5f] uppercase tracking-wider">Aura Lux Preferences</span>
                    <p className="text-xs font-extrabold opacity-60">
                      {activeSettingsTab === 'three-banner' && '⚡ ৩-ব্যানার ম্যাজিক কাস্টমাইজার (3-Banner Customizer)'}
                      {activeSettingsTab === 'courier' && '📦 কুরিয়ার এপিআই সেটিংস (Courier API Settings)'}
                      {activeSettingsTab === 'brand' && '🏷️ ব্র্যান্ড পরিচিতি সেটিংস (Brand Slogan Settings)'}
                      {activeSettingsTab === 'fb_page' && '🔵 ফেসবুক পেজ এড করুন (Facebook Page Setup)'}
                      {activeSettingsTab === 'ig_profile' && '📸 ইনস্টাগ্রাম অ্যাকাউন্ট এড করুন (Instagram Setup)'}
                      {activeSettingsTab === 'wa_number' && '🟢 হোয়াটসঅ্যাপ নম্বর এড করুন (WhatsApp Setup)'}
                      {activeSettingsTab === 'eye' && '🛡️ আই প্রোটেকশন ফিল্টার (Eye Protection Filter)'}
                      {activeSettingsTab === 'woocommerce' && '🔄 উ-কমার্স REST API (WooCommerce)'}
                      {activeSettingsTab === 'inventory' && '📋 ইনভেন্টরি অ্যালার্ট লেভেল (Stock Thresholds)'}
                      {activeSettingsTab === 'gtm' && '📊 GTM4 Data Layer (Google Tag Manager)'}
                      {activeSettingsTab === 'meta_tracking' && '🔵 FB & Instagram Server-Side Tracking'}
                      {activeSettingsTab === 'tiktok_tracking' && '🖤 TikTok Server-Side Tracking'}
                      {activeSettingsTab === 'ga4' && '📈 Google Analytics (GA4) Tracking'}
                      {activeSettingsTab === 'database' && '🔒 সুপাবেজ ডাটাবেজ ও মাল্টি-স্টোর আইসোলেশন (Store Isolation)'}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid Interface */}
              {activeSettingsTab === 'grid' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full py-2 animate-fade-in">
                  {[
                    { id: 'three-banner', label: '⚡ ৩-ব্যানার কাস্টমাইজার', sub: '3-Banner Customizer', icon: Sparkles, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', hoverColor: 'hover:border-emerald-500/50 hover:shadow-emerald-500/5' },
                    { id: 'database', label: '🔒 ডাটাবেজ ও স্টোর আইসোলেশন', sub: 'Supabase & Store Isolation', icon: Database, color: 'text-violet-500', bgColor: 'bg-violet-500/10', hoverColor: 'hover:border-violet-500/50 hover:shadow-violet-500/5' },
                    { id: 'courier', label: '📦 কুরিয়ার এপিআই সেটিংস', sub: 'Courier API Settings', icon: Truck, color: 'text-rose-500', bgColor: 'bg-rose-500/10', hoverColor: 'hover:border-rose-500/50 hover:shadow-rose-500/5' },
                    { id: 'brand', label: '🏷️ ব্র্যান্ড পরিচিতি সেটিংস', sub: 'Brand Slogan Settings', icon: Tag, color: 'text-amber-500', bgColor: 'bg-amber-500/10', hoverColor: 'hover:border-amber-500/50 hover:shadow-amber-500/5' },
                    { id: 'fb_page', label: '🔵 ফেসবুক পেজ এড করুন', sub: 'Facebook Page URL', icon: Facebook, color: 'text-[#3b5998]', bgColor: 'bg-[#3b5998]/10', hoverColor: 'hover:border-[#3b5998]/50 hover:shadow-[#3b5998]/5' },
                    { id: 'ig_profile', label: '📸 ইনস্টাগ্রাম এড করুন', sub: 'Instagram Profile URL', icon: Instagram, color: 'text-[#e1306c]', bgColor: 'bg-[#e1306c]/10', hoverColor: 'hover:border-[#e1306c]/50 hover:shadow-[#e1306c]/5' },
                    { id: 'wa_number', label: '🟢 হোয়াটসঅ্যাপ নম্বর এড করুন', sub: 'WhatsApp Setup', icon: Phone, color: 'text-[#25d366]', bgColor: 'bg-[#25d366]/10', hoverColor: 'hover:border-[#25d366]/50 hover:shadow-[#25d366]/5' },
                    { id: 'eye', label: '🛡️ আই প্রোটেকশন ফিল্টার', sub: 'Eye Protection Filter', icon: ShieldAlert, color: 'text-orange-500', bgColor: 'bg-orange-500/10', hoverColor: 'hover:border-orange-500/50 hover:shadow-orange-500/5' },
                    { id: 'woocommerce', label: '🔄 উ-কমার্স REST API', sub: 'WooCommerce Keys', icon: RefreshCcw, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10', hoverColor: 'hover:border-indigo-500/50 hover:shadow-indigo-500/5' },
                    { id: 'inventory', label: '📋 ইনভেন্টরি অ্যালার্ট লেভেল', sub: 'Stock Thresholds', icon: Warehouse, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', hoverColor: 'hover:border-emerald-500/50 hover:shadow-emerald-500/5' },
                    { id: 'gtm', label: '📊 GTM4 Data Layer', sub: 'GTM Container ID', icon: Layers, color: 'text-blue-500', bgColor: 'bg-blue-500/10', hoverColor: 'hover:border-blue-500/50 hover:shadow-blue-500/5' },
                    { id: 'meta_tracking', label: '🔵 FB & Instagram Server-Side', sub: 'Meta Pixel & Server API', icon: Activity, color: 'text-sky-600', bgColor: 'bg-sky-600/10', hoverColor: 'hover:border-sky-600/50 hover:shadow-sky-600/5' },
                    { id: 'tiktok_tracking', label: '🖤 TikTok Server-Side', sub: 'TikTok Pixel & Event API', icon: Code, color: 'text-zinc-500', bgColor: 'bg-zinc-500/10', hoverColor: 'hover:border-zinc-500/50 hover:shadow-zinc-500/5' },
                    { id: 'ga4', label: '📈 Google Analytics (GA4)', sub: 'Google Tag ID (G-XXXXXX)', icon: PieChart, color: 'text-amber-500', bgColor: 'bg-amber-500/10', hoverColor: 'hover:border-amber-500/50 hover:shadow-amber-500/5' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSettingsTab(item.id);
                          if (item.id === 'three-banner') {
                            let initialBanners = [...banners];
                            while (initialBanners.length < 3) {
                              initialBanners.push({
                                id: `banner_${Date.now()}_${initialBanners.length}`,
                                desktopImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200',
                                mobileImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=600',
                                title: `কাস্টম ব্যানার ${initialBanners.length + 1}`,
                                subtitle: 'এলিগেন্ট ফ্যাশন স্টাইল কালেকশন',
                                description: 'আমাদের স্টোরের কাস্টম এবং এক্সক্লুসিভ কালেকশন উপভোগ করুন সরাসরি অর্ডার করে।',
                                button1Text: 'অর্ডার নাও (Order Now)',
                                button1Link: '#products',
                                button2Text: 'বিস্তারিত (Details)',
                                button2Link: '#products',
                                overlayColor: 'rgba(0,0,0,0.4)',
                                textPosition: 'left',
                                isActive: true,
                                order: initialBanners.length + 1
                              });
                            }
                            setBanners(initialBanners.slice(0, 3));
                          }
                        }}
                        className={`group relative flex flex-col items-center justify-center text-center p-6 rounded-[2.5rem] border transition-all duration-300 cursor-pointer aspect-square hover:-translate-y-1 hover:shadow-lg
                          ${settings.themeMode === 'dark'
                            ? 'bg-[#1a1614]/80 border-[#322822]/60 hover:bg-[#221c19] text-neutral-200'
                            : 'bg-white border-[#e8e4dc] hover:bg-neutral-50/50 text-neutral-800'
                          } ${item.hoverColor}`}
                      >
                        {/* Centered Large Icon */}
                        <div className={`p-4 rounded-3xl ${item.bgColor} ${item.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                          <Icon className="h-7 w-7" />
                        </div>

                        {/* Text */}
                        <h4 className="text-[11px] font-extrabold tracking-tight line-clamp-2 px-1 mb-1">
                          {item.label}
                        </h4>
                        <p className="text-[9px] font-bold opacity-45 font-mono tracking-wide uppercase">
                          {item.sub}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Full Width Settings Sub-tab view with elegant fade-in */}
              <div className="w-full pt-2">
                {activeSettingsTab === 'three-banner' && (
                  <div className="animate-fade-in duration-300">
                    {/* ⚡ Quick 3-Banner Custom Designer Block */}
                    <div className="space-y-6 text-left">
                      {/* Controller & Save Header */}
                      <div className="bg-[#1a1614] p-5 rounded-3xl border border-[#322822]/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono font-sans">Premium Customization Mode</span>
                          </div>
                          <h3 className="text-base font-black text-white">৩-ব্যানার ম্যাজিক কাস্টমাইজার (3-Banner Custom Designer)</h3>
                          <p className="opacity-70 text-xs text-neutral-300">একসাথে ৩টি হিরো ব্যানার, স্লাইড ডিউরেশন এবং অ্যাকশন বাটন সহজে কাস্টমাইজ করুন ও ক্লাউডে সেভ করুন।</p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Slide Duration Dropdown */}
                          <div className="flex items-center space-x-2 bg-black/30 px-3.5 py-2 rounded-xl border border-white/5">
                            <Clock className="h-4 w-4 text-teal-400" />
                            <span className="text-xs font-bold text-teal-300">⏱️ স্লাইড টাইম (Slide Time):</span>
                            <select 
                              value={bannerSlideInterval}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                updateBannerSlideInterval(val);
                              }}
                              className="bg-[#120e0c] text-white text-xs font-black border border-white/10 rounded-lg p-1.5 focus:outline-none focus:border-teal-400 cursor-pointer font-sans"
                            >
                              <option value={3}>3 Seconds</option>
                              <option value={4}>4 Seconds</option>
                              <option value={5}>5 Seconds</option>
                            </select>
                          </div>

                          {/* Save Button */}
                          <button
                            onClick={async () => {
                              setIsSavingBanner(true);
                              try {
                                // Save locally
                                localStorage.setItem('aura_premium_banners', JSON.stringify(banners));
                                localStorage.setItem('aura_banner_slide_interval', String(bannerSlideInterval));
                                setPublishedTheme('classic');
                                localStorage.setItem('aura_published_theme', 'classic');

                                // Sync to Supabase system_settings
                                const { error: intervalErr } = await supabase.from('system_settings').upsert({
                                  id: 'banner_slide_interval',
                                  tagline: JSON.stringify({ interval: Number(bannerSlideInterval) }),
                                  currency: 'BDT'
                                });
                                
                                const { error: bannersErr } = await supabase.from('system_settings').upsert({
                                  id: 'premium_banners',
                                  tagline: JSON.stringify(banners),
                                  currency: 'BDT'
                                });

                                if (intervalErr || bannersErr) {
                                  console.warn("Supabase sync issue:", intervalErr || bannersErr);
                                  setDesignerSuccessMessage("ব্যানারগুলো লোকাল ব্রাউজারে সেভ হয়েছে! (ক্লাউড ব্যাকআপে কিছুটা সমস্যা হয়েছে)");
                                } else {
                                  setDesignerSuccessMessage("অভিনন্দন! ৩টি ব্যানার এবং স্লাইড ডিউরেশন সফলভাবে ক্লাউড ও লোকাল স্টোরে সেভ ও লাইভ করা হয়েছে! 🚀");
                                }
                              } catch (err: any) {
                                console.error("Save failed:", err);
                                setDesignerSuccessMessage("সেভ করার সময় ত্রুটি: " + err.message);
                              } finally {
                                setIsSavingBanner(false);
                              }
                            }}
                            disabled={isSavingBanner}
                            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 border-none cursor-pointer"
                          >
                            <Upload className="h-4 w-4" />
                            <span>{isSavingBanner ? 'সেভ হচ্ছে...' : 'সংরক্ষণ ও লাইভ পাবলিশ করুন (Save)'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Designer Success Message Banner inside Settings view */}
                      {designerSuccessMessage && (
                        <div className="p-4 bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold animate-pulse">
                          {designerSuccessMessage}
                        </div>
                      )}

                      {/* 3 Banners Forms Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[0, 1, 2].map((idx) => {
                          const b = banners[idx] || {
                            id: `banner_${Date.now()}_${idx}`,
                            desktopImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200',
                            mobileImageUrl: 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=600',
                            title: `ব্যানার শিরোনাম ${idx + 1}`,
                            subtitle: 'এলিগেন্ট ফ্যাশন স্টাইল কালেকশন',
                            description: 'আমাদের স্টোরের কাস্টম এবং এক্সক্লুসিভ কালেকশন উপভোগ করুন সরাসরি অর্ডার করে।',
                            button1Text: 'অর্ডার নাও (Order Now)',
                            button1Link: '#products',
                            button2Text: 'বিস্তারিত (Details)',
                            button2Link: '#products',
                            overlayColor: 'rgba(0,0,0,0.4)',
                            textPosition: 'left',
                            isActive: true,
                            order: idx + 1
                          };

                          return (
                            <div key={idx} className="bg-[#1a1614] p-5 rounded-3xl border-2 border-[#322822]/50 hover:border-teal-500/30 transition-all space-y-4 shadow-md text-left text-white">
                              {/* Card Title Header */}
                              <div className="flex items-center justify-between border-b border-[#322822]/40 pb-3">
                                <h4 className="text-xs font-black uppercase tracking-wider text-teal-400 flex items-center space-x-2">
                                  <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                                  <span>ব্যানার #{idx + 1} (Slide {idx + 1})</span>
                                </h4>
                                <span className="text-[9px] bg-teal-500/10 text-teal-400 font-mono font-bold px-2 py-0.5 rounded-full border border-teal-500/20">
                                  {b.isActive ? 'Active' : 'Disabled'}
                                </span>
                              </div>

                              {/* Form Inputs */}
                              <div className="space-y-3.5 text-left">
                                {/* Title */}
                                <div>
                                  <label className="block text-[10px] opacity-70 mb-1 font-bold text-neutral-300">ব্যানার টাইটেল (Title):</label>
                                  <input
                                    type="text"
                                    value={b.title || ''}
                                    onChange={(e) => {
                                      const updated = [...banners];
                                      updated[idx] = { ...b, title: e.target.value };
                                      setBanners(updated);
                                    }}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500/50"
                                    placeholder="যেমন: প্রিমিয়াম সাব্লিমেশন জার্সি"
                                  />
                                </div>

                                {/* Subtitle */}
                                <div>
                                  <label className="block text-[10px] opacity-70 mb-1 font-bold text-neutral-300">ব্যানার সাবটাইটেল (Subtitle):</label>
                                  <input
                                    type="text"
                                    value={b.subtitle || ''}
                                    onChange={(e) => {
                                      const updated = [...banners];
                                      updated[idx] = { ...b, subtitle: e.target.value };
                                      setBanners(updated);
                                    }}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500/50"
                                    placeholder="যেমন: Bangladesh Official Kit 2026"
                                  />
                                </div>

                                {/* Description */}
                                <div>
                                  <label className="block text-[10px] opacity-70 mb-1 font-bold text-neutral-300">ব্যানার ডেসক্রিপশন (Description):</label>
                                  <textarea
                                    value={b.description || ''}
                                    onChange={(e) => {
                                      const updated = [...banners];
                                      updated[idx] = { ...b, description: e.target.value };
                                      setBanners(updated);
                                    }}
                                    rows={2}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500/50"
                                    placeholder="ব্যানারের সুন্দর বিবরণ বা অফার..."
                                  />
                                </div>

                                {/* Image Section: URL Input and Direct File Upload */}
                                <div className="space-y-2 border-t border-[#322822]/40 pt-3">
                                  <label className="block text-[10px] opacity-70 font-bold text-neutral-300">ব্যানার ইমেজ (Banner Image):</label>
                                  
                                  {/* Computer File Picker */}
                                  <div className="flex items-center space-x-2">
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      id={`settings-file-upload-quick-new-${idx}`} 
                                      className="hidden" 
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const reader = new FileReader();
                                          reader.onloadend = () => {
                                            const base64 = reader.result as string;
                                            const updated = [...banners];
                                            updated[idx] = {
                                              ...b,
                                              desktopImageUrl: base64,
                                              mobileImageUrl: base64
                                            };
                                            setBanners(updated);
                                            setDesignerSuccessMessage(`ব্যানার ${idx + 1} এর ছবি সফলভাবে কম্পিউটার থেকে আপলোড করা হয়েছে!`);
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`settings-file-upload-quick-new-${idx}`)?.click()}
                                      className="w-full py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-amber-500 border border-amber-500/30 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                                    >
                                      <Upload className="h-3.5 w-3.5" />
                                      <span>🖥️ কম্পিউটার থেকে ছবি আপলোড করুন</span>
                                    </button>
                                  </div>

                                  {/* Paste Image URL as fallback */}
                                  <input
                                    type="text"
                                    value={b.desktopImageUrl || ''}
                                    onChange={(e) => {
                                      const updated = [...banners];
                                      updated[idx] = { ...b, desktopImageUrl: e.target.value, mobileImageUrl: e.target.value };
                                      setBanners(updated);
                                    }}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500/50 font-mono"
                                    placeholder="অথবা সরাসরি ইমেজ লিংক (URL) পেস্ট করুন..."
                                  />

                                  {/* Immediate Miniature Preview */}
                                  {b.desktopImageUrl && (
                                    <div className="relative h-16 w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 mt-1">
                                      <img 
                                        src={b.desktopImageUrl} 
                                        alt="" 
                                        className="h-full w-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[9px] text-white font-mono font-bold">
                                        Live Preview Active
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Connected Category Selector (Dropdown selection) */}
                                <div className="space-y-2 border-t border-[#322822]/40 pt-3">
                                  <label className="block text-[10px] opacity-70 font-bold text-neutral-300 font-sans flex items-center space-x-1">
                                    <span>📂 কানেক্টেড ক্যাটাগরি (Connected Category):</span>
                                  </label>
                                  <select
                                    value={b.category || ''}
                                    onChange={(e) => {
                                      const updated = [...banners];
                                      updated[idx] = { ...b, category: e.target.value };
                                      setBanners(updated);
                                    }}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500/50 font-sans cursor-pointer"
                                  >
                                    <option value="" className="bg-[#1a1614] text-neutral-400">যেমন: Baby Category, Mens... (কোনো ক্যাটাগরি যুক্ত নেই)</option>
                                    {categoriesList.map(cat => (
                                      <option key={cat} value={cat} className="bg-[#1a1614] text-white">
                                        📁 {cat}
                                      </option>
                                    ))}
                                  </select>
                                  <p className="text-[9px] text-teal-400/80 leading-relaxed font-sans">
                                    এই ব্যানারটিতে ক্লিক করলে নিচের প্রোডাক্ট লিস্টে শুধুমাত্র এই ক্যাটাগরির প্রোডাক্টগুলোই ফিল্টার হয়ে দেখাবে।
                                  </p>
                                </div>

                                <div className="space-y-3 border-t border-[#322822]/40 pt-3">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[9px] opacity-65 mb-0.5 font-bold">বাটন ১ লেখা (অর্ডার বাটন):</label>
                                      <input
                                        type="text"
                                        value={b.button1Text || 'এখনই অর্ডার করুন'}
                                        onChange={(e) => {
                                          const updated = [...banners];
                                          updated[idx] = { ...b, button1Text: e.target.value };
                                          setBanners(updated);
                                        }}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-xs text-white font-sans"
                                        placeholder="Buy Now"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] opacity-65 mb-0.5 font-bold">বাটন ২ লেখা (বিস্তারিত বাটন):</label>
                                      <input
                                        type="text"
                                        value={b.button2Text || 'বিস্তারিত দেখুন'}
                                        onChange={(e) => {
                                          const updated = [...banners];
                                          updated[idx] = { ...b, button2Text: e.target.value };
                                          setBanners(updated);
                                        }}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-xs text-white font-sans"
                                        placeholder="Details"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Text Alignment & Style */}
                                <div className="grid grid-cols-2 gap-2 border-t border-[#322822]/40 pt-3 text-white">
                                  <div>
                                    <label className="block text-[9px] opacity-65 mb-1 font-sans">অ্যালাইনমেন্ট (Text Position):</label>
                                    <select
                                      value={b.textPosition || 'left'}
                                      onChange={(e) => {
                                        const updated = [...banners];
                                        updated[idx] = { ...b, textPosition: e.target.value as any };
                                        setBanners(updated);
                                      }}
                                      className="w-full bg-black/40 border border-white/10 rounded-xl p-1.5 text-[10px] text-white cursor-pointer"
                                    >
                                      <option value="left" className="bg-[#1a1614]">Left (বাম)</option>
                                      <option value="center" className="bg-[#1a1614]">Center (মাঝখানে)</option>
                                      <option value="right" className="bg-[#1a1614]">Right (ডান)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[9px] opacity-65 mb-1 font-sans">ওভারলে অস্বচ্ছতা (Overlay):</label>
                                    <select
                                      value={b.overlayColor || 'rgba(0,0,0,0.4)'}
                                      onChange={(e) => {
                                        const updated = [...banners];
                                        updated[idx] = { ...b, overlayColor: e.target.value };
                                        setBanners(updated);
                                      }}
                                      className="w-full bg-black/40 border border-white/10 rounded-xl p-1.5 text-[10px] text-white cursor-pointer font-sans"
                                    >
                                      <option value="rgba(0,0,0,0.25)" className="bg-[#1a1614]">হালকা অন্ধকার (Light)</option>
                                      <option value="rgba(0,0,0,0.45)" className="bg-[#1a1614]">মাঝারি অন্ধকার (Medium)</option>
                                      <option value="rgba(0,0,0,0.65)" className="bg-[#1a1614]">বেশি অন্ধকার (Dark)</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Individual Banner Save Button */}
                                <div className="pt-3 border-t border-[#322822]/40 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      setIsSavingIndividual(prev => ({ ...prev, [idx]: true }));
                                      try {
                                        // Save locally
                                        localStorage.setItem('aura_premium_banners', JSON.stringify(banners));
                                        setPublishedTheme('classic');
                                        localStorage.setItem('aura_published_theme', 'classic');

                                        // Sync to Supabase system_settings
                                        const { error: bannersErr } = await supabase.from('system_settings').upsert({
                                          id: 'premium_banners',
                                          tagline: JSON.stringify(banners),
                                          currency: 'BDT'
                                        });

                                        if (bannersErr) {
                                          console.warn("Supabase individual sync issue:", bannersErr);
                                          setDesignerSuccessMessage(`ব্যানার ${idx + 1} লোকাল ব্রাউজারে সেভ হয়েছে! (ক্লাউড ব্যাকআপে কিছুটা সমস্যা হয়েছে)`);
                                        } else {
                                          setDesignerSuccessMessage(`অভিনন্দন! শুধুমাত্র ব্যানার #${idx + 1} সফলভাবে ক্লাউড ও লোকাল স্টোরে সংরক্ষণ করা হয়েছে! 🚀`);
                                        }
                                      } catch (err: any) {
                                        console.error("Individual save failed:", err);
                                        setDesignerSuccessMessage(`ব্যানার ${idx + 1} সেভ করার সময় ত্রুটি: ` + err.message);
                                      } finally {
                                        setIsSavingIndividual(prev => ({ ...prev, [idx]: false }));
                                      }
                                    }}
                                    disabled={isSavingIndividual[idx]}
                                    className="w-full py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-extrabold text-[11px] rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 border-none cursor-pointer"
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                    <span>{isSavingIndividual[idx] ? 'সংরক্ষণ হচ্ছে...' : `ব্যানার ${idx + 1} সংরক্ষণ করুন`}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Interactive responsive banner size simulator */}
                      <div className="bg-[#1a1614] p-5 rounded-3xl border border-[#322822]/40 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-[#322822]/30 pb-3">
                          <h4 className="text-xs font-black uppercase tracking-wider text-[#e07a5f] flex items-center space-x-2">
                            <Eye className="h-3.5 w-3.5 text-[#e07a5f]" />
                            <span>রিস্পন্সিভ ব্যানার প্রিভিউ সিমুলেটর (Responsive Banner Size Preview)</span>
                          </h4>
                          <span className="text-[10px] text-neutral-400 font-bold font-sans">মোবাইল ও কম্পিউটারে সাইজ কেমন দেখাবে টেস্ট করুন</span>
                        </div>

                        {/* Interactive Simulator Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Computer Friendly Size Preview (7 cols) */}
                          <div className="lg:col-span-7 space-y-2">
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-sans">💻 কম্পিউটার প্রিভিউ (Computer View - Compact Size):</p>
                            <div className="w-full rounded-2xl border-4 border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl relative" style={{ height: '240px' }}>
                              <div className="absolute inset-0 z-10" style={{ backgroundColor: banners[0]?.overlayColor || 'rgba(0,0,0,0.4)' }} />
                              <img 
                                src={banners[0]?.desktopImageUrl || 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200'} 
                                alt="" 
                                className="absolute inset-0 w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              {/* Text & Buttons */}
                              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-center text-left">
                                <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest font-sans">{banners[0]?.subtitle || 'Premium Product'}</span>
                                <h3 className="text-sm sm:text-base font-black text-white leading-tight mt-0.5">{banners[0]?.title || 'ব্যানার শিরোনাম'}</h3>
                                <p className="text-[10px] text-neutral-200 line-clamp-1 max-w-md mt-1">{banners[0]?.description || 'ব্যানার ডেসক্রিপশন...'}</p>
                                <div className="mt-3 flex items-center space-x-2">
                                  <span className="px-3 py-1.5 bg-teal-500 text-white text-[9px] font-black rounded-lg cursor-pointer">{banners[0]?.button1Text || 'অর্ডার নাও'}</span>
                                  <span className="px-3 py-1.5 bg-black/40 text-white text-[9px] font-bold border border-white/20 rounded-lg cursor-pointer">{banners[0]?.button2Text || 'বিস্তারিত'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Mobile Friendly Size Preview (5 cols) */}
                          <div className="lg:col-span-5 space-y-2">
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-sans">📱 মোবাইল প্রিভিউ (Mobile View - Compact Size):</p>
                            <div className="w-64 mx-auto rounded-3xl border-8 border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl relative" style={{ height: '180px' }}>
                              <div className="absolute inset-0 z-10" style={{ backgroundColor: banners[0]?.overlayColor || 'rgba(0,0,0,0.4)' }} />
                              <img 
                                src={banners[0]?.desktopImageUrl || 'https://images.unsplash.com/photo-1580087443171-70f90fc925eb?auto=format&fit=crop&q=80&w=1200'} 
                                alt="" 
                                className="absolute inset-0 w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              {/* Text & Buttons */}
                              <div className="absolute inset-0 z-20 p-4 flex flex-col justify-center text-left font-sans">
                                <span className="text-[7px] font-black text-amber-400 uppercase tracking-widest">{banners[0]?.subtitle || 'Premium Product'}</span>
                                <h3 className="text-[10px] font-black text-white leading-tight mt-0.5 line-clamp-1">{banners[0]?.title || 'ব্যানার শিরোনাম'}</h3>
                                <p className="text-[8px] text-neutral-200 line-clamp-1 mt-0.5">{banners[0]?.description || 'ব্যানার ডেসক্রিপশন...'}</p>
                                <div className="mt-2.5 flex items-center space-x-1.5">
                                  <span className="px-2 py-1 bg-teal-500 text-white text-[8px] font-black rounded-md">{banners[0]?.button1Text || 'অর্ডার নাও'}</span>
                                  <span className="px-2 py-1 bg-black/40 text-white text-[8px] font-bold border border-white/20 rounded-md">{banners[0]?.button2Text || 'বিস্তারিত'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {activeSettingsTab === 'brand' && (
                  <div className="animate-fade-in duration-300">
                    {/* Brand Branding Card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Settings className="h-4.5 w-4.5 text-[#e07a5f]" />
                        <span>১. ব্রান্ড পরিচিতি সেটিংস (Brand Slogan Settings)</span>
                      </h3>
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-[10px] font-bold opacity-75 mb-1.5">ব্র্যান্ড নাম (Brand Name - লাইভ আপডেট!)</label>
                          <input 
                            type="text"
                            value={settings.brandName || ""}
                            onChange={(e) => setSettings(prev => ({ ...prev, brandName: e.target.value }))}
                            className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold opacity-75 mb-1.5">ব্র্যান্ড স্লোগান / ট্যাগলাইন (Tagline)</label>
                          <input 
                            type="text"
                            value={settings.tagline || ""}
                            onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                            className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                          />
                        </div>

                        {/* Brand Logo Upload & Custom Selection (Functional & Dynamic) */}
                        <div className="pt-3 border-t border-inherit">
                          <label className="block text-[10px] font-bold opacity-75 mb-2">ব্র্যান্ড লোগো সেটিংস (Store Brand Logo)</label>
                          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl bg-neutral-100 dark:bg-white/5 border border-dashed border-inherit">
                            {/* Logo Preview with premium drop-shadow as requested */}
                            <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-black/40 border border-[#d4af37]/40 shrink-0 p-1 overflow-hidden group">
                              <img 
                                src={settings.brandLogo || trendZoneLogo} 
                                alt="Brand Logo" 
                                className="h-full w-full object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
                                style={{ filter: 'drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.7))' }}
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="flex-1 w-full space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {/* Standard Upload File Trigger */}
                                <label className="cursor-pointer flex items-center space-x-1.5 px-3 py-1.5 bg-[#e07a5f] hover:bg-[#e07a5f]/90 text-white rounded-lg text-[10px] font-bold transition-all shadow-sm">
                                  <Upload className="h-3.5 w-3.5" />
                                  <span>লোগো আপলোড (Upload Logo)</span>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          if (event.target?.result) {
                                            const img = new Image();
                                            img.src = event.target.result as string;
                                            img.onload = () => {
                                              const canvas = document.createElement('canvas');
                                              const MAX_WIDTH = 256;
                                              const MAX_HEIGHT = 256;
                                              let width = img.width;
                                              let height = img.height;
                                              
                                              if (width > height) {
                                                if (width > MAX_WIDTH) {
                                                  height *= MAX_WIDTH / width;
                                                  width = MAX_WIDTH;
                                                }
                                              } else {
                                                if (height > MAX_HEIGHT) {
                                                  width *= MAX_HEIGHT / height;
                                                  height = MAX_HEIGHT;
                                                }
                                              }
                                              canvas.width = width;
                                              canvas.height = height;
                                              const ctx = canvas.getContext('2d');
                                              if (ctx) {
                                                ctx.drawImage(img, 0, 0, width, height);
                                                const compressedBase64 = canvas.toDataURL('image/webp', 0.8) || canvas.toDataURL('image/jpeg', 0.85);
                                                setSettings(prev => ({ ...prev, brandLogo: compressedBase64 }));
                                              } else {
                                                setSettings(prev => ({ ...prev, brandLogo: event.target!.result as string }));
                                              }
                                            };
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>

                                {/* Reset to Default button */}
                                {settings.brandLogo && (
                                  <button
                                    type="button"
                                    onClick={() => setSettings(prev => ({ ...prev, brandLogo: "" }))}
                                    className="flex items-center space-x-1 px-3 py-1.5 bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg text-[10px] font-bold transition-all hover:bg-neutral-400 dark:hover:bg-neutral-700"
                                  >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    <span>ডিফল্ট রিস্টোর (Reset)</span>
                                  </button>
                                )}
                              </div>
                              <p className="text-[9px] opacity-60 leading-tight">
                                সোনালী কয়েন লোগো বা যেকোনো কাস্টম ট্রান্সপারেন্ট লোগো আপলোড করতে পারেন। এটি লাইভ স্টোরফ্রন্ট ও এডমিন ড্যাশবোর্ডে সাথে সাথে আপডেট হবে এবং ডেটাবেজে সংরক্ষিত থাকবে।
                              </p>
                            </div>
                          </div>
                        </div>



                        {/* Brand Settings Save Button under the Logo upload box as requested */}
                        <div className="pt-3 border-t border-inherit space-y-3">
                          <button
                            type="button"
                            onClick={async () => {
                              setSettingsSaveStatus(null);
                              const res = await supabaseService.upsertSettings(settings);
                              setSettingsSaveStatus(res);
                              
                              if (res.success && !res.missingColumns) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `ব্র্যান্ড সেটিংস সফলভাবে সংরক্ষিত`,
                                  message: `আপনার ব্র্যান্ড নাম "${settings.brandName || ''}" এবং কাস্টম লোগোটি গ্লোবাল সুপাবেজ ক্লাউড ডাটাবেজে লক করা হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                              } else if (res.missingColumns) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `⚠️ কলাম missing! সুপাবেজে SQL রান করতে হবে`,
                                  message: `আপনার সুপাবেজ টেবিলে brand_logo এবং tagline কলাম যোগ করতে হবে। নিচে দেওয়া SQL রান করুন।`,
                                  timestamp: new Date().toISOString(),
                                  read: false
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                              }
                            }}
                            className="w-full px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[11px] shadow-md shadow-emerald-500/15 transition-all flex items-center justify-center space-x-2"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>পরিবর্তন সংরক্ষণ করুন (Save Changes)</span>
                          </button>

                          {/* Detailed status feedback with copyable ALTER TABLE code snippet to solve the live site issue */}
                          {settingsSaveStatus && (
                            <div className={`p-3.5 rounded-2xl border text-xs leading-normal transition-all duration-300
                              ${settingsSaveStatus.success && !settingsSaveStatus.missingColumns
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                : 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400'
                              }`}
                            >
                              {settingsSaveStatus.success && !settingsSaveStatus.missingColumns ? (
                                <div className="space-y-1">
                                  <p className="font-extrabold flex items-center space-x-1.5 text-[11px] uppercase">
                                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                                    <span>গ্লোবাল ক্লাউড ডেটাবেজে সফলভাবে সংরক্ষিত!</span>
                                  </p>
                                  <p className="text-[10px] opacity-80">
                                    আপনার ব্র্যান্ড সেটিংস সরাসরি ক্লাউড ডাটাবেজে সিঙ্ক হয়েছে। ভার্সেলের লাইভ সাইটসহ পৃথিবীর যেকোনো প্রান্ত থেকে এটি এখন দেখা যাবে।
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <p className="font-extrabold flex items-center space-x-1.5 text-[11px] uppercase text-rose-500 dark:text-amber-400">
                                    <AlertCircle className="h-4 w-4 shrink-0 animate-pulse" />
                                    <span>⚠️ সুপাবেজ ডেটাবেজে কলাম যুক্ত করা প্রয়োজন!</span>
                                  </p>
                                  <p className="text-[10px] leading-relaxed">
                                    আপনার সুপাবেজের <strong>system_settings</strong> টেবিলে <code>brand_logo</code> এবং <code>tagline</code> কলাম দুটি নেই। এর কারণে পরিবর্তনটি শুধু আপনার ব্রাউজারের LocalStorage-এ দেখা যাচ্ছে, কিন্তু লাইভ সাইটে (ভার্সেলে) আপডেট হচ্ছে না।
                                  </p>
                                  <div className="p-2.5 bg-black rounded-xl border border-neutral-800 space-y-1">
                                    <p className="text-[9px] text-gray-400 uppercase font-bold">নিচের SQL কোডটি কপি করে Supabase SQL Editor-এ রান করুন:</p>
                                    <pre className="text-[9px] font-mono text-emerald-400 whitespace-pre overflow-x-auto p-1 bg-neutral-950/50 rounded-lg">
  {`CREATE TABLE IF NOT EXISTS public.system_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  currency TEXT DEFAULT 'BDT',
  tax_rate NUMERIC DEFAULT 0,
  low_stock_limit INT DEFAULT 5,
  eye_protection_enabled BOOLEAN DEFAULT false,
  blue_light_filter_level INT DEFAULT 50,
  theme_mode TEXT DEFAULT 'dark',
  brand_name TEXT DEFAULT 'TREND ZONE',
  brand_logo TEXT,
  tagline TEXT
);
ALTER TABLE public.system_settings ADD COLUMN IF NOT EXISTS brand_logo TEXT;
ALTER TABLE public.system_settings ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE public.system_settings DISABLE ROW LEVEL SECURITY;`}
                                    </pre>
                                    <div className="flex justify-end pt-1">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          navigator.clipboard.writeText(`CREATE TABLE IF NOT EXISTS public.system_settings (\n  id TEXT PRIMARY KEY DEFAULT 'global',\n  currency TEXT DEFAULT 'BDT',\n  tax_rate NUMERIC DEFAULT 0,\n  low_stock_limit INT DEFAULT 5,\n  eye_protection_enabled BOOLEAN DEFAULT false,\n  blue_light_filter_level INT DEFAULT 50,\n  theme_mode TEXT DEFAULT 'dark',\n  brand_name TEXT DEFAULT 'TREND ZONE',\n  brand_logo TEXT,\n  tagline TEXT\n);\nALTER TABLE public.system_settings ADD COLUMN IF NOT EXISTS brand_logo TEXT;\nALTER TABLE public.system_settings ADD COLUMN IF NOT EXISTS tagline TEXT;\nALTER TABLE public.system_settings DISABLE ROW LEVEL SECURITY;`);
                                          alert('SQL কোড ক্লিপবোর্ডে কপি হয়েছে!');
                                        }}
                                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[9px] transition-colors"
                                      >
                                        কোড কপি করুন
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-[9px] opacity-75">
                                    কোডটি সুপাবেজ SQL এডিটরে রান করার পর এই পেজটি রিফ্রেশ করে পুনরায় "Save Changes" বাটনে ক্লিক করুন।
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'fb_page' && (
                  <div className="animate-fade-in duration-300">
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Facebook className="h-4.5 w-4.5 text-[#3b5998]" />
                        <span>ফেসবুক পেজ এড করুন (Facebook Page Configuration)</span>
                      </h3>
                      <p className="text-[11px] opacity-75 leading-relaxed">
                        আপনার ব্যবসায়ের অফিসিয়াল ফেসবুক পেজ লিংকটি এখানে যুক্ত করুন। এটি লাইভ স্টোরফ্রন্টে মেসেঞ্জিং এবং সোশ্যাল আইকনের সাথে লিঙ্ক করা থাকবে।
                      </p>

                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="block text-[10px] font-bold opacity-75 mb-1.5 flex items-center gap-1">
                            <span className="text-[#3b5998]">🔵</span> ফেসবুক পেজ লিংক (Facebook Page URL)
                          </label>
                          <input 
                            type="url"
                            value={settings.facebookPageUrl || ""}
                            placeholder="https://facebook.com/yourpage"
                            onChange={(e) => setSettings(prev => ({ ...prev, facebookPageUrl: e.target.value }))}
                            className="w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit font-bold"
                          />
                        </div>

                        <div className="pt-3 border-t border-inherit space-y-3">
                          <button
                            type="button"
                            onClick={async () => {
                              setSettingsSaveStatus(null);
                              const res = await supabaseService.upsertSettings(settings);
                              setSettingsSaveStatus(res);
                              
                              if (res.success) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `ফেসবুক পেজ লিংক সংরক্ষিত`,
                                  message: `আপনার ফেসবুক পেজ লিংক "${settings.facebookPageUrl || ''}" সফলভাবে সুপাবেজ ক্লাউড ডাটাবেজে সেভ করা হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false,
                                  type: 'info' as const
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                                try {
                                  await supabaseService.upsertNotification(newNotif);
                                } catch (_) {}
                              }
                            }}
                            className="w-full py-3 bg-[#3b5998] hover:bg-[#2d4373] text-white font-extrabold rounded-2xl text-xs shadow-lg cursor-pointer flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save Facebook Page (সংরক্ষণ করুন)</span>
                          </button>

                          {settingsSaveStatus && (
                            <div className="animate-fade-in">
                              {settingsSaveStatus.success ? (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 text-emerald-500">
                                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                                  <span className="text-xs font-bold">ফেসবুক লিংক ক্লাউড ডাটাবেজে সিঙ্ক হয়েছে!</span>
                                </div>
                              ) : (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center space-x-2 text-rose-500">
                                  <XCircle className="h-4 w-4 shrink-0" />
                                  <span className="text-xs font-bold">সেভ করতে ব্যর্থ হয়েছে: {settingsSaveStatus.error}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'ig_profile' && (
                  <div className="animate-fade-in duration-300">
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Instagram className="h-4.5 w-4.5 text-[#e1306c]" />
                        <span>ইনস্টাগ্রাম প্রোফাইল এড করুন (Instagram Profile Configuration)</span>
                      </h3>
                      <p className="text-[11px] opacity-75 leading-relaxed">
                        আপনার ব্র্যান্ডের অফিসিয়াল ইনস্টাগ্রাম প্রোফাইল লিংকটি এখানে যুক্ত করুন। এটি আপনার কাস্টমারদের সরাসরি আপনার ইনস্টাগ্রাম স্টোর ভিজিট করতে সহায়তা করবে।
                      </p>

                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="block text-[10px] font-bold opacity-75 mb-1.5 flex items-center gap-1">
                            <span className="text-[#e1306c]">📸</span> ইনস্টাগ্রাম প্রোফাইল লিংক (Instagram URL)
                          </label>
                          <input 
                            type="url"
                            value={settings.instagramProfileUrl || ""}
                            placeholder="https://instagram.com/yourprofile"
                            onChange={(e) => setSettings(prev => ({ ...prev, instagramProfileUrl: e.target.value }))}
                            className="w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit font-bold"
                          />
                        </div>

                        <div className="pt-3 border-t border-inherit space-y-3">
                          <button
                            type="button"
                            onClick={async () => {
                              setSettingsSaveStatus(null);
                              const res = await supabaseService.upsertSettings(settings);
                              setSettingsSaveStatus(res);
                              
                              if (res.success) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `ইনস্টাগ্রাম প্রোফাইল লিংক সংরক্ষিত`,
                                  message: `আপনার ইনস্টাগ্রাম প্রোফাইল লিংক "${settings.instagramProfileUrl || ''}" সফলভাবে সুপাবেজ ক্লাউড ডাটাবেজে সেভ করা হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false,
                                  type: 'info' as const
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                                try {
                                  await supabaseService.upsertNotification(newNotif);
                                } catch (_) {}
                              }
                            }}
                            className="w-full py-3 bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] hover:opacity-90 text-white font-extrabold rounded-2xl text-xs shadow-lg cursor-pointer flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save Instagram Profile (সংরক্ষণ করুন)</span>
                          </button>

                          {settingsSaveStatus && (
                            <div className="animate-fade-in">
                              {settingsSaveStatus.success ? (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 text-emerald-500">
                                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                                  <span className="text-xs font-bold">ইনস্টাগ্রাম লিংক ক্লাউড ডাটাবেজে সিঙ্ক হয়েছে!</span>
                                </div>
                              ) : (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center space-x-2 text-rose-500">
                                  <XCircle className="h-4 w-4 shrink-0" />
                                  <span className="text-xs font-bold">সেভ করতে ব্যর্থ হয়েছে: {settingsSaveStatus.error}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'wa_number' && (
                  <div className="animate-fade-in duration-300">
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Phone className="h-4.5 w-4.5 text-[#25d366]" />
                        <span>হোয়াটসঅ্যাপ নম্বর এড করুন (WhatsApp Configuration)</span>
                      </h3>
                      <p className="text-[11px] opacity-75 leading-relaxed">
                        আপনার স্টোরের হোয়াটসঅ্যাপ বিজনেস নম্বরটি এখানে যুক্ত করুন। এটি স্টোরফ্রন্টে সরাসরি চ্যাট করার এবং কাস্টমার সাপোর্টের জন্য ব্যবহৃত হবে।
                      </p>

                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="block text-[10px] font-bold opacity-75 mb-1.5 flex items-center gap-1">
                            <span className="text-[#25d366]">🟢</span> হোয়াটসঅ্যাপ নম্বর (WhatsApp Number)
                          </label>
                          <input 
                            type="text"
                            value={settings.whatsappNumber || ""}
                            placeholder="88017XXXXXXXX"
                            onChange={(e) => setSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                            className="w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit font-bold"
                          />
                          <p className="text-[9px] opacity-50 mt-1.5 leading-tight">দেশীয় কোডসহ শুধু নম্বর দিন (যেমন: 8801792572306)</p>
                        </div>

                        <div className="pt-3 border-t border-inherit space-y-3">
                          <button
                            type="button"
                            onClick={async () => {
                              setSettingsSaveStatus(null);
                              const res = await supabaseService.upsertSettings(settings);
                              setSettingsSaveStatus(res);
                              
                              if (res.success) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `হোয়াটসঅ্যাপ নম্বর সংরক্ষিত`,
                                  message: `আপনার হোয়াটসঅ্যাপ নম্বর "${settings.whatsappNumber || ''}" সফলভাবে সুপাবেজ ক্লাউড ডাটাবেজে সেভ করা হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false,
                                  type: 'info' as const
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                                try {
                                  await supabaseService.upsertNotification(newNotif);
                                } catch (_) {}
                              }
                            }}
                            className="w-full py-3 bg-[#25d366] hover:bg-[#1ebd56] text-white font-extrabold rounded-2xl text-xs shadow-lg cursor-pointer flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save WhatsApp Number (সংরক্ষণ করুন)</span>
                          </button>

                          {settingsSaveStatus && (
                            <div className="animate-fade-in">
                              {settingsSaveStatus.success ? (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 text-emerald-500">
                                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                                  <span className="text-xs font-bold">হোয়াটসঅ্যাপ নম্বর ক্লাউড ডাটাবেজে সিঙ্ক হয়েছে!</span>
                                </div>
                              ) : (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center space-x-2 text-rose-500">
                                  <XCircle className="h-4 w-4 shrink-0" />
                                  <span className="text-xs font-bold">সেভ করতে ব্যর্থ হয়েছে: {settingsSaveStatus.error}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'eye' && (
                  <div className="animate-fade-in duration-300">
                    {/* Reactive Eye Protection & Blue Light Card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <ShieldAlert className="h-4.5 w-4.5 text-amber-500" />
                        <span>২. আই প্রোটেকশন ও স্ক্রিন ওয়ার্মথ (Eye Protection Filter)</span>
                      </h3>
                      <p className="text-[11px] opacity-75 leading-relaxed">
                        রাতে বা দীর্ঘ সময় স্ক্রিনে কাজ করার সময় চোখের সুরক্ষার জন্য আমাদের রিঅ্যাক্টিভ ব্লু-লাইট ফিল্টার চালু করুন। এটি লাইভ স্ক্রিনের তাপমাত্রা পরিবর্তন করে।
                      </p>

                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between p-3.5 bg-neutral-100 dark:bg-white/5 rounded-2xl">
                          <div>
                            <p className="font-bold text-xs">আই প্রোটেকশন ফিল্টার চালু করুন</p>
                            <p className="text-[10px] opacity-60">Enable warm blue-light protective overlay</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSettings(prev => ({ ...prev, eyeProtectionEnabled: !prev.eyeProtectionEnabled }))}
                            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none
                              ${settings.eyeProtectionEnabled ? 'bg-amber-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md
                              ${settings.eyeProtectionEnabled ? 'translate-x-6' : 'translate-x-0'}`} 
                            />
                          </button>
                        </div>

                        {settings.eyeProtectionEnabled && (
                          <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-amber-600">ফিল্টার ওয়ার্মথ লেভেল (Warmth Strength)</span>
                              <span className="text-amber-600">80% Intensity</span>
                            </div>
                            <input 
                              type="range"
                              min="10"
                              max="100"
                              defaultValue="80"
                              className="w-full accent-amber-500"
                            />
                            <p className="text-[9px] opacity-60 text-amber-600 italic">চোখের ক্লান্তি কমাতে স্ক্রিনকে উষ্ণ হলুদ আভায় রূপান্তর করা হয়েছে।</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'woocommerce' && (
                  <div className="animate-fade-in duration-300">
                    {/* WooCommerce credentials card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <RefreshCcw className="h-4.5 w-4.5 text-indigo-500" />
                        <span>৩. ওউ-কমার্স REST API ক্রেডেনশিয়ালস (WooCommerce Keys)</span>
                      </h3>
                      <div className="space-y-3 font-mono text-[11px]">
                        <div>
                          <label className="block text-[10px] font-sans font-bold opacity-75 mb-1.5">WooCommerce REST API URL</label>
                          <input 
                            type="text"
                            defaultValue="https://auralux-fashion.com/wp-json"
                            className="w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit font-bold text-[10px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans font-bold opacity-75 mb-1.5">Consumer Key (ck_xxxx)</label>
                          <input 
                            type="password"
                            defaultValue="ck_483a99264c12bb9f71ab937d7a126cb3"
                            className="w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit text-[10px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans font-bold opacity-75 mb-1.5">Consumer Secret (cs_xxxx)</label>
                          <input 
                            type="password"
                            defaultValue="cs_de72b83c16f23e42a003fdfa2893fcc2"
                            className="w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit text-[10px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'inventory' && (
                  <div className="animate-fade-in duration-300">
                    {/* Inventory Limits card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Warehouse className="h-4.5 w-4.5 text-rose-500" />
                        <span>৪. ইনভেন্টরি এলার্ট লেভেল সেটিংস (Stock Thresholds)</span>
                      </h3>
                      <div className="space-y-4 text-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold">লো-স্টক এলার্ট লিমিট (Low Stock Level)</p>
                            <p className="text-[10px] opacity-60">স্টকের পরিমাণ এর নিচে নামলে লাল নোটিফিকেশন আসবে</p>
                          </div>
                          <input 
                            type="number"
                            defaultValue="5"
                            className="w-16 p-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit text-center font-bold"
                          />
                        </div>

                        <div className="pt-2 border-t border-inherit flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              const newNotif = {
                                id: `notif-${Date.now()}`,
                                title: `সেটিংস সফলভাবে সংরক্ষিত`,
                                message: `স্টোর গ্লোবাল কনফিগারেশন প্যারামিটার সফলভাবে আপডেট ও ডাটাবেজে লক করা হয়েছে।`,
                                timestamp: new Date().toISOString(),
                                read: false
                              };
                              setNotifications(prev => [newNotif, ...prev]);
                            }}
                            className="px-6 py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/10 transition-all"
                          >
                            সেটিংস সংরক্ষণ করুন (Save Settings)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'courier' && (
                  <div className="animate-fade-in duration-300">
                    {/* Courier API Integration Settings card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-inherit">
                        <h3 className="text-sm font-extrabold flex items-center space-x-2">
                          <Truck className="h-4.5 w-4.5 text-[#e07a5f]" />
                          <span>{t('কুরিয়ার এপিআই ইন্টিগ্রেশন সেটিংস (Courier API Integration Settings)', 'Courier API Integration Settings')}</span>
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setNewCourierClientId('');
                            setNewCourierApiKey('');
                            setNewCourierSecretKey('');
                            setNewCourierDefaultWeight('0.5');
                            setNewCourierDefaultNote('[INVO_CUSTOMER_NOTE]');
                            setShowAddCourierRow(!showAddCourierRow);
                          }}
                          className="px-3 py-1.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-bold rounded-xl text-[10px] flex items-center space-x-1.5 transition-all shadow-sm"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>{showAddCourierRow ? t('বন্ধ করুন', 'Close') : t('নতুন কুরিয়ার (+ Add)', 'Add New Courier (+ Add)')}</span>
                        </button>
                      </div>

                      {/* Add New Courier Form Row */}
                      {showAddCourierRow && (
                        <div className="p-8 rounded-[2rem] bg-neutral-100/50 dark:bg-[#1a1614]/40 border border-inherit space-y-6 max-w-2xl mx-auto shadow-sm">
                          {/* Form Title & Subtitle */}
                          <div className="text-center space-y-1">
                            <h4 className="text-xl md:text-2xl font-extrabold text-[#c05a3e] dark:text-[#e07a5f] tracking-tight">
                              {newCourierName} Booking Automation
                            </h4>
                            <p className="text-[11px] font-bold opacity-50 uppercase tracking-wider font-sans">
                              Connect Your Website To {newCourierName}
                            </p>
                          </div>

                          <div className="space-y-4 pt-2">
                            {/* Courier selector */}
                            <div>
                              <label className="block text-[10px] font-extrabold mb-1.5 opacity-60 uppercase tracking-wider">{t('১. কুরিয়ার সিলেক্ট করুন (Courier Service)', '1. Select Courier Service')}</label>
                              <select
                                value={newCourierName}
                                onChange={(e) => setNewCourierName(e.target.value)}
                                className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] text-xs font-bold cursor-pointer
                                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c] text-white border-[#322822]' : 'bg-white text-neutral-800 border-neutral-200'}`}
                              >
                                <option value="Steadfast Courier">Steadfast Courier</option>
                                <option value="Pathao Courier">Pathao Courier</option>
                                <option value="RedX Courier">RedX Courier</option>
                                <option value="Sundarban Courier">Sundarban Courier</option>
                              </select>
                            </div>

                            {/* Client ID Field */}
                            <div>
                              <label className="block text-[10px] font-extrabold mb-1.5 opacity-60 uppercase tracking-wider">{t('ক্লায়েন্ট আইডি (Client ID)', 'Client ID')}</label>
                              <input
                                type="text"
                                value={newCourierClientId}
                                onChange={(e) => setNewCourierClientId(e.target.value)}
                                placeholder={t("যেমন: 1392697", "e.g. 1392697")}
                                className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] text-xs font-mono
                                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c]/50 text-white border-[#322822]' : 'bg-white text-neutral-800 border-neutral-200'}`}
                              />
                            </div>

                            {/* API Key Field */}
                            <div>
                              <label className="block text-[10px] font-extrabold mb-1.5 opacity-60 uppercase tracking-wider">{t('এপিআই কী (API Key)', 'API Key')}</label>
                              <input
                                type="text"
                                value={newCourierApiKey}
                                onChange={(e) => setNewCourierApiKey(e.target.value)}
                                placeholder={t("কুরিয়ারের মেইন টোকেন ইনপুট ফিল্ড", "Courier main token input field")}
                                className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] text-xs font-mono
                                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c]/50 text-white border-[#322822]' : 'bg-white text-neutral-800 border-neutral-200'}`}
                              />
                            </div>

                            {/* Secret Key Field */}
                            <div>
                              <label className="block text-[10px] font-extrabold mb-1.5 opacity-60 uppercase tracking-wider">{t('সিক্রেট কী (Secret Key)', 'Secret Key')}</label>
                              <input
                                type="text"
                                value={newCourierSecretKey}
                                onChange={(e) => setNewCourierSecretKey(e.target.value)}
                                placeholder={t("কুরিয়ারের সিক্রেট টোকেন ইনপুট ফিল্ড", "Courier secret token input field")}
                                className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] text-xs font-mono
                                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c]/50 text-white border-[#322822]' : 'bg-white text-neutral-800 border-neutral-200'}`}
                              />
                            </div>

                            {/* Default Weight Field */}
                            <div>
                              <label className="block text-[10px] font-extrabold mb-1.5 opacity-60 uppercase tracking-wider">{t('ডিফল্ট ওজন (Default Weight - Parcel Weight)', 'Default Weight (Parcel Weight)')}</label>
                              <input
                                type="text"
                                value={newCourierDefaultWeight}
                                onChange={(e) => setNewCourierDefaultWeight(e.target.value)}
                                placeholder="0.5"
                                className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] text-xs font-mono
                                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c]/50 text-white border-[#322822]' : 'bg-white text-neutral-800 border-neutral-200'}`}
                              />
                            </div>

                            {/* Default Note Field */}
                            <div>
                              <label className="block text-[10px] font-extrabold mb-1.5 opacity-60 uppercase tracking-wider">{t('ডিফল্ট নোট (Default Note)', 'Default Note')}</label>
                              <textarea
                                value={newCourierDefaultNote}
                                onChange={(e) => setNewCourierDefaultNote(e.target.value)}
                                placeholder="[INVO_CUSTOMER_NOTE]"
                                rows={2}
                                className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#e07a5f] text-xs font-mono resize-none
                                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c]/50 text-white border-[#322822]' : 'bg-white text-neutral-800 border-neutral-200'}`}
                              />
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-2 pt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setNewCourierClientId('');
                                  setNewCourierApiKey('');
                                  setNewCourierSecretKey('');
                                  setNewCourierDefaultWeight('0.5');
                                  setNewCourierDefaultNote('[INVO_CUSTOMER_NOTE]');
                                  setShowAddCourierRow(false);
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors border
                                  ${settings.themeMode === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-neutral-300 border-zinc-700' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'}`}
                              >
                                {t('Cancel', 'Cancel')}
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!newCourierApiKey.trim()) {
                                    alert(t('দয়া করে এপিআই কী টাইপ করুন!', 'Please type the API Key!'));
                                    return;
                                  }
                                  
                                  const existsIndex = courierSettingsList.findIndex(c => c.courier_name === newCourierName);
                                  
                                  const newSetting: CourierSetting = {
                                    id: existsIndex >= 0 ? courierSettingsList[existsIndex].id : `COURIER-${Date.now()}`,
                                    courier_name: newCourierName,
                                    api_key: newCourierApiKey.trim(),
                                    client_id: newCourierClientId.trim(),
                                    secret_key: newCourierSecretKey.trim(),
                                    default_weight: newCourierDefaultWeight.trim() || '0.5',
                                    default_note: newCourierDefaultNote.trim() || '[INVO_CUSTOMER_NOTE]'
                                  };

                                  // Save to DB
                                  const success = await supabaseService.upsertCourierSetting(newSetting);
                                  if (success) {
                                    let updatedList: CourierSetting[] = [];
                                    if (existsIndex >= 0) {
                                      updatedList = courierSettingsList.map((item, idx) => idx === existsIndex ? newSetting : item);
                                    } else {
                                      updatedList = [...courierSettingsList, newSetting];
                                    }
                                    setCourierSettingsList(updatedList);
                                    localStorage.setItem('aura_cached_courier_settings', JSON.stringify(updatedList));
                                    
                                    // Reset inputs
                                    setNewCourierClientId('');
                                    setNewCourierApiKey('');
                                    setNewCourierSecretKey('');
                                    setNewCourierDefaultWeight('0.5');
                                    setNewCourierDefaultNote('[INVO_CUSTOMER_NOTE]');
                                    setShowAddCourierRow(false);
                                    
                                    const newNotif = {
                                      id: `notif-${Date.now()}`,
                                      title: t('কুরিয়ার সেটিংস সংরক্ষিত', 'Courier Settings Saved'),
                                      message: `${newCourierName} ` + t('এপিআই কী ও কনফিগারেশন সফলভাবে ক্লাউড এবং লোকালে সেভ করা হয়েছে।', 'API Key and configuration successfully saved to Cloud and Local.'),
                                      timestamp: new Date().toISOString(),
                                      read: false
                                    };
                                    setNotifications(prev => [newNotif, ...prev]);
                                  } else {
                                    alert(t('সংরক্ষণ ব্যর্থ হয়েছে! সুপাবেজ কানেকশন চেক করুন।', 'Save failed! Please check your Supabase connection.'));
                                  }
                                }}
                                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-md shadow-emerald-500/10"
                              >
                                <Save className="h-4 w-4" />
                                <span>{t('Save Settings', 'Save Settings')}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Saved Courier Credentials List */}
                      <div className="space-y-2 text-xs">
                        <div className="text-[10px] font-bold opacity-60 uppercase">সংরক্ষিত কুরিয়ার ক্রেডেনশিয়ালস তালিকা</div>
                        {courierSettingsList.length === 0 ? (
                           <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-dashed border-inherit text-center opacity-60 italic text-[11px]">
                             কোনো এপিআই কী এখনো সেভ করা হয়নি। "+ New Courier" বাটন দিয়ে যুক্ত করুন।
                           </div>
                        ) : (
                          <div className="space-y-2">
                            {courierSettingsList.map((item) => {
                              // Safely extract values either directly (if loaded from updated service) or by parsing the API key
                              let parsed: any = {};
                              try {
                                parsed = JSON.parse(item.api_key);
                              } catch (_) {}

                              const clientVal = item.client_id || parsed.client_id || '';
                              const apiVal = item.api_key && !item.api_key.startsWith('{') ? item.api_key : (parsed.api_key || '');
                              const secretVal = item.secret_key || parsed.secret_key || '';
                              const weightVal = item.default_weight || parsed.default_weight || '0.5';
                              const noteVal = item.default_note || parsed.default_note || '[INVO_CUSTOMER_NOTE]';

                              return (
                                <div key={item.id || item.courier_name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-inherit gap-2">
                                  <div className="flex items-start space-x-2.5">
                                    <div className="p-2 rounded-lg bg-[#e07a5f]/10 text-[#e07a5f]">
                                      <Truck className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="font-extrabold text-[#e07a5f]">{item.courier_name}</p>
                                      <div className="text-[10px] font-mono opacity-60 flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                                        {clientVal && <span><strong>Client ID:</strong> {clientVal}</span>}
                                        {apiVal && (
                                          <span>
                                            <strong>API Key:</strong> {apiVal.substring(0, 6)}••••••
                                          </span>
                                        )}
                                        {secretVal && (
                                          <span>
                                            <strong>Secret:</strong> {secretVal.substring(0, 4)}••••••
                                          </span>
                                        )}
                                        <span><strong>Weight:</strong> {weightVal}kg</span>
                                        <span><strong>Note:</strong> {noteVal}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-1.5 w-full sm:w-auto justify-end">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNewCourierName(item.courier_name);
                                        setNewCourierClientId(clientVal);
                                        setNewCourierApiKey(apiVal);
                                        setNewCourierSecretKey(secretVal);
                                        setNewCourierDefaultWeight(weightVal);
                                        setNewCourierDefaultNote(noteVal);
                                        setShowAddCourierRow(true);
                                      }}
                                      className="p-1.5 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg text-sky-500 transition-colors"
                                      title="Edit"
                                    >
                                      <Edit className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        if (confirm(`${item.courier_name} এপিআই ক্রেডেনশিয়াল মুছে ফেলতে চান?`)) {
                                          const success = await supabaseService.deleteCourierSetting(item.id || '');
                                          if (success) {
                                            const updatedList = courierSettingsList.filter(c => c.id !== item.id);
                                            setCourierSettingsList(updatedList);
                                            localStorage.setItem('aura_cached_courier_settings', JSON.stringify(updatedList));
                                            
                                            const newNotif = {
                                              id: `notif-${Date.now()}`,
                                              title: 'কুরিয়ার সেটিংস মুছে ফেলা হয়েছে',
                                              message: `${item.courier_name} এপিআই কী সফলভাবে মুছে ফেলা হয়েছে।`,
                                              timestamp: new Date().toISOString(),
                                              read: false
                                            };
                                            setNotifications(prev => [newNotif, ...prev]);
                                          } else {
                                            alert('মুছে ফেলা ব্যর্থ হয়েছে!');
                                          }
                                        }
                                      }}
                                      className="p-1.5 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg text-rose-500 transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'gtm' && (
                  <div className="animate-fade-in duration-300">
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Layers className="h-4.5 w-4.5 text-blue-500" />
                        <span>📊 GTM4 Data Layer এবং সার্ভার সাইড ট্র্যাকিং সেটিংস</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <p className="text-[11px] opacity-70 leading-relaxed">
                          গুগল ট্যাগ ম্যানেজার (GTM) কন্টেইনার আইডি এবং সার্ভার-সাইড ট্র্যাকিং কাস্টম ডোমেন সেট করার মাধ্যমে আপনার ইকমার্স স্টোরটিতে গ্লোবাল স্ট্যান্ডার্ড ডাটা লেয়ার ট্র্যাক করতে পারবেন।
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">GTM Container ID (e.g. GTM-XXXXXXX)</label>
                            <input 
                              type="text"
                              placeholder="GTM-XXXXXXX"
                              value={trackingSettings.gtmContainerId}
                              onChange={(e) => setTrackingSettings(prev => ({ ...prev, gtmContainerId: e.target.value }))}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent border-inherit font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">GTM Server Container URL (সার্ভার সাইড ট্র্যাকিং অ্যাড্রেস)</label>
                            <input 
                              type="text"
                              placeholder="https://sgtm.yourdomain.com"
                              value={trackingSettings.gtmServerUrl || ''}
                              onChange={(e) => setTrackingSettings(prev => ({ ...prev, gtmServerUrl: e.target.value }))}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent border-inherit font-bold"
                            />
                            <span className="text-[9px] text-gray-400 mt-1 block">সার্ভার সাইড ট্র্যাকিংয়ের জন্য আপনার কাস্টম সাবডোমেন ইউআরএল দিন। ফাঁকা রাখলে ডিফল্ট গুগল সার্ভার ব্যবহৃত হবে।</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-inherit">
                          <button
                            type="button"
                            disabled={isSavingTracking}
                            onClick={async () => {
                              setIsSavingTracking(true);
                              const success = await supabaseService.upsertTrackingSettings(trackingSettings);
                              setIsSavingTracking(false);
                              if (success) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `GTM ও সার্ভার সাইড সেটিংস সংরক্ষিত হয়েছে`,
                                  message: `গুগল ট্যাগ ম্যানেজার আইডি "${trackingSettings.gtmContainerId}" এবং সার্ভার URL সফলভাবে সুপাবেজে আপসার্ট হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                                alert('GTM এবং সার্ভার সাইড সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
                              } else {
                                alert('সংরক্ষণ করতে সমস্যা হয়েছে!');
                              }
                            }}
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>{isSavingTracking ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন (Save GTM & Server Tracking)'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'meta_tracking' && (
                  <div className="animate-fade-in duration-300 space-y-6">
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Activity className="h-4.5 w-4.5 text-sky-600" />
                        <span>🔵 FB & Instagram Server-Side Tracking সেটিংস</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <p className="text-[11px] opacity-70 leading-relaxed">
                          আইওএস চৌদ্দ (iOS 14) পরবর্তী আপডেটের জন্য ব্রাউজার ট্র্যাকিংয়ের পাশাপাশি মেটা কনভার্সন এপিআই (CAPI) ট্র্যাকিং অত্যন্ত গুরুত্বপূর্ণ।
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">Meta Pixel ID</label>
                            <input 
                              type="text"
                              placeholder="1234567890"
                              value={trackingSettings.metaPixelId}
                              onChange={(e) => setTrackingSettings(prev => ({ ...prev, metaPixelId: e.target.value }))}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-sky-600 bg-transparent border-inherit font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">Meta Access Token</label>
                            <input 
                              type="text"
                              placeholder="EAAG..."
                              value={trackingSettings.metaAccessToken}
                              onChange={(e) => setTrackingSettings(prev => ({ ...prev, metaAccessToken: e.target.value }))}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-sky-600 bg-transparent border-inherit"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">Test Event Code</label>
                            <input 
                              type="text"
                              placeholder="TEST12345"
                              value={trackingSettings.metaTestEventCode}
                              onChange={(e) => setTrackingSettings(prev => ({ ...prev, metaTestEventCode: e.target.value }))}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-sky-600 bg-transparent border-inherit"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-inherit flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            disabled={isSavingTracking}
                            onClick={async () => {
                              setIsSavingTracking(true);
                              const success = await supabaseService.upsertTrackingSettings(trackingSettings);
                              setIsSavingTracking(false);
                              if (success) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `মেটা ট্র্যাকিং সেটিংস সংরক্ষিত`,
                                  message: `মেটা পিক্সেল আইডি "${trackingSettings.metaPixelId}" সফলভাবে সুপাবেজে আপসার্ট হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                                alert('Meta Server-Side Tracking সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
                              } else {
                                alert('সংরক্ষণ করতে সমস্যা হয়েছে!');
                              }
                            }}
                            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-[11px] font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>{isSavingTracking ? 'সংরক্ষণ হচ্ছে...' : 'মেটা পিক্সেল সেভ করুন (Save Meta Pixel)'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if ((window as any).fbq) {
                                (window as any).fbq('track', 'PageView');
                                alert('✅ টেস্ট ফেবু পিক্সেল Event ট্র্রিগার হয়েছে! FB Pixel Helper এক্সটেনশনে চেক করতে পারেন।');
                              } else {
                                alert('⚠️ ফেবু পিক্সেল এখনও ব্রাউজারে লোড হয়নি। Pixel ID সঠিক কিনা যাচাই করুন।');
                              }
                            }}
                            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                          >
                            <span>⚡ পিক্সেল টেস্ট করুন (Test Pixel Event)</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 🚀 Meta Facebook Carousel & Dynamic Catalog Ads Feed Section */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-5
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-inherit pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase">
                              Automated Dynamic Catalog Feed
                            </span>
                          </div>
                          <h3 className="text-sm font-extrabold text-sky-500 mt-1 flex items-center space-x-2">
                            <span>🛍️ ফেসবুক ক্যাটালগ ও প্রডাক্ট ক্যারোসল এডস (Meta Carousel Ads Feed)</span>
                          </h3>
                        </div>
                        <span className="text-[10px] font-bold opacity-60 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-xl border border-emerald-500/20 font-mono">
                          Auto-Sync Active ({products.length} Products)
                        </span>
                      </div>

                      <p className="text-[11px] opacity-75 leading-relaxed">
                        ফেসবুক এবং ইনস্টাগ্রাম কমার্স ম্যানেজারে (Meta Commerce Manager) এই ক্যাটালগ ফিল্ড ইউআরএল যোগ করলে আপনার সমস্ত প্রোডাক্ট অটোমেটিক ফেবু ক্যাটালগে সিঙ্ক হয়ে যাবে। এতে করে সহজেই ফেবু এডস ম্যানেজার থেকে <strong>Carousel Ads</strong> এবং <strong>Advantage+ Catalog Ads</strong> রান করতে পারবেন!
                      </p>

                      {/* Feed URLs Display */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* XML Feed URL */}
                        <div className="p-4 rounded-2xl bg-black/20 border border-inherit space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-sky-400 font-mono">XML Feed (Primary for Meta Catalog)</span>
                            <span className="text-[9px] opacity-50 font-mono">RSS 2.0 Standard</span>
                          </div>
                          <input 
                            type="text" 
                            readOnly 
                            value={`${window.location.origin}/api/catalog.xml`}
                            className="w-full p-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-neutral-300 focus:outline-none"
                          />
                          <div className="flex items-center space-x-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/api/catalog.xml`);
                                alert('📋 XML ক্যাটালগ লিংক ক্লিপবোর্ডে কপি হয়েছে!');
                              }}
                              className="flex-1 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-[10px] font-extrabold transition-all cursor-pointer"
                            >
                              📋 XML Feed Link কপি করুন
                            </button>
                            <a 
                              href="/api/catalog.xml" 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600 rounded-lg text-[10px] font-extrabold transition-all"
                            >
                              👁️ Live Feed দেখুন
                            </a>
                          </div>
                        </div>

                        {/* CSV Feed URL */}
                        <div className="p-4 rounded-2xl bg-black/20 border border-inherit space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-400 font-mono">CSV Feed (Alternative Format)</span>
                            <span className="text-[9px] opacity-50 font-mono">Comma Separated</span>
                          </div>
                          <input 
                            type="text" 
                            readOnly 
                            value={`${window.location.origin}/api/catalog.csv`}
                            className="w-full p-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-neutral-300 focus:outline-none"
                          />
                          <div className="flex items-center space-x-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/api/catalog.csv`);
                                alert('📋 CSV ক্যাটালগ লিংক ক্লিপবোর্ডে কপি হয়েছে!');
                              }}
                              className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-extrabold transition-all cursor-pointer"
                            >
                              📋 CSV Feed Link কপি করুন
                            </button>
                            <a 
                              href="/api/catalog.csv" 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600 rounded-lg text-[10px] font-extrabold transition-all"
                            >
                              ⬇️ CSV ডাওনলোড করুন
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Step by step guide for Meta Ads in Bengali */}
                      <div className="pt-4 border-t border-inherit space-y-3">
                        <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                          <span>📖 কীভাবে মেটা (Facebook) অ্যাডস ম্যানেজার এ ক্যারোসল এডস রান করবেন:</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1.5">
                            <div className="flex items-center space-x-1.5 text-sky-400 font-bold">
                              <span className="h-5 w-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-mono">1</span>
                              <span>Meta Commerce Manager</span>
                            </div>
                            <p className="text-[10px] opacity-70 leading-normal">
                              business.facebook.com-এ গিয়ে Commerce Manager সিলেক্ট করে Add Catalog-এ ক্লিক করুন।
                            </p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1.5">
                            <div className="flex items-center space-x-1.5 text-sky-400 font-bold">
                              <span className="h-5 w-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-mono">2</span>
                              <span>Data Feed Link পেস্ট</span>
                            </div>
                            <p className="text-[10px] opacity-70 leading-normal">
                              Data Sources &gt; Data Feed সিলেক্ট করে উপরের <strong>XML Link</strong>-টি পেস্ট করুন এবং Schedule (Hourly/Daily) সেট করুন।
                            </p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1.5">
                            <div className="flex items-center space-x-1.5 text-sky-400 font-bold">
                              <span className="h-5 w-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-mono">3</span>
                              <span>Create Campaign</span>
                            </div>
                            <p className="text-[10px] opacity-70 leading-normal">
                              Ads Manager-এ গিয়ে Sales Campaign সিলেক্ট করুন এবং Creative Type-এ <strong>Carousel</strong> অথবা <strong>Advantage+ Catalog</strong> বাছুন।
                            </p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1.5">
                            <div className="flex items-center space-x-1.5 text-sky-400 font-bold">
                              <span className="h-5 w-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-mono">4</span>
                              <span>Direct Product Order</span>
                            </div>
                            <p className="text-[10px] opacity-70 leading-normal">
                              কাস্টমার ক্যারোসল কার্ডে ক্লিক করলেই সরাসরি ওয়েবসাইটের নির্দিষ্ট প্রডাক্ট পেজে চলে আসবে এবং অর্ডার প্লেস করতে পারবে!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'tiktok_tracking' && (
                  <div className="animate-fade-in duration-300">
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <Code className="h-4.5 w-4.5 text-zinc-500" />
                        <span>🖤 TikTok Server-Side Tracking সেটিংস</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <p className="text-[11px] opacity-70 leading-relaxed">
                          টিকটক পিক্সেল এবং ইভেন্টস এপিআই (TikTok Events API) অ্যাক্সেস টোকেন ইন্টিগ্রেশন করে কাস্টম ইভেন্ট এবং ফানেল ট্র্যাকিং পরিচালনা করুন।
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">TikTok Pixel ID</label>
                            <input 
                              type="text"
                              placeholder="e.g. CXXXXXXXXXXXXXX"
                              value={trackingSettings.tiktokPixelId}
                              onChange={(e) => setTrackingSettings(prev => ({ ...prev, tiktokPixelId: e.target.value }))}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-zinc-500 bg-transparent border-inherit font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">TikTok Events API Access Token</label>
                            <input 
                              type="text"
                              placeholder="TikTok Token"
                              value={trackingSettings.tiktokAccessToken}
                              onChange={(e) => setTrackingSettings(prev => ({ ...prev, tiktokAccessToken: e.target.value }))}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-zinc-500 bg-transparent border-inherit"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-inherit">
                          <button
                            type="button"
                            disabled={isSavingTracking}
                            onClick={async () => {
                              setIsSavingTracking(true);
                              const success = await supabaseService.upsertTrackingSettings(trackingSettings);
                              setIsSavingTracking(false);
                              if (success) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `টিকটক ট্র্যাকিং সেটিংস সংরক্ষিত`,
                                  message: `টিকটক পিক্সেল আইডি "${trackingSettings.tiktokPixelId}" সফলভাবে সুপাবেজে আপসার্ট হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                                alert('TikTok Server-Side Tracking সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
                              } else {
                                alert('সংরক্ষণ করতে সমস্যা হয়েছে!');
                              }
                            }}
                            className="w-full sm:w-auto px-6 py-2.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl text-[11px] font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md border border-neutral-700"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>{isSavingTracking ? 'সংরক্ষণ হচ্ছে...' : 'টিকটক সেটিংস সংরক্ষণ করুন (Save TikTok)'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'ga4' && (
                  <div className="animate-fade-in duration-300">
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                        <PieChart className="h-4.5 w-4.5 text-amber-500" />
                        <span>📈 Google Analytics (GA4) Tracking সেটিংস</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <p className="text-[11px] opacity-70 leading-relaxed">
                          গুগল অ্যানালিটিক্স ৪ (GA4) এর মাধ্যমে আপনার স্টোরের রিয়েল-টাইম ভিজিটর ট্রাফিক, বাউন্স রেট এবং কাস্টমার সেলস ফানেল ট্র্যাক করুন।
                        </p>
                        
                        <div>
                          <label className="block text-[10px] font-bold opacity-75 mb-1.5">Google Tag ID (e.g. G-XXXXXX)</label>
                          <input 
                            type="text"
                            placeholder="G-XXXXXX"
                            value={trackingSettings.googleAnalyticsId}
                            onChange={(e) => setTrackingSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                            className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-transparent border-inherit font-bold"
                          />
                        </div>

                        <div className="pt-3 border-t border-inherit">
                          <button
                            type="button"
                            disabled={isSavingTracking}
                            onClick={async () => {
                              setIsSavingTracking(true);
                              const success = await supabaseService.upsertTrackingSettings(trackingSettings);
                              setIsSavingTracking(false);
                              if (success) {
                                const newNotif = {
                                  id: `notif-${Date.now()}`,
                                  title: `GA4 ট্র্যাকিং সেটিংস সংরক্ষিত`,
                                  message: `গুগল অ্যানালিটিক্স ৪ ট্যাগ আইডি "${trackingSettings.googleAnalyticsId}" সফলভাবে সুপাবেজে সংরক্ষিত হয়েছে।`,
                                  timestamp: new Date().toISOString(),
                                  read: false
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                                alert('Google Analytics (GA4) সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
                              } else {
                                alert('সংরক্ষণ করতে সমস্যা হয়েছে!');
                              }
                            }}
                            className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[11px] font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>{isSavingTracking ? 'সংরক্ষণ হচ্ছে...' : 'GA4 সেটিংস সংরক্ষণ করুন (Save GA4)'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'database' && (
                  <div className="animate-fade-in duration-300 space-y-6">
                    {/* Header Banner */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-inherit pb-4">
                        <div className="space-y-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase inline-block">
                            Multi-Tenant Store Data Isolation & Security
                          </span>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                            <div className="flex items-center space-x-2">
                              <Database className="h-5 w-5 text-violet-500 shrink-0" />
                              <h3 className="text-base font-black text-violet-500">
                                🔒 সুপাবেজ ডাটাবেজ ও মাল্টি-স্টোর আইসোলেশন
                              </h3>
                            </div>
                            <span className="text-xs font-bold text-violet-400/80 font-mono">
                              (Store Data Separation)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-violet-500/10 px-3 py-1.5 rounded-xl border border-violet-500/20 text-[10px] font-mono font-extrabold text-violet-400 shrink-0 self-start md:self-center">
                          <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                          <span>Active Tenant ID: {storeTenantId || (autoDomainIsolation ? (customDomainOverride.trim() || window.location.hostname).replace(/[^a-zA-Z0-9]/g, '_') : 'default_store')}</span>
                        </div>
                      </div>

                      <p className="text-[11px] opacity-75 leading-relaxed">
                        ভার্চুয়েল (Vercel) বা যেকোনো হোস্টাডে থাকা আপনার সমস্ত ওয়েবসাইটের কাস্টমার, অর্ডার এবং প্রোডাক্টের ডাটা যেন কোনোভাবেই একটি অন্যটার সাথে মিক্সড না হয়, তা নিশ্চিত করার জন্য এখানে কাস্টম সুপাবেজ ক্রেডেনশিয়াল বা মাল্টি-টেন্যান্ট স্টোর আইডি সিলেক্ট করুন।
                      </p>

                      {/* 3 Solutions for Isolation */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-black/20 border border-inherit space-y-1.5">
                          <div className="flex items-center space-x-2 text-violet-400 font-bold text-xs">
                            <Key className="h-4 w-4" />
                            <span>১. আলাদা সুপাবেজ প্রজেক্ট</span>
                          </div>
                          <p className="text-[10px] opacity-70 leading-normal">
                            প্রতিটি Vercel স্টোরের জন্য সম্পূর্ণ পৃথক Supabase Database Project URL এবং Key ব্যবহার করা (সর্বোত্তম সিকিউরিটি)।
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-black/20 border border-inherit space-y-1.5">
                          <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs">
                            <Layers className="h-4 w-4" />
                            <span>২. ইউনিক স্টোর আইডি (Store ID)</span>
                          </div>
                          <p className="text-[10px] opacity-70 leading-normal">
                            একই সুপাবেজ ডাটাবেজ হলেও প্রতিটি Vercel সাইটের জন্য আলাদা Store Tenant Key সেট করে ডাটা ফিল্টার রাখা।
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-black/20 border border-inherit space-y-1.5">
                          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                            <Cpu className="h-4 w-4" />
                            <span>৩. অটো ডোমেন আইসোলেশন</span>
                          </div>
                          <p className="text-[10px] opacity-70 leading-normal">
                            আপনার ওয়েবসাইটের ডোমেন নেম (যেমন: trendzone.vercel.app) অনুসারে স্বয়ংক্রিয়ভাবে ক্যাশ ও ডাটা ফিল্টার করা।
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Custom Supabase Credentials Card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <div className="pb-3 border-b border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <Key className="h-4.5 w-4.5 text-violet-500 shrink-0" />
                          <h3 className="text-sm font-extrabold text-neutral-800 dark:text-neutral-100">
                            ১. কাস্টম সুপাবেজ কানেকশন সেটিংস
                          </h3>
                        </div>
                        <span className="text-[11px] font-semibold text-violet-400/90 font-mono">
                          (Custom Supabase Keys per Vercel Store)
                        </span>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">Supabase Project URL</label>
                            <input 
                              type="text"
                              placeholder="https://ytwgoolesgnkegeykpup.supabase.co"
                              value={customSupabaseUrl}
                              onChange={(e) => setCustomSupabaseUrl(e.target.value)}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 bg-transparent border-inherit font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">Supabase Anon/Publishable Key</label>
                            <input 
                              type="password"
                              placeholder="sb_publishable_..."
                              value={customSupabaseKey}
                              onChange={(e) => setCustomSupabaseKey(e.target.value)}
                              className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 bg-transparent border-inherit font-mono"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-3 mt-1 border-t border-inherit/40">
                          <button
                            type="button"
                            onClick={() => {
                              if (customSupabaseUrl.trim()) {
                                localStorage.setItem('aura_custom_supabase_url', customSupabaseUrl.trim());
                              } else {
                                localStorage.removeItem('aura_custom_supabase_url');
                              }
                              if (customSupabaseKey.trim()) {
                                localStorage.setItem('aura_custom_supabase_key', customSupabaseKey.trim());
                              } else {
                                localStorage.removeItem('aura_custom_supabase_key');
                              }
                              alert('✅ সুপাবেজ কানেকশন কী সংরক্ষিত হয়েছে! পরিবর্তনের জন্য পেজ রিফ্রেশ হচ্ছে...');
                              window.location.reload();
                            }}
                            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-[11px] font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-md"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>সেভ করুন (Save Supabase Keys)</span>
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              setDbPingStatus({ testing: true });
                              try {
                                const prods = await supabaseService.getProducts([]);
                                setDbPingStatus({
                                  testing: false,
                                  success: true,
                                  message: 'সুপাবেজ ক্লাউড ডাটাবেজের সাথে কানেকশন ১০০% সচল রয়েছে!',
                                  count: prods.length
                                });
                              } catch (err: any) {
                                setDbPingStatus({
                                  testing: false,
                                  success: false,
                                  message: 'কানেকশন টেস্ট ব্যর্থ হয়েছে: ' + (err.message || String(err))
                                });
                              }
                            }}
                            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                          >
                            <Activity className="h-3.5 w-3.5 text-emerald-400" />
                            <span>{dbPingStatus?.testing ? 'টেস্ট হচ্ছে...' : '🔌 কানেকশন পিং টেস্ট করুন (Test Database Ping)'}</span>
                          </button>

                          {(customSupabaseUrl || customSupabaseKey) && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('ডিফল্ট সুপাবেজ প্রকল্পে ফিরে যেতে চান?')) {
                                  localStorage.removeItem('aura_custom_supabase_url');
                                  localStorage.removeItem('aura_custom_supabase_key');
                                  setCustomSupabaseUrl('');
                                  setCustomSupabaseKey('');
                                  alert('ডিফল্ট সুপাবেজ প্রজেক্টে ফিরে যাওয়া হয়েছে!');
                                  window.location.reload();
                                }
                              }}
                              className="px-4 py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl text-[11px] font-bold transition-all cursor-pointer"
                            >
                              <span>ডিফল্ট রিস্টোর (Reset to Default)</span>
                            </button>
                          )}
                        </div>

                        {/* Test Result Message Box */}
                        {dbPingStatus && !dbPingStatus.testing && (
                          <div className={`p-4 mt-3 rounded-2xl border text-xs font-bold transition-all animate-fade-in
                            ${dbPingStatus.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}
                          >
                            <div className="flex items-center space-x-2">
                              {dbPingStatus.success ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> : <XCircle className="h-4 w-4 shrink-0 text-rose-400" />}
                              <span>{dbPingStatus.message}</span>
                            </div>
                            {dbPingStatus.success && dbPingStatus.count !== undefined && (
                              <p className="text-[10px] opacity-80 mt-1 font-mono">
                                অনলাইন ক্যাটালগে মোট {dbPingStatus.count} টি প্রোডাক্ট লোড করা সম্ভব হয়েছে।
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 2. Tenant / Store ID Card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <div className="pb-3 border-b border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <Layers className="h-4.5 w-4.5 text-sky-400 shrink-0" />
                          <h3 className="text-sm font-extrabold text-neutral-800 dark:text-neutral-100">
                            ২. মাল্টি-স্টোর আইসোলেশন ও টেন্যান্ট আইডি
                          </h3>
                        </div>
                        <span className="text-[11px] font-semibold text-sky-400/90 font-mono">
                          (Store Tenant Key)
                        </span>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold opacity-75 mb-1.5">Custom Store Identifier (যেমন: store_01, client_fashion_bd)</label>
                          <input 
                            type="text"
                            placeholder="e.g. trendzone_store_01"
                            value={storeTenantId}
                            onChange={(e) => setStoreTenantId(e.target.value)}
                            className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-transparent border-inherit font-mono"
                          />
                          <p className="text-[10px] opacity-60 mt-1.5">
                            একই সুপাবেজ ডাটাবেজ ব্যবহার করা একাধিক ওয়েবসাইটের ডাটা আলাদা রাখার জন্য অনন্য স্টোর আইডেন্টিফায়ার ব্যবহার করুন।
                          </p>
                        </div>

                        <div className="pt-2 border-t border-inherit/40">
                          <button
                            type="button"
                            onClick={() => {
                              if (storeTenantId.trim()) {
                                localStorage.setItem('aura_store_tenant_id', storeTenantId.trim());
                              } else {
                                localStorage.removeItem('aura_store_tenant_id');
                              }
                              alert('✅ স্টোর টেন্যান্ট আইডি সংরক্ষিত হয়েছে!');
                            }}
                            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-md"
                          >
                            সেভ করুন (Save Tenant Key)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 3. Auto Domain Tenant Isolation Card */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-4
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <div className="pb-3 border-b border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <Cpu className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                          <h3 className="text-sm font-extrabold text-neutral-800 dark:text-neutral-100">
                            ৩. অটো ডোমেন আইসোলেশন সেটিংস
                          </h3>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-400/90 font-mono">
                          (Auto Domain Isolation)
                        </span>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div className="p-4 bg-black/20 rounded-2xl border border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className={`h-2.5 w-2.5 rounded-full ${autoDomainIsolation ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
                              <p className="text-xs font-bold text-neutral-200">
                                Automatic Domain-Based Isolation: {autoDomainIsolation ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Disabled)'}
                              </p>
                            </div>
                            <p className="text-[10px] opacity-70 leading-relaxed">
                              স্বয়ংক্রিয়ভাবে আপনার ওয়েবসাইটের Vercel ডোমেন অনুযায়ী (যেমন: <code className="text-emerald-400 font-mono">{(customDomainOverride.trim() || window.location.hostname)}</code>) ক্যাশ, লোকাল স্টোরেজ এবং ব্রাউজার ফিল্টার আইসোলেট রাখুন।
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const nextVal = !autoDomainIsolation;
                              setAutoDomainIsolation(nextVal);
                              localStorage.setItem('aura_auto_domain_isolation', String(nextVal));
                            }}
                            className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer shrink-0
                              ${autoDomainIsolation ? 'bg-emerald-500' : 'bg-neutral-700'}`}
                          >
                            <div className={`w-5.5 h-5.5 rounded-full bg-white transition-transform duration-300 shadow-md
                              ${autoDomainIsolation ? 'translate-x-5.5' : 'translate-x-0'}`} 
                            />
                          </button>
                        </div>

                        {/* Custom Domain Override Input Box */}
                        <div className="pt-2 border-t border-inherit/40 space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold opacity-75 mb-1.5">
                              কাস্টম ডোমেন নেম (Custom Domain Override)
                            </label>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                              <input 
                                type="text"
                                placeholder="e.g. trendzone.com or mybrand.vercel.app"
                                value={customDomainOverride}
                                onChange={(e) => setCustomDomainOverride(e.target.value)}
                                className="flex-1 p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-transparent border-inherit font-mono"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (customDomainOverride.trim()) {
                                    localStorage.setItem('aura_custom_domain_override', customDomainOverride.trim());
                                  } else {
                                    localStorage.removeItem('aura_custom_domain_override');
                                  }
                                  alert('✅ কাস্টম ডোমেন নেম সংরক্ষিত হয়েছে!');
                                }}
                                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-md shrink-0"
                              >
                                কাস্টম ডোমেন সেভ করুন (Save Custom Domain)
                              </button>
                            </div>
                            <p className="text-[10px] opacity-60 mt-1.5">
                              নির্দিষ্ট কোনো কাস্টম ডোমেন লিখলে অটোমেটিক হোস্টনেমের বদলে সেটিই ডাটাবেজ আইসোলেশনে ব্যবহৃত হবে।
                            </p>
                          </div>
                        </div>

                        <div className="text-[10px] opacity-60 font-mono px-1 flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                          <span>System Detected Hostname: <span className="text-emerald-400">{window.location.hostname}</span></span>
                          <span>|</span>
                          <span>Active Domain Key: <span className="text-emerald-400 font-bold">{(customDomainOverride.trim() || window.location.hostname).replace(/[^a-zA-Z0-9]/g, '_')}</span></span>
                        </div>
                      </div>
                    </div>

                    {/* SQL Instructions Card for Shared Supabase Multi-Tenancy */}
                    <div className={`p-6 rounded-[2.5rem] border space-y-3
                      ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                    >
                      <div className="pb-3 border-b border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2 text-amber-400">
                          <Code className="h-4.5 w-4.5 shrink-0" />
                          <h3 className="text-sm font-extrabold">
                            📋 একই ডাটাবেজে একাধিক স্টোর রাখার জন্য Supabase SQL Script
                          </h3>
                        </div>
                        <span className="text-[11px] font-semibold text-amber-400/80 font-mono">
                          (Multi-Tenant RLS)
                        </span>
                      </div>

                      <p className="text-[11px] opacity-75 leading-relaxed pt-1">
                        আপনি যদি একটিই Supabase প্রজেক্টে একাধিক Vercel ওয়েবসাইট কানেক্ট করতে চান, তবে Supabase SQL Editor এ গিয়ে নিচের ক্যোয়ারিটি রান করুন। এতে প্রতি স্টোরের জন্য <code>store_id</code> কলাম তৈরি হয়ে তথ্য আলাদা থাকবে:
                      </p>

                      <div className="relative p-4 mt-2 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs text-amber-300 space-y-1">
                        <p>-- 1. Add store_id column to tables</p>
                        <p>ALTER TABLE products ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT &apos;default_store&apos;;</p>
                        <p>ALTER TABLE orders ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT &apos;default_store&apos;;</p>
                        <p>ALTER TABLE system_settings ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT &apos;default_store&apos;;</p>
                        <p>ALTER TABLE customers ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT &apos;default_store&apos;;</p>
                        <p className="pt-1">-- 2. Index store_id for maximum speed</p>
                        <p>CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);</p>
                        <p>CREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);</p>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              const sql = `ALTER TABLE products ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'default_store';\nALTER TABLE orders ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'default_store';\nALTER TABLE system_settings ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'default_store';\nALTER TABLE customers ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'default_store';\nCREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);\nCREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);`;
                              navigator.clipboard.writeText(sql);
                              alert('📋 SQL কোড ক্লিপবোর্ডে কপি হয়েছে! Supabase SQL Editor এ পেস্ট করে Run দিন।');
                            }}
                            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-[10px] font-extrabold transition-all cursor-pointer shadow-sm"
                          >
                            📋 SQL Code কপি করুন
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Supabase Integration Card (Full width under the grid) */}
              {activeSettingsTab === 'grid' && (
                <div className={`p-6 mt-6 rounded-[2.5rem] border space-y-4 lg:col-span-12
                ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
              >
                <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4.5 w-4.5 text-teal-500" />
                    <span>৫. সুপাবেজ রিয়েল-টাইম ডাটাবেজ এক্সেস ও সিঙ্ক (Supabase Connection Panel)</span>
                  </div>
                  
                  {/* Connection status badge */}
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 
                        ${supabaseStatus.connected && supabaseStatus.schemaCreated ? 'bg-emerald-400' : supabaseStatus.connected ? 'bg-amber-400' : 'bg-rose-400'}`}
                      />
                      <span className={`relative inline-flex rounded-full h-2 w-2 
                        ${supabaseStatus.connected && supabaseStatus.schemaCreated ? 'bg-emerald-500' : supabaseStatus.connected ? 'bg-amber-500' : 'bg-rose-500'}`}
                      />
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider
                      ${supabaseStatus.connected && supabaseStatus.schemaCreated ? 'text-emerald-500' : supabaseStatus.connected ? 'text-amber-500' : 'text-rose-500'}`}
                    >
                      {supabaseStatus.connected && supabaseStatus.schemaCreated && 'সংযুক্ত ও রিয়েল-টাইম অ্যাক্টিভ'}
                      {supabaseStatus.connected && !supabaseStatus.schemaCreated && 'সংযুক্ত (টেবিল তৈরি প্রয়োজন)'}
                      {!supabaseStatus.connected && 'অফলাইন / কানেকশন ব্যর্থ'}
                    </span>
                  </div>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                  {/* Connection details & credentials */}
                  <div className="md:col-span-5 space-y-3">
                    <p className="opacity-80 leading-relaxed text-[11px]">
                      সুপাবেজ (Supabase) ডেটাবেজ সংযোগ সক্রিয় আছে। কাস্টমার অর্ডার করা মাত্র বা প্রোডাক্ট আপডেট করা মাত্র রিয়েল-টাইমে ডাটা রিড ও রাইট করা হচ্ছে।
                    </p>

                    <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-white/5 space-y-2 text-[10px] font-mono leading-tight border border-inherit">
                      <div>
                        <span className="opacity-50 block text-[9px] uppercase font-sans font-bold">Project URL</span>
                        <span className="text-[#e07a5f] break-all">https://ytwgoolesgnkegeykpup.supabase.co</span>
                      </div>
                      <div className="pt-2 border-t border-inherit">
                        <span className="opacity-50 block text-[9px] uppercase font-sans font-bold">Anon Publishable Key</span>
                        <span className="opacity-80 break-all select-all">sb_publishable_9Xwy1UomtTTsk-hogHBCaw_7_0Z4FyS</span>
                      </div>
                    </div>

                    {/* Real-time explanation */}
                    <div className="p-3.5 rounded-2xl bg-teal-500/5 border border-teal-500/10 text-[10px] leading-normal text-teal-600 dark:text-teal-400">
                      <p className="font-bold flex items-center space-x-1 mb-0.5">
                        <Sparkles className="h-3 w-3" />
                        <span>রিয়েল-টাইম ডাবল-বাইন্ডিং সিঙ্ক অ্যাক্টিভ:</span>
                      </p>
                      ড্যাশবোর্ডে প্রোডাক্ট বা অর্ডার পরিবর্তন হলে তা সরাসরি সুপাবেজে আপডেট হয়। আবার সুপাবেজ ডেটাবেজে কোনো পরিবর্তন হলে ড্যাশবোর্ড স্ক্রিন রিয়েল-টাইমে আপডেট গ্রহণ করে!
                    </div>
                  </div>

                  {/* SQL Setup instructions */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold opacity-75 uppercase">১ম этап: সুপাবেজে টেবিল তৈরি করার নির্দেশিকা</span>
                      <span className="text-[9px] opacity-50 font-mono">PostgreSQL Database Schema</span>
                    </div>

                    <details className="border border-inherit rounded-2xl overflow-hidden bg-neutral-50 dark:bg-transparent">
                      <summary className="p-3 font-bold cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/5 flex items-center justify-between select-none">
                        <span>পদ্ধতি এবং SQL কোড দেখুন (Show SQL Schema)</span>
                        <span className="text-[10px] px-2 py-0.5 bg-neutral-200 dark:bg-white/10 rounded font-normal text-xs font-sans">ক্লিক করুন</span>
                      </summary>
                      <div className="p-3 border-t border-inherit space-y-2">
                        <p className="text-[10px] opacity-75 leading-relaxed">
                          আপনার সুপাবেজ ড্যাশবোর্ডের <strong className="font-bold">SQL Editor</strong>-এ গিয়ে নিচের কোডটি পেস্ট করে রান (Run) করলেই প্রয়োজনীয় সব টেবিল স্বয়ংক্রিয়ভাবে তৈরি হয়ে যাবে:
                        </p>
                        <div className="relative">
                          <pre className="p-3 rounded-xl bg-black text-emerald-400 font-mono text-[9px] leading-tight overflow-x-auto max-h-48">
{`-- ১. Products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  stock INT NOT NULL,
  category TEXT,
  sales_count INT DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  image TEXT,
  sizes JSONB,
  colors JSONB,
  fabric TEXT,
  collection TEXT,
  sku TEXT,
  is_new_arrival BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_limited_edition BOOLEAN DEFAULT false,
  size_stock JSONB,
  color_stock JSONB,
  season TEXT,
  brand TEXT,
  product_cost NUMERIC,
  delivery_cost NUMERIC,
  discount NUMERIC DEFAULT 0,
  marketing_cost NUMERIC,
  video_url TEXT
);

-- ২. Orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  customer_address TEXT,
  date TEXT,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL,
  payment_method TEXT,
  payment_status TEXT,
  timeline JSONB,
  internal_notes TEXT
);

-- ৩. Customers
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  avatar TEXT,
  join_date TEXT,
  total_spending NUMERIC DEFAULT 0,
  orders_count INT DEFAULT 0,
  segment TEXT,
  activity_timeline JSONB,
  gender TEXT,
  birthday TEXT,
  preferred_size TEXT,
  favorite_color TEXT,
  favorite_category TEXT,
  last_purchase_date TEXT,
  average_order_value NUMERIC,
  marketing_tags JSONB,
  shirt_size TEXT,
  pant_size TEXT,
  shoe_size TEXT,
  size_history JSONB,
  customer_value_score NUMERIC,
  buying_pattern_analysis TEXT,
  next_purchase_prediction TEXT,
  membership_tier TEXT,
  reward_points INT DEFAULT 0
);

-- ৪. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  read BOOLEAN DEFAULT false
);

-- ৫. System Settings
CREATE TABLE IF NOT EXISTS system_settings (
  id TEXT PRIMARY KEY,
  currency TEXT,
  tax_rate NUMERIC,
  low_stock_limit INT,
  eye_protection_enabled BOOLEAN,
  blue_light_filter_level INT,
  theme_mode TEXT,
  brand_name TEXT,
  brand_logo TEXT,
  tagline TEXT
);

-- ৬. Collections Data
CREATE TABLE IF NOT EXISTS collections_data (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  season TEXT,
  status TEXT,
  sales NUMERIC,
  profit NUMERIC,
  items_count INT DEFAULT 0
);

-- ৭. Returns Data
CREATE TABLE IF NOT EXISTS returns_data (
  id TEXT PRIMARY KEY,
  customer_name TEXT,
  phone TEXT,
  product_name TEXT,
  reason TEXT,
  refund_amount NUMERIC,
  date TEXT,
  status TEXT
);

-- ৮. Staff Data
CREATE TABLE IF NOT EXISTS staff_data (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  status TEXT,
  permissions TEXT
);

-- ৯. Categories List
CREATE TABLE IF NOT EXISTS categories_list (
  name TEXT PRIMARY KEY
);

-- ১০. Brands List
CREATE TABLE IF NOT EXISTS brands_list (
  name TEXT PRIMARY KEY
);

-- ১১. Collections List
CREATE TABLE IF NOT EXISTS collections_list (
  name TEXT PRIMARY KEY
);

-- ১২. Homepage Settings (Hero Banner)
CREATE TABLE IF NOT EXISTS homepage_settings (
  id TEXT PRIMARY KEY,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_description TEXT,
  hero_image_url TEXT
);`}
                          </pre>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(`CREATE TABLE IF NOT EXISTS products ( id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT, price NUMERIC NOT NULL, original_price NUMERIC, stock INT NOT NULL, category TEXT, sales_count INT DEFAULT 0, rating NUMERIC DEFAULT 0, image TEXT, sizes JSONB, colors JSONB, fabric TEXT, collection TEXT, sku TEXT, is_new_arrival BOOLEAN DEFAULT false, is_best_seller BOOLEAN DEFAULT false, is_limited_edition BOOLEAN DEFAULT false, size_stock JSONB, color_stock JSONB, season TEXT, brand TEXT, product_cost NUMERIC, delivery_cost NUMERIC, discount NUMERIC DEFAULT 0, marketing_cost NUMERIC, video_url TEXT ); CREATE TABLE IF NOT EXISTS orders ( id TEXT PRIMARY KEY, customer_name TEXT NOT NULL, customer_email TEXT, customer_phone TEXT, customer_address TEXT, date TEXT, items JSONB NOT NULL, total NUMERIC NOT NULL, status TEXT NOT NULL, payment_method TEXT, payment_status TEXT, timeline JSONB, internal_notes TEXT ); CREATE TABLE IF NOT EXISTS customers ( id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE, phone TEXT, address TEXT, avatar TEXT, join_date TEXT, total_spending NUMERIC DEFAULT 0, orders_count INT DEFAULT 0, segment TEXT, activity_timeline JSONB, gender TEXT, birthday TEXT, preferred_size TEXT, favorite_color TEXT, favorite_category TEXT, last_purchase_date TEXT, average_order_value NUMERIC, marketing_tags JSONB, shirt_size TEXT, pant_size TEXT, shoe_size TEXT, size_history JSONB, customer_value_score NUMERIC, buying_pattern_analysis TEXT, next_purchase_prediction TEXT, membership_tier TEXT, reward_points INT DEFAULT 0 ); CREATE TABLE IF NOT EXISTS notifications ( id TEXT PRIMARY KEY, title TEXT NOT NULL, message TEXT NOT NULL, type TEXT NOT NULL, timestamp TEXT NOT NULL, read BOOLEAN DEFAULT false ); CREATE TABLE IF NOT EXISTS system_settings ( id TEXT PRIMARY KEY, currency TEXT, tax_rate NUMERIC, low_stock_limit INT, eye_protection_enabled BOOLEAN, blue_light_filter_level INT, theme_mode TEXT, brand_name TEXT, brand_logo TEXT, tagline TEXT ); CREATE TABLE IF NOT EXISTS collections_data ( id TEXT PRIMARY KEY, name TEXT NOT NULL, season TEXT, status TEXT, sales NUMERIC, profit NUMERIC, items_count INT DEFAULT 0 ); CREATE TABLE IF NOT EXISTS returns_data ( id TEXT PRIMARY KEY, customer_name TEXT, phone TEXT, product_name TEXT, reason TEXT, refund_amount NUMERIC, date TEXT, status TEXT ); CREATE TABLE IF NOT EXISTS staff_data ( email TEXT PRIMARY KEY, name TEXT NOT NULL, role TEXT, status TEXT, permissions TEXT ); CREATE TABLE IF NOT EXISTS categories_list ( name TEXT PRIMARY KEY ); CREATE TABLE IF NOT EXISTS brands_list ( name TEXT PRIMARY KEY ); CREATE TABLE IF NOT EXISTS collections_list ( name TEXT PRIMARY KEY ); CREATE TABLE IF NOT EXISTS homepage_settings ( id TEXT PRIMARY KEY, hero_title TEXT, hero_subtitle TEXT, hero_description TEXT, hero_image_url TEXT );`);
                              alert('SQL কোড ক্লিপবোর্ডে কপি হয়েছে!');
                            }}
                            className="absolute top-2 right-2 px-2.5 py-1.5 bg-neutral-800 text-[10px] text-white hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700 font-sans"
                          >
                            কপি করুন
                          </button>
                        </div>
                      </div>
                    </details>

                    <div className="pt-2 space-y-3">
                      <span className="text-[10px] font-bold opacity-75 uppercase block font-sans">২য় этап: টেবিল তৈরি শেষে ডাটা দিয়ে সুপাবেজ সিড করুন</span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={handleSeedSupabase}
                          disabled={isSeeding}
                          className={`px-5 py-2.5 font-bold rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg shadow-orange-500/5 font-sans
                            ${isSeeding ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
                        >
                          <RefreshCcw className={`h-4 w-4 ${isSeeding ? 'animate-spin' : ''}`} />
                          <span>{isSeeding ? 'সিডিং হচ্ছে...' : 'Initialize Database (ডাটা সিড করুন)'}</span>
                        </button>
                        <p className="text-[10px] opacity-60 leading-tight">
                          টেবিলগুলো ডিক্লেয়ার করা হয়ে থাকলে এই বাটনটি ড্যাশবোর্ডের সব ক্যাটালগ এবং অর্ডার ক্লাউডে পুশ করবে।
                        </p>
                      </div>
                    </div>

                    {/* Seeding console logs */}
                    {seedingLogs.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-neutral-900 text-[10px] font-mono text-emerald-400 space-y-1.5 leading-tight max-h-40 overflow-y-auto border border-[#322822]/40">
                        {seedingLogs.map((log, i) => (
                          <p key={i}>{log}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            </div>
          )}

          {/* ==========================================================
              USER & STAFF ROLE MANAGEMENT
              ========================================================== */}
          {activeTab === 'user-management' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Header */}
              <div className="pb-4 border-b border-inherit">
                <span className="text-[10px] font-bold text-[#e07a5f] uppercase tracking-wider">Access Control Panel</span>
                <h1 className="text-2xl font-extrabold tracking-tight mt-0.5">ইউজার ম্যানেজমেন্ট ও রোলস (Staff Roles)</h1>
                <p className="text-xs opacity-60">ড্যাশবোর্ড ব্যবহারের জন্য অ্যাডমিন, শপ ম্যানেজার এবং সাপোর্ট টিমের রোল পারমিশন এবং সিকিউর এক্সেস কন্ট্রোল লিস্ট।</p>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Form column */}
                <div className="lg:col-span-4">
                  <div className={`p-6 rounded-[2.5rem] border space-y-4
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                      <UserCheck className="h-4.5 w-4.5 text-[#e07a5f]" />
                      <span>নতুনスタッフ সদস্য যোগ করুন (Invite)</span>
                    </h3>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const name = (target.elements.namedItem('st_name') as HTMLInputElement).value;
                        const email = (target.elements.namedItem('st_email') as HTMLInputElement).value;
                        const role = (target.elements.namedItem('st_role') as HTMLSelectElement).value;

                        let permissions = 'View only';
                        if (role === 'Admin') permissions = 'Full Access';
                        else if (role === 'Shop Manager') permissions = 'Orders & Inventory';
                        else if (role === 'Support Team') permissions = 'Customer CRM & Ticketing';
                        else if (role === 'Inventory Specialist') permissions = 'Stock Controls only';

                        const newStaff = { name, email, role, status: 'Active', permissions };
                        setStaffData(prev => [newStaff, ...prev]);
                        target.reset();

                        const notif = {
                          id: `notif-${Date.now()}`,
                          title: `স্টাফ সদস্য ইনভাইট করা হয়েছে`,
                          message: `${name} (${role}) কে সিকিউর লগইন লিংক সহ আমন্ত্রণ পাঠানো হয়েছে।`,
                          timestamp: new Date().toISOString(),
                          read: false
                        };
                        setNotifications(prev => [notif, ...prev]);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">স্টাফের নাম (Full Name)</label>
                        <input 
                          name="st_name"
                          type="text"
                          required
                          placeholder="যেমন: আরহান রহমান"
                          className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">ইমেইল ঠিকানা (Email Address)</label>
                        <input 
                          name="st_email"
                          type="email"
                          required
                          placeholder="যেমন: arhan@auralux.com"
                          className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">স্টাফের রোল (Dashboard Role)</label>
                        <select 
                          name="st_role"
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit
                            ${settings.themeMode === 'dark' ? 'bg-[#1a1614]' : 'bg-white'}`}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Shop Manager">Shop Manager</option>
                          <option value="Support Team">Support Team</option>
                          <option value="Inventory Specialist">Inventory Specialist</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/10 transition-all"
                      >
                        টিমে আমন্ত্রণ পাঠান
                      </button>
                    </form>
                  </div>
                </div>

                {/* Directory table */}
                <div className="lg:col-span-8">
                  <div className={`p-6 rounded-[2.5rem] border overflow-hidden
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-extrabold">স্টাফ ডিরেক্টরি ও পারমিশন ম্যাট্রিক্স (Staff Directory)</h3>
                      <span className="text-[10px] font-mono opacity-50">সক্রিয় স্টাফ: {staffData.length} জন</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-inherit opacity-60 text-[10px] uppercase font-bold">
                            <th className="py-3 px-3">টিম মেম্বার নাম ও ইমেইল</th>
                            <th className="py-3 px-3">রোল (Role)</th>
                            <th className="py-3 px-3">অনুমতিপত্র (Permissions)</th>
                            <th className="py-3 px-3">অবস্থা (Status)</th>
                            <th className="py-3 px-3 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-inherit/40 text-xs">
                          {staffData.map(s => (
                            <tr key={s.email} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3">
                                <p className="font-bold">{s.name}</p>
                                <p className="text-[10px] opacity-60 font-mono">{s.email}</p>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold
                                  ${s.role === 'Admin' ? 'bg-rose-500/10 text-rose-500' : ''}
                                  ${s.role === 'Shop Manager' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                                  ${s.role === 'Support Team' ? 'bg-indigo-500/10 text-indigo-500' : ''}
                                  ${s.role === 'Inventory Specialist' ? 'bg-amber-500/10 text-amber-500' : ''}`}
                                >
                                  {s.role}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-medium opacity-80">{s.permissions}</td>
                              <td className="py-3 px-3">
                                <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full text-[9px]">
                                  {s.status}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right">
                                {s.role !== 'Admin' ? (
                                  <button
                                    onClick={() => setStaffData(prev => prev.filter(item => item.email !== s.email))}
                                    className="p-1.5 hover:bg-rose-500/15 text-rose-500 rounded-lg transition-colors"
                                    title="Revoke Access"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                ) : (
                                  <span className="text-[9px] opacity-40 italic">সুরক্ষিত</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==========================================================
              SUPPORT INTERACTIVE HELPDESK
              ========================================================== */}
          {activeTab === 'support' && (
            <div className="space-y-6 animate-fade-in text-xs">
              {/* Header */}
              <div className="pb-4 border-b border-inherit">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Aura Systems Helpdesk</span>
                <h1 className="text-2xl font-extrabold tracking-tight mt-0.5">গ্রাহক ও সিস্টেম সাপোর্ট ডেস্ক (Support Tickets)</h1>
                <p className="text-xs opacity-60">ওউ-কমার্স প্লাগইন, এআই মডেল এলার্ট বা অন্য যেকোনো জটিল প্রযুক্তিগত বিষয়ে অফিশিয়াল সাপোর্ট টিকেট ইন্টিগ্রেশন লেয়ার।</p>
              </div>

              {/* Grid panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left ticket form */}
                <div className="lg:col-span-4">
                  <div className={`p-6 rounded-[2.5rem] border space-y-4
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <h3 className="text-sm font-extrabold pb-2 border-b border-inherit flex items-center space-x-2">
                      <HelpCircle className="h-4.5 w-4.5 text-indigo-500" />
                      <span>নতুন সাপোর্ট টিকেট খুলুন (New Ticket)</span>
                    </h3>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const subject = (target.elements.namedItem('tk_subj') as HTMLInputElement).value;
                        const category = (target.elements.namedItem('tk_cat') as HTMLSelectElement).value;
                        const priority = (target.elements.namedItem('tk_prio') as HTMLSelectElement).value;

                        const newTicket = {
                          id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
                          subject,
                          category,
                          priority,
                          status: 'Open',
                          date: new Date().toISOString().split('T')[0]
                        };

                        setTicketsData(prev => [newTicket, ...prev]);
                        target.reset();

                        const notif = {
                          id: `notif-${Date.now()}`,
                          title: `সাপোর্ট টিকেট রেজিস্টার করা হয়েছে`,
                          message: `টিকেট নম্বর ${newTicket.id} সফলভাবে খোলা হয়েছে এবং আমাদের ইঞ্জিনিয়ারিং টিমকে ট্যাগ করা হয়েছে।`,
                          timestamp: new Date().toISOString(),
                          read: false
                        };
                        setNotifications(prev => [notif, ...prev]);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">টিকেটের বিষয়বস্তু (Subject)</label>
                        <input 
                          name="tk_subj"
                          type="text"
                          required
                          placeholder="যেমন: bKash Callback Handshake failure"
                          className="w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">টিকেটের ক্যাটাগরি (Category)</label>
                        <select 
                          name="tk_cat"
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit
                            ${settings.themeMode === 'dark' ? 'bg-[#1a1614]' : 'bg-white'}`}
                        >
                          <option value="Syncing">WooCommerce Syncing</option>
                          <option value="Payment Gateways">bKash/Nagad Payment Gateways</option>
                          <option value="Printing">PDF Printing & Invoices</option>
                          <option value="CRM Security">Access Control & CRM</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold opacity-75 mb-1">গুরুত্ব স্তর (Priority)</label>
                        <select 
                          name="tk_prio"
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit
                            ${settings.themeMode === 'dark' ? 'bg-[#1a1614]' : 'bg-white'}`}
                        >
                          <option value="Critical">Critical (Immediate SLA)</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/10 transition-all"
                      >
                        টিকেট সাবমিট করুন (Submit TCK)
                      </button>
                    </form>
                  </div>
                </div>

                {/* Ticket lists table */}
                <div className="lg:col-span-8">
                  <div className={`p-6 rounded-[2.5rem] border overflow-hidden
                    ${settings.themeMode === 'dark' ? 'bg-[#1a1614]/80 border-[#322822]/60' : 'bg-white border-[#e8e4dc] shadow-sm'}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-extrabold">সহায়তা টিকেটের ডেক্স তালিকা (Active Support Tickets)</h3>
                      <span className="text-[10px] font-mono opacity-50">মোট ওপেন টিকেট: {ticketsData.length} টি</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-inherit opacity-60 text-[10px] uppercase font-bold">
                            <th className="py-3 px-3">টিকেট আইডি</th>
                            <th className="py-3 px-3">বিষয়বস্তু ও ক্যাটাগরি</th>
                            <th className="py-3 px-3">অগ্রাধিকার (Priority)</th>
                            <th className="py-3 px-3">অবস্থা (Status)</th>
                            <th className="py-3 px-3">তারিখ</th>
                            <th className="py-3 px-3 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-inherit/40 text-xs">
                          {ticketsData.map(t => (
                            <tr key={t.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3 font-mono font-bold text-[#e07a5f]">{t.id}</td>
                              <td className="py-3 px-3">
                                <p className="font-bold">{t.subject}</p>
                                <p className="text-[10px] opacity-60">{t.category}</p>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold
                                  ${t.priority === 'Critical' ? 'bg-rose-500/10 text-rose-500' : ''}
                                  ${t.priority === 'High' ? 'bg-amber-500/10 text-amber-500' : ''}
                                  ${t.priority === 'Medium' ? 'bg-indigo-500/10 text-indigo-500' : ''}
                                  ${t.priority === 'Low' ? 'bg-neutral-500/15 text-neutral-500' : ''}`}
                                >
                                  {t.priority}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold
                                  ${t.status === 'Open' ? 'bg-rose-500/10 text-rose-500' : ''}
                                  ${t.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500' : ''}
                                  ${t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : ''}`}
                                >
                                  {t.status}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-mono text-[10px] opacity-70">{t.date}</td>
                              <td className="py-3 px-3 text-right">
                                {t.status !== 'Resolved' ? (
                                  <button
                                    onClick={() => {
                                      setTicketsData(prev => prev.map(item => item.id === t.id ? { ...item, status: item.status === 'Open' ? 'In Progress' : 'Resolved' } : item));
                                    }}
                                    className="px-2.5 py-1 bg-[#e07a5f]/10 hover:bg-[#e07a5f]/20 text-[#e07a5f] text-[10px] font-bold rounded-lg transition-colors"
                                  >
                                    ধাপ পরিবর্তন
                                  </button>
                                ) : (
                                  <span className="text-[9px] opacity-40 italic">ক্লোজড</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==========================================================
          AI ASSISTANT DRAWER (CHROME TRANSITION PANEL)
          ========================================================== */}
      {aiAssistantOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[#1a1614] border-l border-[#322822] shadow-2xl z-50 flex flex-col h-full animate-slide-in text-[#f6f3ed]">
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#322822] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-500 to-[#e07a5f] flex items-center justify-center text-white">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="font-bold text-sm block">Aura Intelligent Sales AI</span>
                <span className="text-[10px] text-amber-500 block">Gemini 3.5 Assistant • Online</span>
              </div>
            </div>
            <button 
              onClick={() => setAiAssistantOpen(false)}
              className="text-xs opacity-60 hover:opacity-100 p-2"
            >
              বন্ধ করুন
            </button>
          </div>

          {/* Quick recommendations panel */}
          <div className="bg-[#2a2420] p-3 text-[11px] leading-relaxed border-b border-[#322822]">
            💡 <strong>এআই ট্রেইন্ড টাস্ক:</strong> আপনি স্টোরের অর্ডার আপডেট, কাস্টমার ক্যাম্পেইন ড্রাফটিং কিংবা কম স্টক এলার্ট নিয়ে যেকোনো প্রশ্ন করতে পারেন।
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex flex-col max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed
                  ${msg.sender === 'user' 
                    ? 'bg-[#e07a5f] text-white ml-auto rounded-tr-none' 
                    : 'bg-white/5 border border-white/5 text-[#f6f3ed] mr-auto rounded-tl-none'}`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="text-[9px] opacity-40 mt-1 text-right">{msg.timestamp}</span>
              </div>
            ))}
            {aiLoading && (
              <div className="bg-white/5 border border-white/5 text-xs mr-auto rounded-2xl rounded-tl-none p-3 max-w-[85%] flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce" />
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                <span className="opacity-60 text-[10px]">Aura AI বিশ্লেষণ করছে...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#322822] bg-[#120e0c]">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
              <input 
                type="text" 
                placeholder="এআই অ্যাসিস্ট্যান্টকে প্রশ্ন করুন..." 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-xs text-white"
              />
              <button 
                type="submit" 
                disabled={aiLoading}
                className="p-1.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white rounded-lg disabled:opacity-50 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================================
          NOTIFICATION DRAWER PANEL
          ========================================================== */}
      {notificationPanelOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-[#1a1614] border-l border-[#322822] shadow-2xl z-50 flex flex-col h-full animate-slide-in text-[#f6f3ed]">
          <div className="p-4 border-b border-[#322822] flex justify-between items-center">
            <h3 className="font-extrabold text-sm">সিস্টেম নোটিফিকেশনস ({notifications.filter(n => !n.read).length})</h3>
            <button 
              onClick={() => setNotificationPanelOpen(false)}
              className="text-xs opacity-60 hover:opacity-100 p-2"
            >
              বন্ধ করুন
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <p className="text-center opacity-50 py-10 text-xs">কোন নোটিফিকেশন নেই</p>
            ) : (
              notifications.map(n => (
                <div 
                  key={n.id}
                  className={`p-3.5 rounded-xl border text-xs relative space-y-1 transition-all group
                    ${n.read ? 'bg-white/[0.02] border-white/5 opacity-65' : 'bg-amber-500/[0.04] border-amber-500/20'}`}
                >
                  {!n.read && (
                    <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-rose-500" />
                  )}
                  <div className="flex justify-between items-start pr-6">
                    <h4 className="font-bold text-xs text-[#f6f3ed]">{n.title}</h4>
                    <div className="flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2.5 right-2 bg-[#1a1614] pl-1.5 rounded-md">
                      {!n.read && (
                        <button 
                          onClick={() => markSingleNotificationAsRead(n.id)}
                          title="পঠিত চিহ্নিত করুন"
                          className="text-emerald-500 hover:text-emerald-400 p-0.5"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(n.id)}
                        title="মুছে ফেলুন"
                        className="text-rose-500 hover:text-rose-400 p-0.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="opacity-70 text-[11px] leading-relaxed pr-2">{n.message}</p>
                  <span className="text-[9px] opacity-40 block pt-1 font-mono">{new Date(n.timestamp).toLocaleTimeString()}</span>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-[#322822] bg-[#120e0c]">
            <button 
              onClick={markAllNotificationsAsRead}
              className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-[#e07a5f] rounded-xl text-xs font-bold transition-all border border-[#e07a5f]/15"
            >
              সব নোটিফিকেশন পঠিত হিসেবে চিহ্নিত করুন
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================
          ORDER EDIT MODAL (INTERACTIVE FORM)
          ========================================================== */}
      {editingOrder && (() => {
        const stats = fraudCheckResult || getCourierStats(editingOrder.customerPhone || '');
        return (
          <div className={`fixed inset-0 z-50 flex flex-col animate-fade-in
          ${settings.themeMode === 'dark' ? 'bg-[#120e0c] text-[#f6f3ed]' : 'bg-[#faf8f5] text-neutral-800'}`}
        >
          {/* Header */}
          <div className={`p-3.5 px-5 border-b flex justify-between items-center shrink-0
            ${settings.themeMode === 'dark' ? 'border-[#322822]/40 bg-[#1a1614]' : 'border-neutral-200 bg-white'}`}
          >
            <div>
              <span className="text-[10px] uppercase opacity-60 font-black tracking-wider">অর্ডার এডিটর</span>
              <h3 className="font-extrabold text-lg mt-0">এডিট অর্ডার: {editingOrder.id}</h3>
            </div>
            <button 
              onClick={() => setEditingOrder(null)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all
                ${settings.themeMode === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-100 hover:bg-neutral-200'}`}
            >
              বন্ধ করুন
            </button>
          </div>

          {/* Split Body Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column (Form) - Width 60% */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
                setEditingOrder(null);
                const newNotif = {
                  id: `notif-${Date.now()}`,
                  title: `অর্ডার আপডেট সফল`,
                  message: `${editingOrder.id} নম্বরের অর্ডার ডিটেইলস সফলভাবে আপডেট করা হয়েছে।`,
                  timestamp: new Date().toISOString(),
                  read: false
                };
                setNotifications(prev => [newNotif, ...prev]);
              }}
              className={`w-full md:w-[60%] flex flex-col border-r h-full overflow-y-auto p-4 md:p-6 space-y-4
                ${settings.themeMode === 'dark' ? 'border-[#322822]/40 bg-[#161210]' : 'border-neutral-200 bg-white'}`}
            >
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-xs font-bold opacity-75 mb-1">কাস্টমার নাম (Customer Name)</label>
                  <input 
                    type="text"
                    required
                    value={editingOrder.customerName}
                    onChange={(e) => setEditingOrder(prev => prev ? { ...prev, customerName: e.target.value } : null)}
                    className="w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold opacity-75 mb-1">ফোন নাম্বার (Phone Number)</label>
                    <input 
                      type="text"
                      required
                      value={editingOrder.customerPhone}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, customerPhone: e.target.value } : null)}
                      className="w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold opacity-75 mb-1">ইমেইল ঠিকানা (Email Address)</label>
                    <input 
                      type="email"
                      required
                      value={editingOrder.customerEmail}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, customerEmail: e.target.value } : null)}
                      className="w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold opacity-75 mb-1">শিপিং ঠিকানা (Shipping Location / Address)</label>
                  <textarea 
                    required
                    rows={2}
                    value={editingOrder.customerAddress}
                    onChange={(e) => setEditingOrder(prev => prev ? { ...prev, customerAddress: e.target.value } : null)}
                    className="w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold opacity-75 mb-1">মোট প্রদেয় মূল্য (Total Amount ৳)</label>
                    <input 
                      type="number"
                      required
                      value={editingOrder.total}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, total: Number(e.target.value) } : null)}
                      className="w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold opacity-75 mb-1">পেমেন্ট গেটওয়ে (Gateway)</label>
                    <select
                      value={editingOrder.paymentMethod}
                      onChange={(e) => setEditingOrder(prev => prev ? { ...prev, paymentMethod: e.target.value as any } : null)}
                      className={`w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#e07a5f] bg-transparent border-inherit
                        ${settings.themeMode === 'dark' ? 'bg-[#1a1614]' : 'bg-white'}`}
                    >
                      <option value="COD">COD (Cash on Delivery)</option>
                      <option value="bKash">bKash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="Rocket">Rocket</option>
                      <option value="Stripe">Stripe</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions at the bottom of left form */}
              <div className="pt-4 mt-auto border-t border-inherit flex justify-end space-x-3 max-w-2xl shrink-0">
                <button 
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-5 py-2.5 bg-transparent border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 text-xs font-bold rounded-xl transition-all"
                >
                  বাতিল করুন
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/10 transition-all"
                >
                  পরিবর্তন সংরক্ষণ করুন
                </button>
              </div>
            </form>

            {/* Right Column - Width 40% */}
            <div className={`hidden md:flex w-[40%] h-full overflow-y-auto p-4 md:p-5 flex-col space-y-4 shrink-0 border-l
              ${settings.themeMode === 'dark' ? 'bg-[#1e1a17] border-[#322822]/40' : 'bg-[#fcfbf9] border-neutral-200'}`}
            >
              {/* Quick Action Panel */}
              <div className={`p-4 rounded-2xl border shadow-sm w-full space-y-3
                ${settings.themeMode === 'dark' ? 'bg-[#161210]/90 border-[#322822]/40 text-[#f6f3ed]' : 'bg-white border-neutral-200 text-neutral-800'}`}
              >
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-[#e07a5f]">
                    কুইক অ্যাকশন প্যানেল (Quick Action)
                  </h4>
                </div>

                {/* Dropdown for Status Change */}
                <div className="space-y-1">
                  <select
                    value={['Confirmed', 'Payment Pending (will pay)', 'Keep Hold', 'Do Canceled', 'Pre-Confirmed'].includes(editingOrder.status) ? editingOrder.status : ""}
                    onChange={(e) => {
                      const selectedStatus = e.target.value as any;
                      if (selectedStatus) {
                        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
                        const updatedTimeline = [
                          ...(editingOrder.timeline || []),
                          {
                            status: selectedStatus,
                            timestamp,
                            note: `স্ট্যাটাস পরিবর্তন করে '${selectedStatus}' করা হয়েছে (Quick Action Panel)।`
                          }
                        ];

                        const updatedOrder = {
                          ...editingOrder,
                          status: selectedStatus,
                          timeline: updatedTimeline
                        };

                        if (selectedStatus === 'Confirmed') {
                          setEditingOrder(updatedOrder);
                          setShowCourierModal(true);
                        } else {
                          setEditingOrder(updatedOrder);
                          setOrders(prev => prev.map(o => o.id === editingOrder.id ? updatedOrder : o));
                          if (selectedOrder && selectedOrder.id === editingOrder.id) {
                            setSelectedOrder(updatedOrder);
                          }
                          // Direct write to Supabase Database
                          supabaseService.upsertOrder(updatedOrder).then(success => {
                            if (!success) {
                              console.error("Direct status update to Supabase failed for order", editingOrder.id);
                            }
                          });
                          // Add log notification
                          const newNotif = {
                            id: `NOTIF-${Date.now()}`,
                            title: `Order ${editingOrder.id} Updated`,
                            message: `Status is now ${selectedStatus}`,
                            type: 'success' as const,
                            timestamp: new Date().toISOString(),
                            read: false
                          };
                          setNotifications(prev => [newNotif, ...prev]);
                        }
                      }
                    }}
                    className={`w-full p-2.5 rounded-xl border text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/40 cursor-pointer transition-all
                      ${settings.themeMode === 'dark' ? 'bg-[#120e0c] text-[#f6f3ed] border-[#322822]' : 'bg-neutral-50 text-neutral-800 border-neutral-200'}`}
                  >
                    <option value="" disabled>Change Invoice Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Payment Pending (will pay)">Payment Pending (will pay)</option>
                    <option value="Keep Hold">Keep Hold</option>
                    <option value="Do Canceled">Do Canceled</option>
                    <option value="Pre-Confirmed">Pre-Confirmed</option>
                  </select>
                </div>

                {/* Print Invoice Button */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrder(editingOrder);
                    setShouldTriggerPrint(true);
                  }}
                  className="w-full p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md shadow-blue-500/10 transition-all flex items-center justify-center space-x-2"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Invoice</span>
                </button>

                {/* Send SMS To Customer (WhatsApp Automation Button) */}
                <button
                  type="button"
                  onClick={() => {
                    let cleanPhone = editingOrder.customerPhone || '';
                    cleanPhone = cleanPhone.trim().replace(/[\s\-\(\)\+]/g, '');
                    if (cleanPhone.startsWith('0')) {
                      cleanPhone = '88' + cleanPhone;
                    }
                    const message = "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ, আমি trandzone.com থেকে বলছি। আপনি অতি শীঘ্রই আমাদের এখানে একটি অর্ডার করেছিলেন। এটি কনফার্ম করার জন্য আপনাকে কিছুক্ষণ আগে আমাদের প্রতিনিধি কল করেছিলেন, কিন্তু আপনি হয়তো কোনো সমস্যার কারণে আমাদের ফোনটা রিসিভ করতে পারেননি। এজন্য আপনাকে জানানো হচ্ছে যে, আপনি যখন ফ্রি হবেন তখন আমাদেরকে একটা কল করবেন কিংবা একটা এসএমএস করে আমাদেরকে কনফার্ম জানাবেন।";
                    const whatsappUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send SMS To Customer</span>
                </button>
              </div>

              <div className={`p-4 rounded-2xl border shadow-sm w-full space-y-3.5
                ${settings.themeMode === 'dark' ? 'bg-[#161210]/90 border-[#322822]/40 text-[#f6f3ed]' : 'bg-white border-neutral-200 text-neutral-800'}`}
              >
                <div className="flex items-center justify-between border-b border-neutral-200/10 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 relative">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isFraudChecking ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isFraudChecking ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                    </span>
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-[#e07a5f]">
                      গ্লোবাল ফ্রড চেকার (Global Fraud Checker)
                    </h4>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    isFraudChecking 
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/15' 
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/15'
                  }`}>
                    {isFraudChecking ? '● Analyzing...' : '● Global Analysis Completed'}
                  </span>
                </div>

                {/* High Risk Alert Warning Box */}
                {!isFraudChecking && stats.total.total > 0 && stats.cancelPercent >= 50 && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-500 text-xs font-semibold animate-pulse flex items-start space-x-2">
                    <span className="text-sm mt-0.5">🚨</span>
                    <div>
                      <p className="font-black text-rose-500 dark:text-rose-400 text-[11px] uppercase tracking-wider">উচ্চ ঝুঁকি সম্পন্ন কাস্টমার! (High Risk Buyer)</p>
                      <p className="text-[10px] opacity-90 leading-relaxed font-bold mt-0.5">এই কাস্টমারের কুরিয়ার বুকিং বাতিলের হার ৫০% বা তার বেশি। অর্ডার কনফার্ম করার পূর্বে অবশ্যই শতভাগ নিশ্চিত হয়ে নিন!</p>
                    </div>
                  </div>
                )}

                {/* Table Container */}
                <div className={`overflow-hidden rounded-xl border
                  ${settings.themeMode === 'dark' ? 'border-[#322822]/40' : 'border-neutral-200'}`}
                >
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="font-extrabold">
                        <th className={`p-2 font-bold ${settings.themeMode === 'dark' ? 'bg-white/5 text-[#f6f3ed]/70' : 'bg-neutral-100 text-neutral-600'}`}>কুরিয়ার</th>
                        <th className="p-2 font-extrabold text-white text-center bg-blue-700 w-14 border-l border-white/10">মোট</th>
                        <th className="p-2 font-extrabold text-white text-center bg-emerald-700 w-14 border-l border-white/10">সফল</th>
                        <th className="p-2 font-extrabold text-white text-center bg-red-700 w-14 border-l border-white/10">বাতিল</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-bold ${settings.themeMode === 'dark' ? 'divide-[#322822]/30' : 'divide-neutral-100'}`}>
                      {/* SteadFast Row */}
                      <tr>
                        <td className="p-2 flex items-center space-x-1.5">
                          <span className="text-emerald-500 text-xs">⚡</span>
                          <span className="font-extrabold tracking-tight text-[#00a86b]">SteadFast</span>
                        </td>
                        <td className="p-2 text-center text-white bg-blue-600 border-l border-white/10">{stats.sf.total}</td>
                        <td className="p-2 text-center text-white bg-emerald-600 border-l border-white/10">{stats.sf.success}</td>
                        <td className="p-2 text-center text-white bg-red-600 border-l border-white/10">{stats.sf.cancel}</td>
                      </tr>
                      {/* Pathao Row */}
                      <tr>
                        <td className="p-2 flex items-center space-x-1.5">
                          <span className="text-rose-500 text-xs">🚲</span>
                          <span className="font-extrabold tracking-tight text-rose-600">pathao</span>
                        </td>
                        <td className="p-2 text-center text-white bg-blue-600 border-l border-white/10">{stats.pt.total}</td>
                        <td className="p-2 text-center text-white bg-emerald-600 border-l border-white/10">{stats.pt.success}</td>
                        <td className="p-2 text-center text-white bg-red-600 border-l border-white/10">{stats.pt.cancel}</td>
                      </tr>
                      {/* REDX Row */}
                      <tr>
                        <td className="p-2 flex items-center space-x-1.5">
                          <span className="text-red-500 text-xs">📦</span>
                          <span className="font-black tracking-tight text-neutral-800 dark:text-neutral-200">
                            RED<span className="text-red-600">X</span>
                          </span>
                        </td>
                        <td className="p-2 text-center text-white bg-blue-600 border-l border-white/10">{stats.rx.total}</td>
                        <td className="p-2 text-center text-white bg-emerald-600 border-l border-white/10">{stats.rx.success}</td>
                        <td className="p-2 text-center text-white bg-red-600 border-l border-white/10">{stats.rx.cancel}</td>
                      </tr>
                      {/* CarryWise Row */}
                      <tr>
                        <td className="p-2 flex items-center space-x-1.5">
                          <span className="text-amber-500 text-xs">🤝</span>
                          <span className="font-extrabold tracking-tight text-amber-500">CarryWise</span>
                        </td>
                        <td className="p-2 text-center text-white bg-blue-600 border-l border-white/10">{stats.cw.total}</td>
                        <td className="p-2 text-center text-white bg-emerald-600 border-l border-white/10">{stats.cw.success}</td>
                        <td className="p-2 text-center text-white bg-red-600 border-l border-white/10">{stats.cw.cancel}</td>
                      </tr>
                      {/* Total Row */}
                      <tr className={`${settings.themeMode === 'dark' ? 'bg-white/5' : 'bg-neutral-50'}`}>
                        <td className="p-2 text-xs font-black">মোট</td>
                        <td className="p-2 text-center text-white bg-blue-800 font-extrabold border-l border-white/10">{stats.total.total}</td>
                        <td className="p-2 text-center text-white bg-emerald-800 font-extrabold border-l border-white/10">{stats.total.success}</td>
                        <td className="p-2 text-center text-white bg-red-800 font-extrabold border-l border-white/10">{stats.total.cancel}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Progress bars */}
                <div className="space-y-2">
                  {/* Success Rate Bar */}
                  <div className="flex items-center justify-between p-2 px-3 bg-emerald-600 text-white rounded-xl font-extrabold shadow-sm">
                    <span>গ্লোবাল ডেলিভারি রেট (Success Score)</span>
                    <span>{stats.successPercent}%</span>
                  </div>

                  {/* Cancel Rate Bar */}
                  <div className="flex items-center justify-between p-2 px-3 bg-red-600 text-white rounded-xl font-extrabold shadow-sm">
                    <span>গ্লোবাল রিটার্ন রেট (Risk Score)</span>
                    <span>{stats.cancelPercent}%</span>
                  </div>

                  {/* Dual Colored bar */}
                  {stats.total.total > 0 && (
                    <div className="h-5 w-full rounded-xl overflow-hidden flex text-[9px] font-black text-white text-center border border-transparent">
                      <div 
                        style={{ width: `${stats.successPercent}%` }} 
                        className="bg-emerald-500 flex items-center justify-center transition-all duration-500"
                      >
                        সফল {stats.successPercent}%
                      </div>
                      <div 
                        style={{ width: `${stats.cancelPercent}%` }} 
                        className="bg-red-500 flex items-center justify-center transition-all duration-500"
                      >
                        বাতিল {stats.cancelPercent}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis stats footer */}
                <div className="mt-3.5 pt-2.5 border-t border-neutral-200/10 space-y-1.5 text-xs font-semibold">
                  <div className="flex justify-between">
                    <span className="opacity-60">Success Score:</span>
                    <span className="text-emerald-500 font-extrabold">{stats.successPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Risk Score:</span>
                    <span className="text-red-500 font-extrabold">{stats.cancelPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Risk Status:</span>
                    <span className={`font-black px-2 py-0.5 rounded-md text-[10px] tracking-wide ${
                      stats.status === 'High Risk' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/15' :
                      stats.status === 'Moderate' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/15' : 
                      stats.status === 'No History' ? 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/15' :
                      'bg-emerald-500/10 text-emerald-500 border border-emerald-500/15'
                    }`}>{stats.status === 'High Risk' ? '🚨 High Risk' : stats.status === 'Moderate' ? '⚠️ Moderate' : stats.status === 'No History' ? '∅ No History' : '✅ High Reliability'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Data Connections:</span>
                    <span className="font-mono text-[10px] opacity-80">{stats.dataSource || 'local Supabase'}</span>
                  </div>
                </div>

                {/* Analyzing Loader banner */}
                <div className={`mt-3 p-2.5 rounded-xl border text-center
                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c]/60 border-white/5' : 'bg-neutral-50 border-neutral-100'}`}
                >
                  <div className="text-[10px] font-mono tracking-wider text-neutral-400 flex items-center justify-center space-x-1.5">
                    {isFraudChecking ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                        <span className="text-amber-500 font-extrabold animate-pulse">🔍 লাইভ ট্র্যাকিং চলছে... Analyzing [ {editingOrder.customerPhone || 'N/A'} ]</span>
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span className="text-emerald-500 font-bold">● Global Analysis Completed [ {editingOrder.customerPhone || 'N/A'} ]</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })()}

      {/* ==========================================================
          ORDER DETAILS & INVOICE PRINT MODAL (THERMAL LABEL DESIGN)
          ========================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 print:bg-white print:p-0 overflow-y-auto">
          <div className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8 print:my-0 print:border-none print:shadow-none print:w-full">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#322822] flex justify-between items-center print:hidden">
              <div>
                <span className="text-xs uppercase opacity-55 font-bold">থার্মাল স্টিকার ইনভয়েস (Thermal Label Design)</span>
                <h3 className="font-extrabold text-base mt-0.5">রিসিপ্ট আইডি: {selectedOrder.id}</h3>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-xs opacity-60 hover:opacity-100 p-2"
              >
                বন্ধ করুন
              </button>
            </div>

            {/* Modal body */}
            <div className="flex-1 p-6 space-y-6 bg-[#161210] print:bg-white print:p-0">
              
              {selectedOrder.status === 'Incomplete' && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-center print:hidden">
                  <AlertCircle className="h-5 w-5 text-rose-500 mx-auto mb-2 animate-bounce" />
                  <span className="font-extrabold text-rose-400 block mb-1">অসম্পূর্ণ চেকআউট (Incomplete / Abandoned Checkout)</span>
                  <p className="text-[11px] opacity-75">
                    গ্রাহক এই চেকআউটটি সম্পন্ন করেননি। আপনি এই গ্রাহকের সাথে সরাসরি যোগাযোগ করতে ডানদিকের কন্ট্রোল প্যানেল ব্যবহার করতে পারেন।
                  </p>
                </div>
              )}
              
              {/* Thermal Label Sticker Content */}
              <div 
                id="thermal-label-sticker" 
                className="bg-white text-black p-5 border-2 border-dashed border-black rounded-xl max-w-[100mm] mx-auto shadow-lg print:shadow-none print:border-solid print:rounded-none"
              >
                {/* Sticker Header Layout */}
                <div className="flex justify-between items-start border-b-2 border-black pb-3">
                  <div className="space-y-1">
                    {/* Brand bold block */}
                    <div className="flex items-center space-x-1">
                      <span className="bg-black text-white px-1.5 py-0.5 text-[10px] font-black rounded uppercase tracking-wider">TZ</span>
                      <h2 className="text-base font-black tracking-tighter text-black uppercase">{settings.brandName || "Trand Zone"}</h2>
                    </div>
                    <p className="text-[10px] font-bold text-black opacity-90">Helpline: {settings.phone || "01881282785"}</p>
                    <p className="text-[9px] font-semibold text-black/80">trandzone.com</p>
                  </div>
                  
                  {/* CSS Barcode graphic */}
                  <div className="text-right">
                    <BarcodeWidget value={selectedOrder.id} />
                  </div>
                </div>

                {/* Condition Price Banner Box - MOST IMPORTANT */}
                <div className="border-4 border-double border-black p-2.5 my-3 text-center bg-neutral-50 rounded-lg">
                  <div className="text-sm font-black text-red-600 uppercase tracking-wide">
                    কন্ডিশনঃ {selectedOrder.total}.00 ৳
                  </div>
                </div>

                {/* Customer Details info block */}
                <div className="space-y-2 text-[11px] text-black border-b-2 border-black pb-3">
                  <div>
                    <span className="font-bold text-black/60 mr-1 text-[10px]">নামঃ</span>
                    <span className="font-extrabold text-black text-xs">{selectedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black/60 mr-1 text-[10px]">মোবাইলঃ</span>
                    <span className="font-black text-black text-xs bg-neutral-100 px-1 py-0.5 rounded border border-black/10 select-all">
                      {selectedOrder.customerPhone}
                    </span>
                  </div>
                  <div className="leading-relaxed">
                    <span className="font-bold text-black/60 mr-1 text-[10px]">ঠিকানাঃ</span>
                    <span className="font-bold text-black text-[11px] leading-normal">{selectedOrder.customerAddress}</span>
                  </div>
                </div>

                {/* Product Summary Table */}
                <div className="mt-3">
                  <span className="text-[9px] uppercase font-black tracking-wider text-black/60 block mb-1">ক্রয়কৃত আইটেম সমূহ</span>
                  <div className="border border-black rounded-lg overflow-hidden">
                    <table className="w-full text-left text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-black text-[9px] font-black text-black">
                          <th className="p-1 font-bold">আইটেম বিবরণ</th>
                          <th className="p-1 text-center w-10 border-l border-black/20">পরিমাণ</th>
                          <th className="p-1 text-right w-16 border-l border-black/20">মূল্য</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/20 font-bold text-black">
                        {selectedOrder.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1">
                              <div className="font-extrabold">{item.productName}</div>
                              <div className="text-[8px] text-black/60 font-mono mt-0.5">আইডি: {item.productId}</div>
                            </td>
                            <td className="p-1 text-center border-l border-black/20">{item.quantity}</td>
                            <td className="p-1 text-right border-l border-black/20">{formatCurrency(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                        {/* Total in table */}
                        <tr className="bg-neutral-50 font-black border-t border-black">
                          <td className="p-1 text-right uppercase text-[9px]" colSpan={2}>সর্বমোট মূল্য</td>
                          <td className="p-1 text-right border-l border-black/20">{formatCurrency(selectedOrder.total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer seal */}
                <div className="mt-2.5 text-center text-[8px] font-bold text-black border-t border-black/10 pt-2 opacity-85">
                  Thank you for shopping with {settings.brandName || "Trand Zone"}!
                </div>
              </div>

              {/* Controls and Interactive Panels (Hidden on Print) */}
              <div className="max-w-[100mm] mx-auto space-y-4 print:hidden">
                {/* Incomplete order recovery module */}
                {selectedOrder.status === 'Incomplete' && (
                  <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/[0.04] text-[#f6f3ed] space-y-3 shadow-md">
                    <span className="text-red-400 font-extrabold text-[11px] uppercase tracking-wider flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
                      <span>অসম্পূর্ণ চেকআউট পুনরুদ্ধার (Recovery)</span>
                    </span>
                    <p className="text-[10px] opacity-75 leading-relaxed">
                      গ্রাহক ফর্মটি পূরণ করা শুরু করেছিলেন কিন্তু কোনো কারণে অর্ডার সম্পন্ন করেননি। নিচে থেকে সরাসরি তার সাথে যোগাযোগ করে অথবা অর্ডারটি কনফার্ম করে পুনরুদ্ধার করুন।
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`tel:${selectedOrder.customerPhone}`}
                        className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-[10px] font-bold text-center flex items-center justify-center space-x-1 transition-all"
                      >
                        <span>📞 সরাসরি কল দিন</span>
                      </a>
                      {(() => {
                        const cleanPhone = selectedOrder.customerPhone.replace(/[^0-9]/g, '');
                        const formattedPhone = cleanPhone.startsWith('01') ? '88' + cleanPhone : cleanPhone;
                        const itemsStr = selectedOrder.items.map(i => i.productName).join(', ');
                        const msg = `প্রিয় ${selectedOrder.customerName},\n\nআমরা লক্ষ্য করেছি যে আপনি আমাদের ওয়েবসাইট থেকে ${itemsStr} নিতে চেয়েছিলেন, কিন্তু অর্ডারটি সম্পন্ন করতে পারেননি। 🌸\n\nঅর্ডারটি কনফার্ম করতে অথবা কোনো সাহায্য লাগলে আমাদের জানান। আমরা আপনার অর্ডার সম্পন্ন করতে সাহায্য করতে প্রস্তুত!\n\nধন্যবাদ,\n${settings.brandName || "Trand Zone"}`;
                        const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
                        return (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold text-center flex items-center justify-center space-x-1 transition-all"
                          >
                            <span>💬 WhatsApp রি-টারগেট</span>
                          </a>
                        );
                      })()}
                    </div>

                    <button
                      onClick={async () => {
                        await updateOrderStatus(selectedOrder.id, 'New Order');
                        const updatedTimeline = [
                          {
                            status: 'New Order' as OrderStatus,
                            timestamp: new Date().toISOString().replace('T', ' ').substring(0,16),
                            note: 'অসম্পূর্ণ চেকআউট সফলভাবে পুনরুদ্ধার করা হয়েছে এবং নতুন অর্ডারে রূপান্তরিত হয়েছে।'
                          },
                          ...selectedOrder.timeline
                        ];
                        setSelectedOrder(prev => prev ? { ...prev, status: 'New Order', timeline: updatedTimeline } : null);
                        alert('অর্ডারটি সফলভাবে পুনরুদ্ধার করে "নিউ অর্ডার" হিসেবে স্থানান্তর করা হয়েছে!');
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>✨ অর্ডার রিকভার করুন (Mark as New Order)</span>
                    </button>
                  </div>
                )}

                {/* Status change panel */}
                <div className="p-4 rounded-2xl border border-[#322822] bg-[#1a1614] text-[#f6f3ed] space-y-2 shadow-md">
                  <span className="opacity-60 block text-[10px] uppercase font-bold">স্ট্যাটাস পরিবর্তন করুন:</span>
                  <div className="flex space-x-1.5 flex-wrap gap-1.5">
                    {['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => updateOrderStatus(selectedOrder.id, st as OrderStatus)}
                        className={`text-[9px] font-black px-2 py-1 rounded transition-all
                          ${selectedOrder.status === st 
                            ? 'bg-[#e07a5f] text-white' 
                            : 'bg-white/5 hover:bg-[#e07a5f]/20 border border-white/5 text-inherit'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chronological timeline logs */}
                <div className="p-4 rounded-2xl border border-[#322822] bg-[#1a1614] text-[#f6f3ed] space-y-3 shadow-md">
                  <span className="opacity-60 block text-[10px] uppercase font-bold">শিপিং ক্রোনোলজিক্যাল টাইমলাইন (Timeline Logs)</span>
                  <div className="space-y-3.5 pl-2 border-l border-[#322822]/20">
                    {selectedOrder.timeline.map((t, idx) => (
                      <div key={idx} className="relative pl-4 text-xs">
                        <div className="absolute -left-[12.5px] top-1.5 h-2 w-2 rounded-full bg-amber-500" />
                        <div className="flex justify-between">
                          <span className="font-bold text-xs">{t.status}</span>
                          <span className="font-mono text-[10px] opacity-50">{t.timestamp}</span>
                        </div>
                        <p className="opacity-75 text-[11px] mt-0.5 leading-relaxed">{t.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Print trigger controls */}
            <div className="p-4 border-t border-[#322822] bg-[#120e0c] flex justify-between print:hidden">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-inherit border border-white/10 hover:border-white/20 text-xs font-bold rounded-xl"
              >
                ফিরে যান
              </button>
              <button 
                onClick={handlePrintInvoice}
                className="flex items-center space-x-2 px-5 py-2 bg-[#e07a5f] hover:bg-[#d06a4f] text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/10"
              >
                <Printer className="h-4 w-4" />
                <span>মেমো প্রিন্ট করুন (Print Invoice)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================================
          CUSTOMER PROFILE DETAIL OVERVIEW MODAL
          ========================================================== */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            <div className="p-5 border-b border-[#322822] flex justify-between items-center">
              <h3 className="font-extrabold text-sm uppercase opacity-70">কাস্টমার প্রোফাইল (CRM Profile)</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-xs opacity-60 hover:opacity-100 p-1">বন্ধ করুন</button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Profile Card header */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-amber-500/30">
                  <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">{selectedCustomer.name}</h4>
                  <span className="text-[10px] font-mono opacity-50 block">{selectedCustomer.id}</span>
                  <span className="mt-2 inline-block text-[10px] px-2.5 py-0.5 font-bold bg-amber-500/20 text-amber-500 rounded-full font-mono">
                    Segment: {selectedCustomer.segment}
                  </span>
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-2 gap-4 text-center bg-black/15 p-4 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] opacity-50 block">জীবনকাল খরচ (LTV)</span>
                  <span className="font-mono text-base font-black text-amber-500">{formatCurrency(selectedCustomer.totalSpending)}</span>
                </div>
                <div>
                  <span className="text-[10px] opacity-50 block">অর্ডার সংখ্যা</span>
                  <span className="font-mono text-base font-black text-[#e07a5f]">{selectedCustomer.ordersCount}টি</span>
                </div>
              </div>

              {/* Activity timelines list */}
              <div className="space-y-3">
                <span className="text-[10px] opacity-50 block uppercase font-bold">সাম্প্রতিক কার্যকলাপ (Activity Logs)</span>
                <div className="space-y-3">
                  {selectedCustomer.activityTimeline.map((act, i) => (
                    <div key={i} className="flex justify-between items-start text-xs p-2 bg-white/[0.01] rounded-lg">
                      <p className="opacity-80 pr-4">{act.action}</p>
                      <span className="font-mono text-[9px] opacity-40 whitespace-nowrap">{act.date}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-4 bg-[#120e0c] border-t border-[#322822] flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedCustomer(null);
                  setAiAssistantOpen(true);
                  setUserInput(`Analyze behavior of customer ${selectedCustomer.name} (LTV of ${formatCurrency(selectedCustomer.totalSpending)}). Propose a dedicated 10% coupon with email template.`);
                }}
                className="w-full py-2 bg-[#e07a5f] text-white hover:bg-[#d06a4f] text-xs font-bold rounded-xl transition-all"
              >
                এআই ইমেইল ড্রাফট করুন (Draft Email)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================================
          COURIER PARTNER SELECTION MODAL
          ========================================================== */}
      {showCourierModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fade-in">
          <div className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl border relative flex flex-col space-y-4
            ${settings.themeMode === 'dark' ? 'bg-[#1a1614] border-[#322822] text-[#f6f3ed]' : 'bg-white border-neutral-200 text-neutral-800'}`}
          >
            {/* Header / Title */}
            <div className="flex justify-between items-center pb-2 border-b border-[#322822]/10 dark:border-neutral-800/10">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#e07a5f]">
                  কুরিয়ার সিলেক্ট করুন (Courier Select)
                </h3>
              </div>
              {!showSuccessTick && (
                <button 
                  type="button"
                  onClick={() => setShowCourierModal(false)}
                  className="text-neutral-400 hover:text-[#e07a5f] p-1 rounded-full hover:bg-white/5 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {showSuccessTick ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-4 animate-fade-in text-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-16 w-16 rounded-full bg-emerald-500/20 animate-ping" />
                  <div className="h-14 w-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <svg className="h-8 w-8 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-emerald-500 uppercase tracking-wide">
                    সফলভাবে আপডেট করা হয়েছে!
                  </h4>
                  <p className="text-[10px] opacity-70">
                    অর্ডার স্ট্যাটাস এবং কুরিয়ার ডাটাবেজে সংরক্ষিত হয়েছে।
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Selector Dropdown Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider opacity-60">
                    ডেলিভারি কুরিয়ার পার্টনারঃ
                  </label>
                  <select
                    value={selectedCourier && selectedCourier.order?.id === editingOrder?.id ? selectedCourier.courier : "NA"}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingOrder) {
                        setSelectedCourier({ courier: val, order: editingOrder });
                      }
                    }}
                    className={`w-full p-3 rounded-xl border text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/40 cursor-pointer transition-all
                      ${settings.themeMode === 'dark' ? 'bg-[#120e0c] text-[#f6f3ed] border-[#322822]' : 'bg-neutral-50 text-neutral-800 border-neutral-200'}`}
                  >
                    <option value="NA">NA</option>
                    <option value="Steadfast Courier">Steadfast Courier</option>
                    <option value="RedX Courier">RedX Courier</option>
                    <option value="Pathao Courier">Pathao Courier</option>
                    <option value="Sundarban Courier">Sundarban Courier</option>
                    <option value="SA Paribahan">SA Paribahan</option>
                    <option value="Paperfly">Paperfly</option>
                    <option value="Carrybee">Carrybee</option>
                  </select>
                </div>

                {/* Info and Confirmation Log */}
                <div className={`p-3 rounded-xl text-[11px] leading-relaxed border
                  ${settings.themeMode === 'dark' ? 'bg-[#120e0c]/40 border-white/5 text-[#f6f3ed]' : 'bg-neutral-50 border-neutral-100 text-neutral-800'}`}
                >
                  <div className="flex justify-between font-medium">
                    <span className="opacity-60">অর্ডার নম্বরঃ</span>
                    <span className="font-mono font-bold text-[#e07a5f]">#{editingOrder?.id}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-1">
                    <span className="opacity-60">কাস্টমার নামঃ</span>
                    <span className="font-extrabold">{editingOrder?.customerName}</span>
                  </div>
                  {selectedCourier && selectedCourier.order?.id === editingOrder?.id && selectedCourier.courier !== "NA" && (
                    <div className="mt-2.5 pt-2 border-t border-dashed border-neutral-200/10 flex items-center justify-between text-emerald-500 font-bold">
                      <span>সংরক্ষিত কুরিয়ারঃ</span>
                      <span className="underline decoration-wavy">{selectedCourier.courier}</span>
                    </div>
                  )}
                </div>

                {/* Steadfast Automated Booking Section */}
                {selectedCourier && selectedCourier.order?.id === editingOrder?.id && selectedCourier.courier === "Steadfast Courier" && (
                  <div className={`p-3.5 rounded-2xl border ${settings.themeMode === 'dark' ? 'bg-[#ff7b00]/5 border-[#ff7b00]/20' : 'bg-[#ff7b00]/5 border-[#ff7b00]/10'} space-y-3`}>
                    <div className="flex items-center space-x-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">
                        {t('Steadfast 1-Click Auto-Booking', 'Steadfast 1-Click Auto-Booking')}
                      </span>
                    </div>
                    <p className="text-[10px] leading-relaxed opacity-80">
                      {t('সরাসরি Steadfast Courier পোর্টালে এই পার্সেলটি অটো বুকিং করতে এবং রিয়েল-টাইম ট্র্যাকিং কোড পেতে বাটনটি চাপুনঃ', 'Press the button to automatically book this parcel directly to the Steadfast Courier portal and get a real-time tracking code:')}
                    </p>
                    
                    {bookingError && (
                      <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] text-red-500 font-bold leading-normal">
                        {t('⚠️ বুকিং ব্যর্থ হয়েছেঃ', '⚠️ Booking failed:')} {bookingError}
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={isBooking}
                      onClick={async () => {
                        if (!editingOrder) return;
                        setIsBooking(true);
                        setBookingError(null);
                        try {
                          const response = await fetch("/api/courier/book-order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              orderId: editingOrder.id,
                              recipientName: editingOrder.customerName,
                              recipientPhone: editingOrder.customerPhone,
                              recipientAddress: editingOrder.customerAddress || "",
                              codAmount: editingOrder.total || 0,
                              note: editingOrder.internalNotes || ""
                            })
                          });
                          
                          const data = await response.json();
                          if (response.ok && data.success) {
                            const trackingCode = data.consignment?.tracking_code || "";
                            const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
                            
                            const updatedTimeline = [
                              ...(editingOrder.timeline || []),
                              {
                                status: 'Confirmed' as OrderStatus,
                                timestamp,
                                note: `Steadfast কুরিয়ারের মাধ্যমে অর্ডারটি অটো বুক করা হয়েছে। ট্র্যাকিং কোডঃ ${trackingCode}`
                              }
                            ];

                            const updatedOrder = {
                              ...editingOrder,
                              status: 'Confirmed' as OrderStatus,
                              timeline: updatedTimeline,
                              internalNotes: `[Steadfast Tracking: ${trackingCode}] ${editingOrder.internalNotes || ""}`
                            };

                            // Save state
                            setOrders(prev => prev.map(o => o.id === editingOrder.id ? updatedOrder : o));
                            setEditingOrder(updatedOrder);
                            if (selectedOrder && selectedOrder.id === editingOrder.id) {
                              setSelectedOrder(updatedOrder);
                            }

                            // Database sync
                            await supabaseService.upsertOrder(updatedOrder);

                            // Notification
                            const newNotif = {
                              id: `NOTIF-${Date.now()}`,
                              title: `Steadfast Auto-Book Successful`,
                              message: `Order #${editingOrder.id} booked. Tracking: ${trackingCode}`,
                              type: 'success' as const,
                              timestamp: new Date().toISOString(),
                              read: false
                            };
                            setNotifications(prev => [newNotif, ...prev]);

                            // Animate success checkmark
                            setShowSuccessTick(true);
                            setTimeout(() => {
                              setShowSuccessTick(false);
                              setShowCourierModal(false);
                            }, 1500);

                          } else {
                            setBookingError(data.error || t("অটো বুকিং ব্যর্থ হয়েছে। API Key এবং Secret Key সঠিক আছে কিনা চেক করুন।", "Auto booking failed. Please check if your API Key and Client ID/Secret are correct."));
                          }
                        } catch (err: any) {
                          setBookingError(err.message || t("সার্ভার এর সাথে কানেকশন দেওয়া যায়নি।", "Could not connect to the server."));
                        } finally {
                          setIsBooking(false);
                        }
                      }}
                      className="w-full py-2 bg-gradient-to-r from-orange-500 to-[#e07a5f] hover:from-orange-600 hover:to-[#d06a4f] text-white text-[11px] font-extrabold rounded-xl transition-all shadow-md shadow-orange-500/20 text-center flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isBooking ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>{t('বুকিং হচ্ছে, অপেক্ষা করুন...', 'Booking in progress, please wait...')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('⚡ ওয়ান-ক্লিক অটো বুকিং করুন', '⚡ One-Click Auto-Book Now')}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Confirm action button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={async () => {
                      if (editingOrder) {
                        const finalCourier = (selectedCourier && selectedCourier.order?.id === editingOrder.id) ? selectedCourier.courier : "NA";
                        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
                        
                        const updatedTimeline = [
                          ...(editingOrder.timeline || []),
                          {
                            status: 'Confirmed' as OrderStatus,
                            timestamp,
                            note: `স্ট্যাটাস পরিবর্তন করে 'Confirmed' করা হয়েছে এবং ডেলিভারি কুরিয়ার হিসেবে '${finalCourier}' সিলেক্ট করা হয়েছে।`
                          }
                        ];

                        const updatedOrder = {
                          ...editingOrder,
                          status: 'Confirmed' as OrderStatus,
                          timeline: updatedTimeline,
                          internalNotes: finalCourier !== "NA" 
                            ? `Courier: ${finalCourier}. ${editingOrder.internalNotes || ""}` 
                            : editingOrder.internalNotes
                        };

                        // Trigger checkmark animation
                        setShowSuccessTick(true);

                        // Save immediately to live React state & database
                        setOrders(prev => prev.map(o => o.id === editingOrder.id ? updatedOrder : o));
                        setEditingOrder(updatedOrder);
                        if (selectedOrder && selectedOrder.id === editingOrder.id) {
                          setSelectedOrder(updatedOrder);
                        }

                        // Direct write to Supabase Database
                        supabaseService.upsertOrder(updatedOrder).then(success => {
                          if (!success) {
                            console.error("Direct status update to Supabase failed for order", editingOrder.id);
                          }
                        });

                        // Add log notification
                        const newNotif = {
                          id: `NOTIF-${Date.now()}`,
                          title: `Order Confirmed & Courier Set`,
                          message: `Order #${editingOrder.id} has been set to Confirmed. Courier: ${finalCourier}`,
                          type: 'success' as const,
                          timestamp: new Date().toISOString(),
                          read: false
                        };
                        setNotifications(prev => [newNotif, ...prev]);

                        // Wait for animation to finish
                        setTimeout(() => {
                          setShowSuccessTick(false);
                          setShowCourierModal(false);
                        }, 1500);
                      } else {
                        setShowCourierModal(false);
                      }
                    }}
                    className="w-full py-2.5 bg-[#e07a5f] hover:bg-[#d06a4f] text-white text-xs font-black rounded-xl transition-all shadow-md shadow-orange-500/10 text-center"
                  >
                    কুরিয়ার সিলেক্ট সম্পন্ন করুন
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==========================================================
          ADD / EDIT PRODUCT MODAL FORM
          ========================================================== */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form 
            onSubmit={handleSaveProduct}
            className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
          >
            <div className="p-5 border-b border-[#322822] flex justify-between items-center">
              <h3 className="font-extrabold text-sm uppercase">
                {editingProduct ? 'প্রোডাক্ট বিবরণ সম্পাদনা করুন' : 'নতুন প্রোডাক্ট যুক্ত করুন'}
              </h3>
              <button 
                type="button"
                onClick={() => setShowProductModal(false)} 
                className="text-xs opacity-60 hover:opacity-100 p-1"
              >
                বন্ধ করুন
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs">
              
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75">প্রোডাক্টের নাম (Product Title):</label>
                <input 
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="যেমন: Monaco Classic Blazer"
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75">প্রোডাক্ট বিবরণ (Description):</label>
                <textarea 
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="প্রোডাক্টের উপাদান, বুনন এবং ফিটিং সম্পর্কে তথ্য..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Fabric & SKU Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">উপাদান (Fabric):</label>
                  <input 
                    type="text"
                    required
                    value={productForm.fabric}
                    onChange={(e) => setProductForm(prev => ({ ...prev, fabric: e.target.value }))}
                    placeholder="যেমন: 100% Egyptian Cotton"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">SKU কোড:</label>
                  <input 
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="যেমন: MON-BLZ-01"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Brand & Category Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">ব্র্যান্ড (Brand):</label>
                  <select
                    value={productForm.brand}
                    onChange={(e) => setProductForm(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  >
                    {brandsList.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">ক্যাটাগরি (Category):</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Collection & Season Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">কালেকশন (Collection):</label>
                  <select
                    value={productForm.collection}
                    onChange={(e) => setProductForm(prev => ({ ...prev, collection: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  >
                    {collectionsList.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">সিজন (Season):</label>
                  <select
                    value={productForm.season}
                    onChange={(e) => setProductForm(prev => ({ ...prev, season: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  >
                    {seasonsList.map(sea => (
                      <option key={sea} value={sea}>{sea}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sizes & Colors Input Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">সাইজসমূহ (Sizes - কমা দিয়ে আলাদা করুন):</label>
                  <input 
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) => setProductForm(prev => ({ ...prev, sizes: e.target.value }))}
                    placeholder="যেমন: S, M, L, XL"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">কালারসমূহ (Colors - কমা দিয়ে আলাদা করুন):</label>
                  <input 
                    type="text"
                    value={productForm.colors}
                    onChange={(e) => setProductForm(prev => ({ ...prev, colors: e.target.value }))}
                    placeholder="যেমন: Black, Navy, Beige"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">বিক্রয় মূল্য (৳):</label>
                  <input 
                    type="number"
                    required
                    min="1"
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">মূল দাম (Original ৳):</label>
                  <input 
                    type="number"
                    min="1"
                    value={productForm.originalPrice || ''}
                    onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>
              </div>

              {/* Stock and Image Select Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">ইনভেন্টরি স্টক সংখ্যা:</label>
                  <input 
                    type="number"
                    min="0"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">প্রোডাক্ট ইমেজ URL:</label>
                  <input 
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* YouTube Video Link Field */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75 flex items-center space-x-1">
                  <span>🎬 প্রোডাক্ট ভিডিও লিংক (YouTube Video Link) - Optional:</span>
                </label>
                <input 
                  type="url"
                  value={productForm.videoUrl || ''}
                  onChange={(e) => setProductForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="যেমন: https://www.youtube.com/watch?v=S_8qM7P76uM"
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Image File Upload Section (Functional) */}
              <div className="p-3 bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col space-y-2">
                <label className="font-bold opacity-75 block">অথবা লোকাল ফাইল আপলোড করুন (Local Image File):</label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProductForm(prev => ({ ...prev, image: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-[10px] cursor-pointer block w-full file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-[#e07a5f] file:text-white hover:file:bg-[#d06a4f]"
                />
                {productForm.image && (
                  <div className="flex items-center space-x-2 pt-1">
                    <img src={productForm.image} alt="Preview" className="h-10 w-10 object-cover rounded-lg border border-white/10" />
                    <span className="text-[9px] opacity-50 truncate max-w-[200px]">ইমেজ সোর্স সফলভাবে যুক্ত হয়েছে।</span>
                  </div>
                )}
              </div>

            </div>

            <div className="p-4 bg-[#120e0c] border-t border-[#322822] flex justify-end space-x-2">
              <button 
                type="button"
                onClick={() => setShowProductModal(false)}
                className="px-4 py-2 border border-white/10 hover:border-white/20 text-xs font-bold rounded-xl"
              >
                বাতিল
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-[#e07a5f] hover:bg-[#d06a4f] text-white rounded-xl text-xs font-bold"
              >
                সংরক্ষণ করুন (Save Item)
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ==========================================================
          BULK SAME PRODUCT UPLOAD MODAL
          ========================================================== */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <form 
            onSubmit={handleBulkUploadSubmit}
            className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]"
          >
            <div className="p-5 border-b border-[#322822] flex justify-between items-center bg-[#15110f]">
              <div className="flex items-center space-x-2">
                <PlusSquare className="h-5 w-5 text-amber-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">
                  Bulk Same Product Upload (একসাথে ১০+ প্রোডাক্ট আপলোড)
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowBulkUploadModal(false)} 
                className="text-xs opacity-60 hover:opacity-100 p-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors px-2 py-1"
              >
                বন্ধ করুন (Close)
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto text-xs scrollbar-thin scrollbar-thumb-white/10">
              
              {/* Info Note */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl leading-relaxed">
                ℹ️ <strong>একই প্রোডাক্ট বিবরণ ও মূল্যের নিচে একসাথে ১০ বা তার বেশি ছবি আপলোড করুন।</strong> প্রতিটি ছবির জন্য সুপাবেজ ডাটাবেজে এবং ড্যাশবোর্ডে আলাদা রো (row) তৈরি হবে, যার ফলে আপনি খুব দ্রুত কম্বো প্রোডাক্টগুলোর ভ্যারিয়েশন আপলোড করতে পারবেন।
              </div>

              {/* Banner Slide Interval Setting Dashboard Integration */}
              <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-amber-400 flex items-center space-x-1.5 text-xs">
                    <span>⏱️ Banner Slide Interval (ব্যানার পরিবর্তনের সময়সীমা):</span>
                  </label>
                  <p className="text-[10px] opacity-70">কাস্টমার স্টোরফ্রন্টের স্লাইডার ব্যানারটি কত সেকেন্ড পর পর স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে তা সেট করুন।</p>
                </div>
                <div className="shrink-0">
                  <select 
                    value={bannerSlideInterval}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      updateBannerSlideInterval(val);
                    }}
                    className="p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-amber-300 font-bold outline-none focus:border-amber-500/50 cursor-pointer min-w-[140px]"
                    id="bulk-banner-interval-select"
                  >
                    <option value={3}>3 Seconds (৩ সেকেন্ড)</option>
                    <option value={4}>4 Seconds (৪ সেকেন্ড)</option>
                    <option value={5}>5 Seconds (৫ সেকেন্ড)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Category Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="space-y-1.5">
                  <label className="font-bold text-amber-400 flex items-center space-x-1">
                    <span>🏷️ Custom Category Name (ক্যাটাগরির নাম দিন):</span>
                  </label>
                  <input 
                    type="text"
                    required
                    value={bulkUploadForm.category || ''}
                    onChange={(e) => setBulkUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="যেমন: Baby Category, Football, Cricket, New Jersey"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                  <p className="text-[10px] opacity-55">এই ক্যাটাগরির নামটি সরাসরি কাস্টমার পেজের উপরের হেডার লিংকে যুক্ত হয়ে যাবে।</p>
                </div>

                <div className="space-y-1.5 flex flex-col justify-between">
                  <label className="font-bold text-amber-400 flex items-center justify-between">
                    <span>🖼️ Cover Banner Image (কভার ব্যানার ইমেজ - অপশনাল):</span>
                    {bulkUploadForm.categoryBannerUrl && (
                      <button 
                        type="button"
                        onClick={() => setBulkUploadForm(prev => ({ ...prev, categoryBannerUrl: '' }))}
                        className="text-red-400 hover:text-red-300 text-[10px] font-bold flex items-center space-x-0.5"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>মুছে ফেলুন</span>
                      </button>
                    )}
                  </label>
                  
                  {bulkUploadForm.categoryBannerUrl ? (
                    <div className="relative rounded-xl overflow-hidden border border-[#322822] bg-[#120e0c] h-[85px] group">
                      <img 
                        src={bulkUploadForm.categoryBannerUrl} 
                        alt="Category Cover Preview" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          type="button"
                          onClick={() => {
                            const inputEl = document.getElementById('banner-file-input');
                            if (inputEl) inputEl.click();
                          }}
                          className="px-2.5 py-1 bg-amber-500 text-black font-bold text-[10px] rounded-lg shadow-md hover:bg-amber-400 transition-all"
                        >
                          নতুন ব্যানার আপলোড করুন
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="border border-dashed border-[#322822] hover:border-amber-500/40 rounded-xl p-3 bg-[#120e0c]/50 text-center cursor-pointer transition-all relative group h-[85px] flex flex-col justify-center items-center"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith('image/')) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setBulkUploadForm(prev => ({ ...prev, categoryBannerUrl: reader.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      onClick={() => {
                        const inputEl = document.getElementById('banner-file-input');
                        if (inputEl) inputEl.click();
                      }}
                    >
                      <Plus className="h-5 w-5 text-amber-500/60 group-hover:text-amber-500 group-hover:scale-110 transition-all mb-1" />
                      <span className="font-bold text-[10px] text-white/80 group-hover:text-white transition-colors">
                        ড্র্যাগ করুন অথবা এখানে ক্লিক করে ব্যানার আপলোড করুন
                      </span>
                      <span className="text-[9px] opacity-40">Landscape Recommended (যেমন: ১৮:৯)</span>
                    </div>
                  )}

                  <input 
                    type="file"
                    accept="image/*"
                    id="banner-file-input"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setBulkUploadForm(prev => ({ ...prev, categoryBannerUrl: reader.result as string }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  <div className="flex justify-between items-center text-[9px] opacity-65">
                    <span>ব্যানার দিলে কাস্টমার পেজের ফিল্টারে উপরে কভার দেখাবে।</span>
                    <button
                      type="button"
                      onClick={() => {
                        const defaultBanners = [
                          "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=1200",
                          "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1200",
                          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
                          "https://images.unsplash.com/photo-1540200049848-d9813ea0e120?auto=format&fit=crop&q=80&w=1200"
                        ];
                        const randomBanner = defaultBanners[Math.floor(Math.random() * defaultBanners.length)];
                        setBulkUploadForm(prev => ({ ...prev, categoryBannerUrl: randomBanner }));
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold transition-all"
                    >
                      ✨ ডেমো ব্যানার লোড করুন
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Title */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75">কমন প্রোডাক্টের নাম (Common Product Title):</label>
                <input 
                  type="text"
                  required
                  value={bulkUploadForm.title}
                  onChange={(e) => setBulkUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="যেমন: Baby Boys Summer Cotton Sleeveless Tank Top 4 Pcs Combo"
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Price Row with Live Discount Calculation */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">Regular Price (পূর্বের দাম BDT):</label>
                  <input 
                    type="number"
                    required
                    min="1"
                    value={bulkUploadForm.regularPrice}
                    onChange={(e) => setBulkUploadForm(prev => ({ ...prev, regularPrice: e.target.value }))}
                    placeholder="যেমন: 990"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-[#f2cc8f] font-bold outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <label className="font-bold opacity-75">Sale Price (বর্তমান দাম BDT):</label>
                    {calculateDiscountPercentage(bulkUploadForm.regularPrice, bulkUploadForm.salePrice) > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-400 font-extrabold text-[9px] animate-pulse">
                        {calculateDiscountPercentage(bulkUploadForm.regularPrice, bulkUploadForm.salePrice)}% OFF
                      </span>
                    )}
                  </div>
                  <input 
                    type="number"
                    required
                    min="1"
                    value={bulkUploadForm.salePrice}
                    onChange={(e) => setBulkUploadForm(prev => ({ ...prev, salePrice: e.target.value }))}
                    placeholder="যেমন: 690"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-emerald-400 font-bold outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">বয়স / সাইজগুলো (Sizes):</label>
                  <input 
                    type="text"
                    required
                    value={bulkUploadForm.sizes}
                    onChange={(e) => setBulkUploadForm(prev => ({ ...prev, sizes: e.target.value }))}
                    placeholder="যেমন: 1-2 Years, 3-4 Years"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Sizes Live Rendering Preview */}
              <div className="p-3 bg-white/5 rounded-2xl space-y-2">
                <span className="font-bold opacity-75 block text-[10px] uppercase tracking-wider text-amber-500">
                  সাইজ বাটন প্রিভিউ (Real-time Live Size Buttons Preview):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {bulkUploadForm.sizes.split(',').map(s => s.trim()).filter(Boolean).map((sz, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#e07a5f]/10 border border-[#e07a5f]/30 text-[#e07a5f] font-bold text-[10px] hover:bg-[#e07a5f] hover:text-white transition-all cursor-pointer"
                    >
                      {sz}
                    </span>
                  ))}
                  {bulkUploadForm.sizes.split(',').map(s => s.trim()).filter(Boolean).length === 0 && (
                    <span className="text-gray-500 italic text-[11px]">কোনো সাইজ যোগ করা হয়নি</span>
                  )}
                </div>
              </div>

              {/* Details text area */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75">কমন প্রোডাক্ট বিবরণ (Details & Quality):</label>
                <textarea 
                  value={bulkUploadForm.details}
                  onChange={(e) => setBulkUploadForm(prev => ({ ...prev, details: e.target.value }))}
                  placeholder="যেমন: Fabric: 100% Cotton, GSM: 160-170, Print: DTF..."
                  rows={4}
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50 leading-relaxed font-mono text-[11px]"
                />
              </div>

              {/* Product Video YouTube Link */}
              <div className="space-y-1.5">
                <label className="font-bold text-amber-400 flex items-center space-x-1">
                  <span>🎬 Product Video (YouTube Link) - Optional:</span>
                </label>
                <input 
                  type="url"
                  value={bulkUploadForm.videoUrl || ''}
                  onChange={(e) => setBulkUploadForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="যেমন: https://www.youtube.com/watch?v=S_8qM7P76uM বা https://youtu.be/Z0pZf4I_R-o"
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-[#f6f3ed] outline-none focus:border-amber-500/50"
                />
                <p className="text-[10px] opacity-55">এখানে শুধু ইউটিউব ভিডিওর লিংক পেস্ট করুন। প্রোডাক্ট ডিটেইলস মডালে কাস্টমার সরাসরি এই ভিডিওটি প্লে করে দেখতে পারবে।</p>
              </div>

              {/* Image Drag and Drop Zone */}
              <div className="space-y-2">
                <label className="font-bold opacity-75 flex justify-between items-center">
                  <span>প্রোডাক্ট ইমেজ ড্রপজোন (Upload Images - 10+ Supported):</span>
                  <span className="text-amber-500 font-bold">{bulkUploadForm.images.length}টি যুক্ত</span>
                </label>
                
                <div 
                  className="border-2 border-dashed border-[#322822] hover:border-amber-500/40 rounded-2xl p-6 bg-[#120e0c]/50 text-center cursor-pointer transition-all relative group"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files) as File[];
                    const remainingSlots = 50 - bulkUploadForm.images.length;
                    const filesToProcess = files.slice(0, remainingSlots);
                    
                    filesToProcess.forEach((file: File) => {
                      if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setBulkUploadForm(prev => {
                            if (prev.images.length >= 50) return prev;
                            return { ...prev, images: [...prev.images, reader.result as string] };
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    });
                  }}
                >
                  <input 
                    type="file"
                    multiple
                    accept="image/*"
                    id="bulk-file-input"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []) as File[];
                      const remainingSlots = 50 - bulkUploadForm.images.length;
                      const filesToProcess = files.slice(0, remainingSlots);
                      
                      filesToProcess.forEach((file: File) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setBulkUploadForm(prev => {
                            if (prev.images.length >= 50) return prev;
                            return { ...prev, images: [...prev.images, reader.result as string] };
                          });
                        };
                        reader.readAsDataURL(file);
                      });
                    }}
                  />
                  <label htmlFor="bulk-file-input" className="cursor-pointer block">
                    <div className="flex flex-col items-center space-y-2">
                      <PlusSquare className="h-8 w-8 text-amber-500 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      <span className="font-bold text-xs">ড্র্যাগ এবং ড্রপ করুন অথবা এখানে ক্লিক করে ইমেজ ফাইল সিলেক্ট করুন</span>
                      <span className="text-[10px] opacity-50">JPG, PNG, WEBP ফরম্যাটে একসাথে ১০টি বা তার বেশি ছবি সিলেক্ট করা যাবে</span>
                    </div>
                  </label>
                </div>

                {/* Preload Test Images action */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const demoImages = [
                        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1519242220831-09410926fbff?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1471286174240-e1a485abfe53?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1530124566582-ab05137eb57c?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=600"
                      ];
                      setBulkUploadForm(prev => ({
                        ...prev,
                        images: [...prev.images, ...demoImages].slice(0, 50)
                      }));
                      alert('১৫টি প্রিমিয়াম বাচ্চাদের ড্রেস ডেমো ইমেজ ড্রপজোনে যোগ করা হয়েছে।');
                    }}
                    className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-[10px] rounded-lg transition-all"
                  >
                    ✨ ১৫টি ডেমো ইমেজ লোড করুন (Load Test Images)
                  </button>
                </div>

                {/* Image Previews Grid */}
                {bulkUploadForm.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                    {bulkUploadForm.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square group rounded-xl overflow-hidden border border-white/10 bg-black shadow-inner">
                        <img src={img} alt="Preview" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setBulkUploadForm(prev => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all text-[10px] font-bold text-rose-400 uppercase cursor-pointer"
                        >
                          ডিলেট
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="p-4 bg-[#120e0c] border-t border-[#322822] flex justify-end space-x-2">
              <button 
                type="button"
                onClick={() => setShowBulkUploadModal(false)}
                className="px-4 py-2 border border-white/10 hover:border-white/20 text-xs font-bold rounded-xl transition-all"
              >
                বাতিল করুন (Cancel)
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-amber-500/25"
              >
                বাল্ক আপলোড করুন ({bulkUploadForm.images.length}টি প্রোডাক্ট)
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ==========================================================
          MIXED PRODUCT UPLOAD MODAL
          ========================================================== */}
      {showMixedUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <form 
            onSubmit={handleMixedUploadSubmit}
            className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]"
          >
            <div className="p-5 border-b border-[#322822] flex justify-between items-center bg-[#15110f]">
              <div className="flex items-center space-x-2">
                <PlusCircle className="h-5 w-5 text-orange-500" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">
                  Mixed Product Upload (ম্যানুয়াল সিঙ্গেল আপলোড)
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowMixedUploadModal(false)} 
                className="text-xs opacity-60 hover:opacity-100 p-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors px-2 py-1"
              >
                বন্ধ করুন (Close)
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs scrollbar-thin scrollbar-thumb-white/10">
              
              {/* Product Title */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75">প্রোডাক্টের নাম (Product Title):</label>
                <input 
                  type="text"
                  required
                  value={mixedUploadForm.title}
                  onChange={(e) => setMixedUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="যেমন: Kids Premium Dino Print Yellow Tee"
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Price & Stock Row with Live Discount Calculation */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">Regular Price (পূর্বের দাম BDT):</label>
                  <input 
                    type="number"
                    required
                    min="1"
                    value={mixedUploadForm.regularPrice}
                    onChange={(e) => setMixedUploadForm(prev => ({ ...prev, regularPrice: e.target.value }))}
                    placeholder="যেমন: 990"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-[#f2cc8f] font-bold outline-none focus:border-amber-500/50 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <label className="font-bold opacity-75">Sale Price (বর্তমান দাম BDT):</label>
                    {calculateDiscountPercentage(mixedUploadForm.regularPrice, mixedUploadForm.salePrice) > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-400 font-extrabold text-[9px] animate-pulse">
                        {calculateDiscountPercentage(mixedUploadForm.regularPrice, mixedUploadForm.salePrice)}% OFF
                      </span>
                    )}
                  </div>
                  <input 
                    type="number"
                    required
                    min="1"
                    value={mixedUploadForm.salePrice}
                    onChange={(e) => setMixedUploadForm(prev => ({ ...prev, salePrice: e.target.value }))}
                    placeholder="যেমন: 690"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-emerald-400 font-bold outline-none focus:border-amber-500/50 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">স্টক সংখ্যা (Stock):</label>
                  <input 
                    type="number"
                    required
                    min="1"
                    value={mixedUploadForm.stock}
                    onChange={(e) => setMixedUploadForm(prev => ({ ...prev, stock: e.target.value }))}
                    placeholder="যেমন: 50"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Category & Fabric Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">ক্যাটেগরি (Category):</label>
                  <input 
                    type="text"
                    required
                    value={mixedUploadForm.category}
                    onChange={(e) => setMixedUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="যেমন: Baby Category"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold opacity-75">ফেব্রিক / উপাদান (Fabric Quality):</label>
                  <input 
                    type="text"
                    required
                    value={mixedUploadForm.fabric}
                    onChange={(e) => setMixedUploadForm(prev => ({ ...prev, fabric: e.target.value }))}
                    placeholder="যেমন: 100% Cotton (GSM 160-170)"
                    className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Sizes Comma Separated */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75">বয়স / সাইজগুলো (Sizes - Comma Separated):</label>
                <input 
                  type="text"
                  required
                  value={mixedUploadForm.sizes}
                  onChange={(e) => setMixedUploadForm(prev => ({ ...prev, sizes: e.target.value }))}
                  placeholder="যেমন: 1-2 Years, 3-4 Years, 5-6 Years"
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Mixed Sizes Preview */}
              <div className="p-3 bg-white/5 rounded-2xl space-y-1.5">
                <span className="font-bold opacity-75 block text-[10px] uppercase tracking-wider text-orange-500">
                  সাইজ বাটন প্রিভিউ (Sizes Preview):
                </span>
                <div className="flex flex-wrap gap-1">
                  {mixedUploadForm.sizes.split(',').map(s => s.trim()).filter(Boolean).map((sz, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-[10px]"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Unique Description */}
              <div className="space-y-1.5">
                <label className="font-bold opacity-75">প্রোডাক্ট বিবরণ (Unique Description):</label>
                <textarea 
                  required
                  value={mixedUploadForm.description}
                  onChange={(e) => setMixedUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="এই নির্দিষ্ট প্রোডাক্টের অনন্য বিবরণ, কালার, ফেব্রিক টেক্সচার ইত্যাদি..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50 leading-relaxed font-mono text-[11px]"
                />
              </div>

              {/* Single Image Upload / Dropzone */}
              <div className="space-y-2">
                <label className="font-bold opacity-75">ইমেজ সোর্স (Image Source):</label>
                <input 
                  type="text"
                  value={mixedUploadForm.image}
                  onChange={(e) => setMixedUploadForm(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="ইমেজের সরাসরি লিঙ্ক (URL) যেমন: https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-[#322822] bg-[#120e0c] text-inherit outline-none focus:border-amber-500/50 mb-2"
                />

                <div 
                  className="border-2 border-dashed border-[#322822] hover:border-orange-500/40 rounded-2xl p-4 bg-[#120e0c]/50 text-center cursor-pointer transition-all relative group"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setMixedUploadForm(prev => ({ ...prev, image: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                >
                  <input 
                    type="file"
                    accept="image/*"
                    id="mixed-file-input"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setMixedUploadForm(prev => ({ ...prev, image: reader.result as string }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label htmlFor="mixed-file-input" className="cursor-pointer block">
                    <div className="flex flex-col items-center space-y-1">
                      <PlusCircle className="h-6 w-6 text-orange-500 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      <span className="font-bold text-[11px]">লোকাল ছবি ড্রপ করুন অথবা এখানে ক্লিক করুন</span>
                    </div>
                  </label>
                </div>

                {mixedUploadForm.image && (
                  <div className="flex items-center space-x-3 p-2.5 bg-white/5 rounded-2xl border border-white/5">
                    <img src={mixedUploadForm.image} alt="Preview" className="h-14 w-14 object-cover rounded-xl border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">ইমেজ প্রিভিউ সফল</span>
                      <span className="text-[9px] opacity-40 block truncate">{mixedUploadForm.image}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMixedUploadForm(prev => ({ ...prev, image: '' }))}
                      className="text-[10px] px-2 py-1 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 rounded-lg transition-all"
                    >
                      মুছুন
                    </button>
                  </div>
                )}
              </div>

            </div>

            <div className="p-4 bg-[#120e0c] border-t border-[#322822] flex justify-end space-x-2">
              <button 
                type="button"
                onClick={() => setShowMixedUploadModal(false)}
                className="px-4 py-2 border border-white/10 hover:border-white/20 text-xs font-bold rounded-xl transition-all"
              >
                বাতিল করুন (Cancel)
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-orange-500/25"
              >
                সিঙ্গেল প্রোডাক্ট আপলোড করুন (Upload Product)
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ==========================================================
          CUSTOM DELETE CONFIRMATION MODAL
          ========================================================== */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500">
                <Trash2 className="h-6 w-6" />
              </div>
              <h4 className="font-extrabold text-sm uppercase">প্রোডাক্ট ডিলিট করুন</h4>
              <p className="text-xs opacity-75 leading-relaxed">
                আপনি কি নিশ্চিতভাবেই <span className="text-rose-400 font-bold">"{productToDelete.name}"</span> প্রোডাক্টটি ডিলিট করতে চান?
              </p>
              <p className="text-[10px] opacity-45">
                এই প্রোডাক্টটি ডিলিট করলে এটি ড্যাশবোর্ড এবং কাস্টমার সাইট থেকে চিরতরে মুছে যাবে।
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl transition-all border border-white/5"
              >
                বাতিল করুন (Cancel)
              </button>
              <button 
                type="button"
                onClick={handleConfirmDeleteProduct}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-rose-500/20"
              >
                হ্যাঁ, ডিলিট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          CUSTOM ORDER DELETE CONFIRMATION MODAL
          ========================================================== */}
      {orderToDelete && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500">
                <Trash2 className="h-6 w-6" />
              </div>
              <h4 className="font-extrabold text-sm uppercase">অর্ডার ডিলিট করুন</h4>
              <p className="text-xs opacity-75 leading-relaxed">
                আপনি কি নিশ্চিতভাবেই অর্ডার <span className="text-rose-400 font-bold">"{orderToDelete.id}"</span> ডিলিট করতে চান?
              </p>
              <p className="text-[11px] opacity-75">
                গ্রাহক: <span className="font-bold">{orderToDelete.customerName}</span> <br />
                মোট মূল্য: <span className="font-bold text-orange-400">৳{orderToDelete.totalAmount?.toLocaleString() || '0'}</span>
              </p>
              <p className="text-[10px] text-rose-400/90 leading-relaxed pr-2">
                এই অর্ডারটি ডিলিট করলে এটি ড্যাশবোর্ড থেকে চিরতরে মুছে যাবে।
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl transition-all border border-white/5"
              >
                বাতিল করুন (Cancel)
              </button>
              <button 
                type="button"
                onClick={handleConfirmDeleteOrder}
                className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-rose-500/20"
              >
                হ্যাঁ, ডিলিট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          SKU QR CODE / PRINTABLE LABEL MODAL
          ========================================================== */}
      {activeQrProduct && (
        <div id="printable-qr-modal-overlay" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              html, body {
                background: white !important;
                color: black !important;
              }
              /* Hide everything else */
              #root, .fixed:not(#printable-qr-modal-overlay) {
                display: none !important;
              }
              #printable-qr-modal-overlay {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: white !important;
                color: black !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 99999 !important;
              }
              .no-print {
                display: none !important;
              }
              .print-container {
                border: 2px dashed #000 !important;
                padding: 24px !important;
                width: 3.5in !important;
                height: 3.5in !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                text-align: center !important;
                margin: 20px auto !important;
                background: white !important;
                color: black !important;
                box-shadow: none !important;
                border-radius: 0 !important;
              }
              .print-title {
                font-size: 14pt !important;
                font-weight: bold !important;
                margin-bottom: 4px !important;
                color: black !important;
              }
              .print-sku {
                font-size: 16pt !important;
                font-weight: 900 !important;
                letter-spacing: 0.1em !important;
                margin-top: 8px !important;
                color: black !important;
              }
            }
          `}} />
          
          <div className="bg-[#1a1614] border border-[#322822] text-[#f6f3ed] w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 space-y-6 no-print">
            <div className="flex justify-between items-center no-print">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-emerald-500 animate-pulse" />
                <h3 className="font-extrabold text-sm uppercase text-emerald-400">SKU বারকোড ও QR কোড লেবেল</h3>
              </div>
              <button 
                type="button"
                onClick={() => setActiveQrProduct(null)} 
                className="text-xs opacity-60 hover:opacity-100 p-1 bg-white/5 hover:bg-white/10 rounded-lg transition-all font-bold"
              >
                বন্ধ করুন
              </button>
            </div>

            {/* Print Sticker Frame */}
            <div className="flex flex-col items-center justify-center p-6 bg-white text-black border border-neutral-200/10 rounded-3xl space-y-4 print-container">
              {/* Product Info */}
              <div className="text-center space-y-1">
                <h4 className="font-black text-base tracking-tight text-neutral-800 print-title">{activeQrProduct.name}</h4>
                <p className="text-xs text-neutral-500 font-mono tracking-wider">{activeQrProduct.category} | {formatCurrency(activeQrProduct.price)}</p>
              </div>

              {/* QR Image Box */}
              <div className="p-4 bg-white rounded-2xl shadow-inner border border-neutral-100 flex items-center justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(activeQrProduct.sku)}`} 
                  alt={`QR Code for ${activeQrProduct.sku}`} 
                  className="w-40 h-40 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* SKU Code Text */}
              <div className="text-center space-y-1">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Warehouse Scan SKU</p>
                <p className="font-mono text-base font-black tracking-widest text-[#e07a5f] bg-[#e07a5f]/10 px-4 py-1.5 rounded-xl border border-[#e07a5f]/20 print-sku">{activeQrProduct.sku}</p>
              </div>

              {/* Print-only footer */}
              <div className="hidden print:block text-[8pt] text-neutral-400 text-center border-t border-dashed border-neutral-300 pt-2 w-full mt-2 font-mono">
                TREND ZONE ERP INVENTORY SYSTEM • {new Date().toLocaleDateString('en-US')}
              </div>
            </div>

            {/* Warehouse Quick Info Banner */}
            <div className="p-4 bg-[#120e0c]/60 rounded-2xl border border-[#322822]/40 text-xs space-y-1.5 no-print">
              <div className="flex justify-between">
                <span className="opacity-60">ইনভেন্টরি স্টক:</span>
                <span className="font-bold font-mono text-emerald-400">{activeQrProduct.stock} Pcs</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">ফ্যাব্রিক / উপাদান:</span>
                <span className="font-bold">{activeQrProduct.fabric || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">সাইজ ভেরিয়েশন:</span>
                <span className="font-bold font-mono text-amber-500">
                  {activeQrProduct.sizes && activeQrProduct.sizes.length > 0 ? activeQrProduct.sizes.join(', ') : 'Free Size'}
                </span>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex gap-3 no-print">
              <button 
                type="button"
                onClick={() => setActiveQrProduct(null)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl transition-all border border-white/5 text-[#f6f3ed]"
              >
                বাতিল করুন (Cancel)
              </button>
              <button 
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2"
              >
                <Printer className="h-4 w-4" />
                <span>লেবেল প্রিন্ট করুন (Print)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
