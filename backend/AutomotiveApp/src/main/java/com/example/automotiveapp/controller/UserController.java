package com.example.automotiveapp.controller;

import com.example.automotiveapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        userService.saveOrUpdateProfilePicture(file);
        return ResponseEntity.ok("Zdjęcie profilowe zostało pomyślnie zaktualizowane");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteOwnAccount() {
        userService.deleteAccount();
        return ResponseEntity.ok("Twoje konto zostało pomyślnie usunięte");
    }

}
