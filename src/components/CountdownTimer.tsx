import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface CountdownTimerProps {
  label?: string;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  label = "২৪ ঘণ্টার সীমিত অফার শেষ হতে বাকি:",
  compact = false 
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 48,
    seconds: 32
  });

  useEffect(() => {
    const STORAGE_KEY = 'ssc_offer_timer_end';
    let targetTime = localStorage.getItem(STORAGE_KEY);
    
    if (!targetTime || Number(targetTime) <= Date.now()) {
      const newTarget = Date.now() + 24 * 60 * 60 * 1000 - (11 * 60 + 28) * 1000;
      localStorage.setItem(STORAGE_KEY, newTarget.toString());
      targetTime = newTarget.toString();
    }

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, Number(targetTime) - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNum = (num: number) => String(num).padStart(2, '0');

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-md text-amber-300 text-[11px] font-mono font-bold tabular-nums">
        <Clock className="w-3 h-3 text-amber-400 shrink-0" />
        <span>{formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border border-amber-500/30 shadow-md">
      <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold">
        <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
          <Zap className="w-3 h-3 fill-amber-400" />
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-amber-400 font-mono">লিমিটেড টাইম ফ্ল্যাশ ডিল</span>
          <span className="text-white text-xs">{label}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 font-mono tabular-nums text-white">
        <div className="flex flex-col items-center">
          <span className="px-2 py-0.5 bg-blue-900/60 border border-blue-600/40 rounded-md text-xs sm:text-sm font-bold text-amber-300 min-w-[30px] text-center">
            {formatNum(timeLeft.hours)}
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5">ঘণ্টা</span>
        </div>
        <span className="text-amber-400 font-bold -mt-3 text-xs">:</span>
        <div className="flex flex-col items-center">
          <span className="px-2 py-0.5 bg-blue-900/60 border border-blue-600/40 rounded-md text-xs sm:text-sm font-bold text-amber-300 min-w-[30px] text-center">
            {formatNum(timeLeft.minutes)}
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5">মিনিট</span>
        </div>
        <span className="text-amber-400 font-bold -mt-3 text-xs">:</span>
        <div className="flex flex-col items-center">
          <span className="px-2 py-0.5 bg-blue-900/60 border border-blue-600/40 rounded-md text-xs sm:text-sm font-bold text-amber-300 min-w-[30px] text-center">
            {formatNum(timeLeft.seconds)}
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5">সেকেন্ড</span>
        </div>
      </div>
    </div>
  );
};
