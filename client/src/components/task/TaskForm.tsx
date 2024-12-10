// src/components/task/TaskForm.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from '@mui/material';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskData: TaskData) => void;
}

interface TaskData {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: Date | null;
  assigneeId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit }) => {
  const [taskData, setTaskData] = useState<TaskData>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: null,
    assigneeId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setTaskData({
      ...taskData,
      dueDate: date,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="title"
              label="Task Title"
              fullWidth
              required
              value={taskData.title}
              onChange={handleChange}
            />

            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={taskData.description}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={taskData.priority}
                onChange={handleSelectChange}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={taskData.dueDate ? taskData.dueDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleDateChange(e.target.value ? new Date(e.target.value) : null)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;