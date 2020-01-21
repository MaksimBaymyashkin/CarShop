package com.app.database;

import com.app.database.domain.Type;
import com.app.database.domain.User;
import com.app.database.repository.TypeRepository;
import com.app.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DBLoader implements CommandLineRunner {
    private final String[] typeNames = {"Седан", "Хэтчбек", "Универсал", "Купе", "Внедорожник"};

    private final TypeRepository typeRepository;
    private final UserRepository userRepository;

    @Autowired
    public DBLoader(TypeRepository _type, UserRepository _user) {
        this.typeRepository = _type;
        this.userRepository = _user;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.generateTypes();
        this.generateUsers();
    }

    private void generateTypes() throws Exception {
        ArrayList<Type> types = new ArrayList<>();

        for (String typeName : this.typeNames) {
            Type type = new Type();
            type.setName(typeName);
            types.add(type);
        }

        this.typeRepository.saveAll(types);
    }

    private void generateUsers() throws Exception {
        User user = new User();
        user.setName("Maksim");
        user.setLogin("admin");
        user.setPassword("admin");

        User user2 = new User();
        user2.setName("Test");
        user2.setLogin("test");
        user2.setPassword("test");

        this.userRepository.save(user);
        this.userRepository.save(user2);
    }
}
