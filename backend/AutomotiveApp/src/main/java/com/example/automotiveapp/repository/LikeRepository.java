package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
}
