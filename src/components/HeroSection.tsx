import React from 'react';
import { ArrowRight, MessageCircle, Star, ShieldCheck, Zap } from 'lucide-react';
import { OFFICIAL_TELEGRAM, OFFICIAL_TELEGRAM_URL } from '../data/mockData';
import { CountdownTimer } from './CountdownTimer';

interface HeroSectionProps {
  onExploreTemplates: () => void;
  onOpenOrderModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExploreTemplates, 
  onOpenOrderModal 
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-10 sm:pb-14 border-b border-blue-900/30">
      {/* Subtle luxury glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* 24h Synchronized Countdown */}
        <div className="max-w-xl mx-auto mb-6">
          <CountdownTimer label="২৪ ঘণ্টার সীমিত অফার শেষ হতে আর মাত্র:" />
        </div>

        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-600/30 text-blue-300 text-[11px] font-medium mb-3">
          <ShieldCheck className="w-3 h-3 text-blue-400" />
          <span>১০০% বিশ্বস্ত এসএসসি প্রশ্ন ও সলিউশন পোর্টাল</span>
        </div>

        {/* Main Headline (Scaled down) */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3.5 text-balance">
          SSC Real Question <br />
          <span className="luxury-gradient-text">টেস্ট ও বোর্ড পরীক্ষার ১০০% রিয়েল প্রশ্ন</span>
        </h1>

        {/* Subtext (Scaled down) */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-6">
          এসএসসি টেস্ট পরীক্ষা ও বোর্ড পরীক্ষার জন্য নির্ভুল প্রশ্নপত্র ও পূর্ণাঙ্গ সমাধান। বিকাশ ও নগদ দিয়ে সরাসরি কিনুন এবং জমা দিয়ে তাৎক্ষণিক টেলিগ্রাম ভিআইপি গ্রুপে যুক্ত হোন।
        </p>

        {/* Direct Action Buttons (Scaled down) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <button
            onClick={onExploreTemplates}
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25 border border-blue-400/40 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>প্রশ্ন টেমপ্লেট দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenOrderModal}
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>প্রশ্ন কিনুন (বিকাশ / নগদ)</span>
          </button>

          <a
            href={OFFICIAL_TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-sky-300 hover:text-white bg-sky-950/50 hover:bg-sky-900/50 border border-sky-800/40 transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>টেলিগ্রাম সাপোর্ট: @{OFFICIAL_TELEGRAM}</span>
          </a>
        </div>

        {/* User & Review Proof Metrics (Scaled down) */}
        <div className="pt-5 border-t border-blue-900/30 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
            <div className="text-lg sm:text-xl font-extrabold font-mono text-white tabular-nums">
              124k+
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">সক্রিয় ইউজার</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
            <div className="text-lg sm:text-xl font-extrabold font-mono text-amber-300 tabular-nums">
              14k+
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>ভেরিফাইড রিভিউ</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
            <div className="text-lg sm:text-xl font-extrabold font-mono text-emerald-400 tabular-nums">
              ১০০%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">কমন নিশ্চয়তা</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
            <div className="text-lg sm:text-xl font-extrabold font-mono text-sky-400 tabular-nums">
              24h
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-sky-400 fill-sky-400" />
              <span>স্পেশাল অফার</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
