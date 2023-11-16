package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Channel;
import com.example.automotiveapp.domain.Message;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.MessageDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.ChannelRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.ChannelService;
import com.example.automotiveapp.service.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageDtoMapper {
    private final UserRepository userRepository;
    private final ChannelService channelService;
    private final ChannelRepository channelRepository;

    public static MessageDto map(Message message) {
        MessageDto messageDto = new MessageDto();
        BeanUtils.copyProperties(message, messageDto);
        messageDto.setSenderId(message.getSender().getId());
        messageDto.setReceiverId(message.getReceiver().getId());
        messageDto.setChannelId(message.getChannel().getId());
        return messageDto;
    }

    public Message map(MessageDto messageDto) {
        Message message = new Message();
        BeanUtils.copyProperties(messageDto, message);
        User sender = userRepository.findById(messageDto.getSenderId())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        User receiver = userRepository.findById(messageDto.getReceiverId())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        message.setSender(sender);
        message.setReceiver(receiver);
        Long channelId = channelService.getChannelId(sender.getId(), receiver.getId(), true);
        message.setChannel(channelRepository.findById(channelId).get());
        message.setCreatedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        return message;
    }
}
