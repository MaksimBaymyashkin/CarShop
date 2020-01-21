package com.app.database.dto.request;

import java.util.List;

public class CarListDtoRequest {
    private Long id;
    private Integer userId;
    private String name;
    private List<Long> carIds;

    public List<Long> getCarIds() {
        return carIds;
    }
    public void setCarIds(List<Long> carIds) {
        this.carIds = carIds;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
