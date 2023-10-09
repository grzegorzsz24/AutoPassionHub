package com.example.automotiveapp.controller;

import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.service.ForumService;
import com.example.automotiveapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/forums")
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

    @GetMapping("/{nickname}")
    public ResponseEntity<List<ForumDto>> getAllUserForums(@PathVariable String nickname) {
        UserDto user = userService.findUserByNickname(nickname)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(forumService.findForumsByUserNickname(nickname));
    }

    @GetMapping
    public ResponseEntity<List<ForumDto>> getAllByFilters(@RequestParam String name) {
        return ResponseEntity.ok(forumService.findAllByFilters(name));
    }
}
