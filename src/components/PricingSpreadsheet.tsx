import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { REGULAR_PRICE, SALE_PRICE, DISCOUNT_PERCENT, HOLDER_NAME } from '../data/paymentData';
import { WA_FORMATTED } from '../utils/crypto';

interface PricingSpreadsheetProps {
  onOpenUnlock: () => void;
  onScrollToPay: () => void;
  onCellSelect: (cellName: string, formula: string) => void;
}

export const PricingSpreadsheet: React.FC<PricingSpreadsheetProps> = ({
  onOpenUnlock,
  onScrollToPay,
  onCellSelect,
}) => {
  const [animatedPrice, setAnimatedPrice] = useState(REGULAR_PRICE);
  const [selectedCell, setSelectedCell] = useState<'A1' | 'B1' | 'C1'>('C1');

  // Animated discount price roll down
  useEffect(() => {
    let start: number | null = null;
    const duration = 1200; // ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(REGULAR_PRICE - (REGULAR_PRICE - SALE_PRICE) * ease);
      setAnimatedPrice(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, []);

  const formatCOP = (num: number) => {
    return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCellClick = (cell: 'A1' | 'B1' | 'C1') => {
    setSelectedCell(cell);
    if (cell === 'A1') {
      onCellSelect('A1', '1');
    } else if (cell === 'B1') {
      onCellSelect('B1', '89900');
    } else {
      onCellSelect('C1', '=B1 * (1 - 0.89)');
    }
  };

  return (
    <div className="w-full">
      {/* Spreadsheet container card */}
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-xl overflow-hidden shadow-sm my-6 transition-all">
        {/* Formula bar header of the table */}
        <div className="flex items-center gap-2 border-b border-[var(--ln)] px-3 py-2 text-xs font-mono-code text-[var(--mut)] bg-[var(--bg)]/50">
          <span className="font-serif italic font-bold text-[var(--g)] text-sm">fx</span>
          <span className="text-[var(--ink)] font-medium">=89.900 × (1 − {DISCOUNT_PERCENT}%)</span>
          <span className="ml-auto text-[11px] text-[var(--g)] font-sans font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
            AHORRAS $79.900 COP
          </span>
        </div>

        {/* Excel Spreadsheet Grid with Columns and Rows */}
        <div className="grid grid-cols-[38px_1fr_1fr] text-sm">
          {/* Column letters */}
          <div className="bg-[var(--bg)] text-[var(--mut)] font-mono-code text-center py-1.5 border-r border-b border-[var(--ln)] text-xs font-semibold select-none">
            
          </div>
          <div className="bg-[var(--bg)] text-[var(--mut)] font-mono-code text-center py-1.5 border-r border-b border-[var(--ln)] text-xs font-semibold select-none">
            A (Precio regular)
          </div>
          <div className="bg-[var(--bg)] text-[var(--mut)] font-mono-code text-center py-1.5 border-b border-[var(--ln)] text-xs font-semibold select-none">
            B (Tu precio hoy)
          </div>

          {/* Row 1 Header */}
          <div 
            onClick={() => handleCellClick('A1')}
            className={`cursor-pointer bg-[var(--bg)] text-[var(--mut)] font-mono-code text-center py-3.5 border-r border-[var(--ln)] text-xs font-bold select-none ${
              selectedCell === 'A1' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-[var(--g)]' : ''
            }`}
          >
            1
          </div>

          {/* Cell B1: Regular Price (crossed out) */}
          <div
            onClick={() => handleCellClick('B1')}
            className={`cursor-pointer p-3 border-r border-[var(--ln)] flex flex-col justify-center transition-colors ${
              selectedCell === 'B1' ? 'ring-2 ring-inset ring-[var(--g)] bg-emerald-50/50 dark:bg-emerald-950/30' : ''
            }`}
          >
            <span className="text-xs text-[var(--mut)]">Precio oficial</span>
            <span className="line-through text-base sm:text-lg font-medium text-[var(--mut)]">
              {formatCOP(REGULAR_PRICE)}
            </span>
          </div>

          {/* Cell C1: Special Offer Price Result */}
          <div
            onClick={() => handleCellClick('C1')}
            className={`cursor-pointer p-3.5 bg-[var(--y)] text-[#12241a] flex flex-col justify-center items-center relative transition-all border-2 border-[var(--g)] shadow-xs ${
              selectedCell === 'C1' ? 'ring-2 ring-emerald-600 ring-offset-1' : ''
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950">
              Pago único vitalicio
            </span>
            <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-none my-0.5">
              {formatCOP(animatedPrice)}
            </span>
            <span className="text-[11px] font-semibold text-emerald-900">
              COP · Sin mensualidades
            </span>
          </div>
        </div>
      </div>

      {/* Discount highlights & Scarcity urgency */}
      <div className="flex flex-col items-center justify-center gap-2 text-center text-xs sm:text-sm my-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold bg-[var(--y)] text-[#12241a] px-2.5 py-1 rounded-md text-xs sm:text-sm shadow-2xs pulse-gold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-900" />
            {DISCOUNT_PERCENT}% DE DESCUENTO
          </span>
          <span className="text-[var(--mut)]">·</span>
          <span className="text-[var(--mut)] font-medium">
            Acceso de por vida a los 10 cursos
          </span>
          <span className="text-[var(--mut)]">·</span>
          <span className="text-[var(--mut)] font-medium">
            150+ Plantillas y Archivos .xlsx
          </span>
        </div>

        {/* Dynamic Scarcity Trigger */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-code font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800/60 mt-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span>⚡ ÚLTIMOS 7 CUPOS DISPONIBLES AL PRECIO PROMOCIONAL DE $10.000</span>
        </div>
      </div>

      {/* Primary Action Buttons with Shimmer & 3D Tactile Feedback */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={onOpenUnlock}
          className="flex-1 py-4 px-6 rounded-xl font-bold text-white bg-[var(--g)] hover:bg-[var(--gd)] active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 shadow-[0_5px_0_var(--gd)] active:shadow-none cursor-pointer text-base btn-shine btn-tactile"
        >
          <span>Acceder al contenido ahora</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={onScrollToPay}
          className="py-3.5 px-6 rounded-xl font-semibold text-[var(--ink)] bg-[var(--sf)] hover:bg-[var(--bg)] border-2 border-[var(--g)] transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-base shadow-xs btn-tactile"
        >
          <span>Ver cómo pagar ($10.000)</span>
        </button>
      </div>

      {/* Trust & Guarantee footnote */}
      <p className="text-center text-xs text-[var(--mut)] mt-3">
        Pago único de $10.000 COP · Programa oficial de Zenith Colombia · Atención por WhatsApp ({WA_FORMATTED})
      </p>
    </div>
  );
};
