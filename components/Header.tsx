import React from 'react';
import { Search } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-sherlock-gold/10 p-3 rounded-full border border-sherlock-gold/20">
          <Search className="w-6 h-6 text-sherlock-gold" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-white">
          Gift<span className="text-sherlock-gold">Sherlock</span>
        </h1>
      </div>
      <p className="text-slate-400 font-light tracking-widest text-sm uppercase">Psychological Profiling Engine</p>
    </header>
  );
};