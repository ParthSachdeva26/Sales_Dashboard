'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  X, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Star, 
  Mail, 
  Building, 
  Phone, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  ShoppingBag, 
  ShieldCheck, 
  Download, 
  Send, 
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CustomerRecord, Transaction } from '@/lib/types';
import { MOCK_CUSTOMERS, MOCK_TRANSACTIONS } from '@/lib/mockData';

interface CustomerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCustomer?: CustomerRecord | null;
  initialQuery?: string;
}

export const CustomerAdminModal: React.FC<CustomerAdminModalProps> = ({
  isOpen,
  onClose,
  initialCustomer,
  initialQuery = ''
}) => {
  const [customers, setCustomers] = useState<CustomerRecord[]>(MOCK_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(
    initialCustomer || MOCK_CUSTOMERS[0] || null
  );
  const [search, setSearch] = useState<string>(initialQuery);
  const [segmentFilter, setSegmentFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'spent' | 'orders' | 'name'>('spent');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>('');

  useEffect(() => {
    if (initialCustomer) {
      setSelectedCustomer(initialCustomer);
    }
  }, [initialCustomer]);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setSearch(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  // Filter customers
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());

    const matchesSegment = segmentFilter === 'All' || c.status === segmentFilter;

    return matchesSearch && matchesSegment;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === 'spent') return b.totalSpent - a.totalSpent;
    if (sortBy === 'orders') return b.ordersCount - a.ordersCount;
    return a.name.localeCompare(b.name);
  });

  // Find transactions for selected customer
  const customerTransactions = selectedCustomer 
    ? MOCK_TRANSACTIONS.filter(t => 
        t.customer.toLowerCase() === selectedCustomer.name.toLowerCase() ||
        t.email.toLowerCase() === selectedCustomer.email.toLowerCase()
      )
    : [];

  const handleToggleVip = (id: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'VIP' ? 'Active' : 'VIP';
        const updated = { ...c, status: nextStatus as 'Active' | 'VIP' };
        if (selectedCustomer?.id === id) {
          setSelectedCustomer(updated);
        }
        return updated;
      }
      return c;
    }));
    setActionSuccessMsg('Updated customer segment status successfully!');
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleExportCustomerData = (c: CustomerRecord) => {
    const jsonStr = JSON.stringify({ customer: c, transactions: customerTransactions }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customer_admin_${c.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setActionSuccessMsg(`Exported admin dossier for ${c.name}`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handlePopOutWindow = () => {
    const win = window.open('', '_blank', 'width=1100,height=750');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Customer Admin Window - ${selectedCustomer?.name || 'All Customers'}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
          <style>body { font-family: 'Inter', sans-serif; background-color: #F9F8F6; }</style>
        </head>
        <body class="p-8">
          <div class="max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
            <div class="flex items-center justify-between border-b pb-4">
              <div>
                <span class="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">Customer Admin Pop-Out Window</span>
                <h1 class="text-2xl font-black text-stone-900 mt-2">${selectedCustomer?.name || 'All Customers'}</h1>
                <p class="text-xs text-stone-500">${selectedCustomer?.email || ''} | ${selectedCustomer?.company || ''}</p>
              </div>
              <button onclick="window.print()" class="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl">Print Dossier</button>
            </div>

            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="p-4 bg-stone-50 rounded-2xl border">
                <p class="text-xs text-stone-500">Lifetime Value</p>
                <p class="text-xl font-black text-stone-900">$${(selectedCustomer?.totalSpent || 0).toLocaleString()}</p>
              </div>
              <div class="p-4 bg-stone-50 rounded-2xl border">
                <p class="text-xs text-stone-500">Total Orders</p>
                <p class="text-xl font-black text-stone-900">${selectedCustomer?.ordersCount || 0}</p>
              </div>
              <div class="p-4 bg-stone-50 rounded-2xl border">
                <p class="text-xs text-stone-500">Account Status</p>
                <p class="text-xl font-black text-amber-600">${selectedCustomer?.status || 'Active'}</p>
              </div>
            </div>

            <div class="border-t pt-4">
              <h3 class="font-bold text-stone-900 mb-3">Recorded Transactions</h3>
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b font-bold text-stone-400">
                    <th class="py-2">Order ID</th>
                    <th class="py-2">Date</th>
                    <th class="py-2">Amount</th>
                    <th class="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${customerTransactions.map(t => `
                    <tr class="border-b">
                      <td class="py-2.5 font-bold text-amber-700">${t.id}</td>
                      <td class="py-2.5">${t.date}</td>
                      <td class="py-2.5 font-bold">$${t.amount.toFixed(2)}</td>
                      <td class="py-2.5">${t.status}</td>
                    </tr>
                  `).join('') || `<tr><td colSpan="4" class="py-4 text-center text-stone-400">No transactions on record</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
        </body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-md p-3 sm:p-6 animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className={`
          bg-white rounded-3xl border border-stone-200/90 shadow-2xl flex flex-col transition-all duration-300 w-full overflow-hidden
          ${isMaximized ? 'w-full h-full rounded-none' : 'max-w-6xl max-h-[90vh] h-[850px]'}
        `}
      >
        
        {/* Top Window Header */}
        <div className="bg-gradient-to-r from-charcoal via-stone-900 to-charcoal text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-clay text-white flex items-center justify-center font-black shadow-clay-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">Customer Admin Window</h2>
                <span className="bg-clay-soft/30 text-clay-soft text-[10px] font-bold px-2 py-0.5 rounded-full border border-clay-soft/20">
                  Admin Master Portal
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Detailed customer profiles, order history, lifetime value analytics & management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handlePopOutWindow}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-stone-200 hover:bg-white/20 transition-all border border-white/10"
              title="Pop out into separate browser window"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Pop-out Window
            </button>

            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 rounded-xl bg-white/10 text-stone-300 hover:bg-white/20 transition-all"
              title={isMaximized ? 'Restore Size' : 'Maximize Window'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-clay text-white hover:bg-clay-dark transition-all"
              title="Close Admin Window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Success Toast */}
        {actionSuccessMsg && (
          <div className="bg-sage-soft border-b border-sage/30 text-sage-dark px-6 py-2 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sage-dark" /> {actionSuccessMsg}
            </span>
            <button onClick={() => setActionSuccessMsg('')}><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* Main Split Body */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden bg-offwhite">
          
          {/* Left Panel: Customer List & Controls */}
          <div className="w-full md:w-5/12 lg:w-4/12 border-r border-stone-200/70 bg-white flex flex-col min-h-0">
            
            {/* Search & Segment Filter Bar */}
            <div className="p-4 border-b border-stone-100 space-y-3 bg-stone-50/50">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, company..."
                  className="w-full pl-9 pr-8 py-2 bg-white border border-stone-200 rounded-2xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-clay/30"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {['All', 'VIP', 'Active'].map(seg => (
                    <button
                      key={seg}
                      onClick={() => setSegmentFilter(seg)}
                      className={`px-2.5 py-1 rounded-xl font-bold transition-all text-[11px] ${
                        segmentFilter === seg 
                          ? 'bg-clay text-white shadow-xs' 
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>

                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'spent' | 'orders' | 'name')}
                  className="bg-stone-100 text-stone-700 text-[11px] font-bold px-2 py-1 rounded-xl border border-stone-200 focus:outline-none"
                >
                  <option value="spent">Sort: LTV</option>
                  <option value="orders">Sort: Orders</option>
                  <option value="name">Sort: Name</option>
                </select>
              </div>
            </div>

            {/* Customer List Stream */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2 space-y-1">
              {sortedCustomers.length > 0 ? (
                sortedCustomers.map((c) => {
                  const isSelected = selectedCustomer?.id === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCustomer(c)}
                      className={`
                        p-3.5 rounded-2xl cursor-pointer transition-all border
                        ${isSelected 
                          ? 'bg-clay-soft/40 border-clay/40 shadow-xs ring-1 ring-clay/20' 
                          : 'bg-white border-transparent hover:bg-stone-50 hover:border-stone-200/60'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                            c.status === 'VIP' 
                              ? 'bg-clay-soft text-clay-dark border-clay/30' 
                              : 'bg-sage-soft text-sage-dark border-sage/30'
                          }`}>
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-charcoal text-xs leading-tight">{c.name}</p>
                            <p className="text-[11px] text-muted truncate max-w-[140px]">{c.company}</p>
                          </div>
                        </div>

                        {c.status === 'VIP' ? (
                          <span className="flex items-center gap-1 text-[10px] font-black bg-clay-soft text-clay-dark px-2 py-0.5 rounded-full border border-clay/30">
                            <Star className="w-2.5 h-2.5 fill-clay-dark" /> VIP
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-sage-soft text-sage-dark px-2 py-0.5 rounded-full border border-sage/30">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100/60 text-stone-600">
                        <span className="font-extrabold text-charcoal">
                          ${c.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="font-medium text-muted">
                          {c.ordersCount} orders
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-muted text-xs">
                  No customers found matching filter criteria.
                </div>
              )}
            </div>

            {/* List Footer Stats */}
            <div className="p-3 bg-stone-50 border-t border-stone-200/80 text-[11px] text-muted flex items-center justify-between font-semibold">
              <span>Total Customers: {customers.length}</span>
              <span>Showing: {sortedCustomers.length}</span>
            </div>

          </div>

          {/* Right Panel: Selected Customer Deep-Dive Inspector */}
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-6 space-y-6 bg-offwhite">
            
            {selectedCustomer ? (
              <>
                {/* Profile Banner */}
                <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-clay to-clay-dark text-white flex items-center justify-center font-black text-2xl shadow-clay-sm border-2 border-white">
                      {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-charcoal">{selectedCustomer.name}</h3>
                        <button 
                          onClick={() => handleToggleVip(selectedCustomer.id)}
                          className="hover:scale-105 transition-transform"
                          title="Click to toggle VIP status"
                        >
                          {selectedCustomer.status === 'VIP' ? (
                            <span className="flex items-center gap-1 text-xs font-black bg-clay-soft text-clay-dark px-2.5 py-1 rounded-full border border-clay/30 shadow-xs">
                              <Star className="w-3.5 h-3.5 fill-clay-dark" /> VIP Client
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-bold bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200">
                              + Make VIP
                            </span>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-stone-400" /> {selectedCustomer.email}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-stone-400" /> {selectedCustomer.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button 
                      onClick={() => handleExportCustomerData(selectedCustomer)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-bold text-charcoal hover:bg-stone-50 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" /> Export Dossier
                    </button>
                    <button 
                      onClick={() => alert(`Opening email composer for ${selectedCustomer.email}...`)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-clay text-white text-xs font-bold hover:bg-clay-dark shadow-clay-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Message
                    </button>
                  </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  
                  <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-card">
                    <p className="text-xs font-semibold text-muted flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-clay" /> Lifetime Value (LTV)
                    </p>
                    <p className="text-xl font-black text-charcoal mt-1">
                      ${selectedCustomer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-card">
                    <p className="text-xs font-semibold text-muted flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-sage-dark" /> Total Orders
                    </p>
                    <p className="text-xl font-black text-charcoal mt-1">
                      {selectedCustomer.ordersCount} orders
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-card">
                    <p className="text-xs font-semibold text-muted flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-clay-dark" /> Avg Order Value
                    </p>
                    <p className="text-xl font-black text-charcoal mt-1">
                      ${(selectedCustomer.totalSpent / (selectedCustomer.ordersCount || 1)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-card">
                    <p className="text-xs font-semibold text-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" /> Last Active
                    </p>
                    <p className="text-base font-bold text-charcoal mt-1">
                      {selectedCustomer.lastPurchase}
                    </p>
                  </div>

                </div>

                {/* Account Details & Contact Card */}
                <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card space-y-4">
                  <h4 className="text-sm font-bold text-charcoal flex items-center gap-2 border-b border-stone-100 pb-3">
                    <ShieldCheck className="w-4 h-4 text-clay" /> Customer Metadata & Account Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                      <span className="text-muted block font-semibold mb-0.5">Account ID</span>
                      <span className="font-extrabold text-clay font-mono">{selectedCustomer.id}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                      <span className="text-muted block font-semibold mb-0.5">Company Entity</span>
                      <span className="font-bold text-charcoal">{selectedCustomer.company}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                      <span className="text-muted block font-semibold mb-0.5">Verification Status</span>
                      <span className="font-bold text-sage-dark flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Enterprise
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order & Transaction History for this Customer */}
                <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">Transaction History</h4>
                      <p className="text-xs text-muted">Recent orders recorded for {selectedCustomer.name}</p>
                    </div>
                    <span className="text-xs font-bold text-clay bg-clay-soft px-2.5 py-1 rounded-full">
                      {customerTransactions.length} matching transactions
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="text-muted uppercase font-bold border-b border-stone-100 pb-2">
                          <th className="py-2 px-3">Order ID</th>
                          <th className="py-2 px-3">Date & Time</th>
                          <th className="py-2 px-3">Payment Method</th>
                          <th className="py-2 px-3 text-right">Amount</th>
                          <th className="py-2 px-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {customerTransactions.length > 0 ? (
                          customerTransactions.map(t => (
                            <tr key={t.id} className="hover:bg-stone-50/80">
                              <td className="py-2.5 px-3 font-bold text-clay">{t.id}</td>
                              <td className="py-2.5 px-3 text-stone-600">{t.date}</td>
                              <td className="py-2.5 px-3 text-stone-600">{t.paymentMethod}</td>
                              <td className="py-2.5 px-3 text-right font-black text-charcoal">
                                ${t.amount.toFixed(2)}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                  t.status === 'Paid' ? 'bg-sage-soft text-sage-dark' : 'bg-clay-soft text-clay-dark'
                                }`}>
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-muted">
                              No recent transactions linked directly to this customer record.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-muted">
                <Users className="w-12 h-12 text-stone-300 mb-2" />
                <p className="font-bold text-charcoal">No customer selected</p>
                <p className="text-xs">Select a customer from the left list to inspect details.</p>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-stone-200/80 px-6 py-3 flex items-center justify-between text-xs text-muted">
          <span>Customer Admin Portal v2.4</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-charcoal font-bold transition-all"
          >
            Close Admin View
          </button>
        </div>

      </div>

    </div>
  );
};
