export type DateRange = '7d' | '30d' | 'ytd';

export type ActiveTab = 'dashboard' | 'sales' | 'analytics' | 'customers' | 'settings';

export interface KPISummary {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  avgOrderValue: number;
  aovGrowth: number;
  postmanSyncCount: number;
  lastSyncTime: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
  target: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  avatar?: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Processing' | 'Refunded';
  paymentMethod: string;
}

export interface PostmanSyncEvent {
  id: string;
  timestamp: string;
  endpoint: string;
  status: 'success' | 'pending' | 'failed';
  recordsSynced: number;
  responseTimeMs: number;
}

export interface ApiConnectionState {
  supabaseStatus: 'connected' | 'fallback' | 'error';
  postmanStatus: 'connected' | 'mock' | 'error';
  lastChecked: string;
  message: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  totalSpent: number;
  ordersCount: number;
  status: 'Active' | 'VIP' | 'Inactive';
  lastPurchase: string;
}

export interface SalesChannelBreakdown {
  channel: string;
  revenue: number;
  share: number;
  growth: number;
  color: string;
}
