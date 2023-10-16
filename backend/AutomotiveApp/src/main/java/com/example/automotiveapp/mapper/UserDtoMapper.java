package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Role;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserDtoMapper {
    private final RoleRepository roleRepository;

    public static UserDto map(User user) {
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }

    public User map(UserDto userDto) {
        User user = new User();
        BeanUtils.copyProperties(userDto, user);
        Role role = roleRepository.findById(1L).get();
        user.setRoles(Set.of(role));
        return user;
    }
}
