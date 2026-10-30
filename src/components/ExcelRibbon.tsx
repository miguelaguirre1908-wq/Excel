import React from 'react';
import { 
  FileSpreadsheet, 
  HelpCircle, 
  KeyRound, 
  Moon, 
  Sun, 
  CreditCard,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { WA_FORMATTED, buildWhatsAppUrl } from '../utils/crypto';

interface ExcelRibbonProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenUnlock: () => void;
  activeCell: string;
  formulaContent: string;
  isUnlocked: boolean;
  onGoToPortal?: () => void;
}

export const ExcelRibbon: React.FC<ExcelRibbonProps> = ({
  darkMode,
  setDarkMode,
  onOpenUnlock,
  activeCell,
  formulaContent,
  isUnlocked,
  onGoToPortal,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--ln)] bg-[var(--sf)]/95 backdrop-blur-md transition-colors shadow-xs">
      {/* Top green announcement banner from the original design */}
      <div className="bg-[var(--gd)] text-white text-xs sm:text-sm py-2 px-3 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--y)] animate-pulse" />
        <span>Tu acceso se activa apenas confirmamos tu pago y recibes tu contraseña por WhatsApp</span>
      </div>

      {/* Excel Title Bar */}
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & File name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--g)] flex items-center justify-center text-white shadow-xs font-display font-bold text-lg">
            X
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[var(--ink)]">
                Megapack Excel 10 en 1
              </span>
              <span className="text-[11px] font-mono-code text-[var(--mut)] bg-[var(--bg)] px-2 py-0.5 rounded border border-[var(--ln)]">
                v2026.xlsx
              </span>
            </div>
            <p className="text-xs text-[var(--mut)] hidden sm:block">
              Por Zenith Colombia · Soporte oficial WhatsApp {WA_FORMATTED}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--bg)] border border-[var(--ln)] transition-colors cursor-pointer"
            title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* WhatsApp Support Direct */}
          <a
            href={buildWhatsAppUrl("Hola Miguel, tengo una consulta sobre el Megapack de Excel 10 en 1.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--ln)]/40 rounded-lg border border-[var(--ln)] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chat WhatsApp</span>
          </a>

          {/* Unlock / Access Button */}
          {isUnlocked ? (
            <button
              onClick={onGoToPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-emerald-900 bg-[var(--y)] hover:bg-amber-300 rounded-lg transition-transform active:scale-95 shadow-xs cursor-pointer btn-tactile"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mis Cursos (Desbloqueado)</span>
            </button>
          ) : (
            <button
              onClick={onOpenUnlock}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-[var(--g)] hover:bg-[var(--gd)] rounded-lg transition-transform active:scale-95 shadow-xs cursor-pointer btn-shine btn-tactile"
            >
              <KeyRound className="w-4 h-4" />
              <span>Acceder ($10k)</span>
            </button>
          )}
        </div>
      </div>

      {/* Spreadsheet Formula Bar ribbon */}
      <div className="border-t border-[var(--ln)] bg-[var(--bg)]/80 py-1.5 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs sm:text-sm">
          {/* Cell Address Box */}
          <div className="bg-[var(--sf)] border border-[var(--ln)] rounded px-2.5 py-1 font-mono-code font-semibold text-[var(--ink)] min-w-[54px] text-center shadow-xs">
            {activeCell}
          </div>

          {/* fx symbol */}
          <div className="font-serif italic font-bold text-[var(--g)] px-1 text-sm select-none">
            fx
          </div>

          {/* Formula input display */}
          <div className="flex-1 bg-[var(--sf)] border border-[var(--ln)] rounded px-3 py-1 font-mono-code text-[var(--mut)] truncate flex items-center justify-between shadow-xs">
            <span className="text-[var(--ink)] font-medium truncate">{formulaContent}</span>
            <span className="text-[10px] text-[var(--mut)] uppercase tracking-wider ml-2 shrink-0 hidden sm:inline">
              Fórmula evaluada
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
