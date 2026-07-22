package com.project.taskflow.config;

import com.project.taskflow.entity.Role;
import com.project.taskflow.entity.User;
import com.project.taskflow.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@taskflow.com").isEmpty()) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@taskflow.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("System administrator created successfully: admin@taskflow.com / admin123");
        }
    }
}
