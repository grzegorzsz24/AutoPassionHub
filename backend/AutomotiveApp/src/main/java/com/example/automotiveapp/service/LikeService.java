package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Like;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.dto.LikeDto;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.mapper.LikeDtoMapper;
import com.example.automotiveapp.repository.LikeRepository;
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
        Optional<PostDto> likedPost = postService.findPostById(like.getPost().getId());
        if (likedPost.isPresent()) {
            PostDto postDto = likedPost.get();
            Optional<Like> userLike = likeRepository.getLikeByUser_EmailAndPostId(SecurityUtils.getCurrentUserEmail(), like.getPost().getId());
            if (userLike.isPresent()) {
                postDto.setLikesNumber(postDto.getLikesNumber() - 1);
                likeRepository.delete(userLike.get());
            } else {
                postDto.setLikesNumber(postDto.getLikesNumber() + 1);
                likeRepository.save(like);
            }
            postService.updatePost(postDto);
        }
    }

    private void updateArticleLike(Like like) {
        Optional<ArticleDto> likedArticle = articleService.findArticleById(like.getArticle().getId());
        if (likedArticle.isPresent()) {
            ArticleDto articleDto = likedArticle.get();
            Optional<Like> userLike = likeRepository.getLikeByUser_EmailAndArticleId(SecurityUtils.getCurrentUserEmail(), like.getArticle().getId());
            if (userLike.isPresent()) {
                articleDto.setLikesNumber(articleDto.getLikesNumber() - 1);
                likeRepository.delete(userLike.get());
            } else {
                articleDto.setLikesNumber(articleDto.getLikesNumber() + 1);
                likeRepository.save(like);
            }
            articleService.updateArticle(articleDto);
        }
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
