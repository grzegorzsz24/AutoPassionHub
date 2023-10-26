package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Friendship;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.FriendshipDto;
import com.example.automotiveapp.repository.FriendshipRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendshipDtoMapper {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public static FriendshipDto map(Friendship friendship) {
        FriendshipDto friendshipDto = new FriendshipDto();
        BeanUtils.copyProperties(friendship, friendshipDto);
        friendshipDto.setUser1(friendship.getUser1().getId());
        friendshipDto.setUser2(friendship.getUser2().getId());
        return friendshipDto;
    }

    public Friendship map(FriendshipDto friendshipDto) {
        Friendship friendship = new Friendship();
        BeanUtils.copyProperties(friendshipDto, friendship);
        Optional<User> user1 = userRepository.findById(friendshipDto.getUser1());
        Optional<User> user2 = userRepository.findById(friendshipDto.getUser2());
        user1.ifPresent(friendship::setUser1);
        user2.ifPresent(friendship::setUser2);
        return friendship;
    }
}
