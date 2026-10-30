import React, { useState, useEffect } from 'react';
import { ExcelRibbon } from './components/ExcelRibbon';
import { PricingSpreadsheet } from './components/PricingSpreadsheet';
import { StepGuide } from './components/StepGuide';
import { PaymentSection } from './components/PaymentSection';
import { CoursesGrid } from './components/CoursesGrid';
import { FormulaPlayground } from './components/FormulaPlayground';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { UnlockModal } from './components/UnlockModal';
import { StudentPortal } from './components/StudentPortal';
import { StickyDock } from './components/StickyDock';
import { CourseModal } from './components/CourseModal';
import { ValueStackSection } from './components/ValueStackSection';
import { RoiCalculator } from './components/RoiCalculator';
import { GuaranteeBadge } from './components/GuaranteeBadge';
import { BeforeAfterTransformation } from './components/BeforeAfterTransformation';
import { LiveSalesNotification } from './components/LiveSalesNotification';
import { CourseItem } from './data/coursesData';
import { getStoredUnlockState, buildWhatsAppUrl, WA_FORMATTED } from './utils/crypto';
import { HOLDER_NAME } from './data/paymentData';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeCell, setActiveCell] = useState<string>('C1');
  const [formulaContent, setFormulaContent] = useState<string>('=89.900 × (1 - 89%)');
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<CourseItem | null>(null);

  // Persistence of unlock state
  const [unlockedState, setUnlockedState] = useState<{ unlocked: boolean; driveUrl: string } | null>(() => {
    return getStoredUnlockState();
  });

  const [currentView, setCurrentView] = useState<'landing' | 'portal'>('landing');

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  // If already unlocked previously, prompt user or allow viewing portal
  useEffect(() => {
    if (unlockedState?.unlocked) {
      // Keep view preference
    }
  }, [unlockedState]);

  const handleCellSelect = (cellName: string, formula: string) => {
    setActiveCell(cellName);
    setFormulaContent(formula);
  };

  const handleScrollToPay = () => {
    const el = document.getElementById('pagar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnlockSuccess = (driveUrl: string) => {
    setUnlockedState({ unlocked: true, driveUrl });
    setCurrentView('portal');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Top Ribbon & Formula Bar */}
      <ExcelRibbon
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenUnlock={() => setIsUnlockModalOpen(true)}
        activeCell={activeCell}
        formulaContent={formulaContent}
        isUnlocked={!!unlockedState?.unlocked}
        onGoToPortal={() => setCurrentView(currentView === 'portal' ? 'landing' : 'portal')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 pt-6 pb-28">
        {/* Toggle between Sales View and Unlocked Student Portal */}
        {currentView === 'portal' && unlockedState?.unlocked ? (
          <div>
            <div className="flex items-center justify-between mb-4 bg-[var(--sf)] border border-[var(--ln)] rounded-xl p-3">
              <span className="text-xs text-[var(--mut)]">
                Viendo el <b>Área de Miembros</b> de tus cursos
              </span>
              <button
                onClick={() => setCurrentView('landing')}
                className="text-xs font-semibold text-[var(--g)] hover:underline cursor-pointer"
              >
                Volver a la portada informativa
              </button>
            </div>

            <StudentPortal
              driveUrl={unlockedState.driveUrl}
              onLockAgain={() => {
                setUnlockedState(null);
                setCurrentView('landing');
              }}
              onOpenCourseModal={(course) => setSelectedCourseForModal(course)}
            />
          </div>
        ) : (
          <div>
            {/* If unlocked, show a quick switcher notice */}
            {unlockedState?.unlocked && (
              <div className="mb-6 bg-[var(--y)] text-emerald-950 p-3.5 rounded-xl border border-emerald-600/30 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-900" />
                  <span>Tienes acceso activo desbloqueado a este programa.</span>
                </div>
                <button
                  onClick={() => setCurrentView('portal')}
                  className="px-3 py-1 bg-emerald-900 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  Abrir Mis Cursos
                </button>
              </div>
            )}

            {/* Hero Section */}
            <section className="pt-2 sm:pt-4">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] tracking-tight leading-[1.08]">
                10 cursos para dominar Excel, Power BI y SQL en un solo programa
              </h1>
              <p className="text-base sm:text-lg text-[var(--mut)] mt-3 leading-relaxed">
                Desde cero hasta experto, con macros, finanzas, análisis de datos y diseño. Aprendes a tu propio ritmo y lo aplicas de inmediato en tu trabajo o tu negocio.
              </p>

              {/* SpreadSheet Pricing Box with formula & interactive cells */}
              <PricingSpreadsheet
                onOpenUnlock={() => setIsUnlockModalOpen(true)}
                onScrollToPay={handleScrollToPay}
                onCellSelect={handleCellSelect}
              />
            </section>

            {/* 3 Steps Guide */}
            <StepGuide
              onOpenUnlock={() => setIsUnlockModalOpen(true)}
              onScrollToPay={handleScrollToPay}
            />

            {/* Full 10 Courses Grid */}
            <CoursesGrid
              onOpenUnlock={() => setIsUnlockModalOpen(true)}
            />

            {/* High Perceived Value Stack (Russell Brunson / Alex Hormozi style) */}
            <ValueStackSection
              onOpenUnlock={() => setIsUnlockModalOpen(true)}
              onScrollToPay={handleScrollToPay}
            />

            {/* Dopamine Section 1: Before vs After Transformation */}
            <BeforeAfterTransformation
              onOpenUnlock={() => setIsUnlockModalOpen(true)}
              onScrollToPay={handleScrollToPay}
            />

            {/* Interactive Formula Playground */}
            <FormulaPlayground
              onOpenUnlock={() => setIsUnlockModalOpen(true)}
            />

            {/* Interactive ROI & Time Saved Calculator */}
            <RoiCalculator
              onScrollToPay={handleScrollToPay}
            />

            {/* Target Audience & Social Proof */}
            <TestimonialsSection />

            {/* 100% Zero-Risk Satisfaction Guarantee by Zenith Colombia */}
            <GuaranteeBadge />

            {/* Payment Info Section with Nequi / Bre-B / Bancolombia */}
            <PaymentSection
              onOpenUnlock={() => setIsUnlockModalOpen(true)}
            />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Final Conversion Card matching the original HTML design with shine sweep */}
            <section className="py-8">
              <div className="bg-[var(--gd)] text-white rounded-2xl p-6 sm:p-9 text-center shadow-lg relative overflow-hidden">
                {/* Visual glow element */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-lg mx-auto">
                  <span className="inline-block px-3 py-1 bg-[var(--y)] text-emerald-950 text-xs font-bold font-mono-code uppercase rounded-full mb-3 shadow-2xs pulse-gold">
                    ⚡ Oferta Activa por Tiempo Limitado
                  </span>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                    Tu acceso está a un comprobante de distancia
                  </h2>
                  <p className="text-emerald-100 text-sm sm:text-base mt-2 mb-6">
                    10 cursos completos por solo $10.000 COP en vez de $89.900 (Valor real acumulado de $825.000 COP). Acceso de por vida, plantillas descargables y soporte oficial de Zenith Colombia por WhatsApp.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setIsUnlockModalOpen(true)}
                      className="py-4 px-6 rounded-xl font-bold text-emerald-950 bg-[var(--y)] hover:bg-amber-300 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_0_#b89a1c] active:shadow-none cursor-pointer text-sm sm:text-base btn-shine btn-tactile"
                    >
                      <span>Acceder al contenido ($10.000)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={buildWhatsAppUrl("Hola, ya realicé el pago del Megapack de Excel de Zenith Colombia. Adjunto mi comprobante para recibir la contraseña.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-6 rounded-xl font-semibold text-white bg-transparent hover:bg-white/10 border-2 border-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base btn-tactile"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ya pagué: enviar comprobante</span>
                    </a>
                  </div>

                  <p className="text-xs text-emerald-200 mt-4">
                    Atención oficial por WhatsApp de Zenith Colombia (+{WA_FORMATTED}) · Cero riesgo
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Floating Bottom Dock for Mobile & Quick Actions */}
      <StickyDock
        onOpenUnlock={() => setIsUnlockModalOpen(true)}
        onScrollToPay={handleScrollToPay}
        isUnlocked={!!unlockedState?.unlocked}
        onGoToPortal={() => setCurrentView(currentView === 'portal' ? 'landing' : 'portal')}
      />

      {/* Live Social Proof / Recent Buyer Notification */}
      <LiveSalesNotification />

      {/* Password Unlock Modal with real cryptographic decryption */}
      <UnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onSuccess={handleUnlockSuccess}
      />

      {/* Course Detail Modal for syllabus inspection */}
      <CourseModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onOpenUnlock={() => setIsUnlockModalOpen(true)}
      />
    </div>
  );
}
