// src/pages/project/ProjectList.tsx
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  LinearProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import api from '../../services/api';

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/projects/new"
        >
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Chip
                  label={project.status}
                  color={
                    project.status === 'completed'
                      ? 'success'
                      : project.status === 'in_progress'
                      ? 'primary'
                      : 'default'
                  }
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={project.progress}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  Progress: {project.progress}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectList;