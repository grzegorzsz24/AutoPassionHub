package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Comment;
import com.example.automotiveapp.dto.CommentDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.CommentDtoMapper;
import com.example.automotiveapp.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentDtoMapper commentDtoMapper;
    private final PostService postService;

    public CommentDto saveComment(CommentDto commentDto) {
        Comment comment = commentDtoMapper.map(commentDto);
        comment.setCommentedAt((LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS)));
        Comment savedComment = commentRepository.save(comment);
        return CommentDtoMapper.map(savedComment);
    }

    public Optional<CommentDto> findCommentById(long id) {
        return Optional.ofNullable(commentRepository.findById(id)
                .map(CommentDtoMapper::map).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono komentarza")));
    }

    public void updateComment(CommentDto commentToUpdate) {
        Comment comment = commentDtoMapper.map(commentToUpdate);
        commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }


    public List<CommentDto> findCommentsByPostId(Long postId) {
        if (postService.findPostById(postId).isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono posta");
        }
        return commentRepository.findAllByPostId(postId).stream()
                .map(CommentDtoMapper::map)
                .toList();
    }
}
