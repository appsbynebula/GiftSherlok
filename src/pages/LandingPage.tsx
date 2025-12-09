import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
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
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-midnight font-bold rounded-xl hover:bg-slate-200 transition-colors text-lg shadow-xl shadow-white/5 tracking-tight"
                        >
                            Start Deducing Now
                        </button>
                        <button
                            onClick={() => navigate('/features')}
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
};
