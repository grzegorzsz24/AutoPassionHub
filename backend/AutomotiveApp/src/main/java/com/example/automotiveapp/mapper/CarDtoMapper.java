package com.example.automotiveapp.mapper;

import com.example.automotiveapp.domain.Car;
import com.example.automotiveapp.dto.CarDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class CarDtoMapper {
    public static CarDto map(Car car) {
        CarDto carDto = new CarDto();
        BeanUtils.copyProperties(car, carDto);
        return carDto;
    }

    public Car map(CarDto carDto) {
        Car car = new Car();
        BeanUtils.copyProperties(carDto, car);
        return car;
    }
}
