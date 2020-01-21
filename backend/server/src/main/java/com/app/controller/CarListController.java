package com.app.controller;

import com.app.database.domain.Car;
import com.app.database.domain.CarList;
import com.app.database.dto.request.CarListDtoRequest;
import com.app.database.dto.response.CarListResponse;
import com.app.service.CarListService;
import com.app.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("${web.prefix}/carlists")
public class CarListController {

    @Autowired
    private CarListService carListService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CarListResponse getById(@PathVariable("id") Long id) {
        return build(carListService.getById(id));
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<CarListResponse> getList(@AuthenticationPrincipal SecurityUser securityUser) {
        return this.buildList(carListService.getList(securityUser.getUser().getId()));
    }

    @RequestMapping(method = RequestMethod.POST)
    public CarListResponse create(@AuthenticationPrincipal SecurityUser securityUser,
                                   @RequestBody CarListDtoRequest carListDtoRequest) {
        carListDtoRequest.setUserId(securityUser.getUser().getId());
        return build(carListService.insert(carListDtoRequest));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public CarListResponse update(@PathVariable("id") Long id,
                                   @RequestBody CarListDtoRequest carListDtoRequest) {
        carListDtoRequest.setId(id);

        return build(carListService.update(carListDtoRequest));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        carListService.delete(id);
    }

    private CarListResponse build(CarList p) {
        return new CarListResponse(
                p.getId(),
                p.getName(),
                p.getUser().getId(),
                p.getCars().stream().map(Car::getId).collect(Collectors.toList())
        );
    }

    private List<CarListResponse> buildList(List<CarList> list) {
        List<CarListResponse> responseList = new ArrayList<>(list.size());
        list.forEach((p) -> responseList.add(build(p)));

        return responseList;
    }
}

