import React from 'react';
import { Building, CheckCircle2, Calendar, ArrowRight, Plus, Users, MapPin, Thermometer } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { serreTypes, climateTypes } from '../data/phases';

const Dashboard = ({ setCurrentView, setCurrentProject }) => {
  const { projects, loading } = useProject();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status !== 'completed').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600">Vue d'ensemble de vos projets de serres</p>
            </div>
            <button
              onClick={() => setCurrentView('newProject')}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Nouveau Projet</span>
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-medium">Projets Actifs</p>
                  <p className="text-3xl font-bold text-blue-800">{activeProjects}</p>
                </div>
                <Building className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-medium">Projets Terminés</p>
                  <p className="text-3xl font-bold text-green-800">{completedProjects}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 font-medium">En Cours</p>
                  <p className="text-3xl font-bold text-orange-800">{inProgressProjects}</p>
                </div>
                <Calendar className="h-10 w-10 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Liste des Projets</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Aucun projet créé</p>
              <button
                onClick={() => setCurrentView('newProject')}
                className="btn-primary"
              >
                Créer votre premier projet
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map(project => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status === 'completed' ? 'Terminé' :
                           project.status === 'in-progress' ? 'En cours' : 'Nouveau'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>{serreTypes.find(t => t.value === project.serre_type)?.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4" />
                          <span>{climateTypes.find(t => t.value === project.climate)?.label}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${project.progress || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Progression: {project.progress || 0}%</p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentProject(project);
                        setCurrentView('project');
                      }}
                      className="ml-6 btn-secondary flex items-center space-x-2"
                    >
                      <span>Ouvrir</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;