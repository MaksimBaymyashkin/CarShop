package com.app.service;

import com.app.database.domain.CarSet;
import com.app.database.domain.Type;
import com.app.database.dto.request.CarSetDtoRequest;
import com.app.database.repository.CarSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CarSetService {

    @Autowired
    private CarSetRepository carSetRepository;

    @Autowired
    private TypeService typeService;

    @Autowired
    private CarService carService;

    public List<CarSet> getList() {
        return (List<CarSet>) carSetRepository.findAll();
    }

    public CarSet getById(Long id) {
        return carSetRepository.findById(id).orElseThrow(() -> new RuntimeException("CarSet does not exist"));
    }

    public CarSet update(CarSetDtoRequest carSetDtoRequest) {
        CarSet oldCarSet = carSetRepository
                .findById(carSetDtoRequest.getId())
                .orElseThrow(() -> new RuntimeException("CarSet does not exist"));

        CarSet carSet = new CarSet();
        carSet.setId(oldCarSet.getId());
        carSet.setName(carSetDtoRequest.getName());
        carSet.setCars(oldCarSet.getCars());

        if (!oldCarSet.getType().getId().equals(carSetDtoRequest.getTypeId())) {
            Type type = typeService.getList(carSetDtoRequest.getTypeId()).get(0);
            carSet.setType(type);
        } else {
            carSet.setType(oldCarSet.getType());
        }

        return carSetRepository.save(carSet);
    }

    @Transactional
    public CarSet insert(CarSetDtoRequest carSetDtoRequest) {
        CarSet carSet = new CarSet();
        carSet.setName(carSetDtoRequest.getName());
        carSet.setType(typeService.getList(carSetDtoRequest.getTypeId()).get(0));

        return carSetRepository.save(carSet);
    }

    @Transactional
    public void delete(Long id) {
        carService.deleteByCarSetId(id);
        carSetRepository.deleteById(id);
    }
}
