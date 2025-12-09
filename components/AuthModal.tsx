import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, UserPlus, LogIn, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              app_name: 'giftsherlock'
            }
          }
        });
        if (error) throw error;
        // Notify user to check email or just auto-login if email confirmation is disabled
        // For good UX, we might want to auto-login or show a success message
        await onLogin(email); // Parent handles refreshing state
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        await onLogin(email);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900 border border-brand-primary/20 p-8 rounded-2xl max-w-md w-full relative z-10 shadow-2xl shadow-brand-primary/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                {isSignUp ? 'Join the Bureau' : 'Welcome Back'}
              </h3>
              <p className="text-slate-400 text-sm font-medium">
                {isSignUp
                  ? 'Create an account to start profiling.'
                  : 'Sign in to access your dashboard.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 pl-10 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all font-medium"
                      placeholder="Sherlock Holmes"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 pl-10 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all font-medium"
                    placeholder="sherlock@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 pl-10 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-brand-secondary/20 transition-all flex items-center justify-center gap-2 mt-6"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? "Create Account" : "Sign In")}
              </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="relative w-full text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <span className="relative bg-slate-900 px-4 text-xs text-slate-500 uppercase font-semibold">Or</span>
              </div>

              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-brand-secondary hover:text-pink-400 font-bold flex items-center gap-1 transition-colors"
              >
                {isSignUp ? (
                  <>Already have an account? Sign In</>
                ) : (
                  <>Don't have an account? Sign Up</>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};