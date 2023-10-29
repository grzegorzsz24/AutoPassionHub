package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Event;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.EventDto;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventDtoMapper {
    private final UserRepository userRepository;

    public static EventDto map(Event event) {
        EventDto eventDto = new EventDto();
        BeanUtils.copyProperties(event, eventDto);
        eventDto.setUser(event.getUser().getId());
        return eventDto;
    }

    public Event map(EventDto eventDto) {
        Event event = new Event();
        BeanUtils.copyProperties(eventDto, event);
        Optional<User> user = userRepository.findById(eventDto.getUser());
        user.ifPresent(event::setUser);
        return event;
    }
}
