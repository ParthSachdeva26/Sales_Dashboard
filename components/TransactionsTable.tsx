'use client';

import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  Download, 
  CreditCard, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Transaction } from '@/lib/types';

interface TransactionsTableProps {
  transactions: Transaction[];
  searchQuery: string;
  onOpenCustomerAdmin?: (customerName?: string) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions, 
  searchQuery,
  onOpenCustomerAdmin
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'amount' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Reset page whenever search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter transactions by Search Query & Status
  const filtered = transactions.filter((t) => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort transactions
  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else {
      return sortOrder === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime() 
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: 'amount' | 'date') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sage-soft text-sage-dark border border-sage/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-dark" /> Paid
          </span>
        );
      case 'Pending':
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-clay-soft text-clay-dark border border-clay/30">
            <span className="w-1.5 h-1.5 rounded-full bg-clay-dark animate-ping" /> {status}
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" /> Refunded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card">
      
      {/* Table Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-stone-100">
        <div>
          <h3 className="text-lg font-bold text-charcoal tracking-tight">Recent Transactions</h3>
          <p className="text-xs text-muted">Showing real-time sales feed and order status breakdown</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-2 bg-offwhite px-3 py-1.5 rounded-2xl border border-stone-200/80 text-xs font-semibold">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <select 
              value={statusFilter} 
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-charcoal focus:outline-none cursor-pointer font-bold"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          {/* Export Button */}
          <button 
            onClick={() => alert('Exporting sales transactions CSV...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-stone-200/80 bg-white text-xs font-bold text-charcoal hover:bg-clay-soft/50 hover:text-clay transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-wider text-muted border-b border-stone-100 pb-3">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4 cursor-pointer hover:text-charcoal" onClick={() => toggleSort('date')}>
                <div className="flex items-center gap-1">
                  Date & Time <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4 cursor-pointer hover:text-charcoal text-right" onClick={() => toggleSort('amount')}>
                <div className="flex items-center justify-end gap-1">
                  Amount <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm">
            {paginated.length > 0 ? (
              paginated.map((t) => (
                <tr key={t.id} className="hover:bg-offwhite/80 transition-colors group">
                  
                  {/* Order ID */}
                  <td className="py-3.5 px-4 font-bold text-clay group-hover:underline cursor-pointer">
                    {t.id}
                  </td>

                  {/* Customer Info */}
                  <td 
                    className="py-3.5 px-4 cursor-pointer group/cust hover:opacity-80"
                    onClick={() => onOpenCustomerAdmin && onOpenCustomerAdmin(t.customer)}
                    title="Click to inspect in Customer Admin Window"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-clay-soft text-clay-dark flex items-center justify-center font-bold text-xs border border-clay/20">
                        {t.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-charcoal leading-tight group-hover/cust:text-clay transition-colors">{t.customer}</p>
                        <p className="text-xs text-muted">{t.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-xs font-medium text-stone-600">
                    {t.date}
                  </td>

                  {/* Payment Method */}
                  <td className="py-3.5 px-4 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-stone-400" />
                      <span>{t.paymentMethod}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 font-extrabold text-charcoal text-right">
                    ${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center">
                    {getStatusBadge(t.status)}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => alert(`Order details for ${t.id}`)}
                      className="p-1.5 rounded-xl hover:bg-clay-soft text-stone-400 hover:text-clay transition-all"
                      title="View Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-muted text-sm">
                  No transaction records matching filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-stone-100 text-xs text-muted">
        <div>
          Showing {paginated.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length} entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-xl border border-stone-200/80 bg-white text-charcoal hover:bg-stone-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="font-semibold text-charcoal">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-xl border border-stone-200/80 bg-white text-charcoal hover:bg-stone-50 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
