package com.example.automotiveapp.controller;

import com.example.automotiveapp.reponse.ApiResponse;
import com.example.automotiveapp.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
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

    @PatchMapping
    public ResponseEntity<?> updateUserDetails(@Valid @RequestBody Map<String, Object> fields, HttpServletResponse response) {
        userService.updateUser(fields, response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestParam String oldPassword, @RequestParam String newPassword, HttpServletResponse response) {
        userService.updatePassword(oldPassword, newPassword, response);
        return ResponseEntity.ok(new ApiResponse("Hasło zostało pomyślnie zmienione", HttpStatus.OK));
    }
}
