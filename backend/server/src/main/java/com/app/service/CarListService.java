package com.app.service;

import com.app.database.domain.Car;
import com.app.database.domain.CarList;
import com.app.database.domain.User;
import com.app.database.dto.request.CarListDtoRequest;
import com.app.database.repository.CarListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarListService {

    @Autowired
    private CarListRepository carListRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    public CarList getById(Long id) {
        return carListRepository.findById(id).orElseThrow(() -> new RuntimeException("Playlist does not exist"));
    }

    public List<CarList> getList(Integer userId) {
        return carListRepository.findAllByUserId(userId);
    }

    public CarList insert(CarListDtoRequest carListDtoRequest) {
        User user = userService.getList(carListDtoRequest.getUserId()).get(0);
        List<Car> cars = carService.getList(carListDtoRequest.getCarIds(), null);

        CarList carList = new CarList();
        carList.setUser(user);
        carList.setName(carListDtoRequest.getName());
        carList.setCars(cars);

        return carListRepository.save(carList);
    }

    public CarList update(CarListDtoRequest carListRequest) {
        CarList old = carListRepository
                .findById(carListRequest.getId())
                .orElseThrow(() -> new RuntimeException("Carlist does not exist"));

        List<Car> cars = carService.getList(carListRequest.getCarIds(), null);
        CarList carList = new CarList();
        carList.setId(old.getId());
        carList.setName(carListRequest.getName());
        carList.setUser(old.getUser());
        carList.setCars(cars);

        return carListRepository.save(carList);
    }

    public void delete(Long id) {
        carListRepository.deleteById(id);
    }
}
