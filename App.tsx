import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { supabase } from './lib/supabaseClient';
import { User } from './types';
import { LandingPage } from './src/pages/LandingPage';
import { FeaturesPage } from './src/pages/FeaturesPage';
import { PricingPage } from './src/pages/PricingPage';
import { DashboardPage } from './src/pages/DashboardPage';
import { HistoryPage } from './src/pages/HistoryPage';
import { AuthPage } from './src/pages/AuthPage';

// Protected Route Wrapper
const ProtectedRoute = ({ user, children }: { user: User | null, children: JSX.Element }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // Use location to determine "page" for Navbar if needed, 
  // but Navbar should handle it via NavLink/Link or location hook itself.
  // We'll pass current path to Navbar for styling if it relies on props.
  const location = useLocation();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-midnight text-slate-100 font-sans selection:bg-brand-secondary selection:text-white overflow-x-hidden">
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <main>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute user={user}>
              <HistoryPage />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-midnight border-t border-slate-800 py-12 mt-auto font-sans">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-50 text-sm">
          <p className="font-medium">© 2025 GiftSherlock AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}