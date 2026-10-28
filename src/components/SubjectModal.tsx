import React from 'react';
import { PackageItem } from '../types';
import { X, BookOpen, CheckCircle, ShieldAlert } from 'lucide-react';

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: PackageItem | null;
  onOrderNow: (pkg: PackageItem) => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  onClose,
  pkg,
  onOrderNow
}) => {
  if (!isOpen || !pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0a162f] to-[#040814] border border-blue-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl text-left">
        <div className="flex items-center justify-between pb-4 border-b border-blue-900/50 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {pkg.shortTitle} এর বিষয়সমূহ
              </h3>
              <p className="text-xs text-blue-300">সকল বোর্ডের জন্য প্রযোজ্য পূর্ণাঙ্গ তালিকা</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="space-y-2.5 mb-6 max-h-72 overflow-y-auto pr-1">
          {pkg.subjects.map((sub, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/70 border border-blue-900/40 flex items-center gap-3 text-xs sm:text-sm text-slate-200"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                {idx + 1}
              </div>
              <span className="font-medium">{sub}</span>
            </div>
          ))}
        </div>

        {/* Guarantee Info */}
        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 mb-6 flex items-start gap-2.5 text-xs text-slate-300">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            প্রতিটি বিষয়ের সৃজনশীল (CQ), বহুনির্বাচনী (MCQ) এবং দ্রুত উত্তর মেলানোর জন্য উত্তরপত্র ও স্পেশাল ট্রিকস সরবরাহ করা হবে।
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>

          <button
            onClick={() => {
              onClose();
              onOrderNow(pkg);
            }}
            className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            অর্ডার ফর্ম খুলুন
          </button>
        </div>
      </div>
    </div>
  );
};
