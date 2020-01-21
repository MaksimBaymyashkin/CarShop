package com.app.database.domain;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "carsets")
public class CarSet extends ExtendedBase<Long> {

    @Column(name = "NAME", nullable = false)
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TYPE_ID", unique = true, nullable = false)
    private Type type;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "carSet")
    private List<Car> cars;


    public String getName() { return name; }
    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }
    public void setType(Type type) {
        this.type = type;
    }

    public List<Car> getCars() {
        return cars;
    }
    public void setCars(List<Car> cars) {
        this.cars = cars;
    }
}
