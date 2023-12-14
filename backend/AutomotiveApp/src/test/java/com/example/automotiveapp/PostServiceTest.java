package com.example.automotiveapp;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Post;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.domain.request.PostSaveRequest;
import com.example.automotiveapp.dto.PostDto;
import com.example.automotiveapp.exception.BadRequestException;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.ReportDtoMapper;
import com.example.automotiveapp.reponse.PostResponse;
import com.example.automotiveapp.repository.*;
import com.example.automotiveapp.service.PostService;
import com.example.automotiveapp.service.utils.SecurityUtils;
import com.example.automotiveapp.storage.FileStorageService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ActiveProfiles(profiles = "dev")
public class PostServiceTest {
    @Mock
    private PostRepository postRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private FileStorageService fileStorageService;
    @Mock
    private ReportRepository reportRepository;
    @Mock
    private ReportDtoMapper reportDtoMapper;
    @Mock
    private SecurityContextHolder securityContextHolder;
    @Mock
    private FileRepository fileRepository;
    @Mock
    private LikeRepository likeRepository;
    @InjectMocks
    private PostService postService;
    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void testGetPostsForPublicUser() {
        User publicUser = new User();
        publicUser.setId(1L);
        publicUser.setPublicProfile(true);
        publicUser.setEmail("user1@example.com");
        publicUser.setDateOfBirth(new Date());
        publicUser.setNickname("nick1");
        publicUser.setFile(new File());

        Pageable pageable = PageRequest.of(0, 10);

        List<Post> publicUserPosts = new ArrayList<>();
        Post post1 = new Post();
        post1.setUser(publicUser);
        publicUserPosts.add(post1);
        Post post2 = new Post();
        post2.setUser(publicUser);
        publicUserPosts.add(post2);

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);


        when(userRepository.findById(1L)).thenReturn(Optional.of(publicUser));
        when(postRepository.findAllByUserIdOrderByPostedAtDesc(1L)).thenReturn(publicUserPosts);

        PostResponse publicUserPostResponse = postService.getUserPosts(1L, pageable);

        verify(userRepository, times(1)).findById(1L);
        verify(postRepository, times(1)).findAllByUserIdOrderByPostedAtDesc(1L);

        assertEquals(2, publicUserPostResponse.getPosts().size());
    }

    @Test
    void testGetPostsForPrivateUserThrowsException() {
        User privateUser = new User();
        privateUser.setId(2L);
        privateUser.setPublicProfile(false);

        Pageable pageable = PageRequest.of(0, 10);
        when(userRepository.findById(2L)).thenReturn(Optional.of(privateUser));

        assertThrows(BadRequestException.class, () -> postService.getUserPosts(2L, pageable));
        verify(userRepository, times(1)).findById(2L);
    }

    @Test
    void testDeleteNonExistingPostThrowsException() {
        Long postId = 1L;
        when(postRepository.findById(postId)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> postService.deletePost(postId));
        verifyNoInteractions(fileStorageService);
        verify(postRepository, never()).deleteById(anyLong());
    }

    @Test
    void testDeleteExistingPostWithFiles() {
        Long postId = 1L;
        Post post = new Post();
        post.setId(postId);
        File file1 = new File();
        file1.setFileUrl("image1.jpg");
        File file2 = new File();
        file2.setFileUrl("image2.jpg");
        post.setFiles(Set.of(file1, file2));
        User user = new User();
        user.setFile(new File());
        post.setUser(user);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        postService.deletePost(postId);

        verify(fileStorageService, times(1)).deleteFile("image1.jpg");
        verify(fileStorageService, times(1)).deleteFile("image2.jpg");
        verify(postRepository, times(1)).deleteById(postId);
    }

    @Test
    void testSavePost() throws IOException {
        String userEmail = "test@example.com";
        String content = "Test content";
        User user = new User();
        user.setEmail(userEmail);
        user.setNickname("nick1");
        user.setFile(new File());
        PostSaveRequest postToSave = new PostSaveRequest();
        postToSave.setContent(content);

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(SecurityUtils.getCurrentUserEmail()).thenReturn(userEmail);
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user));

        when(postRepository.save(any(Post.class))).thenAnswer(invocation -> {
            Post savedPost = invocation.getArgument(0);
            savedPost.setId(1L);
            return savedPost;
        });
        PostDto result = postService.savePost(postToSave);
        verify(userRepository, times(1)).findByEmail(userEmail);
        verify(postRepository, times(1)).save(any(Post.class));
        assertNotNull(result);
        assertEquals(content, result.getContent());
    }

}
