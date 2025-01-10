import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart as BarChartIcon,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

// Sample data for the chart
const chartData = [
  { name: 'Jan', tasks: 40 },
  { name: 'Feb', tasks: 30 },
  { name: 'Mar', tasks: 45 },
  { name: 'Apr', tasks: 50 },
  { name: 'May', tasks: 35 },
  { name: 'Jun', tasks: 60 },
];

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      change: '+2.5%',
      trend: 'up',
      icon: BarChartIcon,
      color: 'text-blue-600'
    },
    {
      title: 'Team Members',
      value: '24',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Completed Tasks',
      value: '145',
      change: '+12.3%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      title: 'Pending Tasks',
      value: '8',
      change: '-3.4%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h4 className="text-2xl font-bold mt-2">{stat.value}</h4>
                </div>
                <div className={`${stat.color} bg-gray-100 p-3 rounded-full`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="text-green-500" size={20} />
                ) : (
                  <ArrowDownRight className="text-red-500" size={20} />
                )}
                <span className={`ml-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  vs last month
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const TasksOverview = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tasks Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentProjects = () => {
  const projects = [
    {
      name: 'Website Redesign',
      tasks: 12,
      completed: 8,
      status: 'in-progress'
    },
    {
      name: 'Mobile App Development',
      tasks: 24,
      completed: 20,
      status: 'completed'
    },
    {
      name: 'Database Migration',
      tasks: 8,
      completed: 2,
      status: 'in-progress'
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Projects</CardTitle>
        <Button variant="ghost" size="sm">
          View All
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h4 className="font-medium">{project.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.completed} of {project.tasks} tasks completed
                </p>
              </div>
              <Badge variant={project.status === 'completed' ? 'success' : 'warning'}>
                {project.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RecentActivity = () => {
  const activities = [
    {
      user: 'John Doe',
      action: 'completed task',
      target: 'Update user interface',
      time: '2 hours ago'
    },
    {
      user: 'Jane Smith',
      action: 'created project',
      target: 'Mobile App Phase 2',
      time: '4 hours ago'
    },
    {
      user: 'Mike Johnson',
      action: 'commented on',
      target: 'API Integration',
      time: '5 hours ago'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {activity.user.charAt(0)}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={() => navigate('/projects/new')}>
          Create New Project
        </Button>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TasksOverview />
        <div className="space-y-6">
          <RecentProjects />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
