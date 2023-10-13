package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {
    private Long id;
    private String content;
    private LocalDateTime commentedAt;
    private String user;
    private Long post;
}
