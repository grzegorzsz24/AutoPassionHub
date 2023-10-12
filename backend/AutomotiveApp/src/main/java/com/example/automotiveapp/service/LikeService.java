package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Like;
import com.example.automotiveapp.dto.LikeDto;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.mapper.LikeDtoMapper;
import com.example.automotiveapp.repository.LikeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final LikeDtoMapper likeDtoMapper;
    private final PostService postService;

    public LikeDto saveLike(LikeDto likeDto) {
        Like like = likeDtoMapper.map(likeDto);
        PostDto likedPost = postService.findPostById(likeDto.getPost()).get();
        likedPost.setLiked(true);
        postService.updatePost(likedPost);
        Like savedLike = likeRepository.save(like);
        return LikeDtoMapper.map(savedLike);
    }

    public List<LikeDto> getPostLikes(Long postId) {
        return likeRepository.findAllByPost_Id(postId).stream()
                .map(LikeDtoMapper::map)
                .toList();
    }

    public void deleteLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
