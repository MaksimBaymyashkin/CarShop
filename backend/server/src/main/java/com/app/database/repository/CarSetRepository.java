package com.app.database.repository;

import com.app.database.domain.CarSet;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CarSetRepository extends PagingAndSortingRepository<CarSet, Long> {

}
