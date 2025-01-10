import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSaveProject = async () => {
    try {
      const response = await axios.post('/api/projects', {
        title,
        description,
        startDate,
        endDate,
      });

      if (response.status === 201) {
        setSuccess('Project saved successfully!');
        setError('');
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
      }
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Failed to save project. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleSaveProject}>Save Project</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateProject;
