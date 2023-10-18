package com.example.automotiveapp.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationResponse {
    private String firstName;
    private String lastName;
    private String nickname;
    private String email;
    private String cookieExpirationDate;
    private String userId;
    private String imageUrl;
}
