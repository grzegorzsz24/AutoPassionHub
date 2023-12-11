package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Event;
import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Report;
import com.example.automotiveapp.domain.ReportType;
import com.example.automotiveapp.dto.EventDto;
import com.example.automotiveapp.dto.ReportDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.EventDtoMapper;
import com.example.automotiveapp.mapper.ReportDtoMapper;
import com.example.automotiveapp.reponse.EventResponse;
import com.example.automotiveapp.repository.EventRepository;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.ReportRepository;
import com.example.automotiveapp.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final EventDtoMapper eventDtoMapper;
    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;
    private final ReportRepository reportRepository;
    private final ReportDtoMapper reportDtoMapper;

    public EventResponse getAllEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<EventDto> eventDtos = eventRepository.findAll(pageable)
                .stream()
                .map(EventDtoMapper::map)
                .toList();
        return new EventResponse(eventDtos, (long) eventDtos.size());
    }

    public EventDto saveEvent(EventDto eventDto) {
        Event event = eventDtoMapper.map(eventDto);
        Set<File> files = new HashSet<>();
        if (eventDto.getImage() != null) {
            List<String> savedImageNames = fileStorageService.saveImage(List.of(eventDto.getImage()));
            for (String imageName : savedImageNames) {
                File file = new File();
                file.setFileUrl(imageName);
                file.setEvent(event);
                files.add(file);
            }
            event.setImage(files.stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono zdjęcia")));
        }
        Event savedEvent = eventRepository.save(event);
        fileRepository.saveAll(files);
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
        EventDto eventDto = EventDtoMapper.map(eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NIe znaleziono wydarzenia")));

        StringBuilder modifiedImageUrl = new StringBuilder(eventDto.getImageUrl());
        modifiedImageUrl.delete(0, "http://localhost:8080/images/".length());
        fileStorageService.deleteFile(modifiedImageUrl.toString());
        eventRepository.deleteById(id);
    }

    public ReportDto reportEvent(ReportDto reportDto) {
        if (eventRepository.findById(reportDto.getReportTypeId()).isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono wydarzenia");
        }
        Optional<Report> report = reportRepository
                .findByReportTypeIdAndReportType(reportDto.getReportTypeId(), ReportType.EVENT_REPORT);
        if (report.isPresent()) {
            throw new BadRequestException("Wydarzenie już zostało zgłoszone");
        }

        return ReportDtoMapper.map(reportRepository.save(reportDtoMapper.map(reportDto)));
    }
}
