package com.rafael.ysdbackendt.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor

public class UserDto {
    @NotNull(message = "First name is required, please complete this field in order to register.")
    @Size(min = 2, max = 50)
    String firstName;
    @NotNull(message = "Last name is required, please complete this field in order to register.")
    @Size(min = 2, max = 50)
    String lastName;
    @NotNull(message = "Email is required, please complete this field in order to register.")
    @Email
    String email;
    @NotNull(message = "Password is required, please complete this field in order to register.")
    @Size(min = 8, message = "The password must be at least 8 characters long")
    String password;
    Date yearOfBirth;
}
