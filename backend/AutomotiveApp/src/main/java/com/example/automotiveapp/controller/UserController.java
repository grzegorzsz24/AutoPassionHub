package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.reponse.ApiImageResponse;
import com.example.automotiveapp.reponse.ApiResponse;
import com.example.automotiveapp.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
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

//    @GetMapping("/search")
//    public ResponseEntity<List<UserDto>> searchAllUsers(@RequestParam String nickname,
//                                                        @RequestParam(defaultValue = "1") int page,
//                                                        @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page - 1, size);
//        return ResponseEntity.ok(userService.searchUsers(nickname, pageable));
//    }

    @GetMapping("/{nickname}")
    public ResponseEntity<UserDto> getUserByNickname(@PathVariable String nickname) {
        return ResponseEntity.ok(userService.findUserByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika o podanym nickname")));
    }

    @GetMapping("/id/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.findUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika o podanym nickname")));
    }
}
