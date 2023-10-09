package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostDtoMapper {
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;
    public static PostDto map(Post post) {
        PostDto postDto = new PostDto();
        BeanUtils.copyProperties(post, postDto);
        postDto.setUser(post.getUser().getNickname());
        postDto.setForum(post.getForum().getName());
        List<String> imageUrls = new ArrayList<>(post.getFiles().stream()
                .map(File::getFileUrl)
                .toList());
        log.info(String.valueOf(imageUrls.size()));
        postDto.setImageUrls(imageUrls);
        return postDto;
    }

    public Post map(PostDto postDto) {
        Post post = new Post();
        BeanUtils.copyProperties(postDto, post);
        User user = userRepository.findByNicknameIgnoreCase(postDto.getUser()).get();
        Forum forum = forumRepository.findByNameIgnoreCase(postDto.getForum()).get();
        post.setUser(user);
        post.setForum(forum);
        return post;
    }
}
