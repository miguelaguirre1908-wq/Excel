import React, { useState } from 'react';
import { 
  FolderOpen, 
  ExternalLink, 
  CheckCircle, 
  Circle, 
  Download, 
  BookOpen, 
  Award, 
  LogOut, 
  Clock, 
  Sparkles,
  FileSpreadsheet,
  Layers,
  ArrowRight
} from 'lucide-react';
import { COURSES_LIST, CourseItem } from '../data/coursesData';
import { clearStoredUnlockState, buildWhatsAppUrl, WA_FORMATTED } from '../utils/crypto';

interface StudentPortalProps {
  driveUrl: string;
  onLockAgain: () => void;
  onOpenCourseModal: (course: CourseItem) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  driveUrl,
  onLockAgain,
  onOpenCourseModal,
}) => {
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('megapack_completed');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const toggleComplete = (id: number) => {
    const next = completedModules.includes(id)
      ? completedModules.filter(m => m !== id)
      : [...completedModules, id];
    setCompletedModules(next);
    try {
      localStorage.setItem('megapack_completed', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const progressPercent = Math.round((completedModules.length / COURSES_LIST.length) * 100);

  const handleLogout = () => {
    clearStoredUnlockState();
    onLockAgain();
  };

  return (
    <div className="py-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[var(--gd)] to-emerald-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[var(--y)] text-emerald-950 text-xs font-bold font-mono-code px-2.5 py-0.5 rounded-full">
                ACCESO ACTIVO
              </span>
              <span className="text-emerald-200 text-xs">Vitalicio · 10 Cursos</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              Área de Miembros · Megapack Excel
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Toda tu biblioteca de cursos, plantillas y archivos de práctica está lista en Google Drive para ver y descargar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl font-bold text-emerald-950 bg-[var(--y)] hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir en Google Drive</span>
            </a>

            <button
              onClick={handleLogout}
              className="py-2.5 px-3 rounded-xl text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Cerrar sesión de estudiante"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-5 border-t border-emerald-700/50">
          <div className="flex items-center justify-between text-xs mb-1.5 text-emerald-100">
            <span>Tu progreso de aprendizaje: {completedModules.length} de 10 módulos</span>
            <span className="font-mono-code font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-emerald-950/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--y)] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recommended Roadmap */}
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-2xl p-5 shadow-xs">
        <h2 className="font-display font-bold text-lg text-[var(--ink)] mb-1 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[var(--g)]" />
          <span>Ruta de estudio sugerida (4 Semanas)</span>
        </h2>
        <p className="text-xs text-[var(--mut)] mb-4">
          Si tienes poco tiempo, te recomendamos avanzar 30 minutos al día en este orden:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--ln)]">
            <div className="font-mono-code font-bold text-[var(--g)] mb-1">Semana 1</div>
            <div className="font-semibold text-[var(--ink)]">Excel Básico & Atajos</div>
            <div className="text-[11px] text-[var(--mut)] mt-1">Módulos 1 y 2. Domina fórmulas esenciales y ahorra tiempo con el teclado.</div>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--ln)]">
            <div className="font-mono-code font-bold text-[var(--g)] mb-1">Semana 2</div>
            <div className="font-semibold text-[var(--ink)]">Fórmulas Avanzadas</div>
            <div className="text-[11px] text-[var(--mut)] mt-1">Módulos 3 y 4. BUSCARX, INDICE, matrices dinámicas y auditoría.</div>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--ln)]">
            <div className="font-mono-code font-bold text-[var(--g)] mb-1">Semana 3</div>
            <div className="font-semibold text-[var(--ink)]">Macros & Finanzas</div>
            <div className="text-[11px] text-[var(--mut)] mt-1">Módulos 5 y 6. Automatización VBA, tablas de amortización y VAN/TIR.</div>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--ln)]">
            <div className="font-mono-code font-bold text-[var(--g)] mb-1">Semana 4</div>
            <div className="font-semibold text-[var(--ink)]">Power BI & SQL</div>
            <div className="text-[11px] text-[var(--mut)] mt-1">Módulos 7 al 10. Dashboards interactivos, consultas de datos y diseño.</div>
          </div>
        </div>
      </div>

      {/* All 10 Courses Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg sm:text-xl text-[var(--ink)]">
            Tus 10 Cursos Disponibles
          </h2>
          <span className="text-xs text-[var(--mut)]">
            Haz clic en "Ver temario" o marca el módulo como completado
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {COURSES_LIST.map((course) => {
            const isDone = completedModules.includes(course.id);
            return (
              <div
                key={course.id}
                className="bg-[var(--sf)] border border-[var(--ln)] rounded-xl p-4 flex flex-col justify-between hover:border-[var(--g)]/60 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[var(--g)] text-white font-display font-extrabold text-xs flex items-center justify-center">
                        {course.id}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono-code font-semibold uppercase text-[var(--mut)]">
                          {course.level}
                        </span>
                        {course.isBonus && (
                          <span className="ml-1 text-[9px] font-bold uppercase bg-[var(--y)] text-emerald-950 px-1.5 py-0.2 rounded">
                            BONUS
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleComplete(course.id)}
                      className="p-1 rounded text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      title={isDone ? "Marcar como pendiente" : "Marcar como completado"}
                    >
                      {isDone ? (
                        <CheckCircle className="w-5 h-5 text-[var(--g)] fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--mut)] hover:text-[var(--g)]" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-display font-bold text-base text-[var(--ink)]">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[var(--mut)] mt-1 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-[var(--mut)] mt-3 pt-2.5 border-t border-[var(--ln)] font-mono-code">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[var(--g)]" />
                      {course.hours}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--g)]" />
                      {course.filesCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--ln)]">
                  <button
                    onClick={() => onOpenCourseModal(course)}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-[var(--bg)] hover:bg-[var(--ln)]/50 text-[var(--ink)] border border-[var(--ln)] transition-colors cursor-pointer text-center"
                  >
                    Ver detalles y clases
                  </button>

                  <a
                    href={driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg text-xs font-semibold bg-[var(--g)] hover:bg-[var(--gd)] text-white transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Abrir en Drive</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WhatsApp Help reminder in portal */}
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-xl p-4 text-center text-xs text-[var(--mut)]">
        ¿Tienes problemas para acceder a algún archivo o video en Google Drive?{' '}
        <a 
          href={buildWhatsAppUrl("Hola, soy estudiante del Megapack Excel de Zenith Colombia y tengo una duda técnica sobre el acceso a los archivos.")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 dark:text-emerald-400 font-semibold underline ml-1"
        >
          Escribe al soporte de Zenith Colombia por WhatsApp (+{WA_FORMATTED})
        </a>
      </div>
    </div>
  );
};
