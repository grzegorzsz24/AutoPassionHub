package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.UserDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class UserDtoMapper {
    public static UserDto map(User user) {
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }
}
