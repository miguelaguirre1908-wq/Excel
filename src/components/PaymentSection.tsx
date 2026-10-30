import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  QrCode, 
  ShieldCheck, 
  AlertCircle, 
  MessageSquare, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PAYMENT_METHODS, HOLDER_NAME, CURRENCY_CONVERSIONS } from '../data/paymentData';
import { buildWhatsAppUrl, WA_FORMATTED } from '../utils/crypto';

interface PaymentSectionProps {
  onOpenUnlock: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ onOpenUnlock }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('COP');
  const [showQrFor, setShowQrFor] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        // ignore
      }
      textarea.remove();
    }

    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const currentCurrency = CURRENCY_CONVERSIONS.find(c => c.code === selectedCurrency) || CURRENCY_CONVERSIONS[0];

  return (
    <section id="pagar" className="py-8 scroll-mt-24">
      <div className="bg-[var(--sf)] border border-[var(--ln)] rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--ln)] pb-4 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--ink)] tracking-tight">
              Datos para tu pago
            </h2>
            <p className="text-sm text-[var(--mut)] mt-1">
              Elige el medio de transferencia que prefieras. Cero trámites complicados.
            </p>
          </div>

          {/* Currency selector toggle */}
          <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--ln)] rounded-xl p-1 shrink-0 self-start sm:self-auto">
            <span className="text-[11px] font-mono-code font-semibold px-2 text-[var(--mut)]">Moneda:</span>
            {CURRENCY_CONVERSIONS.map((curr) => (
              <button
                key={curr.code}
                onClick={() => setSelectedCurrency(curr.code)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedCurrency === curr.code
                    ? 'bg-[var(--g)] text-white shadow-2xs'
                    : 'text-[var(--mut)] hover:text-[var(--ink)]'
                }`}
              >
                {curr.code}
              </button>
            ))}
          </div>
        </div>

        {/* Security Warning Box about Miguel Aguirre */}
        <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3.5 mb-5 text-sm">
          <ShieldCheck className="w-5 h-5 text-[var(--g)] shrink-0 mt-0.5" />
          <div className="text-[var(--ink)]">
            <p className="font-semibold">
              Todas las cuentas están a nombre de <span className="underline decoration-[var(--g)] decoration-2">{HOLDER_NAME}</span>
            </p>
            <p className="text-xs text-[var(--mut)] mt-0.5">
              Antes de confirmar la transferencia en tu app bancaria, revisa que este nombre aparezca en pantalla para total seguridad y tranquilidad.
            </p>
          </div>
        </div>

        {/* Payment Methods Cards */}
        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => {
            const isCopied = copiedId === method.id;
            const isShowingQr = showQrFor === method.id;

            return (
              <div 
                key={method.id} 
                className="bg-[var(--bg)]/70 hover:bg-[var(--bg)] border border-[var(--ln)] rounded-xl p-3.5 sm:p-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-extrabold text-white text-base shadow-xs shrink-0"
                      style={{ backgroundColor: method.id === 'nequi' ? '#e2007a' : method.id === 'breb' ? '#00a868' : '#0e4a2b' }}
                    >
                      {method.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[var(--mut)]">
                          {method.type}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 bg-[var(--sf)] border border-[var(--ln)] rounded text-[var(--mut)]">
                          {method.badge}
                        </span>
                      </div>
                      <div className="font-display font-extrabold text-xl sm:text-2xl text-[var(--ink)] tracking-wider mt-0.5">
                        {method.accountNumber}
                      </div>
                      <p className="text-xs text-[var(--mut)] mt-0.5">
                        {method.description} · Titular: <b>{HOLDER_NAME}</b>
                      </p>
                    </div>
                  </div>

                  {/* Actions for this account */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => setShowQrFor(isShowingQr ? null : method.id)}
                      className="p-2 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg border border-[var(--ln)] bg-[var(--sf)] text-[var(--mut)] hover:text-[var(--ink)] hover:bg-[var(--bg)] flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Ver código QR para escanear"
                    >
                      <QrCode className="w-4 h-4" />
                      <span className="hidden sm:inline">QR</span>
                    </button>

                    <button
                      onClick={() => handleCopy(method.id, method.copyLabel)}
                      className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[var(--g)] hover:bg-[var(--gd)] text-white active:scale-95'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copiar número</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* QR Code expansion */}
                {isShowingQr && (
                  <div className="mt-4 pt-4 border-t border-[var(--ln)] flex flex-col sm:flex-row items-center gap-4 bg-[var(--sf)] p-4 rounded-xl">
                    <div className="w-32 h-32 bg-white p-2 rounded-lg border border-slate-300 flex items-center justify-center shrink-0">
                      {/* SVG styled realistic QR representation */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                        <rect x="0" y="0" width="30" height="30" rx="3" fill="#000" />
                        <rect x="5" y="5" width="20" height="20" fill="#fff" />
                        <rect x="10" y="10" width="10" height="10" fill="#000" />

                        <rect x="70" y="0" width="30" height="30" rx="3" fill="#000" />
                        <rect x="75" y="5" width="20" height="20" fill="#fff" />
                        <rect x="80" y="10" width="10" height="10" fill="#000" />

                        <rect x="0" y="70" width="30" height="30" rx="3" fill="#000" />
                        <rect x="5" y="75" width="20" height="20" fill="#fff" />
                        <rect x="10" y="80" width="10" height="10" fill="#000" />

                        <rect x="36" y="10" width="8" height="8" fill="#000" />
                        <rect x="50" y="14" width="8" height="8" fill="#000" />
                        <rect x="38" y="38" width="12" height="12" fill="#000" />
                        <rect x="56" y="42" width="10" height="10" fill="#000" />
                        <rect x="74" y="46" width="8" height="8" fill="#000" />
                        <rect x="42" y="72" width="8" height="8" fill="#000" />
                        <rect x="60" y="76" width="12" height="12" fill="#000" />
                        <rect x="80" y="80" width="10" height="10" fill="#000" />
                      </svg>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="font-semibold text-sm text-[var(--ink)]">
                        Escanea con tu aplicación de {method.name}
                      </p>
                      <p className="text-xs text-[var(--mut)] mt-1">
                        Abre la app de tu banco, selecciona "Escanear QR" y apunta tu cámara hacia este código.
                      </p>
                      <p className="text-xs font-mono-code font-bold text-[var(--ink)] mt-2">
                        Destino: {method.accountNumber} ({HOLDER_NAME})
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Price and Guarantee Box */}
        <div className="mt-5 pt-4 border-t border-[var(--ln)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[var(--mut)]">Valor exacto a pagar:</div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-2xl text-[var(--ink)]">
                {currentCurrency.symbol}{currentCurrency.price} {currentCurrency.code}
              </span>
              <span className="text-xs text-[var(--g)] font-semibold">
                (Pago único · Acceso permanente)
              </span>
            </div>
            <p className="text-xs text-[var(--mut)] mt-0.5">
              {currentCurrency.note}. No te pedimos claves, tarjetas ni datos bancarios: únicamente el comprobante.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            {/* WhatsApp CTA with shine sweep */}
            <a
              href={buildWhatsAppUrl("Hola Miguel, ya realicé el pago de $10.000 para el Megapack de Excel 10 en 1. Adjunto el comprobante para recibir mi contraseña de acceso.")}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-5 rounded-xl font-bold text-white bg-[var(--g)] hover:bg-[var(--gd)] active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_0_var(--gd)] active:shadow-none cursor-pointer text-sm whitespace-nowrap btn-shine btn-tactile"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ya pagué: enviar comprobante</span>
            </a>

            <button
              onClick={onOpenUnlock}
              className="py-3 px-4 rounded-xl font-semibold text-[var(--ink)] bg-[var(--sf)] hover:bg-[var(--bg)] border border-[var(--ln)] transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer text-sm whitespace-nowrap btn-tactile"
            >
              <span>Ya tengo la contraseña</span>
            </button>
          </div>
        </div>

        {/* WhatsApp direct help subtext */}
        <p className="text-center text-xs text-[var(--mut)] mt-4">
          ¿Tienes alguna duda o necesitas ayuda para transferir? Escríbenos directamente al WhatsApp <b>+{WA_FORMATTED}</b> y te guiamos paso a paso.
        </p>
      </div>
    </section>
  );
};
