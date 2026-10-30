import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { HOLDER_NAME } from '../data/paymentData';
import { WA_FORMATTED, buildWhatsAppUrl } from '../utils/crypto';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "¿Cómo recibo el contenido?",
    a: "Cuando envías tu comprobante de pago por WhatsApp al 314 824 6523, el equipo oficial de Zenith Colombia verifica tu transferencia y te entrega tu contraseña personal. La escribes en el botón 'Acceder al contenido' de esta página y se abre inmediatamente el enlace con todos los 10 cursos organizados en Google Drive."
  },
  {
    q: "¿Cuánto cuesta y hay cobros extra?",
    a: "El precio promocional es de únicamente $10.000 COP (antes $89.900). Es un pago único vitalicio: no hay mensualidades, no hay renovaciones ni suscripciones escondidas."
  },
  {
    q: "¿Cómo pago?",
    a: "Transfieres $10.000 a Nequi (3019390843), Llave Bre-B (1000636440) o Bancolombia Cuenta de Ahorros (31100138240). Todas las cuentas bancarias de recaudo están a nombre del titular Miguel Aguirre."
  },
  {
    q: "¿Es seguro pagar?",
    a: "Totalmente. Pagas por transferencia directa a cuentas a nombre del titular oficial Miguel Aguirre y puedes corroborar su nombre en tu app bancaria antes de confirmar. Nunca te solicitamos claves de bancos ni datos de tarjetas de crédito."
  },
  {
    q: "¿Necesito saber Excel para empezar?",
    a: "No, para nada. El programa arranca desde el Módulo 1 (Excel básico desde cero) explicando la pantalla, las filas, columnas y primeras sumas, y va escalando de forma progresiva hasta nivel experto, macros y Power BI."
  },
  {
    q: "¿En qué dispositivo lo veo?",
    a: "Los cursos y plantillas están alojados en Google Drive, por lo que puedes ver las clases desde tu celular, tablet o computador en cualquier momento. Para realizar las prácticas y talleres descargables es recomendable usar un computador con Excel."
  },
  {
    q: "Ya pagué y no me llega la contraseña",
    a: "Escríbenos directamente por WhatsApp enviando la captura de tu comprobante. El equipo de soporte de Zenith Colombia te atiende de inmediato hasta verificar y desbloquear tu acceso."
  }
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
         f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--ink)] tracking-tight">
            Resuelve tus dudas
          </h2>
          <p className="text-sm text-[var(--mut)] mt-1">
            Todo lo que necesitas saber antes de empezar a aprender.
          </p>
        </div>

        {/* Quick search input */}
        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-[var(--mut)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar pregunta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--sf)] border border-[var(--ln)] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--g)]"
            aria-label="Buscar en preguntas frecuentes"
          />
        </div>
      </div>

      {/* Accordion items */}
      <div className="space-y-2.5">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[var(--sf)] border border-[var(--ln)] rounded-xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-[var(--bg)]/50 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base text-[var(--ink)]">
                  {faq.q}
                </span>
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[var(--g)] shrink-0 font-bold text-lg leading-none transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[var(--mut)] leading-relaxed border-t border-[var(--ln)]/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-6 text-center text-xs text-[var(--mut)] bg-[var(--sf)] rounded-xl border border-[var(--ln)]">
            No encontramos respuestas para "{searchQuery}". Escríbenos por WhatsApp y te respondemos en minutos.
          </div>
        )}
      </div>

      {/* Direct WhatsApp help link */}
      <div className="mt-4 text-center">
        <a
          href={buildWhatsAppUrl("Hola Miguel, tengo una pregunta antes de comprar el Megapack de Excel.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>¿Tienes otra pregunta? Chatea con soporte de Zenith Colombia</span>
        </a>
      </div>
    </section>
  );
};
