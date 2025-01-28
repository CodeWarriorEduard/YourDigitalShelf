package com.rafael.ysdbackendt.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class DefaultApiResponse<T> {
    private String status;
    private String message;
    private T data;
    private Object metadata;
}

