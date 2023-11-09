package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.SavedArticle;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedArticleRepository extends JpaRepository<SavedArticle, Long> {
    List<SavedArticle> findAllByUserId(Long userId, Pageable pageable);

    Optional<SavedArticle> findByUserEmailAndArticle_Id(String email, Long articleId);

    void deleteByArticle_IdAndUserEmail(Long articleId, String userEmail);
}
