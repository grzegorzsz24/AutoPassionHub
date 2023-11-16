package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.*;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.UserDtoMapper;
import com.example.automotiveapp.repository.ChannelRepository;
import com.example.automotiveapp.repository.FriendshipRepository;
import com.example.automotiveapp.repository.InvitationRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;
    private final InvitationRepository invitationRepository;
    private final ChannelRepository channelRepository;

    public List<UserDto> getUserFriends(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        List<Friendship> friendships = friendshipRepository.findByUser1OrUser2(user, user);

        List<User> friends = new ArrayList<>();
        for (Friendship friendship : friendships) {
            User friend = friendship.getUser1().getId() == userId ? friendship.getUser2() : friendship.getUser1();
            friends.add(friend);
        }
        return friends.stream()
                .map(UserDtoMapper::map)
                .toList();
    }

    public void addFriend(Long user2Id) {
        Optional<User> user1 = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        Optional<User> user2 = userRepository.findById(user2Id);
        if (user1.isEmpty() || user2.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono użytkownika");
        }
        Friendship friendship = new Friendship();
        friendship.setUser1(user1.get());
        friendship.setUser2(user2.get());
        friendshipRepository.save(friendship);
    }

    public void removeFriend(Long user2Id) {

        Optional<User> user1 = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        Optional<User> user2 = userRepository.findById(user2Id);

        if (user1.isEmpty() || user2.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono użytkownika");
        }

        Optional<Friendship> friendship1 = friendshipRepository.findByUser1AndUser2(user1.get(), user2.get());
        Optional<Friendship> friendship2 = friendshipRepository.findByUser1AndUser2(user2.get(), user1.get());

        if (friendship1.isPresent()) {
            friendshipRepository.delete(friendship1.get());
            channelRepository.deleteChannelBySenderAndReceiverIds(user1.get().getId(), user2.get().getId());
        } else if (friendship2.isPresent()) {
            friendshipRepository.delete(friendship2.get());
            channelRepository.deleteChannelBySenderAndReceiverIds(user1.get().getId(), user2.get().getId());
        } else {
            throw new BadRequestException("Nie znaleziono znajomości");
        }
    }


    public List<UserDto> findNotFriends() {
        User loggedUser = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        List<Friendship> friendships = friendshipRepository.findByUser1OrUser2(loggedUser, loggedUser);
        List<Long> friendIds = friendships.stream()
                .flatMap(friendship -> Stream.of(friendship.getUser1().getId(), friendship.getUser2().getId()))
                .toList();

        List<Invitation> sentInvitations = invitationRepository.findInvitationsBySenderAndStatus(loggedUser, InvitationStatus.PENDING);

        List<Invitation> receivedInvitations = invitationRepository.findInvitationsByReceiverAndStatus(loggedUser, InvitationStatus.PENDING);

        return userRepository.findAll().stream()
                .filter(user -> !friendIds.contains(user.getId()) &&
                        !user.getId().equals(loggedUser.getId()) &&
                        !sentInvitations.stream().anyMatch(invitation -> invitation.getReceiver().getId().equals(user.getId())) &&
                        !receivedInvitations.stream().anyMatch(invitation -> invitation.getSender().getId().equals(user.getId())))
                .map(UserDtoMapper::map)
                .collect(Collectors.toList());
    }


}
