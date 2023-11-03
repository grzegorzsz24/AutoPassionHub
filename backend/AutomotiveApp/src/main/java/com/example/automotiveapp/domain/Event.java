package com.example.automotiveapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String city;
    @Column(name = "event_date", columnDefinition = "DATE")
    private Date eventDate;
    private String description;

    @OneToOne(mappedBy = "event", cascade = CascadeType.ALL)
    private File image;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
