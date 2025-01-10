import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';

const AddProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [availableUsers, setAvailableUsers] = useState<string[]>([]);
  const [availableTasks, setAvailableTasks] = useState<string[]>([]);

  // Fetch users and tasks from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await Promise.resolve(['John Doe', 'Jane Smith', 'Mike Johnson']);
      setAvailableUsers(users);
    };

    const fetchTasks = async () => {
      const tasks = await Promise.resolve(['Task A', 'Task B', 'Task C']);
      setAvailableTasks(tasks);
    };

    fetchUsers();
    fetchTasks();
  }, []);

  const addTask = (task: string) => {
    if (!tasks.includes(task)) setTasks([...tasks, task]);
  };

  const removeTask = (task: string) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const addMember = (member: string) => {
    if (!teamMembers.includes(member)) setTeamMembers([...teamMembers, member]);
  };

  const removeMember = (member: string) => {
    setTeamMembers(teamMembers.filter((m) => m !== member));
  };

  const handleSubmit = async () => {
    const projectData = {
      title,
      description,
      startDate,
      dueDate,
      tasks,
      teamMembers,
    };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        alert('Project saved successfully!');
      } else {
        alert('Failed to save the project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('An error occurred while saving the project.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Add New Project</h2>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <select
            onChange={(e) => addTask(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a task</option>
            {availableTasks.map((task, index) => (
              <option key={index} value={task}>
                {task}
              </option>
            ))}
          </select>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-4">
                <p>{task}</p>
                <Button variant="ghost" size="icon" onClick={() => removeTask(task)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <select
            onChange={(e) => addMember(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a team member</option>
            {availableUsers.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
          <div className="space-y-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-4">
                <p>{member}</p>
                <Button variant="ghost" size="icon" onClick={() => removeMember(member)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit}>Save Project</Button>
    </div>
  );
};

export default AddProject;
