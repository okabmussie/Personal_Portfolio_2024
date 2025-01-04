import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProject() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      name,
      description,
      tags: tags.split(',').map(tag => tag.trim())  // Convert tags to an array
    };

    // Send POST request to add the new project
    fetch('http://localhost:8080/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
      mode: 'cors',
    })
      .then((response) => response.json())
      .then(() => {
        // After successfully adding the project, navigate back to the dashboard
        navigate('/');
      })
      .catch((error) => console.error('Error adding project:', error));
  };

  return (
    <div>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Tags (comma separated):
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
