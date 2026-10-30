import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface BuyerNotification {
  name: string;
  city: string;
  action: string;
  timeAgo: string;
}

const SAMPLE_NOTIFICATIONS: BuyerNotification[] = [
  { name: "Sebastián R.", city: "Bogotá", action: "activó su acceso a los 10 cursos", timeAgo: "hace 3 minutos" },
  { name: "Valentina M.", city: "Medellín", action: "envió su comprobante por Nequi", timeAgo: "hace 6 minutos" },
  { name: "Andrés F.", city: "Cali", action: "desbloqueó el Megapack + Bonos", timeAgo: "hace 11 minutos" },
  { name: "Diana P.", city: "Barranquilla", action: "adquirió la promoción de $10.000", timeAgo: "hace 15 minutos" },
  { name: "Camilo T.", city: "Bucaramanga", action: "descargó las 150 plantillas de Excel", timeAgo: "hace 19 minutos" },
  { name: "Laura G.", city: "Pereira", action: "inició el módulo de Power BI", timeAgo: "hace 24 minutos" },
];

export const LiveSalesNotification: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show first toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop through notifications
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SAMPLE_NOTIFICATIONS.length);
        setIsVisible(true);
      }, 800);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = SAMPLE_NOTIFICATIONS[currentIndex];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-xs bg-[var(--sf)] border border-[var(--ln)] rounded-xl p-3 shadow-lg flex items-start gap-2.5 animate-in slide-in-from-bottom-4 duration-300">
      <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[var(--g)] flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="text-xs font-semibold text-[var(--ink)] truncate">
          {current.name} <span className="text-[var(--mut)] font-normal font-sans">({current.city})</span>
        </div>
        <p className="text-[11px] text-[var(--mut)] line-clamp-1">
          {current.action}
        </p>
        <span className="text-[10px] text-[var(--g)] font-mono-code font-semibold">
          {current.timeAgo}
        </span>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="text-[var(--mut)] hover:text-[var(--ink)] p-0.5 rounded cursor-pointer"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
