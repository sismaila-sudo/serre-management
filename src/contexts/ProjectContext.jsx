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

  // Charger les projets de l'utilisateur
  const loadProjects = async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Parser les phases depuis JSON
      const formattedProjects = data.map(project => ({
        ...project,
        phases: JSON.parse(project.phases || '[]')
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [user]);

  // Créer un nouveau projet
  const createProject = async (projectData) => {
    if (!user) return null;

    try {
      const newProject = {
        ...projectData,
        user_id: user.id,
        status: 'new',
        progress: 0,
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

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...newProject,
          phases: JSON.stringify(newProject.phases)
        }])
        .select()
        .single();

      if (error) throw error;

      const formattedProject = {
        ...data,
        phases: JSON.parse(data.phases)
      };

      setProjects(prev => [formattedProject, ...prev]);
      return formattedProject;
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      throw error;
    }
  };

  // Mettre à jour un projet
  const updateProject = async (projectId, updates) => {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      // Si on met à jour les phases, les sérialiser en JSON
      if (updates.phases) {
        updateData.phases = JSON.stringify(updates.phases);
      }

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;

      const formattedProject = {
        ...data,
        phases: JSON.parse(data.phases || '[]')
      };

      setProjects(prev => prev.map(project => 
        project.id === projectId ? formattedProject : project
      ));

      return formattedProject;
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