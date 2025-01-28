package com.rafael.ysdbackendt.service;


import com.rafael.ysdbackendt.dao.UserDao;
import com.rafael.ysdbackendt.dto.UserDto;
import com.rafael.ysdbackendt.entity.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private  final UserDao userDao;
    private  final AuthenticationManager authenticationManager;

    public AuthService(PasswordEncoder passwordEncoder, UserDao userDao, AuthenticationManager authenticationManager) {
        this.passwordEncoder = passwordEncoder;
        this.userDao = userDao;
        this.authenticationManager = authenticationManager;
    }

    public UserDto signup(UserDto input){
        User user = new User(input.getFirstName(), input.getLastName(), input.getEmail(), passwordEncoder.encode(input.getPassword()), input.getYearOfBirth());
        userDao.save(user);
        return input;
    }

    public User login(UserDto input){
        User user = userDao.findByEmail(input.getEmail());

        if(user == null || !passwordEncoder.matches(input.getPassword(), user.getPassword())){
          throw new UsernameNotFoundException("User not found");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;
    }

}
