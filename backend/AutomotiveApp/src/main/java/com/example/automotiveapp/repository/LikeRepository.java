package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findAllByPost_Id(Long id);

    Optional<Like> getLikeByUser_EmailAndPostId(String email, Long postId);

    Optional<Like> getLikeByUser_EmailAndArticleId(String email, Long articleId);
}
