package com.app.database.repository;

import com.app.database.domain.Car;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends PagingAndSortingRepository<Car, Long> {

    List<Car> findAllByCarSet_Id(Long id);

    void deleteAllByCarSet_Id(Long id);
}
