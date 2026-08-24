'use client';

import React from 'react';
import { 
  Search, 
  Menu, 
  RefreshCw, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  Shield
} from 'lucide-react';
import { DateRange, ApiConnectionState } from '@/lib/types';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  connectionState: ApiConnectionState;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenCustomerAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery,
  connectionState,
  onRefresh,
  isRefreshing,
  onOpenCustomerAdmin
}) => {
  return (
    <header className="sticky top-0 z-30 bg-offwhite/90 backdrop-blur-md border-b border-stone-200/60 px-4 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search & Mobile Navigation Toggle */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2.5 rounded-2xl bg-white border border-stone-200/80 text-charcoal hover:bg-stone-50"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Global Search (transactions, customers, orders, emails)..."
              className={`
                w-full bg-white border rounded-2xl pl-10 pr-16 py-2.5 text-sm text-charcoal 
                placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-clay/30 focus:border-clay 
                transition-all shadow-sm
                ${searchQuery ? 'border-clay/60 ring-1 ring-clay/20' : 'border-stone-200/80'}
              `}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-clay hover:text-clay-dark bg-clay-soft px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Date Range Controls, Admin Window Launcher & Connection Badges */}
        <div className="flex items-center flex-wrap justify-between md:justify-end gap-3">
          
          {/* Customer Admin Launcher Button */}
          {onOpenCustomerAdmin && (
            <button
              onClick={onOpenCustomerAdmin}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-clay to-clay-dark text-white text-xs font-extrabold shadow-clay-sm hover:brightness-110 transition-all cursor-pointer"
              title="Open Customer Details Admin Window"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Customer Admin Window</span>
            </button>
          )}

          {/* Connection Indicators */}
          <div className="hidden sm:flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              connectionState.supabaseStatus === 'connected'
                ? 'bg-sage-soft border-sage/40 text-sage-dark'
                : 'bg-clay-soft border-clay/30 text-clay-dark'
            }`}>
              {connectionState.supabaseStatus === 'connected' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-dark" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-clay-dark" />
              )}
              <span>Supabase: {connectionState.supabaseStatus === 'connected' ? 'Live DB' : 'Fallback'}</span>
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              connectionState.postmanStatus === 'connected'
                ? 'bg-sage-soft border-sage/40 text-sage-dark'
                : 'bg-stone-100 border-stone-200 text-stone-600'
            }`}>
              <Clock className="w-3.5 h-3.5 text-muted" />
              <span>Postman: {connectionState.postmanStatus === 'connected' ? 'Connected' : 'Mock'}</span>
            </div>
          </div>

          {/* Date Filter Pills */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-stone-200/80 shadow-sm">
            <Calendar className="w-4 h-4 text-stone-400 ml-2 mr-1 hidden xs:block" />
            {(['7d', '30d', 'ytd'] as DateRange[]).map((range) => {
              const label = range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'YTD';
              const isActive = dateRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`
                    px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150
                    ${isActive 
                      ? 'bg-sage-soft text-sage-dark shadow-xs border border-sage/30' 
                      : 'text-muted hover:text-charcoal hover:bg-stone-50'
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Refresh Action */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-2xl bg-white border border-stone-200/80 text-charcoal hover:bg-clay-soft/50 hover:text-clay transition-all shadow-sm disabled:opacity-50"
            title="Refresh Data & Check Endpoints"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-clay' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

