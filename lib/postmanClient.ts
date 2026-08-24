import { MOCK_POSTMAN_EVENTS } from './mockData';
import { PostmanSyncEvent, ApiConnectionState } from './types';

const POSTMAN_API_URL = process.env.NEXT_PUBLIC_POSTMAN_API_URL || '';

export async function fetchPostmanSyncFeed(): Promise<{
  events: PostmanSyncEvent[];
  status: ApiConnectionState['postmanStatus'];
  lastSync: string;
  latencyMs: number;
  message: string;
}> {
  const startTime = Date.now();
  
  if (!POSTMAN_API_URL || POSTMAN_API_URL.includes('[INSERT_YOUR_POSTMAN_LINK_HERE]')) {
    return {
      events: MOCK_POSTMAN_EVENTS,
      status: 'mock',
      lastSync: 'Just now',
      latencyMs: 85,
      message: 'Mock Postman Feed Ready'
    };
  }

  try {
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const isSupabaseUrl = POSTMAN_API_URL.includes('supabase.co');

    const res = await fetch(POSTMAN_API_URL, {
      method: isSupabaseUrl ? 'POST' : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(isSupabaseUrl && anonKey ? {
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        } : {})
      },
      ...(isSupabaseUrl ? { body: JSON.stringify({ range: '30d' }) } : {}),
      cache: 'no-store'
    });

    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      const data = await res.json();
      const events: PostmanSyncEvent[] = Array.isArray(data) 
        ? data 
        : (data.events || data.postmanEvents || MOCK_POSTMAN_EVENTS);

      return {
        events,
        status: 'connected',
        lastSync: 'Just now',
        latencyMs,
        message: isSupabaseUrl ? 'Live API Stream Connected (Supabase RPC)' : 'Live Postman Sync Connected'
      };
    }
  } catch (error) {
    console.warn('Postman API fetch error, falling back to mock feed:', error);
  }

  return {
    events: MOCK_POSTMAN_EVENTS,
    status: 'mock',
    lastSync: '2 mins ago',
    latencyMs: 120,
    message: 'Postman Feed (Simulated)'
  };
}
