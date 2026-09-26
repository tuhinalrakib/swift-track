'use client';

import React, { useState } from 'react';
import { OrderData } from '../types/tracking';
import { PackageIcon, MapPinIcon, CopyIcon, ChevronDownIcon, ChevronRightIcon } from './Icons';

interface OrderSummaryCardProps {
  order: OrderData;
  onCopyTracking: () => void;
  onViewReceipt: () => void;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  order,
  onCopyTracking,
  onViewReceipt,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#0c1222] rounded-3xl p-4 shadow-xl border border-[#1b253b] space-y-3.5">
      {/* Order Header / Tracking info */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1b253b]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <PackageIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{order.orderId}</span>
              <span className="text-[10px] bg-[#141b2d] text-purple-300 border border-purple-500/20 px-1.5 py-0.2 rounded font-mono">
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">{order.orderDate}</p>
          </div>
        </div>

        {order.trackingNumber !== 'PENDING_CARRIER_ASSIGNMENT' ? (
          <button
            onClick={onCopyTracking}
            className="flex items-center gap-1 text-[11px] font-mono text-purple-300 hover:text-white bg-purple-950/60 hover:bg-purple-900/60 px-2.5 py-1 rounded-lg transition-colors border border-purple-500/30"
            title="Copy tracking number"
          >
            <CopyIcon className="w-3 h-3" />
            <span>Copy Trk#</span>
          </button>
        ) : (
          <span className="text-[10px] text-slate-400 bg-[#141b2d] px-2 py-1 rounded-lg font-mono border border-slate-700">
            Trk: Pending
          </span>
        )}
      </div>

      {/* Main Item Highlight */}
      <div className="space-y-2">
        {order.items.slice(0, isExpanded ? order.items.length : 1).map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-2.5 bg-[#090e1c] rounded-2xl border border-[#1b253b]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-xl object-cover bg-slate-800 shrink-0 border border-slate-700/60"
            />
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-semibold text-white truncate">{item.name}</h5>
              <p className="text-[10px] text-slate-400 truncate">{item.variant}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}

        {order.items.length > 1 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-[11px] text-purple-400 hover:text-purple-300 font-medium py-1 flex items-center justify-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Show less <ChevronDownIcon className="w-3.5 h-3.5 rotate-180 transition-transform" /></>
            ) : (
              <>+{order.items.length - 1} more items <ChevronDownIcon className="w-3.5 h-3.5 transition-transform" /></>
            )}
          </button>
        )}
      </div>

      {/* Shipping Address Mini Card */}
      <div className="bg-[#090e1c] rounded-2xl p-3 border border-[#1b253b] text-xs space-y-1">
        <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider">
          <span className="flex items-center gap-1">
            <MapPinIcon className="w-3 h-3 text-purple-400" /> Delivery Address
          </span>
          <span className="text-slate-400 font-normal capitalize">Standard Doorstep</span>
        </div>
        <p className="font-semibold text-white">{order.shippingAddress.recipientName}</p>
        <p className="text-slate-300 text-[11px]">
          {order.shippingAddress.street} {order.shippingAddress.apartment}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
        </p>
        {order.shippingAddress.instructions && (
          <p className="text-[10px] text-slate-300 bg-[#0f172a] p-2 rounded-lg border border-[#1e2a44] mt-1">
            <strong className="text-purple-300">Note:</strong> {order.shippingAddress.instructions}
          </p>
        )}
      </div>

      {/* Action to view full price receipt */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[10px] text-slate-400 block">Total Amount</span>
          <span className="text-sm font-extrabold text-emerald-400 font-mono">${order.pricing.total.toFixed(2)}</span>
        </div>

        <button
          onClick={onViewReceipt}
          className="py-2.5 px-3.5 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-900/40 transition-all flex items-center gap-1 border border-purple-400/40"
        >
          <span>View Invoice Breakdown</span>
          <ChevronRightIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
