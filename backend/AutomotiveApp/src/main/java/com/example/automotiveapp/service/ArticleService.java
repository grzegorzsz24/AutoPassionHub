package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.reponse.ArticleResponse;
import com.example.automotiveapp.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

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
        Article article = articleDtoMapper.map(articleDto);
        article.setPublishedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        Article savedArticle = articleRepository.save(article);
        return ArticleDtoMapper.map(savedArticle);
    }

    public void updateArticle(ArticleDto articleToUpdate) {
        Article article = articleDtoMapper.map(articleToUpdate);
        articleRepository.save(article);
    }

    public ArticleDto findArticleById(Long id) {
        return articleRepository.findById(id).map((ArticleDtoMapper::map))
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono artykułu"));
    }

    public ArticleResponse getAllArticles(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<ArticleDto> articles =  articleRepository.findByTitleContainsIgnoreCase(title, pageable).stream()
                .map(ArticleDtoMapper::map)
                .toList();
        return new ArticleResponse(articles, (long) articles.size());
    }
}
