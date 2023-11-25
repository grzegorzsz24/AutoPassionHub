package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDto {
    private Long senderId;
    private Long receiverId;
    private String message;
    private LocalDateTime createdAt;
    private Long channelId;
}
