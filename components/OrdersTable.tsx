'use client';

import React from 'react';
import { TrackingSituation } from '../types/tracking';
import { mockOrders } from '../data/mockOrders';

interface OrdersTableProps {
  currentSituation: TrackingSituation;
  onSelectOrder: (situation: TrackingSituation) => void;
  onOpenMobileView: () => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  currentSituation,
  onSelectOrder,
  onOpenMobileView,
}) => {
  const rows = [
    {
      situation: 'STANDARD' as TrackingSituation,
      id: mockOrders.STANDARD.orderId,
      item: mockOrders.STANDARD.items[0].name,
      image: mockOrders.STANDARD.items[0].image,
      recipient: mockOrders.STANDARD.shippingAddress.recipientName,
      carrier: mockOrders.STANDARD.carrier.name,
      category: 'Electronics',
      price: `$${mockOrders.STANDARD.pricing.total.toFixed(2)}`,
      statusText: 'OUT FOR DELIVERY',
      statusColor: 'emerald',
      eta: 'Today • 3:30 PM',
      actionLabel: 'Track Live 📱',
      badge: 'Standard Flow',
    },
    {
      situation: 'DELAYED' as TrackingSituation,
      id: mockOrders.DELAYED.orderId,
      item: mockOrders.DELAYED.items[0].name,
      image: mockOrders.DELAYED.items[0].image,
      recipient: mockOrders.DELAYED.shippingAddress.recipientName,
      carrier: mockOrders.DELAYED.carrier.name,
      category: 'Wearables',
      price: `$${mockOrders.DELAYED.pricing.total.toFixed(2)}`,
      statusText: 'DELAYED IN TRANSIT',
      statusColor: 'amber',
      eta: 'Tomorrow • 4:00 PM',
      actionLabel: 'Resolve Delay ⚠️',
      badge: 'Situation 1',
    },
    {
      situation: 'DELIVERED_NOT_RECEIVED' as TrackingSituation,
      id: mockOrders.DELIVERED_NOT_RECEIVED.orderId,
      item: mockOrders.DELIVERED_NOT_RECEIVED.items[0].name,
      image: mockOrders.DELIVERED_NOT_RECEIVED.items[0].image,
      recipient: mockOrders.DELIVERED_NOT_RECEIVED.shippingAddress.recipientName,
      carrier: mockOrders.DELIVERED_NOT_RECEIVED.carrier.name,
      category: 'Audio & Studio',
      price: `$${mockOrders.DELIVERED_NOT_RECEIVED.pricing.total.toFixed(2)}`,
      statusText: 'DELIVERED (DISPUTED)',
      statusColor: 'rose',
      eta: 'Delivered at 11:24 AM',
      actionLabel: 'Inspect Proof 📸',
      badge: 'Situation 2',
    },
    {
      situation: 'TRACKING_UNAVAILABLE' as TrackingSituation,
      id: mockOrders.TRACKING_UNAVAILABLE.orderId,
      item: mockOrders.TRACKING_UNAVAILABLE.items[0].name,
      image: mockOrders.TRACKING_UNAVAILABLE.items[0].image,
      recipient: mockOrders.TRACKING_UNAVAILABLE.shippingAddress.recipientName,
      carrier: mockOrders.TRACKING_UNAVAILABLE.carrier.name,
      category: 'Office & Desk',
      price: `$${mockOrders.TRACKING_UNAVAILABLE.pricing.total.toFixed(2)}`,
      statusText: 'PACKING IN HUB',
      statusColor: 'purple',
      eta: 'Scan Expected 6:00 PM',
      actionLabel: 'View Handover ⏳',
      badge: 'Situation 3',
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#1b253b] bg-[#0c1222]">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-[#0f172a] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1b253b]">
          <tr>
            <th scope="col" className="px-4 py-3.5">Order / Item</th>
            <th scope="col" className="px-4 py-3.5">Recipient</th>
            <th scope="col" className="px-4 py-3.5">Category</th>
            <th scope="col" className="px-4 py-3.5">Price</th>
            <th scope="col" className="px-4 py-3.5">Scenario</th>
            <th scope="col" className="px-4 py-3.5">Status</th>
            <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1b253b]/60">
          {rows.map((row) => {
            const isSelected = currentSituation === row.situation;
            return (
              <tr
                key={row.id}
                onClick={() => {
                  onSelectOrder(row.situation);
                }}
                className={`transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/30 border-l-4 border-l-purple-500'
                    : 'hover:bg-[#11192e]'
                }`}
              >
                {/* Item & Image */}
                <td className="px-4 py-3 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.image}
                    alt={row.item}
                    className="w-12 h-12 rounded-xl object-cover border border-[#1e293b] shrink-0"
                  />
                  <div className="min-w-0 max-w-[200px]">
                    <p className="font-semibold text-white truncate">{row.item}</p>
                    <p className="text-[10px] text-purple-400 font-mono">{row.id}</p>
                  </div>
                </td>

                {/* Recipient */}
                <td className="px-4 py-3">
                  <p className="text-white font-medium">{row.recipient}</p>
                  <p className="text-[10px] text-slate-400">{row.carrier}</p>
                </td>

                {/* Category */}
                <td className="px-4 py-3 text-slate-400">
                  {row.category}
                </td>

                {/* Price (Green accent matching Edu Core screenshot) */}
                <td className="px-4 py-3 font-semibold text-emerald-400 font-mono">
                  {row.price}
                </td>

                {/* Scenario Badge */}
                <td className="px-4 py-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1e293b] text-slate-300 border border-slate-700">
                    {row.badge}
                  </span>
                </td>

                {/* Status Pill (with colored dot matching Edu Core screenshot) */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                      row.statusColor === 'emerald'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : row.statusColor === 'amber'
                        ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                        : row.statusColor === 'rose'
                        ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                        : 'bg-purple-950/60 text-purple-400 border border-purple-500/30'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {row.statusText}
                  </span>
                </td>

                {/* Action button (Orange / Amber / Purple outline matching screenshot) */}
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOrder(row.situation);
                      onOpenMobileView();
                    }}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-900/40'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/40 hover:bg-amber-500/20'
                    }`}
                  >
                    {row.actionLabel}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
