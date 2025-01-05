package com.example.demo.services;

import com.example.demo.models.Document;
import com.example.demo.models.Project;
import com.example.demo.repositories.DocumentRepository;
import com.example.demo.repositories.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ProjectRepository projectRepository;

    public DocumentService(DocumentRepository documentRepository, ProjectRepository projectRepository) {
        this.documentRepository = documentRepository;
        this.projectRepository = projectRepository;
    }

    /**
     * Saves the uploaded document to the database and associates it with the project.
     */
    public Document saveDocument(MultipartFile file, Long projectId) {
        // Fetch the associated project
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));
    
        // Create and save a new document
        Document document = new Document();
        document.setFileName(file.getOriginalFilename());
        document.setProject(project);  // Ensure the document is linked to the project
    
        // Save the file content as bytes
        try {
            document.setContent(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file content", e);
        }
    
        // Save document in the repository
        document = documentRepository.save(document);  // Save and return the document with the generated ID
        return document;
    }
    

    /**
     * Retrieves documents associated with a given project ID.
     */
    public List<Document> getDocumentsByProject(Long projectId) {
        // Fetch documents associated with the project ID
        return documentRepository.findByProjectId(projectId);
    }

    /**
     * Retrieves a document by its ID (used for serving the file content).
     */
    public Document getDocumentById(Long documentId) {
        return documentRepository.findById(documentId)
                .orElseThrow(() -> new IllegalArgumentException("Document not found with ID: " + documentId));
    }
}
