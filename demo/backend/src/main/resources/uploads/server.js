const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');  // For handling file uploads
const fs = require('fs');          // For file system operations
const app = express();

// Use CORS middleware to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:3003' // Frontend URL (replace with your actual URL if needed)
}));

// Serve static files (like favicon, CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file upload handling
const upload = multer({ dest: 'uploads/' });  // Upload files to the 'uploads' directory

// Upload a document for project 39
app.post('/api/projects/39/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send({ message: 'File uploaded successfully', file: req.file });
});

// Fetch a document based on its ID
app.get('/api/projects/39/documents/:id', (req, res) => {
    const documentId = req.params.id;  // Get the document ID from URL
    const filePath = path.join(__dirname, 'uploads', `${documentId}.pdf`);  // Assuming PDFs

    fs.exists(filePath, (exists) => {
        if (exists) {
            res.sendFile(filePath);  // Send the file to the client
        } else {
            res.status(404).send('Document not found');  // Return 404 if not found
        }
    });
});

// Start the server
app.listen(8081, () => {
    console.log('Server running on port 8081');
});
