'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { KPICards } from '@/components/KPICards';
import { ChartsSection } from '@/components/ChartsSection';
import { TransactionsTable } from '@/components/TransactionsTable';
import { SalesView } from '@/components/SalesView';
import { AnalyticsView } from '@/components/AnalyticsView';
import { CustomersView } from '@/components/CustomersView';
import { SettingsView } from '@/components/SettingsView';
import { CustomerAdminModal } from '@/components/CustomerAdminModal';

import { 
  ActiveTab, 
  DateRange, 
  KPISummary, 
  RevenueDataPoint, 
  Transaction, 
  PostmanSyncEvent, 
  ApiConnectionState,
  CustomerRecord 
} from '@/lib/types';
import { 
  MOCK_KPI_DATA, 
  MOCK_REVENUE_CHART_DATA, 
  MOCK_TRANSACTIONS, 
  MOCK_POSTMAN_EVENTS,
  MOCK_CUSTOMERS 
} from '@/lib/mockData';
import { fetchSalesDashboardData } from '@/lib/supabaseClient';
import { fetchPostmanSyncFeed } from '@/lib/postmanClient';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Customer Admin Window state
  const [isCustomerAdminOpen, setIsCustomerAdminOpen] = useState<boolean>(false);
  const [selectedAdminCustomer, setSelectedAdminCustomer] = useState<CustomerRecord | null>(null);

  // Data states
  const [kpiData, setKpiData] = useState<KPISummary>(MOCK_KPI_DATA['30d']);
  const [revenueChartData, setRevenueChartData] = useState<RevenueDataPoint[]>(MOCK_REVENUE_CHART_DATA['30d']);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [postmanEvents, setPostmanEvents] = useState<PostmanSyncEvent[]>(MOCK_POSTMAN_EVENTS);

  // Connection health states
  const [connectionState, setConnectionState] = useState<ApiConnectionState>({
    supabaseStatus: 'connected',
    postmanStatus: 'mock',
    lastChecked: 'Just now',
    message: 'Initializing services...'
  });

  const loadData = useCallback(async () => {
    setIsRefreshing(true);

    try {
      // 1. Fetch Supabase Data
      const supabaseResult = await fetchSalesDashboardData(dateRange);
      setKpiData(supabaseResult.kpi);
      setRevenueChartData(supabaseResult.chart);
      setTransactions(supabaseResult.transactions);

      // 2. Fetch Postman Data
      const postmanResult = await fetchPostmanSyncFeed();
      setPostmanEvents(postmanResult.events);

      // 3. Update Connection State
      setConnectionState({
        supabaseStatus: supabaseResult.connectionStatus,
        postmanStatus: postmanResult.status,
        lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: `${supabaseResult.message} | ${postmanResult.message}`
      });
    } catch (err) {
      console.error('Data refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [dateRange]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenCustomerAdmin = (customerName?: string) => {
    if (customerName) {
      const match = MOCK_CUSTOMERS.find(c => c.name.toLowerCase() === customerName.toLowerCase());
      setSelectedAdminCustomer(match || null);
    } else {
      setSelectedAdminCustomer(null);
    }
    setIsCustomerAdminOpen(true);
  };

  return (
    <div className="min-h-screen bg-offwhite flex font-sans text-charcoal">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        connectionState={connectionState}
        onOpenCustomerAdmin={() => handleOpenCustomerAdmin()}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        
        {/* Header */}
        <Header
          onToggleMobileSidebar={() => setIsSidebarOpen(prev => !prev)}
          dateRange={dateRange}
          setDateRange={setDateRange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          connectionState={connectionState}
          onRefresh={loadData}
          isRefreshing={isRefreshing}
          onOpenCustomerAdmin={() => handleOpenCustomerAdmin()}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          
          {/* Main Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Top Welcome Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight">
                    Sales Dashboard Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-muted font-medium">
                    Consolidated metrics from Supabase DB & Postman API feed
                  </p>
                </div>
              </div>

              {/* KPI Cards */}
              <KPICards kpi={kpiData} postmanEvents={postmanEvents} />

              {/* Visual Charts */}
              <ChartsSection revenueData={revenueChartData} />

              {/* Recent Transactions Table */}
              <TransactionsTable 
                transactions={transactions} 
                searchQuery={searchQuery} 
                onOpenCustomerAdmin={(name) => handleOpenCustomerAdmin(name)}
              />
            </div>
          )}

          {/* Sales Feed View */}
          {activeTab === 'sales' && <SalesView searchQuery={searchQuery} />}

          {/* Analytics View */}
          {activeTab === 'analytics' && <AnalyticsView />}

          {/* Customers View */}
          {activeTab === 'customers' && (
            <CustomersView 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              onOpenAdminWindow={(name) => handleOpenCustomerAdmin(name)}
            />
          )}

          {/* Settings View */}
          {activeTab === 'settings' && (
            <SettingsView
              connectionState={connectionState}
              onRefresh={loadData}
              isRefreshing={isRefreshing}
            />
          )}

        </main>
      </div>

      {/* Customer Details Admin Modal Window */}
      <CustomerAdminModal
        isOpen={isCustomerAdminOpen}
        onClose={() => setIsCustomerAdminOpen(false)}
        initialCustomer={selectedAdminCustomer}
        initialQuery={searchQuery}
      />

    </div>
  );
}

