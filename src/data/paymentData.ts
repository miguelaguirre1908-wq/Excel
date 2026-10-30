export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  badge: string;
  color: string;
  description: string;
  qrUrl?: string;
  copyLabel: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "nequi",
    name: "Nequi",
    type: "Celular / Nequi",
    accountNumber: "3019390843",
    badge: "Más Rápido",
    color: "#e2007a",
    description: "Abre Nequi > Envia > A Nequi > Ingresa el número y envía $10.000",
    copyLabel: "3019390843"
  },
  {
    id: "breb",
    name: "Llave Bre-B",
    type: "Transferencia Interbancaria Inmediata",
    accountNumber: "1000636440",
    badge: "Sin comisión",
    color: "#00a868",
    description: "Desde cualquier banco colombiano usando la llave Bre-B",
    copyLabel: "1000636440"
  },
  {
    id: "bancolombia",
    name: "Bancolombia",
    type: "Cuenta de Ahorros",
    accountNumber: "31100138240",
    badge: "Tradicional",
    color: "#fdc006",
    description: "Transfiere desde la App Bancolombia a Cuenta de Ahorros",
    copyLabel: "31100138240"
  }
];

export const HOLDER_NAME = "Miguel Aguirre";
export const REGULAR_PRICE = 89900;
export const SALE_PRICE = 10000;
export const DISCOUNT_PERCENT = 89;

export interface CurrencyRate {
  code: string;
  symbol: string;
  name: string;
  price: string;
  note: string;
}

export const CURRENCY_CONVERSIONS: CurrencyRate[] = [
  { code: "COP", symbol: "$", name: "Peso Colombiano", price: "10.000", note: "Precio oficial por Nequi, Bre-B o Bancolombia" },
  { code: "USD", symbol: "$", name: "Dólar Americano", price: "2.50", note: "Equivalente para pagos internacionales" },
  { code: "MXN", symbol: "$", name: "Peso Mexicano", price: "50.00", note: "Aprox. según tasa de cambio" },
  { code: "EUR", symbol: "€", name: "Euro", price: "2.35", note: "Aprox. según tasa de cambio" }
];
