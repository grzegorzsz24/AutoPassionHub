package com.example.automotiveapp.auth;

import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.ValidationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://127.0.0.1:5173/")
@CrossOrigin(origins = "http://127.0.0.1:5173", allowCredentials = "true")
@Slf4j
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final ValidationService validationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult result) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BadRequestException("Użytkownik o podanym emailu już istnieje!");
        }

        if (userRepository.findByNicknameIgnoreCase(registerRequest.getNickname()).isPresent()) {
            throw new BadRequestException("Użytkownik o podanym nicku już istnieje!");
        }
        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response, BindingResult result) {
        Optional<User> user = userRepository.findByEmail(authenticationRequest.getEmail());
        if (user.isEmpty() || !passwordEncoder.matches(authenticationRequest.getPassword(), user.get().getPassword())) {
            throw new ResourceNotFoundException("Nieprawidłowy email lub hasło!");
        }

        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest, response));
    }
}
