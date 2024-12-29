import React, { useState } from 'react';
import { Search, Filter, Edit2, Trash2, Shield, AlertTriangle, CheckCircle, X, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'user' | 'worker' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  image: string;
  lastActive: string;
  verified: boolean;
  phone?: string;
  location?: string;
  service?: string;
}

const initialUsers: User[] = [
  // Administrators
  {
    id: 'admin-1',
    name: 'Gustavo Sanchez',
    email: 'gustavo.sanchez@buscachamba.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T10:30:00',
    verified: true,
    location: 'Trujillo - El Golf'
  },
  {
    id: 'admin-2',
    name: 'Anthony Loyaga',
    email: 'anthony.loyaga@buscachamba.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T11:20:00',
    verified: true,
    location: 'Trujillo - El Porvenir'
  },
  {
    id: 'admin-3',
    name: 'Marcelo Chavez',
    email: 'marcelo.chavez@buscachamba.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T09:45:00',
    verified: true,
    location: 'Trujillo - El Porvenir'
  },
  {
    id: 'admin-4',
    name: 'Luis Lezcano',
    email: 'luis.lezcano@buscachamba.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T12:15:00',
    verified: true,
    location: 'Trujillo - El Porvenir'
  },
  {
    id: 'admin-5',
    name: 'Carlos Murrugarra',
    email: 'carlos.murrugarra@buscachamba.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T10:00:00',
    verified: true,
    location: 'Trujillo'
  },
  {
    id: 'admin-6',
    name: 'Rafael Janampa',
    email: 'rafael.janampa@buscachamba.com',
    type: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T11:45:00',
    verified: true,
    location: 'Trujillo'
  },
  // Regular users and workers
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    type: 'worker',
    status: 'active',
    joinDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T10:30:00',
    verified: true,
    phone: '+51 999 888 777',
    location: 'Trujillo',
    service: 'Fontanería'
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    type: 'user',
    status: 'active',
    joinDate: '2024-02-01',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T09:45:00',
    verified: true,
    phone: '+51 999 888 666',
    location: 'Lima'
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    type: 'worker',
    status: 'suspended',
    joinDate: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
    lastActive: '2024-03-14T16:20:00',
    verified: true,
    phone: '+51 999 888 555',
    location: 'Arequipa',
    service: 'Electricidad'
  },
  {
    id: '4',
    name: 'Ana Torres',
    email: 'ana@example.com',
    type: 'user',
    status: 'pending',
    joinDate: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
    lastActive: '2024-03-15T11:15:00',
    verified: false,
    phone: '+51 999 888 444',
    location: 'Cusco'
  }
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || user.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteConfirm(null);
  };

  const handleVerifyUser = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, verified: true } : user
    ));
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  const handleAddAdmin = (newAdmin: Omit<User, 'id' | 'type' | 'verified' | 'joinDate'>) => {
    const admin: User = {
      id: `admin-${Date.now()}`,
      type: 'admin',
      verified: true,
      joinDate: new Date().toISOString().split('T')[0],
      ...newAdmin
    };
    setUsers([...users, admin]);
    setShowAddAdmin(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Todos los tipos</option>
            <option value="user">Usuarios</option>
            <option value="worker">Trabajadores</option>
            <option value="admin">Administradores</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="suspended">Suspendidos</option>
            <option value="pending">Pendientes</option>
          </select>
          <button
            onClick={() => setShowAddAdmin(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <UserPlus size={20} />
            <span className="hidden sm:inline">Añadir Administrador</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.image}
                        alt={user.name}
                      />
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          {(user.verified || user.type === 'admin') && (
                            <Shield className="text-green-500" size={16} />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.type === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : user.type === 'worker'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value as any)}
                      className={`text-sm rounded-full px-3 py-1 border ${
                        user.status === 'active'
                          ? 'text-green-800 border-green-200 bg-green-50'
                          : user.status === 'suspended'
                          ? 'text-red-800 border-red-200 bg-red-50'
                          : 'text-yellow-800 border-yellow-200 bg-yellow-50'
                      }`}
                    >
                      <option value="active">Activo</option>
                      <option value="suspended">Suspendido</option>
                      <option value="pending">Pendiente</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      {!user.verified && user.type !== 'admin' && (
                        <button
                          onClick={() => handleVerifyUser(user.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Verificar usuario"
                        >
                          <CheckCircle size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Editar usuario"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Eliminar usuario"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Añadir Administrador</h3>
              <button onClick={() => setShowAddAdmin(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddAdmin({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                location: formData.get('location') as string,
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
                status: 'active',
                lastActive: new Date().toISOString()
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Añadir Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Editar Usuario</h3>
              <button onClick={() => setEditingUser(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditUser(editingUser);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    value={editingUser.phone || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <input
                    type="text"
                    value={editingUser.location || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {editingUser.type === 'worker' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Servicio</label>
                    <input
                      type="text"
                      value={editingUser.service || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, service: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-semibold">Confirmar eliminación</h3>
            </div>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}