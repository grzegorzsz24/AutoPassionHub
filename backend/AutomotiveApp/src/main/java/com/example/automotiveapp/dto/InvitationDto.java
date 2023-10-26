package com.example.automotiveapp.dto;

import com.example.automotiveapp.domain.InvitationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvitationDto {
    private Long id;
    private Long sender;
    private Long receiver;
    private InvitationStatus status;
}
