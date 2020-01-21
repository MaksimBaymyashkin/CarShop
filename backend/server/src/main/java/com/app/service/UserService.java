package com.app.service;

import com.app.database.domain.User;
import com.app.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getList(Integer id) {
        if (!Objects.isNull(id)) {
            User user = userRepository
                    .findById(id)
                    .orElseThrow(() -> new RuntimeException("User does not exist"));

            return Collections.singletonList(user);
        }

        return (List<User>) userRepository.findAll();
    }

    public User update(User user) {
        return null;
    }

    public User insert(User user) {
        return null;
    }

    public void remove(Integer id) {
        userRepository.deleteById(id);
    }
}
