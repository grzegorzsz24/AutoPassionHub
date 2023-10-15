package com.example.automotiveapp.controller;

import com.example.automotiveapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/add-profile-picture")
    public ResponseEntity<String> addProfilePicture(@RequestParam MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Wybrany plik jest pusty");
        }
        userService.saveProfilePicture(file);
        return ResponseEntity.ok("Zdjęcie profilowe zostało pomyślnie zaktualizowane");
    }
}
