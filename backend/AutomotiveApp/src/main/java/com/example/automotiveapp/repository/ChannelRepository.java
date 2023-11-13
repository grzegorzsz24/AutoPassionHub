package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
}
