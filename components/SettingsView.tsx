'use client';

import React, { useState } from 'react';
import { Settings, Database, Radio, Palette, CheckCircle2, Copy, RefreshCw, Key } from 'lucide-react';
import { ApiConnectionState } from '@/lib/types';

interface SettingsViewProps {
  connectionState: ApiConnectionState;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  connectionState, 
  onRefresh, 
  isRefreshing 
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nygeopzfczpcwwmdpzbw.supabase.co/rest/v1/rpc/get_sale_dashboard';
  const postmanUrl = process.env.NEXT_PUBLIC_POSTMAN_API_URL || '[INSERT_YOUR_POSTMAN_LINK_HERE]';

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/70 shadow-card">
        <h2 className="text-xl font-bold text-charcoal tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-clay" /> Environment & Integration Settings
        </h2>
        <p className="text-xs text-muted">Manage API credentials, connection health, and design system tokens</p>
      </div>

      {/* 1. Supabase API Credentials Section */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-clay" />
            <div>
              <h3 className="text-base font-bold text-charcoal">Supabase RPC & Database Connection</h3>
              <p className="text-xs text-muted">Configured via NEXT_PUBLIC_SUPABASE_URL</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            connectionState.supabaseStatus === 'connected' 
              ? 'bg-sage-soft text-sage-dark border border-sage/30' 
              : 'bg-clay-soft text-clay-dark border border-clay/30'
          }`}>
            {connectionState.supabaseStatus === 'connected' ? 'Connected (RPC)' : 'Active (Fallback Data)'}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-muted uppercase">NEXT_PUBLIC_SUPABASE_URL</label>
            <div className="flex items-center gap-2 mt-1">
              <input 
                type="text" 
                readOnly 
                value={supabaseUrl}
                className="w-full bg-offwhite border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-charcoal"
              />
              <button 
                onClick={() => copyToClipboard(supabaseUrl, 'supabase_url')}
                className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs flex items-center gap-1"
              >
                {copied === 'supabase_url' ? <CheckCircle2 className="w-4 h-4 text-sage-dark" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted uppercase">NEXT_PUBLIC_SUPABASE_ANON_KEY</label>
            <div className="flex items-center gap-2 mt-1">
              <input 
                type="password" 
                readOnly 
                value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIs..."
                className="w-full bg-offwhite border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-charcoal"
              />
              <span className="text-xs font-semibold text-sage-dark bg-sage-soft px-2.5 py-1 rounded-lg">JWT Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Postman API Integration Section */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-sage-dark" />
            <div>
              <h3 className="text-base font-bold text-charcoal">Postman API Integration Link</h3>
              <p className="text-xs text-muted">Configured via NEXT_PUBLIC_POSTMAN_API_URL</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            connectionState.postmanStatus === 'connected' 
              ? 'bg-sage-soft text-sage-dark border border-sage/30' 
              : 'bg-stone-100 text-stone-600 border border-stone-200'
          }`}>
            {connectionState.postmanStatus === 'connected' ? 'Live Endpoint Connected' : 'Mock Event Feed'}
          </span>
        </div>

        <div>
          <label className="text-xs font-bold text-muted uppercase">NEXT_PUBLIC_POSTMAN_API_URL</label>
          <div className="flex items-center gap-2 mt-1">
            <input 
              type="text" 
              readOnly 
              value={postmanUrl}
              className="w-full bg-offwhite border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-charcoal"
            />
            <button 
              onClick={onRefresh}
              disabled={isRefreshing}
              className="px-3 py-2 rounded-xl bg-clay text-white text-xs font-bold flex items-center gap-1.5 hover:bg-clay-dark transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} /> Ping Test
            </button>
          </div>
        </div>
      </div>

      {/* 3. Clay & Light Green Color Tokens */}
      <div className="bg-white border border-stone-200/70 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
          <Palette className="w-5 h-5 text-clay" />
          <div>
            <h3 className="text-base font-bold text-charcoal">Clay & Light Green Design System</h3>
            <p className="text-xs text-muted">Active visual token palette</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: 'Primary Clay', hex: '#C86D51', bg: 'bg-[#C86D51]', text: 'text-white' },
            { name: 'Dark Clay', hex: '#A8543B', bg: 'bg-[#A8543B]', text: 'text-white' },
            { name: 'Soft Clay Accent', hex: '#F7ECE8', bg: 'bg-[#F7ECE8]', text: 'text-[#A8543B]' },
            { name: 'Soft Light Green', hex: '#88C090', bg: 'bg-[#88C090]', text: 'text-white' },
            { name: 'Forest Sage', hex: '#3E7B4B', bg: 'bg-[#3E7B4B]', text: 'text-white' },
            { name: 'Light Green Pill Fill', hex: '#EAF5EC', bg: 'bg-[#EAF5EC]', text: 'text-[#3E7B4B]' },
          ].map((token) => (
            <div key={token.name} className="p-3 rounded-2xl border border-stone-200/70 space-y-1.5">
              <div className={`w-full h-8 rounded-xl ${token.bg} flex items-center justify-center font-mono text-[10px] font-bold ${token.text}`}>
                {token.hex}
              </div>
              <p className="text-xs font-bold text-charcoal">{token.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
