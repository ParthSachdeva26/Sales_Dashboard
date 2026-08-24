'use client';

import React from 'react';
import { MOCK_SALES_CHANNELS } from '@/lib/mockData';
import { Globe, ShieldCheck, Zap, ArrowUpRight, TrendingUp, DollarSign } from 'lucide-react';

interface SalesViewProps {
  searchQuery?: string;
}

export const SalesView: React.FC<SalesViewProps> = ({ searchQuery = '' }) => {
  const filteredChannels = MOCK_SALES_CHANNELS.filter(ch => 
    ch.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-clay to-clay-dark rounded-3xl p-6 text-white shadow-clay-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
            Sales Performance Hub
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-2">
            Multi-Channel Acquisition & Pipeline
          </h2>
          <p className="text-sm text-white/80 max-w-xl mt-1">
            Real-time feed across web checkout, enterprise contracts, partner affiliates, and API integrations.
          </p>
        </div>

        <button 
          onClick={() => alert('Launching new enterprise sales entry...')}
          className="bg-sage-soft text-sage-dark font-bold text-sm px-5 py-2.5 rounded-2xl shadow-sm hover:bg-white transition-all"
        >
          + Add Manual Order
        </button>
      </div>

      {/* Channel Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(filteredChannels.length > 0 ? filteredChannels : MOCK_SALES_CHANNELS).map((ch) => (
          <div key={ch.channel} className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card hover:shadow-clay-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-muted uppercase">{ch.channel}</span>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.color }} />
            </div>

            <p className="text-2xl font-extrabold text-charcoal">
              ${ch.revenue.toLocaleString()}
            </p>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-sage-dark font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{ch.growth}%
              </span>
              <span className="text-muted">{ch.share}% of total volume</span>
            </div>
          </div>
        ))}
      </div>

      {/* Funnel & Conversion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card">
          <h3 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-clay" /> Pipeline Conversion Funnel
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-charcoal mb-1">
                <span>Unique Visitors & Leads</span>
                <span>124,500 leads (100%)</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-charcoal mb-1">
                <span>Product Demo / Cart Initialized</span>
                <span>18,400 carts (14.7%)</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-sage rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-charcoal mb-1">
                <span>Checkout Completed & Paid</span>
                <span>5,230 paid orders (4.2%)</span>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-clay rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card space-y-4">
          <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
            <Zap className="w-4 h-4 text-sage-dark" /> Sales Targets
          </h3>

          <div className="p-4 rounded-2xl bg-offwhite border border-stone-200/60">
            <p className="text-xs text-muted font-medium">Monthly Revenue Target</p>
            <p className="text-xl font-black text-charcoal">$250,000.00</p>
            <div className="mt-2 w-full h-2 bg-stone-200 rounded-full">
              <div className="h-full bg-clay rounded-full" style={{ width: '78%' }} />
            </div>
            <p className="text-[11px] text-clay-dark font-bold mt-1 text-right">78% achieved</p>
          </div>

          <div className="p-4 rounded-2xl bg-sage-soft border border-sage/30">
            <p className="text-xs text-sage-dark font-medium">Postman Auto-Reconciliation</p>
            <p className="text-xs text-charcoal mt-1 font-semibold">
              All webhooks active. 0 failed webhooks in last 24h.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
