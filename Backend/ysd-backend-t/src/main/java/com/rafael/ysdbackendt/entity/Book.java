package com.rafael.ysdbackendt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Table(name = "books")
public class Book {
    @Id
    @Column("idbook")
    private int idBook;
    private String title;
    private String author;
    private String description;
    private String genre;
    private String cover;
    @Column("yearofrelease")
    private String yearOfRelease;
    private String publisher;
    private String isbn;
    private String language;
    private int pageCount;
}
