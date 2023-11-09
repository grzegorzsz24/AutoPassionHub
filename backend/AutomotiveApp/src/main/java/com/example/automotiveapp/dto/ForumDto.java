package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ForumDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String user;
    private int commentsNumber;
    private String firstName;
    private String lastName;
    private String userImageUrl;
    private String carBrand;
    private String carModel;
    private boolean isSaved;
}
