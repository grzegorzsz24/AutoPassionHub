package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findByTitle(String title);

    List<Article> findByTitleContainsIgnoreCase(String keyword, Pageable pageable);

    List<Article> findAllByUserEmail(String userEmail, Pageable pageable);

    List<Article> findAllByTitleContainsIgnoreCase(String title);
}
