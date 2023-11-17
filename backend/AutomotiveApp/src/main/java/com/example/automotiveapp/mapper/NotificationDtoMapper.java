package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Notification;
import com.example.automotiveapp.domain.NotificationDto;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class NotificationDtoMapper {
    private final UserRepository userRepository;

    public static NotificationDto map(Notification notification) {
        NotificationDto notificationDto = new NotificationDto();
        BeanUtils.copyProperties(notification, notificationDto);
        notificationDto.setUserTriggeredId(notification.getUserTriggered().getId());
        notificationDto.setReceiverId(notification.getRecevier().getId());
        notificationDto.setType(String.valueOf(notification.getType()));
        return notificationDto;
    }

    public Notification map(NotificationDto notificationDto) {
        Notification notification = new Notification();
        BeanUtils.copyProperties(notificationDto, notification);
        User userTriggered = userRepository.findById(notificationDto.getUserTriggeredId())
                        .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        User receiver = userRepository.findById(notificationDto.getReceiverId())
                        .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        notification.setUserTriggered(userTriggered);
        notification.setRecevier(receiver);
        notification.setCreatedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        notification.setType(notification.getType());
        return notification;
    }
}
