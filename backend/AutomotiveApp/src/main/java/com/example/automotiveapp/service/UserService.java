package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.mapper.UserDtoMapper;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;

    public Optional<UserDto> findUserByNickname(String nickname) {
        return userRepository.findByNicknameIgnoreCase(nickname)
                .map(UserDtoMapper::map);
    }

    public void saveProfilePicture(MultipartFile file) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String imageUrl = fileStorageService.saveImage(List.of(file)).get(0);
        File fileToSave = new File();
        fileToSave.setFileUrl(imageUrl);
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.isPresent()) {
            fileToSave.setUser(user.get());
            fileRepository.save(fileToSave);
        }
    }
}
