import React from 'react';
import { Building, Home, Plus, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ setCurrentView }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Gestion Serres</h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Accueil</span>
            </button>

            <button
              onClick={() => setCurrentView('newProject')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nouveau</span>
            </button>

            {/* Menu utilisateur */}
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{user?.user_metadata?.first_name || 'Utilisateur'}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Déconnexion"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;