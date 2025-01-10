// src/components/TaskManager.tsx
import React, { useState, useEffect } from 'react';
import { addTask, fetchTasks, deleteTask } from '../services/api';

// Define the type for a Task
interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskManager: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]); // Specify the type as an array of Task
  const [taskData, setTaskData] = useState<Omit<Task, 'id'>>({ title: '', description: '' });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks(projectId);
        setTasks(response.data); // Ensure the API returns data matching the Task type
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    getTasks();
  }, [projectId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addTask(projectId, taskData);
      setTasks([...tasks, response.data]);
      setTaskData({ title: '', description: '' });
      alert('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleAddTask}>
        <label>
          Task Title:
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Task</button>
      </form>

      <h2>Tasks for Project ID {projectId}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
 