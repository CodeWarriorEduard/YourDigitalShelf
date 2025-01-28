package com.rafael.ysdbackendt.exception;

import com.rafael.ysdbackendt.response.DefaultApiResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = BookNotFoundException.class)
    public ResponseEntity<DefaultApiResponse<Object>> handleBookNotFoundException(BookNotFoundException e){
        DefaultApiResponse<Object> response = new DefaultApiResponse<>(
                "NOT FOUND",
                e.getMessage(),
                null,
                null
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(value = BookAlreadyInCollectionException.class)
    public ResponseEntity<Object> handleBookAlreadyInCollectionException(BookAlreadyInCollectionException e){
        DefaultApiResponse<Object> response = new DefaultApiResponse<>(
                "NOT FOUND",
                e.getMessage(),
                null,
                null
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException e){
        DefaultApiResponse<Object> response = new DefaultApiResponse<>(
                "BAD REQUEST",
                e.getMessage(),
                null,
                null
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        DefaultApiResponse<Object> response = new DefaultApiResponse<>(
                "BAD REQUEST",
                e.getBindingResult().getFieldError().getDefaultMessage(),
                null,
                null
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(value = UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException e){
        DefaultApiResponse<Object> response = new DefaultApiResponse<>(
                "BAD REQUEST",
                "Wrong username or password",
                null,
                null
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
