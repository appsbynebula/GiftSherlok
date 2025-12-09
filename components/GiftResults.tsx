import React from 'react';
import { GiftIdea } from '../types';
import { GiftCard } from './GiftCard';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface GiftResultsProps {
  gifts: GiftIdea[];
  onReset: () => void;
}

export const GiftResults: React.FC<GiftResultsProps> = ({ gifts, onReset }) => {
  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-end mb-8 px-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">The Deduction</h2>
          <p className="text-slate-400 font-medium">Based on the evidence provided, here are the optimal matches.</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-brand-secondary hover:text-white transition-colors text-sm font-bold"
        >
          <RefreshCcw className="w-4 h-4" />
          New Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {gifts.map((gift, index) => (
          <GiftCard key={index} gift={gift} index={index} />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-12 text-center text-slate-600 text-sm font-medium"
      >
        <p>"Data! Data! Data! I can't make bricks without clay." — Sherlock Holmes</p>
      </motion.div>
    </div>
  );
};