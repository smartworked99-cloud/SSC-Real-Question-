import React, { useState, useEffect } from 'react';
import { PackageItem, OrderSubmission } from '../types';
import { OFFICIAL_PHONE, OFFICIAL_TELEGRAM, OFFICIAL_TELEGRAM_URL, PACKAGES } from '../data/mockData';
import { X, Check, Copy, MessageCircle, ShieldCheck, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageItem | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPackage
}) => {
  const [currentPkg, setCurrentPkg] = useState<PackageItem>(selectedPackage || PACKAGES[0]);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // 'form' | 'success'
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (selectedPackage) {
      setCurrentPkg(selectedPackage);
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (isOpen) {
      setStep('form');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(OFFICIAL_PHONE);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText(`@${OFFICIAL_TELEGRAM}`);
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2000);
  };

  // Automated message as specifically requested:
  // 'আমি টাকা পাঠিয়েছি এই নাম্বার থেকে। চেক দিন তো টাকা গেছে?'
  const autoTelegramMessage = `আমি টাকা পাঠিয়েছি এই নাম্বার থেকে ${senderPhone}। চেক দিন তো টাকা গেছে? (TrxID: ${trxId || 'নাই'}, প্যাকেজ: ${currentPkg.title})`;

  const telegramDirectUrl = `https://t.me/${OFFICIAL_TELEGRAM}?text=${encodeURIComponent(autoTelegramMessage)}`;

  const handleCopyAutoMsg = () => {
    navigator.clipboard.writeText(autoTelegramMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderPhone.trim()) {
      alert('অনুগ্রহ করে যে নম্বর থেকে টাকা পাঠিয়েছেন তা লিখুন।');
      return;
    }

    const genId = `SSC-${Date.now().toString().slice(-6)}`;
    setOrderId(genId);

    // Save to local storage
    try {
      const newOrder: OrderSubmission = {
        id: genId,
        studentName: 'পরীক্ষার্থী',
        senderPhone: senderPhone.trim(),
        trxId: trxId.trim() || 'N/A',
        schoolName: '',
        board: 'বোর্ড পরীক্ষা',
        packageId: currentPkg.id,
        packageName: currentPkg.title,
        amount: currentPkg.offerPrice,
        paymentMethod,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        status: 'verified'
      };
      const existing = JSON.parse(localStorage.getItem('ssc_user_orders') || '[]');
      localStorage.setItem('ssc_user_orders', JSON.stringify([newOrder, ...existing]));
    } catch {
      // ignore
    }

    setStep('success');

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0b162f] via-[#071024] to-[#040815] border border-blue-500/40 rounded-3xl shadow-2xl overflow-hidden my-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-blue-900/40 bg-slate-900/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                {step === 'form' ? 'বিকাশ ও নগদ পেমেন্ট' : 'পেমেন্ট সাবমিট সম্পন্ন!'}
              </h3>
              <p className="text-[11px] text-blue-300">
                {step === 'form' ? 'নির্ধারিত নম্বরে সেন্ড মানি করে ফর্মটি জমা দিন' : 'টেলিগ্রামে এডমিনকে মেসেজ দিন'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Package Info */}
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-blue-300 font-semibold block">নির্বাচিত প্রশ্ন প্যাকেজ:</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{currentPkg.title}</span>
                </div>
                <div className="text-right">
                  <span className="text-base sm:text-lg font-black font-mono text-amber-300">
                    ৳{currentPkg.offerPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[10px] text-rose-400 line-through">
                    ৳{currentPkg.regularPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Real bKash & Nagad Selector Tabs */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  পেমেন্ট মাধ্যম বেছে নিন:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'bg-[#e2136e]/20 border-[#e2136e] text-white shadow-lg shadow-[#e2136e]/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e2136e]" />
                    <span>বিকাশ (bKash)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'bg-[#f7941d]/20 border-[#f7941d] text-white shadow-lg shadow-[#f7941d]/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f7941d]" />
                    <span>নগদ (Nagad)</span>
                  </button>
                </div>
              </div>

              {/* Number Display Card (Revealed ONLY here when user wants to buy!) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/60 to-slate-900 border border-blue-600/40">
                <div className="flex items-center justify-between text-xs text-blue-200 mb-1.5">
                  <span className="font-semibold">
                    {paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} সেন্ড মানি নম্বর (Personal):
                  </span>
                  <span className="text-amber-400 font-mono font-bold">
                    ৳{currentPkg.offerPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-blue-900/60">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-lg sm:text-xl font-extrabold font-mono text-white tracking-wider">
                      {OFFICIAL_PHONE}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>কপি নম্বর</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mt-2">
                  * আপনার বিকাশ/নগদ অ্যাপে গিয়ে <strong>Send Money</strong> করে <strong className="text-white">{OFFICIAL_PHONE}</strong> নম্বরে <strong>৳{currentPkg.offerPrice}</strong> পাঠান। এরপর নিচের তথ্য জমা দিন।
                </p>
              </div>

              {/* Clean Input Fields (No School Name) */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender Mobile No) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="যেমন: 017xxxxxxxx বা 018xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-blue-500 text-white text-xs sm:text-sm outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ট্রানজেকশন আইডি (TrxID) <span className="text-[10px] text-slate-400">(ঐচ্ছিক - বা খালি রাখুন)</span>
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="যেমন: BKL7829X বা খালি রাখুন"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-blue-500 text-white text-xs sm:text-sm outline-none font-mono uppercase"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>ট্রানজেকশন জমা দিন ও টেলিগ্রাম লিংক পান</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-400">
                যেকোনো হেল্প ও সাপোর্টের জন্য টেলিগ্রাম: <span className="text-sky-300 font-mono font-semibold">@{OFFICIAL_TELEGRAM}</span>
              </div>
            </form>
          ) : (
            /* STEP 2: TELEGRAM REDIRECT WITH AUTO-MESSAGE */
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mb-0.5">
                  পেমেন্ট তথ্য সফলভাবে জমা হয়েছে!
                </h4>
                <p className="text-xs text-slate-300 font-mono">
                  অর্ডার আইডি: <span className="text-amber-300 font-bold">{orderId}</span>
                </p>
              </div>

              {/* Telegram instructions */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0e1d3d] to-[#081229] border border-sky-400/50 text-left shadow-xl">
                <div className="p-3 rounded-xl bg-black/60 border border-sky-900/60 mb-3 text-xs sm:text-sm text-white leading-relaxed">
                  <p className="text-amber-300 font-bold text-sm mb-1">
                    এডমিন কে ইনবক্স করে কোন নাম্বার থেকে টাকা পাঠিয়েছেন তাকে জানান।
                  </p>
                  <p className="text-slate-300 text-xs">
                    নিচের বাটনে ক্লিক করলে সরাসরি টেলিগ্রাম এডমিন <strong className="text-sky-300">@{OFFICIAL_TELEGRAM}</strong> এর ইনবক্সে অটো মেসেজ সহ ওপেন হবে।
                  </p>
                </div>

                {/* Telegram Account Link Display */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/40 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">টেলিগ্রাম সাপোর্ট:</span>
                    <span className="text-sm font-bold font-mono text-sky-300">@{OFFICIAL_TELEGRAM}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyTelegram}
                    className="px-2.5 py-1 rounded bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedTelegram ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTelegram ? 'কপি!' : 'কপি ID'}</span>
                  </button>
                </div>

                {/* Auto Message Preview */}
                <div className="mb-3.5">
                  <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                    <span>অটো মেসেজ প্রিভিউ:</span>
                    <button
                      type="button"
                      onClick={handleCopyAutoMsg}
                      className="text-sky-400 hover:text-sky-300 text-[11px] underline cursor-pointer"
                    >
                      {copiedMsg ? 'কপি হয়েছে' : 'মেসেজ কপি'}
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/80 border border-slate-800 text-xs text-amber-200/90 font-mono">
                    "{autoTelegramMessage}"
                  </div>
                </div>

                {/* TELEGRAM AUTO MESSAGE ACTION BUTTON */}
                <a
                  href={telegramDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 shadow-xl shadow-sky-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>টেলিগ্রামে মেসেজ পাঠান (অটো মেসেজ সহ)</span>
                </a>

                <div className="text-[11px] text-slate-400 text-center mt-2">
                  এখানে ক্লিক করলে টেলিগ্রামে অটো মেসেজ সহ সেন্ট হবে: <br />
                  <span className="text-sky-200 italic font-medium">
                    'আমি টাকা পাঠিয়েছি এই নাম্বার থেকে। চেক দিন তো টাকা গেছে?'
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              >
                পোর্টালে ফিরে যান
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
