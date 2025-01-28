package com.rafael.ysdbackendt.controller;

import com.rafael.ysdbackendt.dto.TokenDto;
import com.rafael.ysdbackendt.dto.UserDto;
import com.rafael.ysdbackendt.entity.User;
import com.rafael.ysdbackendt.response.DefaultApiResponse;
import com.rafael.ysdbackendt.service.AuthService;
import com.rafael.ysdbackendt.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(value = "*")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<DefaultApiResponse<UserDto>> signup(@Valid  @RequestBody UserDto userDto){
        UserDto user = authService.signup(userDto);
        DefaultApiResponse<UserDto> response = new DefaultApiResponse<>(
                "Success",
                "Account registered successfully",
                user,
                null
        );
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserDto login){
        User user = authService.login(login);
        TokenDto token = new TokenDto(jwtService.getToken(user));
        return ResponseEntity.ok().body(token);
    }
}