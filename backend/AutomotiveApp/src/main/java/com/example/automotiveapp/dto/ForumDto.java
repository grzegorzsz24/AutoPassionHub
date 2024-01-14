package com.example.automotiveapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ForumDto {
    private Long id;
    @NotBlank
    private String title;
    @NotBlank
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
    private Long userId;
}
