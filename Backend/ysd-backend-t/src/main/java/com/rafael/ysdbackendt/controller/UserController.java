package com.rafael.ysdbackendt.controller;

import com.rafael.ysdbackendt.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/me")
    public Object getUser(){
       Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       return authentication.getPrincipal();
    }
}
