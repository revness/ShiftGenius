package io.nology.shiftgeniusapi.auth;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.nology.shiftgeniusapi.common.exceptions.NotFoundException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthService(PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authManager) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    public AuthResponse register(AuthRegisterDTO data) {
        User user = new User(data.getUserName(),
                data.getEmail(),
                passwordEncoder.encode(data.getPassword()));

        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUserName(), user.getEmail());

    }

    public AuthResponse login(AuthLoginDTO data) throws NotFoundException {
        // Authenticate the user with email and password
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                data.getEmail(), // Using email for authentication
                data.getPassword());

        authManager.authenticate(token);

        // Find the user by email
        User user = userRepository.findByEmail(data.getEmail()).orElseThrow(
                () -> new NotFoundException("Incorrect login details"));

        // Generate the JWT token
        String jwtToken = jwtService.generateToken(user);

        // Return the JWT token, userName (from user.getUserName()), and email (from
        // user.getEmail())
        return new AuthResponse(jwtToken, user.getUserName(), user.getEmail());
    }

}