import React from 'react';
import { Page, User } from '../types';
import { Gift, LogIn, LayoutDashboard, LogOut, History } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, user, onLoginClick, onLogout }) => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-white/10 font-sans">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setPage(user ? Page.DASHBOARD : Page.LANDING)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-brand-primary/20 p-2 rounded-lg group-hover:bg-brand-primary/30 transition-colors">
            <Gift className="w-6 h-6 text-brand-secondary" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Gift<span className="text-brand-secondary">Sherlock</span>
          </span>
        </div>

        {/* Desktop Links - Conditional Rendering */}
        <div className="hidden md:flex items-center gap-8">
          {!user ? (
            <>
              <button 
                onClick={() => setPage(Page.FEATURES)}
                className={`text-sm font-semibold transition-colors ${currentPage === Page.FEATURES ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Features
              </button>
              <button 
                onClick={() => setPage(Page.PRICING)}
                className={`text-sm font-semibold transition-colors ${currentPage === Page.PRICING ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Pricing
              </button>
            </>
          ) : (
            // User is logged in, hide marketing links
            null
          )}
        </div>

        {/* CTA / Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setPage(Page.DASHBOARD)}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${currentPage === Page.DASHBOARD ? 'text-brand-secondary' : 'text-white hover:text-brand-secondary'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">New Deduction</span>
              </button>
              <button 
                onClick={() => setPage(Page.HISTORY)}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${currentPage === Page.HISTORY ? 'text-brand-secondary' : 'text-white hover:text-brand-secondary'}`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">User History</span>
              </button>
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
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-sm font-bold transition-all hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};