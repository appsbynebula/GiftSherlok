import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

export const LoadingDeduction: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full"
        />
        <BrainCircuit className="w-24 h-24 text-brand-primary relative z-10" />
      </div>
      
      <h2 className="mt-8 text-2xl font-bold tracking-tight text-white">
        Sherlock is thinking...
      </h2>
      
      <div className="mt-4 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-3 h-3 bg-brand-secondary rounded-full"
          />
        ))}
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-4 text-slate-400 text-sm font-medium italic"
      >
        Analyzing psychological patterns...
      </motion.p>
    </div>
  );
};