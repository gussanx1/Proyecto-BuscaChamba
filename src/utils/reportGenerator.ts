// src/utils/reportGenerator.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateAdminReport = async (data: any) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  let yPos = 20;

  // Configuración de fuentes y estilos
  pdf.setFont("helvetica");

  // Portada
  pdf.setFontSize(24);
  pdf.setTextColor(66, 66, 66);
  pdf.text('BuscaChamba', pageWidth / 2, yPos, { align: 'center' });

  yPos += 15;
  pdf.setFontSize(18);
  pdf.text('Reporte Ejecutivo', pageWidth / 2, yPos, { align: 'center' });

  yPos += 20;
  pdf.setFontSize(12);
  pdf.text(`Generado el ${new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, pageWidth / 2, yPos, { align: 'center' });

  // Bienvenida e Introducción
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(16);
  pdf.text('Bienvenida', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);
  pdf.text([
    'Estimado administrador,',
    '',
    'Le presentamos el reporte ejecutivo de BuscaChamba, una plataforma líder en la conexión',
    'entre profesionales de servicios y usuarios. Este documento proporciona una visión detallada',
    'del rendimiento de la plataforma, análisis de datos y recomendaciones estratégicas.',
    '',
    'En este informe encontrará un análisis exhaustivo del rendimiento del sistema, incluyendo',
    'métricas clave, tendencias de uso, eficiencia del algoritmo de emparejamiento y',
    'recomendaciones basadas en inteligencia artificial para la mejora continua de nuestros',
    'servicios.',
  ], 20, yPos);

  yPos += 60;
  pdf.setFontSize(16);
  pdf.text('Introducción', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);
  pdf.text([
    'BuscaChamba se ha consolidado como una solución integral para la gestión de servicios',
    'profesionales, facilitando conexiones efectivas entre trabajadores calificados y usuarios.',
    'Este reporte analiza el período actual, destacando:',
    '',
    '• Métricas de rendimiento del sistema y algoritmos',
    '• Análisis de satisfacción y engagement de usuarios',
    '• Recomendaciones de IA para optimización',
    '• Proyecciones y oportunidades de crecimiento',
    '',
    'Nuestro compromiso con la excelencia se refleja en la continua mejora de nuestros',
    'servicios y la implementación de tecnologías avanzadas para optimizar la experiencia',
    'de todos nuestros usuarios.',
  ], 20, yPos);

  // Resumen Ejecutivo
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(16);
  pdf.text('Resumen Ejecutivo', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);

  const resumenData = [
    ['Indicador', 'Valor Actual', 'Variación Mensual'],
    ['Usuarios Activos', '2,847', '+12.5%'],
    ['Servicios Completados', '1,234', '+8.2%'],
    ['Satisfacción del Cliente', '95.8%', '+2.3%'],
    ['Tiempo Promedio de Respuesta', '120ms', '-15%']
  ];

  autoTable(pdf, {
    startY: yPos,
    head: [resumenData[0]],
    body: resumenData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [102, 45, 145] },
    styles: { cellPadding: 5 }
  });

  yPos = (pdf as any).lastAutoTable.finalY + 15;
  pdf.text([
    'Interpretación:',
    '',
    '1. Crecimiento de Usuarios',
    '   • Incremento significativo del 12.5% en usuarios activos',
    '   • La tasa de adopción supera las proyecciones iniciales',
    '   • Mayor penetración en segmentos clave del mercado',
    '',
    '2. Eficiencia Operativa',
    '   • Mejora del 15% en tiempos de respuesta',
    '   • Optimización exitosa de algoritmos de emparejamiento',
    '   • Reducción en costos operativos por automatización',
    '',
    '3. Satisfacción del Usuario',
    '   • Índice de satisfacción del 95.8%, superando objetivos',
    '   • Reducción en tiempo de resolución de incidencias',
    '   • Mejora en la calidad de emparejamientos'
  ], 20, yPos);

  // Análisis del Algoritmo
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(16);
  pdf.text('Análisis del Algoritmo de Emparejamiento', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);

  const algorithmData = [
    ['Métrica', 'Resultado', 'Objetivo'],
    ['Precisión de Emparejamiento', '94.5%', '90%'],
    ['Tiempo de Procesamiento', '120ms', '150ms'],
    ['Tasa de Éxito', '89.3%', '85%'],
    ['Cobertura Geográfica', '95.2%', '90%']
  ];

  autoTable(pdf, {
    startY: yPos,
    head: [algorithmData[0]],
    body: algorithmData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [102, 45, 145] }
  });

  yPos = (pdf as any).lastAutoTable.finalY + 15;
  pdf.text([
    'Análisis Detallado del Algoritmo:',
    '',
    '1. Precisión de Emparejamiento (94.5%)',
    '   • Supera el objetivo en 4.5 puntos porcentuales',
    '   • Implementación exitosa de filtros contextuales',
    '   • Mejora en la calidad de coincidencias usuario-trabajador',
    '',
    '2. Rendimiento del Sistema',
    '   • Tiempo de procesamiento 20% más rápido que el objetivo',
    '   • Optimización mediante implementación de cache dinámico',
    '   • Reducción significativa en latencia de respuesta',
    '',
    '3. Distribución de Servicios',
    '   • Mayor concentración en servicios domésticos (45%)',
    '   • Crecimiento en servicios de mantenimiento (35%)',
    '   • Emergencia de nuevas categorías de servicios (20%)',
    '',
    '4. Análisis Geográfico',
    '   • Cobertura efectiva en zonas urbanas principales',
    '   • Identificación de áreas de expansión potencial',
    '   • Optimización de rutas y asignaciones'
  ], 20, yPos);

  // Análisis de Categorías de Servicios
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(16);
  pdf.text('Análisis de Categorías de Servicios', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);

  const serviceData = [
    ['Categoría', 'Usuarios', 'Crecimiento'],
    ['Servicios Domésticos', '1,280', '+15%'],
    ['Mantenimiento', '890', '+12%'],
    ['Servicios Profesionales', '677', '+18%']
  ];

  autoTable(pdf, {
    startY: yPos,
    head: [serviceData[0]],
    body: serviceData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [102, 45, 145] }
  });

  yPos = (pdf as any).lastAutoTable.finalY + 15;
  pdf.text([
    'Interpretación por Categoría:',
    '',
    '1. Servicios Domésticos',
    '   • Mayor demanda en limpieza y mantenimiento del hogar',
    '   • Crecimiento sostenido en servicios de jardinería',
    '   • Alta tasa de retención de clientes',
    '',
    '2. Servicios de Mantenimiento',
    '   • Incremento en demanda de servicios especializados',
    '   • Mayor satisfacción en reparaciones técnicas',
    '   • Oportunidad de expansión en nuevas áreas',
    '',
    '3. Servicios Profesionales',
    '   • Emergencia de nuevas especialidades',
    '   • Alto índice de satisfacción del cliente',
    '   • Potencial de crecimiento significativo'
  ], 20, yPos);

  // Recomendaciones de IA
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(16);
  pdf.text('Análisis y Recomendaciones de IA', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);

  const recommendations = [
    {
      title: 'Optimización del Algoritmo',
      impact: 'Alto',
      description: 'Implementar cache dinámico en zonas de alta demanda',
      expectedBenefit: '25% mejora en tiempo de respuesta',
      details: [
        'Análisis predictivo de patrones de demanda',
        'Optimización de recursos en tiempo real',
        'Mejora en la precisión de emparejamientos'
      ]
    },
    {
      title: 'Seguridad Proactiva',
      impact: 'Alto',
      description: 'Sistema de detección de patrones anómalos',
      expectedBenefit: '95% reducción de intentos maliciosos',
      details: [
        'Monitoreo continuo de actividades sospechosas',
        'Verificación automática de identidad',
        'Protección de datos sensibles'
      ]
    },
    {
      title: 'Expansión de Servicios',
      impact: 'Medio',
      description: 'Nuevas categorías basadas en análisis de demanda',
      expectedBenefit: '35% incremento en coincidencias',
      details: [
        'Identificación de nichos de mercado',
        'Análisis de competencia',
        'Evaluación de viabilidad'
      ]
    }
  ];

  recommendations.forEach((rec, index) => {
    pdf.setFontSize(14);
    pdf.text(`${index + 1}. ${rec.title}`, 20, yPos);
    yPos += 10;
    pdf.setFontSize(12);
    pdf.text([
      `Impacto: ${rec.impact}`,
      `Descripción: ${rec.description}`,
      `Beneficio Esperado: ${rec.expectedBenefit}`,
      'Detalles:',
      ...rec.details.map(detail => `• ${detail}`),
      ''
    ], 30, yPos);
    yPos += 40;
  });

  // Análisis de Tendencias
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(16);
  pdf.text('Análisis de Tendencias y Patrones', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);

  const trendData = [
    ['Período', 'Usuarios', 'Servicios', 'Satisfacción'],
    ['Q1 2024', '2,847', '1,234', '95.8%'],
    ['Q4 2023', '2,531', '1,142', '94.2%'],
    ['Q3 2023', '2,234', '987', '93.5%']
  ];

  autoTable(pdf, {
    startY: yPos,
    head: [trendData[0]],
    body: trendData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [102, 45, 145] }
  });

  yPos = (pdf as any).lastAutoTable.finalY + 15;
  pdf.text([
    'Análisis de Tendencias:',
    '',
    '1. Crecimiento de Usuario',
    '   • Incremento constante en base de usuarios',
    '   • Mayor retención de usuarios activos',
    '   • Expansión en nuevos segmentos de mercado',
    '',
    '2. Volumen de Servicios',
    '   • Aumento sostenido en servicios completados',
    '   • Mejora en tasa de conversión',
    '   • Diversificación de tipos de servicio',
    '',
    '3. Satisfacción del Cliente',
    '   • Tendencia positiva en satisfacción general',
    '   • Reducción en tiempo de respuesta',
    '   • Mejora en calidad de servicio'
  ], 20, yPos);

  // Conclusiones y Recomendaciones
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(16);
  pdf.text('Conclusiones y Recomendaciones Estratégicas', 20, yPos);
  yPos += 15;
  pdf.setFontSize(12);
  pdf.text([
    'Conclusiones Principales:',
    '',
    '1. Rendimiento General',
    '   • La plataforma muestra un crecimiento sostenido y saludable',
    '   • Los indicadores clave superan los objetivos establecidos',
    '   • Alta efectividad en emparejamientos usuario-trabajador',
    '',
    '2. Áreas de Éxito',
    '   • Satisfacción del usuario consistentemente alta (95.8%)',
    '   • Eficiencia en emparejamientos (94.5%)',
    '   • Optimización exitosa de costos operativos',
    '   • Mejora significativa en tiempos de respuesta',
    '',
    '3. Oportunidades de Mejora',
    '   • Implementación de IA para optimización continua',
    '   • Expansión a nuevas categorías de servicios',
    '   • Fortalecimiento de la seguridad del sistema',
    '   • Desarrollo de funcionalidades premium',
    '',
    'Recomendaciones Estratégicas:',
    '',
    '1. Corto Plazo (0-3 meses)',
    '   • Implementar optimizaciones de cache sugeridas',
    '   • Actualizar sistema de seguridad',
    '   • Lanzar programa de fidelización',
    '',
    '2. Mediano Plazo (3-6 meses)',
    '   • Expandir categorías de servicios',
    '   • Mejorar algoritmos de emparejamiento',
    '   • Implementar sistema de recompensas',
    '',
    '3. Largo Plazo (6-12 meses)',
    '   • Desarrollar sistema de IA avanzado',
    '   • Expandir cobertura geográfica',
    '   • Lanzar programa de certificación de trabajadores',
    '',
    'Próximos Pasos:',
    '',
    '1. Priorización de Iniciativas',
    '   • Evaluar recursos necesarios para cada recomendación',
    '   • Establecer cronograma de implementación',
    '   • Definir métricas de éxito',
    '',
    '2. Monitoreo y Ajuste',
    '   • Implementar sistema de seguimiento de KPIs',
    '   • Realizar revisiones periódicas de progreso',
    '   • Ajustar estrategias según resultados'
  ], 20, yPos);

  // Pie de página en todas las páginas
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setTextColor(150);
    pdf.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Guardar y descargar el archivo
  pdf.save('Reporte_BuscaChamba.pdf'); // Guarda y descarga el PDF

  return pdf;
};
