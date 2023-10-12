package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.mapper.ForumDtoMapper;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForumService {
    private final ForumRepository forumRepository;
    private final UserRepository userRepository;
    private final ForumDtoMapper forumDtoMapper;

    public ForumDto saveForum(ForumDto forumDto) {
        Forum forum = forumDtoMapper.map(forumDto);
        Forum savedForum = forumRepository.save(forum);
        return ForumDtoMapper.map(savedForum);
    }

    public List<ForumDto> findForumsByUserNickname(String nickname) {
        return forumRepository.findAllByUser_NicknameIgnoreCase(nickname).stream()
                .map(ForumDtoMapper::map)
                .toList();

    }

    public List<ForumDto> findAllByFilters(String name) {
        return forumRepository.findAllByNameContains(name).stream()
                .map(ForumDtoMapper::map)
                .toList();
    }

    public Optional<ForumDto> findForumById(Long id) {
        return forumRepository.findById(id).map(ForumDtoMapper::map);
    }
}
