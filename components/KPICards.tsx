'use client';

import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Radio, 
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { KPISummary, PostmanSyncEvent } from '@/lib/types';

interface KPICardsProps {
  kpi: KPISummary;
  postmanEvents: PostmanSyncEvent[];
}

export const KPICards: React.FC<KPICardsProps> = ({ kpi, postmanEvents }) => {
  const latestEvent = postmanEvents[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      
      {/* 1. Total Sales / Revenue Card */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card hover:shadow-clay-md transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Total Sales / Revenue</span>
          <div className="w-10 h-10 rounded-2xl bg-clay-soft text-clay flex items-center justify-center group-hover:scale-110 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-charcoal tracking-tight">
            ${kpi.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sage-soft text-sage-dark border border-sage/30">
            <ArrowUpRight className="w-3.5 h-3.5" /> +{kpi.revenueGrowth}%
          </span>
          <span className="text-xs text-muted">vs previous period</span>
        </div>
      </div>

      {/* 2. Total Orders Card */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card hover:shadow-clay-md transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Total Orders</span>
          <div className="w-10 h-10 rounded-2xl bg-sage-soft text-sage-dark flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-charcoal tracking-tight">
            {kpi.totalOrders.toLocaleString('en-US')}
          </h2>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sage-soft text-sage-dark border border-sage/30">
            <ArrowUpRight className="w-3.5 h-3.5" /> +{kpi.ordersGrowth}%
          </span>
          <span className="text-xs text-muted">conversion rate 4.2%</span>
        </div>
      </div>

      {/* 3. Average Order Value (AOV) */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card hover:shadow-clay-md transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Avg Order Value (AOV)</span>
          <div className="w-10 h-10 rounded-2xl bg-clay-soft text-clay-dark flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-charcoal tracking-tight">
            ${kpi.avgOrderValue.toFixed(2)}
          </h2>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sage-soft text-sage-dark border border-sage/30">
            <ArrowUpRight className="w-3.5 h-3.5" /> +{kpi.aovGrowth}%
          </span>
          <span className="text-xs text-muted">per completed cart</span>
        </div>
      </div>

      {/* 4. Postman Sync Feed Card */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card hover:shadow-clay-md transition-all duration-300 group relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-clay animate-pulse" /> Postman Sync Feed
          </span>
          <div className="w-10 h-10 rounded-2xl bg-stone-100 text-charcoal flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-clay" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal truncate">
              {latestEvent?.endpoint || 'Live Sync Engine'}
            </span>
            <span className="text-[10px] font-semibold text-sage-dark bg-sage-soft px-2 py-0.5 rounded-full">
              {latestEvent?.responseTimeMs || 120}ms
            </span>
          </div>
          <p className="text-xs text-muted">
            {kpi.postmanSyncCount} sync events • {kpi.lastSyncTime}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-muted">Feed Status</span>
          <span className="font-semibold text-sage-dark flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sage" /> Operational
          </span>
        </div>
      </div>

    </div>
  );
};
