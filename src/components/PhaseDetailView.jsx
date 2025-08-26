import React from 'react';
import { ArrowLeft, Camera, MapPin, CheckCircle2, Circle } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { phases, referenceImages, serreTypes, soilTypes, climateTypes } from '../data/phases';

const PhaseDetailView = ({ currentProject, setCurrentProject, currentPhase, setCurrentPhase }) => {
  const { updateProject } = useProject();

  if (!currentProject || currentPhase === null) return null;

  const phaseData = phases[currentPhase];
  const projectPhaseData = currentProject.phases?.[currentPhase];
  const completedItems = projectPhaseData?.checklist?.filter(item => item.completed).length || 0;
  const totalItems = projectPhaseData?.checklist?.length || 0;
  const phaseProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const toggleChecklistItem = async (itemId) => {
    const updatedPhases = [...currentProject.phases];
    updatedPhases[currentPhase].checklist = updatedPhases[currentPhase].checklist.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    // Calculer le progrès global
    const totalChecklistItems = updatedPhases.reduce((sum, phase) => sum + (phase.checklist?.length || 0), 0);
    const completedChecklistItems = updatedPhases.reduce((sum, phase) => 
      sum + (phase.checklist?.filter(item => item.completed).length || 0), 0
    );
    const overallProgress = totalChecklistItems > 0 ? Math.round((completedChecklistItems / totalChecklistItems) * 100) : 0;
    
    const updates = { 
      phases: updatedPhases, 
      progress: overallProgress,
      status: overallProgress === 100 ? 'completed' : 'in-progress'
    };

    const updatedProject = await updateProject(currentProject.id, updates);
    setCurrentProject(updatedProject);
  };

  const addNote = async (itemId, note) => {
    const updatedPhases = [...currentProject.phases];
    updatedPhases[currentPhase].checklist = updatedPhases[currentPhase].checklist.map(item => 
      item.id === itemId ? { ...item, notes: note } : item
    );
    
    const updatedProject = await updateProject(currentProject.id, { phases: updatedPhases });
    setCurrentProject(updatedProject);
  };

  const addPhoto = async (itemId) => {
    const photo = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      location: "Coordonnées GPS simulées"
    };
    
    const updatedPhases = [...currentProject.phases];
    updatedPhases[currentPhase].checklist = updatedPhases[currentPhase].checklist.map(item => 
      item.id === itemId ? { ...item, photos: [...(item.photos || []), photo] } : item
    );
    
    const updatedProject = await updateProject(currentProject.id, { phases: updatedPhases });
    setCurrentProject(updatedProject);
    
    alert("📷 Photo ajoutée avec succès!\nHorodatage: " + new Date().toLocaleString());
  };

  const getTechnicalRecommendations = (phase) => {
    const { soil_type, climate, serre_type } = currentProject;
    let recommendations = [];
    
    if (phase.technicalInfo.soilTreatment && phase.technicalInfo.soilTreatment[soil_type]) {
      recommendations.push(`Sol ${soil_type}: ${phase.technicalInfo.soilTreatment[soil_type]}`);
    }
    
    if (phase.technicalInfo.materials && phase.technicalInfo.materials[climate]) {
      recommendations.push(`Climat ${climate}: ${phase.technicalInfo.materials[climate]}`);
    }
    
    if (phase.technicalInfo.spacing && phase.technicalInfo.spacing[serre_type]) {
      recommendations.push(`Serre ${serre_type}: ${phase.technicalInfo.spacing[serre_type]}`);
    }
    
    return recommendations;
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de la phase */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPhase(null)}
                className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Retour aux phases</span>
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{phaseData.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{phaseData.name}</h1>
                  <p className="text-gray-600">{phaseData.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Progression phase</p>
                <p className="text-2xl font-bold text-blue-600">{phaseProgress}%</p>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${phaseProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Guide visuel et informations techniques */}
          <div className="card">
            {/* Guide visuel */}
            {phaseData.hasReferenceImages && referenceImages[currentPhase] && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span>📋</span>
                  <span>Guide visuel</span>
                </h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div 
                    className="w-full h-48 mb-3 bg-white rounded border"
                    dangerouslySetInnerHTML={{ __html: referenceImages[currentPhase].svg }}
                  />
                  <h4 className="font-semibold text-blue-800 mb-2">{referenceImages[currentPhase].title}</h4>
                  <p className="text-sm text-blue-600">{referenceImages[currentPhase].description}</p>
                </div>
              </div>
            )}

            {/* Informations techniques */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Informations techniques</h3>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Généralités</h4>
                {Object.entries(phaseData.technicalInfo).map(([key, value]) => (
                  typeof value === 'string' && (
                    <p key={key} className="text-blue-700 text-sm mb-1">• {value}</p>
                  )
                ))}
              </div>

              {/* Recommandations spécifiques */}
              {getTechnicalRecommendations(phaseData).length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Recommandations spécifiques</h4>
                  {getTechnicalRecommendations(phaseData).map((rec, index) => (
                    <p key={index} className="text-green-700 text-sm mb-1">• {rec}</p>
                  ))}
                </div>
              )}

              {/* Paramètres du projet */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Paramètres du projet</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Serre:</span> {serreTypes.find(t => t.value === currentProject.serre_type)?.label}</p>
                  <p><span className="font-medium">Sol:</span> {soilTypes.find(t => t.value === currentProject.soil_type)?.label}</p>
                  <p><span className="font-medium">Climat:</span> {climateTypes.find(t => t.value === currentProject.climate)?.label}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Checklist</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">{completedItems}/{totalItems}</span>
              </div>
            </div>

            <div className="space-y-4">
              {projectPhaseData?.checklist?.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`mt-1 flex-shrink-0 transition-colors ${
                        item.completed ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`text-lg ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.text}
                      </p>
                      
                      {/* Zone photos */}
                      <div className="mt-3">
                        <div className="flex items-center space-x-4 mb-2">
                          <button 
                            onClick={() => addPhoto(item.id)}
                            className="flex items-center space-x-2 btn-secondary text-sm py-2 px-3"
                          >
                            <Camera className="h-4 w-4" />
                            <span>Prendre photo</span>
                          </button>
                          <div className="flex items-center space-x-2 text-gray-600 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>GPS auto</span>
                          </div>
                          {item.photos && item.photos.length > 0 && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              {item.photos.length} photo(s)
                            </span>
                          )}
                        </div>

                        {/* Affichage des photos */}
                        {item.photos && item.photos.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            {item.photos.map((photo, photoIndex) => (
                              <div key={photo.id} className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">Photo {photoIndex + 1}</p>
                                <p className="text-xs text-gray-400">
                                  {new Date(photo.timestamp).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Zone notes */}
                      <div className="mt-3">
                        <textarea
                          value={item.notes || ''}
                          onChange={(e) => addNote(item.id, e.target.value)}
                          placeholder="Notes et observations..."
                          className="input-field text-sm resize-none"
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton de fermeture */}
            <div className="flex justify-center mt-8 pt-6 border-t">
              <button
                onClick={() => setCurrentPhase(null)}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Phase terminée</span>
                <CheckCircle2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseDetailView;