package com.example.automotiveapp.service;

import com.example.automotiveapp.config.jwt.JwtService;
import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.UserDtoMapper;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import com.example.automotiveapp.storage.FileStorageService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public Optional<UserDto> findUserByNickname(String nickname) {
        return userRepository.findByNicknameIgnoreCase(nickname)
                .map(UserDtoMapper::map);
    }

    public String saveOrUpdateProfilePicture(MultipartFile file) {
        String imageUrl = fileStorageService.saveImage(List.of(file)).get(0);
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
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
        return "http://localhost:8080/images/" + imageUrl;
    }

    public void deleteAccount() {
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        user.ifPresent(value -> userRepository.deleteById(value.getId()));
    }

    public void updateUser(Map<String, Object> fields, HttpServletResponse response) {
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono użytkownika");
        }

        if (fields.containsKey("email")) {
            String email = (String) fields.get("email");
            if (email.equals(user.get().getEmail())) {
                throw new BadRequestException("Podałeś swój aktualny email");
            } else if (userRepository.findByEmail(email).isPresent()) {
                throw new BadRequestException("Użytkownik z podanym emailem już istnieje");
            }
        }

        if (fields.containsKey("nickname")) {
            String nickname = (String) fields.get("nickname");
            if (nickname.equals(user.get().getNickname())) {
                throw new BadRequestException("Podałes swój aktualny nickname");
            } else if (userRepository.findByNicknameIgnoreCase(nickname).isPresent()) {
                throw new BadRequestException("Użytkownik z podanym nickname już istnieje");
            }
        }

        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(User.class, key);
            assert field != null;
            field.setAccessible(true);
            ReflectionUtils.setField(field, user.get(), value);
        });

        userRepository.save(user.get());
        updateSecurityContext(response, user.get());
    }

    private void updateSecurityContext(HttpServletResponse response, User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof UsernamePasswordAuthenticationToken currentAuth) {

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

    public void updatePassword(String oldPassword, String newPassword, HttpServletResponse response) {
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());

        if (user.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono użytkownika");
        }

        if (!passwordEncoder.matches(oldPassword, user.get().getPassword())) {
            throw new BadRequestException("Podano nieprawidłowe obecne hasło");
        }

        if (newPassword.equals(oldPassword)) {
            throw new BadRequestException("Podane hasło musi być inne niż poprzednie");
        }
        user.get().setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user.get());
        updateSecurityContext(response, user.get());
    }

    public void setProfileVisibility(boolean visible) {
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono użytkownika");
        }
        user.get().setPublicProfile(visible);
        userRepository.save(user.get());
    }

    public List<UserDto> searchUsers(String keyword, Pageable pageable) {
        List<UserDto> userlist = userRepository.searchUsers(keyword, pageable).stream()
                .map(UserDtoMapper::map)
                .toList();
        if (userlist.isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono żadnego użytkownika");
        }
        return userlist;
    }

    public Optional<UserDto> findUserById(Long userId) {
        return userRepository.findById(userId).map(UserDtoMapper::map);
    }
}
