package com.example.automotiveapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDto {
    private Long senderId;
    private Long receiverId;
    @NotBlank
    private String message;
    private LocalDateTime createdAt;
    private Long channelId;
}
