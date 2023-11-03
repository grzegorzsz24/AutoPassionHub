package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.repository.CarRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.example.automotiveapp.service.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForumDtoMapper {
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    public static ForumDto map(Forum forum) {
        ForumDto forumDto = new ForumDto();
        BeanUtils.copyProperties(forum, forumDto);
        forumDto.setUser(forum.getUser().getNickname());
        forumDto.setFirstName(forum.getUser().getFirstName());
        forumDto.setLastName(forum.getUser().getLastName());
        forumDto.setUserImageUrl("http://localhost:8080/images/" + forum.getUser().getFile().getFileUrl());
        forumDto.setCarBrand(forum.getCar().getBrand());
        forumDto.setCarModel(forum.getCar().getModel());
        return forumDto;
    }

    public Forum map(ForumDto forumDto) {
        Forum forum = new Forum();
        BeanUtils.copyProperties(forumDto, forum);
        Optional<User> user = userRepository.findByEmail(SecurityUtils.getCurrentUserEmail());
        user.ifPresent(forum::setUser);
        forum.setCreatedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        forum.setCar(carRepository.findByModelAndBrand(forumDto.getCarModel(), forumDto.getCarBrand())
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono samochodu")));
        return forum;
    }
}
