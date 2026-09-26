'use client';

import React from 'react';
import { BellIcon, ChevronDownIcon } from './Icons';

interface DashboardHeaderProps {
  onSearchChange?: (val: string) => void;
  searchValue?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onSearchChange,
  searchValue = '',
}) => {
  return (
    <header className="w-full bg-[#070a12] border-b border-[#151c2d] px-4 sm:px-6 lg:px-8 py-3 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Center: Search input */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search orders, tracking #, categories, recipients..."
              className="w-full pl-10 pr-4 py-2 bg-[#0e1424] border border-[#1e293b] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions, Bell, User Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-5 text-xs font-medium">
            <span className="text-purple-400 font-semibold cursor-pointer relative py-1">
              Admin Control
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full shadow-xs shadow-purple-400"></span>
            </span>
          </div>

          {/* Bell Icon */}
          <button 
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-[#111827] transition-colors relative"
            aria-label="Notifications"
          >
            <BellIcon className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-purple-500 absolute top-2 right-2 ring-2 ring-[#070a12]"></span>
          </button>

          {/* User Profile matching screenshot (Tuhin Al Rakib - Admin) */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#1c263c] cursor-pointer group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Tuhin Al Rakib"
              className="w-9 h-9 rounded-full object-cover border-2 border-purple-500/60 ring-2 ring-purple-500/20"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">
                Tuhin Al Rakib
              </p>
              <p className="text-[10px] text-purple-400 font-medium">
                Admin
              </p>
            </div>
            <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};
