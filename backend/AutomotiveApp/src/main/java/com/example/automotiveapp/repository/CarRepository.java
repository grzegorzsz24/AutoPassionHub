package com.example.automotiveapp.repository;

import com.example.automotiveapp.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<Car> findByModelAndBrand(String model, String brand);

    @Query("SELECT DISTINCT c.brand FROM Car c ORDER BY c.brand")
    List<String> findDistinctBrandsOrderedAlphabetically();

    @Query("SELECT DISTINCT c.model FROM Car c WHERE c.brand = :brand ORDER BY c.model")
    List<String> findBrandsByModelOrderedAlphabetically(String brand);

    Optional<Car> findByBrand(String brand);
}
