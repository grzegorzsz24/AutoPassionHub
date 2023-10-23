package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.service.UserService;
import com.example.automotiveapp.service.ValidationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatchException;
import com.github.fge.jsonpatch.mergepatch.JsonMergePatch;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
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

    @PatchMapping()
    public ResponseEntity<?> updateUserDetails(@Valid @RequestBody JsonMergePatch patch, HttpServletResponse response) {
        try {
            UserDto userDto = userService.getCurrentUser();
            UserDto userPatched = applyPatch(userDto, patch);
            userService.updateUser(userPatched, response);

        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.internalServerError().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestParam String password, HttpServletResponse response) {
        userService.updatePassword(password, response);
        return ResponseEntity.ok("Hasło zostało zmienione");
    }

    private UserDto applyPatch(UserDto userDto, JsonMergePatch patch) throws JsonPatchException, JsonProcessingException {
        JsonNode userNode = objectMapper.valueToTree(userDto);
        JsonNode userPatchedNode = patch.apply(userNode);
        JsonNode updatedFieldValue = userPatchedNode.get("email");
        if (updatedFieldValue.asText() != null && updatedFieldValue.asText().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            throw new BadRequestException("Podałes swój aktualny email");
        }
        else if (updatedFieldValue.asText() != null && userService.findUserByEmail(updatedFieldValue.asText()).isPresent()) {
            throw new BadRequestException("Użytkownik z podanym emailem już istnieje");
        }
        return objectMapper.treeToValue(userPatchedNode, UserDto.class);
    }

}
