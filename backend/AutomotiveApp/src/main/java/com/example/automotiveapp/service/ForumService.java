package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ForumDtoMapper;
import com.example.automotiveapp.reponse.ForumResponse;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.SavedForumRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumService {
    private final ForumRepository forumRepository;
    private final ForumDtoMapper forumDtoMapper;
    private final UserRepository userRepository;
    private final SavedForumRepository savedForumRepository;

    public ForumDto saveForum(ForumDto forumDto) {
        Forum forum = forumDtoMapper.map(forumDto);
        Forum savedForum = forumRepository.save(forum);
        return ForumDtoMapper.map(savedForum);
    }

    public List<ForumDto> findForumsByUserNickname(String nickname) {
        userRepository.findByNicknameIgnoreCase(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika"));

        List<Forum> forums = forumRepository.findAllByUser_NicknameIgnoreCase(nickname);
        List<ForumDto> forumDtos = new ArrayList<>();
        setForumSavedStatus(forums, forumDtos);
        return forumDtos;
    }

    public ForumResponse findAllByFilters(String title, String carBrand, String carModel, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Long totalResults = forumRepository.countByTitleAndCarBrandAndCarModel(title, carBrand, carModel);
        List<Forum> forumList = forumRepository.findAllByTitleAndCarBrandAndCarModel(title, carBrand, carModel, pageable);
        List<ForumDto> forumDtos = new ArrayList<>();
        setForumSavedStatus(forumList, forumDtos);
        return new ForumResponse(forumDtos, totalResults);
    }

    public ForumDto findForumById(Long forumId) {
        Forum forum = forumRepository.findById(forumId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono forum"));
        ForumDto forumDto = ForumDtoMapper.map(forum);
        forumDto.setSaved(savedForumRepository.findByUserEmailAndForum_Id(SecurityUtils.getCurrentUserEmail(), forum.getId()).isPresent());
        return forumDto;
    }

    private void setForumSavedStatus(List<Forum> forums, List<ForumDto> forumDtos) {
        for (Forum forum : forums) {
            ForumDto forumDto = ForumDtoMapper.map(forum);
            forumDto.setSaved(savedForumRepository.findByUserEmailAndForum_Id(SecurityUtils.getCurrentUserEmail(), forum.getId()).isPresent());
            forumDtos.add(forumDto);
        }
    }
}
