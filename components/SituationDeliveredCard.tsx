'use client';

import React from 'react';
import { CameraIcon, AlertTriangleIcon, ShieldCheckIcon } from './Icons';

interface SituationDeliveredCardProps {
  deliveredAt: string;
  dropLocation: string;
  onViewProof: () => void;
  onReportMissing: () => void;
  onCheckNeighbors: () => void;
}

export const SituationDeliveredCard: React.FC<SituationDeliveredCardProps> = ({
  deliveredAt,
  dropLocation,
  onViewProof,
  onReportMissing,
}) => {
  return (
    <div className="bg-linear-to-br from-emerald-950/40 via-[#0a1813] to-[#0c1222] rounded-3xl p-4 border border-emerald-500/40 shadow-xl space-y-3.5">
      {/* Top Banner */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-md">
            <CameraIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-emerald-300">Package Marked Delivered</h4>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.2 rounded-full border border-emerald-500/30">
                Dropoff Confirmed
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 mt-0.5">
              {deliveredAt} • {dropLocation}
            </p>
          </div>
        </div>

        <button
          onClick={onViewProof}
          className="text-[11px] font-bold text-emerald-300 hover:text-white bg-[#090d16] border border-emerald-500/40 px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1 transition-colors"
        >
          <CameraIcon className="w-3.5 h-3.5" /> View Photo
        </button>
      </div>

      {/* Prominent "Did not receive your package?" Callout */}
      <div className="bg-[#090e1c] rounded-2xl p-3.5 border border-rose-500/40 shadow-md space-y-2.5">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertTriangleIcon className="w-4 h-4 text-rose-400 shrink-0" />
          <h5 className="text-xs font-bold text-rose-300">Haven&apos;t received your order yet?</h5>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Couriers sometimes place parcels in concealed spots or mark them moments ahead of doorstep arrival.
        </p>

        {/* 3 Step Resolution Path */}
        <div className="space-y-1.5 pt-1 text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#1b253b] text-purple-300 flex items-center justify-center font-bold text-[9px]">1</span>
            <span>Check lobby, porch corners, or mail box area.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#1b253b] text-purple-300 flex items-center justify-center font-bold text-[9px]">2</span>
            <span>Inspect courier drop-off photo and verified GPS coordinates.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#1b253b] text-purple-300 flex items-center justify-center font-bold text-[9px]">3</span>
            <span>If still missing, claim immediate replacement or full refund.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={onViewProof}
            className="py-2.5 px-3 bg-[#111827] hover:bg-[#1a2338] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 border border-[#1e2a44]"
          >
            <CameraIcon className="w-3.5 h-3.5 text-purple-400" /> Proof Photo & GPS
          </button>
          
          <button
            onClick={onReportMissing}
            className="py-2.5 px-3 bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-900/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <AlertTriangleIcon className="w-3.5 h-3.5" /> Report Missing Package
          </button>
        </div>
      </div>

      {/* Guarantee Badge */}
      <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400">
        <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>SwiftTrack Buyer Protection guarantees 100% replacement or refund for lost deliveries.</span>
      </div>
    </div>
  );
};
