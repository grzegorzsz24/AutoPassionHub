package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchResultsDto {
    private List<UserDto> users;
    private List<ForumDto> forums;
    private List<ArticleDto> articles;
    private List<PostDto> posts;
}
