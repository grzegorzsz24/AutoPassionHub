package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Channel;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ChannelDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelDtoMapper {
    private final UserRepository userRepository;

    public static ChannelDto map(Channel channel) {
        ChannelDto channelDto = new ChannelDto();
        channelDto.setId(channel.getId());
        channelDto.setSenderId(channel.getSender().getId());
        channelDto.setReceiverId(channel.getReceiver().getId());
        return channelDto;
    }

    public Channel map(ChannelDto channelDto) {
        Channel channel = new Channel();
        User sender = userRepository.findById(channelDto.getSenderId())
                        .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        User receiver = userRepository.findById(channelDto.getReceiverId())
                        .orElseThrow(() -> new ResourceNotFoundException("Nie znaleznio użytkownika"));
        channel.setSender(sender);
        channel.setReceiver(receiver);
        return channel;
    }
}
