import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import { Gift, LogIn, LayoutDashboard, LogOut, History } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => path === route;

  return (
    <nav className="w-full fixed top-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/10 font-sans">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-brand-primary/20 p-2 rounded-lg group-hover:bg-brand-primary/30 transition-colors">
            <Gift className="w-6 h-6 text-brand-secondary" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Gift<span className="text-brand-secondary">Sherlock</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {!user && (
            <>
              <Link
                to="/features"
                className={`text-sm font-semibold transition-colors ${isActive('/features') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className={`text-sm font-semibold transition-colors ${isActive('/pricing') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Pricing
              </Link>
            </>
          )}
        </div>

        {/* CTA / Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-brand-secondary' : 'text-white hover:text-brand-secondary'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">New Deduction</span>
              </Link>
              <Link
                to="/history"
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isActive('/history') ? 'text-brand-secondary' : 'text-white hover:text-brand-secondary'}`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">User History</span>
              </Link>
              <div className="h-6 w-px bg-slate-700 mx-2"></div>
              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-sm font-bold transition-all hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};