import React from 'react';
import { 
  X, 
  Clock, 
  FileSpreadsheet, 
  CheckCircle2, 
  Layers, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CourseItem } from '../data/coursesData';

interface CourseModalProps {
  course: CourseItem | null;
  onClose: () => void;
  onOpenUnlock: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onOpenUnlock,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[var(--sf)] border border-[var(--ln)] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[var(--sf)]/95 backdrop-blur-md border-b border-[var(--ln)] p-4 sm:p-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--g)] text-white font-display font-extrabold flex items-center justify-center text-sm shrink-0">
              {course.id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-semibold uppercase text-[var(--mut)]">
                  Módulo #{course.id} · {course.level}
                </span>
                {course.isBonus && (
                  <span className="text-[10px] font-bold uppercase bg-[var(--y)] text-emerald-950 px-1.5 py-0.5 rounded">
                    BONUS
                  </span>
                )}
              </div>
              <h3 id="modal-title" className="font-display font-extrabold text-lg sm:text-xl text-[var(--ink)] mt-0.5">
                {course.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Overview text */}
          <p className="text-sm text-[var(--mut)] leading-relaxed">
            {course.description}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 bg-[var(--bg)] p-3.5 rounded-xl border border-[var(--ln)] text-xs">
            <div className="flex items-center gap-2 text-[var(--ink)]">
              <Clock className="w-4 h-4 text-[var(--g)] shrink-0" />
              <span><b>Duración:</b> {course.hours}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--ink)]">
              <FileSpreadsheet className="w-4 h-4 text-[var(--g)] shrink-0" />
              <span><b>Materiales:</b> {course.filesCount}</span>
            </div>
          </div>

          {/* Key Tools Learned */}
          <div>
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--mut)] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[var(--g)]" />
              <span>Funciones y Herramientas clave</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {course.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--sf)] border border-[var(--ln)] text-[var(--ink)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Syllabus Lessons */}
          <div>
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--mut)] mb-2.5">
              Contenido de las clases del módulo
            </h4>
            <div className="space-y-2 border border-[var(--ln)] rounded-xl overflow-hidden divide-y divide-[var(--ln)]">
              {course.lessons.map((lesson, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 text-xs flex items-center justify-between gap-3 ${
                    lesson.highlight ? 'bg-emerald-50/60 dark:bg-emerald-950/20' : 'bg-[var(--sf)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${lesson.highlight ? 'text-[var(--g)]' : 'text-[var(--mut)]'}`} />
                    <span className="font-medium text-[var(--ink)]">
                      {lesson.title}
                    </span>
                  </div>
                  <span className="font-mono-code text-[11px] text-[var(--mut)] shrink-0">
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables / Downloadable Templates */}
          <div>
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--mut)] mb-2 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[var(--g)]" />
              <span>Archivos y plantillas incluidas</span>
            </h4>
            <ul className="text-xs space-y-1 text-[var(--mut)]">
              {course.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--g)] shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-10 bg-[var(--sf)]/95 backdrop-blur-md border-t border-[var(--ln)] p-4 flex items-center justify-between gap-3">
          <div className="text-xs text-[var(--mut)]">
            Incluido en los <b className="text-[var(--ink)]">10 cursos por $10.000</b>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenUnlock();
            }}
            className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[var(--g)] hover:bg-[var(--gd)] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Desbloquear módulo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
