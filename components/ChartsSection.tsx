'use client';

import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { RevenueDataPoint, CategoryDistribution } from '@/lib/types';
import { MOCK_CATEGORY_DISTRIBUTION } from '@/lib/mockData';
import { Layers, PieChart as PieIcon, BarChart2 } from 'lucide-react';

interface ChartsSectionProps {
  revenueData: RevenueDataPoint[];
  categories?: CategoryDistribution[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ 
  revenueData, 
  categories = MOCK_CATEGORY_DISTRIBUTION 
}) => {
  const [chartType, setChartType] = useState<'donut' | 'bar'>('donut');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* 1. Revenue Performance Area Chart (2 Cols on Desktop) */}
      <div className="lg:col-span-2 bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
              <Layers className="w-4 h-4 text-clay" /> Revenue Performance
            </h3>
            <p className="text-xs text-muted">Revenue trend compared against target projection</p>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-charcoal">
              <span className="w-3 h-3 rounded-md bg-clay" /> Actual Revenue
            </div>
            <div className="flex items-center gap-1.5 font-medium text-muted">
              <span className="w-3 h-3 rounded-md bg-sage" /> Target
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Clay to Soft Light Green Gradient Fill */}
                <linearGradient id="clayToSageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C86D51" stopOpacity={0.45} />
                  <stop offset="50%" stopColor="#88C090" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EAF5EC" stopOpacity={0.05} />
                </linearGradient>

                <linearGradient id="sageTargetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#88C090" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#88C090" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1rem',
                  border: '1px solid rgba(200, 109, 81, 0.2)',
                  boxShadow: '0 8px 24px -4px rgba(44, 51, 51, 0.1)',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="#88C090" 
                strokeDasharray="4 4" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#sageTargetGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#C86D51" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#clayToSageGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Category Distribution (1 Col on Desktop) */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-5 shadow-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-charcoal">Category Breakdown</h3>
            <p className="text-xs text-muted">Sales proportion by category</p>
          </div>

          <div className="flex items-center bg-stone-100 p-1 rounded-xl">
            <button 
              onClick={() => setChartType('donut')}
              className={`p-1.5 rounded-lg transition-all ${chartType === 'donut' ? 'bg-white text-clay shadow-xs' : 'text-stone-400'}`}
              title="Donut View"
            >
              <PieIcon className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-lg transition-all ${chartType === 'bar' ? 'bg-white text-clay shadow-xs' : 'text-stone-400'}`}
              title="Bar View"
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="h-[200px] w-full flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'donut' ? (
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.75rem',
                    border: '1px solid #E5E7EB',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Sales']}
                />
              </PieChart>
            ) : (
              <BarChart data={categories} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categories.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend listing */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          {categories.slice(0, 4).map((cat) => (
            <div key={cat.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="font-medium text-charcoal truncate max-w-[120px]">{cat.name}</span>
              </div>
              <span className="font-bold text-charcoal">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
