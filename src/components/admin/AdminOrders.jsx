import { useState, useEffect } from 'react';
import { ORDERS } from '../../data/adminData';
import { api } from '../../services/api';

const STATUS_COLORS = {
  processing: 'bg-amber-100 text-amber-800 border border-amber-300',
  shipped: 'bg-blue-100 text-blue-800 border border-blue-300',
  delivered: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
  cancelled: 'bg-red-100 text-red-800 border border-red-300',
};
const STATUS_LABEL = { processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled' };
const STATUS_OPTIONS = ['processing', 'shipped', 'delivered', 'cancelled'];

function formatItems(items) {
  if (!items || !Array.isArray(items)) return '—';
  return items.map((i) => `${i.name} ×${i.qty}`).join(', ');
}

export default function AdminOrders() {
  const [orders, setOrders] = useState(ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    api.getOrders()
      .then(res => {
        if (res?.data && Array.isArray(res.data)) {
          setOrders(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = orders.filter((o) => {
    const matchSearch =
      (o.customer || o.client || '').toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const changeStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    api.updateOrderStatus(id, newStatus).catch(() => {});
  };

  const counts = { all: orders.length };
  STATUS_OPTIONS.forEach((s) => { counts[s] = orders.filter((o) => o.status === s).length; });

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1c1b' }}>
          Order Management
        </h2>
        <p className="text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif', color: '#888' }}>
          Track and manage all client orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#c5a059' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by client or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border outline-none"
            style={{ borderColor: '#e0d5c5', fontFamily: 'Montserrat, sans-serif', color: '#1a1c1b', background: '#faf9f7' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 text-sm border outline-none cursor-pointer"
          style={{ borderColor: '#e0d5c5', fontFamily: 'Montserrat, sans-serif', color: '#1a1c1b', background: '#faf9f7', minWidth: '160px' }}
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </select>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[['all', 'All'], ...STATUS_OPTIONS.map((s) => [s, STATUS_LABEL[s]])].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className="text-center py-3 px-3 border transition-all"
            style={{
              borderColor: statusFilter === key ? '#c5a059' : '#e0d5c5',
              background: statusFilter === key ? '#fffbf2' : '#fff',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            <div className="text-xl font-bold" style={{ color: '#775a19' }}>{counts[key]}</div>
            <div className="text-xs mt-0.5" style={{ color: '#888' }}>{label}</div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border overflow-x-auto" style={{ borderColor: '#e0d5c5' }}>
        <table className="w-full text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <thead>
            <tr style={{ background: '#f5f0e8', borderBottom: '1px solid #e0d5c5' }}>
              {['Order ID', 'Client', 'Location', 'Items', 'Total', 'Payment', 'Shipping', 'Date', 'Status', 'Change Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: '#775a19' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-12" style={{ color: '#aaa', fontFamily: 'Montserrat, sans-serif' }}>
                  No orders found
                </td>
              </tr>
            ) : (
              filtered.map((order, idx) => {
                const name = order.customer || order.client || '—';
                const itemStr = Array.isArray(order.items) ? formatItems(order.items) : (order.items || '—');
                return (
                  <tr
                    key={order.id}
                    className="border-b transition-colors hover:bg-amber-50/40 cursor-pointer"
                    style={{ borderColor: '#f0ebe0', background: idx % 2 === 0 ? '#fff' : '#fdfcf9' }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: '#775a19' }}>{order.id}</td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: '#1a1c1b', maxWidth: '160px' }}>
                      <span className="truncate block" style={{ maxWidth: '160px' }}>{name}</span>
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#888' }}>{order.location}</td>
                    <td className="px-4 py-3 text-xs" style={{ maxWidth: '200px' }}>
                      <span className="truncate block" style={{ maxWidth: '200px' }}>{itemStr}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: '#1a1c1b' }}>${order.total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#666' }}>{order.payment}</td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#666' }}>{order.shipping}</td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#888' }}>{order.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium whitespace-nowrap ${STATUS_COLORS[order.status] || ''}`}>
                        {STATUS_LABEL[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        onChange={(e) => changeStatus(order.id, e.target.value)}
                        className="text-xs px-2 py-1.5 border outline-none cursor-pointer"
                        style={{ borderColor: '#c5a059', color: '#775a19', background: '#fffbf2' }}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs mt-3" style={{ color: '#aaa', fontFamily: 'Montserrat, sans-serif' }}>
        Showing {filtered.length} of {orders.length} orders
      </p>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }} onClick={() => setSelectedOrder(null)}>
          <div className="bg-white border w-full max-w-md mx-4 p-6" style={{ borderColor: '#c5a059' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1c1b' }}>
                Order Details
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="text-2xl leading-none" style={{ color: '#888' }}>×</button>
            </div>
            <div className="space-y-3 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {[
                ['Order ID', selectedOrder.id],
                ['Client', selectedOrder.customer || selectedOrder.client],
                ['Email', selectedOrder.email || '—'],
                ['Location', selectedOrder.location],
                ['Total', `$${selectedOrder.total.toLocaleString()}`],
                ['Payment', selectedOrder.payment],
                ['Shipping', selectedOrder.shipping],
                ['Date', selectedOrder.date],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b pb-2" style={{ borderColor: '#f0ebe0' }}>
                  <span style={{ color: '#888' }}>{label}</span>
                  <span className="font-medium text-right" style={{ color: '#1a1c1b', maxWidth: '60%' }}>{value}</span>
                </div>
              ))}
              {Array.isArray(selectedOrder.items) && (
                <div className="border-b pb-2" style={{ borderColor: '#f0ebe0' }}>
                  <span className="block mb-2" style={{ color: '#888' }}>Items</span>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs py-1" style={{ color: '#1a1c1b' }}>
                      <span>{item.name} ×{item.qty}</span>
                      <span>${item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center pt-1">
                <span style={{ color: '#888' }}>Status</span>
                <span className={`px-2 py-1 text-xs font-medium ${STATUS_COLORS[selectedOrder.status] || ''}`}>
                  {STATUS_LABEL[selectedOrder.status] || selectedOrder.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-5 py-2.5 text-sm font-medium tracking-wider"
              style={{ background: '#1a1c1b', color: '#c5a059', fontFamily: 'Montserrat, sans-serif' }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
