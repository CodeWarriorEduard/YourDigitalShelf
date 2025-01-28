package com.rafael.ysdbackendt.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddBookInCollectionDto {
    @NotNull(message = "The book id is required")
    private int bookId;
    @Min(value = 0, message = "Rating must be equal or more than 0")
    @Max(value = 5, message = "Rating must be equal or less than 5")
    private int rating;
    @Size(max = 300, message = "Review must have a maximum of 300 characters")
    private String review;

}
