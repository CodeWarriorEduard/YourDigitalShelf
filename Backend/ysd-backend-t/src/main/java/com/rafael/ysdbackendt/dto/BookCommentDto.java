package com.rafael.ysdbackendt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookCommentDto {

    private String firstName;
    private String lastName;
    private int rating;
    private String review;

}
