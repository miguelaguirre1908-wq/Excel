import React from 'react';
import { ShieldCheck, MessageCircle, CheckCircle, Zap } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/crypto';

export const GuaranteeBadge: React.FC = () => {
  return (
    <section className="py-6">
      <div className="bg-[var(--sf)] border-2 border-emerald-600/30 rounded-2xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[var(--g)] flex items-center justify-center shrink-0 shadow-xs pulse-badge">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[var(--g)] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Garantía Total de Cero Riesgo
              </span>
              <span className="text-xs text-[var(--mut)]">·</span>
              <span className="text-xs font-bold text-[var(--ink)]">Garantía Oficial ZENITH COLOMBIA</span>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--ink)] tracking-tight">
              Tu inversión está 100% protegida y respaldada
            </h3>

            <p className="text-xs sm:text-sm text-[var(--mut)] mt-1.5 leading-relaxed">
              En <b>Zenith Colombia</b> nos aseguramos de que cada comprador tenga una experiencia inmediata, fluida y sin fricciones. Si presentas cualquier inconveniente para desbloquear tus 10 cursos, visualizar tus videos o descargar las plantillas maestras en Drive, nuestro canal de atención por WhatsApp te acompaña de forma prioritaria hasta dejar tu acceso totalmente funcionando, o te reembolsamos el 100% de tu dinero de inmediato. Todo el riesgo corre por nuestra cuenta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-[var(--ln)] text-xs text-[var(--ink)]">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start font-medium">
                <CheckCircle className="w-4 h-4 text-[var(--g)] shrink-0" />
                <span>Activación inmediata de tu acceso</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start font-medium">
                <CheckCircle className="w-4 h-4 text-[var(--g)] shrink-0" />
                <span>Atención oficial por WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start font-medium">
                <CheckCircle className="w-4 h-4 text-[var(--g)] shrink-0" />
                <span>Reembolso total si no puedes acceder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
