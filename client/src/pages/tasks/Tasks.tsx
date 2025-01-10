import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CheckSquare, Plus, Calendar, User } from 'lucide-react';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  subtasks: Subtask[];
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const Tasks: React.FC = () => {
  const navigate = useNavigate();

  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Design Homepage',
      description: 'Redesign the homepage for better user experience.',
      dueDate: '2024-03-20',
      priority: 'high',
      subtasks: [
        { id: 1, title: 'Create wireframes', completed: true },
        { id: 2, title: 'Review designs with team', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Implement API Integration',
      description: 'Integrate the new API for data fetching.',
      dueDate: '2024-04-15',
      priority: 'medium',
      subtasks: [
        { id: 1, title: 'Setup authentication', completed: true },
        { id: 2, title: 'Fetch initial data', completed: false },
      ],
    },
  ]);

  const handleSubtaskToggle = (taskId: number, subtaskId: number) => {
    // Add logic to toggle subtask completion status
    console.log(`Toggling subtask ${subtaskId} in task ${taskId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <Button onClick={() => navigate('/tasks/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                {task.priority}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{task.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => handleSubtaskToggle(task.id, subtask.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span
                      className={`ml-3 ${
                        subtask.completed ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
