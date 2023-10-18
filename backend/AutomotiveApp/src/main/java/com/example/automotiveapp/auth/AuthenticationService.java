package com.example.automotiveapp.auth;

import com.example.automotiveapp.config.JwtService;
import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Role;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.RoleRepository;
import com.example.automotiveapp.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final FileRepository fileRepository;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        Role role = new Role("USER");
        File file = new File();
        file.setFileUrl("default_profile_picture.jpg");

        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .nickname(registerRequest.getNickname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(Set.of(role))
                .file(file)
                .dateOfBirth(registerRequest.getDateOfBirth())
                .build();
        file.setUser(user);
        roleRepository.save(role);
        userRepository.save(user);
        fileRepository.save(file);
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
        cookie.setMaxAge(7 * 24 * 60 * 60);
//      cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/"); // Global
        response.addCookie(cookie);
        String userId = String.valueOf(user.getId());
        LocalDateTime expirationDate = LocalDateTime.now().plusDays(7).truncatedTo(ChronoUnit.SECONDS);

        return AuthenticationResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .imageUrl(user.getFile().getFileUrl())
                .cookieExpirationDate(expirationDate.toString())
                .userId(userId)
                .build();
    }
}
