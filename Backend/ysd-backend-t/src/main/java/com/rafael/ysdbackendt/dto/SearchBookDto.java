package com.rafael.ysdbackendt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchBookDto {

    ArrayList<BookPreviewDto> books;
    int pageCount;
    int currentPage;
    int numberOfResults;
    int itemsPerPage;
    LinkDto links;

}
