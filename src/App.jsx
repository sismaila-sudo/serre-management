import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import PhaseDetailView from './components/PhaseDetailView';
import NewProject from './components/NewProject';
import Navbar from './components/Navbar';

function AppContent() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentProject, setCurrentProject] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(null);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar setCurrentView={setCurrentView} />
      
      {currentView === 'dashboard' && (
        <Dashboard 
          setCurrentView={setCurrentView}
          setCurrentProject={setCurrentProject}
        />
      )}
      
      {currentView === 'newProject' && (
        <NewProject 
          setCurrentView={setCurrentView}
          setCurrentProject={setCurrentProject}
        />
      )}
      
      {currentView === 'project' && currentPhase === null && (
        <ProjectView 
          currentProject={currentProject}
          setCurrentView={setCurrentView}
          setCurrentPhase={setCurrentPhase}
        />
      )}
      
      {currentView === 'project' && currentPhase !== null && (
        <PhaseDetailView 
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          currentPhase={currentPhase}
          setCurrentPhase={setCurrentPhase}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;