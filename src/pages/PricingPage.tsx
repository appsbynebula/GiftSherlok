import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PricingPage = () => {
    const navigate = useNavigate();
    const onSubscribe = () => navigate('/signup');

    return (
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
};
