package com.rafael.ysdbackendt.controller;

import com.rafael.ysdbackendt.dto.*;
import com.rafael.ysdbackendt.response.DefaultApiResponse;
import com.rafael.ysdbackendt.service.BookInCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/collection")
public class BookInCollectionController {

    @Autowired
    private BookInCollectionService bookInCollectionService;

    @GetMapping("")
    public ResponseEntity<DefaultApiResponse<SearchBookDto>> getMyCollection(@RequestParam int page){ // Get my collection of books //Change response class. // Simplify DAO.
        DefaultApiResponse<SearchBookDto> response = new DefaultApiResponse<>(
                "SUCCESS",
                "User collection retrieved",
                bookInCollectionService.getBooksInCollection(page),
                null
        );
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/book")
    public ResponseEntity<DefaultApiResponse<AddBookInCollectionDto>> addBookToCollection(@RequestBody AddBookInCollectionDto book){
        DefaultApiResponse<AddBookInCollectionDto> response = new DefaultApiResponse<>(
                "SUCCESS",
                "User added to collection successfully",
                bookInCollectionService.addBookToCollection(book),
                null
        );
        return ResponseEntity.ok().body(response);
    }


    @GetMapping("/{id}/opinion")
    public ResponseEntity< DefaultApiResponse<BookOpinionDto>>  getBookOpinion(@PathVariable int id){
        DefaultApiResponse<BookOpinionDto> response = new DefaultApiResponse<>(
                "SUCCESS",
                "User added to collection successfully",
                bookInCollectionService.getOneBookInUserCollection(id),
                null
        );
        return ResponseEntity.ok().body(response);
    }


    @DeleteMapping("/{id}/book")
    public ResponseEntity< DefaultApiResponse<String>>  deleteBookInCollection(@PathVariable int id){
        int response = bookInCollectionService.deleteBookInCollection(id);
        if (response == 0){
            return ResponseEntity.badRequest().body(new DefaultApiResponse<>(
                    "BAD REQUEST",
                    "Error deleting the book",
                    null,
                    null
            ));
        }

        return ResponseEntity.ok().body(new DefaultApiResponse<>(
                "SUCCESS",
                "Book deleted from your collection",
                null,
                null
        ));

    }

    @PutMapping("/book/opinion")
    public ResponseEntity< DefaultApiResponse<String>>  updateBookReview(@RequestBody AddBookInCollectionDto book){
        System.out.println(book);
        int response = bookInCollectionService.updateBookReview(book);
        if (response == 0){
            return ResponseEntity.badRequest().body(new DefaultApiResponse<>(
                    "BAD REQUEST",
                    "Error updating the book",
                    null,
                    null
            ));
        }

        return ResponseEntity.ok().body(new DefaultApiResponse<>(
                "SUCCESS",
                "Book updated successfully",
                null,
                null
        ));

    }


    @GetMapping("/book/{id}/comments")
    public ResponseEntity< DefaultApiResponse<List<BookCommentDto>>> getBookComments(@PathVariable int id){
        List<BookCommentDto> response = bookInCollectionService.getBookComments(id);
        return ResponseEntity.ok().body(new DefaultApiResponse<>(
                "SUCCESS",
                "Book comments retrieved successfully",
                response,
                null
        ));

    }
}
