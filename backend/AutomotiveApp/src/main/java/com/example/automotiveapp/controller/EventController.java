package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.EventDto;
import com.example.automotiveapp.reponse.ApiResponse;
import com.example.automotiveapp.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventDto> addEvent(@ModelAttribute EventDto event) {
        EventDto savedEvent = eventService.saveEvent(event);
        URI savedEventURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedEvent.getId())
                .toUri();
        return ResponseEntity.created(savedEventURI).body(savedEvent);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EventDto>> getAllEvents(@RequestParam(defaultValue = "1") int page,
                                                       @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(eventService.getAllEvents(page, size));
    }

    @GetMapping
    public ResponseEntity<EventDto> getEventById(@RequestParam Long eventId) {
        return ResponseEntity.ok(eventService.getEventById(eventId).get());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteEvent(@RequestParam Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok(new ApiResponse("Wydarzenie zostało usunięte", HttpStatus.OK));
    }
}
