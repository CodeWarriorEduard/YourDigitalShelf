package com.rafael.ysdbackendt.service;

import com.rafael.ysdbackendt.dao.BookDao;
import com.rafael.ysdbackendt.dao.BookInCollectionDao;
import com.rafael.ysdbackendt.dto.*;
import com.rafael.ysdbackendt.entity.Book;
import com.rafael.ysdbackendt.entity.User;
import com.rafael.ysdbackendt.exception.BookNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class BookService {

    @Autowired
    private BookDao bookDao;
    @Autowired
    private BookInCollectionDao bookInCollectionDao;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BookInCollectionDao getBookInCollectionDao;

    public BookService(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    @Value("${RECOMMENDATIONS_URL}")
    private String recommendationUrl;


    private int randomIndex(int size){
        Random random = new Random();
        return random.nextInt(size);
    }

    public List<BookPreviewDto> getBookRecommendations(int id){
        String url = recommendationUrl+id;
        ResponseEntity<BookPreviewDto[]> response = restTemplate.getForEntity(url, BookPreviewDto[].class);
        return response.getBody() == null ? List.of(): Arrays.asList(response.getBody());
    }


    private int getCurrentUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User getUser = (User) authentication.getPrincipal();
        int userId = getUser.getIduser();
        return userId;
    }

    public BookDto getBookOfTheMonth(){
        List<Book> books = new ArrayList<>();
        books = bookDao.getAll();
        int index = randomIndex(books.size());
        return modelMapper.map(books.get(index), BookDto.class);
    }

    // Search
    public List<BookPreviewDto> getListOfBook(String genre){
        List<Book> response = bookDao.getBookBygenre(genre);
        ArrayList<BookPreviewDto> booksDtos = new ArrayList<>();
        for (Book book : response) {
            booksDtos.add(modelMapper.map(book, BookPreviewDto.class));
        }
        return booksDtos;
    }

    // Obtain complete book info by db id.
    public BookDto getCompleteBookInfo(int id){
            int userId = getCurrentUserId();
            Object[] response2 = getBookInCollectionDao.getMeanBookRating(id);
            System.out.println(response2[0]);
            Book response = bookDao.getBookWithId(id);
            if (response == null){
                throw new BookNotFoundException("Book not found");
            }
            boolean isInCollection = bookInCollectionDao.IsBookInUserCollection(userId, id);
            BookDto bookDto = modelMapper.map(response, BookDto.class);
            bookDto.setInCollection(isInCollection);
            bookDto.setMeanRating((float) response2[0]);
            bookDto.setNumberOfRatings((int) response2[1]);
            return bookDto;
    }




    public SearchBookDto searchBook(String searchTerm, int pageIdx){
        // SearchBookDto.
        SearchBookDto searchBookDto = new SearchBookDto();
        // Default page size;
        int pageSize = 10;
        int bookQ = bookDao.countSearchBook(searchTerm);
        int pageCount = (bookQ / pageSize) + 1;
        int offset = (pageIdx - 1)*pageSize;
        int itemsPerPage = bookQ / pageCount;
        // Pagination

        Pageable pageable = PageRequest.of(offset, pageSize);

        // Query
        List<Book> response = new ArrayList<>();
        ArrayList<BookPreviewDto> booksDtos = new ArrayList<>();
        response = bookDao.searchBookByTerms(searchTerm, pageable);

        // Links
        String next = pageIdx - 1 != pageCount - 1? "/search?searchTerm="+searchTerm+"&page="+(pageIdx + 1): null;
        String prev = pageIdx - 1 > 0? "/search?searchTerm="+searchTerm+"&page="+(pageIdx - 1): null;
        String last = "/search?searchTerm="+searchTerm+"&page="+(pageCount);

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

    public List<AllBooksDto> getAllBooks(){
        List<Book> response = new ArrayList<>();
        response = bookDao.getAll();
        List<AllBooksDto> bookDtos = new ArrayList<>();
        for (Book book : response) {
            bookDtos.add(modelMapper.map(book, AllBooksDto.class));
        }
        return  bookDtos;
    }




}
