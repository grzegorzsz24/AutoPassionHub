package com.example.automotiveapp;

import com.example.automotiveapp.domain.Event;
import com.example.automotiveapp.dto.EventDto;
import com.example.automotiveapp.repository.EventRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.hamcrest.Matchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = AutomotiveAppApplication.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@ActiveProfiles(profiles = "dev")
public class EventControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EventRepository eventRepository;

    @Test
    @WithMockUser(authorities = {"USER"}, username = "dawid@example.com")
    public void testAddEvent() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "event",
                "event.jpg",
                MediaType.IMAGE_JPEG.toString(),
                "asdasdas".getBytes()
        );
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        mockMvc.perform(multipart("/user/events")
                        .file("image", file.getBytes())
                        .param("title", "Wydarzenie motoryzacyjne")
                        .param("city", "Lublin")
                        .param("eventDate", "2022-12-11T18:54:32.33")
                        .param("description", "Opis wydarzenia")
                        .param("user", "1")
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated());
        Event foundEvent = eventRepository.findByTitle("Wydarzenie motoryzacyjne").get();

        assertThat(foundEvent).isNotNull();
        assertThat(foundEvent.getTitle()).isEqualTo("Wydarzenie motoryzacyjne");
        assertThat(foundEvent.getDescription()).isEqualTo("Opis wydarzenia");

    }

}
