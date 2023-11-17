package com.example.automotiveapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_triggered_id")
    private User userTriggered;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User recevier;
    private String content;
    private LocalDateTime createdAt;
    private boolean isRead;
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    private Long entityId;
}
