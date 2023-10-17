package com.example.automotiveapp.auth;

import com.example.automotiveapp.config.JwtService;
import com.example.automotiveapp.domain.Role;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.repository.RoleRepository;
import com.example.automotiveapp.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        Role role = new Role("USER");
        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .nickname(registerRequest.getNickname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(Set.of(role))
                .dateOfBirth(registerRequest.getDateOfBirth())
                .build();
        roleRepository.save(role);
        userRepository.save(user);
        return AuthenticationResponse.builder().build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );
        var user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        var jwtToken = jwtService.generateToken(user);
        Cookie cookie = new Cookie("jwt", jwtToken);
        cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
//      cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/"); // Global
        response.addCookie(cookie);
        String userId = String.valueOf(user.getId());
        LocalDateTime expirationDate = LocalDateTime.now().plusDays(7);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        String formattedDate = expirationDate.format(formatter);
        return AuthenticationResponse.builder().cookieExpirationDate(formattedDate).userId(userId).build();
    }
}
