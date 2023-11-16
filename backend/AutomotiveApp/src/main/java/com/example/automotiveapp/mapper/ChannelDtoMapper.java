package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Channel;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ChannelDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChannelDtoMapper {
    private final UserRepository userRepository;

    public static ChannelDto map(Channel channel) {
        ChannelDto channelDto = new ChannelDto();
        channelDto.setId(channel.getId());
        channelDto.setUsers(Set.of(channel.getSender().getId(), channel.getReceiver().getId()));
        return channelDto;
    }

    public Channel map(ChannelDto channelDto) {
        Channel channel = new Channel();
        List<Long> userIds = new ArrayList<>(channelDto.getUsers());
        User sender = userRepository.findById(userIds.get(0))
                        .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        User receiver = userRepository.findById(userIds.get(1))
                        .orElseThrow(() -> new ResourceNotFoundException("Nie znaleznio użytkownika"));
        channel.setSender(sender);
        channel.setReceiver(receiver);
        return channel;
    }
}
