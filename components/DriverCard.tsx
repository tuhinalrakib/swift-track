'use client';

import React from 'react';
import { DriverInfo } from '../types/tracking';
import { PhoneIcon, MessageSquareIcon, TruckIcon } from './Icons';

interface DriverCardProps {
  driver: DriverInfo;
  onCall: () => void;
  onMessage: () => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver, onCall, onMessage }) => {
  return (
    <div className="bg-[#0c1222] rounded-3xl p-4 shadow-xl border border-[#1b253b] space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/60 ring-2 ring-purple-500/20"
            />
            <span className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0c1222] absolute bottom-0 right-0"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-white">{driver.name}</h4>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold px-1.5 py-0.2 rounded">
                ★ {driver.rating}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <TruckIcon className="w-3 h-3 text-purple-400" />
              <span>{driver.vehicle} • {driver.plate}</span>
            </p>
          </div>
        </div>

        {/* Stops Away Callout */}
        <div className="text-right">
          <span className="text-xs font-extrabold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2.5 py-1 rounded-xl shadow-xs">
            {driver.stopsAway} stops away
          </span>
          <p className="text-[9px] text-slate-400 mt-1">Current: Stop #{driver.currentStop}</p>
        </div>
      </div>

      {/* Driver Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#1b253b]">
        <button
          onClick={onCall}
          className="py-2.5 px-3 bg-[#111827] hover:bg-[#1a2338] text-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 border border-[#1f293d]"
        >
          <PhoneIcon className="w-3.5 h-3.5 text-slate-300" />
          <span>Call Driver</span>
        </button>

        <button
          onClick={onMessage}
          className="py-2.5 px-3 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-purple-400/40 shadow-md shadow-purple-900/40"
        >
          <MessageSquareIcon className="w-3.5 h-3.5 text-white" />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};
