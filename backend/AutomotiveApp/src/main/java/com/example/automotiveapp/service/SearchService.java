package com.example.automotiveapp.service;

import com.example.automotiveapp.dto.*;
import com.example.automotiveapp.mapper.*;
import com.example.automotiveapp.repository.*;
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
    private final EventRepository eventRepository;

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

        List<EventDto> events = eventRepository.findAllByTitleContainsIgnoreCase(keyword)
                .stream()
                .map(EventDtoMapper::map)
                .toList();
        searchResultsDto.setEvents(events);

        return searchResultsDto;
    }
}
