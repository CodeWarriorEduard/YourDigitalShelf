package com.rafael.ysdbackendt.controller;

import com.rafael.ysdbackendt.dto.*;
import com.rafael.ysdbackendt.entity.Book;
import com.rafael.ysdbackendt.exception.BookNotFoundException;
import com.rafael.ysdbackendt.response.DefaultApiResponse;
import com.rafael.ysdbackendt.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/month")
    public ResponseEntity<DefaultApiResponse<BookDto>> getBookOfTheMonth(){
        BookDto book = bookService.getBookOfTheMonth();
        DefaultApiResponse<BookDto> response = new DefaultApiResponse<>(
                "Success",
                "Book of the month retrieved successfully",
                book,
                null
        );
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{genre}/list")
    public ResponseEntity<DefaultApiResponse<List<BookPreviewDto>>> getListOfBooksGenre(@PathVariable String genre){
        DefaultApiResponse<List<BookPreviewDto>> response = new DefaultApiResponse<>(
                "Success",
                "List of books by genre retrieved successfully",
                bookService.getListOfBook(genre),
                null
        );
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DefaultApiResponse<BookDto>> getCompleteBookInfo(@PathVariable int id){
        DefaultApiResponse<BookDto> response = new DefaultApiResponse<>(
                "SUCCESS",
                "Complete book info retrieved successfully",
                bookService.getCompleteBookInfo(id),
                null
        );
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/recommendations/{book}")
    public ResponseEntity<DefaultApiResponse<List<BookPreviewDto>>> getBookRecommendation(@PathVariable int book){
        DefaultApiResponse<List<BookPreviewDto>> response = new DefaultApiResponse<>(
                "SUCCESS",
                "Book recommendations retrieved successfully",
                bookService.getBookRecommendations(book),
                null
        );
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<DefaultApiResponse<List<AllBooksDto>>>  getAllBooks(){
        DefaultApiResponse<List<AllBooksDto>> response = new DefaultApiResponse<>(
                "SUCCESS",
                "Every book in the database retrieved successfully",
                bookService.getAllBooks(),
                null
        );
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/search")
    public ResponseEntity<DefaultApiResponse<SearchBookDto>>  getAllBooks(@RequestParam String searchTerm, @RequestParam int page){
        DefaultApiResponse<SearchBookDto> response = new DefaultApiResponse<>(
                "SUCCESS",
                "Book user search retrieved successfully",
                bookService.searchBook(searchTerm, page),
                null
        );
        return ResponseEntity.ok().body(response);
    }

    
}
