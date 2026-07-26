import { createClient } from '@supabase/supabase-js';
import { Product, Order, Customer, Notification, SystemSettings, HomepageSettings, CourierSetting, TrackingSettings } from '../types';
import { dbCache } from './dbCache';

declare global {
  interface ImportMetaEnv {
    VITE_SUPABASE_URL?: string;
    VITE_SUPABASE_ANON_KEY?: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ytwgoolesgnkegeykpup.supabase.co';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9Xwy1UomtTTsk-hogHBCaw_7_0Z4FyS';

// Self-healing sanitization for user-provided Supabase URL and Key
let sanitizedUrl = rawUrl.trim();
if (sanitizedUrl.endsWith('/rest/v1/')) {
  sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - 9);
} else if (sanitizedUrl.endsWith('/rest/v1')) {
  sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - 8);
}
if (sanitizedUrl.endsWith('/')) {
  sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - 1);
}

const supabaseUrl = sanitizedUrl;
const supabaseAnonKey = rawKey.trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const safeParseArray = (val: any): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch (e) {
        console.warn("Failed to parse JSON array:", trimmed, e);
      }
    }
    return trimmed.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
};

const safeParseObject = (val: any): { [key: string]: number } => {
  if (!val) return {};
  if (typeof val === 'object' && !Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return {};
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse JSON object:", trimmed, e);
    }
  }
  return {};
};

// ==========================================
// MAPPERS FOR PRODUCTS
// ==========================================
export const mapProductToDb = (p: Product) => ({
  id: p.id,
  name: p.name,
  description: p.description || '',
  price: p.price,
  original_price: p.originalPrice || p.price,
  stock: p.stock,
  category: p.category || '',
  sales_count: p.salesCount || 0,
  rating: p.rating || 0,
  image: p.image || '',
  sizes: p.sizes ? JSON.stringify(p.sizes) : '[]',
  colors: p.colors ? JSON.stringify(p.colors) : '[]',
  fabric: p.fabric || '',
  collection: p.collection || '',
  sku: p.sku || '',
  is_new_arrival: p.isNewArrival || false,
  is_best_seller: p.isBestSeller || false,
  is_limited_edition: p.isLimitedEdition || false,
  size_stock: p.sizeStock ? JSON.stringify(p.sizeStock) : '{}',
  color_stock: p.colorStock ? JSON.stringify(p.colorStock) : '{}',
  season: p.season || '',
  brand: p.brand || '',
  product_cost: p.productCost || 0,
  delivery_cost: p.deliveryCost || 0,
  discount: p.discount || 0,
  marketing_cost: p.marketingCost || 0,
  video_url: p.videoUrl || '',
});

export const mapProductFromDb = (db: any): Product => ({
  id: db.id,
  name: db.name,
  description: db.description || '',
  price: Number(db.price),
  originalPrice: Number(db.original_price),
  stock: Number(db.stock),
  category: db.category || '',
  salesCount: Number(db.sales_count || 0),
  rating: Number(db.rating || 0),
  image: db.image || '',
  sizes: safeParseArray(db.sizes),
  colors: safeParseArray(db.colors),
  fabric: db.fabric || '',
  collection: db.collection || '',
  sku: db.sku || '',
  isNewArrival: db.is_new_arrival || false,
  isBestSeller: db.is_best_seller || false,
  isLimitedEdition: db.is_limited_edition || false,
  sizeStock: safeParseObject(db.size_stock),
  colorStock: safeParseObject(db.color_stock),
  season: db.season || '',
  brand: db.brand || '',
  productCost: Number(db.product_cost || 0),
  deliveryCost: Number(db.delivery_cost || 0),
  discount: Number(db.discount || 0),
  marketingCost: Number(db.marketing_cost || 0),
  videoUrl: db.video_url || '',
});

// ==========================================
// MAPPERS FOR ORDERS
// ==========================================
export const mapOrderToDb = (o: Order) => ({
  id: o.id,
  customer_name: o.customerName,
  customer_email: o.customerEmail || '',
  customer_phone: o.customerPhone || '',
  customer_address: o.customerAddress || '',
  date: o.date,
  items: JSON.stringify(o.items || []),
  total: o.total,
  status: o.status,
  payment_method: o.paymentMethod,
  payment_status: o.paymentStatus,
  timeline: JSON.stringify(o.timeline || []),
  internal_notes: o.internalNotes || '',
});

export const mapOrderFromDb = (db: any): Order => ({
  id: db.id,
  customerName: db.customer_name,
  customerEmail: db.customer_email,
  customerPhone: db.customer_phone,
  customerAddress: db.customer_address,
  date: db.date,
  items: typeof db.items === 'string' ? JSON.parse(db.items) : (db.items || []),
  total: Number(db.total),
  status: db.status as any,
  paymentMethod: db.payment_method as any,
  paymentStatus: db.payment_status as any,
  timeline: typeof db.timeline === 'string' ? JSON.parse(db.timeline) : (db.timeline || []),
  internalNotes: db.internal_notes,
});

// ==========================================
// MAPPERS FOR CUSTOMERS
// ==========================================
export const mapCustomerToDb = (c: Customer) => ({
  id: c.id,
  name: c.name || 'Unknown',
  email: c.email && c.email.trim() ? c.email.trim() : null,
  phone: c.phone || '',
  address: c.address || '',
  avatar: c.avatar || '',
  join_date: c.joinDate || new Date().toISOString().split('T')[0],
  total_spending: c.totalSpending || 0,
  orders_count: c.ordersCount || 0,
  segment: c.segment || 'New',
  activity_timeline: JSON.stringify(c.activityTimeline || []),
  gender: c.gender || 'Unisex',
  birthday: c.birthday || '',
  preferred_size: c.preferredSize || '',
  favorite_color: c.favoriteColor || '',
  favorite_category: c.favoriteCategory || '',
  last_purchase_date: c.lastPurchaseDate || '',
  average_order_value: c.averageOrderValue || 0,
  marketing_tags: JSON.stringify(c.marketingTags || []),
  shirt_size: c.shirtSize || '',
  pant_size: c.pantSize || '',
  shoe_size: c.shoeSize || '',
  size_history: JSON.stringify(c.sizeHistory || []),
  customer_value_score: c.customerValueScore || 0,
  buying_pattern_analysis: c.buyingPatternAnalysis || '',
  next_purchase_prediction: c.nextPurchasePrediction || '',
  membership_tier: c.membershipTier || 'Bronze',
  reward_points: c.rewardPoints || 0,
});

export const mapCustomerFromDb = (db: any): Customer => ({
  id: db.id,
  name: db.name || 'Unknown',
  email: db.email || '',
  phone: db.phone || '',
  address: db.address || '',
  avatar: db.avatar || '',
  joinDate: db.join_date || '',
  totalSpending: Number(db.total_spending || 0),
  ordersCount: Number(db.orders_count || 0),
  segment: (db.segment || 'New') as any,
  activityTimeline: typeof db.activity_timeline === 'string' ? JSON.parse(db.activity_timeline) : (db.activity_timeline || []),
  gender: (db.gender || 'Unisex') as any,
  birthday: db.birthday || '',
  preferredSize: db.preferred_size || '',
  favoriteColor: db.favorite_color || '',
  favoriteCategory: db.favorite_category || '',
  lastPurchaseDate: db.last_purchase_date || '',
  averageOrderValue: Number(db.average_order_value || 0),
  marketingTags: typeof db.marketing_tags === 'string' ? JSON.parse(db.marketing_tags) : (db.marketing_tags || []),
  shirtSize: db.shirt_size || '',
  pantSize: db.pant_size || '',
  shoeSize: db.shoe_size || '',
  sizeHistory: typeof db.size_history === 'string' ? JSON.parse(db.size_history) : (db.size_history || []),
  customerValueScore: Number(db.customer_value_score || 0),
  buyingPatternAnalysis: db.buying_pattern_analysis || '',
  nextPurchasePrediction: db.next_purchase_prediction || '',
  membershipTier: (db.membership_tier || 'Bronze') as any,
  rewardPoints: Number(db.reward_points || 0),
});

// ==========================================
// MAPPERS FOR NOTIFICATIONS
// ==========================================
export const mapNotificationToDb = (n: Notification) => ({
  id: n.id,
  title: n.title || 'Notification',
  message: n.message || '',
  type: n.type || 'info',
  timestamp: n.timestamp || new Date().toISOString(),
  read: typeof n.read === 'boolean' ? n.read : false,
});

export const mapNotificationFromDb = (db: any): Notification => ({
  id: db.id,
  title: db.title || '',
  message: db.message || '',
  type: (db.type || 'info') as any,
  timestamp: db.timestamp || '',
  read: typeof db.read === 'boolean' ? db.read : false,
});

// ==========================================
// MAPPERS FOR SYSTEM SETTINGS
// ==========================================
export const mapSettingsToDb = (s: SystemSettings) => ({
  id: 'global',
  currency: s.currency,
  tax_rate: s.taxRate,
  low_stock_limit: s.lowStockLimit,
  eye_protection_enabled: s.eyeProtectionEnabled,
  blue_light_filter_level: s.blueLightFilterLevel,
  theme_mode: s.themeMode,
  brand_name: s.brandName,
  brand_logo: s.brandLogo,
  tagline: s.tagline,
});

export const mapSettingsFromDb = (db: any): SystemSettings => ({
  currency: db.currency || 'BDT',
  taxRate: Number(db.tax_rate) || 0,
  lowStockLimit: Number(db.low_stock_limit) || 5,
  eyeProtectionEnabled: db.eye_protection_enabled || false,
  blueLightFilterLevel: Number(db.blue_light_filter_level) || 50,
  themeMode: (db.theme_mode as any) || 'dark',
  brandName: db.brand_name || 'TREND ZONE',
  brandLogo: db.brand_logo || '',
  tagline: db.tagline || '',
});

// ==========================================
// MAPPERS FOR COLLECTIONS
// ==========================================
export const mapCollectionToDb = (c: any) => ({
  id: c.id,
  name: c.name,
  season: c.season,
  status: c.status,
  sales: c.sales,
  profit: c.profit,
  items_count: c.itemsCount || 0,
});

export const mapCollectionFromDb = (db: any) => ({
  id: db.id,
  name: db.name,
  season: db.season,
  status: db.status,
  sales: Number(db.sales),
  profit: Number(db.profit),
  itemsCount: Number(db.items_count),
});

// ==========================================
// MAPPERS FOR RETURNS
// ==========================================
export const mapReturnToDb = (r: any) => ({
  id: r.id,
  customer_name: r.customerName,
  phone: r.phone,
  product_name: r.productName,
  reason: r.reason,
  refund_amount: r.refundAmount,
  date: r.date,
  status: r.status,
});

export const mapReturnFromDb = (db: any) => ({
  id: db.id,
  customerName: db.customer_name,
  phone: db.phone,
  productName: db.product_name,
  reason: db.reason,
  refundAmount: Number(db.refund_amount),
  date: db.date,
  status: db.status,
});

// ==========================================
// MAPPERS FOR STAFF
// ==========================================
export const mapStaffToDb = (s: any) => ({
  email: s.email,
  name: s.name,
  role: s.role,
  status: s.status,
  permissions: s.permissions,
});

export const mapStaffFromDb = (db: any) => ({
  email: db.email,
  name: db.name,
  role: db.role,
  status: db.status,
  permissions: db.permissions,
});

export const cleanCourierSettings = (raw: any): CourierSetting[] => {
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : [raw];
  const seenNames = new Set<string>();
  const cleaned: CourierSetting[] = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    
    // Normalize and clean courier_name
    const name = String(item.courier_name || item.name || '').trim();
    if (!name) continue;

    // Check for duplicate names (case-insensitive) to prevent database clutter
    const normalizedName = name.toLowerCase();
    if (seenNames.has(normalizedName)) continue;
    seenNames.add(normalizedName);

    // Standardize IDs
    const id = String(item.id || item.ID || `COURIER-${name.replace(/\s+/g, '-').toUpperCase()}`).trim();

    cleaned.push({
      id,
      courier_name: name,
      api_key: String(item.api_key || item.apiKey || '').trim(),
      client_id: String(item.client_id || item.clientId || item.merchant_id || item.merchantId || '').trim(),
      secret_key: String(item.secret_key || item.secretKey || '').trim(),
      default_weight: String(item.default_weight || item.defaultWeight || '0.5').trim(),
      default_note: String(item.default_note || item.defaultNote || '[INVO_CUSTOMER_NOTE]').trim(),
      created_at: String(item.created_at || item.createdAt || new Date().toISOString()).trim(),
    });
  }
  return cleaned;
};

// ============================================================================
// CORE SERVICE METHODS (With automatic local fallback if tables don't exist)
// ============================================================================

export const supabaseService = {
  // Test connection and table existence
  async checkConnection(): Promise<{ connected: boolean; schemaCreated: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.from('products').select('id').limit(1);
      if (error) {
        if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
          return { connected: true, schemaCreated: false, error: 'Tables do not exist' };
        }
        return { connected: false, schemaCreated: false, error: error.message };
      }
      return { connected: true, schemaCreated: true };
    } catch (e: any) {
      return { connected: false, schemaCreated: false, error: e.message || String(e) };
    }
  },

  // 1. PRODUCTS
  async getProducts(fallback: Product[]): Promise<Product[]> {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      
      if (!data || data.length === 0) {
        try {
          const { data: settingsData } = await supabase.from('system_settings').select('*').eq('id', 'global').maybeSingle();
          if (!settingsData) {
            return fallback;
          }
        } catch (_) {
          // If query fails, proceed
        }
        return [];
      }
      
      return data.map(mapProductFromDb);
    } catch (e) {
      console.warn('Supabase getProducts failed, using local fallback:', e);
      return fallback;
    }
  },

  async upsertProduct(p: Product): Promise<boolean> {
    try {
      const mapped = mapProductToDb(p);
      const { error } = await supabase.from('products').upsert(mapped);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase upsertProduct notice (local fallback active):', e?.message || e);
      return false;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase deleteProduct notice (local fallback active):', e?.message || e);
      return false;
    }
  },

  // 2. ORDERS
  async getOrders(fallback: Order[]): Promise<Order[]> {
    try {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      return data.map(mapOrderFromDb);
    } catch (e) {
      console.warn('Supabase getOrders failed, using local fallback:', e);
      return fallback;
    }
  },

  async upsertOrder(o: Order): Promise<boolean> {
    try {
      const mapped = mapOrderToDb(o);
      const { error } = await supabase.from('orders').upsert(mapped);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase upsertOrder notice (local fallback active):', e?.message || e);
      return false;
    }
  },

  async deleteOrder(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase deleteOrder notice (local fallback active):', e?.message || e);
      return false;
    }
  },

  // 3. CUSTOMERS
  async getCustomers(fallback: Customer[]): Promise<Customer[]> {
    try {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      return data.map(mapCustomerFromDb);
    } catch (e) {
      console.warn('Supabase getCustomers failed, using local fallback:', e);
      return fallback;
    }
  },

  async upsertCustomer(c: Customer): Promise<boolean> {
    try {
      const mapped = mapCustomerToDb(c);
      const { error } = await supabase.from('customers').upsert(mapped);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase upsertCustomer failed:', e);
      return false;
    }
  },

  // 4. NOTIFICATIONS
  async getNotifications(fallback: Notification[]): Promise<Notification[]> {
    try {
      const { data, error } = await supabase.from('notifications').select('*');
      if (error) throw error;
      if (!data || data.length === 0) return fallback;
      return data.map(mapNotificationFromDb);
    } catch (e) {
      console.warn('Supabase getNotifications failed, using local fallback:', e);
      return fallback;
    }
  },

  async upsertNotification(n: Notification): Promise<boolean> {
    try {
      const mapped = mapNotificationToDb(n);
      const { error } = await supabase.from('notifications').upsert(mapped);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase upsertNotification failed:', e);
      return false;
    }
  },

  // 5. SETTINGS
  async getSettings(fallback: SystemSettings): Promise<SystemSettings> {
    try {
      const { data, error } = await supabase.from('system_settings').select('*').eq('id', 'global').maybeSingle();
      if (error) throw error;
      
      let localLogo = '';
      try {
        localLogo = localStorage.getItem('trend_zone_brand_logo') || '';
      } catch (e) {
        console.warn('Failed to read from localStorage:', e);
      }

      let socialLinks: any = {};
      try {
        const cachedSocial = localStorage.getItem('aura_social_links');
        if (cachedSocial) {
          socialLinks = JSON.parse(cachedSocial);
        }
      } catch (e) {
        console.warn('Failed to read social links from localStorage:', e);
      }

      // Fetch social settings from database
      try {
        const { data: socialData } = await supabase.from('system_settings').select('tagline').eq('id', 'social_settings').maybeSingle();
        if (socialData && socialData.tagline) {
          const parsed = JSON.parse(socialData.tagline);
          socialLinks = { ...socialLinks, ...parsed };
        }
      } catch (socialErr) {
        console.warn('Failed to fetch social settings from database:', socialErr);
      }
      
      if (!data) {
        return { 
          ...fallback, 
          brandLogo: localLogo || fallback.brandLogo,
          ...socialLinks
        };
      }
      
      const mapped = mapSettingsFromDb(data);
      if (!mapped.brandLogo && localLogo) {
        mapped.brandLogo = localLogo;
      }
      return {
        ...mapped,
        ...socialLinks
      };
    } catch (e) {
      console.warn('Supabase getSettings failed, using local fallback:', e);
      let localLogo = '';
      try {
        localLogo = localStorage.getItem('trend_zone_brand_logo') || '';
      } catch (err) {
        console.warn('Failed to read from localStorage in fallback:', err);
      }
      let socialLinks: any = {};
      try {
        const cachedSocial = localStorage.getItem('aura_social_links');
        if (cachedSocial) {
          socialLinks = JSON.parse(cachedSocial);
        }
      } catch (err) {
        console.warn('Failed to read social links from localStorage in fallback:', err);
      }
      return { 
        ...fallback, 
        brandLogo: localLogo || fallback.brandLogo,
        ...socialLinks
      };
    }
  },

  async upsertSettings(s: SystemSettings): Promise<{ success: boolean; error?: string; missingColumns?: boolean }> {
    try {
      // Save logo to local storage first as a quick local fallback
      if (s.brandLogo !== undefined) {
        try {
          localStorage.setItem('trend_zone_brand_logo', s.brandLogo);
        } catch (storageErr) {
          console.warn('LocalStorage quota exceeded, skipping local brand logo storage:', storageErr);
        }
      }

      // Also save social links to local storage
      try {
        localStorage.setItem('aura_social_links', JSON.stringify({
          facebookPageUrl: s.facebookPageUrl,
          instagramProfileUrl: s.instagramProfileUrl,
          whatsappNumber: s.whatsappNumber
        }));
      } catch (err) {
        console.warn('Failed to save social links to local storage:', err);
      }
      
      const mapped = mapSettingsToDb(s);
      const { error } = await supabase.from('system_settings').upsert(mapped);

      // Upsert the social settings row as well
      try {
        await supabase.from('system_settings').upsert({
          id: 'social_settings',
          tagline: JSON.stringify({
            facebookPageUrl: s.facebookPageUrl,
            instagramProfileUrl: s.instagramProfileUrl,
            whatsappNumber: s.whatsappNumber
          }),
          currency: 'BDT'
        });
      } catch (socialErr) {
        console.warn('Failed to upsert social settings row:', socialErr);
      }
      
      if (error) {
        // If the error suggests that columns are missing (e.g. brand_logo or tagline doesn't exist yet), retry without them
        const isColumnError = error.message?.includes('column') || error.message?.includes('not found') || error.message?.includes('brand_logo') || error.message?.includes('tagline');
        if (isColumnError) {
          console.warn('Supabase system_settings might be missing columns, retrying without newer columns...');
          const { brand_logo, tagline, ...restMapped } = mapped as any;
          const { error: retryError } = await supabase.from('system_settings').upsert(restMapped);
          if (retryError) {
            return { success: false, error: retryError.message };
          }
          return { success: true, missingColumns: true };
        }
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: any) {
      console.error('Supabase upsertSettings failed:', e);
      return { success: false, error: e.message || String(e) };
    }
  },

  // 6. COLLECTIONS
  async getCollections(fallback: any[]): Promise<any[]> {
    try {
      const { data, error } = await supabase.from('collections_data').select('*');
      if (error) {
        if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
          throw new Error('Table does not exist');
        }
        throw error;
      }
      if (!data || data.length === 0) throw new Error('No data');
      return data.map(mapCollectionFromDb);
    } catch (e) {
      console.warn('Supabase getCollections table failed or empty, trying system_settings fallback:', e);
      try {
        const { data, error } = await supabase
          .from('system_settings')
          .select('tagline')
          .eq('id', 'collections_data')
          .maybeSingle();
        if (error) throw error;
        if (data && data.tagline) {
          const parsed = JSON.parse(data.tagline);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (err) {
        console.warn('Supabase system_settings fallback for collections failed:', err);
      }
      // Try local dbCache
      try {
        const cached = await dbCache.get('aura_cached_collections');
        if (cached && Array.isArray(cached) && cached.length > 0) return cached;
      } catch (_) {}
      return fallback;
    }
  },

  async upsertCollection(c: any): Promise<boolean> {
    try {
      const mapped = mapCollectionToDb(c);
      const { error } = await supabase.from('collections_data').upsert(mapped);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase upsertCollection table failed, using system_settings fallback:', e?.message || e);
      try {
        const collections = await this.getCollections([]);
        const existingIndex = collections.findIndex(item => item.id === c.id);
        let updatedList = [...collections];
        if (existingIndex > -1) {
          updatedList[existingIndex] = { ...updatedList[existingIndex], ...c };
        } else {
          updatedList.push(c);
        }
        
        // Save to local cache
        await dbCache.set('aura_cached_collections', updatedList);
        
        // Save to system_settings in Supabase
        const { error: upsertErr } = await supabase
          .from('system_settings')
          .upsert({
            id: 'collections_data',
            tagline: JSON.stringify(updatedList),
            currency: 'BDT'
          });
        if (upsertErr) throw upsertErr;
        return true;
      } catch (err: any) {
        console.warn('Supabase system_settings fallback for upsertCollection failed:', err?.message || err);
        return false;
      }
    }
  },

  async deleteCollection(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('collections_data').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase deleteCollection table failed, using system_settings fallback:', e?.message || e);
      try {
        const collections = await this.getCollections([]);
        const updatedList = collections.filter(item => item.id !== id);
        
        // Save to local cache
        await dbCache.set('aura_cached_collections', updatedList);
        
        // Save to system_settings in Supabase
        const { error: upsertErr } = await supabase
          .from('system_settings')
          .upsert({
            id: 'collections_data',
            tagline: JSON.stringify(updatedList),
            currency: 'BDT'
          });
        if (upsertErr) throw upsertErr;
        return true;
      } catch (err: any) {
        console.warn('Supabase system_settings fallback for deleteCollection failed:', err?.message || err);
        return false;
      }
    }
  },

  // 7. RETURNS
  async getReturns(fallback: any[]): Promise<any[]> {
    try {
      const { data, error } = await supabase.from('returns_data').select('*');
      if (error) {
        if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
          throw new Error('Table does not exist');
        }
        throw error;
      }
      if (!data || data.length === 0) throw new Error('No data');
      return data.map(mapReturnFromDb);
    } catch (e) {
      console.warn('Supabase getReturns failed, trying system_settings fallback:', e);
      try {
        const { data, error } = await supabase
          .from('system_settings')
          .select('tagline')
          .eq('id', 'returns_data')
          .maybeSingle();
        if (error) throw error;
        if (data && data.tagline) {
          const parsed = JSON.parse(data.tagline);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (err) {
        console.warn('Supabase system_settings fallback for returns failed:', err);
      }
      // Try local dbCache
      try {
        const cached = await dbCache.get('aura_cached_returns');
        if (cached && Array.isArray(cached) && cached.length > 0) return cached;
      } catch (_) {}
      return fallback;
    }
  },

  async upsertReturn(r: any): Promise<boolean> {
    try {
      const mapped = mapReturnToDb(r);
      const { error } = await supabase.from('returns_data').upsert(mapped);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase upsertReturn failed, using system_settings fallback:', e?.message || e);
      try {
        const returns = await this.getReturns([]);
        const existingIndex = returns.findIndex(item => item.id === r.id);
        let updatedList = [...returns];
        if (existingIndex > -1) {
          updatedList[existingIndex] = { ...updatedList[existingIndex], ...r };
        } else {
          updatedList.push(r);
        }
        
        // Save to local cache
        await dbCache.set('aura_cached_returns', updatedList);
        
        // Save to system_settings in Supabase
        const { error: upsertErr } = await supabase
          .from('system_settings')
          .upsert({
            id: 'returns_data',
            tagline: JSON.stringify(updatedList),
            currency: 'BDT'
          });
        if (upsertErr) throw upsertErr;
        return true;
      } catch (err: any) {
        console.warn('Supabase system_settings fallback for upsertReturn failed:', err?.message || err);
        return false;
      }
    }
  },

  // 8. STAFF
  async getStaff(fallback: any[]): Promise<any[]> {
    try {
      const { data, error } = await supabase.from('staff_data').select('*');
      if (error) {
        if (error.code === 'PGRST116' || error.message?.includes('does not exist')) {
          throw new Error('Table does not exist');
        }
        throw error;
      }
      if (!data || data.length === 0) throw new Error('No data');
      return data.map(mapStaffFromDb);
    } catch (e) {
      console.warn('Supabase getStaff failed, trying system_settings fallback:', e);
      try {
        const { data, error } = await supabase
          .from('system_settings')
          .select('tagline')
          .eq('id', 'staff_data')
          .maybeSingle();
        if (error) throw error;
        if (data && data.tagline) {
          const parsed = JSON.parse(data.tagline);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (err) {
        console.warn('Supabase system_settings fallback for staff failed:', err);
      }
      // Try local dbCache
      try {
        const cached = await dbCache.get('aura_cached_staff');
        if (cached && Array.isArray(cached) && cached.length > 0) return cached;
      } catch (_) {}
      return fallback;
    }
  },

  async upsertStaff(s: any): Promise<boolean> {
    try {
      const mapped = mapStaffToDb(s);
      const { error } = await supabase.from('staff_data').upsert(mapped);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase upsertStaff failed, using system_settings fallback:', e?.message || e);
      try {
        const staffList = await this.getStaff([]);
        const existingIndex = staffList.findIndex(item => item.email === s.email);
        let updatedList = [...staffList];
        if (existingIndex > -1) {
          updatedList[existingIndex] = { ...updatedList[existingIndex], ...s };
        } else {
          updatedList.push(s);
        }
        
        // Save to local cache
        await dbCache.set('aura_cached_staff', updatedList);
        
        // Save to system_settings in Supabase
        const { error: upsertErr } = await supabase
          .from('system_settings')
          .upsert({
            id: 'staff_data',
            tagline: JSON.stringify(updatedList),
            currency: 'BDT'
          });
        if (upsertErr) throw upsertErr;
        return true;
      } catch (err: any) {
        console.warn('Supabase system_settings fallback for upsertStaff failed:', err?.message || err);
        return false;
      }
    }
  },

  async deleteStaff(email: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('staff_data').delete().eq('email', email);
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase deleteStaff failed, using system_settings fallback:', e?.message || e);
      try {
        const staffList = await this.getStaff([]);
        const updatedList = staffList.filter(item => item.email !== email);
        
        // Save to local cache
        await dbCache.set('aura_cached_staff', updatedList);
        
        // Save to system_settings in Supabase
        const { error: upsertErr } = await supabase
          .from('system_settings')
          .upsert({
            id: 'staff_data',
            tagline: JSON.stringify(updatedList),
            currency: 'BDT'
          });
        if (upsertErr) throw upsertErr;
        return true;
      } catch (err: any) {
        console.warn('Supabase system_settings fallback for deleteStaff failed:', err?.message || err);
        return false;
      }
    }
  },

  // 9. CATEGORIES
  async getCategories(fallback: string[]): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('tagline')
        .eq('id', 'categories_list')
        .maybeSingle();
      if (error) throw error;
      if (data && data.tagline) {
        try {
          const parsed = JSON.parse(data.tagline);
          if (Array.isArray(parsed)) return parsed;
        } catch (_) {}
      }
      return fallback;
    } catch (e) {
      console.warn('Supabase getCategories failed, using fallback:', e);
      return fallback;
    }
  },

  async insertCategory(name: string): Promise<boolean> {
    try {
      const categories = await this.getCategories([]);
      if (!categories.includes(name)) {
        const updated = [...categories, name];
        const { error } = await supabase
          .from('system_settings')
          .upsert({
            id: 'categories_list',
            tagline: JSON.stringify(updated),
            currency: 'BDT'
          });
        if (error) throw error;
      }
      return true;
    } catch (e) {
      console.error('Supabase insertCategory failed:', e);
      return false;
    }
  },

  async deleteCategory(name: string): Promise<boolean> {
    try {
      const categories = await this.getCategories([]);
      const updated = categories.filter(c => c !== name);
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: 'categories_list',
          tagline: JSON.stringify(updated),
          currency: 'BDT'
        });
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase deleteCategory failed:', e);
      return false;
    }
  },

  // 10. BRANDS
  async getBrands(fallback: string[]): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('tagline')
        .eq('id', 'brands_list')
        .maybeSingle();
      if (error) throw error;
      if (data && data.tagline) {
        try {
          const parsed = JSON.parse(data.tagline);
          if (Array.isArray(parsed)) return parsed;
        } catch (_) {}
      }
      return fallback;
    } catch (e) {
      console.warn('Supabase getBrands failed, using fallback:', e);
      return fallback;
    }
  },

  async insertBrand(name: string): Promise<boolean> {
    try {
      const brands = await this.getBrands([]);
      if (!brands.includes(name)) {
        const updated = [...brands, name];
        const { error } = await supabase
          .from('system_settings')
          .upsert({
            id: 'brands_list',
            tagline: JSON.stringify(updated),
            currency: 'BDT'
          });
        if (error) throw error;
      }
      return true;
    } catch (e) {
      console.error('Supabase insertBrand failed:', e);
      return false;
    }
  },

  async deleteBrand(name: string): Promise<boolean> {
    try {
      const brands = await this.getBrands([]);
      const updated = brands.filter(b => b !== name);
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: 'brands_list',
          tagline: JSON.stringify(updated),
          currency: 'BDT'
        });
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase deleteBrand failed:', e);
      return false;
    }
  },

  // 11. COLLECTIONS
  async getCollectionsList(fallback: string[]): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('tagline')
        .eq('id', 'collections_list')
        .maybeSingle();
      if (error) throw error;
      if (data && data.tagline) {
        try {
          const parsed = JSON.parse(data.tagline);
          if (Array.isArray(parsed)) return parsed;
        } catch (_) {}
      }
      return fallback;
    } catch (e) {
      console.warn('Supabase getCollectionsList failed, using fallback:', e);
      return fallback;
    }
  },

  async insertCollectionList(name: string): Promise<boolean> {
    try {
      const collections = await this.getCollectionsList([]);
      if (!collections.includes(name)) {
        const updated = [...collections, name];
        const { error } = await supabase
          .from('system_settings')
          .upsert({
            id: 'collections_list',
            tagline: JSON.stringify(updated),
            currency: 'BDT'
          });
        if (error) throw error;
      }
      return true;
    } catch (e) {
      console.error('Supabase insertCollectionList failed:', e);
      return false;
    }
  },

  async deleteCollectionList(name: string): Promise<boolean> {
    try {
      const collections = await this.getCollectionsList([]);
      const updated = collections.filter(c => c !== name);
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: 'collections_list',
          tagline: JSON.stringify(updated),
          currency: 'BDT'
        });
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase deleteCollectionList failed:', e);
      return false;
    }
  },

  // 12. HOMEPAGE SETTINGS (Hero Banner)
  async getHomepageSettings(fallback: HomepageSettings): Promise<HomepageSettings> {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('tagline')
        .eq('id', 'homepage_settings')
        .maybeSingle();
      if (error) throw error;
      if (data && data.tagline) {
        try {
          const parsed = JSON.parse(data.tagline);
          return {
            id: 'hero_banner',
            hero_title: parsed.hero_title || fallback.hero_title,
            hero_subtitle: parsed.hero_subtitle || fallback.hero_subtitle,
            hero_description: parsed.hero_description || fallback.hero_description,
            hero_image_url: parsed.hero_image_url || fallback.hero_image_url,
          };
        } catch (_) {}
      }
      return fallback;
    } catch (e) {
      console.warn('Supabase getHomepageSettings failed, using fallback:', e);
      return fallback;
    }
  },

  async upsertHomepageSettings(settings: HomepageSettings): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: 'homepage_settings',
          tagline: JSON.stringify({
            hero_title: settings.hero_title,
            hero_subtitle: settings.hero_subtitle,
            hero_description: settings.hero_description,
            hero_image_url: settings.hero_image_url,
          }),
          currency: 'BDT'
        });
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase upsertHomepageSettings failed:', e);
      return false;
    }
  },

  // 13. COURIER SETTINGS
  async getCourierSettings(): Promise<CourierSetting[]> {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('tagline')
        .eq('id', 'courier_settings')
        .maybeSingle();
      if (error) throw error;
      if (data && data.tagline) {
        try {
          const parsed = JSON.parse(data.tagline);
          if (Array.isArray(parsed)) {
            return cleanCourierSettings(parsed);
          }
        } catch (_) {}
      }
      const local = await dbCache.get('aura_cached_courier_settings');
      if (local && Array.isArray(local)) return cleanCourierSettings(local);
      return [];
    } catch (e) {
      console.warn('Supabase getCourierSettings failed, using local fallback:', e);
      const local = await dbCache.get('aura_cached_courier_settings');
      if (local && Array.isArray(local)) return cleanCourierSettings(local);
      return [];
    }
  },

  async upsertCourierSetting(setting: CourierSetting): Promise<boolean> {
    try {
      const currentList = await this.getCourierSettings();

      const name = String(setting.courier_name || '').trim();
      if (!name) throw new Error('Courier name is required');

      const targetId = String(setting.id || `COURIER-${name.replace(/\s+/g, '-').toUpperCase()}`).trim();
      const newCourier: CourierSetting = {
        id: targetId,
        courier_name: name,
        api_key: String(setting.api_key || '').trim(),
        client_id: String(setting.client_id || '').trim(),
        secret_key: String(setting.secret_key || '').trim(),
        default_weight: String(setting.default_weight || '0.5').trim(),
        default_note: String(setting.default_note || '[INVO_CUSTOMER_NOTE]').trim(),
        created_at: String(setting.created_at || new Date().toISOString()).trim()
      };

      // Exclude old matches of either the same ID or name (case-insensitive) to clean duplicates
      const filteredList = currentList.filter(item => 
        item.id !== targetId && 
        item.courier_name.toLowerCase() !== name.toLowerCase()
      );

      // Append and run through robust cleaner
      const updatedList = cleanCourierSettings([...filteredList, newCourier]);

      // Cache updated list locally
      await dbCache.set('aura_cached_courier_settings', updatedList);

      // Clear obsolete system_settings rows (Trash Cleaning) to prevent cluttering or over-quota issues
      const obsoleteKeys = ['courier_setting', 'courier_api', 'courier_api_settings', 'steadfast_settings', 'courier_config', 'steadfast_config'];
      try {
        await supabase
          .from('system_settings')
          .delete()
          .in('id', obsoleteKeys);
      } catch (err) {
        console.warn('Error clearing obsolete system_settings rows:', err);
      }

      // Upsert the fresh & clean array
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: 'courier_settings',
          tagline: JSON.stringify(updatedList),
          currency: 'BDT'
        });
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase upsertCourierSetting failed, fell back to local cache:', e?.message || e);
      try {
        const currentList = await this.getCourierSettings();
        const filteredList = currentList.filter(item => 
          item.id !== setting.id && 
          item.courier_name.toLowerCase() !== String(setting.courier_name || '').trim().toLowerCase()
        );
        const updatedList = cleanCourierSettings([...filteredList, setting]);
        await dbCache.set('aura_cached_courier_settings', updatedList);
      } catch (_) {}
      return true;
    }
  },

  async deleteCourierSetting(id: string): Promise<boolean> {
    try {
      const list = await this.getCourierSettings();
      const updatedList = cleanCourierSettings(list.filter(item => item.id !== id));

      await dbCache.set('aura_cached_courier_settings', updatedList);

      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: 'courier_settings',
          tagline: JSON.stringify(updatedList),
          currency: 'BDT'
        });
      if (error) throw error;
      return true;
    } catch (e: any) {
      console.warn('Supabase deleteCourierSetting failed, fell back to local cache:', e?.message || e);
      try {
        const list = await this.getCourierSettings();
        const updatedList = cleanCourierSettings(list.filter(item => item.id !== id));
        await dbCache.set('aura_cached_courier_settings', updatedList);
      } catch (_) {}
      return true;
    }
  },

  async getTrackingSettings(): Promise<TrackingSettings> {
    const defaultVal: TrackingSettings = {
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
    try {
      const { data, error } = await supabase.from('system_settings').select('*').eq('id', 'tracking_settings').maybeSingle();
      if (error) throw error;
      if (data && data.tagline) {
        try {
          const parsed = JSON.parse(data.tagline);
          return {
            gtmContainerId: parsed.gtmContainerId || '',
            gtmServerUrl: parsed.gtmServerUrl || '',
            metaPixelId: parsed.metaPixelId || '',
            metaAccessToken: parsed.metaAccessToken || '',
            metaTestEventCode: parsed.metaTestEventCode || '',
            tiktokPixelId: parsed.tiktokPixelId || '',
            tiktokAccessToken: parsed.tiktokAccessToken || '',
            threadsPixelId: parsed.threadsPixelId || '',
            xPixelId: parsed.xPixelId || '',
            googleAnalyticsId: parsed.googleAnalyticsId || '',
          };
        } catch (_) {}
      }
      const local = localStorage.getItem('aura_tracking_settings');
      return local ? JSON.parse(local) : defaultVal;
    } catch (e) {
      console.warn('Supabase getTrackingSettings failed, using local fallback:', e);
      const local = localStorage.getItem('aura_tracking_settings');
      return local ? JSON.parse(local) : defaultVal;
    }
  },

  async upsertTrackingSettings(setting: TrackingSettings): Promise<boolean> {
    try {
      localStorage.setItem('aura_tracking_settings', JSON.stringify(setting));
      const { error } = await supabase.from('system_settings').upsert({
        id: 'tracking_settings',
        tagline: JSON.stringify(setting),
        currency: 'BDT',
        tax_rate: 0,
        low_stock_limit: 5,
        theme_mode: 'dark'
      });
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase upsertTrackingSettings failed:', e);
      return false;
    }
  },

  // Initialize/Seed Supabase tables with current local data
  async seedTables(data: {
    products: Product[];
    orders: Order[];
    customers: Customer[];
    notifications: Notification[];
    settings: SystemSettings;
    collections: any[];
    returns: any[];
    staff: any[];
  }): Promise<{ success: boolean; logs: string[] }> {
    const logs: string[] = [];
    try {
      logs.push('সুপাবেজ টেবিল সিডিং শুরু হচ্ছে...');

      // Seed Settings
      logs.push('১. গ্লোবাল সেটিংস সিডিং...');
      await supabase.from('system_settings').upsert(mapSettingsToDb(data.settings));

      // Seed Products
      logs.push(`২. প্রোডাক্ট ক্যাটালগ সিডিং (${data.products.length} টি আইটেম)...`);
      await Promise.all(data.products.map(p => supabase.from('products').upsert(mapProductToDb(p))));

      // Seed Orders
      logs.push(`৩. অর্ডার ট্রানজ্যাকশন সিডিং (${data.orders.length} টি আইটেম)...`);
      await Promise.all(data.orders.map(o => supabase.from('orders').upsert(mapOrderToDb(o))));

      // Seed Customers
      logs.push(`৪. কাস্টমার ডিরেক্টরি সিডিং (${data.customers.length} টি প্রোফাইল)...`);
      await Promise.all(data.customers.map(c => supabase.from('customers').upsert(mapCustomerToDb(c))));

      // Seed Notifications
      logs.push(`৫. নোটিফিকেশন সিডিং (${data.notifications.length} টি)...`);
      await Promise.all(data.notifications.map(n => supabase.from('notifications').upsert(mapNotificationToDb(n))));

      // Seed Collections
      logs.push(`৬. কালেকশন সিডিং (${data.collections.length} টি)...`);
      await Promise.all(data.collections.map(c => supabase.from('collections_data').upsert(mapCollectionToDb(c))));

      // Seed Returns
      logs.push(`৭. রিটার্ন ডাটা সিডিং (${data.returns.length} টি)...`);
      await Promise.all(data.returns.map(r => supabase.from('returns_data').upsert(mapReturnToDb(r))));

      // Seed Staff
      logs.push(`৮. স্টাফ মেম্বার সিডিং (${data.staff.length} টি)...`);
      await Promise.all(data.staff.map(s => supabase.from('staff_data').upsert(mapStaffToDb(s))));

      // Seed Categories List
      logs.push(`৯. ক্যাটাগরি তালিকা সিডিং...`);
      const initialCats = ['Apparel', 'Leather Goods', 'Footwear', 'Accessories', 'Eyewear'];
      await supabase.from('system_settings').upsert({
        id: 'categories_list',
        tagline: JSON.stringify(initialCats),
        currency: 'BDT'
      });

      // Seed Brands List
      logs.push(`১০. ব্র্যান্ড তালিকা সিডিং...`);
      const initialBrands = ['Aura Lux', 'Monaco Atelier', 'Breeze Couture', 'Vanguard Knit', 'Atelier Luxe', 'Monarque Premium'];
      await supabase.from('system_settings').upsert({
        id: 'brands_list',
        tagline: JSON.stringify(initialBrands),
        currency: 'BDT'
      });

      // Seed Collections List
      logs.push(`১১. কালেকশন তালিকা সিডিং...`);
      const initialCollections = ['Eid Collection', 'Winter Collection', 'Summer Collection', 'New Arrival', 'Premium Collection'];
      await supabase.from('system_settings').upsert({
        id: 'collections_list',
        tagline: JSON.stringify(initialCollections),
        currency: 'BDT'
      });

      logs.push('✅ সুপাবেজে সকল ডাটা সফলভাবে পুশ করা হয়েছে!');
      return { success: true, logs };
    } catch (e: any) {
      logs.push(`❌ ত্রুটি: ${e.message || String(e)}`);
      return { success: false, logs };
    }
  },
};
