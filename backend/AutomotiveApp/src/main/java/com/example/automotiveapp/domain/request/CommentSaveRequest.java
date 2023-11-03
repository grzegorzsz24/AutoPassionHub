package com.example.automotiveapp.domain.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentSaveRequest {
    private String content;
    private Long post;
    private Long forum;

}
