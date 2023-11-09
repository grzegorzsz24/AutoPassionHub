package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.domain.SavedArticle;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.repository.ArticleRepository;
import com.example.automotiveapp.repository.SavedArticleRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedArticleService {
    private final SavedArticleRepository savedArticleRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public void saveArticle(Long articleId) {
        SavedArticle savedArticle = new SavedArticle();
        savedArticle.setArticle(articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono artykułu")));
        savedArticle.setUser(userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")));
        savedArticleRepository.save(savedArticle);
    }

    public List<ArticleDto> findSavedArticles(int page, int size) {
        Long userId = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")).getId();
        Pageable pageable = PageRequest.of(page - 1, size);
        List<SavedArticle> savedArticles = savedArticleRepository.findAllByUserId(userId, pageable);
        List<Article> articles = new ArrayList<>();
        savedArticles.forEach(val -> articles.add(val.getArticle()));
        return articles.stream()
                .map(ArticleDtoMapper::map)
                .toList();
    }
}
