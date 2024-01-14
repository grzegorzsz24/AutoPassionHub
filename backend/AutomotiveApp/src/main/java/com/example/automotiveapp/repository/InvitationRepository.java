package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Invitation;
import com.example.automotiveapp.domain.InvitationStatus;
import com.example.automotiveapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    List<Invitation> findByReceiverAndStatus(User receiver, InvitationStatus status);

    List<Invitation> findBySenderAndStatus(User sender, InvitationStatus status);

    List<Invitation> findInvitationsBySenderAndStatus(User sender, InvitationStatus status);

    List<Invitation> findInvitationsByReceiverAndStatus(User receiver, InvitationStatus status);

    Optional<Invitation> findBySenderAndReceiverAndStatus(User sender, User receiver, InvitationStatus status);

}
