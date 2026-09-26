'use client';

import React from 'react';
import { AlertTriangleIcon, RefreshCwIcon, PhoneIcon } from './Icons';

interface ErrorStateProps {
  onRetry: () => void;
  onOpenChat: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, onOpenChat }) => {
  return (
    <div className="w-full bg-[#0c1222] shadow-2xl rounded-3xl border border-[#1b253b] p-8 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mb-4 ring-8 ring-rose-500/10">
        <AlertTriangleIcon className="w-8 h-8" />
      </div>
      <h2 className="text-lg font-bold text-white mb-1.5">Unable to Connect to Telemetry</h2>
      <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
        We encountered a temporary connection timeout communicating with the carrier&apos;s GPS tracking satellite feed.
      </p>

      <div className="w-full space-y-2.5 max-w-xs">
        <button
          onClick={onRetry}
          className="w-full py-3 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-900/40 transition-all flex items-center justify-center gap-2 border border-purple-400/40"
        >
          <RefreshCwIcon className="w-4 h-4" /> Try Refreshing Again
        </button>

        <button
          onClick={onOpenChat}
          className="w-full py-2.5 bg-[#141b2d] hover:bg-[#1a2338] text-slate-200 border border-[#1e2a44] rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
        >
          <PhoneIcon className="w-3.5 h-3.5 text-purple-400" /> Contact Live Support
        </button>
      </div>

      <div className="mt-8 text-[11px] text-slate-500">
        Carrier code: <code className="bg-[#090d16] px-2 py-0.5 rounded text-purple-300 border border-[#1b253b]">ERR_CARRIER_TIMEOUT_504</code>
      </div>
    </div>
  );
};
