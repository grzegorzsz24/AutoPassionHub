package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleDtoMapper articleDtoMapper;

    public ArticleDto saveArticle(ArticleDto articleDto) {
        Article article = articleDtoMapper.map(articleDto);
        article.setPublishedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        Article savedArticle = articleRepository.save(article);
        return ArticleDtoMapper.map(savedArticle);
    }

    public void updateArticle(ArticleDto articleToUpdate) {
        Article article = articleDtoMapper.map(articleToUpdate);
        articleRepository.save(article);
    }
}
