import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowRight, ArrowUpRight, Users, Clock, Target, ThumbsUp } from 'lucide-react';

// Datos para el gráfico de trabajos por categoría
const categoryData = [
  { name: 'Fontanería', value: 30 },
  { name: 'Electricista', value: 24 },
  { name: 'Carpintería', value: 20 },
  { name: 'Pintura', value: 16 },
  { name: 'Jardinería', value: 10 }
];

// Datos para el gráfico de eficiencia del trabajador
const workerEfficiencyData = [
  { name: 'Eficiente', value: 70 },
  { name: 'No eficiente', value: 30 }
];

// Datos para el gráfico de estado de trabajos
const jobStatusData = [
  { name: 'Completados', value: 65, color: '#27AE60' },
  { name: 'En Progreso', value: 25, color: '#F1C40F' },
  { name: 'Cancelados', value: 10, color: '#E74C3C' }
];

// Datos para el gráfico de satisfacción del cliente
const satisfactionData = [
  { month: 'Ene', satisfied: 85, unsatisfied: 15 },
  { month: 'Feb', satisfied: 88, unsatisfied: 12 },
  { month: 'Mar', satisfied: 92, unsatisfied: 8 },
  { month: 'Abr', satisfied: 94, unsatisfied: 6 }
];

// Colores para los gráficos
const COLORS = {
  fontaneria: '#F1C40F',
  electricista: '#E74C3C',
  carpinteria: '#2ECC71',
  pintura: '#34495E',
  jardineria: '#3498DB',
  eficiente: '#27AE60',
  noEficiente: '#7F8C8D'
};

export function AlgorithmReport() {
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <div className="space-y-8">
      {/* Resumen General */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Resumen General</h2>
        <p className="text-gray-600 mb-6">Visión general del rendimiento Algorítmico</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Precisión del Algoritmo</p>
                <p className="text-2xl font-bold">95.8%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tiempo Promedio</p>
                <p className="text-2xl font-bold">2.5s</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Emparejamientos</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <ThumbsUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasa de Éxito</p>
                <p className="text-2xl font-bold">89.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rendimiento del Sistema */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Rendimiento del Sistema</h2>
            <p className="text-gray-600">Análisis detallado de métricas clave</p>
          </div>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todas las métricas</option>
            <option value="categories">Categorías</option>
            <option value="efficiency">Eficiencia</option>
            <option value="status">Estado</option>
            <option value="satisfaction">Satisfacción</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total de Trabajos por Categoría */}
          {(selectedMetric === 'all' || selectedMetric === 'categories') && (
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h3 className="text-lg font-bold mb-2">Total de Trabajos por Categoría</h3>
              <p className="text-gray-600 mb-4">Distribución porcentual de servicios realizados por tipo de trabajo</p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Eficiencia del Trabajador */}
          {(selectedMetric === 'all' || selectedMetric === 'efficiency') && (
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h3 className="text-lg font-bold mb-2">Eficiencia del Trabajador</h3>
              <p className="text-gray-600 mb-4">Proporción de trabajadores que cumplen los estándares de eficiencia</p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workerEfficiencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill={COLORS.eficiente} />
                      <Cell fill={COLORS.noEficiente} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Distribución de Estado de Trabajos */}
          {(selectedMetric === 'all' || selectedMetric === 'status') && (
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h3 className="text-lg font-bold mb-2">Distribución de Estado de Trabajos</h3>
              <p className="text-gray-600 mb-4">Estado actual de todos los trabajos en la plataforma</p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {jobStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => `${value}%`}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value, entry: any) => (
                        <span style={{ color: entry.payload.color }}>
                          {value} ({entry.payload.value}%)
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Nivel de Satisfacción del Cliente */}
          {(selectedMetric === 'all' || selectedMetric === 'satisfaction') && (
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h3 className="text-lg font-bold mb-2">Nivel de Satisfacción del Cliente</h3>
              <p className="text-gray-600 mb-4">Evolución mensual de la satisfacción de los usuarios</p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={satisfactionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Satisfecho" dataKey="satisfied" fill="#2ECC71" />
                    <Bar name="No Satisfecho" dataKey="unsatisfied" fill="#E74C3C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}