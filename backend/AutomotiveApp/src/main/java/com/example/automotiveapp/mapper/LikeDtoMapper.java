package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.domain.Like;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.LikeDto;
import com.example.automotiveapp.repository.ArticleRepository;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
        if (like.getArticle() != null) {
            likeDto.setArticle(like.getArticle().getId());
        } else if (like.getPost() != null) {
            likeDto.setPost(like.getPost().getId());
        }
        return likeDto;
    }

    public Like map(LikeDto likeDto) {
        if (likeDto.getArticle() == null && likeDto.getPost() == null) {
            throw new IllegalArgumentException("Musi być podany artykuł lub post");
        }
        Like like = new Like();
        BeanUtils.copyProperties(likeDto, like);
        Optional<User> user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        user.ifPresent(like::setUser);
        if (likeDto.getPost() != null) {
            Optional<Post> post = postRepository.findById(likeDto.getPost());
            post.ifPresent(like::setPost);
        } else if (likeDto.getArticle() != null) {
            Optional<Article> article = articleRepository.findById(likeDto.getArticle());
            article.ifPresent(like::setArticle);
        }
        return like;
    }
}
