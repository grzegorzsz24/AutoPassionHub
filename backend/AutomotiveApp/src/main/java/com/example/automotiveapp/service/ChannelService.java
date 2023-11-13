package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Channel;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.ChannelRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChannelService {
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    public Long getChannelId(Long senderId, Long receiverId, boolean createIfNotExists) {
        return channelRepository.findBySenderIdAndReceiverId(senderId, receiverId)
                .map(Channel::getId)
                .or(() -> {
                    if (!createIfNotExists) {
                        return Optional.empty();
                    }

                    Channel senderReceiver = Channel.builder()
                            .sender(userRepository.findById(senderId).get())
                            .receiver(userRepository.findById(receiverId).get())
                            .build();
//                    Channel receiverSender = Channel.builder()
//                            .sender(receiver)
//                            .receiver(sender)
//                            .build();
                    channelRepository.save(senderReceiver);
                    //channelRepository.save(receiverSender);
                    return Optional.of(senderReceiver.getId());
                }).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono kanału"));
    }

    public Optional<Channel> findChannelById(Long channelId) {
        return channelRepository.findById(channelId);
    }
}
