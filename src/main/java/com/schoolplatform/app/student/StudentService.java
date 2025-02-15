package com.schoolplatform.app.student;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

}
