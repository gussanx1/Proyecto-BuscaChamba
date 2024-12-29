import React from 'react';

interface ServiceCategoryProps {
  onSelectService: (category: string, service: string) => void;
}

export function ServiceCategories({ onSelectService }: ServiceCategoryProps) {
  const categories = [
    {
      id: 'domestic',
      name: 'Servicios Domésticos',
      icon: '🏠',
      services: [
        'Limpieza',
        'Jardinería',
        'Cocina',
        'Lavandería',
        'Cuidado de mascotas'
      ]
    },
    {
      id: 'maintenance',
      name: 'Servicios de mantenimiento',
      icon: '🔧',
      services: [
        'Fontanería',
        'Electricidad',
        'Carpintería',
        'Pintura',
        'Albañilería'
      ]
    },
    {
      id: 'public',
      name: 'Servicios Públicos',
      icon: '🏛️',
      services: [
        'Transporte',
        'Mensajería o Paquetería',
        'Seguridad',
        'Limpieza pública',
        'Mantenimiento de áreas verdes'
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`${
              selectedCategory === category.id
                ? 'bg-green-100 border-green-500'
                : 'bg-green-50 hover:bg-green-100 border-transparent'
            } p-4 rounded-lg text-center border-2 transition-all duration-300`}
          >
            <span className="text-2xl mb-2 block">{category.icon}</span>
            <span className="text-sm text-green-800">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Services Dropdown */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in">
          <h4 className="font-medium mb-3">Servicios disponibles:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories
              .find(cat => cat.id === selectedCategory)
              ?.services.map(service => (
                <button
                  key={service}
                  onClick={() => onSelectService(selectedCategory, service)}
                  className="p-2 text-left hover:bg-green-50 rounded-lg transition-colors"
                >
                  {service}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}