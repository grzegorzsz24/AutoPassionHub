package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostDtoMapper {
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;

    public static PostDto map(Post post) {
        PostDto postDto = new PostDto();
        BeanUtils.copyProperties(post, postDto);
        postDto.setUser(post.getUser().getNickname());
        List<String> imageUrls = new ArrayList<>(post.getFiles().stream()
                .map(File::getFileUrl)
                .toList());
        postDto.setImageUrls(imageUrls);
        return postDto;
    }

    public Post map(PostDto postDto) {
        Post post = new Post();
        BeanUtils.copyProperties(postDto, post);
        Optional<User> user = userRepository.findByNicknameIgnoreCase(postDto.getUser());
        user.ifPresent(post::setUser);
        return post;
    }
}
