package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.mapper.PostDtoMapper;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.storage.FileStorageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostDtoMapper postDtoMapper;
    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    @Transactional
    public PostDto savePost(PostDto postDto) {
        Post post = postDtoMapper.map(postDto);
        post.setUser(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).get());
        post.setPostedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        post.setLiked(false);
        Set<File> files = new HashSet<>();
        if (postDto.getFile() != null) {
            List<String> savedImageNames = fileStorageService.saveImage(postDto.getFile());
            for (String imageName : savedImageNames) {
                File file = new File();
                file.setFileUrl(imageName);
                file.setPost(post);
                files.add(file);
            }
            post.setFiles(files);
        }
        Post savedPost = postRepository.save(post);
        fileRepository.saveAll(files);
        return PostDtoMapper.map(savedPost);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public Optional<PostDto> findPostById(long id) {
        return postRepository.findById(id).map(PostDtoMapper::map);
    }

    public void updatePost(PostDto postToUpdate) {
        Post post = postDtoMapper.map(postToUpdate);
        postRepository.save(post);
    }

    public List<PostDto> getFriendsPosts() {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        List<User> friends = userRepository.findUserFriends(currentUserEmail);

        List<PostDto> friendsPosts = new ArrayList<>();

        for (User friend : friends) {
            List<Post> friendPosts = postRepository.findByUser(friend);
            for (Post post : friendPosts) {
                friendsPosts.add(PostDtoMapper.map(post));
            }
        }
        List<User> publicProfiles = userRepository.findPublicProfiles();
        for (User publicProfile : publicProfiles) {
            List<Post> publicProfilePosts = postRepository.findByUser(publicProfile);
            for (Post post : publicProfilePosts) {
                friendsPosts.add(PostDtoMapper.map(post));
            }
        }

        return friendsPosts;
    }

    public List<PostDto> getUserPosts(Long userId) {
        if (userRepository.findById(userId).get().isPublicProfile()) {
            return postRepository.findAllByUserId(userId).stream()
                    .map(PostDtoMapper::map)
                    .toList();
        }
        else {
            throw new BadRequestException("Użytkownik ma prywatny profil");
        }
    }

}
