package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Message;
import com.example.automotiveapp.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ChannelService channelService;
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> findMessages(Long senderId, Long receiverId) {
        Long channelId = channelService.getChannelId(senderId, receiverId, false);
        List<Message> messages = messageRepository.findAllByChannelId(channelId);
        if (messages.isEmpty()) {
            messages = new ArrayList<>();
        }
        return messages;
    }
}
