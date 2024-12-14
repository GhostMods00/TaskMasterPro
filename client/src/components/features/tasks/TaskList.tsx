import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';
import { Avatar } from '../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { formatDate } from '../../../lib/utils';

interface TaskStatus {
  value: 'todo' | 'in-progress' | 'review' | 'completed';
  label: string;
}

interface TaskPriority {
  value: 'low' | 'medium' | 'high';
  label: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus['value'];
  priority: TaskPriority['value'];
  dueDate: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
}

interface TaskListProps {
  tasks?: Task[];
  onTaskClick?: (id: number) => void;
  onStatusChange?: (id: number, status: string) => void;
  onDelete?: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  onTaskClick,
  onStatusChange,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'Review' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const getStatusColor = (status: string): 'success' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'review':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string): 'destructive' | 'warning' | 'default' => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            className="w-40"
          />
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={(value) => setPriorityFilter(value)}
            className="w-40"
          />
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
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
                    <DropdownMenuItem onClick={() => onTaskClick?.(task.id)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.(task.id)}>
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="mt-2 text-muted-foreground line-clamp-2">
                {task.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(task.dueDate)}
                  </div>
                </div>
                {task.assignee && (
                  <Avatar className="h-8 w-8">
                    {task.assignee.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskList;