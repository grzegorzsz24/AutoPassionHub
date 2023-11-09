package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.SavedForum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedForumRepository extends JpaRepository<SavedForum, Long> {
    List<SavedForum> findAllByUserId(Long userId, Pageable pageable);

    Optional<SavedForum> findByUserEmailAndForum_Id(String email, Long forumId);

    void deleteByForum_IdAndUserEmail(Long forumId, String userEmail);

}
