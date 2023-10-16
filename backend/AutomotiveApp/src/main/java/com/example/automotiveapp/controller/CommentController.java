package com.example.automotiveapp.controller;

import com.example.automotiveapp.dto.CommentDto;
import com.example.automotiveapp.service.CommentService;
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
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<CommentDto> addComment(@RequestBody CommentDto comment) {
        CommentDto savedComment = commentService.saveComment(comment);
        URI savedCommentURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedComment.getId())
                .toUri();
        return ResponseEntity.created(savedCommentURI).body(savedComment);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long id, @RequestBody JsonMergePatch patch) {
        try {
            CommentDto commentDto = commentService.findCommentById(id).orElseThrow();
            CommentDto commentPatched = applyPatch(commentDto, patch);
            commentService.updateComment(commentPatched);

        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.internalServerError().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    private CommentDto applyPatch(CommentDto commentDto, JsonMergePatch patch) throws JsonPatchException, JsonProcessingException {
        JsonNode commentNode = objectMapper.valueToTree(commentDto);
        JsonNode commentPatchedNode = patch.apply(commentNode);
        return objectMapper.treeToValue(commentPatchedNode, CommentDto.class);
    }
}
