package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ArticleDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime publishedAt;
    private String user;
}
