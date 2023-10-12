package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.*;
import com.example.automotiveapp.dto.LikeDto;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.repository.ArticleRepository;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeDtoMapper {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ArticleRepository articleRepository;

    public static LikeDto map(Like like) {
        LikeDto likeDto = new LikeDto();
        BeanUtils.copyProperties(like, likeDto);
        likeDto.setUser(like.getUser().getNickname());
        likeDto.setPost(like.getPost().getId());
        return likeDto;
    }

    public Like map(LikeDto likeDto) {
        Like like = new Like();
        BeanUtils.copyProperties(likeDto, like);
        User user = userRepository.findByNicknameIgnoreCase(likeDto.getUser()).get();
        Optional<Post> post = postRepository.findById(likeDto.getPost());
        like.setUser(user);
        post.ifPresent(like::setPost);
        return like;
    }
}
