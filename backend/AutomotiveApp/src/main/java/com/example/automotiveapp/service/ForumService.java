package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ForumDtoMapper;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumService {
    private final ForumRepository forumRepository;
    private final ForumDtoMapper forumDtoMapper;
    private final UserRepository userRepository;

    public ForumDto saveForum(ForumDto forumDto) {
        Forum forum = forumDtoMapper.map(forumDto);
        Forum savedForum = forumRepository.save(forum);
        return ForumDtoMapper.map(savedForum);
    }

    public List<ForumDto> findForumsByUserNickname(String nickname) {
        userRepository.findByNicknameIgnoreCase(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));

        return forumRepository.findAllByUser_NicknameIgnoreCase(nickname).stream()
                .map(ForumDtoMapper::map)
                .toList();
    }

    public List<ForumDto> findAllByFilters(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return forumRepository.findAllByNameContains(name, pageable).stream()
                .map(ForumDtoMapper::map)
                .toList();
    }
}
