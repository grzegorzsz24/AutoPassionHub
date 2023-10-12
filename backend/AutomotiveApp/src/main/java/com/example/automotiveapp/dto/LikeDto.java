package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LikeDto {
    private Long id;
    private String user;
    private Long post;
}
