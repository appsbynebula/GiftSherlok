import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, ShieldCheck } from 'lucide-react';

export const FeaturesPage = () => (
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
