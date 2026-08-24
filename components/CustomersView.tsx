import React, { useState, useEffect } from 'react';
import { MOCK_CUSTOMERS } from '@/lib/mockData';
import { Users, Mail, Building, Plus, Search, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { CustomerRecord } from '@/lib/types';

interface CustomersViewProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onOpenAdminWindow?: (customerName?: string) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  searchQuery = '',
  setSearchQuery,
  onOpenAdminWindow
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const activeQuery = setSearchQuery ? searchQuery : localQuery;

  const handleQueryChange = (val: string) => {
    setLocalQuery(val);
    if (setSearchQuery) {
      setSearchQuery(val);
    }
  };

  const filtered = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(activeQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(activeQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(activeQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200/70 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-charcoal tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-clay" /> Customer Directory & Accounts
            </h2>
            <span className="bg-sage-soft text-sage-dark text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-sage/30">
              {MOCK_CUSTOMERS.length} Total Accounts
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">Manage client accounts, enterprise contacts, order history, and lifetime value</p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAdminWindow && (
            <button 
              onClick={() => onOpenAdminWindow()}
              className="flex items-center gap-2 bg-gradient-to-r from-clay to-clay-dark text-white text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow-clay-sm hover:brightness-110 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" /> Customer Admin Window
            </button>
          )}

          <button 
            onClick={() => alert('Add customer modal triggered...')}
            className="flex items-center gap-1.5 bg-white border border-stone-200 text-charcoal text-xs font-bold px-3.5 py-2.5 rounded-2xl shadow-xs hover:bg-stone-50 transition-all"
          >
            <Plus className="w-4 h-4 text-clay" /> Add Customer
          </button>
        </div>
      </div>

      {/* Customer Directory Table Container */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card">
        <div className="mb-4 max-w-md relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={activeQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search customers by name, company, or email..."
            className="w-full pl-9 pr-4 py-2 bg-offwhite border border-stone-200/80 rounded-2xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-clay/30"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-wider text-muted border-b border-stone-100 pb-3">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4 text-center">Orders</th>
                <th className="py-3 px-4 text-center">Segment</th>
                <th className="py-3 px-4 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr 
                    key={c.id} 
                    className="hover:bg-offwhite/80 transition-colors cursor-pointer group"
                    onClick={() => onOpenAdminWindow && onOpenAdminWindow(c.name)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-sage-soft text-sage-dark flex items-center justify-center font-bold text-xs border border-sage/30">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-charcoal group-hover:text-clay transition-colors">{c.name}</p>
                          <p className="text-xs text-muted flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {c.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs font-semibold text-stone-700">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-stone-400" />
                        <span>{c.company}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-black text-charcoal">
                      ${c.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-stone-600 text-xs">
                      {c.ordersCount} orders
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {c.status === 'VIP' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-clay-soft text-clay-dark border border-clay/30">
                          <Star className="w-3 h-3 fill-clay-dark" /> VIP Client
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sage-soft text-sage-dark border border-sage/30">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenAdminWindow) onOpenAdminWindow(c.name);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-offwhite border border-stone-200 text-xs font-bold text-clay hover:bg-clay-soft hover:text-clay-dark transition-all flex items-center gap-1 ml-auto"
                        title="Open Customer Details in Admin Window"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Details Admin
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted text-sm">
                    No customer records matching query "{activeQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

