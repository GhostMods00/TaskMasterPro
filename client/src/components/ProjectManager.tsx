// src/components/ProjectManager.tsx
import React, { useState, useEffect } from 'react';
import { fetchProjects, addProject, updateProject, deleteProject } from '../services/api';

// Define the type for a Project
interface Project {
  id: number;
  name: string;
  description: string;
}

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Specify the type as an array of Project
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({ name: '', description: '' }); // Exclude 'id' from formData
  const [isEditing, setIsEditing] = useState(false);
  const [editProjectId, setEditProjectId] = useState<number | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.data); // Ensure the API returns data matching the Project type
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    getProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editProjectId !== null) {
        await updateProject(editProjectId, formData);
        alert('Project updated successfully!');
      } else {
        const response = await addProject(formData);
        setProjects([...projects, response.data]);
        alert('Project added successfully!');
      }
      setFormData({ name: '', description: '' });
      setIsEditing(false);
      setEditProjectId(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({ name: project.name, description: project.description });
    setIsEditing(true);
    setEditProjectId(project.id);
  };

  const handleDelete = async (projectId: number) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project.id !== projectId));
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <h1>Project Manager</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">{isEditing ? 'Update Project' : 'Add Project'}</button>
      </form>

      <h2>Existing Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> - {project.description}
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;
