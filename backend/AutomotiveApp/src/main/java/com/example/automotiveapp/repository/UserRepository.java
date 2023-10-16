package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNicknameIgnoreCase(String nickname);

    Optional<User> findByEmail(String email);
}
