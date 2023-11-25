package com.example.automotiveapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class ChannelDto {
    private Long id;
    private Set<Long> users;
}
