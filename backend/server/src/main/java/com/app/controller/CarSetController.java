package com.app.controller;

import com.app.database.domain.Car;
import com.app.database.domain.CarSet;
import com.app.database.dto.request.CarSetDtoRequest;
import com.app.database.dto.response.CarSetResponse;
import com.app.service.CarSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("${web.prefix}/carsets")
public class CarSetController {

    @Autowired
    private CarSetService carSetService;


    @RequestMapping(method = RequestMethod.GET)
    public List<CarSetResponse> getList() {
        return buildList(carSetService.getList());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CarSetResponse getById(@PathVariable("id") Long id) {
        return build(carSetService.getById(id));
    }

    @RequestMapping(method = RequestMethod.POST)
    public CarSetResponse create(@RequestBody CarSetDtoRequest carSetDtoRequest) {
        return build(carSetService.insert(carSetDtoRequest));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public CarSetResponse update(@PathVariable("id") Long id, @RequestBody CarSetDtoRequest carSetDtoRequest) {
        carSetDtoRequest.setId(id);
        return build(carSetService.update(carSetDtoRequest));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        carSetService.delete(id);
    }

    private CarSetResponse build(CarSet a) {
        CarSetResponse carSetResponse = new CarSetResponse(
                a.getId(),
                a.getName(),
                a.getType().getId()
        );

        if (!CollectionUtils.isEmpty(a.getCars())) {
            carSetResponse.setCarIds(a.getCars().stream().map(Car::getId).collect(Collectors.toList()));
        }

        return carSetResponse;
    }

    private List<CarSetResponse> buildList(List<CarSet> list) {
        List<CarSetResponse> responseList = new ArrayList<>(list.size());
        list.forEach((a) -> responseList.add(build(a)));

        return responseList;
    }
}

