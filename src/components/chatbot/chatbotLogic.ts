// Base de conocimientos del chatbot con respuestas más detalladas y contextuales
const knowledgeBase = {
  services: {
    keywords: ['servicios', 'ofrecen', 'tipos', 'categorías', 'que hacen', 'trabajos'],
    response: `Ofrecemos una amplia gama de servicios profesionales verificados:

1. Servicios Domésticos:
   • Limpieza profesional del hogar
   • Jardinería y paisajismo
   • Lavandería y planchado
   • Cuidado de mascotas especializado

2. Servicios de Mantenimiento:
   • Fontanería (reparaciones, instalaciones)
   • Electricidad (instalaciones, mantenimiento)
   • Carpintería (muebles, reparaciones)
   • Pintura profesional
   • Albañilería y construcción

3. Servicios Públicos:
   • Transporte y mudanzas
   • Mensajería y paquetería
   • Seguridad profesional
   • Mantenimiento de áreas verdes

Todos nuestros profesionales pasan por un riguroso proceso de verificación y cuentan con experiencia comprobada. ¿Te gustaría saber más sobre algún servicio en particular?`
  },

  prices: {
    keywords: ['precios', 'costos', 'tarifas', 'cobran', 'cuánto', 'pago', 'valor'],
    response: `Los precios se calculan de manera transparente considerando varios factores:

1. Factores que influyen en el precio:
   • Tipo y complejidad del servicio
   • Duración estimada del trabajo
   • Experiencia del profesional
   • Ubicación del servicio
   • Materiales necesarios

2. Rangos de precios aproximados:
   • Servicios básicos: Desde S/. 50
   • Servicios especializados: Desde S/. 80
   • Servicios premium: Desde S/. 120

3. Métodos de pago disponibles:
   • Efectivo
   • Tarjetas de crédito/débito
   • Yape
   • Billetera virtual

💡 Consejo: Puedes ver el precio exacto antes de confirmar cualquier servicio y comparar entre diferentes profesionales.

¿Te gustaría cotizar algún servicio específico?`
  },

  security: {
    keywords: ['seguro', 'seguridad', 'confiable', 'verificado', 'garantía', 'confiar'],
    response: `Tu seguridad es nuestra máxima prioridad. Implementamos múltiples capas de protección:

1. Verificación de Profesionales:
   ✅ Verificación de identidad
   ✅ Antecedentes penales y policiales
   ✅ Referencias profesionales
   ✅ Validación de habilidades

2. Protección del Servicio:
   🛡️ Seguimiento en tiempo real
   🛡️ Sistema de calificaciones verificadas
   🛡️ Garantía de satisfacción
   🛡️ Seguro contra accidentes

3. Soporte al Cliente:
   📞 Atención 24/7
   🚨 Botón de emergencia
   💬 Chat en vivo
   ⚡ Respuesta rápida

4. Pagos Seguros:
   🔒 Transacciones encriptadas
   💰 Retención de pago hasta confirmación
   ✅ Sin cargos ocultos

¿Tienes alguna preocupación específica sobre la seguridad?`
  },

  process: {
    keywords: ['como', 'funciona', 'proceso', 'contratar', 'solicitar', 'pasos'],
    response: `El proceso de solicitud de servicios es simple y seguro:

1. Búsqueda y Selección:
   • Explora los servicios disponibles
   • Filtra por ubicación y categoría
   • Revisa perfiles y calificaciones
   • Compara precios y experiencia

2. Solicitud del Servicio:
   • Selecciona el profesional
   • Describe tu necesidad
   • Elige fecha y hora
   • Confirma la ubicación

3. Durante el Servicio:
   • Seguimiento en tiempo real
   • Chat directo con el profesional
   • Soporte disponible 24/7
   • Notificaciones de estado

4. Finalización:
   • Confirmación del trabajo
   • Pago seguro
   • Calificación del servicio
   • Garantía de satisfacción

¿Te gustaría comenzar con algún servicio específico?`
  },

  problems: {
    keywords: ['problema', 'queja', 'reclamo', 'mal', 'insatisfecho', 'ayuda'],
    response: `Lamento que hayas tenido inconvenientes. Estamos aquí para ayudarte:

1. Opciones Inmediatas:
   • Contacta al soporte 24/7
   • Usa el botón de emergencia
   • Reporta el problema en la app
   • Solicita un reembolso

2. Garantías:
   • Satisfacción garantizada
   • Protección al usuario
   • Reembolso disponible
   • Servicio de mediación

3. Proceso de Resolución:
   • Revisión inmediata
   • Contacto con el profesional
   • Solución prioritaria
   • Seguimiento continuo

¿Podrías darme más detalles sobre tu problema para ayudarte mejor?`
  },

  emergency: {
    keywords: ['emergencia', 'urgente', 'urgencia', 'inmediato', 'ahora'],
    response: `Para servicios de emergencia, tenemos un protocolo especial:

🚨 Servicios de Emergencia 24/7:
• Fontanería urgente
• Electricidad de emergencia
• Cerrajería
• Seguridad

Proceso Rápido:
1. Selecciona "Servicio Urgente"
2. Describe la emergencia
3. Respuesta en < 5 minutos
4. Profesional en camino en 30 min

⚡ Prioridad máxima para emergencias
🚗 Profesionales cercanos a tu ubicación
💰 Tarifa de emergencia transparente
✅ Soporte dedicado

¿Necesitas ayuda con alguna emergencia específica?`
  }
};

// Función mejorada para encontrar la mejor coincidencia
const findBestMatch = (input: string): string => {
  const normalizedInput = input.toLowerCase();
  let bestMatch = null;
  let maxMatches = 0;

  // Buscar coincidencias en la base de conocimientos
  for (const [topic, data] of Object.entries(knowledgeBase)) {
    const matches = data.keywords.filter(keyword => 
      normalizedInput.includes(keyword.toLowerCase())
    ).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = data.response;
    }
  }

  // Si no hay coincidencias, dar una respuesta por defecto más útil
  if (!bestMatch) {
    return `Disculpa, no estoy seguro de cómo responder a eso. ¿Podrías reformular tu pregunta? 

Puedo ayudarte con:
• Información sobre servicios disponibles
• Precios y formas de pago
• Proceso de contratación
• Seguridad y garantías
• Emergencias
• Resolución de problemas

¿Sobre cuál de estos temas te gustaría saber más?`;
  }

  return bestMatch;
};

export const generateBotResponse = async (input: string): Promise<string> => {
  // Si es una quick reply, buscar directamente en la base de conocimientos
  if (knowledgeBase[input as keyof typeof knowledgeBase]) {
    return knowledgeBase[input as keyof typeof knowledgeBase].response;
  }

  // Si es un mensaje de texto, buscar la mejor coincidencia
  return findBestMatch(input);
};