package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.Like;
import com.example.automotiveapp.dto.LikeDto;
import com.example.automotiveapp.mapper.ForumDtoMapper;
import com.example.automotiveapp.mapper.LikeDtoMapper;
import com.example.automotiveapp.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final LikeDtoMapper likeDtoMapper;

    public LikeDto saveLike(LikeDto likeDto) {
        Like like = likeDtoMapper.map(likeDto);
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
