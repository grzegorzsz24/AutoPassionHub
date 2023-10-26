package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Friendship;
import com.example.automotiveapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findByUser1OrUser2(User user1, User user2);

    Optional<Friendship> findByUser1AndUser2(User user1, User user2);
}
