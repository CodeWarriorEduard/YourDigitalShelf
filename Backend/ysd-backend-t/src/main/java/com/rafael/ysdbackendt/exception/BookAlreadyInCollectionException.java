package com.rafael.ysdbackendt.exception;

public class BookAlreadyInCollectionException extends  RuntimeException{

    public BookAlreadyInCollectionException(String message) {
        super(message);
    }

}
