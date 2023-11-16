package com.example.automotiveapp.controller;

import com.example.automotiveapp.domain.Message;
import com.example.automotiveapp.dto.MessageDto;
import com.example.automotiveapp.mapper.MessageDtoMapper;
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
    private final MessageDtoMapper messageDtoMapper;

    @MessageMapping("/chat")
    public void submitMessage(@Payload MessageDto messageDto) {
        Message message = messageService.saveMessage(messageDtoMapper.map(messageDto));
        messagingTemplate.convertAndSendToUser(
                String.valueOf(messageDto.getReceiverId()),
                "/queue/messages", MessageDtoMapper.map(message)
        );
    }

    @GetMapping("/messages/{senderId}/{receiverId}")
    public ResponseEntity<?> getChatMessages(@PathVariable Long senderId, @PathVariable Long receiverId) {
        return ResponseEntity.ok(messageService.findMessages(senderId, receiverId));
    }
}
