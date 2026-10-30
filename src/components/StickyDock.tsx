import React from 'react';
import { KeyRound, CreditCard, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/crypto';

interface StickyDockProps {
  onOpenUnlock: () => void;
  onScrollToPay: () => void;
  isUnlocked: boolean;
  onGoToPortal: () => void;
}

export const StickyDock: React.FC<StickyDockProps> = ({
  onOpenUnlock,
  onScrollToPay,
  isUnlocked,
  onGoToPortal,
}) => {
  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 bg-[var(--sf)]/95 backdrop-blur-md border-t border-[var(--ln)] py-2.5 px-4 pb-[calc(10px+env(safe-area-inset-bottom,0px))] shadow-lg">
      <div className="max-w-xl mx-auto flex items-center gap-2.5">
        {/* Main action: Access or Open Portal */}
        {isUnlocked ? (
          <button
            onClick={onGoToPortal}
            className="flex-[1.4] py-3.5 px-4 rounded-xl font-bold text-sm text-emerald-950 bg-[var(--y)] hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer btn-tactile"
          >
            <KeyRound className="w-4 h-4" />
            <span>Mis Cursos Desbloqueados</span>
          </button>
        ) : (
          <button
            onClick={onOpenUnlock}
            className="flex-[1.4] py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[var(--g)] hover:bg-[var(--gd)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-[0_3px_0_var(--gd)] active:shadow-none cursor-pointer btn-shine btn-tactile"
          >
            <KeyRound className="w-4 h-4" />
            <span>Acceder ahora ($10k)</span>
          </button>
        )}

        {/* Secondary action: Payment info */}
        <button
          onClick={onScrollToPay}
          className="flex-1 py-3.5 px-3 rounded-xl font-semibold text-xs sm:text-sm text-[var(--ink)] bg-[var(--sf)] hover:bg-[var(--bg)] border-2 border-[var(--g)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs btn-tactile"
        >
          <CreditCard className="w-4 h-4 text-[var(--g)]" />
          <span>Cómo pagar</span>
        </button>

        {/* Floating WhatsApp Quick Action with notification ping */}
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-90 relative btn-tactile"
          aria-label="Contactar a Miguel por WhatsApp"
          title="Hablar con Miguel por WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-[var(--sf)] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping" />
          </span>
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};
