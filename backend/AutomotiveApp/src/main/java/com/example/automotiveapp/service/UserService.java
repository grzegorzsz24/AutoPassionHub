package com.example.automotiveapp.service;

import com.example.automotiveapp.auth.AuthenticationRequest;
import com.example.automotiveapp.auth.AuthenticationService;
import com.example.automotiveapp.config.jwt.JwtService;
import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.mapper.UserDtoMapper;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.storage.FileStorageService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;
    private final UserDtoMapper userDtoMapper;
    private final JwtService jwtService;
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

    public void updateUser(UserDto userToUpdate, HttpServletResponse response) {
        User user = userDtoMapper.map(userToUpdate);
        userRepository.save(user);
        updateSecurityContext(response, user);
    }

    private void updateSecurityContext(HttpServletResponse response, User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            UsernamePasswordAuthenticationToken currentAuth = (UsernamePasswordAuthenticationToken) authentication;

            User userDetail = (User) currentAuth.getPrincipal();
            BeanUtils.copyProperties(user, userDetail);
            UsernamePasswordAuthenticationToken updateAuth = new UsernamePasswordAuthenticationToken(userDetail,
                    currentAuth.getCredentials(),
                    currentAuth.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(updateAuth);
        }
        var newJwt = jwtService.generateToken(user);
        Cookie jwtCookie = new Cookie("jwt", newJwt);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(7 * 24 * 60 * 60);
        jwtCookie.setHttpOnly(true);
        response.addCookie(jwtCookie);
    }

    public Optional<UserDto> findUserByEmail(String email) {
        return userRepository.findByEmail(email).map(UserDtoMapper::map);
    }

    public void updatePassword(String password, HttpServletResponse response) {
        User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).get();
        if (passwordEncoder.matches(password, user.getPassword())) {
            throw new BadRequestException("Podano stare hasło");
        }
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        updateSecurityContext(response, user);
    }

    public UserDto getCurrentUser() {
        return userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).map(UserDtoMapper::map).get();
    }
}
