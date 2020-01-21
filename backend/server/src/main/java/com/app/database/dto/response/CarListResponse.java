package com.app.database.dto.response;

import java.util.List;

public class CarListResponse {
    private Long id;
    private String name;
    private Integer userId;
    private List<Long> carIds;

    public CarListResponse(Long id, String name, Integer userId, List<Long> carIds) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.carIds = carIds;
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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<Long> getCarIds() {
        return carIds;
    }

    public void setCarIds(List<Long> carIds) {
        this.carIds = carIds;
    }
}
