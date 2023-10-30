package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Friendship;
import com.example.automotiveapp.domain.Invitation;
import com.example.automotiveapp.domain.InvitationStatus;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.InvitationDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.InvitationDtoMapper;
import com.example.automotiveapp.repository.FriendshipRepository;
import com.example.automotiveapp.repository.InvitationRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvitationService {
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;

    public List<InvitationDto> getPendingInvitations() {
        Optional<User> receiver = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        if (receiver.isEmpty()) {
            throw new ResourceNotFoundException("Podany użytkownik nie istnieje");
        }
        return invitationRepository.findByReceiverAndStatus(receiver.get(), InvitationStatus.PENDING)
                .stream()
                .map(InvitationDtoMapper::map)
                .toList();
    }

    public void sendInvitation(Long receiverId) {
        Invitation invitation = new Invitation();
        Optional<User> sender = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        Optional<User> receiver = userRepository.findById(receiverId);
        if (sender.isEmpty() || receiver.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono użytkownika");
        }
        invitation.setSender(sender.get());
        invitation.setReceiver(receiver.get());
        invitation.setStatus(InvitationStatus.PENDING);
        invitationRepository.save(invitation);
    }

    @Transactional
    public void acceptInvitation(Long invitationId) {
        Optional<Invitation> invitation = invitationRepository.findById(invitationId);
        if (invitation.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono zaproszenia");
        }
        invitation.get().setStatus(InvitationStatus.ACCEPTED);
        invitationRepository.save(invitation.get());
        Friendship friendship = new Friendship();
        friendship.setUser1(invitation.get().getSender());
        friendship.setUser2(invitation.get().getReceiver());
        friendshipRepository.save(friendship);
    }

    public void rejectInvitation(Long invitationId) {
        Optional<Invitation> invitation = invitationRepository.findById(invitationId);
        if (invitation.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono zaproszenia");
        }
        invitation.get().setStatus(InvitationStatus.REJECTED);
        invitationRepository.save(invitation.get());
    }

    public List<InvitationDto> getSentInvitations() {
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("Podany użytkownik nie istnieje");
        }
        List<Invitation> sentInvitations = invitationRepository.findBySenderAndStatus(user.get(), InvitationStatus.PENDING);

        return sentInvitations.stream()
                .map(InvitationDtoMapper::map)
                .toList();

    }
}
