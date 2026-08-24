'use client';

import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Calendar, ArrowUpRight } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200/70 shadow-card">
        <div>
          <h2 className="text-xl font-bold text-charcoal tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-clay" /> Deep Analytics & Cohorts
          </h2>
          <p className="text-xs text-muted">Customer Lifetime Value (LTV), Churn, and Growth Metrics</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sage-dark bg-sage-soft px-3 py-1.5 rounded-full border border-sage/30">
            Model: Predictive Retention v2.4
          </span>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card">
          <p className="text-xs text-muted uppercase font-bold">Avg Customer LTV</p>
          <h3 className="text-3xl font-extrabold text-charcoal mt-1">$4,850.00</h3>
          <span className="inline-flex items-center gap-1 text-xs text-sage-dark font-bold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% YoY
          </span>
        </div>

        <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card">
          <p className="text-xs text-muted uppercase font-bold">Customer Retention Rate</p>
          <h3 className="text-3xl font-extrabold text-charcoal mt-1">92.4%</h3>
          <span className="inline-flex items-center gap-1 text-xs text-sage-dark font-bold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" /> Churn rate low (1.6%)
          </span>
        </div>

        <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card">
          <p className="text-xs text-muted uppercase font-bold">Net Revenue Retention (NRR)</p>
          <h3 className="text-3xl font-extrabold text-charcoal mt-1">118%</h3>
          <span className="inline-flex items-center gap-1 text-xs text-sage-dark font-bold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" /> Expansion MRR active
          </span>
        </div>
      </div>

      {/* Regional Cohort breakdown */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-6 shadow-card">
        <h3 className="text-base font-bold text-charcoal mb-4">Regional Sales Velocity</h3>
        
        <div className="space-y-4">
          {[
            { region: 'North America (US & CA)', revenue: '$112,400', share: 58, color: '#C86D51' },
            { region: 'Europe (UK, DE, FR)', revenue: '$48,200', share: 25, color: '#88C090' },
            { region: 'Asia-Pacific (JP, SG, AU)', revenue: '$24,100', share: 12, color: '#A8543B' },
            { region: 'Latin America & ROW', revenue: '$10,100', share: 5, color: '#3E7B4B' },
          ].map((item) => (
            <div key={item.region} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-charcoal">
                <span>{item.region}</span>
                <span>{item.revenue} ({item.share}%)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.share}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
