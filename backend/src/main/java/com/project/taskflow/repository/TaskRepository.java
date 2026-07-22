package com.project.taskflow.repository;

import com.project.taskflow.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(String status);

    List<Task> findByPriority(String priority);

    List<Task> findByTitleContaining(String title);

    List<Task> findByAssignedTo(String assignedTo);
}