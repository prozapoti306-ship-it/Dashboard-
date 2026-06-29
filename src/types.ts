export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  stock: number;
  category: string;
  salesCount: number;
  rating: number;
  image: string;
  sizes?: string[];
  colors?: string[];
  fabric?: string;
  collection?: string;
  sku?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  sizeStock?: { [size: string]: number };
  colorStock?: { [color: string]: number };
  season?: string;
  brand?: string;
  productCost?: number;
  deliveryCost?: number;
  discount?: number;
  marketingCost?: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'New Order' | 'Confirmed' | 'Processing' | 'Ready to Ship' | 'Shipped' | 'Delivered' | 'Returned' | 'Cancelled';

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'Stripe' | 'PayPal' | 'Apple Pay' | 'Credit Card' | 'COD' | 'bKash' | 'Nagad' | 'Rocket';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  timeline: OrderTimeline[];
  internalNotes?: string;
}

export type CustomerSegment = 'VIP' | 'Regular' | 'New' | 'Inactive';

export interface CustomerActivity {
  action: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  joinDate: string;
  totalSpending: number;
  ordersCount: number;
  segment: CustomerSegment;
  activityTimeline: CustomerActivity[];
  gender: 'Male' | 'Female' | 'Other' | 'Unisex';
  birthday?: string;
  preferredSize?: string;
  favoriteColor?: string;
  favoriteCategory?: string;
  lastPurchaseDate?: string;
  averageOrderValue?: number;
  marketingTags?: string[];
  shirtSize?: string;
  pantSize?: string;
  shoeSize?: string;
  sizeHistory?: { date: string; item: string; size: string }[];
  customerValueScore?: number;
  buyingPatternAnalysis?: string;
  nextPurchasePrediction?: string;
  membershipTier?: 'Bronze' | 'Silver' | 'Gold' | 'VIP';
  rewardPoints?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  read: boolean;
}

export interface DashboardStats {
  todaySales: number;
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  conversionRate: number;
  revenueOverview: { month: string; revenue: number; orders: number }[];
  customerGrowth: { month: string; customers: number }[];
}

export interface SystemSettings {
  currency: string;
  taxRate: number;
  lowStockLimit: number;
  eyeProtectionEnabled: boolean;
  blueLightFilterLevel: number; // 0 to 100
  themeMode: 'light' | 'dark';
  brandName: string;
}
