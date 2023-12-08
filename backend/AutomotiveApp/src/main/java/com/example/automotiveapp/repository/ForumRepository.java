package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Forum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ForumRepository extends JpaRepository<Forum, Long> {
    List<Forum> findAllByUser_NicknameIgnoreCase(String nickname);

    List<Forum> findAllByTitleContainsIgnoreCase(String title);

    @Query("SELECT f FROM Forum f JOIN f.car s " +
            "WHERE f.title LIKE %:title% " +
            "AND (s.brand = :carBrand OR :carBrand IS NULL) " +
            "AND (s.model = :carModel OR :carModel IS NULL)")
    List<Forum> findAllByTitleAndCarBrandAndCarModel(
            String title, String carBrand, String carModel, Pageable pageable);

    @Query("SELECT COUNT(f) FROM Forum f JOIN f.car s " +
            "WHERE f.title LIKE %:title% " +
            "AND (s.brand = :carBrand OR :carBrand IS NULL) " +
            "AND (s.model = :carModel OR :carModel IS NULL)")
    Long countByTitleAndCarBrandAndCarModel(
            String title, String carBrand, String carModel);

    Optional<Forum> findByTitle(String title);
}
