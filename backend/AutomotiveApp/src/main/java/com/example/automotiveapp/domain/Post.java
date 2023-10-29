package com.example.automotiveapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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
    private boolean isLiked;
    private int likesNumber;
    private int commentsNumber;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<File> files = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Like> likes = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Comment> comments = new HashSet<>();
}
