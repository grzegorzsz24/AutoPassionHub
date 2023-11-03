package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Comment;
import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.dto.CommentDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.CommentDtoMapper;
import com.example.automotiveapp.repository.CommentRepository;
import com.example.automotiveapp.repository.ForumRepository;
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
    private final ForumRepository forumRepository;

    public CommentDto saveComment(CommentDto commentDto) {
        Comment comment = commentDtoMapper.map(commentDto);
        comment.setCommentedAt((LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS)));

        if (comment.getPost() != null) {
            Post post = comment.getPost();
            post.getComments().add(comment);
            post.setCommentsNumber(post.getCommentsNumber() + 1);
        } else if (comment.getForum() != null) {
            Forum forum = comment.getForum();
            forum.getComments().add(comment);
            forum.setCommentsNumber(forum.getCommentsNumber() + 1);
        }

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
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isPresent()) {
            Comment commentToDelete = comment.get();
            if (commentToDelete.getPost() != null) {
                commentToDelete.getPost().setCommentsNumber(commentToDelete.getPost().getCommentsNumber() - 1);
                commentToDelete.getPost().getComments().remove(commentToDelete);
            } else if (commentToDelete.getForum() != null) {
                commentToDelete.getForum().setCommentsNumber(commentToDelete.getForum().getCommentsNumber() - 1);
                commentToDelete.getForum().getComments().remove(commentToDelete);
            }
            commentRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Nie znaleziono komentarza");
        }
    }

    public List<CommentDto> findCommentsByPostId(Long postId) {
        if (postService.findPostById(postId).isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono posta");
        }
        return commentRepository.findAllByPostId(postId).stream()
                .map(CommentDtoMapper::map)
                .toList();
    }

    public List<CommentDto> findCommentsByForumId(Long forumId) {
        if (forumRepository.findById(forumId).isEmpty()) {
            throw new ResourceNotFoundException("Nie znaleziono forum");
        }
        return commentRepository.findAllByForum_Id(forumId).stream()
                .map(CommentDtoMapper::map)
                .toList();
    }
}
