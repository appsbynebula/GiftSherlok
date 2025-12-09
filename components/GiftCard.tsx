import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GiftIdea } from '../types';
import { Lock, Unlock, ShoppingCart, ExternalLink, Sparkles } from 'lucide-react';

interface GiftCardProps {
  gift: GiftIdea;
  index: number;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, index }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUnlockRequest = () => {
    setShowModal(true);
  };

  const confirmUnlock = () => {
    setIsUnlocked(true);
    setShowModal(false);
  };

  const amazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(gift.search_term_for_amazon)}&tag=gift_sherlock-20`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-slate-700 hover:border-brand-primary/40 transition-all shadow-lg hover:shadow-brand-primary/10 group bg-slate-900/40"
      >
        <div className="p-7 flex-grow flex flex-col font-sans">
          <div className="flex justify-between items-start mb-5 gap-4">
            <h3 className="text-2xl font-bold tracking-tight text-white leading-tight group-hover:text-brand-secondary transition-colors">
              {gift.product_name}
            </h3>
            <span className="text-sm font-bold text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/20 whitespace-nowrap">
              {gift.estimated_price}
            </span>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Analysis</h4>
            <p className="text-slate-200 text-base leading-relaxed font-medium">
              {gift.description}
            </p>
          </div>

          <div className="mt-auto bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 p-5 rounded-xl relative overflow-hidden">
             {/* Decorative shimmer */}
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-brand-primary/20 blur-xl rounded-full"></div>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-secondary" />
              <p className="text-xs text-brand-secondary uppercase tracking-widest font-extrabold">
                The Psychological Hook
              </p>
            </div>
            <p className="text-base text-white/90 italic font-medium leading-relaxed">
              "{gift.psychological_hook}"
            </p>
          </div>
        </div>

        <div className="p-5 bg-slate-950/80 border-t border-slate-800 backdrop-blur-sm">
          {isUnlocked ? (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-primary text-white font-bold rounded-xl hover:bg-violet-600 transition-all shadow-lg hover:shadow-brand-primary/30 transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-5 h-5" />
              View on Amazon
              <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
            </a>
          ) : (
            <button
              onClick={handleUnlockRequest}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-800 text-slate-400 font-bold rounded-xl hover:bg-slate-700 hover:text-white transition-all border border-slate-700 hover:border-slate-600"
            >
              <Lock className="w-4 h-4" />
              <span>Reveal Purchase Link</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Unlock Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 font-sans">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-brand-secondary/30 p-8 rounded-2xl max-w-md w-full relative z-10 shadow-2xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-secondary/30">
                <Unlock className="w-8 h-8 text-brand-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Uncover the Mystery</h3>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium">
                Gain direct access to the curated item that perfectly matches the profile.
              </p>
              
              <button
                onClick={confirmUnlock}
                className="w-full bg-brand-secondary text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-colors mb-3 shadow-lg shadow-brand-secondary/20"
              >
                Reveal Link (Free for Beta)
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-500 text-sm hover:text-white transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};