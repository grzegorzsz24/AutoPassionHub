package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.SearchResultsDto;
import com.example.automotiveapp.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<SearchResultsDto> search(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.search(keyword));
    }
}

