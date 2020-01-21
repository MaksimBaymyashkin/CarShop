package com.app.service;

import com.app.database.domain.Car;
import com.app.database.domain.CarList;
import com.app.database.domain.CarSet;
import com.app.database.dto.request.CarDtoRequest;
import com.app.database.repository.CarListRepository;
import com.app.database.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;
    @Autowired
    private CarSetService carSetService;
    @Autowired
    private CarListRepository carListRepository;

    public List<Car> getList(List<Long> ids, Long carSetId) {
        if (!CollectionUtils.isEmpty(ids)) {
            return (List<Car>) carRepository.findAllById(ids);
        }

        return carRepository.findAllByCarSet_Id(carSetId);
    }

    public Car update(CarDtoRequest carRequest) {
        Car oldCar = carRepository
                .findById(carRequest.getId())
                .orElseThrow(() -> new RuntimeException("Car does not exist"));
        Car car = new Car(oldCar.getName(), oldCar.getColor(), oldCar.getPrice());

        return carRepository.save(car);
    }

    public Car insert(CarDtoRequest carRequest) {
        Car car = new Car(carRequest.getName(), carRequest.getColor(), carRequest.getPrice());
        CarSet carSet = carSetService.getById(carRequest.getCarSetId());
        car.setCarSet(carSet);

        return carRepository.save(car);
    }

    public void deleteByCarSetId(Long carSetId) {
        carRepository.deleteAllByCarSet_Id(carSetId);
    }

    public void delete(Long id) {
        Car car = carRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Car does not exist"));

        List<CarList> playlists = carListRepository.findAllByCarsIsContaining(car);
        playlists.forEach((p) -> {
            List<Car> cars = p.getCars().stream().filter((t) -> !t.getId().equals(id)).collect(Collectors.toList());
            p.setCars(cars);
            carListRepository.save(p);
        });

        carRepository.deleteById(id);
    }
}
