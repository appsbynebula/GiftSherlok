import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ProfileForm } from './components/ProfileForm';
import { LoadingDeduction } from './components/LoadingDeduction';
import { GiftResults } from './components/GiftResults';
import { UserHistory } from './components/UserHistory';
import { AppState, GiftIdea, ProfilingInputs, Page, User, HistoryItem } from './types';
import { generateGiftIdeas } from './services/openAiService';
import { AlertCircle, CheckCircle2, Zap, Brain, Sparkles, Database, ShieldCheck, Cpu } from 'lucide-react';
import { supabase } from './lib/supabaseClient';
import { motion } from 'framer-motion';

// --- Page Components ---

const LandingPage = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <div className="pt-20 pb-10 font-sans">
    {/* Hero Section */}
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-brand-secondary mb-8 font-semibold backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Gift Intelligence</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Stop Guessing. <br className="hidden md:block" />
          <span className="text-gradient">Start Gifting.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          The psychological profiling engine that deduces the perfect gift for the person who has everything. No demographic filters. Just deep psychological hooks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 py-4 bg-white text-midnight font-bold rounded-xl hover:bg-slate-200 transition-colors text-lg shadow-xl shadow-white/5 tracking-tight"
          >
            Start Deducing Now
          </button>
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors text-lg tracking-tight"
          >
            View Live Demo
          </button>
        </div>
      </div>

      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[100px] -z-10" />
    </section>

    {/* Benefits Section */}
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Psychological Decoding",
              desc: "We don't ask for age or gender. We analyze complaints, habits, and obsessions to find the gift they actually crave."
            },
            {
              icon: Zap,
              title: "Instant Results",
              desc: "Stop scrolling Amazon for hours. Get 5 highly specific, curated recommendations in under 15 seconds."
            },
            {
              icon: CheckCircle2,
              title: "Zero-Generic Guarantee",
              desc: "If it's a mug or socks, it better be ironic. Our engine filters out the boring to deliver the 'WOW' factor."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl hover:border-brand-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 text-brand-secondary border border-slate-700">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const PricingPage = ({ onSubscribe }: { onSubscribe: () => void }) => (
  <div className="pt-32 pb-20 container mx-auto px-6 font-sans">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">Simple, Transparent Pricing</h2>
      <p className="text-slate-400 font-medium">Choose the plan that fits your gifting needs. Uncover the perfect gift today.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Pay Per Use */}
      <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-slate-500 relative flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-2">Pay-Per-Deduction</h3>
        <p className="text-slate-400 mb-6 font-medium">Perfect for the occasional gift giver.</p>
        <div className="text-4xl font-extrabold text-white mb-6">$1.99 <span className="text-lg text-slate-500 font-normal">/ search</span></div>

        <ul className="space-y-4 mb-8 flex-grow">
          <li className="flex items-center gap-3 text-slate-300 font-medium">
            <CheckCircle2 className="w-5 h-5 text-brand-primary" /> 5 Curated Gift Ideas
          </li>
          <li className="flex items-center gap-3 text-slate-300 font-medium">
            <CheckCircle2 className="w-5 h-5 text-brand-primary" /> Psychological Hook Analysis
          </li>
          <li className="flex items-center gap-3 text-slate-300 font-medium">
            <CheckCircle2 className="w-5 h-5 text-brand-primary" /> Direct Purchase Links
          </li>
        </ul>

        <button onClick={onSubscribe} className="w-full py-3 rounded-lg border border-slate-600 text-white font-bold hover:bg-slate-800 transition-colors">
          Get Started
        </button>
      </div>

      {/* Lifetime */}
      <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-brand-secondary relative flex flex-col bg-slate-800/50">
        <div className="absolute top-0 right-0 bg-brand-secondary text-xs font-bold text-white px-3 py-1 rounded-bl-lg rounded-tr-lg">BEST VALUE</div>
        <h3 className="text-2xl font-bold text-white mb-2">Lifetime Access</h3>
        <p className="text-slate-400 mb-6 font-medium">Never worry about gifts again.</p>
        <div className="text-4xl font-extrabold text-white mb-6">$49 <span className="text-lg text-slate-500 font-normal">/ one-time</span></div>

        <ul className="space-y-4 mb-8 flex-grow">
          <li className="flex items-center gap-3 text-white font-medium">
            <CheckCircle2 className="w-5 h-5 text-brand-secondary" /> Unlimited Deductions
          </li>
          <li className="flex items-center gap-3 text-white font-medium">
            <CheckCircle2 className="w-5 h-5 text-brand-secondary" /> Priority Processing
          </li>
          <li className="flex items-center gap-3 text-white font-medium">
            <CheckCircle2 className="w-5 h-5 text-brand-secondary" /> Early Access to New Features
          </li>
          <li className="flex items-center gap-3 text-white font-medium">
            <CheckCircle2 className="w-5 h-5 text-brand-secondary" /> Profile History Storage
          </li>
        </ul>

        <button onClick={onSubscribe} className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-secondary to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-brand-secondary/25 transition-all">
          Get Lifetime Access
        </button>
      </div>
    </div>
  </div>
);

const FeaturesPage = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 font-sans">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">Under The Hood</h2>
        <p className="text-slate-400 max-w-2xl mx-auto font-medium">We combine advanced large language models with real-time affiliate data to deliver a seamless gifting experience.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Cpu,
            title: "The Sherlock Engine",
            desc: "Our proprietary prompt engineering architecture translates abstract complaints into concrete product categories. It understands that 'Cold Coffee' isn't just a temperature problem—it's a workflow interruption problem.",
          },
          {
            icon: Database,
            title: "Affiliate Intelligence",
            desc: "We scan real-time databases to ensure the products suggested are actually available and highly rated. No dead links, no discontinued items, just purchasable joy.",
          },
          {
            icon: ShieldCheck,
            title: "Secure Profiling",
            desc: "Your inputs are anonymized before being sent to OpenAI. We prioritize privacy and data security, ensuring your gift recipient's profile remains confidential.",
          }
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-panel p-10 rounded-3xl flex flex-col items-center text-center hover:bg-slate-800/50 transition-colors border border-white/5"
          >
            <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-primary/20 text-brand-secondary shadow-lg shadow-brand-primary/5">
              <feat.icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feat.title}</h3>
            <p className="text-slate-300 leading-loose font-medium">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// --- Main App Logic ---

export default function App() {
  const [page, setPage] = useState<Page>(Page.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Dashboard & Logic State
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [gifts, setGifts] = useState<GiftIdea[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Initialize history and auth state
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) setPage(Page.DASHBOARD);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setPage(Page.DASHBOARD);
      } else {
        setPage(Page.LANDING);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (email: string) => {
    // This function is now just a placeholder or could be used to force state update if needed,
    // but the onAuthStateChange listener handles the heavy lifting.
    // We keep the signature to satisfy the AuthModal prop if we don't change that prop type yet.
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPage(Page.LANDING);
    setAppState(AppState.INPUT);
    setGifts([]);
  };

  const handleFormSubmit = async (inputs: ProfilingInputs) => {
    setAppState(AppState.LOADING);
    setError(null);

    try {
      const ideas = await generateGiftIdeas(inputs);
      setGifts(ideas);
      setAppState(AppState.RESULTS);

      // Save to history
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        inputs: inputs,
        results: ideas
      };
      setHistory(prev => [newHistoryItem, ...prev]);

    } catch (err) {
      console.error(err);
      setError("My deduction was interrupted. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const resetDashboard = () => {
    setAppState(AppState.INPUT);
    setGifts([]);
    setError(null);
  };

  // Auth Guard
  useEffect(() => {
    if ((page === Page.DASHBOARD || page === Page.HISTORY) && !user) {
      setShowAuthModal(true);
      // If modal closed without login, it will redirect in AuthModal props if needed,
      // but simpler to just let them see the modal.
    }
  }, [page, user]);

  return (
    <div className="min-h-screen bg-midnight text-slate-100 font-sans selection:bg-brand-secondary selection:text-white overflow-x-hidden">
      <Navbar
        currentPage={page}
        setPage={setPage}
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          // If we were trying to access a protected page and closed the modal, go back to landing
          if ((page === Page.DASHBOARD || page === Page.HISTORY) && !user) {
            setPage(Page.LANDING);
          }
        }}
        onLogin={handleLogin}
      />

      <main>
        {page === Page.LANDING && (
          <LandingPage onCtaClick={() => setShowAuthModal(true)} />
        )}

        {page === Page.PRICING && (
          <PricingPage onSubscribe={() => setShowAuthModal(true)} />
        )}

        {page === Page.FEATURES && (
          <FeaturesPage />
        )}

        {page === Page.HISTORY && user && (
          <div className="pt-28 px-4">
            <UserHistory history={history} />
          </div>
        )}

        {page === Page.DASHBOARD && user && (
          <div className="pt-28 pb-10 container mx-auto px-4">
            {appState === AppState.INPUT && (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">New Investigation</h2>
                  <p className="text-slate-400 text-lg font-medium">Enter the subject's behavioral patterns and budget constraint.</p>
                </div>
                <ProfileForm onSubmit={handleFormSubmit} />
              </>
            )}

            {appState === AppState.LOADING && (
              <LoadingDeduction />
            )}

            {appState === AppState.RESULTS && (
              <GiftResults gifts={gifts} onReset={resetDashboard} />
            )}

            {appState === AppState.ERROR && (
              <div className="max-w-md mx-auto glass-panel p-8 rounded-xl text-center mt-20 border border-red-900/50">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Deduction Failed</h3>
                <p className="text-slate-400 mb-6 font-medium">{error}</p>
                <button
                  onClick={resetDashboard}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors font-bold"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
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