import React from 'react';
import { CreditCard, Send, FolderLock, ArrowRight } from 'lucide-react';
import { HOLDER_NAME } from '../data/paymentData';
import { WA_FORMATTED, buildWhatsAppUrl } from '../utils/crypto';

interface StepGuideProps {
  onOpenUnlock: () => void;
  onScrollToPay: () => void;
}

export const StepGuide: React.FC<StepGuideProps> = ({ onOpenUnlock, onScrollToPay }) => {
  return (
    <section className="py-6">
      <div className="text-center sm:text-left mb-5">
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--ink)] tracking-tight">
          Así recibes tu acceso
        </h2>
        <p className="text-sm text-[var(--mut)] mt-1">
          Es un proceso corto, seguro y se hace 100% desde tu celular o computador en 3 minutos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Step 1 */}
        <div 
          onClick={onScrollToPay}
          className="bg-[var(--sf)] border border-[var(--ln)] hover:border-[var(--g)]/60 rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer shadow-2xs"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-[var(--g)] text-white font-display font-extrabold text-sm flex items-center justify-center">
                1
              </span>
              <CreditCard className="w-4 h-4 text-[var(--mut)] group-hover:text-[var(--g)] transition-colors" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--ink)]">
              Haz tu pago de $10.000
            </h3>
            <p className="text-xs text-[var(--mut)] mt-1.5 leading-relaxed">
              Por <b>Nequi</b>, <b>Llave Bre-B</b> o <b>Bancolombia</b>. Cuentas directas a nombre de <b>{HOLDER_NAME}</b>.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--ln)] text-xs font-semibold text-[var(--g)] flex items-center gap-1 group-hover:underline">
            <span>Ver números de cuenta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Step 2 */}
        <a 
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--sf)] border border-[var(--ln)] hover:border-emerald-500 rounded-xl p-4 transition-all flex flex-col justify-between group shadow-2xs"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-[var(--g)] text-white font-display font-extrabold text-sm flex items-center justify-center">
                2
              </span>
              <Send className="w-4 h-4 text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--ink)]">
              Envía el comprobante
            </h3>
            <p className="text-xs text-[var(--mut)] mt-1.5 leading-relaxed">
              Mándalo por WhatsApp al <b>{WA_FORMATTED}</b>. Verificamos tu transferencia y te respondemos de inmediato con tu contraseña única.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--ln)] text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:underline">
            <span>Abrir chat de WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Step 3 */}
        <div 
          onClick={onOpenUnlock}
          className="bg-[var(--sf)] border border-[var(--ln)] hover:border-amber-400 rounded-xl p-4 transition-all flex flex-col justify-between group cursor-pointer shadow-2xs"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-[var(--y)] text-emerald-950 font-display font-extrabold text-sm flex items-center justify-center">
                3
              </span>
              <FolderLock className="w-4 h-4 text-amber-500 transition-colors" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--ink)]">
              Recibe tu clave y entra
            </h3>
            <p className="text-xs text-[var(--mut)] mt-1.5 leading-relaxed">
              La introduces en el botón "Acceder" de esta misma página y se desbloquea tu acceso vitalicio a los 10 cursos en Google Drive.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--ln)] text-xs font-semibold text-[var(--ink)] flex items-center gap-1 group-hover:underline">
            <span>Desbloquear acceso ahora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
