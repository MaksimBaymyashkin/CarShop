package com.app.database.repository;


import com.app.database.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
    User findByLogin(String login);
}
