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
        return new AuthResponse(token);

    }

    public AuthResponse login(AuthLoginDTO data) throws NotFoundException {

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                data.getEmail(),
                data.getPassword());

        authManager.authenticate(token);

        User user = userRepository.findByEmail(data.getEmail()).orElseThrow(
                () -> new NotFoundException("Incorrect login details"));
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }
}