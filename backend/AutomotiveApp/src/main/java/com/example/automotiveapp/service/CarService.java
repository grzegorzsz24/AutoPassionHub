package com.example.automotiveapp.service;

import com.example.automotiveapp.dto.CarDto;
import com.example.automotiveapp.exception.ResourceNotFoundException;
import com.example.automotiveapp.mapper.CarDtoMapper;
import com.example.automotiveapp.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
