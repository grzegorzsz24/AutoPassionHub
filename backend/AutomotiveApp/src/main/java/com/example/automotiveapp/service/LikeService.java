package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Like;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.dto.LikeDto;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.LikeDtoMapper;
import com.example.automotiveapp.repository.LikeRepository;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
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
    private final PostRepository postRepository;

    public LikeDto saveLike(LikeDto likeDto) {
        if (likeDto.getPost() == null && likeDto.getArticle() == null) {
            throw new BadRequestException("Podaj post lub artykuł");
        }

        Like like = likeDtoMapper.map(likeDto);

        if (like.getPost() != null) {
            updatePostLike(like);
        } else if (like.getArticle() != null) {
            updateArticleLike(like);
        }

        return LikeDtoMapper.map(like);
    }

    private void updatePostLike(Like like) {
        PostDto likedPost = postService.findPostById(like.getPost().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono posta"));
        Optional<Like> userLike = likeRepository.getLikeByUser_EmailAndPostId(SecurityUtils.getCurrentUserEmail(), like.getPost().getId());
        if (userLike.isPresent()) {
            likedPost.setLikesNumber(likedPost.getLikesNumber() - 1);
            likeRepository.delete(userLike.get());
        } else {
            likedPost.setLikesNumber(likedPost.getLikesNumber() + 1);
            likeRepository.save(like);
        }
        postService.updatePost(likedPost);
    }

    private void updateArticleLike(Like like) {
        ArticleDto likedArticle = articleService.findArticleById(like.getArticle().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono artykułu"));

        Optional<Like> userLike = likeRepository.getLikeByUser_EmailAndArticleId(SecurityUtils.getCurrentUserEmail(), like.getArticle().getId());
        if (userLike.isPresent()) {
            likedArticle.setLikesNumber(likedArticle.getLikesNumber() - 1);
            likeRepository.delete(userLike.get());
        } else {
            likedArticle.setLikesNumber(likedArticle.getLikesNumber() + 1);
            likeRepository.save(like);
        }
        articleService.updateArticle(likedArticle);
    }

    public List<LikeDto> getPostLikes(Long postId) {
        postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono posta"));

        return likeRepository.findAllByPost_Id(postId).stream()
                .map(LikeDtoMapper::map)
                .toList();
    }


    public void deleteLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
