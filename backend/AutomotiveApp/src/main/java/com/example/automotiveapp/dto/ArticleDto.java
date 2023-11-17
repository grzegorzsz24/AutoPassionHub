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
    private boolean isLiked;
    private boolean isSaved;
    private int likesNumber;
    private String firstName;
    private String lastName;
    private String userImageUrl;
    private Long userId;
}
