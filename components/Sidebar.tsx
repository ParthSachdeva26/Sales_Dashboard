'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Settings, 
  Sparkles,
  X,
  Database,
  Radio
} from 'lucide-react';
import { ActiveTab, ApiConnectionState } from '@/lib/types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  connectionState: ApiConnectionState;
  onOpenCustomerAdmin?: () => void;
}

const NAV_ITEMS: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sales', label: 'Sales Feed', icon: TrendingUp },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  connectionState,
  onOpenCustomerAdmin
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-stone-200/70 p-5 
          flex flex-col justify-between transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-clay to-clay-dark flex items-center justify-center text-white shadow-clay-sm">
                <Sparkles className="w-5 h-5 text-sage-soft" />
              </div>
              <div>
                <h1 className="font-bold text-base text-charcoal tracking-tight leading-tight">
                  Sales Dashboard Project
                </h1>
                <p className="text-xs text-clay-dark font-bold">Admin : Parth Sachdeva</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 rounded-xl hover:bg-stone-100 text-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold 
                    transition-all duration-200 text-left
                    ${isActive 
                      ? 'bg-clay text-white shadow-clay-sm scale-[1.01]' 
                      : 'text-charcoal/80 hover:bg-clay-soft/60 hover:text-clay-dark'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sage-soft animate-pulse" />
                  )}
                </button>
              );
            })}

            {/* Direct Customer Admin Window Launcher */}
            {onOpenCustomerAdmin && (
              <button
                onClick={() => {
                  onOpenCustomerAdmin();
                  setIsOpen(false);
                }}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-sm border border-stone-800"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Admin Window View</span>
              </button>
            )}
          </nav>
        </div>

        {/* API Health Footer Widget */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <div className="bg-offwhite rounded-2xl p-3.5 border border-stone-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-clay" /> Supabase
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                connectionState.supabaseStatus === 'connected' 
                  ? 'bg-sage-soft text-sage-dark' 
                  : 'bg-clay-soft text-clay-dark'
              }`}>
                {connectionState.supabaseStatus === 'connected' ? 'Connected' : 'Fallback'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-sage-dark" /> Postman API
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                connectionState.postmanStatus === 'connected' 
                  ? 'bg-sage-soft text-sage-dark' 
                  : 'bg-stone-100 text-muted'
              }`}>
                {connectionState.postmanStatus === 'connected' ? 'Live' : 'Mock'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-sage-soft border border-sage/40 flex items-center justify-center font-bold text-sage-dark text-xs">
              RK
            </div>
            <div className="text-xs overflow-hidden">
              <p className="font-bold text-charcoal truncate">Sales Operations</p>
              <p className="text-muted truncate">admin@dashboard.io</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
