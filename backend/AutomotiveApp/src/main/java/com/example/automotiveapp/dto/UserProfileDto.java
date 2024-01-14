package com.example.automotiveapp.dto;

import com.example.automotiveapp.domain.UserFriendshipStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String nickname;
    private String email;
    private Date dateOfBirth;
    private boolean publicProfile;
    private String imageUrl;
    private UserFriendshipStatus status;
    private Long invitationId;
}
