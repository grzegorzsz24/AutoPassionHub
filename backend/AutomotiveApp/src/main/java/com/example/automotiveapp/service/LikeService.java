package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Like;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.dto.LikeDto;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.mapper.LikeDtoMapper;
import com.example.automotiveapp.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final LikeDtoMapper likeDtoMapper;
    private final PostService postService;
    private final ArticleService articleService;

    public LikeDto saveLike(LikeDto likeDto) {
        Like like = likeDtoMapper.map(likeDto);
        if (like.getPost() != null) {
            Optional<PostDto> likedPost = postService.findPostById(likeDto.getPost());
            likedPost.ifPresent(postDto -> postDto.setLiked(true));
            postService.updatePost(likedPost.get());
        } else if (like.getArticle() != null) {
            ArticleDto likedArticle = ArticleDtoMapper.map(like.getArticle());
            likedArticle.setLiked(true);
            articleService.updateArticle(likedArticle);
        }

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
