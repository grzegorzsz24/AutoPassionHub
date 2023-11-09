package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.ArticleDto;
import com.example.automotiveapp.reponse.ApiResponse;
import com.example.automotiveapp.service.SavedArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/articles/saved")
@RequiredArgsConstructor
public class SavedArticleController {
    private final SavedArticleService savedArticleService;

    @PostMapping
    public ResponseEntity<ApiResponse> addToSavedArticles(@RequestParam Long articleId) {
        savedArticleService.saveArticle(articleId);
        return ResponseEntity.ok(new ApiResponse("Artykuł został zapisany", HttpStatus.OK));
    }

    @GetMapping
    public ResponseEntity<List<ArticleDto>> getSavedArticles(@RequestParam(defaultValue = "1") int page,
                                                             @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(savedArticleService.findSavedArticles(page, size));
    }
}
