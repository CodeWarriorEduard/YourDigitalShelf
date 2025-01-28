package com.rafael.ysdbackendt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookInCollection {
    @Id
    @Column("idbook")
    private int idBook;
    @Id
    @Column("idcollection")
    private int idCollection;

    @Column("rating")
    private int rating;

    @Column("review")
    private String review;

}
