import React from 'react';
import { ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';
import { OFFICIAL_TELEGRAM, OFFICIAL_TELEGRAM_URL } from '../data/mockData';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, onScrollTo }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#030712]/95 border-b border-blue-900/40">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-950 to-blue-950 px-3 py-1 text-center text-[11px] text-blue-200 border-b border-blue-500/20">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
              <Sparkles className="w-3 h-3" /> ২৪ ঘণ্টা মেগা অফার চলমান
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-300">১২৪k+ ইউজার</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-300">১৪k+ রিভিউ</span>
          </div>

          {/* Telegram Support Link */}
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <a 
              href={OFFICIAL_TELEGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3 h-3 text-sky-400" />
              <span>টেলিগ্রাম: @{OFFICIAL_TELEGRAM}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 text-slate-100 font-extrabold tracking-tight text-base whitespace-nowrap shrink-0 group"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-950 flex items-center justify-center border border-blue-400/30 shadow-md">
            <ShieldCheck className="w-4 h-4 text-blue-200" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight text-white font-bold text-sm sm:text-base font-sans">
              SSC Real Question
            </span>
            <span className="text-[9px] tracking-wider text-blue-400/90 uppercase font-mono font-medium -mt-0.5">
              পোর্টাল
            </span>
          </div>
        </a>

        {/* Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-300">
          <button 
            onClick={() => onScrollTo('templates-section')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            প্রশ্ন টেমপ্লেট
          </button>
          <button 
            onClick={() => onScrollTo('reviews-section')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            বোর্ড রেজাল্ট ও রিভিউ
          </button>
          <a
            href={OFFICIAL_TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-slate-300"
          >
            <MessageCircle className="w-3 h-3 text-sky-400" />
            <span>টেলিগ্রাম সাপোর্ট</span>
          </a>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenOrderModal}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/20 border border-blue-400/30 transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            প্রশ্ন কিনুন
          </button>
        </div>
      </div>
    </header>
  );
};
