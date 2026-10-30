import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  FileSpreadsheet, 
  Database, 
  Palette,
  ArrowRight
} from 'lucide-react';
import { COURSES_LIST, CourseItem, TOTAL_HOURS, TOTAL_FILES } from '../data/coursesData';
import { CourseModal } from './CourseModal';
import { REGULAR_PRICE, SALE_PRICE, DISCOUNT_PERCENT } from '../data/paymentData';

interface CoursesGridProps {
  onOpenUnlock: () => void;
}

export const CoursesGrid: React.FC<CoursesGridProps> = ({ onOpenUnlock }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'excel' | 'analytics' | 'design'>('all');

  const filteredCourses = activeFilter === 'all'
    ? COURSES_LIST
    : COURSES_LIST.filter(c => c.category === activeFilter);

  const formatCOP = (num: number) => {
    return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--ink)] tracking-tight">
            Todo lo que incluye el Megapack
          </h2>
          <p className="text-sm text-[var(--mut)] mt-1">
            Excel de cero a experto, Power BI, SQL, finanzas, automatización con Macros y diseño ejecutivo.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-[var(--bg)] p-1 rounded-xl border border-[var(--ln)] shrink-0 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[var(--sf)] text-[var(--ink)] shadow-2xs'
                : 'text-[var(--mut)] hover:text-[var(--ink)]'
            }`}
          >
            Todos (10)
          </button>
          <button
            onClick={() => setActiveFilter('excel')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'excel'
                ? 'bg-[var(--sf)] text-[var(--ink)] shadow-2xs'
                : 'text-[var(--mut)] hover:text-[var(--ink)]'
            }`}
          >
            Excel (6)
          </button>
          <button
            onClick={() => setActiveFilter('analytics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'analytics'
                ? 'bg-[var(--sf)] text-[var(--ink)] shadow-2xs'
                : 'text-[var(--mut)] hover:text-[var(--ink)]'
            }`}
          >
            Power BI & SQL (2)
          </button>
          <button
            onClick={() => setActiveFilter('design')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'design'
                ? 'bg-[var(--sf)] text-[var(--ink)] shadow-2xs'
                : 'text-[var(--mut)] hover:text-[var(--ink)]'
            }`}
          >
            Diseño Bonus (2)
          </button>
        </div>
      </div>

      {/* Spreadsheet numbered rows card */}
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-xl overflow-hidden shadow-xs divide-y divide-[var(--ln)]">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="grid grid-cols-[40px_1fr_auto] items-center hover:bg-[var(--bg)]/80 transition-colors cursor-pointer group"
          >
            {/* Number cell (Spreadsheet row index) */}
            <div className="bg-[var(--bg)] text-[var(--mut)] group-hover:text-[var(--g)] group-hover:font-bold font-mono-code text-center py-3.5 border-r border-[var(--ln)] text-xs font-semibold self-stretch flex items-center justify-center select-none transition-colors">
              {course.id}
            </div>

            {/* Course Title & Details */}
            <div className="p-3 sm:px-4 sm:py-3.5 flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm sm:text-base text-[var(--ink)] group-hover:text-[var(--g)] transition-colors">
                  {course.title}
                </span>
                {course.isBonus && (
                  <span className="text-[10px] font-bold uppercase bg-[var(--y)] text-emerald-950 px-1.5 py-0.2 rounded shrink-0">
                    BONUS
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--mut)] truncate mt-0.5">
                {course.subtitle} · <span className="font-mono-code">{course.hours}</span>
              </p>
            </div>

            {/* Inspect Arrow & level badge */}
            <div className="pr-3 sm:pr-4 flex items-center gap-2">
              <span className="hidden sm:inline-block text-[11px] font-medium text-[var(--mut)] bg-[var(--bg)] px-2 py-0.5 rounded border border-[var(--ln)]">
                {course.level}
              </span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--mut)] group-hover:text-[var(--g)] group-hover:bg-[var(--ln)]/40 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Program Summary Footnote */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--mut)] px-1">
        <div className="flex items-center gap-2">
          <span>{TOTAL_HOURS}</span>
          <span>·</span>
          <span>{TOTAL_FILES}</span>
        </div>
        <div className="text-[var(--ink)] font-medium">
          Haz clic en cualquier curso para ver las lecciones completas
        </div>
      </div>

      {/* Pricing Bar at bottom of curriculum */}
      <div className="mt-5 bg-[var(--sf)] border border-[var(--ln)] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="text-xs text-[var(--mut)]">
            Valor del paquete: <span className="line-through">{formatCOP(REGULAR_PRICE)}</span>
          </div>
          <span className="bg-[var(--y)] text-[#12241a] font-display font-extrabold text-sm px-2 py-0.5 rounded-md">
            HOY {formatCOP(SALE_PRICE)} COP
          </span>
        </div>

        <button
          onClick={onOpenUnlock}
          className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-white bg-[var(--g)] hover:bg-[var(--gd)] active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_0_var(--gd)] active:shadow-none cursor-pointer text-sm btn-shine btn-tactile"
        >
          <span>Quiero mi acceso ahora</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Detailed syllabus modal */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onOpenUnlock={onOpenUnlock}
      />
    </section>
  );
};
