package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleDtoMapper articleDtoMapper;

    public ArticleDto saveArticle(ArticleDto articleDto) {
        Article article = articleDtoMapper.map(articleDto);
        Article savedArticle = articleRepository.save(article);
        return ArticleDtoMapper.map(savedArticle);
    }
}
