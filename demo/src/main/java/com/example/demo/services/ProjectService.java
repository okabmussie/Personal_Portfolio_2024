package com.example.demo.services;

import com.example.demo.models.Document;
import com.example.demo.models.Project;
import com.example.demo.repositories.DocumentRepository;
import com.example.demo.repositories.ProjectRepository;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;  // Import this for ResponseStatusException
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private DocumentRepository documentRepository;

    // Retrieve all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Retrieve a project by ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    // Add a new project
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    // Update an existing project
/*     public Project updateProject(Long id, Project projectDetails) {
        Project existingProject = projectRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found with id: " + id));

        existingProject.setName(projectDetails.getName());
        existingProject.setDescription(projectDetails.getDescription());
        existingProject.setTags(projectDetails.getTags());
        existingProject.setDocumentUrl(projectDetails.getDocumentUrl());

        return projectRepository.save(existingProject);
    }
 */
    public Project updateProject(Long id, Project projectDetails) {
        Project existingProject = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        System.out.println("Updating project: " + projectDetails.getName());
    
        existingProject.setName(projectDetails.getName());
        existingProject.setDescription(projectDetails.getDescription());
        existingProject.setTags(projectDetails.getTags());
        existingProject.setDocumentUrl(projectDetails.getDocumentUrl());
    
        return projectRepository.save(existingProject);
    }

    
    


    // // Delete a project by ID
    // public void deleteProject(Long id) {
    //     projectRepository.deleteById(id);
    // }

    public void deleteProject(Long id) {
        // First, delete related documents
        List<Document> documents = documentRepository.findByProjectId(id);
        for (Document document : documents) {
            documentRepository.delete(document);
        }
        // Then, delete the project
        projectRepository.deleteById(id);
    }
    

    // Search projects by name or tags
    public List<Project> searchProjects(String query) {
        return projectRepository.findByNameContainingOrTagsContaining(query, query);
    }

    // Upload a document to a project
    public void uploadDocument(Long projectId, MultipartFile file) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found with id: " + projectId));
    
        Document document = new Document();
        document.setFileName(file.getOriginalFilename());
        try {
            document.setContent(file.getBytes());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to process the uploaded file", e);
        }
        document.setProject(project);
        documentRepository.save(document);
    }

    // Retrieve all documents associated with a specific project
    public List<Document> getDocumentsByProject(Long projectId) {
        return documentRepository.findByProjectId(projectId);
    }
}
