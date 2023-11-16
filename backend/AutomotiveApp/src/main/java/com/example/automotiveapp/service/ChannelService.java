package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Channel;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ChannelDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ChannelDtoMapper;
import com.example.automotiveapp.repository.ChannelRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChannelService {
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    public Long getChannelId(Long senderId, Long receiverId) {
        return channelRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(senderId, receiverId)
                .map(Channel::getId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono kanału"));
    }

    public Optional<Channel> findChannelById(Long channelId) {
        return channelRepository.findById(channelId);
    }

    public List<ChannelDto> findUserChats() {
        User user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        return channelRepository.findAllBySenderIdOrReceiverId(user.getId(), user.getId())
                .stream()
                .map(ChannelDtoMapper::map)
                .toList();
    }
}
