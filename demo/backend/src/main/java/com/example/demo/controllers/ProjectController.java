package com.example.demo.controllers;

import com.example.demo.models.Document;
import com.example.demo.models.Project;
import com.example.demo.services.ProjectService;
import com.example.demo.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private DocumentService documentService;

    // Dashboard overview of projects
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardOverview() {
        List<Project> projects = projectService.getAllProjects();
        long totalProjects = projects.size();
        Set<String> tags = new HashSet<>();
        for (Project project : projects) {
            tags.addAll(project.getTags());
        }

        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("totalProjects", totalProjects);
        dashboardData.put("tags", tags);
        dashboardData.put("projects", projects);
        return dashboardData;
    }

    // Get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Get a project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Add a new project
    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody Project project) {
        Project savedProject = projectService.addProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
    }

    // Update a project
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        try {
            Project updatedProject = projectService.updateProject(id, projectDetails);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a project
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.noContent().build(); // 204 No Content - successfully deleted
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting project: " + e.getMessage());
        }
    }

    // Search projects by name or tags
    @GetMapping("/search")
    public List<Project> searchProjects(@RequestParam String query) {
        return projectService.searchProjects(query);
    }


/*     // Upload a document for a project
    @PostMapping("/{projectId}/upload")
    public ResponseEntity<Map<String, String>> uploadDocument(@PathVariable Long projectId, @RequestParam("file") MultipartFile file) {
        try {
            documentService.saveDocument(file, projectId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Document uploaded successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error uploading document: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    } */


    // @CrossOrigin(origins = "http://localhost:3003")
    // @PostMapping("/{projectId}/upload")
    // public ResponseEntity<Map<String, String>> uploadDocument(@PathVariable Long projectId, @RequestParam("file") MultipartFile file) {
    //     try {
    //         documentService.saveDocument(file, projectId);
    //         Map<String, String> response = new HashMap<>();
    //         response.put("message", "Document uploaded successfully");
    //         return ResponseEntity.ok(response);
    //     } catch (Exception e) {
    //         Map<String, String> response = new HashMap<>();
    //         response.put("message", "Error uploading document: " + e.getMessage());
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    //     }
    // }

    @CrossOrigin(origins = "http://localhost:3003")
    @PostMapping("/{projectId}/upload")
    public ResponseEntity<Map<String, String>> uploadDocument(@PathVariable Long projectId, @RequestParam("file") MultipartFile file) {
        try {
            Document uploadedDocument = documentService.saveDocument(file, projectId); // Save document and get it back
            Map<String, String> response = new HashMap<>();
            response.put("message", "Document uploaded successfully");
            response.put("id", uploadedDocument.getId().toString()); // Add document ID in response
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error uploading document: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    




    // // Get all documents associated with a project
    // @GetMapping("/{projectId}/documents")
    // public ResponseEntity<List<Document>> getDocumentsByProject(@PathVariable Long projectId) {
    //     List<Document> documents = documentService.getDocumentsByProject(projectId);
    //     if (documents.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    //     }
    //     return ResponseEntity.ok(documents);
    // }



    @CrossOrigin(origins = "http://localhost:3003")
    //@GetMapping("/{projectId}/documents")
    @GetMapping("/{projectId}/documents/{documentId}")
    public ResponseEntity<List<Document>> getDocumentsByProject(@PathVariable Long projectId) {
        List<Document> documents = documentService.getDocumentsByProject(projectId);
        if (documents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(documents);
   }


    // Exception handler for global errors
    @RestControllerAdvice
    public class GlobalExceptionHandler {
        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}
