package com.app.database.domain;

import javax.persistence.*;

@MappedSuperclass
public abstract class Base<T> implements Persistable<T> {
    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private T id;

    public T getId() {
        return id;
    }
    public void setId(T id) {
        this.id = id;
    }
}
