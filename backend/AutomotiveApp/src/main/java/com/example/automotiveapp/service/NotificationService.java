package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Notification;
import com.example.automotiveapp.domain.NotificationDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.NotificationDtoMapper;
import com.example.automotiveapp.repository.NotificationRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationDtoMapper notificationDtoMapper;
    public NotificationDto saveNotification(NotificationDto notificationDto) {
        Notification notification = notificationRepository.save(notificationDtoMapper.map(notificationDto));
        return NotificationDtoMapper.map(notification);
    }

    public List<NotificationDto> findUserNotifications() {
        return notificationRepository.findAllByRecevierEmail(SecurityUtils.getCurrentUserEmail())
                .stream()
                .map(NotificationDtoMapper::map)
                .toList();
    }

    public NotificationDto setNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono powiadomienia"));
        notification.setRead(true);
        notificationRepository.save(notification);
        return NotificationDtoMapper.map(notification);
    }
}
