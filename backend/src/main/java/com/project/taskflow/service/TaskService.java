package com.project.taskflow.service;

import com.project.taskflow.entity.Task;
import com.project.taskflow.entity.User;
import com.project.taskflow.repository.TaskRepository;
import com.project.taskflow.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository){
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task){
        if (task.getAssignedTo() != null && !task.getAssignedTo().trim().isEmpty()) {
            userRepository.findByEmail(task.getAssignedTo()).ifPresent(task::setUser);
        }
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id){
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task updateTask(Long id, Task updatedTask){

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setAssignedBy(updatedTask.getAssignedBy());
        task.setAssignedTo(updatedTask.getAssignedTo());

        if (updatedTask.getAssignedTo() != null && !updatedTask.getAssignedTo().trim().isEmpty()) {
            userRepository.findByEmail(updatedTask.getAssignedTo())
                    .ifPresentOrElse(task::setUser, () -> task.setUser(null));
        } else {
            task.setUser(null);
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByStatus(String status){
        return taskRepository.findByStatus(status);
    }

    public List<Task> getTasksByPriority(String priority){
        return taskRepository.findByPriority(priority);
    }

    public Page<Task> getTasks(
            int page,
            int size){

        Pageable pageable =
                PageRequest.of(page, size);

        return taskRepository.findAll(pageable);
    }

    public List<Task> getSortedTasks(){

        return taskRepository.findAll(
                Sort.by("priority"));
    }

    public List<Task> searchTask(
            String title){

        return taskRepository
                .findByTitleContaining(title);
    }

    public List<Task> getTasksByAssignedTo(
            String assignedTo){

        return taskRepository
                .findByAssignedTo(assignedTo);
    }

    public long getTaskCount(){

        return taskRepository.count();
    }
}