package com.example.automotiveapp.reponse;

import com.example.automotiveapp.dto.PostDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PostResponse {
    private List<PostDto> posts;
    private long postsNumber;
}
