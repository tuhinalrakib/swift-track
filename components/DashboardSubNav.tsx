'use client';

import React from 'react';

interface DashboardSubNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardSubNav: React.FC<DashboardSubNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'approvals', label: 'Enrollment Approvals', icon: '✅' },
    { id: 'teachers', label: 'Teacher Management', icon: '👨‍🏫' },
    { id: 'students', label: 'Student Management', icon: '🎓' },
    { id: 'tracking', label: 'Course & Order Tracking', icon: '📦', isTarget: true },
    { id: 'coupons', label: 'Coupon Management', icon: '🏷️' },
    { id: 'payments', label: 'Payment & Withdrawal', icon: '💳' },
  ];

  return (
    <div className="w-full bg-[#070a12] border-b border-[#141b2c] py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar flex items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1.5 border ${
                isActive
                  ? 'border-purple-500 bg-purple-950/40 text-purple-200 shadow-md shadow-purple-900/30'
                  : 'border-[#1b253b] bg-[#0c1222] text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className="text-xs">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
