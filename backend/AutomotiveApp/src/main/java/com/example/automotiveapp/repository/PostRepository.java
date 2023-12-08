package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);

    List<Post> findAllByUserId(Long userId);

    List<Post> findAllByContentContainsIgnoreCase(String content);
}
