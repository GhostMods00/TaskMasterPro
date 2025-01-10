import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Edit2,
  Flag,
  MoreVertical,
  Plus,
  Users,
  MessageSquare,
  FileText,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

interface Task {
  id: number;
  title: string;
  status: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  // Sample data - replace with API call
  const project = {
    id: Number(id),
    title: 'Website Redesign',
    description: 'Modernize the company website with new design and features to improve user experience and increase conversion rates.',
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    dueDate: '2024-03-30',
    priority: 'high',
    tasks: [
      { id: 1, title: 'Design Homepage', status: 'completed', assignee: 'John Doe', dueDate: '2024-02-15', priority: 'high' },
      { id: 2, title: 'Implement User Authentication', status: 'in-progress', assignee: 'Jane Smith', dueDate: '2024-02-28', priority: 'medium' },
      { id: 3, title: 'Mobile Responsiveness', status: 'pending', assignee: 'Mike Johnson', dueDate: '2024-03-15', priority: 'high' },
    ] as Task[],
    team: [
      { id: 1, name: 'John Doe', role: 'Project Lead' },
      { id: 2, name: 'Jane Smith', role: 'Frontend Developer' },
      { id: 3, name: 'Mike Johnson', role: 'Backend Developer' },
    ] as TeamMember[],
  };

  const TaskList = ({ tasks }: { tasks: Task[] }) => (
    <div className="space-y-4">
      {tasks.map(task => (
        <Card key={task.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{task.title}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {task.dueDate}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {task.assignee}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  task.status === 'completed' ? 'success' :
                  task.status === 'in-progress' ? 'warning' : 'secondary'
                }>
                  {task.status}
                </Badge>
                <Badge variant={
                  task.priority === 'high' ? 'destructive' :
                  task.priority === 'medium' ? 'warning' : 'secondary'
                }>
                  {task.priority}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const TeamList = ({ team }: { team: TeamMember[] }) => (
    <div className="space-y-4">
      {team.map(member => (
        <Card key={member.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  {member.name.charAt(0)}
                </Avatar>
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <Badge variant="success">{project.status}</Badge>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/projects')}>
            Back to Projects
          </Button>
          <Button>
            <Edit2 className="mr-2 h-4 w-4" /> Edit Project
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Archive Project</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Start Date:</span>
                <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Due Date:</span>
                <span className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex -space-x-2">
              {project.team.map((member) => (
                <Avatar
                  key={member.id}
                  className="border-2 border-background"
                  title={member.name}
                >
                  {member.name.charAt(0)}
                </Avatar>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full ml-2"
                title="Add team member"
                onClick={() => navigate(`/projects/${project.id}/team/add`)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks" className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discussions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Project Tasks</h3>
              <p className="text-sm text-muted-foreground">
                Manage and track project tasks
              </p>
            </div>
            <Button onClick={() => navigate(`/projects/${project.id}/tasks/new`)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
          <TaskList tasks={project.tasks} />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Team Members</h3>
              <p className="text-sm text-muted-foreground">
                Project team members and their roles
              </p>
            </div>
            <Button onClick={() => navigate(`/projects/${project.id}/team/add`)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>
          <TeamList team={project.team} />
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Project Files</h3>
              <p className="text-sm text-muted-foreground">
                Access project documents and files
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No files uploaded yet
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Project Discussions</h3>
              <p className="text-sm text-muted-foreground">
                Team discussions and updates
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No discussions started yet
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
