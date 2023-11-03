package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForumDtoMapper {
    private final UserRepository userRepository;

    public static ForumDto map(Forum forum) {
        ForumDto forumDto = new ForumDto();
        BeanUtils.copyProperties(forum, forumDto);
        forumDto.setUser(forum.getUser().getNickname());
        return forumDto;
    }

    public Forum map(ForumDto forumDto) {
        Forum forum = new Forum();
        BeanUtils.copyProperties(forumDto, forum);
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        user.ifPresent(forum::setUser);
        return forum;
    }
}
