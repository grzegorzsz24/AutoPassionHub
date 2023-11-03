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

    public List<ForumDto> findAllByFilters(String title, String carBrand, String carModel, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return forumRepository.findAllByTitleAndCarBrandAndCarModel(title, carBrand, carModel, pageable).stream()
                .map(ForumDtoMapper::map)
                .toList();
    }
}
