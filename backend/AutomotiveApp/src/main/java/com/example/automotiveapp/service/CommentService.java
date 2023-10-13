package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Comment;
import com.example.automotiveapp.dto.CommentDto;
import com.example.automotiveapp.mapper.CommentDtoMapper;
import com.example.automotiveapp.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentDtoMapper commentDtoMapper;

    public CommentDto saveComment(CommentDto commentDto) {
        Comment comment = commentDtoMapper.map(commentDto);
        comment.setCommentedAt((LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS)));
        Comment savedComment = commentRepository.save(comment);
        return CommentDtoMapper.map(savedComment);
    }

    public Optional<CommentDto> findCommentById(long id) {
        return commentRepository.findById(id).map(CommentDtoMapper::map);
    }

    public void updateComment(CommentDto commentToUpdate) {
        Comment comment = commentDtoMapper.map(commentToUpdate);
        commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }


}
