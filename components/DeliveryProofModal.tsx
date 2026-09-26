'use client';

import React from 'react';
import { XIcon, MapPinIcon, CameraIcon, ShieldCheckIcon, AlertTriangleIcon } from './Icons';

interface DeliveryProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportMissing: () => void;
  proofData?: {
    deliveredAt: string;
    dropoffLocation: string;
    recipientSigned: string;
    photoUrl: string;
    gpsCoordinates: string;
  };
}

export const DeliveryProofModal: React.FC<DeliveryProofModalProps> = ({
  isOpen,
  onClose,
  onReportMissing,
  proofData,
}) => {
  if (!isOpen || !proofData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0c1222] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#1b253b] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-linear-to-r from-purple-950 via-[#0d1322] to-slate-950 text-white flex items-center justify-between border-b border-[#1b253b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <CameraIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Proof of Delivery</h3>
              <p className="text-[11px] text-slate-400">Captured by courier at drop-off</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#141b2d] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Photo View */}
        <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proofData.photoUrl}
            alt="Delivery proof at doorstep"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md rounded-xl p-2 text-white text-[11px] flex items-center justify-between border border-white/10">
            <span className="flex items-center gap-1 font-mono text-emerald-400">
              <MapPinIcon className="w-3.5 h-3.5 text-emerald-400" /> GPS Verified
            </span>
            <span className="text-slate-300">{proofData.deliveredAt}</span>
          </div>
        </div>

        {/* Details list */}
        <div className="p-4 space-y-3">
          <div className="bg-[#090d16] rounded-2xl p-3 text-xs space-y-2 border border-[#1b253b]">
            <div className="flex items-start justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="font-semibold text-white text-right">{proofData.dropoffLocation}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-400">Coordinates:</span>
              <span className="font-mono text-[11px] text-purple-300">{proofData.gpsCoordinates}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-400">Authorization:</span>
              <span className="text-slate-300 text-right text-[11px]">{proofData.recipientSigned}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-purple-950/40 rounded-xl text-purple-200 text-xs border border-purple-500/30">
            <ShieldCheckIcon className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-[11px]">Courier GPS scan matched within 5 meters of your address radius.</span>
          </div>

          {/* Action buttons */}
          <div className="pt-1 space-y-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#141b2d] hover:bg-[#1a2338] text-white border border-[#1e2a44] rounded-xl text-xs font-semibold transition-colors"
            >
              I Found My Package (Close)
            </button>
            <button
              onClick={() => {
                onClose();
                onReportMissing();
              }}
              className="w-full py-2.5 bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-900/40"
            >
              <AlertTriangleIcon className="w-3.5 h-3.5" /> Still Can&apos;t Find It? File Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
