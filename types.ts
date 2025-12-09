export interface GiftIdea {
  product_name: string;
  search_term_for_amazon: string;
  description: string;
  psychological_hook: string;
  estimated_price: string;
}

export interface ProfilingInputs {
  complaint: string;
  sunday: string;
  debate: string;
  priceRange: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  inputs: ProfilingInputs;
  results: GiftIdea[];
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export enum Page {
  LANDING = 'LANDING',
  FEATURES = 'FEATURES',
  PRICING = 'PRICING',
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY'
}

export interface User {
  id: string;
  email: string;
}