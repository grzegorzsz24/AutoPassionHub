package com.example.automotiveapp.service;

import com.example.automotiveapp.domain.Role;
import com.example.automotiveapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        Role userRole = new Role("USER");
        roleRepository.save(userRole);
    }
}
