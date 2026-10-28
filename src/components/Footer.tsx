import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { OFFICIAL_TELEGRAM, OFFICIAL_TELEGRAM_URL } from '../data/mockData';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenOrderModal }) => {
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText(`@${OFFICIAL_TELEGRAM}`);
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2000);
  };

  return (
    <footer className="bg-[#02050e] border-t border-blue-900/40 text-slate-300 pt-12 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white">
                SSC Real Question
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              এসএসসি টেস্ট পরীক্ষা ও বোর্ড পরীক্ষার ১০০% নির্ভরযোগ্য প্রশ্ন পোর্টাল।
            </p>
          </div>

          {/* Telegram Support Card */}
          <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-800/50 flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">টেলিগ্রাম হেল্প ও সাপোর্ট:</span>
                <span className="text-sm font-mono font-bold text-sky-300">@{OFFICIAL_TELEGRAM}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTelegram}
                className="px-2.5 py-1.5 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedTelegram ? 'কপি!' : 'কপি ID'}
              </button>

              <a
                href={OFFICIAL_TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <span>ইনবক্স করুন</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SSC Real Question. সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>১২৪k+ ইউজার</span>
            <span>·</span>
            <span>১৪k+ রিভিউ</span>
            <span>·</span>
            <button
              onClick={onOpenOrderModal}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              প্রশ্ন কিনুন (বিকাশ ও নগদ)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
