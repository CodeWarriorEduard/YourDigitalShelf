package com.rafael.ysdbackendt.dto;

public class TokenDto {

    String token;

    public TokenDto(String token) {
        this.token = token;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
