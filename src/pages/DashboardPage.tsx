import React, { useState } from 'react';
import { ProfilingInputs, GiftIdea, AppState, HistoryItem } from '../../types';
import { generateGiftIdeas } from '../../services/openAiService';
import { ProfileForm } from '../../components/ProfileForm';
import { LoadingDeduction } from '../../components/LoadingDeduction';
import { GiftResults } from '../../components/GiftResults';
import { AlertCircle } from 'lucide-react';

export const DashboardPage = () => {
    const [appState, setAppState] = useState<AppState>(AppState.INPUT);
    const [gifts, setGifts] = useState<GiftIdea[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (inputs: ProfilingInputs) => {
        setAppState(AppState.LOADING);
        setError(null);

        try {
            const ideas = await generateGiftIdeas(inputs);
            setGifts(ideas);
            setAppState(AppState.RESULTS);

            // Note: History persistence would go here if backend supported it.
            // Currently history is local state in App.tsx (now lost on refresh/navigation)
            // Implementation of global history state management or DB is outside current scope/request

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

    return (
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
    );
};
