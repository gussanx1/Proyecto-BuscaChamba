interface AnalysisResult {
  tools: Array<{
    name: string;
    importance: 'essential' | 'recommended' | 'optional';
    reason: string;
  }>;
  materials: Array<{
    name: string;
    quantity?: string;
    importance: 'essential' | 'recommended' | 'optional';
    reason: string;
  }>;
  additionalNotes?: string;
}

export const analyzeJobPhotos = async (
  jobType: string,
  photos: string[]
): Promise<AnalysisResult> => {
  // This is a mock implementation. In a real application, you would:
  // 1. Send the photos to your AI service
  // 2. Process the images and analyze the problem
  // 3. Return real recommendations based on the analysis

  // Simulated delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock response based on job type
  if (jobType.toLowerCase().includes('fontaner')) {
    return {
      tools: [
        {
          name: 'Llave inglesa ajustable',
          importance: 'essential',
          reason: 'Necesaria para ajustar y aflojar tuberías de diferentes tamaños'
        },
        {
          name: 'Destornillador de estrella',
          importance: 'recommended',
          reason: 'Útil para acceder a paneles y realizar ajustes menores'
        },
        {
          name: 'Linterna LED',
          importance: 'recommended',
          reason: 'Para inspeccionar áreas con poca iluminación'
        }
      ],
      materials: [
        {
          name: 'Cinta de teflón',
          quantity: '1 rollo',
          importance: 'essential',
          reason: 'Para sellar las conexiones y prevenir fugas'
        },
        {
          name: 'Empaquetaduras de repuesto',
          quantity: '2-3 unidades',
          importance: 'recommended',
          reason: 'Por si es necesario reemplazar sellos dañados'
        }
      ],
      additionalNotes: 'Las imágenes muestran signos de corrosión en las conexiones. Considere llevar materiales adicionales para reemplazo si es necesario.'
    };
  }

  // Default response for other job types
  return {
    tools: [
      {
        name: 'Caja de herramientas básica',
        importance: 'essential',
        reason: 'Conjunto de herramientas esenciales para el trabajo'
      }
    ],
    materials: [
      {
        name: 'Materiales básicos',
        importance: 'recommended',
        reason: 'Materiales generales que podrían ser necesarios'
      }
    ]
  };
};