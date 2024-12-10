// src/pages/project/ProjectDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Tab,
  Tabs,
} from '@mui/material';
import TaskList from '../../components/task/TaskList';
import TaskForm from '../../components/task/TaskForm';
import api from '../../services/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [tabValue, setTabValue] = useState(0);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleTaskCreate = async (taskData: any) => {
    try {
      await api.post(`/projects/${id}/tasks`, taskData);
      fetchProjectDetails(); // Refresh project data
      setIsTaskFormOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (!project) return <LinearProgress />;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {project.title}
        </Typography>
        <Chip
          label={project.status}
          color={project.status === 'completed' ? 'success' : 'primary'}
          sx={{ mr: 1 }}
        />
      </Box>

      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Overview" />
          <Tab label="Tasks" />
          <Tab label="Team" />
          <Tab label="Files" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography>{project.description}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Project Stats
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={project.progress}
                  />
                </Box>
                {/* Add more project stats here */}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => setIsTaskFormOpen(true)}
            >
              Add Task
            </Button>
          </Box>
          <TaskList tasks={project.tasks} />
        </TabPanel>

        {/* Add more tab panels as needed */}
      </Paper>

      <TaskForm
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={handleTaskCreate}
      />
    </Box>
  );
};

export default ProjectDetails;