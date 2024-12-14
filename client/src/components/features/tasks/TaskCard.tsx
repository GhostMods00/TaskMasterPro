import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar } from '../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { formatDate } from '../../../utils/date';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'review' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    assignee?: {
      name: string;
      avatar?: string;
    };
  };
  onStatusChange?: (id: number, status: string) => void;
  onDelete?: (id: number) => void;
}

export const TaskCard = ({ task, onStatusChange, onDelete }: TaskCardProps) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'review':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 
              className="text-lg font-semibold hover:text-primary cursor-pointer"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              {task.title}
            </h3>
            <div className="flex gap-2 mt-2">
              <Badge variant={getStatusColor(task.status)}>
                {task.status}
              </Badge>
              <Badge variant={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/tasks/${task.id}`)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(task.id)}>
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
          {task.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {formatDate(task.dueDate)}
            </span>
          </div>
          {task.assignee && (
            <Avatar>
              {task.assignee.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  );
};