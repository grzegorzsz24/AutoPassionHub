package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Event;
import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.dto.EventDto;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.EventDtoMapper;
import com.example.automotiveapp.mapper.ForumDtoMapper;
import com.example.automotiveapp.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final EventDtoMapper eventDtoMapper;

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(EventDtoMapper::map)
                .toList();
    }

    public EventDto saveEvent(EventDto eventDto) {
        Event event = eventDtoMapper.map(eventDto);
        Event savedEvent = eventRepository.save(event);
        return EventDtoMapper.map(savedEvent);
    }

    public Optional<EventDto> getEventById(Long id) {
        Optional<EventDto> event = eventRepository.findById(id).map(EventDtoMapper::map);
        if (event.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono wydarzenia");
        }
        return event;
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
