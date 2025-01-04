import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // This ensures the request is handled as a cross-origin request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="dashboard">
      <h2>Project Dashboard</h2>
      <Link to="/add-project">
        <button>Add New Project</button>
      </Link>
      <ul>
        {projects.length === 0 ? (
          <li>No projects found</li>
        ) : (
          projects.map((project) => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <Link to={`/edit-project/${project.id}`}>
                <button>Edit</button>
              </Link>
            </li>
          ))
        )}
      </ul>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Dashboard;
