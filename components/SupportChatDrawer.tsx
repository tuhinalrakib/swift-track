'use client';

import React, { useState } from 'react';
import { XIcon, SendIcon, ShieldCheckIcon } from './Icons';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

interface SupportChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  situationTitle?: string;
}

export const SupportChatDrawer: React.FC<SupportChatDrawerProps> = ({
  isOpen,
  onClose,
  orderId,
  situationTitle,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'agent',
      text: `Hello! I'm Alex from SwiftTrack Priority Care. I see you're checking on Order #${orderId} (${situationTitle || 'In Transit'}). How can I assist you right now?`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Where is my driver right now?',
    'I did not receive my delivered parcel',
    'Why is my shipment delayed?',
    'Can I change delivery instructions?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thank you for the message. I'm checking with the dispatch terminal right now.";
      const lower = text.toLowerCase();

      if (lower.includes('where is my driver') || lower.includes('driver')) {
        reply = "Courier Marcus Vance is currently on stop #14, which is 2 stops away from your address. Estimated arrival is within 25-35 minutes!";
      } else if (lower.includes('not receive') || lower.includes('missing') || lower.includes('delivered')) {
        reply = "I understand how concerning that is! I can review the driver's geotagged doorstep photo or immediately issue a free expedited replacement for you.";
      } else if (lower.includes('delayed') || lower.includes('why')) {
        reply = "Due to winter weather flight halts at Chicago cargo hub, your delivery is rescheduled for tomorrow by 4:00 PM. A $10 inconvenience store credit has been added to your account!";
      } else if (lower.includes('change') || lower.includes('instruction')) {
        reply = "I've transmitted your updated notes to the driver's scanner: 'Leave at front porch / ring buzzer'.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'agent',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#0c1222] rounded-t-3xl sm:rounded-3xl max-w-sm w-full h-[85vh] sm:h-[580px] flex flex-col shadow-2xl overflow-hidden border border-[#1b253b] animate-in slide-in-from-bottom-8 duration-200">
        {/* Header */}
        <div className="p-3.5 bg-linear-to-r from-purple-950 via-[#0d1322] to-slate-950 text-white flex items-center justify-between border-b border-[#1b253b]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xs text-white">
                AT
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-[#0c1222]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white">Alex • SwiftSupport</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded-full font-mono">Live</span>
              </div>
              <p className="text-[10px] text-slate-400">Order #{orderId} Support Line</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-[#141b2d] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Message history */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#080c18]">
          <div className="text-center my-1">
            <span className="text-[10px] bg-[#10172a] text-slate-400 border border-slate-800 px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1">
              <ShieldCheckIcon className="w-3 h-3 text-emerald-400" /> End-to-end encrypted session
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-br-xs shadow-md shadow-purple-950/60'
                    : 'bg-[#0f172a] text-slate-200 border border-[#1e293b] shadow-xs rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 bg-[#0f172a] p-2.5 rounded-2xl rounded-bl-xs w-20 border border-[#1e293b]">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="p-2 bg-[#0c1222] border-t border-[#1b253b] overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[10px] bg-[#111827] hover:bg-purple-950/60 hover:text-purple-300 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-[#1e2a44] transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="p-2.5 bg-[#0c1222] border-t border-[#1b253b] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 text-xs px-3 py-2 bg-[#080c18] border border-[#1b253b] rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder:text-slate-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-md shadow-purple-900/40"
          >
            <SendIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
