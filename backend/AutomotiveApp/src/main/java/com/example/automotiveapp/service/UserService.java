package com.example.automotiveapp.service;

import com.example.automotiveapp.config.jwt.JwtService;
import com.example.automotiveapp.domain.*;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.dto.UserProfileDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.UserDtoMapper;
import com.example.automotiveapp.mapper.UserProfileDtoMapper;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.FriendshipRepository;
import com.example.automotiveapp.repository.InvitationRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import com.example.automotiveapp.storage.FileStorageService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
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
public class
UserService {
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final FriendshipRepository friendshipRepository;
    private final InvitationRepository invitationRepository;

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
        User user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));
        userRepository.deleteById(user.getId());
    }


    public void updateUser(Map<String, Object> fields, HttpServletResponse response) {
        User user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));

        if (fields.containsKey("email")) {
            String email = (String) fields.get("email");
            if (email.equals(user.getEmail())) {
                throw new BadRequestException("Podałeś swój aktualny email");
            } else if (userRepository.findByEmail(email).isPresent()) {
                throw new BadRequestException("Użytkownik z podanym emailem już istnieje");
            }
        }

        if (fields.containsKey("nickname")) {
            String nickname = (String) fields.get("nickname");
            if (nickname.equals(user.getNickname())) {
                throw new BadRequestException("Podałes swój aktualny nickname");
            } else if (userRepository.findByNicknameIgnoreCase(nickname).isPresent()) {
                throw new BadRequestException("Użytkownik z podanym nickname już istnieje");
            }
        }

        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(User.class, key);
            assert field != null;
            field.setAccessible(true);
            ReflectionUtils.setField(field, user, value);
        });

        userRepository.save(user);
        updateSecurityContext(response, user);
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
        User user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadRequestException("Podano nieprawidłowe obecne hasło");
        }

        if (newPassword.equals(oldPassword)) {
            throw new BadRequestException("Podane hasło musi być inne niż poprzednie");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        updateSecurityContext(response, user);
    }

    public void setProfileVisibility(boolean visible) {
        User user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));

        user.setPublicProfile(visible);
        userRepository.save(user);
    }

//    public List<UserDto> searchUsers(String keyword, Pageable pageable) {
//        List<UserDto> userlist = userRepository.searchUsers(keyword, pageable).stream()
//                .map(UserDtoMapper::map)
//                .toList();
//        if (userlist.isEmpty()) {
//            throw new ResourceNotFoundException("Nie znaleziono żadnego użytkownika");
//        }
//        return userlist;
//    }

    public Optional<UserDto> findUserById(Long userId) {
        return userRepository.findById(userId).map(UserDtoMapper::map);
    }

    public List<UserDto> getUsersWithAdminRole() {
        return userRepository.findAllUsersByRole("ADMIN")
                .stream()
                .map(UserDtoMapper::map)
                .toList();
    }

    public Optional<UserProfileDto> findUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika o podanym id"));
        User loggedInUser = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika o podanym emailu"));
        UserProfileDto userProfileDto = userRepository.findById(userId).map(UserProfileDtoMapper::map)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika o podanym id"));
        Optional<Friendship> friendship1 = friendshipRepository.findByUser1AndUser2(user, loggedInUser);
        Optional<Friendship> friendship2 = friendshipRepository.findByUser1AndUser2(loggedInUser, user);
        Optional<Invitation> invitation1 = invitationRepository.findBySenderAndReceiverAndStatus(loggedInUser, user, InvitationStatus.PENDING);
        Optional<Invitation> invitation2 = invitationRepository.findBySenderAndReceiverAndStatus(user, loggedInUser, InvitationStatus.PENDING);

        if (friendship2.isPresent() || friendship1.isPresent()) {
            userProfileDto.setStatus(UserFriendshipStatus.FRIENDS);
        } else if (invitation1.isPresent()) {
            userProfileDto.setStatus(UserFriendshipStatus.INVITATION_SENT);
        } else if (invitation2.isPresent()) {
            userProfileDto.setStatus(UserFriendshipStatus.INVITATION_RECEIVED);
        } else {
            userProfileDto.setStatus(UserFriendshipStatus.NOT_FRIENDS);
        }
        return Optional.of(userProfileDto);
    }
}
