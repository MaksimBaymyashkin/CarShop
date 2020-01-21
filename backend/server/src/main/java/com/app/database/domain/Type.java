package com.app.database.domain;

import javax.persistence.*;

@Entity
@Table(name = "types")
public class Type extends Base<Integer> {
    @Column(name = "NAME", nullable = false)
    private String name;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "type")
    private CarSet carSet;

    public CarSet getCarSet() {
        return carSet;
    }
    public void setCarSet(CarSet carSet) {
        this.carSet = carSet;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) { this.name = name; }
}
