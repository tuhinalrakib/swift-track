'use client';

import React, { useState } from 'react';
import { PackageIcon, BellIcon, ShieldCheckIcon, ClockIcon } from './Icons';

interface SituationUnavailableCardProps {
  orderDate: string;
  expectedDispatch: string;
  onEnableAlerts: (enabled: boolean) => void;
  onContactSupport: () => void;
}

export const SituationUnavailableCard: React.FC<SituationUnavailableCardProps> = ({
  expectedDispatch,
  onEnableAlerts,
  onContactSupport,
}) => {
  const [smsAlerts, setSmsAlerts] = useState(true);

  const toggleAlerts = () => {
    const newState = !smsAlerts;
    setSmsAlerts(newState);
    onEnableAlerts(newState);
  };

  return (
    <div className="bg-linear-to-br from-purple-950/50 via-[#130b24] to-[#0c1222] rounded-3xl p-4 border border-purple-500/40 shadow-xl space-y-3.5">
      {/* Top Banner */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/40">
          <PackageIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-xs font-bold text-white">Preparing Order for Dispatch</h4>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 font-semibold px-2 py-0.5 rounded-full border border-purple-500/30">
              Warehouse Picking
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
            Your items are safely packed at our fulfillment hub. Live GPS telemetry activates automatically once DHL/FedEx scans the barcode at the dispatch terminal.
          </p>
        </div>
      </div>

      {/* Explanatory Timeline Mini Box */}
      <div className="bg-[#090d16] rounded-2xl p-3 border border-[#1b253b] space-y-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
          Current Stage & Expected Handover
        </span>

        <div className="flex items-center justify-between text-xs pb-1 border-b border-[#1b253b]">
          <span className="text-slate-400 flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5 text-purple-400" /> Carrier Scan Handover:
          </span>
          <span className="font-semibold text-white">{expectedDispatch}</span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Order verified & inventory allocated</span>
          </div>
          <div className="flex items-center gap-2 text-purple-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span>Fulfillment packing & shipping label creation</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
            <span>Carrier pickup scan (activates live GPS map & ETA)</span>
          </div>
        </div>
      </div>

      {/* Interactive SMS / WhatsApp Alerts Toggle */}
      <div className="bg-[#090d16] rounded-2xl p-3 border border-[#1b253b] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <BellIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Instant Tracking Alerts</p>
            <p className="text-[10px] text-slate-400">Receive SMS the moment package scans</p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleAlerts}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            smsAlerts ? 'bg-purple-600' : 'bg-slate-700'
          }`}
          role="switch"
          aria-checked={smsAlerts}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              smsAlerts ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Support Action */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Need to modify shipping address?</span>
        </div>
        <button
          onClick={onContactSupport}
          className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          Edit / Contact Support →
        </button>
      </div>
    </div>
  );
};
