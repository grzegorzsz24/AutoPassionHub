package com.example.automotiveapp.dto;

import com.example.automotiveapp.domain.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
