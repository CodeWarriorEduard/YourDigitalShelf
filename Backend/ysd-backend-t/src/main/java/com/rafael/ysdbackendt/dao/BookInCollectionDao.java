package com.rafael.ysdbackendt.dao;

import com.rafael.ysdbackendt.dto.AddBookInCollectionDto;
import com.rafael.ysdbackendt.entity.Book;
import com.rafael.ysdbackendt.entity.BookInCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BookInCollectionDao{

    public static final String INSERT_BOOK_IN_COLLECTION = "INSERT INTO booksincollection(idbook, idcollection, rating, review) VALUES(?, ?, ?, ?)";
    public static final String IS_BOOK_IN_USER_COLLECTION = " SELECT * FROM verifyBookInCollection(?, ?)";
    public static final String GET_BOOK_IN_USER_COLLECTION = "SELECT * FROM booksincollection WHERE idbook = ? AND idcollection = ?";
    private static final String GET_BOOKS_COLLECTION_QUERY = "select b2.* from users join booksincollection b on b.idcollection = users.iduser join books b2 on b2.idbook = b.idbook where users.iduser = ?";
    private static final String DELETE_BOOK_COLLECTION_QUERY = "delete from booksincollection WHERE idbook = ? AND idcollection = ?";
    private static final String UPDATE_BOOK_OPINION = "UPDATE booksincollection SET rating = ? , review = ? WHERE idbook = ? AND idcollection= ?";
    private static final String GET_BOOK_USER_COMMENTS = "SELECT users.firstname, users.lastname,  b.rating, b.review FROM users JOIN booksincollection b ON b.idcollection = users.iduser where idbook = ?";
    private static final String GET_AVG_BOOK = "select avg(rating), count(*) from users join booksincollection b on b.idcollection = users.iduser where idbook = ?";
    @Autowired
    private JdbcTemplate jdbcTemplate;


    public Object[] getMeanBookRating(int id){
        Object[] arg = {id};
        return jdbcTemplate.queryForObject(GET_AVG_BOOK, arg, (rs, rW)->{
            return new Object[]{
                    rs.getFloat("avg"),
                    rs.getInt("count")
            };
        });
    }

    public List<Object[]> getBookComments(int id){
        Object[] arg = {id};
        return jdbcTemplate.query(GET_BOOK_USER_COMMENTS, arg, (rs, rW )-> {
                return new Object[]{
                        rs.getString("firstName"),
                        rs.getString("lastName"),
                        rs.getInt("rating"),
                        rs.getString("review")
                };
        });
    }

    public List<Book> getBooksIncollection(int id) {
        Object[] arg = {id};
        return jdbcTemplate.query(GET_BOOKS_COLLECTION_QUERY, arg, (rs, rowNum) -> {
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

    public BookInCollection save(BookInCollection bookInCollection) {
        System.out.println(bookInCollection);
        Object[] args = {bookInCollection.getIdBook(),bookInCollection.getIdCollection(), bookInCollection.getRating(), bookInCollection.getReview()};
        jdbcTemplate.update(INSERT_BOOK_IN_COLLECTION, args);
        return bookInCollection;

    }


    public int deleteBookInCollection(int userId, int bookId){
        System.out.println(userId+" "+ bookId );
        Object[] arg = {bookId, userId};
        return jdbcTemplate.update(DELETE_BOOK_COLLECTION_QUERY, arg);
    }



    public boolean IsBookInUserCollection(int userId, int bookId){
        Object[] arg = {userId, bookId};
        return jdbcTemplate.queryForObject(IS_BOOK_IN_USER_COLLECTION, arg, Boolean.class);
    }

    public BookInCollection getOneBookInUserCollection(int idCollection, int idBook){
       try{
           Object[] arg = {idBook, idCollection};
           return jdbcTemplate.queryForObject(GET_BOOK_IN_USER_COLLECTION, arg ,(rs, rW)->{
               return new BookInCollection(
                       rs.getInt("idbook"),
                       rs.getInt("idcollection"),
                       rs.getInt("rating"),
                       rs.getString("review")
               );
           });
       }catch (EmptyResultDataAccessException e){
           return null;
       }
    }

    public int updateReview(int idCollection, AddBookInCollectionDto book){
        Object[] arg = {book.getRating(), book.getReview(), book.getBookId(), idCollection};
        return jdbcTemplate.update(UPDATE_BOOK_OPINION, arg);
    }
}
