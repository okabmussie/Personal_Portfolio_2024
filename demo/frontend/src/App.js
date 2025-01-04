import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';
import EditProject from './Components/EditProject';
import DeleteProject from './Components/DeleteProject';
import UploadDocument from './Components/UploadDocument';
import './index.css'; // Your CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My Portfolio</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path="/delete/:id" element={<DeleteProject />} /> {/* Delete project route */}
            <Route path="/upload/:id" element={<UploadDocument />} /> {/* Upload document route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
