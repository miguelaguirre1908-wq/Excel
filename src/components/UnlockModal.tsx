import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  decryptDriveUrl, 
  buildWhatsAppUrl, 
  saveUnlockState,
  DEMO_PASSWORDS,
  WA_FORMATTED 
} from '../utils/crypto';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (driveUrl: string) => void;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUnlock = async () => {
    setErrorMsg('');
    if (!password.trim()) {
      setErrorMsg('Escribe la contraseña para continuar.');
      return;
    }

    setIsLoading(true);
    try {
      const url = await decryptDriveUrl(password);
      setUnlockedUrl(url);
      saveUnlockState(url);
      onSuccess(url);
    } catch (err: any) {
      setErrorMsg(err.message || 'Contraseña incorrecta. Revisa mayúsculas o solicítala por WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (pwd: string) => {
    setPassword(pwd);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-[var(--sf)] border border-[var(--ln)] rounded-2xl w-full max-w-md p-6 shadow-2xl relative transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!unlockedUrl ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[var(--g)]">
                <KeyRound className="w-5 h-5" />
              </span>
              <h2 className="font-display font-extrabold text-xl text-[var(--ink)]">
                Acceso al contenido
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed mb-4">
              Escribe la contraseña que recibes por WhatsApp inmediatamente después de enviar tu comprobante de pago de $10.000.
            </p>

            {/* Password input form */}
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Escribe tu contraseña aquí"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUnlock();
                  }}
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[var(--ln)] bg-[var(--bg)] text-[var(--ink)] font-mono-code text-sm focus:outline-none focus:border-[var(--g)] focus:ring-2 focus:ring-[var(--g)]/20 transition-all"
                />

                {errorMsg && (
                  <div className="flex items-start gap-1.5 text-xs text-rose-600 dark:text-rose-400 mt-2 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleUnlock}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-[var(--g)] hover:bg-[var(--gd)] active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_0_var(--gd)] active:shadow-none cursor-pointer text-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Descifrando clave...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Desbloquear mis 10 cursos</span>
                  </>
                )}
              </button>
            </div>

            {/* Demo & Prototyping helper badge */}
            <div className="mt-4 pt-3.5 border-t border-[var(--ln)] bg-[var(--bg)]/60 rounded-xl p-3 border">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--ink)]">
                <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>¿Estás evaluando este prototipo?</span>
              </div>
              <p className="text-[11px] text-[var(--mut)] mt-1">
                Puedes probar con la clave demo de prueba para inspeccionar el portal del estudiante completo:
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => handleDemoFill('DEMO')}
                  className="px-2.5 py-1 text-xs font-mono-code font-bold bg-[var(--sf)] hover:bg-[var(--ln)]/50 border border-[var(--ln)] rounded-md text-[var(--g)] cursor-pointer"
                >
                  Usar clave: DEMO
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('EXCEL10')}
                  className="px-2.5 py-1 text-xs font-mono-code font-bold bg-[var(--sf)] hover:bg-[var(--ln)]/50 border border-[var(--ln)] rounded-md text-[var(--g)] cursor-pointer"
                >
                  EXCEL10
                </button>
              </div>
            </div>

            {/* WhatsApp fallback */}
            <div className="mt-4 text-center">
              <p className="text-xs text-[var(--mut)] mb-2">¿Aún no has realizado el pago o no tienes la clave?</p>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Pedir contraseña por WhatsApp al {WA_FORMATTED}</span>
              </a>
            </div>
          </div>
        ) : (
          /* Unlocked Success View */
          <div className="text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[var(--g)] text-white flex items-center justify-center text-3xl mx-auto mb-3 shadow-md pulse-badge">
              ✓
            </div>
            <h2 className="font-display font-extrabold text-2xl text-[var(--ink)]">
              ¡Acceso Desbloqueado!
            </h2>
            <p className="text-sm text-[var(--mut)] mt-1 mb-5">
              Tu contraseña es correcta. Tienes acceso vitalicio a los 10 cursos y las carpetas de Google Drive.
            </p>

            <div className="space-y-3">
              <a
                href={unlockedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-[var(--g)] hover:bg-[var(--gd)] transition-all flex items-center justify-center gap-2 shadow-[0_4px_0_var(--gd)] cursor-pointer text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir carpeta en Google Drive</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-[var(--mut)] hover:text-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--ln)]/50 transition-colors cursor-pointer"
              >
                Ver plataforma del estudiante en la app
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
