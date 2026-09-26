'use client';

import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-[#0c1222] shadow-2xl rounded-3xl border border-[#1b253b] animate-pulse p-6 space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between pt-2">
        <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
        <div className="w-24 h-4 bg-slate-800 rounded-full"></div>
        <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
      </div>

      {/* Hero card skeleton */}
      <div className="h-44 bg-[#090e1c] rounded-3xl p-4 space-y-3 border border-[#1b253b]">
        <div className="w-20 h-5 bg-slate-800 rounded-full"></div>
        <div className="w-48 h-7 bg-slate-800 rounded-lg"></div>
        <div className="w-36 h-4 bg-slate-800 rounded-lg"></div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full mt-4"></div>
      </div>

      {/* Driver skeleton */}
      <div className="h-28 bg-[#090e1c] rounded-2xl p-3 flex items-center gap-3 border border-[#1b253b]">
        <div className="w-12 h-12 bg-slate-800 rounded-full shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="w-28 h-4 bg-slate-800 rounded-full"></div>
          <div className="w-20 h-3 bg-slate-800 rounded-full"></div>
        </div>
        <div className="w-16 h-8 bg-slate-800 rounded-xl"></div>
      </div>

      {/* Timeline skeleton */}
      <div className="bg-[#090e1c] rounded-3xl p-4 space-y-4 border border-[#1b253b]">
        <div className="w-32 h-4 bg-slate-800 rounded-full"></div>
        <div className="space-y-4 pl-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-6 h-6 bg-slate-800 rounded-full shrink-0"></div>
              <div className="flex-1 space-y-1.5">
                <div className="w-36 h-4 bg-slate-800 rounded-full"></div>
                <div className="w-52 h-3 bg-slate-800 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
