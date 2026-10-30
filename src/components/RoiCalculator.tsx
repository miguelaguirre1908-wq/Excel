import React, { useState } from 'react';
import { Calculator, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export const RoiCalculator: React.FC<{ onScrollToPay: () => void }> = ({ onScrollToPay }) => {
  const [weeklyHours, setWeeklyHours] = useState<number>(8);
  const [monthlySalary, setMonthlySalary] = useState<number>(2500000);

  // Math: With macros and formulas, students save on average 35% of repetitive time
  const timeSavedWeekly = Math.round(weeklyHours * 0.35 * 10) / 10;
  const hoursSavedYearly = Math.round(timeSavedWeekly * 48); // 48 work weeks
  const hourlyRate = Math.round(monthlySalary / 160); // approx 160 hours/month
  const yearlyMoneyValue = Math.round(hoursSavedYearly * hourlyRate);

  const formatCOP = (num: number) => {
    return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <section className="py-8">
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[var(--ln)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[var(--g)] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Calculadora de Retorno de Inversión (ROI)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--ink)] tracking-tight mt-1">
              ¿Cuánto tiempo y dinero te ahorrará este Megapack?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mut)] mt-0.5">
              Ajusta tus datos para calcular las horas de vida que recuperarás y la rentabilidad de aprender Excel avanzado.
            </p>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Slider 1: Weekly Excel Hours */}
          <div className="bg-[var(--bg)] p-4 rounded-xl border border-[var(--ln)]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[var(--ink)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--g)]" />
                <span>Horas que pasas en Excel a la semana:</span>
              </label>
              <span className="font-mono-code font-bold text-sm text-[var(--g)] bg-[var(--sf)] px-2 py-0.5 rounded border border-[var(--ln)]">
                {weeklyHours} horas/sem
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-[var(--g)] cursor-pointer h-2 bg-[var(--ln)] rounded-lg"
              aria-label="Horas semanales en Excel"
            />
            <div className="flex justify-between text-[10px] text-[var(--mut)] font-mono-code mt-1">
              <span>2 hrs (Básico)</span>
              <span>12 hrs (Medio)</span>
              <span>25 hrs (Intensivo)</span>
            </div>
          </div>

          {/* Slider 2: Monthly Salary */}
          <div className="bg-[var(--bg)] p-4 rounded-xl border border-[var(--ln)]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[var(--ink)] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--g)]" />
                <span>Tu salario o ingreso mensual estimado:</span>
              </label>
              <span className="font-mono-code font-bold text-sm text-[var(--g)] bg-[var(--sf)] px-2 py-0.5 rounded border border-[var(--ln)]">
                {formatCOP(monthlySalary)}
              </span>
            </div>
            <input
              type="range"
              min="1400000"
              max="7000000"
              step="100000"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              className="w-full accent-[var(--g)] cursor-pointer h-2 bg-[var(--ln)] rounded-lg"
              aria-label="Salario mensual estimado"
            />
            <div className="flex justify-between text-[10px] text-[var(--mut)] font-mono-code mt-1">
              <span>$1.4M (Mínimo)</span>
              <span>$3.5M (Profesional)</span>
              <span>$7.0M+ (Especialista)</span>
            </div>
          </div>
        </div>

        {/* Calculated Results Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-xl text-center">
            <span className="text-[11px] font-semibold text-[var(--mut)] uppercase tracking-wider block">
              Tiempo libre recuperado
            </span>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--g)] mt-1">
              {hoursSavedYearly} Horas
            </div>
            <p className="text-[11px] text-[var(--mut)] mt-1">
              Equivale a <b className="text-[var(--ink)]">~{Math.round(hoursSavedYearly / 8)} días laborables completos</b> al año ahorrados en tareas manuales.
            </p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-xl text-center">
            <span className="text-[11px] font-semibold text-[var(--mut)] uppercase tracking-wider block">
              Valor de tu productividad
            </span>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--g)] mt-1">
              {formatCOP(yearlyMoneyValue)}
            </div>
            <p className="text-[11px] text-[var(--mut)] mt-1">
              Valor en dinero del tiempo que dejarás de desperdiciar en tareas repetitivas.
            </p>
          </div>

          <div className="bg-[var(--y)] text-emerald-950 border border-amber-300 p-4 rounded-xl text-center flex flex-col justify-center shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider block">
              Retorno vs. $10.000 COP
            </span>
            <div className="font-display font-extrabold text-2xl sm:text-3xl mt-1 leading-none">
              Recuperado en 1 día
            </div>
            <p className="text-[11px] font-medium text-emerald-900 mt-1.5">
              El costo de $10.000 se amortiza en tu primera hora de trabajo con atajos y fórmulas.
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[var(--ln)]">
          <span className="text-xs text-[var(--mut)] text-center sm:text-left">
            Inviertes una sola vez $10.000 y el conocimiento te acompaña para siempre en tu carrera.
          </span>
          <button
            onClick={onScrollToPay}
            className="py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[var(--g)] hover:bg-[var(--gd)] transition-all flex items-center gap-1.5 shadow-[0_3px_0_var(--gd)] cursor-pointer btn-shine btn-tactile whitespace-nowrap"
          >
            <span>Ahorrar tiempo desde hoy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
