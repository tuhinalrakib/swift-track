'use client';

import React, { useState } from 'react';
import { TrackingSituation, OrderData } from '../types/tracking';
import { mockOrders } from '../data/mockOrders';
import { DashboardFilterTabs } from '../components/DashboardFilterTabs';
import { OrdersTable } from '../components/OrdersTable';
import { DeliveryHeroCard } from '../components/DeliveryHeroCard';
import { DeliveryMapGraphic } from '../components/DeliveryMapGraphic';
import { DriverCard } from '../components/DriverCard';
import { SituationDelayedCard } from '../components/SituationDelayedCard';
import { SituationDeliveredCard } from '../components/SituationDeliveredCard';
import { SituationUnavailableCard } from '../components/SituationUnavailableCard';
import { DeliveryTimeline } from '../components/DeliveryTimeline';
import { OrderSummaryCard } from '../components/OrderSummaryCard';
import { DeliveryProofModal } from '../components/DeliveryProofModal';
import { ReportIssueModal } from '../components/ReportIssueModal';
import { SupportChatDrawer } from '../components/SupportChatDrawer';
import { OrderReceiptModal } from '../components/OrderReceiptModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { Toast } from '../components/Toast';
import { 
  BellIcon, 
  HelpCircleIcon, 
  PhoneIcon, 
  MessageSquareIcon, 
  AlertTriangleIcon
} from '../components/Icons';

export default function OrderTrackingPage() {
  const [situation, setSituation] = useState<TrackingSituation>('STANDARD');
  const [activeSubTab, setActiveSubTab] = useState('tracking');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>(null);

  const orderData: OrderData = 
    (situation === 'LOADING' || situation === 'ERROR')
      ? mockOrders.STANDARD
      : (mockOrders[situation] || mockOrders.STANDARD);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyTracking = () => {
    if (orderData?.trackingNumber && orderData.trackingNumber !== 'PENDING_CARRIER_ASSIGNMENT') {
      navigator.clipboard.writeText(orderData.trackingNumber);
      showToast(`Tracking #${orderData.trackingNumber} copied to clipboard!`, 'success');
    }
  };

  const handleCallDriver = () => {
    showToast(`Calling courier ${orderData?.driver?.name || 'Marcus'} at ${orderData?.driver?.phone || '+1 (555) 892-4412'}...`, 'info');
  };

  const handleCallSupport = () => {
    showToast('Connecting with 24/7 SwiftTrack Dispatch line: +1 (800) 555-TRACK...', 'info');
  };

  const handleExpedite = () => {
    showToast('Priority expedite requested! Terminal dispatch notified.', 'success');
  };

  const handleReschedule = () => {
    showToast('Delivery rescheduled for Tomorrow afternoon window (1:00 PM – 4:00 PM).', 'success');
  };

  const handleCreditClaim = () => {
    showToast('$10 Inconvenience Credit added to your account wallet!', 'success');
  };

  const scrollToMobilePreview = () => {
    document.getElementById('mobile-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white">

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Main Card Container */}
        <div className="bg-[#0b0f19] border border-[#1b253b] rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle purple background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>All Platform Orders</span>
                <span className="text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Task 1 Assessment
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Review, track real-time fulfillment, resolve transit delays, and inspect delivery proofs for customer orders.
              </p>
            </div>

            {/* Right: Search box inside main card */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search course title / order..."
                  className="w-full pl-9 pr-4 py-2 bg-[#0e1424] border border-[#1e293b] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <button
                onClick={scrollToMobilePreview}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-xl text-xs font-semibold transition-colors"
                title="Jump down to Tracking View"
              >
                <span>📦 View Live Tracking</span>
                <span>↓</span>
              </button>
            </div>
          </div>

          {/* Filter Pills with Counts (exact replica of user's screenshot pills) */}
          <div className="relative z-10 border-b border-[#1b253b] pb-3">
            <DashboardFilterTabs
              currentSituation={situation}
              onSelectSituation={(st) => {
                setSituation(st);
                showToast(`Filter selected: ${st.replace(/_/g, ' ')}`, 'info');
                scrollToMobilePreview();
              }}
              counts={{
                all: 4,
                standard: 1,
                delayed: 1,
                delivered: 1,
                unavailable: 1,
              }}
            />
          </div>

          {/* Full Width Table (Top of Main Card) */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                All Orders & Shipments Pipeline (4)
              </span>
              <span className="text-[11px] text-purple-400">
                Click any row to inspect tracking details below ↓
              </span>
            </div>

            {/* Orders Table spanning full width */}
            <OrdersTable
              currentSituation={situation}
              onSelectOrder={(st) => {
                setSituation(st);
                showToast(`Selected order: ${st}`, 'info');
                scrollToMobilePreview();
              }}
              onOpenMobileView={scrollToMobilePreview}
            />
          </div>

          {/* Section: Live Order Tracking Experience (Full Width & Responsive 360px - 430px on mobile) */}
          <div id="mobile-preview" className="pt-8 border-t border-[#1b253b] relative z-10 space-y-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b253b]/80">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold shadow-md shadow-purple-950/50">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                  <span>Task 1 — Live Order Tracking Experience</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Shipment #{orderData?.orderId || 'ORD-98412-US'}</span>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    ({orderData?.carrier?.name || 'FedEx Priority'})
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Current Status:</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/40 uppercase">
                  {orderData?.currentStatus?.label || 'In Transit'}
                </span>
              </div>
            </div>

            {/* Dynamic Content: Full-Width on Desktop, automatically responsive down to 360px-430px on mobile */}
            {situation === 'LOADING' ? (
              <LoadingSkeleton />
            ) : situation === 'ERROR' ? (
              <ErrorState
                onRetry={() => {
                  setSituation('STANDARD');
                  showToast('Telemetry reconnected!', 'success');
                }}
                onOpenChat={() => setIsChatOpen(true)}
              />
            ) : (
              <div className="space-y-6">
                {/* 1. Top Row: Status Hero Card + Live Route Telemetry Map (Full Width Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <DeliveryHeroCard order={orderData} situation={situation} />
                  <DeliveryMapGraphic
                    situation={situation}
                    stopsAway={orderData?.driver?.stopsAway}
                    streetAddress={orderData?.shippingAddress?.street || '742 Evergreen Terrace'}
                  />
                </div>

                {/* 2. Situation Specific Notice Cards (Delayed, Delivered Proof, or Warehouse Handover) */}
                {situation === 'DELAYED' && (
                  <SituationDelayedCard
                    originalEstimate={orderData?.estimatedDelivery?.originalEstimate}
                    revisedEstimate={`${orderData?.estimatedDelivery?.date || 'Tomorrow'} • ${orderData?.estimatedDelivery?.timeWindow || 'By 4:00 PM'}`}
                    delayReason={orderData?.estimatedDelivery?.delayReason}
                    onExpedite={handleExpedite}
                    onReschedule={handleReschedule}
                    onRequestCredit={handleCreditClaim}
                  />
                )}

                {situation === 'DELIVERED_NOT_RECEIVED' && (
                  <SituationDeliveredCard
                    deliveredAt={orderData?.estimatedDelivery?.timeWindow || '11:24 AM'}
                    dropLocation={orderData?.deliveryProof?.dropoffLocation || 'Front Porch'}
                    onViewProof={() => setIsProofModalOpen(true)}
                    onReportMissing={() => setIsReportModalOpen(true)}
                    onCheckNeighbors={() => showToast('Neighbor delivery alert sent.', 'info')}
                  />
                )}

                {situation === 'TRACKING_UNAVAILABLE' && (
                  <SituationUnavailableCard
                    orderDate={orderData?.orderDate || 'Today'}
                    expectedDispatch="Today by 6:00 PM"
                    onEnableAlerts={(enabled) =>
                      showToast(
                        enabled ? 'SMS alerts enabled!' : 'Alerts turned off',
                        enabled ? 'success' : 'info'
                      )
                    }
                    onContactSupport={() => setIsChatOpen(true)}
                  />
                )}

                {/* 3. Middle Row: Driver Card & Delivery Milestones Timeline on left; Order Summary & Support on right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left Column (Milestones & Driver) */}
                  <div className="lg:col-span-6 space-y-5">
                    {situation === 'STANDARD' && orderData?.driver && (
                      <DriverCard
                        driver={orderData.driver}
                        onCall={handleCallDriver}
                        onMessage={() => setIsChatOpen(true)}
                      />
                    )}
                    <DeliveryTimeline steps={orderData?.timeline || []} />
                  </div>

                  {/* Right Column (Order & Product Summary & Quick Help) */}
                  <div className="lg:col-span-6 space-y-5">
                    <OrderSummaryCard
                      order={orderData || mockOrders.STANDARD}
                      onCopyTracking={handleCopyTracking}
                      onViewReceipt={() => setIsReceiptOpen(true)}
                    />

                    {/* Quick Help Touchpoint */}
                    <div className="bg-[#0c1222] rounded-3xl p-4 border border-[#1b253b] flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                          <HelpCircleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Need delivery assistance?</p>
                          <p className="text-[11px] text-slate-400">Our customer team is active 24/7</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsChatOpen(true)}
                        className="py-2 px-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-xl font-semibold transition-colors"
                      >
                        Live Help Chat →
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Action Toolbar: Contact Support, Report Issue, Call Dispatch */}
                <div className="bg-[#0c1222] border border-[#1b253b] p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Order updates active via real-time satellite telemetry</span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="flex-1 sm:flex-none py-2.5 px-4 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-900/40 transition-all flex items-center justify-center gap-2 border border-purple-400/30"
                    >
                      <MessageSquareIcon className="w-4 h-4" />
                      <span>Contact Support</span>
                    </button>

                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="py-2.5 px-3.5 bg-[#10172a] hover:bg-[#1a2338] text-slate-200 border border-[#1e2a44] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      title="Report Issue"
                    >
                      <AlertTriangleIcon className="w-4 h-4 text-amber-400" />
                      <span>Report Issue</span>
                    </button>

                    <button
                      onClick={handleCallSupport}
                      className="w-10 h-10 bg-[#10172a] hover:bg-[#1a2338] text-slate-200 border border-[#1e2a44] rounded-xl flex items-center justify-center transition-colors shrink-0"
                      title="Call Dispatch"
                      aria-label="Call Dispatch"
                    >
                      <PhoneIcon className="w-4 h-4 text-purple-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Interactive Modals & Drawers */}
      <DeliveryProofModal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
        proofData={orderData.deliveryProof}
        onReportMissing={() => {
          setIsProofModalOpen(false);
          setIsReportModalOpen(true);
        }}
      />

      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        orderId={orderData?.orderId || 'ORD-98412-US'}
        defaultIssue={
          situation === 'DELIVERED_NOT_RECEIVED'
            ? 'Package marked delivered, but not found'
            : situation === 'DELAYED'
            ? 'Order delayed past delivery guarantee'
            : 'Delivery inquiry'
        }
        onSuccess={(msg) => showToast(msg, 'success')}
      />

      <SupportChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        orderId={orderData?.orderId || 'ORD-98412-US'}
        situationTitle={orderData?.currentStatus?.headline || 'In Transit'}
      />

      <OrderReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        order={orderData || mockOrders.STANDARD}
      />

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
