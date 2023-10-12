package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findAllByPost_Id(Long id);
}
