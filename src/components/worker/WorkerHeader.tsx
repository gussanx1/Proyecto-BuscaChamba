import React from 'react';
import { Settings } from 'lucide-react';

interface WorkerHeaderProps {
  currentUser: {
    name: string;
    image: string;
    service?: string;
  };
  onSettingsClick: () => void;
}

export function WorkerHeader({ currentUser, onSettingsClick }: WorkerHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.image}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold">{currentUser.name}</h1>
              {currentUser.service && (
                <p className="text-gray-600">{currentUser.service}</p>
              )}
            </div>
          </div>
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}