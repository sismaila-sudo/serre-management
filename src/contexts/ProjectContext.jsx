import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../config/supabase';
import { phases } from '../data/phases';

const ProjectContext = createContext({});

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Charger les projets de l'utilisateur - MODE DEMO
  const loadProjects = async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      // Mode démo - projets stockés localement
      const savedProjects = localStorage.getItem('demo_projects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [user]);

  // Créer un nouveau projet - MODE DEMO
  const createProject = async (projectData) => {
    if (!user) return null;

    try {
      const newProject = {
        ...projectData,
        id: Date.now(),
        user_id: user.id,
        status: 'new',
        progress: 0,
        created_at: new Date().toISOString(),
        phases: phases.map(phase => ({
          ...phase,
          checklist: phase.checklist.map(item => ({
            id: Date.now() + Math.random(),
            text: item,
            completed: false,
            photos: [],
            notes: ''
          }))
        }))
      };

      const updatedProjects = [newProject, ...projects];
      setProjects(updatedProjects);
      
      // Sauvegarder en localStorage
      localStorage.setItem('demo_projects', JSON.stringify(updatedProjects));
      
      return newProject;
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      throw error;
    }
  };

  // Mettre à jour un projet - MODE DEMO
  const updateProject = async (projectId, updates) => {
    try {
      const updatedProjects = projects.map(project => 
        project.id === projectId 
          ? { ...project, ...updates, updated_at: new Date().toISOString() }
          : project
      );

      setProjects(updatedProjects);
      
      // Sauvegarder en localStorage
      localStorage.setItem('demo_projects', JSON.stringify(updatedProjects));

      return updatedProjects.find(p => p.id === projectId);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
      throw error;
    }
  };

  // Supprimer un projet
  const deleteProject = async (projectId) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(prev => prev.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      throw error;
    }
  };

  const value = {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    loadProjects
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};