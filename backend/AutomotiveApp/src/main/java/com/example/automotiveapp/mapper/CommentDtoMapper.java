package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Comment;
import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.CommentDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentDtoMapper {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ForumRepository forumRepository;

    public static CommentDto map(Comment comment) {
        CommentDto commentDto = new CommentDto();
        BeanUtils.copyProperties(comment, commentDto);
        commentDto.setUser(comment.getUser().getNickname());
        commentDto.setFirstName(comment.getUser().getFirstName());
        commentDto.setLastName(comment.getUser().getLastName());
        commentDto.setUserImageUrl("http://localhost:8080/images/" + comment.getUser().getFile().getFileUrl());
        if (comment.getForum() != null) {
            commentDto.setForum(comment.getForum().getId());
        } else if (comment.getPost() != null) {
            commentDto.setPost(comment.getPost().getId());
        }
        return commentDto;
    }

    public Comment map(CommentDto commentDto) {
        Comment comment = new Comment();
        BeanUtils.copyProperties(commentDto, comment);
        Optional<User> user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        user.ifPresent(comment::setUser);
        if (commentDto.getPost() != null) {
            Optional<Post> post = postRepository.findById(commentDto.getPost());
            post.ifPresent(comment::setPost);
        } else if (commentDto.getForum() != null) {
            Optional<Forum> forum = forumRepository.findById(commentDto.getForum());
            forum.ifPresent(comment::setForum);
        } else {
            throw new BadRequestException("Podaj post lub forum");
        }
        return comment;
    }
}
