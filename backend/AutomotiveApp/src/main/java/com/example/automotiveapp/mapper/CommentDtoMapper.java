package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Comment;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.CommentDto;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentDtoMapper {
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public static CommentDto map(Comment comment) {
        CommentDto commentDto = new CommentDto();
        BeanUtils.copyProperties(comment, commentDto);
        commentDto.setUser(comment.getUser().getNickname());
        commentDto.setPost(comment.getPost().getId());
        return commentDto;
    }

    public Comment map(CommentDto commentDto) {
        Comment comment = new Comment();
        BeanUtils.copyProperties(commentDto, comment);
        Optional<User> user = userRepository.findByNicknameIgnoreCase(commentDto.getUser());
        Optional<Post> post = postRepository.findById(commentDto.getPost());
        user.ifPresent(comment::setUser);
        post.ifPresent(comment::setPost);
        return comment;
    }
}
