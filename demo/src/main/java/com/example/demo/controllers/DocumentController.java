package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import com.example.demo.models.Document;
import com.example.demo.services.DocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    /**
     * Upload a document and associate it with a project.
     *
     * @param file      The uploaded file.
     * @param projectId The ID of the project to associate the document with.
     * @return The saved document details.
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadDocument(@RequestParam("file") MultipartFile file, @RequestParam Long projectId) {
        try {
            Document uploadedDocument = documentService.saveDocument(file, projectId);
    
            // Constructing the URL
            String documentUrl = "http://localhost:8081/api/projects/" + projectId + "/documents/" + uploadedDocument.getId();
    
            // Prepare response body
            Map<String, String> response = new HashMap<>();
            response.put("message", "Document uploaded successfully");
            response.put("id", uploadedDocument.getId().toString());
            response.put("documentUrl", documentUrl); // Add document URL to response
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error uploading document: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    

    /**
     * Retrieve a document by its ID.
     *
     * @param projectId The ID of the project.
     * @param documentId The ID of the document.
     * @return The document details.
     */
    @CrossOrigin(origins = "http://localhost:3003")
    @GetMapping("/{projectId}/documents/{documentId}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long projectId, @PathVariable Long documentId) {
        Document document = documentService.getDocumentById(documentId);
        if (document == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return 404 if document not found
        }
        return ResponseEntity.ok(document);  // Return the document if found
    }
}
