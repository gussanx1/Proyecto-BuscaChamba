import React, { useState, useEffect } from 'react';
import { Tool, Loader, AlertTriangle, CheckCircle } from 'lucide-react';
import { analyzeJobPhotos } from '../../../utils/aiAnalysis';

interface AIRecommendationsProps {
  jobType: string;
  photos: string[];
}

export function AIRecommendations({ jobType, photos }: AIRecommendationsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{
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
  } | null>(null);

  useEffect(() => {
    const getAnalysis = async () => {
      try {
        setLoading(true);
        const result = await analyzeJobPhotos(jobType, photos);
        setAnalysis(result);
      } catch (err) {
        setError('No se pudo analizar las imágenes. Por favor, inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    getAnalysis();
  }, [jobType, photos]);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
        <Loader className="animate-spin text-green-600" />
        <span className="text-gray-600">Analizando imágenes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-4 flex items-center gap-3">
        <AlertTriangle className="text-red-600" />
        <span className="text-red-600">{error}</span>
      </div>
    );
  }

  if (!analysis) return null;

  const getImportanceStyle = (importance: string) => {
    switch (importance) {
      case 'essential':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'recommended':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'optional':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Tools Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h5 className="font-medium flex items-center gap-2">
            <Tool size={16} />
            Herramientas Necesarias
          </h5>
        </div>
        <div className="p-4 space-y-2">
          {analysis.tools.map((tool, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${getImportanceStyle(tool.importance)}`}
            >
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm mt-1">{tool.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h5 className="font-medium flex items-center gap-2">
            <Tool size={16} />
            Materiales Recomendados
          </h5>
        </div>
        <div className="p-4 space-y-2">
          {analysis.materials.map((material, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${getImportanceStyle(material.importance)}`}
            >
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{material.name}</p>
                    {material.quantity && (
                      <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                        {material.quantity}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-1">{material.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      {analysis.additionalNotes && (
        <div className="bg-blue-50 rounded-lg p-4 text-blue-700">
          <p className="text-sm">{analysis.additionalNotes}</p>
        </div>
      )}
    </div>
  );
}