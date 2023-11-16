package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Channel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    @Query("SELECT c FROM Channel c WHERE (c.sender.id = :senderId AND c.receiver.id = :receiverId) OR (c.sender.id = :receiverId AND c.receiver.id = :senderId)")
    Optional<Channel> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(@Param("senderId") Long senderId, @Param("receiverId") Long receiverId);

    List<Channel> findAllBySenderIdOrReceiverId(Long id, Long id2);

    @Transactional
    @Modifying
    @Query("DELETE FROM Channel c WHERE (c.sender = :id1 AND c.receiver = :id2) OR (c.sender = :id2 AND c.receiver = :id1)")
    void deleteChannelBySenderAndReceiverIds(Long id1, Long id2);
}
