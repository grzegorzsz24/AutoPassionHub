package com.example.automotiveapp.reponse;

import com.example.automotiveapp.dto.EventDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class EventResponse {
    private List<EventDto> events;
    private Long eventsNumber;
}

