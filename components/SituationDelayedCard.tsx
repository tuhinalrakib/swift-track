'use client';

import React, { useState } from 'react';
import { AlertTriangleIcon, ClockIcon, ShieldCheckIcon } from './Icons';

interface SituationDelayedCardProps {
  originalEstimate?: string;
  revisedEstimate: string;
  delayReason?: string;
  onExpedite: () => void;
  onReschedule: () => void;
  onRequestCredit: () => void;
}

export const SituationDelayedCard: React.FC<SituationDelayedCardProps> = ({
  originalEstimate,
  revisedEstimate,
  delayReason,
  onExpedite,
  onReschedule,
  onRequestCredit,
}) => {
  const [creditClaimed, setCreditClaimed] = useState(false);

  return (
    <div className="bg-linear-to-br from-amber-950/40 via-[#181109] to-[#0c1222] rounded-3xl p-4 border border-amber-500/40 shadow-xl space-y-3.5">
      {/* Header Banner */}
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-md">
          <AlertTriangleIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-xs font-bold text-amber-300">Shipment Delayed in Transit</h4>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
              Notice #DEL-402
            </span>
          </div>
          <p className="text-[11px] text-amber-200/80 mt-1 leading-relaxed">
            {delayReason || 'Your shipment encountered an unexpected logistics transit delay.'}
          </p>
        </div>
      </div>

      {/* Comparison Times */}
      <div className="bg-[#090d16]/90 rounded-2xl p-3 border border-amber-500/30 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block">Original Estimate</span>
          <span className="text-slate-500 line-through font-mono text-[11px] block mt-0.5">
            {originalEstimate || 'Yesterday, 3:00 PM'}
          </span>
          <span className="text-[9px] text-rose-400 font-semibold">Passed</span>
        </div>
        <div className="border-l border-amber-500/20 pl-2.5">
          <span className="text-[10px] text-amber-400 font-semibold block flex items-center gap-1">
            <ClockIcon className="w-3 h-3 text-amber-400" /> New Revised ETA
          </span>
          <span className="text-amber-200 font-bold font-mono text-xs block mt-0.5">
            {revisedEstimate}
          </span>
          <span className="text-[9px] text-emerald-400 font-semibold">Rescheduled</span>
        </div>
      </div>

      {/* Next Step Resolution Actions */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
          Recommended Next Steps:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={onExpedite}
            className="w-full py-2.5 px-3 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-amber-900/40 transition-all flex items-center justify-center gap-1.5"
          >
            <span>⚡ Priority Expedite</span>
          </button>

          <button
            onClick={onReschedule}
            className="w-full py-2.5 px-3 bg-[#111827] hover:bg-[#1a2338] text-amber-200 border border-amber-500/40 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>📅 Reschedule Delivery</span>
          </button>
        </div>

        {/* Delay compensation guarantee */}
        <div className="p-2.5 bg-[#090d16] rounded-xl border border-amber-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] text-slate-300">On-Time Guarantee: <strong className="text-emerald-400">$10 Credit</strong></span>
          </div>
          <button
            onClick={() => {
              setCreditClaimed(true);
              onRequestCredit();
            }}
            disabled={creditClaimed}
            className="text-[10px] font-bold px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-950 disabled:text-emerald-500 text-white rounded-lg transition-colors border border-emerald-400/40"
          >
            {creditClaimed ? 'Claimed ✓' : 'Claim $10'}
          </button>
        </div>
      </div>
    </div>
  );
};
