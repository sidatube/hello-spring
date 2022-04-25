package com.example.hellospring.student;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "students")
public class Student {
    @Id
    private String rollNumber;
    private String name;
    private String email;
    private String address;
    private int status;

}
