package com.example.automotiveapp.dto;

import com.example.automotiveapp.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventDto {
    private Long id;
    private String title;
    private String city;
    private LocalDateTime eventDate;

    private Long user;
}