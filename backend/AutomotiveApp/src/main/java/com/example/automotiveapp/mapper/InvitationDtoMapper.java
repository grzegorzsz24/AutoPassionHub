package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Invitation;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.InvitationDto;
import com.example.automotiveapp.repository.InvitationRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvitationDtoMapper {
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;

    public static InvitationDto map(Invitation invitation) {
        InvitationDto invitationDto = new InvitationDto();
        BeanUtils.copyProperties(invitation, invitationDto);
        invitationDto.setSender(invitation.getSender().getId());
        invitationDto.setReceiver(invitation.getReceiver().getId());
        return invitationDto;
    }

    public Invitation map(InvitationDto invitationDto) {
        Invitation invitation = new Invitation();
        BeanUtils.copyProperties(invitationDto, invitation);
        Optional<User> sender = userRepository.findById(invitationDto.getSender());
        Optional<User> receiver = userRepository.findById(invitationDto.getReceiver());
        sender.ifPresent(invitation::setSender);
        receiver.ifPresent(invitation::setReceiver);
        return invitation;
    }
}
