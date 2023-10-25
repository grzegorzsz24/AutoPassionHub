package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Role;
import com.example.automotiveapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        Role userRole = new Role("USER");
        roleRepository.save(userRole);
    }
}
