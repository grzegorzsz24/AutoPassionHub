package com.example.automotiveapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String city;
    @Column(name = "event_date", columnDefinition = "DATETIME")
    private LocalDateTime eventDate;
    private String description;

    @OneToOne(mappedBy = "event", cascade = CascadeType.ALL)
    private File image;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
