// src/pages/dashboard/Dashboard.tsx
import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  Assignment as TaskIcon,
  Group as TeamIcon,
  Timeline as ProjectIcon
} from '@mui/icons-material';

const Dashboard = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ProjectIcon sx={{ mr: 2, color: 'primary.main' }} />
              <div>
                <Typography variant="h6">Total Projects</Typography>
                <Typography variant="h4">12</Typography>
              </div>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TaskIcon sx={{ mr: 2, color: 'secondary.main' }} />
              <div>
                <Typography variant="h6">Active Tasks</Typography>
                <Typography variant="h4">34</Typography>
              </div>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TeamIcon sx={{ mr: 2, color: 'success.main' }} />
              <div>
                <Typography variant="h6">Team Members</Typography>
                <Typography variant="h4">8</Typography>
              </div>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Projects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Projects
              </Typography>
              {/* Project list would go here */}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Tasks
              </Typography>
              {/* Task list would go here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;