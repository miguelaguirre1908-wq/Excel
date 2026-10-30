export interface CourseLesson {
  title: string;
  duration: string;
  highlight?: boolean;
}

export interface CourseItem {
  id: number;
  title: string;
  subtitle: string;
  category: 'excel' | 'analytics' | 'design';
  isBonus?: boolean;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto' | 'Todos los niveles';
  hours: string;
  filesCount: string;
  description: string;
  tools: string[];
  lessons: CourseLesson[];
  deliverables: string[];
}

export const COURSES_LIST: CourseItem[] = [
  {
    id: 1,
    title: "Excel básico desde cero",
    subtitle: "Para empezar sin saber nada",
    category: "excel",
    level: "Básico",
    hours: "8 horas de video",
    filesCount: "12 archivos .xlsx de práctica",
    description: "Aprende los fundamentos sólidos de Excel: interfaz moderna, navegación rápida por atajos de teclado, formato de celdas profesional, tipos de datos, operadores aritméticos y tus primeras fórmulas.",
    tools: ["Interfaz Ribbon", "Formatos y Tipos de Datos", "Operadores (+, -, *, /)", "Autollenado Inteligente"],
    lessons: [
      { title: "Navegación veloz y configuración del entorno de trabajo", duration: "25 min" },
      { title: "Ingreso de datos, formatos personalizados y tipos de celdas", duration: "35 min" },
      { title: "Operaciones matemáticas elementales y referencias relativas vs. absolutas ($)", duration: "45 min", highlight: true },
      { title: "Atajos de teclado indispensables para ahorrar 1 hora diaria", duration: "30 min" },
      { title: "Proyecto 1: Hoja de control de ingresos y egresos personales", duration: "50 min" }
    ],
    deliverables: ["Plantilla de Presupuesto Mensual", "Guía de 50 Atajos Esenciales en PDF", "Ejercicios resueltos paso a paso"]
  },
  {
    id: 2,
    title: "Excel intermedio",
    subtitle: "Fórmulas, tablas y ordenar datos",
    category: "excel",
    level: "Intermedio",
    hours: "12 horas de video",
    filesCount: "18 plantillas y talleres",
    description: "Domina las funciones de búsqueda y lógica más demandadas por empresas: BUSCARV, BUSCARX, SI anidados, CONTAR.SI, Tablas Oficiales de Excel y segmentadores de datos.",
    tools: ["BUSCARV / BUSCARX", "SI / SI.CONJUNTO", "CONTAR.SI / SUMAR.SI", "Tablas Inteligentes de Excel"],
    lessons: [
      { title: "Tablas oficiales de Excel y referencias estructuradas", duration: "40 min" },
      { title: "Funciones lógicas: SI, Y, O y manejo de excepciones", duration: "55 min" },
      { title: "Búsquedas profesionales con BUSCARV y la nueva función BUSCARX", duration: "60 min", highlight: true },
      { title: "Funciones estadísticas y de conteo condicional (SUMAR.SI, CONTAR.SI)", duration: "45 min" },
      { title: "Proyecto 2: Sistema de gestión de inventarios y alertas de stock", duration: "70 min" }
    ],
    deliverables: ["Plantilla de Inventario con Stock Mínimo", "Validador de listas desplegables dependientes", "Base de datos comercial de prueba"]
  },
  {
    id: 3,
    title: "Excel avanzado",
    subtitle: "Funciones y herramientas de análisis",
    category: "excel",
    level: "Avanzado",
    hours: "14 horas de video",
    filesCount: "22 libros de trabajo avanzados",
    description: "Lleva tus hojas de cálculo al nivel analítico: combinación INDICE + COINCIDIR bidireccional, matrices dinámicas (FILTRAR, UNICOS, ORDENAR), Solver, tablas dinámicas avanzadas y campos calculados.",
    tools: ["INDICE + COINCIDIR", "Matrices Dinámicas (FILTRAR, UNICOS)", "Tablas Dinámicas & Campos Calculados", "Solver & Análisis de Escenarios"],
    lessons: [
      { title: "Búsquedas matriciales avanzadas con INDICE y COINCIDIR bidireccional", duration: "50 min" },
      { title: "Fórmulas de matrices dinámicas: FILTRAR, UNICOS y ORDENAR", duration: "65 min", highlight: true },
      { title: "Tablas dinámicas expertas, campos calculados y KPIs", duration: "75 min" },
      { title: "Análisis de hipótesis, Administrador de Escenarios y Buscar Objetivo", duration: "45 min" },
      { title: "Proyecto 3: Dashboard dinámico de ventas interanual con KPIs", duration: "80 min" }
    ],
    deliverables: ["Dashboard de Ventas Multisede", "Plantilla de Pronósticos y Escenarios", "Guía de Optimización de Archivos Pesados"]
  },
  {
    id: 4,
    title: "Excel experto",
    subtitle: "Nivel profesional y auditoría",
    category: "excel",
    level: "Experto",
    hours: "10 horas de video",
    filesCount: "15 archivos maestros",
    description: "Aprende las técnicas de los consultores senior: modelado robusto de datos sin errores, auditoría de fórmulas complejas, protección de hojas con permisos granulares y dashboards ejecutivos.",
    tools: ["Auditoría de Fórmulas", "Seguridad y Permisos", "Modelos Multidimensionales", "Diseño UI para Hojas de Cálculo"],
    lessons: [
      { title: "Rastreo de precedentes, dependientes y evaluación paso a paso", duration: "40 min" },
      { title: "Manejo proactivo de errores (SI.ERROR, SI.ND, ESNUMERO)", duration: "45 min" },
      { title: "Protección de fórmulas confidenciales y bloqueo selectivo", duration: "35 min" },
      { title: "Estándares financieros FAST de modelado en hojas de cálculo", duration: "50 min" },
      { title: "Proyecto 4: Hoja de cálculo de nivel corporativo para auditoría", duration: "65 min", highlight: true }
    ],
    deliverables: ["Plantilla de Auditoría Financiera", "Checklist de Integridad de Fórmulas", "Manual de Buenas Prácticas"]
  },
  {
    id: 5,
    title: "Macros y VBA",
    subtitle: "Automatiza tareas repetitivas",
    category: "excel",
    level: "Avanzado",
    hours: "16 horas de video",
    filesCount: "25 macros listas para copiar y pegar",
    description: "Deja que la computadora haga el trabajo aburrido por ti. Aprende a crear botones que limpien, consoliden y envíen reportes automáticamente en segundos.",
    tools: ["Grabadora de Macros", "Editor VBA (Alt + F11)", "Bucles For Each / Do While", "Formularios UserForms"],
    lessons: [
      { title: "Introducción a la grabadora de macros y limpieza de código generado", duration: "45 min" },
      { title: "Sintaxis VBA: Variables, rangos (Range / Cells) y condicionales", duration: "60 min" },
      { title: "Bucles para procesar miles de filas en segundos (For Each, While)", duration: "70 min", highlight: true },
      { title: "Creación de formularios interactivos (UserForms) para captura de datos", duration: "80 min" },
      { title: "Proyecto 5: Botón que consolida 12 hojas mensuales en un clic", duration: "90 min" }
    ],
    deliverables: ["Librería de 25 Macros de Utilidad Diaria", "Plantilla con Formulario UserForm", "Generador de Reportes PDF Automático"]
  },
  {
    id: 6,
    title: "Excel financiero y para profesionales",
    subtitle: "Modelos y reportes para el trabajo",
    category: "excel",
    level: "Avanzado",
    hours: "12 horas de video",
    filesCount: "16 modelos financieros",
    description: "Especializado en finanzas corporativas, préstamos, inversiones y análisis de rentabilidad: cálculo de cuotas (PAGO), tablas de amortización, flujo de caja proyectado, VAN y TIR.",
    tools: ["Funciones PAGO / PAGOINT / TASA", "VAN & TIR", "Tablas de Amortización Francesa/Alemana", "Flujo de Caja Proyectado"],
    lessons: [
      { title: "Matemáticas financieras aplicadas en Excel (PAGO, VA, VF, TASA)", duration: "55 min" },
      { title: "Construcción de tablas de amortización bancaria con abonos a capital", duration: "60 min" },
      { title: "Evaluación de proyectos de inversión: VAN, TIR y payback", duration: "65 min", highlight: true },
      { title: "Presupuesto operativo y proyección de estados financieros a 3 años", duration: "75 min" },
      { title: "Proyecto 6: Modelo de viabilidad económica para nuevos negocios", duration: "80 min" }
    ],
    deliverables: ["Simulador de Créditos y Amortización", "Plantilla de Flujo de Caja Descontado", "Calculadora de Punto de Equilibrio"]
  },
  {
    id: 7,
    title: "Inteligencia empresarial y Power BI",
    subtitle: "Dashboards e informes interactivos",
    category: "analytics",
    level: "Todos los niveles",
    hours: "15 horas de video",
    filesCount: "10 proyectos .pbix con datos reales",
    description: "Aprende la herramienta #1 de Business Intelligence en el mundo: conecta fuentes de datos, límpialas con Power Query, crea modelos en estrella y diseña dashboards ejecutivos.",
    tools: ["Power BI Desktop", "Power Query ETL", "Lenguaje DAX (CALCULATE, RELATED)", "Visualizaciones e Informes"],
    lessons: [
      { title: "Fundamentos de Power BI y arquitectura de Business Intelligence", duration: "40 min" },
      { title: "Extracción y limpieza de datos desordenados con Power Query", duration: "70 min" },
      { title: "Modelado dimensional en estrella y relaciones entre tablas", duration: "65 min" },
      { title: "Fórmulas DAX indispensables: CALCULATE, SUMX, FILTER y Time Intelligence", duration: "85 min", highlight: true },
      { title: "Proyecto 7: Dashboard comercial interactivo para directores de área", duration: "90 min" }
    ],
    deliverables: ["3 Proyectos .pbix terminados y editables", "Paleta de colores corporativos para dashboards", "Dataset de ventas retail con 100k registros"]
  },
  {
    id: 8,
    title: "Análisis de datos y SQL",
    subtitle: "Consulta y analiza bases de datos",
    category: "analytics",
    isBonus: true,
    level: "Todos los niveles",
    hours: "10 horas de video",
    filesCount: "Script de base de datos + consultas .sql",
    description: "El lenguaje universal para hablar con bases de datos. Aprende a extraer información con SELECT, filtrar con WHERE, combinar tablas con INNER/LEFT JOIN y agrupar con GROUP BY.",
    tools: ["SQL Standard", "SELECT & WHERE", "INNER / LEFT / RIGHT JOIN", "GROUP BY & HAVING"],
    lessons: [
      { title: "¿Por qué todo analista de datos debe saber SQL?", duration: "30 min" },
      { title: "Consultas básicas de extracción: SELECT, DISTINCT, ORDER BY y LIMIT", duration: "50 min" },
      { title: "Filtros complejos y operadores lógicos con WHERE y LIKE", duration: "55 min" },
      { title: "Cruce de múltiples tablas con INNER JOIN y LEFT JOIN", duration: "70 min", highlight: true },
      { title: "Proyecto 8: Extracción de datos con SQL para conectar directamente a Excel", duration: "65 min" }
    ],
    deliverables: ["Base de datos SQLite de práctica lista para usar", "Cheatsheet de comandos SQL más usados", "Colección de 30 consultas de negocio resueltas"]
  },
  {
    id: 9,
    title: "Curso de Canva y plantillas",
    subtitle: "Diseño para presentaciones y redes",
    category: "design",
    isBonus: true,
    level: "Todos los niveles",
    hours: "6 horas de video",
    filesCount: "50+ plantillas premium editables",
    description: "Comunica tus datos con impacto visual. Aprende a diseñar infografías corporativas, portadas para tus reportes de Excel y material profesional para tus proyectos.",
    tools: ["Canva Pro & Free", "Diseño de Infografías", "Paletas de Color & Tipografía", "Exportación PDF de Alta Calidad"],
    lessons: [
      { title: "Principios de diseño gráfico aplicados a reportes corporativos", duration: "35 min" },
      { title: "Diseño de infografías claras para sintetizar datos numéricos", duration: "50 min", highlight: true },
      { title: "Creación de portadas y separadores profesionales para tus libros de Excel", duration: "40 min" },
      { title: "Animaciones y contenido para presentaciones ejecutivas", duration: "45 min" }
    ],
    deliverables: ["Pack de 50 plantillas editables en Canva", "Guía de combinaciones tipográficas", "Iconos vectoriales de finanzas y negocios"]
  },
  {
    id: 10,
    title: "Curso de PowerPoint",
    subtitle: "Presentaciones que se entienden",
    category: "design",
    isBonus: true,
    level: "Todos los niveles",
    hours: "7 horas de video",
    filesCount: "15 plantillas maestras .pptx",
    description: "Convierte tablas aburridas en historias persuasivas. Domina el arte del storytelling con datos, uso de diapositivas maestras y transiciones limpias sin saturar a tu audiencia.",
    tools: ["Patrón de Diapositivas", "Gráficos Vinculados a Excel", "Storytelling con Datos", "Transición Transformación (Morph)"],
    lessons: [
      { title: "Estructura narrativa: Cómo presentar resultados a jefes y clientes", duration: "40 min" },
      { title: "Vinculación en tiempo real de gráficos de Excel en PowerPoint", duration: "45 min", highlight: true },
      { title: "Uso de la transición Transformación (Morph) para animar datos", duration: "50 min" },
      { title: "Regla de menos es más: Reducción de carga cognitiva en diapositivas", duration: "35 min" },
      { title: "Proyecto 10: Presentación ejecutiva de balance anual de empresa", duration: "60 min" }
    ],
    deliverables: ["Plantilla corporativa .pptx minimalista", "Biblioteca de diagramas y flujos editables", "Guía de oratoria para exponer números con seguridad"]
  }
];

export const TOTAL_HOURS = "100+ horas de formación práctica";
export const TOTAL_FILES = "150+ archivos de trabajo, macros y plantillas descargables";
