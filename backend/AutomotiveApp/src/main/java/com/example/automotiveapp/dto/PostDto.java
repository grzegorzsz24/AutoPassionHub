package com.example.automotiveapp.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostDto {
    private Long id;
    @NotEmpty
    private String content;
    private LocalDateTime postedAt;
    private boolean isLiked;
    private List<MultipartFile> file;
    private String user;
    private List<String> imageUrls;
    private int likesNumber;
    private int commentsNumber;
    private String firstName;
    private String lastName;
    private String userImageUrl;
    private Long userId;
}
