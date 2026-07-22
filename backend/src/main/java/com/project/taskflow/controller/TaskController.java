package com.project.taskflow.controller;

import com.project.taskflow.entity.Task;
import com.project.taskflow.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@Valid @RequestBody Task task){
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id){
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task){

        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){

        taskService.deleteTask(id);

        return "Task deleted successfully!";
    }

    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(
            @PathVariable String status){

        return taskService.getTasksByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    public List<Task> getTasksByPriority(
            @PathVariable String priority){

        return taskService.getTasksByPriority(priority);
    }

    @GetMapping("/page")
    public Page<Task> getTasks(
            @RequestParam int page,
            @RequestParam int size){

        return taskService.getTasks(page, size);
    }

    @GetMapping("/sort")
    public List<Task> getSortedTasks(){

        return taskService.getSortedTasks();
    }

    @GetMapping("/search")
    public List<Task> searchTask(
            @RequestParam String title){

        return taskService.searchTask(title);
    }

    @GetMapping("/assigned")
    public List<Task> getAssignedTasks(
            @RequestParam String user){

        return taskService
                .getTasksByAssignedTo(user);
    }

    @GetMapping("/count")
    public long getTaskCount(){

        return taskService.getTaskCount();
    }

    @GetMapping("/pending")
    public List<Task> pendingTasks(){

        return taskService
                .getTasksByStatus(
                        "PENDING"
                );
    }

    @GetMapping("/completed")
    public List<Task> completedTasks(){

        return taskService
                .getTasksByStatus(
                        "COMPLETED"
                );
    }
}