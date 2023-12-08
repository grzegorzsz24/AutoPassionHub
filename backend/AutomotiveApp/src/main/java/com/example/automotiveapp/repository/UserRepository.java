package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNicknameIgnoreCase(String nickname);

    Optional<User> findByEmail(String email);


    @Query("SELECT u FROM User u WHERE " +
            "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> searchUsers(@Param("keyword") String keyword);

    @Query("SELECT u2 FROM User u1 JOIN Friendship f ON u1 = f.user1 JOIN User u2 ON f.user2 = u2 WHERE u1.email = :keyword")
    List<User> findUserFriends(@Param("keyword") String email);

    @Query("SELECT u FROM User u WHERE u.publicProfile = true")
    List<User> findPublicProfiles();

}
