import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects.');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projects.map((project: any) => (
          <li key={project.id}>
            {project.title} - {project.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
