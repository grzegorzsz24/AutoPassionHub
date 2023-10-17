package com.example.automotiveapp.auth;

import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.ValidationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final ValidationService validationService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult result) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent() &&
                userRepository.findByNicknameIgnoreCase(registerRequest.getNickname()).isPresent()) {
            return ResponseEntity.badRequest().body("Użytkownik o podanym emailu lub nicknamie już istnieje!");
        }
        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest, response));
    }
}
