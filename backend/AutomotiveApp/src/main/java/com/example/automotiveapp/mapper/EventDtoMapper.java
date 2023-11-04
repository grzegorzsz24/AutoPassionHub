package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Event;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.EventDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventDtoMapper {
    private final UserRepository userRepository;

    public static EventDto map(Event event) {
        EventDto eventDto = new EventDto();
        BeanUtils.copyProperties(event, eventDto);
        eventDto.setUser(event.getUser().getId());
        eventDto.setImageUrl("http://localhost:8080/images/" + event.getImage().getFileUrl());
        return eventDto;
    }

    public Event map(EventDto eventDto) {
        Event event = new Event();
        BeanUtils.copyProperties(eventDto, event);
        User user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        event.setUser(user);
        return event;
    }
}
