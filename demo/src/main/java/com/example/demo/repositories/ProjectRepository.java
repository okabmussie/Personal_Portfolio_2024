package com.example.demo.repositories;

import com.example.demo.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByNameContainingOrTagsContaining(String name, String tag);
}
