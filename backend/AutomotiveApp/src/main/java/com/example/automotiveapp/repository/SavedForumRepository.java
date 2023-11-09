package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.SavedForum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedForumRepository extends JpaRepository<SavedForum, Long> {
    List<SavedForum> findAllByUserId(Long userId, Pageable pageable);

}
