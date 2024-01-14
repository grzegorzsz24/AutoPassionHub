package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findAllByTitleContainsIgnoreCase(String title);

    Optional<Event> findByTitle(String title);
  
    List<Event> findAllByTitleContainsIgnoreCaseOrderByEventDateAsc(String title);
}
