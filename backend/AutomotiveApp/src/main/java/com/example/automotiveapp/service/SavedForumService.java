package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.SavedForum;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ForumDtoMapper;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.SavedForumRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SavedForumService {
    private final SavedForumRepository savedForumRepository;
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;

    @Transactional
    public void saveForum(Long forumId) {
        Optional<SavedForum> alreadySavedForum = savedForumRepository.findByUserEmailAndForum_Id(SecurityUtils.getCurrentUserEmail(), forumId);
        if (alreadySavedForum.isPresent()) {
            savedForumRepository.deleteByForum_IdAndUserEmail(forumId, SecurityUtils.getCurrentUserEmail());
        } else {
            SavedForum savedForum = new SavedForum();
            savedForum.setForum(forumRepository.findById(forumId)
                    .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono forum")));
            savedForum.setUser(userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")));
            savedForumRepository.save(savedForum);
        }
    }

    public List<ForumDto> findSavedForums(int page, int size) {
        Long userId = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")).getId();

        Pageable pageable = PageRequest.of(page - 1, size);
        List<SavedForum> savedForums = savedForumRepository.findAllByUserId(userId, pageable);
        List<Forum> forums = new ArrayList<>();
        List<ForumDto> forumDtos = new ArrayList<>();
        savedForums.forEach(val -> forums.add(val.getForum()));
        for (Forum forum : forums) {
            ForumDto forumDto = ForumDtoMapper.map(forum);
            forumDto.setSaved(savedForumRepository.findByUserEmailAndForum_Id(SecurityUtils.getCurrentUserEmail(), forum.getId()).isPresent());
            forumDtos.add(forumDto);
        }
        return forumDtos;
    }

}
