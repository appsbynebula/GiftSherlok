import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquareWarning, Coffee, Scale, DollarSign, Info } from 'lucide-react';
import { ProfilingInputs } from '../types';

interface ProfileFormProps {
  onSubmit: (data: ProfilingInputs) => void;
}

const PRICE_RANGES = [
  { value: "Under $25", label: "Budget-Friendly (<$25)" },
  { value: "$25 - $50", label: "Thoughtful Gesture ($25 - $50)" },
  { value: "$50 - $100", label: "Premium ($50 - $100)" },
  { value: "$100 - $250", label: "Luxury ($100 - $250)" },
  { value: "$250+", label: "Money is no object ($250+)" },
];

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [complaint, setComplaint] = useState('');
  const [sunday, setSunday] = useState('');
  const [debate, setDebate] = useState('');
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[1].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (complaint && sunday && debate) {
      onSubmit({ complaint, sunday, debate, priceRange });
    }
  };

  // Increased font sizes and padding for better readability
  const inputClasses = "w-full bg-slate-900 border border-slate-700 text-white text-lg p-5 pl-14 rounded-2xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all placeholder-slate-600 font-sans shadow-inner font-medium";
  const labelClasses = "block text-2xl font-bold text-white mb-2 tracking-tight";
  const helpTextClasses = "text-base text-slate-400 mb-5 block font-sans leading-relaxed max-w-lg font-medium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-panel p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-black/50 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-12">
          
          <div className="flex flex-col gap-10">
            {/* Question 1 */}
            <div className="relative group">
              <label className={labelClasses}>1. The Frequent Complaint</label>
              <span className={helpTextClasses}>
                What is a minor inconvenience they constantly moan about? <br/>
                <span className="text-slate-500 italic text-sm mt-1 block">e.g. "My phone battery always dies", "This chair hurts my back".</span>
              </span>
              <div className="relative">
                <MessageSquareWarning className="absolute left-5 top-5 w-6 h-6 text-brand-secondary group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="text"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="e.g. 'Coffee gets cold too fast'"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Question 2 */}
            <div className="relative group">
              <label className={labelClasses}>2. The Ideal Sunday</label>
              <span className={helpTextClasses}>
                If they had zero obligations, how would they spend 24 hours? <br/>
                <span className="text-slate-500 italic text-sm mt-1 block">e.g. "Reading sci-fi in a hammock", "Extreme mountain biking".</span>
              </span>
              <div className="relative">
                <Coffee className="absolute left-5 top-5 w-6 h-6 text-brand-secondary group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="text"
                  value={sunday}
                  onChange={(e) => setSunday(e.target.value)}
                  placeholder="e.g. 'Organizing bookshelf by color'"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Question 3 */}
                <div className="relative group">
                <label className={labelClasses}>3. The Debate Topic</label>
                <span className={helpTextClasses}>
                    What subject triggers a 2-hour monologue?
                </span>
                <div className="relative">
                    <Scale className="absolute left-5 top-5 w-6 h-6 text-brand-secondary group-focus-within:text-brand-primary transition-colors" />
                    <input
                    type="text"
                    value={debate}
                    onChange={(e) => setDebate(e.target.value)}
                    placeholder="e.g. 'Bitcoin vs Gold'"
                    className={inputClasses}
                    required
                    />
                </div>
                </div>

                {/* Price Range */}
                <div className="relative group">
                <label className={labelClasses}>4. The Budget</label>
                <span className={helpTextClasses}>
                    Target spend range?
                </span>
                <div className="relative">
                    <DollarSign className="absolute left-5 top-5 w-6 h-6 text-brand-secondary group-focus-within:text-brand-primary transition-colors" />
                    <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                    {PRICE_RANGES.map((range) => (
                        <option key={range.value} value={range.value}>
                        {range.label}
                        </option>
                    ))}
                    </select>
                    <div className="absolute right-5 top-6 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                </div>
            </div>
          </div>

          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!complaint || !sunday || !debate}
              className="w-full bg-gradient-to-r from-brand-primary via-purple-600 to-brand-secondary text-white font-bold py-6 px-8 rounded-2xl flex items-center justify-center gap-4 text-xl shadow-xl shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/10"
            >
              <span className="font-bold tracking-tight">Initialize Deduction Engine</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <p className="text-center text-slate-500 text-sm mt-6 flex items-center justify-center gap-2 font-medium">
              <Info className="w-4 h-4" />
              AI analyzes psychological patterns to find non-obvious matches.
            </p>
          </div>

        </form>
      </div>
    </motion.div>
  );
};