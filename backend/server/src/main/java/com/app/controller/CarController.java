package com.app.controller;

import com.app.database.domain.Car;
import com.app.database.dto.request.CarDtoRequest;
import com.app.database.dto.response.CarResponse;
import com.app.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("${web.prefix}/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @RequestMapping(method = RequestMethod.GET)
    public List<CarResponse> getList(@RequestParam(name = "ids", required = false) List<Long> ids,
                                     @RequestParam(name = "carset_id", required = false) Long carSetId) {
        return buildList(carService.getList(ids, carSetId));
    }

    @RequestMapping(method = RequestMethod.POST)
    public CarResponse create(@RequestBody CarDtoRequest carRequest) {
        Car car = carService.insert(carRequest);
        return build(car);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public CarResponse update(@PathVariable("id") Long id,
                                @RequestBody CarDtoRequest carRequest) {
        carRequest.setId(id);
        Car car = carService.update(carRequest);
        return build(car);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        carService.delete(id);
    }

    private CarResponse build(Car t) {
        return new CarResponse(
                t.getId(),
                t.getName(),
                t.getColor(),
                t.getPrice(),
                t.getCarSet().getId()
        );
    }

    private List<CarResponse> buildList(List<Car> list) {
        List<CarResponse> responseList = new ArrayList<>(list.size());
        list.forEach((a) -> responseList.add(build(a)));

        return responseList;
    }
}

