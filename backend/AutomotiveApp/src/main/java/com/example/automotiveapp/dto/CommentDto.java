package com.example.automotiveapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {
    private Long id;
    @NotBlank
    private String content;
    private LocalDateTime commentedAt;
    private String user;
    private Long post;
    private Long forum;
    private String firstName;
    private String lastName;
    private String userImageUrl;
}
