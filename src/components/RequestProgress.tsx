import React from 'react';
import { Clock, CheckCircle, Calendar, Truck, Package } from 'lucide-react';

interface RequestProgressProps {
  status: 'scheduled' | 'in-progress' | 'completed';
  startDate: string;
  estimatedEndDate: string;
  completedDate?: string;
}

export function RequestProgress({ status, startDate, estimatedEndDate, completedDate }: RequestProgressProps) {
  const steps = [
    { id: 1, name: 'Programado', icon: Calendar, date: startDate },
    { id: 2, name: 'En Proceso', icon: Clock, date: startDate },
    { id: 3, name: 'Completado', icon: CheckCircle, date: completedDate || estimatedEndDate }
  ];

  const getStepStatus = (stepId: number) => {
    if (status === 'completed') return stepId <= 3 ? 'completed' : 'pending';
    if (status === 'in-progress') return stepId <= 2 ? 'completed' : 'pending';
    if (status === 'scheduled') return stepId <= 1 ? 'completed' : 'pending';
    return 'pending';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="py-4">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step) => {
            const stepStatus = getStepStatus(step.id);
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative flex items-center">
                {/* Step Icon */}
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                    stepStatus === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon size={24} />
                </div>

                {/* Step Content */}
                <div className="ml-4 flex-1">
                  <h3 className={`font-medium ${
                    stepStatus === 'completed' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {status === 'completed' && step.id === 3
                      ? `Completado el ${formatDate(completedDate!)}`
                      : step.id === 3
                      ? `Estimado para ${formatDate(estimatedEndDate)}`
                      : formatDate(step.date)}
                  </p>
                </div>

                {/* Status Indicator */}
                {stepStatus === 'completed' && (
                  <span className="ml-4 text-green-600 text-sm font-medium">
                    {step.id === 3 ? 'Finalizado' : 'Completado'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}