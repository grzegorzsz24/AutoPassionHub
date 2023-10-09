package com.example.automotiveapp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.springframework.cglib.core.Local;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "post")
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime postedAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "forum_id")
    private Forum forum;

    @OneToMany(mappedBy = "post")
    private Set<File> files = new HashSet<>();

    @OneToMany(mappedBy = "post")
    private Set<File> likes = new HashSet<>();
}
