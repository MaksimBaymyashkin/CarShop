package com.app.service;

import com.app.database.domain.Type;
import com.app.database.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;


@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    public List<Type> getList(Integer id) {
        if (!Objects.isNull(id)) {
            Type type = typeRepository.findById(id).orElseThrow(() -> new RuntimeException("Type does not exist"));
            return Collections.singletonList(type);
        }
        return (List<Type>) typeRepository.findAll();
    }
}
