import React, { useState } from 'react';
import { XCircle, CheckCircle2, Zap, ArrowRight, Sparkles } from 'lucide-react';

export const BeforeAfterTransformation: React.FC<{ onScrollToPay: () => void; onOpenUnlock: () => void }> = ({
  onScrollToPay,
  onOpenUnlock,
}) => {
  return (
    <section className="py-8">
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[var(--g)] bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          El Salto de Nivel Cuántico
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--ink)] tracking-tight mt-2">
          La diferencia entre sobrevivir en la oficina o dominarla por completo
        </h2>
        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1.5 leading-relaxed">
          Esto es lo que pasa en tu día a día cuando pasas del ensayo y error al dominio guiado por Zenith Colombia:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sin el Megapack (Pain / Frustration) */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </span>
              <span className="font-display font-bold text-sm sm:text-base text-rose-900 dark:text-rose-200 uppercase tracking-wider">
                Sin el Megapack (El Método Tradicional)
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-rose-950 dark:text-rose-100">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><b>4 horas perdidas los viernes</b> cuadrando datos desordenados fila por fila a mano.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><b>Pánico y vergüenza</b> cuando una fórmula se rompe con <code>#¡REF!</code> o <code>#¡VALOR!</code> frente a tu jefe.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><b>Quedarte hasta tarde</b> en la oficina mientras tus compañeros ya salieron a descansar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><b>Miedo a postularte</b> a cargos directivos por no saber Power BI ni Macros con código VBA.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><b>Salario estancado</b> viendo cómo otros consiguen mejores sueldos simplemente por saber automatizar.</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-rose-200 dark:border-rose-900/40 text-center text-xs text-rose-600 dark:text-rose-400 font-medium">
            Estrés constante, cansancio visual y sensación de estar atrapado.
          </div>
        </div>

        {/* Con el Megapack Zenith Colombia (Pleasure / Dopamine / Power) */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-[var(--g)] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
          {/* Subtle gold badge in corner */}
          <div className="absolute top-0 right-0 bg-[var(--y)] text-emerald-950 text-[10px] font-bold font-mono-code px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
            Transformación Total
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[var(--g)] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[var(--g)]" />
              </span>
              <span className="font-display font-bold text-sm sm:text-base text-emerald-950 dark:text-emerald-100 uppercase tracking-wider">
                Con Zenith Colombia (Tu Nuevo Nivel)
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100">
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[var(--g)] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
                <span><b>Presionas 1 botón</b> y en 3 segundos tus reportes se limpian, calculan y generan solos con Macros.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[var(--g)] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
                <span><b>Dashboards interactivos en Power BI</b> que dejan a directores y clientes con la boca abierta.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[var(--g)] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
                <span><b>Sales a tu hora exacta todos los días</b> sabiendo que tu trabajo fue el más impecable del equipo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[var(--g)] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
                <span><b>La tranquilidad de dominar SQL</b> para consultar millones de filas sin depender de los de sistemas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[var(--g)] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
                <span><b>Poder de negociación salarial:</b> Eres la persona indispensable a la que todos van a pedir ayuda.</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-emerald-200 dark:border-emerald-800/40 text-center text-xs text-[var(--g)] font-bold">
            Respeto profesional, tiempo libre para tu vida y satisfacción pura.
          </div>
        </div>
      </div>

      {/* Immediate Dopaminergic CTA */}
      <div className="mt-5 text-center">
        <button
          onClick={onScrollToPay}
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl font-bold text-white bg-[var(--g)] hover:bg-[var(--gd)] active:translate-y-0.5 transition-all shadow-[0_4px_0_var(--gd)] cursor-pointer text-sm sm:text-base btn-shine btn-tactile"
        >
          <Sparkles className="w-4 h-4 text-[var(--y)]" />
          <span>Elegir la Transformación por Solo $10.000 COP</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
