package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatchException;
import com.github.fge.jsonpatch.mergepatch.JsonMergePatch;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ObjectMapper objectMapper;

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

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUserDetails(@PathVariable Long id, @RequestBody JsonMergePatch patch) {
        try {
            UserDto userDto = userService.findUserById(id).orElseThrow();
            UserDto userPatched = applyPatch(userDto, patch);
            userService.updateUser(userPatched);

        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.internalServerError().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    private UserDto applyPatch(UserDto userDto, JsonMergePatch patch) throws JsonPatchException, JsonProcessingException {
        JsonNode userNode = objectMapper.valueToTree(userDto);
        JsonNode userPatchedNode = patch.apply(userNode);
        return objectMapper.treeToValue(userPatchedNode, UserDto.class);
    }

}
