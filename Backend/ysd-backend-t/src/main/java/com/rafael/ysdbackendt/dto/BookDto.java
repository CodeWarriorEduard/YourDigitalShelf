package com.rafael.ysdbackendt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
    private String title;
    private String author;
    private String description;
    private String genre;
    private String cover;
    private String publisher;
    private String isbn;
    private String language;
    private String yearOfRelease;
    private int pageCount;
    private boolean isInCollection;
    private float meanRating;
    private int numberOfRatings;
}
