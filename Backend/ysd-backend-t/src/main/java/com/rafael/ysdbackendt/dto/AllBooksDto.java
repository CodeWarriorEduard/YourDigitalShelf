package com.rafael.ysdbackendt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllBooksDto {
    private int id;
    private String title;
    private String author;
    private String genre;
    private String cover;
    private String description;
}
