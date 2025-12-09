import React from 'react';
import { UserHistory } from '../../components/UserHistory';
import { HistoryItem } from '../../types';

// Currently mostly a placeholder as history requires DB or advanced state management
// which is not part of the current "add routing" request scope without changing data model.
export const HistoryPage = () => {
    const [history, setHistory] = React.useState<HistoryItem[]>([]);

    return (
        <div className="pt-28 px-4">
            {/* If we had history prop, pass it here. For now it's empty state */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Case History</h2>
                <p className="text-slate-400">Local history is cleared on refresh. Database persistence coming soon.</p>
            </div>
            <UserHistory history={history} />
        </div>
    )
}
