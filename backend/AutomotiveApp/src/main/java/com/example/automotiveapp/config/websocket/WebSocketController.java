package com.example.automotiveapp.config.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/invitations")
    @SendTo("/topic/invitations")
    public String handleInvitations(String message) {
        return message;
    }
}
