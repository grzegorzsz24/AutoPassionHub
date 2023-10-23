package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleDtoMapper articleDtoMapper;
    private final UserService userService;

    public ArticleDto saveArticle(ArticleDto articleDto) {
        if (articleRepository.findByTitle(articleDto.getTitle()).isPresent()) {
            throw new BadRequestException("Artykuł o podanym tytule już istnieje!");
        }
        if (userService.findUserByNickname(articleDto.getUser()).isEmpty()) {
            throw new ResourceNotFoundException("Podany użytkownik nie istnieje!");
        }
        Article article = articleDtoMapper.map(articleDto);
        article.setPublishedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        Article savedArticle = articleRepository.save(article);
        return ArticleDtoMapper.map(savedArticle);
    }

    public void updateArticle(ArticleDto articleToUpdate) {
        Article article = articleDtoMapper.map(articleToUpdate);
        articleRepository.save(article);
    }

    public Optional<ArticleDto> findArticleByTitle(String title) {
        return articleRepository.findByTitle(title).map(ArticleDtoMapper::map);
    }
}
