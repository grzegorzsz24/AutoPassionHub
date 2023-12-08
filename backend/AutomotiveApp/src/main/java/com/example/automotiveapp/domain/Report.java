package com.example.automotiveapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long reportTypeId;
    @Enumerated(EnumType.STRING)
    private ReportType reportType;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private boolean isRead;
}

