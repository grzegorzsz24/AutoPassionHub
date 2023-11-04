package com.example.automotiveapp.reponse;

import com.example.automotiveapp.dto.ForumDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ForumResponse {
    private List<ForumDto> forumDtoList;
    private int forumsNumber;
}

