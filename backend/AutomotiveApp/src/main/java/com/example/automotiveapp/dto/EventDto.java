package com.example.automotiveapp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventDto {
    private Long id;
    private String title;
    private String city;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date eventDate;
    private String description;
    private MultipartFile image;
    private String imageUrl;
    private Long user;
}
