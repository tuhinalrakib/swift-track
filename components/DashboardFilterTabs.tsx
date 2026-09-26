'use client';

import React from 'react';
import { TrackingSituation } from '../types/tracking';

interface DashboardFilterTabsProps {
  currentSituation: TrackingSituation;
  onSelectSituation: (st: TrackingSituation) => void;
  counts: {
    all: number;
    standard: number;
    delayed: number;
    delivered: number;
    unavailable: number;
  };
}

export const DashboardFilterTabs: React.FC<DashboardFilterTabsProps> = ({
  currentSituation,
  onSelectSituation,
  counts,
}) => {
  const filters: { key: TrackingSituation; label: string; count: number; badgeColor?: string }[] = [
    { key: 'STANDARD', label: 'All Orders', count: counts.all },
    { key: 'DELAYED', label: 'Delayed Orders ⚠️', count: counts.delayed },
    { key: 'DELIVERED_NOT_RECEIVED', label: 'Delivered (Not Received) ❓', count: counts.delivered },
    { key: 'TRACKING_UNAVAILABLE', label: 'Tracking Pending ⏳', count: counts.unavailable },
    { key: 'LOADING', label: 'Skeleton State ✨', count: 0 },
    { key: 'ERROR', label: 'Network Error 🔄', count: 0 },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
      {filters.map((f) => {
        const isActive = currentSituation === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onSelectSituation(f.key)}
            className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-2 border ${
              isActive
                ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-900/40'
                : 'bg-[#0f172a] text-slate-400 border-[#1e293b] hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>{f.label}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-purple-950/60 text-purple-200' : 'bg-[#1e293b] text-slate-400'
              }`}
            >
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
