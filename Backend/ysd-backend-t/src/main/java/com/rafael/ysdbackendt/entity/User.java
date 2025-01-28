package com.rafael.ysdbackendt.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @Column("iduser")
    private int iduser;
    @Column("firstname")
    private String firstName;
    @Column("lastname")
    private String lastName;
    @Column("email")
    private String email;
    @Column("password")
    private String password;
    @Column("yearofbirth")
    private Date yearOfBirth;


    public User(String firstName, String lastName, String email, String password, Date yearOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.yearOfBirth = yearOfBirth;
    }

    public User(){

    }


    //
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
