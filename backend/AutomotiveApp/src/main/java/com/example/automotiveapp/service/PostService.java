package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.mapper.PostDtoMapper;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.PostRepository;
import com.example.automotiveapp.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final PostDtoMapper postDtoMapper;
    private final FileStorageService fileStorageService;
    private final FileRepository fileRepository;

    public PostDto savePost(PostDto postDto) {
        Post post = postDtoMapper.map(postDto);
        post.setPostedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        Set<File> files = new HashSet<>();
        if (postDto.getFile() != null) {
            List<String> savedImageNames = fileStorageService.saveImage(postDto.getFile());
            for (String imageName : savedImageNames) {
                File file = new File();
                file.setFileUrl(imageName);
                file.setPost(post);
                files.add(file);
            }
            post.setFiles(files);
        }
        Post savedPost = postRepository.save(post);
        fileRepository.saveAll(files);
        return PostDtoMapper.map(savedPost);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public Optional<PostDto> findPostById(long id) {
        return postRepository.findById(id).map(PostDtoMapper::map);
    }

    public void updatePost(PostDto postToUpdate) {
        Post post = postDtoMapper.map(postToUpdate);
        postRepository.save(post);
    }

    public List<PostDto> findPostsByForumId(Long id) {
        return postRepository.findAllByForum_Id(id).stream()
                .map(PostDtoMapper::map)
                .toList();
    }
}
