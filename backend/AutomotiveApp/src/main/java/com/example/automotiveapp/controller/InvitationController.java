package com.example.automotiveapp.controller;

import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.InvitationDto;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.reponse.ApiResponse;
import com.example.automotiveapp.service.InvitationService;
import com.example.automotiveapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user/invitations")
@RequiredArgsConstructor
public class InvitationController {
    private final InvitationService invitationService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    @GetMapping("/pending")
    public ResponseEntity<List<InvitationDto>> getPendingInvitations() {
        return ResponseEntity.ok(invitationService.getPendingInvitations());
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendInvitation(@RequestParam Long receiverId) {
        invitationService.sendInvitation(receiverId);

        UserDto user = userService.getUserById(receiverId).get();
        String receiverNickname = user.getNickname();
        messagingTemplate.convertAndSendToUser(receiverNickname,
                "/topic/notifications",
                "Masz nowe zaproszenie do znajomych");

        return ResponseEntity.ok(new ApiResponse("Zaproszenie zostało wysłane", HttpStatus.OK));
    }

    @PostMapping("/accept")
    public ResponseEntity<ApiResponse> acceptInvitation(@RequestParam Long invitationId) {
        invitationService.acceptInvitation(invitationId);
        return ResponseEntity.ok(new ApiResponse("Zaproszenie zostało zaakceptowane", HttpStatus.OK));
    }

    @PostMapping("/reject")
    public ResponseEntity<ApiResponse> rejectInvitation(@RequestParam("invitationId") Long invitationId) {
        invitationService.rejectInvitation(invitationId);
        return ResponseEntity.ok(new ApiResponse("Zaproszenie zostało odrzucone", HttpStatus.OK));
    }
}
