package com.rafael.ysdbackendt.dao;


import com.rafael.ysdbackendt.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public class UserDao{

    private final String REGISTER_USER_QUERY = "WITH insertUser as(INSERT INTO users(firstname, lastname, email, password, yearofbirth) VALUES (?, ?, ?, ?,?) RETURNING  iduser as userid) INSERT INTO collections(idcollection) VALUES ((select userid from insertUser));";
    private final String FIND_BY_EMAIL_QUERY = "SELECT * from users where email = ?";

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public User findByEmail(String email){
        try{
            Object[] arg = {email};
            User user = jdbcTemplate.queryForObject(FIND_BY_EMAIL_QUERY, arg, new BeanPropertyRowMapper<>(User.class));
            return user;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

    }


    public User save(User user) {
        System.out.println(user);
        jdbcTemplate.update(REGISTER_USER_QUERY, user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword(), user.getYearOfBirth());
        return user;
    }


}
