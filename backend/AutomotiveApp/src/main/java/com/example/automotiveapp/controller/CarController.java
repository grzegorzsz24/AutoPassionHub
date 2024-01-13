package com.example.automotiveapp.controller;

import com.example.automotiveapp.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @GetMapping
    public ResponseEntity<Map<String, List<String>>> getAllCars() {
        return ResponseEntity.ok(carService.getBrandsWithModels());
    }

    @GetMapping("/brands")
    public ResponseEntity<List<String>> getCarBrands() {
        return ResponseEntity.ok(carService.getBrands());
    }

    @GetMapping("/{brand}/models")
    public ResponseEntity<List<String>> getCarModels(@PathVariable String brand) {
        return ResponseEntity.ok(carService.getCarModels(brand));
    }
}
