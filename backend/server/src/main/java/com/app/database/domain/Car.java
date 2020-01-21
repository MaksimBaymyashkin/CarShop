package com.app.database.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "CARS")
public class Car extends ExtendedBase<Long> {
    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "COLOR", nullable = false)
    private String color;

    @Column(name = "PRICE", nullable = false)
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = CarSet.class)
    @JoinColumn(name = "carset_ID", nullable = false, referencedColumnName = "id")
    private CarSet carSet;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<CarList> carLists = new ArrayList<>();

    public Car() {

    }

    public Car(String name, String color, Integer price) {
        this.name = name;
        this.color = color;
        this.price = price;
    }

    public List<CarList> getCarLists() {
        return carLists;
    }
    public void setCarLists(List<CarList> carLists) {
        this.carLists = carLists;
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

    public CarSet getCarSet() {
        return carSet;
    }
    public void setCarSet(CarSet carSet) {
        this.carSet = carSet;
    }

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
