import { 
  KPISummary, 
  RevenueDataPoint, 
  CategoryDistribution, 
  Transaction, 
  PostmanSyncEvent,
  CustomerRecord,
  SalesChannelBreakdown,
  DateRange 
} from './types';

export const MOCK_KPI_DATA: Record<DateRange, KPISummary> = {
  '7d': {
    totalRevenue: 48250.80,
    revenueGrowth: 14.2,
    totalOrders: 642,
    ordersGrowth: 8.5,
    avgOrderValue: 75.15,
    aovGrowth: 5.2,
    postmanSyncCount: 128,
    lastSyncTime: '2 mins ago'
  },
  '30d': {
    totalRevenue: 194800.50,
    revenueGrowth: 18.7,
    totalOrders: 2410,
    ordersGrowth: 12.3,
    avgOrderValue: 80.82,
    aovGrowth: 5.8,
    postmanSyncCount: 540,
    lastSyncTime: '5 mins ago'
  },
  'ytd': {
    totalRevenue: 1480920.00,
    revenueGrowth: 24.5,
    totalOrders: 18940,
    ordersGrowth: 19.1,
    avgOrderValue: 78.19,
    aovGrowth: 4.6,
    postmanSyncCount: 4820,
    lastSyncTime: '10 mins ago'
  }
};

export const MOCK_REVENUE_CHART_DATA: Record<DateRange, RevenueDataPoint[]> = {
  '7d': [
    { date: 'Mon', revenue: 6200, orders: 82, target: 5800 },
    { date: 'Tue', revenue: 7100, orders: 94, target: 6000 },
    { date: 'Wed', revenue: 5900, orders: 78, target: 6000 },
    { date: 'Thu', revenue: 8400, orders: 110, target: 6500 },
    { date: 'Fri', revenue: 9800, orders: 132, target: 7000 },
    { date: 'Sat', revenue: 5400, orders: 71, target: 5000 },
    { date: 'Sun', revenue: 5450, orders: 75, target: 5000 }
  ],
  '30d': [
    { date: 'Week 1', revenue: 41200, orders: 530, target: 38000 },
    { date: 'Week 2', revenue: 46800, orders: 590, target: 40000 },
    { date: 'Week 3', revenue: 52400, orders: 660, target: 42000 },
    { date: 'Week 4', revenue: 54400, orders: 630, target: 45000 }
  ],
  'ytd': [
    { date: 'Jan', revenue: 105000, orders: 1340, target: 95000 },
    { date: 'Feb', revenue: 118000, orders: 1490, target: 100000 },
    { date: 'Mar', revenue: 124000, orders: 1560, target: 110000 },
    { date: 'Apr', revenue: 132000, orders: 1680, target: 115000 },
    { date: 'May', revenue: 145000, orders: 1820, target: 120000 },
    { date: 'Jun', revenue: 138000, orders: 1750, target: 125000 },
    { date: 'Jul', revenue: 152000, orders: 1940, target: 130000 },
    { date: 'Aug', revenue: 168000, orders: 2100, target: 135000 },
    { date: 'Sep', revenue: 162000, orders: 2020, target: 140000 },
    { date: 'Oct', revenue: 174000, orders: 2180, target: 145000 },
    { date: 'Nov', revenue: 181000, orders: 2260, target: 150000 },
    { date: 'Dec', revenue: 194000, orders: 2400, target: 160000 }
  ]
};

export const MOCK_CATEGORY_DISTRIBUTION: CategoryDistribution[] = [
  { name: 'SaaS Software', value: 78400, percentage: 40.2, color: '#C86D51' },     // Primary Clay
  { name: 'Hardware & IoT', value: 48600, percentage: 24.9, color: '#88C090' },     // Soft Light Green
  { name: 'Consulting', value: 34200, percentage: 17.6, color: '#A8543B' },        // Dark Clay
  { name: 'Subscriptions', value: 21600, percentage: 11.1, color: '#3E7B4B' },     // Forest Sage
  { name: 'Support Addons', value: 12000, percentage: 6.2, color: '#DDB29B' }       // Muted Clay Accent
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'ORD-9824',
    customer: 'Elena Rostova',
    email: 'elena.rostova@techsolutions.com',
    date: '2026-08-09 18:42',
    amount: 1450.00,
    status: 'Paid',
    paymentMethod: 'Credit Card (Stripe)'
  },
  {
    id: 'ORD-9823',
    customer: 'Marcus Vance',
    email: 'marcus@vancecapital.io',
    date: '2026-08-09 17:15',
    amount: 820.50,
    status: 'Paid',
    paymentMethod: 'ACH Transfer'
  },
  {
    id: 'ORD-9822',
    customer: 'Sophia Chen',
    email: 'sophia.c@designworks.co',
    date: '2026-08-09 15:30',
    amount: 340.00,
    status: 'Pending',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-9821',
    customer: 'David Sterling',
    email: 'dsterling@globalenterprises.com',
    date: '2026-08-09 14:05',
    amount: 2890.00,
    status: 'Paid',
    paymentMethod: 'Credit Card (Visa)'
  },
  {
    id: 'ORD-9820',
    customer: 'Amara Okafor',
    email: 'amara@cloudnext.org',
    date: '2026-08-09 11:50',
    amount: 520.00,
    status: 'Processing',
    paymentMethod: 'Stripe Billing'
  },
  {
    id: 'ORD-9819',
    customer: 'Lucas Meyer',
    email: 'lmeyer@synapse.ai',
    date: '2026-08-08 22:10',
    amount: 120.00,
    status: 'Refunded',
    paymentMethod: 'Credit Card (Mastercard)'
  },
  {
    id: 'ORD-9818',
    customer: 'Chloe Bennett',
    email: 'chloe@apexdesign.io',
    date: '2026-08-08 19:40',
    amount: 675.00,
    status: 'Paid',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ORD-9817',
    customer: 'Jonathan Wright',
    email: 'j.wright@frontierlabs.com',
    date: '2026-08-08 16:25',
    amount: 1950.00,
    status: 'Paid',
    paymentMethod: 'Wire Transfer'
  }
];

export const MOCK_POSTMAN_EVENTS: PostmanSyncEvent[] = [
  {
    id: 'SYNC-1049',
    timestamp: '2 mins ago',
    endpoint: '/api/v1/sales/realtime-feed',
    status: 'success',
    recordsSynced: 42,
    responseTimeMs: 145
  },
  {
    id: 'SYNC-1048',
    timestamp: '18 mins ago',
    endpoint: '/api/v1/customers/sync-tags',
    status: 'success',
    recordsSynced: 128,
    responseTimeMs: 210
  },
  {
    id: 'SYNC-1047',
    timestamp: '45 mins ago',
    endpoint: '/api/v1/orders/reconciliation',
    status: 'success',
    recordsSynced: 15,
    responseTimeMs: 180
  },
  {
    id: 'SYNC-1046',
    timestamp: '1 hour ago',
    endpoint: '/api/v1/metrics/hourly-agg',
    status: 'success',
    recordsSynced: 300,
    responseTimeMs: 310
  }
];

export const MOCK_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'CUST-001',
    name: 'Elena Rostova',
    email: 'elena.rostova@techsolutions.com',
    company: 'Tech Solutions Inc',
    totalSpent: 14500.00,
    ordersCount: 12,
    status: 'VIP',
    lastPurchase: '2026-08-09'
  },
  {
    id: 'CUST-002',
    name: 'Marcus Vance',
    email: 'marcus@vancecapital.io',
    company: 'Vance Capital',
    totalSpent: 8200.50,
    ordersCount: 8,
    status: 'Active',
    lastPurchase: '2026-08-09'
  },
  {
    id: 'CUST-003',
    name: 'David Sterling',
    email: 'dsterling@globalenterprises.com',
    company: 'Global Enterprises',
    totalSpent: 28900.00,
    ordersCount: 22,
    status: 'VIP',
    lastPurchase: '2026-08-09'
  },
  {
    id: 'CUST-004',
    name: 'Sophia Chen',
    email: 'sophia.c@designworks.co',
    company: 'DesignWorks Co',
    totalSpent: 3400.00,
    ordersCount: 5,
    status: 'Active',
    lastPurchase: '2026-08-09'
  },
  {
    id: 'CUST-005',
    name: 'Amara Okafor',
    email: 'amara@cloudnext.org',
    company: 'CloudNext Org',
    totalSpent: 5200.00,
    ordersCount: 6,
    status: 'Active',
    lastPurchase: '2026-08-09'
  }
];

export const MOCK_SALES_CHANNELS: SalesChannelBreakdown[] = [
  { channel: 'Direct Web Portal', revenue: 98400, share: 50.5, growth: 16.4, color: '#C86D51' },
  { channel: 'Enterprise Inbound', revenue: 48600, share: 24.9, growth: 22.1, color: '#3E7B4B' },
  { channel: 'Partner Affiliates', revenue: 31200, share: 16.0, growth: 8.7, color: '#88C090' },
  { channel: 'Marketplace API', revenue: 16600, share: 8.6, growth: 14.2, color: '#A8543B' }
];
