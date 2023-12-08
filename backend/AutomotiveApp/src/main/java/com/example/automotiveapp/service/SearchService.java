
package com.example.automotiveapp.service;

import com.example.automotiveapp.dto.*;
import com.example.automotiveapp.mapper.ArticleDtoMapper;
import com.example.automotiveapp.mapper.ForumDtoMapper;
import com.example.automotiveapp.mapper.PostDtoMapper;
import com.example.automotiveapp.mapper.UserDtoMapper;
import com.example.automotiveapp.repository.ArticleRepository;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;
    private final ArticleRepository articleRepository;
    private final PostRepository postRepository;

    public SearchResultsDto search(String keyword) {
        SearchResultsDto searchResultsDto = new SearchResultsDto();
        List<UserDto> users = userRepository.searchUsers(keyword).stream()
                .map(UserDtoMapper::map)
                .toList();
        searchResultsDto.setUsers(users);

        List<ForumDto> forums = forumRepository.findAllByTitleContainsIgnoreCase(keyword)
                .stream()
                .map(ForumDtoMapper::map)
                .toList();
        searchResultsDto.setForums(forums);

        List<ArticleDto> articles = articleRepository.findAllByTitleContainsIgnoreCase(keyword)
                .stream()
                .map(ArticleDtoMapper::map)
                .toList();
        searchResultsDto.setArticles(articles);

        List<PostDto> posts = postRepository.findAllByContentContainsIgnoreCase(keyword)
                .stream()
                .map(PostDtoMapper::map)
                .toList();
        searchResultsDto.setPosts(posts);

        return searchResultsDto;
    }
}
