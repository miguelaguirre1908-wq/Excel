import React, { useState } from 'react';
import { Play, Sparkles, HelpCircle, Check, ArrowRight } from 'lucide-react';

interface FormulaPreset {
  id: string;
  name: string;
  formula: string;
  result: string;
  explanation: string;
  highlightRows: number[];
  highlightCol: string;
}

const PRESETS: FormulaPreset[] = [
  {
    id: 'buscarv',
    name: 'BUSCARV (Búsqueda básica)',
    formula: '=BUSCARV("Monitor 4K", A2:D5, 3, FALSO)',
    result: '$1.200.000',
    explanation: 'Busca el texto exacto "Monitor 4K" en la columna A y devuelve el precio unitario de la columna 3.',
    highlightRows: [3],
    highlightCol: 'C',
  },
  {
    id: 'sumar_si',
    name: 'SUMAR.SI (Suma con condición)',
    formula: '=SUMAR.SI(E2:E5, "Carlos", D2:D5)',
    result: '$10.600.000',
    explanation: 'Suma el total de ventas únicamente para las transacciones donde el vendedor es "Carlos".',
    highlightRows: [1, 4],
    highlightCol: 'D',
  },
  {
    id: 'si_logico',
    name: 'Función SI (Condicional de meta)',
    formula: '=SI(D2>=10000000, "Bono Aprobado", "Sin Bono")',
    result: '"Bono Aprobado"',
    explanation: 'Evalúa si el total de la fila 2 supera los 10 millones para asignar la bonificación comercial.',
    highlightRows: [1],
    highlightCol: 'D',
  },
  {
    id: 'indice_coincidir',
    name: 'INDICE + COINCIDIR (Nivel Experto)',
    formula: '=INDICE(A2:A5, COINCIDIR(MAX(D2:D5), D2:D5, 0))',
    result: '"Laptop Pro"',
    explanation: 'Encuentra el producto con la venta más alta de toda la empresa sin las limitaciones de BUSCARV.',
    highlightRows: [1],
    highlightCol: 'A',
  },
];

const SAMPLE_DATA = [
  { row: 2, a: 'Laptop Pro', b: '3', c: '$3.500.000', d: '$10.500.000', e: 'Carlos', f: 'Entregado' },
  { row: 3, a: 'Teclado Mecánico', b: '15', c: '$180.000', d: '$2.700.000', e: 'Andrea', f: 'Entregado' },
  { row: 4, a: 'Monitor 4K', b: '4', c: '$1.200.000', d: '$4.800.000', e: 'Laura', f: 'Pendiente' },
  { row: 5, a: 'Mouse Ergonómico', b: '1', c: '$100.000', d: '$100.000', e: 'Carlos', f: 'Entregado' },
];

export const FormulaPlayground: React.FC<{ onOpenUnlock: () => void }> = ({ onOpenUnlock }) => {
  const [selectedPreset, setSelectedPreset] = useState<FormulaPreset>(PRESETS[0]);
  const [customFormula, setCustomFormula] = useState(PRESETS[0].formula);
  const [isCalculated, setIsCalculated] = useState(true);

  const selectPreset = (preset: FormulaPreset) => {
    setSelectedPreset(preset);
    setCustomFormula(preset.formula);
    setIsCalculated(true);
  };

  return (
    <section className="py-8">
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[var(--ln)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[var(--g)] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Simulador interactivo
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--ink)] tracking-tight mt-1">
              Prueba el poder de las fórmulas en vivo
            </h2>
            <p className="text-sm text-[var(--mut)] mt-0.5">
              Haz clic en cualquier fórmula para ver cómo evalúa y resuelve problemas en una tabla de ventas real.
            </p>
          </div>
        </div>

        {/* Presets buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => selectPreset(preset)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedPreset.id === preset.id
                  ? 'bg-[var(--g)] text-white border-[var(--g)] shadow-2xs'
                  : 'bg-[var(--bg)] text-[var(--mut)] hover:text-[var(--ink)] border-[var(--ln)]'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Live Formula Bar Simulator */}
        <div className="bg-[var(--bg)] border border-[var(--ln)] rounded-xl p-3 mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <span className="font-serif italic font-bold text-[var(--g)] text-sm">fx</span>
            <input
              type="text"
              value={customFormula}
              onChange={(e) => {
                setCustomFormula(e.target.value);
                setIsCalculated(false);
              }}
              className="w-full bg-[var(--sf)] border border-[var(--ln)] rounded-lg px-3 py-1.5 font-mono-code text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--g)]"
              aria-label="Fórmula a evaluar"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 bg-[var(--y)] text-emerald-950 px-3 py-1.5 rounded-lg font-mono-code font-bold text-xs sm:text-sm border border-emerald-700/20">
              <span className="text-[10px] text-emerald-800 uppercase font-sans font-semibold">Resultado:</span>
              <span>{selectedPreset.result}</span>
            </div>
          </div>
        </div>

        {/* Sample Interactive Table */}
        <div className="overflow-x-auto border border-[var(--ln)] rounded-xl bg-[var(--sf)]">
          <table className="w-full text-xs font-sans text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-[var(--bg)] border-b border-[var(--ln)] text-[var(--mut)] font-mono-code font-semibold">
                <th className="p-2 border-r border-[var(--ln)] text-center w-9 select-none">#</th>
                <th className="p-2 border-r border-[var(--ln)]">A (Producto)</th>
                <th className="p-2 border-r border-[var(--ln)]">B (Cantidad)</th>
                <th className="p-2 border-r border-[var(--ln)]">C (Precio Unit.)</th>
                <th className="p-2 border-r border-[var(--ln)]">D (Total Ventas)</th>
                <th className="p-2 border-r border-[var(--ln)]">E (Vendedor)</th>
                <th className="p-2">F (Estado)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ln)]">
              {SAMPLE_DATA.map((row, idx) => {
                const isRowHighlighted = selectedPreset.highlightRows.includes(idx + 1);
                return (
                  <tr
                    key={row.row}
                    className={`transition-colors ${
                      isRowHighlighted
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30'
                        : 'hover:bg-[var(--bg)]/50'
                    }`}
                  >
                    <td className="p-2 border-r border-[var(--ln)] text-center font-mono-code text-[var(--mut)] bg-[var(--bg)]/60 select-none">
                      {row.row}
                    </td>
                    <td className={`p-2 border-r border-[var(--ln)] font-medium ${selectedPreset.highlightCol === 'A' && isRowHighlighted ? 'font-bold text-[var(--g)] bg-emerald-100/50 dark:bg-emerald-900/40' : ''}`}>
                      {row.a}
                    </td>
                    <td className={`p-2 border-r border-[var(--ln)] text-center ${selectedPreset.highlightCol === 'B' && isRowHighlighted ? 'font-bold text-[var(--g)]' : ''}`}>
                      {row.b}
                    </td>
                    <td className={`p-2 border-r border-[var(--ln)] font-mono-code ${selectedPreset.highlightCol === 'C' && isRowHighlighted ? 'font-bold text-[var(--g)] bg-emerald-100/50 dark:bg-emerald-900/40' : ''}`}>
                      {row.c}
                    </td>
                    <td className={`p-2 border-r border-[var(--ln)] font-mono-code font-medium ${selectedPreset.highlightCol === 'D' && isRowHighlighted ? 'font-bold text-[var(--g)] bg-emerald-100/50 dark:bg-emerald-900/40' : ''}`}>
                      {row.d}
                    </td>
                    <td className={`p-2 border-r border-[var(--ln)] ${selectedPreset.highlightCol === 'E' && isRowHighlighted ? 'font-bold text-[var(--g)]' : ''}`}>
                      {row.e}
                    </td>
                    <td className="p-2 text-[var(--mut)]">
                      {row.f}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Formula Explanation Callout */}
        <div className="mt-3.5 p-3 rounded-xl bg-[var(--bg)] border border-[var(--ln)] text-xs text-[var(--mut)] flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-[var(--g)] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[var(--ink)]">Explicación práctica: </span>
            <span>{selectedPreset.explanation}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
