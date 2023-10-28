package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatchException;
import com.github.fge.jsonpatch.mergepatch.JsonMergePatch;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<PostDto> addPost(@ModelAttribute PostDto post) {
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

    private PostDto applyPatch(PostDto postDto, JsonMergePatch patch) throws JsonPatchException, JsonProcessingException {
        JsonNode postNode = objectMapper.valueToTree(postDto);
        JsonNode postPatchedNode = patch.apply(postNode);
        return objectMapper.treeToValue(postPatchedNode, PostDto.class);
    }
    @GetMapping("/friends")
    public ResponseEntity<List<PostDto>> getFriendsPosts() {
        return ResponseEntity.ok(postService.getFriendsPosts());
    }

    @GetMapping("/user")
    public ResponseEntity<List<PostDto>> getUserPosts(@RequestParam Long userId) {
        return ResponseEntity.ok(postService.getUserPosts(userId));
    }
}
