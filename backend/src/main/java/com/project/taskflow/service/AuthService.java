package com.project.taskflow.service;

import com.project.taskflow.dto.AuthResponse;
import com.project.taskflow.dto.LoginRequest;
import com.project.taskflow.entity.Role;
import com.project.taskflow.entity.User;
import com.project.taskflow.repository.UserRepository;
import com.project.taskflow.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder encoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public User register(User user) {

        if(userRepository.findByEmail(
                user.getEmail()).isPresent()){

            throw new RuntimeException(
                    "Email already exists!"
            );
        }

        user.setPassword(
                encoder.encode(
                        user.getPassword()
                )
        );

        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        if (!encoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid Credentials"
            );
        }

        String token = jwtService.generateToken(
                user.getEmail()
        );

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getName(),
                user.getRole().name()
        );
    }
}