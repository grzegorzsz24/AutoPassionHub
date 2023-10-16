package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    Optional<File> findByUser_Id(Long userId);
}
