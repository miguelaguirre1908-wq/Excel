import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ValueItem {
  name: string;
  category: string;
  realValue: string;
  isBonus?: boolean;
}

const VALUE_ITEMS: ValueItem[] = [
  { name: "1. Excel Básico Desde Cero (Empieza sin saber nada)", category: "Nivel 1", realValue: "$35.000 COP" },
  { name: "2. Excel Intermedio (Fórmulas, tablas y ordenar datos)", category: "Nivel 2", realValue: "$45.000 COP" },
  { name: "3. Excel Avanzado (Funciones y herramientas de análisis)", category: "Nivel 3", realValue: "$55.000 COP" },
  { name: "4. Excel Experto (Nivel profesional y auditoría)", category: "Nivel 4", realValue: "$65.000 COP" },
  { name: "5. Macros y VBA (Automatiza tareas repetitivas)", category: "Automatización", realValue: "$75.000 COP" },
  { name: "6. Excel Financiero y para Profesionales (Modelos y reportes)", category: "Finanzas", realValue: "$65.000 COP" },
  { name: "7. Inteligencia Empresarial y Power BI (Dashboards e informes)", category: "Business Intelligence", realValue: "$85.000 COP" },
  { name: "8. Análisis de Datos y SQL (Consulta y analiza bases de datos)", category: "Bonus Incluido", realValue: "$65.000 COP", isBonus: true },
  { name: "9. Curso de Canva y Plantillas (Diseño para presentaciones y redes)", category: "Bonus Incluido", realValue: "$45.000 COP", isBonus: true },
  { name: "10. Curso de PowerPoint (Presentaciones que se entienden)", category: "Bonus Incluido", realValue: "$45.000 COP", isBonus: true },
  { name: "Soporte Oficial por WhatsApp de Zenith Colombia", category: "Atención Incluida", realValue: "Invaluable" },
];

export const ValueStackSection: React.FC<{ onOpenUnlock: () => void; onScrollToPay: () => void }> = ({
  onOpenUnlock,
  onScrollToPay,
}) => {
  return (
    <section className="py-8">
      <div className="bg-[var(--sf)] border-2 border-[var(--g)]/80 rounded-2xl p-5 sm:p-8 shadow-md relative overflow-hidden">
        {/* Top ribbon banner */}
        <div className="absolute top-0 right-0 bg-[var(--y)] text-emerald-950 font-display font-extrabold text-[11px] sm:text-xs py-1 px-4 rounded-bl-xl shadow-xs flex items-center gap-1.5 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Oferta de Mayor Valor del Mercado</span>
        </div>

        {/* Section title */}
        <div className="text-center max-w-xl mx-auto mb-6 pt-2">
          <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[var(--g)] bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Resumen de Valor Acumulado (Value Stack)
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--ink)] tracking-tight mt-2">
            Todo lo que te llevas hoy al unirte
          </h2>
          <p className="text-xs sm:text-sm text-[var(--mut)] mt-1.5">
            Si compraras cada uno de los 10 cursos por separado pagarías más de <b className="text-[var(--ink)]">$570.000 COP</b>. Hoy desbloqueas el programa completo en un único pago simbólico:
          </p>
        </div>

        {/* Value stack list */}
        <div className="space-y-2 border border-[var(--ln)] rounded-xl p-3 sm:p-4 bg-[var(--bg)]/50 divide-y divide-[var(--ln)]">
          {VALUE_ITEMS.map((item, idx) => (
            <div 
              key={idx} 
              className={`pt-2.5 pb-2.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm transition-colors ${
                item.isBonus ? 'bg-amber-50/40 dark:bg-amber-950/20 px-2 rounded-lg' : ''
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--g)] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <div>
                  <span className="font-semibold text-[var(--ink)]">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[var(--mut)] block sm:inline sm:ml-2">
                    ({item.category})
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0 pl-7 sm:pl-0 font-mono-code text-xs">
                <span className="text-[var(--mut)] line-through mr-1">Valor:</span>
                <span className="font-bold text-[var(--ink)]">{item.realValue}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mathematical summary box */}
        <div className="mt-5 p-4 rounded-xl bg-[var(--bg)] border border-[var(--ln)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs text-[var(--mut)]">
              Valor comercial total de los 10 cursos:
            </div>
            <div className="text-lg sm:text-xl font-mono-code font-bold text-[var(--mut)] line-through">
              $570.000 COP
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-xs font-bold uppercase text-[var(--g)] tracking-wider">
              Tu inversión especial hoy:
            </span>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)] leading-none my-1 flex items-center justify-center sm:justify-end gap-2">
              <span className="text-emerald-700 dark:text-emerald-400">$10.000</span>
              <span className="text-xs font-sans font-semibold text-[var(--mut)]">COP</span>
            </div>
            <div className="text-[11px] text-[var(--mut)]">
              Ahorras más del <b className="text-[var(--g)]">98% del valor real</b>
            </div>
          </div>
        </div>

        {/* Call to action with shine animation */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center">
          <button
            onClick={onOpenUnlock}
            className="w-full sm:flex-1 py-4 px-6 rounded-xl font-bold text-white bg-[var(--g)] hover:bg-[var(--gd)] active:translate-y-0.5 text-center flex items-center justify-center gap-2 shadow-[0_5px_0_var(--gd)] active:shadow-none cursor-pointer text-base btn-shine btn-tactile"
          >
            <span>Quiero Todo el Megapack por $10.000</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onScrollToPay}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-semibold text-[var(--ink)] bg-[var(--sf)] hover:bg-[var(--bg)] border-2 border-[var(--g)] text-center flex items-center justify-center gap-2 cursor-pointer text-sm btn-tactile"
          >
            <span>Transferir ahora</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[var(--mut)]">
          <ShieldCheck className="w-4 h-4 text-[var(--g)]" />
          <span>Acceso inmediato · Pago 100% seguro · Sin cobros sorpresa futuros</span>
        </div>
      </div>
    </section>
  );
};
