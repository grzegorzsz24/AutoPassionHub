package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.dto.ReportDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.reponse.ForumResponse;
import com.example.automotiveapp.service.ForumService;
import com.example.automotiveapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user/forums")
@RequiredArgsConstructor
public class ForumController {
    private final ForumService forumService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ForumDto> addForum(@RequestBody ForumDto forum) {
        ForumDto savedForum = forumService.saveForum(forum);
        URI savedForumURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedForum.getId())
                .toUri();
        return ResponseEntity.created(savedForumURI).body(savedForum);
    }

    @GetMapping("/user/{nickname}")
    public ResponseEntity<List<ForumDto>> getAllUserForums(@PathVariable String nickname) {
        userService.findUserByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono użytkownika o podanym nickname"));
        return ResponseEntity.ok(forumService.findForumsByUserNickname(nickname));
    }

    @GetMapping("/all")
    public ResponseEntity<ForumResponse> getAllByFilters(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String carBrand,
            @RequestParam(required = false) String carModel
    ) {
        return ResponseEntity.ok(forumService.findAllByFilters(title, carBrand, carModel, page, size));
    }

    @GetMapping("/{forumId}")
    public ResponseEntity<ForumDto> getForum(@PathVariable Long forumId) {
        return ResponseEntity.ok(forumService.findForumById(forumId));
    }

    @PostMapping("/report")
    public ResponseEntity<ReportDto> reportForum(@RequestBody ReportDto reportDto) {
        return ResponseEntity.ok(forumService.reportForum(reportDto));
    }
}
