package com.example.automotiveapp.domain.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class PostSaveRequest {
    @NotBlank
    private String content;
    private List<MultipartFile> files;
}
