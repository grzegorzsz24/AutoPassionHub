package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.domain.SavedArticle;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.repository.ArticleRepository;
import com.example.automotiveapp.repository.LikeRepository;
import com.example.automotiveapp.repository.SavedArticleRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SavedArticleService {
    private final SavedArticleRepository savedArticleRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    @Transactional
    public void saveArticle(Long articleId) {
        Optional<SavedArticle> alreadySavedArticle = savedArticleRepository.findByUserEmailAndArticle_Id(SecurityUtils.getCurrentUserEmail(), articleId);
        if (alreadySavedArticle.isPresent()) {
            savedArticleRepository.deleteByArticle_IdAndUserEmail(articleId, SecurityUtils.getCurrentUserEmail());
        } else {
            SavedArticle savedArticle = new SavedArticle();
            savedArticle.setArticle(articleRepository.findById(articleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono artykułu")));
            savedArticle.setUser(userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")));

            savedArticleRepository.save(savedArticle);
        }
    }

    public List<ArticleDto> findSavedArticles(int page, int size) {
        Long userId = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")).getId();
        Pageable pageable = PageRequest.of(page - 1, size);
        List<SavedArticle> savedArticles = savedArticleRepository.findAllByUserId(userId, pageable);
        List<Article> articles = new ArrayList<>();
        List<ArticleDto> articleDtos = new ArrayList<>();
        savedArticles.forEach(val -> articles.add(val.getArticle()));
        setArticlesLikesAndSavedStatus(articles, articleDtos);
        return articleDtos;
    }

    private void setArticlesLikesAndSavedStatus(List<Article> articles, List<ArticleDto> articleDtos) {
        for (Article article : articles) {
            ArticleDto articleDto = ArticleDtoMapper.map(article);
            articleDto.setLiked(likeRepository.getLikeByUser_EmailAndArticleId(SecurityUtils.getCurrentUserEmail(), article.getId()).isPresent());
            articleDto.setSaved(savedArticleRepository.findByUserEmailAndArticle_Id(SecurityUtils.getCurrentUserEmail(), article.getId()).isPresent());
            articleDtos.add(articleDto);
        }
    }
}
