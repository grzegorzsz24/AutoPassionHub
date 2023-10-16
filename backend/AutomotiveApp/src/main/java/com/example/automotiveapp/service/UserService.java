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
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final UserDtoMapper userDtoMapper;
    private final PasswordEncoder passwordEncoder;

    public Optional<UserDto> findUserByNickname(String nickname) {
        return userRepository.findByNicknameIgnoreCase(nickname)
                .map(UserDtoMapper::map);
    }

    public void saveOrUpdateProfilePicture(MultipartFile file) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String imageUrl = fileStorageService.saveImage(List.of(file)).get(0);
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.isPresent()) {
            Optional<File> fileToUpdate = fileRepository.findByUser_Id(user.get().getId());
            if (fileToUpdate.isPresent()) {
                fileToUpdate.get().setFileUrl(imageUrl);
                fileRepository.save(fileToUpdate.get());
            } else {
                File fileToSave = new File();
                fileToSave.setUser(user.get());
                fileToSave.setFileUrl(imageUrl);
                fileRepository.save(fileToSave);
            }
        }
    }

    public void deleteAccount() {
        Optional<User> user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        user.ifPresent(value -> userRepository.deleteById(value.getId()));
    }

    public Optional<UserDto> findUserById(Long id) {
        return userRepository.findById(id).map(UserDtoMapper::map);
    }

    public void updateUser(UserDto userToUpdate) {
        User user = userDtoMapper.map(userToUpdate);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
