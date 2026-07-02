// PostgreSQL / Supabase Schema SQL Setup Script
export const SUPABASE_SQL_SCRIPT = `-- ১. Products
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
  brand_logo TEXT
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

-- Enable Replication for real-time tracking
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
`;
