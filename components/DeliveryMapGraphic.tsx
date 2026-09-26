'use client';

import React from 'react';
import { TrackingSituation } from '../types/tracking';
import { MapPinIcon, TruckIcon, AlertTriangleIcon, CheckCircleIcon, PackageIcon } from './Icons';

interface DeliveryMapGraphicProps {
  situation: TrackingSituation;
  stopsAway?: number;
  streetAddress: string;
}

export const DeliveryMapGraphic: React.FC<DeliveryMapGraphicProps> = ({
  situation,
  stopsAway = 2,
  streetAddress,
}) => {
  return (
    <div className="relative w-full h-36 bg-[#090d16] rounded-3xl overflow-hidden p-3.5 flex flex-col justify-between border border-[#1b253b] shadow-inner">
      {/* Background stylized grid / telemetry radar lines */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #8b5cf6 1px, transparent 1px),
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }}
      />

      {/* Decorative route path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 140">
        <defs>
          <linearGradient id="neonPurpleGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="delayedAmberGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {situation === 'DELAYED' ? (
          <path
            d="M 30 70 Q 140 20, 200 70 T 370 70"
            fill="none"
            stroke="url(#delayedAmberGrad)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        ) : (
          <path
            d="M 30 75 Q 120 25, 230 75 T 370 70"
            fill="none"
            stroke="url(#neonPurpleGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Top Map Badges */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-[#0e1424]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-slate-300 border border-[#1e2a44]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Live GPS Telemetry</span>
        </div>

        {situation === 'STANDARD' && (
          <span className="bg-purple-950/60 text-purple-300 border border-purple-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {stopsAway} stops remaining
          </span>
        )}

        {situation === 'DELAYED' && (
          <span className="bg-amber-950/60 text-amber-300 border border-amber-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertTriangleIcon className="w-3 h-3 text-amber-400" /> Transit Hold
          </span>
        )}

        {situation === 'DELIVERED_NOT_RECEIVED' && (
          <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircleIcon className="w-3 h-3 text-emerald-400" /> Dropped Off
          </span>
        )}

        {situation === 'TRACKING_UNAVAILABLE' && (
          <span className="bg-purple-950/60 text-purple-300 border border-purple-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <PackageIcon className="w-3 h-3 text-purple-400" /> Warehouse Bay
          </span>
        )}
      </div>

      {/* Dynamic Markers along route */}
      <div className="relative z-10 flex items-center justify-between px-2 pt-2">
        {/* Origin */}
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-[#111827] border border-slate-700 flex items-center justify-center text-slate-400 shadow-md">
            <PackageIcon className="w-3 h-3" />
          </div>
          <span className="text-[9px] text-slate-400 mt-1">Warehouse</span>
        </div>

        {/* Courier / Vehicle Position */}
        {situation === 'STANDARD' && (
          <div className="flex flex-col items-center animate-bounce duration-1000">
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-purple-700 to-indigo-600 border-2 border-purple-400 flex items-center justify-center text-white shadow-lg shadow-purple-900/80 ring-4 ring-purple-500/20">
              <TruckIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-white mt-1 bg-purple-950/80 px-1.5 rounded border border-purple-500/30">
              Courier Van
            </span>
          </div>
        )}

        {situation === 'DELAYED' && (
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-amber-600 border-2 border-amber-400 flex items-center justify-center text-white shadow-lg shadow-amber-900/80 ring-4 ring-amber-500/20">
              <AlertTriangleIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-amber-300 mt-1 bg-amber-950/80 px-1.5 rounded border border-amber-500/30">
              Chicago Hub
            </span>
          </div>
        )}

        {situation === 'TRACKING_UNAVAILABLE' && (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-purple-600/60 border border-purple-400 flex items-center justify-center text-white">
              <PackageIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-purple-300 mt-1">Sorting</span>
          </div>
        )}

        {/* Destination */}
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md ${
            situation === 'DELIVERED_NOT_RECEIVED'
              ? 'bg-emerald-600 border-2 border-emerald-300 ring-4 ring-emerald-500/30'
              : 'bg-[#141b2d] border border-slate-700 text-slate-300'
          }`}>
            <MapPinIcon className="w-4 h-4" />
          </div>
          <span className="text-[9px] text-slate-300 font-medium mt-1 truncate max-w-[70px]">
            {streetAddress.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Bottom mini-bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1b253b]">
        <span className="truncate max-w-[200px] text-slate-300">📍 {streetAddress}</span>
        <span className="text-purple-400 font-mono text-[9px]">SATELLITE SYNC: ACTIVE</span>
      </div>
    </div>
  );
};
