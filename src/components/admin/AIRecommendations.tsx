import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Lightbulb, Target, RefreshCw } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'optimization' | 'warning' | 'opportunity';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  metrics: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  actions: string[];
  estimatedImprovement: string;
  timeframe: string;
}

export function AIRecommendations() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'optimization',
      title: 'Optimización del Algoritmo de Emparejamiento',
      description: 'El análisis de datos muestra patrones de emparejamiento subóptimos en horas pico. Se recomienda ajustar los parámetros de coincidencia basados en la densidad de usuarios por zona.',
      impact: 'high',
      metrics: [
        { label: 'Tiempo de respuesta', value: '2.5s', trend: 'down' },
        { label: 'Tasa de coincidencia', value: '78%', trend: 'up' },
        { label: 'Satisfacción usuario', value: '89%', trend: 'up' }
      ],
      actions: [
        'Implementar cache dinámico para zonas de alta demanda',
        'Ajustar pesos de proximidad geográfica',
        'Introducir pre-cálculo de coincidencias probables'
      ],
      estimatedImprovement: '25% en tiempo de respuesta',
      timeframe: '2-3 semanas'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Alerta de Seguridad: Patrones de Acceso Inusuales',
      description: 'Se han detectado patrones de acceso anómalos en las últimas 48 horas, sugiriendo posibles intentos de acceso no autorizado.',
      impact: 'high',
      metrics: [
        { label: 'Intentos fallidos', value: '+45%', trend: 'up' },
        { label: 'IPs sospechosas', value: '23', trend: 'up' },
        { label: 'Cuentas afectadas', value: '12', trend: 'stable' }
      ],
      actions: [
        'Implementar verificación de dos factores obligatoria',
        'Actualizar políticas de contraseñas',
        'Revisar y actualizar reglas del firewall'
      ],
      estimatedImprovement: '95% reducción de intentos maliciosos',
      timeframe: 'Inmediato'
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Expansión de Servicios Sugerida',
      description: 'Análisis de búsquedas de usuarios revela alta demanda no atendida en categorías específicas de servicios.',
      impact: 'medium',
      metrics: [
        { label: 'Búsquedas sin resultado', value: '15%', trend: 'up' },
        { label: 'Demanda potencial', value: '+2.5K', trend: 'up' },
        { label: 'Retención usuarios', value: '82%', trend: 'stable' }
      ],
      actions: [
        'Incorporar nuevas categorías de servicios',
        'Implementar programa de reclutamiento focalizado',
        'Desarrollar incentivos para nuevos proveedores'
      ],
      estimatedImprovement: '35% incremento en coincidencias',
      timeframe: '1-2 meses'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <TrendingUp className="text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="text-red-600" />;
      case 'opportunity':
        return <Lightbulb className="text-yellow-600" />;
      default:
        return <CheckCircle className="text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recomendaciones de IA</h2>
            <p className="text-gray-600">Análisis y sugerencias basadas en datos en tiempo real</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedRecommendation(null)}
          className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={20} />
          <span>Actualizar análisis</span>
        </button>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
              selectedRecommendation === rec.id ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-50">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{rec.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${getImpactColor(rec.impact)}`}>
                      Impacto {rec.impact}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRecommendation(
                    selectedRecommendation === rec.id ? null : rec.id
                  )}
                  className="text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              <p className="text-gray-600 mb-4">{rec.description}</p>

              {selectedRecommendation === rec.id && (
                <div className="space-y-6 mt-6 pt-6 border-t">
                  {/* Metrics */}
                  <div>
                    <h4 className="font-medium mb-3">Métricas Relevantes</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {rec.metrics.map((metric, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">{metric.label}</div>
                          <div className="text-xl font-bold mt-1 flex items-center gap-2">
                            {metric.value}
                            <span className={metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'}>
                              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="font-medium mb-3">Acciones Recomendadas</h4>
                    <div className="space-y-2">
                      {rec.actions.map((action, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-600">
                          <Target size={16} />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact and Timeline */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-1">Mejora Estimada</h4>
                      <p className="text-green-600">{rec.estimatedImprovement}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-1">Tiempo de Implementación</h4>
                      <p className="text-blue-600">{rec.timeframe}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Brain size={24} />
          <h3 className="text-lg font-semibold">Insights de IA</h3>
        </div>
        <p className="mb-4">
          Basado en el análisis de patrones y tendencias, se sugiere priorizar la optimización
          del algoritmo de emparejamiento para mejorar la experiencia del usuario y la eficiencia
          del sistema.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <h4 className="font-medium mb-2">Prioridad Alta</h4>
            <p className="text-sm opacity-90">Seguridad y optimización de rendimiento</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <h4 className="font-medium mb-2">Enfoque Recomendado</h4>
            <p className="text-sm opacity-90">Implementación gradual y monitoreo continuo</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <h4 className="font-medium mb-2">ROI Estimado</h4>
            <p className="text-sm opacity-90">35% mejora en métricas clave</p>
          </div>
        </div>
      </div>
    </div>
  );
}