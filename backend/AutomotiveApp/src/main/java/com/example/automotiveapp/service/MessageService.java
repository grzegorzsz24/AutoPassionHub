package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Message;
import com.example.automotiveapp.dto.MessageDto;
import com.example.automotiveapp.mapper.MessageDtoMapper;
import com.example.automotiveapp.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ChannelService channelService;

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

//    public List<Message> findMessages(Long senderId, Long receiverId) {
//        Long channelId = channelService.getChannelId(senderId, receiverId);
//        List<Message> messages = messageRepository.findAllByChannelId(channelId);
//        if (messages.isEmpty()) {
//            messages = new ArrayList<>();
//        }
//        return messages;
//    }

    public List<MessageDto> findChatMessages(Long chatId) {
        return messageRepository.findAllByChannelId(chatId)
                .stream()
                .map(MessageDtoMapper::map)
                .toList();
    }
}
