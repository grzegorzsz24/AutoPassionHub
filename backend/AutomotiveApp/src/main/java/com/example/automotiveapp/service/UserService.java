package com.example.automotiveapp.service;

import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.mapper.UserDtoMapper;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<UserDto> findUserByNickname(String nickname) {
        return userRepository.findByNicknameIgnoreCase(nickname)
                .map(UserDtoMapper::map);
    }
}
