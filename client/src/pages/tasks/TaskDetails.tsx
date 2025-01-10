import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Edit2,
  Flag,
  MoreVertical,
  MessageSquare,
  FileText,
  Link as LinkIcon,
  CheckSquare,
  User,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import { Textarea } from '../../components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Attachment {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: {
    name: string;
    avatar?: string;
  };
}

interface TaskDetails {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  assignee: {
    id: number;
    name: string;
    avatar?: string;
  };
  project: {
    id: number;
    name: string;
  };
  subtasks: Subtask[];
  comments: Comment[];
  attachments: Attachment[];
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [task, setTask] = useState<TaskDetails>({
    id: Number(id),
    title: 'Implement User Authentication',
    description: 'Add user login and registration functionality with email verification and password reset features.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-15',
    createdAt: '2024-02-01',
    assignee: {
      id: 1,
      name: 'John Doe',
      avatar: undefined
    },
    project: {
      id: 1,
      name: 'Website Redesign'
    },
    subtasks: [
      { id: 1, title: 'Set up authentication routes', completed: true },
      { id: 2, title: 'Implement JWT token handling', completed: false },
      { id: 3, title: 'Create password reset flow', completed: false },
    ],
    comments: [
      {
        id: 1,
        author: { name: 'Jane Smith' },
        content: 'Make sure to follow security best practices.',
        createdAt: '2024-02-15T10:00:00Z'
      },
      {
        id: 2,
        author: { name: 'Mike Johnson' },
        content: 'I can help with the email verification part.',
        createdAt: '2024-02-16T14:30:00Z'
      },
    ],
    attachments: []
  });

  const handleStatusChange = (newStatus: TaskDetails['status']) => {
    setTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newCommentData = {
      id: task.comments.length + 1,
      author: { name: 'You' },
      content: newComment,
      createdAt: new Date().toISOString(),
    };
    setTask((prevTask) => ({
      ...prevTask,
      comments: [...prevTask.comments, newCommentData],
    }));
    setNewComment('');
  };

  const handleSubtaskToggle = (subtaskId: number) => {
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
            <Badge variant={task.status === 'completed' ? 'success' : 'warning'}>
              {task.status}
            </Badge>
            <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
              {task.priority}
            </Badge>
          </div>
          <p className="text-muted-foreground">{task.description}</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Edit2 className="mr-2 h-4 w-4" /> Edit Task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>Mark as Complete</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <User className="mr-2 h-4 w-4" />
                Assignee
              </div>
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  {task.assignee.name.charAt(0)}
                </Avatar>
                <span className="text-sm font-medium">{task.assignee.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                Due Date
              </div>
              <span className="text-sm">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Flag className="mr-2 h-4 w-4" />
                Project
              </div>
              <span className="text-sm font-medium">{task.project.name}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Subtasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => handleSubtaskToggle(subtask.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className={`ml-3 ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Subtask
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <Avatar>
                      {comment.author.name.charAt(0)}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{comment.author.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}

                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="mb-2"
                  />
                  <Button type="submit" disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;