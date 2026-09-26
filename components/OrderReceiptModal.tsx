'use client';

import React from 'react';
import { XIcon, PackageIcon, ShieldCheckIcon } from './Icons';
import { OrderData } from '../types/tracking';

interface OrderReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0c1222] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#1b253b] animate-in zoom-in-95 duration-200 max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-linear-to-r from-purple-950/80 via-[#0d1322] to-slate-950 text-white flex items-center justify-between border-b border-[#1b253b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <PackageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Order Breakdown</h3>
              <p className="text-[11px] text-slate-400">Order #{order.orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#141b2d] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Order metadata */}
          <div className="p-3 bg-[#090d16] rounded-2xl border border-[#1b253b] space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Order Date:</span>
              <span className="font-semibold text-white">{order.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Carrier:</span>
              <span className="font-medium text-purple-300">{order.carrier.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment:</span>
              <span className="font-medium text-white">Apple Pay •••• 4242</span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="font-semibold text-white mb-2">Purchased Items ({order.items.length})</h4>
            <div className="space-y-2.5">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 bg-[#090d16] rounded-xl border border-[#1b253b]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-800 border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-400">{item.variant}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                      <span className="font-semibold text-emerald-400 font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-[#1b253b] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-white font-medium">${order.pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Shipping</span>
              <span className="text-emerald-400 font-medium">
                {order.pricing.shipping === 0 ? 'FREE' : `$${order.pricing.shipping.toFixed(2)}`}
              </span>
            </div>
            {order.pricing.discount < 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount Promo</span>
                <span className="font-semibold">-${Math.abs(order.pricing.discount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Tax</span>
              <span className="text-white font-medium">${order.pricing.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#1b253b] text-sm font-bold text-white">
              <span>Total Paid</span>
              <span className="text-emerald-400 font-mono">${order.pricing.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-2.5 bg-purple-950/40 rounded-xl flex items-center gap-2 text-purple-200 text-[11px] border border-purple-500/30">
            <ShieldCheckIcon className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Official digital invoice registered with SwiftTrack Secure Checkout.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all shadow-md shadow-purple-900/40 border border-purple-400/30"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
