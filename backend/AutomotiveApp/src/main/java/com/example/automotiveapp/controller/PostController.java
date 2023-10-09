package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.dto.UserDto;
import com.example.automotiveapp.service.ForumService;
import com.example.automotiveapp.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatchException;
import com.github.fge.jsonpatch.mergepatch.JsonMergePatch;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final ObjectMapper objectMapper;
    private final ForumService forumService;

    @PostMapping
    public ResponseEntity<PostDto> addPost(@ModelAttribute PostDto post) throws IOException {
        PostDto savedPost = postService.savePost(post);
        URI savedPostURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedPost.getId())
                .toUri();
        return ResponseEntity.created(savedPostURI).body(savedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody JsonMergePatch patch) {
        try {
            PostDto postDto = postService.findPostById(id).orElseThrow();
            PostDto postPatched = applyPatch(postDto, patch);
            postService.updatePost(postPatched);

        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.internalServerError().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{forumId}")
    public ResponseEntity<List<PostDto>> getAllForumPosts(@PathVariable Long forumId) {
        ForumDto forum = forumService.findForumById(forumId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(postService.findPostsByForumId(forumId));
    }

    private PostDto applyPatch(PostDto postDto, JsonMergePatch patch) throws JsonPatchException, JsonProcessingException {
        JsonNode postNode = objectMapper.valueToTree(postDto);
        JsonNode postPatchedNode = patch.apply(postNode);
        return objectMapper.treeToValue(postPatchedNode, PostDto.class);
    }
}
