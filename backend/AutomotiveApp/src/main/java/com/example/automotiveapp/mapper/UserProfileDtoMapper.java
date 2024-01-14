package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.UserProfileDto;
import com.example.automotiveapp.repository.FriendshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileDtoMapper {
    private final FriendshipRepository friendshipRepository;

    public static UserProfileDto map(User user) {
        UserProfileDto userDto = new UserProfileDto();
        BeanUtils.copyProperties(user, userDto);
        userDto.setImageUrl("http://localhost:8080/images/" + user.getFile().getFileUrl());
        return userDto;
    }
}
