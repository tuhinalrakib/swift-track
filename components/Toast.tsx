'use client';

import React from 'react';
import { CheckCircleIcon, AlertTriangleIcon, XIcon } from './Icons';

interface ToastProps {
  message: string;
  type?: 'success' | 'warning' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] shadow-2xl rounded-2xl p-3.5 flex items-center justify-between gap-3 border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-4 bg-slate-900/95 text-white border-slate-700">
      <div className="flex items-center gap-2.5">
        {type === 'success' && <div className="text-emerald-400"><CheckCircleIcon className="w-5 h-5" /></div>}
        {type === 'warning' && <div className="text-amber-400"><AlertTriangleIcon className="w-5 h-5" /></div>}
        {type === 'info' && <div className="text-blue-400"><CheckCircleIcon className="w-5 h-5" /></div>}
        <span className="text-xs sm:text-sm font-medium leading-snug">{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
