package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<ArticleDto> addArticle(@RequestBody ArticleDto article) {
        ArticleDto savedArticle = articleService.saveArticle(article);
        URI savedArticleURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedArticle.getId())
                .toUri();
        return ResponseEntity.created(savedArticleURI).body(savedArticle);
    }
}
