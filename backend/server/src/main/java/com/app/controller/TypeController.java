package com.app.controller;

import com.app.database.domain.Type;
import com.app.database.dto.response.TypeResponse;
import com.app.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("${web.prefix}/types")
public class TypeController {

    @Autowired
    private TypeService typeService;


    @RequestMapping(method = RequestMethod.GET)
    public List<TypeResponse> getList(@RequestParam(name = "id", required = false) Integer typeId) {
        return buildList(typeService.getList(typeId));
    }

    private TypeResponse build(Type g) {
        return new TypeResponse(g.getId(), g.getName());
    }

    private List<TypeResponse> buildList(List<Type> list) {
        List<TypeResponse> responseList = new ArrayList<>(list.size());
        list.forEach((a) -> responseList.add(build(a)));

        return responseList;
    }
}

