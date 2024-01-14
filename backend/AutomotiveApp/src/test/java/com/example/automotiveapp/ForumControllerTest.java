package com.example.automotiveapp;

import com.example.automotiveapp.domain.File;
import com.example.automotiveapp.domain.Forum;
import com.example.automotiveapp.domain.User;
import com.example.automotiveapp.dto.ForumDto;
import com.example.automotiveapp.repository.CarRepository;
import com.example.automotiveapp.repository.FileRepository;
import com.example.automotiveapp.repository.ForumRepository;
import com.example.automotiveapp.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest(classes = AutomotiveAppApplication.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@ActiveProfiles(profiles = "dev")
public class ForumControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ForumRepository forumRepository;
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private FileRepository fileRepository;

    @Test
    @WithMockUser(authorities = {"USER"})
    public void testGetAllByFilters() throws Exception {
        String title = "";
        mockMvc.perform(MockMvcRequestBuilders.get("/user/forums/all")
                        .param("carBrand", "Ferrari")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[*].car.brand", everyItem(is("Ferrari"))));;
        List<Forum> savedForums = forumRepository.findAllByTitleContainsIgnoreCase(title);
        assertThat(savedForums).isNotNull();
    }
}
