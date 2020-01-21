package com.app.database.dto.response;

import java.util.List;

public class CarSetResponse {
    private Long id;
    private String name;
    private Integer typeId;
    private List<Long> carIds;

    public CarSetResponse(Long id, String name, Integer typeId) {
        this.id = id;
        this.name = name;
        this.typeId = typeId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public List<Long> getCarIds() {
        return carIds;
    }

    public void setCarIds(List<Long> carIds) {
        this.carIds = carIds;
    }
}
