package com.example.automotiveapp.auth;

import com.example.automotiveapp.service.ValidationService;
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

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody AuthenticationRequest authenticationRequest, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }
}
