package com.rafael.ysdbackendt.service;

import com.rafael.ysdbackendt.dao.BookDao;
import com.rafael.ysdbackendt.dao.BookInCollectionDao;
import com.rafael.ysdbackendt.dao.UserDao;
import com.rafael.ysdbackendt.dto.*;
import com.rafael.ysdbackendt.entity.Book;
import com.rafael.ysdbackendt.entity.BookInCollection;
import com.rafael.ysdbackendt.entity.User;
import com.rafael.ysdbackendt.exception.BookAlreadyInCollectionException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookInCollectionService {

    @Autowired
    private BookInCollectionDao bookInCollectionDao;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserDao userDao;

    public BookInCollectionService(BookDao bookDao, BookInCollectionDao bookInCollectionDao) {
        this.bookInCollectionDao = bookInCollectionDao;
    }

    private int getCurrentUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User getUser = (User) authentication.getPrincipal();
        int userId = getUser.getIduser();
        return userId;
    }

    public SearchBookDto getBooksInCollection(int pageIdx){
        int idUser = getCurrentUserId();

        // Query
        List<Book> response = new ArrayList<>();
        ArrayList<BookPreviewDto> booksDtos = new ArrayList<>();
        response = bookInCollectionDao.getBooksIncollection(idUser);



        // SearchBookDto.
        SearchBookDto searchBookDto = new SearchBookDto();
        // Default page size;
        int pageSize = 10;
        int bookQ = response.size();
        int pageCount = (bookQ / pageSize) + 1;
        int offset = (pageIdx - 1)*pageSize;
        int itemsPerPage = bookQ / pageCount;
        // Pagination

        Pageable pageable = PageRequest.of(offset, pageSize);

        // Links
        String next = pageIdx - 1 != pageCount - 1? "?page="+(pageIdx + 1): null;
        String prev = pageIdx - 1 > 0? "?page="+(pageIdx - 1): null;
        String last = "?page="+(pageCount);

        for (Book book : response) {
            booksDtos.add(modelMapper.map(book, BookPreviewDto.class));
        }


        searchBookDto.setBooks(booksDtos);
        searchBookDto.setCurrentPage(pageIdx);
        searchBookDto.setPageCount(pageCount);
        searchBookDto.setLinks(new LinkDto(next, prev, last));
        searchBookDto.setNumberOfResults(bookQ);
        searchBookDto.setItemsPerPage(itemsPerPage);

        return searchBookDto;

    }



    public AddBookInCollectionDto addBookToCollection(AddBookInCollectionDto book){
        System.out.println(book);
        int idUser = getCurrentUserId();
        BookInCollection bookInUserCollection = bookInCollectionDao.getOneBookInUserCollection(idUser, book.getBookId());

        if(bookInUserCollection!=null){
            throw new BookAlreadyInCollectionException("The Book is already in the user collection");
        }

        String review = book.getReview();
        if(review == null || review.isBlank()){
            review = "No review yet...";
        }

        bookInCollectionDao.save(new BookInCollection(book.getBookId(), idUser, book.getRating(), book.getReview()));
        return book;
    }



    public BookOpinionDto getOneBookInUserCollection(int idBook){
        int idUser = getCurrentUserId();
        BookInCollection response = bookInCollectionDao.getOneBookInUserCollection(idUser, idBook);
        return modelMapper.map(response, BookOpinionDto.class);
    }

    public int deleteBookInCollection(int idBook){
        int idUser = getCurrentUserId();
        return bookInCollectionDao.deleteBookInCollection(idUser, idBook);
    }

    public int updateBookReview(AddBookInCollectionDto book){
        int idUser = getCurrentUserId();
        return bookInCollectionDao.updateReview(idUser,book);
    }

    public List<BookCommentDto> getBookComments(int id){
        System.out.println(bookInCollectionDao.getBookComments(id));
        List<Object[]> response = bookInCollectionDao.getBookComments(id);
        List<BookCommentDto> comments = new ArrayList<>();

        for (Object[] object: response){
            BookCommentDto bookCommentDto = new BookCommentDto(
                    (String) object[0],
                    (String) object[1],
                    (int) object[2],
                    (String) object[3]
            );
            comments.add(bookCommentDto);
        }




        return comments;

    }


}
