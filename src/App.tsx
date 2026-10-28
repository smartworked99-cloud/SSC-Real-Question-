import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { SubjectModal } from './components/SubjectModal';
import { PackageItem } from './types';
import { PACKAGES, OFFICIAL_TELEGRAM, OFFICIAL_TELEGRAM_URL } from './data/mockData';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(PACKAGES[0]);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectPackage, setSubjectPackage] = useState<PackageItem | null>(null);

  const handleOpenOrder = (pkg?: PackageItem) => {
    if (pkg) {
      setSelectedPackage(pkg);
    } else {
      setSelectedPackage(PACKAGES[0]);
    }
    setIsPaymentModalOpen(true);
  };

  const handleViewSubjects = (pkg: PackageItem) => {
    setSubjectPackage(pkg);
    setIsSubjectModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Clean Navbar */}
      <Navbar
        onOpenOrderModal={() => handleOpenOrder()}
        onScrollTo={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreTemplates={() => scrollToSection('templates-section')}
          onOpenOrderModal={() => handleOpenOrder()}
        />

        {/* Separated Templates: Test Exam & Board Exam Questions */}
        <PackagesSection
          onSelectPackage={(pkg) => handleOpenOrder(pkg)}
          onViewSubjects={(pkg) => handleViewSubjects(pkg)}
        />

        {/* Real Reviews & Board Results (SSC 2025, 2026, 2027 Ongoing Test Exam) */}
        <ReviewsSection onOpenOrderModal={() => handleOpenOrder()} />
      </main>

      {/* Footer with Telegram Support */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenOrderModal={() => handleOpenOrder()}
      />

      {/* Real bKash & Nagad Payment Modal (Number 01780224675 shown ONLY here!) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPackage={selectedPackage}
      />

      {/* Subject Syllabus Details Modal */}
      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        pkg={subjectPackage}
        onOrderNow={(pkg) => handleOpenOrder(pkg)}
      />

      {/* Floating Telegram Support Button */}
      <aside aria-label="Support contacts" className="fixed bottom-5 right-5 z-40">
        <a
          href={OFFICIAL_TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact Telegram Admin @QHInbox"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-sky-500/25 border border-sky-300/40 transition-transform active:scale-95 group"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>টেলিগ্রাম সাপোর্ট @{OFFICIAL_TELEGRAM}</span>
        </a>
      </aside>
    </div>
  );
}
