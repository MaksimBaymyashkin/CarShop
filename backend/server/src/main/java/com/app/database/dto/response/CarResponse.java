package com.app.database.dto.response;

public class CarResponse {
    private Long id;
    private String name;
    private String color;
    private Integer price;
    private Long carSetId;
    public CarResponse(Long id, String name, String color, Integer price, Long carSetId) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.price = price;
        this.carSetId = carSetId;
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
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    public Long getCarSetId() {
        return carSetId;
    }
    public void setCarSetId(Long carSetId) {
        this.carSetId = carSetId;
    }
}
