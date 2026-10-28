import React, { useState } from 'react';
import { PackageItem } from '../types';
import { PACKAGES } from '../data/mockData';
import { Check, Flame, Crown, ArrowRight, Zap, BookOpen } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem) => void;
  onViewSubjects: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
  onViewSubjects
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'test' | 'board'>('all');

  const testPkg = PACKAGES[0]; // SSC টেস্ট পরীক্ষার প্রশ্ন 5500 কেটে 3500 all subject
  const boardPkg = PACKAGES[1]; // SSC 2027 board question 35000 কেটে 8500

  return (
    <section id="templates-section" className="py-10 sm:py-16 bg-[#030712] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header (Scaled down) */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 uppercase tracking-widest font-mono mb-1.5">
            <span>প্রিমিয়াম প্রশ্ন টেমপ্লেট</span>
            <span aria-hidden="true">·</span>
            <span>২৪ ঘণ্টার বিশেষ অফার</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
            টেস্ট ও বোর্ডের <span className="luxury-gradient-text">আলাদা প্রশ্ন টেমপ্লেট</span>
          </h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            আপনার প্রয়োজনীয় টেমপ্লেট নির্বাচন করে <strong className="text-white">"প্রশ্ন কিনুন"</strong> বাটনে ক্লিক করুন। বিকাশে বা নগদে পেমেন্ট করে প্রশ্ন সংগ্রহ করতে পারবেন।
          </p>

          {/* Clean Segmented Tab Switcher */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl mt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              উভয় টেমপ্লেট
            </button>
            <button
              onClick={() => setActiveTab('test')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'test'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ১. টেস্ট পরীক্ষার প্রশ্ন (৳৩,৫০০)
            </button>
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'board'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ২. বোর্ড পরীক্ষার প্রশ্ন (৳৮,৫০০)
            </button>
          </div>
        </div>

        {/* Templates Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          {/* TEMPLATE 1: SSC টেস্ট পরীক্ষার প্রশ্ন */}
          {(activeTab === 'all' || activeTab === 'test') && (
            <div className="relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-b from-[#091533] via-[#060e22] to-[#030713] border border-blue-500/40 shadow-xl glow-blue">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
                      <Flame className="w-3.5 h-3.5 text-blue-300" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 font-mono">
                      টেমপ্লেট ১ · টেস্ট পরীক্ষা
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-400/10 border border-amber-400/30 text-amber-300">
                    <Zap className="w-3 h-3 fill-amber-400" />
                    <span>২৪ ঘণ্টার অফার</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-white mb-1 leading-snug">
                  SSC টেস্ট পরীক্ষার প্রশ্ন
                </h3>
                <p className="text-[11px] text-blue-200/90 mb-4 leading-normal">
                  টেস্ট পরীক্ষায় ১০০% নিশ্চিত কমন অরজিনাল প্রশ্নপত্র ও স্পেশাল উত্তরপত্র (All Subject)
                </p>

                {/* Price Box: 5500 কেটে 3500 all subject */}
                <div className="p-3 rounded-xl bg-black/50 border border-slate-800 mb-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                    <span>পূর্বের ফি:</span>
                    <span className="line-through text-slate-400 text-xs font-mono decoration-rose-500 decoration-2">
                      ৳৫,৫০০
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                        ৳৩,৫০০
                      </span>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                        (All Subject)
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      ৳২,০০০ ছাড়
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>অফার বাকি:</span>
                    <CountdownTimer compact />
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-5 text-[11px] text-slate-200 leading-snug">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>সকল বিষয়ের (All Subject) নির্ভরযোগ্য প্রশ্নপত্র ও সলিউশন</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>MCQ এর ১০০% নির্ভুল ব্যাখ্যাসহ ওএমআর শিট</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>সৃজনশীল (CQ) প্রশ্নের স্ট্যান্ডার্ড উত্তর কাঠামো</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>প্রাইভেট টেলিগ্রামে তাৎক্ষণিক পিডিএফ সরবরাহ</span>
                  </div>
                </div>

                {/* Subject List Button */}
                <button
                  type="button"
                  onClick={() => onViewSubjects(testPkg)}
                  className="w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold text-blue-300 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-800/40 transition-colors flex items-center justify-center gap-1.5 mb-4 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>সকল বিষয়ের তালিকা দেখুন</span>
                </button>
              </div>

              {/* BUY BUTTON */}
              <button
                type="button"
                onClick={() => onSelectPackage(testPkg)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>টেস্ট প্রশ্ন কিনুন (বিকাশ / নগদ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* TEMPLATE 2: SSC বোর্ড পরীক্ষার প্রশ্ন (SSC 2027) */}
          {(activeTab === 'all' || activeTab === 'board') && (
            <div className="relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-b from-[#0d162d] via-[#081023] to-[#040814] border border-amber-400/40 shadow-xl glow-gold">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                      <Crown className="w-3.5 h-3.5 fill-amber-300" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 font-mono">
                      টেমপ্লেট ২ · বোর্ড প্রশ্ন
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-400/10 border border-amber-400/30 text-amber-300">
                    <Zap className="w-3 h-3 fill-amber-400" />
                    <span>২৪ ঘণ্টার অফার</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-white mb-1 leading-snug">
                  SSC 2027 Question (বোর্ড পরীক্ষা)
                </h3>
                <p className="text-[11px] text-amber-200/90 mb-4 leading-normal">
                  টেস্ট এক্সাম + চূড়ান্ত বোর্ড পরীক্ষা ২০২৭ ভিআইপি অরজিনাল প্রশ্ন ও অ্যানালাইসিস
                </p>

                {/* Price Box: 35000 কেটে 8500 */}
                <div className="p-3 rounded-xl bg-black/50 border border-slate-800 mb-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                    <span>পূর্বের ফি:</span>
                    <span className="line-through text-slate-400 text-xs font-mono decoration-rose-500 decoration-2">
                      ৳৩৫,০০০
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                        ৳৮,৫০০
                      </span>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                        (VIP বোর্ড প্যাক)
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      ৭৬% মেগা ছাড়
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>অফার বাকি:</span>
                    <CountdownTimer compact />
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-5 text-[11px] text-slate-200 leading-snug">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>SSC 2027 টেস্ট ও বোর্ড ফাইনাল পরীক্ষার পূর্ণাঙ্গ প্রশ্নব্যাংক</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>ভিআইপি সিক্রেট টেলিগ্রাম মেম্বারশিপ অ্যাক্সেস</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>অধ্যায়ভিত্তিক সিক্রেট রিভিশন ও ১০০% কমন সাজেশন বুকলেট</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>পরীক্ষা চলাকালীন ২৪/৭ সরাসরি পার্সোনাল এডমিন সাপোর্ট</span>
                  </div>
                </div>

                {/* Subject List Button */}
                <button
                  type="button"
                  onClick={() => onViewSubjects(boardPkg)}
                  className="w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/40 transition-colors flex items-center justify-center gap-1.5 mb-4 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>সকল বিষয়ের তালিকা দেখুন</span>
                </button>
              </div>

              {/* BUY BUTTON */}
              <button
                type="button"
                onClick={() => onSelectPackage(boardPkg)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 border border-amber-300/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>বোর্ড প্রশ্ন কিনুন (বিকাশ / নগদ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
