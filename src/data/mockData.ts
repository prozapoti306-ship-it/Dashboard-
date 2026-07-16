import { Product, Order, Customer, Notification, DashboardStats, SystemSettings, OrderStatus } from '../types';

export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_CUSTOMERS: Customer[] = [];

// --- 5 Core Orders from reference image 1000048513.png ---
export const INITIAL_ORDERS: Order[] = [];

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
  tagline: "",
  facebookPageUrl: "https://facebook.com",
  instagramProfileUrl: "https://instagram.com",
  whatsappNumber: "8801792572306"
};
