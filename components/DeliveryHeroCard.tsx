'use client';

import React from 'react';
import { OrderData, TrackingSituation } from '../types/tracking';
import { ClockIcon, CheckCircleIcon, AlertTriangleIcon, PackageIcon } from './Icons';

interface DeliveryHeroCardProps {
  order: OrderData;
  situation: TrackingSituation;
}

export const DeliveryHeroCard: React.FC<DeliveryHeroCardProps> = ({ order, situation }) => {
  const steps = [
    { label: 'Processing', key: 0 },
    { label: 'Shipped', key: 1 },
    { label: 'Out for Delivery', key: 2 },
    { label: 'Delivered', key: 3 },
  ];

  const currentStep = order?.currentStatus?.stepIndex ?? 2;

  // Background styling based on status matching dark neon theme
  const getGradient = () => {
    switch (situation) {
      case 'DELAYED':
        return 'from-amber-950/80 via-[#181109] to-[#0d1322] border-amber-500/40 text-amber-200';
      case 'DELIVERED_NOT_RECEIVED':
        return 'from-emerald-950/80 via-[#0a1813] to-[#0d1322] border-emerald-500/40 text-emerald-200';
      case 'TRACKING_UNAVAILABLE':
        return 'from-purple-950/80 via-[#140b25] to-[#0d1322] border-purple-500/40 text-purple-200';
      default:
        return 'from-purple-900/60 via-indigo-950/80 to-[#0c1222] border-purple-500/40 text-white';
    }
  };

  return (
    <div className={`rounded-3xl p-5 shadow-2xl bg-linear-to-br ${getGradient()} relative overflow-hidden space-y-4 border`}>
      {/* Decorative background purple glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

      {/* Top Tag & Carrier Info */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-white/10">
            {situation === 'DELAYED' && <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-400" />}
            {situation === 'DELIVERED_NOT_RECEIVED' && <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />}
            {situation === 'STANDARD' && <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>}
            {situation === 'TRACKING_UNAVAILABLE' && <PackageIcon className="w-3.5 h-3.5 text-purple-300" />}
            <span>{order?.currentStatus?.label || 'In Transit'}</span>
          </span>
        </div>

        <span className="text-[11px] text-slate-300 font-medium bg-[#0f172a]/60 px-2.5 py-1 rounded-lg border border-slate-700/60">
          {order?.carrier?.name || 'Carrier'}
        </span>
      </div>

      {/* Main Headline & ETA */}
      <div className="relative z-10 space-y-1">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
          {order?.currentStatus?.headline || 'Arriving Soon'}
        </h2>
        <p className="text-xs text-slate-300 leading-snug">
          {order?.currentStatus?.subheadline || 'Package is on the way.'}
        </p>
      </div>

      {/* Estimated Date / Time badge */}
      <div className="relative z-10 bg-[#090e1c]/80 backdrop-blur-md rounded-2xl p-3 border border-[#1e2a44] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
            <ClockIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {order?.estimatedDelivery?.day || 'Estimated'}
            </div>
            <div className="text-xs font-bold text-white">
              {order?.estimatedDelivery?.date || 'Expected Soon'}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Window</span>
          <span className="text-xs font-bold text-purple-300 font-mono">
            {order?.estimatedDelivery?.timeWindow || 'Standard Delivery'}
          </span>
        </div>
      </div>

      {/* 4-Step Progress Bar (Redesign from original 4 states) */}
      <div className="relative z-10 pt-2 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Delivery Progress
          </span>
          <span className="font-mono text-purple-400 font-bold">{order?.currentStatus?.progressPercent ?? 75}%</span>
        </div>

        {/* Progress track */}
        <div className="w-full bg-[#090d16] rounded-full h-2 p-0.5 overflow-hidden border border-[#1b253b]">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              situation === 'DELAYED'
                ? 'bg-linear-to-r from-amber-500 to-amber-400 shadow-sm shadow-amber-500/50'
                : situation === 'DELIVERED_NOT_RECEIVED'
                ? 'bg-linear-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50'
                : 'bg-linear-to-r from-purple-600 to-indigo-400 shadow-sm shadow-purple-500/50'
            }`}
            style={{ width: `${order?.currentStatus?.progressPercent ?? 75}%` }}
          />
        </div>

        {/* 4 Stage Labels */}
        <div className="grid grid-cols-4 text-center text-[9px] font-medium pt-1 gap-1">
          {steps.map((st) => {
            const isCompleted = currentStep > st.key;
            const isCurrent = currentStep === st.key;

            return (
              <div key={st.key} className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center mb-1 text-[8px] font-bold ${
                    isCompleted
                      ? 'bg-purple-600 text-white'
                      : isCurrent
                      ? 'bg-white text-[#090d16] ring-2 ring-purple-500 shadow-md shadow-purple-500/50'
                      : 'bg-[#141b2d] text-slate-500 border border-[#1e2a44]'
                  }`}
                >
                  {isCompleted ? '✓' : st.key + 1}
                </div>
                <span
                  className={`leading-tight ${
                    isCurrent
                      ? 'text-white font-bold'
                      : isCompleted
                      ? 'text-purple-300'
                      : 'text-slate-500'
                  }`}
                >
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
