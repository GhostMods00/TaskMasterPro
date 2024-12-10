// src/components/task/TaskList.tsx
import React, { useState } from 'react';
import {
 Card,
 CardContent,
 Typography,
 Box,
 Chip,
 IconButton,
 Menu,
 MenuItem,
 Grid,
 LinearProgress
} from '@mui/material';
import {
 MoreVert as MoreVertIcon,
 AccessTime as TimeIcon,
 Person as PersonIcon
} from '@mui/icons-material';

interface Task {
 id: number;
 title: string;
 description: string;
 status: string;
 priority: string;
 dueDate: string;
 assignee: {
   id: number;
   name: string;
 };
 progress: number;
}

interface TaskListProps {
 tasks: Task[];
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

 const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
   setAnchorEl(event.currentTarget);
 };

 const handleMenuClose = () => {
   setAnchorEl(null);
 };

 const getPriorityColor = (priority: string): "error" | "warning" | "success" | "default" => {
   switch (priority.toLowerCase()) {
     case 'high':
       return 'error';
     case 'medium':
       return 'warning';
     case 'low':
       return 'success';
     default:
       return 'default';
   }
 };

 const getStatusColor = (status: string): "success" | "primary" | "warning" | "default" => {
   switch (status.toLowerCase()) {
     case 'completed':
       return 'success';
     case 'in_progress':
       return 'primary';
     case 'todo':
       return 'warning';
     default:
       return 'default';
   }
 };

 return (
   <Card sx={{ mb: 2 }}>
     <CardContent>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
         <Box>
           <Typography variant="h6" gutterBottom>
             {task.title}
           </Typography>
           <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
             <Chip
               label={task.status}
               color={getStatusColor(task.status)}
               size="small"
             />
             <Chip
               label={task.priority}
               color={getPriorityColor(task.priority)}
               size="small"
             />
           </Box>
         </Box>
         <IconButton onClick={handleMenuOpen}>
           <MoreVertIcon />
         </IconButton>
       </Box>

       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
         {task.description}
       </Typography>

       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
           <TimeIcon sx={{ fontSize: 'small', mr: 0.5, color: 'text.secondary' }} />
           <Typography variant="body2" color="text.secondary">
             {task.dueDate}
           </Typography>
         </Box>
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
           <PersonIcon sx={{ fontSize: 'small', mr: 0.5, color: 'text.secondary' }} />
           <Typography variant="body2" color="text.secondary">
             {task.assignee.name}
           </Typography>
         </Box>
       </Box>

       <Box sx={{ width: '100%' }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
           <Typography variant="body2" color="text.secondary">
             Progress
           </Typography>
           <Typography variant="body2" color="text.secondary">
             {task.progress}%
           </Typography>
         </Box>
         <LinearProgress
           variant="determinate"
           value={task.progress}
           sx={{
             height: 6,
             borderRadius: 3,
           }}
         />
       </Box>

       <Menu
         anchorEl={anchorEl}
         open={Boolean(anchorEl)}
         onClose={handleMenuClose}
       >
         <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
         <MenuItem onClick={handleMenuClose}>Change Status</MenuItem>
         <MenuItem onClick={handleMenuClose}>Delete Task</MenuItem>
       </Menu>
     </CardContent>
   </Card>
 );
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
 return (
   <Grid container spacing={2}>
     {tasks.map((task) => (
       <Grid item xs={12} key={task.id}>
         <TaskCard task={task} />
       </Grid>
     ))}
   </Grid>
 );
};

export default TaskList;