'use client';

import React, { useState } from 'react';
import { XIcon, CheckCircleIcon, ShieldCheckIcon, AlertTriangleIcon } from './Icons';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  defaultIssue?: string;
  onSuccess: (message: string) => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  orderId,
  defaultIssue = 'Delivered but not received',
  onSuccess,
}) => {
  const [selectedIssue, setSelectedIssue] = useState(defaultIssue);
  const [resolutionChoice, setResolutionChoice] = useState<'replacement' | 'refund'>('replacement');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const claimId = `CLM-${Math.floor(100000 + Math.random() * 900000)}`;
      onSuccess(`Claim ${claimId} created! Our resolution team approved your ${resolutionChoice}.`);
      onClose();
    }, 900);
  };

  const issuesList = [
    { id: 'not_received', label: 'Package marked delivered, but not found', desc: 'Driver marked delivered but item is missing' },
    { id: 'delayed', label: 'Order delayed past delivery guarantee', desc: 'Missed delivery window, request delay compensation' },
    { id: 'damaged', label: 'Item arrived damaged or opened', desc: 'Transit damage or broken packaging' },
    { id: 'wrong_address', label: 'Delivered to wrong address / neighbor', desc: 'GPS or photo shows different doorstep' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0c1222] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#1b253b] animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-linear-to-r from-rose-950/80 via-[#0d1322] to-slate-950 text-white flex items-center justify-between border-b border-[#1b253b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <AlertTriangleIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Report Delivery Issue</h3>
              <p className="text-[11px] text-slate-400">Order #{orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#141b2d] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">What went wrong?</label>
            <div className="space-y-2">
              {issuesList.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue.label)}
                  className={`p-2.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                    selectedIssue === issue.label
                      ? 'border-purple-500 bg-purple-950/40 text-purple-200 font-medium ring-1 ring-purple-500 shadow-md shadow-purple-950/50'
                      : 'border-[#1b253b] bg-[#090d16] hover:bg-[#11192e] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{issue.label}</span>
                    {selectedIssue === issue.label && (
                      <CheckCircleIcon className="w-4 h-4 text-purple-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{issue.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Resolution */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Immediate Resolution</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setResolutionChoice('replacement')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all text-xs ${
                  resolutionChoice === 'replacement'
                    ? 'border-purple-500 bg-purple-950/50 text-purple-200 font-semibold ring-1 ring-purple-500'
                    : 'border-[#1b253b] bg-[#090d16] text-slate-300 hover:bg-[#111827]'
                }`}
              >
                📦 Free Replacement
              </button>
              <button
                type="button"
                onClick={() => setResolutionChoice('refund')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all text-xs ${
                  resolutionChoice === 'refund'
                    ? 'border-purple-500 bg-purple-950/50 text-purple-200 font-semibold ring-1 ring-purple-500'
                    : 'border-[#1b253b] bg-[#090d16] text-slate-300 hover:bg-[#111827]'
                }`}
              >
                💳 Instant 100% Refund
              </button>
            </div>
          </div>

          {/* Details / Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Checked with neighbor and lobby, package not there..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-xl border border-[#1b253b] bg-[#090d16] text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder:text-slate-500"
            />
          </div>

          <div className="p-2.5 bg-emerald-950/40 rounded-xl flex items-center gap-2 text-emerald-300 text-xs border border-emerald-500/30">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] leading-tight">
              Protected by <strong>SwiftTrack 100% Guarantee</strong>. No waiting period required.
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-900/40 transition-all flex items-center justify-center gap-2 border border-purple-400/30"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing Claim...
              </span>
            ) : (
              <span>Submit Claim & Request {resolutionChoice === 'replacement' ? 'Replacement' : 'Refund'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
