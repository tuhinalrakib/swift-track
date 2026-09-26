'use client';

import React, { useState } from 'react';
import { TimelineStep } from '../types/tracking';
import { CheckCircleIcon, ClockIcon, AlertTriangleIcon, ChevronDownIcon, ChevronRightIcon, MapPinIcon } from './Icons';

interface DeliveryTimelineProps {
  steps: TimelineStep[];
}

export const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ steps }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-[#0c1222] rounded-3xl p-4 shadow-xl border border-[#1b253b]">
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none pb-2 border-b border-[#1b253b]"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <ClockIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Delivery Milestones</h3>
            <p className="text-[10px] text-slate-400">Live timestamp & telemetry log</p>
          </div>
        </div>

        <button 
          className="text-slate-400 hover:text-white p-1 transition-transform"
          aria-label="Toggle timeline details"
        >
          {isExpanded ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
        </button>
      </div>

      {/* Timeline items */}
      {isExpanded && (
        <div className="mt-4 space-y-0 relative pl-2">
          {/* Vertical connecting line */}
          <div className="absolute left-[19px] top-3 bottom-5 w-0.5 bg-[#1b253b]" />

          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isPending = step.status === 'pending';

            return (
              <div key={step.id || idx} className="relative flex items-start gap-3.5 pb-5 last:pb-1 group">
                {/* Node indicator */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/50 border border-emerald-400">
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {isCurrent && !step.isDelayMilestone && (
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-purple-500 opacity-75"></span>
                      <div className="w-6 h-6 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 border-2 border-white text-white flex items-center justify-center shadow-lg shadow-purple-900/80">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      </div>
                    </div>
                  )}

                  {isCurrent && step.isDelayMilestone && (
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-amber-500 opacity-75"></span>
                      <div className="w-6 h-6 rounded-full bg-amber-600 border-2 border-white text-white flex items-center justify-center shadow-lg shadow-amber-900/80">
                        <AlertTriangleIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {isPending && (
                    <div className="w-6 h-6 rounded-full bg-[#111827] border-2 border-[#1e2a44] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <p className={`text-xs font-semibold ${
                      isCurrent 
                        ? step.isDelayMilestone ? 'text-amber-300' : 'text-purple-300' 
                        : isCompleted ? 'text-white' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400">
                      {step.timestamp}
                    </span>
                  </div>

                  <p className={`text-[11px] mt-0.5 leading-relaxed ${
                    isPending ? 'text-slate-500' : 'text-slate-300'
                  }`}>
                    {step.description}
                  </p>

                  {step.location && (
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <MapPinIcon className="w-3 h-3 text-purple-400 shrink-0" />
                      <span>{step.location}</span>
                    </p>
                  )}

                  {step.badge && (
                    <div className="mt-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                        step.isDelayMilestone
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                          : 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                      }`}>
                        {step.isDelayMilestone && <AlertTriangleIcon className="w-3 h-3 text-amber-400" />}
                        {step.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
