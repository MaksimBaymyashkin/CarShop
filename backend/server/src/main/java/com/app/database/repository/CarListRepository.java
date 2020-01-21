package com.app.database.repository;

import com.app.database.domain.Car;
import com.app.database.domain.CarList;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarListRepository extends PagingAndSortingRepository<CarList, Long> {
    List<CarList> findAllByCarsIsContaining(Car car);

    List<CarList> findAllByUserId(Integer userId);

    void deleteById(Long id);
}
