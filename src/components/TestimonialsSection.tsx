import React from 'react';
import { Star, Briefcase, TrendingUp, Building2, Award } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  city: string;
  text: string;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Julián Restrepo",
    role: "Analista de Operaciones",
    city: "Medellín",
    text: "En mi trabajo tardaba casi 3 horas los lunes consolidando 6 hojas de Excel a mano. Con el módulo de Macros y las fórmulas avanzadas automaticé todo con un botón. Valió 100 veces los $10.000.",
    highlight: "Ahorro de 3 horas semanales"
  },
  {
    name: "Carolina Méndez",
    role: "Contadora Pública",
    city: "Bogotá",
    text: "El módulo de Excel Financiero y las tablas de amortización están explicadas con peras y manzanas. Además los dashboards en Power BI me sirvieron para presentar informes a la junta directiva.",
    highlight: "Ascendida a líder de área"
  },
  {
    name: "Andrés Felipe Gómez",
    role: "Emprendedor de Comercio Electrónico",
    city: "Cali",
    text: "No sabía nada de bases de datos. El bonus de SQL y las plantillas de inventario me ayudaron a tener el control total de mi mercancía sin pagar software carísimo al mes.",
    highlight: "Control total de inventario"
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-6">
      {/* "Pensado para ti si..." callout */}
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-2xl p-5 sm:p-7 shadow-xs mb-8">
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--ink)] tracking-tight">
          Pensado especialmente para ti si…
        </h2>
        <p className="text-sm text-[var(--mut)] mt-1.5 leading-relaxed">
          Quieres subir de nivel en tu trabajo, conseguir empleo con mejores herramientas, ordenar las cuentas de tu negocio o aprender análisis de datos sin pagar cursos sueltos que cuestan cientos de dólares.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 bg-[var(--bg)] rounded-xl border border-[var(--ln)] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[var(--g)] shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-[var(--ink)]">Aumentar ingresos</div>
              <div className="text-[11px] text-[var(--mut)] mt-0.5">Postúlate a cargos con mejores sueldos exigiendo Excel.</div>
            </div>
          </div>

          <div className="p-3.5 bg-[var(--bg)] rounded-xl border border-[var(--ln)] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[var(--g)] shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-[var(--ink)]">Ahorrar horas de trabajo</div>
              <div className="text-[11px] text-[var(--mut)] mt-0.5">Automatiza reportes aburridos y sal temprano a casa.</div>
            </div>
          </div>

          <div className="p-3.5 bg-[var(--bg)] rounded-xl border border-[var(--ln)] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[var(--g)] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-[var(--ink)]">Tu propio negocio</div>
              <div className="text-[11px] text-[var(--mut)] mt-0.5">Controla inventarios, ventas, costos y flujo de caja claro.</div>
            </div>
          </div>

          <div className="p-3.5 bg-[var(--bg)] rounded-xl border border-[var(--ln)] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[var(--g)] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-[var(--ink)]">Sin conocimientos previos</div>
              <div className="text-[11px] text-[var(--mut)] mt-0.5">Avanzas desde lo más básico paso a paso y a tu propio ritmo.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Reviews */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--ink)]">
              Lo que opinan quienes ya estudian el Megapack
            </h3>
            <p className="text-xs text-[var(--mut)]">
              Más de 1.400 estudiantes aprendiendo en Colombia y Latinoamérica.
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[var(--sf)] border border-[var(--ln)] px-2.5 py-1 rounded-lg">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-[var(--ink)] font-mono-code ml-1">4.9/5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[var(--sf)] border border-[var(--ln)] rounded-xl p-4 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[var(--mut)] leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--ln)] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[var(--ink)]">{t.name}</div>
                  <div className="text-[11px] text-[var(--mut)]">{t.role} · {t.city}</div>
                </div>
                <span className="text-[10px] font-semibold text-[var(--g)] bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {t.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
