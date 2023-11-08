package com.example.automotiveapp.reponse;

import com.example.automotiveapp.dto.ArticleDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ArticleResponse {
    private List<ArticleDto> articles;
    private Long articlesNumber;
}