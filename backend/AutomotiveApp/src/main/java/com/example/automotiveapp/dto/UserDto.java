package com.example.automotiveapp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String nickname;
    private String email;
    private Date dateOfBirth;
    private String password;
}
