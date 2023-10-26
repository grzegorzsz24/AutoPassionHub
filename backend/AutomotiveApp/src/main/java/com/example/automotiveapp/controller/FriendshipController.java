package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.reponse.ApiResponse;
import com.example.automotiveapp.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/friendship")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService friendshipService;

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getUserFriends(@RequestParam Long userId) {
        return ResponseEntity.ok(friendshipService.getUserFriends(userId));
    }

//    @PostMapping("/add")
//    public ResponseEntity<String> addFriend(@RequestParam Long friendId) {
//        friendshipService.addFriend(friendId);
//        return ResponseEntity.ok(new ApiResponse(""));
//    }

    @DeleteMapping("/remove")
    public ResponseEntity<ApiResponse> removeFriend(@RequestParam("friendId") Long friendId) {
        friendshipService.removeFriend(friendId);
        return ResponseEntity.ok(new ApiResponse("Użytkownik został usunięty z listy znajomych", HttpStatus.OK));
    }
}
