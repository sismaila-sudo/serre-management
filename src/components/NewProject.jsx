import React, { useState } from 'react';
import { ArrowRight, Home } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { serreTypes, soilTypes, climateTypes } from '../data/phases';

const NewProject = ({ setCurrentView, setCurrentProject }) => {
  const { createProject } = useProject();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    location: '',
    serre_type: '',
    soil_type: '',
    climate: ''
  });

  const handleSubmit = async () => {
    if (!Object.values(formData).every(value => value !== '')) {
      setError('Tous les champs sont requis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newProject = await createProject(formData);
      setCurrentProject(newProject);
      setCurrentView('project');
    } catch (error) {
      setError(error.message || 'Erreur lors de la création du projet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nouveau Projet</h1>
              <p className="text-gray-600 mt-2">Créez un nouveau projet de construction de serre</p>
            </div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Retour</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Informations générales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du projet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Serre Maraîchage Dakar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className="input-field"
                  placeholder="Nom du client"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="input-field"
                placeholder="Ville, Région, Pays"
              />
            </div>

            {/* Type de serre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Type de serre</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {serreTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setFormData({...formData, serre_type: type.value})}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.serre_type === type.value 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-medium text-gray-900">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Type de sol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Type de sol</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {soilTypes.map(soil => (
                  <button
                    key={soil.value}
                    onClick={() => setFormData({...formData, soil_type: soil.value})}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.soil_type === soil.value 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{soil.icon}</div>
                    <div className="font-medium text-gray-900">{soil.label}</div>
                    <div className="text-sm text-gray-600">{soil.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Type de climat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Type de climat</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {climateTypes.map(climate => (
                  <button
                    key={climate.value}
                    onClick={() => setFormData({...formData, climate: climate.value})}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.climate === climate.value 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{climate.icon}</div>
                    <div className="font-medium text-gray-900">{climate.label}</div>
                    <div className="text-sm text-gray-600">{climate.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Bouton de soumission */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSubmit}
                disabled={loading || !Object.values(formData).every(value => value !== '')}
                className="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Création...</span>
                  </>
                ) : (
                  <>
                    <span>Créer le projet</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;