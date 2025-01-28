package com.rafael.ysdbackendt.dao;

import com.rafael.ysdbackendt.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BookDao{

    private static final String GET_BOOKS_QUERY ="SELECT * FROM books";
    private static final String GET_BOOK_ID_QUERY = "SELECT * FROM books where idbook = ?";
    private static final String GET_BOOKS_BY_GENRE = "SELECT * FROM books WHERE genre = ? limit 5";
    private static final String BOOK_SEARCH_BY_TERMS = "select * from books where books.ts @@ websearch_to_tsquery(?) limit ? offset ?";
    private static final String COUNT_BOOK_SEARCH_BY_TERMS = "select count(*) from books where books.ts @@ websearch_to_tsquery(?)";

    private final JdbcTemplate jdbcTemplate;


    public BookDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public Book getBookWithId(int id){
        try{
            Object[] arg = {id};
            return jdbcTemplate.queryForObject(GET_BOOK_ID_QUERY, arg, (rs, rowNum) ->{
                return new Book(
                        rs.getInt("idBook"),
                        rs.getString("title"),
                        rs.getString("author"),
                        rs.getString("description"),
                        rs.getString("genre"),
                        rs.getString("cover"),
                        rs.getString("yearofrelease"),
                        rs.getString("publisher"),
                        rs.getString("isbn"),
                        rs.getString("language"),
                        rs.getInt("pagecount")
                );
            });
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Book> getAll() {
        return jdbcTemplate.query(GET_BOOKS_QUERY, (rs, rowNum) -> {
            return new Book(
                    rs.getInt("idBook"),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getString("description"),
                    rs.getString("genre"),
                    rs.getString("cover"),
                    rs.getString("yearofrelease"),
                    rs.getString("publisher"),
                    rs.getString("isbn"),
                    rs.getString("language"),
                    rs.getInt("pagecount")
            );
        });
    }

    public List<Book> getBookBygenre(String genre){
        Object[] arg = {genre};
        return jdbcTemplate.query(GET_BOOKS_BY_GENRE, arg, (rs, rowNum) -> {
            return new Book(
                    rs.getInt("idBook"),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getString("description"),
                    rs.getString("genre"),
                    rs.getString("cover"),
                    rs.getString("yearofrelease"),
                    rs.getString("publisher"),
                    rs.getString("isbn"),
                    rs.getString("language"),
                    rs.getInt("pagecount")
            );
        });
    }

    public List<Book> searchBookByTerms(String searchTerm, Pageable pageable){
        System.out.println(pageable.getOffset());
        Object[] arg = {searchTerm, pageable.getPageSize(), pageable.getOffset()};
        return jdbcTemplate.query(BOOK_SEARCH_BY_TERMS, arg, (rs, rowNum) -> {
            return new Book(
                    rs.getInt("idBook"),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getString("description"),
                    rs.getString("genre"),
                    rs.getString("cover"),
                    rs.getString("yearofrelease"),
                    rs.getString("publisher"),
                    rs.getString("isbn"),
                    rs.getString("language"),
                    rs.getInt("pagecount")
            );
        });
    }

    public int countSearchBook(String searchTerm){
        Object[] args = {searchTerm};
        return jdbcTemplate.queryForObject(COUNT_BOOK_SEARCH_BY_TERMS, args, int.class);
    }

}