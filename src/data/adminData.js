import { ALL_COLLECTION_PRODUCTS, CURATED_DEALS, HERO_DEAL } from './products';

// ── Simulated Orders ──────────────────────────────────────────
export const ORDERS = [];

// ── Revenue analytics ─────────────────────────────────────────
export const MONTHLY_REVENUE = [
  { month: 'May', revenue: 42000, orders: 31 },
  { month: 'Jun', revenue: 58000, orders: 44 },
  { month: 'Jul', revenue: 51000, orders: 38 },
  { month: 'Aug', revenue: 63000, orders: 47 },
  { month: 'Sep', revenue: 71000, orders: 53 },
  { month: 'Oct', revenue: 88000, orders: 64 }
];

// ── Dashboard KPIs ────────────────────────────────────────────
export const DASHBOARD_STATS = {
  totalRevenue: 88420,
  revenueGrowth: 24.1,
  totalOrders: 64,
  ordersGrowth: 20.7,
  totalProducts: ALL_COLLECTION_PRODUCTS.length + CURATED_DEALS.length + 1,
  avgOrderValue: 1381,
  avgOrderGrowth: 2.9,
  pendingOrders: ORDERS.filter(o => o.status === 'processing').length,
  shippedOrders: ORDERS.filter(o => o.status === 'shipped').length,
  deliveredOrders: ORDERS.filter(o => o.status === 'delivered').length
};
