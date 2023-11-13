package com.example.automotiveapp.controller;

import com.example.automotiveapp.domain.Message;
import com.example.automotiveapp.service.ChannelService;
import com.example.automotiveapp.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final MessageService messageService;
    private final ChannelService channelService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void submitMessage(@Payload Message message) {
        Long chatId = channelService.getChannelId(message.getSender().getId(), message.getReceiver().getId(), true);
        message.setChannel(channelService.findChannelById(chatId).get());

        Message savedMessage = messageService.saveMessage(message);
        messagingTemplate.convertAndSendToUser(
                String.valueOf(message.getReceiver().getId()),
                "/queue/messages", savedMessage
        );
    }

    @GetMapping("/messages/{senderId}/{receiverId}")
    public ResponseEntity<?> getChatMessages(@PathVariable Long senderId, @PathVariable Long receiverId) {
        return ResponseEntity.ok(messageService.findMessages(senderId, receiverId));
    }
}
