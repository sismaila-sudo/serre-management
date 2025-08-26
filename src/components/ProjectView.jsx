import React from 'react';
import { Home, CheckCircle2, Circle } from 'lucide-react';
import { phases } from '../data/phases';

const ProjectView = ({ currentProject, setCurrentView, setCurrentPhase }) => {
  if (!currentProject) return null;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête du projet */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
              >
                <Home className="h-5 w-5" />
                <span>Retour</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentProject.name}</h1>
                <p className="text-gray-600">{currentProject.client} - {currentProject.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Progression globale</p>
                <p className="text-2xl font-bold text-green-600">{currentProject.progress || 0}%</p>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${currentProject.progress || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets des phases */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Phases de Construction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phases.map((phase, index) => {
              const projectPhase = currentProject.phases?.[index];
              const phaseCompleted = projectPhase?.checklist?.every(item => item.completed) || false;
              const completedItems = projectPhase?.checklist?.filter(item => item.completed).length || 0;
              const totalItems = projectPhase?.checklist?.length || 0;
              const phaseProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
              
              return (
                <button
                  key={phase.id}
                  onClick={() => setCurrentPhase(phase.id)}
                  className={`p-6 rounded-xl border-2 text-left transition-all transform hover:scale-105 hover:shadow-lg ${
                    phaseCompleted
                      ? 'border-green-500 bg-green-50'
                      : phaseProgress > 0
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{phase.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{phase.name}</h3>
                        <p className="text-sm text-gray-600">{phase.description}</p>
                      </div>
                    </div>
                    {phaseCompleted ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                    ) : phaseProgress > 0 ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">{phaseProgress}%</span>
                        </div>
                      </div>
                    ) : (
                      <Circle className="h-8 w-8 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  
                  {phase.hasReferenceImages && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        📋 Guide visuel disponible
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {completedItems}/{totalItems} éléments
                    </span>
                    <div className="w-20 bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          phaseCompleted ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${phaseProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;