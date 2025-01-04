import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log('useEffect triggered with id:', id);  // Debug log
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    
    if (confirmDelete) {
      const controller = new AbortController();
      const signal = controller.signal;

      setLoading(true);
      setError(null);

      fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
        signal: signal,
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(`Failed to delete the project: ${text}`);
            });
          }
          setSuccess(true);
          navigate('/');
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setError('Error deleting project: ' + error.message);
            console.error('Error during delete:', error);  // Debug log for fetch error
          }
        })
        .finally(() => {
          setLoading(false);
        });

      return () => {
        controller.abort();
      };
    } else {
      navigate('/');
    }
  }, [id, navigate]);  // Only trigger when `id` or `navigate` changes

  return (
    <div>
      {loading && <p>Deleting project...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Project deleted successfully!</p>}
    </div>
  );
}

export default DeleteProject;
