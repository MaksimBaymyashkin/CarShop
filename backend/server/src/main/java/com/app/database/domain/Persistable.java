package com.app.database.domain;

import java.io.Serializable;

public interface Persistable<T> extends Serializable, Cloneable {
    T getId();
}
