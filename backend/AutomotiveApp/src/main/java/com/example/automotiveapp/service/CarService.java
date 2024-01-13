package com.example.automotiveapp.service;

import com.example.automotiveapp.dto.CarDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.CarDtoMapper;
import com.example.automotiveapp.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;

    public List<CarDto> getCars() {
        return carRepository.findAll().stream()
                .map(CarDtoMapper::map)
                .toList();
    }

    public List<String> getBrands() {
        return carRepository.findDistinctBrandsOrderedAlphabetically();
    }

    public List<String> getCarModels(String carBrand) {
        carRepository.findByBrand(carBrand)
                .orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono samochodu"));
        return carRepository.findBrandsByModelOrderedAlphabetically(carBrand);
    }

    public Map<String, List<String>> getBrandsWithModels() {
        List<String> brands = carRepository.findDistinctBrandsOrderedAlphabetically();
        Map<String, List<String>> brandsWithModels = new HashMap<>();

        for (String brand : brands) {
            List<String> models = carRepository.findBrandsByModelOrderedAlphabetically(brand);
            brandsWithModels.put(brand, models);
        }
        Map<String, List<String>> sortedBrandsWithModels = new TreeMap<>(Comparator.naturalOrder());
        sortedBrandsWithModels.putAll(brandsWithModels);

        return sortedBrandsWithModels;
    }
}
