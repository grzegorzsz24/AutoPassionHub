package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Forum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ForumRepository extends JpaRepository<Forum, Long> {
    List<Forum> findAllByUser_NicknameIgnoreCase(String nickname);

    List<Forum> findAllByNameContains(String name, Pageable pageable);

    Optional<Forum> findByNameIgnoreCase(String name);
}
