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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedForumService {
    private final SavedForumRepository savedForumRepository;
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;

    public void saveForum(Long forumId) {
        SavedForum savedForum = new SavedForum();
        savedForum.setForum(forumRepository.findById(forumId)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono forum")));
        savedForum.setUser(userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")));
        savedForumRepository.save(savedForum);
    }

    public List<ForumDto> findSavedForums(int page, int size) {
        Long userId = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika")).getId();

        Pageable pageable = PageRequest.of(page - 1, size);
        List<SavedForum> savedForums = savedForumRepository.findAllByUserId(userId, pageable);
        List<Forum> forums = new ArrayList<>();
        savedForums.forEach(val -> forums.add(val.getForum()));
        return forums.stream()
                .map(ForumDtoMapper::map)
                .toList();
    }

}
