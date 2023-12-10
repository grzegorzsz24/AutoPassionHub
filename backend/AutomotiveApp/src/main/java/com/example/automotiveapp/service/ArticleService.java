package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Article;
import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.reponse.ArticleResponse;
import com.example.automotiveapp.repository.ArticleRepository;
import com.example.automotiveapp.repository.LikeRepository;
import com.example.automotiveapp.repository.SavedArticleRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleDtoMapper articleDtoMapper;
    private final LikeRepository likeRepository;
    private final SavedArticleRepository savedArticleRepository;

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
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono artykułu"));
        ArticleDto articleDto = ArticleDtoMapper.map(article);
        articleDto.setLiked(likeRepository.getLikeByUser_EmailAndArticleId(SecurityUtils.getCurrentUserEmail(), article.getId()).isPresent());
        articleDto.setSaved(savedArticleRepository.findByUserEmailAndArticle_Id(SecurityUtils.getCurrentUserEmail(), article.getId()).isPresent());
        articleDto.setUser(article.getUser().getNickname());
        return articleDto;
    }

    public ArticleResponse findAllApprovedArticles(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<Article> articles = articleRepository.findByTitleContainsIgnoreCaseAndApprovedIsTrue(title, pageable);
        List<ArticleDto> articleDtos = new ArrayList<>();
        setArticlesLikesAndSavedStatus(articles, articleDtos);
        return new ArticleResponse(articleDtos, (long) articles.size());
    }

    private void setArticlesLikesAndSavedStatus(List<Article> articles, List<ArticleDto> articleDtos) {
        for (Article article : articles) {
            ArticleDto articleDto = ArticleDtoMapper.map(article);
            articleDto.setLiked(likeRepository.getLikeByUser_EmailAndArticleId(SecurityUtils.getCurrentUserEmail(), article.getId()).isPresent());
            articleDto.setSaved(savedArticleRepository.findByUserEmailAndArticle_Id(SecurityUtils.getCurrentUserEmail(), article.getId()).isPresent());
            articleDtos.add(articleDto);
        }
    }

    public ArticleResponse findMyArticles(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<Article> articles = articleRepository.findAllByUserEmail(SecurityUtils.getCurrentUserEmail(), pageable);
        List<ArticleDto> articleDtos = new ArrayList<>();
        setArticlesLikesAndSavedStatus(articles, articleDtos);
        return new ArticleResponse(articleDtos, (long) articles.size());
    }

    public ArticleResponse findAllNotApprovedArticles(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<Article> articles = articleRepository.findAllByApprovedIsFalse(pageable);
        List<ArticleDto> articleDtos = new ArrayList<>();
        setArticlesLikesAndSavedStatus(articles, articleDtos);
        return new ArticleResponse(articleDtos, (long) articles.size());
    }

    public void setArticleApproved(Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono artykułu"));
        article.setApproved(true);
        articleRepository.save(article);
    }

    public void deleteArticleById(Long articleId) {
        articleRepository.deleteById(articleId);
    }
}
