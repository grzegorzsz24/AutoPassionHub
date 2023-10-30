package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForumDto {
    private Long id;
    private String name;
    private String user;
    private int commentsNumber;
}
