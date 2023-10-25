package com.example.automotiveapp.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Setter
public class ApiImageResponse {
    private String message;
    private HttpStatus status;
    private String imageUrl;
}
