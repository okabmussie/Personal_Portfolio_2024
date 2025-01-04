// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function UploadDocument() {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false); // Track loading state
//   const [error, setError] = useState(null); // Track error state
//   const [uploadedFile, setUploadedFile] = useState(null); // Track uploaded file info
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }
//     setLoading(true); // Set loading state to true when upload starts
//     setError(null); // Clear any previous error

//     const formData = new FormData();
//     formData.append('file', file);

//     // Perform the file upload request
//     // fetch(`http://localhost:8081/api/projects/${id}/upload`, {
//     //   method: 'POST',
//     //   body: formData,
//     // })
//     //   .then((response) => {
//     //     if (!response.ok) {
//     //       throw new Error('Error uploading document');
//     //     }
//     //     return response.json(); // Assume the server returns some document info
//     //   })
//     //   .then((data) => {
//     //     setLoading(false); // Set loading state to false when upload finishes
//     //     setUploadedFile(data); // Store the uploaded file info
//     //     fetchDocuments(); // Fetch the updated documents for the project
//     //   })
//     //   .catch((error) => {
//     //     setLoading(false); // Set loading state to false in case of an error
//     //     setError('Error uploading document: ' + error.message);
//     //   });


//     fetch(`http://localhost:8081/api/projects/${id}/upload`, {
//       method: 'POST',
//       body: formData,  // Attach the file
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setLoading(false); 
//         navigate('/');  // Redirect after successful upload
//       })
//       .catch((error) => {
//         setLoading(false); 
//         setError('Error uploading document: ' + error.message);
//       });
    


//   };


  

//   const fetchDocuments = () => {
//     fetch(`http://localhost:8081/api/projects/${id}/documents`)
//       .then((response) => response.json())
//       .then((documents) => {
//         // Assuming documents is an array of uploaded files
//         setUploadedFile(documents[documents.length - 1]); // Display the latest uploaded document
//       })
//       .catch((error) => {
//         console.error('Error fetching documents:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Upload Document for Project {id}</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} required />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Uploading...' : 'Upload'}
//         </button>
//       </form>

//       {uploadedFile && (
//         <div>
//           <h3>Uploaded File:</h3>
//           <p>File Name: {uploadedFile.fileName}</p>
//           {/* If you store a URL for the file, you could display it like this: */}
//           <a href={`http://localhost:8081/api/projects/${id}/documents/${uploadedFile.id}`} target="_blank" rel="noopener noreferrer">
//             View Document
//           </a>
//         </div>
//       )}

//       {error && <div style={{ color: 'red' }}>{error}</div>}
//     </div>
//   );
// }

// export default UploadDocument;







// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function UploadDocument() {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false); // Track loading state
//   const [error, setError] = useState(null); // Track error state
//   const [uploadedFile, setUploadedFile] = useState(null); // Track uploaded file info
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }
//     setLoading(true); // Set loading state to true when upload starts
//     setError(null); // Clear any previous error

//     const formData = new FormData();
//     formData.append('file', file);

//     // Perform the file upload request
//     fetch(`http://localhost:8081/api/projects/${id}/upload`, {
//       method: 'POST',
//       body: formData,  // Attach the file
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setLoading(false); 
//         fetchDocuments();  // Fetch the documents after upload to get the latest one
//       })
//       .catch((error) => {
//         setLoading(false); 
//         setError('Error uploading document: ' + error.message);
//       });
//   };

//   const fetchDocuments = () => {
//     fetch(`http://localhost:8081/api/projects/${id}/documents`)
//       .then((response) => response.json())
//       .then((documents) => {
//         // Assuming documents is an array of uploaded files
//         setUploadedFile(documents[documents.length - 1]); // Display the latest uploaded document
//       })
//       .catch((error) => {
//         console.error('Error fetching documents:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Upload Document for Project {id}</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} required />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Uploading...' : 'Upload'}
//         </button>
//       </form>

//       {uploadedFile && (
//         <div>
//           <h3>Uploaded File:</h3>
//           <p>File Name: {uploadedFile.fileName}</p>
//           {/* If you store a URL for the file, you could display it like this: */}
//           <a href={`http://localhost:8081/api/projects/${id}/documents/${uploadedFile.id}`} target="_blank" rel="noopener noreferrer">
//             View Document
//           </a>
//         </div>
//       )}

//       {error && <div style={{ color: 'red' }}>{error}</div>}
//     </div>
//   );
// }

// export default UploadDocument;






// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// function UploadDocument() {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('file', file);

//     // Perform the file upload request
//     fetch(`http://localhost:8081/api/projects/${id}/upload`, {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Error uploading document');
//         }
//         return response.json(); // Parse the response body to JSON
//       })
//       .then((data) => {
//         setLoading(false); // Set loading to false when upload finishes

//         if (data && data.id) {
//           // Assuming the response contains the document object with an 'id' field
//           setUploadedFile(data); // Store the uploaded file info (document data)
//         } else {
//           throw new Error('No document ID returned');
//         }
//       })
//       .catch((error) => {
//         setLoading(false); // Set loading to false in case of an error
//         setError('Error uploading document: ' + error.message); // Show error message
//       });
//   };

//   return (
//     <div>
//       <h1>Upload Document</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit" disabled={loading}>
//           Upload
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {loading && <p>Uploading...</p>}
//       {uploadedFile && (
//         <div>
//           <h3>Uploaded File:</h3>
//           <p>File Name: {uploadedFile.fileName}</p>
//           {/* Link to view the uploaded document */}
//           <a
//             href={`http://localhost:8081/api/projects/${id}/documents/${uploadedFile.id}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             View Document
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadDocument;






// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// function UploadDocument() {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('file', file);

//     // Perform the file upload request
//     fetch(`http://localhost:8081/api/projects/${id}/upload`, {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Error uploading document');
//         }
//         return response.json(); // Parse the response body to JSON
//       })
//       .then((data) => {
//         setLoading(false); // Set loading to false when upload finishes

//         if (data && data.id) {
//           // Assuming the response contains the document object with an 'id' field
//           setUploadedFile(data); // Store the uploaded file info (document data)
//           console.log("Uploaded file:", data); // Debugging line

//           // Fetch the document details after upload
//           fetch(`http://localhost:8081/api/projects/${id}/documents/${data.id}`)
//             .then((response) => response.json())
//             .then((docData) => {
//               // Optionally update the state or perform further actions with docData
//               console.log("Fetched document: ", docData);
//               setUploadedFile(docData); // Update state with fetched document details
//             })
//             .catch((err) => {
//               console.error("Error fetching document details: ", err);
//             });
//         } else {
//           throw new Error('No document ID returned');
//         }
//       })
//       .catch((error) => {
//         setLoading(false); // Set loading to false in case of an error
//         setError('Error uploading document: ' + error.message); // Show error message
//       });
//   };

//   return (
//     <div>
//       <h1>Upload Document</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit" disabled={loading}>
//           Upload
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {loading && <p>Uploading...</p>}
//       {uploadedFile && (
//         <div>
//           <h3>Uploaded File:</h3>
//           <p>File Name: {uploadedFile.file_name}</p> {/* Ensure you're using 'file_name' */}
//           {/* Link to view the uploaded document */}
//           <a
//             href={`http://localhost:8081/api/projects/${id}/documents/${uploadedFile.id}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             View Document
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadDocument;







import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function UploadDocument() {
  const { id } = useParams(); // Get the project ID from the URL
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    // Perform the file upload request
    fetch(`http://localhost:8080/api/projects/${id}/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error uploading document');
        }
        return response.json(); // Parse the response body to JSON
      })
      .then((data) => {
        setLoading(false); // Set loading to false when upload finishes

        if (data && data.id) {
          // Assuming the response contains the document object with an 'id' field
          setUploadedFile(data); // Store the uploaded file info (document data)
          console.log("Uploaded file:", data); // Debugging line

          // Fetch the document details after upload (if needed)
          fetch(`http://localhost:8080/api/projects/${id}/documents/${data.id}`)
            .then((response) => response.json())
            .then((docData) => {
              console.log("Fetched document: ", docData);
              setUploadedFile(docData); // Update state with fetched document details
            })
            .catch((err) => {
              console.error("Error fetching document details: ", err);
            });
        } else {
          throw new Error('No document ID returned');
        }
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of an error
        setError('Error uploading document: ' + error.message); // Show error message
      });
  };

  return (
    <div>
      <h1>Upload Document</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          Upload
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Uploading...</p>}
      {uploadedFile && (
        <div>
          <h3>Uploaded File:</h3>
          <p>File Name: {uploadedFile.fileName}</p> {/* Adjusted to match backend field name */}
          {/* Link to view the uploaded document */}
          <a
            href={`http://localhost:8080/api/projects/${id}/documents/${uploadedFile.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Document
          </a>
        </div>
      )}
    </div>
  );
}

export default UploadDocument;

