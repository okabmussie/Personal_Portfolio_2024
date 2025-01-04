import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProject() {
  const { id } = useParams(); // Extract project ID from the URL
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: '',
    description: '',
    tags: '',
    documentUrl: '',
  });

  useEffect(() => {
    // Fetch the project data based on the ID from the URL
    fetch(`http://localhost:8081/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProject({
          name: data.name,
          description: data.description,
          tags: data.tags.join(', '), // Join tags into a string for editing
          documentUrl: data.documentUrl,
        });
      })
      .catch((error) => console.error('Error fetching project:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProject = {
      ...project,
      tags: project.tags.split(',').map((tag) => tag.trim()).filter(tag => tag),
    };

    fetch(`http://localhost:8081/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Project updated:', data);
        navigate('/');  // Redirect after updating
      })
      .catch((error) => console.error('Error updating project:', error));
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Tags (comma separated):
          <input
            type="text"
            value={project.tags}
            onChange={(e) => setProject({ ...project, tags: e.target.value })}
          />
        </label>
        <br />
        <label>
          Document URL:
          <input
            type="text"
            value={project.documentUrl}
            onChange={(e) => setProject({ ...project, documentUrl: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>

      <button onClick={() => navigate(`/delete/${id}`)}>Delete Project</button> {/* Delete button */}
      <button onClick={() => navigate(`/upload/${id}`)}>Upload Document</button> {/* Upload button */}
    </div>
  );
}

export default EditProject;
