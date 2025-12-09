import React from 'react';
import { HistoryItem } from '../types';
import { GiftCard } from './GiftCard';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserHistoryProps {
  history: HistoryItem[];
}

export const UserHistory: React.FC<UserHistoryProps> = ({ history }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  if (history.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Cases Solved Yet</h3>
        <p className="text-slate-400 font-medium">Your investigation history is empty. Start a new deduction to see records here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 font-sans">
      <h2 className="text-3xl font-extrabold tracking-tight text-white mb-8">Case History</h2>
      
      <div className="space-y-6">
        {history.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-xl overflow-hidden border border-slate-700"
          >
            <div 
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="p-6 cursor-pointer hover:bg-slate-800/50 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <span className="text-xs font-mono text-brand-primary bg-brand-primary/10 px-2 py-1 rounded border border-brand-primary/20">
                     {new Date(item.date).toLocaleDateString()}
                   </span>
                   <span className="text-xs font-mono text-slate-400">
                     ID: {item.id.slice(0, 8)}...
                   </span>
                </div>
                <h4 className="text-white font-bold text-lg tracking-tight">
                  Subject who complains about <span className="text-brand-secondary">"{item.inputs.complaint}"</span>
                </h4>
              </div>
              <div className="text-slate-400">
                {expandedId === item.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden bg-slate-900/50"
                >
                  <div className="p-6 border-t border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {item.results.map((gift, idx) => (
                        <GiftCard key={idx} gift={gift} index={idx} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};