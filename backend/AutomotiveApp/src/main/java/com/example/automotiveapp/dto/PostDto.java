package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostDto {
    private Long id;
    private String content;
    private LocalDateTime postedAt;
    private boolean isLiked;
    private List<MultipartFile> file;
    private String user;
    private String forum;
    private List<String> imageUrls;
}
