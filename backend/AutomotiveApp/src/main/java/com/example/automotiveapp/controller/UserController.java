package com.example.automotiveapp.controller;

import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.reponse.ApiImageResponse;
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
@CrossOrigin(origins = "http://127.0.0.1:5173/")
public class UserController {
    private final UserService userService;

    @PostMapping("/add-profile-picture")
    public ResponseEntity<?> addProfilePicture(@RequestParam MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Nie podano pliku");
        }
        String imageUrl = userService.saveOrUpdateProfilePicture(file);
        return ResponseEntity.ok(new ApiImageResponse("Zdjęcie profilowe zostało pomyślnie zaktualizowane",
                HttpStatus.OK, imageUrl));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteOwnAccount() {
        userService.deleteAccount();
        return ResponseEntity.ok(new ApiResponse("Twoje konto zostało pomyślnie usunięte", HttpStatus.OK));
    }

    @PatchMapping
    public ResponseEntity<?> updateUserDetails(@Valid @RequestBody Map<String, Object> fields, HttpServletResponse response) {
        userService.updateUser(fields, response);
        return ResponseEntity.ok(new ApiResponse("Dane zostały pomyślnie zaktualizowane", HttpStatus.OK));
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestParam String oldPassword, @RequestParam String newPassword, HttpServletResponse response) {
        userService.updatePassword(oldPassword, newPassword, response);
        return ResponseEntity.ok(new ApiResponse("Hasło zostało pomyślnie zmienione", HttpStatus.OK));
    }

    @PostMapping("/profile-visibility")
    public ResponseEntity<?> changeProfileVisibility(@RequestParam boolean visible) {
        userService.setProfileVisibility(visible);
        return ResponseEntity.ok(new ApiResponse("Widoczność profilu została zmieniona", HttpStatus.OK));
    }

}
